import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Navigation, Save, ArrowLeft } from "lucide-react";
import { StationsContext } from "../context/StationsContext.jsx";
import api from "../services/api";

export function EditStation() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { stations, updateStation } = useContext(StationsContext);

  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    latitude: "",
    longitude: "",
    carregamento_tipo: "",
    poder: "",
    slots: "",
    status: "",
    uf: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const station = stations.find((s) => s.id === parseInt(id));
    if (station) {
      setFormData({
        id: station.id,
        nome: station.nome,
        latitude: station.latitude,
        longitude: station.longitude,
        carregamento_tipo: station.carregamento_tipo,
        poder: station.poder,
        slots: station.slots,
        status: station.status,
        uf: station.uf,
      });
    }
  }, [id, stations]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = "Nome é obrigatório";
    if (!formData.latitude) newErrors.latitude = "Latitude é obrigatória";
    else if (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90)
      newErrors.latitude = "Latitude inválida";
    if (!formData.longitude) newErrors.longitude = "Longitude é obrigatória";
    else if (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180)
      newErrors.longitude = "Longitude inválida";
    if (!formData.carregamento_tipo) newErrors.carregamento_tipo = "Tipo de carregamento é obrigatório";
    if (!formData.poder || isNaN(formData.poder)) newErrors.poder = "Potência inválida";
    if (!formData.slots || isNaN(formData.slots)) newErrors.slots = "Número de vagas inválido";
    if (!formData.status) newErrors.status = "Status é obrigatório";
    if (!formData.uf) newErrors.uf = "UF é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: parseInt(formData.id),
      nome: formData.nome,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      carregamento_tipo: formData.carregamento_tipo,
      poder: parseFloat(formData.poder),
      slots: parseInt(formData.slots),
      status: formData.status,
      uf: formData.uf,
    };

    try {
      const response = await api.put(`/cargas/${formData.id}`, payload);
      updateStation(response.data);
      alert("Estação atualizada com sucesso!");
      navigate("/listagem");
    } catch (err) {
      console.log(err.response?.data)
      alert("Erro ao atualizar estação: " + (err.response?.data || err.message));
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-card relative">
      <CardHeader className="text-center space-y-4 pb-6 relative">
        <div className="absolute top-4 left-4">
          <Button variant="ghost" onClick={() => navigate("/listagem")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
        </div>

        <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Zap className="w-8 h-8 text-primary-foreground" />
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-foreground">Editar Estação</CardTitle>
          <CardDescription className="text-muted-foreground">
            Atualize as informações da estação de carregamento
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
              required
            />
            {errors.nome && <p className="text-red-500 text-xs">{errors.nome}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude *</Label>
              <Input
                id="latitude"
                value={formData.latitude}
                onChange={(e) => handleInputChange("latitude", e.target.value)}
                className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
              {errors.latitude && <p className="text-red-500 text-xs">{errors.latitude}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude *</Label>
              <Input
                id="longitude"
                value={formData.longitude}
                onChange={(e) => handleInputChange("longitude", e.target.value)}
                className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
              {errors.longitude && <p className="text-red-500 text-xs">{errors.longitude}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carregamento_tipo">Tipo de Carregador *</Label>
              <Select value={formData.carregamento_tipo} onValueChange={(value) => handleInputChange("carregamento_tipo", value)}>
                <SelectTrigger className="h-12 bg-input border-border">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC">AC</SelectItem>
                  <SelectItem value="DC">DC</SelectItem>
                  <SelectItem value="BOTH">AC + DC</SelectItem>
                </SelectContent>
              </Select>
              {errors.carregamento_tipo && <p className="text-red-500 text-xs">{errors.carregamento_tipo}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="h-12 bg-input border-border">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="manutenção">Manutenção</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="poder">Potência (kW) *</Label>
              <Input
                id="poder"
                value={formData.poder}
                onChange={(e) => handleInputChange("poder", e.target.value)}
                className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
              {errors.poder && <p className="text-red-500 text-xs">{errors.poder}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slots">Número de Vagas *</Label>
              <Input
                id="slots"
                value={formData.slots}
                onChange={(e) => handleInputChange("slots", e.target.value)}
                className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
              {errors.slots && <p className="text-red-500 text-xs">{errors.slots}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uf">UF *</Label>
            <Input
              id="uf"
              value={formData.uf}
              onChange={(e) => handleInputChange("uf", e.target.value)}
              className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
              required
            />
            {errors.uf && <p className="text-red-500 text-xs">{errors.uf}</p>}
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-accent text-primary-foreground font-semibold transition-all duration-200 transform hover:scale-[1.02]"
            >
              <Save className="w-4 h-4 mr-2" />
              Atualizar Estação
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
