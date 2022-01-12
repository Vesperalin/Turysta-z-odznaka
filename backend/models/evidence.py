from app import db
from models.base import BaseModel
from models.tourist import Tourist
from models.mountain_group import Mountain_group


class Evidence(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'dowody'

    id = db.Column('id_dowodu', db.Integer, primary_key=True)
    attachmentDate = db.Column('dataZalaczenia', db.Date, nullable=False)
    confirmationDate = db.Column('dataZatwierdzenia', db.Date, nullable=True)
    isConfirmed = db.Column('czyZatwierdzony', db.Boolean, nullable=False)
    isWaiting = db.Column('czyOczekujacy', db.Boolean, nullable=False)
    photo_attachment = db.Column('fotografia', db.String(255), nullable=True)
    gps_attachment = db.Column('wypisGPS', db.String(255), nullable=True)
    
    tourist_username = db.Column('FK_turysta', db.String(45), db.ForeignKey('turysci.username'), nullable=False)
    verifying_username = db.Column('FK_zatwierdzajacy', db.String(45), db.ForeignKey('turysci.username'), nullable=True)
    mountain_group_id = db.Column('FK_grupaGorska', db.Integer, db.ForeignKey('grupygorskie.id_grupy'), nullable=True)

    tourist = db.relationship('Tourist', backref="evidences", foreign_keys=[tourist_username])
    verifying = db.relationship('Tourist', backref="evidences_to_confirm", foreign_keys=[verifying_username])
    