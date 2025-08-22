import { useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import { FilterBar } from "../components/filter-bar.jsx";
import { StationInfoCard } from "../components/station-card.jsx";
import { StationsContext } from "../context/StationsContext.jsx";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Ícones
const greenIcon = new Icon({ iconUrl: "/pino-verde.png", iconSize: [30, 30], iconAnchor: [15, 30] });
const redIcon = new Icon({ iconUrl: "/pino-vermelho.png", iconSize: [30, 30], iconAnchor: [15, 30] });
const yellowIcon = new Icon({ iconUrl: "/pino-amarelo.png", iconSize: [30, 30], iconAnchor: [15, 30] });

const getIconByStatus = (status) => {
  if (status === "Operational") return greenIcon;
  if (status === "Not Operational") return redIcon;
  if (status === "Partly Operational (Mixed)") return yellowIcon;
  return greenIcon;
};

export default function Dashboard() {
  const { filteredStations } = useContext(StationsContext); // usar filteredStations
  const [selectedStation, setSelectedStation] = useState(null);

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-0 left-0 w-full z-[1000]">
        <FilterBar /> {/* A FilterBar deve atualizar filteredStations via contexto */}
      </div>

      <MapContainer
        center={[-14.2350, -51.9253]}
        zoom={4}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <ZoomControl position="bottomright" />

        {filteredStations
          ?.filter(station => station.latitude && station.longitude)
          .map((station, index) => (
            <Marker
              key={station.id || index}
              position={[station.latitude, station.longitude]}
              icon={getIconByStatus(station.status)}
              eventHandlers={{
                click: () => setSelectedStation(station),
              }}
            />
          ))}
      </MapContainer>

      {selectedStation && (
        <StationInfoCard
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}
    </div>
  );
}