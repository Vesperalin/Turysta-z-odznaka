from flask import Flask
from flask.blueprints import Blueprint
from services.own_points_services import get_own_points, get_own_points_like, get_own_point, add_own_point, update_own_point, delete_own_point

router = Blueprint('own-points', __name__)

from app import auto


@router.route('', methods=['GET'])
@auto.doc(groups=['own-point'])
def get_points():
    """
    Returns all user own points.
    Returns data in format: result, status code:
    - on success: array of own points (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return get_own_points()


@router.route('/like/', methods=['GET'])
@auto.doc(groups=['own-point'])
def get_all_points():
    """
    Returns all user own points. Catches requests: own-points/like/<string:like> where argument "like" is empty.
    Returns data in format: result, status code:
    - on success: array of own points (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return get_own_points()


@router.route('/like/<string:like>', methods=['GET'])
@auto.doc(groups=['own-point'])
def get_points_like(like):
    """
    Returns user own points that contains given phrase.
    Returns data in format: result, status code:
    - on success: array of own points (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return get_own_points_like(like)


@router.route('/<int:id>', methods=['GET'])
@auto.doc(groups=['own-point'])
def get_point(id):
    """
    Returns user own point with specified id.
    Returns data in format: result, status code:
    - on success: own point (in JSON format), 200
    - when requested point do not belongs to user: {"message": "Punkt nie należy do tego użytkownika"}, 400
    - when point with id not exists: {"message": "Punkt o wybranej nazwie nie istnieje"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return get_own_point(id)


@router.route('', methods=['POST'])
@auto.doc(groups=['own-point'])
def add_point():
    """
    Adds new own point.
    Request body is an own point (in JSON format):
    Example:
    {
        "name": "Klimczok Skała",
        "longitude": 49.357236,
        "latitude": 26.832768
    }
    Returns data in format: result, status code:
    - on success: {"message": "Punkt został pomyślnie dodany"}, 200
    - when latitude is not correct: {"message": "Niepoprawne dane. Szerokość geograficzna musi być liczbą rzeczywistą"}, 400
    - when longitude is not correct: {"message": "Niepoprawne dane. Długość geograficzna musi być liczbą rzeczywistą"}, 400
    - when name is not unique: {"message": "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"}, 400
    - when coordinates are not unique: {"message": "Punkt z podanymi wspołrzędnymi geograficznymi już istnieje"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return add_own_point()


@router.route('/<int:id>', methods=['PUT'])
@auto.doc(groups=['own-point'])
def update_point(id):
    """
    Updates own point with specified id.
    Request body is an own point (in JSON format):
    Example:
    {
        "name": "Klimczok Skała",
        "longitude": 49.357236,
        "latitude": 26.832768
    }
    Returns data in format: result, status code:
    - on success: {"message": "Punkt został pomyślnie edytowany"}, 200
    - when point with id not exists: {"message": "Punkt o wybranej nazwie nie istnieje"}, 400
    - when requested point do not belongs to user: {"message": "Punkt nie należy do tego użytkownika"}, 400
    - when point is used in segments and can't be edited: {"message": "Punkt jest już używany w odcinkach. Nie można go edytować"}, 400
    - when point with specified name already exists: {"message": "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"}, 400
    - when point with specified coordinates already exists: {"message": "Punkt z podanymi wspołrzędnymi geograficznymi już istnieje"}, 400
    - when latitude is not correct: {"message": "Niepoprawne dane. Szerokość geograficzna musi być liczbą rzeczywistą"}, 400
    - when longitude is not correct: {"message": "Niepoprawne dane. Długość geograficzna musi być liczbą rzeczywistą"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return update_own_point(id)


@router.route('/<int:id>', methods=['DELETE'])
@auto.doc(groups=['own-point'])
def delete_point(id):
    """
    Deletes own point with specified id.
    Returns data in format: result, status code:
    - on success: {"message": "Punkt został pomyślnie usunięty"}, 200
    - when point is used in segments and can't be removed: {"message": "Punkt jest już używany w odcinkach. Nie można go usuwać"}, 400
    - when point with id not exists: {"message": "Punkt o wybranej nazwie nie istnieje"}, 400
    - when requested point do not belongs to user: {"message": "Punkt nie należy do tego użytkownika"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return delete_own_point(id)


@router.route('/API')
def documentation():
    return auto.html(groups=['own-point'],
                     template='documentation_template.html',
                     title='Documentation for own points API',
                     author='Justyna Małuszyńska',)