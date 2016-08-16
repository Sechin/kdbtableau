<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="kdb-tableau" content="kdb-tableau example">
    <title>KDB JSON API</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script type="text/javascript" src="{{tableau_url}}javascripts/api/tableau-2.js"></script>
    <script type="text/javascript" src="/static/resources/js/kdbtableau.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>
<body>



<nav class="navbar navbar-inverse navbar-static-top main-menu-bar" role="navigation">
    <a class="navbar-brand" href="#">KDB JSON API Example</a>
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
                <li id="id-get-data-kdb">
                    <a href="#" onclick="getKDBData('{{kdb_url}}'+$('#kdb-query').val())">Get KDB Data</a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="">
                    <a href="{{local_url}}odbc/">Tableau KDB(ODBC)</a>
                </li>
                <li class="">
                    <a href="{{local_url}}pg/">Tableau KDB(Postgres)</a>
                </li>
                <li class="hidden">
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
        <div class="col-sm-12">KDB query: <input type="text" id="kdb-query" class="form-control" value=".tableau.getrtdata[12]"/></div>
    </div>
<div class="row">
    <div class="col-sm-12" id="dataTarget3"></div>
</div>
</div>


<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

</body>
</html>

