<nav class="navbar navbar-inverse navbar-static-top main-menu-bar" role="navigation">
    <a class="navbar-brand" href="#">{{ title }}</a>

    <div class="container search-container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li class="">
                    <a href="{{ tableau_url }}#/workbooks/39/views">Tableau</a>
                </li>
                <li id="nav-refresh" class="">
                    <a href="#">Refresh</a>
                </li>
                %if main_menu['main']:
                <li class="">
                    <a href="{{ local_url }}">Home</a>
                </li>
                %end
            </ul>
        </div>
    </div>
</nav>