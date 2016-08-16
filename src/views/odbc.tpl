<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="kdb-tableau" content="kdb-tableau example">
    <title>KDB Tableau</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type="text/javascript" src="{{tableau_url}}javascripts/api/tableau-2.js"></script>
    <script type="text/javascript" src="/static/resources/js/kdbtableau.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>
<body>



<nav class="navbar navbar-inverse navbar-static-top main-menu-bar" role="navigation">
    <a class="navbar-brand" href="#">Tableau ODBC-KDB Example</a>
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
            <ul class="nav navbar-nav">
                <li id="id-get-data">
                    <a href="#" onclick="getUnderlyingData(false)">Get Tableau Data</a>
                </li>
                <li id="id-get-data-refresh">
                    <a href="#" onclick="getUnderlyingData(true)">Get Tableau-KDB(ODBC) Data</a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="hidden">
                    <a href="{{local_url}}odbc/">Tableau KDB(ODBC)</a>
                </li>
                <li class="">
                    <a href="{{local_url}}pg/">Tableau KDB(Postgres)</a>
                </li>
                <li class="">
                    <a href="{{local_url}}">KDB JSON</a>
                </li>
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
        <div class="col-sm-6">URL: <input type="text" id="url" class="form-control" value="{{tableau_url}}#/views/JS_Fast/rtDataODBC?par1=12&:refresh=yes"/></div>
    </div>
    <div class="row">
        <div class="col-sm-6">Tableau object</div>
        <div class="col-sm-6">Tableau Data</div>
    </div>
    <div class="row">
        <div class="col-sm-6" style="width:800px; height:400px; " id="vizContainer1"></div>
        <div class="col-sm-6" id="dataTarget1"></div>
    </div>
</div>


<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

</body>
</html>

