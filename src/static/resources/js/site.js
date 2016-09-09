//var mapViz = undefined, mapSheet = undefined;
//var statViz = undefined, statSheet = undefined;

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
        $('#selected-node').text(data.node.text).attr('node_id', data.node.id);
        getSheet(data.node.id, t_panels.rtMap);
        $.each(t_panels, function (index, val) {
            if (val.hasOwnProperty("o")) {
                var s = $('#' + val.o);
                if (s.parents('#right-data-tabs').length && s.parent().hasClass('active'))
                    getSheet(data.node.id, val);
            }
        });
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
        var options = {
            hideTabs: true,
            hideToolbar: true,
            onFirstInteractive: function () {
                viz.w = true;
            }
        };
        var el = document.getElementById(viz.o);
        var url = siteCfg.tableau_url + viz.p + "&par1=" + id + datUrlPart(viz);
        viz.v = new tableau.Viz(el, url, options);
        viz.id = id;
    } else {
        if (viz.w) {
            viz.v.getWorkbook().changeParameterValueAsync("par1", id)
                .then(function () {
                    if (viz.id == id) {
                        viz.v.refreshDataAsync();
                    }
                    viz.id = id;
                })
                .otherwise(function (err) {
                    alert('Get data for ' + viz.o + ' failed: ' + err);
                });
        }
    }
}

function getStatistics(viz) {
    if (viz.v == undefined) {
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
                getData(viz);
            }
        };
        var el = document.getElementById(viz.o);
        var url = siteCfg.tableau_url + viz.p;
        viz.v = new tableau.Viz(el, url, options);
    } else {
        if (viz.w) {
            viz.v.refreshDataAsync()
                .then(function () {
                    getData(viz);
                });
        }
    }
}

function getData(viz) {
    var opt = {
        maxRows: 0,
        ignoreAliases: false,
        ignoreSelection: true,
        includeAllColumns: false
    };
    viz.s.getUnderlyingDataAsync(opt).then(function (t) {
        $("#" + viz.o + "2").html(getStatisticsHtml(t.getData()));
    });
}

function getStatisticsHtml(d) {
    var s = "<table class=\"table table-bordered table-p2\">";
    for (i = 0; i < d.length; i++) {
        s = s + "<tr><td>" + d[i][0].value + "</td><td>" + d[i][1].value + "</td></tr>";
    }
    s = s + "</table>";
    return s;
}

function addTabsEvents() {
    $.each(t_panels, function (index, val) {
        if (val.hasOwnProperty("o")) {
            var s = $('#' + val.o);
            if (s.parents('#right-data-tabs').length) {
                $("a[href='#sheet-" + val.o + "']").on('shown.bs.tab', function () {
                    getSheet(undefined, val);
                });
            }
        }
    });
}

function setAutoRefreshRt() {
    if (siteCfg.refresh.rt.id) {
        clearInterval(siteCfg.refresh.rt.id);
        siteCfg.refresh.rt.id = {};
    }
    if (siteCfg.refresh.rt.v > 0) {
        siteCfg.refresh.rt.id = setInterval(function () {
            getSheet(undefined, t_panels.rtMap);
            getSheet(undefined, t_panels.rtTab);
        }, siteCfg.refresh.rt.v);
    }
}

function setConnect() {
    $("#nav-connect").on("click", "a", null, function () {
        $.ajax({
            url: siteCfg.local_url + 'connect',
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        }).done(function (a) {
            alert(a);
        }).fail(function (err) {
            alert(err);
        });

        var iframe = $("#frameDemo");
        if (iframe) {
            document.getElementById('frameDemo').contentWindow.ff($("#connectinfo"));
        }

    });
}

function setAutoRefreshStat() {
    if (siteCfg.refresh.stat.id) {
        clearInterval(siteCfg.refresh.stat.id);
        siteCfg.refresh.stat.id = {};
    }
    if (siteCfg.refresh.stat.v > 0) {
        siteCfg.refresh.stat.id = setInterval(function () {
            getStatistics(t_panels.stat);
        }, siteCfg.refresh.stat.v);
    }
}

function setRefresh() {
    $("#nav-refresh").on("click", "a", null, function () {
        getStatistics(t_panels.stat);
        getSheet(undefined, t_panels.rtMap);
        getSheet(undefined, t_panels.rtTab);
    });
    setAutoRefreshStat();
    setAutoRefreshRt();
}


function signIn() {
    var SERVERURL = "217.12.204.182:8000";
    var USER = "ItlAdmin";
    var PASS = "TabKDB33itl";
    $('#frame')[0].contentWindow.postMessage
    (
        JSON.stringify
        (
            {
                "url": "http://" + SERVERURL + "/api/2.0/auth/signin",
                "dataType": "xml",
                "type": "POST",
                "data": "<tsRequest><credentials name=\"" + USER + "\" password=\"" + PASS + "\" ><site contentUrl=\"\" /></credentials></tsRequest>"
            }),
        "http://" + SERVERURL + "/"
    );
    // console.log($("#frame").contents().find('html'));
    window.addEventListener("message", receiveMessage, false);
    function receiveMessage(data, event) {
        //console.log(data.data);
        var xml = $.parseXML(data.data);
        var result = $(xml).find("credentials").attr('token');
        console.log(result);
        //$.cookie("X-tableau-auth", result);
        //document.cookie = "XSRF-TOKEN="+result;
    }
}



$().ready(function () {
    initTree();
    getStatistics(t_panels.stat);
    addTabsEvents();
    setRefresh();
    //signIn();
    //setConnect();
});
