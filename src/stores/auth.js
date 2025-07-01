/**
 * STORE DE AUTENTICACIÓN CON PINIA
 *
 * Este store maneja todo el estado relacionado con la autenticación:
 * - Usuario actual logueado
 * - Estado de carga
 * - Funciones de login/logout
 * - Persistencia en localStorage
 */

// Importar defineStore de Pinia para crear el store
import { defineStore } from "pinia"
// Importar ref y computed para reactividad
import { ref, computed } from "vue"

/**
 * USUARIOS DE PRUEBA PARA DEMOSTRACIÓN
 *
 * Estos usuarios simulan una base de datos para testing
 * En producción, estos datos vendrían de una API
 */
export const TEST_USERS = [
  {
    id: 1,
    email: "paciente@clinica.com",
    password: "demo123",
    name: "Ana López",
    role: "patient",
    specialty: null,
  },
  {
    id: 2,
    email: "estudiante@clinica.com",
    password: "demo123",
    name: "Juan Pérez",
    role: "student",
    specialty: "Odontología General",
  },
  {
    id: 3,
    email: "profesor@clinica.com",
    password: "demo123",
    name: "Dr. María González",
    role: "professor",
    specialty: "Endodoncia",
  },
  {
    id: 4,
    email: "admin@clinica.com",
    password: "demo123",
    name: "Dr. Admin",
    role: "admin",
    specialty: null,
  },
]

/**
 * DEFINICIÓN DEL STORE DE AUTENTICACIÓN
 *
 * useAuthStore es la función que retorna el store de autenticación
 * Puede ser usado en cualquier componente de la aplicación
 */
export const useAuthStore = defineStore("auth", () => {
  /**
   * ESTADO REACTIVO DEL STORE
   *
   * Estas variables son reactivas y se actualizan automáticamente
   * cuando cambian, triggereando re-renders en los componentes
   */

  // Usuario actualmente logueado (null si no hay usuario)
  const user = ref(null)

  // Estado de carga para mostrar spinners durante operaciones async
  const loading = ref(false)

  /**
   * PROPIEDADES COMPUTADAS
   *
   * Estas propiedades se calculan automáticamente basadas en el estado
   * y se actualizan cuando sus dependencias cambian
   */

  // Verificar si hay un usuario autenticado
  const isAuthenticated = computed(() => !!user.value)

  // Obtener el rol del usuario actual
  const userRole = computed(() => user.value?.role || null)

  /**
   * FUNCIÓN DE INICIALIZACIÓN DE AUTENTICACIÓN
   *
   * Se ejecuta al cargar la aplicación para verificar si hay
   * una sesión guardada en localStorage
   */
  const initializeAuth = () => {
    try {
      // Intentar obtener datos del usuario desde localStorage
      const savedUser = localStorage.getItem("dental_clinic_user")

      if (savedUser) {
        // Si hay datos guardados, parsear y restaurar el usuario
        user.value = JSON.parse(savedUser)
        console.log("Sesión restaurada para:", user.value.name)
      }
    } catch (error) {
      // Si hay error al parsear, limpiar localStorage
      console.error("Error al restaurar sesión:", error)
      localStorage.removeItem("dental_clinic_user")
    }
  }

  /**
   * FUNCIÓN DE LOGIN
   *
   * Autentica al usuario con email y contraseña
   * Retorna un objeto con el resultado de la operación
   */
  const login = async (email, password) => {
    // Activar estado de carga
    loading.value = true

    try {
      // Simular delay de red (en producción sería una llamada a API)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Buscar usuario en la lista de usuarios de prueba
      const foundUser = TEST_USERS.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        // Si el usuario existe, crear objeto de usuario sin la contraseña
        const { password: _, ...userWithoutPassword } = foundUser

        // Guardar usuario en el estado reactivo
        user.value = userWithoutPassword

        // Persistir usuario en localStorage para mantener sesión
        localStorage.setItem("dental_clinic_user", JSON.stringify(userWithoutPassword))

        console.log("Login exitoso para:", user.value.name)

        // Retornar resultado exitoso
        return {
          success: true,
          user: user.value,
          message: "Login exitoso",
        }
      } else {
        // Si las credenciales son incorrectas
        return {
          success: false,
          message: "Credenciales incorrectas",
        }
      }
    } catch (error) {
      // Manejar errores inesperados
      console.error("Error en login:", error)
      return {
        success: false,
        message: "Error interno del servidor",
      }
    } finally {
      // Desactivar estado de carga sin importar el resultado
      loading.value = false
    }
  }

  /**
   * FUNCIÓN DE LOGOUT
   *
   * Cierra la sesión del usuario actual y limpia todos los datos
   */
  const logout = async () => {
    try {
      // Limpiar usuario del estado
      user.value = null

      // Limpiar datos persistidos en localStorage
      localStorage.removeItem("dental_clinic_user")

      console.log("Logout exitoso")
    } catch (error) {
      console.error("Error en logout:", error)
    }
  }

  /**
   * FUNCIÓN PARA OBTENER NOMBRE LEGIBLE DEL ROL
   *
   * Convierte los roles técnicos en nombres amigables para el usuario
   */
  const getRoleDisplayName = (role) => {
    const roleNames = {
      patient: "Paciente",
      student: "Estudiante",
      professor: "Profesor",
      admin: "Administrador",
    }
    return roleNames[role] || "Usuario"
  }

  /**
   * RETORNAR API PÚBLICA DEL STORE
   *
   * Estas son las propiedades y métodos que pueden ser usados
   * por los componentes que importen este store
   */
  return {
    // Estado reactivo
    user,
    loading,

    // Propiedades computadas
    isAuthenticated,
    userRole,

    // Métodos/acciones
    initializeAuth,
    login,
    logout,
    getRoleDisplayName,
  }
})
