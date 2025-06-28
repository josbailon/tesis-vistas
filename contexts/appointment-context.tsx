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
  status: "programada" | "confirmada" | "completada" | "cancelada"
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
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Endodoncia - María González",
      patientName: "María González",
      patientPhone: "+593 99 123 4567",
      patientEmail: "maria@email.com",
      patientCedula: "1234567890",
      date: "2024-12-30",
      time: "09:00",
      duration: "90",
      type: "tratamiento",
      notes: "Primera sesión de endodoncia",
      priority: "medium",
      status: "programada",
      createdAt: "2024-12-28T10:00:00Z",
      studentName: "Juan Pérez",
      specialty: "Endodoncia",
    },
    {
      id: "2",
      title: "Ortodoncia - Carlos Ruiz",
      patientName: "Carlos Ruiz",
      patientPhone: "+593 99 234 5678",
      patientEmail: "carlos@email.com",
      patientCedula: "2345678901",
      date: "2024-12-30",
      time: "14:30",
      duration: "60",
      type: "consulta",
      notes: "Control mensual de brackets",
      priority: "low",
      status: "confirmada",
      createdAt: "2024-12-28T11:00:00Z",
      studentName: "Ana López",
      specialty: "Ortodoncia",
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

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByDate,
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
