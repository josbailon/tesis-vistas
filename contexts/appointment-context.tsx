"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Appointment {
  id: string
  title: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientCedula: string
  date: string
  time: string
  duration: string
  type: string
  notes: string
  priority: string
  status: "programada" | "confirmada" | "en_progreso" | "completada" | "cancelada"
  createdAt: string
  studentName: string
  specialty: string
}

interface AppointmentContextType {
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void
  deleteAppointment: (id: string) => void
  getAppointmentsByDate: (date: string) => Appointment[]
  getAppointmentsByStudent: (studentName: string) => Appointment[]
  getAppointmentsByStatus: (status: string) => Appointment[]
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Endodoncia - María González",
      patientName: "María González Pérez",
      patientPhone: "+593 99 123 4567",
      patientEmail: "maria.gonzalez@email.com",
      patientCedula: "1234567890",
      date: "2024-12-30",
      time: "09:00",
      duration: "90",
      type: "tratamiento",
      notes: "Tratamiento de conducto en molar superior derecho. Paciente presenta dolor severo.",
      priority: "high",
      status: "programada",
      createdAt: "2024-12-28T10:00:00Z",
      studentName: "Juan Carlos Pérez Mendoza",
      specialty: "Endodoncia",
    },
    {
      id: "2",
      title: "Ortodoncia - Carlos Ruiz",
      patientName: "Carlos Ruiz Mendoza",
      patientPhone: "+593 99 234 5678",
      patientEmail: "carlos.ruiz@email.com",
      patientCedula: "2345678901",
      date: "2024-12-30",
      time: "14:30",
      duration: "60",
      type: "consulta",
      notes: "Evaluación inicial para colocación de brackets. Primera consulta ortodóntica.",
      priority: "medium",
      status: "confirmada",
      createdAt: "2024-12-28T11:00:00Z",
      studentName: "Ana María López Silva",
      specialty: "Ortodoncia",
    },
    {
      id: "3",
      title: "Cirugía - Laura Martínez",
      patientName: "Laura Martínez Silva",
      patientPhone: "+593 99 345 6789",
      patientEmail: "laura.martinez@email.com",
      patientCedula: "3456789012",
      date: "2024-12-31",
      time: "08:00",
      duration: "120",
      type: "cirugia",
      notes: "Extracción quirúrgica de tercer molar inferior izquierdo impactado.",
      priority: "high",
      status: "programada",
      createdAt: "2024-12-28T12:00:00Z",
      studentName: "Pedro Antonio Silva Castro",
      specialty: "Cirugía Oral y Maxilofacial",
    },
    {
      id: "4",
      title: "Periodoncia - Roberto Díaz",
      patientName: "Roberto Díaz Castro",
      patientPhone: "+593 99 456 7890",
      patientEmail: "roberto.diaz@email.com",
      patientCedula: "4567890123",
      date: "2024-12-31",
      time: "10:00",
      duration: "75",
      type: "tratamiento",
      notes: "Raspado y alisado radicular. Paciente con periodontitis crónica.",
      priority: "medium",
      status: "programada",
      createdAt: "2024-12-28T13:00:00Z",
      studentName: "Carmen Elena Torres Vera",
      specialty: "Periodoncia",
    },
    {
      id: "5",
      title: "Odontopediatría - Sofía Herrera",
      patientName: "Sofía Herrera Alava",
      patientPhone: "+593 99 567 8901",
      patientEmail: "sofia.herrera@email.com",
      patientCedula: "5678901234",
      date: "2025-01-02",
      time: "09:30",
      duration: "45",
      type: "consulta",
      notes: "Control dental pediátrico. Paciente de 8 años, primera visita.",
      priority: "low",
      status: "programada",
      createdAt: "2024-12-28T14:00:00Z",
      studentName: "Luis Fernando Morales Ponce",
      specialty: "Odontopediatría",
    },
  ])

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }

  const updateAppointment = (id: string, updatedAppointment: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((appointment) => (appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment)),
    )
  }

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
  }

  const getAppointmentsByDate = (date: string) => {
    return appointments.filter((appointment) => appointment.date === date)
  }

  const getAppointmentsByStudent = (studentName: string) => {
    return appointments.filter((appointment) => appointment.studentName === studentName)
  }

  const getAppointmentsByStatus = (status: string) => {
    return appointments.filter((appointment) => appointment.status === status)
  }

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByDate,
        getAppointmentsByStudent,
        getAppointmentsByStatus,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider")
  }
  return context
}
