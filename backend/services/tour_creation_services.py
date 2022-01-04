from flask import Flask, request
from flask.json import jsonify
from .utils import *
from sqlalchemy.exc import OperationalError
from models.labeled_segment import Labeled_segment
from serializers.labeled_segment import Labeled_segmentSchema
from models.tour_segment import Tour_segment
from serializers.tour_segment import Tour_segmentSchema
from models.tour import Tour
from serializers.tour import TourSchema
from app import username
from datetime import datetime
from app import db


labeled_segment_schema = Labeled_segmentSchema()
tour_segment_schema = Tour_segmentSchema()
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

# TODO - przerabianie odcinków opisanych na odcinki trasy i zapisanie ich do bazy
def add_tour_and_tour_segments():
    tour_data = request.get_json()
    #print(tour_data['name'])
    #print(tour_data['points'])

    tour_dictionary = {
        'name': tour_data['name'], 
        'pointsSum': tour_data['points'], 
        'creationDate': datetime.today().strftime('%Y-%m-%d'),
        'tourist_username': username
    }

    tour_segments = []

    try:
        ##print(tour_dictionary)
        #own_tour = tours_schema.load(tour_dictionary) # do testów, żeby ciągle nie dodawać do bazy - potem odkomentować
        #own_tour.save()

        ## do tego, żeby w odcinkach trasy mieć id trasy
        matching_tours = Tour.query.filter(Tour.tourist_username.like(username), Tour.name.like(tour_dictionary['name'])).first()
        ##print(matching_tours.name)
        ##print(matching_tours.id)

        ##print(tour_data['segments'][0])
        ##print(tour_data['segments'][1])

        """for segment in tour_data['segments']:
            tour_segments.append({
                'creationDate': datetime.today().strftime('%Y-%m-%d'),
                'isLabeled': True,
                'points': segment['points'],
                'tour_id': matching_tours.id,
                'labeled_segment_id': segment['id'],
            })

        for tour_segment in tour_segments:
            segment = tour_segment_schema.load(tour_segment)
            segment.save()"""

        for segment in tour_data['segments']:
            tour_segments.append(tour_segment_schema.load(
            {
                'creationDate': datetime.today().strftime('%Y-%m-%d'),
                'isLabeled': True,
                'points': segment['points'],
                'tour_id': matching_tours.id,
                'labeled_segment_id': segment['id'],
            }))

        #db.session.bulk_save_objects(tour_segments) # odkomentować bo to do testów zakomentowane
        #db.session.commit() -,,-

        ##print(tour_segments[0])
        ##print(tour_segments[1])

        returned_tour_segments = Tour_segment.query.filter(Tour_segment.tour_id.like(matching_tours.id)).all()
        print(returned_tour_segments)

        return tour_segment_schema.jsonify(returned_tour_segments, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    #return {'message': '{}'.format("Powidzenie - test")}, 200 # TODO - zwracać odcinki trasy




# nie używane - TODO - usunąć / przerobić na get tour by id
def get_tourist_tours():
    try:
        all_tours = Tour.query.filter_by(
            tourist_username=username).all()
        return tours_schema.jsonify(all_tours, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

# FOR TEST ONLY
def get_tours():
    all_tours = Tour.query.all()
    return tours_schema.jsonify(all_tours, many=True), 200
