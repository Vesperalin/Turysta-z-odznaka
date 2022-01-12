from app import db
from models.base import BaseModel
from sqlalchemy.orm import backref
from models.tourist import Tourist


class Tour(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'trasy'

    id = db.Column('id_trasy', db.Integer, primary_key=True)
    name = db.Column('nazwa', db.String(45), nullable=False)
    creationDate = db.Column('dataUtworzenia', db.Date, nullable=False)
    pointsSum = db.Column('sumaPunktow', db.Integer, nullable=False)
    startDate = db.Column('dataRozpoczecia', db.Date, nullable=True)
    endDate = db.Column('dataZakonczenia', db.Date, nullable=True)
    tourist_username = db.Column('FK_turysta', db.String(
        45), db.ForeignKey('turysci.username'), nullable=False)

    tourist = db.relationship('Tourist', backref=backref("tours", uselist=False))
