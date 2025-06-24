"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useAuth, TEST_USERS } from "@/contexts/auth-context"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isAuthenticated } = useAuth()

  // Verificar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const callbackUrl = searchParams.get("callbackUrl")
      if (callbackUrl) {
        router.push(decodeURIComponent(callbackUrl))
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, router, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Autenticación simple en el cliente
      const user = TEST_USERS.find((u) => u.email === email && u.password === password)

      if (user) {
        setRedirecting(true)

        // Usar el contexto de autenticación para iniciar sesión
        login({
          email: user.email,
          role: user.role,
          name: user.name,
        })

        // Verificar si hay una URL de callback
        const callbackUrl = searchParams.get("callbackUrl")
        if (callbackUrl) {
          console.log("Redirigiendo a URL de callback:", callbackUrl)
          router.push(decodeURIComponent(callbackUrl))
        } else {
          // Redirección basada en el rol
          let redirectPath = "/dashboard"
          switch (user.role) {
            case "patient":
              redirectPath = "/dashboard/my-appointments"
              break
            case "student":
              redirectPath = "/dashboard/patients"
              break
            case "professor":
              redirectPath = "/dashboard/specialty"
              break
            case "admin":
              redirectPath = "/dashboard/users"
              break
          }
          console.log("Redirigiendo a ruta basada en rol:", redirectPath)
          router.push(redirectPath)
        }
      } else {
        setError("Credenciales incorrectas")
        setLoading(false)
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Error al iniciar sesión")
      setLoading(false)
    }
  }

  if (redirecting) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-lg font-medium">Redirigiendo al panel de control...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary-200 shadow-soft-lg bg-white">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-sm text-primary-600">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-primary-600 hover:underline">
            Regístrate
          </a>
        </p>

        <div className="w-full pt-4 border-t border-primary-200">
          <p className="text-sm font-medium mb-3 text-primary-800">Usuarios Disponibles:</p>
          <div className="text-xs text-primary-600 space-y-2 max-h-48 overflow-y-auto">
            <div className="grid gap-2">
              <div className="p-2 bg-red-50 rounded border border-red-200">
                <p className="font-semibold text-red-800">👨‍💼 Administrador</p>
                <p>
                  <strong>Email:</strong> admin@clinica.com
                </p>
                <p>
                  <strong>Contraseña:</strong> admin
                </p>
                <p className="text-red-600">Dr. Admin - Gestión completa del sistema</p>
              </div>

              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <p className="font-semibold text-blue-800">👩‍⚕️ Profesores</p>
                <div className="space-y-1 mt-1">
                  <div>
                    <p>
                      <strong>Email:</strong> profesor@clinica.com | <strong>Pass:</strong> profesor
                    </p>
                    <p className="text-blue-600">Dra. María González - Endodoncia</p>
                  </div>
                  <div>
                    <p>
                      <strong>Email:</strong> endodoncia@clinica.com | <strong>Pass:</strong> endodoncia
                    </p>
                    <p className="text-blue-600">Dr. Carlos Ruiz - Especialista en Endodoncia</p>
                  </div>
                  <div>
                    <p>
                      <strong>Email:</strong> ortodoncia@clinica.com | <strong>Pass:</strong> ortodoncia
                    </p>
                    <p className="text-blue-600">Dra. Laura Martín - Especialista en Ortodoncia</p>
                  </div>
                  <div>
                    <p>
                      <strong>Email:</strong> cirugia@clinica.com | <strong>Pass:</strong> cirugia
                    </p>
                    <p className="text-blue-600">Dr. Roberto Silva - Cirugía Oral</p>
                  </div>
                  <div>
                    <p>
                      <strong>Email:</strong> pediatria@clinica.com | <strong>Pass:</strong> pediatria
                    </p>
                    <p className="text-blue-600">Dra. Carmen Vega - Odontopediatría</p>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-green-50 rounded border border-green-200">
                <p className="font-semibold text-green-800">🎓 Estudiante</p>
                <p>
                  <strong>Email:</strong> estudiante@clinica.com
                </p>
                <p>
                  <strong>Contraseña:</strong> estudiante
                </p>
                <p className="text-green-600">Juan Pérez - Estudiante de Odontología</p>
              </div>

              <div className="p-2 bg-purple-50 rounded border border-purple-200">
                <p className="font-semibold text-purple-800">🏥 Paciente</p>
                <p>
                  <strong>Email:</strong> paciente@clinica.com
                </p>
                <p>
                  <strong>Contraseña:</strong> paciente
                </p>
                <p className="text-purple-600">Ana López - Paciente registrado</p>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
