import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UleamBranding } from "@/components/uleam-branding"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <UleamBranding variant="full" />
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-green-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Clínica Dental Universitaria ULEAM</h1>
            <p className="text-xl text-green-700 max-w-3xl mx-auto mb-10">
              Servicios odontológicos de calidad brindados por estudiantes bajo supervisión profesional
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Acceder al Sistema
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Registrarse como Paciente
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Nuestros Servicios</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Diagnóstico Completo</h3>
                <p className="text-green-700">Evaluación integral de la salud bucal con tecnología avanzada</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Tratamientos Especializados</h3>
                <p className="text-green-700">Servicios en diversas especialidades odontológicas</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Citas Flexibles</h3>
                <p className="text-green-700">Sistema de citas adaptado a tus necesidades y horarios</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-8">¿Por qué elegirnos?</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-green-700 mb-6">
                La Clínica Dental Universitaria ULEAM ofrece atención de calidad a precios accesibles, brindando a
                nuestros estudiantes la experiencia práctica necesaria bajo la supervisión de profesionales
                experimentados.
              </p>
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700">Agendar una Cita</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <UleamBranding variant="light" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-green-200">© {new Date().getFullYear()} Clínica Dental Universitaria ULEAM</p>
              <p className="text-green-300 text-sm mt-1">Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
