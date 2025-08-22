# routeStation.py
from flask import Blueprint
from controllers.station_controller import (
    get_stations,
    get_station,
    create_station,
    update_station,
    delete_station
)

station_bp = Blueprint("station", __name__)

station_bp.route("/api/cargas", methods=["GET"])(get_stations)
station_bp.route("/api/cargas/<int:id>", methods=["GET"])(get_station)
station_bp.route("/api/cargas", methods=["POST"])(create_station)
station_bp.route("/api/cargas/<int:id>", methods=["PUT"])(update_station)
station_bp.route("/api/cargas/<int:id>", methods=["DELETE"])(delete_station)
