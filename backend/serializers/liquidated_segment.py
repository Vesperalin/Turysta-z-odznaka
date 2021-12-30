from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.liquidated_segment import Liquidated_segment


class Liquidated_segmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Liquidated_segment
        load_instance = True

    id = auto_field()
    liquidationDate = auto_field()
