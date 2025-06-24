import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const TEST_USERS = [
  {
    id: "1",
    email: "admin@clinica.com",
    name: "Dr. Admin",
    role: "admin",
    password: "admin",
  },
  {
    id: "2",
    email: "profesor@clinica.com",
    name: "Dr. María González",
    role: "professor",
    specialty: "Endodoncia",
    password: "profesor",
  },
  {
    id: "3",
    email: "estudiante@clinica.com",
    name: "Juan Pérez",
    role: "student",
    password: "estudiante",
  },
  {
    id: "4",
    email: "paciente@clinica.com",
    name: "Ana López",
    role: "patient",
    password: "paciente",
  },
]

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null)
  const isLoading = ref(true)
  const isInitialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  const initializeAuth = () => {
    try {
      const savedUser = localStorage.getItem("clinic_user")
      const savedExpiry = localStorage.getItem("clinic_expiry")

      if (savedUser && savedExpiry) {
        const expiry = Number.parseInt(savedExpiry)
        if (Date.now() < expiry) {
          user.value = JSON.parse(savedUser)
        } else {
          localStorage.removeItem("clinic_user")
          localStorage.removeItem("clinic_expiry")
        }
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
      localStorage.removeItem("clinic_user")
      localStorage.removeItem("clinic_expiry")
    } finally {
      isLoading.value = false
      isInitialized.value = true
    }
  }

  const login = async (email, password) => {
    const foundUser = TEST_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        specialty: foundUser.specialty,
      }

      user.value = userData
      localStorage.setItem("clinic_user", JSON.stringify(userData))
      localStorage.setItem("clinic_expiry", (Date.now() + 24 * 60 * 60 * 1000).toString())

      return { success: true, user: userData }
    }

    return { success: false, message: "Credenciales incorrectas" }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem("clinic_user")
    localStorage.removeItem("clinic_expiry")
  }

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "patient":
        return "Paciente"
      case "student":
        return "Estudiante"
      case "professor":
        return "Profesor"
      case "admin":
        return "Administrador"
      default:
        return "Usuario"
    }
  }

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
