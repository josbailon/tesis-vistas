"use client"

import { Suspense, lazy } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { UleamBranding } from "@/components/uleam-branding"

// Lazy load the login form for better performance
const LoginForm = lazy(() => import("./login-form"))

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-teal-600 p-12 flex-col justify-between">
          <UleamBranding variant="light" />

          <div className="space-y-6 text-white">
            <h1 className="text-4xl font-bold leading-tight">
              Sistema de Gestión
              <br />
              <span className="text-blue-200">Clínica Dental</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Plataforma integral para la gestión académica y clínica de la Facultad de Odontología
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold text-blue-100">Gestión Académica</h3>
                <p className="text-sm text-blue-200 mt-1">Profesores, estudiantes y tareas</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold text-blue-100">Atención Clínica</h3>
                <p className="text-sm text-blue-200 mt-1">Pacientes y tratamientos</p>
              </div>
            </div>
          </div>

          <div className="text-blue-200 text-sm">© 2024 Universidad Laica Eloy Alfaro de Manabí</div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8">
              <UleamBranding variant="dark" />
            </div>

            <Suspense
              fallback={
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <LoadingSpinner size="lg" text="Cargando formulario de acceso..." variant="medical" />
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
