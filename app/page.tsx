import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Clínica Dental</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline">Iniciar Sesión</Button>
              </Link>
              <Link href="/register">
                <Button>Registrarse</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Sistema de Gestión para Clínica Dental
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Plataforma integral para la gestión de citas, expedientes clínicos y supervisión académica.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg">Comenzar</Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Más información
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=550&width=450"
                  alt="Sistema de Gestión para Clínica Dental"
                  className="aspect-video overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Características Principales</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestra plataforma ofrece soluciones específicas para cada rol en la clínica dental.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Pacientes</h3>
                <p className="text-sm text-muted-foreground">
                  Consulta de citas, visualización de expediente y solicitud de citas.
                </p>
              </div>
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Estudiantes</h3>
                <p className="text-sm text-muted-foreground">
                  Gestión de citas, historias clínicas y solicitud de aprobaciones académicas.
                </p>
              </div>
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Profesores</h3>
                <p className="text-sm text-muted-foreground">
                  Aprobación de casos, calificación y gestión de agenda docente.
                </p>
              </div>
              <div className="grid gap-1 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Administradores</h3>
                <p className="text-sm text-muted-foreground">
                  Gestión de usuarios, especialidades y supervisión del sistema.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Clínica Dental. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
