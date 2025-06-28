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
      notes: "Tratamiento de conducto en molar superior derecho",
      priority: "medium",
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
      notes: "Evaluación para brackets",
      priority: "low",
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
      notes: "Extracción de muela del juicio",
      priority: "high",
      status: "programada",
      createdAt: "2024-12-28T12:00:00Z",
      studentName: "Pedro Antonio Silva Castro",
      specialty: "Cirugía Oral y Maxilofacial",
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

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByDate,
        getAppointmentsByStudent,
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
