from flask import Flask, request
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from environment.config import db_URI


app = Flask(__name__)

#TODO config file


app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

from backend.models.labeled_point import Labeled_point
from backend.serializers.labeled_point import Labeled_pointSchema

labeled_point_schema = Labeled_pointSchema()


@app.route('/labeled-points', methods=['GET'])
def get_labeled_points():
    all_labeled_points = Labeled_point.query.all()
    return labeled_point_schema.jsonify(all_labeled_points, many=True), 200


@app.route('/labeled-points/<int:id>/', methods=['GET'])
def get_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)

    if not labeled_point:
        return {'message': 'Labeled point not available'}, 404

    return labeled_point_schema.jsonify(labeled_point)


@app.route('/labeled-points', methods=['POST'])
def add_labeled_point():
    name = request.json['nazwa']
    height = request.json['wysokosc']

    labeled_point = Labeled_point(name, height)
    labeled_point.save()

    return labeled_point_schema.jsonify(labeled_point)


@app.route('/labeled-points/<int:id>/', methods=['PUT'])
def update_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)
    name = request.json['nazwa']
    height = request.json['wysokosc']

    labeled_point.nazwa = name
    labeled_point.wysokosc = height

    labeled_point.save()
    return labeled_point_schema.jsonify(labeled_point)


@app.route('/labeled-points/<int:id>/', methods=['DELETE'])
def delete_labeled_point(id):
    labeled_point = Labeled_point.query.get(id)
    labeled_point.remove()
    return labeled_point_schema.jsonify(labeled_point)


if __name__ == "__main__":
    app.run(debug=True)
