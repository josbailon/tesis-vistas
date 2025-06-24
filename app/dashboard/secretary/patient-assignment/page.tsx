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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Users, UserPlus, Search, Filter, CheckCircle, AlertCircle } from "lucide-react"
import { patients, students } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function PatientAssignmentPage() {
  const [unassignedPatients, setUnassignedPatients] = useState(patients.filter((p) => !p.assignedStudent))
  const [assignedPatients, setAssignedPatients] = useState(patients.filter((p) => p.assignedStudent))
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const { toast } = useToast()

  const availableStudents = students.filter((student) => {
    if (selectedSpecialty === "all") return true
    return student.specialty === selectedSpecialty
  })

  const filteredUnassigned = unassignedPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAssignPatient = () => {
    if (!selectedPatient || !selectedStudent) return

    // Update patient assignment
    const updatedPatient = {
      ...selectedPatient,
      assignedStudent: selectedStudent,
      assignedDate: new Date().toISOString().split("T")[0],
    }

    // Update state
    setUnassignedPatients((prev) => prev.filter((p) => p.id !== selectedPatient.id))
    setAssignedPatients((prev) => [...prev, updatedPatient])

    // Update student's assigned patients
    const student = students.find((s) => s.id === selectedStudent)

    toast({
      title: "Paciente Asignado",
      description: `${selectedPatient.name} ha sido asignado a ${student?.name}`,
    })

    // Reset form
    setSelectedPatient(null)
    setSelectedStudent("")
    setIsAssignDialogOpen(false)
  }

  const handleUnassignPatient = (patientId: string) => {
    const patient = assignedPatients.find((p) => p.id === patientId)
    if (!patient) return

    const updatedPatient = {
      ...patient,
      assignedStudent: null,
      assignedDate: null,
    }

    setAssignedPatients((prev) => prev.filter((p) => p.id !== patientId))
    setUnassignedPatients((prev) => [...prev, updatedPatient])

    toast({
      title: "Asignación Removida",
      description: `${patient.name} ya no está asignado`,
    })
  }

  const getStudentScheduleConflicts = (studentId: string) => {
    const student = students.find((s) => s.id === studentId)
    if (!student) return []

    return student.schedule.filter((schedule) => !schedule.available)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Asignación de Pacientes</h1>
          <p className="text-gray-600 mt-2">Gestiona la asignación de pacientes a estudiantes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Sin Asignar</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{unassignedPatients.length}</div>
            <p className="text-xs text-muted-foreground">Requieren asignación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Asignados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{assignedPatients.length}</div>
            <p className="text-xs text-muted-foreground">Con estudiante asignado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{students.length}</div>
            <p className="text-xs text-muted-foreground">Disponibles para asignación</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Especialidades</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">5</div>
            <p className="text-xs text-muted-foreground">Áreas disponibles</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="unassigned" className="w-full">
        <TabsList>
          <TabsTrigger value="unassigned">Pacientes Sin Asignar</TabsTrigger>
          <TabsTrigger value="assigned">Pacientes Asignados</TabsTrigger>
          <TabsTrigger value="students">Horarios de Estudiantes</TabsTrigger>
        </TabsList>

        <TabsContent value="unassigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pacientes Pendientes de Asignación</CardTitle>
              <CardDescription>Selecciona un paciente para asignar a un estudiante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar pacientes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtrar por especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las especialidades</SelectItem>
                    <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                    <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                    <SelectItem value="Periodoncia">Periodoncia</SelectItem>
                    <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
                    <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUnassigned.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">{patient.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date().getFullYear() - new Date(patient.dob).getFullYear()} años</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{patient.createdAt}</TableCell>
                      <TableCell>
                        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                          <DialogTrigger asChild>
                            <Button size="sm" onClick={() => setSelectedPatient(patient)} className="gap-2">
                              <UserPlus className="h-4 w-4" />
                              Asignar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Asignar Paciente a Estudiante</DialogTitle>
                              <DialogDescription>
                                Selecciona un estudiante para asignar a {selectedPatient?.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="student-select">Estudiante</Label>
                                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar estudiante" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableStudents.map((student) => (
                                      <SelectItem key={student.id} value={student.id}>
                                        <div className="flex items-center justify-between w-full">
                                          <span>{student.name}</span>
                                          <Badge variant="outline" className="ml-2">
                                            {student.specialty}
                                          </Badge>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {selectedStudent && (
                                <div className="space-y-2">
                                  <Label>Horario del Estudiante</Label>
                                  <div className="grid gap-2">
                                    {students
                                      .find((s) => s.id === selectedStudent)
                                      ?.schedule.map((schedule, index) => (
                                        <div
                                          key={index}
                                          className={`flex items-center justify-between p-2 rounded border ${
                                            schedule.available
                                              ? "bg-green-50 border-green-200"
                                              : "bg-red-50 border-red-200"
                                          }`}
                                        >
                                          <span className="font-medium">{schedule.day}</span>
                                          <span>
                                            {schedule.startTime} - {schedule.endTime}
                                          </span>
                                          <Badge
                                            variant={schedule.available ? "default" : "destructive"}
                                            className={
                                              schedule.available
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }
                                          >
                                            {schedule.available ? "Disponible" : "Ocupado"}
                                          </Badge>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                                Cancelar
                              </Button>
                              <Button onClick={handleAssignPatient} disabled={!selectedStudent}>
                                Asignar Paciente
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pacientes Asignados</CardTitle>
              <CardDescription>Pacientes que ya tienen un estudiante asignado</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Estudiante Asignado</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Fecha de Asignación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedPatients.map((patient) => {
                    const assignedStudent = students.find((s) => s.id === patient.assignedStudent)
                    return (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">{patient.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignedStudent?.name}</div>
                            <div className="text-sm text-muted-foreground">{assignedStudent?.studentId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{assignedStudent?.specialty}</Badge>
                        </TableCell>
                        <TableCell>{patient.assignedDate}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnassignPatient(patient.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Desasignar
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Horarios de Estudiantes</CardTitle>
              <CardDescription>Consulta la disponibilidad de horarios de cada estudiante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {students.map((student) => (
                  <Card key={student.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>
                        {student.specialty} • {student.assignedPatients.length} pacientes asignados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {student.schedule.map((schedule, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-2 rounded text-sm ${
                              schedule.available ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                            }`}
                          >
                            <span className="font-medium">{schedule.day}</span>
                            <span>
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                            <Badge
                              variant={schedule.available ? "default" : "destructive"}
                              className={schedule.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                            >
                              {schedule.available ? "Libre" : "Ocupado"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
