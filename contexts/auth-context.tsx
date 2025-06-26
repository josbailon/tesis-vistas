"use client"

import type React from "react"
import { createContext, useState, useEffect, type ReactNode, useContext } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextProps {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => ({ success: false, error: "Not implemented" }),
  logout: () => {},
  isLoading: false,
  error: null,
})

interface AuthProviderProps {
  children: ReactNode
}

// Add role normalization function at the top of the file
const normalizeRole = (role: string): string => {
  const roleMap: { [key: string]: string } = {
    student: "estudiante",
    teacher: "profesor",
    admin: "admin",
    administrator: "admin",
    secretary: "secretario",
    patient: "paciente",
  }

  const normalizedRole = roleMap[role.toLowerCase()] || role.toLowerCase()
  console.log(`🔄 Role normalized: ${role} -> ${normalizedRole}`)
  return normalizedRole
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Update the login function to normalize roles
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error en el login")
      }

      // Normalize the role before setting the user
      const normalizedUser = {
        ...data.user,
        role: normalizeRole(data.user.role),
      }

      setUser(normalizedUser)
      console.log("✅ Login successful:", normalizedUser)

      return { success: true, user: normalizedUser }
    } catch (error) {
      console.error("❌ Login error:", error)
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    // Remove the session cookie by making a request to the logout endpoint
    fetch("/api/auth/logout", { method: "POST" })
      .then(() => {
        console.log("User logged out")
      })
      .catch((error) => {
        console.error("Logout error:", error)
      })
  }

  // Update the session restoration to normalize roles
  useEffect(() => {
    const initializeAuth = async () => {
      if (isInitialized) return

      console.log("🔄 Initializing authentication (single instance)...")

      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
        })

        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            // Normalize the role when restoring session
            const normalizedUser = {
              ...data.user,
              role: normalizeRole(data.user.role),
            }
            setUser(normalizedUser)
            console.log("✅ User restored:", normalizedUser.name, "Role:", normalizedUser.role)
          }
        }
      } catch (error) {
        console.error("❌ Session restoration failed:", error)
      } finally {
        setIsInitialized(true)
        console.log("✅ Auth initialization complete")
      }
    }

    initializeAuth()
  }, [isInitialized])

  const value = { user, login, logout, isLoading, error }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
