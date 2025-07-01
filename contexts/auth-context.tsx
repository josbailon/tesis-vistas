"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "professor" | "student" | "patient" | "secretary"
  specialty?: string
  avatar?: string
}

export const TEST_USERS: User[] = [
  {
    id: "1",
    email: "admin@uleam.edu.ec",
    name: "Dr. Carlos Administrador",
    role: "admin",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    email: "profesor@uleam.edu.ec",
    name: "Dr. María Profesora",
    role: "professor",
    specialty: "Endodoncia",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    email: "estudiante@uleam.edu.ec",
    name: "Juan Estudiante",
    role: "student",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "4",
    email: "paciente@gmail.com",
    name: "Ana Paciente",
    role: "patient",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "5",
    email: "secretaria@uleam.edu.ec",
    name: "Laura Secretaria",
    role: "secretary",
    avatar: "/placeholder-user.jpg",
  },
]

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("dental-clinic-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("dental-clinic-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user in TEST_USERS
    const foundUser = TEST_USERS.find((u) => u.email === email)

    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("dental-clinic-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("dental-clinic-user")
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
