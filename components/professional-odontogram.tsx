"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  ZoomIn,
  ZoomOut,
  Save,
  PrinterIcon as Print,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"

// Dental conditions with professional colors
const dentalConditions = {
  healthy: { name: "Sano", color: "#10b981", bgColor: "#d1fae5", borderColor: "#6ee7b7" },
  caries: { name: "Caries", color: "#ef4444", bgColor: "#fee2e2", borderColor: "#fca5a5" },
  restoration: { name: "Restauración", color: "#f59e0b", bgColor: "#fef3c7", borderColor: "#fcd34d" },
  missing: { name: "Ausente", color: "#6b7280", bgColor: "#f3f4f6", borderColor: "#d1d5db" },
  crown: { name: "Corona", color: "#8b5cf6", bgColor: "#ede9fe", borderColor: "#c4b5fd" },
  implant: { name: "Implante", color: "#3b82f6", bgColor: "#dbeafe", borderColor: "#93c5fd" },
  bridge: { name: "Puente", color: "#f97316", bgColor: "#fed7aa", borderColor: "#fdba74" },
  extraction: { name: "Extracción", color: "#ec4899", bgColor: "#fce7f3", borderColor: "#f9a8d4" },
  endodontics: { name: "Endodoncia", color: "#7c3aed", bgColor: "#e9d5ff", borderColor: "#c084fc" },
  periodontics: { name: "Periodoncia", color: "#059669", bgColor: "#a7f3d0", borderColor: "#6ee7b7" },
}

// Tooth surfaces
const toothSurfaces = ["vestibular", "palatino", "oclusal", "lingual", "mesial", "distal", "gingival"]

// FDI tooth numbering system
const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

interface ToothCondition {
  toothNumber: number
  surface: string
  condition: keyof typeof dentalConditions
  date: string
  notes?: string
  status: "diagnostico" | "sin_realizar" | "realizado"
}

interface PatientInfo {
  name: string
  age: number
  phone: string
  email: string
  address: string
  lastVisit: string
}

interface ProfessionalOdontogramProps {
  patientInfo?: PatientInfo
  initialConditions?: ToothCondition[]
  onSave?: (conditions: ToothCondition[]) => void
}

export function ProfessionalOdontogram({
  patientInfo = {
    name: "Laura Medina",
    age: 28,
    phone: "+593 99 123 4567",
    email: "laura.medina@email.com",
    address: "Manta, Manabí, Ecuador",
    lastVisit: "2024-01-15",
  },
  initialConditions = [],
  onSave,
}: ProfessionalOdontogramProps) {
  const [conditions, setConditions] = useState<ToothCondition[]>(initialConditions)
  const [selectedCondition, setSelectedCondition] = useState<keyof typeof dentalConditions>("healthy")
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>(["oclusal"])
  const [activeTab, setActiveTab] = useState("diagnosticos")
  const [zoom, setZoom] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)

  const handleToothClick = useCallback(
    (toothNumber: number) => {
      setSelectedTooth(toothNumber)

      // Apply condition to selected surfaces
      const newConditions = selectedSurfaces.map((surface) => ({
        toothNumber,
        surface,
        condition: selectedCondition,
        date: new Date().toISOString().split("T")[0],
        status: activeTab as "diagnostico" | "sin_realizar" | "realizado",
      }))

      setConditions((prev) => {
        // Remove existing conditions for the same tooth and surfaces
        const filtered = prev.filter((c) => !(c.toothNumber === toothNumber && selectedSurfaces.includes(c.surface)))
        return [...filtered, ...newConditions]
      })
    },
    [selectedCondition, selectedSurfaces, activeTab],
  )

  const getToothConditions = useCallback(
    (toothNumber: number) => {
      return conditions.filter((c) => c.toothNumber === toothNumber)
    },
    [conditions],
  )

  const getToothColor = useCallback(
    (toothNumber: number) => {
      const toothConditions = getToothConditions(toothNumber)
      if (toothConditions.length === 0) return "#ffffff"

      // Return the color of the most recent condition
      const latestCondition = toothConditions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

      return dentalConditions[latestCondition.condition].bgColor
    },
    [getToothConditions],
  )

  const handleSurfaceToggle = (surface: string) => {
    setSelectedSurfaces((prev) => (prev.includes(surface) ? prev.filter((s) => s !== surface) : [...prev, surface]))
  }

  const handleSave = () => {
    onSave?.(conditions)
  }

  const getConditionStats = () => {
    const stats = Object.keys(dentalConditions).reduce(
      (acc, condition) => {
        acc[condition] = conditions.filter((c) => c.condition === condition).length
        return acc
      },
      {} as Record<string, number>,
    )
    return stats
  }

  const filteredConditions = conditions.filter(
    (c) =>
      searchTerm === "" ||
      c.toothNumber.toString().includes(searchTerm) ||
      dentalConditions[c.condition].name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const ToothComponent = ({ toothNumber, isUpper }: { toothNumber: number; isUpper: boolean }) => {
    const toothConditions = getToothConditions(toothNumber)
    const backgroundColor = getToothColor(toothNumber)
    const isSelected = selectedTooth === toothNumber

    return (
      <div className="flex flex-col items-center space-y-1">
        <div className="text-xs font-medium text-gray-600">{toothNumber}</div>
        <button
          onClick={() => handleToothClick(toothNumber)}
          className={`
            w-8 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${isSelected ? "ring-2 ring-blue-500 ring-offset-1" : ""}
          `}
          style={{
            backgroundColor,
            borderColor:
              toothConditions.length > 0 ? dentalConditions[toothConditions[0].condition].borderColor : "#d1d5db",
          }}
        >
          <div className="w-full h-full rounded-md flex items-center justify-center">
            {toothConditions.length > 0 && <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>}
          </div>
        </button>
        <div className="grid grid-cols-3 gap-px text-xs">
          {["M", "O", "D"].map((surface) => {
            const hasCondition = toothConditions.some((c) => c.surface.toLowerCase().startsWith(surface.toLowerCase()))
            return (
              <div key={surface} className={`w-2 h-1 rounded-sm ${hasCondition ? "bg-gray-400" : "bg-gray-200"}`} />
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="medical-header rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Odontograma Digital</h1>
              <p className="text-blue-100">Sistema de Diagnóstico Dental</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button variant="secondary" size="sm">
              <Print className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Patient Information Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Información del Paciente</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Nombre</Label>
                <p className="font-semibold">{patientInfo.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Edad</Label>
                <p>{patientInfo.age} años</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{patientInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{patientInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{patientInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Última visita: {patientInfo.lastVisit}</span>
              </div>
            </CardContent>
          </Card>

          {/* Condition Selector */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Diagnóstico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Condición</Label>
                <Select
                  value={selectedCondition}
                  onValueChange={(value: keyof typeof dentalConditions) => setSelectedCondition(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(dentalConditions).map(([key, condition]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: condition.color }} />
                          <span>{condition.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Superficies</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {toothSurfaces.map((surface) => (
                    <div key={surface} className="flex items-center space-x-2">
                      <Checkbox
                        id={surface}
                        checked={selectedSurfaces.includes(surface)}
                        onCheckedChange={() => handleSurfaceToggle(surface)}
                      />
                      <Label htmlFor={surface} className="text-sm capitalize">
                        {surface}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Leyenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(dentalConditions).map(([key, condition]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded border"
                      style={{
                        backgroundColor: condition.bgColor,
                        borderColor: condition.borderColor,
                      }}
                    />
                    <span className="text-sm">{condition.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Odontogram */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="diagnosticos">Diagnósticos</TabsTrigger>
                    <TabsTrigger value="sin_realizar">Sin Realizar</TabsTrigger>
                    <TabsTrigger value="realizado">Realizados</TabsTrigger>
                    <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="diagnosticos" className="space-y-6">
                  {/* Odontogram */}
                  <div
                    className="bg-gray-50 rounded-lg p-6"
                    style={{ transform: `scale(${zoom})`, transformOrigin: "center top" }}
                  >
                    {/* Upper Teeth */}
                    <div className="mb-8">
                      <div className="text-center text-sm font-medium text-gray-600 mb-4">Arcada Superior</div>
                      <div className="flex justify-center space-x-2">
                        {upperTeeth.map((toothNumber) => (
                          <ToothComponent key={toothNumber} toothNumber={toothNumber} isUpper={true} />
                        ))}
                      </div>
                    </div>

                    {/* Lower Teeth */}
                    <div>
                      <div className="text-center text-sm font-medium text-gray-600 mb-4">Arcada Inferior</div>
                      <div className="flex justify-center space-x-2">
                        {lowerTeeth.map((toothNumber) => (
                          <ToothComponent key={toothNumber} toothNumber={toothNumber} isUpper={false} />
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sin_realizar" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar tratamientos pendientes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    {filteredConditions
                      .filter((c) => c.status === "sin_realizar")
                      .map((condition, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="bg-yellow-100">
                              Diente {condition.toothNumber}
                            </Badge>
                            <span className="font-medium">{dentalConditions[condition.condition].name}</span>
                            <span className="text-sm text-gray-600 capitalize">{condition.surface}</span>
                          </div>
                          <div className="text-sm text-gray-500">{condition.date}</div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="realizado" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar tratamientos realizados..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    {filteredConditions
                      .filter((c) => c.status === "realizado")
                      .map((condition, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline" className="bg-green-100">
                              Diente {condition.toothNumber}
                            </Badge>
                            <span className="font-medium">{dentalConditions[condition.condition].name}</span>
                            <span className="text-sm text-gray-600 capitalize">{condition.surface}</span>
                          </div>
                          <div className="text-sm text-gray-500">{condition.date}</div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="estadisticas">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(getConditionStats()).map(([condition, count]) => (
                      <Card key={condition}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded"
                              style={{
                                backgroundColor: dentalConditions[condition as keyof typeof dentalConditions].color,
                              }}
                            />
                            <div>
                              <p className="text-sm font-medium">
                                {dentalConditions[condition as keyof typeof dentalConditions].name}
                              </p>
                              <p className="text-2xl font-bold">{count}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
