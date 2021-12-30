from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from marshmallow import fields
from models.tour import Tour
from serializers.tour_segment import Tour_segmentSchema


class TourSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tour
        load_instance = True

    id = auto_field()
    name = auto_field()
    creationDate = auto_field()
    pointsSum = auto_field()
    startDate = auto_field()
    endDate = auto_field()
    tourist_username = auto_field()
    tour_segments = fields.Nested('Tour_segmentSchema', many=True, exclude={'tour_id'})