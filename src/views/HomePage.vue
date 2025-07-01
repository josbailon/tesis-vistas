<!--
  PÁGINA DE INICIO (HOME PAGE)
  
  Esta es la página principal pública de la aplicación.
  Muestra información sobre la clínica dental ULEAM y permite acceder al sistema.
-->
<template>
  <!-- Contenedor principal de la página -->
  <div class="flex min-h-screen flex-col bg-white">
    
    <!-- HEADER STICKY -->
    <header class="sticky top-0 z-50 w-full border-b border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div class="container flex h-16 items-center justify-between px-4 lg:px-6">
        
        <!-- LOGO Y TÍTULO -->
        <router-link class="flex items-center space-x-3" to="/">
          <UleamBranding variant="logo-only" />
          <div>
            <span class="text-xl font-bold text-green-800">ULEAM</span>
            <p class="text-sm text-green-600">Clínica Dental</p>
          </div>
        </router-link>
        
        <!-- NAVEGACIÓN PRINCIPAL -->
        <nav class="hidden md:flex items-center space-x-6">
          <a class="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#inicio">Inicio</a>
          <a class="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#servicios">Servicios</a>
          <a class="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#especialidades">Especialidades</a>
          <a class="text-sm font-medium text-green-700 hover:text-green-800 transition-colors" href="#contacto">Contacto</a>
        </nav>
        
        <!-- BOTÓN DE LOGIN -->
        <div class="flex items-center space-x-3">
          <router-link to="/login">
            <button class="bg-green-600 hover:bg-green-700 text-white shadow-lg px-4 py-2 rounded-md transition-colors">
              Iniciar Sesión
            </button>
          </router-link>
        </div>
      </div>
    </header>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="flex-1">
      
      <!-- SECCIÓN HERO -->
      <section id="inicio" class="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
        <!-- Patrón de fondo decorativo -->
        <div class="absolute inset-0 bg-grid-green-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        
        <div class="relative container px-4 py-16 md:py-24 lg:py-32">
          <div class="mx-auto max-w-4xl text-center">
            
            <!-- BRANDING PRINCIPAL -->
            <div class="mb-8 flex justify-center">
              <UleamBranding variant="header" class="scale-75 md:scale-100" />
            </div>
            
            <!-- TÍTULO PRINCIPAL -->
            <h1 class="mb-6 text-4xl font-bold tracking-tight text-green-800 sm:text-5xl md:text-6xl lg:text-7xl">
              Sistema de Gestión
              <span class="block text-green-600">Clínica Dental Universitaria</span>
            </h1>
            
            <!-- DESCRIPCIÓN -->
            <p class="mx-auto mb-8 max-w-2xl text-lg text-green-700 md:text-xl">
              Plataforma integral para la gestión eficiente de pacientes, estudiantes, profesores y administradores en
              la Clínica Dental de la Universidad Laica Eloy Alfaro de Manabí.
            </p>
            
            <!-- BOTONES DE ACCIÓN -->
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

      <!-- SECCIÓN DE FUNCIONALIDADES -->
      <section id="servicios" class="py-16 md:py-24 bg-white">
        <div class="container px-4">
          
          <!-- TÍTULO DE SECCIÓN -->
          <div class="mx-auto max-w-2xl text-center mb-16">
            <h2 class="text-3xl font-bold text-green-800 sm:text-4xl mb-4">Funcionalidades del Sistema</h2>
            <p class="text-lg text-green-600">
              Herramientas especializadas para cada tipo de usuario en nuestra clínica dental universitaria
            </p>
          </div>
          
          <!-- GRID DE FUNCIONALIDADES -->
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            <!-- FUNCIONALIDAD: Para Pacientes -->
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

            <!-- FUNCIONALIDAD: Para Estudiantes -->
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

            <!-- FUNCIONALIDAD: Para Profesores -->
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

            <!-- FUNCIONALIDAD: Gestión de Citas -->
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

            <!-- FUNCIONALIDAD: Historiales Clínicos -->
            <div class="border border-green-200 hover:border-green-300 transition-colors rounded-lg p-6 bg-white shadow-sm">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Stethoscope class="h-6 w-6 text-green-600" />
              </div>
              <h3 class="mb-2 text-xl font-semibold text-green-800">Historiales Clínicos</h3>
              <p class="text-green-600">
                Registros médicos digitales completos con odontogramas interactivos y seguimiento de tratamientos.
              </p>
            </div>

            <!-- FUNCIONALIDAD: Seguridad -->
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

      <!-- SECCIÓN DE ESPECIALIDADES -->
      <section id="especialidades" class="py-16 md:py-24 bg-green-50">
        <div class="container px-4">
          
          <!-- TÍTULO DE SECCIÓN -->
          <div class="mx-auto max-w-2xl text-center mb-16">
            <h2 class="text-3xl font-bold text-green-800 sm:text-4xl mb-4">Especialidades Disponibles</h2>
            <p class="text-lg text-green-600">
              Atención especializada en las principales áreas de la odontología
            </p>
          </div>
          
          <!-- GRID DE ESPECIALIDADES -->
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div v-for="specialty in specialties" :key="specialty.name" 
                 class="border border-green-200 bg-white hover:shadow-lg transition-shadow rounded-lg p-6 text-center">
              <h3 class="text-lg font-semibold text-green-800 mb-2">{{ specialty.name }}</h3>
              <p class="text-green-600 text-sm">{{ specialty.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN CALL TO ACTION -->
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

    <!-- FOOTER -->
    <footer id="contacto" class="border-t border-green-200 bg-white py-12">
      <div class="container px-4">
        <div class="grid gap-8 md:grid-cols-3">
          
          <!-- INFORMACIÓN DE LA UNIVERSIDAD -->
          <div>
            <UleamBranding variant="footer" class="mb-4" />
            <p class="text-sm text-green-600">
              Formando profesionales de la salud dental con excelencia académica y compromiso social.
            </p>
          </div>
          
          <!-- ENLACES RÁPIDOS -->
          <div>
            <h3 class="font-semibold text-green-800 mb-4">Enlaces Rápidos</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#inicio" class="text-green-600 hover:text-green-800">Inicio</a></li>
              <li><a href="#servicios" class="text-green-600 hover:text-green-800">Servicios</a></li>
              <li><a href="#especialidades" class="text-green-600 hover:text-green-800">Especialidades</a></li>
              <li><router-link to="/login" class="text-green-600 hover:text-green-800">Iniciar Sesión</router-link></li>
            </ul>
          </div>
          
          <!-- INFORMACIÓN DE CONTACTO -->
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
        
        <!-- COPYRIGHT -->
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
/**
 * LÓGICA DE LA PÁGINA DE INICIO
 * 
 * Maneja los datos estáticos y la presentación de la información de la clínica
 */

// Importar ref para datos reactivos
import { ref } from 'vue'
// Importar componente de branding
import UleamBranding from '../components/UleamBranding.vue'
// Importar iconos necesarios
import { Users, BookOpen, Award, Calendar, Stethoscope, Shield } from 'lucide-vue-next'

/**
 * DATOS DE ESPECIALIDADES
 * 
 * Array reactivo con las especialidades disponibles en la clínica
 * En una aplicación real, estos datos vendrían de una API
 */
const specialties = ref([
  { name: 'Endodoncia', description: 'Tratamiento de conductos radiculares' },
  { name: 'Ortodoncia', description: 'Corrección de malposiciones dentales' },
  { name: 'Cirugía Oral', description: 'Procedimientos quirúrgicos especializados' },
  { name: 'Odontopediatría', description: 'Atención dental para niños' }
])
</script>
