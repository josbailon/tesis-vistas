<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Aprobaciones Pendientes</h1>
      <p class="text-gray-600">Revisa y aprueba los trabajos de tus estudiantes</p>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
            <span v-if="tab.count > 0" class="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
              {{ tab.count }}
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Approvals List -->
    <div class="space-y-6">
      <div
        v-for="approval in filteredApprovals"
        :key="approval.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ approval.title }}</h3>
                <span :class="getTypeClass(approval.type)" class="ml-3 px-2 py-1 text-xs font-medium rounded-full">
                  {{ approval.type }}
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ approval.description }}</p>
              <div class="flex items-center text-sm text-gray-500 space-x-4">
                <span>Estudiante: {{ approval.student }}</span>
                <span>Fecha: {{ formatDate(approval.submitted_date) }}</span>
                <span>Paciente: {{ approval.patient || 'N/A' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="getPriorityClass(approval.priority)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ approval.priority }}
              </span>
            </div>
          </div>

          <!-- Files/Attachments -->
          <div v-if="approval.attachments && approval.attachments.length > 0" class="mb-4">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Archivos adjuntos:</h4>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="file in approval.attachments"
                :key="file.id"
                class="flex items-center px-3 py-1 bg-gray-100 rounded-lg text-sm"
              >
                <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
                {{ file.name }}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="flex items-center space-x-2">
              <button class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Ver detalles
              </button>
              <button class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Descargar archivos
              </button>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="rejectApproval(approval.id)"
                class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Rechazar
              </button>
              <button
                @click="approveItem(approval.id)"
                class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Aprobar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredApprovals.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay aprobaciones pendientes</h3>
      <p class="mt-1 text-sm text-gray-500">Todas las tareas han sido revisadas.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('all')

const tabs = ref([
  { id: 'all', name: 'Todas', count: 0 },
  { id: 'cases', name: 'Casos Clínicos', count: 0 },
  { id: 'assignments', name: 'Tareas', count: 0 },
  { id: 'procedures', name: 'Procedimientos', count: 0 }
])

const approvals = ref([
  {
    id: 1,
    title: 'Caso Clínico: Endodoncia Compleja',
    description: 'Tratamiento de endodoncia en molar superior con complicaciones',
    type: 'Caso Clínico',
    student: 'Juan Pérez',
    patient: 'María González',
    submitted_date: '2024-01-15',
    priority: 'Alta',
    attachments: [
      { id: 1, name: 'radiografia_inicial.jpg' },
      { id: 2, name: 'reporte_caso.pdf' }
    ]
  },
  {
    id: 2,
    title: 'Tarea: Análisis de Técnicas de Anestesia',
    description: 'Investigación sobre técnicas modernas de anestesia local en odontología',
    type: 'Tarea',
    student: 'María González',
    patient: null,
    submitted_date: '2024-01-14',
    priority: 'Media',
    attachments: [
      { id: 3, name: 'investigacion_anestesia.docx' }
    ]
  },
  {
    id: 3,
    title: 'Procedimiento: Extracción de Cordal',
    description: 'Extracción quirúrgica de tercer molar impactado',
    type: 'Procedimiento',
    student: 'Carlos López',
    patient: 'Ana Rodríguez',
    submitted_date: '2024-01-13',
    priority: 'Alta',
    attachments: [
      { id: 4, name: 'fotos_procedimiento.zip' },
      { id: 5, name: 'reporte_cirugia.pdf' }
    ]
  }
])

const filteredApprovals = computed(() => {
  if (activeTab.value === 'all') return approvals.value
  
  const typeMap = {
    'cases': 'Caso Clínico',
    'assignments': 'Tarea',
    'procedures': 'Procedimiento'
  }
  
  return approvals.value.filter(approval => approval.type === typeMap[activeTab.value])
})

// Update tab counts
computed(() => {
  tabs.value[0].count = approvals.value.length
  tabs.value[1].count = approvals.value.filter(a => a.type === 'Caso Clínico').length
  tabs.value[2].count = approvals.value.filter(a => a.type === 'Tarea').length
  tabs.value[3].count = approvals.value.filter(a => a.type === 'Procedimiento').length
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getTypeClass = (type) => {
  const classes = {
    'Caso Clínico': 'bg-blue-100 text-blue-800',
    'Tarea': 'bg-green-100 text-green-800',
    'Procedimiento': 'bg-purple-100 text-purple-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const getPriorityClass = (priority) => {
  const classes = {
    'Alta': 'bg-red-100 text-red-800',
    'Media': 'bg-yellow-100 text-yellow-800',
    'Baja': 'bg-green-100 text-green-800'
  }
  return classes[priority] || 'bg-gray-100 text-gray-800'
}

const approveItem = (id) => {
  const index = approvals.value.findIndex(approval => approval.id === id)
  if (index !== -1) {
    approvals.value.splice(index, 1)
    // Here you would typically make an API call to approve the item
    console.log(`Approved item with ID: ${id}`)
  }
}

const rejectApproval = (id) => {
  const index = approvals.value.findIndex(approval => approval.id === id)
  if (index !== -1) {
    approvals.value.splice(index, 1)
    // Here you would typically make an API call to reject the item
    console.log(`Rejected item with ID: ${id}`)
  }
}
</script>
