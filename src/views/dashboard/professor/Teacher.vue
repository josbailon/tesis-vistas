<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Dashboard del Profesor</h1>
      <p class="text-green-600">Panel de control para supervisión académica</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-800">Estudiantes Asignados</p>
            <p class="text-2xl font-bold text-green-700">{{ stats.assignedStudents }}</p>
          </div>
          <GraduationCap class="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-800">Aprobaciones Pendientes</p>
            <p class="text-2xl font-bold text-blue-700">{{ stats.pendingApprovals }}</p>
          </div>
          <CheckSquare class="h-8 w-8 text-blue-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-purple-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-800">Casos Supervisados</p>
            <p class="text-2xl font-bold text-purple-700">{{ stats.supervisedCases }}</p>
          </div>
          <FileCheck class="h-8 w-8 text-purple-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-orange-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-800">Progreso Promedio</p>
            <p class="text-2xl font-bold text-orange-700">{{ stats.averageProgress }}%</p>
          </div>
          <TrendingUp class="h-8 w-8 text-orange-600" />
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
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
                <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending Approvals -->
      <div class="bg-white rounded-lg border border-green-200 shadow-sm">
        <div class="p-6 border-b border-green-200">
          <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
            <Clock class="h-5 w-5" />
            Aprobaciones Pendientes
          </h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="approval in pendingApprovals" :key="approval.id" 
                 class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <h3 class="font-medium text-gray-900">{{ approval.procedure }}</h3>
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`">
                  {{ approval.priority }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-2">Estudiante: {{ approval.student }}</p>
              <p class="text-sm text-gray-600 mb-3">Paciente: {{ approval.patient }}</p>
              <div class="flex gap-2">
                <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                  Aprobar
                </button>
                <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                  Rechazar
                </button>
                <button class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 rounded text-sm transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Student Progress -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <BarChart3 class="h-5 w-5" />
          Progreso de Estudiantes
        </h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="student in studentProgress" :key="student.id" 
               class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ student.name.split(' ').map(n => n[0]).join('') }}
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ student.name }}</h3>
                  <p class="text-sm text-gray-600">{{ student.semester }}° Semestre</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-green-600">{{ student.progress }}%</div>
                <div class="text-sm text-gray-600">{{ student.completedCases }} casos</div>
              </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div :class="`h-2 rounded-full ${getProgressColor(student.progress)}`" 
                   :style="`width: ${student.progress}%`"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  GraduationCap, CheckSquare, FileCheck, TrendingUp, Activity, Clock, BarChart3,
  User, AlertCircle, CheckCircle
} from 'lucide-vue-next'

const stats = ref({
  assignedStudents: 12,
  pendingApprovals: 8,
  supervisedCases: 45,
  averageProgress: 78
})

const recentActivity = ref([
  {
    id: 1,
    title: 'Nuevo caso asignado',
    description: 'Juan Pérez - Endodoncia',
    time: 'Hace 2 horas',
    icon: User,
    color: 'bg-blue-600'
  },
  {
    id: 2,
    title: 'Aprobación solicitada',
    description: 'María García - Extracción molar',
    time: 'Hace 4 horas',
    icon: AlertCircle,
    color: 'bg-yellow-600'
  },
  {
    id: 3,
    title: 'Caso completado',
    description: 'Carlos López - Limpieza dental',
    time: 'Hace 1 día',
    icon: CheckCircle,
    color: 'bg-green-600'
  }
])

const pendingApprovals = ref([
  {
    id: 1,
    procedure: 'Endodoncia molar superior',
    student: 'Ana Martínez',
    patient: 'Pedro González',
    priority: 'Alta'
  },
  {
    id: 2,
    procedure: 'Extracción premolar',
    student: 'Luis Rodríguez',
    patient: 'Carmen Silva',
    priority: 'Media'
  },
  {
    id: 3,
    procedure: 'Limpieza periodontal',
    student: 'Elena Morales',
    patient: 'José Herrera',
    priority: 'Baja'
  }
])

const studentProgress = ref([
  {
    id: 1,
    name: 'Ana Martínez',
    semester: 8,
    progress: 85,
    completedCases: 12
  },
  {
    id: 2,
    name: 'Luis Rodríguez',
    semester: 7,
    progress: 72,
    completedCases: 9
  },
  {
    id: 3,
    name: 'Elena Morales',
    semester: 9,
    progress: 91,
    completedCases: 15
  }
])

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Alta':
      return 'bg-red-100 text-red-800'
    case 'Media':
      return 'bg-yellow-100 text-yellow-800'
    case 'Baja':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getProgressColor = (progress) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>
