"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "./login-form"
import { UleamBranding } from "@/components/uleam-branding"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Stethoscope, Users, GraduationCap, Shield, Heart, CheckCircle } from "lucide-react"

export default function LoginPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && user && !isLoading) {
      router.replace("/dashboard")
    }
  }, [user, isLoading, mounted, router])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-800 font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-800 font-medium">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-soft-gradient flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <UleamBranding variant="full" />
            <h2 className="mt-6 text-3xl font-bold text-primary-800">Iniciar Sesión</h2>
            <p className="mt-2 text-sm text-primary-600">Accede a la plataforma de la Clínica Dental Universitaria</p>
          </div>

          <Card className="border-primary-200 shadow-soft-lg">
            <CardHeader>
              <CardTitle className="text-center text-primary-800">Bienvenido</CardTitle>
              <CardDescription className="text-center text-primary-600">
                Ingresa tus credenciales para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="border-info-200 bg-info-50">
            <CardHeader>
              <CardTitle className="text-sm text-info-800">Credenciales de Demostración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                <div className="flex items-center justify-between p-2 bg-white rounded border border-info-200">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-info-600" />
                    <span className="text-sm font-medium text-primary-800">Paciente</span>
                  </div>
                  <Badge className="bg-info-100 text-info-700 border-info-300">paciente@clinica.com</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border border-success-200">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-success-600" />
                    <span className="text-sm font-medium text-primary-800">Estudiante</span>
                  </div>
                  <Badge className="bg-success-100 text-success-700 border-success-300">estudiante@clinica.com</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border border-warning-200">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-warning-600" />
                    <span className="text-sm font-medium text-primary-800">Profesor</span>
                  </div>
                  <Badge className="bg-warning-100 text-warning-700 border-warning-300">profesor@clinica.com</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-primary-800">Secretaria</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-300">secretaria@clinica.com</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded border border-error-200">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-error-600" />
                    <span className="text-sm font-medium text-primary-800">Admin</span>
                  </div>
                  <Badge className="bg-error-100 text-error-700 border-error-300">admin@clinica.com</Badge>
                </div>
              </div>
              <p className="text-xs text-info-700 text-center">
                Contraseña para todas las cuentas: <strong>demo123</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Information */}
      <div className="hidden lg:flex flex-1 bg-medical-gradient text-white p-8 items-center justify-center">
        <div className="max-w-lg space-y-8">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-4">Clínica Dental Universitaria ULEAM</h3>
            <p className="text-primary-100 leading-relaxed">
              Plataforma integral para la gestión de la clínica dental universitaria, conectando estudiantes,
              profesores, pacientes y administradores.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary-200" />
              <span className="text-primary-100">Servicios odontológicos gratuitos</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary-200" />
              <span className="text-primary-100">Atención supervisada por especialistas</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary-200" />
              <span className="text-primary-100">Tecnología de última generación</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-primary-200" />
              <span className="text-primary-100">Formación práctica de excelencia</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4</div>
              <div className="text-sm text-primary-200">Especialidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-primary-200">Gratuito</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
