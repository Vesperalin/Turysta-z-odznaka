from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.tour import Tour


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
    
