from app import db
from backend.models.base import BaseModel

class Mountain_group(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'grupygorskie'


    id = db.Column('id_grupy', db.Integer, primary_key=True)
    name = db.Column('nazwa', db.String(45), nullable=False)
    country = db.Column('kraj', db.String(45), nullable=False)
