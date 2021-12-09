from app import ma
from models.labeled_point import Labeled_point

class Labeled_pointSchema(ma.Schema):
    class Meta:
        fields = ('id_punktu', 'nazwa', 'wysokosc')
        # model = Labeled_point