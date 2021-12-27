import re

POINT_NOT_AVAILABLE = 'Punkt o wybranej nazwie nie istnieje'
POINT_IN_USAGE_EDIT = 'Punkt jest już używany w odcinkach. Nie można go edytować'
POINT_IN_USAGE_DELETE = 'Punkt jest już używany w odcinkach. Nie można go usuwać'
POINT_DO_NOT_BELONGS_TO_USER = 'Punkt nie należy do tego użytkownika'
NAME_OF_POINT_ALREADY_EXIST = 'Punkt o takiej nazwie już istnieje. Wybierz inną nazwę'
COORDINATES_OF_POINT_NOT_UNIQUE = 'Punkt z podanymi wspołrzędnymi geograficznymi już istnieje'
POINT_DELETED = 'Punkt został pomyślnie usunięty'
POINT_EDITED = 'Punkt został pomyślnie edytowany'
LONGITUDE_NOT_CORRECT = 'Niepoprawne dane. Długość geograficzna musi być liczbą rzeczywistą'
LATITUDE_NOT_CORRECT = 'Niepoprawne dane. Szerokość geograficzna musi być liczbą rzeczywistą'
HEIGHT_NOT_CORRECT = 'Niepoprawna wartość wysokości'


def capitalize(name):
    return name[0].upper() + name[1:].lower()