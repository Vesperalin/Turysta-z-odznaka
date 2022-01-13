from app import db
from models.base import BaseModel
from models.tour import Tour
from models.labeled_segment import Labeled_segment
from models.evidence import Evidence


class Tour_segment(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'odcinkitrasy'

    id = db.Column('id_odcinekTrasy', db.Integer, primary_key=True)
    startDate = db.Column('dataRozpoczecia', db.Date, nullable=True)
    endDate = db.Column('dataZakonczenia', db.Date, nullable=True)
    creationDate = db.Column('dataUtworzenia', db.Date, nullable=False)
    through = db.Column('przez', db.String(45), nullable=True)
    isLabeled = db.Column('czyOpisany', db.Boolean, nullable=False)
    points = db.Column('punktacja', db.Integer, nullable=False)
    tour_id = db.Column('FK_trasy', db.Integer, db.ForeignKey(
        'trasy.id_trasy'), nullable=False)
    labeled_segment_id = db.Column('FK_odcinekOpisany', db.Integer, db.ForeignKey(
        'odcinkiopisane.id_odcinka'), nullable=True)
    # own_segment_id simplification - TOUR HAS ONLY LABELED SEGMENTS
    evidence_id = db.Column('FK_dowod', db.Integer, db.ForeignKey(
        'dowody.id_dowodu'), nullable=True)

    tour = db.relationship('Tour', backref="tour_segments")
    labeled_segment = db.relationship(
        'Labeled_segment', backref="tour_segments")
    evidence = db.relationship(
        'Evidence', backref="tour_segment")
