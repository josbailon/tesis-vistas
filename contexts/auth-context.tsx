"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: string
  specialty?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  login: (user: User) => void
  logout: () => void
}

// Export TEST_USERS for testing and development
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
    role: "profesor",
    specialty: "Endodoncia",
    password: "profesor",
  },
  {
    id: "3",
    email: "estudiante@clinica.com",
    name: "Juan Pérez",
    role: "estudiante",
    password: "estudiante",
  },
  {
    id: "4",
    email: "paciente@clinica.com",
    name: "Ana López",
    role: "paciente",
    password: "paciente",
  },
  {
    id: "5",
    email: "endodoncia@clinica.com",
    name: "Dr. Carlos Ruiz",
    role: "profesor",
    specialty: "Endodoncia",
    password: "endodoncia",
  },
  {
    id: "6",
    email: "ortodoncia@clinica.com",
    name: "Dra. Laura Martín",
    role: "profesor",
    specialty: "Ortodoncia",
    password: "ortodoncia",
  },
  {
    id: "7",
    email: "cirugia@clinica.com",
    name: "Dr. Roberto Silva",
    role: "profesor",
    specialty: "Cirugía Oral",
    password: "cirugia",
  },
  {
    id: "8",
    email: "pediatria@clinica.com",
    name: "Dra. Carmen Vega",
    role: "profesor",
    specialty: "Odontopediatría",
    password: "pediatria",
  },
  {
    id: "9",
    email: "secretario@clinica.com",
    name: "María Secretaria",
    role: "secretario",
    password: "secretario",
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Global state to prevent multiple initializations
const globalAuthState = {
  user: null as User | null,
  isInitialized: false,
  isLoading: true,
  hasInitialized: false,
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(globalAuthState.user)
  const [isLoading, setIsLoading] = useState(globalAuthState.isLoading)
  const [isInitialized, setIsInitialized] = useState(globalAuthState.isInitialized)
  const initRef = useRef(false)

  // Single initialization effect
  useEffect(() => {
    if (initRef.current || globalAuthState.hasInitialized) {
      // If already initialized, sync with global state
      setUser(globalAuthState.user)
      setIsLoading(false)
      setIsInitialized(true)
      return
    }

    initRef.current = true
    globalAuthState.hasInitialized = true

    const initializeAuth = async () => {
      try {
        console.log("🔄 Initializing authentication (single instance)...")

        const savedUser = localStorage.getItem("clinic_user")
        const savedExpiry = localStorage.getItem("clinic_expiry")

        if (savedUser && savedExpiry) {
          const expiry = Number.parseInt(savedExpiry)
          if (Date.now() < expiry) {
            const userData = JSON.parse(savedUser)
            globalAuthState.user = userData
            setUser(userData)
            console.log("✅ User restored:", userData.role, userData.name)
          } else {
            console.log("⚠️ Session expired, cleaning up")
            localStorage.removeItem("clinic_user")
            localStorage.removeItem("clinic_expiry")
            globalAuthState.user = null
            setUser(null)
          }
        } else {
          console.log("ℹ️ No saved session found")
          globalAuthState.user = null
          setUser(null)
        }
      } catch (error) {
        console.error("❌ Auth initialization error:", error)
        localStorage.removeItem("clinic_user")
        localStorage.removeItem("clinic_expiry")
        globalAuthState.user = null
        setUser(null)
      } finally {
        globalAuthState.isLoading = false
        globalAuthState.isInitialized = true
        setIsLoading(false)
        setIsInitialized(true)
        console.log("✅ Auth initialization complete")
      }
    }

    initializeAuth()
  }, [])

  const login = (userData: User) => {
    try {
      console.log("🔐 Logging in user:", userData.role, userData.name)

      // Update global state
      globalAuthState.user = userData
      setUser(userData)

      // Save to localStorage
      localStorage.setItem("clinic_user", JSON.stringify(userData))
      localStorage.setItem("clinic_expiry", (Date.now() + 24 * 60 * 60 * 1000).toString())

      console.log("✅ Login successful")
    } catch (error) {
      console.error("❌ Login error:", error)
    }
  }

  const logout = () => {
    console.log("🚪 Logging out user")

    // Update global state
    globalAuthState.user = null
    setUser(null)

    // Clear localStorage
    localStorage.removeItem("clinic_user")
    localStorage.removeItem("clinic_expiry")

    console.log("✅ Logout complete")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isInitialized,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
