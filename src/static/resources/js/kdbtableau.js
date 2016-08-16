/**
 * Created by Oleksandr on 8/1/2016.
 */
var viz1=undefined,sheet1;

function getUnderlyingData(r){
    var tg=$("#dataTarget1");
    if(viz1==undefined) {
        var options = {
            hideTabs: true,
            hideToolbar: true,
            onFirstInteractive: function () {
                sheet1 = viz1.getWorkbook().getActiveSheet();
                getData(sheet1,tg);
            }
        };
        var el=document.getElementById("vizContainer1");
        var url=$("#url").val();   //="http://217.12.204.182:8000/#/views/JS_Fast/rtDataODBC?par1=12&:refresh=yes";
        viz1 = new tableau.Viz(el, url, options);
    }else{
        if(r)
            viz1.refreshDataAsync().then(function(){
                getData(sheet1,tg);
            });
        else
            getData(sheet1,tg);
    }
}

function getData(s,e){
    var options = {
        maxRows: 0, // Max rows to return. Use 0 to return all rows
        ignoreAliases: false,
        ignoreSelection: true,
        includeAllColumns: false
    };
    s.getUnderlyingDataAsync(options).then(function(t){
        e.html("<h4>Underlying Data:</h4><p>" + JSON.stringify(t.getData()) + "</p>");
    });
}

function getKDBData(url) {
    //var url="http://217.12.204.182:8082/hello/alex";
    $.ajax
    ({
        type: 'GET',
        url: url,
        async: true,
        useDefaultXhrHeader: false,
        success: function (d){
            $("#dataTarget3").html("<h4>KDB Data:</h4><p>" + JSON.stringify(d) + "</p>");
        },
        error: function (xhr, status, error) {
            var err = status + ", " + error;
            alert("Request Failed: " + err);
        }
    });
}
