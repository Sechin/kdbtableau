<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="kdb-tableau" content="{{ content }}">
    <title>{{ title }}</title>

    <!--  Load vendors js -->
    <script src="/static/vendors/jquery/dist/jquery.min.js"></script>
    % if js['chosen']:
    <script src="/static/vendors/chosen/chosen.jquery.min.js"></script>
    % end

    % if js['tableau']:
    <!--  Load Tableau js -->
    <script type="text/javascript" src="{{ tableau_url }}javascripts/api/tableau-2.js"></script>
    % end

    <!--  Load vendors css -->
    <link rel="stylesheet" href="/static/vendors/bootstrap/dist/css/bootstrap.min.css"/>
    % if js['jstree']:
    <link rel="stylesheet" href="/static/vendors/jstree/dist/themes/default/style.min.css"/>
    % end
    % if js['datatables']:
    <link rel="stylesheet" href="/static/vendors/dataTables/css/dataTables.bootstrap.min.css"/>
    % end
    % if js['chosen']:
    <link rel="stylesheet" href="/static/vendors/chosen/chosen.css"/>
    % end

    <!--  Load site css -->
    <link rel="stylesheet" href="/static/resources/css/site.css"/>
</head>
<body>
<!-- Nav Bar -->
% include('v2/navbar.tpl')

<!-- Main Page Body -->
{{!base}}

<!--  Load vendors js -->
<script src="/static/vendors/bootstrap/dist/js/bootstrap.min.js"></script>

% if js['jstree']:
<script src="/static/vendors/jstree/dist/jstree.js"></script>
% end
% if js['datatables']:
<script src="/static/vendors/dataTables/js/jquery.dataTables.min.js"></script>
<script src="/static/vendors/dataTables/js/dataTables.bootstrap.min.js"></script>
% end

<!--  Load site js -->
<script src="/static/resources/js/initsite.js"></script>
<script>
    siteCfg.init('{{local_url}}', '{{kdb_url}}', '{{tableau_url}}');
</script>
<script src="/static/resources/js/site.js"></script>

% if starter:
<script>
    {{starter}}
</script>
% end

</body>
</html>

