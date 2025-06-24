<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Panel de Secretaría</h1>
      <p class="text-green-600">Gestión de pacientes y asignaciones</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-800">Pacientes Registrados</p>
            <p class="text-2xl font-bold text-green-700">{{ stats.totalPatients }}</p>
          </div>
          <Users class="h-8 w-8 text-green-600" />
        </div>
        <div class="mt-2 text-xs text-green-600">
          +{{ stats.newPatientsThisWeek }} esta semana
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-800">Asignaciones Pendientes</p>
            <p class="text-2xl font-bold text-blue-700">{{ stats.pendingAssignments }}</p>
          </div>
          <UserPlus class="h-8 w-8 text-blue-600" />
        </div>
        <div class="mt-2 text-xs text-blue-600">
          Requieren atención
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-purple-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-800">Citas Hoy</p>
            <p class="text-2xl font-bold text-purple-700">{{ stats.appointmentsToday }}</p>
          </div>
          <Calendar class="h-8 w-8 text-purple-600" />
        </div>
        <div class="mt-2 text-xs text-purple-600">
          {{ stats.appointmentsTomorrow }} mañana
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-orange-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-800">Estudiantes Activos</p>
            <p class="text-2xl font-bold text-orange-700">{{ stats.activeStudents }}</p>
          </div>
          <GraduationCap class="h-8 w-8 text-orange-600" />
        </div>
        <div class="mt-2 text-xs text-orange-600">
          Disponibles para asignación
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <Zap class="h-5 w-5" />
          Acciones Rápidas
        </h2>
      </div>
      <div class="p-6">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <router-link to="/dashboard/secretary/patient-assignment">
            <button class="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserPlus class="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Asignar Paciente</h3>
                  <p class="text-sm text-gray-600">Asignar paciente a estudiante</p>
                </div>
              </div>
            </button>
          </router-link>
          
          <router-link to="/dashboard/secretary/schedule">
            <button class="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar class="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">Ver Horarios</h3>
                  <p class="text-sm text-gray-600">Gestionar horarios y citas</p>
                </div>
              </div>
            </button>
          </router-link>
          
          <button class="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText class="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 class="font-medium text-gray-900">Generar Reporte</h3>
                <p class="text-sm text-gray-600">Reportes de asignaciones</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <Activity class="h-5 w-5" />
          Actividad Reciente
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Users, UserPlus, Calendar, GraduationCap, Zap, FileText, Activity, User, CheckCircle, AlertCircle } from 'lucide-vue-next'

const stats = ref({
  totalPatients: 156,
  newPatientsThisWeek: 8,
  pendingAssignments: 12,
  appointmentsToday: 24,
  appointmentsTomorrow: 18,
  activeStudents: 45
})

const recentActivity = ref([
  {
    id: 1,
    title: 'Paciente asignado',
    description: 'María García asignada a Juan Pérez',
    timestamp: 'Hace 15 minutos',
    icon: User,
    color: 'bg-blue-600'
  },
  {
    id: 2,
    title: 'Cita programada',
    description: 'Cita para Carlos López - 15 Ene, 10:00 AM',
    timestamp: 'Hace 30 minutos',
    icon: Calendar,
    color: 'bg-green-600'
  },
  {
    id: 3,
    title: 'Asignación completada',
    description: 'Ana Martínez completó tratamiento',
    timestamp: 'Hace 1 hora',
    icon: CheckCircle,
    color: 'bg-purple-600'
  },
  {
    id: 4,
    title: 'Conflicto de horario',
    description: 'Conflicto detectado en horario de Pedro Gómez',
    timestamp: 'Hace 2 horas',
    icon: AlertCircle,
    color: 'bg-red-600'
  }
])
</script>
