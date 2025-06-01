"use client"

import type React from "react"

import { useState } from "react"
import { X, User, Mail, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface StudentFormProps {
  onClose: () => void
  onSuccess: () => void
  editingStudent?: any
}

export function StudentForm({ onClose, onSuccess, editingStudent }: StudentFormProps) {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: editingStudent?.name || "",
    email: editingStudent?.email || "",
    studentId: editingStudent?.studentId || "",
    semester: editingStudent?.semester || "1",
    specialty: editingStudent?.specialty || "",
    gpa: editingStudent?.gpa || "",
    status: editingStudent?.status || "active",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    if (!formData.studentId.trim()) newErrors.studentId = "El ID de estudiante es requerido"
    if (!formData.specialty.trim()) newErrors.specialty = "La especialidad es requerida"

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Formato de email inválido"
    }

    // Validate GPA
    if (formData.gpa && (isNaN(Number(formData.gpa)) || Number(formData.gpa) < 0 || Number(formData.gpa) > 10)) {
      newErrors.gpa = "El GPA debe ser un número entre 0 y 10"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      // Here you would typically save to your backend
      toast({
        title: editingStudent ? "Estudiante Actualizado" : "Estudiante Creado",
        description: `El estudiante ${formData.name} ha sido ${editingStudent ? "actualizado" : "registrado"} exitosamente.`,
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al guardar el estudiante. Intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{editingStudent ? "Editar Estudiante" : "Registrar Nuevo Estudiante"}</CardTitle>
              <CardDescription>
                Completa la información del estudiante para {editingStudent ? "actualizar" : "crear"} el registro
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  <User className="inline h-4 w-4 mr-1" />
                  Nombre Completo
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="ej. Juan Pérez García"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Institucional
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="estudiante@uleam.edu.ec"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">
                  <GraduationCap className="inline h-4 w-4 mr-1" />
                  ID de Estudiante
                </Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleChange("studentId", e.target.value)}
                  placeholder="2024-001"
                  className={errors.studentId ? "border-red-500" : ""}
                />
                {errors.studentId && <p className="text-sm text-red-500">{errors.studentId}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">Semestre</Label>
                <Select value={formData.semester} onValueChange={(value) => handleChange("semester", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}° Semestre
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input
                  id="gpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.gpa}
                  onChange={(e) => handleChange("gpa", e.target.value)}
                  placeholder="8.5"
                  className={errors.gpa ? "border-red-500" : ""}
                />
                {errors.gpa && <p className="text-sm text-red-500">{errors.gpa}</p>}
              </div>
            </div>

            {/* Specialty and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad</Label>
                <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Odontología General">Odontología General</SelectItem>
                    <SelectItem value="Cirugía Oral">Cirugía Oral</SelectItem>
                    <SelectItem value="Ortodoncia">Ortodoncia</SelectItem>
                    <SelectItem value="Endodoncia">Endodoncia</SelectItem>
                    <SelectItem value="Periodoncia">Periodoncia</SelectItem>
                    <SelectItem value="Odontopediatría">Odontopediatría</SelectItem>
                  </SelectContent>
                </Select>
                {errors.specialty && <p className="text-sm text-red-500">{errors.specialty}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                    <SelectItem value="graduated">Graduado</SelectItem>
                    <SelectItem value="suspended">Suspendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">{editingStudent ? "Actualizar Estudiante" : "Registrar Estudiante"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
