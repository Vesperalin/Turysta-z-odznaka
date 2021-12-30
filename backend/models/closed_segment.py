from app import db
from backend.models.base import BaseModel

class Closed_segment(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'odcinkiNieczynne'


    id = db.Column('id_odcinkaNieczynnego', db.Integer, primary_key=True)
    closureDate = db.Column('dataZamkniecia', db.Date, nullable=False)
    openingDate = db.Column('dataPonownegoOtwarcia', db.Date, nullable=True)
    segment_id = db.Column('FK_id_odcinka', db.Integer, db.ForeignKey('odcinkiopisane.id_odcinka'), nullable=False)

    segment = db.relationship("Labeled_segment", backref='closed_segments', foreign_keys=[segment_id])
