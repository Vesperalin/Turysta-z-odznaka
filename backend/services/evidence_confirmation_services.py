from flask import Flask, request
from flask.json import jsonify
from .utils import *
from sqlalchemy.exc import OperationalError
from models.labeled_segment import Labeled_segment
from serializers.labeled_segment import Labeled_segmentSchema
from serializers.tour_segment import Tour_segment_nestedSchema
from models.tour import Tour
from models.tour_segment import Tour_segment
from serializers.tour import TourSchema
from app import username



tours_schema = TourSchema()
nested_tour_segment_schema = Tour_segment_nestedSchema()


def get_unconfirmed_tour_segments(id):
    try:
        segments = Tour_segment.query.filter_by(
            tour_id=id).all()
        return nested_tour_segment_schema.jsonify(segments, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

