# station_controller.py
from models.station import Station
from database import db
from schemas.station_schema import StationSchema
from flask import request, jsonify

station_schema = StationSchema()
stations_schema = StationSchema(many=True)

def get_stations():
    stations = Station.query.all()
    return jsonify(stations_schema.dump(stations)), 200

def get_station(id):
    station = Station.query.get_or_404(id)
    return jsonify(station_schema.dump(station)), 200

def create_station():
    data = request.get_json()

    existing_station = Station.query.get(data.get("id"))
    if existing_station:
        return jsonify({"error": f"Uma estação com o ID {data.get('id')} já existe."}), 400

    errors = station_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    station = Station(**data)
    db.session.add(station)
    db.session.commit()
    return jsonify(station_schema.dump(station)), 201

def update_station(id):
    station = Station.query.get_or_404(id)
    data = request.get_json()
    errors = station_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    for key, value in data.items():
        setattr(station, key, value)
    db.session.commit()
    return jsonify(station_schema.dump(station)), 200

def delete_station(id):
    station = Station.query.get_or_404(id)
    db.session.delete(station)
    db.session.commit()
    return '', 204
