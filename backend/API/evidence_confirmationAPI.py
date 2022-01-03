from flask import Flask
from flask.blueprints import Blueprint
from services.tour_creation_services import get_tourist_tours

router = Blueprint('evidence-confirmation', __name__)


@router.route('/tours', methods=['GET'])
def get_tour():
    return get_tourist_tours()

# FOR TEST ONLY
# @router.route('/tours', methods=['GET'])
# def get_tour():
    # return get_tours()
    