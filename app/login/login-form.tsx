"use client"

import type React from "react"

import { useState, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, LogIn, User, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { LoadingSpinner } from "@/components/loading-spinner"

interface QuickAccessUser {
  role: string
  email: string
  password: string
  name: string
  color: string
  icon: string
}

const QUICK_ACCESS_USERS: QuickAccessUser[] = [
  {
    role: "Secretaría",
    email: "secretaria@uleam.edu.ec",
    password: "sec123",
    name: "María Secretaria",
    color: "bg-teal-500 hover:bg-teal-600",
    icon: "👩‍💼",
  },
  {
    role: "Administrador",
    email: "admin@uleam.edu.ec",
    password: "admin123",
    name: "Dr. Carlos Admin",
    color: "bg-red-500 hover:bg-red-600",
    icon: "👨‍💼",
  },
  {
    role: "Profesor",
    email: "carlos.ruiz@uleam.edu.ec",
    password: "prof123",
    name: "Dr. Carlos Ruiz",
    color: "bg-purple-500 hover:bg-purple-600",
    icon: "👨‍🏫",
  },
  {
    role: "Estudiante",
    email: "juan.perez@uleam.edu.ec",
    password: "est123",
    name: "Juan Pérez",
    color: "bg-blue-500 hover:bg-blue-600",
    icon: "👨‍🎓",
  },
]

const LoginForm = memo(function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
        setError("Error de conexión. Por favor, intenta nuevamente.")
      } finally {
        setIsLoading(false)
      }
    },
    [email, password, login, router],
  )

  const handleQuickAccess = useCallback(
    async (user: QuickAccessUser) => {
      setError("")
      setIsLoading(true)
      setEmail(user.email)
      setPassword(user.password)

      try {
        const success = await login(user.email, user.password)
        if (success) {
          router.push("/dashboard")
        } else {
          setError("Error en el acceso rápido. Por favor, intenta nuevamente.")
        }
      } catch (err) {
        setError("Error de conexión. Por favor, intenta nuevamente.")
      } finally {
        setIsLoading(false)
      }
    },
    [login, router],
  )

  return (
    <div className="space-y-6">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Accede a tu cuenta del sistema de gestión clínica
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo Electrónico
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu.email@uleam.edu.ec"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" variant="minimal" className="mr-2" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Access Section */}
      <Card className="shadow-xl border-0 bg-gradient-to-r from-teal-50 to-blue-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-center space-x-2">
            <Zap className="h-5 w-5 text-teal-600" />
            <CardTitle className="text-lg font-semibold text-gray-900">Acceso Rápido</CardTitle>
          </div>
          <CardDescription className="text-center text-gray-600">
            Accede directamente con credenciales de prueba
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACCESS_USERS.map((user) => (
              <Button
                key={user.email}
                variant="outline"
                className={`h-auto p-4 ${user.color} text-white border-0 hover:scale-105 transition-all duration-200`}
                onClick={() => handleQuickAccess(user)}
                disabled={isLoading}
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-2xl">{user.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{user.role}</div>
                    <div className="text-xs opacity-90">{user.name}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-4 p-3 bg-white/50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <strong>Credenciales de prueba:</strong> Usa los botones de arriba para acceso directo
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                admin@uleam.edu.ec
              </Badge>
              <Badge variant="outline" className="text-xs">
                secretaria@uleam.edu.ec
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

export default LoginForm
