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

export default function LoginForm() {
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
    <Card className="w-full max-w-md mx-auto">
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
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-primary hover:underline">
            Regístrate
          </a>
        </p>

        <div className="w-full pt-4 border-t">
          <p className="text-sm font-medium mb-2">Credenciales de prueba:</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Paciente:</strong> paciente@clinica.com / paciente
            </p>
            <p>
              <strong>Estudiante:</strong> estudiante@clinica.com / estudiante
            </p>
            <p>
              <strong>Profesor:</strong> profesor@clinica.com / profesor
            </p>
            <p>
              <strong>Admin:</strong> admin@clinica.com / admin
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
