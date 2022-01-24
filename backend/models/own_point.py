from app import db
from models.base import BaseModel
from models.tourist import Tourist


class Own_point(db.Model, BaseModel):
    __tablename__ = 'punktywlasne'

    id = db.Column('id_punktu', db.Integer, primary_key=True)
    name = db.Column('nazwa', db.String(45), nullable=False)
    latitude = db.Column('szerokoscGeograficzna', db.Float, nullable=False)
    longitude = db.Column('dlugoscGeograficzna', db.Float, nullable=False)
    tourist_username = db.Column('FK_turysta', db.String(45), db.ForeignKey(
        'turysci.username'), nullable=False)
    tourist = db.relationship('Tourist', backref='own_points')
