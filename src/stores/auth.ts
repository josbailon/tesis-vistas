import { defineStore } from "pinia"
import { ref, computed } from "vue"
import type { User, LoginCredentials } from "@/types"
import { DEMO_USERS, SESSION_TIMEOUT } from "@/utils/constants"

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const sessionTimeout = ref<NodeJS.Timeout | null>(null)
  const lastActivity = ref<number>(Date.now())

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const userRole = computed(() => user.value?.role || null)
  const userName = computed(() => user.value?.name || "")
  const userEmail = computed(() => user.value?.email || "")

  // Actions
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    isLoading.value = true

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user in demo data
      const foundUser = DEMO_USERS.find((u) => u.email === credentials.email && u.password === credentials.password)

      if (foundUser) {
        // Create user object without password
        const { password, ...userWithoutPassword } = foundUser
        user.value = userWithoutPassword
        token.value = generateToken()

        // Update last activity
        lastActivity.value = Date.now()

        // Persist session if remember me is checked
        if (credentials.rememberMe) {
          localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))
          localStorage.setItem("auth_token", token.value)
          localStorage.setItem("auth_remember", "true")
        } else {
          sessionStorage.setItem("auth_user", JSON.stringify(userWithoutPassword))
          sessionStorage.setItem("auth_token", token.value)
        }

        // Start session timeout
        startSessionTimeout()

        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      // Clear session timeout
      if (sessionTimeout.value) {
        clearTimeout(sessionTimeout.value)
        sessionTimeout.value = null
      }

      // Clear state
      user.value = null
      token.value = null
      lastActivity.value = Date.now()

      // Clear storage
      localStorage.removeItem("auth_user")
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_remember")
      sessionStorage.removeItem("auth_user")
      sessionStorage.removeItem("auth_token")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const checkSession = (): boolean => {
    try {
      // Check localStorage first (remember me)
      let storedUser = localStorage.getItem("auth_user")
      let storedToken = localStorage.getItem("auth_token")
      let isRemembered = localStorage.getItem("auth_remember") === "true"

      // If not in localStorage, check sessionStorage
      if (!storedUser || !storedToken) {
        storedUser = sessionStorage.getItem("auth_user")
        storedToken = sessionStorage.getItem("auth_token")
        isRemembered = false
      }

      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser)

          // Validate user object
          if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.role) {
            user.value = parsedUser
            token.value = storedToken
            lastActivity.value = Date.now()

            // Start session timeout
            startSessionTimeout()

            return true
          }
        } catch (parseError) {
          console.error("Error parsing stored user:", parseError)
          // Clear invalid data
          clearStoredAuth()
        }
      }

      return false
    } catch (error) {
      console.error("Session check error:", error)
      return false
    }
  }

  const refreshSession = (): void => {
    lastActivity.value = Date.now()

    // Restart session timeout
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
    }
    startSessionTimeout()
  }

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!user.value) return false

    try {
      isLoading.value = true

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user data
      user.value = { ...user.value, ...profileData }

      // Update stored data
      const isRemembered = localStorage.getItem("auth_remember") === "true"
      if (isRemembered) {
        localStorage.setItem("auth_user", JSON.stringify(user.value))
      } else {
        sessionStorage.setItem("auth_user", JSON.stringify(user.value))
      }

      return true
    } catch (error) {
      console.error("Profile update error:", error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user.value) return false

    // Define role-based permissions
    const rolePermissions: Record<string, string[]> = {
      admin: ["*"], // Admin has all permissions
      profesor: [
        "view_students",
        "manage_students",
        "view_appointments",
        "manage_appointments",
        "view_clinical_cases",
        "manage_clinical_cases",
        "view_reports",
      ],
      estudiante: [
        "view_own_profile",
        "update_own_profile",
        "view_own_appointments",
        "book_appointments",
        "view_own_clinical_cases",
        "view_patients",
      ],
      paciente: [
        "view_own_profile",
        "update_own_profile",
        "view_own_appointments",
        "book_appointments",
        "view_own_records",
      ],
      secretario: [
        "view_appointments",
        "manage_appointments",
        "view_patients",
        "manage_patients",
        "view_reports",
        "manage_communications",
      ],
    }

    const userPermissions = rolePermissions[user.value.role] || []
    return userPermissions.includes("*") || userPermissions.includes(permission)
  }

  const canAccessRoute = (routeName: string): boolean => {
    if (!user.value) return false

    // Define route access by role
    const routeAccess: Record<string, string[]> = {
      dashboard: ["admin", "profesor", "estudiante", "paciente", "secretario"],
      admin: ["admin"],
      professor: ["profesor"],
      student: ["estudiante"],
      patient: ["paciente"],
      secretary: ["secretario"],
      profile: ["admin", "profesor", "estudiante", "paciente", "secretario"],
      settings: ["admin", "profesor", "estudiante", "paciente", "secretario"],
    }

    const allowedRoles = routeAccess[routeName] || []
    return allowedRoles.includes(user.value.role)
  }

  // Private methods
  const generateToken = (): string => {
    return btoa(`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)
  }

  const startSessionTimeout = (): void => {
    if (sessionTimeout.value) {
      clearTimeout(sessionTimeout.value)
    }

    sessionTimeout.value = setTimeout(() => {
      console.log("Session expired due to inactivity")
      logout()
      // You can emit an event here to show a session expired modal
    }, SESSION_TIMEOUT)
  }

  const clearStoredAuth = (): void => {
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_remember")
    sessionStorage.removeItem("auth_user")
    sessionStorage.removeItem("auth_token")
  }

  // Initialize session check
  checkSession()

  return {
    // State
    user,
    token,
    isLoading,
    lastActivity,

    // Getters
    isAuthenticated,
    userRole,
    userName,
    userEmail,

    // Actions
    login,
    logout,
    checkSession,
    refreshSession,
    updateProfile,
    hasPermission,
    canAccessRoute,
  }
})
