"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { UleamBranding } from "@/components/uleam-branding"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

const TEST_USERS = [
  { id: "1", email: "paciente@clinica.com", password: "paciente", role: "patient", name: "Juan Paciente" },
  { id: "2", email: "estudiante@clinica.com", password: "estudiante", role: "student", name: "María Estudiante" },
  { id: "3", email: "profesor@clinica.com", password: "profesor", role: "professor", name: "Carlos Profesor" },
  { id: "4", email: "admin@clinica.com", password: "admin", role: "admin", name: "Ana Administradora" },
]

const getRedirectPath = (role: string) => {
  const paths = {
    patient: "/dashboard/my-appointments",
    student: "/dashboard/patients",
    professor: "/dashboard/teacher",
    admin: "/dashboard/admin",
  }
  return paths[role as keyof typeof paths] || "/dashboard"
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const { user, login, isLoading, isInitialized } = useAuth()
  const redirectHandled = useRef(false)

  // Handle existing user redirection
  useEffect(() => {
    if (isInitialized && !isLoading && user && !redirectHandled.current && !redirecting) {
      redirectHandled.current = true
      setRedirecting(true)

      console.log("🔄 Existing user detected, redirecting to:", user.role)

      const redirectPath = getRedirectPath(user.role)

      setTimeout(() => {
        console.log("🚀 Redirecting to:", redirectPath)
        window.location.href = redirectPath
      }, 1000)
    }
  }, [user, isLoading, isInitialized, redirecting])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading || redirecting) return

    setLoading(true)
    setError("")

    try {
      const foundUser = TEST_USERS.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        console.log("✅ Valid credentials for:", foundUser.role)

        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
          name: foundUser.name,
        }

        // Login user
        login(userData)

        // Set redirecting state
        setRedirecting(true)

        // Redirect after login
        const redirectPath = getRedirectPath(foundUser.role)

        setTimeout(() => {
          console.log("🚀 Post-login redirect to:", redirectPath)
          window.location.href = redirectPath
        }, 1000)
      } else {
        setError("Credenciales incorrectas")
      }
    } catch (err) {
      console.error("❌ Login error:", err)
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  // Show loading during initialization
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 font-medium">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  // Show redirecting state
  if (redirecting || (user && !redirectHandled.current)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 font-medium">Redirigiendo al dashboard...</p>
          <p className="text-green-600 text-sm mt-2">{user ? `Bienvenido, ${user.name}` : "Preparando tu sesión..."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <header className="w-full border-b border-green-200 bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
          <Link className="flex items-center space-x-3" href="/">
            <UleamBranding variant="logo-only" />
            <div>
              <span className="text-xl font-bold text-green-800">ULEAM</span>
              <p className="text-sm text-green-600">Clínica Dental</p>
            </div>
          </Link>
          <Link href="/" className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Volver al inicio</span>
          </Link>
        </div>
      </header>

      <div className="flex items-center justify-center p-4 pt-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <UleamBranding variant="sidebar" className="justify-center mb-4" />
            <h1 className="text-2xl font-bold text-green-800 mb-2">Sistema de Gestión</h1>
            <p className="text-green-600">Clínica Dental Universitaria</p>
          </div>

          <Card className="border-green-200 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-green-800">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center text-green-600">
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-800 font-medium">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@uleam.edu.ec"
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                    required
                    disabled={loading || redirecting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-800 font-medium">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 pr-10"
                      required
                      disabled={loading || redirecting}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800"
                      disabled={loading || redirecting}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg py-2.5"
                  disabled={loading || redirecting}
                >
                  {loading || redirecting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>{redirecting ? "Redirigiendo..." : "Iniciando sesión..."}</span>
                    </div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-6">
              <div className="w-full pt-4 border-t border-green-200">
                <p className="text-sm font-medium text-green-800 mb-3 text-center">Credenciales de prueba:</p>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  {TEST_USERS.map((testUser) => (
                    <div
                      key={testUser.role}
                      className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-100"
                    >
                      <span className="font-medium text-green-800 capitalize">
                        {testUser.role === "professor"
                          ? "Profesor"
                          : testUser.role === "student"
                            ? "Estudiante"
                            : testUser.role === "patient"
                              ? "Paciente"
                              : "Admin"}
                        :
                      </span>
                      <span className="text-green-600">
                        {testUser.email} / {testUser.password}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
