import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from database import db
from routes.routesStation import station_bp
from routes.routeApiStation import stationApi_bp
from routes.routesAuth import auth_bp

load_dotenv()

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

CORS(
    app,
    origins=["http://localhost:5173"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True
)

app.register_blueprint(station_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(stationApi_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
