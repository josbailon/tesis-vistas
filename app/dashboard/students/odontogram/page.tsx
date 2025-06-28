"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SmileIcon as Tooth, Save, Plus, Calendar, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ToothCondition {
  id: string
  name: string
  color: string
  symbol: string
}

interface ToothData {
  number: string
  condition: string
  notes: string
  date: string
  treatment: string
}

interface PatientOdontogram {
  id: string
  patientName: string
  patientAge: number
  dentitionType: "adult" | "child" | "mixed"
  teeth: Record<string, ToothData>
  createdAt: string
  updatedAt: string
}

const TOOTH_CONDITIONS: ToothCondition[] = [
  { id: "healthy", name: "Sano", color: "#22c55e", symbol: "" },
  { id: "caries", name: "Caries", color: "#ef4444", symbol: "C" },
  { id: "filled", name: "Obturado", color: "#3b82f6", symbol: "O" },
  { id: "crown", name: "Corona", color: "#f59e0b", symbol: "Cr" },
  { id: "missing", name: "Ausente", color: "#6b7280", symbol: "X" },
  { id: "root", name: "Raíz", color: "#8b5cf6", symbol: "R" },
  { id: "implant", name: "Implante", color: "#06b6d4", symbol: "I" },
  { id: "extraction", name: "Extracción", color: "#dc2626", symbol: "Ex" },
]

// Adult teeth numbering (FDI system)
const ADULT_TEETH = [
  // Upper jaw
  ["18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28"],
  // Lower jaw
  ["48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"],
]

// Child teeth numbering
const CHILD_TEETH = [
  // Upper jaw
  ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"],
  // Lower jaw
  ["85", "84", "83", "82", "81", "71", "72", "73", "74", "75"],
]

const MOCK_ODONTOGRAMS: PatientOdontogram[] = [
  {
    id: "1",
    patientName: "Ana Rodríguez",
    patientAge: 35,
    dentitionType: "adult",
    teeth: {
      "16": {
        number: "16",
        condition: "caries",
        notes: "Caries oclusal profunda",
        date: "2024-12-20",
        treatment: "Endodoncia programada",
      },
      "21": {
        number: "21",
        condition: "filled",
        notes: "Obturación de resina",
        date: "2024-12-15",
        treatment: "Completado",
      },
      "36": {
        number: "36",
        condition: "crown",
        notes: "Corona de porcelana",
        date: "2024-12-10",
        treatment: "Completado",
      },
    },
    createdAt: "2024-12-20T10:00:00Z",
    updatedAt: "2024-12-20T10:00:00Z",
  },
]

export default function StudentOdontogramPage() {
  const { toast } = useToast()
  const [odontograms, setOdontograms] = useState<PatientOdontogram[]>(MOCK_ODONTOGRAMS)
  const [selectedOdontogram, setSelectedOdontogram] = useState<PatientOdontogram | null>(odontograms[0] || null)
  const [selectedTooth, setSelectedTooth] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] = useState(false)

  const [toothFormData, setToothFormData] = useState({
    condition: "healthy",
    notes: "",
    treatment: "",
  })

  const [newPatientData, setNewPatientData] = useState({
    patientName: "",
    patientAge: "",
    dentitionType: "adult" as "adult" | "child" | "mixed",
  })

  const getTeethForDentition = (type: "adult" | "child" | "mixed") => {
    if (type === "adult") return ADULT_TEETH
    if (type === "child") return CHILD_TEETH
    // Mixed dentition - combination of both
    return [
      ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"],
      ["18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28"],
      ["48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"],
      ["85", "84", "83", "82", "81", "71", "72", "73", "74", "75"],
    ]
  }

  const getToothCondition = (toothNumber: string) => {
    if (!selectedOdontogram) return TOOTH_CONDITIONS[0]
    const toothData = selectedOdontogram.teeth[toothNumber]
    if (!toothData) return TOOTH_CONDITIONS[0]
    return TOOTH_CONDITIONS.find((c) => c.id === toothData.condition) || TOOTH_CONDITIONS[0]
  }

  const handleToothClick = (toothNumber: string) => {
    setSelectedTooth(toothNumber)
    const toothData = selectedOdontogram?.teeth[toothNumber]
    if (toothData) {
      setToothFormData({
        condition: toothData.condition,
        notes: toothData.notes,
        treatment: toothData.treatment,
      })
    } else {
      setToothFormData({
        condition: "healthy",
        notes: "",
        treatment: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSaveTooth = () => {
    if (!selectedOdontogram || !selectedTooth) return

    const updatedOdontogram = {
      ...selectedOdontogram,
      teeth: {
        ...selectedOdontogram.teeth,
        [selectedTooth]: {
          number: selectedTooth,
          condition: toothFormData.condition,
          notes: toothFormData.notes,
          treatment: toothFormData.treatment,
          date: new Date().toISOString().split("T")[0],
        },
      },
      updatedAt: new Date().toISOString(),
    }

    setOdontograms((prev) => prev.map((o) => (o.id === selectedOdontogram.id ? updatedOdontogram : o)))
    setSelectedOdontogram(updatedOdontogram)
    setIsDialogOpen(false)

    toast({
      title: "Diente actualizado",
      description: `Información del diente ${selectedTooth} guardada correctamente`,
    })
  }

  const handleCreateNewPatient = () => {
    if (!newPatientData.patientName || !newPatientData.patientAge) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos",
        variant: "destructive",
      })
      return
    }

    const newOdontogram: PatientOdontogram = {
      id: Date.now().toString(),
      patientName: newPatientData.patientName,
      patientAge: Number.parseInt(newPatientData.patientAge),
      dentitionType: newPatientData.dentitionType,
      teeth: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setOdontograms((prev) => [...prev, newOdontogram])
    setSelectedOdontogram(newOdontogram)
    setIsNewPatientDialogOpen(false)
    setNewPatientData({ patientName: "", patientAge: "", dentitionType: "adult" })

    toast({
      title: "Odontograma creado",
      description: "Nuevo odontograma creado para el paciente",
    })
  }

  const renderTooth = (toothNumber: string) => {
    const condition = getToothCondition(toothNumber)
    return (
      <div key={toothNumber} className="relative cursor-pointer group" onClick={() => handleToothClick(toothNumber)}>
        <div
          className="w-8 h-10 border-2 border-gray-300 rounded-sm flex items-center justify-center text-xs font-bold transition-all hover:scale-110 hover:shadow-lg"
          style={{ backgroundColor: condition.color, color: condition.id === "healthy" ? "#000" : "#fff" }}
        >
          {condition.symbol || toothNumber.slice(-1)}
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
          {toothNumber}
        </div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          {condition.name}
        </div>
      </div>
    )
  }

  const renderOdontogram = () => {
    if (!selectedOdontogram) return null

    const teeth = getTeethForDentition(selectedOdontogram.dentitionType)

    return (
      <div className="space-y-8">
        {teeth.map((row, index) => (
          <div key={index} className="flex justify-center gap-2 py-4">
            {row.map((toothNumber) => renderTooth(toothNumber))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Odontograma Digital</h1>
          <p className="text-gray-600">Registro dental interactivo para pacientes</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewPatientDialogOpen} onOpenChange={setIsNewPatientDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Paciente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo Odontograma</DialogTitle>
                <DialogDescription>Crear un nuevo odontograma para un paciente</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Nombre del Paciente</Label>
                  <Input
                    id="patientName"
                    value={newPatientData.patientName}
                    onChange={(e) => setNewPatientData((prev) => ({ ...prev, patientName: e.target.value }))}
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientAge">Edad</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    value={newPatientData.patientAge}
                    onChange={(e) => setNewPatientData((prev) => ({ ...prev, patientAge: e.target.value }))}
                    placeholder="Edad en años"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dentitionType">Tipo de Dentición</Label>
                  <Select
                    value={newPatientData.dentitionType}
                    onValueChange={(value: "adult" | "child" | "mixed") =>
                      setNewPatientData((prev) => ({ ...prev, dentitionType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adult">Adulto (Permanente)</SelectItem>
                      <SelectItem value="child">Niño (Temporal)</SelectItem>
                      <SelectItem value="mixed">Mixta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button onClick={handleCreateNewPatient} className="flex-1">
                    Crear Odontograma
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewPatientDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Patient Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Seleccionar Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Paciente</Label>
              <Select
                value={selectedOdontogram?.id || ""}
                onValueChange={(value) => {
                  const odontogram = odontograms.find((o) => o.id === value)
                  setSelectedOdontogram(odontogram || null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {odontograms.map((odontogram) => (
                    <SelectItem key={odontogram.id} value={odontogram.id}>
                      {odontogram.patientName} ({odontogram.patientAge} años)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedOdontogram && (
              <>
                <div className="space-y-2">
                  <Label>Tipo de Dentición</Label>
                  <Badge variant="outline" className="w-fit">
                    {selectedOdontogram.dentitionType === "adult"
                      ? "Permanente"
                      : selectedOdontogram.dentitionType === "child"
                        ? "Temporal"
                        : "Mixta"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Última Actualización</Label>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedOdontogram.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Leyenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TOOTH_CONDITIONS.map((condition) => (
              <div key={condition.id} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 border rounded flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: condition.color, color: condition.id === "healthy" ? "#000" : "#fff" }}
                >
                  {condition.symbol}
                </div>
                <span className="text-sm">{condition.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Odontogram */}
      {selectedOdontogram && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tooth className="h-5 w-5" />
              Odontograma - {selectedOdontogram.patientName}
            </CardTitle>
            <CardDescription>Haga clic en cualquier diente para registrar su estado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-8 rounded-lg">{renderOdontogram()}</div>
          </CardContent>
        </Card>
      )}

      {/* Tooth Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Diente {selectedTooth}</DialogTitle>
            <DialogDescription>Registrar información del estado dental</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Estado del Diente</Label>
              <Select
                value={toothFormData.condition}
                onValueChange={(value) => setToothFormData((prev) => ({ ...prev, condition: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TOOTH_CONDITIONS.map((condition) => (
                    <SelectItem key={condition.id} value={condition.id}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border rounded" style={{ backgroundColor: condition.color }} />
                        {condition.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas Clínicas</Label>
              <Textarea
                id="notes"
                value={toothFormData.notes}
                onChange={(e) => setToothFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Observaciones, diagnóstico específico..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="treatment">Tratamiento</Label>
              <Input
                id="treatment"
                value={toothFormData.treatment}
                onChange={(e) => setToothFormData((prev) => ({ ...prev, treatment: e.target.value }))}
                placeholder="Tratamiento realizado o planificado"
              />
            </div>
            <div className="flex gap-4 pt-4">
              <Button onClick={handleSaveTooth} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
