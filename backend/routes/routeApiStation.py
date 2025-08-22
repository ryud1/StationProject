from flask import Blueprint, jsonify
from controllers.stationApi_controller import StationApiController

stationApi_bp = Blueprint("stationApi", __name__)

@stationApi_bp.route("/api/stations", methods=["GET"])
def get_all_stations():
    combined_data = StationApiController.get_all_stations()
    return jsonify(combined_data)