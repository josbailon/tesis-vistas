"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "profesor" | "estudiante" | "paciente" | "secretario"
  specialty?: string
  avatar?: string
  phone?: string
  cedula?: string
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isInitialized: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
  hasPermission: (permission: string) => boolean
  isRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Dr. Carlos Administrador",
    email: "admin@uleam.edu.ec",
    role: "admin",
    phone: "+593 99 123 4567",
    cedula: "1234567890",
    isActive: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "Dr. Carlos Ruiz",
    email: "carlos.ruiz@uleam.edu.ec",
    role: "profesor",
    specialty: "Endodoncia",
    phone: "+593 99 234 5678",
    cedula: "2345678901",
    isActive: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    name: "Juan Pérez",
    email: "juan.perez@uleam.edu.ec",
    role: "estudiante",
    phone: "+593 99 345 6789",
    cedula: "3456789012",
    isActive: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "4",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@gmail.com",
    role: "paciente",
    phone: "+593 99 456 7890",
    cedula: "4567890123",
    isActive: true,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "5",
    name: "María Secretaria",
    email: "secretaria@uleam.edu.ec",
    role: "secretario",
    phone: "+593 99 567 8901",
    cedula: "5678901234",
    isActive: true,
    avatar: "/placeholder-user.jpg",
  },
]

const ROLE_PERMISSIONS = {
  admin: ["*"],
  profesor: ["view_students", "manage_assignments", "approve_treatments", "view_clinical_cases"],
  estudiante: ["view_patients", "create_clinical_cases", "view_assignments", "manage_appointments"],
  paciente: ["view_appointments", "view_medical_records", "book_appointments"],
  secretario: ["manage_appointments", "register_patients", "view_schedules", "manage_communications"],
} as const

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  const checkSession = useCallback(async () => {
    try {
      const savedUser = localStorage.getItem("dental_clinic_user")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      }
    } catch (error) {
      console.error("Error checking session:", error)
      localStorage.removeItem("dental_clinic_user")
    } finally {
      setLoading(false)
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockPasswords: Record<string, string> = {
        "admin@uleam.edu.ec": "admin123",
        "carlos.ruiz@uleam.edu.ec": "prof123",
        "juan.perez@uleam.edu.ec": "est123",
        "ana.rodriguez@gmail.com": "pac123",
        "secretaria@uleam.edu.ec": "sec123",
      }

      if (mockPasswords[email] === password) {
        const foundUser = MOCK_USERS.find((u) => u.email === email)
        if (foundUser) {
          setUser(foundUser)
          localStorage.setItem("dental_clinic_user", JSON.stringify(foundUser))
          return true
        }
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    try {
      setUser(null)
      localStorage.removeItem("dental_clinic_user")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }, [])

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null
      const updatedUser = { ...prevUser, ...userData }
      localStorage.setItem("dental_clinic_user", JSON.stringify(updatedUser))
      return updatedUser
    })
  }, [])

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false
      const userPermissions = ROLE_PERMISSIONS[user.role] || []
      return userPermissions.includes("*") || userPermissions.includes(permission)
    },
    [user],
  )

  const isRole = useCallback(
    (role: string): boolean => {
      return user?.role === role
    },
    [user],
  )

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isInitialized,
      login,
      logout,
      updateUser,
      hasPermission,
      isRole,
    }),
    [user, loading, isInitialized, login, logout, updateUser, hasPermission, isRole],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
