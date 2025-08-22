import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { X, Filter, Plus, LogOut, Zap, List } from "lucide-react";
import { StationsContext } from "../context/StationsContext.jsx";

export function FilterBar() {
  const navigate = useNavigate();
  const { stations, setFilteredStations } = useContext(StationsContext);

  const [showFilters, setShowFilters] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterUF, setFilterUF] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [ufOptions, setUfOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  // Extrair UFs e status únicos das estações
  useEffect(() => {
    const ufs = Array.from(new Set(stations.map(s => s.uf?.trim()).filter(Boolean)));
    const status = Array.from(new Set(stations.map(s => s.status?.trim()).filter(Boolean)));
    setUfOptions(ufs);
    setStatusOptions(status);
  }, [stations]);

  // Filtrar automaticamente sempre que algum filtro mudar
  useEffect(() => {
    const filtered = stations.filter(station => {
      const nameMatch = !filterName || station.nome?.toLowerCase().includes(filterName.toLowerCase());
      const ufMatch = !filterUF || station.uf?.trim() === filterUF.trim();
      const statusMatch = !filterStatus || station.status?.trim().toLowerCase() === filterStatus.toLowerCase();

      return nameMatch && ufMatch && statusMatch;
    });

    setFilteredStations(filtered);
  }, [filterName, filterUF, filterStatus, stations, setFilteredStations]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Zap className="w-6 h-6 text-primary" />

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 hover:bg-accent rounded-xl px-4 py-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </Button>

            {showFilters && (
              <div className="absolute top-12 left-0 bg-card/95 backdrop-blur-md rounded-lg border border-border shadow-xl p-4 z-50 w-80">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Filtros</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <Input
                    placeholder="Nome da estação"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                  />

                  <Select onValueChange={(value) => setFilterUF(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent portalled className="z-[9999]">
                      {ufOptions.map((uf) => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(value) => setFilterStatus(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent portalled className="z-[9999]">
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </div>
              </div>
            )}
          </div>

          <Button
            size="lg"
            className="flex items-center space-x-2 h-12 px-6 bg-primary text-primary-foreground font-semibold shadow-md hover:scale-105 transition-all duration-200"
            onClick={() => navigate("/cadastro")}
          >
            <Plus className="w-5 h-5" />
            <span>Nova Estação</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:bg-accent rounded-xl px-4 py-2"
            onClick={() => navigate("/listagem")}
          >
            <List className="w-5 h-5" />
            <span>Listagem</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          className="flex items-center space-x-2 hover:bg-red-500/20 rounded-xl px-3 py-2 transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-red-500 font-medium">Sair</span>
        </Button>
      </div>
    </div>
  );
}
