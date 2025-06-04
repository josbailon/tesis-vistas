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
      <div className="min-h-screen flex items-center justify-center medical-gradient">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
          <p className="font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center medical-gradient">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
          <p className="font-medium">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen medical-gradient flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 fade-in">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Clínica Dental ULEAM</h2>
            <p className="mt-2 text-white/80">Accede a la plataforma universitaria</p>
          </div>

          {/* Login Form */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-center text-white">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center text-white/70">
                Ingresa tus credenciales para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@uleam.edu.ec"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full btn-medical" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                      Iniciando sesión...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Iniciar Sesión
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-sm text-white">Acceso Rápido - Demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                  onClick={() => handleQuickLogin("admin@clinica.com", "admin")}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium">Administrador</span>
                  </div>
                  <Badge className="bg-red-500/20 text-red-200 border-red-400/30">admin@clinica.com</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                  onClick={() => handleQuickLogin("secretaria@clinica.com", "secretaria")}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">Secretaria</span>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                    secretaria@clinica.com
                  </Badge>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                  onClick={() => handleQuickLogin("profesor@clinica.com", "profesor")}
                >
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-medium">Profesor</span>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-200 border-orange-400/30">profesor@clinica.com</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                  onClick={() => handleQuickLogin("estudiante@clinica.com", "estudiante")}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium">Estudiante</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-200 border-green-400/30">estudiante@clinica.com</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg"
                  onClick={() => handleQuickLogin("paciente@clinica.com", "paciente")}
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">Paciente</span>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">paciente@clinica.com</Badge>
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
            <Heart className="h-20 w-20 mx-auto mb-6 text-white" />
            <h3 className="text-3xl font-bold mb-4">Sistema Integral</h3>
            <p className="text-white/80 leading-relaxed text-lg">
              Plataforma completa para la gestión de la clínica dental universitaria, conectando estudiantes,
              profesores, pacientes y personal administrativo.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-white/90">Servicios odontológicos gratuitos</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-white/90">Atención supervisada por especialistas</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-white/90">Tecnología de última generación</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <span className="text-white/90">Formación práctica de excelencia</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">5</div>
              <div className="text-white/70">Roles de Usuario</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">100%</div>
              <div className="text-white/70">Gratuito</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
