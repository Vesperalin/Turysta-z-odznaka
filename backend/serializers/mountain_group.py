from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.mountain_group import Mountain_group

class Mountain_groupSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Mountain_group
        load_instance = True

    id = auto_field()
    name = auto_field()
    country = auto_field()