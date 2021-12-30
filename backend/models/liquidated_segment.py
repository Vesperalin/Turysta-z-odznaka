from app import db
from backend.models.base import BaseModel

class Liquidated_segment(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'odcinkiZlikwidowane'


    id = db.Column('FK_id_odcinka', db.Integer, db.ForeignKey('odcinkiopisane.id_odcinka'), primary_key=True)
    liquidationDate = db.Column('dataZlikwidowania', db.Date, nullable=False)

    segment = db.relationship("Labeled_segment", backref='closed_segments', foreign_keys=[id])
