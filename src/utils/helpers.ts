/**
 * Email validation using regex
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Password validation - at least 6 characters
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

/**
 * Phone validation for Ecuador format
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+593|0)[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

/**
 * Format phone number to Ecuador standard
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.startsWith("593")) {
    return `+${cleaned}`
  } else if (cleaned.startsWith("0")) {
    return `+593${cleaned.substring(1)}`
  }
  return `+593${cleaned}`
}

/**
 * Format date to DD/MM/YYYY
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  const day = d.getDate().toString().padStart(2, "0")
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Format time to HH:MM
 */
export const formatTime = (time: string | Date): string => {
  const d = new Date(time)
  const hours = d.getHours().toString().padStart(2, "0")
  const minutes = d.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

/**
 * Format datetime to DD/MM/YYYY HH:MM
 */
export const formatDateTime = (datetime: string | Date): string => {
  return `${formatDate(datetime)} ${formatTime(datetime)}`
}

/**
 * Get relative time (e.g., "hace 2 horas")
 */
export const getRelativeTime = (date: string | Date): string => {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "hace unos segundos"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `hace ${hours} hora${hours > 1 ? "s" : ""}`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `hace ${days} día${days > 1 ? "s" : ""}`
  } else {
    return formatDate(date)
  }
}

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (text: string): string => {
  return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

/**
 * Generate initials from full name
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {\
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {\
    const clonedObj = {} as { [key: string]: any }
    for (const key in obj) {\
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj as T
  }
  return obj
}

/**
 * Check if object is empty
 */
export const isEmpty = (obj: any): boolean => {\
  if (obj == null) return true
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {\
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Get file extension
 */
export const getFileExtension = (filename: string): string => {\
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * Check if file is image
 */
export const isImageFile = (filename: string): boolean => {\
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  const extension = getFileExtension(filename).toLowerCase()
  return imageExtensions.includes(extension)
}

/**
 * Generate color from string (for avatars)
 */
export const stringToColor = (str: string): string => {\
  let hash = 0\
  for (let i = 0; i < str.length; i++) {\
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = hash % 360
  return `hsl(${hue}, 70%, 50%)`
}

/**
 * Format currency (USD)
 */
export const formatCurrency = (amount: number): string => {\
  return new Intl.NumberFormat('en-US', {\
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

/**
 * Calculate age from birth date
 */
export const calculateAge = (birthDate: string | Date): number => {\
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  \
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {\
    age--
  }
  
  return age
}

/**
 * Get appointment status color
 */
export const getAppointmentStatusColor = (status: string): string => {\
  const colors: Record<string, string> = {\
    scheduled: '#3B82F6',
    confirmed: '#10B981',
    'in-progress': '#F59E0B',
    completed: '#10B981',
    cancelled: '#EF4444',
    'no-show': '#6B7280'
  }
  return colors[status] || '#6B7280'
}

/**
 * Get user role color
 */
export const getUserRoleColor = (role: string): string => {\
  const colors: Record<string, string> = {\
    admin: '#EF4444',
    profesor: '#8B5CF6',
    estudiante: '#10B981',
    paciente: '#3B82F6',
    secretario: '#6366F1'
  }
  return colors[role] || '#6B7280'
}

/**
 * Validate CEDULA (Ecuador ID)
 */
export const validateCedula = (cedula: string): boolean => {\
  if (cedula.length !== 10) return false
  
  const digits = cedula.split('').map(Number)
  const province = parseInt(cedula.substring(0, 2))
  \
  if (province < 1 || province > 24) return false
  
  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2]
  let sum = 0
  \
  for (let i = 0; i < 9; i++) {\
    let result = digits[i] * coefficients[i]
    if (result > 9) result -= 9
    sum += result
  }
  
  const checkDigit = sum % 10 === 0 ? 0 : 10 - (sum % 10)
  return checkDigit === digits[9]
}

/**
 * Format CEDULA with dashes
 */
export const formatCedula = (cedula: string): string => {\
  if (cedula.length !== 10) return cedula
  return `${cedula.substring(0, 2)}-${cedula.substring(2, 9)}-${cedula.substring(9)}`
}

/**
 * Search filter function
 */
export const searchFilter = <T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {\
  if (!searchTerm.trim()) return items
  
  const term = searchTerm.toLowerCase()
  return items.filter(item =>
    searchFields.some(field => {\
      const value = item[field]
      return value && value.toString().toLowerCase().includes(term)
    })
  )
}

/**
 * Sort array by field
 */
export const sortBy = <T>(
  items: T[],
  field: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {\
  return [...items].sort((a, b) => {\
    const aVal = a[field]
    const bVal = b[field]
    \
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Group array by field
 */
export const groupBy = <T>(
  items: T[],
  field: keyof T\
): Record<string, T[]> => {
  return items.reduce((groups, item) => {
    const key = String(item[field])
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Get next appointment for user
 */
export const getNextAppointment = (appointments: Appointment[]): Appointment | null => {
  const now = new Date()
  const upcoming = appointments
    .filter(apt => new Date(`${apt.date} ${apt.time}`) > now)
    .sort((a, b) => new Date(`${a.date} ${a.time}`).getTime() - new Date(`${b.date} ${b.time}`).getTime())
  
  return upcoming[0] || null
}

/**
 * Check if appointment is today
 */
export const isAppointmentToday = (appointment: Appointment): boolean => {
  const today = new Date()
  const appointmentDate = new Date(appointment.date)
  
  return today.toDateString() === appointmentDate.toDateString()
}

/**
 * Get appointment duration in minutes
 */
export const getAppointmentDuration = (appointment: Appointment): number => {
  return appointment.duration || 60 // Default 60 minutes
}

/**
 * Check if user can access route
 */
export const canAccessRoute = (user: User | null, allowedRoles: string[]): boolean => {
  if (!user) return false
  return allowedRoles.includes(user.role)
}

/**
 * Get greeting based on time of day
 */
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours()
  
  if (hour < 12) return 'Buenos días'
  if (hour < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

/**
 * Mask sensitive information
 */
export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@')
  const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
  return `${maskedUsername}@${domain}`
}

/**
 * Mask phone number
 */
export const maskPhone = (phone: string): string => {
  if (phone.length < 4) return phone
  return phone.substring(0, 3) + '*'.repeat(phone.length - 6) + phone.substring(phone.length - 3)
}

/**
 * Generate random password
 */
export const generatePassword = (length: number = 12): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return password
}

/**
 * Check password strength
 */
export const checkPasswordStrength = (password: string): {
  score: number
  feedback: string[]
} => {
  const feedback: string[] = []
  let score = 0
  
  if (password.length >= 8) score += 1
  else feedback.push('Debe tener al menos 8 caracteres')
  
  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Debe incluir letras minúsculas')
  
  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Debe incluir letras mayúsculas')
  
  if (/\d/.test(password)) score += 1
  else feedback.push('Debe incluir números')
  
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1
  else feedback.push('Debe incluir caracteres especiales')
  
  return { score, feedback }
}
