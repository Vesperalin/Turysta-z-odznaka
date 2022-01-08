from flask import Flask, request
from flask.json import jsonify
from sqlalchemy.sql.elements import and_
from backend.serializers.guide import GuideSchema
from backend.serializers.tour_segment import Tour_segmentSchema
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


def get_unconfirmed_tour_segments(id):
    try:
        segments = Tour_segment.query.filter(and_(Tour_segment.tour_id == id, Tour_segment.evidence_id == None)
                                             ).all()
        return nested_tour_segment_schema.jsonify(segments, many=True), 200
    except OperationalError:
        return {'message': '{}'.format(NO_DB_CONNECTION)}, 503


def add_evidences():
    data_dictionary = request.get_json()
    _process_attachments(data_dictionary['attachments'])
    _process_verifying(data_dictionary['verifying'])
    return {'message': 'Zgłoszenie przebiegło pomyślnie, oczekuj na weryfikację!'}


def _process_attachments(attachments):
    for attachment in attachments:
        evidence_dictionary = {
            'attachmentDate': datetime.today().strftime('%Y-%m-%d'), 
            'isConfirmed': False, 
            'isWaiting': True, 
            'photo_attachment': attachment['value'], 
            'tourist_username': username
            #TODO mountain_id
            }
        evidence = evidence_schema.load(evidence_dictionary)
        evidence.save()
        for tour_segment in attachment['segments']:
            tour_segment_dictionary = {
                'startDate': tour_segment['start_date'],
                'endDate': tour_segment['end_date'],
                'evidence_id': evidence.id
            }
            existing_tour_segment = Tour_segment.query.get(tour_segment['id'])
            updated_tour_segment = tour_segment_schema.load(tour_segment_dictionary, instance=existing_tour_segment, partial=True)
            updated_tour_segment.save()


def _process_verifying(verifying):
    for guide_data in verifying:
        guide = Guide.query.filter_by(id_number=guide_data['id_verifying']).first()
        evidence_dictionary = {
            'attachmentDate': datetime.today().strftime('%Y-%m-%d'), 
            'isConfirmed': False, 
            'isWaiting': True, 
            'verifying_username': guide.username,
            'tourist_username': username
        }
        evidence = evidence_schema.load(evidence_dictionary)
        evidence.save()

        for tour_segment in guide_data['segments']:
            tour_segment_dictionary = {
                'startDate': tour_segment['start_date'],
                'endDate': tour_segment['end_date'],
                'evidence_id': evidence.id
            }
            existing_tour_segment = Tour_segment.query.get(tour_segment['id'])
            updated_tour_segment = tour_segment_schema.load(tour_segment_dictionary, instance=existing_tour_segment, partial=True)
            updated_tour_segment.save()
    return None
