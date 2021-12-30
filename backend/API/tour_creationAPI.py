from flask import Flask
from flask.blueprints import Blueprint
from services.tour_creation_services import get_labeled_segments

router = Blueprint('tour-creation', __name__)


@router.route('/labeled-segments', methods=['GET'])
def get_segments():
    return get_labeled_segments()
