"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Save,
  RotateCcw,
  User,
  Trash2,
  Plus,
  Minus,
  Search,
  Download,
  Upload,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

interface ToothCondition {
  id: string
  name: string
  color: string
  description: string
  category: "diagnostico" | "tratamiento" | "realizado"
  surfaces?: string[]
}

interface ToothData {
  number: number
  conditions: { [surface: string]: string[] }
  notes: string
  lastModified: string
  images: string[]
}

interface PatientInfo {
  id: string
  name: string
  age: number
  gender: string
  lastVisit: string
  phone: string
  email: string
}

interface OdontogramProps {
  patient: PatientInfo
  readOnly?: boolean
  onSave?: (data: any) => void
}

const TOOTH_CONDITIONS: ToothCondition[] = [
  // Diagnósticos
  { id: "sano", name: "Sano", color: "#ffffff", description: "Diente sano", category: "diagnostico" },
  { id: "caries", name: "Caries", color: "#ff4444", description: "Caries dental", category: "diagnostico" },
  { id: "fractura", name: "Fractura", color: "#ff8800", description: "Fractura dental", category: "diagnostico" },
  { id: "desgaste", name: "Desgaste", color: "#ffaa00", description: "Desgaste dental", category: "diagnostico" },
  { id: "ausente", name: "Ausente", color: "#000000", description: "Diente ausente", category: "diagnostico" },
  { id: "impactado", name: "Impactado", color: "#8800ff", description: "Diente impactado", category: "diagnostico" },

  // Tratamientos por realizar
  {
    id: "tratar_caries",
    name: "Tratar Caries",
    color: "#ff6666",
    description: "Caries a tratar",
    category: "tratamiento",
  },
  {
    id: "tratar_endodoncia",
    name: "Endodoncia",
    color: "#ff0088",
    description: "Tratamiento de conducto",
    category: "tratamiento",
  },
  {
    id: "tratar_extraccion",
    name: "Extracción",
    color: "#cc0000",
    description: "Extracción indicada",
    category: "tratamiento",
  },
  { id: "tratar_corona", name: "Corona", color: "#ffdd00", description: "Corona a colocar", category: "tratamiento" },
  {
    id: "tratar_implante",
    name: "Implante",
    color: "#0088ff",
    description: "Implante a colocar",
    category: "tratamiento",
  },

  // Tratamientos realizados
  { id: "obturado", name: "Obturado", color: "#4444ff", description: "Restauración realizada", category: "realizado" },
  {
    id: "endodoncia_realizada",
    name: "Endodoncia",
    color: "#ff0088",
    description: "Tratamiento de conducto realizado",
    category: "realizado",
  },
  { id: "corona_colocada", name: "Corona", color: "#ffdd00", description: "Corona colocada", category: "realizado" },
  {
    id: "implante_colocado",
    name: "Implante",
    color: "#0088ff",
    description: "Implante colocado",
    category: "realizado",
  },
  { id: "extraido", name: "Extraído", color: "#666666", description: "Diente extraído", category: "realizado" },
]

const TOOTH_SURFACES = {
  anterior: [
    { id: "vestib", name: "Vestibular", position: "top" },
    { id: "palatino", name: "Palatino", position: "bottom" },
    { id: "mesial", name: "Mesial", position: "left" },
    { id: "distal", name: "Distal", position: "right" },
    { id: "incisal", name: "Incisal", position: "center" },
  ],
  posterior: [
    { id: "vestib", name: "Vestibular", position: "top" },
    { id: "palatino", name: "Palatino", position: "bottom" },
    { id: "mesial", name: "Mesial", position: "left" },
    { id: "distal", name: "Distal", position: "right" },
    { id: "oclusal", name: "Oclusal", position: "center" },
  ],
}

// FDI Tooth numbering system
const ADULT_TEETH = [
  // Upper jaw
  [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
  // Lower jaw
  [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
]

export function ProfessionalOdontogram({ patient, readOnly = false, onSave }: OdontogramProps) {
  const { toast } = useToast()
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [selectedCondition, setSelectedCondition] = useState<string>("sano")
  const [selectedSurface, setSelectedSurface] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("diagnostico")
  const [isToothDialogOpen, setIsToothDialogOpen] = useState(false)
  const [toothData, setToothData] = useState<{ [key: number]: ToothData }>({})
  const [toothNotes, setToothNotes] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showSurfaces, setShowSurfaces] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)

  const getCurrentConditions = () => {
    return TOOTH_CONDITIONS.filter(
      (condition) =>
        condition.category === activeCategory &&
        (searchTerm === "" ||
          condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          condition.description.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  const handleToothClick = useCallback(
    (toothNumber: number) => {
      if (readOnly) return
      setSelectedTooth(toothNumber)
      setToothNotes(toothData[toothNumber]?.notes || "")
      setIsToothDialogOpen(true)
    },
    [toothData, readOnly],
  )

  const applyConditionToTooth = useCallback(
    (toothNumber: number, surface?: string) => {
      if (!selectedCondition || readOnly) return

      const targetSurface = surface || selectedSurface || "general"

      setToothData((prev) => {
        const currentTooth = prev[toothNumber] || {
          number: toothNumber,
          conditions: {},
          notes: "",
          lastModified: "",
          images: [],
        }

        const updatedConditions = { ...currentTooth.conditions }
        if (!updatedConditions[targetSurface]) {
          updatedConditions[targetSurface] = []
        }

        // Remove existing condition on this surface and add new one
        updatedConditions[targetSurface] = [selectedCondition]

        return {
          ...prev,
          [toothNumber]: {
            ...currentTooth,
            conditions: updatedConditions,
            lastModified: new Date().toISOString(),
          },
        }
      })

      const condition = TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)
      toast({
        title: "Condición aplicada",
        description: `${condition?.name} aplicada al diente ${toothNumber}${surface ? ` (${surface})` : ""}`,
      })
    },
    [selectedCondition, selectedSurface, readOnly, toast],
  )

  const getToothColor = (toothNumber: number) => {
    const tooth = toothData[toothNumber]
    if (!tooth || Object.keys(tooth.conditions).length === 0) {
      return "#ffffff"
    }

    // Get the most recent condition
    const allConditions = Object.values(tooth.conditions).flat()
    if (allConditions.length === 0) return "#ffffff"

    const lastCondition = allConditions[allConditions.length - 1]
    const condition = TOOTH_CONDITIONS.find((c) => c.id === lastCondition)
    return condition?.color || "#ffffff"
  }

  const getToothSurfaceColor = (toothNumber: number, surface: string) => {
    const tooth = toothData[toothNumber]
    if (!tooth || !tooth.conditions[surface] || tooth.conditions[surface].length === 0) {
      return "#ffffff"
    }

    const conditionId = tooth.conditions[surface][tooth.conditions[surface].length - 1]
    const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
    return condition?.color || "#ffffff"
  }

  const clearTooth = (toothNumber: number) => {
    if (readOnly) return

    setToothData((prev) => {
      const updated = { ...prev }
      delete updated[toothNumber]
      return updated
    })

    toast({
      title: "Diente limpiado",
      description: `Todas las condiciones removidas del diente ${toothNumber}`,
    })
  }

  const saveToothNotes = () => {
    if (selectedTooth && !readOnly) {
      setToothData((prev) => ({
        ...prev,
        [selectedTooth]: {
          ...prev[selectedTooth],
          number: selectedTooth,
          notes: toothNotes,
          conditions: prev[selectedTooth]?.conditions || {},
          lastModified: new Date().toISOString(),
          images: prev[selectedTooth]?.images || [],
        },
      }))

      setIsToothDialogOpen(false)
      toast({
        title: "Notas guardadas",
        description: `Notas actualizadas para el diente ${selectedTooth}`,
      })
    }
  }

  const saveOdontogram = () => {
    if (readOnly) return

    const odontogramData = {
      patientId: patient.id,
      patientName: patient.name,
      teeth: toothData,
      timestamp: new Date().toISOString(),
      version: "1.0",
    }

    onSave?.(odontogramData)

    toast({
      title: "Odontograma guardado",
      description: "Los cambios han sido guardados exitosamente",
    })
  }

  const exportOdontogram = () => {
    toast({
      title: "Exportando...",
      description: "Generando reporte del odontograma",
    })
  }

  const isAnteriorTooth = (toothNumber: number) => {
    const lastDigit = toothNumber % 10
    return lastDigit >= 1 && lastDigit <= 3
  }

  const getSurfacesForTooth = (toothNumber: number) => {
    return isAnteriorTooth(toothNumber) ? TOOTH_SURFACES.anterior : TOOTH_SURFACES.posterior
  }

  const getConditionStats = () => {
    const stats: { [category: string]: { [condition: string]: number } } = {
      diagnostico: {},
      tratamiento: {},
      realizado: {},
    }

    Object.values(toothData).forEach((tooth) => {
      Object.values(tooth.conditions).forEach((surfaceConditions) => {
        surfaceConditions.forEach((conditionId) => {
          const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
          if (condition) {
            if (!stats[condition.category][conditionId]) {
              stats[condition.category][conditionId] = 0
            }
            stats[condition.category][conditionId]++
          }
        })
      })
    })

    return stats
  }

  const conditionStats = getConditionStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-medical-500 to-medical-600 text-white p-6 rounded-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Odontograma Digital</h1>
              <p className="text-medical-100">
                Paciente: <span className="font-semibold">{patient.name}</span> • Edad:{" "}
                <span className="font-semibold">{patient.age} años</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setToothData({})}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpiar Todo
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={exportOdontogram}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button
              className="bg-white text-medical-600 hover:bg-white/90"
              onClick={saveOdontogram}
              disabled={readOnly}
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Panel - Controls */}
        <div className="xl:col-span-1 space-y-6">
          {/* Patient Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <Label className="text-xs text-gray-500">Nombre</Label>
                  <p className="font-medium">{patient.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Edad</Label>
                  <p className="font-medium">{patient.age} años</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Género</Label>
                  <p className="font-medium">{patient.gender}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Última Visita</Label>
                  <p className="font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="grid w-full grid-cols-1 gap-1">
                  <TabsTrigger value="diagnostico" className="text-xs">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Diagnósticos
                  </TabsTrigger>
                  <TabsTrigger value="tratamiento" className="text-xs">
                    <Clock className="h-4 w-4 mr-1" />
                    Sin Realizar
                  </TabsTrigger>
                  <TabsTrigger value="realizado" className="text-xs">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Realizados
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Condition Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Condiciones</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar condición..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {getCurrentConditions().map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => setSelectedCondition(condition.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedCondition === condition.id
                        ? "border-medical-500 bg-medical-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded border-2 border-gray-300"
                        style={{ backgroundColor: condition.color }}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{condition.name}</p>
                        <p className="text-xs text-gray-500">{condition.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Surface Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Superficies Dentales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="show-surfaces" checked={showSurfaces} onCheckedChange={setShowSurfaces} />
                  <Label htmlFor="show-surfaces" className="text-sm">
                    Mostrar superficies
                  </Label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {TOOTH_SURFACES.posterior.map((surface) => (
                    <button
                      key={surface.id}
                      onClick={() => setSelectedSurface(surface.id)}
                      className={`p-2 rounded text-xs border transition-all ${
                        selectedSurface === surface.id
                          ? "border-medical-500 bg-medical-50 text-medical-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {surface.name}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(conditionStats).map(([category, conditions]) => (
                  <div key={category}>
                    <h4 className="font-medium text-sm mb-2 capitalize">{category}</h4>
                    <div className="space-y-1">
                      {Object.entries(conditions).map(([conditionId, count]) => {
                        const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
                        return (
                          <div key={conditionId} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded" style={{ backgroundColor: condition?.color }} />
                              <span>{condition?.name}</span>
                            </div>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Odontogram */}
        <div className="xl:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Odontograma Interactivo</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium w-16 text-center">{Math.round(zoomLevel * 100)}%</span>
                  <Button variant="outline" size="sm" onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.1))}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Haz clic en los dientes para aplicar condiciones o ver detalles</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="bg-white border rounded-lg p-8 overflow-auto"
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
              >
                <div className="space-y-12">
                  {/* Upper Jaw */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-6 text-center">MAXILAR SUPERIOR</h3>
                    <div className="flex justify-center">
                      <div className="grid grid-cols-16 gap-2">
                        {ADULT_TEETH[0].map((toothNumber) => (
                          <div key={toothNumber} className="flex flex-col items-center">
                            <div className="text-xs text-gray-500 mb-2">{toothNumber}</div>
                            <div className="relative group">
                              <button
                                className="w-12 h-16 border-2 border-gray-300 rounded-lg hover:border-medical-500 transition-colors relative overflow-hidden"
                                style={{ backgroundColor: getToothColor(toothNumber) }}
                                onClick={() =>
                                  selectedCondition ? applyConditionToTooth(toothNumber) : handleToothClick(toothNumber)
                                }
                                title={`Diente ${toothNumber}`}
                              >
                                {/* Tooth Crown */}
                                <div className="absolute inset-x-1 top-1 bottom-6 rounded-t-lg border border-gray-400">
                                  {showSurfaces && (
                                    <div className="grid grid-cols-3 grid-rows-3 h-full">
                                      {getSurfacesForTooth(toothNumber).map((surface, index) => (
                                        <div
                                          key={surface.id}
                                          className={`
                                            border border-gray-300 hover:bg-blue-200/50 cursor-pointer transition-colors
                                            ${index === 0 ? "col-start-2 row-start-1" : ""}
                                            ${index === 1 ? "col-start-2 row-start-3" : ""}
                                            ${index === 2 ? "col-start-1 row-start-2" : ""}
                                            ${index === 3 ? "col-start-3 row-start-2" : ""}
                                            ${index === 4 ? "col-start-2 row-start-2" : ""}
                                          `}
                                          style={{ backgroundColor: getToothSurfaceColor(toothNumber, surface.id) }}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            if (selectedCondition) {
                                              applyConditionToTooth(toothNumber, surface.id)
                                            }
                                          }}
                                          title={surface.name}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Tooth Root */}
                                <div className="absolute inset-x-2 bottom-1 h-4 bg-gray-100 rounded-b border border-gray-400" />

                                {/* Tooth Number */}
                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                                  {toothNumber}
                                </span>
                              </button>

                              {/* Indicators */}
                              {toothData[toothNumber]?.notes && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                              )}

                              {/* Quick Actions */}
                              {!readOnly && toothData[toothNumber] && (
                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      clearTooth(toothNumber)
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lower Jaw */}
                  <div>
                    <div className="flex justify-center">
                      <div className="grid grid-cols-16 gap-2">
                        {ADULT_TEETH[1].map((toothNumber) => (
                          <div key={toothNumber} className="flex flex-col items-center">
                            <div className="relative group">
                              <button
                                className="w-12 h-16 border-2 border-gray-300 rounded-lg hover:border-medical-500 transition-colors relative overflow-hidden"
                                style={{ backgroundColor: getToothColor(toothNumber) }}
                                onClick={() =>
                                  selectedCondition ? applyConditionToTooth(toothNumber) : handleToothClick(toothNumber)
                                }
                                title={`Diente ${toothNumber}`}
                              >
                                {/* Tooth Root */}
                                <div className="absolute inset-x-2 top-1 h-4 bg-gray-100 rounded-t border border-gray-400" />

                                {/* Tooth Crown */}
                                <div className="absolute inset-x-1 top-6 bottom-1 rounded-b-lg border border-gray-400">
                                  {showSurfaces && (
                                    <div className="grid grid-cols-3 grid-rows-3 h-full">
                                      {getSurfacesForTooth(toothNumber).map((surface, index) => (
                                        <div
                                          key={surface.id}
                                          className={`
                                            border border-gray-300 hover:bg-blue-200/50 cursor-pointer transition-colors
                                            ${index === 0 ? "col-start-2 row-start-1" : ""}
                                            ${index === 1 ? "col-start-2 row-start-3" : ""}
                                            ${index === 2 ? "col-start-1 row-start-2" : ""}
                                            ${index === 3 ? "col-start-3 row-start-2" : ""}
                                            ${index === 4 ? "col-start-2 row-start-2" : ""}
                                          `}
                                          style={{ backgroundColor: getToothSurfaceColor(toothNumber, surface.id) }}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            if (selectedCondition) {
                                              applyConditionToTooth(toothNumber, surface.id)
                                            }
                                          }}
                                          title={surface.name}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Tooth Number */}
                                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                                  {toothNumber}
                                </span>
                              </button>

                              {/* Indicators */}
                              {toothData[toothNumber]?.notes && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                              )}

                              {/* Quick Actions */}
                              {!readOnly && toothData[toothNumber] && (
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      clearTooth(toothNumber)
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-2">{toothNumber}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-700 mt-6 text-center">MAXILAR INFERIOR</h3>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">Leyenda</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {getCurrentConditions()
                    .slice(0, 8)
                    .map((condition) => (
                      <div key={condition.id} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border" style={{ backgroundColor: condition.color }} />
                        <span className="text-sm">{condition.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tooth Details Dialog */}
      <Dialog open={isToothDialogOpen} onOpenChange={setIsToothDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Diente {selectedTooth}</DialogTitle>
            <DialogDescription>Información detallada y notas específicas del diente</DialogDescription>
          </DialogHeader>

          {selectedTooth && (
            <div className="space-y-4">
              {/* Current Conditions */}
              <div>
                <Label className="text-sm font-medium">Condiciones Actuales</Label>
                <div className="mt-2 space-y-2">
                  {Object.entries(toothData[selectedTooth]?.conditions || {}).map(([surface, conditions]) => (
                    <div key={surface} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium capitalize">{surface}</span>
                      <div className="flex gap-1">
                        {conditions.map((conditionId, index) => {
                          const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
                          return (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {condition?.name}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  {Object.keys(toothData[selectedTooth]?.conditions || {}).length === 0 && (
                    <p className="text-sm text-gray-500">Sin condiciones registradas</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="tooth-notes">Notas Específicas</Label>
                <Textarea
                  id="tooth-notes"
                  value={toothNotes}
                  onChange={(e) => setToothNotes(e.target.value)}
                  placeholder="Observaciones específicas sobre este diente..."
                  rows={3}
                  disabled={readOnly}
                />
              </div>

              {/* Quick Actions */}
              {!readOnly && (
                <div>
                  <Label className="text-sm font-medium">Acciones Rápidas</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => applyConditionToTooth(selectedTooth)}
                      disabled={!selectedCondition}
                    >
                      Aplicar Condición
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => clearTooth(selectedTooth)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Limpiar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Imagen
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsToothDialogOpen(false)}>
              Cancelar
            </Button>
            {!readOnly && (
              <Button onClick={saveToothNotes}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Notas
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
