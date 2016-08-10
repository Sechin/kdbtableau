__author__ = 'Oleksandr'

server = dict(
    host='localhost',
    # hostname = '192.168.186.175'
    port=8082
)

app = dict(
    path='C:\saa\python\kdbtableau\src',
    local='http://'+server['host']+':'+str(server['port'])+'/',
    kdb='http://192.168.161.208:5000/',
    tableau='http://192.168.204.182:8000/'
)
