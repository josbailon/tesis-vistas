"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type UserRole = "patient" | "student" | "professor" | "admin"

interface User {
  email: string
  role: UserRole
  name: string
}

interface AuthContextType {
  user: User | null
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e)
        localStorage.removeItem("user")
      } finally {
        setIsLoading(false)
      }
    }

    // Ejecutar inmediatamente
    checkAuth()

    // También configurar un listener para cambios en localStorage (útil para múltiples pestañas)
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Redireccionar según autenticación
  useEffect(() => {
    if (isLoading) return

    const publicPaths = ["/login", "/register", "/"]
    const isPublicPath = publicPaths.some((path) => pathname === path || pathname?.startsWith(`${path}/`))

    if (!user && !isPublicPath) {
      window.location.href = "/login"
    }
  }, [user, isLoading, pathname])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/login"
  }

  return <AuthContext.Provider value={{ user, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
