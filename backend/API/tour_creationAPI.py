from flask import Flask
from flask.blueprints import Blueprint
from services.tour_creation_services import get_labeled_segments
from services.labeled_point_services import get_labeled_point

router = Blueprint('tour-creation', __name__)


@router.route('/labeled-segments', methods=['GET'])
def get_segments():
    return get_labeled_segments()


@router.route('/labeled-points/<int:id>', methods=['GET'])
def get_point(id):
    return get_labeled_point(id)
