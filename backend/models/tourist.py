from sqlalchemy.orm import backref
from app import db
from backend.models.base import BaseModel


class Tourist(db.Model, BaseModel):

    __tablename__ = 'turysci'

    username = db.Column(db.String(32), primary_key=True)
    password = db.Column('haslo', db.String(32), nullable=False, unique=True)
    name = db.Column('imie', db.String(45), nullable=False)
    surname = db.Column('nazwisko', db.String(45), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    birth_date = db.Column('dataUrodzenia', db.Date, nullable=False)
    is_invalid = db.Column('czyOsobaNiepelnosprawna',
                           db.Boolean, nullable=False)

    own_points = db.relationship(
        'Own_point', backref=backref('owner'), lazy=True)
