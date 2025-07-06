import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Shield, GraduationCap, Heart } from "lucide-react"
import Link from "next/link"
import { UleamBranding } from "@/components/uleam-branding"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <UleamBranding />
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Sistema Integral de Gestión Dental
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Clínica Dental
              <span className="text-primary block">Universidad ULEAM</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Plataforma moderna para la gestión de citas, tratamientos y formación académica en odontología. Conectando
              estudiantes, profesores y pacientes en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Cita
                </Button>
              </Link>
              <Link href="/students-info">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Información Estudiantes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Servicios y Características</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestro sistema ofrece una experiencia completa para todos los usuarios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Suspense fallback={<LoadingSpinner />}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Gestión de Citas</CardTitle>
                  <CardDescription>
                    Sistema inteligente de agendamiento con disponibilidad en tiempo real
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Reserva online 24/7</li>
                    <li>• Confirmación automática</li>
                    <li>• Recordatorios por email</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Formación Académica</CardTitle>
                  <CardDescription>Plataforma educativa para estudiantes de odontología</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Casos clínicos interactivos</li>
                    <li>• Seguimiento de progreso</li>
                    <li>• Evaluaciones en línea</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Atención Especializada</CardTitle>
                  <CardDescription>Múltiples especialidades dentales disponibles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ortodoncia</li>
                    <li>• Endodoncia</li>
                    <li>• Cirugía Oral</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Gestión de Pacientes</CardTitle>
                  <CardDescription>Historial clínico digital completo y seguro</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Expedientes digitales</li>
                    <li>• Historial de tratamientos</li>
                    <li>• Imágenes y radiografías</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Horarios Flexibles</CardTitle>
                  <CardDescription>Adaptamos nuestros horarios a tu disponibilidad</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Horarios matutinos</li>
                    <li>• Horarios vespertinos</li>
                    <li>• Citas de emergencia</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Seguridad y Privacidad</CardTitle>
                  <CardDescription>Protección total de datos personales y médicos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Encriptación de datos</li>
                    <li>• Acceso controlado</li>
                    <li>• Cumplimiento LOPD</li>
                  </ul>
                </CardContent>
              </Card>
            </Suspense>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a nuestra comunidad dental y mejora tu experiencia de atención
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Crear Cuenta
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <UleamBranding variant="light" />
              <p className="text-gray-400 mt-4">Formando profesionales de la salud dental con excelencia académica.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Consultas Generales</li>
                <li>Especialidades</li>
                <li>Emergencias</li>
                <li>Formación Académica</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@uleam.edu.ec</li>
                <li>📞 (05) 2623-740</li>
                <li>📍 Manta, Manabí, Ecuador</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white">
                    Portal Estudiantes
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Portal Profesores
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    Registro Pacientes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Universidad Laica Eloy Alfaro de Manabí. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
