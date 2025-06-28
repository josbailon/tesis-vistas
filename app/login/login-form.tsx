"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth, TEST_USERS } from "@/contexts/auth-context"
import { Eye, EyeOff, User, Lock, UserCheck, Calendar, Shield, GraduationCap, Heart } from "lucide-react"
import { getRoleColor } from "@/lib/utils"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Find user in TEST_USERS
      const testUser = TEST_USERS.find((user) => user.email === email && user.password === password)

      if (testUser) {
        // Create user object without password
        const { password: _, ...userWithoutPassword } = testUser
        login(userWithoutPassword)

        console.log("✅ Login successful, redirecting to dashboard")
        router.push("/dashboard")
      } else {
        setError("Credenciales inválidas. Verifica tu email y contraseña.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Error durante el login. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = (testUser: (typeof TEST_USERS)[0]) => {
    const { password: _, ...userWithoutPassword } = testUser
    login(userWithoutPassword)
    router.push("/dashboard")
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "profesor":
        return <GraduationCap className="h-4 w-4" />
      case "estudiante":
        return <User className="h-4 w-4" />
      case "paciente":
        return <Heart className="h-4 w-4" />
      case "secretario":
        return <Calendar className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Administrador",
      profesor: "Profesor",
      estudiante: "Estudiante",
      paciente: "Paciente",
      secretario: "Secretario",
    }
    return labels[role] || role
  }

  const groupedUsers = TEST_USERS.reduce(
    (acc, user) => {
      if (!acc[user.role]) {
        acc[user.role] = []
      }
      acc[user.role].push(user)
      return acc
    },
    {} as Record<string, typeof TEST_USERS>,
  )

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Main Login Card */}
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-20 h-20 bg-medical-gradient rounded-full flex items-center justify-center mb-4 shadow-medical">
            <span className="text-white font-bold text-2xl">UC</span>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">Clínica Dental ULEAM</CardTitle>
          <CardDescription className="text-gray-600 text-lg">Sistema Integral de Gestión Odontológica</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo Electrónico
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-12 border-gray-200 focus:border-primary focus:ring-primary text-base"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 border-gray-200 focus:border-primary focus:ring-primary text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-medical-gradient hover:opacity-90 text-white font-medium text-base shadow-medical"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Access Section */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-800">Acceso Rápido</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Selecciona tu perfil para acceder directamente al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-gray-100">
              <TabsTrigger value="all" className="text-xs">
                Todos
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-xs">
                Admin
              </TabsTrigger>
              <TabsTrigger value="profesor" className="text-xs">
                Profesores
              </TabsTrigger>
              <TabsTrigger value="estudiante" className="text-xs">
                Estudiantes
              </TabsTrigger>
              <TabsTrigger value="secretario" className="text-xs">
                Secretarios
              </TabsTrigger>
              <TabsTrigger value="paciente" className="text-xs">
                Pacientes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="grid gap-3 max-h-64 overflow-y-auto">
                {TEST_USERS.map((testUser) => (
                  <Button
                    key={testUser.id}
                    variant="outline"
                    onClick={() => handleQuickLogin(testUser)}
                    className="justify-start h-auto p-4 border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-shrink-0">{getRoleIcon(testUser.role)}</div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-900">{testUser.name}</div>
                        <div className="text-sm text-gray-500">{testUser.email}</div>
                        {testUser.specialty && (
                          <div className="text-xs text-gray-400">Especialidad: {testUser.specialty}</div>
                        )}
                      </div>
                      <Badge className={getRoleColor(testUser.role)}>{getRoleLabel(testUser.role)}</Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>

            {Object.entries(groupedUsers).map(([role, users]) => (
              <TabsContent key={role} value={role} className="mt-4">
                <div className="grid gap-3">
                  {users.map((testUser) => (
                    <Button
                      key={testUser.id}
                      variant="outline"
                      onClick={() => handleQuickLogin(testUser)}
                      className="justify-start h-auto p-4 border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0">{getRoleIcon(testUser.role)}</div>
                        <div className="text-left flex-1">
                          <div className="font-medium text-gray-900">{testUser.name}</div>
                          <div className="text-sm text-gray-500">{testUser.email}</div>
                          {testUser.specialty && (
                            <div className="text-xs text-gray-400">Especialidad: {testUser.specialty}</div>
                          )}
                          {testUser.department && (
                            <div className="text-xs text-gray-400">Departamento: {testUser.department}</div>
                          )}
                          {testUser.semester && (
                            <div className="text-xs text-gray-400">Semestre: {testUser.semester}</div>
                          )}
                        </div>
                        <Badge className={getRoleColor(testUser.role)}>{getRoleLabel(testUser.role)}</Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Secretary Access */}
      <Card className="shadow-lg border-2 border-teal-200 bg-teal-50/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-center text-teal-800 flex items-center justify-center gap-2">
            <UserCheck className="h-5 w-5" />
            Acceso Rápido Secretaría
          </CardTitle>
          <CardDescription className="text-center text-teal-600">
            Acceso directo para personal administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {TEST_USERS.filter((user) => user.role === "secretario").map((secretary) => (
              <Button
                key={secretary.id}
                onClick={() => handleQuickLogin(secretary)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-base font-medium shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5" />
                  <div className="text-left">
                    <div>{secretary.name}</div>
                    <div className="text-xs opacity-90">Gestión de Citas y Registros</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card className="shadow-md border-0 bg-gray-50/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="text-center text-sm text-gray-600">
            <p className="font-medium">Universidad Laica Eloy Alfaro de Manabí</p>
            <p>Facultad de Odontología • Sistema de Gestión Clínica</p>
            <p className="text-xs mt-2 text-gray-500">
              Versión 2.0 • Desarrollado para la gestión integral de la clínica dental
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm
