from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.own_segment import Own_segment


class Own_segmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Own_segment
        load_instance = True

    id = auto_field()
    height_diff = auto_field()
    length = auto_field()
    is_bidirectional = auto_field()
    points = auto_field()
    start_own_point_id = auto_field()
    end_own_point_id = auto_field()
    start_labeled_point_id = auto_field()
    end_labeled_point_id = auto_field()
    mountain_group_id = auto_field()
