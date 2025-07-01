<!--
  COMPONENTE DE BARRA LATERAL (SIDEBAR)
  
  Este componente proporciona la navegación principal de la aplicación.
  Se adapta dinámicamente según el rol del usuario y permite colapsar/expandir.
-->
<template>
  <!-- 
    Contenedor principal del sidebar con ancho dinámico
    collapsed controla si está colapsado (ancho reducido) o expandido
  -->
  <div :class="`${collapsed ? 'w-16' : 'w-72'} transition-all duration-300 bg-white border-r border-green-200 flex flex-col h-full shadow-lg`">
    
    <!-- HEADER DEL SIDEBAR -->
    <div class="p-4 border-b border-green-200 bg-gradient-to-r from-green-50 to-green-100">
      <div class="flex items-center justify-between">
        <!-- Logo y título de ULEAM -->
        <div class="flex items-center space-x-3">
          <UleamBranding variant="logo-only" />
          <div v-if="!collapsed">
            <h2 class="text-lg font-bold text-green-700">ULEAM</h2>
            <p class="text-xs text-green-600">Clínica Dental</p>
          </div>
        </div>
        
        <!-- Botón para colapsar/expandir sidebar -->
        <button
          @click="collapsed = !collapsed"
          class="text-green-600 hover:text-green-700 hover:bg-green-100 transition-colors p-1 rounded"
        >
          <!-- Icono cambia según estado colapsado -->
          <ChevronRight v-if="collapsed" class="h-4 w-4" />
          <ChevronLeft v-else class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- INFORMACIÓN DEL USUARIO -->
    <div v-if="authStore.user" class="p-4 border-b border-green-200 bg-gradient-to-r from-gray-50 to-green-50/30">
      <div :class="`${collapsed ? 'text-center' : 'flex items-center space-x-3'}`">
        <!-- Avatar del usuario con inicial -->
        <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold shadow">
          {{ authStore.user.name.charAt(0).toUpperCase() }}
        </div>
        
        <!-- Información del usuario (solo si no está colapsado) -->
        <div v-if="!collapsed" class="flex-1 min-w-0">
          <p class="text-sm font-medium text-green-800 truncate">{{ authStore.user.name }}</p>
          <p class="text-xs text-green-600 truncate">{{ authStore.user.email }}</p>
          <!-- Badge con el rol del usuario -->
          <span :class="`text-xs mt-1 border px-2 py-1 rounded ${getRoleColor(authStore.user.role)}`">
            {{ authStore.getRoleDisplayName(authStore.user.role) }}
          </span>
        </div>
      </div>
    </div>

    <!-- NAVEGACIÓN PRINCIPAL -->
    <div class="flex-1 overflow-y-auto py-4">
      <nav class="space-y-6">
        <!-- 
          Iterar sobre las secciones de navegación
          navigation es una computed property que cambia según el rol del usuario
        -->
        <div v-for="(section, sectionIndex) in navigation" :key="sectionIndex" class="px-4">
          <!-- Título de la sección (solo si no está colapsado) -->
          <h3 v-if="!collapsed" class="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">
            {{ section.title }}
          </h3>
          
          <!-- Items de navegación de la sección -->
          <div class="space-y-1">
            <button
              v-for="(item, itemIndex) in section.items"
              :key="itemIndex"
              @click="$router.push(item.href)"
              :class="`
                w-full justify-start h-auto py-3 px-3 transition-all duration-200 rounded-md text-left
                ${
                  $route.path === item.href
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow hover:shadow-lg'
                    : 'text-green-700 hover:text-green-800 hover:bg-green-50'
                }
                ${collapsed ? 'px-2' : ''}
              `"
            >
              <!-- Icono del item de navegación -->
              <component :is="item.icon" :class="`h-5 w-5 ${collapsed ? '' : 'mr-3'} flex-shrink-0`" />
              
              <!-- Contenido del item (solo si no está colapsado) -->
              <div v-if="!collapsed" class="flex-1 text-left">
                <div class="font-medium">{{ item.title }}</div>
                <div v-if="item.description" class="text-xs opacity-75 mt-0.5">{{ item.description }}</div>
              </div>
              
              <!-- Badge opcional (solo si no está colapsado) -->
              <span v-if="!collapsed && item.badge" class="ml-auto bg-white/20 text-current border-white/30 px-2 py-1 rounded text-xs">
                {{ item.badge }}
              </span>
            </button>
          </div>
          
          <!-- Separador entre secciones -->
          <div v-if="sectionIndex < navigation.length - 1 && !collapsed" class="mt-4 border-t border-green-200"></div>
        </div>
      </nav>
    </div>

    <!-- FOOTER CON BOTÓN DE LOGOUT -->
    <div class="p-4 border-t border-green-200 bg-gradient-to-r from-gray-50 to-red-50/30">
      <button
        @click="handleLogout"
        class="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 py-2 px-3 rounded-md text-left"
      >
        <LogOut :class="`h-5 w-5 ${collapsed ? '' : 'mr-3'}`" />
        <span v-if="!collapsed">Cerrar Sesión</span>
      </button>
    </div>
    
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL COMPONENTE SIDEBAR
 * 
 * Maneja la navegación, estado colapsado y opciones según el rol del usuario
 */

// Importar hooks y utilidades de Vue
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Importar store de autenticación
import { useAuthStore } from '../stores/auth'
// Importar componente de branding
import UleamBranding from './UleamBranding.vue'
// Importar iconos de Lucide Vue
import {
  Calendar, Users, FileText, Settings, LogOut, ChevronLeft, ChevronRight, Home,
  Stethoscope, GraduationCap, Shield, BarChart3, Clock, BookOpen, User, Activity,
  Database, CheckSquare, FileCheck, TrendingUp, CalendarIcon, Bell, HelpCircle
} from 'lucide-vue-next'

// Obtener instancias del router y ruta actual
const router = useRouter()
const route = useRoute()
// Obtener store de autenticación
const authStore = useAuthStore()

// Estado reactivo para controlar si el sidebar está colapsado
const collapsed = ref(false)

/**
 * FUNCIÓN PARA GENERAR NAVEGACIÓN SEGÚN ROL
 * 
 * Retorna diferentes opciones de navegación dependiendo del rol del usuario
 * Cada rol tiene acceso a diferentes funcionalidades
 */
const getNavigationForRole = (role) => {
  switch (role) {
    /**
     * NAVEGACIÓN PARA PACIENTES
     * Funcionalidades básicas: citas, perfil, historial
     */
    case 'patient':
      return [
        {
          title: 'Mi Cuenta',
          items: [
            { title: 'Mis Citas', href: '/dashboard/my-appointments', icon: Calendar, description: 'Ver y gestionar citas' },
            { title: 'Reservar Cita', href: '/dashboard/book-appointment', icon: CalendarIcon, description: 'Agendar nueva cita' },
            { title: 'Mi Perfil', href: '/dashboard/my-profile', icon: User, description: 'Información personal' },
            { title: 'Historial Médico', href: '/dashboard/my-records', icon: FileText, description: 'Expediente clínico' }
          ]
        },
        {
          title: 'Información',
          items: [
            { title: 'Especialidades', href: '/dashboard/specialties', icon: Stethoscope, description: 'Servicios disponibles' },
            { title: 'Configuración', href: '/dashboard/settings', icon: Settings, description: 'Preferencias' }
          ]
        }
      ]

    /**
     * NAVEGACIÓN PARA ESTUDIANTES
     * Funcionalidades académicas: pacientes, casos clínicos, odontograma
     */
    case 'student':
      return [
        {
          title: 'Pacientes',
          items: [
            { title: 'Lista de Pacientes', href: '/dashboard/patients', icon: Users, description: 'Gestionar pacientes' },
            { title: 'Citas', href: '/dashboard/appointments', icon: Calendar, description: 'Agenda de citas' },
            { title: 'Casos Clínicos', href: '/dashboard/clinical-cases', icon: FileCheck, description: 'Casos asignados' },
            { title: 'Historial Clínico', href: '/dashboard/clinical-history', icon: FileText, description: 'Expedientes' },
            { title: 'Odontograma', href: '/dashboard/odontogram', icon: Activity, description: 'Herramienta dental' }
          ]
        },
        {
          title: 'Académico',
          items: [
            { title: 'Mis Tareas', href: '/dashboard/academic', icon: BookOpen, description: 'Actividades académicas' },
            { title: 'Mi Progreso', href: '/dashboard/my-progress', icon: TrendingUp, description: 'Avance académico' }
          ]
        },
        {
          title: 'Herramientas',
          items: [
            { title: 'Mi Perfil', href: '/dashboard/my-profile', icon: User, description: 'Información personal' },
            { title: 'Configuración', href: '/dashboard/settings', icon: Settings, description: 'Preferencias' }
          ]
        }
      ]

    /**
     * NAVEGACIÓN PARA PROFESORES
     * Funcionalidades de supervisión: estudiantes, aprobaciones, especialidad
     */
    case 'professor':
      return [
        {
          title: 'Gestión Académica',
          items: [
            { title: 'Dashboard', href: '/dashboard/teacher', icon: Home, description: 'Panel principal' },
            { title: 'Estudiantes', href: '/dashboard/teacher/students', icon: GraduationCap, description: 'Gestionar estudiantes' },
            { title: 'Aprobaciones', href: '/dashboard/teacher/approvals', icon: CheckSquare, description: 'Revisar solicitudes' }
          ]
        },
        {
          title: 'Supervisión',
          items: [
            { title: 'Especialidad', href: '/dashboard/specialty', icon: Stethoscope, description: 'Mi especialidad' }
          ]
        },
        {
          title: 'Herramientas',
          items: [
            { title: 'Mi Perfil', href: '/dashboard/my-profile', icon: User, description: 'Información personal' },
            { title: 'Configuración', href: '/dashboard/settings', icon: Settings, description: 'Preferencias' }
          ]
        }
      ]

    /**
     * NAVEGACIÓN PARA ADMINISTRADORES
     * Funcionalidades completas: usuarios, analíticas, sistema
     */
    case 'admin':
      return [
        {
          title: 'Administración',
          items: [
            { title: 'Dashboard', href: '/dashboard/admin', icon: Home, description: 'Panel principal' },
            { title: 'Usuarios', href: '/dashboard/admin/users', icon: Users, description: 'Gestión de usuarios' },
            { title: 'Analíticas', href: '/dashboard/admin/analytics', icon: BarChart3, description: 'Reportes y métricas' }
          ]
        },
        {
          title: 'Herramientas',
          items: [
            { title: 'Mi Perfil', href: '/dashboard/my-profile', icon: User, description: 'Información personal' },
            { title: 'Configuración', href: '/dashboard/settings', icon: Settings, description: 'Preferencias' }
          ]
        }
      ]

    /**
     * NAVEGACIÓN POR DEFECTO
     * Para roles no reconocidos o usuarios sin rol específico
     */
    default:
      return [
        {
          title: 'General',
          items: [
            { title: 'Dashboard', href: '/dashboard', icon: Home, description: 'Panel principal' },
            { title: 'Mi Perfil', href: '/dashboard/my-profile', icon: User, description: 'Información personal' },
            { title: 'Configuración', href: '/dashboard/settings', icon: Settings, description: 'Preferencias' }
          ]
        }
      ]
  }
}

/**
 * COMPUTED PROPERTY PARA NAVEGACIÓN
 * 
 * Genera la navegación apropiada según el rol del usuario actual
 * Se actualiza automáticamente cuando cambia el usuario
 */
const navigation = computed(() => {
  return authStore.user ? getNavigationForRole(authStore.user.role) : []
})

/**
 * FUNCIÓN PARA OBTENER COLORES DEL ROL
 * 
 * Retorna clases CSS para colorear el badge del rol del usuario
 */
const getRoleColor = (role) => {
  switch (role) {
    case 'patient':
      return 'bg-blue-100 text-blue-600 border-blue-300'
    case 'student':
      return 'bg-green-100 text-green-600 border-green-300'
    case 'professor':
      return 'bg-purple-100 text-purple-600 border-purple-300'
    case 'admin':
      return 'bg-red-100 text-red-600 border-red-300'
    default:
      return 'bg-gray-100 text-gray-600 border-gray-300'
  }
}

/**
 * FUNCIÓN PARA MANEJAR LOGOUT
 * 
 * Cierra la sesión del usuario y redirige al login
 */
const handleLogout = async () => {
  // Llamar al método logout del store
  await authStore.logout()
  // Redirigir a la página de login
  router.push('/login')
}
</script>
