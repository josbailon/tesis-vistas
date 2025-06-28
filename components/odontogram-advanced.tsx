"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { useToast } from "@/hooks/use-toast"
import { Save, RotateCcw, Palette, FileText } from "lucide-react"

interface ToothCondition {
  id: string
  name: string
  color: string
  description: string
}

interface ToothData {
  number: number
  conditions: string[]
  notes: string
  surfaces: {
    mesial: string[]
    distal: string[]
    occlusal: string[]
    vestibular: string[]
    lingual: string[]
  }
}

interface OdontogramProps {
  patientId: string
  patientAge: number
  mode: "adult" | "child" | "mixed"
  onSave: (data: any) => void
  onToothUpdate: (tooth: ToothData) => void
}

const TOOTH_CONDITIONS: ToothCondition[] = [
  { id: "healthy", name: "Sano", color: "#ffffff", description: "Diente sano" },
  { id: "caries", name: "Caries", color: "#8B4513", description: "Caries dental" },
  { id: "restoration", name: "Restauración", color: "#C0C0C0", description: "Restauración presente" },
  { id: "crown", name: "Corona", color: "#FFD700", description: "Corona protésica" },
  { id: "missing", name: "Ausente", color: "#FF0000", description: "Diente ausente" },
  { id: "impacted", name: "Impactado", color: "#800080", description: "Diente impactado" },
  { id: "root_canal", name: "Endodoncia", color: "#FF69B4", description: "Tratamiento endodóntico" },
  { id: "extraction", name: "Extracción", color: "#000000", description: "Indicado para extracción" },
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

export function OdontogramAdvanced({ patientId, patientAge, mode, onSave, onToothUpdate }: OdontogramProps) {
  const { toast } = useToast()
  const [selectedCondition, setSelectedCondition] = useState<string>("healthy")
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [isToothDialogOpen, setIsToothDialogOpen] = useState(false)
  const [toothData, setToothData] = useState<{ [key: number]: ToothData }>({})
  const [toothNotes, setToothNotes] = useState("")

  const getTeethLayout = () => {
    switch (mode) {
      case "adult":
        return ADULT_TEETH
      case "child":
        return CHILD_TEETH
      case "mixed":
        // For mixed dentition, show both but highlight primary teeth differently
        return ADULT_TEETH
      default:
        return ADULT_TEETH
    }
  }

  const handleToothClick = useCallback(
    (toothNumber: number) => {
      setSelectedTooth(toothNumber)
      setToothNotes(toothData[toothNumber]?.notes || "")
      setIsToothDialogOpen(true)
    },
    [toothData],
  )

  const applyConditionToTooth = useCallback(
    (toothNumber: number) => {
      if (!selectedCondition) return

      const updatedToothData = {
        ...toothData,
        [toothNumber]: {
          ...toothData[toothNumber],
          number: toothNumber,
          conditions: [...(toothData[toothNumber]?.conditions || []), selectedCondition],
          notes: toothData[toothNumber]?.notes || "",
          surfaces: toothData[toothNumber]?.surfaces || {
            mesial: [],
            distal: [],
            occlusal: [],
            vestibular: [],
            lingual: [],
          },
        },
      }

      setToothData(updatedToothData)
      onToothUpdate(updatedToothData[toothNumber])

      toast({
        title: "Diente actualizado",
        description: `Condición aplicada al diente ${toothNumber}`,
      })
    },
    [selectedCondition, toothData, onToothUpdate, toast],
  )

  const getToothColor = (toothNumber: number) => {
    const tooth = toothData[toothNumber]
    if (!tooth || !tooth.conditions.length) return "#ffffff"

    // Get the last applied condition
    const lastCondition = tooth.conditions[tooth.conditions.length - 1]
    const condition = TOOTH_CONDITIONS.find((c) => c.id === lastCondition)
    return condition?.color || "#ffffff"
  }

  const saveToothNotes = () => {
    if (selectedTooth) {
      const updatedToothData = {
        ...toothData,
        [selectedTooth]: {
          ...toothData[selectedTooth],
          number: selectedTooth,
          notes: toothNotes,
          conditions: toothData[selectedTooth]?.conditions || [],
          surfaces: toothData[selectedTooth]?.surfaces || {
            mesial: [],
            distal: [],
            occlusal: [],
            vestibular: [],
            lingual: [],
          },
        },
      }

      setToothData(updatedToothData)
      onToothUpdate(updatedToothData[selectedTooth])
      setIsToothDialogOpen(false)

      toast({
        title: "Notas guardadas",
        description: `Notas actualizadas para el diente ${selectedTooth}`,
      })
    }
  }

  const clearTooth = (toothNumber: number) => {
    const updatedToothData = { ...toothData }
    delete updatedToothData[toothNumber]
    setToothData(updatedToothData)

    toast({
      title: "Diente limpiado",
      description: `Condiciones removidas del diente ${toothNumber}`,
    })
  }

  const saveOdontogram = () => {
    const odontogramData = {
      patientId,
      mode,
      teeth: toothData,
      timestamp: new Date().toISOString(),
    }

    onSave(odontogramData)

    toast({
      title: "Odontograma guardado",
      description: "Los cambios han sido guardados exitosamente",
    })
  }

  const teethLayout = getTeethLayout()

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Herramientas
          </CardTitle>
          <CardDescription>Selecciona una condición y haz clic en un diente para aplicarla</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Condición a aplicar</Label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una condición" />
                </SelectTrigger>
                <SelectContent>
                  {TOOTH_CONDITIONS.map((condition) => (
                    <SelectItem key={condition.id} value={condition.id}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border" style={{ backgroundColor: condition.color }} />
                        <span>{condition.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2">
              {TOOTH_CONDITIONS.map((condition) => (
                <Badge
                  key={condition.id}
                  variant={selectedCondition === condition.id ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCondition(condition.id)}
                >
                  <div className="w-3 h-3 rounded mr-1" style={{ backgroundColor: condition.color }} />
                  {condition.name}
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={saveOdontogram}>
                <Save className="h-4 w-4 mr-2" />
                Guardar Odontograma
              </Button>
              <Button variant="outline" onClick={() => setToothData({})}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Limpiar Todo
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Odontogram */}
      <Card>
        <CardHeader>
          <CardTitle>
            Odontograma -{" "}
            {mode === "adult" ? "Dentición Permanente" : mode === "child" ? "Dentición Temporal" : "Dentición Mixta"}
          </CardTitle>
          <CardDescription>Haz clic en un diente para aplicar la condición seleccionada o ver detalles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Upper jaw */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">Maxilar Superior</h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-8 gap-2 lg:grid-cols-16">
                  {teethLayout[0].map((toothNumber) => (
                    <div key={toothNumber} className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 lg:w-10 lg:h-10 border-2 border-gray-300 rounded cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center text-xs font-medium"
                        style={{ backgroundColor: getToothColor(toothNumber) }}
                        onClick={() => applyConditionToTooth(toothNumber)}
                        onDoubleClick={() => handleToothClick(toothNumber)}
                        title={`Diente ${toothNumber} - Doble clic para detalles`}
                      >
                        {toothNumber}
                      </div>
                      {toothData[toothNumber]?.conditions.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-xs"
                            onClick={() => clearTooth(toothNumber)}
                            title="Limpiar"
                          >
                            ×
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lower jaw */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">Maxilar Inferior</h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-8 gap-2 lg:grid-cols-16">
                  {teethLayout[1].map((toothNumber) => (
                    <div key={toothNumber} className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 lg:w-10 lg:h-10 border-2 border-gray-300 rounded cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-center text-xs font-medium"
                        style={{ backgroundColor: getToothColor(toothNumber) }}
                        onClick={() => applyConditionToTooth(toothNumber)}
                        onDoubleClick={() => handleToothClick(toothNumber)}
                        title={`Diente ${toothNumber} - Doble clic para detalles`}
                      >
                        {toothNumber}
                      </div>
                      {toothData[toothNumber]?.conditions.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-xs"
                            onClick={() => clearTooth(toothNumber)}
                            title="Limpiar"
                          >
                            ×
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>
              <strong>Instrucciones:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Selecciona una condición de la lista superior</li>
              <li>Haz clic en un diente para aplicar la condición</li>
              <li>Doble clic en un diente para ver/editar detalles y notas</li>
              <li>Usa el botón × para limpiar un diente específico</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tooth Details Dialog */}
      <Dialog open={isToothDialogOpen} onOpenChange={setIsToothDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles del Diente {selectedTooth}</DialogTitle>
            <DialogDescription>Agrega notas y observaciones específicas para este diente</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedTooth && toothData[selectedTooth]?.conditions.length > 0 && (
              <div>
                <Label>Condiciones aplicadas</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {toothData[selectedTooth].conditions.map((conditionId, index) => {
                    const condition = TOOTH_CONDITIONS.find((c) => c.id === conditionId)
                    return (
                      <Badge key={index} variant="outline">
                        {condition?.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="tooth-notes">Notas y observaciones</Label>
              <Textarea
                id="tooth-notes"
                value={toothNotes}
                onChange={(e) => setToothNotes(e.target.value)}
                placeholder="Escribe observaciones sobre este diente..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsToothDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveToothNotes}>Guardar Notas</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
