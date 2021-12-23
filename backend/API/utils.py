import re

def capitalize(data_dictionary):
    data_dictionary['name'] = data_dictionary['name'][0].upper() + data_dictionary['name'][1:].lower()