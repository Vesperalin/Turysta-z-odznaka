from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.labeled_point import Labeled_point

class Labeled_pointSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Labeled_point
        load_instance = True

    id = auto_field()
    name = auto_field()
    height = auto_field()