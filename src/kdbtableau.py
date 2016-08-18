__author__ = 'Oleksandr'

import urllib
from bottle import route, run, template, static_file
from settings import server, app

def get_request(url):
    response = urllib.urlopen(url)
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
                        {'kdb_url': app['local'], 'tableau_url': app['tableau'], 'local_url': app['local']})
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


# get Consumers Tree
def get_consumer(id):
    return get_request(app['kdb'] + '.tableau.getconsumers[' + id + ']');


@route('/consumers/', method='GET')
def consumers():
    return get_consumer('-1')


@route('/consumers/<id>', method='GET')
def consumers(id):
    if (id == '' or id == '#'):
        id = '-1'
    return get_consumer(id)

run(host=server['host'], port=server['port'])
# print get_request('http://'+hostname+':'+str(port)+'/kdb/')