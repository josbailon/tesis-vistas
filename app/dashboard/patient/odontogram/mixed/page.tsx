"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import { InteractiveOdontogram } from "@/components/interactive-odontogram"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

// Mock patient data
const mockPatient = {
  id: "p3",
  name: "María Fernández",
  age: 8,
  lastVisit: "2024-12-12",
  dentitionType: "mixed" as const,
}

export default function MixedOdontogramPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [odontogramData, setOdontogramData] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    loadData()
  }, [])

  const handleSaveOdontogram = async (data: any) => {
    console.log("Saving mixed odontogram:", data)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-700 font-medium">Cargando odontograma mixto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 fade-in">
        <Link href="/dashboard/patient/odontogram">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Odontograma Mixto
          </h1>
          <p className="text-gray-600 mt-1">Dentición mixta (temporal y permanente) - Sistema FDI</p>
        </div>
      </div>

      {/* Patient Info */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <User className="h-5 w-5 text-purple-500" />
            Información del Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="font-medium">{mockPatient.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Edad</p>
              <p className="font-medium">{mockPatient.age} años</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Última Visita</p>
              <p className="font-medium">{mockPatient.lastVisit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tipo de Dentición</p>
              <Badge className="bg-purple-100 text-purple-700">Mixto (Variable)</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Odontogram */}
      <InteractiveOdontogram
        patientId={mockPatient.id}
        patientName={mockPatient.name}
        dentitionType="mixed"
        initialData={odontogramData}
        onSave={handleSaveOdontogram}
        readOnly={user?.role === "patient"}
      />

      {/* Mixed Dentition Information */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-gray-800">Información de Dentición Mixta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Secuencia de Erupción Permanente</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Primeros molares:</span>
                  <span className="text-gray-600">6-7 años</span>
                </div>
                <div className="flex justify-between">
                  <span>Incisivos centrales:</span>
                  <span className="text-gray-600">6-8 años</span>
                </div>
                <div className="flex justify-between">
                  <span>Incisivos laterales:</span>
                  <span className="text-gray-600">7-9 años</span>
                </div>
                <div className="flex justify-between">
                  <span>Caninos:</span>
                  <span className="text-gray-600">9-12 años</span>
                </div>
                <div className="flex justify-between">
                  <span>Premolares:</span>
                  <span className="text-gray-600">10-12 años</span>
                </div>
                <div className="flex justify-between">
                  <span>Segundos molares:</span>
                  <span className="text-gray-600">11-13 años</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Consideraciones Especiales</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Mantenimiento de espacio</li>
                <li>• Control de erupción ectópica</li>
                <li>• Evaluación ortodóntica temprana</li>
                <li>• Sellantes en molares permanentes</li>
                <li>• Monitoreo de exfoliación</li>
                <li>• Prevención de caries en molares nuevos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
