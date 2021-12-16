from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.labeled_segment import Labeled_segment


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
