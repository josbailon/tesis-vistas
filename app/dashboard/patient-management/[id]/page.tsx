"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { InteractiveOdontogram } from "@/components/interactive-odontogram"
import { User, Calendar, FileText, Stethoscope, ArrowLeft, Edit, Plus, Download, Upload } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function PatientManagementPage() {
  const params = useParams()
  const patientId = params.id as string
  const [patient, setPatient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadPatientData = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock patient data
      setPatient({
        id: patientId,
        name: "Ana García",
        age: 28,
        email: "ana.garcia@email.com",
        phone: "555-123-4567",
        address: "Calle Principal 123, Ciudad",
        emergencyContact: "Carlos García - 555-987-6543",
        allergies: ["Penicilina"],
        medicalHistory: "Hipertensión controlada",
        dentitionType: "adult",
        lastVisit: "2024-12-15",
        nextAppointment: "2024-12-28",
        status: "active",
      })
      setIsLoading(false)
    }

    loadPatientData()
  }, [patientId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-700 font-medium">Cargando información del paciente...</p>
        </div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Paciente no encontrado</h2>
        <p className="text-gray-600 mb-4">No se pudo cargar la información del paciente.</p>
        <Link href="/dashboard/patients">
          <Button>Volver a Pacientes</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/patients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{patient.name}</h1>
            <p className="text-gray-600">Gestión integral del paciente</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Cita
          </Button>
        </div>
      </div>

      {/* Patient Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Información del Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500">Información Personal</p>
              <div className="mt-2 space-y-1">
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-gray-600">{patient.age} años</p>
                <p className="text-sm text-gray-600">{patient.email}</p>
                <p className="text-sm text-gray-600">{patient.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="mt-2 text-sm">{patient.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contacto de Emergencia</p>
              <p className="mt-2 text-sm">{patient.emergencyContact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <div className="mt-2 space-y-2">
                <Badge className="bg-green-100 text-green-700">
                  {patient.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
                <p className="text-sm text-gray-600">Última visita: {patient.lastVisit}</p>
                <p className="text-sm text-gray-600">Próxima cita: {patient.nextAppointment}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="odontogram" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="odontogram">Odontograma</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="appointments">Citas</TabsTrigger>
          <TabsTrigger value="treatments">Tratamientos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="odontogram" className="mt-6">
          <InteractiveOdontogram
            patientId={patient.id}
            patientName={patient.name}
            dentitionType={patient.dentitionType}
            readOnly={user?.role === "patient"}
          />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                Historial Clínico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Alergias</h4>
                    <div className="space-y-1">
                      {patient.allergies.map((allergy: string, index: number) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Historia Médica</h4>
                    <p className="text-sm text-gray-600">{patient.medicalHistory}</p>
                  </div>
                </div>

                {/* Recent Records */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-4">Registros Recientes</h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map((record) => (
                      <div key={record} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Consulta de Rutina</p>
                          <p className="text-sm text-gray-600">15 de Diciembre, 2024</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Citas
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Cita
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((appointment) => (
                  <div key={appointment} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Limpieza Dental</p>
                      <p className="text-sm text-gray-600">28 de Diciembre, 2024 - 10:00 AM</p>
                      <p className="text-sm text-gray-600">Dr. Pedro Gómez - Consultorio 3</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-700">Confirmada</Badge>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-purple-500" />
                Tratamientos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((treatment) => (
                  <div key={treatment} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Tratamiento de Conducto</h4>
                      <Badge className="bg-green-100 text-green-700">Completado</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Diente 16 - Tratamiento de conducto realizado exitosamente
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Fecha: 15 de Diciembre, 2024</span>
                      <span>Dr. Pedro Gómez</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-500" />
                  Documentos
                </div>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Subir Documento
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((doc) => (
                  <div key={doc} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Radiografía Panorámica</h4>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">15 de Diciembre, 2024</p>
                    <Badge variant="outline" className="mt-2">
                      PDF
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
