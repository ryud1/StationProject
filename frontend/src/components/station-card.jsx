import { Button } from "@/components/ui/button";
import { Zap, X, Battery, Clock, Users, MapPin } from "lucide-react";

export function StationInfoCard({ station, onClose }) {
  if (!station) return null;

  const normalizedStatus = station.status?.trim().toLowerCase();

  // Status conhecidos com cores e textos
  const knownStatusMap = {
    operational: { color: "text-green-500", text: "Disponível" },
    "not operational": { color: "text-red-500", text: "Indisponível" },
    "partly operational (mixed)": { color: "text-yellow-500", text: "Manutenção" },
    available: { color: "text-green-500", text: "Disponível" },
    occupied: { color: "text-red-500", text: "Indisponível" },
    maintenance: { color: "text-yellow-500", text: "Manutenção" },
    // Outros status que você quiser destacar
    planned: { color: "text-blue-500", text: "Planejada" },
  };

  // Verifica se o status é conhecido, se não, usa cor fixa e texto original
  const { color, text } = knownStatusMap[normalizedStatus] || {
    color: "text-blue-500",
    text: station.status || "Desconhecido",
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 rounded-full p-2">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{station.nome}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p><strong>ID:</strong> {station.id}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Status</span>
            <span className={`text-sm font-semibold ${color}`}>{text}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Battery className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Potência (kW)</p>
                <p className="text-sm font-medium">{station.poder || "-"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Tipo de carregamento</p>
                <p className="text-sm font-medium">{station.carregamento_tipo || "-"}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Vagas</p>
                <p className="text-sm font-medium">{station.slots || "-"}</p>
              </div>
            </div>
            {station.uf && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">UF</p>
                  <p className="text-sm font-medium">{station.uf}</p>
                </div>
              </div>
            )}
          </div>

          {station.latitude && station.longitude && (
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Coordenadas</p>
                <p className="text-sm text-foreground">
                  Lat: {station.latitude}, Lng: {station.longitude}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
