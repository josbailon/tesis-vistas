"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, FileText, Eye, User, Calendar, Stethoscope } from "lucide-react"

interface ClinicalRecord {
  id: string
  patientName: string
  patientId: string
  date: string
  type: "consultation" | "treatment" | "followup" | "emergency"
  specialty: string
  student: string
  professor: string
  diagnosis: string
  treatment: string
  notes: string
  status: "active" | "completed" | "cancelled"
}

const mockRecords: ClinicalRecord[] = [
  {
    id: "rec1",
    patientName: "Ana Rodríguez",
    patientId: "pac1",
    date: "2024-01-15",
    type: "consultation",
    specialty: "Endodoncia",
    student: "Juan Pérez",
    professor: "Dr. Carlos Ruiz",
    diagnosis: "Pulpitis irreversible en molar superior derecho",
    treatment: "Tratamiento de conducto",
    notes: "Paciente presenta dolor intenso. Se programa endodoncia en dos sesiones.",
    status: "active",
  },
  {
    id: "rec2",
    patientName: "Miguel Santos",
    patientId: "pac2",
    date: "2024-01-12",
    type: "treatment",
    specialty: "Ortodoncia",
    student: "María González",
    professor: "Dra. Laura Martín",
    diagnosis: "Maloclusión clase II",
    treatment: "Colocación de brackets metálicos",
    notes: "Iniciado tratamiento ortodóntico. Control en 4 semanas.",
    status: "active",
  },
  {
    id: "rec3",
    patientName: "Carmen López",
    patientId: "pac3",
    date: "2024-01-10",
    type: "followup",
    specialty: "Cirugía Oral",
    student: "Carlos López",
    professor: "Dr. Roberto Silva",
    diagnosis: "Post-extracción tercer molar",
    treatment: "Control post-quirúrgico",
    notes: "Evolución favorable. No presenta complicaciones.",
    status: "completed",
  },
]

const typeLabels = {
  consultation: "Consulta",
  treatment: "Tratamiento",
  followup: "Seguimiento",
  emergency: "Emergencia",
}

const statusColors = {
  active: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const statusLabels = {
  active: "Activo",
  completed: "Completado",
  cancelled: "Cancelado",
}

export default function ClinicalRecordsPage() {
  const [records] = useState<ClinicalRecord[]>(mockRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecord | null>(null)

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || record.type === typeFilter
    const matchesStatus = statusFilter === "all" || record.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Historias Clínicas</h1>
          <p className="text-muted-foreground">Consulta los registros médicos de los pacientes</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registros</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tratamientos Activos</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.filter((r) => r.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.filter((r) => r.status === "completed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {records.filter((r) => new Date(r.date).getMonth() === new Date().getMonth()).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por paciente, estudiante o especialidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="consultation">Consulta</SelectItem>
                <SelectItem value="treatment">Tratamiento</SelectItem>
                <SelectItem value="followup">Seguimiento</SelectItem>
                <SelectItem value="emergency">Emergencia</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Registros */}
      <Card>
        <CardHeader>
          <CardTitle>Registros Clínicos</CardTitle>
          <CardDescription>{filteredRecords.length} registros encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{record.patientName}</h3>
                      <Badge variant="outline">{typeLabels[record.type]}</Badge>
                      <Badge className={statusColors[record.status]}>{statusLabels[record.status]}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(record.date).toLocaleDateString("es-ES")}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Estudiante: {record.student}
                      </div>
                      <div className="flex items-center gap-1">
                        <Stethoscope className="h-4 w-4" />
                        {record.specialty}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Diagnóstico:</span> {record.diagnosis}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Tratamiento:</span> {record.treatment}
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Completo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Historia Clínica Completa</DialogTitle>
                      </DialogHeader>
                      {selectedRecord && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Paciente</label>
                              <p className="text-sm text-muted-foreground">{selectedRecord.patientName}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Fecha</label>
                              <p className="text-sm text-muted-foreground">
                                {new Date(selectedRecord.date).toLocaleDateString("es-ES")}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Estudiante</label>
                              <p className="text-sm text-muted-foreground">{selectedRecord.student}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Profesor Supervisor</label>
                              <p className="text-sm text-muted-foreground">{selectedRecord.professor}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Especialidad</label>
                              <p className="text-sm text-muted-foreground">{selectedRecord.specialty}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Tipo</label>
                              <Badge variant="outline">{typeLabels[selectedRecord.type]}</Badge>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Diagnóstico</label>
                            <p className="text-sm text-muted-foreground mt-1">{selectedRecord.diagnosis}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Tratamiento</label>
                            <p className="text-sm text-muted-foreground mt-1">{selectedRecord.treatment}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Notas Adicionales</label>
                            <p className="text-sm text-muted-foreground mt-1">{selectedRecord.notes}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Estado</label>
                            <div className="mt-1">
                              <Badge className={statusColors[selectedRecord.status]}>
                                {statusLabels[selectedRecord.status]}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
