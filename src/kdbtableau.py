__author__ = 'Oleksandr'

import urllib
from bottle import route, run, template, static_file
from settings import server, app

def get_request(url):
    response = urllib.urlopen(url)
    #data = json.loads(response.read())
    #return data
    #response.headers['Access-Control-Allow-Origin'] = '*'
    #response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    #response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
    return response.read()

@route('/odbc/', method='GET')
def odbc():
    return template("odbc",{'kdb_url': app['local']+'kdb/','tableau_url':app['tableau'],'local_url':app['local']})

@route('/pg/', method='GET')
def pg():
    return template("pg",{'kdb_url': app['local']+'kdb/','tableau_url':app['tableau'],'local_url':app['local']})

@route('/' , method='GET')
def js():
    if (app['version'] == 2):
        return template("v2/main",
                        {'kdb_url': app['local'] + 'kdb/', 'tableau_url': app['tableau'], 'local_url': app['local']})
    else:
        return template("js",
                        {'kdb_url': app['local'] + 'kdb/', 'tableau_url': app['tableau'], 'local_url': app['local']})


@route('/kdb/<query>', method='GET')
def kdb_index(query):
    return get_request(app['kdb']+query)

# Static Routes
@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root=app['path']+'/static')


run(host=server['host'], port=server['port'])
# print get_request('http://'+hostname+':'+str(port)+'/kdb/')