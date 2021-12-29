from flask import Flask, request
from flask.json import jsonify
from .utils import *
from sqlalchemy.exc import OperationalError
from models.own_point import Own_point
from serializers.own_point import Own_pointSchema
from app import username


own_point_schema = Own_pointSchema()


def get_own_points():
    try:
        all_own_points = Own_point.query.filter_by(
            tourist_username=username).all()
        return own_point_schema.jsonify(all_own_points, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def get_own_points_like(like):
    try:
        return own_point_schema.jsonify(Own_point.query.filter(Own_point.name.like("%{}%".format(like)), Own_point.tourist_username.like(username)), many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def get_own_point(id):
    try:
        own_point = Own_point.query.get(id)
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    if not own_point:
        return {'message': '{}'.format(POINT_NOT_AVAILABLE)}, 400

    if own_point.tourist_username != username:
        return {'message': '{}'.format(POINT_DO_NOT_BELONGS_TO_USER)}, 400

    return own_point_schema.jsonify(own_point), 200


def add_own_point():
    own_point_dictionary = request.get_json()
    __enter_user(own_point_dictionary)

    if not __is_latitude_correct(own_point_dictionary['latitude']):
        return {'message': '{}'.format(LATITUDE_NOT_CORRECT)}, 400
    if not __is_longitude_correct(own_point_dictionary['longitude']):
        return {'message': '{}'.format(LONGITUDE_NOT_CORRECT)}, 400

    try:
        if(__is_name_unique(own_point_dictionary['name'])):
            if(__are_coordinates_unique(own_point_dictionary['latitude'], own_point_dictionary['longitude'])):
                own_point = own_point_schema.load(own_point_dictionary)
                own_point.save()
                return {'message': '{}'.format(POINT_ADDED)}, 200
            else:
                return {'message': '{}'.format(COORDINATES_OF_POINT_NOT_UNIQUE)}, 400
        else:
            return {'message': '{}'.format(NAME_OF_POINT_ALREADY_EXIST)}, 400
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def update_own_point(id):
    try:
        existing_own_point = Own_point.query.get(id)
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    if not existing_own_point:
        return {'message': '{}'.format(POINT_NOT_AVAILABLE)}, 400

    if existing_own_point.tourist_username != username:
        return {'message': '{}'.format(POINT_DO_NOT_BELONGS_TO_USER)}, 400

    try:
        if __is_in_usage(existing_own_point):
            return {'message': '{}'.format(POINT_IN_USAGE_EDIT)}, 400
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    new_point_data = request.get_json()

    message, code = __verify_new_data(existing_own_point, new_point_data)

    if code == 400:
        return message, code

    own_point = own_point_schema.load(
        new_point_data, instance=existing_own_point, partial=True)

    try:
        own_point.save()
        return own_point_schema.jsonify(own_point), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def delete_own_point(id):
    try:
        own_point = Own_point.query.get(id)
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    if not own_point:
        return {'message': '{}'.format(POINT_NOT_AVAILABLE)}, 400

    try:
        if __is_in_usage(own_point):
            return {'message': '{}'.format(POINT_IN_USAGE_DELETE)}, 400
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    if own_point.tourist_username != username:
        return {'message': '{}'.format(POINT_DO_NOT_BELONGS_TO_USER)}, 400

    try:
        own_point.remove()
        return {'message': '{}'.format(POINT_DELETED)}, 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def __is_name_unique(name: str):
    try:
        own_point = Own_point.query.filter(Own_point.tourist_username.like(
            username), Own_point.name.like(name)).all()
    except:
        raise OperationalError

    if not own_point:
        return True

    return False


def __are_coordinates_unique(latitude: float, longitude: float):
    try:
        own_point = Own_point.query.filter(Own_point.tourist_username.like(
            username), Own_point.latitude.like(latitude), Own_point.longitude.like(longitude)).first()
    except:
        raise OperationalError

    if not own_point:
        return True

    return False


def __is_in_usage(own_point: Own_point):
    if len(own_point.start_of_own_segments) > 0:
        return True
    if len(own_point.end_of_own_segments) > 0:
        return True

    return False


def __verify_new_data(existing_point: Own_point, data):
    new_name = existing_point.name != data['name']
    if new_name:
        if existing_point.name.lower() != data['name'].lower():
            try:
                if not __is_name_unique(data['name']):
                    return {'message': '{}'.format(NAME_OF_POINT_ALREADY_EXIST)}, 400
            except OperationalError as e:
                raise e

    is_new_latitude = existing_point.latitude != data['latitude']
    if is_new_latitude:
        if not __is_latitude_correct(data['latitude']):
            return {'message': '{}'.format(LONGITUDE_NOT_CORRECT)}, 400

    is_new_longitude = existing_point.longitude != data['longitude']
    if is_new_longitude:
        if not __is_longitude_correct(data['longitude']):
            return {'message': '{}'.format(LONGITUDE_NOT_CORRECT)}, 400

    if is_new_latitude or is_new_longitude:
        try:
            if not __are_coordinates_unique(data['latitude'], data['longitude']):
                return {'message': '{}'.format(COORDINATES_OF_POINT_NOT_UNIQUE)}, 400
        except OperationalError as e:
            raise e

    return None, 200


def __is_longitude_correct(longitude):
    if isinstance(longitude, float):
        return True
    return False


def __is_latitude_correct(latitude):
    if isinstance(latitude, float):
        return True
    return False


def __enter_user(new_point_dictionary):
    new_point_dictionary['tourist_username'] = username
