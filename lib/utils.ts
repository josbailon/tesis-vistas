import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`
}

export function getRoleColor(role: string): string {
  switch (role.toLowerCase()) {
    case "admin":
    case "administrator":
      return "bg-role-admin"
    case "profesor":
    case "teacher":
      return "bg-role-profesor"
    case "estudiante":
    case "student":
      return "bg-role-estudiante"
    case "paciente":
    case "patient":
      return "bg-role-paciente"
    case "secretario":
    case "secretary":
      return "bg-role-secretario"
    default:
      return "bg-secondary"
  }
}

export function getSpecialtyColor(specialty: string): string {
  switch (specialty.toLowerCase()) {
    case "endodoncia":
      return "bg-specialty-endodoncia"
    case "ortodoncia":
      return "bg-specialty-ortodoncia"
    case "cirugía oral":
    case "cirugia":
      return "bg-specialty-cirugia"
    case "odontopediatría":
    case "odontopediatria":
      return "bg-specialty-odontopediatria"
    case "periodoncia":
      return "bg-specialty-periodoncia"
    case "prótesis":
    case "protesis":
      return "bg-specialty-protesis"
    default:
      return "bg-accent"
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "activo":
    case "completed":
    case "completado":
      return "bg-status-active"
    case "inactive":
    case "inactivo":
      return "bg-status-inactive"
    case "pending":
    case "pendiente":
      return "bg-status-pending"
    case "cancelled":
    case "cancelado":
      return "bg-status-cancelled"
    default:
      return "bg-secondary"
  }
}
