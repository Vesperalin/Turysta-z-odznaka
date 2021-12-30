from flask import Flask, request
from flask.json import jsonify
from .utils import *
from sqlalchemy.exc import OperationalError
from models.labeled_segment import Labeled_segment
from serializers.labeled_segment import Labeled_segmentSchema
from models.tour import Tour
from serializers.tour import TourSchema


labeled_segment_schema = Labeled_segmentSchema()
tours_schema = TourSchema()


def get_labeled_segments():
    try:
        all_labeled_segments = Labeled_segment.query.all()
        return labeled_segment_schema.jsonify(all_labeled_segments, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


# FOR TEST ONLY
def get_tours():
    all_tours = Tour.query.all()
    return tours_schema.jsonify(all_tours, many=True), 200
