"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { UleamBranding } from "@/components/uleam-branding"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Users, GraduationCap, Shield, Heart, CheckCircle } from "lucide-react"
import { LoginForm } from "@/app/login/login-form"

export default function HomePage() {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && user && isInitialized) {
      router.replace("/dashboard")
    }
  }, [user, isInitialized, mounted, router])

  // Show loading while auth is initializing
  if (!mounted || !isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 font-medium">Cargando sistema...</p>
        </div>
      </div>
    )
  }

  // If user is logged in, show redirect message
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 font-medium">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  // Show login page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <UleamBranding variant="full" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
            <p className="mt-2 text-sm text-gray-600">Accede a la plataforma de la Clínica Dental Universitaria</p>
          </div>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-gray-900">Bienvenido</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Ingresa tus credenciales para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-sm text-blue-800">👥 Todos los Usuarios Disponibles</CardTitle>
              <CardDescription className="text-xs text-blue-600">
                Selecciona cualquier usuario para probar el sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 max-h-64 overflow-y-auto">
                {/* Administrador */}
                <div className="p-3 bg-white rounded-lg border border-red-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-semibold text-red-800">Administrador</span>
                  </div>
                  <div className="text-xs space-y-1">
                    <p>
                      <span className="font-medium">Email:</span> admin@clinica.com
                    </p>
                    <p>
                      <span className="font-medium">Contraseña:</span> admin
                    </p>
                    <p className="text-red-600 italic">Dr. Admin - Control total del sistema</p>
                  </div>
                </div>

                {/* Profesores */}
                <div className="p-3 bg-white rounded-lg border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">Profesores Especialistas</span>
                  </div>
                  <div className="text-xs space-y-2">
                    <div className="border-l-2 border-blue-300 pl-2">
                      <p>
                        <span className="font-medium">Email:</span> profesor@clinica.com
                      </p>
                      <p>
                        <span className="font-medium">Pass:</span> profesor
                      </p>
                      <p className="text-blue-600">Dra. María González - Endodoncia</p>
                    </div>
                    <div className="border-l-2 border-blue-300 pl-2">
                      <p>
                        <span className="font-medium">Email:</span> endodoncia@clinica.com
                      </p>
                      <p>
                        <span className="font-medium">Pass:</span> endodoncia
                      </p>
                      <p className="text-blue-600">Dr. Carlos Ruiz - Endodoncia</p>
                    </div>
                    <div className="border-l-2 border-blue-300 pl-2">
                      <p>
                        <span className="font-medium">Email:</span> ortodoncia@clinica.com
                      </p>
                      <p>
                        <span className="font-medium">Pass:</span> ortodoncia
                      </p>
                      <p className="text-blue-600">Dra. Laura Martín - Ortodoncia</p>
                    </div>
                    <div className="border-l-2 border-blue-300 pl-2">
                      <p>
                        <span className="font-medium">Email:</span> cirugia@clinica.com
                      </p>
                      <p>
                        <span className="font-medium">Pass:</span> cirugia
                      </p>
                      <p className="text-blue-600">Dr. Roberto Silva - Cirugía Oral</p>
                    </div>
                    <div className="border-l-2 border-blue-300 pl-2">
                      <p>
                        <span className="font-medium">Email:</span> pediatria@clinica.com
                      </p>
                      <p>
                        <span className="font-medium">Pass:</span> pediatria
                      </p>
                      <p className="text-blue-600">Dra. Carmen Vega - Odontopediatría</p>
                    </div>
                  </div>
                </div>

                {/* Estudiante */}
                <div className="p-3 bg-white rounded-lg border border-green-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Estudiante</span>
                  </div>
                  <div className="text-xs space-y-1">
                    <p>
                      <span className="font-medium">Email:</span> estudiante@clinica.com
                    </p>
                    <p>
                      <span className="font-medium">Contraseña:</span> estudiante
                    </p>
                    <p className="text-green-600 italic">Juan Pérez - Estudiante de Odontología</p>
                  </div>
                </div>

                {/* Paciente */}
                <div className="p-3 bg-white rounded-lg border border-purple-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-800">Paciente</span>
                  </div>
                  <div className="text-xs space-y-1">
                    <p>
                      <span className="font-medium">Email:</span> paciente@clinica.com
                    </p>
                    <p>
                      <span className="font-medium">Contraseña:</span> paciente
                    </p>
                    <p className="text-purple-600 italic">Ana López - Paciente registrado</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2 border-t border-blue-200">
                <p className="text-xs text-blue-700 font-medium">
                  💡 Tip: Copia y pega las credenciales para acceso rápido
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Information */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 items-center justify-center">
        <div className="max-w-lg space-y-8">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-4">Clínica Dental Universitaria ULEAM</h3>
            <p className="text-blue-100 leading-relaxed">
              Plataforma integral para la gestión de la clínica dental universitaria, conectando estudiantes,
              profesores, pacientes y administradores.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-blue-200" />
              <span className="text-blue-100">Servicios odontológicos gratuitos</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-blue-200" />
              <span className="text-blue-100">Atención supervisada por especialistas</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-blue-200" />
              <span className="text-blue-100">Tecnología de última generación</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-blue-200" />
              <span className="text-blue-100">Formación práctica de excelencia</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4</div>
              <div className="text-sm text-blue-200">Especialidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-blue-200">Gratuito</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
