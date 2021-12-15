from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.own_point import Own_point

class Own_pointSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Own_point
        load_instance = True

    id = auto_field()
    name = auto_field()
    latitude = auto_field()
    longitude = auto_field()
    tourist_username = auto_field()