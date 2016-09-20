__author__ = 'Oleksandr'

import sys

if sys.version_info < (3, 0):
    from utl2 import get_request
else:
    from utl3 import get_request
from utlcommon import get_ticket


import logging
from bottle import route, run, template, static_file, default_app
from settings import server, app


def def_page_info():
    return {'title': '', 'content': 'KDB Tableau Technology Demonstration Project', 'starter': '',
            'kdb_url': app['local'], 'tableau_url': app['tableau'], 'local_url': app['local'],
            'js': {'tableau': False, 'jstree': False, 'datatables': False, 'chosen': False},
            'main_menu': {'main': True}}

@route('/odbc/', method='GET')
def odbc():
    return template("odbc",{'kdb_url': app['local']+'kdb/','tableau_url':app['tableau'],'local_url':app['local']})

@route('/pg/', method='GET')
def pg():
    return template("pg",{'kdb_url': app['local']+'kdb/','tableau_url':app['tableau'],'local_url':app['local']})


@route('/', method='GET')
def js():
    if (app['version'] == 2):
        info = def_page_info()
        info.update({'title': 'Tableau KDB',
                     'content': 'KDB Tableau Technology Demonstration Project'})
        info['main_menu'].update({'main': False})
        return template("v2/startup", info)
    else:
        return template("js",
                        {'kdb_url': app['local'] + 'kdb/', 'tableau_url': app['tableau'], 'local_url': app['local']})


@route('/app/energy/', method='GET')
def energy():
    info = def_page_info()
    info.update({'title': 'Tableau KDB Energy',
                 'starter': 'pageStarter.energyReady()'})
    info['js'].update({'tableau': True, 'jstree': True, 'datatables': True})
    return template("v2/energy", info)


@route('/app/finance/', method='GET')
def finance():
    info = def_page_info()
    info.update({'title': 'Tableau KDB Finance',
                 'starter': 'pageStarter.financeReady()'})
    info['js'].update({'tableau': True, 'chosen': True})
    return template("v2/finance", info)


@route('/kdb/<query>', method='GET')
def kdb_index(query):
    return get_request(app['kdb']+query)

# Static Routes
@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root=app['path']+'/static')


# get Consumers Tree
def get_consumer(id):
    return get_request(app['kdb'] + '.tableau.getconsumers[' + id + ']')


@route('/consumers/', method='GET')
def consumers():
    return get_consumer('-1')


@route('/consumers/<id>', method='GET')
def consumers(id):
    if (id == '' or id == '#'):
        id = '-1'
    return get_consumer(id)


@route('/getticket/', method='GET')
def ticket():
    return get_ticket(app['tableau'] + 'trusted/', app['tableauuser'])

# Runner
logging.basicConfig(filename=server['logFile'], level=server['logLevel'])

if server['service']:
    if __name__ == '__main__':
        run(host=server['ihost'], port=server['iport'], reloader=server['reloader'], debug=server['bottleDebug'])
    extApp = default_app()
else:
    run(host=server['ihost'], port=server['iport'], reloader=server['reloader'], debug=server['bottleDebug'])
