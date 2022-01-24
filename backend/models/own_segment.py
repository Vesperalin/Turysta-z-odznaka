from app import db
from models.base import BaseModel

class Own_segment(db.Model, BaseModel):
    __table_args__ = {'extend_existing': True}
    __tablename__ = 'odcinkiwlasne'


    id = db.Column('id_odcinka', db.Integer, primary_key=True)
    height_diff = db.Column('roznicaWysokosci', db.Integer, nullable=False)
    length = db.Column('dlugosc', db.Integer, nullable=False)
    is_bidirectional = db.Column('czyDwukierunkowy', db.Boolean, nullable=False)
    points = db.Column('punktacja', db.Integer, nullable=False)
    start_own_point_id = db.Column('FK_punktPoczatkowyWlasny', db.Integer, db.ForeignKey('punktywlasne.id_punktu'))
    end_own_point_id = db.Column('FK_punktKoncowyWlasny', db.Integer, db.ForeignKey('punktywlasne.id_punktu'))
    start_labeled_point_id = db.Column('FK_punktPoczatkowyOpisany', db.Integer, db.ForeignKey('punktyopisane.id_punktu'))
    end_labeled_point_id = db.Column('FK_punktKoncowyOpisany', db.Integer, db.ForeignKey('punktyopisane.id_punktu'))
    
    start_own_point = db.relationship("Own_point", backref='start_of_own_segments', foreign_keys=[start_own_point_id])
    end_own_point = db.relationship("Own_point", backref='end_of_own_segments', foreign_keys=[end_own_point_id])
    start_labeled_point = db.relationship("Labeled_point", backref='start_of_own_segments', foreign_keys=[start_labeled_point_id])
    end_labeled_point = db.relationship("Labeled_point", backref='end_of_own_segments', foreign_keys=[end_labeled_point_id])
    

    mountain_group_id = db.Column('FK_grupaGorska', db.Integer, db.ForeignKey('grupygorskie.id_grupy'), nullable=False)
