"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "profesor" | "estudiante" | "paciente" | "secretario"
  specialty?: string
  avatar?: string
  phone?: string
  department?: string
  semester?: number
  studentId?: string
  professorId?: string
  permissions?: string[]
  preferences?: {
    theme: "light" | "dark"
    language: "es" | "en"
    notifications: boolean
  }
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  isLoading: boolean
  hasPermission: (permission: string) => boolean
  isRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const TEST_USERS: (User & { password: string })[] = [
  {
    id: "admin1",
    name: "Dr. María González",
    email: "admin@uleam.edu.ec",
    password: "admin123",
    role: "admin",
    phone: "+593 99 123 4567",
    department: "Administración",
    permissions: ["all"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "prof1",
    name: "Dr. Carlos Ruiz",
    email: "carlos.ruiz@uleam.edu.ec",
    password: "prof123",
    role: "profesor",
    specialty: "endodoncia",
    phone: "+593 99 234 5678",
    department: "Endodoncia",
    permissions: ["manage_students", "approve_treatments", "create_assignments"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "prof2",
    name: "Dra. Laura Martín",
    email: "laura.martin@uleam.edu.ec",
    password: "prof123",
    role: "profesor",
    specialty: "ortodoncia",
    phone: "+593 99 345 6789",
    department: "Ortodoncia",
    permissions: ["manage_students", "approve_treatments", "create_assignments"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "prof3",
    name: "Dr. Roberto Silva",
    email: "roberto.silva@uleam.edu.ec",
    password: "prof123",
    role: "profesor",
    specialty: "cirugia",
    phone: "+593 99 456 7890",
    department: "Cirugía Oral",
    permissions: ["manage_students", "approve_treatments", "create_assignments"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "prof4",
    name: "Dra. Carmen Vega",
    email: "carmen.vega@uleam.edu.ec",
    password: "prof123",
    role: "profesor",
    specialty: "pediatria",
    phone: "+593 99 567 8901",
    department: "Odontopediatría",
    permissions: ["manage_students", "approve_treatments", "create_assignments"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "est1",
    name: "Juan Pérez",
    email: "juan.perez@uleam.edu.ec",
    password: "est123",
    role: "estudiante",
    specialty: "endodoncia",
    semester: 8,
    studentId: "2021-001",
    professorId: "prof1",
    phone: "+593 99 456 7890",
    permissions: ["view_patients", "create_cases", "submit_assignments"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "est2",
    name: "María González",
    email: "maria.gonzalez@uleam.edu.ec",
    password: "est123",
    role: "estudiante",
    specialty: "ortodoncia",
    semester: 7,
    studentId: "2021-002",
    professorId: "prof2",
    phone: "+593 99 567 8901",
    permissions: ["view_patients", "create_cases", "submit_assignments"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "est3",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@uleam.edu.ec",
    password: "est123",
    role: "estudiante",
    specialty: "cirugia",
    semester: 9,
    studentId: "2020-003",
    professorId: "prof3",
    phone: "+593 99 678 9012",
    permissions: ["view_patients", "create_cases", "submit_assignments"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "pac1",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@gmail.com",
    password: "pac123",
    role: "paciente",
    phone: "+593 99 678 9012",
    permissions: ["view_appointments", "view_records"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "pac2",
    name: "Luis Morales",
    email: "luis.morales@gmail.com",
    password: "pac123",
    role: "paciente",
    phone: "+593 99 789 0123",
    permissions: ["view_appointments", "view_records"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
  {
    id: "sec1",
    name: "Carmen Secretaria",
    email: "secretaria@uleam.edu.ec",
    password: "sec123",
    role: "secretario",
    phone: "+593 99 789 0123",
    department: "Administración",
    permissions: ["manage_appointments", "register_patients", "view_schedules"],
    preferences: {
      theme: "light",
      language: "es",
      notifications: true,
    },
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("dental_clinic_user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("dental_clinic_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("dental_clinic_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("dental_clinic_user")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("dental_clinic_user", JSON.stringify(updatedUser))
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    if (user.permissions?.includes("all")) return true
    return user.permissions?.includes(permission) || false
  }

  const isRole = (role: string): boolean => {
    return user?.role === role
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    updateUser,
    isLoading,
    hasPermission,
    isRole,
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
