from flask import Flask, request
from flask.json import jsonify
from .utils import *
from sqlalchemy.exc import OperationalError
from models.labeled_point import Labeled_point
from serializers.labeled_point import Labeled_pointSchema


labeled_point_schema = Labeled_pointSchema()


def get_labeled_points():
    try:
        all_labeled_points = Labeled_point.query.all()
        return labeled_point_schema.jsonify(all_labeled_points, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def get_labeled_points_like(like):
    try:
        return labeled_point_schema.jsonify(Labeled_point.query.filter(Labeled_point.name.like("%{}%".format(like))), many=True), 200
    except:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def get_labeled_point(id):
    try:
        labeled_point = Labeled_point.query.get(id)

        if not labeled_point:
            return {'message': '{}'.format(POINT_NOT_AVAILABLE)}, 400

        return labeled_point_schema.jsonify(labeled_point), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def add_labeled_point():
    labeled_point_dictionary = request.get_json()
    try:
        if(__is_name_unique(labeled_point_dictionary['name'])):
            if __is_height_correct(labeled_point_dictionary['height']):
                __capitalize_name(labeled_point_dictionary)
                own_point = labeled_point_schema.load(labeled_point_dictionary)
                own_point.save()
                return {'message': '{}'.format(POINT_ADDED)}, 200
            else:
                return {'message': '{}'.format(HEIGHT_NOT_CORRECT)}, 400
        else:
            return {'message': '{}'.format(NAME_OF_POINT_ALREADY_EXIST)}, 400
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def update_labeled_point(id):
    try:
        existing_labeled_point = Labeled_point.query.get(id)
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    if not existing_labeled_point:
        return {'message': '{}'.format(POINT_NOT_AVAILABLE)}, 400

    if __is_in_usage(existing_labeled_point):
        return {'message': '{}'.format(POINT_IN_USAGE_EDIT)}, 400

    new_point_data = request.get_json()

    message, code = __verify_new_data(existing_labeled_point, new_point_data)

    if code == 404:
        return message, code

    __capitalize_name(new_point_data)
    labeled_point = labeled_point_schema.load(
        request.get_json(), instance=existing_labeled_point, partial=True)
    try:
        labeled_point.save()
        return {'message': '{}'.format(POINT_EDITED)}, 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def delete_labeled_point(id):
    try:
        labeled_point = Labeled_point.query.get(id)

        if not labeled_point:
            return {'message': '{}'.format(POINT_NOT_AVAILABLE)}, 400

        if __is_in_usage(labeled_point):
            return {'message': '{}'.format(POINT_IN_USAGE_DELETE)}, 400

        labeled_point.remove()
        return {'message': '{}'.format(POINT_DELETED)}, 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def __is_name_unique(name: str):
    try:
        labeled_point = Labeled_point.query.filter(
            Labeled_point.name.like(name)).first()
    except:
        raise OperationalError

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
            return {'message': '{}'.format(NAME_OF_POINT_ALREADY_EXIST)}, 400

    is_new_height = existing_point.height != data['height']
    if is_new_height:
        if not __is_height_correct(data['height']):
            return {'message': '{}'.format(HEIGHT_NOT_CORRECT)}, 400

    return None, 200


def __is_height_correct(height):
    return True if height is None else (height >= 0 and isinstance(height, int))


def __capitalize_name(data_dictionary):
    data_dictionary['name'] = capitalize(data_dictionary['name'])


def __is_name_unique(name: str):
    try:
        labeled_point = Labeled_point.query.filter(
            Labeled_point.name.like(name)).first()
    except:
        raise OperationalError

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
            return {'message': '{}'.format(NAME_OF_POINT_ALREADY_EXIST)}, 400

    is_new_height = existing_point.height != data['height']
    if is_new_height:
        if not __is_height_correct(data['height']):
            return {'message': '{}'.format(HEIGHT_NOT_CORRECT)}, 400

    return None, 200


def __is_height_correct(height):
    return True if height is None else (height >= 0 and isinstance(height, int))


def __capitalize_name(data_dictionary):
    data_dictionary['name'] = capitalize(data_dictionary['name'])
