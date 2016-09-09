__author__ = 'Oleksandr'

import logging
from urllib import urlopen


def get_request(url):
    try:
        logging.debug('GET start for ' + url + '...')
        response = urlopen(url)
        return response.read()
    except:
        logging.error(sys.exc_info())
        return b"[]"