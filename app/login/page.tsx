"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "./login-form"
import { UleamBranding } from "@/components/uleam-branding"
import { Heart, CheckCircle } from "lucide-react"

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 font-medium">Redirigiendo al dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <UleamBranding variant="full" />
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Sistema de Gestión</h1>
            <p className="mt-2 text-sm text-gray-600">Clínica Dental Universitaria ULEAM</p>
          </div>

          <LoginForm />
        </div>
      </div>

      {/* Right side - Information */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-blue-600 text-white p-8 items-center justify-center">
        <div className="max-w-lg space-y-8">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-4">Clínica Dental Universitaria ULEAM</h3>
            <p className="text-green-100 leading-relaxed">
              Plataforma integral para la gestión de la clínica dental universitaria, conectando estudiantes,
              profesores, pacientes y administradores.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-200" />
              <span className="text-green-100">Servicios odontológicos gratuitos</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-200" />
              <span className="text-green-100">Atención supervisada por especialistas</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-200" />
              <span className="text-green-100">Tecnología de última generación</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-200" />
              <span className="text-green-100">Formación práctica de excelencia</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4</div>
              <div className="text-sm text-green-200">Especialidades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-green-200">Gratuito</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
