import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSpecialtyColor(specialty: string): string {
  const colors: Record<string, string> = {
    endodoncia: "bg-purple-100 text-purple-800 border-purple-200",
    ortodoncia: "bg-blue-100 text-blue-800 border-blue-200",
    cirugia: "bg-red-100 text-red-800 border-red-200",
    odontopediatria: "bg-orange-100 text-orange-800 border-orange-200",
    periodoncia: "bg-green-100 text-green-800 border-green-200",
    protesis: "bg-teal-100 text-teal-800 border-teal-200",
  }
  return colors[specialty] || "bg-gray-100 text-gray-800 border-gray-200"
}

export function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    admin: "bg-red-50 text-red-700 border-red-200",
    profesor: "bg-purple-50 text-purple-700 border-purple-200",
    estudiante: "bg-blue-50 text-blue-700 border-blue-200",
    paciente: "bg-green-50 text-green-700 border-green-200",
    secretario: "bg-teal-50 text-teal-700 border-teal-200",
  }
  return colors[role] || "bg-gray-50 text-gray-700 border-gray-200"
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
    scheduled: "bg-purple-100 text-purple-800",
  }
  return colors[status] || "bg-gray-100 text-gray-800"
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function calculateAge(birthDate: string | Date): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function exportToPDF(element: HTMLElement, filename: string): void {
  // This would integrate with a PDF library like jsPDF or Puppeteer
  console.log(`Exporting ${filename} to PDF...`)
  // Implementation would go here
}

export function downloadFile(data: any, filename: string, type: string): void {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
