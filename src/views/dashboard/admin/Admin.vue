<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Panel de Administración</h1>
      <p class="text-green-600">Control y gestión del sistema de la clínica dental</p>
    </div>

    <!-- System Stats -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-800">Total Usuarios</p>
            <p class="text-2xl font-bold text-green-700">{{ systemStats.totalUsers }}</p>
          </div>
          <Users class="h-8 w-8 text-green-600" />
        </div>
        <div class="mt-2 text-xs text-green-600">
          +{{ systemStats.newUsersThisMonth }} este mes
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-800">Citas Totales</p>
            <p class="text-2xl font-bold text-blue-700">{{ systemStats.totalAppointments }}</p>
          </div>
          <Calendar class="h-8 w-8 text-blue-600" />
        </div>
        <div class="mt-2 text-xs text-blue-600">
          {{ systemStats.appointmentsToday }} hoy
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-purple-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-800">Casos Activos</p>
            <p class="text-2xl font-bold text-purple-700">{{ systemStats.activeCases }}</p>
          </div>
          <FileText class="h-8 w-8 text-purple-600" />
        </div>
        <div class="mt-2 text-xs text-purple-600">
          {{ systemStats.completedCases }} completados
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-orange-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-800">Uso del Sistema</p>
            <p class="text-2xl font-bold text-orange-700">{{ systemStats.systemUsage }}%</p>
          </div>
          <Activity class="h-8 w-8 text-orange-600" />
        </div>
        <div class="mt-2 text-xs text-orange-600">
          Últimas 24 horas
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Quick Actions -->
      <div class="bg-white rounded-lg border border-green-200 shadow-sm">
        <div class="p-6 border-b border-green-200">
          <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
            <Zap class="h-5 w-5" />
            Acciones Rápidas
          </h2>
        </div>
        <div class="p-6">
          <div class="grid gap-4 md:grid-cols-2">
            <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserPlus class="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Nuevo Usuario</h3>
                  <p class="text-sm text-gray-600">Crear cuenta de usuario</p>
                </div>
              </div>
            </button>
            
            <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database class="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Respaldo</h3>
                  <p class="text-sm text-gray-600">Crear respaldo de datos</p>
                </div>
              </div>
            </button>
            
            <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings class="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Configuración</h3>
                  <p class="text-sm text-gray-600">Ajustes del sistema</p>
                </div>
              </div>
            </button>
            
            <button class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield class="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Seguridad</h3>
                  <p class="text-sm text-gray-600">Revisar logs de seguridad</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- System Health -->
      <div class="bg-white rounded-lg border border-green-200 shadow-sm">
        <div class="p-6 border-b border-green-200">
          <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
            <Monitor class="h-5 w-5" />
            Estado del Sistema
          </h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="metric in systemHealth" :key="metric.name" 
                 class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div class="flex items-center gap-3">
                <div :class="`w-3 h-3 rounded-full ${getHealthColor(metric.status)}`"></div>
                <span class="font-medium text-gray-900">{{ metric.name }}</span>
              </div>
              <div class="text-right">
                <div class="font-medium">{{ metric.value }}</div>
                <div class="text-sm text-gray-600">{{ metric.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <Clock class="h-5 w-5" />
          Actividad Reciente del Sistema
        </h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" 
               class="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
            <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`">
              <component :is="activity.icon" class="h-4 w-4 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-600">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.timestamp }}</p>
            </div>
            <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeColor(activity.type)}`">
              {{ activity.type }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Users, Calendar, FileText, Activity, Zap, UserPlus, Database, Settings, Shield, Monitor, Clock,
  User, AlertTriangle, CheckCircle, Info
} from 'lucide-vue-next'

const systemStats = ref({
  totalUsers: 1247,
  newUsersThisMonth: 23,
  totalAppointments: 3456,
  appointmentsToday: 12,
  activeCases: 89,
  completedCases: 234,
  systemUsage: 87
})

const systemHealth = ref([
  {
    name: 'Base de Datos',
    value: '99.9%',
    description: 'Disponibilidad',
    status: 'healthy'
  },
  {
    name: 'Servidor Web',
    value: '2.3s',
    description: 'Tiempo de respuesta',
    status: 'healthy'
  },
  {
    name: 'Almacenamiento',
    value: '67%',
    description: 'Uso del disco',
    status: 'warning'
  },
  {
    name: 'Memoria',
    value: '45%',
    description: 'Uso de RAM',
    status: 'healthy'
  }
])

const recentActivity = ref([
  {
    id: 1,
    title: 'Nuevo usuario registrado',
    description: 'paciente@ejemplo.com se registró en el sistema',
    timestamp: 'Hace 5 minutos',
    type: 'Usuario',
    icon: User,
    color: 'bg-blue-600'
  },
  {
    id: 2,
    title: 'Respaldo completado',
    description: 'Respaldo automático de la base de datos',
    timestamp: 'Hace 2 horas',
    type: 'Sistema',
    icon: CheckCircle,
    color: 'bg-green-600'
  },
  {
    id: 3,
    title: 'Alerta de seguridad',
    description: 'Intento de acceso fallido detectado',
    timestamp: 'Hace 4 horas',
    type: 'Seguridad',
    icon: AlertTriangle,
    color: 'bg-red-600'
  },
  {
    id: 4,
    title: 'Actualización del sistema',
    description: 'Sistema actualizado a la versión 2.1.3',
    timestamp: 'Hace 1 día',
    type: 'Sistema',
    icon: Info,
    color: 'bg-purple-600'
  }
])

const getHealthColor = (status) => {
  switch (status) {
    case 'healthy':
      return 'bg-green-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'error':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

const getActivityTypeColor = (type) => {
  switch (type) {
    case 'Usuario':
      return 'bg-blue-100 text-blue-800'
    case 'Sistema':
      return 'bg-green-100 text-green-800'
    case 'Seguridad':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
