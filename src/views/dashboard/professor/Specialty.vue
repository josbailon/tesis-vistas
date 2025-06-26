<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Mi Especialidad</h1>
      <p class="text-gray-600">Gestiona tu área de especialización y recursos académicos</p>
    </div>

    <!-- Specialty Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="lg:col-span-2 bg-white rounded-lg shadow">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ specialty.name }}</h2>
          <p class="text-gray-600 mb-6">{{ specialty.description }}</p>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ specialty.students_count }}</div>
              <div class="text-sm text-gray-600">Estudiantes</div>
            </div>
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ specialty.courses_count }}</div>
              <div class="text-sm text-gray-600">Materias</div>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="font-semibold text-gray-900">Materias que imparto:</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="course in specialty.courses"
                :key="course"
                class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {{ course }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Estadísticas del Semestre</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Casos supervisados</span>
              <span class="font-semibold">{{ stats.cases_supervised }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Horas de cátedra</span>
              <span class="font-semibold">{{ stats.teaching_hours }}h</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Promedio estudiantes</span>
              <span class="font-semibold">{{ stats.average_grade }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Investigaciones</span>
              <span class="font-semibold">{{ stats.research_projects }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Actividades Recientes</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div :class="getActivityIcon(activity.type)" class="p-2 rounded-full">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityPath(activity.type)"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-gray-600">{{ activity.description }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.date) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Recursos Académicos</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="resource in academicResources"
              :key="resource.id"
              class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ resource.title }}</p>
                  <p class="text-sm text-gray-600">{{ resource.type }}</p>
                </div>
              </div>
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Descargar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const specialty = ref({
  name: 'Endodoncia',
  description: 'Especialización en tratamientos de conductos radiculares y terapia pulpar. Enfoque en técnicas modernas de endodoncia y manejo de casos complejos.',
  students_count: 15,
  courses_count: 4,
  courses: ['Endodoncia I', 'Endodoncia II', 'Patología Pulpar', 'Técnicas Avanzadas']
})

const stats = ref({
  cases_supervised: 45,
  teaching_hours: 120,
  average_grade: 8.7,
  research_projects: 3
})

const recentActivities = ref([
  {
    id: 1,
    type: 'approval',
    title: 'Caso clínico aprobado',
    description: 'Juan Pérez - Endodoncia molar superior',
    date: '2024-01-15'
  },
  {
    id: 2,
    type: 'class',
    title: 'Clase magistral',
    description: 'Técnicas de instrumentación rotatoria',
    date: '2024-01-14'
  },
  {
    id: 3,
    type: 'research',
    title: 'Publicación de investigación',
    description: 'Estudio sobre éxito en endodoncia',
    date: '2024-01-12'
  }
])

const academicResources = ref([
  {
    id: 1,
    title: 'Manual de Endodoncia Clínica',
    type: 'Guía de estudio'
  },
  {
    id: 2,
    title: 'Protocolos de Instrumentación',
    type: 'Protocolo clínico'
  },
  {
    id: 3,
    title: 'Atlas de Anatomía Radicular',
    type: 'Material visual'
  },
  {
    id: 4,
    title: 'Casos Clínicos Resueltos',
    type: 'Casos de estudio'
  }
])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getActivityIcon = (type) => {
  const classes = {
    'approval': 'bg-green-100 text-green-600',
    'class': 'bg-blue-100 text-blue-600',
    'research': 'bg-purple-100 text-purple-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600'
}

const getActivityPath = (type) => {
  const paths = {
    'approval': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    'class': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    'research': 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
  }
  return paths[type] || 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
}
</script>
