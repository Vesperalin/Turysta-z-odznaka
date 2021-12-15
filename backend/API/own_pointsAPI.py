from flask import Flask, request
from flask.json import jsonify
from flask.blueprints import Blueprint
from models.own_point import Own_point
from backend.models.tourist import Tourist
from backend.serializers.own_point import Own_pointSchema
from backend.serializers.tourist import TouristSchema



own_point_schema = Own_pointSchema()
tourist_schema = TouristSchema()

router = Blueprint('own-points', __name__)


@router.route('', methods=['GET'])
def get_own_points():
    all_own_points = Own_point.query.all()
    return own_point_schema.jsonify(all_own_points, many=True), 200

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
- if name is unique
- if (latitude + longitude) is unique
- if latitude and longitude are correct datatypes
"""
@router.route('', methods=['POST'])
def add_own_point():
    own_point_dictionary = request.get_json()

    own_point = own_point_schema.load(own_point_dictionary)
    own_point.save()

    return own_point_schema.jsonify(own_point)

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
