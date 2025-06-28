"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Save, RotateCcw, User, FileText, AlertCircle, CheckCircle, Info, Trash2 } from "lucide-react"

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
}

interface Patient {
  id: string
  name: string
  age: number
  lastVisit: string
}

interface OdontogramData {
  patientId: string
  teeth: { [key: number]: ToothData }
  generalNotes: string
  lastUpdated: string
}

export default function StudentOdontogramPage() {
  const { toast } = useToast()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [selectedCondition, setSelectedCondition] = useState<string>("")
  const [dentitionMode, setDentitionMode] = useState<"adult" | "child" | "mixed">("adult")
  const [isToothDialogOpen, setIsToothDialogOpen] = useState(false)
  const [toothNotes, setToothNotes] = useState("")
  const [generalNotes, setGeneralNotes] = useState("")

  const [odontogramData, setOdontogramData] = useState<OdontogramData>({
    patientId: "",
    teeth: {},
    generalNotes: "",
    lastUpdated: "",
  })

  const patients: Patient[] = [
    {
      id: "1",
      name: "María González Pérez",
      age: 28,
      lastVisit: "2024-12-20",
    },
    {
      id: "2",
      name: "Carlos Ruiz Mendoza",
      age: 35,
      lastVisit: "2024-12-18",
    },
    {
      id: "3",
      name: "Laura Martínez Silva",
      age: 22,
      lastVisit: "2024-12-15",
    },
    {
      id: "4",
      name: "Sofía Herrera Alava",
      age: 8,
      lastVisit: "2024-12-22",
    },
    {
      id: "5",
      name: "Roberto Díaz Castro",
      age: 45,
      lastVisit: "2024-12-10",
    },
  ]

  const toothConditions: ToothCondition[] = [
    { id: "healthy", name: "Sano", color: "#22c55e", description: "Diente en perfecto estado" },
    { id: "caries", name: "Caries", color: "#ef4444", description: "Presencia de caries dental" },
    { id: "filled", name: "Obturado", color: "#3b82f6", description: "Diente con restauración" },
    { id: "crown", name: "Corona", color: "#f59e0b", description: "Diente con corona protésica" },
    { id: "missing", name: "Ausente", color: "#6b7280", description: "Diente extraído o ausente" },
    { id: "impacted", name: "Impactado", color: "#8b5cf6", description: "Diente impactado" },
    { id: "root_canal", name: "Endodoncia", color: "#ec4899", description: "Tratamiento de conducto" },
    { id: "fracture", name: "Fractura", color: "#dc2626", description: "Diente fracturado" },
    { id: "mobility", name: "Movilidad", color: "#f97316", description: "Diente con movilidad" },
    { id: "implant", name: "Implante", color: "#06b6d4", description: "Implante dental" },
  ]

  // Adult teeth numbering (1-32)
  const adultTeeth = [
    // Upper jaw
    [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28],
    // Lower jaw
    [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38],
  ]

  // Child teeth numbering (51-85)
  const childTeeth = [
    // Upper jaw
    [55, 54, 53, 52, 51, 61, 62, 63, 64, 65],
    // Lower jaw
    [85, 84, 83, 82, 81, 71, 72, 73, 74, 75],
  ]

  const getCurrentTeeth = () => {
    switch (dentitionMode) {
      case "child":
        return childTeeth
      case "mixed":
        return [
          [55, 54, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 64, 65],
          [85, 84, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 74, 75],
        ]
      default:
        return adultTeeth
    }
  }

  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    setSelectedPatient(patient || null)

    // Load existing odontogram data for this patient (mock data)
    setOdontogramData({
      patientId,
      teeth: {},
      generalNotes: "",
      lastUpdated: "",
    })
    setGeneralNotes("")
  }

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber)
    const toothData = odontogramData.teeth[toothNumber]
    setToothNotes(toothData?.notes || "")
    setIsToothDialogOpen(true)
  }

  const applyConditionToTooth = (toothNumber: number, conditionId: string) => {
    if (!selectedCondition) return

    setOdontogramData((prev) => ({
      ...prev,
      teeth: {
        ...prev.teeth,
        [toothNumber]: {
          number: toothNumber,
          conditions: prev.teeth[toothNumber]?.conditions
            ? [...prev.teeth[toothNumber].conditions.filter((c) => c !== conditionId), conditionId]
            : [conditionId],
          notes: prev.teeth[toothNumber]?.notes || "",
        },
      },
    }))

    toast({
      title: "Condición aplicada",
      description: `${toothConditions.find((c) => c.id === conditionId)?.name} aplicada al diente ${toothNumber}`,
    })
  }

  const removeConditionFromTooth = (toothNumber: number, conditionId: string) => {
    setOdontogramData((prev) => ({
      ...prev,
      teeth: {
        ...prev.teeth,
        [toothNumber]: {
          ...prev.teeth[toothNumber],
          conditions: prev.teeth[toothNumber]?.conditions.filter((c) => c !== conditionId) || [],
        },
      },
    }))
  }

  const saveToothNotes = () => {
    if (selectedTooth === null) return

    setOdontogramData((prev) => ({
      ...prev,
      teeth: {
        ...prev.teeth,
        [selectedTooth]: {
          ...prev.teeth[selectedTooth],
          number: selectedTooth,
          conditions: prev.teeth[selectedTooth]?.conditions || [],
          notes: toothNotes,
        },
      },
    }))

    setIsToothDialogOpen(false)
    toast({
      title: "Notas guardadas",
      description: `Notas del diente ${selectedTooth} actualizadas`,
    })
  }

  const saveOdontogram = () => {
    if (!selectedPatient) {
      toast({
        title: "Error",
        description: "Selecciona un paciente primero",
        variant: "destructive",
      })
      return
    }

    const updatedData = {
      ...odontogramData,
      generalNotes,
      lastUpdated: new Date().toISOString(),
    }

    setOdontogramData(updatedData)

    toast({
      title: "Odontograma guardado",
      description: `Odontograma de ${selectedPatient.name} guardado exitosamente`,
    })
  }

  const resetOdontogram = () => {
    setOdontogramData({
      patientId: selectedPatient?.id || "",
      teeth: {},
      generalNotes: "",
      lastUpdated: "",
    })
    setGeneralNotes("")

    toast({
      title: "Odontograma reiniciado",
      description: "Todos los datos han sido eliminados",
    })
  }

  const getToothColor = (toothNumber: number) => {
    const toothData = odontogramData.teeth[toothNumber]
    if (!toothData || toothData.conditions.length === 0) {
      return "#e5e7eb" // Default gray
    }

    // Return the color of the last applied condition
    const lastCondition = toothData.conditions[toothData.conditions.length - 1]
    return toothConditions.find((c) => c.id === lastCondition)?.color || "#e5e7eb"
  }

  const getConditionStats = () => {
    const stats: { [key: string]: number } = {}

    Object.values(odontogramData.teeth).forEach((tooth) => {
      tooth.conditions.forEach((condition) => {
        stats[condition] = (stats[condition] || 0) + 1
      })
    })

    return stats
  }

  const conditionStats = getConditionStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Odontograma Digital</h1>
          <p className="text-muted-foreground">Registro dental interactivo para seguimiento de tratamientos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetOdontogram} disabled={!selectedPatient}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reiniciar
          </Button>
          <Button onClick={saveOdontogram} disabled={!selectedPatient}>
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Patient Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Selección de Paciente
          </CardTitle>
          <CardDescription>Selecciona el paciente para trabajar en su odontograma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Paciente</Label>
              <Select value={selectedPatient?.id || ""} onValueChange={handlePatientSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-gray-500">
                          {patient.age} años • Última visita: {new Date(patient.lastVisit).toLocaleDateString("es-ES")}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Dentición</Label>
              <Select value={dentitionMode} onValueChange={(value: any) => setDentitionMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult">Dentición Adulta (Permanente)</SelectItem>
                  <SelectItem value="child">Dentición Infantil (Temporal)</SelectItem>
                  <SelectItem value="mixed">Dentición Mixta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedPatient && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900">Paciente Seleccionado</h4>
              <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                <div>
                  <span className="text-blue-700">Nombre:</span>
                  <p className="font-medium">{selectedPatient.name}</p>
                </div>
                <div>
                  <span className="text-blue-700">Edad:</span>
                  <p className="font-medium">{selectedPatient.age} años</p>
                </div>
                <div>
                  <span className="text-blue-700">Última visita:</span>
                  <p className="font-medium">{new Date(selectedPatient.lastVisit).toLocaleDateString("es-ES")}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Condition Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Condiciones Dentales</CardTitle>
          <CardDescription>Selecciona una condición y haz clic en los dientes para aplicarla</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {toothConditions.map((condition) => (
              <Button
                key={condition.id}
                variant={selectedCondition === condition.id ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center gap-2"
                onClick={() => setSelectedCondition(condition.id)}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: condition.color }}
                />
                <span className="text-xs font-medium">{condition.name}</span>
              </Button>
            ))}
          </div>
          {selectedCondition && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm">
                <strong>Condición seleccionada:</strong> {toothConditions.find((c) => c.id === selectedCondition)?.name}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {toothConditions.find((c) => c.id === selectedCondition)?.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Odontogram */}
      {selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle>Odontograma - {selectedPatient.name}</CardTitle>
            <CardDescription>Haz clic en los dientes para aplicar condiciones o ver detalles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Upper Jaw */}
              <div className="text-center">
                <h4 className="text-sm font-medium mb-4 text-gray-600">MAXILAR SUPERIOR</h4>
                <div className="flex justify-center gap-1">
                  {getCurrentTeeth()[0].map((toothNumber) => (
                    <div key={toothNumber} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{toothNumber}</div>
                      <button
                        className="w-8 h-8 rounded border-2 border-gray-300 hover:border-blue-500 transition-colors relative"
                        style={{ backgroundColor: getToothColor(toothNumber) }}
                        onClick={() =>
                          selectedCondition
                            ? applyConditionToTooth(toothNumber, selectedCondition)
                            : handleToothClick(toothNumber)
                        }
                        title={`Diente ${toothNumber}`}
                      >
                        {odontogramData.teeth[toothNumber]?.notes && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lower Jaw */}
              <div className="text-center">
                <div className="flex justify-center gap-1">
                  {getCurrentTeeth()[1].map((toothNumber) => (
                    <div key={toothNumber} className="text-center">
                      <button
                        className="w-8 h-8 rounded border-2 border-gray-300 hover:border-blue-500 transition-colors relative"
                        style={{ backgroundColor: getToothColor(toothNumber) }}
                        onClick={() =>
                          selectedCondition
                            ? applyConditionToTooth(toothNumber, selectedCondition)
                            : handleToothClick(toothNumber)
                        }
                        title={`Diente ${toothNumber}`}
                      >
                        {odontogramData.teeth[toothNumber]?.notes && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </button>
                      <div className="text-xs text-gray-500 mt-1">{toothNumber}</div>
                    </div>
                  ))}
                </div>
                <h4 className="text-sm font-medium mt-4 text-gray-600">MAXILAR INFERIOR</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      {selectedPatient && Object.keys(conditionStats).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas del Odontograma</CardTitle>
            <CardDescription>Resumen de las condiciones dentales registradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(conditionStats).map(([conditionId, count]) => {
                const condition = toothConditions.find((c) => c.id === conditionId)
                return (
                  <div key={conditionId} className="text-center p-3 border rounded-lg">
                    <div
                      className="w-6 h-6 rounded-full mx-auto mb-2 border-2 border-white"
                      style={{ backgroundColor: condition?.color }}
                    />
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-xs text-gray-600">{condition?.name}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* General Notes */}
      {selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notas Generales
            </CardTitle>
            <CardDescription>Observaciones generales sobre el estado dental del paciente</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              placeholder="Escribe observaciones generales sobre el estado dental del paciente..."
              rows={4}
            />
          </CardContent>
        </Card>
      )}

      {/* Tooth Detail Dialog */}
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {odontogramData.teeth[selectedTooth]?.conditions.map((conditionId) => {
                    const condition = toothConditions.find((c) => c.id === conditionId)
                    return (
                      <Badge key={conditionId} variant="secondary" className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: condition?.color }} />
                        {condition?.name}
                        <button
                          onClick={() => removeConditionFromTooth(selectedTooth, conditionId)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  }) || []}
                  {(!odontogramData.teeth[selectedTooth]?.conditions ||
                    odontogramData.teeth[selectedTooth]?.conditions.length === 0) && (
                    <span className="text-sm text-gray-500">Sin condiciones registradas</span>
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
                />
              </div>

              {/* Quick Actions */}
              <div>
                <Label className="text-sm font-medium">Acciones Rápidas</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => applyConditionToTooth(selectedTooth, "healthy")}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Marcar Sano
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applyConditionToTooth(selectedTooth, "caries")}>
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Marcar Caries
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => applyConditionToTooth(selectedTooth, "filled")}>
                    <Info className="h-4 w-4 mr-1" />
                    Marcar Obturado
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsToothDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveToothNotes}>
              <Save className="h-4 w-4 mr-2" />
              Guardar Notas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
