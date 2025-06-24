"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Search, Eye, User, Calendar, Stethoscope, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { medicalRecords, clinicalCases, students, patients } from "@/lib/mock-data"
import { useAuth } from "@/contexts/auth-context"

export default function TeacherClinicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const { user } = useAuth()

  // Filter records for current professor's students
  const professorStudents = students.filter((student) => student.professorId === user?.id)
  const studentIds = professorStudents.map((student) => student.id)

  const professorMedicalRecords = medicalRecords.filter((record) => studentIds.includes(record.studentId))

  const professorClinicalCases = clinicalCases.filter((case_) => studentIds.includes(case_.studentId))

  const filteredRecords = professorMedicalRecords.filter((record) => {
    const patient = patients.find((p) => p.id === record.patientId)
    const student = students.find((s) => s.id === record.studentId)

    const matchesSearch =
      patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStudent = selectedStudent === "all" || record.studentId === selectedStudent

    return matchesSearch && matchesStudent
  })

  const filteredCases = professorClinicalCases.filter((case_) => {
    const patient = patients.find((p) => p.id === case_.patientId)
    const student = students.find((s) => s.id === case_.studentId)

    const matchesSearch =
      patient?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStudent = selectedStudent === "all" || case_.studentId === selectedStudent

    return matchesSearch && matchesStudent
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">En Progreso</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>
      case "on-hold":
        return <Badge className="bg-yellow-100 text-yellow-800">En Espera</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Diagnóstico":
        return <Stethoscope className="h-4 w-4 text-blue-500" />
      case "Tratamiento":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Seguimiento":
        return <Clock className="h-4 w-4 text-orange-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Registros Clínicos</h1>
          <p className="text-gray-600 mt-2">Supervisa los registros médicos de tus estudiantes</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mis Estudiantes</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{professorStudents.length}</div>
            <p className="text-xs text-muted-foreground">Bajo supervisión</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Historias Clínicas</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{professorMedicalRecords.length}</div>
            <p className="text-xs text-muted-foreground">Registros totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Clínicos</CardTitle>
            <Stethoscope className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{professorClinicalCases.length}</div>
            <p className="text-xs text-muted-foreground">Casos activos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes Revisión</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {professorClinicalCases.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por paciente, estudiante o título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="student-filter" className="text-sm">
                Estudiante:
              </Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger id="student-filter" className="w-[200px]">
                  <SelectValue placeholder="Todos los estudiantes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estudiantes</SelectItem>
                  {professorStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records and Cases */}
      <Tabs defaultValue="medical-records" className="w-full">
        <TabsList>
          <TabsTrigger value="medical-records">Historias Clínicas ({filteredRecords.length})</TabsTrigger>
          <TabsTrigger value="clinical-cases">Casos Clínicos ({filteredCases.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="medical-records" className="space-y-4">
          <div className="grid gap-4">
            {filteredRecords.map((record) => {
              const patient = patients.find((p) => p.id === record.patientId)
              const student = students.find((s) => s.id === record.studentId)

              return (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{record.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Paciente: {patient?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Estudiante: {student?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {record.date}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(record.type)}
                          <Badge variant="outline">{record.type}</Badge>
                        </div>
                        <Badge variant="outline">{record.specialty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{record.description}</p>

                      {record.treatment && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <Label className="font-medium text-blue-800">Tratamiento</Label>
                          <p className="text-sm text-blue-700 mt-1">{record.treatment}</p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Ver Detalles
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>{record.title}</DialogTitle>
                              <DialogDescription>
                                Historia clínica de {patient?.name} por {student?.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="font-medium">Fecha</Label>
                                  <p>{record.date}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Tipo</Label>
                                  <p>{record.type}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Especialidad</Label>
                                  <p>{record.specialty}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Paciente</Label>
                                  <p>{patient?.name}</p>
                                </div>
                              </div>

                              <div>
                                <Label className="font-medium">Descripción</Label>
                                <p className="text-sm mt-1">{record.description}</p>
                              </div>

                              {record.treatment && (
                                <div>
                                  <Label className="font-medium">Tratamiento</Label>
                                  <p className="text-sm mt-1">{record.treatment}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredRecords.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No hay historias clínicas</h3>
                <p className="text-gray-500">No se encontraron registros que coincidan con los filtros</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="clinical-cases" className="space-y-4">
          <div className="grid gap-4">
            {filteredCases.map((case_) => {
              const patient = patients.find((p) => p.id === case_.patientId)
              const student = students.find((s) => s.id === case_.studentId)

              return (
                <Card key={case_.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{case_.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Paciente: {patient?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            Estudiante: {student?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Inicio: {case_.startDate}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(case_.status)}
                        <Badge variant="outline">{case_.specialty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{case_.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="font-medium">Progreso</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${case_.progress}%` }} />
                            </div>
                            <span className="text-xs">{case_.progress}%</span>
                          </div>
                        </div>
                        <div>
                          <Label className="font-medium">Sesiones</Label>
                          <p>{case_.sessions?.length || 0} registradas</p>
                        </div>
                      </div>

                      {case_.treatmentPlan && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <Label className="font-medium text-green-800">Plan de Tratamiento</Label>
                          <p className="text-sm text-green-700 mt-1">{case_.treatmentPlan}</p>
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Ver Caso Completo
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{case_.title}</DialogTitle>
                              <DialogDescription>
                                Caso clínico de {patient?.name} por {student?.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <Label className="font-medium">Fecha de Inicio</Label>
                                  <p>{case_.startDate}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Estado</Label>
                                  <p>{case_.status}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Especialidad</Label>
                                  <p>{case_.specialty}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">Progreso</Label>
                                  <p>{case_.progress}%</p>
                                </div>
                              </div>

                              <div>
                                <Label className="font-medium">Descripción</Label>
                                <p className="text-sm mt-1">{case_.description}</p>
                              </div>

                              {case_.treatmentPlan && (
                                <div>
                                  <Label className="font-medium">Plan de Tratamiento</Label>
                                  <p className="text-sm mt-1">{case_.treatmentPlan}</p>
                                </div>
                              )}

                              {case_.objectives && case_.objectives.length > 0 && (
                                <div>
                                  <Label className="font-medium">Objetivos</Label>
                                  <ul className="text-sm mt-1 list-disc list-inside">
                                    {case_.objectives.map((objective, index) => (
                                      <li key={index}>{objective}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {case_.learningPoints && case_.learningPoints.length > 0 && (
                                <div>
                                  <Label className="font-medium">Puntos de Aprendizaje</Label>
                                  <ul className="text-sm mt-1 list-disc list-inside">
                                    {case_.learningPoints.map((point, index) => (
                                      <li key={index}>{point}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {case_.sessions && case_.sessions.length > 0 && (
                                <div>
                                  <Label className="font-medium">Sesiones Registradas</Label>
                                  <div className="space-y-2 mt-2">
                                    {case_.sessions.map((session, index) => (
                                      <div key={session.id} className="border rounded p-3">
                                        <div className="flex justify-between items-start mb-2">
                                          <span className="font-medium text-sm">Sesión {index + 1}</span>
                                          <span className="text-xs text-gray-500">{session.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{session.notes}</p>
                                        {session.procedures && session.procedures.length > 0 && (
                                          <div className="mt-2">
                                            <span className="text-xs font-medium">Procedimientos:</span>
                                            <p className="text-xs text-gray-600">{session.procedures.join(", ")}</p>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredCases.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Stethoscope className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No hay casos clínicos</h3>
                <p className="text-gray-500">No se encontraron casos que coincidan con los filtros</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
