// Store de autenticación usando Pinia (gestor de estado para Vue 3)
import { defineStore } from "pinia"
import { ref, computed } from "vue"

// Array de usuarios de prueba para el sistema de clínica dental
// Cada usuario tiene un rol específico que determina sus permisos y funcionalidades
export const TEST_USERS = [
  {
    id: "1",
    email: "admin@uleam.edu.ec",
    name: "Dr. Carlos Administrador",
    role: "admin", // Administrador: acceso completo al sistema
    specialty: null,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    email: "profesor@uleam.edu.ec",
    name: "Dr. María Profesora",
    role: "professor", // Profesor: supervisa estudiantes y aprueba tratamientos
    specialty: "Endodoncia", // Especialidad médica del profesor
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    email: "estudiante@uleam.edu.ec",
    name: "Juan Estudiante",
    role: "student", // Estudiante: realiza tratamientos bajo supervisión
    specialty: null,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "4",
    email: "paciente@gmail.com",
    name: "Ana Paciente",
    role: "patient", // Paciente: recibe tratamientos dentales
    specialty: null,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "5",
    email: "secretaria@uleam.edu.ec",
    name: "Laura Secretaria",
    role: "secretary", // Secretaria: gestiona citas y administración
    specialty: null,
    avatar: "/placeholder-user.jpg",
  },
]

// Definición del store de autenticación usando Pinia
export const useAuthStore = defineStore("auth", () => {
  // Estados reactivos del store
  const user = ref(null) // Usuario actualmente logueado (null si no hay sesión)
  const isLoading = ref(true) // Estado de carga para mostrar spinners
  const isInitialized = ref(false) // Indica si el store ya se inicializó

  // Computed property que determina si hay un usuario autenticado
  const isAuthenticated = computed(() => !!user.value)

  /**
   * Función para inicializar el estado de autenticación
   * Se ejecuta al cargar la aplicación para verificar si hay una sesión guardada
   */
  const initializeAuth = () => {
    try {
      // Intenta recuperar datos de usuario del localStorage
      const savedUser = localStorage.getItem("clinic_user")
      const savedExpiry = localStorage.getItem("clinic_expiry")

      // Verifica si existen datos guardados y si no han expirado
      if (savedUser && savedExpiry) {
        const expiry = Number.parseInt(savedExpiry)
        // Compara la fecha actual con la fecha de expiración
        if (Date.now() < expiry) {
          // Si la sesión es válida, restaura el usuario
          user.value = JSON.parse(savedUser)
        } else {
          // Si la sesión expiró, limpia el localStorage
          localStorage.removeItem("clinic_user")
          localStorage.removeItem("clinic_expiry")
        }
      }
    } catch (error) {
      // Si hay error al parsear los datos, limpia todo
      console.error("Error al inicializar autenticación:", error)
      localStorage.removeItem("clinic_user")
      localStorage.removeItem("clinic_expiry")
    } finally {
      // Siempre marca como inicializado y termina la carga
      isLoading.value = false
      isInitialized.value = true
    }
  }

  /**
   * Función para iniciar sesión
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Object} Objeto con resultado del login
   */
  const login = async (email, password) => {
    // Busca el usuario en la lista de usuarios de prueba
    const foundUser = TEST_USERS.find((u) => u.email === email && password === "password123")

    if (foundUser) {
      // Si las credenciales son correctas, crea el objeto de usuario
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        specialty: foundUser.specialty,
        avatar: foundUser.avatar,
      }

      // Guarda el usuario en el estado reactivo
      user.value = userData

      // Persiste la sesión en localStorage con expiración de 24 horas
      localStorage.setItem("clinic_user", JSON.stringify(userData))
      localStorage.setItem("clinic_expiry", (Date.now() + 24 * 60 * 60 * 1000).toString())

      return { success: true, user: userData }
    }

    // Si las credenciales son incorrectas, retorna error
    return { success: false, message: "Credenciales incorrectas" }
  }

  /**
   * Función para cerrar sesión
   * Limpia el estado y el localStorage
   */
  const logout = () => {
    user.value = null
    localStorage.removeItem("clinic_user")
    localStorage.removeItem("clinic_expiry")
  }

  /**
   * Función utilitaria para obtener el nombre del rol en español
   * @param {string} role - Rol del usuario en inglés
   * @returns {string} Nombre del rol en español
   */
  const getRoleDisplayName = (role) => {
    const roleNames = {
      patient: "Paciente",
      student: "Estudiante",
      professor: "Profesor",
      admin: "Administrador",
      secretary: "Secretaria",
    }
    return roleNames[role] || "Usuario"
  }

  // Retorna todas las propiedades y métodos que estarán disponibles en los componentes
  return {
    user,
    isLoading,
    isInitialized,
    isAuthenticated,
    initializeAuth,
    login,
    logout,
    getRoleDisplayName,
  }
})
