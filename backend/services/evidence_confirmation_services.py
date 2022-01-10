from flask import Flask, request
from flask.json import jsonify
from sqlalchemy.sql.elements import and_
from serializers.tour_segment import Tour_segmentSchema
from .utils import *
from sqlalchemy.exc import OperationalError
from models.labeled_segment import Labeled_segment
from serializers.labeled_segment import Labeled_segmentSchema
from serializers.tour_segment import Tour_segment_nestedSchema
from models.tour import Tour
from models.tour_segment import Tour_segment
from serializers.tour import TourSchema
from app import username
from datetime import datetime
from serializers.evidence import EvidenceSchema
from models.guide import Guide


tours_schema = TourSchema()
nested_tour_segment_schema = Tour_segment_nestedSchema()
tour_segment_schema = Tour_segmentSchema()
labeled_segment_schema = Labeled_segmentSchema()
evidence_schema = EvidenceSchema()


def get_tourist_tours():
    try:
        all_tours = Tour.query.filter_by(
            tourist_username=username).all()
        return tours_schema.jsonify(all_tours, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def get_unconfirmed_tour_segments(id):
    try:
        segments = Tour_segment.query.filter(and_(Tour_segment.tour_id == id, Tour_segment.evidence_id == None)
                                             ).all()
        return nested_tour_segment_schema.jsonify(segments, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def add_evidences():
    data_dictionary = request.get_json()

    confirmed_tour_segments = []
    confirmed_tour_segments.append(
        _process_attachments(data_dictionary['attachments']))
    confirmed_tour_segments.append(
        _process_verifying(data_dictionary['verifying']))

    flat_list = [item for sublist in confirmed_tour_segments for item in sublist]

    nested = nested_tour_segment_schema.jsonify(flat_list, many=True)
    print(nested)
    return nested, 200


def check_if_guide_exists(guide_id_number):
    try:
        guide = Guide.query.filter_by(id_number=guide_id_number).first()
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    if not guide:
        return {'message': 'Niepoprawny numer legitymacji przewodnika'}, 404

    return {'message': 'OK'}, 200


def _process_attachments(attachments):
    confirmed_tour_segments = []

    for attachment in attachments:
        evidence_dictionary = {
            'attachmentDate': datetime.today().strftime('%Y-%m-%d'),
            'isConfirmed': False,
            'isWaiting': True,
            'photo_attachment': attachment['value'],
            'tourist_username': username
        }
        try:
            evidence = evidence_schema.load(evidence_dictionary)
            evidence.save()

            for tour_segment in attachment['tour_segments']:
                tour_segment_dictionary = {
                    'startDate': tour_segment['startDate'],
                    'endDate': tour_segment['endDate'],
                    'evidence_id': evidence.id
                }
                existing_tour_segment = Tour_segment.query.get(
                    tour_segment['id'])
                updated_tour_segment = tour_segment_schema.load(
                    tour_segment_dictionary, instance=existing_tour_segment, partial=True)
                updated_tour_segment.save()

                confirmed_tour_segments.append(
                    Tour_segment.query.get(tour_segment['id']))
        except OperationalError:
            return {'message': '{}'.format(NO_DB_CONNECTION)}, 503

    return confirmed_tour_segments


def _process_verifying(verifying):
    confirmed_tour_segments = []

    try:
        for guide_data in verifying:
            guide = Guide.query.filter_by(
                id_number=guide_data['id_verifying']).first()
            evidence_dictionary = {
                'attachmentDate': datetime.today().strftime('%Y-%m-%d'),
                'isConfirmed': False,
                'isWaiting': True,
                'verifying_username': guide.username,
                'tourist_username': username
            }
            evidence = evidence_schema.load(evidence_dictionary)
            evidence.save()

            for tour_segment in guide_data['tour_segments']:
                tour_segment_dictionary = {
                    'startDate': tour_segment['startDate'],
                    'endDate': tour_segment['endDate'],
                    'evidence_id': evidence.id
                }
                existing_tour_segment = Tour_segment.query.get(
                    tour_segment['id'])
                updated_tour_segment = tour_segment_schema.load(
                    tour_segment_dictionary, instance=existing_tour_segment, partial=True)
                updated_tour_segment.save()

                que = Tour_segment.query.get(tour_segment['id'])
                if not que:
                    print("nie ma")
                confirmed_tour_segments.append(que)
                    
                print(confirmed_tour_segments)

        return confirmed_tour_segments

    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503
