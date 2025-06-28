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
import {
  Stethoscope,
  Mail,
  Lock,
  User,
  GraduationCap,
  Shield,
  Phone,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react"

const quickAccessUsers = [
  {
    role: "Secretaría",
    email: "secretaria@uleam.edu.ec",
    password: "sec123",
    icon: Phone,
    gradient: "from-purple-500 to-purple-600",
    hoverGradient: "from-purple-600 to-purple-700",
    description: "Gestión de citas y pacientes",
    bgPattern: "bg-purple-50",
  },
  {
    role: "Administrador",
    email: "admin@uleam.edu.ec",
    password: "admin123",
    icon: Shield,
    gradient: "from-red-500 to-red-600",
    hoverGradient: "from-red-600 to-red-700",
    description: "Control total del sistema",
    bgPattern: "bg-red-50",
  },
  {
    role: "Profesor",
    email: "carlos.ruiz@uleam.edu.ec",
    password: "prof123",
    icon: User,
    gradient: "from-blue-500 to-blue-600",
    hoverGradient: "from-blue-600 to-blue-700",
    description: "Supervisión académica",
    bgPattern: "bg-blue-50",
  },
  {
    role: "Estudiante",
    email: "juan.perez@uleam.edu.ec",
    password: "est123",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-emerald-600",
    hoverGradient: "from-emerald-600 to-emerald-700",
    description: "Práctica clínica",
    bgPattern: "bg-emerald-50",
  },
]

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedQuickAccess, setSelectedQuickAccess] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
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

  const handleQuickAccess = async (userEmail: string, userPassword: string, role: string) => {
    setError("")
    setIsLoading(true)
    setSelectedQuickAccess(role)

    setEmail(userEmail)
    setPassword(userPassword)

    try {
      const success = await login(userEmail, userPassword)
      if (success) {
        setTimeout(() => {
          router.push("/dashboard")
          router.refresh()
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
      setSelectedQuickAccess(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/25 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Stethoscope className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full animate-bounce"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-emerald-800 bg-clip-text text-transparent mb-4">
              Clínica Dental ULEAM
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium">Sistema de Gestión Odontológica</p>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            {/* Enhanced Login Form */}
            <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 text-white p-8 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <CardTitle className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
                    <Mail className="h-7 w-7" />
                    Iniciar Sesión
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-base mt-2">
                    Ingresa tus credenciales para acceder al sistema
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                      Correo Electrónico
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu.email@uleam.edu.ec"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-14 text-base border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                      Contraseña
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 pr-12 h-14 text-base border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertDescription className="text-sm text-red-700">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        Iniciar Sesión
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-200">
                  <p className="text-sm text-slate-600 text-center mb-6 font-semibold">Credenciales de prueba:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
                    <div className="space-y-2">
                      <p className="font-semibold text-red-600">
                        <Shield className="inline h-3 w-3 mr-1" />
                        Admin: admin@uleam.edu.ec / admin123
                      </p>
                      <p className="font-semibold text-blue-600">
                        <User className="inline h-3 w-3 mr-1" />
                        Profesor: carlos.ruiz@uleam.edu.ec / prof123
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold text-emerald-600">
                        <GraduationCap className="inline h-3 w-3 mr-1" />
                        Estudiante: juan.perez@uleam.edu.ec / est123
                      </p>
                      <p className="font-semibold text-purple-600">
                        <Phone className="inline h-3 w-3 mr-1" />
                        Secretaría: secretaria@uleam.edu.ec / sec123
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Access */}
            <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-600 text-white p-8 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <CardTitle className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
                    <ArrowRight className="h-7 w-7" />
                    Acceso Rápido
                  </CardTitle>
                  <CardDescription className="text-emerald-100 text-base mt-2">
                    Accede directamente con un rol específico
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {quickAccessUsers.map((user) => (
                    <div key={user.role} className={`relative group ${user.bgPattern} rounded-2xl p-1`}>
                      <Button
                        onClick={() => handleQuickAccess(user.email, user.password, user.role)}
                        className={`w-full justify-start text-left h-20 bg-gradient-to-r ${user.gradient} hover:${user.hoverGradient} text-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-xl group-hover:scale-[1.02] transform`}
                        disabled={isLoading}
                        variant="default"
                      >
                        <div className="flex items-center w-full">
                          <div className="flex-shrink-0 mr-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                              <user.icon className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-lg truncate">{user.role}</div>
                            <div className="text-sm opacity-90 truncate">{user.email}</div>
                            <div className="text-xs opacity-75 truncate hidden sm:block">{user.description}</div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {isLoading && selectedQuickAccess === user.role ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            )}
                          </div>
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-2xl border-2 border-blue-100">
                  <h3 className="font-bold text-slate-800 mb-4 text-lg flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    Características del Sistema
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-slate-700">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">Gestión completa de citas médicas</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-700">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">Control académico de estudiantes</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-700">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">Historiales clínicos digitales</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-slate-700">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">Odontograma interactivo</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-700">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">Reportes y analíticas</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-700">
                        <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">Sistema de tareas académicas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
