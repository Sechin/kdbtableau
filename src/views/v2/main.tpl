<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="kdb-tableau-energy" content="KDB Tableau Technology Demonstration Project">
    <title>Tableau KDB Energy</title>
    <script src="/static/vendors/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="/static/resources/js/kdbtableau.js"></script>
    <script type="text/javascript" src="{{ tableau_url }}javascripts/api/tableau-2.js"></script>
    <link rel="stylesheet" href="/static/vendors/bootstrap/dist/css/bootstrap.css"/>
    <link rel="stylesheet" href="/static/vendors/jstree/dist/themes/default/style.min.css"/>
    <link rel="stylesheet" href="/static/resources/css/site.css"/>
</head>
<body>



<nav class="navbar navbar-inverse navbar-static-top main-menu-bar" role="navigation">
    <a class="navbar-brand" href="#">Tableau KDB Energy</a>
    <div class="container search-container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li class="">
                    <a href="{{ tableau_url }}#/workbooks/39/views">Tableau</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3">
            <div id="left-tree"></div>
        </div>
        <div class="col-sm-9">
            <div class="row">
                <div class="col-sm-9">
                    <h4 id="selected-node"><< Please, select a consumer</h4>
                    <div id="right-map"></div>
                </div>
                <div class="col-sm-3">
                    <h4>System Statistics</h4>

                    <div id="statistic-form"></div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div id="right-data-tabs" class="container nopadding">
                        <ul class="nav nav-pills">
                            <li class="active">
                                <a href="#sheet-rt-tab" data-toggle="tab">Current Data</a>
                            </li>
                            <li><a href="#sheet-rt-chart" data-toggle="tab">Current Chart</a>
                            </li>
                            <li><a href="#sheet-ar-tab" data-toggle="tab">Archive Data</a>
                            </li>
                            <li><a href="#sheet-ar-chart" data-toggle="tab">Archive Chart</a>
                            </li>
                        </ul>

                        <div class="tab-content clearfix">
                            <div class="tab-pane active" id="sheet-rt-tab">
                                <div id="right-rt-tab"></div>
                            </div>
                            <div class="tab-pane" id="sheet-rt-chart">
                                <div id="right-rt-chart"></div>
                            </div>
                            <div class="tab-pane" id="sheet-ar-tab">
                                <div id="right-ar-tab"></div>
                            </div>
                            <div class="tab-pane" id="sheet-ar-chart">
                                <div id="right-ar-chart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/static/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/static/vendors/jstree/dist/jstree.js"></script>

<script src="/static/resources/js/initsite.js"></script>
<script>
    siteCfg.init('{{local_url}}', '{{kdb_url}}', '{{tableau_url}}');
</script>
<script src="/static/resources/js/site.js"></script>


</body>
</html>

