"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth, TEST_USERS } from "@/contexts/auth-context"
import { Eye, EyeOff, User, Lock } from "lucide-react"

export default function LoginForm() {
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

  const handleTestLogin = (testUser: (typeof TEST_USERS)[0]) => {
    const { password: _, ...userWithoutPassword } = testUser
    login(userWithoutPassword)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Login Card */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">UC</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Clínica Dental ULEAM</CardTitle>
            <CardDescription className="text-gray-600">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    required
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
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Test Users Card */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-center text-gray-800">Usuarios de Prueba</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Haz clic en cualquier usuario para acceder directamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {TEST_USERS.map((testUser) => (
                <Button
                  key={testUser.id}
                  variant="outline"
                  onClick={() => handleTestLogin(testUser)}
                  className="justify-start h-auto p-3 border-gray-200 hover:bg-gray-50"
                >
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{testUser.name}</div>
                    <div className="text-sm text-gray-500">
                      {testUser.role} • {testUser.email}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
