"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ProfessionalOdontogram } from "@/components/professional-odontogram"
import { useToast } from "@/hooks/use-toast"
import { User, Download, History } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  lastVisit: string
  phone: string
  email: string
}

export default function StudentOdontogramPage() {
  const { toast } = useToast()
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const patients: Patient[] = [
    {
      id: "1",
      name: "Laura Medina",
      age: 28,
      gender: "Femenino",
      lastVisit: "2024-12-20",
      phone: "555-123-4567",
      email: "laura.medina@email.com",
    },
    {
      id: "2",
      name: "Carlos Ruiz Mendoza",
      age: 35,
      gender: "Masculino",
      lastVisit: "2024-12-18",
      phone: "555-987-6543",
      email: "carlos.ruiz@email.com",
    },
    {
      id: "3",
      name: "María González Pérez",
      age: 22,
      gender: "Femenino",
      lastVisit: "2024-12-15",
      phone: "555-456-7890",
      email: "maria.gonzalez@email.com",
    },
    {
      id: "4",
      name: "Sofía Herrera Alava",
      age: 8,
      gender: "Femenino",
      lastVisit: "2024-12-22",
      phone: "555-234-5678",
      email: "sofia.herrera@email.com",
    },
    {
      id: "5",
      name: "Roberto Díaz Castro",
      age: 45,
      gender: "Masculino",
      lastVisit: "2024-12-10",
      phone: "555-876-5432",
      email: "roberto.diaz@email.com",
    },
  ]

  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    setSelectedPatient(patient || null)
  }

  const handleSaveOdontogram = (data: any) => {
    console.log("Saving odontogram:", data)
    toast({
      title: "Odontograma guardado",
      description: `Odontograma de ${data.patientName} guardado exitosamente`,
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Odontograma Digital</h1>
          <p className="text-muted-foreground">Sistema profesional de registro dental</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="mr-2 h-4 w-4" />
            Historial
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Patient Selection */}
      {!selectedPatient && (
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
                <Select onValueChange={handlePatientSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-gray-500">
                            {patient.age} años • {patient.gender} • Última visita:{" "}
                            {new Date(patient.lastVisit).toLocaleDateString("es-ES")}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Patient Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.map((patient) => (
                <Card
                  key={patient.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-medical-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <p className="text-sm text-gray-500">
                          {patient.age} años • {patient.gender}
                        </p>
                        <p className="text-xs text-gray-400">
                          Última visita: {new Date(patient.lastVisit).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Odontogram */}
      {selectedPatient && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedPatient(null)}>
              ← Cambiar Paciente
            </Button>
          </div>

          <ProfessionalOdontogram patient={selectedPatient} onSave={handleSaveOdontogram} />
        </div>
      )}

      {/* Professional Odontogram without patient selection */}
      {!selectedPatient && <ProfessionalOdontogram />}
    </div>
  )
}
