"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Stethoscope, Mail, Lock, User, GraduationCap, Shield, Phone, Loader2 } from "lucide-react"

const quickAccessUsers = [
  {
    role: "Secretaría",
    email: "secretaria@uleam.edu.ec",
    password: "sec123",
    icon: Phone,
    color: "bg-purple-600 hover:bg-purple-700",
    description: "Gestión de citas y pacientes",
  },
  {
    role: "Administrador",
    email: "admin@uleam.edu.ec",
    password: "admin123",
    icon: Shield,
    color: "bg-red-600 hover:bg-red-700",
    description: "Control total del sistema",
  },
  {
    role: "Profesor",
    email: "carlos.ruiz@uleam.edu.ec",
    password: "prof123",
    icon: User,
    color: "bg-blue-600 hover:bg-blue-700",
    description: "Supervisión académica",
  },
  {
    role: "Estudiante",
    email: "juan.perez@uleam.edu.ec",
    password: "est123",
    icon: GraduationCap,
    color: "bg-green-600 hover:bg-green-700",
    description: "Práctica clínica",
  },
]

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        // Force navigation with a small delay to ensure state is updated
        setTimeout(() => {
          router.push("/dashboard")
          router.refresh()
        }, 100)
      } else {
        setError("Credenciales incorrectas. Por favor, verifica tu email y contraseña.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Error al iniciar sesión. Por favor, intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAccess = async (userEmail: string, userPassword: string) => {
    setError("")
    setIsLoading(true)

    // Update form fields for visual feedback
    setEmail(userEmail)
    setPassword(userPassword)

    try {
      const success = await login(userEmail, userPassword)
      if (success) {
        // Force navigation with multiple methods to ensure it works
        setTimeout(() => {
          router.push("/dashboard")
          router.refresh()
          // Fallback navigation
          window.location.href = "/dashboard"
        }, 200)
      } else {
        setError("Error en el acceso rápido. Credenciales no válidas.")
      }
    } catch (err) {
      console.error("Quick access error:", err)
      setError("Error al iniciar sesión con acceso rápido.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Stethoscope className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-3">
            Clínica Dental ULEAM
          </h1>
          <p className="text-lg md:text-xl text-gray-600">Sistema de Gestión Odontológica</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Login Form */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 lg:p-8">
              <CardTitle className="text-xl lg:text-2xl">Iniciar Sesión</CardTitle>
              <CardDescription className="text-blue-100 text-sm lg:text-base">
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu.email@uleam.edu.ec"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-sm lg:text-base"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 text-sm lg:text-base"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-sm">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium text-sm lg:text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-4 font-medium">Credenciales de prueba:</p>
                <div className="text-xs lg:text-sm text-gray-500 space-y-2 bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong>Admin:</strong> admin@uleam.edu.ec / admin123
                  </p>
                  <p>
                    <strong>Profesor:</strong> carlos.ruiz@uleam.edu.ec / prof123
                  </p>
                  <p>
                    <strong>Estudiante:</strong> juan.perez@uleam.edu.ec / est123
                  </p>
                  <p>
                    <strong>Secretaría:</strong> secretaria@uleam.edu.ec / sec123
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 lg:p-8">
              <CardTitle className="text-xl lg:text-2xl">Acceso Rápido</CardTitle>
              <CardDescription className="text-green-100 text-sm lg:text-base">
                Accede directamente con un rol específico
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
              <div className="space-y-3 lg:space-y-4">
                {quickAccessUsers.map((user) => (
                  <Button
                    key={user.role}
                    onClick={() => handleQuickAccess(user.email, user.password)}
                    className={`w-full justify-start text-left h-16 lg:h-20 ${user.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 p-4`}
                    disabled={isLoading}
                    variant="default"
                  >
                    <user.icon className="mr-3 lg:mr-4 h-6 w-6 lg:h-8 lg:w-8 flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <div className="font-semibold text-base lg:text-lg truncate">{user.role}</div>
                      <div className="text-xs lg:text-sm opacity-90 truncate">{user.email}</div>
                      <div className="text-xs opacity-75 truncate hidden sm:block">{user.description}</div>
                    </div>
                    {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin flex-shrink-0" />}
                  </Button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 text-sm lg:text-base">Información del Sistema</h3>
                <ul className="text-xs lg:text-sm text-blue-700 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                    <span>Gestión completa de citas médicas</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                    <span>Control académico de estudiantes</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                    <span>Historiales clínicos digitales</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></span>
                    <span>Odontograma interactivo</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                    <span>Reportes y analíticas</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
