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
import { Stethoscope, Mail, Lock, User, GraduationCap, Shield, Phone } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"

const quickAccessUsers = [
  {
    role: "Secretaría",
    email: "secretaria@uleam.edu.ec",
    password: "sec123",
    icon: Phone,
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    role: "Administrador",
    email: "admin@uleam.edu.ec",
    password: "admin123",
    icon: Shield,
    color: "bg-red-600 hover:bg-red-700",
  },
  {
    role: "Profesor",
    email: "carlos.ruiz@uleam.edu.ec",
    password: "prof123",
    icon: User,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    role: "Estudiante",
    email: "juan.perez@uleam.edu.ec",
    password: "est123",
    icon: GraduationCap,
    color: "bg-green-600 hover:bg-green-700",
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
        router.push("/dashboard")
      } else {
        setError("Credenciales incorrectas. Por favor, verifica tu email y contraseña.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAccess = async (userEmail: string, userPassword: string) => {
    setError("")
    setIsLoading(true)

    try {
      const success = await login(userEmail, userPassword)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Error en el acceso rápido.")
      }
    } catch (err) {
      setError("Error al iniciar sesión.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Clínica Dental ULEAM</h1>
          <p className="text-gray-600">Sistema de Gestión Odontológica</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
              <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu.email@uleam.edu.ec"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" /> : "Iniciar Sesión"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-4">Credenciales de prueba:</p>
                <div className="text-xs text-gray-500 space-y-1">
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
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Acceso Rápido</CardTitle>
              <CardDescription>Accede directamente con un rol específico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickAccessUsers.map((user) => (
                  <Button
                    key={user.role}
                    onClick={() => handleQuickAccess(user.email, user.password)}
                    className={`w-full justify-start text-left ${user.color} text-white`}
                    disabled={isLoading}
                    variant="default"
                  >
                    <user.icon className="mr-3 h-5 w-5" />
                    <div>
                      <div className="font-medium">{user.role}</div>
                      <div className="text-sm opacity-90">{user.email}</div>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Información del Sistema</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Gestión completa de citas médicas</li>
                  <li>• Control académico de estudiantes</li>
                  <li>• Historiales clínicos digitales</li>
                  <li>• Odontograma interactivo</li>
                  <li>• Reportes y analíticas</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
