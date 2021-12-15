from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.tourist import Tourist

class TouristSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tourist
        load_instance = True

    username = auto_field()
    password = auto_field()
    name = auto_field()
    surname = auto_field()
    email = auto_field()
    birth_date = auto_field()
    is_invalid = auto_field()
    own_points = auto_field()