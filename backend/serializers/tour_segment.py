from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.tour_segment import Tour_segment


class Tour_segmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tour_segment
        load_instance = True

    id = auto_field()
    startDate = auto_field()
    endDate = auto_field()
    creationDate = auto_field()
    through = auto_field()
    isLabeled = auto_field()
    points = auto_field()
    tour_id = auto_field()
    labeled_segment_id = auto_field()
