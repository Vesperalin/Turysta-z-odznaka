from marshmallow_sqlalchemy.schema import auto_field
from app import ma
from models.evidence import Evidence


class EvidenceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Evidence
        load_instance = True

    id = auto_field()
    attachmentDate = auto_field()
    confirmationDate = auto_field()
    isConfirmed = auto_field()
    isWaiting = auto_field()
    photo_attachment = auto_field()
    gps_attachment = auto_field()
    tourist_username = auto_field()
    verifying_username = auto_field()
    mountain_group_id = auto_field()
