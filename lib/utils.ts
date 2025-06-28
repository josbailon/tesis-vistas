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

export function getSpecialtyColor(specialty: string): string {
  const colors: Record<string, string> = {
    endodoncia: "specialty-endodoncia",
    ortodoncia: "specialty-ortodoncia",
    cirugia: "specialty-cirugia",
    odontopediatria: "specialty-odontopediatria",
    periodoncia: "specialty-periodoncia",
    protesis: "specialty-protesis",
  }
  return colors[specialty.toLowerCase()] || "bg-gray-100 text-gray-800"
}

export function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    admin: "role-admin",
    profesor: "role-profesor",
    estudiante: "role-estudiante",
    paciente: "role-paciente",
    secretario: "role-secretario",
  }
  return colors[role.toLowerCase()] || "bg-gray-100 text-gray-800"
}

export function generatePDF(data: any, filename: string): void {
  // Función para generar PDFs - implementar con jsPDF o similar
  console.log("Generando PDF:", filename, data)
}
