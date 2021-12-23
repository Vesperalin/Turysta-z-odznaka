from flask import Flask, request
from flask.json import jsonify
from flask.blueprints import Blueprint
from models.labeled_point import Labeled_point
from serializers.labeled_point import Labeled_pointSchema
from .utils import capitalize

labeled_point_schema = Labeled_pointSchema()

router = Blueprint('labeled-points', __name__)


@router.route('', methods=['GET'])
def get_labeled_points():
    all_labeled_points = Labeled_point.query.all()
    return labeled_point_schema.jsonify(all_labeled_points, many=True), 200


@router.route('/like/<string:like>', methods=['GET'])
def get_labeled_points_like(like):
    return labeled_point_schema.jsonify(Labeled_point.query.filter(Labeled_point.name.like("%{}%".format(like))), many=True), 200


"""
Needs to be checked (based on mockups):
- if requested point exist (DONE)
"""


@router.route('/<int:id>', methods=['GET'])
def get_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)

    if not labeled_point:
        return {'message': 'Labeled point not available'}, 404

    return labeled_point_schema.jsonify(labeled_point), 200


"""
Needs to be checked (based on mockups):
- if name is unique (done)
- if height is correct (>=0 or None) (DONE)

#TODO Nazwa to lowerCase z wyjątkiem pierwszego znaku (Wielka litera)

Required JSON:
"name":
"height": (value or null)
"""


@router.route('', methods=['POST'])
def add_labeled_point():
    labeled_point_dictionary = request.get_json()
    capitalize(labeled_point_dictionary)

    if(is_name_unique(labeled_point_dictionary['name'])):
        if is_height_correct(labeled_point_dictionary['height']):
            own_point = labeled_point_schema.load(labeled_point_dictionary)
            own_point.save()
            return labeled_point_schema.jsonify(own_point), 200
        else:
            return {'message': 'Incorrect height value'}, 404
    else:
        return {'message': 'Name of point is not unique'}, 404


"""
Needs to be checked (based on mockups):
- if requested point exist (done)
- if requested point is in usage (done)
- if new name is unique (done)
- if new height is correct (>=0 or None)

Required JSON:
"name":
"height": (value or null)
"""


@router.route('/<int:id>', methods=['PUT'])
def update_labeled_point(id):
    existing_labeled_point = Labeled_point.query.get(id)

    if not existing_labeled_point:
        return {'message': 'Requested labeled point not available'}, 404

    if is_in_usage(existing_labeled_point):
        return {'message': 'Requested labeled point is already in usage and cannot be modified'}, 404

    new_point_data = request.get_json()

    message, code = verify_new_data(existing_labeled_point, new_point_data)

    if code == 404:
        return message, code

    labeled_point = labeled_point_schema.load(
        new_point_data, instance=existing_labeled_point, partial=True)

    labeled_point.save()
    return labeled_point_schema.jsonify(labeled_point), 200


"""
Needs to be checked (based on mockups):
- if requested point exist (done)
- if requested point is in usage (done)
"""


@router.route('/<int:id>', methods=['DELETE'])
def delete_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)

    if not labeled_point:
        return {'message': 'Requested labeled point not available'}, 404

    if is_in_usage(labeled_point):
        return {'message': 'Requested labeled point is in usage and cannot be deleted'}, 404

    labeled_point.remove()
    return {'message': 'Labeled point successfully deleted'}, 200


def is_name_unique(name: str):
    labeled_point = Labeled_point.query.filter(
        Labeled_point.name.like(name)).first()

    if not labeled_point:
        return True

    return False


def is_in_usage(labeled_point: Labeled_point):
    if len(labeled_point.start_of_own_segments) > 0:
        return True
    if len(labeled_point.end_of_own_segments) > 0:
        return True
    if len(labeled_point.start_of_labeled_segments) > 0:
        return True
    if len(labeled_point.end_of_labeled_segments) > 0:
        return True

    return False


def verify_new_data(existing_point: Labeled_point, data):
    is_new_name = existing_point.name != data['name']
    if is_new_name:
        if not is_name_unique(data['name']):
            return {'message': 'New name of point must be unique'}, 404

    is_new_height = existing_point.height != data['height']
    if is_new_height:
        if not is_height_correct(data['height']):
            return {'message': 'Incorrect new height of point'}, 404

    return None, 200


def is_height_correct(height):
    return True if height is None else (height >= 0 and isinstance(height, int))
