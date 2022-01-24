from marshmallow import fields
from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.guide import Guide
from serializers.tourist import TouristSchema


class GuideSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Guide
        load_instance = True

    username = auto_field()
    id_number = auto_field()
