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
                //"icon" : "./images/country.png",
                //"valid_children" : ["field"]
            },
            "region": {
                //"icon" : "./images/region.png",
            },
            "city": {
                //"icon" : "./images/city.png",
            },
            "street": {
                //"icon" : "./images/street.png",
            },
            "building": {
                //"icon" : "./images/building.png",
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
    } else {
        if (viz.w) {
            viz.v.getWorkbook().changeParameterValueAsync("par1", id)
                .then(function () {
                    if (siteCfg.auto_refresh)
                        viz.v.refreshDataAsync();
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
            }
        };
        var el = document.getElementById(viz.o);
        var url = siteCfg.tableau_url + viz.p;
        viz.v = new tableau.Viz(el, url, options);
    } else {
        if (viz.w)
            viz.v.refreshDataAsync();
    }
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

$().ready(function () {
    initTree();
    getStatistics(t_panels.stat);
    addTabsEvents();
});
