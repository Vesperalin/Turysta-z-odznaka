from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.closed_segment import Closed_segment


class Closed_segmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Closed_segment
        load_instance = True

    id = auto_field()
    closureDate = auto_field()
    openingDate = auto_field()
    segment_id = auto_field()
