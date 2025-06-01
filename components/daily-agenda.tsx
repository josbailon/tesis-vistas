"use client"

import { useState } from "react"
import type { Appointment } from "@/contexts/appointment-context"

interface DailyAgendaProps {
  appointments: Appointment[]
}

export function DailyAgenda({ appointments }: DailyAgendaProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Filtrar citas para la fecha seleccionada
  const appointmentsForDay = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date)
    return (
      appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear()
    )
  })

  // Generar horas del día (8:00 AM - 6:00 PM)
  const timeSlots = []
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0")
      const formattedMinute = minute.toString().padStart(2, "0")
      timeSlots.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  // Función para obtener citas en un horario específico
  const getAppointmentsForTimeSlot = (timeSlot: string) => {
    return appointmentsForDay.filter((appointment) => appointment.time === timeSlot)
  }

  // Función para obtener el color de la insignia según el estado
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "confirmed":
        return "bg-\
