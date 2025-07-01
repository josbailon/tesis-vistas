"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "professor" | "student" | "patient" | "secretary"
  specialty?: string
  department?: string
  semester?: number
  experience?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers: Record<string, User> = {
  "admin@uleam.edu.ec": {
    id: "1",
    name: "Administrador Sistema",
    email: "admin@uleam.edu.ec",
    role: "admin",
  },
  "carlos.ruiz@uleam.edu.ec": {
    id: "2",
    name: "Dr. Carlos Ruiz",
    email: "carlos.ruiz@uleam.edu.ec",
    role: "professor",
    specialty: "Endodoncia",
    department: "Odontología",
  },
  "juan.perez@uleam.edu.ec": {
    id: "3",
    name: "Juan Pérez",
    email: "juan.perez@uleam.edu.ec",
    role: "student",
    specialty: "Endodoncia",
    semester: 8,
    experience: "Avanzado",
  },
  "secretaria@uleam.edu.ec": {
    id: "4",
    name: "Ana Secretaria",
    email: "secretaria@uleam.edu.ec",
    role: "secretary",
  },
  "paciente@email.com": {
    id: "5",
    name: "María Paciente",
    email: "paciente@email.com",
    role: "patient",
  },
}

const mockPasswords: Record<string, string> = {
  "admin@uleam.edu.ec": "admin123",
  "carlos.ruiz@uleam.edu.ec": "prof123",
  "juan.perez@uleam.edu.ec": "est123",
  "secretaria@uleam.edu.ec": "sec123",
  "paciente@email.com": "pac123",
}

// Export TEST_USERS for testing purposes
export const TEST_USERS = mockUsers

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const user = mockUsers[email]
      const validPassword = mockPasswords[email]

      if (user && validPassword === password) {
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
