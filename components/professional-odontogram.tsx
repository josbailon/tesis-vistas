"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Save, Search, Filter, ZoomIn, ZoomOut, RotateCcw, User, Printer, Download } from "lucide-react"

// Dental conditions with professional colors
const dentalConditions = {
  healthy: { name: "Sano", color: "#22c55e", bgColor: "#dcfce7", textColor: "#166534" },
  caries: { name: "Caries", color: "#ef4444", bgColor: "#fecaca", textColor: "#991b1b" },
  restoration: { name: "Restauración", color: "#f59e0b", bgColor: "#fef3c7", textColor: "#92400e" },
  crown: { name: "Corona", color: "#8b5cf6", bgColor: "#ede9fe", textColor: "#5b21b6" },
  implant: { name: "Implante", color: "#3b82f6", bgColor: "#dbeafe", textColor: "#1e40af" },
  bridge: { name: "Puente", color: "#f97316", bgColor: "#fed7aa", textColor: "#9a3412" },
  missing: { name: "Ausente", color: "#6b7280", bgColor: "#f3f4f6", textColor: "#374151" },
  extraction: { name: "Extracción", color: "#ec4899", bgColor: "#fce7f3", textColor: "#be185d" },
  endodontics: { name: "Endodoncia", color: "#06b6d4", bgColor: "#cffafe", textColor: "#0e7490" },
  periodontal: { name: "Periodontal", color: "#84cc16", bgColor: "#ecfccb", textColor: "#365314" },
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
  professional?: string
}

interface PatientInfo {
  name: string
  id: string
  age: number
  lastVisit: string
}

interface ProfessionalOdontogramProps {
  patientInfo?: PatientInfo
  initialConditions?: ToothCondition[]
  onSave?: (conditions: ToothCondition[]) => void
  readOnly?: boolean
}

export function ProfessionalOdontogram({
  patientInfo = { name: "Laura Medina", id: "12345", age: 28, lastVisit: "2024-01-15" },
  initialConditions = [],
  onSave,
  readOnly = false,
}: ProfessionalOdontogramProps) {
  const [conditions, setConditions] = useState<ToothCondition[]>(initialConditions)
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [selectedCondition, setSelectedCondition] = useState<keyof typeof dentalConditions>("healthy")
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("diagnosticos")
  const [zoom, setZoom] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCondition, setFilterCondition] = useState<string>("all")

  const handleToothClick = useCallback(
    (toothNumber: number) => {
      if (readOnly) return
      setSelectedTooth(toothNumber)
    },
    [readOnly],
  )

  const handleSurfaceToggle = useCallback((surface: string) => {
    setSelectedSurfaces((prev) => (prev.includes(surface) ? prev.filter((s) => s !== surface) : [...prev, surface]))
  }, [])

  const applyCondition = useCallback(() => {
    if (!selectedTooth || selectedSurfaces.length === 0) return

    const newConditions = selectedSurfaces.map((surface) => ({
      toothNumber: selectedTooth,
      surface,
      condition: selectedCondition,
      date: new Date().toISOString().split("T")[0],
      professional: "Dr. Sistema",
    }))

    setConditions((prev) => {
      const filtered = prev.filter((c) => !(c.toothNumber === selectedTooth && selectedSurfaces.includes(c.surface)))
      return [...filtered, ...newConditions]
    })

    setSelectedSurfaces([])
  }, [selectedTooth, selectedSurfaces, selectedCondition])

  const getToothConditions = useCallback(
    (toothNumber: number) => {
      return conditions.filter((c) => c.toothNumber === toothNumber)
    },
    [conditions],
  )

  const getToothColor = useCallback(
    (toothNumber: number) => {
      const toothConditions = getToothConditions(toothNumber)
      if (toothConditions.length === 0) return dentalConditions.healthy.color

      // Priority order for displaying colors
      const priority = [
        "missing",
        "extraction",
        "caries",
        "crown",
        "implant",
        "bridge",
        "restoration",
        "endodontics",
        "periodontal",
        "healthy",
      ]

      for (const conditionType of priority) {
        if (toothConditions.some((c) => c.condition === conditionType)) {
          return dentalConditions[conditionType as keyof typeof dentalConditions].color
        }
      }

      return dentalConditions.healthy.color
    },
    [getToothConditions],
  )

  const handleSave = useCallback(() => {
    onSave?.(conditions)
  }, [conditions, onSave])

  const filteredConditions = conditions.filter((condition) => {
    const matchesSearch =
      searchTerm === "" ||
      condition.toothNumber.toString().includes(searchTerm) ||
      dentalConditions[condition.condition].name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterCondition === "all" || condition.condition === filterCondition

    return matchesSearch && matchesFilter
  })

  const getConditionsByTab = (tab: string) => {
    switch (tab) {
      case "diagnosticos":
        return filteredConditions.filter((c) => ["caries", "periodontal", "missing"].includes(c.condition))
      case "sin-realizar":
        return filteredConditions.filter((c) => ["extraction", "endodontics", "crown", "implant"].includes(c.condition))
      case "realizados":
        return filteredConditions.filter((c) => ["restoration", "bridge", "healthy"].includes(c.condition))
      default:
        return filteredConditions
    }
  }

  const ToothComponent = ({ toothNumber, isUpper }: { toothNumber: number; isUpper: boolean }) => {
    const toothConditions = getToothConditions(toothNumber)
    const toothColor = getToothColor(toothNumber)
    const isSelected = selectedTooth === toothNumber

    return (
      <div className="flex flex-col items-center space-y-1">
        <div className="text-xs font-medium text-gray-600">{toothNumber}</div>
        <button
          onClick={() => handleToothClick(toothNumber)}
          className={`
            relative w-8 h-12 rounded-lg border-2 transition-all duration-200 transform hover:scale-110
            ${isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"}
            ${readOnly ? "cursor-default" : "cursor-pointer hover:shadow-md"}
          `}
          style={{ backgroundColor: toothColor + "20", borderColor: toothColor }}
          disabled={readOnly}
        >
          {/* Tooth surfaces visualization */}
          <div className="absolute inset-1 grid grid-cols-3 grid-rows-4 gap-px">
            {toothConditions.map((condition, index) => (
              <div
                key={index}
                className="rounded-sm"
                style={{ backgroundColor: dentalConditions[condition.condition].color }}
                title={`${condition.surface}: ${dentalConditions[condition.condition].name}`}
              />
            ))}
          </div>

          {/* Tooth number overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-700">{toothNumber}</span>
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="medical-header">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">{patientInfo.name}</CardTitle>
                <div className="flex items-center space-x-4 text-blue-100">
                  <span>ID: {patientInfo.id}</span>
                  <span>Edad: {patientInfo.age} años</span>
                  <span>Última visita: {patientInfo.lastVisit}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" className="no-print">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="secondary" size="sm" className="no-print">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Odontogram */}
        <div className="xl:col-span-3">
          <Card className="medical-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="diagnosticos" className="text-sm">
                        Diagnósticos
                      </TabsTrigger>
                      <TabsTrigger value="sin-realizar" className="text-sm">
                        Sin Realizar
                      </TabsTrigger>
                      <TabsTrigger value="realizados" className="text-sm">
                        Realizados
                      </TabsTrigger>
                      <TabsTrigger value="estadisticas" className="text-sm">
                        Estadísticas
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex items-center space-x-2 no-print">
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
                  <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setZoom(1)}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="space-y-8 transition-transform duration-200"
                style={{ transform: `scale(${zoom})`, transformOrigin: "center top" }}
              >
                {/* Upper Teeth */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center text-gray-700">Arcada Superior</h3>
                  <div className="flex justify-center">
                    <div className="grid grid-cols-8 gap-4">
                      {upperTeeth.slice(0, 8).map((tooth) => (
                        <ToothComponent key={tooth} toothNumber={tooth} isUpper={true} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="grid grid-cols-8 gap-4">
                      {upperTeeth.slice(8).map((tooth) => (
                        <ToothComponent key={tooth} toothNumber={tooth} isUpper={true} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lower Teeth */}
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="grid grid-cols-8 gap-4">
                      {lowerTeeth.slice(0, 8).map((tooth) => (
                        <ToothComponent key={tooth} toothNumber={tooth} isUpper={false} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="grid grid-cols-8 gap-4">
                      {lowerTeeth.slice(8).map((tooth) => (
                        <ToothComponent key={tooth} toothNumber={tooth} isUpper={false} />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-700">Arcada Inferior</h3>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">Leyenda de Condiciones</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(dentalConditions).map(([key, condition]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded border" style={{ backgroundColor: condition.color }} />
                      <span className="text-sm">{condition.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Tooth Selection */}
          {!readOnly && (
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Control de Diagnóstico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTooth && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="font-semibold text-blue-900">Diente Seleccionado: {selectedTooth}</div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Condición</Label>
                  <Select
                    value={selectedCondition}
                    onValueChange={(value) => setSelectedCondition(value as keyof typeof dentalConditions)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(dentalConditions).map(([key, condition]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded border" style={{ backgroundColor: condition.color }} />
                            <span>{condition.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Superficies</Label>
                  <div className="grid grid-cols-2 gap-2">
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

                <Button
                  onClick={applyCondition}
                  disabled={!selectedTooth || selectedSurfaces.length === 0}
                  className="w-full medical-button"
                >
                  Aplicar Condición
                </Button>

                <Button onClick={handleSave} variant="outline" className="w-full bg-transparent">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Conditions List */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-lg">Historial de Condiciones</CardTitle>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={filterCondition} onValueChange={setFilterCondition}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {Object.entries(dentalConditions).map(([key, condition]) => (
                      <SelectItem key={key} value={key}>
                        {condition.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {getConditionsByTab(activeTab).map((condition, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: dentalConditions[condition.condition].bgColor,
                              color: dentalConditions[condition.condition].textColor,
                            }}
                          >
                            Diente {condition.toothNumber}
                          </Badge>
                          <span className="text-sm font-medium">{dentalConditions[condition.condition].name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{condition.date}</span>
                      </div>
                      <div className="mt-1 text-xs text-gray-600 capitalize">Superficie: {condition.surface}</div>
                      {condition.notes && <div className="mt-1 text-xs text-gray-600">{condition.notes}</div>}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
