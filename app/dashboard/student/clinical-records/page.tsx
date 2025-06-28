"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, FileText, Edit, Eye, Save, Calendar } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface ClinicalRecord {
  id: string
  patientName: string
  patientId: string
  date: string
  type: "consultation" | "treatment" | "followup" | "emergency"
  specialty: string
  diagnosis: string
  treatment: string
  notes: string
  status: "draft" | "pending" | "approved" | "rejected"
  professorFeedback?: string
}

export default function StudentClinicalRecordsPage() {
  const { user } = useAuth()
  const [records, setRecords] = useState<ClinicalRecord[]>([
    {
      id: "rec1",
      patientName: "Ana Rodríguez",
      patientId: "pac1",
      date: "2024-01-15",
      type: "consultation",
      specialty: "Endodoncia",
      diagnosis: "Pulpitis irreversible en molar superior derecho",
      treatment: "Tratamiento de conducto programado",
      notes: "Paciente presenta dolor intenso al frío y calor. Radiografía muestra compromiso pulpar.",
      status: "approved",
    },
    {
      id: "rec2",
      patientName: "Miguel Santos",
      patientId: "pac2",
      date: "2024-01-12",
      type: "treatment",
      specialty: "Endodoncia",
      diagnosis: "Necrosis pulpar",
      treatment: "Primera sesión de endodoncia",
      notes: "Se realizó apertura cameral y limpieza de conductos. Medicación intraconducto colocada.",
      status: "pending",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<ClinicalRecord | null>(null)

  const [newRecord, setNewRecord] = useState({
    patientName: "",
    patientId: "",
    type: "consultation" as const,
    specialty: "",
    diagnosis: "",
    treatment: "",
    notes: "",
  })

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateRecord = () => {
    const record: ClinicalRecord = {
      id: `rec${Date.now()}`,
      ...newRecord,
      date: new Date().toISOString().split("T")[0],
      status: "draft",
    }
    setRecords([...records, record])
    setNewRecord({
      patientName: "",
      patientId: "",
      type: "consultation",
      specialty: "",
      diagnosis: "",
      treatment: "",
      notes: "",
    })
    setIsCreateDialogOpen(false)
  }

  const handleUpdateRecord = () => {
    if (editingRecord) {
      setRecords(records.map((r) => (r.id === editingRecord.id ? editingRecord : r)))
      setEditingRecord(null)
    }
  }

  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }

  const typeLabels = {
    consultation: "Consulta",
    treatment: "Tratamiento",
    followup: "Seguimiento",
    emergency: "Emergencia",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mis Historias Clínicas</h1>
          <p className="text-muted-foreground">Gestiona los registros de tus pacientes</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Historia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Historia Clínica</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Paciente</Label>
                  <Input
                    value={newRecord.patientName}
                    onChange={(e) => setNewRecord({ ...newRecord, patientName: e.target.value })}
                    placeholder="Nombre del paciente"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ID Paciente</Label>
                  <Input
                    value={newRecord.patientId}
                    onChange={(e) => setNewRecord({ ...newRecord, patientId: e.target.value })}
                    placeholder="ID del paciente"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select
                    value={newRecord.type}
                    onValueChange={(value: any) => setNewRecord({ ...newRecord, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consulta</SelectItem>
                      <SelectItem value="treatment">Tratamiento</SelectItem>
                      <SelectItem value="followup">Seguimiento</SelectItem>
                      <SelectItem value="emergency">Emergencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Especialidad</Label>
                  <Input
                    value={newRecord.specialty}
                    onChange={(e) => setNewRecord({ ...newRecord, specialty: e.target.value })}
                    placeholder="Especialidad"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Diagnóstico</Label>
                <Textarea
                  value={newRecord.diagnosis}
                  onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                  placeholder="Diagnóstico detallado..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Tratamiento</Label>
                <Textarea
                  value={newRecord.treatment}
                  onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
                  placeholder="Plan de tratamiento..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Notas</Label>
                <Textarea
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  placeholder="Observaciones adicionales..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateRecord}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.filter((r) => r.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.filter((r) => r.status === "approved").length}</div>
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
                  placeholder="Buscar por paciente o diagnóstico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="draft">Borrador</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="approved">Aprobado</SelectItem>
                <SelectItem value="rejected">Rechazado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Registros */}
      <Card>
        <CardHeader>
          <CardTitle>Historias Clínicas</CardTitle>
          <CardDescription>{filteredRecords.length} registros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{record.patientName}</h3>
                      <Badge variant="outline">{typeLabels[record.type]}</Badge>
                      <Badge className={statusColors[record.status]}>
                        {record.status === "draft"
                          ? "Borrador"
                          : record.status === "pending"
                            ? "Pendiente"
                            : record.status === "approved"
                              ? "Aprobado"
                              : "Rechazado"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(record.date).toLocaleDateString("es-ES")}
                        <span className="mx-2">•</span>
                        <span>{record.specialty}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Diagnóstico:</span> {record.diagnosis}
                    </div>
                    {record.professorFeedback && (
                      <div className="text-sm bg-blue-50 p-2 rounded">
                        <span className="font-medium">Feedback del profesor:</span> {record.professorFeedback}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Historia Clínica - {record.patientName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Paciente</Label>
                              <p className="text-sm text-muted-foreground">{record.patientName}</p>
                            </div>
                            <div>
                              <Label>Fecha</Label>
                              <p className="text-sm text-muted-foreground">
                                {new Date(record.date).toLocaleDateString("es-ES")}
                              </p>
                            </div>
                            <div>
                              <Label>Tipo</Label>
                              <p className="text-sm text-muted-foreground">{typeLabels[record.type]}</p>
                            </div>
                            <div>
                              <Label>Especialidad</Label>
                              <p className="text-sm text-muted-foreground">{record.specialty}</p>
                            </div>
                          </div>
                          <div>
                            <Label>Diagnóstico</Label>
                            <p className="text-sm text-muted-foreground mt-1">{record.diagnosis}</p>
                          </div>
                          <div>
                            <Label>Tratamiento</Label>
                            <p className="text-sm text-muted-foreground mt-1">{record.treatment}</p>
                          </div>
                          <div>
                            <Label>Notas</Label>
                            <p className="text-sm text-muted-foreground mt-1">{record.notes}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {record.status === "draft" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditingRecord(record)}>
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Editar Historia Clínica</DialogTitle>
                          </DialogHeader>
                          {editingRecord && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Diagnóstico</Label>
                                <Textarea
                                  value={editingRecord.diagnosis}
                                  onChange={(e) => setEditingRecord({ ...editingRecord, diagnosis: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Tratamiento</Label>
                                <Textarea
                                  value={editingRecord.treatment}
                                  onChange={(e) => setEditingRecord({ ...editingRecord, treatment: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Notas</Label>
                                <Textarea
                                  value={editingRecord.notes}
                                  onChange={(e) => setEditingRecord({ ...editingRecord, notes: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setEditingRecord(null)}>
                                  Cancelar
                                </Button>
                                <Button onClick={handleUpdateRecord}>
                                  <Save className="h-4 w-4 mr-2" />
                                  Guardar
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
