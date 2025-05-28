<template>
  <div class="flex min-h-screen flex-col bg-white">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div class="container flex h-16 items-center justify-between px-4 lg:px-6">
        <router-link class="flex items-center space-x-3" to="/">
          <UleamBranding variant="logo-only" />
          <div>
            <span class="text-xl font-bold text-green-800">ULEAM</span>
            <p class="text-sm text-green-600">Clínica Dental</p>
          </div>
        </router-link>
        <nav class="hidden md:flex items-center space-x-6">
          <a class="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#inicio">Inicio</a>
          <a class="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#servicios">Servicios</a>
          <a class="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#especialidades">Especialidades</a>
          <a class="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#contacto">Contacto</a>
        </nav>
        <div class="flex items-center space-x-3">
          <router-link to="/login">
            <button class="bg-green-600 hover:bg-green-700 text-white shadow-lg px-4 py-2 rounded-md transition-colors">
              Iniciar Sesión
            </button>
          </router-link>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <!-- Hero Section -->
      <section id="inicio" class="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
        <div class="absolute inset-0 bg-grid-green-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div class="relative container px-4 py-16 md:py-24 lg:py-32">
          <div class="mx-auto max-w-4xl text-center">
            <div class="mb-8 flex justify-center">
              <UleamBranding variant="header" class="scale-75 md:scale-100" />
            </div>
            <h1 class="mb-6 text-4xl font-bold tracking-tight text-green-800 sm:text-5xl md:text-6xl lg:text-7xl">
              Sistema de Gestión
              <span class="block text-green-600">Clínica Dental Universitaria</span>
            </h1>
            <p class="mx-auto mb-8 max-w-2xl text-lg text-green-700 md:text-xl">
              Plataforma integral para la gestión eficiente de pacientes, estudiantes, profesores y administradores en
              la Clínica Dental de la Universidad Laica Eloy Alfaro de Manabí.
            </p>
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <router-link to="/login">
                <button class="bg-green-600 hover:bg-green-700 text-white shadow-lg px-8 py-3 rounded-md text-lg transition-colors">
                  Acceder al Sistema
                </button>
              </router-link>
              <router-link to="/register">
                <button class="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-md text-lg transition-colors">
                  Registrarse
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="servicios" class="py-16 md:py-24 bg-white">
        <div class="container px-4">
          <div class="mx-auto max-w-2xl text-center mb-16">
            <h2 class="text-3xl font-bold text-green-800 sm:text-4xl mb-4">Funcionalidades del Sistema</h2>
            <p class="text-lg text-green-600">
              Herramientas especializadas para cada tipo de usuario en nuestra clínica dental universitaria
            </p>
          </div>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div class="border border-green-200 hover:border-green-300 transition-colors rounded-lg p-6 bg-white shadow-sm">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Users class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="mb-2 text-xl font-semibold text-green-800">Para Pacientes</h3>
              <p class="text-green-600">
                Gestiona tus citas médicas, accede a tu historial clínico completo y mantén comunicación directa con
                estudiantes y profesores.
              </p>
            </div>

            <div class="border border-green-200 hover:border-green-300 transition-colors rounded-lg p-6 bg-white shadow-sm">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <BookOpen class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="mb-2 text-xl font-semibold text-green-800">Para Estudiantes</h3>
              <p class="text-green-600">
                Administra tus pacientes asignados, solicita aprobaciones de procedimientos y lleva un registro
                detallado de casos clínicos.
              </p>
            </div>

            <div class="border border-green-200 hover:border-green-300 transition-colors rounded-lg p-6 bg-white shadow-sm">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Award class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="mb-2 text-xl font-semibold text-green-800">Para Profesores</h3>
              <p class="text-green-600">
                Supervisa el progreso de estudiantes, aprueba procedimientos clínicos y evalúa el desempeño
                académico en tiempo real.
              </p>
            </div>

            <div class="border border-green-200 hover:border-green-300 transition-colors rounded-lg p-6 bg-white shadow-sm">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Calendar class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="mb-2 text-xl font-semibold text-green-800">Gestión de Citas</h3>
              <p class="text-green-600">
                Sistema avanzado de programación de citas con disponibilidad en tiempo real y notificaciones
                automáticas.
              </p>
            </div>

            <div class="border border-green-200 hover:border-green-300 transition-colors rounded-lg p-6 bg-white shadow-sm">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Stethoscope class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="mb-2 text-xl font-semibold text-green-800">Historiales Clínicos</h3>
              <p class="text-green-600">
                Registros médicos digitales completos con odontogramas interactivos y seguimiento de tratamientos.
              </p>
            </div>

            <div class="border border-green-200 hover:border-green-300 transition-colors rounded-lg p-6 bg-white shadow-sm">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Shield class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="mb-2 text-xl font-semibold text-green-800">Seguridad Avanzada</h3>
              <p class="text-green-600">
                Protección de datos médicos con encriptación de nivel hospitalario y control de acceso basado en
                roles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Specialties Section -->
      <section id="especialidades" class="py-16 md:py-24 bg-green-50">
        <div class="container px-4">
          <div class="mx-auto max-w-2xl text-center mb-16">
            <h2 class="text-3xl font-bold text-green-800 sm:text-4xl mb-4">Especialidades Disponibles</h2>
            <p class="text-lg text-green-600">
              Atención especializada en las principales áreas de la odontología
            </p>
          </div>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="specialty in specialties" :key="specialty.name" 
                 class="border border-green-200 bg-white hover:shadow-lg transition-shadow rounded-lg p-6 text-center">
              <h3 class="text-lg font-semibold text-green-800 mb-2">{{ specialty.name }}</h3>
              <p class="text-green-600 text-sm">{{ specialty.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700">
        <div class="container px-4">
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-3xl font-bold text-white sm:text-4xl mb-4">¿Listo para comenzar?</h2>
            <p class="text-lg text-green-100 mb-8">
              Únete a nuestra plataforma y experimenta la gestión dental del futuro
            </p>
            <router-link to="/login">
              <button class="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-md text-lg transition-colors">
                Iniciar Sesión Ahora
              </button>
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer id="contacto" class="border-t border-green-200 bg-white py-12">
      <div class="container px-4">
        <div class="grid gap-8 md:grid-cols-3">
          <div>
            <UleamBranding variant="footer" class="mb-4" />
            <p class="text-sm text-green-600">
              Formando profesionales de la salud dental con excelencia académica y compromiso social.
            </p>
          </div>
          <div>
            <h3 class="font-semibold text-green-800 mb-4">Enlaces Rápidos</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#inicio" class="text-green-600 hover:text-green-800">Inicio</a></li>
              <li><a href="#servicios" class="text-green-600 hover:text-green-800">Servicios</a></li>
              <li><a href="#especialidades" class="text-green-600 hover:text-green-800">Especialidades</a></li>
              <li><router-link to="/login" class="text-green-600 hover:text-green-800">Iniciar Sesión</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-green-800 mb-4">Contacto</h3>
            <ul class="space-y-2 text-sm text-green-600">
              <li>Universidad Laica Eloy Alfaro de Manabí</li>
              <li>Facultad de Odontología</li>
              <li>Manta, Ecuador</li>
              <li>info@uleam.edu.ec</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-green-200 text-center">
          <p class="text-sm text-green-600">
            © 2025 Universidad Laica Eloy Alfaro de Manabí. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UleamBranding from '../components/UleamBranding.vue'
import { Users, BookOpen, Award, Calendar, Stethoscope, Shield } from 'lucide-vue-next'

const specialties = ref([
  { name: 'Endodoncia', description: 'Tratamiento de conductos radiculares' },
  { name: 'Ortodoncia', description: 'Corrección de malposiciones dentales' },
  { name: 'Cirugía Oral', description: 'Procedimientos quirúrgicos especializados' },
  { name: 'Odontopediatría', description: 'Atención dental para niños' }
])
</script>
