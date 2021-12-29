from flask import Flask, request
from flask.blueprints import Blueprint
from services.labeled_point_services import delete_labeled_point, get_labeled_points, get_labeled_points_like, get_labeled_point, update_labeled_point, add_labeled_point

router = Blueprint('labeled-points', __name__)


@router.route('', methods=['GET'])
def get_points():
    return get_labeled_points()


# ENDPOINT to catch empty LIKE
@router.route('/like/', methods=['GET'])
def get_all_points():
    return get_labeled_points()


@router.route('/like/<string:like>', methods=['GET'])
def get_points_like(like):
    return get_labeled_points_like(like)


@router.route('/<int:id>', methods=['GET'])
def get_point(id):
    return get_labeled_point(id)


@router.route('', methods=['POST'])
def add_point():
    return add_labeled_point(request)


@router.route('/<int:id>', methods=['PUT'])
def update_point(id):
    return update_labeled_point(id, request)


@router.route('/<int:id>', methods=['DELETE'])
def delete_point(id):
    return delete_labeled_point(id)
