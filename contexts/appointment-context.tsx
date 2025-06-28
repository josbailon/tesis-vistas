"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Appointment {
  id: string
  title: string
  patientName: string
  patientPhone?: string
  patientEmail?: string
  patientCedula?: string
  date: string
  time: string
  duration: string
  type: string
  notes?: string
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
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    // Load appointments from localStorage
    const stored = localStorage.getItem("appointments")
    if (stored) {
      try {
        setAppointments(JSON.parse(stored))
      } catch (error) {
        console.error("Error loading appointments:", error)
      }
    }
  }, [])

  useEffect(() => {
    // Save appointments to localStorage
    localStorage.setItem("appointments", JSON.stringify(appointments))
  }, [appointments])

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }

  const updateAppointment = (id: string, updatedAppointment: Partial<Appointment>) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, ...updatedAppointment } : apt)))
  }

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id))
  }

  const getAppointmentsByDate = (date: string) => {
    return appointments.filter((apt) => apt.date === date)
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
