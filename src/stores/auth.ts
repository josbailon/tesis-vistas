/**
 * STORE DE AUTENTICACIÓN CON PINIA Y TYPESCRIPT
 *
 * Este store maneja todo el estado relacionado con la autenticación:
 * - Usuario actual logueado con tipos seguros
 * - Estado de carga y errores
 * - Funciones de login/logout con validación
 * - Persistencia segura en localStorage
 * - Gestión de sesiones con timeout
 * - Control de acceso basado en roles
 */

import { defineStore } from "pinia"
import { ref, computed, watch } from "vue"
import type { User, LoginCredentials, AuthResponse, SessionConfig, UserRole } from "@/types"
import { AUTH_CONFIG, USER_ROLES, ROLE_PERMISSIONS, ERROR_MESSAGES } from "@/utils/constants"
import { setLocalStorage, getLocalStorage, removeLocalStorage, isValidEmail, isValidPassword } from "@/utils/helpers"

/**
 * USUARIOS DE PRUEBA PARA DEMOSTRACIÓN
 * En producción, estos datos vendrían de una API
 */
const TEST_USERS: (User & { password: string })[] = [
  {
    id: 1,
    email: "paciente@clinica.com",
    password: "demo123",
    name: "Ana López García",
    role: "patient",
    avatar: null,
    phone: "0987654321",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: null,
    isActive: true,
    dateOfBirth: "1990-05-15",
    address: "Av. Principal 123, Manta",
    emergencyContact: {
      name: "Carlos López",
      phone: "0976543210",
      relationship: "Esposo",
    },
    allergies: ["Penicilina"],
    currentMedications: [],
  },
  {
    id: 2,
    email: "estudiante@clinica.com",
    password: "demo123",
    name: "Juan Carlos Pérez Mendoza",
    role: "student",
    avatar: null,
    phone: "0976543210",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: null,
    isActive: true,
    studentId: "EST2024001",
    semester: 8,
    specialty: "endodoncia",
    academicRecord: {
      studentId: "EST2024001",
      semester: 8,
      courses: [],
      gpa: 8.5,
      totalCredits: 240,
      completedCredits: 200,
    },
  },
  {
    id: 3,
    email: "profesor@clinica.com",
    password: "demo123",
    name: "Dra. María Elena González Vásquez",
    role: "professor",
    avatar: null,
    phone: "0965432109",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: null,
    isActive: true,
    specialty: "endodoncia",
    experience: 15,
    license: "LIC-2009-001234",
    qualifications: ["Especialista en Endodoncia - Universidad Central", "Maestría en Ciencias Odontológicas - USFQ"],
  },
  {
    id: 4,
    email: "admin@clinica.com",
    password: "demo123",
    name: "Dr. Roberto Admin Sistemas",
    role: "admin",
    avatar: null,
    phone: "0954321098",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: null,
    isActive: true,
    permissions: ["full_access", "manage_users", "system_configuration"],
    department: "Administración",
  },
]

/**
 * DEFINICIÓN DEL STORE DE AUTENTICACIÓN
 */
export const useAuthStore = defineStore("auth", () => {
  /**
   * ESTADO REACTIVO
   */
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const sessionExpiry = ref<Date | null>(null)
  const sessionWarningShown = ref<boolean>(false)

  /**
   * CONFIGURACIÓN DE SESIÓN
   */
  const sessionConfig = ref<SessionConfig>({
    timeout: 30, // 30 minutos
    warningTime: 5, // 5 minutos antes de expirar
    maxInactivity: 15, // 15 minutos de inactividad
    rememberMeDuration: 7, // 7 días
  })

  /**
   * PROPIEDADES COMPUTADAS
   */
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  const userRole = computed(() => user.value?.role || null)

  const isPatient = computed(() => userRole.value === USER_ROLES.PATIENT)
  const isStudent = computed(() => userRole.value === USER_ROLES.STUDENT)
  const isProfessor = computed(() => userRole.value === USER_ROLES.PROFESSOR)
  const isAdmin = computed(() => userRole.value === USER_ROLES.ADMIN)

  const userPermissions = computed(() => {
    if (!userRole.value) return []
    return ROLE_PERMISSIONS[userRole.value] || []
  })

  const sessionTimeRemaining = computed(() => {
    if (!sessionExpiry.value) return 0
    const now = new Date()
    const remaining = sessionExpiry.value.getTime() - now.getTime()
    return Math.max(0, Math.floor(remaining / 1000 / 60)) // minutos restantes
  })

  const shouldShowSessionWarning = computed(() => {
    return (
      sessionTimeRemaining.value <= sessionConfig.value.warningTime &&
      sessionTimeRemaining.value > 0 &&
      !sessionWarningShown.value
    )
  })

  /**
   * WATCHERS PARA GESTIÓN DE SESIÓN
   */
  watch(shouldShowSessionWarning, (shouldShow) => {
    if (shouldShow) {
      sessionWarningShown.value = true
      // Aquí se podría mostrar una notificación de advertencia
      console.warn(`Sesión expirará en ${sessionTimeRemaining.value} minutos`)
    }
  })

  watch(sessionTimeRemaining, (remaining) => {
    if (remaining === 0 && isAuthenticated.value) {
      logout("Sesión expirada")
    }
  })

  /**
   * MÉTODOS PRIVADOS
   */
  const setSessionExpiry = (rememberMe = false) => {
    const now = new Date()
    const expiryTime = rememberMe
      ? sessionConfig.value.rememberMeDuration * 24 * 60 * 60 * 1000 // días a ms
      : sessionConfig.value.timeout * 60 * 1000 // minutos a ms

    sessionExpiry.value = new Date(now.getTime() + expiryTime)
  }

  const generateToken = (): string => {
    // En producción, esto vendría del servidor
    return "token_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  }

  const validateCredentials = (credentials: LoginCredentials): string | null => {
    if (!credentials.email || !credentials.password) {
      return "Email y contraseña son requeridos"
    }

    if (!isValidEmail(credentials.email)) {
      return "Email inválido"
    }

    if (!isValidPassword(credentials.password)) {
      return "Contraseña debe tener al menos 6 caracteres"
    }

    return null
  }

  const persistSession = (userData: User, authToken: string, rememberMe: boolean) => {
    try {
      setLocalStorage(AUTH_CONFIG.USER_KEY, userData)
      setLocalStorage(AUTH_CONFIG.TOKEN_KEY, authToken)

      if (rememberMe) {
        setLocalStorage("remember_me", true)
      }
    } catch (error) {
      console.error("Error persisting session:", error)
    }
  }

  const clearSession = () => {
    try {
      removeLocalStorage(AUTH_CONFIG.USER_KEY)
      removeLocalStorage(AUTH_CONFIG.TOKEN_KEY)
      removeLocalStorage("remember_me")
    } catch (error) {
      console.error("Error clearing session:", error)
    }
  }

  /**
   * MÉTODOS PÚBLICOS
   */

  /**
   * Inicializa la autenticación al cargar la aplicación
   */
  const initializeAuth = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const savedUser = getLocalStorage<User | null>(AUTH_CONFIG.USER_KEY, null)
      const savedToken = getLocalStorage<string | null>(AUTH_CONFIG.TOKEN_KEY, null)
      const rememberMe = getLocalStorage<boolean>("remember_me", false)

      if (savedUser && savedToken) {
        // Verificar si la sesión sigue siendo válida
        const isValidSession = await validateSession(savedToken)

        if (isValidSession) {
          user.value = savedUser
          token.value = savedToken
          setSessionExpiry(rememberMe)

          // Actualizar último login
          user.value.lastLogin = new Date().toISOString()
          persistSession(user.value, savedToken, rememberMe)

          console.log("Sesión restaurada para:", user.value.name)
        } else {
          clearSession()
          console.log("Sesión expirada, limpiando datos")
        }
      }
    } catch (error) {
      console.error("Error inicializando autenticación:", error)
      clearSession()
    } finally {
      loading.value = false
    }
  }

  /**
   * Valida si una sesión sigue siendo válida
   */
  const validateSession = async (authToken: string): Promise<boolean> => {
    try {
      // En producción, esto sería una llamada a la API
      // Por ahora, simulamos que todas las sesiones son válidas
      await new Promise((resolve) => setTimeout(resolve, 100))
      return true
    } catch (error) {
      console.error("Error validating session:", error)
      return false
    }
  }

  /**
   * Inicia sesión con credenciales
   */
  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      loading.value = true
      error.value = null
      sessionWarningShown.value = false

      // Validar credenciales
      const validationError = validateCredentials(credentials)
      if (validationError) {
        error.value = validationError
        return {
          success: false,
          message: validationError,
        }
      }

      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Buscar usuario en datos de prueba
      const foundUser = TEST_USERS.find(
        (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password,
      )

      if (!foundUser) {
        error.value = ERROR_MESSAGES.INVALID_CREDENTIALS
        return {
          success: false,
          message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        }
      }

      if (!foundUser.isActive) {
        error.value = "Cuenta desactivada. Contacta al administrador."
        return {
          success: false,
          message: "Cuenta desactivada. Contacta al administrador.",
        }
      }

      // Crear objeto de usuario sin contraseña
      const { password: _, ...userWithoutPassword } = foundUser
      const authToken = generateToken()

      // Actualizar último login
      userWithoutPassword.lastLogin = new Date().toISOString()

      // Establecer estado de autenticación
      user.value = userWithoutPassword
      token.value = authToken
      setSessionExpiry(credentials.rememberMe)

      // Persistir sesión
      persistSession(userWithoutPassword, authToken, credentials.rememberMe || false)

      console.log("Login exitoso para:", user.value.name)

      return {
        success: true,
        user: user.value,
        token: authToken,
        message: "Login exitoso",
        expiresAt: sessionExpiry.value?.toISOString(),
      }
    } catch (error) {
      console.error("Error en login:", error)
      const errorMessage = "Error interno del servidor"
      error.value = errorMessage

      return {
        success: false,
        message: errorMessage,
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  const logout = async (reason?: string): Promise<void> => {
    try {
      loading.value = true

      // En producción, notificar al servidor sobre el logout
      if (token.value) {
        // await api.post('/auth/logout', { token: token.value })
      }

      // Limpiar estado
      user.value = null
      token.value = null
      sessionExpiry.value = null
      sessionWarningShown.value = false
      error.value = null

      // Limpiar almacenamiento local
      clearSession()

      console.log("Logout exitoso", reason ? `- ${reason}` : "")
    } catch (error) {
      console.error("Error en logout:", error)
    } finally {
      loading.value = false
    }
  }

  /**
   * Renueva la sesión actual
   */
  const refreshSession = async (): Promise<boolean> => {
    try {
      if (!token.value) return false

      loading.value = true

      // En producción, esto sería una llamada a la API
      const isValid = await validateSession(token.value)

      if (isValid && user.value) {
        const rememberMe = getLocalStorage<boolean>("remember_me", false)
        setSessionExpiry(rememberMe)
        sessionWarningShown.value = false

        console.log("Sesión renovada exitosamente")
        return true
      } else {
        await logout("Sesión inválida")
        return false
      }
    } catch (error) {
      console.error("Error renovando sesión:", error)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Verifica si el usuario tiene un permiso específico
   */
  const hasPermission = (permission: string): boolean => {
    return userPermissions.value.includes(permission) || userPermissions.value.includes("full_access")
  }

  /**
   * Verifica si el usuario tiene uno de los roles especificados
   */
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!userRole.value) return false

    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(userRole.value)
  }

  /**
   * Actualiza el perfil del usuario
   */
  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!user.value) return false

      loading.value = true

      // En producción, esto sería una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Actualizar usuario
      user.value = { ...user.value, ...updates }

      // Persistir cambios
      if (token.value) {
        const rememberMe = getLocalStorage<boolean>("remember_me", false)
        persistSession(user.value, token.value, rememberMe)
      }

      console.log("Perfil actualizado exitosamente")
      return true
    } catch (error) {
      console.error("Error actualizando perfil:", error)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtiene el nombre legible del rol
   */
  const getRoleDisplayName = (role?: UserRole): string => {
    if (!role) return "Usuario"

    const roleNames: Record<UserRole, string> = {
      patient: "Paciente",
      student: "Estudiante",
      professor: "Profesor",
      admin: "Administrador",
    }

    return roleNames[role] || "Usuario"
  }

  /**
   * Limpia errores
   */
  const clearError = (): void => {
    error.value = null
  }

  /**
   * RETORNAR API PÚBLICA DEL STORE
   */
  return {
    // Estado reactivo
    user: readonly(user),
    token: readonly(token),
    loading: readonly(loading),
    error: readonly(error),
    sessionExpiry: readonly(sessionExpiry),
    sessionConfig: readonly(sessionConfig),

    // Propiedades computadas
    isAuthenticated,
    userRole,
    isPatient,
    isStudent,
    isProfessor,
    isAdmin,
    userPermissions,
    sessionTimeRemaining,
    shouldShowSessionWarning,

    // Métodos públicos
    initializeAuth,
    login,
    logout,
    refreshSession,
    updateProfile,
    hasPermission,
    hasRole,
    getRoleDisplayName,
    clearError,

    // Datos de prueba (solo para desarrollo)
    TEST_USERS: readonly(TEST_USERS),
  }
})

// Función auxiliar para crear readonly refs
function readonly<T>(ref: any) {
  return computed(() => ref.value)
}
