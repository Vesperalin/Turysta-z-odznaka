from flask import Flask, request
from flask.json import jsonify
from flask.blueprints import Blueprint
from models.labeled_point import Labeled_point
from serializers.labeled_point import Labeled_pointSchema
from models.labeled_segment import Labeled_segment
from serializers.labeled_segment import Labeled_segmentSchema

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

    return labeled_point_schema.jsonify(labeled_point), 200


@router.route('', methods=['POST'])
def add_labeled_point():
    labeled_point_dictionary = request.get_json()

    labeled_point = labeled_point_schema.load(labeled_point_dictionary)
    labeled_point.save()

    return labeled_point_schema.jsonify(labeled_point)


@router.route('/<int:id>', methods=['PUT'])
def update_labeled_point(id):
    existing_labeled_point = Labeled_point.query.get(id)

    labeled_point = labeled_point_schema.load(
        request.get_json(), instance=existing_labeled_point, partial=True)

    labeled_point.save()
    return labeled_point_schema.jsonify(labeled_point), 200


@router.route('/<int:id>', methods=['DELETE'])
def delete_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)
    labeled_point.remove()
    return labeled_point_schema.jsonify(labeled_point)
