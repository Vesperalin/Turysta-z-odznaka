from flask import Flask
from flask.blueprints import Blueprint
from services.evidence_confirmation_services import get_unreported_tour_segments, add_evidences, get_tourist_tours, check_if_guide_exists

router = Blueprint('evidence-confirmation', __name__)

from app import auto

@router.route('/tours', methods=['GET'])
@auto.doc(groups=['evidence-confirmation'])
def get_tour():
    """
    Returns all user tours.
    Returns data in format: result, status code:
    - on success: array of user tours (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return get_tourist_tours()


@router.route('/segments/<int:tour_id>', methods=['GET'])
@auto.doc(groups=['evidence-confirmation'])
def get_segments(tour_id):
    """
    Returns all unreported tour segments with specified tour id.
    Returns data in format: result, status code:
    - on success: array of unreported tour segments (in JSON format), 200
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return get_unreported_tour_segments(tour_id)


@router.route('/evidence', methods=['POST'])
@auto.doc(groups=['evidence-confirmation'])
def add_evidence():

    return add_evidences()


@router.route('/guide/<int:id_guide>', methods=['GET'])
@auto.doc(groups=['evidence-confirmation'])
def check_guide(id_guide):
    """
    Checks if a guide with given id number exists.
    Returns data in format: result, status code:
    - on success: {"message": "OK"}, 200
    - when guide with specified id number not exist: {"message": "Przewodnik o podanym numerze legitymacji nie istnieje"}, 404
    - when database error occurs: {"message": "Brak połączenia z bazą danych"}, 503
    """
    return check_if_guide_exists(id_guide)