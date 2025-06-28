"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Lock, Stethoscope, GraduationCap, UserCheck, Calendar } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const quickAccessUsers = [
  {
    id: "admin",
    name: "Administrador",
    email: "admin@uleam.edu.ec",
    role: "admin",
    icon: UserCheck,
    color: "bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:border-red-300",
    textColor: "text-red-700",
  },
  {
    id: "profesor",
    name: "Dr. García",
    email: "garcia@uleam.edu.ec",
    role: "profesor",
    icon: Stethoscope,
    color: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300",
    textColor: "text-purple-700",
  },
  {
    id: "estudiante",
    name: "María López",
    email: "maria.lopez@uleam.edu.ec",
    role: "estudiante",
    icon: GraduationCap,
    color: "bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300",
    textColor: "text-green-700",
  },
  {
    id: "paciente",
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    role: "paciente",
    icon: User,
    color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300",
    textColor: "text-blue-700",
  },
  {
    id: "secretario",
    name: "Ana Martínez",
    email: "ana.martinez@uleam.edu.ec",
    role: "secretario",
    icon: Calendar,
    color: "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:border-indigo-300",
    textColor: "text-indigo-700",
  },
]

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Credenciales inválidas. Por favor, verifica tu email y contraseña.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAccess = async (user: (typeof quickAccessUsers)[0]) => {
    setIsLoading(true)
    setError("")

    try {
      const success = await login(user.email, "demo123")
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Error al acceder con usuario de demostración.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-br from-blue-300/10 to-emerald-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  ULEAM Dental
                </h1>
                <p className="text-xl text-gray-600 mt-2">Sistema de Gestión Clínica Odontológica</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Plataforma integral para la gestión de citas, historiales clínicos y seguimiento académico en
                odontología.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Gestión de Pacientes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Odontogramas Digitales</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Seguimiento Académico</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Reportes y Estadísticas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="glass border-white/20 shadow-2xl">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-800">Iniciar Sesión</CardTitle>
                <CardDescription className="text-gray-600">Accede a tu cuenta para continuar</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Correo Electrónico
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu.email@uleam.edu.ec"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-2.5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Acceso rápido de demostración</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {quickAccessUsers.map((user) => {
                    const IconComponent = user.icon
                    return (
                      <button
                        key={user.id}
                        onClick={() => handleQuickAccess(user)}
                        disabled={isLoading}
                        className={`${user.color} ${user.textColor} p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md transform hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5" />
                          <div className="text-left">
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs opacity-75">{user.role}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>¿Olvidaste tu contraseña?</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Recuperar contraseña</button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
