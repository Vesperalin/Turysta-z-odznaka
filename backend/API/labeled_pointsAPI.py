from flask import Flask, request
from flask.blueprints import Blueprint
from services.labeled_point_services import delete_labeled_point, get_labeled_points, get_labeled_points_like, get_labeled_point, update_labeled_point, add_labeled_point

router = Blueprint('labeled-points', __name__)

from app import auto

@router.route('', methods=['GET'])
@auto.doc(groups=['labeled-point'])
def get_points():
    """
    Returns all labeled points.
    Returns data in format: result, status code:
    - on success: array of labeled points (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503"""
    return get_labeled_points()

@router.route('/like/', methods=['GET'])
@auto.doc(groups=['labeled-point'])
def get_all_points():
    """
    Returns all labeled points. Catches requests: /like/<string:like> where argument is empty.
    Returns data in format: result, status code:
    - on success: array of labeled points (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503"""
    return get_labeled_points()

@router.route('/like/<string:like>', methods=['GET'])
@auto.doc(groups=['labeled-point'])
def get_points_like(like):
    """
    Returns labeled points that contains given phrase.
    Returns data in format: result, status code:
    - on success: array of labeled points (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503"""
    return get_labeled_points_like(like)

@router.route('/<int:id>', methods=['GET'])
@auto.doc(groups=['labeled-point'])
def get_point(id):
    """
    Returns labeled point with specified id.
    Returns data in format: result, status code:
    - on success: labeled point (in JSON format), 200
    - when point with id not exists: {"message": "Punkt o wybranej nazwie nie istnieje"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503"""
    return get_labeled_point(id)

@router.route('', methods=['POST'])
@auto.doc(groups=['labeled-point'])
def add_point():
    """
    Adds new labeled point.
    Request body is a labeled point (in JSON format):
    Example:
    {
        "name": "Bukowe Berdo",
        "height": null
    }
    Returns data in format: result, status code:
    - on success: {"message": "Punkt został pomyślnie dodany"}, 200
    - when height is not correct: {"message": "Niepoprawna wartość wysokości"}, 400
    - when name is not unique: {"message": "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503"""
    return add_labeled_point()

@router.route('/<int:id>', methods=['PUT'])
@auto.doc(groups=['labeled-point'])
def update_point(id):
    """
    Updates labeled point with specified id.
    Request body is a labeled point (in JSON format):
    Example:
    {
        "name": "Bukowe Berdo",
        "height": null
    }
    Returns data in format: result, status code:
    - on success: {"message": "Punkt został pomyślnie edytowany"}, 200
    - when point with id not exists: {"message": "Punkt o wybranej nazwie nie istnieje"}, 400
    - when point is used in segments and can't be edited: {"message": "Punkt jest już używany w odcinkach. Nie można go edytować"}, 400
    - when point with specified name already exists: {"message": "Punkt o takiej nazwie już istnieje. Wybierz inną nazwę"}, 400
    - when height is not correct: {"message": "Niepoprawna wartość wysokości"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503"""
    return update_labeled_point(id)

@router.route('/<int:id>', methods=['DELETE'])
@auto.doc(groups=['labeled-point'])
def delete_point(id):
    """
    Deletes labeled point with specified id.
    Returns data in format: result, status code:
    - on success: {"message": "Punkt został pomyślnie usunięty"}, 200
    - when point is used in segments and can't be removed: {"message": "Punkt jest już używany w odcinkach. Nie można go usuwać"}, 400
    - when point with id not exists: {"message": "Punkt o wybranej nazwie nie istnieje"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503"""
    return delete_labeled_point(id)

@router.route('/labele-point-API')
def documentation():
    return auto.html(groups=['labeled-point'],
                    template='documentation_template.html', 
                    title='Documentation for labeld points API',
                    author='Klaudia Błażyczek',)
