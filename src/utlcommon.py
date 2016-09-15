__author__ = 'Oleksandr'

import logging
import requests


def get_ticket(host, user):
    r = requests.post(host, data={'username': user},
                      headers={"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"})
    if r.status_code == 200:
        if r.text != '-1':
            ticket_id = str(r.text)
            logging.debug('TicketID=' + ticket_id)
            return ticket_id
        else:
            logging.error("Error, something with connection")
    else:
        logging.error('Could not get trusted ticket with status code:' + str(r.status_code))
    return "#"
