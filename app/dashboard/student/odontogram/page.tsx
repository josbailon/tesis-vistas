"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, User } from "lucide-react"
import { OdontogramAdvanced } from "@/components/odontogram-advanced"

interface Patient {
  id: string
  name: string
  age: number
  birthDate: string
}

const mockPatients: Patient[] = [
  {
    id: "pac1",
    name: "Ana Rodríguez",
    age: 28,
    birthDate: "1995-03-15",
  },
  {
    id: "pac2",
    name: "Miguel Santos",
    age: 32,
    birthDate: "1991-07-22",
  },
  {
    id: "pac3",
    name: "Carmen López",
    age: 45,
    birthDate: "1978-11-30",
  },
  {
    id: "pac4",
    name: "Pedro Martínez",
    age: 8,
    birthDate: "2015-05-10",
  },
  {
    id: "pac5",
    name: "Sofia Herrera",
    age: 12,
    birthDate: "2011-09-18",
  },
]

export default function StudentOdontogramPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [odontogramMode, setOdontogramMode] = useState<"adult" | "child" | "mixed">("adult")

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePatientSelect = (patientId: string) => {
    const patient = mockPatients.find((p) => p.id === patientId)
    if (patient) {
      setSelectedPatient(patient)
      // Determinar el modo según la edad
      if (patient.age < 6) {
        setOdontogramMode("child")
      } else if (patient.age < 12) {
        setOdontogramMode("mixed")
      } else {
        setOdontogramMode("adult")
      }
    }
  }

  const handleOdontogramSave = (data: any) => {
    console.log("Odontograma guardado:", data)
    // Aquí iría la lógica para guardar en la base de datos
  }

  const handleToothUpdate = (tooth: any) => {
    console.log("Diente actualizado:", tooth)
    // Aquí iría la lógica para actualizar el estado del diente
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Odontograma Digital</h1>
          <p className="text-muted-foreground">Gestiona el estado dental de tus pacientes</p>
        </div>
        {selectedPatient && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {selectedPatient.name}
            </Badge>
            <Badge variant="outline">{selectedPatient.age} años</Badge>
            <Badge variant="outline">
              {odontogramMode === "adult" ? "Adulto" : odontogramMode === "child" ? "Niño" : "Mixta"}
            </Badge>
          </div>
        )}
      </div>

      {/* Selección de Paciente */}
      {!selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle>Seleccionar Paciente</CardTitle>
            <CardDescription>Elige un paciente para ver/editar su odontograma</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar paciente por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handlePatientSelect(patient.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} años • {new Date(patient.birthDate).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {patient.age < 6 ? "Niño" : patient.age < 12 ? "Mixta" : "Adulto"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Seleccionar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Odontograma */}
      {selectedPatient && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Paciente: {selectedPatient.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedPatient.age} años • Última actualización: {new Date().toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                    Cambiar Paciente
                  </Button>
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
                </div>
              </div>
            </CardContent>
          </Card>

          <OdontogramAdvanced
            patientId={selectedPatient.id}
            patientAge={selectedPatient.age}
            mode={odontogramMode}
            readonly={false}
            onToothUpdate={handleToothUpdate}
            onSave={handleOdontogramSave}
          />
        </div>
      )}

      {/* Instrucciones para nuevos usuarios */}
      {!selectedPatient && filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">No se encontraron pacientes</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "No hay pacientes que coincidan con tu búsqueda" : "No tienes pacientes asignados aún"}
            </p>
            {searchTerm && (
              <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchTerm("")}>
                Limpiar Búsqueda
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
