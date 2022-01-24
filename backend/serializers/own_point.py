from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from marshmallow import fields
from models.own_point import Own_point
from serializers.own_segment import Own_segmentSchema

class Own_pointSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Own_point
        load_instance = True

    id = auto_field()
    name = auto_field()
    latitude = auto_field()
    longitude = auto_field()
    tourist_username = auto_field()
    start_of_own_segments = fields.Nested('Own_segmentSchema', many=True, exclude={'start_own_point_id', 'start_labeled_point_id'})
    end_of_own_segments = fields.Nested('Own_segmentSchema', many=True, exclude={'end_own_point_id', 'end_labeled_point_id'})