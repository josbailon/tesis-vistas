<!--
  PÁGINA PRINCIPAL DEL DASHBOARD
  
  Esta página actúa como el hub central del dashboard y redirige automáticamente
  a los usuarios según su rol específico para optimizar su experiencia.
-->
<template>
  <!-- Contenedor principal del dashboard -->
  <div class="space-y-8">
    
    <!-- HEADER DE BIENVENIDA -->
    <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {{ authStore.user?.name }}!
          </h1>
          <p class="text-lg text-gray-600">
            {{ roleWelcomeMessage }}
          </p>
          <div class="mt-4 flex items-center gap-2">
            <span :class="roleBadgeColor">
              {{ authStore.getRoleDisplayName(authStore.user?.role) }}
            </span>
            <span class="text-sm text-gray-500">•</span>
            <span class="text-sm text-gray-600">{{ currentDate }}</span>
          </div>
        </div>
        
        <!-- AVATAR DEL USUARIO -->
        <div class="hidden md:block">
          <div class="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {{ authStore.user?.name?.charAt(0).toUpperCase() }}
          </div>
        </div>
      </div>
    </div>

    <!-- ACCIONES RÁPIDAS SEGÚN EL ROL -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- TARJETAS DE ACCIONES RÁPIDAS -->
      <div
        v-for="action in quickActions"
        :key="action.title"
        @click="$router.push(action.href)"
        class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer hover:border-green-300 group"
      >
        <div class="flex items-center justify-between mb-4">
          <div :class="`p-3 rounded-lg ${action.iconBg} group-hover:scale-110 transition-transform`">
            <component :is="action.icon" :class="`h-6 w-6 ${action.iconColor}`" />
          </div>
          <ChevronRight class="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
        </div>
        
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ action.title }}</h3>
        <p class="text-gray-600 text-sm mb-3">{{ action.description }}</p>
        
        <!-- BADGE CON INFORMACIÓN ADICIONAL -->
        <div v-if="action.badge" class="flex items-center gap-2">
          <span :class="`px-2 py-1 rounded-full text-xs font-medium ${action.badgeColor}`">
            {{ action.badge }}
          </span>
        </div>
      </div>
    </div>

    <!-- ESTADÍSTICAS RÁPIDAS -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 class="h-6 w-6 text-blue-600" />
        Resumen de Actividad
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- ESTADÍSTICA: CITAS -->
        <div class="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Calendar class="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div class="text-2xl font-bold text-blue-900">{{ stats.appointments }}</div>
          <div class="text-sm text-blue-700">Citas este mes</div>
        </div>
        
        <!-- ESTADÍSTICA: PACIENTES -->
        <div class="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <Users class="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div class="text-2xl font-bold text-green-900">{{ stats.patients }}</div>
          <div class="text-sm text-green-700">Pacientes activos</div>
        </div>
        
        <!-- ESTADÍSTICA: TRATAMIENTOS -->
        <div class="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <Stethoscope class="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div class="text-2xl font-bold text-yellow-900">{{ stats.treatments }}</div>
          <div class="text-sm text-yellow-700">Tratamientos completados</div>
        </div>
        
        <!-- ESTADÍSTICA: PENDIENTES -->
        <div class="text-center p-4 bg-red-50 rounded-lg border border-red-200">
          <Clock class="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div class="text-2xl font-bold text-red-900">{{ stats.pending }}</div>
          <div class="text-sm text-red-700">Tareas pendientes</div>
        </div>
      </div>
    </div>

    <!-- ACTIVIDAD RECIENTE -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Activity class="h-6 w-6 text-green-600" />
        Actividad Reciente
      </h2>
      
      <div class="space-y-4">
        <div
          v-for="activity in recentActivities"
          :key="activity.id"
          class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div :class="`p-2 rounded-full ${activity.iconBg}`">
            <component :is="activity.icon" :class="`h-4 w-4 ${activity.iconColor}`" />
          </div>
          
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
            <p class="text-sm text-gray-600">{{ activity.description }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
          </div>
          
          <span :class="`px-2 py-1 rounded-full text-xs font-medium ${activity.statusColor}`">
            {{ activity.status }}
          </span>
        </div>
      </div>
      
      <!-- ENLACE PARA VER MÁS -->
      <div class="mt-6 text-center">
        <button class="text-green-600 hover:text-green-700 text-sm font-medium">
          Ver toda la actividad →
        </button>
      </div>
    </div>

    <!-- NOTIFICACIONES IMPORTANTES -->
    <div v-if="importantNotifications.length > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h2 class="text-xl font-semibold text-yellow-900 mb-4 flex items-center gap-2">
        <Bell class="h-6 w-6 text-yellow-600" />
        Notificaciones Importantes
      </h2>
      
      <div class="space-y-3">
        <div
          v-for="notification in importantNotifications"
          :key="notification.id"
          class="flex items-start gap-3 p-3 bg-white border border-yellow-200 rounded-lg"
        >
          <AlertTriangle class="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div class="flex-1">
            <p class="font-medium text-yellow-900">{{ notification.title }}</p>
            <p class="text-sm text-yellow-800">{{ notification.message }}</p>
          </div>
          <button class="text-yellow-600 hover:text-yellow-700 text-sm">
            Marcar como leída
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DE LA PÁGINA PRINCIPAL DEL DASHBOARD
 * 
 * Esta página maneja:
 * - Bienvenida personalizada según el rol del usuario
 * - Acciones rápidas específicas para cada rol
 * - Estadísticas y métricas relevantes
 * - Actividad reciente del usuario
 * - Notificaciones importantes
 */

// Importar hooks de Vue
import { ref, computed, onMounted } from 'vue'
// Importar store de autenticación
import { useAuthStore } from '../../stores/auth'
// Importar iconos
import {
  Calendar, Users, Stethoscope, Clock, Activity, BarChart3, Bell, AlertTriangle,
  ChevronRight, BookOpen, FileText, Settings, Shield, GraduationCap, UserCheck
} from 'lucide-vue-next'

// Obtener store de autenticación
const authStore = useAuthStore()

/**
 * ESTADO REACTIVO DEL COMPONENTE
 * 
 * Variables que controlan el estado de la página
 */

// Estadísticas del usuario
const stats = ref({
  appointments: 0,
  patients: 0,
  treatments: 0,
  pending: 0
})

// Actividades recientes
const recentActivities = ref([])

// Notificaciones importantes
const importantNotifications = ref([])

// Mensaje de bienvenida según el rol
const roleWelcomeMessage = computed(() => {
  const role = authStore.user?.role
  
  switch (role) {
    case 'patient':
      return 'Gestiona tus citas y consulta tu historial médico en la Clínica Dental ULEAM.'
    case 'student':
      return 'Continúa tu formación práctica atendiendo pacientes bajo supervisión profesional.'
    case 'professor':
      return 'Supervisa a tus estudiantes y gestiona tu área de especialización.'
    case 'admin':
      return 'Administra el sistema y supervisa las operaciones de la clínica dental.'
    default:
      return 'Bienvenido al sistema de gestión de la Clínica Dental ULEAM.'
  }
})

// Color del badge del rol
const roleBadgeColor = computed(() => {
  const role = authStore.user?.role
  
  switch (role) {
    case 'patient':
      return 'bg-blue-100 text-blue-800'
    case 'student':
      return 'bg-green-100 text-green-800'
    case 'professor':
      return 'bg-purple-100 text-purple-800'
    case 'admin':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

// Fecha actual formateada
const currentDate = computed(() => {
  return new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

/**
 * COMPUTED PROPERTIES
 * 
 * Propiedades calculadas según el rol del usuario
 */

// Acciones rápidas según el rol del usuario
const quickActions = computed(() => {
  const role = authStore.user?.role
  
  switch (role) {
    case 'patient':
      return [
        {
          title: 'Mis Citas',
          description: 'Ver y gestionar mis citas médicas',
          href: '/dashboard/my-appointments',
          icon: Calendar,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          badge: '2 próximas',
          badgeColor: 'bg-blue-100 text-blue-800'
        },
        {
          title: 'Reservar Cita',
          description: 'Agendar una nueva cita médica',
          href: '/dashboard/book-appointment',
          icon: UserCheck,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        },
        {
          title: 'Mi Historial',
          description: 'Consultar mi historial médico',
          href: '/dashboard/my-records',
          icon: FileText,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600'
        }
      ]
      
    case 'student':
      return [
        {
          title: 'Mis Pacientes',
          description: 'Gestionar pacientes asignados',
          href: '/dashboard/patients',
          icon: Users,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          badge: '5 activos',
          badgeColor: 'bg-green-100 text-green-800'
        },
        {
          title: 'Odontograma',
          description: 'Herramienta de diagnóstico dental',
          href: '/dashboard/odontogram',
          icon: Activity,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Casos Clínicos',
          description: 'Revisar casos asignados',
          href: '/dashboard/clinical-cases',
          icon: BookOpen,
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          badge: '3 pendientes',
          badgeColor: 'bg-yellow-100 text-yellow-800'
        }
      ]
      
    case 'professor':
      return [
        {
          title: 'Estudiantes',
          description: 'Supervisar estudiantes asignados',
          href: '/dashboard/teacher/students',
          icon: GraduationCap,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          badge: '12 estudiantes',
          badgeColor: 'bg-purple-100 text-purple-800'
        },
        {
          title: 'Aprobaciones',
          description: 'Revisar solicitudes pendientes',
          href: '/dashboard/teacher/approvals',
          icon: FileText,
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
          badge: '4 pendientes',
          badgeColor: 'bg-orange-100 text-orange-800'
        },
        {
          title: 'Mi Especialidad',
          description: 'Gestionar área de especialización',
          href: '/dashboard/specialty',
          icon: Stethoscope,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        }
      ]
      
    case 'admin':
      return [
        {
          title: 'Usuarios',
          description: 'Gestionar usuarios del sistema',
          href: '/dashboard/admin/users',
          icon: Users,
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          badge: '156 usuarios',
          badgeColor: 'bg-red-100 text-red-800'
        },
        {
          title: 'Analíticas',
          description: 'Ver reportes y métricas',
          href: '/dashboard/admin/analytics',
          icon: BarChart3,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Configuración',
          description: 'Configurar sistema',
          href: '/dashboard/settings',
          icon: Settings,
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600'
        }
      ]
      
    default:
      return [
        {
          title: 'Mi Perfil',
          description: 'Ver y editar información personal',
          href: '/dashboard/my-profile',
          icon: Users,
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        }
      ]
  }
})

/**
 * INICIALIZACIÓN DEL COMPONENTE
 * 
 * Se ejecuta cuando el componente se monta en el DOM
 */
onMounted(() => {
  // Cargar datos según el rol del usuario
  loadStats()
  loadRecentActivities()
  loadNotifications()
  
  console.log('Dashboard principal inicializado para rol:', authStore.user?.role)
})

// Cargar estadísticas según el rol
const loadStats = () => {
  const role = authStore.user?.role
  
  switch (role) {
    case 'patient':
      stats.value = {
        appointments: 3,
        patients: 0,
        treatments: 8,
        pending: 1
      }
      break
    case 'student':
      stats.value = {
        appointments: 12,
        patients: 5,
        treatments: 24,
        pending: 3
      }
      break
    case 'professor':
      stats.value = {
        appointments: 0,
        patients: 45,
        treatments: 156,
        pending: 8
      }
      break
    case 'admin':
      stats.value = {
        appointments: 89,
        patients: 234,
        treatments: 567,
        pending: 12
      }
      break
    default:
      stats.value = {
        appointments: 0,
        patients: 0,
        treatments: 0,
        pending: 0
      }
  }
}

// Cargar actividades recientes
const loadRecentActivities = () => {
  const role = authStore.user?.role
  
  const activities = {
    patient: [
      {
        id: 1,
        title: 'Cita completada',
        description: 'Limpieza dental con estudiante Juan Pérez',
        time: 'Hace 2 horas',
        status: 'Completado',
        statusColor: 'bg-green-100 text-green-800',
        icon: Calendar,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      {
        id: 2,
        title: 'Cita agendada',
        description: 'Revisión de rutina para el 25 de enero',
        time: 'Hace 1 día',
        status: 'Programado',
        statusColor: 'bg-blue-100 text-blue-800',
        icon: Calendar,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      }
    ],
    student: [
      {
        id: 1,
        title: 'Paciente atendido',
        description: 'Restauración dental en paciente María González',
        time: 'Hace 1 hora',
        status: 'Completado',
        statusColor: 'bg-green-100 text-green-800',
        icon: Users,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      {
        id: 2,
        title: 'Aprobación solicitada',
        description: 'Endodoncia en diente 16 - Paciente Carlos Rodríguez',
        time: 'Hace 3 horas',
        status: 'Pendiente',
        statusColor: 'bg-yellow-100 text-yellow-800',
        icon: FileText,
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600'
      }
    ],
    professor: [
      {
        id: 1,
        title: 'Aprobación otorgada',
        description: 'Endodoncia aprobada para estudiante Ana López',
        time: 'Hace 30 minutos',
        status: 'Aprobado',
        statusColor: 'bg-green-100 text-green-800',
        icon: FileText,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600'
      },
      {
        id: 2,
        title: 'Evaluación completada',
        description: 'Evaluación práctica de estudiante Miguel Sánchez',
        time: 'Hace 2 horas',
        status: 'Completado',
        statusColor: 'bg-blue-100 text-blue-800',
        icon: GraduationCap,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      }
    ],
    admin: [
      {
        id: 1,
        title: 'Usuario registrado',
        description: 'Nuevo estudiante registrado en el sistema',
        time: 'Hace 15 minutos',
        status: 'Nuevo',
        statusColor: 'bg-blue-100 text-blue-800',
        icon: Users,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600'
      },
      {
        id: 2,
        title: 'Reporte generado',
        description: 'Reporte mensual de actividades completado',
        time: 'Hace 1 hora',
        status: 'Completado',
        statusColor: 'bg-green-100 text-green-800',
        icon: BarChart3,
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600'
      }
    ]
  }
  
  recentActivities.value = activities[role] || []
}

// Cargar notificaciones importantes
const loadNotifications = () => {
  const role = authStore.user?.role
  
  const notifications = {
    student: [
      {
        id: 1,
        title: 'Evaluación pendiente',
        message: 'Tienes una evaluación práctica programada para mañana a las 10:00 AM'
      }
    ],
    professor: [
      {
        id: 1,
        title: 'Solicitudes de aprobación',
        message: 'Tienes 4 solicitudes de aprobación pendientes de revisión'
      }
    ]
  }
  
  importantNotifications.value = notifications[role] || []
}
</script>
