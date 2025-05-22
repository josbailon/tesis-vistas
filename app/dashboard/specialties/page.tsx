"use client"

import { useState } from "react"
import { BookOpen, Plus, Edit, Trash2, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo para las especialidades
const specialties = [
  {
    id: 1,
    name: "Endodoncia",
    description: "Tratamiento de conductos y problemas de la pulpa dental",
    professors: 2,
    students: 8,
    color: "bg-red-100 text-red-800",
  },
  {
    id: 2,
    name: "Ortodoncia",
    description: "Corrección de la posición de los dientes y problemas de mordida",
    professors: 3,
    students: 12,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    name: "Periodoncia",
    description: "Tratamiento de las encías y el hueso que sostiene los dientes",
    professors: 2,
    students: 6,
    color: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    name: "Cirugía Oral",
    description: "Extracciones y procedimientos quirúrgicos en la cavidad oral",
    professors: 2,
    students: 7,
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: 5,
    name: "Odontopediatría",
    description: "Atención dental especializada para niños",
    professors: 1,
    students: 5,
    color: "bg-yellow-100 text-yellow-800",
  },
]

// Datos de ejemplo para los profesores
const professors = [
  { id: 1, name: "Dr. Martínez", email: "dr.martinez@ejemplo.com", specialty: "Endodoncia" },
  { id: 2, name: "Dra. Rodríguez", email: "dra.rodriguez@ejemplo.com", specialty: "Endodoncia" },
  { id: 3, name: "Dr. Sánchez", email: "dr.sanchez@ejemplo.com", specialty: "Ortodoncia" },
  { id: 4, name: "Dra. López", email: "dra.lopez@ejemplo.com", specialty: "Ortodoncia" },
  { id: 5, name: "Dr. Fernández", email: "dr.fernandez@ejemplo.com", specialty: "Ortodoncia" },
  { id: 6, name: "Dra. García", email: "dra.garcia@ejemplo.com", specialty: "Periodoncia" },
  { id: 7, name: "Dr. Pérez", email: "dr.perez@ejemplo.com", specialty: "Periodoncia" },
  { id: 8, name: "Dra. Díaz", email: "dra.diaz@ejemplo.com", specialty: "Cirugía Oral" },
  { id: 9, name: "Dr. Gómez", email: "dr.gomez@ejemplo.com", specialty: "Cirugía Oral" },
  { id: 10, name: "Dra. Torres", email: "dra.torres@ejemplo.com", specialty: "Odontopediatría" },
]

export default function SpecialtiesPage() {
  const [isAddSpecialtyDialogOpen, setIsAddSpecialtyDialogOpen] = useState(false)
  const [isViewProfessorsDialogOpen, setIsViewProfessorsDialogOpen] = useState(false)
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)

  // Filtrar profesores por especialidad seleccionada
  const filteredProfessors = professors.filter((professor) => professor.specialty === selectedSpecialty)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Especialidades</h1>
          <p className="text-muted-foreground">Gestiona las especialidades odontológicas y sus profesores</p>
        </div>
        <Dialog open={isAddSpecialtyDialogOpen} onOpenChange={setIsAddSpecialtyDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Especialidad
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Añadir Nueva Especialidad</DialogTitle>
              <DialogDescription>Completa los detalles para crear una nueva especialidad</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialty-name" className="text-right">
                  Nombre
                </Label>
                <Input id="specialty-name" placeholder="Nombre de la especialidad" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialty-description" className="text-right">
                  Descripción
                </Label>
                <Textarea
                  id="specialty-description"
                  placeholder="Descripción de la especialidad"
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialty-color" className="text-right">
                  Color
                </Label>
                <div className="col-span-3">
                  <Select>
                    <SelectTrigger id="specialty-color">
                      <SelectValue placeholder="Seleccionar color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="red">Rojo</SelectItem>
                      <SelectItem value="blue">Azul</SelectItem>
                      <SelectItem value="green">Verde</SelectItem>
                      <SelectItem value="purple">Morado</SelectItem>
                      <SelectItem value="yellow">Amarillo</SelectItem>
                      <SelectItem value="orange">Naranja</SelectItem>
                      <SelectItem value="teal">Turquesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddSpecialtyDialogOpen(false)}>
                Crear Especialidad
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specialties.map((specialty) => (
          <Card key={specialty.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{specialty.name}</CardTitle>
                  <CardDescription>{specialty.description}</CardDescription>
                </div>
                <div className={`px-2 py-1 text-xs font-medium rounded-full ${specialty.color}`}>{specialty.name}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg">
                  <Users className="h-5 w-5 mb-1 text-muted-foreground" />
                  <span className="text-xl font-bold">{specialty.professors}</span>
                  <span className="text-xs text-muted-foreground">Profesores</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted/40 rounded-lg">
                  <BookOpen className="h-5 w-5 mb-1 text-muted-foreground" />
                  <span className="text-xl font-bold">{specialty.students}</span>
                  <span className="text-xs text-muted-foreground">Estudiantes</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedSpecialty(specialty.name)
                  setIsViewProfessorsDialogOpen(true)
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                Ver Profesores
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isViewProfessorsDialogOpen} onOpenChange={setIsViewProfessorsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Profesores de {selectedSpecialty}</DialogTitle>
            <DialogDescription>Lista de profesores asignados a esta especialidad</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessors.map((professor) => (
                  <TableRow key={professor.id}>
                    <TableCell className="font-medium">{professor.name}</TableCell>
                    <TableCell>{professor.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4" />
                          <span className="sr-only">Ver horario</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Users className="h-4 w-4" />
                          <span className="sr-only">Ver estudiantes</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={() => setIsViewProfessorsDialogOpen(false)}>
                Cerrar
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Añadir Profesor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
