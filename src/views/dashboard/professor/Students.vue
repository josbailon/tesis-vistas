<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Mis Estudiantes</h1>
      <p class="text-gray-600">Supervisa el progreso de tus estudiantes asignados</p>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar estudiantes..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        v-model="selectedSemester"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Todos los semestres</option>
        <option value="8">8vo Semestre</option>
        <option value="9">9no Semestre</option>
        <option value="10">10mo Semestre</option>
      </select>
    </div>

    <!-- Students Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="student in filteredStudents"
        :key="student.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-lg font-semibold text-blue-600">{{ student.name.charAt(0) }}</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ student.name }}</h3>
              <p class="text-sm text-gray-600">{{ student.semester }}° Semestre</p>
            </div>
          </div>

          <div class="space-y-3 mb-4">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Promedio:</span>
              <span :class="getGradeClass(student.average)" class="font-semibold">{{ student.average }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Pacientes asignados:</span>
              <span class="font-semibold">{{ student.patients_count }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Horas clínicas:</span>
              <span class="font-semibold">{{ student.clinical_hours }}h</span>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progreso del semestre</span>
              <span>{{ student.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                :class="getProgressColor(student.progress)"
                class="h-2 rounded-full transition-all duration-300"
                :style="{ width: student.progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span :class="getStatusClass(student.status)" class="px-2 py-1 text-xs font-medium rounded-full">
              {{ student.status }}
            </span>
            <button class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredStudents.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay estudiantes</h3>
      <p class="mt-1 text-sm text-gray-500">No se encontraron estudiantes que coincidan con los filtros.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const selectedSemester = ref('')

const students = ref([
  {
    id: 1,
    name: 'Juan Pérez',
    semester: 8,
    average: 8.7,
    patients_count: 5,
    clinical_hours: 120,
    progress: 85,
    status: 'Activo'
  },
  {
    id: 2,
    name: 'María González',
    semester: 9,
    average: 9.2,
    patients_count: 7,
    clinical_hours: 150,
    progress: 92,
    status: 'Activo'
  },
  {
    id: 3,
    name: 'Carlos López',
    semester: 8,
    average: 7.8,
    patients_count: 4,
    clinical_hours: 95,
    progress: 70,
    status: 'En observación'
  },
  {
    id: 4,
    name: 'Ana Rodríguez',
    semester: 10,
    average: 9.5,
    patients_count: 8,
    clinical_hours: 180,
    progress: 95,
    status: 'Destacado'
  }
])

const filteredStudents = computed(() => {
  return students.value.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesSemester = !selectedSemester.value || student.semester.toString() === selectedSemester.value
    return matchesSearch && matchesSemester
  })
})

const getGradeClass = (grade) => {
  if (grade >= 9) return 'text-green-600'
  if (grade >= 8) return 'text-blue-600'
  if (grade >= 7) return 'text-yellow-600'
  return 'text-red-600'
}

const getProgressColor = (progress) => {
  if (progress >= 90) return 'bg-green-500'
  if (progress >= 80) return 'bg-blue-500'
  if (progress >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getStatusClass = (status) => {
  const classes = {
    'Activo': 'bg-green-100 text-green-800',
    'En observación': 'bg-yellow-100 text-yellow-800',
    'Destacado': 'bg-blue-100 text-blue-800',
    'Inactivo': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
