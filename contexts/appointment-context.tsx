"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Appointment {
  id: string
  title: string
  patientName: string
  date: string
  time: string
  duration: string
  type: string
  notes: string
  priority: string
  status: "programada" | "confirmada" | "completada" | "cancelada" | "no-asistio"
  createdAt: string
}

interface AppointmentContextType {
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  updateAppointment: (appointment: Appointment) => void
  deleteAppointment: (id: string) => void
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

// Mock initial data
const initialAppointments: Appointment[] = [
  {
    id: "1",
    title: "Consulta General",
    patientName: "Juan Pérez",
    date: "2024-12-28",
    time: "09:00",
    duration: "30",
    type: "checkup",
    notes: "Revisión anual de salud dental",
    priority: "medium",
    status: "programada",
    createdAt: "2024-12-27T10:00:00Z",
  },
  {
    id: "2",
    title: "Consulta de Emergencia",
    patientName: "María García",
    date: "2024-12-28",
    time: "14:30",
    duration: "45",
    type: "emergency",
    notes: "Dolor severo en muela del juicio",
    priority: "urgent",
    status: "confirmada",
    createdAt: "2024-12-27T11:30:00Z",
  },
  {
    id: "3",
    title: "Limpieza Dental",
    patientName: "Carlos López",
    date: "2024-12-29",
    time: "10:15",
    duration: "60",
    type: "treatment",
    notes: "Limpieza profunda y fluorización",
    priority: "low",
    status: "programada",
    createdAt: "2024-12-27T09:15:00Z",
  },
]

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }

  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === updatedAppointment.id ? updatedAppointment : apt)))
  }

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id))
  }

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status } : apt)))
  }

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        updateAppointmentStatus,
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
