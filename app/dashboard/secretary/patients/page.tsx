"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Plus, Edit, Eye, Phone, FileText, User, AlertTriangle } from "lucide-react"
import { patients } from "@/lib/mock-data"

export default function SecretaryPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    allergies: [] as string[],
    medicalHistory: [] as string[],
    insuranceProvider: "",
    insuranceNumber: "",
  })

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  const commonAllergies = ["Penicilina", "Lidocaína", "Látex", "Yodo", "Aspirina"]
  const commonConditions = ["Hipertensión", "Diabetes", "Cardiopatías", "Asma", "Epilepsia"]

  const handleCreatePatient = () => {
    console.log("Nuevo paciente:", newPatient)
    setIsCreateDialogOpen(false)
    setNewPatient({
      name: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      allergies: [],
      medicalHistory: [],
      insuranceProvider: "",
      insuranceNumber: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Pacientes</h1>
          <p className="text-muted-foreground">Administra la información de los pacientes</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
              <DialogDescription>Complete la información del paciente</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre Completo *</Label>
                  <Input
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    placeholder="Nombre y apellidos"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono *</Label>
                  <Input
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    placeholder="+593 99 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    placeholder="email@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fecha de Nacimiento *</Label>
                  <Input
                    type="date"
                    value={newPatient.dob}
                    onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dirección</Label>
                <Input
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                  placeholder="Dirección completa"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contacto de Emergencia</Label>
                  <Input
                    value={newPatient.emergencyContact}
                    onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                    placeholder="Nombre del contacto"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono de Emergencia</Label>
                  <Input
                    value={newPatient.emergencyPhone}
                    onChange={(e) => setNewPatient({ ...newPatient, emergencyPhone: e.target.value })}
                    placeholder="+593 99 123 4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Seguro Médico</Label>
                  <Select
                    value={newPatient.insuranceProvider}
                    onValueChange={(value) => setNewPatient({ ...newPatient, insuranceProvider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar seguro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iess">IESS</SelectItem>
                      <SelectItem value="issfa">ISSFA</SelectItem>
                      <SelectItem value="isspol">ISSPOL</SelectItem>
                      <SelectItem value="privado">Seguro Privado</SelectItem>
                      <SelectItem value="ninguno">Sin Seguro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Número de Seguro</Label>
                  <Input
                    value={newPatient.insuranceNumber}
                    onChange={(e) => setNewPatient({ ...newPatient, insuranceNumber: e.target.value })}
                    placeholder="Número de afiliación"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Alergias</Label>
                <div className="grid grid-cols-2 gap-2">
                  {commonAllergies.map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
                        id={allergy}
                        checked={newPatient.allergies.includes(allergy)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewPatient({ ...newPatient, allergies: [...newPatient.allergies, allergy] })
                          } else {
                            setNewPatient({
                              ...newPatient,
                              allergies: newPatient.allergies.filter((a) => a !== allergy),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={allergy} className="text-sm">
                        {allergy}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Antecedentes Médicos</Label>
                <div className="grid grid-cols-2 gap-2">
                  {commonConditions.map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        checked={newPatient.medicalHistory.includes(condition)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewPatient({ ...newPatient, medicalHistory: [...newPatient.medicalHistory, condition] })
                          } else {
                            setNewPatient({
                              ...newPatient,
                              medicalHistory: newPatient.medicalHistory.filter((c) => c !== condition),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={condition} className="text-sm">
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreatePatient}>Registrar Paciente</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>{filteredPatients.length} pacientes registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Fecha Nacimiento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Alergias</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">{patient.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {patient.phone}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(patient.dob).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        patient.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {patient.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {patient.allergies && patient.allergies.length > 0 ? (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600">{patient.allergies.length} alergias</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Sin alergias</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPatient(patient)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para ver detalles del paciente */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Información del Paciente</DialogTitle>
            <DialogDescription>Detalles completos del paciente</DialogDescription>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Nombre</Label>
                  <p>{selectedPatient.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Teléfono</Label>
                  <p>{selectedPatient.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p>{selectedPatient.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Fecha de Nacimiento</Label>
                  <p>{new Date(selectedPatient.dob).toLocaleDateString("es-ES")}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">Dirección</Label>
                  <p>{selectedPatient.address}</p>
                </div>
              </div>

              {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Alergias</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPatient.allergies.map((allergy: string) => (
                      <Badge key={allergy} variant="destructive">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedPatient.medicalHistory && selectedPatient.medicalHistory.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Antecedentes Médicos</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedPatient.medicalHistory.map((condition: string) => (
                      <Badge key={condition} variant="outline">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
