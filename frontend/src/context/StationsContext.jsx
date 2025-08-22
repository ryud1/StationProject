import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const StationsContext = createContext();

export function StationsProvider({ children }) {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]); // Novo estado

  useEffect(() => {
    async function fetchStations() {
      try {
        const res = await api.get("/stations");
        setStations(res.data);
        setFilteredStations(res.data); // Inicialmente mostra todas
      } catch (err) {
        console.error("Erro ao buscar estações:", err);
      }
    }

    fetchStations();
  }, []);

  const addStation = (newStation) => {
    setStations((prevStations) => [...prevStations, newStation]);
    setFilteredStations((prevStations) => [...prevStations, newStation]);
  };

  const updateStation = (updatedStation) => {
    setStations((prev) =>
      prev.map((s) => (s.id === updatedStation.id ? updatedStation : s))
    );
    setFilteredStations((prev) =>
      prev.map((s) => (s.id === updatedStation.id ? updatedStation : s))
    );
  };

  return (
    <StationsContext.Provider
      value={{
        stations,
        filteredStations,
        setFilteredStations,
        addStation,
        updateStation,
      }}
    >
      {children}
    </StationsContext.Provider>
  );
}
