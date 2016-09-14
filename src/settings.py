__author__ = 'Oleksandr'

server = dict(
    # external address
    host='192.168.186.175',
    port=8082,
    # internal address
    ihost='192.168.186.175',
    iport=8082,
    service=False,  # run as service
    reloader=True,  # Auto Reload Files for Development Configuration
    bottleDebug=False,  # Run Bottle in debug mode
    logFile='',
    logLevel=0  # Logging level (notset:0, debug: 10,info: 20,warning: 30,error: 40,critical:50)
)

app = dict(
    path='C:\saa\python\kdbtableau\src',
    local='http://'+server['host']+':'+str(server['port'])+'/',
    kdb='http://107.181.161.208:5000/',
    tableau='http://217.12.204.182:8000/',
    tableauuser='demo',
    version=2
)
