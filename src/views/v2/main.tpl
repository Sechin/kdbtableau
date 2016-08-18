<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="kdb-tableau-energy" version="2.0" content="KDB Tableau Technology Demonstration Project">
    <title>Tableau KDB Energy</title>
    <script src="/static/vendors/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="/static/resources/js/kdbtableau.js"></script>
    <script type="text/javascript" src="{{ tableau_url }}javascripts/api/tableau-2.js"></script>
    <link rel="stylesheet" href="/static/vendors/bootstrap/dist/css/bootstrap.min.css"/>
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
                    <a href="{{tableau_url}}#/workbooks/34/views">Tableau</a>
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
            <div id="left-tree">left-tree</div>
            <div id="left-statistic-form" style="width:200px; height:300px;">left-statistic-form</div>
        </div>
        <div class="col-sm-9">
            <h4 id="selected-node"></h4>

            <div id="right-map" style="width:800px; height:400px; ">right-map</div>
            <div id="right-data-form">right-data-form</div>
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

