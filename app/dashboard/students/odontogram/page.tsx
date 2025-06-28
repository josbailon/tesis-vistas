"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Save, RotateCcw, User } from "lucide-react"

interface ToothCondition {
  id: string
  name: string
  color: string
  description: string
}

interface ToothData {
  number: number
  condition: string
  notes: string
  date: string
  surfaces: {
    mesial: string
    distal: string
    occlusal: string
    vestibular: string
    lingual: string
  }
}

interface Patient {
  id: string
  name: string
  age: number
  cedula: string
}

export default function StudentOdontogramPage() {
  const { toast } = useToast()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [selectedCondition, setSelectedCondition] = useState("")
  const [isToothDialogOpen, setIsToothDialogOpen] = useState(false)
  const [toothNotes, setToothNotes] = useState("")
  const [odontogramMode, setOdontogramMode] = useState<"adult" | "child" | "mixed">("adult")

  // Mock patients data
  const patients: Patient[] = [
    { id: "1", name: "María González Pérez", age: 28, cedula: "1234567890" },
    { id: "2", name: "Carlos Ruiz Mendoza", age: 35, cedula: "2345678901" },
    { id: "3", name: "Laura Martínez Silva", age: 22, cedula: "3456789012" },
    { id: "4", name: "Roberto Díaz Castro", age: 45, cedula: "4567890123" },
    { id: "5", name: "Ana Rodríguez López", age: 8, cedula: "5678901234" },
    { id: "6", name: "Pedro Morales Vera", age: 12, cedula: "6789012345" },
  ]

  // Tooth conditions
  const conditions: ToothCondition[] = [
    { id: "healthy", name: "Sano", color: "#ffffff", description: "Diente sano sin patologías" },
    { id: "caries", name: "Caries", color: "#ff4444", description: "Presencia de caries dental" },
    { id: "restoration", name: "Restauración", color: "#4444ff", description: "Diente restaurado" },
    { id: "crown", name: "Corona", color: "#ffaa00", description: "Corona protésica" },
    { id: "extraction", name: "Extracción", color: "#ff0000", description: "Diente extraído" },
    { id: "missing", name: "Ausente", color: "#888888", description: "Diente ausente congénitamente" },
    { id: "endodontics", name: "Endodoncia", color: "#ff6600", description: "Tratamiento endodóntico" },
    { id: "implant", name: "Implante", color: "#00aa00", description: "Implante dental" },
    { id: "fracture", name: "Fractura", color: "#aa0000", description: "Fractura dental" },
    { id: "mobility", name: "Movilidad", color: "#ffff00", description: "Movilidad dental" },
  ]

  // Initialize tooth data
  const [teethData, setTeethData] = useState<{ [key: number]: ToothData }>(() => {
    const initialData: { [key: number]: ToothData } = {}

    // Adult teeth (1-32)
    for (let i = 1; i <= 32; i++) {
      initialData[i] = {
        number: i,
        condition: "healthy",
        notes: "",
        date: new Date().toISOString(),
        surfaces: {
          mesial: "healthy",
          distal: "healthy",
          occlusal: "healthy",
          vestibular: "healthy",
          lingual: "healthy",
        },
      }
    }

    // Deciduous teeth (51-85)
    for (let i = 51; i <= 85; i++) {
      initialData[i] = {
        number: i,
        condition: "healthy",
        notes: "",
        date: new Date().toISOString(),
        surfaces: {
          mesial: "healthy",
          distal: "healthy",
          occlusal: "healthy",
          vestibular: "healthy",
          lingual: "healthy",
        },
      }
    }

    return initialData
  })

  const getToothColor = (toothNumber: number) => {
    const tooth = teethData[toothNumber]
    if (!tooth) return "#ffffff"
    const condition = conditions.find((c) => c.id === tooth.condition)
    return condition?.color || "#ffffff"
  }

  const handleToothClick = (toothNumber: number) => {
    if (selectedCondition && selectedCondition !== "healthy") {
      // Apply condition directly
      setTeethData((prev) => ({
        ...prev,
        [toothNumber]: {
          ...prev[toothNumber],
          condition: selectedCondition,
          date: new Date().toISOString(),
        },
      }))

      toast({
        title: "Condición aplicada",
        description: `Diente ${toothNumber}: ${conditions.find((c) => c.id === selectedCondition)?.name}`,
      })
    } else {
      // Open detail dialog
      setSelectedTooth(toothNumber)
      setToothNotes(teethData[toothNumber]?.notes || "")
      setIsToothDialogOpen(true)
    }
  }

  const handleSaveToothDetails = () => {
    if (selectedTooth) {
      setTeethData((prev) => ({
        ...prev,
        [selectedTooth]: {
          ...prev[selectedTooth],
          notes: toothNotes,
          date: new Date().toISOString(),
        },
      }))

      toast({
        title: "Detalles guardados",
        description: `Información del diente ${selectedTooth} actualizada`,
      })
    }
    setIsToothDialogOpen(false)
    setSelectedTooth(null)
    setToothNotes("")
  }

  const handleResetOdontogram = () => {
    const resetData: { [key: number]: ToothData } = {}

    // Reset all teeth
    for (let i = 1; i <= 32; i++) {
      resetData[i] = {
        number: i,
        condition: "healthy",
        notes: "",
        date: new Date().toISOString(),
        surfaces: {
          mesial: "healthy",
          distal: "healthy",
          occlusal: "healthy",
          vestibular: "healthy",
          lingual: "healthy",
        },
      }
    }

    for (let i = 51; i <= 85; i++) {
      resetData[i] = {
        number: i,
        condition: "healthy",
        notes: "",
        date: new Date().toISOString(),
        surfaces: {
          mesial: "healthy",
          distal: "healthy",
          occlusal: "healthy",
          vestibular: "healthy",
          lingual: "healthy",
        },
      }
    }

    setTeethData(resetData)
    toast({
      title: "Odontograma reiniciado",
      description: "Todos los dientes han sido marcados como sanos",
    })
  }

  const handleSaveOdontogram = () => {
    if (!selectedPatient) {
      toast({
        title: "Error",
        description: "Por favor selecciona un paciente",
        variant: "destructive",
      })
      return
    }

    // Here you would save to your backend
    toast({
      title: "Odontograma guardado",
      description: `Odontograma de ${selectedPatient.name} guardado exitosamente`,
    })
  }

  const renderTooth = (toothNumber: number, position: { top: string; left: string }) => {
    const isDeciduousTooth = toothNumber >= 51
    const shouldShow =
      (odontogramMode === "adult" && !isDeciduousTooth) ||
      (odontogramMode === "child" && isDeciduousTooth) ||
      odontogramMode === "mixed"

    if (!shouldShow) return null

    return (
      <div
        key={toothNumber}
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
        style={{ top: position.top, left: position.left }}
        onClick={() => handleToothClick(toothNumber)}
        title={`Diente ${toothNumber}`}
      >
        <div
          className="w-8 h-8 border-2 border-gray-400 rounded-sm flex items-center justify-center text-xs font-bold shadow-sm hover:shadow-md"
          style={{ backgroundColor: getToothColor(toothNumber) }}
        >
          {toothNumber}
        </div>
      </div>
    )
  }

  // Tooth positions for adult dentition
  const adultToothPositions = {
    // Upper right quadrant (18-11)
    18: { top: "20%", left: "15%" },
    17: { top: "20%", left: "20%" },
    16: { top: "20%", left: "25%" },
    15: { top: "20%", left: "30%" },
    14: { top: "20%", left: "35%" },
    13: { top: "20%", left: "40%" },
    12: { top: "20%", left: "45%" },
    11: { top: "20%", left: "50%" },

    // Upper left quadrant (21-28)
    21: { top: "20%", left: "55%" },
    22: { top: "20%", left: "60%" },
    23: { top: "20%", left: "65%" },
    24: { top: "20%", left: "70%" },
    25: { top: "20%", left: "75%" },
    26: { top: "20%", left: "80%" },
    27: { top: "20%", left: "85%" },
    28: { top: "20%", left: "90%" },

    // Lower left quadrant (31-38)
    31: { top: "80%", left: "50%" },
    32: { top: "80%", left: "45%" },
    33: { top: "80%", left: "40%" },
    34: { top: "80%", left: "35%" },
    35: { top: "80%", left: "30%" },
    36: { top: "80%", left: "25%" },
    37: { top: "80%", left: "20%" },
    38: { top: "80%", left: "15%" },

    // Lower right quadrant (41-48)
    41: { top: "80%", left: "55%" },
    42: { top: "80%", left: "60%" },
    43: { top: "80%", left: "65%" },
    44: { top: "80%", left: "70%" },
    45: { top: "80%", left: "75%" },
    46: { top: "80%", left: "80%" },
    47: { top: "80%", left: "85%" },
    48: { top: "80%", left: "90%" },
  }

  // Tooth positions for deciduous dentition
  const deciduousToothPositions = {
    // Upper right quadrant (55-51)
    55: { top: "35%", left: "25%" },
    54: { top: "35%", left: "30%" },
    53: { top: "35%", left: "40%" },
    52: { top: "35%", left: "45%" },
    51: { top: "35%", left: "50%" },

    // Upper left quadrant (61-65)
    61: { top: "35%", left: "55%" },
    62: { top: "35%", left: "60%" },
    63: { top: "35%", left: "65%" },
    64: { top: "35%", left: "70%" },
    65: { top: "35%", left: "75%" },

    // Lower left quadrant (71-75)
    71: { top: "65%", left: "50%" },
    72: { top: "65%", left: "45%" },
    73: { top: "65%", left: "40%" },
    74: { top: "65%", left: "30%" },
    75: { top: "65%", left: "25%" },

    // Lower right quadrant (81-85)
    81: { top: "65%", left: "55%" },
    82: { top: "65%", left: "60%" },
    83: { top: "65%", left: "65%" },
    84: { top: "65%", left: "70%" },
    85: { top: "65%", left: "75%" },
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Odontograma</h1>
          <p className="text-muted-foreground">Registro dental interactivo del paciente</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetOdontogram}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reiniciar
          </Button>
          <Button onClick={handleSaveOdontogram}>
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Patient Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Selección de Paciente
          </CardTitle>
          <CardDescription>Selecciona el paciente para el odontograma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label>Paciente</Label>
              <Select
                value={selectedPatient?.id || ""}
                onValueChange={(value) => {
                  const patient = patients.find((p) => p.id === value)
                  setSelectedPatient(patient || null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-gray-500">
                          {patient.age} años • CI: {patient.cedula}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Modo de Dentición</Label>
              <Select
                value={odontogramMode}
                onValueChange={(value: "adult" | "child" | "mixed") => setOdontogramMode(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult">Adulto</SelectItem>
                  <SelectItem value="child">Niño</SelectItem>
                  <SelectItem value="mixed">Mixta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {selectedPatient && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <div className="flex items-center gap-4">
                <div>
                  <span className="font-medium">Paciente:</span> {selectedPatient.name}
                </div>
                <div>
                  <span className="font-medium">Edad:</span> {selectedPatient.age} años
                </div>
                <div>
                  <span className="font-medium">Cédula:</span> {selectedPatient.cedula}
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
          <CardDescription>Selecciona una condición y haz clic en un diente para aplicarla</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {conditions.map((condition) => (
              <Button
                key={condition.id}
                variant={selectedCondition === condition.id ? "default" : "outline"}
                className="justify-start h-auto p-3"
                onClick={() => setSelectedCondition(condition.id)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 border border-gray-300 rounded-sm"
                    style={{ backgroundColor: condition.color }}
                  />
                  <div className="text-left">
                    <div className="font-medium text-sm">{condition.name}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          {selectedCondition && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 border border-gray-300 rounded-sm"
                  style={{ backgroundColor: conditions.find((c) => c.id === selectedCondition)?.color }}
                />
                <span className="font-medium">{conditions.find((c) => c.id === selectedCondition)?.name}:</span>
                <span className="text-sm text-gray-600">
                  {conditions.find((c) => c.id === selectedCondition)?.description}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Odontogram */}
      <Card>
        <CardHeader>
          <CardTitle>Odontograma Interactivo</CardTitle>
          <CardDescription>Haz clic en un diente para aplicar la condición seleccionada o ver detalles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            {/* Adult teeth */}
            {Object.entries(adultToothPositions).map(([toothNumber, position]) =>
              renderTooth(Number.parseInt(toothNumber), position),
            )}

            {/* Deciduous teeth */}
            {Object.entries(deciduousToothPositions).map(([toothNumber, position]) =>
              renderTooth(Number.parseInt(toothNumber), position),
            )}

            {/* Quadrant labels */}
            <div className="absolute top-4 left-4 text-sm font-medium text-gray-500">Cuadrante 2</div>
            <div className="absolute top-4 right-4 text-sm font-medium text-gray-500">Cuadrante 1</div>
            <div className="absolute bottom-4 left-4 text-sm font-medium text-gray-500">Cuadrante 3</div>
            <div className="absolute bottom-4 right-4 text-sm font-medium text-gray-500">Cuadrante 4</div>

            {/* Center line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 transform -translate-x-1/2" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 transform -translate-y-1/2" />
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Instrucciones:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Selecciona una condición dental de la lista superior</li>
              <li>Haz clic en un diente para aplicar la condición</li>
              <li>Haz clic sin seleccionar condición para ver/editar detalles del diente</li>
              <li>Usa el modo de dentición apropiado según la edad del paciente</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {conditions.map((condition) => {
          const count = Object.values(teethData).filter((tooth) => tooth.condition === condition.id).length
          return (
            <Card key={condition.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 border border-gray-300 rounded-sm"
                    style={{ backgroundColor: condition.color }}
                  />
                  <div>
                    <div className="text-sm font-medium">{condition.name}</div>
                    <div className="text-2xl font-bold">{count}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tooth Detail Dialog */}
      <Dialog open={isToothDialogOpen} onOpenChange={setIsToothDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles del Diente {selectedTooth}</DialogTitle>
            <DialogDescription>Información detallada y notas del diente</DialogDescription>
          </DialogHeader>
          {selectedTooth && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Número del Diente</Label>
                  <p className="text-lg font-bold">{selectedTooth}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Condición Actual</Label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 border border-gray-300 rounded-sm"
                      style={{ backgroundColor: getToothColor(selectedTooth) }}
                    />
                    <span>{conditions.find((c) => c.id === teethData[selectedTooth]?.condition)?.name}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Cambiar Condición</Label>
                <Select
                  value={teethData[selectedTooth]?.condition || "healthy"}
                  onValueChange={(value) => {
                    if (selectedTooth) {
                      setTeethData((prev) => ({
                        ...prev,
                        [selectedTooth]: {
                          ...prev[selectedTooth],
                          condition: value,
                          date: new Date().toISOString(),
                        },
                      }))
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.id} value={condition.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 border border-gray-300 rounded-sm"
                            style={{ backgroundColor: condition.color }}
                          />
                          {condition.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tooth-notes">Notas y Observaciones</Label>
                <Textarea
                  id="tooth-notes"
                  placeholder="Escribe observaciones sobre este diente..."
                  value={toothNotes}
                  onChange={(e) => setToothNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Última Modificación</Label>
                <p className="text-sm text-gray-600">
                  {new Date(teethData[selectedTooth]?.date || "").toLocaleString("es-ES")}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsToothDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveToothDetails}>Guardar Detalles</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
