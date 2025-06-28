"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Download, Save, Edit, Trash2, Calendar, User, Stethoscope } from "lucide-react"

interface ToothCondition {
  id: number | string
  condition:
    | "healthy"
    | "caries"
    | "filled"
    | "crown"
    | "missing"
    | "root_canal"
    | "implant"
    | "extraction_needed"
    | "in_treatment"
    | "fractured"
    | "mobile"
    | "impacted"
  surfaces?: string[]
  notes?: string
  date?: string
  studentId?: string
  professorId?: string
  treatmentPlan?: string
  priority?: "low" | "medium" | "high" | "urgent"
  images?: string[]
  cost?: number
  status?: "pending" | "in_progress" | "completed" | "cancelled"
}

interface Treatment {
  id: string
  toothId: number | string
  type: string
  description: string
  date: string
  studentId: string
  professorId?: string
  status: "planned" | "in_progress" | "completed" | "cancelled"
  cost: number
  notes?: string
}

interface OdontogramAdvancedProps {
  patientId: string
  patientAge?: number
  mode?: "adult" | "child" | "mixed"
  readonly?: boolean
  onToothUpdate?: (tooth: ToothCondition) => void
  onSave?: (data: any) => void
}

export function OdontogramAdvanced({
  patientId,
  patientAge = 25,
  mode = "adult",
  readonly = false,
  onToothUpdate,
  onSave,
}: OdontogramAdvancedProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [odontogramMode, setOdontogramMode] = useState(mode)
  const [viewMode, setViewMode] = useState<"visual" | "table" | "timeline">("visual")
  const [filterCondition, setFilterCondition] = useState<string>("all")
  const [showLegend, setShowLegend] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const { toast } = useToast()

  const [toothConditions, setToothConditions] = useState<Record<string, ToothCondition>>({
    // Datos de ejemplo más completos
    "11": {
      id: "11",
      condition: "healthy",
      date: "2024-01-15",
      studentId: "est1",
      status: "completed",
    },
    "12": {
      id: "12",
      condition: "caries",
      surfaces: ["O", "M"],
      notes: "Caries oclusal y mesial profunda",
      date: "2024-01-10",
      studentId: "est1",
      treatmentPlan: "Restauración con resina compuesta",
      priority: "high",
      status: "pending",
      cost: 45.0,
    },
    "13": {
      id: "13",
      condition: "filled",
      surfaces: ["O"],
      notes: "Restauración de amalgama en buen estado",
      date: "2023-12-05",
      studentId: "est2",
      status: "completed",
      cost: 35.0,
    },
    "21": {
      id: "21",
      condition: "crown",
      notes: "Corona de porcelana sobre metal",
      date: "2023-11-20",
      studentId: "est1",
      professorId: "prof1",
      status: "completed",
      cost: 250.0,
    },
    "22": {
      id: "22",
      condition: "root_canal",
      notes: "Endodoncia completada, pendiente corona",
      date: "2024-01-05",
      studentId: "est1",
      professorId: "prof1",
      treatmentPlan: "Corona de porcelana",
      priority: "medium",
      status: "in_progress",
      cost: 180.0,
    },
    "36": {
      id: "36",
      condition: "extraction_needed",
      notes: "Caries extensa, no restaurable",
      date: "2024-01-12",
      studentId: "est3",
      treatmentPlan: "Extracción simple",
      priority: "urgent",
      status: "pending",
      cost: 25.0,
    },
  })

  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: "t1",
      toothId: "12",
      type: "Restauración",
      description: "Restauración con resina compuesta",
      date: "2024-01-20",
      studentId: "est1",
      professorId: "prof1",
      status: "planned",
      cost: 45.0,
      notes: "Usar técnica incremental",
    },
    {
      id: "t2",
      toothId: "22",
      type: "Corona",
      description: "Corona de porcelana",
      date: "2024-01-25",
      studentId: "est1",
      professorId: "prof1",
      status: "planned",
      cost: 250.0,
      notes: "Toma de impresión programada",
    },
  ])

  // Numeración dental FDI
  const adultUpperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
  const adultLowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]
  const childUpperTeeth = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65]
  const childLowerTeeth = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75]
  const mixedUpperTeeth = [16, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 26]
  const mixedLowerTeeth = [36, 75, 74, 73, 72, 71, 81, 82, 83, 84, 85, 46]

  const getTeethByMode = () => {
    switch (odontogramMode) {
      case "child":
        return { upper: childUpperTeeth, lower: childLowerTeeth }
      case "mixed":
        return { upper: mixedUpperTeeth, lower: mixedLowerTeeth }
      default:
        return { upper: adultUpperTeeth, lower: adultLowerTeeth }
    }
  }

  const getToothColor = (condition: string) => {
    const colors = {
      healthy: "bg-white border-gray-300 hover:border-green-400",
      caries: "bg-red-200 border-red-400 hover:border-red-500",
      filled: "bg-blue-200 border-blue-400 hover:border-blue-500",
      crown: "bg-yellow-200 border-yellow-400 hover:border-yellow-500",
      missing: "bg-gray-400 border-gray-500 opacity-50",
      root_canal: "bg-purple-200 border-purple-400 hover:border-purple-500",
      implant: "bg-green-200 border-green-400 hover:border-green-500",
      extraction_needed: "bg-red-300 border-red-500 hover:border-red-600",
      in_treatment: "bg-orange-200 border-orange-400 hover:border-orange-500",
      fractured: "bg-pink-200 border-pink-400 hover:border-pink-500",
      mobile: "bg-yellow-300 border-yellow-500 hover:border-yellow-600",
      impacted: "bg-indigo-200 border-indigo-400 hover:border-indigo-500",
    }
    return colors[condition as keyof typeof colors] || "bg-white border-gray-300 hover:border-gray-400"
  }

  const getConditionLabel = (condition: string) => {
    const labels: Record<string, string> = {
      healthy: "Sano",
      caries: "Caries",
      filled: "Obturado",
      crown: "Corona",
      missing: "Ausente",
      root_canal: "Endodoncia",
      implant: "Implante",
      extraction_needed: "Extracción Necesaria",
      in_treatment: "En Tratamiento",
      fractured: "Fracturado",
      mobile: "Móvil",
      impacted: "Impactado",
    }
    return labels[condition] || "Desconocido"
  }

  const getPriorityColor = (priority?: string) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    }
    return colors[priority as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const isTemporaryTooth = (toothNumber: number | string) => {
    const num = typeof toothNumber === "string" ? Number.parseInt(toothNumber) : toothNumber
    return num >= 51 && num <= 85
  }

  const handleToothClick = (toothNumber: number | string) => {
    if (readonly) return
    setSelectedTooth(toothNumber)
    setIsEditDialogOpen(true)
  }

  const updateToothCondition = useCallback(
    (toothNumber: number | string, condition: ToothCondition) => {
      const key = toothNumber.toString()
      setToothConditions((prev) => ({
        ...prev,
        [key]: { ...condition, date: new Date().toISOString() },
      }))
      onToothUpdate?.(condition)
      toast({
        title: "Diente actualizado",
        description: `Diente ${toothNumber} actualizado correctamente`,
      })
    },
    [onToothUpdate, toast],
  )

  const handleSaveOdontogram = () => {
    const data = {
      patientId,
      mode: odontogramMode,
      conditions: toothConditions,
      treatments,
      lastUpdated: new Date().toISOString(),
    }
    onSave?.(data)
    toast({
      title: "Odontograma guardado",
      description: "Los cambios se han guardado correctamente",
    })
  }

  const handleExportPDF = () => {
    toast({
      title: "Exportando PDF",
      description: "El odontograma se está exportando a PDF...",
    })
    // Implementar exportación a PDF
  }

  const filteredConditions = Object.values(toothConditions).filter((condition) => {
    if (filterCondition === "all") return true
    if (filterCondition === "problems") {
      return ["caries", "extraction_needed", "missing", "fractured", "mobile"].includes(condition.condition)
    }
    if (filterCondition === "treatments") {
      return ["filled", "crown", "root_canal", "implant", "in_treatment"].includes(condition.condition)
    }
    return condition.condition === filterCondition
  })

  const ToothComponent = ({ number }: { number: number | string }) => {
    const condition = toothConditions[number.toString()] || { id: number, condition: "healthy" }
    const isTemporary = isTemporaryTooth(number)
    const hasTreatment = treatments.some((t) => t.toothId === number.toString())

    return (
      <div className="relative">
        <div
          className={`
            w-12 h-12 border-2 rounded-lg cursor-pointer flex items-center justify-center text-xs font-medium 
            transition-all duration-200 hover:scale-110 hover:shadow-lg relative
            ${getToothColor(condition.condition)}
            ${isTemporary ? "italic font-bold" : ""}
            ${readonly ? "cursor-default" : "cursor-pointer"}
          `}
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={() => handleToothClick(number)}
          title={`Diente ${number} ${isTemporary ? "(Temporal)" : "(Permanente)"} - ${getConditionLabel(condition.condition)}`}
        >
          {number}
          {condition.priority === "urgent" && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
          {hasTreatment && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>}
        </div>
        {condition.surfaces && condition.surfaces.length > 0 && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="text-xs bg-black text-white px-1 rounded">{condition.surfaces.join("")}</div>
          </div>
        )}
      </div>
    )
  }

  const { upper: upperTeeth, lower: lowerTeeth } = getTeethByMode()

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Odontograma Digital Avanzado
              </CardTitle>
              <CardDescription className="mt-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Paciente: {patientId}
                  </span>
                  <span>Edad: {patientAge} años</span>
                  <span>Modo: {odontogramMode}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date().toLocaleDateString("es-ES")}
                  </span>
                </div>
              </CardDescription>
            </div>
            {!readonly && (
              <div className="flex gap-2">
                <Select value={odontogramMode} onValueChange={(value: any) => setOdontogramMode(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adult">Adulto</SelectItem>
                    <SelectItem value="child">Niño</SelectItem>
                    <SelectItem value="mixed">Mixta</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={handleExportPDF}>
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleSaveOdontogram}>
                  <Save className="h-4 w-4 mr-1" />
                  Guardar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* View Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Label>Vista:</Label>
              <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="table">Tabla</SelectItem>
                  <SelectItem value="timeline">Cronología</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label>Filtro:</Label>
              <Select value={filterCondition} onValueChange={setFilterCondition}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="problems">Problemas</SelectItem>
                  <SelectItem value="treatments">Tratamientos</SelectItem>
                  <SelectItem value="healthy">Sanos</SelectItem>
                  <SelectItem value="caries">Caries</SelectItem>
                  <SelectItem value="filled">Obturados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label>Zoom:</Label>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}>
                  -
                </Button>
                <span className="text-sm w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}>
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="legend" checked={showLegend} onCheckedChange={setShowLegend} />
              <Label htmlFor="legend">Mostrar leyenda</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsContent value="visual">
          <div className="space-y-6">
            {/* Leyenda */}
            {showLegend && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Leyenda de Condiciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                      { condition: "healthy", label: "Sano" },
                      { condition: "caries", label: "Caries" },
                      { condition: "filled", label: "Obturado" },
                      { condition: "crown", label: "Corona" },
                      { condition: "missing", label: "Ausente" },
                      { condition: "root_canal", label: "Endodoncia" },
                      { condition: "implant", label: "Implante" },
                      { condition: "extraction_needed", label: "Extracción" },
                      { condition: "in_treatment", label: "En Tratamiento" },
                      { condition: "fractured", label: "Fracturado" },
                      { condition: "mobile", label: "Móvil" },
                      { condition: "impacted", label: "Impactado" },
                    ].map(({ condition, label }) => (
                      <div key={condition} className="flex items-center gap-2">
                        <div className={`w-4 h-4 border-2 rounded ${getToothColor(condition)}`}></div>
                        <span className="text-sm">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Símbolos:</strong> 🔴 = Urgente, 🔵 = Tratamiento programado, <em>Cursiva</em> = Diente
                      temporal
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Odontograma Visual */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Odontograma -{" "}
                  {odontogramMode === "adult" ? "Adulto" : odontogramMode === "child" ? "Niño" : "Dentición Mixta"}
                </CardTitle>
                <CardDescription>
                  {readonly ? "Vista de solo lectura" : "Haz clic en cualquier diente para editar su estado"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Dientes superiores */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-center text-gray-600">Maxilar Superior</h4>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {upperTeeth.map((number) => (
                      <ToothComponent key={number} number={number} />
                    ))}
                  </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-300 relative">
                  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500 font-medium">
                    Línea de Oclusión
                  </div>
                </div>

                {/* Dientes inferiores */}
                <div className="space-y-4">
                  <div className="flex justify-center gap-2 flex-wrap">
                    {lowerTeeth.map((number) => (
                      <ToothComponent key={number} number={number} />
                    ))}
                  </div>
                  <h4 className="text-sm font-medium text-center text-gray-600">Maxilar Inferior</h4>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vista de Tabla</CardTitle>
              <CardDescription>Resumen detallado de todas las condiciones dentales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-2 text-left">Diente</th>
                      <th className="border border-gray-300 p-2 text-left">Tipo</th>
                      <th className="border border-gray-300 p-2 text-left">Condición</th>
                      <th className="border border-gray-300 p-2 text-left">Superficies</th>
                      <th className="border border-gray-300 p-2 text-left">Prioridad</th>
                      <th className="border border-gray-300 p-2 text-left">Estado</th>
                      <th className="border border-gray-300 p-2 text-left">Fecha</th>
                      <th className="border border-gray-300 p-2 text-left">Notas</th>
                      <th className="border border-gray-300 p-2 text-left">Costo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConditions.map((condition) => (
                      <tr key={condition.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2 font-medium">{condition.id}</td>
                        <td className="border border-gray-300 p-2">
                          {isTemporaryTooth(condition.id) ? (
                            <Badge variant="secondary">Temporal</Badge>
                          ) : (
                            <Badge variant="outline">Permanente</Badge>
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">
                          <Badge
                            className={getToothColor(condition.condition)
                              .replace("bg-", "bg-")
                              .replace("border-", "border-")}
                          >
                            {getConditionLabel(condition.condition)}
                          </Badge>
                        </td>
                        <td className="border border-gray-300 p-2">{condition.surfaces?.join(", ") || "-"}</td>
                        <td className="border border-gray-300 p-2">
                          {condition.priority ? (
                            <Badge className={getPriorityColor(condition.priority)}>{condition.priority}</Badge>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {condition.status ? <Badge variant="outline">{condition.status}</Badge> : "-"}
                        </td>
                        <td className="border border-gray-300 p-2 text-sm">
                          {condition.date ? new Date(condition.date).toLocaleDateString("es-ES") : "-"}
                        </td>
                        <td className="border border-gray-300 p-2 text-sm max-w-xs truncate">
                          {condition.notes || "-"}
                        </td>
                        <td className="border border-gray-300 p-2 text-sm">
                          {condition.cost ? `$${condition.cost.toFixed(2)}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cronología de Tratamientos</CardTitle>
              <CardDescription>Historial temporal de todos los tratamientos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.values(toothConditions)
                  .filter((condition) => condition.date)
                  .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
                  .map((condition) => (
                    <div key={condition.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700">{condition.id}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">Diente {condition.id}</h4>
                          <Badge className={getToothColor(condition.condition)}>
                            {getConditionLabel(condition.condition)}
                          </Badge>
                          {condition.priority && (
                            <Badge className={getPriorityColor(condition.priority)}>{condition.priority}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{condition.notes}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{new Date(condition.date!).toLocaleDateString("es-ES")}</span>
                          {condition.studentId && <span>Estudiante: {condition.studentId}</span>}
                          {condition.cost && <span>Costo: ${condition.cost.toFixed(2)}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Statistics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumen Estadístico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(toothConditions).filter((c) => c.condition === "healthy").length}
              </div>
              <div className="text-sm text-green-700">Dientes Sanos</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {
                  Object.values(toothConditions).filter((c) => ["caries", "extraction_needed"].includes(c.condition))
                    .length
                }
              </div>
              <div className="text-sm text-red-700">Problemas</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {
                  Object.values(toothConditions).filter((c) => ["filled", "crown", "root_canal"].includes(c.condition))
                    .length
                }
              </div>
              <div className="text-sm text-blue-700">Tratamientos</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Object.values(toothConditions).filter((c) => c.priority === "urgent").length}
              </div>
              <div className="text-sm text-orange-700">Urgentes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {selectedTooth && !readonly && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Editar Diente {selectedTooth}
                {isTemporaryTooth(selectedTooth) && <Badge variant="secondary">Temporal</Badge>}
              </DialogTitle>
              <DialogDescription>Actualiza el estado, tratamiento y notas del diente seleccionado</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Condition Selection */}
              <div className="space-y-2">
                <Label htmlFor="condition">Estado del Diente *</Label>
                <Select
                  defaultValue={toothConditions[selectedTooth.toString()]?.condition || "healthy"}
                  onValueChange={(value) => {
                    const currentCondition = toothConditions[selectedTooth.toString()] || {
                      id: selectedTooth,
                      condition: "healthy",
                    }
                    updateToothCondition(selectedTooth, {
                      ...currentCondition,
                      condition: value as any,
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthy">Sano</SelectItem>
                    <SelectItem value="caries">Caries</SelectItem>
                    <SelectItem value="filled">Obturado</SelectItem>
                    <SelectItem value="crown">Corona</SelectItem>
                    <SelectItem value="missing">Ausente</SelectItem>
                    <SelectItem value="root_canal">Endodoncia</SelectItem>
                    <SelectItem value="implant">Implante</SelectItem>
                    <SelectItem value="extraction_needed">Extracción Necesaria</SelectItem>
                    <SelectItem value="in_treatment">En Tratamiento</SelectItem>
                    <SelectItem value="fractured">Fracturado</SelectItem>
                    <SelectItem value="mobile">Móvil</SelectItem>
                    <SelectItem value="impacted">Impactado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Surface Selection */}
              <div className="space-y-2">
                <Label>Superficies Afectadas</Label>
                <div className="grid grid-cols-5 gap-2">
                  {["O", "M", "D", "V", "L"].map((surface) => (
                    <div key={surface} className="flex items-center space-x-2">
                      <Checkbox
                        id={surface}
                        defaultChecked={toothConditions[selectedTooth.toString()]?.surfaces?.includes(surface)}
                        onCheckedChange={(checked) => {
                          const currentCondition = toothConditions[selectedTooth.toString()] || {
                            id: selectedTooth,
                            condition: "healthy",
                          }
                          const currentSurfaces = currentCondition.surfaces || []
                          const newSurfaces = checked
                            ? [...currentSurfaces, surface]
                            : currentSurfaces.filter((s) => s !== surface)
                          updateToothCondition(selectedTooth, {
                            ...currentCondition,
                            surfaces: newSurfaces,
                          })
                        }}
                      />
                      <Label htmlFor={surface} className="text-sm">
                        {surface}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  O: Oclusal, M: Mesial, D: Distal, V: Vestibular, L: Lingual
                </p>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  defaultValue={toothConditions[selectedTooth.toString()]?.priority || "medium"}
                  onValueChange={(value) => {
                    const currentCondition = toothConditions[selectedTooth.toString()] || {
                      id: selectedTooth,
                      condition: "healthy",
                    }
                    updateToothCondition(selectedTooth, {
                      ...currentCondition,
                      priority: value as any,
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="urgent">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cost */}
              <div className="space-y-2">
                <Label htmlFor="cost">Costo Estimado ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue={toothConditions[selectedTooth.toString()]?.cost || ""}
                  onChange={(e) => {
                    const currentCondition = toothConditions[selectedTooth.toString()] || {
                      id: selectedTooth,
                      condition: "healthy",
                    }
                    updateToothCondition(selectedTooth, {
                      ...currentCondition,
                      cost: Number.parseFloat(e.target.value) || 0,
                    })
                  }}
                />
              </div>

              {/* Clinical Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notas Clínicas</Label>
                <Textarea
                  id="notes"
                  placeholder="Descripción detallada del estado del diente, observaciones clínicas..."
                  defaultValue={toothConditions[selectedTooth.toString()]?.notes || ""}
                  onChange={(e) => {
                    const currentCondition = toothConditions[selectedTooth.toString()] || {
                      id: selectedTooth,
                      condition: "healthy",
                    }
                    updateToothCondition(selectedTooth, {
                      ...currentCondition,
                      notes: e.target.value,
                    })
                  }}
                  rows={3}
                />
              </div>

              {/* Treatment Plan */}
              <div className="space-y-2">
                <Label htmlFor="treatmentPlan">Plan de Tratamiento</Label>
                <Textarea
                  id="treatmentPlan"
                  placeholder="Describir el plan de tratamiento propuesto, procedimientos a realizar..."
                  defaultValue={toothConditions[selectedTooth.toString()]?.treatmentPlan || ""}
                  onChange={(e) => {
                    const currentCondition = toothConditions[selectedTooth.toString()] || {
                      id: selectedTooth,
                      condition: "healthy",
                    }
                    updateToothCondition(selectedTooth, {
                      ...currentCondition,
                      treatmentPlan: e.target.value,
                    })
                  }}
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar información del diente?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción eliminará toda la información registrada para el diente {selectedTooth}. Esta acción
                      no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        const newConditions = { ...toothConditions }
                        delete newConditions[selectedTooth.toString()]
                        setToothConditions(newConditions)
                        setIsEditDialogOpen(false)
                        toast({
                          title: "Información eliminada",
                          description: `Se eliminó la información del diente ${selectedTooth}`,
                        })
                      }}
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={() => setIsEditDialogOpen(false)}>
                <Save className="h-4 w-4 mr-1" />
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
