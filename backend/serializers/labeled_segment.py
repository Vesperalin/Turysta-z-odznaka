from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from marshmallow import fields
from models.labeled_segment import Labeled_segment
from serializers.closed_segment import Closed_segmentSchema
from serializers.liquidated_segment import Liquidated_segmentSchema
from serializers.mountain_group import Mountain_groupSchema


class Labeled_segmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Labeled_segment
        load_instance = True

    id = auto_field()
    through = auto_field()
    color = auto_field()
    is_bidirectional = auto_field()
    points = auto_field()
    mountain_group_id = auto_field()
    start_point_id = auto_field()
    end_point_id = auto_field()
    closed_segments = fields.Nested(
        'Closed_segmentSchema', many=True, exclude={'segment_id'})
    liquidated_segment = fields.Nested(
        'Liquidated_segmentSchema', many=False, exclude={'id'})


class Labeled_segment_nestedSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Labeled_segment
        load_instance = True
        exclude = ('points', 'is_bidirectional', 'color', 'through')

    id = auto_field()
    mountain_group = fields.Nested('Mountain_groupSchema')
    start_point = fields.Nested('Labeled_point_nestedSchema')
    end_point = fields.Nested('Labeled_point_nestedSchema')
    closed_segments = fields.Nested(
        'Closed_segmentSchema', many=True, exclude={'segment_id'})
    liquidated_segment = fields.Nested(
        'Liquidated_segmentSchema', many=False, exclude={'id'})
    
