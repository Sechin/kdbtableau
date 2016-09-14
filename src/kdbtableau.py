__author__ = 'Oleksandr'

import sys

if sys.version_info < (3, 0):
    from utl2 import get_request
else:
    from utl3 import get_request

import logging
import requests

from bottle import route, run, template, static_file, default_app
from settings import server, app


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


@route('/connect', method='GET')
def kdb_connect():
    return get_request(app['tableau'] + 'webdataconnectors/mw.html')

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


@route('/getticket/', method='GET')
def get_ticket():
    r = requests.post(app['tableau'] + 'trusted/', data={'username': app['tableauuser']},
                      headers={"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"})

    if r.status_code == 200:
        if r.text != '-1':
            ticketID = str(r.text)
            logging.debug('TicketID=' + ticketID)
            return ticketID
        else:
            logging.error("Error, something with connection")
    else:
        logging.error('Could not get trusted ticket with status code:' + str(r.status_code))
    return "#"


# Runner
logging.basicConfig(filename=server['logFile'], level=server['logLevel'])

if server['service']:
    if __name__ == '__main__':
        run(host=server['ihost'], port=server['iport'], reloader=server['reloader'], debug=server['bottleDebug'])
    extApp = default_app()
else:
    run(host=server['ihost'], port=server['iport'], reloader=server['reloader'], debug=server['bottleDebug'])
