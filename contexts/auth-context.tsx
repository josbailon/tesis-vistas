"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "professor" | "student" | "patient" | "secretary"
  specialty?: string
  department?: string
  semester?: number
  status: "active" | "inactive"
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Administrador Principal",
    email: "admin@uleam.edu.ec",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Dr. Carlos Mendoza",
    email: "profesor@uleam.edu.ec",
    role: "professor",
    specialty: "Endodoncia",
    department: "Odontología",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Juan Estudiante",
    email: "estudiante@uleam.edu.ec",
    role: "student",
    specialty: "Endodoncia",
    semester: 8,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "María Paciente",
    email: "paciente@uleam.edu.ec",
    role: "patient",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Ana Secretaria",
    email: "secretaria@uleam.edu.ec",
    role: "secretary",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
