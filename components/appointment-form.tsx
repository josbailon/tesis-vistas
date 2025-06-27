"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface AppointmentFormProps {
  onSubmit?: (data: AppointmentFormData) => void
}

export interface AppointmentFormData {
  patientName: string
  email: string
  phone: string
  specialty: string
  preferredDate: string
  preferredTime: string
  notes: string
}

export function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const [formData, setFormData] = React.useState<AppointmentFormData>({
    patientName: "",
    email: "",
    phone: "",
    specialty: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Agendar Cita</CardTitle>
        <CardDescription>Complete el formulario para solicitar una cita en nuestra clínica dental.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Nombre Completo</Label>
              <Input
                id="patientName"
                type="text"
                placeholder="Ingrese su nombre completo"
                value={formData.patientName}
                onChange={(e) => handleInputChange("patientName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad</Label>
              <Select value={formData.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Odontología General</SelectItem>
                  <SelectItem value="endodoncia">Endodoncia</SelectItem>
                  <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                  <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                  <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Fecha Preferida</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredTime">Hora Preferida</Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => handleInputChange("preferredTime", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una hora" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="08:00">08:00 AM</SelectItem>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                  <SelectItem value="17:00">05:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Describa cualquier síntoma o información adicional relevante..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              Solicitar Cita
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setFormData({
                  patientName: "",
                  email: "",
                  phone: "",
                  specialty: "",
                  preferredDate: "",
                  preferredTime: "",
                  notes: "",
                })
              }
            >
              Limpiar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
