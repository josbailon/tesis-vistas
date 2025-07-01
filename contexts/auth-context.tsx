"use client"

// Importaciones necesarias de React para el contexto de autenticación
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Interfaz que define la estructura de un usuario en el sistema
export interface User {
  id: string // Identificador único del usuario
  email: string // Correo electrónico para login
  name: string // Nombre completo del usuario
  role: "admin" | "professor" | "student" | "patient" | "secretary" // Rol que determina permisos
  specialty?: string // Especialidad médica (opcional, solo para profesores)
  avatar?: string // URL de la foto de perfil (opcional)
}

// Array de usuarios de prueba para testing y desarrollo
// Exportado para que los tests puedan acceder a estos datos
export const TEST_USERS: User[] = [
  {
    id: "1",
    email: "admin@uleam.edu.ec",
    name: "Dr. Carlos Administrador",
    role: "admin", // Administrador del sistema con todos los permisos
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    email: "profesor@uleam.edu.ec",
    name: "Dr. María Profesora",
    role: "professor", // Profesor que puede supervisar estudiantes
    specialty: "Endodoncia", // Especialidad en endodoncia
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    email: "estudiante@uleam.edu.ec",
    name: "Juan Estudiante",
    role: "student", // Estudiante que necesita supervisión
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "4",
    email: "paciente@gmail.com",
    name: "Ana Paciente",
    role: "patient", // Paciente que recibe tratamiento
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "5",
    email: "secretaria@uleam.edu.ec",
    name: "Laura Secretaria",
    role: "secretary", // Secretaria que maneja citas y administración
    avatar: "/placeholder-user.jpg",
  },
]

// Interfaz que define los métodos y propiedades del contexto de autenticación
interface AuthContextType {
  user: User | null // Usuario actual logueado (null si no hay sesión)
  login: (email: string, password: string) => Promise<boolean> // Función para iniciar sesión
  logout: () => void // Función para cerrar sesión
  isLoading: boolean // Estado de carga durante operaciones de auth
  isAuthenticated: boolean // Booleano que indica si hay un usuario logueado
}

// Creación del contexto de React para compartir estado de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Componente proveedor que envuelve la aplicación y proporciona el contexto de auth
export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado para almacenar el usuario actual
  const [user, setUser] = useState<User | null>(null)
  // Estado para mostrar indicadores de carga
  const [isLoading, setIsLoading] = useState(true)

  // Efecto que se ejecuta al montar el componente para verificar sesión existente
  useEffect(() => {
    // Intenta recuperar usuario guardado en localStorage
    const savedUser = localStorage.getItem("dental-clinic-user")
    if (savedUser) {
      try {
        // Parsea y establece el usuario si existe en localStorage
        setUser(JSON.parse(savedUser))
      } catch (error) {
        // Si hay error al parsear, limpia el localStorage
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("dental-clinic-user")
      }
    }
    // Termina el estado de carga
    setIsLoading(false)
  }, [])

  // Función asíncrona para manejar el login de usuarios
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true) // Inicia estado de carga

    // Simula delay de API real (1 segundo)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Busca el usuario en la lista de usuarios de prueba
    const foundUser = TEST_USERS.find((u) => u.email === email)

    // Verifica credenciales (password fijo para demo: "password123")
    if (foundUser && password === "password123") {
      setUser(foundUser) // Establece el usuario en el estado
      // Guarda el usuario en localStorage para persistencia
      localStorage.setItem("dental-clinic-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true // Login exitoso
    }

    setIsLoading(false)
    return false // Login fallido
  }

  // Función para cerrar sesión
  const logout = () => {
    setUser(null) // Limpia el usuario del estado
    localStorage.removeItem("dental-clinic-user") // Limpia localStorage
  }

  // Objeto con todos los valores que se compartirán a través del contexto
  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user, // Convierte user a booleano
  }

  // Retorna el proveedor con el valor del contexto
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext)
  // Verifica que el hook se use dentro del proveedor
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
