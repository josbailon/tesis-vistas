"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OdontogramAdvanced } from "@/components/odontogram-advanced"
import { patients } from "@/lib/mock-data"
import { User, Save, FileText } from "lucide-react"

export default function StudentOdontogramPage() {
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [selectedMode, setSelectedMode] = useState<"adult" | "child" | "mixed">("adult")

  const handleSaveOdontogram = (data: any) => {
    console.log("Guardar odontograma:", data)
  }

  const handleToothUpdate = (tooth: any) => {
    console.log("Diente actualizado:", tooth)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Odontograma Digital</h1>
          <p className="text-muted-foreground">Gestiona el odontograma de tus pacientes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Selección de Paciente
          </CardTitle>
          <CardDescription>Selecciona el paciente para trabajar con su odontograma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Paciente</label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{patient.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date().getFullYear() - new Date(patient.dob).getFullYear()} años
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Dentición</label>
              <Select value={selectedMode} onValueChange={(value: any) => setSelectedMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult">Adulto (Permanente)</SelectItem>
                  <SelectItem value="child">Niño (Temporal)</SelectItem>
                  <SelectItem value="mixed">Mixta (Temporal + Permanente)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedPatient && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">
                  Paciente seleccionado: {patients.find((p) => p.id === selectedPatient)?.name}
                </span>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                Edad:{" "}
                {new Date().getFullYear() -
                  new Date(patients.find((p) => p.id === selectedPatient)?.dob || "").getFullYear()}{" "}
                años
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedPatient && (
        <OdontogramAdvanced
          patientId={selectedPatient}
          patientAge={
            new Date().getFullYear() - new Date(patients.find((p) => p.id === selectedPatient)?.dob || "").getFullYear()
          }
          mode={selectedMode}
          onSave={handleSaveOdontogram}
          onToothUpdate={handleToothUpdate}
        />
      )}
    </div>
  )
}
