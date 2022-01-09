from flask import Flask
from flask.blueprints import Blueprint
from services.tour_creation_services import get_labeled_segments, get_if_tour_name_unique, add_tour_and_tour_segments
from services.labeled_point_services import get_labeled_point

router = Blueprint('tour-creation', __name__)

from app import auto


@router.route('/labeled-segments', methods=['GET'])
@auto.doc()
def get_segments():
    return get_labeled_segments()

@router.route('/labeled-points/<int:id>', methods=['GET'])
@auto.doc()
def get_point(id):
    return get_labeled_point(id)

@router.route('/check-name', methods=['POST'])
@auto.doc()
def get_if_name_unique():
    return get_if_tour_name_unique()

@router.route('/tour', methods=['POST'])
@auto.doc()
def add_tour():
    return add_tour_and_tour_segments()

@router.route('/tour-creation-API')
def documentation():
    return auto.html(template='documentation_template.html', 
                     title='Documentation for tour creation API',
                     author='Klaudia Błażyczek',)
    