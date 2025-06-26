<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Progreso Académico</h1>
      <p class="text-gray-600">Revisa tu rendimiento académico y tareas asignadas</p>
    </div>

    <!-- Academic Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Promedio General</p>
            <p class="text-2xl font-semibold text-gray-900">{{ academicStats.average }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Tareas Completadas</p>
            <p class="text-2xl font-semibold text-gray-900">{{ academicStats.completedAssignments }}</p>
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
            <p class="text-sm font-medium text-gray-600">Tareas Pendientes</p>
            <p class="text-2xl font-semibold text-gray-900">{{ academicStats.pendingAssignments }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Horas Clínicas</p>
            <p class="text-2xl font-semibold text-gray-900">{{ academicStats.clinicalHours }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Assignments Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Pending Assignments -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Tareas Pendientes</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="assignment in pendingAssignments" :key="assignment.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-semibold text-gray-900">{{ assignment.title }}</h3>
                <span :class="getPriorityClass(assignment.priority)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ assignment.priority }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-3">{{ assignment.description }}</p>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">Materia: {{ assignment.subject }}</span>
                <span class="text-gray-500">Vence: {{ formatDate(assignment.dueDate) }}</span>
              </div>
              <div class="mt-3">
                <button class="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Grades -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">Calificaciones Recientes</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="grade in recentGrades" :key="grade.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 class="font-semibold text-gray-900">{{ grade.assignment }}</h3>
                <p class="text-sm text-gray-600">{{ grade.subject }}</p>
                <p class="text-xs text-gray-500">{{ formatDate(grade.date) }}</p>
              </div>
              <div class="text-right">
                <div :class="getGradeClass(grade.score)" class="text-2xl font-bold">
                  {{ grade.score }}
                </div>
                <div class="text-sm text-gray-500">/ {{ grade.maxScore }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Chart -->
    <div class="mt-8 bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Progreso por Materia</h2>
      </div>
      <div class="p-6">
        <div class="space-y-6">
          <div v-for="subject in subjectProgress" :key="subject.name" class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="font-medium text-gray-900">{{ subject.name }}</span>
              <span class="text-gray-600">{{ subject.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div
                :class="getProgressColor(subject.progress)"
                class="h-3 rounded-full transition-all duration-300"
                :style="{ width: subject.progress + '%' }"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ subject.completed }} / {{ subject.total }} tareas</span>
              <span>Promedio: {{ subject.average }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const academicStats = ref({
  average: '8.5',
  completedAssignments: 24,
  pendingAssignments: 6,
  clinicalHours: 120
})

const assignments = ref([
  {
    id: 1,
    title: 'Caso Clínico: Endodoncia',
    description: 'Análisis completo de caso de endodoncia con radiografías',
    subject: 'Endodoncia',
    dueDate: '2024-01-20',
    priority: 'Alta',
    status: 'Pendiente'
  },
  {
    id: 2,
    title: 'Presentación: Técnicas de Anestesia',
    description: 'Presentación sobre técnicas modernas de anestesia local',
    subject: 'Cirugía Oral',
    dueDate: '2024-01-25',
    priority: 'Media',
    status: 'Pendiente'
  },
  {
    id: 3,
    title: 'Reporte de Práctica Clínica',
    description: 'Reporte semanal de actividades clínicas realizadas',
    subject: 'Práctica Clínica',
    dueDate: '2024-01-18',
    priority: 'Baja',
    status: 'Pendiente'
  }
])

const grades = ref([
  {
    id: 1,
    assignment: 'Examen Parcial',
    subject: 'Periodoncia',
    score: 9.2,
    maxScore: 10,
    date: '2024-01-10'
  },
  {
    id: 2,
    assignment: 'Caso Clínico',
    subject: 'Endodoncia',
    score: 8.8,
    maxScore: 10,
    date: '2024-01-08'
  },
  {
    id: 3,
    assignment: 'Práctica de Laboratorio',
    subject: 'Prótesis',
    score: 9.0,
    maxScore: 10,
    date: '2024-01-05'
  }
])

const subjectProgress = ref([
  {
    name: 'Endodoncia',
    progress: 85,
    completed: 17,
    total: 20,
    average: '8.7'
  },
  {
    name: 'Periodoncia',
    progress: 92,
    completed: 23,
    total: 25,
    average: '9.1'
  },
  {
    name: 'Cirugía Oral',
    progress: 78,
    completed: 14,
    total: 18,
    average: '8.3'
  },
  {
    name: 'Prótesis',
    progress: 65,
    completed: 13,
    total: 20,
    average: '8.0'
  }
])

const pendingAssignments = computed(() => 
  assignments.value.filter(assignment => assignment.status === 'Pendiente')
)

const recentGrades = computed(() => 
  grades.value.slice(0, 5)
)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getPriorityClass = (priority) => {
  const classes = {
    'Alta': 'bg-red-100 text-red-800',
    'Media': 'bg-yellow-100 text-yellow-800',
    'Baja': 'bg-green-100 text-green-800'
  }
  return classes[priority] || 'bg-gray-100 text-gray-800'
}

const getGradeClass = (score) => {
  if (score >= 9) return 'text-green-600'
  if (score >= 8) return 'text-blue-600'
  if (score >= 7) return 'text-yellow-600'
  return 'text-red-600'
}

const getProgressColor = (progress) => {
  if (progress >= 90) return 'bg-green-500'
  if (progress >= 80) return 'bg-blue-500'
  if (progress >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>
