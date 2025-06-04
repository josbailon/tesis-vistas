"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Save, Download, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ToothCondition {
  id: number
  condition: "healthy" | "caries" | "filled" | "crown" | "missing" | "root_canal" | "implant" | "erupting" | "extracted"
  surfaces?: string[]
  notes?: string
  date?: string
  treatment?: string
  severity?: "mild" | "moderate" | "severe"
}

interface OdontogramData {
  patientId: string
  patientName: string
  dentitionType: "adult" | "pediatric" | "mixed"
  teeth: Record<number, ToothCondition>
  lastUpdate: string
  createdBy: string
  notes?: string
}

interface InteractiveOdontogramProps {
  patientId: string
  patientName: string
  dentitionType: "adult" | "pediatric" | "mixed"
  initialData?: OdontogramData
  onSave?: (data: OdontogramData) => void
  readOnly?: boolean
}

// Dental numbering systems
const ADULT_TEETH = {
  maxillarRight: [18, 17, 16, 15, 14, 13, 12, 11],
  maxillarLeft: [21, 22, 23, 24, 25, 26, 27, 28],
  mandibularLeft: [31, 32, 33, 34, 35, 36, 37, 38],
  mandibularRight: [48, 47, 46, 45, 44, 43, 42, 41],
}

const PEDIATRIC_TEETH = {
  maxillarRight: [55, 54, 53, 52, 51],
  maxillarLeft: [61, 62, 63, 64, 65],
  mandibularLeft: [71, 72, 73, 74, 75],
  mandibularRight: [85, 84, 83, 82, 81],
}

const MIXED_TEETH = {
  maxillarRight: [18, 17, 16, 55, 54, 53, 12, 11],
  maxillarLeft: [21, 22, 63, 64, 65, 26, 27, 28],
  mandibularLeft: [31, 32, 73, 74, 75, 36, 37, 38],
  mandibularRight: [48, 47, 46, 85, 84, 83, 42, 41],
}

const TOOTH_CONDITIONS = [
  { value: "healthy", label: "Sano", symbol: "S", color: "bg-green-100 border-green-400 text-green-800" },
  { value: "caries", label: "Caries", symbol: "C", color: "bg-red-100 border-red-400 text-red-800" },
  { value: "filled", label: "Obturado", symbol: "O", color: "bg-blue-100 border-blue-400 text-blue-800" },
  { value: "crown", label: "Corona", symbol: "Co", color: "bg-yellow-100 border-yellow-400 text-yellow-800" },
  { value: "missing", label: "Ausente", symbol: "X", color: "bg-gray-100 border-gray-400 text-gray-600" },
  { value: "root_canal", label: "Endodoncia", symbol: "E", color: "bg-purple-100 border-purple-400 text-purple-800" },
  { value: "implant", label: "Implante", symbol: "I", color: "bg-indigo-100 border-indigo-400 text-indigo-800" },
  { value: "erupting", label: "Erupcionando", symbol: "Er", color: "bg-orange-100 border-orange-400 text-orange-800" },
  { value: "extracted", label: "Extraído", symbol: "Ex", color: "bg-pink-100 border-pink-400 text-pink-800" },
]

const TOOTH_SURFACES = ["O", "M", "D", "V", "L", "I"]

export function InteractiveOdontogram({
  patientId,
  patientName,
  dentitionType,
  initialData,
  onSave,
  readOnly = false,
}: InteractiveOdontogramProps) {
  const [teeth, setTeeth] = useState<Record<number, ToothCondition>>({})
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [notes, setNotes] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  // Get teeth layout based on dentition type
  const getTeethLayout = () => {
    switch (dentitionType) {
      case "adult":
        return ADULT_TEETH
      case "pediatric":
        return PEDIATRIC_TEETH
      case "mixed":
        return MIXED_TEETH
      default:
        return ADULT_TEETH
    }
  }

  const teethLayout = getTeethLayout()

  useEffect(() => {
    if (initialData) {
      setTeeth(initialData.teeth || {})
      setNotes(initialData.notes || "")
    }
  }, [initialData])

  const getToothCondition = (toothNumber: number): ToothCondition => {
    return teeth[toothNumber] || { id: toothNumber, condition: "healthy" }
  }

  const getConditionStyle = (condition: string) => {
    const conditionData = TOOTH_CONDITIONS.find((c) => c.value === condition)
    return conditionData?.color || "bg-white border-gray-300"
  }

  const getConditionSymbol = (condition: string) => {
    const conditionData = TOOTH_CONDITIONS.find((c) => c.value === condition)
    return conditionData?.symbol || "S"
  }

  const handleToothClick = (toothNumber: number) => {
    if (readOnly) return
    setSelectedTooth(toothNumber)
    setIsEditDialogOpen(true)
  }

  const updateToothCondition = (toothNumber: number, condition: ToothCondition) => {
    setTeeth((prev) => ({
      ...prev,
      [toothNumber]: { ...condition, id: toothNumber, date: new Date().toISOString() },
    }))
    setHasChanges(true)
  }

  const saveOdontogram = async () => {
    try {
      const odontogramData: OdontogramData = {
        patientId,
        patientName,
        dentitionType,
        teeth,
        lastUpdate: new Date().toISOString(),
        createdBy: "current-user", // This should come from auth context
        notes,
      }

      if (onSave) {
        await onSave(odontogramData)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Odontograma guardado",
        description: "Los cambios se han guardado exitosamente.",
      })
      setHasChanges(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el odontograma.",
        variant: "destructive",
      })
    }
  }

  const exportOdontogram = () => {
    // Simulate PDF export
    toast({
      title: "Exportando...",
      description: "El odontograma se está exportando como PDF.",
    })
  }

  const resetOdontogram = () => {
    setTeeth({})
    setNotes("")
    setHasChanges(true)
    toast({
      title: "Odontograma reiniciado",
      description: "Todos los datos han sido eliminados.",
    })
  }

  const ToothComponent = ({ number }: { number: number }) => {
    const condition = getToothCondition(number)
    const isSelected = selectedTooth === number

    return (
      <div
        className={`
          relative w-10 h-10 border-2 rounded-lg cursor-pointer flex items-center justify-center text-xs font-bold
          transition-all duration-200 hover:scale-110 hover:shadow-lg
          ${getConditionStyle(condition.condition)}
          ${isSelected ? "ring-2 ring-blue-500 scale-110" : ""}
          ${readOnly ? "cursor-default" : "cursor-pointer"}
        `}
        onClick={() => handleToothClick(number)}
        title={`Diente ${number} - ${TOOTH_CONDITIONS.find((c) => c.value === condition.condition)?.label}`}
      >
        <span className="text-xs font-bold">{getConditionSymbol(condition.condition)}</span>
        {condition.surfaces && condition.surfaces.length > 0 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">{condition.surfaces.length}</span>
          </div>
        )}
        <div className="absolute -bottom-2 text-xs text-gray-500">{number}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Odontograma - {patientName}</h2>
          <p className="text-gray-600">
            Tipo: {dentitionType === "adult" ? "Adulto" : dentitionType === "pediatric" ? "Pediátrico" : "Mixto"}
          </p>
        </div>
        {!readOnly && (
          <div className="flex gap-2">
            <Button onClick={saveOdontogram} disabled={!hasChanges} className="gap-2">
              <Save className="h-4 w-4" />
              Guardar
            </Button>
            <Button onClick={exportOdontogram} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button onClick={resetOdontogram} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reiniciar
            </Button>
          </div>
        )}
      </div>

      {/* Odontogram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Odontograma Interactivo</span>
            <Badge variant="outline">
              {Object.keys(teethLayout.maxillarRight).length +
                Object.keys(teethLayout.maxillarLeft).length +
                Object.keys(teethLayout.mandibularLeft).length +
                Object.keys(teethLayout.mandibularRight).length}{" "}
              dientes
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Maxilar Superior */}
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600 mb-4">MAXILAR SUPERIOR</h3>
              <div className="flex justify-center items-center gap-2">
                <span className="text-xs text-gray-500 w-12">Derecho</span>
                <div className="flex gap-2">
                  {teethLayout.maxillarRight.map((number) => (
                    <ToothComponent key={number} number={number} />
                  ))}
                </div>
                <div className="w-8 border-l-2 border-dashed border-gray-300 h-8"></div>
                <div className="flex gap-2">
                  {teethLayout.maxillarLeft.map((number) => (
                    <ToothComponent key={number} number={number} />
                  ))}
                </div>
                <span className="text-xs text-gray-500 w-12">Izquierdo</span>
              </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t-2 border-dashed border-gray-300 mx-8"></div>

            {/* Maxilar Inferior */}
            <div className="text-center">
              <div className="flex justify-center items-center gap-2">
                <span className="text-xs text-gray-500 w-12">Derecho</span>
                <div className="flex gap-2">
                  {teethLayout.mandibularRight.reverse().map((number) => (
                    <ToothComponent key={number} number={number} />
                  ))}
                </div>
                <div className="w-8 border-l-2 border-dashed border-gray-300 h-8"></div>
                <div className="flex gap-2">
                  {teethLayout.mandibularLeft.map((number) => (
                    <ToothComponent key={number} number={number} />
                  ))}
                </div>
                <span className="text-xs text-gray-500 w-12">Izquierdo</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mt-4">MAXILAR INFERIOR</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Leyenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {TOOTH_CONDITIONS.map((condition) => (
              <div key={condition.value} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 border-2 rounded-lg flex items-center justify-center text-xs font-bold ${condition.color}`}
                >
                  {condition.symbol}
                </div>
                <span className="text-sm">{condition.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {!readOnly && (
        <Card>
          <CardHeader>
            <CardTitle>Notas Generales</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value)
                setHasChanges(true)
              }}
              placeholder="Agregar notas sobre el estado general de la dentición..."
              rows={4}
            />
          </CardContent>
        </Card>
      )}

      {/* Edit Tooth Dialog */}
      {selectedTooth && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Diente {selectedTooth}</DialogTitle>
              <DialogDescription>Actualiza el estado y las características del diente seleccionado</DialogDescription>
            </DialogHeader>

            <ToothEditForm
              tooth={getToothCondition(selectedTooth)}
              onSave={(updatedTooth) => {
                updateToothCondition(selectedTooth, updatedTooth)
                setIsEditDialogOpen(false)
              }}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Tooth Edit Form Component
function ToothEditForm({
  tooth,
  onSave,
  onCancel,
}: {
  tooth: ToothCondition
  onSave: (tooth: ToothCondition) => void
  onCancel: () => void
}) {
  const [condition, setCondition] = useState(tooth.condition)
  const [surfaces, setSurfaces] = useState<string[]>(tooth.surfaces || [])
  const [notes, setNotes] = useState(tooth.notes || "")
  const [treatment, setTreatment] = useState(tooth.treatment || "")
  const [severity, setSeverity] = useState(tooth.severity || "mild")

  const toggleSurface = (surface: string) => {
    setSurfaces((prev) => (prev.includes(surface) ? prev.filter((s) => s !== surface) : [...prev, surface]))
  }

  const handleSave = () => {
    onSave({
      ...tooth,
      condition,
      surfaces,
      notes,
      treatment,
      severity,
      date: new Date().toISOString(),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="condition">Estado del Diente</Label>
          <Select value={condition} onValueChange={(value: any) => setCondition(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              {TOOTH_CONDITIONS.map((cond) => (
                <SelectItem key={cond.value} value={cond.value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 border rounded flex items-center justify-center text-xs ${cond.color}`}>
                      {cond.symbol}
                    </div>
                    {cond.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(condition === "caries" || condition === "filled") && (
          <>
            <div>
              <Label>Superficies Afectadas</Label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {TOOTH_SURFACES.map((surface) => (
                  <Button
                    key={surface}
                    variant={surfaces.includes(surface) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSurface(surface)}
                    className="h-8"
                  >
                    {surface}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                O: Oclusal, M: Mesial, D: Distal, V: Vestibular, L: Lingual, I: Incisal
              </p>
            </div>

            <div>
              <Label htmlFor="severity">Severidad</Label>
              <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Leve</SelectItem>
                  <SelectItem value="moderate">Moderada</SelectItem>
                  <SelectItem value="severe">Severa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div>
          <Label htmlFor="treatment">Tratamiento Requerido</Label>
          <Input
            id="treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            placeholder="Ej: Obturación con resina, Corona de porcelana..."
          />
        </div>

        <div>
          <Label htmlFor="notes">Notas</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observaciones adicionales sobre este diente..."
            rows={3}
          />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>Guardar Cambios</Button>
      </DialogFooter>
    </div>
  )
}
