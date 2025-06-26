<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Casos Clínicos</h1>
      <p class="text-gray-600">Revisa y gestiona tus casos clínicos asignados</p>
    </div>

    <!-- Filter and Search -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar casos..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        v-model="selectedStatus"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Todos los estados</option>
        <option value="En progreso">En progreso</option>
        <option value="Completado">Completado</option>
        <option value="Pendiente revisión">Pendiente revisión</option>
      </select>
    </div>

    <!-- Cases Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        v-for="case_ in filteredCases"
        :key="case_.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ case_.title }}</h3>
              <p class="text-sm text-gray-600">Paciente: {{ case_.patient }}</p>
            </div>
            <span :class="getStatusClass(case_.status)" class="px-3 py-1 text-xs font-medium rounded-full">
              {{ case_.status }}
            </span>
          </div>

          <div class="mb-4">
            <p class="text-sm text-gray-700 mb-2">{{ case_.description }}</p>
            <div class="flex items-center text-sm text-gray-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Fecha límite: {{ formatDate(case_.dueDate) }}
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progreso</span>
              <span>{{ case_.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: case_.progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center text-sm text-gray-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Supervisor: {{ case_.supervisor }}
            </div>
            <button class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredCases.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay casos clínicos</h3>
      <p class="mt-1 text-sm text-gray-500">No se encontraron casos que coincidan con los filtros.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const selectedStatus = ref('')

const cases = ref([
  {
    id: 1,
    title: 'Tratamiento de Caries Múltiples',
    patient: 'María González',
    description: 'Paciente con múltiples caries en molares superiores. Requiere tratamiento de endodoncia y restauración.',
    status: 'En progreso',
    progress: 65,
    dueDate: '2024-02-15',
    supervisor: 'Dr. García'
  },
  {
    id: 2,
    title: 'Extracción de Cordales',
    patient: 'Carlos Mendoza',
    description: 'Extracción quirúrgica de terceros molares impactados. Caso complejo que requiere seguimiento.',
    status: 'Completado',
    progress: 100,
    dueDate: '2024-01-20',
    supervisor: 'Dr. López'
  },
  {
    id: 3,
    title: 'Ortodoncia Preventiva',
    patient: 'Ana Rodríguez',
    description: 'Tratamiento ortodóntico en paciente adolescente. Seguimiento de progreso mensual.',
    status: 'Pendiente revisión',
    progress: 80,
    dueDate: '2024-02-28',
    supervisor: 'Dr. Martínez'
  }
])

const filteredCases = computed(() => {
  return cases.value.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         case_.patient.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = !selectedStatus.value || case_.status === selectedStatus.value
    return matchesSearch && matchesStatus
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    'En progreso': 'bg-blue-100 text-blue-800',
    'Completado': 'bg-green-100 text-green-800',
    'Pendiente revisión': 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
