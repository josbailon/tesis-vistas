"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { authAPI } from "@/lib/api-client"

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
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

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
        console.log("🔄 Initializing authentication with API...")

        // Check if we're in the browser
        if (typeof window === "undefined") {
          globalAuthState.isLoading = false
          globalAuthState.isInitialized = true
          setIsLoading(false)
          setIsInitialized(true)
          return
        }

        const token = localStorage.getItem("access_token")
        if (token) {
          try {
            const response = await authAPI.getProfile()
            const userData = response.data
            globalAuthState.user = userData
            setUser(userData)
            console.log("✅ User restored from API:", userData.role, userData.name)
          } catch (error) {
            console.log("⚠️ Token invalid, cleaning up")
            localStorage.removeItem("access_token")
            localStorage.removeItem("clinic_user")
            localStorage.removeItem("clinic_expiry")
            globalAuthState.user = null
            setUser(null)
          }
        } else {
          console.log("ℹ️ No token found")
          globalAuthState.user = null
          setUser(null)
        }
      } catch (error) {
        console.error("❌ Auth initialization error:", error)
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token")
          localStorage.removeItem("clinic_user")
          localStorage.removeItem("clinic_expiry")
        }
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

  const login = async (email: string, password: string) => {
    try {
      console.log("🔐 Logging in user via API...")

      const response = await authAPI.login({ email, password })
      const { access_token, user: userData } = response.data

      // Update global state
      globalAuthState.user = userData
      setUser(userData)

      // Save to localStorage only if in browser
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("clinic_user", JSON.stringify(userData))
        localStorage.setItem("clinic_expiry", (Date.now() + 24 * 60 * 60 * 1000).toString())
      }

      console.log("✅ Login successful via API")
    } catch (error: any) {
      console.error("❌ Login error:", error)
      const message = error.response?.data?.message || "Error de autenticación"
      throw new Error(message)
    }
  }

  const logout = () => {
    console.log("🚪 Logging out user")

    // Update global state
    globalAuthState.user = null
    setUser(null)

    // Clear localStorage only if in browser
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("clinic_user")
      localStorage.removeItem("clinic_expiry")
    }

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
