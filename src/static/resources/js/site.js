var mapViz = undefined, mapSheet = undefined;
var statViz = undefined, statSheet = undefined;

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
                        console.log("Open available fields tree: ", a);
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
        $('#selected-node').text(data.node.text);
        getMap(data.node.id);
    });
}

function getMap(id) {
    if (mapViz == undefined) {
        var options = {
            hideTabs: true,
            hideToolbar: true,
            onFirstInteractive: function () {
                mapSheet = mapViz.getWorkbook().getActiveSheet();
            }
        };
        var el = document.getElementById("right-map");
        var url = siteCfg.tableau_url + siteCfg.tableau.map_path + "&par1=" + id;
        mapViz = new tableau.Viz(el, url, options);
    } else {
        //TODO Change parameter in mapViz to id
        mapViz.refreshDataAsync();
    }
}

function getStatistics() {
    if (statViz == undefined) {
        var options = {
            hideTabs: true,
            hideToolbar: true,
            onFirstInteractive: function () {
                statSheet = statViz.getWorkbook().getActiveSheet();
            }
        };
        var el = document.getElementById("left-statistic-form");
        var url = siteCfg.tableau_url + siteCfg.tableau.statistics_path;
        statViz = new tableau.Viz(el, url, options);
    } else {
        statViz.refreshDataAsync();
    }
}

$().ready(function () {
    initTree();
    getStatistics();
});
