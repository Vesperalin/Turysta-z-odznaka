from sqlalchemy.orm import backref
from app import db
from backend.models.base import BaseModel
from models.tourist import Tourist


class Guide(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'przewodnicy'

    username = db.Column('FK_username', db.String(32), db.ForeignKey('turysci.username'), primary_key=True)
    id_number = db.Column('nrLegitymacji', db.Integer, nullable=False)

    tourist = db.relationship("Tourist", backref=backref("guide", uselist=False))