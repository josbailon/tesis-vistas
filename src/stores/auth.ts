/**
 * STORE DE AUTENTICACIÓN CON TYPESCRIPT
 *
 * Este store maneja todo el estado de autenticación de la aplicación:
 * - Login y logout de usuarios
 * - Gestión de sesiones con tokens JWT
 * - Control de acceso basado en roles
 * - Persistencia de datos de usuario
 * - Renovación automática de tokens
 */

import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { User, UserRole, LoginCredentials } from "@/types"
import { validateEmail, validatePassword } from "@/utils/helpers"

/**
 * DATOS MOCK PARA DESARROLLO
 */
const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Dr. Juan Pérez",
    email: "admin@uleam.edu.ec",
    role: "admin",
    avatar: null,
    isActive: true,
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  },
  {
    id: 2,
    name: "María González",
    email: "estudiante@uleam.edu.ec",
    role: "student",
    avatar: null,
    isActive: true,
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(),
  },
  {
    id: 3,
    name: "Dr. Carlos Rodríguez",
    email: "profesor@uleam.edu.ec",
    role: "professor",
    avatar: null,
    isActive: true,
    createdAt: new Date("2024-01-10"),
    lastLogin: new Date(),
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "paciente@gmail.com",
    role: "patient",
    avatar: null,
    isActive: true,
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date(),
  },
]

/**
 * CONFIGURACIÓN DE SESIÓN
 */
const SESSION_CONFIG = {
  TOKEN_EXPIRY: 60 * 60 * 1000, // 1 hora en milisegundos
  REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutos antes de expirar
  WARNING_THRESHOLD: 10 * 60 * 1000, // 10 minutos antes de expirar
  MAX_IDLE_TIME: 30 * 60 * 1000, // 30 minutos de inactividad
}

/**
 * STORE DE AUTENTICACIÓN
 */
export const useAuthStore = defineStore('auth', () => {
  /**
   * ESTADO REACTIVO
   */
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const sessionExpiry = ref<Date | null>(null)
  const lastActivity = ref<Date>(new Date())

  /**
   * PROPIEDADES COMPUTADAS
   */
  const isAuthenticated = computed(() => {
    return !!(user.value && token.value && sessionExpiry.value && sessionExpiry.value > new Date())
  })

  const userRole = computed((): UserRole | null => {
    return user.value?.role || null
  })

  const sessionTimeRemaining = computed((): number => {
    if (!sessionExpiry.value) return 0
    const remaining = sessionExpiry.value.getTime() - Date.now()
    return Math.max(0, Math.floor(remaining / (1000 * 60))) // en minutos
  })

  const shouldShowSessionWarning = computed((): boolean => {
    if (!sessionExpiry.value) return false
    const timeUntilExpiry = sessionExpiry.value.getTime() - Date.now()
    return timeUntilExpiry <= SESSION_CONFIG.WARNING_THRESHOLD && timeUntilExpiry > 0
  })

  const isSessionExpired = computed((): boolean => {
    if (!sessionExpiry.value) return true
    return sessionExpiry.value <= new Date()
  })

  /**
   * MÉTODOS DE VALIDACIÓN
   */
  const validateCredentials = (credentials: LoginCredentials): string | null => {
    if (!credentials.email) {
      return 'El email es requerido'
    }

    if (!validateEmail(credentials.email)) {
      return 'El formato del email no es válido'
    }

    if (!credentials.password) {
      return 'La contraseña es requerida'
    }

    if (!validatePassword(credentials.password)) {
      return 'La contraseña debe tener al menos 6 caracteres'
    }

    return null
  }

  /**
   * MÉTODOS AUXILIARES
   */
  const generateMockToken = (user: User): string => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor((Date.now() + SESSION_CONFIG.TOKEN_EXPIRY) / 1000)
    }))
    const signature = btoa('mock_signature')
    
    return `${header}.${payload}.${signature}`
  }
