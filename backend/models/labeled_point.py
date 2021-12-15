from app import db
from backend.models.base import BaseModel

class Labeled_point(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'punktyopisane'


    id = db.Column('id_punktu', db.Integer, primary_key=True)
    name = db.Column('nazwa', db.String(45), nullable=False, unique=True)
    height = db.Column('wysokosc', db.Float, nullable=True)
