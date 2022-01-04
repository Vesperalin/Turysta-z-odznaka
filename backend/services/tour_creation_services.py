from flask import Flask, request
from flask.json import jsonify
from .utils import *
from sqlalchemy.exc import OperationalError
from models.labeled_segment import Labeled_segment
from serializers.labeled_segment import Labeled_segmentSchema
from models.tour_segment import Tour_segment
from serializers.tour_segment import Tour_segmentSchema
from serializers.tour_segment import Tour_segment_nestedSchema
from models.tour import Tour
from serializers.tour import TourSchema
from app import username
from datetime import datetime
from app import db


labeled_segment_schema = Labeled_segmentSchema()
tour_segment_schema = Tour_segmentSchema()
tour_segment_nested_schema = Tour_segment_nestedSchema()
tours_schema = TourSchema()


def get_labeled_segments():
    try:
        all_labeled_segments = Labeled_segment.query.all()
        return labeled_segment_schema.jsonify(all_labeled_segments, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

def get_if_tour_name_unique():
    data = request.get_json()

    try:
        matching_tours = Tour.query.filter(Tour.tourist_username.like(username), Tour.name.like(data['name'])).all()

        if not matching_tours:
            return jsonify(True), 200
        else:
            return {'message': '{}'.format(TOUR_WITH_NAME_EXIST)}, 400
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

def add_tour_and_tour_segments():
    tour_data = request.get_json()

    tour_dictionary = {
        'name': tour_data['name'], 
        'pointsSum': tour_data['points'], 
        'creationDate': datetime.today().strftime('%Y-%m-%d'),
        'tourist_username': username
    }

    tour_segments = []

    try:
        own_tour = tours_schema.load(tour_dictionary)
        own_tour.save()

        matching_tours = Tour.query.filter(Tour.tourist_username.like(username), Tour.name.like(tour_dictionary['name'])).first()

        for segment in tour_data['segments']:
            tour_segments.append(tour_segment_schema.load(
            {
                'creationDate': datetime.today().strftime('%Y-%m-%d'),
                'through': segment['through'],
                'isLabeled': True,
                'points': segment['points'],
                'tour_id': matching_tours.id,
                'labeled_segment_id': segment['id'],
            }))

        db.session.bulk_save_objects(tour_segments)
        db.session.commit()

        returned_tour_segments = Tour_segment.query.filter(Tour_segment.tour_id.like(matching_tours.id)).all()
        print(returned_tour_segments)

        return tour_segment_nested_schema.jsonify(returned_tour_segments, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503
