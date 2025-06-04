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
  id: "p5",
  name: "Sofía Ramírez",
  age: 5,
  lastVisit: "2024-12-10",
  dentitionType: "pediatric" as const,
}

export default function PediatricOdontogramPage() {
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
    console.log("Saving pediatric odontogram:", data)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">Cargando odontograma pediátrico...</p>
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Odontograma Pediátrico
          </h1>
          <p className="text-gray-600 mt-1">Dentición temporal (dientes de leche) - Sistema FDI</p>
        </div>
      </div>

      {/* Patient Info */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <User className="h-5 w-5 text-green-500" />
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
              <Badge className="bg-green-100 text-green-700">Pediátrico (20 dientes)</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Odontogram */}
      <InteractiveOdontogram
        patientId={mockPatient.id}
        patientName={mockPatient.name}
        dentitionType="pediatric"
        initialData={odontogramData}
        onSave={handleSaveOdontogram}
        readOnly={user?.role === "patient"}
      />

      {/* Pediatric Information */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-gray-800">Información Pediátrica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Cronología de Erupción</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Incisivos centrales:</span>
                  <span className="text-gray-600">6-10 meses</span>
                </div>
                <div className="flex justify-between">
                  <span>Incisivos laterales:</span>
                  <span className="text-gray-600">10-16 meses</span>
                </div>
                <div className="flex justify-between">
                  <span>Primeros molares:</span>
                  <span className="text-gray-600">14-18 meses</span>
                </div>
                <div className="flex justify-between">
                  <span>Caninos:</span>
                  <span className="text-gray-600">18-22 meses</span>
                </div>
                <div className="flex justify-between">
                  <span>Segundos molares:</span>
                  <span className="text-gray-600">24-32 meses</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Cuidados Especiales</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Fluorización tópica cada 6 meses</li>
                <li>• Sellantes de fosas y fisuras</li>
                <li>• Control de hábitos (chupón, dedo)</li>
                <li>• Educación en higiene oral</li>
                <li>• Dieta baja en azúcares</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
