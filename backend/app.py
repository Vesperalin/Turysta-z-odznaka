from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from environment.config import db_URI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

from flask_autodoc.autodoc import Autodoc
auto = Autodoc(app)

# Simplification
username = "jankowalski"

from API import labeled_pointsAPI, own_pointsAPI, tour_creationAPI, evidence_confirmationAPI

app.register_blueprint(labeled_pointsAPI.router,
                       url_prefix="/labeled-points")
app.register_blueprint(own_pointsAPI.router,
                       url_prefix="/own-points")
app.register_blueprint(tour_creationAPI.router,
                       url_prefix="/tour-creation")
app.register_blueprint(evidence_confirmationAPI.router,
                       url_prefix="/evidence-confirmation")


if __name__ == "__main__":
    app.run(debug=True)
