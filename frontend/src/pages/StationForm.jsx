import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, MapPin, Plug, Save, Navigation, ArrowLeft } from "lucide-react"
import { StationsContext } from "../context/StationsContext.jsx"
import api from "../services/api";

export function StationForm() {
  const navigate = useNavigate()
  const { stations, addStation } = useContext(StationsContext)

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
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.id || isNaN(formData.id)) newErrors.id = "ID é obrigatório e deve ser numérico"
    else if (stations.some((s) => s.id === formData.id)) newErrors.id = "ID já existe"

    if (!formData.nome) newErrors.nome = "Nome é obrigatório"
    if (!formData.latitude) newErrors.latitude = "Latitude é obrigatória"
    else if (isNaN(formData.latitude)) newErrors.latitude = "Latitude deve ser numérica"
    else if (formData.latitude < -90 || formData.latitude > 90) newErrors.latitude = "Latitude deve estar entre -90 e 90"

    if (!formData.longitude) newErrors.longitude = "Longitude é obrigatória"
    else if (isNaN(formData.longitude)) newErrors.longitude = "Longitude deve ser numérica"
    else if (formData.longitude < -180 || formData.longitude > 180) newErrors.longitude = "Longitude deve estar entre -180 e 180"

    if (!formData.carregamento_tipo) newErrors.carregamento_tipo = "Tipo de carregamento é obrigatório"
    if (!formData.poder) newErrors.poder = "Potência é obrigatória"
    else if (isNaN(formData.poder)) newErrors.poder = "Potência deve ser numérica"

    if (!formData.slots) newErrors.slots = "Número de vagas é obrigatório"
    else if (isNaN(formData.slots)) newErrors.slots = "Vagas deve ser numérico"

    if (!formData.status) newErrors.status = "Status é obrigatório"
    if (!formData.uf) newErrors.uf = "UF é obrigatória"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

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
      const response = await api.post("/cargas", payload);

      addStation(response.data)
      alert("Cadastrado com sucesso!")
      navigate("/dashboard")
    } catch (err) {
        const message = err.response?.data || err.message;
        alert(`Erro ao cadastrar estação: ${JSON.stringify(message)}`);
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-card relative">
      <CardHeader className="text-center space-y-4 pb-6 relative">
        <div className="absolute top-4 left-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
        </div>

        <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <Zap className="w-8 h-8 text-primary-foreground" />
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-foreground">Cadastrar Estação</CardTitle>
          <CardDescription className="text-muted-foreground">
            Preencha as informações da nova estação de carregamento
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID */}
          <div className="space-y-2">
            <Label htmlFor="id" className="text-sm font-medium text-foreground">ID *</Label>
            <Input
              id="id"
              placeholder="Ex: 101"
              value={formData.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
              className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
              required
            />
            {errors.id && <p className="text-red-500 text-xs">{errors.id}</p>}
          </div>

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium text-foreground">Nome *</Label>
            <Input
              id="nome"
              placeholder="Ex: Estação Shopping Center"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
              required
            />
            {errors.nome && <p className="text-red-500 text-xs">{errors.nome}</p>}
          </div>

          {/* Latitude / Longitude */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-sm font-medium text-foreground">Latitude *</Label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="latitude"
                  placeholder="-23.5505"
                  value={formData.latitude}
                  onChange={(e) => handleInputChange("latitude", e.target.value)}
                  className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              {errors.latitude && <p className="text-red-500 text-xs">{errors.latitude}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-sm font-medium text-foreground">Longitude *</Label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="longitude"
                  placeholder="-46.6333"
                  value={formData.longitude}
                  onChange={(e) => handleInputChange("longitude", e.target.value)}
                  className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              {errors.longitude && <p className="text-red-500 text-xs">{errors.longitude}</p>}
            </div>
          </div>

          {/* Tipo / Potência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slots" className="text-sm font-medium text-foreground">Número de Vagas *</Label>
              <Input
                id="slots"
                placeholder="Ex: 4"
                value={formData.slots}
                onChange={(e) => handleInputChange("slots", e.target.value)}
                className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
              {errors.slots && <p className="text-red-500 text-xs">{errors.slots}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="poder" className="text-sm font-medium text-foreground">Potência (kW) *</Label>
              <Input
                id="poder"
                placeholder="Ex: 22"
                value={formData.poder}
                onChange={(e) => handleInputChange("poder", e.target.value)}
                className="h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                required
              />
              {errors.poder && <p className="text-red-500 text-xs">{errors.poder}</p>}
            </div>
          </div>

          {/* Vagas / Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carregamento_tipo" className="text-sm font-medium text-foreground">Tipo de Carregador *</Label>
              <Select onValueChange={(value) => handleInputChange("carregamento_tipo", value)}>
                <SelectTrigger className="h-12 bg-input border-border">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC">AC (Corrente Alternada)</SelectItem>
                  <SelectItem value="DC">DC (Corrente Contínua)</SelectItem>
                  <SelectItem value="BOTH">Ambos (AC + DC)</SelectItem>
                </SelectContent>
              </Select>
              {errors.carregamento_tipo && <p className="text-red-500 text-xs">{errors.carregamento_tipo}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-foreground">Status *</Label>
              <Select onValueChange={(value) => handleInputChange("status", value)}>
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

          {/* UF */}
          <div className="space-y-2">
            <Label htmlFor="uf" className="text-sm font-medium text-foreground">UF *</Label>
            <Input
              id="uf"
              placeholder="Ex: SP"
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
              Cadastrar Estação
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
