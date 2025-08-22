from models.station import Station
from database import db
from schemas.station_schema import StationSchema
from flask import current_app
import requests

station_schema = StationSchema()
stations_schema = StationSchema(many=True)

class StationApiController:
    @staticmethod
    def fetch_external_stations(maxresults=1000):
        api_key = current_app.config.get("OPENCHARGEMAP_API_KEY")
        url = "https://api.openchargemap.io/v3/poi/"
        params = {
            "key": api_key,
            "maxresults": maxresults,
            "output": "json",
            "verbose": True
        }
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            stations = []
            for s in data:
                info = s.get("AddressInfo", {})
                infoStatus = s.get("StatusType", {})
                connections = s.get("Connections", [])

                if connections:
                    connection = connections[0]
                    current_type = connection.get("CurrentType")
                    if current_type:
                        current_type = current_type.get("Title")
                    power_kw = connection.get("PowerKW")
                    quantity = connection.get("Quantity")
                else:
                    current_type = None
                    power_kw = None
                    quantity = None

                stations.append({
                    "id": s.get("ID"),
                    "nome": info.get("Title"),
                    "latitude": info.get("Latitude"),
                    "longitude": info.get("Longitude"),
                    "carregamento_tipo": current_type,
                    "poder": power_kw,
                    "slots": quantity,
                    "status": infoStatus.get("Title"),
                    "uf": info.get("StateOrProvince") if info.get("StateOrProvince") else None
                })
            return stations
        except requests.RequestException as e:
            print("Erro ao buscar API externa:", e)
            return []


    @staticmethod
    def get_all_stations():
        local_stations = Station.query.all()
        local_data = stations_schema.dump(local_stations)

        external_data = StationApiController.fetch_external_stations()

        return local_data + external_data
