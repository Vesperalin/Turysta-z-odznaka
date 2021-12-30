from flask import Flask, request
from flask.json import jsonify
from .utils import *
from sqlalchemy.exc import OperationalError
from models.labeled_segment import Labeled_segment
from serializers.labeled_segment import Labeled_segmentSchema


labeled_segment_schema = Labeled_segmentSchema()

def get_labeled_segments():
    try:
        all_labeled_segments = Labeled_segment.query.all()
        return labeled_segment_schema.jsonify(all_labeled_segments, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503