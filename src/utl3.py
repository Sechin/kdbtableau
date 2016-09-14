__author__ = 'Oleksandr'

from urllib.parse import urlparse
import socket
import sys
import logging


def get_request(url):
    try:
        logging.debug('GET start for ' + url + '...')
        urlObj = urlparse(url, 'http')
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((urlObj.hostname, urlObj.port))
        s.send(("GET %s HTTP/1.0\r\nHost: %s\r\n\r\n" % (urlObj.path, urlObj.hostname)).encode())

        response = b""
        logging.debug('Start receiving...')
        data = s.recv(1024)
        while len(data):
            response = response + data
            data = s.recv(1024)
        logging.debug('Received OK')
        s.shutdown(1)
        s.close()
        logging.debug('GET OK')
        return response
    except:
        logging.error(sys.exc_info())
        return b"[]"