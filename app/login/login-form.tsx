"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, TEST_USERS } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user in test data
      const user = TEST_USERS.find((u) => u.email === email && u.password === password)

      if (user) {
        const { password: _, ...userWithoutPassword } = user
        login(userWithoutPassword)

        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido/a, ${user.name}`,
        })

        router.push("/dashboard")
      } else {
        setError("Credenciales incorrectas. Verifique su email y contraseña.")
      }
    } catch (error) {
      setError("Error al iniciar sesión. Intente nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = (userEmail: string) => {
    const user = TEST_USERS.find((u) => u.email === userEmail)
    if (user) {
      setEmail(user.email)
      setPassword(user.password)
    }
  }

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-center text-gray-900">Iniciar Sesión</CardTitle>
        <p className="text-sm text-gray-600 text-center">Ingrese sus credenciales para acceder al sistema</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="usuario@uleam.edu.ec"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
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

        {/* Quick Login Buttons */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">Acceso rápido de prueba:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("secretaria@uleam.edu.ec")}
              className="text-xs border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              Secretaría
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("admin@uleam.edu.ec")}
              className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Admin
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("carlos.ruiz@uleam.edu.ec")}
              className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Profesor
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("juan.perez@uleam.edu.ec")}
              className="text-xs border-green-200 text-green-700 hover:bg-green-50"
            >
              Estudiante
            </Button>
          </div>
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            ¿Problemas para acceder?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contactar soporte
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
