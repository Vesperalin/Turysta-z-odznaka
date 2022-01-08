from flask import Flask
from flask.blueprints import Blueprint
from services.evidence_confirmation_services import get_unconfirmed_tour_segments, add_evidences, get_tourist_tours

router = Blueprint('evidence-confirmation', __name__)


@router.route('/tours', methods=['GET'])
def get_tour():
    return get_tourist_tours()


@router.route('/segments/<int:id>', methods=['GET'])
def get_segments(id):
    return get_unconfirmed_tour_segments(id)


@router.route('/evidence', methods=['POST'])
def add_evidence():
    return add_evidences()