from flask import Flask
from flask.blueprints import Blueprint
from services.own_points_services import get_own_points, get_own_points_like, get_own_point, add_own_point, update_own_point, delete_own_point

router = Blueprint('own-points', __name__)


@router.route('', methods=['GET'])
def get_points():
    return get_own_points()


@router.route('/like/<string:like>', methods=['GET'])
def get_points_like(like):
    return get_own_points_like(like)


@router.route('/<int:id>', methods=['GET'])
def get_point(id):
    return get_own_point(id)


@router.route('', methods=['POST'])
def add_point():
    return add_own_point()


@router.route('/<int:id>', methods=['PUT'])
def update_point(id):
    return update_own_point(id)


@router.route('/<int:id>', methods=['DELETE'])
def delete_point(id):
    return delete_own_point(id)
