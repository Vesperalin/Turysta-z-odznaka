from flask import Flask
from flask.blueprints import Blueprint
from services.tour_creation_services import get_tourist_tours
from models.tour_segment import Tour_segment
from serializers.tour_segment import Tour_segment_nestedSchema

router = Blueprint('evidence-confirmation', __name__)



@router.route('/tours', methods=['GET'])
def get_tour():
    return get_tourist_tours()


@router.route('/segments/<int:id>')
def get_segments(id):
    tour = Tour_segment.query.get(id)
    return Tour_segment_nestedSchema().dump(tour)


# FOR TEST ONLY
# @router.route('/tours', methods=['GET'])
# def get_tour():
    # return get_tours()
    