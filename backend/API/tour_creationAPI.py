from flask import Flask
from flask.blueprints import Blueprint
from services.tour_creation_services import get_labeled_segments, get_if_tour_name_unique, add_tour_and_tour_segments

router = Blueprint('tour-creation', __name__)

from app import auto


@router.route('/labeled-segments', methods=['GET'])
@auto.doc(groups=['tour-creation'])
def get_segments():
    """
    Returns all labeled segments.
    Returns data in format: result, status code:
    - on success: array of labeled segments (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return get_labeled_segments()

@router.route('/check-name', methods=['POST'])
@auto.doc(groups=['tour-creation'])
def get_if_name_unique():
    """
    Returns information if user has a tour with given name.
    Request body is a name of tour that is to be checked (in JSON format):
    Example:
    {
        "name": "Bieszczady 2022"
    }
    Returns data in format: result, status code:
    - on success: True (in JSON format), 200
    - when user has a tour with the name: {"message": "Trasa o wybranej nazwie już istnieje. Wybierz inną nazwę"}, 400
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return get_if_tour_name_unique()

@router.route('/tour', methods=['POST'])
@auto.doc(groups=['tour-creation'])
def add_tour():
    """
    Adds new tour and its tour segments.
    NOTE: doesn't check if segments contiguous in points - that should provided by endpoint user
    Request body consist of: name of the tour, amount of GOT points and array of segments (in JSON format):
    Example:
    {
    "name": "Bieszczady 2022",
    "points": 8,
    "segments": 
        [
            {
                "closed_segments": [],
                "color": "niebieski",
                "end_point_id": 43,
                "id": 10,
                "is_bidirectional": true,
                "liquidated_segment": null,
                "mountain_group_id": 1,
                "points": 7,
                "start_point_id": 12,
                "through": null
            },
            {
                "closed_segments": [],
                "color": "niebieski",
                "end_point_id": 44,
                "id": 13,
                "is_bidirectional": true,
                "liquidated_segment": null,
                "mountain_group_id": 1,
                "points": 1,
                "start_point_id": 43,
                "through": null
            }
        ]
    }
    Returns data in format: result, status code:
    - on success: array of created tour segments (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return add_tour_and_tour_segments()

@router.route('/tour-creation-API')
def documentation():
    return auto.html(groups=['tour-creation'],
                     template='documentation_template.html',
                     title='Documentation for tour creation API',
                     author='Klaudia Błażyczek',)
