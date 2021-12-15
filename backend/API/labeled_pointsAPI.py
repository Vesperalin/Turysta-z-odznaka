from flask import Flask, request
from flask.json import jsonify
from flask.blueprints import Blueprint
from backend.models.labeled_point import Labeled_point
from backend.serializers.labeled_point import Labeled_pointSchema

labeled_point_schema = Labeled_pointSchema()

router = Blueprint('labeled-points', __name__)


@router.route('', methods=['GET'])
def get_labeled_points():
    all_labeled_points = Labeled_point.query.all()
    return labeled_point_schema.jsonify(all_labeled_points, many=True), 200


@router.route('/<int:id>', methods=['GET'])
def get_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)

    if not labeled_point:
        return {'message': 'Labeled point not available'}, 404

    return labeled_point_schema.jsonify(labeled_point)


@router.route('', methods=['POST'])
def add_labeled_point():
    name = request.json['name']
    height = request.json['height']

    labeled_point = Labeled_point(name, height)
    labeled_point.save()

    return labeled_point_schema.jsonify(labeled_point)


@router.route('/<int:id>', methods=['PUT'])
def update_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)
    name = request.json['name']
    height = request.json['height']

    labeled_point.name = name
    labeled_point.height = height

    labeled_point.save()
    return labeled_point_schema.jsonify(labeled_point)


@router.route('/<int:id>', methods=['DELETE'])
def delete_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)
    labeled_point.remove()
    return labeled_point_schema.jsonify(labeled_point)