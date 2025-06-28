"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Save, FileText, AlertTriangle, CheckCircle2, Crown, Zap, Wrench } from "lucide-react"

interface ToothCondition {
  id: number
  condition: "healthy" | "caries" | "filled" | "crown" | "missing" | "root_canal" | "implant" | "fracture" | "mobility"
  notes?: string
  date?: string
  surfaces?: string[]
  severity?: "mild" | "moderate" | "severe"
}

interface OdontogramProps {
  patientId: string
  patientName?: string
  onSave?: (data: any) => void
}

export function Odontogram({ patientId, patientName = "Paciente", onSave }: OdontogramProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCondition, setSelectedCondition] = useState<string>("")
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([])
  const [toothNotes, setToothNotes] = useState("")
  const [generalNotes, setGeneralNotes] = useState("")

  const [toothConditions, setToothConditions] = useState<Record<number, ToothCondition>>({
    // Datos de ejemplo
    11: { id: 11, condition: "healthy" },
    12: { id: 12, condition: "caries", notes: "Caries oclusal pequeña", surfaces: ["O"], severity: "mild" },
    13: { id: 13, condition: "filled", notes: "Restauración de resina compuesta" },
    21: { id: 21, condition: "healthy" },
    22: { id: 22, condition: "crown", notes: "Corona de porcelana sobre metal" },
    23: { id: 23, condition: "healthy" },
    16: { id: 16, condition: "root_canal", notes: "Endodoncia completada", surfaces: ["O", "M", "D"] },
    26: { id: 26, condition: "missing", notes: "Extraído por caries extensa" },
  })

  // Numeración dental FDI - Adultos
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

  // Superficies dentales
  const surfaces = [
    { id: "O", name: "Oclusal", description: "Superficie de masticación" },
    { id: "M", name: "Mesial", description: "Superficie hacia el centro" },
    { id: "D", name: "Distal", description: "Superficie hacia atrás" },
    { id: "V", name: "Vestibular", description: "Superficie hacia el labio/mejilla" },
    { id: "L", name: "Lingual", description: "Superficie hacia la lengua" },
  ]

  const conditionTypes = [
    {
      id: "healthy",
      name: "Sano",
      color: "bg-green-100 border-green-300 text-green-800",
      icon: CheckCircle2,
      description: "Diente en perfecto estado",
    },
    {
      id: "caries",
      name: "Caries",
      color: "bg-red-100 border-red-300 text-red-800",
      icon: AlertTriangle,
      description: "Presencia de caries dental",
    },
    {
      id: "filled",
      name: "Obturado",
      color: "bg-blue-100 border-blue-300 text-blue-800",
      icon: Wrench,
      description: "Diente con restauración",
    },
    {
      id: "crown",
      name: "Corona",
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      icon: Crown,
      description: "Diente con corona protésica",
    },
    {
      id: "missing",
      name: "Ausente",
      color: "bg-gray-100 border-gray-300 text-gray-800",
      icon: null,
      description: "Diente extraído o ausente",
    },
    {
      id: "root_canal",
      name: "Endodoncia",
      color: "bg-purple-100 border-purple-300 text-purple-800",
      icon: Zap,
      description: "Tratamiento de conducto",
    },
    {
      id: "implant",
      name: "Implante",
      color: "bg-teal-100 border-teal-300 text-teal-800",
      icon: null,
      description: "Implante dental",
    },
    {
      id: "fracture",
      name: "Fractura",
      color: "bg-orange-100 border-orange-300 text-orange-800",
      icon: AlertTriangle,
      description: "Diente fracturado",
    },
    {
      id: "mobility",
      name: "Movilidad",
      color: "bg-pink-100 border-pink-300 text-pink-800",
      icon: null,
      description: "Diente con movilidad",
    },
  ]

  const getToothStyle = (toothNumber: number) => {
    const condition = toothConditions[toothNumber]
    if (!condition) {
      return "bg-white border-gray-300 hover:border-blue-400"
    }

    const conditionType = conditionTypes.find((t) => t.id === condition.condition)
    return conditionType ? conditionType.color.replace("text-", "hover:border-") : "bg-white border-gray-300"
  }

  const getConditionLabel = (condition: string) => {
    const conditionType = conditionTypes.find((t) => t.id === condition)
    return conditionType?.name || "Desconocido"
  }

  const getConditionIcon = (condition: string) => {
    const conditionType = conditionTypes.find((t) => t.id === condition)
    return conditionType?.icon
  }

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber)
    const condition = toothConditions[toothNumber]
    setSelectedCondition(condition?.condition || "healthy")
    setSelectedSurfaces(condition?.surfaces || [])
    setToothNotes(condition?.notes || "")
    setIsEditDialogOpen(true)
  }

  const handleSurfaceToggle = (surfaceId: string) => {
    setSelectedSurfaces((prev) =>
      prev.includes(surfaceId) ? prev.filter((s) => s !== surfaceId) : [...prev, surfaceId],
    )
  }

  const saveToothCondition = () => {
    if (selectedTooth === null) return

    const updatedCondition: ToothCondition = {
      id: selectedTooth,
      condition: selectedCondition as any,
      notes: toothNotes,
      surfaces: selectedSurfaces,
      date: new Date().toISOString(),
    }

    setToothConditions((prev) => ({
      ...prev,
      [selectedTooth]: updatedCondition,
    }))

    setIsEditDialogOpen(false)
  }

  const saveOdontogram = () => {
    const odontogramData = {
      patientId,
      patientName,
      teeth: toothConditions,
      generalNotes,
      lastUpdated: new Date().toISOString(),
    }

    if (onSave) {
      onSave(odontogramData)
    }

    console.log("Odontograma guardado:", odontogramData)
  }

  const getConditionStats = () => {
    const stats: Record<string, number> = {}
    Object.values(toothConditions).forEach((tooth) => {
      stats[tooth.condition] = (stats[tooth.condition] || 0) + 1
    })
    return stats
  }

  const ToothComponent = ({ number, position }: { number: number; position: "upper" | "lower" }) => {
    const condition = toothConditions[number]
    const Icon = condition ? getConditionIcon(condition.condition) : null

    return (
      <div className="flex flex-col items-center">
        {position === "upper" && <div className="text-xs text-gray-500 mb-1 font-mono">{number}</div>}

        <div
          className={`
            relative w-10 h-10 border-2 rounded-lg cursor-pointer 
            flex items-center justify-center text-xs font-bold
            transition-all duration-200 hover:scale-105 hover:shadow-md
            ${getToothStyle(number)}
          `}
          onClick={() => handleToothClick(number)}
          title={`Diente ${number}${condition ? ` - ${getConditionLabel(condition.condition)}` : ""}`}
        >
          {Icon && <Icon className="h-4 w-4" />}
          {condition?.condition === "missing" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-0.5 bg-gray-400 rotate-45"></div>
              <div className="w-6 h-0.5 bg-gray-400 -rotate-45 absolute"></div>
            </div>
          )}
          {condition?.notes && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
          )}
          {condition?.surfaces && condition.surfaces.length > 0 && (
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-400 rounded-full border border-white"></div>
          )}
        </div>

        {position === "lower" && <div className="text-xs text-gray-500 mt-1 font-mono">{number}</div>}
      </div>
    )
  }

  const conditionStats = getConditionStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Odontograma - {patientName}</h2>
          <p className="text-muted-foreground">Registro dental interactivo</p>
        </div>
        <Button onClick={saveOdontogram} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Guardar Odontograma
        </Button>
      </div>

      {/* Leyenda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leyenda de Condiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {conditionTypes.map(({ id, name, color, icon: Icon }) => (
              <div key={id} className="flex items-center gap-2 p-2 rounded-lg border">
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${color}`}>
                  {Icon && <Icon className="h-3 w-3" />}
                </div>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Con notas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span>Superficies afectadas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Odontograma Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Odontograma Digital</CardTitle>
          <CardDescription>Haz clic en cualquier diente para editar su estado y agregar notas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Dientes superiores */}
          <div className="space-y-4">
            <h4 className="text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Maxilar Superior
            </h4>
            <div className="flex justify-center gap-2 flex-wrap">
              {upperTeeth.map((number) => (
                <ToothComponent key={number} number={number} position="upper" />
              ))}
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500 font-medium">Línea Media</span>
            </div>
          </div>

          {/* Dientes inferiores */}
          <div className="space-y-4">
            <div className="flex justify-center gap-2 flex-wrap">
              {lowerTeeth.map((number) => (
                <ToothComponent key={number} number={number} position="lower" />
              ))}
            </div>
            <h4 className="text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Maxilar Inferior
            </h4>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      {Object.keys(conditionStats).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen Estadístico</CardTitle>
            <CardDescription>Distribución de condiciones dentales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Object.entries(conditionStats).map(([condition, count]) => {
                const conditionType = conditionTypes.find((t) => t.id === condition)
                const Icon = conditionType?.icon

                return (
                  <div
                    key={condition}
                    className={`p-4 rounded-lg border-2 text-center ${conditionType?.color || "bg-gray-100"}`}
                  >
                    <div className="flex justify-center mb-2">{Icon && <Icon className="h-6 w-6" />}</div>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm font-medium">{conditionType?.name}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumen de Tratamientos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumen de Tratamientos</CardTitle>
          <CardDescription>Dientes que requieren atención especial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.values(toothConditions)
              .filter((tooth) => tooth.condition !== "healthy")
              .map((tooth) => {
                const Icon = getConditionIcon(tooth.condition)
                return (
                  <div key={tooth.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${getToothStyle(tooth.id)}`}>
                      {Icon && <Icon className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Diente {tooth.id}</span>
                        <Badge variant="outline">{getConditionLabel(tooth.condition)}</Badge>
                        {tooth.surfaces && tooth.surfaces.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Superficies: {tooth.surfaces.join(", ")}
                          </Badge>
                        )}
                      </div>
                      {tooth.notes && <p className="text-sm text-gray-600">{tooth.notes}</p>}
                      {tooth.date && (
                        <p className="text-xs text-gray-400 mt-1">
                          Última actualización: {new Date(tooth.date).toLocaleDateString("es-ES")}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}

            {Object.values(toothConditions).filter((tooth) => tooth.condition !== "healthy").length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500" />
                <p className="text-lg font-medium">¡Excelente salud dental!</p>
                <p className="text-sm">No se han registrado condiciones que requieran tratamiento</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notas Generales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notas Generales del Tratamiento
          </CardTitle>
          <CardDescription>Observaciones generales sobre el estado dental del paciente</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            placeholder="Escribe observaciones generales sobre el estado dental, plan de tratamiento, recomendaciones..."
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>

      {/* Diálogo de edición de diente */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Diente {selectedTooth}</DialogTitle>
            <DialogDescription>
              Actualiza el estado, superficies afectadas y notas del diente seleccionado
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Condición del diente */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Estado del Diente</Label>
              <div className="grid grid-cols-2 gap-3">
                {conditionTypes.map(({ id, name, color, icon: Icon }) => (
                  <Button
                    key={id}
                    variant={selectedCondition === id ? "default" : "outline"}
                    className={`h-auto p-3 justify-start ${selectedCondition === id ? "" : color}`}
                    onClick={() => setSelectedCondition(id)}
                  >
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Superficies afectadas */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Superficies Afectadas</Label>
              <div className="grid grid-cols-5 gap-2">
                {surfaces.map((surface) => (
                  <Button
                    key={surface.id}
                    variant={selectedSurfaces.includes(surface.id) ? "default" : "outline"}
                    size="sm"
                    className="h-12 flex flex-col"
                    onClick={() => handleSurfaceToggle(surface.id)}
                    title={surface.description}
                  >
                    <span className="font-bold">{surface.id}</span>
                    <span className="text-xs">{surface.name}</span>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Selecciona las superficies del diente que están afectadas por la condición
              </p>
            </div>

            {/* Notas específicas */}
            <div className="space-y-3">
              <Label htmlFor="tooth-notes" className="text-base font-semibold">
                Notas Específicas
              </Label>
              <Textarea
                id="tooth-notes"
                placeholder="Detalles específicos sobre el estado del diente, tratamiento realizado, observaciones..."
                value={toothNotes}
                onChange={(e) => setToothNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveToothCondition} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
