"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UleamBranding } from "@/components/uleam-branding"
import { Heart, Users, GraduationCap, Stethoscope, Calendar, FileText, ArrowRight, Shield, Clock } from "lucide-react"

export default function HomePage() {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isInitialized && user) {
      router.push("/dashboard")
    }
  }, [user, isInitialized, router])

  if (isLoading || !isInitialized) {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <UleamBranding variant="compact" />
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Iniciar Sesión
              </Button>
              <Button onClick={() => router.push("/register")} className="bg-green-600 hover:bg-green-700 text-white">
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="h-20 w-20 mx-auto text-green-600 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Clínica Dental
              <span className="block text-green-600">Universitaria ULEAM</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Plataforma integral de gestión para estudiantes, profesores, pacientes y administradores. Servicios
              odontológicos gratuitos con la más alta calidad académica.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/login")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
            >
              Acceder al Sistema
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/register")}
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg"
            >
              Registrarse como Paciente
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Qué ofrecemos?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa que conecta a toda la comunidad de la clínica dental universitaria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle className="text-green-800">Para Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Agenda citas gratuitas, consulta tu historial médico y recibe atención de calidad
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle className="text-blue-800">Para Estudiantes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Gestiona pacientes, realiza tratamientos supervisados y desarrolla habilidades clínicas
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Stethoscope className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle className="text-purple-800">Para Profesores</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Supervisa estudiantes, evalúa casos clínicos y gestiona el proceso académico
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-red-600 mb-4" />
                <CardTitle className="text-red-800">Para Administradores</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Control total del sistema, gestión de usuarios y análisis de datos
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Servicios Disponibles</h2>
            <p className="text-lg text-gray-600">Atención odontológica integral completamente gratuita</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-lg border border-green-200">
              <Calendar className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Endodoncia</h3>
              <p className="text-gray-600">Tratamientos de conducto y terapia pulpar</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200">
              <FileText className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ortodoncia</h3>
              <p className="text-gray-600">Corrección de malposiciones dentales</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-purple-200">
              <Clock className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cirugía Oral</h3>
              <p className="text-gray-600">Extracciones y procedimientos quirúrgicos</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-red-200">
              <Heart className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Odontopediatría</h3>
              <p className="text-gray-600">Atención dental especializada para niños</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-green-200">
              <Users className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Operatoria Dental</h3>
              <p className="text-gray-600">Restauraciones y tratamientos conservadores</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-200">
              <Stethoscope className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Periodoncia</h3>
              <p className="text-gray-600">Tratamiento de encías y tejidos de soporte</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 text-green-100">
            Únete a nuestra comunidad y accede a servicios odontológicos de calidad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/login")}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg"
            >
              Iniciar Sesión
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/register")}
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Registrarse
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <UleamBranding variant="compact" className="mb-4" />
            <p className="text-gray-400 mb-4">Universidad Laica Eloy Alfaro de Manabí - Clínica Dental Universitaria</p>
            <p className="text-gray-500 text-sm">© 2024 ULEAM. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
