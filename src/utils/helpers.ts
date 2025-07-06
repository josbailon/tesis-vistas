/**
 * FUNCIONES AUXILIARES DE LA APLICACIÓN
 *
 * Conjunto de utilidades reutilizables para operaciones comunes
 * en toda la aplicación
 */

import { format, parseISO, isValid } from "date-fns"
import { es } from "date-fns/locale"
import type { UserRole, MedicalSpecialty, AppointmentStatus } from "@/types"
import { SPECIALTY_LABELS, APPOINTMENT_STATUS_LABELS, VALIDATION_RULES, DATE_CONFIG } from "./constants"

/**
 * UTILIDADES DE FORMATEO
 */

/**
 * Formatea una fecha según el formato especificado
 */
export const formatDate = (date: string | Date, formatStr: string = DATE_CONFIG.DEFAULT_FORMAT): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date
    if (!isValid(dateObj)) return "Fecha inválida"
    return format(dateObj, formatStr, { locale: es })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Fecha inválida"
  }
}

/**
 * Formatea una fecha y hora
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, DATE_CONFIG.DATETIME_FORMAT)
}

/**
 * Formatea solo la hora
 */
export const formatTime = (date: string | Date): string => {
  return formatDate(date, DATE_CONFIG.TIME_FORMAT)
}

/**
 * Obtiene el nombre legible de un rol de usuario
 */
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    patient: "Paciente",
    student: "Estudiante",
    professor: "Profesor",
    admin: "Administrador",
  }
  return roleNames[role] || "Usuario"
}

/**
 * Obtiene el nombre legible de una especialidad
 */
export const getSpecialtyDisplayName = (specialty: MedicalSpecialty): string => {
  return SPECIALTY_LABELS[specialty] || specialty
}

/**
 * Obtiene el nombre legible de un estado de cita
 */
export const getAppointmentStatusDisplayName = (status: AppointmentStatus): string => {
  return APPOINTMENT_STATUS_LABELS[status] || status
}

/**
 * UTILIDADES DE VALIDACIÓN
 */

/**
 * Valida un email
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_PATTERN.test(email.trim())
}

/**
 * Valida un teléfono
 */
export const isValidPhone = (phone: string): boolean => {
  return VALIDATION_RULES.PHONE_PATTERN.test(phone.replace(/\D/g, ""))
}

/**
 * Valida una contraseña
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH
}

/**
 * Valida un nombre
 */
export const isValidName = (name: string): boolean => {
  const trimmedName = name.trim()
  return (
    trimmedName.length >= VALIDATION_RULES.NAME_MIN_LENGTH && trimmedName.length <= VALIDATION_RULES.NAME_MAX_LENGTH
  )
}

/**
 * UTILIDADES DE TEXTO
 */

/**
 * Capitaliza la primera letra de una cadena
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Convierte texto a formato título
 */
export const toTitleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

/**
 * Trunca texto a una longitud específica
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

/**
 * Genera iniciales de un nombre
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("")
}

/**
 * UTILIDADES DE ARRAYS Y OBJETOS
 */

/**
 * Elimina elementos duplicados de un array
 */
export const removeDuplicates = <T>(array: T[]): T[] => {\
  return [...new Set(array)]
}

/**
 * Agrupa elementos de un array por una propiedad
 */\
export const groupBy = <T, K extends keyof T>(
  array: T[], 
  key: K\
): Record<string, T[]> => {\
  return array.reduce((groups, item) => {\
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)\
}\
\
/**
 * Ordena un array de objetos por una propiedad
 */
export const sortBy = <T>(
  array: T[], 
  key: keyof T, 
  order: 'asc' | 'desc' = 'asc'
): T[] => {\
  return [...array].sort((a, b) => {\
    const aVal = a[key]
    const bVal = b[key]
    \
    if (aVal < bVal) return order === 'asc\' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * UTILIDADES DE COLORES
 */

/**
 * Obtiene la clase CSS de color para un rol
 */
export const getRoleColorClass = (role: UserRole): string => {\
  const colorClasses: Record<UserRole, string> = {
    patient: \'bg-blue-100 text-blue-700 border-blue-300',
    student: 'bg-green-100 text-green-700 border-green-300',
    professor: 'bg-purple-100 text-purple-700 border-purple-300',
    admin: 'bg-red-100 text-red-700 border-red-300'
  }
  return colorClasses[role] || 'bg-gray-100 text-gray-700 border-gray-300'
}

/**
 * Obtiene la clase CSS de color para un estado de cita
 */
export const getAppointmentStatusColorClass = (status: AppointmentStatus): string => {\
  const colorClasses: Record<AppointmentStatus, string> = {
    scheduled: \'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    completed: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
    'no-show': 'bg-gray-100 text-gray-700'
  }
  return colorClasses[status] || 'bg-gray-100 text-gray-700'
}

/**
 * UTILIDADES DE TIEMPO
 */

/**
 * Calcula la diferencia en minutos entre dos fechas
 */
export const getMinutesDifference = (date1: string | Date, date2: string | Date): number => {
  try {\
    const d1 = typeof date1 === 'string' ? parseISO(date1) : date1
    const d2 = typeof date2 === 'string' ? parseISO(date2) : date2
    return differenceInMinutes(d2, d1)
  } catch (error) {
    console.error('Error calculating time difference:', error)
    return 0\
  }
}

/**
 * Verifica si una fecha está en el pasado
 */
export const isPastDate = (date: string | Date): boolean => {
  try {\
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return dateObj < new Date()\
  } catch (error) {\
    return false
  }
}

/**
 * Obtiene el tiempo relativo (ej: "hace 2 horas")
 */
export const getRelativeTime = (date: string | Date): string => {
  try {\
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    const now = new Date()
    const diffInMinutes = differenceInMinutes(now, dateObj)
    \
    if (diffInMinutes < 1) return \'Ahora mismo'\
    if (diffInMinutes < 60) return \`Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`
    \
    const diffInHours = Math.floor(diffInMinutes / 60)\
    if (diffInHours < 24) return \`Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
    \
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`
    
    return formatDate(dateObj)
  } catch (error) {
    return 'Fecha inválida'
  }
}

/**
 * UTILIDADES DE ALMACENAMIENTO LOCAL
 */

/**
 * Guarda datos en localStorage de forma segura
 */
export const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

/**
 * Obtiene datos de localStorage de forma segura
 */
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue
  }
}

/**
 * Elimina datos de localStorage
 */
export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

/**
 * UTILIDADES DE DEBOUNCE Y THROTTLE
 */

/**
 * Función debounce para limitar la frecuencia de ejecución
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Función throttle para limitar la frecuencia de ejecución
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * UTILIDADES DE GENERACIÓN
 */

/**
 * Genera un ID único simple
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Genera un color aleatorio en formato hexadecimal
 */
export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

/**
 * UTILIDADES DE ARCHIVOS
 */

/**
 * Convierte bytes a formato legible
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Obtiene la extensión de un archivo
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * UTILIDADES DE URL
 */

/**
 * Construye una URL con parámetros de consulta
 */
export const buildUrl = (baseUrl: string, params: Record<string, any>): string => {
  const url = new URL(baseUrl, window.location.origin)
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.append(key, String(value))
    }
  })
  
  return url.toString()
}

/**
 * Extrae parámetros de consulta de una URL
 */
export const getUrlParams = (url: string = window.location.href): Record<string, string> => {
  const urlObj = new URL(url)
  const params: Record<string, string> = {}
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return params
}
