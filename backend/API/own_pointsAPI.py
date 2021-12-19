from flask import Flask, request
from flask.json import jsonify
from flask.blueprints import Blueprint
from models.own_point import Own_point
from models.tourist import Tourist
from serializers.own_point import Own_pointSchema
from serializers.tourist import TouristSchema


own_point_schema = Own_pointSchema()
tourist_schema = TouristSchema()

# Simplification
username = "maniek"

router = Blueprint('own-points', __name__)


@router.route('', methods=['GET'])
def get_own_points():
    all_own_points = Own_point.query.filter_by(tourist_username=username).all()
    return own_point_schema.jsonify(all_own_points, many=True), 200


@router.route('/like/<string:like>', methods=['GET'])
def get_own_points_like(like):
    return own_point_schema.jsonify(Own_point.query.filter(Own_point.name.like("%{}%".format(like)), Own_point.tourist_username.like(username)), many=True), 200


"""
Needs to be checked (based on mockups):
- if requested point exist (DONE)
- 
"""


@router.route('/<int:id>', methods=['GET'])
def get_own_point(id):
    own_point = Own_point.query.get(id)

    if not own_point:
        return {'message': 'Requested own point not available'}, 404

    return own_point_schema.jsonify(own_point), 200


"""
Needs to be checked (based on mockups):
- if name is unique (done)
- if (latitude + longitude) is unique (done)
- if latitude and longitude are correct datatypes (done)
"""


@router.route('', methods=['POST'])
def add_own_point():
    own_point_dictionary = request.get_json()

    is_name_unique = check_if_name_unique(own_point_dictionary['name'])
    if(isinstance(own_point_dictionary['latitude'], float) and isinstance(own_point_dictionary['longitude'], float)):
        are_coordinates_unique = check_if_unique(
            own_point_dictionary['latitude'], own_point_dictionary['longitude'])
    else:
        return {'message': 'Coordinates are not correct datatypes'}, 404

    if(is_name_unique):
        if(are_coordinates_unique):
            own_point = own_point_schema.load(own_point_dictionary)
            own_point.save()
            return own_point_schema.jsonify(own_point), 200
        else:
            return {'message': 'Coordinates of point are not unique'}, 404
    else:
        return {'message': 'Name of point is not unique'}, 404


"""
Needs to be checked (based on mockups):
- if requested point exist
- if requested point is in usage
- if new name is unique
- if new (latitude + longitude) is unique
- if new latitude and new longitude are correct datatypes
"""


@router.route('/<int:id>', methods=['PUT'])
def update_own_point(id):
    existing_own_point = Own_point.query.get(id)

    own_point = own_point_schema.load(
        request.get_json(), instance=existing_own_point, partial=True)

    own_point.save()
    return own_point_schema.jsonify(own_point), 200


"""
Needs to be checked (based on mockups):
- if requested point exist
- if requested point is in usage
"""


@router.route('/<int:id>', methods=['DELETE'])
def delete_own_point(id):
    own_point = Own_point.query.get(id)
    own_point.remove()
    return own_point_schema.jsonify(own_point)


def check_if_name_unique(name: str):
    own_point = Own_point.query.filter(Own_point.tourist_username.like(
        username), Own_point.name.like(name)).first()

    if not own_point:
        return True

    return False


def check_if_unique(latitude: float, longitude: float):
    own_point = Own_point.query.filter(Own_point.tourist_username.like(
        username), Own_point.latitude.like(latitude), Own_point.longitude.like(longitude)).first()
    print(own_point)
    if not own_point:
        return True

    return False
