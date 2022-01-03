from flask import Flask
from flask.blueprints import Blueprint
from services.tour_creation_services import get_tourist_tours
from services.evidence_confirmation_services import get_tour_segments

router = Blueprint('evidence-confirmation', __name__)



@router.route('/tours', methods=['GET'])
def get_tour():
    return get_tourist_tours()


@router.route('/segments/<int:id>')
def get_segments(id):
    return get_tour_segments(id)
