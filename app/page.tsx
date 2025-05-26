import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UleamBranding } from "@/components/uleam-branding"
import { Calendar, Users, Shield, BookOpen, Stethoscope, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 lg:px-6">
          <Link className="flex items-center space-x-3" href="/">
            <UleamBranding variant="logo-only" />
            <div>
              <span className="text-xl font-bold text-green-800">ULEAM</span>
              <p className="text-sm text-green-600">Clínica Dental</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#inicio">
              Inicio
            </Link>
            <Link
              className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
              href="#servicios"
            >
              Servicios
            </Link>
            <Link
              className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
              href="#especialidades"
            >
              Especialidades
            </Link>
            <Link
              className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
              href="#contacto"
            >
              Contacto
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="inicio" className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="absolute inset-0 bg-grid-green-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative container px-4 py-16 md:py-24 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 flex justify-center">
                <UleamBranding variant="header" className="scale-75 md:scale-100" />
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-green-800 sm:text-5xl md:text-6xl lg:text-7xl">
                Sistema de Gestión
                <span className="block text-green-600">Clínica Dental Universitaria</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-green-700 md:text-xl">
                Plataforma integral para la gestión eficiente de pacientes, estudiantes, profesores y administradores en
                la Clínica Dental de la Universidad Laica Eloy Alfaro de Manabí.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/login">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg px-8 py-3">
                    Acceder al Sistema
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="servicios" className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold text-green-800 sm:text-4xl mb-4">Funcionalidades del Sistema</h2>
              <p className="text-lg text-green-600">
                Herramientas especializadas para cada tipo de usuario en nuestra clínica dental universitaria
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-green-200 hover:border-green-300 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-green-800">Para Pacientes</h3>
                  <p className="text-green-600">
                    Gestiona tus citas médicas, accede a tu historial clínico completo y mantén comunicación directa con
                    estudiantes y profesores.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:border-green-300 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-green-800">Para Estudiantes</h3>
                  <p className="text-green-600">
                    Administra tus pacientes asignados, solicita aprobaciones de procedimientos y lleva un registro
                    detallado de casos clínicos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:border-green-300 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-green-800">Para Profesores</h3>
                  <p className="text-green-600">
                    Supervisa el progreso de estudiantes, aprueba procedimientos clínicos y evalúa el desempeño
                    académico en tiempo real.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:border-green-300 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-green-800">Gestión de Citas</h3>
                  <p className="text-green-600">
                    Sistema avanzado de programación de citas con disponibilidad en tiempo real y notificaciones
                    automáticas.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:border-green-300 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Stethoscope className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-green-800">Historiales Clínicos</h3>
                  <p className="text-green-600">
                    Registros médicos digitales completos con odontogramas interactivos y seguimiento de tratamientos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:border-green-300 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-green-800">Seguridad Avanzada</h3>
                  <p className="text-green-600">
                    Protección de datos médicos con encriptación de nivel hospitalario y control de acceso basado en
                    roles.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section id="especialidades" className="py-16 md:py-24 bg-green-50">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold text-green-800 sm:text-4xl mb-4">Especialidades Disponibles</h2>
              <p className="text-lg text-green-600">
                Atención especializada en las principales áreas de la odontología
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Endodoncia", description: "Tratamiento de conductos radiculares" },
                { name: "Ortodoncia", description: "Corrección de malposiciones dentales" },
                { name: "Cirugía Oral", description: "Procedimientos quirúrgicos especializados" },
                { name: "Odontopediatría", description: "Atención dental para niños" },
              ].map((specialty) => (
                <Card key={specialty.name} className="border-green-200 bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">{specialty.name}</h3>
                    <p className="text-green-600 text-sm">{specialty.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">¿Listo para comenzar?</h2>
              <p className="text-lg text-green-100 mb-8">
                Únete a nuestra plataforma y experimenta la gestión dental del futuro
              </p>
              <Link href="/login">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3">
                  Iniciar Sesión Ahora
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="border-t border-green-200 bg-white py-12">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <UleamBranding variant="footer" className="mb-4" />
              <p className="text-sm text-green-600">
                Formando profesionales de la salud dental con excelencia académica y compromiso social.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#inicio" className="text-green-600 hover:text-green-800">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#servicios" className="text-green-600 hover:text-green-800">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="#especialidades" className="text-green-600 hover:text-green-800">
                    Especialidades
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-green-600 hover:text-green-800">
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm text-green-600">
                <li>Universidad Laica Eloy Alfaro de Manabí</li>
                <li>Facultad de Odontología</li>
                <li>Manta, Ecuador</li>
                <li>info@uleam.edu.ec</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-200 text-center">
            <p className="text-sm text-green-600">
              © 2025 Universidad Laica Eloy Alfaro de Manabí. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
