from app import db
from backend.models.base import BaseModel

class Labeled_point(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'punktyopisane'


    id_punktu = db.Column(db.Integer, primary_key = True)
    nazwa = db.Column(db.String, nullable=False, unique=True)
    wysokosc = db.Column(db.Float, nullable=True)

    def __init__(self, nazwa, wysokosc):
        self.nazwa = nazwa
        self.wysokosc = wysokosc