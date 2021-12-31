from app import db
from backend.models.base import BaseModel
from models.mountain_group import Mountain_group

class Labeled_segment(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'odcinkiopisane'


    id = db.Column('id_odcinka', db.Integer, primary_key=True)
    through = db.Column('przez', db.String(45), nullable=True)
    color = db.Column('FK_kolor', db.String(45), nullable=False)    # TODO Enum type
    is_bidirectional = db.Column('czyDwukierunkowy', db.Boolean, nullable=False)
    points = db.Column('punktacja', db.Integer, nullable=False)
    start_point_id = db.Column('FK_punktPoczatkowy', db.Integer, db.ForeignKey('punktyopisane.id_punktu'), nullable=False)
    end_point_id = db.Column('FK_punktKoncowy', db.Integer, db.ForeignKey('punktyopisane.id_punktu'), nullable=False)
    mountain_group_id = db.Column('FK_grupaGorska', db.Integer, db.ForeignKey('grupygorskie.id_grupy'), nullable=False)

    mountain_group = db.relationship('Mountain_group', backref='segments', lazy=True)
    start_point = db.relationship("Labeled_point", backref='start_of_labeled_segments', foreign_keys=[start_point_id])
    end_point = db.relationship("Labeled_point", backref='end_of_labeled_segments', foreign_keys=[end_point_id])

    
