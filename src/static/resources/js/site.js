function initTree() {
    $('#left-tree').jstree({
        'core': {
            "multiple": true,
            //"themes" : { "stripes" : true },
            "data": function (node, cb) {
                $.ajax({
                    url: (node.id === '#') ? siteCfg.kdb_url + "consumers/" : siteCfg.kdb_url + "consumers/" + node.id,
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json'
                })
                    .done(function (a) {
                        var data = [];
                        for (i = 0; i < a.length; i++) {
                            var node = {
                                "id": a[i].id,
                                "text": a[i].name,
                                "parent": (a[i].parent_id == -1) ? "#" : a[i].parent_id,
                                "children": (a[i].object_type != "building"),
                                "type": a[i].object_type
                            };
                            data.push(node);
                        }
                        cb(data);
                    })
                    .fail(function (err) {
                        console.log(err.responseText);
                    });
            }
        },
        "search": {
            "show_only_matches": true
        },
        "types": {
            "#": {
                "valid_children": [""]
            },
            "country": {
                "icon": "/static/resources/image/country.png"
                //"valid_children" : ["field"]
            },
            "region": {
                "icon": "/static/resources/image/region.png"
            },
            "city": {
                "icon": "/static/resources/image/city.png"
            },
            "street": {
                "icon": "/static/resources/image/street.png"
            },
            "building": {
                "icon": "/static/resources/image/building.png",
                "max_children": 0
            },
            "default": {
                //"icon" : "./images/folder.png"
            }
        },
        "plugins": ["sort", "types", "wholerow", "dnd", "search", "changed"]
    }).on("changed.jstree", function (e, data) {
        if (data.node == undefined)
            return;
        stopAutoRefreshRt();
        $('#selected-node').text(data.node.text).attr('node_id', data.node.id);
        getSheet(data.node.id, t_panels.rtMap);
        $.each(t_panels, function (index, val) {
            if (val.hasOwnProperty("o")) {
                var s = $('#' + val.o);
                if (s.parents('#right-data-tabs').length && s.parent().hasClass('active'))
                    getSheet(data.node.id, val);
            }
        });
        startAutoRefreshRt();
    }).on('loaded.jstree', function () {
        $(this).jstree('select_node', 'ul > li:first');
        $(this).jstree('open_node', 'ul > li:first');
    });
}

function datToString(d) {
    return "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function datUrlPart(viz) {
    if (viz.hasOwnProperty('dat') && viz.dat)
        return "&datef=" + "2016-04-01" + "&datet=" + "2016-04-09";
    /*var df = new Date(),dt = new Date();
     df.setDate(df.getDate() - 7);
     dt.setDate(dt.getDate() + 1);
     return "&datef="+datToString(df)+"&datet="+datToString(dt);*/
    return "";
}

function getSheet(id, viz) {
    if (id == undefined || id < -1)
        id = $('#selected-node').attr('node_id');
    if (id == undefined || id < -1)
        return;
    if (viz.v == undefined) {
        $.ajax({
            url: siteCfg.local_url + "getticket/",
            type: 'GET'
        }).done(function (ticket) {
            var options = {
                hideTabs: true,
                hideToolbar: true,
                onFirstInteractive: function () {
                    viz.w = true;
                    if (viz.ownCtr) {
                        switch (viz.v.getWorkbook().getActiveSheet().getSheetType()) {
                            case 'worksheet':
                                viz.s = viz.v.getWorkbook().getActiveSheet();
                                break;
                            case 'dashboard':
                                viz.s = viz.v.getWorkbook().getActiveSheet().getWorksheets()[0];
                        }
                        viz.id = id;
                        getData(viz);
                    }
                }
            };
            var el = document.getElementById(viz.o);
            var url = siteCfg.tableau_url + ((ticket == "#") ? ticket : "trusted/" + ticket) + viz.p + "&par1=" + id + datUrlPart(viz);
            viz.v = new tableau.Viz(el, url, options);
        })
    } else {
        if (viz.w) {
            viz.v.getWorkbook().changeParameterValueAsync("par1", id)
                .then(function () {
                    if (viz.id == id) {
                        viz.v.refreshDataAsync()
                            .then(function () {
                                getData(viz);
                            });
                    } else {
                        viz.id = id;
                        getData(viz);
                    }
                })
                .otherwise(function (err) {
                    alert('Get data for ' + viz.o + ' failed: ' + err);
                });
        }
    }
}

function getStatistics(viz) {
    if (viz.v == undefined) {
        $.ajax({
            url: siteCfg.local_url + "getticket/",
            type: 'GET'
        }).done(function (ticket) {
            var options = {
                hideTabs: true,
                hideToolbar: true,
                onFirstInteractive: function () {
                    viz.w = true;
                    switch (viz.v.getWorkbook().getActiveSheet().getSheetType()) {
                        case 'worksheet':
                            viz.s = viz.v.getWorkbook().getActiveSheet();
                            break;
                        case 'dashboard':
                            viz.s = viz.v.getWorkbook().getActiveSheet().getWorksheets()[0];
                    }
                    getStatData(viz);
                }
            };
            var el = document.getElementById(viz.o);
            var url = siteCfg.tableau_url + ((ticket == "#") ? ticket : "trusted/" + ticket) + viz.p;
            viz.v = new tableau.Viz(el, url, options);
        })
    } else {
        if (viz.w) {
            viz.v.refreshDataAsync()
                .then(function () {
                    getStatData(viz);
                });
        }
    }
}

function getData(viz) {
    if (!viz.ownCtr)
        return;

    var opt = {
        maxRows: 0,
        ignoreAliases: false,
        ignoreSelection: true,
        includeAllColumns: false
    };
    viz.s.getUnderlyingDataAsync(opt).then(function (t) {
        var s = $("#" + viz.o + "2");
        var refreshOk = false;
        if (viz.cfg != null && viz.cfg.idColPos >= 0 && viz.id == s.attr('pid')) { //replace data
            refreshOk = updateHtml(viz, t.getData())
        }
        if (!refreshOk) {
            s.attr('pid', -2);
            s.html(getHtml(viz, t.getData(), t.getColumns()));
            viz.tb = $("#" + viz.o + "-2t").DataTable();
            s.attr('pid', viz.id);
        }
    });
}

function getStatData(viz) {
    var opt = {
        maxRows: 0,
        ignoreAliases: false,
        ignoreSelection: true,
        includeAllColumns: false
    };
    viz.s.getUnderlyingDataAsync(opt).then(function (t) {
        var s = $("#" + viz.o + "2");
        s.attr('pid', -2);
        s.html(getHtml(viz, t.getData(), t.getColumns()));
        viz.tb = $("#" + viz.o + "-2t").DataTable({
            'searching': false,

            'info': false,
            'paging': false
        });
        s.attr('pid', viz.id);
    });
}

function updateHtml(viz, d) {
    var cfg = viz.cfg;
    for (var i = 0; i < d.length; i++) {//by rows
        var dat = viz.tb.row("#" + viz.o + "-2t-rid-" + d[i][cfg.idColPos].value).data();
        for (var j = 0; j < cfg.cols.length; j++) {
            var k = cfg.cols[j].i;
            if (k > -1) {
                var v = "";
                if (cfg.cols[j].f > -1) {
                    v = "" + parseFloat(d[i][k].value).toFixed(cfg.cols[j].f)
                } else
                    v = "" + d[i][k].value;
                dat[j] = v;
            } else
                return false;
        }
        viz.tb.row("#" + viz.o + "-2t-rid-" + d[i][cfg.idColPos].value).data(dat).draw();
    }
    viz.tb.rows().draw();
    return true;
}

function getHtml(viz, d, col) {
    var i, j;
    var s = "<table id=\"" + viz.o + "-2t\" class=\"table table-p2 display table-striped table-hover\">";
    var cfg = viz.cfg;
    if (cfg != null) {
        cfg.configure(col);
        s = s + "<thead><tr>";
        for (i = 0; i < cfg.cols.length; i++) {
            s = s + "<th>" + cfg.cols[i].n + "</th>";
        }
        s = s + "</thead></tr>";
    }
    s = s + "<tbody>";
    for (i = 0; i < d.length; i++) {
        if (cfg != null && cfg.idColPos >= 0)
            s = s + "<tr id=\"" + viz.o + "-2t-rid-" + d[i][cfg.idColPos].value + "\">";
        else
            s = s + "<tr>";
        if (cfg != null) {
            for (j = 0; j < cfg.cols.length; j++) {
                var k = cfg.cols[j].i;
                var v = "";
                if (k > -1) {
                    if (cfg.cols[j].f > -1) {
                        v = "" + parseFloat(d[i][k].value).toFixed(cfg.cols[j].f);
                    } else
                        v = "" + d[i][k].value;
                }
                s = s + "<td>" + v + "</td>";
            }
        } else {
            for (j = 0; j < d[i].length; j++) {
                s = s + "<td>" + d[i][j].value + "</td>";
            }
        }
        s = s + "</tr>"
    }
    s = s + "</tbody></table>";
    return s;
}


function addTabsEvents() {
    $.each(t_panels, function (index, val) {
        if (val.hasOwnProperty("o")) {
            var s = $('#' + val.o);
            if (s.parents('#right-data-tabs').length) {
                $("a[href='#sheet-" + val.o + "']").on('shown.bs.tab', function () {
                    stopAutoRefreshRt();
                    getSheet(undefined, val);
                    startAutoRefreshRt();
                });
            }
        }
    });
}

function stopAutoRefreshRt() {
    if (siteCfg.refresh.rt.id) {
        clearInterval(siteCfg.refresh.rt.id);
        siteCfg.refresh.rt.id = {};
    }
}

function startAutoRefreshRt() {
    if (siteCfg.refresh.rt.v > 0) {
        siteCfg.refresh.rt.id = setInterval(function () {
            if (siteCfg.refresh.rt.tab)
                getSheet(undefined, t_panels.rtTab);
            if (siteCfg.refresh.rt.map)
                getSheet(undefined, t_panels.rtMap);
        }, siteCfg.refresh.rt.v);
    }
}

function setAutoRefreshRt() {
    stopAutoRefreshRt();
    startAutoRefreshRt();
}

function stopAutoRefreshStat() {
    if (siteCfg.refresh.stat.id) {
        clearInterval(siteCfg.refresh.stat.id);
        siteCfg.refresh.stat.id = {};
    }
}

function startAutoRefreshStat() {
    if (siteCfg.refresh.stat.v > 0) {
        siteCfg.refresh.stat.id = setInterval(function run() {
            getStatistics(t_panels.stat);
        }, siteCfg.refresh.stat.v);
    }
}

function setAutoRefreshStat() {
    stopAutoRefreshStat();
    startAutoRefreshStat();
}

function setAutoRefresh() {
    setAutoRefreshStat();
    setAutoRefreshRt();
}

function startAutoRefresh() {
    startAutoRefreshStat();
    startAutoRefreshRt();
}

function stopAutoRefresh() {
    stopAutoRefreshStat();
    stopAutoRefreshRt();
}

function setRefresh() {
    $("#nav-refresh").on("click", "a", null, function () {
        stopAutoRefresh();
        getStatistics(t_panels.stat);
        getSheet(undefined, t_panels.rtMap);
        getSheet(undefined, t_panels.rtTab);
        startAutoRefresh();
    });
}

var pageStarter = {
    energyReady: function () {
        $().ready(function () {
            initTree();
            getStatistics(t_panels.stat);
            addTabsEvents();
            setRefresh();
            setAutoRefresh();
        });
    },
    financeReady: function () {
        $("#syms-selector").chosen({
            placeholder_text_multiple: 'Select Instruments...',
            max_selected_options: 3
        });
    }
}