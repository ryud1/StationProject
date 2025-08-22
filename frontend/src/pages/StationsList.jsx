import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Search, Zap, ArrowLeft, Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { StationsContext } from "../context/StationsContext.jsx";
import api from "../services/api";

const ITEMS_PER_PAGE = 8;

export default function StationsList() {
  const { stations, setFilteredStations } = useContext(StationsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredStations = stations.filter(
    (station) =>
      (station.nome || station.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (station.uf || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStations = filteredStations.slice(startIndex, endIndex);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "operacional":
      case "operational":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "manutenção":
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "inativo":
      case "not operational":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case "operacional":
      case "operational":
        return "Operacional";
      case "manutenção":
      case "maintenance":
        return "Manutenção";
      case "inativo":
      case "not operational":
        return "Inativo";
      default:
        return status || "Desconhecido";
    }
  };

  const handleDelete = async (stationId) => {
    if (!confirm("Tem certeza que deseja deletar esta estação?")) return;

    try {
      await api.delete(`/cargas/${stationId}`);
      alert("Estação deletada com sucesso!");
      setFilteredStations(prev => prev.filter(s => s.id !== stationId));
      window.location.reload();
    } catch (err) {
      alert("Erro ao deletar estação: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 rounded-full p-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Estações Elétricas</h1>
                <p className="text-muted-foreground">Gerencie todas as estações cadastradas</p>
              </div>
            </div>
          </div>
          <Link to="/cadastro">
            <Button className="bg-primary hover:bg-accent text-primary-foreground">
              <Zap className="w-4 h-4 mr-2" />
              Nova Estação
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome ..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lista de Estações</span>
              <span className="text-sm font-normal text-muted-foreground">
                {filteredStations.length} estação(ões) encontrada(s)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">UF</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStations.map((station) => (
                    <tr key={station.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Zap className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{station.nome || station.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-foreground font-medium">{station.uf}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(station.status)}>
                          {getStatusText(station.status)}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/edit/${station.id}`)}
                          className="flex items-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Editar</span>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(station.id)}
                          className="flex items-center space-x-1"
                        >
                          <Trash className="w-4 h-4" />
                          <span>Deletar</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {currentStations.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-muted/30 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma estação encontrada</h3>
                <p className="text-muted-foreground">Tente ajustar os termos de busca</p>
              </div>
            )}

            {/* Paginação limitada a 5 páginas */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, filteredStations.length)} de{" "}
                  {filteredStations.length} estações
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>

                  <div className="flex items-center space-x-1">
                    {(() => {
                      const pages = [];
                      let startPage = Math.max(currentPage - 2, 1);
                      let endPage = Math.min(startPage + 4, totalPages);
                      startPage = Math.max(endPage - 4, 1);

                      for (let page = startPage; page <= endPage; page++) {
                        pages.push(
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        );
                      }
                      return pages;
                    })()}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
