from flask import Flask, request
from flask.json import jsonify
from flask.blueprints import Blueprint
from models.own_point import Own_point
from models.tourist import Tourist
from serializers.own_point import Own_pointSchema
from serializers.tourist import TouristSchema


own_point_schema = Own_pointSchema()

# Simplification
username = "jankowalski"

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
"""


@router.route('/<int:id>', methods=['GET'])
def get_own_point(id):
    own_point = Own_point.query.get(id)

    if not own_point:
        return {'message': 'Requested own point not available'}, 404

    if own_point.tourist_username != username:
        return {'message': 'Requested own point do not belongs to current user'}, 404

    return own_point_schema.jsonify(own_point), 200


"""
Needs to be checked (based on mockups):
- if name is unique (done)
- if (latitude + longitude) is unique (done)
- if latitude and longitude are correct datatypes (done)

Required JSON:
"name":
"latitude":
"longitude":
"tourist_username":
"""


@router.route('', methods=['POST'])
def add_own_point():
    own_point_dictionary = request.get_json()

    if(not isinstance(own_point_dictionary['latitude'], float) or not isinstance(own_point_dictionary['longitude'], float)):
        return {'message': 'Coordinates are not correct datatypes'}, 404

    if(is_name_unique(own_point_dictionary['name'])):
        if(are_coordinates_unique(own_point_dictionary['latitude'], own_point_dictionary['longitude'])):
            own_point = own_point_schema.load(own_point_dictionary)
            own_point.save()
            return own_point_schema.jsonify(own_point), 200
        else:
            return {'message': 'Coordinates of point are not unique'}, 404
    else:
        return {'message': 'Name of point is not unique'}, 404


"""
Needs to be checked (based on mockups):
- if requested point exist (done)
- if requested point is in usage (done)
- if new name is unique (done)
- if new (latitude + longitude) is unique (done)
- if new latitude and new longitude are correct datatypes (done)

Required JSON:
"name":
"latitude":
"longitude":
"""


@router.route('/<int:id>', methods=['PUT'])
def update_own_point(id):
    existing_own_point = Own_point.query.get(id)

    if not existing_own_point:
        return {'message': 'Requested own point not available'}, 404

    if existing_own_point.tourist_username != username:
        return {'message': 'Requested own point do not belongs to current user'}, 404

    if is_in_usage(existing_own_point):
        return {'message': 'Requested own point is already in usage and cannot be modified'}, 404

    new_point_data = request.get_json()

    message, code = verify_new_data(existing_own_point, new_point_data)

    if code == 404:
        return message, code

    own_point = own_point_schema.load(
        new_point_data, instance=existing_own_point, partial=True)

    own_point.save()
    return own_point_schema.jsonify(own_point), 200


"""
Needs to be checked (based on mockups):
- if requested point exist (done)
- if requested point is in usage (done)
"""


@router.route('/<int:id>', methods=['DELETE'])
def delete_own_point(id):
    own_point = Own_point.query.get(id)

    if not own_point:
        return {'message': 'Requested own point not available'}, 404

    if is_in_usage(own_point):
        return {'message': 'Requested own point is in usage and cannot be deleted'}, 404

    if own_point.tourist_username != username:
        return {'message': 'Requested own point do not belongs to current user'}, 404

    own_point.remove()
    return {'message': 'Own point successfully deleted'}, 200


def is_name_unique(name: str):
    own_point = Own_point.query.filter(Own_point.tourist_username.like(
        username), Own_point.name.like(name)).first()

    if not own_point:
        return True

    return False


def are_coordinates_unique(latitude: float, longitude: float):
    own_point = Own_point.query.filter(Own_point.tourist_username.like(
        username), Own_point.latitude.like(latitude), Own_point.longitude.like(longitude)).first()

    if not own_point:
        return True

    return False


def is_in_usage(own_point: Own_point):
    if len(own_point.start_of_own_segments) > 0:
        return True
    if len(own_point.end_of_own_segments) > 0:
        return True

    return False


def verify_new_data(existing_point: Own_point, data):
    new_name = existing_point.name != data['name']
    if new_name:
        if not is_name_unique(data['name']):
            return {'message': 'New name of point must be unique'}, 404

    is_new_latitude = existing_point.latitude != data['latitude']
    if is_new_latitude:
        if not isinstance(data['latitude'], float):
            return {'message': 'Latitude is not correct datatype'}, 404

    is_new_longitude = existing_point.longitude != data['longitude']
    if is_new_longitude:
        if not isinstance(data['longitude'], float):
            return {'message': 'Longitude is not correct datatype'}, 404

    if is_new_latitude or is_new_longitude:
        if not are_coordinates_unique(data['latitude'], data['longitude']):
            return {'message': 'New coordinates of point must be unique'}, 404

    return None, 200
