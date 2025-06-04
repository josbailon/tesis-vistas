"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, TEST_USERS } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Stethoscope,
  Users,
  GraduationCap,
  Shield,
  Heart,
  CheckCircle,
  UserCheck,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react"

export default function LoginPage() {
  const { user, isLoading, login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && user && !isLoading) {
      router.replace("/dashboard")
    }
  }, [user, isLoading, mounted, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const foundUser = TEST_USERS.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        login(userWithoutPassword)

        toast({
          title: "¡Bienvenido!",
          description: `Has iniciado sesión como ${foundUser.role}`,
        })
      } else {
        toast({
          title: "Error de autenticación",
          description: "Email o contraseña incorrectos",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error durante el inicio de sesión",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail)
    setPassword(userPassword)

    const foundUser = TEST_USERS.find((u) => u.email === userEmail && u.password === userPassword)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      login(userWithoutPassword)

      toast({
        title: "¡Bienvenido!",
        description: `Has iniciado sesión como ${foundUser.role}`,
      })
    }
  }

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
          <p className="font-medium text-lg">Cargando...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
          <p className="font-medium text-lg">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 fade-in">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Clínica Dental ULEAM</h2>
            <p className="text-xl text-white/90">Accede a la plataforma universitaria</p>
          </div>

          {/* Login Form */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-700">Iniciar Sesión</CardTitle>
              <CardDescription className="text-blue-600">Ingresa tus credenciales para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-700 font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@uleam.edu.ec"
                    className="bg-blue-50 border-blue-200 text-blue-800 placeholder:text-blue-400 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-700 font-semibold">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-blue-50 border-blue-200 text-blue-800 placeholder:text-blue-400 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                      Iniciando sesión...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="h-5 w-5" />
                      Iniciar Sesión
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">Acceso Rápido - Demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 border border-red-300 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => handleQuickLogin("admin@clinica.com", "admin")}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">Administrador</span>
                  </div>
                  <Badge className="bg-red-500 text-white border-0">admin@clinica.com</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-700 border border-purple-300 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => handleQuickLogin("secretaria@clinica.com", "secretaria")}
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold">Secretaria</span>
                  </div>
                  <Badge className="bg-purple-500 text-white border-0">secretaria@clinica.com</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 text-orange-700 border border-orange-300 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => handleQuickLogin("profesor@clinica.com", "profesor")}
                >
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold">Profesor</span>
                  </div>
                  <Badge className="bg-orange-500 text-white border-0">profesor@clinica.com</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 text-green-700 border border-green-300 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => handleQuickLogin("estudiante@clinica.com", "estudiante")}
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Estudiante</span>
                  </div>
                  <Badge className="bg-green-500 text-white border-0">estudiante@clinica.com</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-700 border border-blue-300 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={() => handleQuickLogin("paciente@clinica.com", "paciente")}
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Paciente</span>
                  </div>
                  <Badge className="bg-blue-500 text-white border-0">paciente@clinica.com</Badge>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Information */}
      <div className="hidden lg:flex flex-1 bg-white/10 backdrop-blur-md p-8 items-center justify-center">
        <div className="max-w-lg space-y-8 text-white">
          <div className="text-center">
            <Heart className="h-24 w-24 mx-auto mb-6 text-white drop-shadow-lg" />
            <h3 className="text-4xl font-bold mb-4">Sistema Integral</h3>
            <p className="text-white/90 leading-relaxed text-xl">
              Plataforma completa para la gestión de la clínica dental universitaria, conectando estudiantes,
              profesores, pacientes y personal administrativo.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-300" />
              <span className="text-white/95 text-lg">Servicios odontológicos gratuitos</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-300" />
              <span className="text-white/95 text-lg">Atención supervisada por especialistas</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-300" />
              <span className="text-white/95 text-lg">Tecnología de última generación</span>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-300" />
              <span className="text-white/95 text-lg">Formación práctica de excelencia</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white">5</div>
              <div className="text-white/80 text-lg">Roles de Usuario</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white">100%</div>
              <div className="text-white/80 text-lg">Gratuito</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
