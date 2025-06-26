<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Analíticas del Sistema</h1>
      <p class="text-gray-600">Métricas y estadísticas del sistema de gestión clínica</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Usuarios</p>
            <p class="text-2xl font-semibold text-gray-900">{{ metrics.totalUsers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Citas Este Mes</p>
            <p class="text-2xl font-semibold text-gray-900">{{ metrics.appointmentsThisMonth }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Horas Clínicas</p>
            <p class="text-2xl font-semibold text-gray-900">{{ metrics.clinicalHours }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Casos Completados</p>
            <p class="text-2xl font-semibold text-gray-900">{{ metrics.completedCases }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- User Distribution -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Distribución de Usuarios</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="userType in userDistribution" :key="userType.role" class="flex items-center justify-between">
              <div class="flex items-center">
                <div :class="userType.color" class="w-4 h-4 rounded-full mr-3"></div>
                <span class="text-sm font-medium text-gray-900">{{ userType.name }}</span>
              </div>
              <div class="flex items-center">
                <span class="text-sm text-gray-600 mr-2">{{ userType.count }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2">
                  <div :class="userType.color" class="h-2 rounded-full" :style="{ width: userType.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Activity -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Actividad Mensual</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="month in monthlyActivity" :key="month.month" class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">{{ month.month }}</span>
              <div class="flex items-center space-x-4">
                <div class="text-sm text-gray-600">
                  <span class="text-blue-600">{{ month.appointments }}</span> citas
                </div>
                <div class="text-sm text-gray-600">
                  <span class="text-green-600">{{ month.cases }}</span> casos
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Actividad Reciente del Sistema</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3">
            <div :class="getActivityIcon(activity.type)" class="p-2 rounded-full">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityPath(activity.type)"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-sm text-gray-600">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const metrics = ref({
  totalUsers: 156,
  appointmentsThisMonth: 89,
  clinicalHours: 1240,
  completedCases: 67
})

const userDistribution = ref([
  { role: 'estudiante', name: 'Estudiantes', count: 45, percentage: 65, color: 'bg-blue-500' },
  { role: 'profesor', name: 'Profesores', count: 12, percentage: 17, color: 'bg-green-500' },
  { role: 'paciente', name: 'Pacientes', count: 89, percentage: 85, color: 'bg-yellow-500' },
  { role: 'admin', name: 'Administradores', count: 3, percentage: 4, color: 'bg-red-500' },
  { role: 'secretario', name: 'Secretarios', count: 7, percentage: 10, color: 'bg-purple-500' }
])

const monthlyActivity = ref([
  { month: 'Enero', appointments: 89, cases: 23 },
  { month: 'Diciembre', appointments: 76, cases: 19 },
  { month: 'Noviembre', appointments: 82, cases: 21 },
  { month: 'Octubre', appointments: 94, cases: 25 }
])

const recentActivity = ref([
  {
    id: 1,
    type: 'user',
    title: 'Nuevo usuario registrado',
    description: 'Juan Pérez se registró como estudiante',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    type: 'appointment',
    title: 'Cita programada',
    description: 'María González programó cita con Dr. López',
    timestamp: '2024-01-15T09:15:00Z'
  },
  {
    id: 3,
    type: 'case',
    title: 'Caso clínico completado',
    description: 'Carlos Mendoza completó caso de endodoncia',
    timestamp: '2024-01-14T16:45:00Z'
  },
  {
    id: 4,
    type: 'system',
    title: 'Backup del sistema',
    description: 'Backup automático completado exitosamente',
    timestamp: '2024-01-14T02:00:00Z'
  }
])

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getActivityIcon = (type) => {
  const classes = {
    'user': 'bg-blue-100 text-blue-600',
    'appointment': 'bg-green-100 text-green-600',
    'case': 'bg-yellow-100 text-yellow-600',
    'system': 'bg-gray-100 text-gray-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

const getActivityPath = (type) => {
  const paths = {
    'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    'appointment': 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    'case': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    'system': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  }
  return paths[type] || paths['system']
}
</script>
