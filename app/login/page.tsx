"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "./login-form"
import { UleamBranding } from "@/components/uleam-branding"
import { Heart, CheckCircle, UserCheck, Clock, Shield, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 font-medium">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <UleamBranding variant="full" />
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Sistema de Gestión</h1>
            <p className="mt-2 text-sm text-gray-600">Clínica Dental Universitaria ULEAM</p>
          </div>

          <LoginForm />

          {/* Quick Access Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">Acceso Rápido</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-teal-200 hover:border-teal-300">
                <CardContent className="p-4 text-center">
                  <UserCheck className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">Secretaría</p>
                  <p className="text-xs text-gray-500">Gestión rápida</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200 hover:border-blue-300">
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">Emergencias</p>
                  <p className="text-xs text-gray-500">24/7</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Credenciales de Prueba:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>
                <strong>Admin:</strong> admin@uleam.edu.ec / admin123
              </div>
              <div>
                <strong>Profesor:</strong> carlos.ruiz@uleam.edu.ec / prof123
              </div>
              <div>
                <strong>Estudiante:</strong> juan.perez@uleam.edu.ec / est123
              </div>
              <div>
                <strong>Secretaria:</strong> secretaria@uleam.edu.ec / sec123
              </div>
              <div>
                <strong>Paciente:</strong> ana.rodriguez@gmail.com / pac123
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Information */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white p-8 items-center justify-center">
        <div className="max-w-lg space-y-8">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-4">Clínica Dental Universitaria ULEAM</h3>
            <p className="text-blue-100 leading-relaxed">
              Plataforma integral para la gestión de la clínica dental universitaria, conectando estudiantes,
              profesores, pacientes y administradores en un sistema completo y eficiente.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-teal-200" />
              <span className="text-blue-100">Servicios odontológicos gratuitos</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-teal-200" />
              <span className="text-blue-100">Atención supervisada por especialistas</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-teal-200" />
              <span className="text-blue-100">Tecnología de última generación</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-teal-200" />
              <span className="text-blue-100">Formación práctica de excelencia</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-teal-200" />
              <span className="text-blue-100">Sistema seguro y confiable</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-teal-200" />
              <span className="text-blue-100">Gestión integral de usuarios</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4</div>
              <div className="text-sm text-blue-200">Especialidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-blue-200">Gratuito</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-blue-200">Soporte</div>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-blue-200">Universidad Laica Eloy Alfaro de Manabí</p>
            <p className="text-xs text-blue-300 mt-1">
              Comprometidos con la excelencia académica y el servicio comunitario
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
