"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, Clock, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppointments } from "@/contexts/appointment-context"
import { useToast } from "@/hooks/use-toast"

interface AppointmentFormProps {
  onClose: () => void
  onSuccess: () => void
  editingAppointment?: any
}

export function AppointmentForm({ onClose, onSuccess, editingAppointment }: AppointmentFormProps) {
  const { addAppointment, updateAppointment } = useAppointments()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: editingAppointment?.title || "",
    patientName: editingAppointment?.patientName || "",
    date: editingAppointment?.date || "",
    time: editingAppointment?.time || "",
    duration: editingAppointment?.duration || "30",
    type: editingAppointment?.type || "consultation",
    notes: editingAppointment?.notes || "",
    priority: editingAppointment?.priority || "medium",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"

    // Check if date is in the past
    const selectedDate = new Date(`${formData.date}T${formData.time}`)
    if (selectedDate < new Date()) {
      newErrors.date = "Cannot schedule appointments in the past"
    }

    // Check for weekend restrictions (optional)
    const dayOfWeek = selectedDate.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      newErrors.date = "Appointments cannot be scheduled on weekends"
    }

    // Check business hours (9 AM to 6 PM)
    const hour = selectedDate.getHours()
    if (hour < 9 || hour >= 18) {
      newErrors.time = "Appointments must be between 9:00 AM and 6:00 PM"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const appointmentData = {
      ...formData,
      id: editingAppointment?.id || Date.now().toString(),
      status: editingAppointment?.status || "scheduled",
      createdAt: editingAppointment?.createdAt || new Date().toISOString(),
    }

    try {
      if (editingAppointment) {
        updateAppointment(appointmentData)
        toast({
          title: "Appointment Updated",
          description: "The appointment has been successfully updated.",
        })
      } else {
        addAppointment(appointmentData)
        toast({
          title: "Appointment Created",
          description: "The appointment has been successfully scheduled.",
        })
      }
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save appointment. Please try again.",
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
              <CardTitle>{editingAppointment ? "Edit Appointment" : "Schedule New Appointment"}</CardTitle>
              <CardDescription>
                Fill in the details to {editingAppointment ? "update" : "create"} an appointment
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
                <Label htmlFor="title">
                  <FileText className="inline h-4 w-4 mr-1" />
                  Appointment Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Regular Checkup"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="patientName">
                  <User className="inline h-4 w-4 mr-1" />
                  Patient Name
                </Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => handleChange("patientName", e.target.value)}
                  placeholder="Enter patient name"
                  className={errors.patientName ? "border-red-500" : ""}
                />
                {errors.patientName && <p className="text-sm text-red-500">{errors.patientName}</p>}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className={errors.date ? "border-red-500" : ""}
                />
                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  min="09:00"
                  max="18:00"
                  className={errors.time ? "border-red-500" : ""}
                />
                {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Type and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="checkup">Regular Checkup</SelectItem>
                    <SelectItem value="treatment">Treatment</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Additional notes or special instructions..."
                rows={3}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{editingAppointment ? "Update Appointment" : "Schedule Appointment"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
