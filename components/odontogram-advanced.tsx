"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Save,
  RotateCcw,
  Palette,
  FileText,
  ZoomIn,
  ZoomOut,
  Download,
  Upload,
  Eye,
  Layers,
  MousePointer,
  Pencil,
  Eraser,
  Camera,
  History,
  Settings,
  CheckCircle,
  X,
  Plus,
  MoreVertical,
  Search,
  Stethoscope,
} from "lucide-react"

interface ToothCondition {
  id: string
  name: string
  color: string
  description: string
  category: "health" | "pathology" | "treatment" | "prosthetics"
  severity?: "mild" | "moderate" | "severe"
}

interface ToothSurface {
  id: string
  name: string
  position: { x: number; y: number; width: number; height: number }
  conditions: string[]
  notes: string
}

interface ToothData {
  number: number
  conditions: string[]
  notes: string
  surfaces: { [key: string]: ToothSurface }
  annotations: Annotation[]
  images: string[]
  lastModified: string
  mobility?: number
  pocket?: number
  bleeding?: boolean
  plaque?: boolean
}

interface Annotation {
  id: string
  x: number
  y: number
  text: string
  type: "note" | "measurement" | "observation"
  color: string
  timestamp: string
}

interface OdontogramHistory {
  id: string
  timestamp: string
  action: string
  toothNumber?: number
  previousState?: any
  newState?: any
  user: string
}

interface OdontogramProps {
  patientId: string
  patientName: string
  patientAge: number
  mode: "adult" | "child" | "mixed"
  onSave: (data: any) => void
  onToothUpdate: (tooth: ToothData) => void
  readOnly?: boolean
}

const TOOTH_CONDITIONS: ToothCondition[] = [
  // Health
  { id: "healthy", name: "Sano", color: "#ffffff", description: "Diente sano", category: "health" },
  { id: "excellent", name: "Excelente", color: "#22c55e", description: "Estado excelente", category: "health" },

  // Pathology
  {
    id: "caries_initial",
    name: "Caries Inicial",
    color: "#fbbf24",
    description: "Caries en esmalte",
    category: "pathology",
    severity: "mild",
  },
  {
    id: "caries_moderate",
    name: "Caries Moderada",
    color: "#f59e0b",
    description: "Caries en dentina",
    category: "pathology",
    severity: "moderate",
  },
  {
    id: "caries_deep",
    name: "Caries Profunda",
    color: "#dc2626",
    description: "Caries cerca de pulpa",
    category: "pathology",
    severity: "severe",
  },
  {
    id: "pulpitis",
    name: "Pulpitis",
    color: "#b91c1c",
    description: "Inflamación pulpar",
    category: "pathology",
    severity: "severe",
  },
  {
    id: "abscess",
    name: "Absceso",
    color: "#7f1d1d",
    description: "Infección periapical",
    category: "pathology",
    severity: "severe",
  },
  { id: "fracture", name: "Fractura", color: "#991b1b", description: "Fractura dental", category: "pathology" },
  { id: "wear", name: "Desgaste", color: "#a3a3a3", description: "Desgaste dental", category: "pathology" },

  // Treatments
  {
    id: "restoration_composite",
    name: "Restauración Composite",
    color: "#e5e7eb",
    description: "Obturación con composite",
    category: "treatment",
  },
  {
    id: "restoration_amalgam",
    name: "Restauración Amalgama",
    color: "#6b7280",
    description: "Obturación con amalgama",
    category: "treatment",
  },
  {
    id: "restoration_glass",
    name: "Ionómero de Vidrio",
    color: "#d1d5db",
    description: "Restauración con ionómero",
    category: "treatment",
  },
  {
    id: "endodontics",
    name: "Endodoncia",
    color: "#ec4899",
    description: "Tratamiento de conducto",
    category: "treatment",
  },
  { id: "temporary", name: "Temporal", color: "#fde047", description: "Restauración temporal", category: "treatment" },

  // Prosthetics
  { id: "crown", name: "Corona", color: "#ffd700", description: "Corona protésica", category: "prosthetics" },
  { id: "bridge", name: "Puente", color: "#daa520", description: "Puente fijo", category: "prosthetics" },
  { id: "implant", name: "Implante", color: "#4682b4", description: "Implante dental", category: "prosthetics" },
  {
    id: "partial_denture",
    name: "Prótesis Parcial",
    color: "#cd853f",
    description: "Prótesis parcial removible",
    category: "prosthetics",
  },
  { id: "missing", name: "Ausente", color: "#000000", description: "Diente ausente", category: "prosthetics" },
  {
    id: "extraction",
    name: "Extracción Indicada",
    color: "#dc143c",
    description: "Indicado para extracción",
    category: "treatment",
  },
]

const ADULT_TEETH = [
  // Upper jaw
  [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
  // Lower jaw
  [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
]

const CHILD_TEETH = [
  // Upper jaw
  [55, 54, 53, 52, 51, 61, 62, 63, 64, 65],
  // Lower jaw
  [85, 84, 83, 82, 81, 71, 72, 73, 74, 75],
]

const TOOTH_SURFACES = {
  anterior: ["mesial", "distal", "vestibular", "lingual", "incisal"],
  posterior: ["mesial", "distal", "vestibular", "lingual", "oclusal"],
}

export function OdontogramAdvanced({
  patientId,
  patientName,
  patientAge,
  mode,
  onSave,
  onToothUpdate,
  readOnly = false,
}: OdontogramProps) {
  const { toast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // State management
  const [selectedCondition, setSelectedCondition] = useState<string>("healthy")
  const [selectedTool, setSelectedTool] = useState<"select" | "paint" | "annotate" | "measure">("select")
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [selectedSurface, setSelectedSurface] = useState<string | null>(null)
  const [isToothDialogOpen, setIsToothDialogOpen] = useState(false)
  const [toothData, setToothData] = useState<{ [key: number]: ToothData }>({})
  const [toothNotes, setToothNotes] = useState("")
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [history, setHistory] = useState<OdontogramHistory[]>([])
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showGrid, setShowGrid] = useState(false)
  const [showSurfaces, setShowSurfaces] = useState(false)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAnnotating, setIsAnnotating] = useState(false)
  const [newAnnotation, setNewAnnotation] = useState({ text: "", type: "note" as const, color: "#3b82f6" })

  // Computed values
  const getTeethLayout = () => {
    switch (mode) {
      case "adult":
        return ADULT_TEETH
      case "child":
        return CHILD_TEETH
      case "mixed":
        return [
          [55, 54, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 64, 65],
          [85, 84, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 74, 75],
        ]
      default:
        return ADULT_TEETH
    }
  }

  const filteredConditions = TOOTH_CONDITIONS.filter((condition) => {
    const matchesCategory = filterCategory === "all" || condition.category === filterCategory
    const matchesSearch =
      condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      condition.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Event handlers
  const handleToothClick = useCallback(
    (toothNumber: number, event?: React.MouseEvent) => {
      if (readOnly) return

      if (selectedTool === "select") {
        setSelectedTooth(toothNumber)
        setToothNotes(toothData[toothNumber]?.notes || "")
        setIsToothDialogOpen(true)
      } else if (selectedTool === "paint" && selectedCondition) {
        applyConditionToTooth(toothNumber)
      } else if (selectedTool === "annotate" && event) {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        startAnnotation(x, y, toothNumber)
      }
    },
    [selectedTool, selectedCondition, toothData, readOnly],
  )

  const applyConditionToTooth = useCallback(
    (toothNumber: number, surface?: string) => {
      if (!selectedCondition || readOnly) return

      const previousState = toothData[toothNumber]
      const updatedToothData = {
        ...toothData,
        [toothNumber]: {
          ...toothData[toothNumber],
          number: toothNumber,
          conditions: surface
            ? toothData[toothNumber]?.conditions || []
            : [...(toothData[toothNumber]?.conditions || []), selectedCondition],
          notes: toothData[toothNumber]?.notes || "",
          surfaces: toothData[toothNumber]?.surfaces || {},
          annotations: toothData[toothNumber]?.annotations || [],
          images: toothData[toothNumber]?.images || [],
          lastModified: new Date().toISOString(),
        },
      }

      // Apply to specific surface if selected
      if (surface && selectedSurface) {
        if (!updatedToothData[toothNumber].surfaces[surface]) {
          updatedToothData[toothNumber].surfaces[surface] = {
            id: surface,
            name: surface,
            position: { x: 0, y: 0, width: 20, height: 20 },
            conditions: [],
            notes: "",
          }
        }
        updatedToothData[toothNumber].surfaces[surface].conditions.push(selectedCondition)
      }

      setToothData(updatedToothData)
      onToothUpdate(updatedToothData[toothNumber])

      // Add to history
      addToHistory("condition_applied", toothNumber, previousState, updatedToothData[toothNumber])

      toast({
        title: "Condición aplicada",
        description: `${TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)?.name} aplicada al diente ${toothNumber}${surface ? ` (${surface})` : ""}`,
      })
    },
    [selectedCondition, selectedSurface, toothData, onToothUpdate, toast, readOnly],
  )

  const startAnnotation = (x: number, y: number, toothNumber?: number) => {
    if (readOnly) return
    setIsAnnotating(true)
    // Implementation for annotation creation
  }

  const addToHistory = (action: string, toothNumber?: number, previousState?: any, newState?: any) => {
    const historyEntry: OdontogramHistory = {
      id: `history_${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      toothNumber,
      previousState,
      newState,
      user: "current_user", // Replace with actual user
    }
    setHistory((prev) => [...prev, historyEntry].slice(-50)) // Keep last 50 entries
  }

  const getToothColor = (toothNumber: number) => {
    const tooth = toothData[toothNumber]
    if (!tooth || !tooth.conditions.length) return "#ffffff"

    // Get the last applied condition
    const lastCondition = tooth.conditions[tooth.conditions.length - 1]
    const condition = TOOTH_CONDITIONS.find((c) => c.id === lastCondition)
    return condition?.color || "#ffffff"
  }

  const getToothBorderColor = (toothNumber: number) => {
    const tooth = toothData[toothNumber]
    if (!tooth) return "#d1d5db"

    if (tooth.conditions.some((c) => TOOTH_CONDITIONS.find((tc) => tc.id === c)?.severity === "severe")) {
      return "#dc2626" // Red for severe conditions
    }
    if (tooth.conditions.some((c) => TOOTH_CONDITIONS.find((tc) => tc.id === c)?.severity === "moderate")) {
      return "#f59e0b" // Orange for moderate conditions
    }
    if (tooth.conditions.length > 0) {
      return "#3b82f6" // Blue for any conditions
    }
    return "#d1d5db" // Gray for no conditions
  }

  const clearTooth = (toothNumber: number) => {
    if (readOnly) return

    const previousState = toothData[toothNumber]
    const updatedToothData = { ...toothData }
    delete updatedToothData[toothNumber]
    setToothData(updatedToothData)

    addToHistory("tooth_cleared", toothNumber, previousState, null)

    toast({
      title: "Diente limpiado",
      description: `Todas las condiciones removidas del diente ${toothNumber}`,
    })
  }

  const saveToothNotes = () => {
    if (selectedTooth && !readOnly) {
      const previousState = toothData[selectedTooth]
      const updatedToothData = {
        ...toothData,
        [selectedTooth]: {
          ...toothData[selectedTooth],
          number: selectedTooth,
          notes: toothNotes,
          conditions: toothData[selectedTooth]?.conditions || [],
          surfaces: toothData[selectedTooth]?.surfaces || {},
          annotations: toothData[selectedTooth]?.annotations || [],
          images: toothData[selectedTooth]?.images || [],
          lastModified: new Date().toISOString(),
        },
      }

      setToothData(updatedToothData)
      onToothUpdate(updatedToothData[selectedTooth])
      setIsToothDialogOpen(false)

      addToHistory("notes_updated", selectedTooth, previousState, updatedToothData[selectedTooth])

      toast({
        title: "Notas guardadas",
        description: `Notas actualizadas para el diente ${selectedTooth}`,
      })
    }
  }

  const saveOdontogram = () => {
    if (readOnly) return

    const odontogramData = {
      patientId,
      patientName,
      patientAge,
      mode,
      teeth: toothData,
      annotations,
      history,
      timestamp: new Date().toISOString(),
      version: "2.0",
    }

    onSave(odontogramData)

    toast({
      title: "Odontograma guardado",
      description: "Los cambios han sido guardados exitosamente",
    })
  }

  const exportOdontogram = () => {
    // Implementation for PDF export
    toast({
      title: "Exportando...",
      description: "Generando PDF del odontograma",
    })
  }

  const undoLastAction = () => {
    if (history.length === 0 || readOnly) return

    const lastAction = history[history.length - 1]
    if (lastAction.toothNumber && lastAction.previousState) {
      setToothData((prev) => ({
        ...prev,
        [lastAction.toothNumber!]: lastAction.previousState,
      }))
      setHistory((prev) => prev.slice(0, -1))

      toast({
        title: "Acción deshecha",
        description: `Se deshizo: ${lastAction.action}`,
      })
    }
  }

  const getConditionStats = () => {
    const stats: { [key: string]: number } = {}
    const categoryStats: { [key: string]: number } = {}

    Object.values(toothData).forEach((tooth) => {
      tooth.conditions.forEach((conditionId) => {
        const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
        if (condition) {
          stats[conditionId] = (stats[conditionId] || 0) + 1
          categoryStats[condition.category] = (categoryStats[condition.category] || 0) + 1
        }
      })
    })

    return { stats, categoryStats }
  }

  const { stats: conditionStats, categoryStats } = getConditionStats()
  const teethLayout = getTeethLayout()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Odontograma Digital Avanzado</h1>
          <p className="text-muted-foreground">
            Paciente: <span className="font-medium">{patientName}</span> • Edad:{" "}
            <span className="font-medium">{patientAge} años</span> • Dentición:{" "}
            <span className="font-medium">
              {mode === "adult" ? "Permanente" : mode === "child" ? "Temporal" : "Mixta"}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={undoLastAction} disabled={history.length === 0 || readOnly}>
            <History className="h-4 w-4 mr-2" />
            Deshacer
          </Button>
          <Button variant="outline" onClick={() => setToothData({})} disabled={readOnly}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Limpiar Todo
          </Button>
          <Button variant="outline" onClick={exportOdontogram}>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button onClick={saveOdontogram} disabled={readOnly}>
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Tools and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Herramientas y Controles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tools">Herramientas</TabsTrigger>
              <TabsTrigger value="conditions">Condiciones</TabsTrigger>
              <TabsTrigger value="view">Vista</TabsTrigger>
              <TabsTrigger value="analysis">Análisis</TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant={selectedTool === "select" ? "default" : "outline"}
                  onClick={() => setSelectedTool("select")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  disabled={readOnly}
                >
                  <MousePointer className="h-6 w-6" />
                  <span className="text-sm">Seleccionar</span>
                </Button>
                <Button
                  variant={selectedTool === "paint" ? "default" : "outline"}
                  onClick={() => setSelectedTool("paint")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  disabled={readOnly}
                >
                  <Palette className="h-6 w-6" />
                  <span className="text-sm">Pintar</span>
                </Button>
                <Button
                  variant={selectedTool === "annotate" ? "default" : "outline"}
                  onClick={() => setSelectedTool("annotate")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  disabled={readOnly}
                >
                  <Pencil className="h-6 w-6" />
                  <span className="text-sm">Anotar</span>
                </Button>
                <Button
                  variant={selectedTool === "measure" ? "default" : "outline"}
                  onClick={() => setSelectedTool("measure")}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  disabled={readOnly}
                >
                  <Stethoscope className="h-6 w-6" />
                  <span className="text-sm">Medir</span>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="conditions" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label>Buscar condiciones</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre o descripción..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label>Filtrar por categoría</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="health">Salud</SelectItem>
                      <SelectItem value="pathology">Patología</SelectItem>
                      <SelectItem value="treatment">Tratamiento</SelectItem>
                      <SelectItem value="prosthetics">Prótesis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {filteredConditions.map((condition) => (
                  <Button
                    key={condition.id}
                    variant={selectedCondition === condition.id ? "default" : "outline"}
                    className="h-auto p-3 flex flex-col items-center gap-2 relative"
                    onClick={() => setSelectedCondition(condition.id)}
                    disabled={readOnly}
                  >
                    <div
                      className="w-6 h-6 rounded border-2 border-white shadow-sm"
                      style={{ backgroundColor: condition.color }}
                    />
                    <span className="text-xs font-medium text-center leading-tight">{condition.name}</span>
                    {condition.severity && (
                      <Badge
                        variant="secondary"
                        className={`text-xs absolute -top-1 -right-1 ${
                          condition.severity === "severe"
                            ? "bg-red-100 text-red-800"
                            : condition.severity === "moderate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {condition.severity === "severe" ? "!" : condition.severity === "moderate" ? "⚠" : "·"}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>

              {selectedCondition && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded border-2 border-white shadow-sm flex-shrink-0"
                      style={{ backgroundColor: TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)?.color }}
                    />
                    <div>
                      <h4 className="font-medium text-blue-900">
                        {TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)?.name}
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)?.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">
                          {TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)?.category}
                        </Badge>
                        {TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)?.severity && (
                          <Badge variant="secondary">
                            {TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)?.severity}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="view" className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Zoom</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.1))}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium w-16 text-center">{Math.round(zoomLevel * 100)}%</span>
                    <Button variant="outline" size="sm" onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.1))}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Opciones de Vista</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
                      <Label htmlFor="show-grid" className="text-sm">
                        Mostrar cuadrícula
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-surfaces" checked={showSurfaces} onCheckedChange={setShowSurfaces} />
                      <Label htmlFor="show-surfaces" className="text-sm">
                        Mostrar superficies
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-annotations" checked={showAnnotations} onCheckedChange={setShowAnnotations} />
                      <Label htmlFor="show-annotations" className="text-sm">
                        Mostrar anotaciones
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Capas</Label>
                  <div className="space-y-1">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Layers className="h-4 w-4 mr-2" />
                      Condiciones
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Anotaciones
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Camera className="h-4 w-4 mr-2" />
                      Imágenes
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Historial</Label>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {history
                      .slice(-5)
                      .reverse()
                      .map((entry) => (
                        <div key={entry.id} className="text-xs p-2 bg-gray-50 rounded">
                          <div className="font-medium">{entry.action}</div>
                          <div className="text-muted-foreground">
                            {entry.toothNumber && `Diente ${entry.toothNumber} • `}
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    {history.length === 0 && (
                      <div className="text-xs text-muted-foreground p-2">No hay acciones registradas</div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estadísticas por Condición</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(conditionStats).map(([conditionId, count]) => {
                        const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
                        return (
                          <div key={conditionId} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded border" style={{ backgroundColor: condition?.color }} />
                              <span className="text-sm">{condition?.name}</span>
                            </div>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        )
                      })}
                      {Object.keys(conditionStats).length === 0 && (
                        <p className="text-sm text-muted-foreground">No hay condiciones registradas</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estadísticas por Categoría</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(categoryStats).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{category}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                      {Object.keys(categoryStats).length === 0 && (
                        <p className="text-sm text-muted-foreground">No hay datos para analizar</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumen Clínico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {
                          Object.keys(toothData).filter((tooth) =>
                            toothData[Number.parseInt(tooth)]?.conditions.some(
                              (c) => TOOTH_CONDITIONS.find((tc) => tc.id === c)?.category === "health",
                            ),
                          ).length
                        }
                      </div>
                      <p className="text-sm text-green-700">Dientes Sanos</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {
                          Object.keys(toothData).filter((tooth) =>
                            toothData[Number.parseInt(tooth)]?.conditions.some(
                              (c) => TOOTH_CONDITIONS.find((tc) => tc.id === c)?.category === "pathology",
                            ),
                          ).length
                        }
                      </div>
                      <p className="text-sm text-yellow-700">Con Patología</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {
                          Object.keys(toothData).filter((tooth) =>
                            toothData[Number.parseInt(tooth)]?.conditions.some(
                              (c) => TOOTH_CONDITIONS.find((tc) => tc.id === c)?.category === "treatment",
                            ),
                          ).length
                        }
                      </div>
                      <p className="text-sm text-blue-700">Con Tratamiento</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Odontogram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Odontograma Interactivo</span>
            <div className="flex items-center gap-2">
              {selectedTool !== "select" && (
                <Badge variant="secondary">
                  Modo: {selectedTool === "paint" ? "Pintar" : selectedTool === "annotate" ? "Anotar" : "Medir"}
                </Badge>
              )}
              {readOnly && (
                <Badge variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  Solo lectura
                </Badge>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            {selectedTool === "select" && "Haz clic en un diente para ver/editar detalles"}
            {selectedTool === "paint" &&
              selectedCondition &&
              `Haz clic en los dientes para aplicar: ${TOOTH_CONDITIONS.find((c) => c.id === selectedCondition)?.name}`}
            {selectedTool === "annotate" && "Haz clic en cualquier lugar para agregar una anotación"}
            {selectedTool === "measure" && "Haz clic y arrastra para medir distancias"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="relative bg-white border rounded-lg p-8 overflow-auto"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
          >
            {showGrid && (
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            )}

            <div className="space-y-12">
              {/* Upper jaw */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-6 text-center">MAXILAR SUPERIOR</h3>
                <div className="flex justify-center">
                  <div className="grid grid-cols-8 lg:grid-cols-16 gap-3">
                    {teethLayout[0].map((toothNumber) => (
                      <div key={toothNumber} className="flex flex-col items-center group">
                        <div className="text-xs text-gray-500 mb-2">{toothNumber}</div>
                        <div className="relative">
                          <button
                            className={`
                              w-12 h-12 lg:w-14 lg:h-14 border-3 rounded-lg transition-all duration-200
                              hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                              ${selectedTooth === toothNumber ? "ring-2 ring-blue-500" : ""}
                              ${readOnly ? "cursor-default" : "cursor-pointer"}
                            `}
                            style={{
                              backgroundColor: getToothColor(toothNumber),
                              borderColor: getToothBorderColor(toothNumber),
                            }}
                            onClick={(e) => handleToothClick(toothNumber, e)}
                            title={`Diente ${toothNumber}${readOnly ? " (Solo lectura)" : ""}`}
                            disabled={readOnly && selectedTool !== "select"}
                          >
                            <span className="text-xs font-medium">{toothNumber}</span>
                          </button>

                          {/* Condition indicators */}
                          {toothData[toothNumber]?.conditions && toothData[toothNumber].conditions.length > 1 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                              {toothData[toothNumber].conditions.length}
                            </div>
                          )}

                          {/* Notes indicator */}
                          {toothData[toothNumber]?.notes && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                          )}

                          {/* Images indicator */}
                          {toothData[toothNumber]?.images && toothData[toothNumber].images.length > 0 && (
                            <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500 rounded-full" />
                          )}

                          {/* Surface overlay */}
                          {showSurfaces && (
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                              {["mesial", "vestibular", "distal", "lingual", "oclusal"].map((surface, index) => (
                                <div
                                  key={surface}
                                  className={`
                                    border border-gray-400 hover:bg-blue-200 cursor-pointer
                                    ${index === 1 ? "col-start-2 row-start-1" : ""}
                                    ${index === 0 ? "col-start-1 row-start-2" : ""}
                                    ${index === 2 ? "col-start-3 row-start-2" : ""}
                                    ${index === 3 ? "col-start-2 row-start-3" : ""}
                                    ${index === 4 ? "col-start-2 row-start-2" : ""}
                                  `}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (!readOnly) {
                                      setSelectedSurface(surface)
                                      applyConditionToTooth(toothNumber, surface)
                                    }
                                  }}
                                  title={surface}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Quick actions */}
                        {!readOnly && toothData[toothNumber]?.conditions.length > 0 && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleToothClick(toothNumber)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => clearTooth(toothNumber)}>
                                  <Eraser className="h-4 w-4 mr-2" />
                                  Limpiar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower jaw */}
              <div>
                <div className="flex justify-center">
                  <div className="grid grid-cols-8 lg:grid-cols-16 gap-3">
                    {teethLayout[1].map((toothNumber) => (
                      <div key={toothNumber} className="flex flex-col items-center group">
                        <div className="relative">
                          <button
                            className={`
                              w-12 h-12 lg:w-14 lg:h-14 border-3 rounded-lg transition-all duration-200
                              hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                              ${selectedTooth === toothNumber ? "ring-2 ring-blue-500" : ""}
                              ${readOnly ? "cursor-default" : "cursor-pointer"}
                            `}
                            style={{
                              backgroundColor: getToothColor(toothNumber),
                              borderColor: getToothBorderColor(toothNumber),
                            }}
                            onClick={(e) => handleToothClick(toothNumber, e)}
                            title={`Diente ${toothNumber}${readOnly ? " (Solo lectura)" : ""}`}
                            disabled={readOnly && selectedTool !== "select"}
                          >
                            <span className="text-xs font-medium">{toothNumber}</span>
                          </button>

                          {/* Condition indicators */}
                          {toothData[toothNumber]?.conditions && toothData[toothNumber].conditions.length > 1 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                              {toothData[toothNumber].conditions.length}
                            </div>
                          )}

                          {/* Notes indicator */}
                          {toothData[toothNumber]?.notes && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                          )}

                          {/* Images indicator */}
                          {toothData[toothNumber]?.images && toothData[toothNumber].images.length > 0 && (
                            <div className="absolute -top-1 -left-1 w-3 h-3 bg-purple-500 rounded-full" />
                          )}

                          {/* Surface overlay */}
                          {showSurfaces && (
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                              {["mesial", "vestibular", "distal", "lingual", "oclusal"].map((surface, index) => (
                                <div
                                  key={surface}
                                  className={`
                                    border border-gray-400 hover:bg-blue-200 cursor-pointer
                                    ${index === 1 ? "col-start-2 row-start-1" : ""}
                                    ${index === 0 ? "col-start-1 row-start-2" : ""}
                                    ${index === 2 ? "col-start-3 row-start-2" : ""}
                                    ${index === 3 ? "col-start-2 row-start-3" : ""}
                                    ${index === 4 ? "col-start-2 row-start-2" : ""}
                                  `}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (!readOnly) {
                                      setSelectedSurface(surface)
                                      applyConditionToTooth(toothNumber, surface)
                                    }
                                  }}
                                  title={surface}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Quick actions */}
                        {!readOnly && toothData[toothNumber]?.conditions.length > 0 && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleToothClick(toothNumber)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => clearTooth(toothNumber)}>
                                  <Eraser className="h-4 w-4 mr-2" />
                                  Limpiar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}

                        <div className="text-xs text-gray-500 mt-2">{toothNumber}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-700 mt-6 text-center">MAXILAR INFERIOR</h3>
              </div>
            </div>

            {/* Annotations overlay */}
            {showAnnotations && annotations.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {annotations.map((annotation) => (
                  <div
                    key={annotation.id}
                    className="absolute pointer-events-auto"
                    style={{ left: annotation.x, top: annotation.y }}
                  >
                    <div className="bg-white border shadow-lg rounded p-2 max-w-xs">
                      <div className="text-xs font-medium" style={{ color: annotation.color }}>
                        {annotation.type}
                      </div>
                      <div className="text-sm">{annotation.text}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(annotation.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Múltiples condiciones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Con notas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Con imágenes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-red-500 rounded"></div>
                <span>Condición severa</span>
              </div>
            </div>
            <div className="text-xs">
              <strong>Instrucciones:</strong>
              {!readOnly && (
                <>
                  {" • Selecciona una herramienta y condición"}
                  {" • Haz clic en los dientes para aplicar"}
                  {" • Doble clic para ver detalles"}
                  {" • Usa Ctrl+Z para deshacer"}
                </>
              )}
              {readOnly && " • Vista de solo lectura - no se pueden realizar cambios"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tooth Details Dialog */}
      <Dialog open={isToothDialogOpen} onOpenChange={setIsToothDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Detalles del Diente {selectedTooth}
            </DialogTitle>
            <DialogDescription>Información completa y gestión del diente seleccionado</DialogDescription>
          </DialogHeader>

          {selectedTooth && (
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="conditions">Condiciones</TabsTrigger>
                <TabsTrigger value="surfaces">Superficies</TabsTrigger>
                <TabsTrigger value="clinical">Clínico</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Información Básica</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Número</Label>
                          <p className="text-2xl font-bold text-blue-600">{selectedTooth}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Tipo</Label>
                          <p className="text-sm">
                            {selectedTooth.toString().length === 1 || selectedTooth < 20 ? "Temporal" : "Permanente"}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Cuadrante</Label>
                          <p className="text-sm">
                            {Math.floor(selectedTooth / 10) === 1
                              ? "Superior Derecho"
                              : Math.floor(selectedTooth / 10) === 2
                                ? "Superior Izquierdo"
                                : Math.floor(selectedTooth / 10) === 3
                                  ? "Inferior Izquierdo"
                                  : Math.floor(selectedTooth / 10) === 4
                                    ? "Inferior Derecho"
                                    : Math.floor(selectedTooth / 10) === 5
                                      ? "Superior Derecho (Temporal)"
                                      : Math.floor(selectedTooth / 10) === 6
                                        ? "Superior Izquierdo (Temporal)"
                                        : Math.floor(selectedTooth / 10) === 7
                                          ? "Inferior Izquierdo (Temporal)"
                                          : "Inferior Derecho (Temporal)"}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Estado</Label>
                          <div className="flex items-center gap-2">
                            {toothData[selectedTooth]?.conditions.length > 0 ? (
                              <Badge variant="secondary">Con condiciones</Badge>
                            ) : (
                              <Badge variant="outline">Sin condiciones</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Última modificación</Label>
                        <p className="text-sm text-muted-foreground">
                          {toothData[selectedTooth]?.lastModified
                            ? new Date(toothData[selectedTooth].lastModified).toLocaleString()
                            : "Sin modificaciones"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Notas Clínicas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Agregar notas sobre este diente..."
                          value={toothNotes}
                          onChange={(e) => setToothNotes(e.target.value)}
                          rows={6}
                          disabled={readOnly}
                        />
                        {!readOnly && (
                          <Button onClick={saveToothNotes} className="w-full">
                            <Save className="h-4 w-4 mr-2" />
                            Guardar Notas
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="conditions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Condiciones Aplicadas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {toothData[selectedTooth]?.conditions.map((conditionId, index) => {
                        const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
                        return (
                          <div
                            key={`${conditionId}-${index}`}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-6 h-6 rounded border-2 border-white shadow-sm"
                                style={{ backgroundColor: condition?.color }}
                              />
                              <div>
                                <div className="font-medium">{condition?.name}</div>
                                <div className="text-sm text-muted-foreground">{condition?.description}</div>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {condition?.category}
                                  </Badge>
                                  {condition?.severity && (
                                    <Badge
                                      variant="secondary"
                                      className={`text-xs ${
                                        condition.severity === "severe"
                                          ? "bg-red-100 text-red-800"
                                          : condition.severity === "moderate"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {condition.severity}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            {!readOnly && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedConditions = toothData[selectedTooth].conditions.filter(
                                    (_, i) => i !== index,
                                  )
                                  const updatedToothData = {
                                    ...toothData,
                                    [selectedTooth]: {
                                      ...toothData[selectedTooth],
                                      conditions: updatedConditions,
                                    },
                                  }
                                  setToothData(updatedToothData)
                                  onToothUpdate(updatedToothData[selectedTooth])
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        )
                      })}
                      {(!toothData[selectedTooth]?.conditions || toothData[selectedTooth].conditions.length === 0) && (
                        <div className="text-center py-8 text-muted-foreground">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No hay condiciones aplicadas</p>
                          <p className="text-sm">Este diente está marcado como sano</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="surfaces" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Superficies Dentales</CardTitle>
                    <CardDescription>Gestión detallada por superficie del diente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {(selectedTooth.toString().endsWith("1") ||
                      selectedTooth.toString().endsWith("2") ||
                      selectedTooth.toString().endsWith("3")
                        ? TOOTH_SURFACES.anterior
                        : TOOTH_SURFACES.posterior
                      ).map((surface) => (
                        <Card key={surface} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium capitalize">{surface}</h4>
                              {toothData[selectedTooth]?.surfaces[surface]?.conditions.length > 0 && (
                                <Badge variant="secondary">
                                  {toothData[selectedTooth].surfaces[surface].conditions.length} condición(es)
                                </Badge>
                              )}
                            </div>

                            <div className="space-y-2">
                              {toothData[selectedTooth]?.surfaces[surface]?.conditions.map((conditionId, index) => {
                                const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
                                return (
                                  <div key={index} className="flex items-center gap-2 text-sm">
                                    <div
                                      className="w-3 h-3 rounded border"
                                      style={{ backgroundColor: condition?.color }}
                                    />
                                    <span>{condition?.name}</span>
                                  </div>
                                )
                              })}
                              {(!toothData[selectedTooth]?.surfaces[surface]?.conditions ||
                                toothData[selectedTooth].surfaces[surface].conditions.length === 0) && (
                                <p className="text-sm text-muted-foreground">Sin condiciones</p>
                              )}
                            </div>

                            {!readOnly && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedSurface(surface)
                                    if (selectedCondition) {
                                      applyConditionToTooth(selectedTooth, surface)
                                    }
                                  }}
                                  disabled={!selectedCondition}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Aplicar
                                </Button>
                                {toothData[selectedTooth]?.surfaces[surface]?.conditions.length > 0 && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const updatedSurfaces = { ...toothData[selectedTooth].surfaces }
                                      updatedSurfaces[surface] = {
                                        ...updatedSurfaces[surface],
                                        conditions: [],
                                      }
                                      const updatedToothData = {
                                        ...toothData,
                                        [selectedTooth]: {
                                          ...toothData[selectedTooth],
                                          surfaces: updatedSurfaces,
                                        },
                                      }
                                      setToothData(updatedToothData)
                                      onToothUpdate(updatedToothData[selectedTooth])
                                    }}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Eraser className="h-3 w-3 mr-1" />
                                    Limpiar
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clinical" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Datos Clínicos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobility">Movilidad (0-3)</Label>
                          <Input
                            id="mobility"
                            type="number"
                            min="0"
                            max="3"
                            value={toothData[selectedTooth]?.mobility || 0}
                            onChange={(e) => {
                              if (!readOnly) {
                                const updatedToothData = {
                                  ...toothData,
                                  [selectedTooth]: {
                                    ...toothData[selectedTooth],
                                    number: selectedTooth,
                                    mobility: Number.parseInt(e.target.value),
                                    conditions: toothData[selectedTooth]?.conditions || [],
                                    notes: toothData[selectedTooth]?.notes || "",
                                    surfaces: toothData[selectedTooth]?.surfaces || {},
                                    annotations: toothData[selectedTooth]?.annotations || [],
                                    images: toothData[selectedTooth]?.images || [],
                                    lastModified: new Date().toISOString(),
                                  },
                                }
                                setToothData(updatedToothData)
                              }
                            }}
                            disabled={readOnly}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pocket">Profundidad de Bolsa (mm)</Label>
                          <Input
                            id="pocket"
                            type="number"
                            min="0"
                            max="15"
                            value={toothData[selectedTooth]?.pocket || 0}
                            onChange={(e) => {
                              if (!readOnly) {
                                const updatedToothData = {
                                  ...toothData,
                                  [selectedTooth]: {
                                    ...toothData[selectedTooth],
                                    number: selectedTooth,
                                    pocket: Number.parseInt(e.target.value),
                                    conditions: toothData[selectedTooth]?.conditions || [],
                                    notes: toothData[selectedTooth]?.notes || "",
                                    surfaces: toothData[selectedTooth]?.surfaces || {},
                                    annotations: toothData[selectedTooth]?.annotations || [],
                                    images: toothData[selectedTooth]?.images || [],
                                    lastModified: new Date().toISOString(),
                                  },
                                }
                                setToothData(updatedToothData)
                              }
                            }}
                            disabled={readOnly}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="bleeding"
                            checked={toothData[selectedTooth]?.bleeding || false}
                            onCheckedChange={(checked) => {
                              if (!readOnly) {
                                const updatedToothData = {
                                  ...toothData,
                                  [selectedTooth]: {
                                    ...toothData[selectedTooth],
                                    number: selectedTooth,
                                    bleeding: checked as boolean,
                                    conditions: toothData[selectedTooth]?.conditions || [],
                                    notes: toothData[selectedTooth]?.notes || "",
                                    surfaces: toothData[selectedTooth]?.surfaces || {},
                                    annotations: toothData[selectedTooth]?.annotations || [],
                                    images: toothData[selectedTooth]?.images || [],
                                    lastModified: new Date().toISOString(),
                                  },
                                }
                                setToothData(updatedToothData)
                              }
                            }}
                            disabled={readOnly}
                          />
                          <Label htmlFor="bleeding">Sangrado al sondaje</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="plaque"
                            checked={toothData[selectedTooth]?.plaque || false}
                            onCheckedChange={(checked) => {
                              if (!readOnly) {
                                const updatedToothData = {
                                  ...toothData,
                                  [selectedTooth]: {
                                    ...toothData[selectedTooth],
                                    number: selectedTooth,
                                    plaque: checked as boolean,
                                    conditions: toothData[selectedTooth]?.conditions || [],
                                    notes: toothData[selectedTooth]?.notes || "",
                                    surfaces: toothData[selectedTooth]?.surfaces || {},
                                    annotations: toothData[selectedTooth]?.annotations || [],
                                    images: toothData[selectedTooth]?.images || [],
                                    lastModified: new Date().toISOString(),
                                  },
                                }
                                setToothData(updatedToothData)
                              }
                            }}
                            disabled={readOnly}
                          />
                          <Label htmlFor="plaque">Presencia de placa</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Imágenes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {toothData[selectedTooth]?.images && toothData[selectedTooth].images.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {toothData[selectedTooth].images.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Imagen ${index + 1} del diente ${selectedTooth}`}
                                  className="w-full h-24 object-cover rounded border"
                                />
                                {!readOnly && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/80"
                                    onClick={() => {
                                      const updatedImages = toothData[selectedTooth].images.filter(
                                        (_, i) => i !== index,
                                      )
                                      const updatedToothData = {
                                        ...toothData,
                                        [selectedTooth]: {
                                          ...toothData[selectedTooth],
                                          images: updatedImages,
                                        },
                                      }
                                      setToothData(updatedToothData)
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No hay imágenes</p>
                          </div>
                        )}

                        {!readOnly && (
                          <Button variant="outline" className="w-full bg-transparent">
                            <Upload className="h-4 w-4 mr-2" />
                            Subir Imagen
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsToothDialogOpen(false)}>
              Cerrar
            </Button>
            {!readOnly && selectedTooth && (
              <>
                <Button
                  variant="outline"
                  onClick={() => clearTooth(selectedTooth)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Eraser className="h-4 w-4 mr-2" />
                  Limpiar Diente
                </Button>
                <Button onClick={saveToothNotes}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
