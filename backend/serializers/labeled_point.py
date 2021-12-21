from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from marshmallow import fields
from models.labeled_point import Labeled_point
from serializers.labeled_segment import Labeled_segmentSchema

class Labeled_pointSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Labeled_point
        load_instance = True

    id = auto_field()
    name = auto_field()
    height = auto_field()
    start_of_labeled_segments = fields.Nested('Labeled_segmentSchema', many=True, exclude={'start_point_id'})
    end_of_labeled_segments = fields.Nested('Labeled_segmentSchema', many=True, exclude={'end_point_id'})
    start_of_own_segments = fields.Nested('Own_segmentSchema', many=True, exclude={'start_labeled_point_id'})
    end_of_own_segments = fields.Nested('Own_segmentSchema', many=True, exclude={'end_labeled_point_id'})