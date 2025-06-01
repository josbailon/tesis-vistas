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
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  createdAt: string
}

interface AppointmentContextType {
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  updateAppointment: (appointment: Appointment) => void
  deleteAppointment: (id: string) => void
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void
  getSystemStatus: () => "available" | "pending" | "unavailable"
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

// Mock initial data
const initialAppointments: Appointment[] = [
  {
    id: "1",
    title: "Regular Checkup",
    patientName: "John Doe",
    date: "2024-12-28",
    time: "09:00",
    duration: "30",
    type: "checkup",
    notes: "Annual health checkup",
    priority: "medium",
    status: "scheduled",
    createdAt: "2024-12-27T10:00:00Z",
  },
  {
    id: "2",
    title: "Emergency Consultation",
    patientName: "Jane Smith",
    date: "2024-12-28",
    time: "14:30",
    duration: "45",
    type: "emergency",
    notes: "Urgent chest pain evaluation",
    priority: "urgent",
    status: "confirmed",
    createdAt: "2024-12-27T11:30:00Z",
  },
  {
    id: "3",
    title: "Follow-up Visit",
    patientName: "Bob Johnson",
    date: "2024-12-29",
    time: "10:15",
    duration: "30",
    type: "followup",
    notes: "Post-surgery follow-up",
    priority: "high",
    status: "scheduled",
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

  const getSystemStatus = (): "available" | "pending" | "unavailable" => {
    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const currentTime = now.getHours() * 60 + now.getMinutes()

    const todayAppointments = appointments.filter((apt) => apt.date === today)

    // Check for urgent appointments
    const urgentAppointments = todayAppointments.filter(
      (apt) => apt.priority === "urgent" && apt.status !== "completed" && apt.status !== "cancelled",
    )

    if (urgentAppointments.length > 0) return "unavailable"

    // Check for upcoming appointments in next 30 minutes
    const upcomingAppointments = todayAppointments.filter((apt) => {
      const [hours, minutes] = apt.time.split(":").map(Number)
      const appointmentTime = hours * 60 + minutes
      return appointmentTime >= currentTime && appointmentTime <= currentTime + 30
    })

    if (upcomingAppointments.length > 0) return "pending"

    return "available"
  }

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        updateAppointmentStatus,
        getSystemStatus,
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
