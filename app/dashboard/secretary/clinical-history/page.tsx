"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, User, FileText, Plus, Eye, Edit } from "lucide-react"

interface ClinicalHistory {
  id: string
  patientId: string
  patientName: string
  patientAge: number
  lastVisit: string
  totalVisits: number
  allergies: string[]
  medicalHistory: string[]
  currentMedications: string[]
  emergencyContact: string
  insuranceProvider: string
  notes: string
}

const mockClinicalHistories: ClinicalHistory[] = [
  {
    id: "ch1",
    patientId: "pac1",
    patientName: "Luis Mendoza",
    patientAge: 38,
    lastVisit: "2024-01-10",
    totalVisits: 5,
    allergies: ["Penicilina", "Látex"],
    medicalHistory: ["Hipertensión", "Diabetes tipo 2"],
    currentMedications: ["Metformina", "Losartán"],
    emergencyContact: "Carmen Mendoza - +593 99 765 4321",
    insuranceProvider: "IESS",
    notes: "Paciente colaborador, requiere cuidado especial por diabetes",
  },
  {
    id: "ch2",
    patientId: "pac2",
    patientName: "Rosa Vera",
    patientAge: 31,
    lastVisit: "2024-01-08",
    totalVisits: 3,
    allergies: [],
    medicalHistory: [],
    currentMedications: [],
    emergencyContact: "Miguel Vera - +593 99 876 5432",
    insuranceProvider: "Seguro Privado",
    notes: "Primera vez en tratamiento ortodóntico",
  },
  {
    id: "ch3",
    patientId: "pac3",
    patientName: "Carlos Morales",
    patientAge: 45,
    lastVisit: "2024-01-05",
    totalVisits: 8,
    allergies: ["Ibuprofeno"],
    medicalHistory: ["Cardiopatía"],
    currentMedications: ["Aspirina", "Atorvastatina"],
    emergencyContact: "Ana Morales - +593 99 987 6543",
    insuranceProvider: "IESS",
    notes: "Requiere profilaxis antibiótica antes de procedimientos",
  },
]

export default function ClinicalHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHistory, setSelectedHistory] = useState<ClinicalHistory | null>(null)

  const filteredHistories = mockClinicalHistories.filter(
    (history) =>
      history.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      history.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Historias Clínicas</h1>
          <p className="text-muted-foreground">Gestiona las historias clínicas de los pacientes</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Historia Clínica
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nombre o ID del paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clinical Histories List */}
      <div className="grid gap-6">
        {filteredHistories.map((history) => (
          <Card key={history.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {history.patientName}
                  </CardTitle>
                  <CardDescription>
                    ID: {history.patientId} • {history.patientAge} años • {history.totalVisits} visitas
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedHistory(history)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Información General</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Última visita:</span> {history.lastVisit}
                    </p>
                    <p>
                      <span className="font-medium">Seguro:</span> {history.insuranceProvider}
                    </p>
                    <p>
                      <span className="font-medium">Contacto emergencia:</span> {history.emergencyContact}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Alertas Médicas</h4>
                  <div className="space-y-2">
                    {history.allergies.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-red-600">Alergias:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {history.allergies.map((allergy) => (
                            <Badge key={allergy} variant="destructive" className="text-xs">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {history.medicalHistory.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-orange-600">Antecedentes:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {history.medicalHistory.map((condition) => (
                            <Badge key={condition} variant="secondary" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {history.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Notas Importantes</h4>
                  <p className="text-sm text-blue-700">{history.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Historia Clínica - {selectedHistory.patientName}</CardTitle>
                  <CardDescription>ID: {selectedHistory.patientId}</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedHistory(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="medical">Médico</TabsTrigger>
                  <TabsTrigger value="visits">Visitas</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Información Personal</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Nombre:</span> {selectedHistory.patientName}
                        </p>
                        <p>
                          <span className="font-medium">Edad:</span> {selectedHistory.patientAge} años
                        </p>
                        <p>
                          <span className="font-medium">ID Paciente:</span> {selectedHistory.patientId}
                        </p>
                        <p>
                          <span className="font-medium">Seguro:</span> {selectedHistory.insuranceProvider}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Contacto de Emergencia</h3>
                      <p className="text-sm">{selectedHistory.emergencyContact}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="medical" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Alergias</h3>
                      {selectedHistory.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedHistory.allergies.map((allergy) => (
                            <Badge key={allergy} variant="destructive">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Sin alergias conocidas</p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Antecedentes Médicos</h3>
                      {selectedHistory.medicalHistory.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedHistory.medicalHistory.map((condition) => (
                            <Badge key={condition} variant="secondary">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Sin antecedentes médicos</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Medicamentos Actuales</h3>
                    {selectedHistory.currentMedications.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedHistory.currentMedications.map((medication) => (
                          <Badge key={medication} variant="outline">
                            {medication}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Sin medicamentos actuales</p>
                    )}
                  </div>
                  {selectedHistory.notes && (
                    <div>
                      <h3 className="font-semibold mb-3">Notas Importantes</h3>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">{selectedHistory.notes}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="visits" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Historial de Visitas</h3>
                    <Badge variant="outline">{selectedHistory.totalVisits} visitas totales</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Consulta de Endodoncia</p>
                          <p className="text-sm text-muted-foreground">Dr. Carlos Ruiz - Juan Pérez</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{selectedHistory.lastVisit}</p>
                          <Badge variant="outline">Completada</Badge>
                        </div>
                      </div>
                      <p className="text-sm mt-2">Tratamiento de conducto en molar superior derecho</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Documentos</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Subir Documento
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Radiografía Panorámica</p>
                          <p className="text-sm text-muted-foreground">Subido el 10/01/2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Consentimiento Informado</p>
                          <p className="text-sm text-muted-foreground">Subido el 08/01/2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
