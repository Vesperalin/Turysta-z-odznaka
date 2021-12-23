from flask import Flask, request, Response
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


@router.route('/<int:id>', methods=['GET'])
def get_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)

    if not labeled_point:
        return Response("{'message':'Punkt o wybranej nazwie nie istnieje!'}", status=404, mimetype='application/json')

    return labeled_point_schema.jsonify(labeled_point), 200


"""
Required JSON:
"name": "nameValue"
"height": (value or null)
"""


@router.route('', methods=['POST'])
def add_labeled_point():
    labeled_point_dictionary = request.get_json()
    capitalize(labeled_point_dictionary)

    if __is_name_unique(labeled_point_dictionary['name']):
        if __is_height_correct(labeled_point_dictionary['height']):
            own_point = labeled_point_schema.load(labeled_point_dictionary)
            own_point.save()
            return labeled_point_schema.jsonify(own_point), 200
        else:
            return Response("{'message':'Niepoprawna wysokość!'}", status=404, mimetype='application/json')
    else:
        return Response("{'message':'Punkt o wybranej nazwie już istnieje!'}", status=404, mimetype='application/json')


"""
Required JSON:
"name": "nameValue"
"height": (value or null)
"""


@router.route('/<int:id>', methods=['PUT'])
def update_labeled_point(id):
    existing_labeled_point = Labeled_point.query.get(id)

    if not existing_labeled_point:
        return Response("{'message':'Punkt o wybranej nazwie nie istnieje!'}", status=404, mimetype='application/json')

    if __is_in_usage(existing_labeled_point):
        return Response("{'message':'Punkt jest już używany w odcinkach. Nie można go edytować!'}", status=404, mimetype='application/json')

    new_point_data = request.get_json()

    message, code = __verify_new_data(existing_labeled_point, new_point_data)

    if code == 404:
        return Response("{'message':'{}}'}".format(message), status=code, mimetype='application/json')

    labeled_point = labeled_point_schema.load(
        new_point_data, instance=existing_labeled_point, partial=True)

    labeled_point.save()
    return labeled_point_schema.jsonify(labeled_point), 200


"""

"""


@router.route('/<int:id>', methods=['DELETE'])
def delete_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)

    if not labeled_point:
        return Response("{'message':'Punkt o wybranej nazwie nie istnieje!'}", status=404, mimetype='application/json')

    if __is_in_usage(labeled_point):
        return Response("{'message':'Punkt jest już używany w odcinkach. Nie można go usunąć. Zamiast tego przenieś punkt do kategorii zlikwidowane.'}", status=404, mimetype='application/json')

    labeled_point.remove()
    return {'message': 'Punkt został pomyślnie usunięty'}, 200


def __is_name_unique(name: str):
    labeled_point = Labeled_point.query.filter(
        Labeled_point.name.like(name)).first()

    if not labeled_point:
        return True

    return False


def __is_in_usage(labeled_point: Labeled_point):
    if len(labeled_point.start_of_own_segments) > 0:
        return True
    if len(labeled_point.end_of_own_segments) > 0:
        return True
    if len(labeled_point.start_of_labeled_segments) > 0:
        return True
    if len(labeled_point.end_of_labeled_segments) > 0:
        return True

    return False


def __verify_new_data(existing_point: Labeled_point, data):
    is_new_name = existing_point.name != data['name']
    if is_new_name:
        if not __is_name_unique(data['name']):
            return {'message': 'New name of point must be unique'}, 404

    is_new_height = existing_point.height != data['height']
    if is_new_height:
        if not __is_height_correct(data['height']):
            return {'message': 'Incorrect new height of point'}, 404

    return None, 200


def __is_height_correct(height):
    return True if height is None else (height >= 0 and isinstance(height, int))
