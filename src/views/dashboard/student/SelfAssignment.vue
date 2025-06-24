<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Auto-asignación de Pacientes</h1>
      <p class="text-green-600">Selecciona pacientes disponibles para tu práctica clínica</p>
    </div>

    <!-- Current Assignments -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <Users class="h-5 w-5" />
          Mis Pacientes Actuales ({{ currentAssignments.length }}/{{ maxPatients }})
        </h2>
      </div>
      <div class="p-6">
        <div v-if="currentAssignments.length === 0" class="text-center py-8">
          <Users class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600">No tienes pacientes asignados actualmente</p>
        </div>
        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="assignment in currentAssignments" :key="assignment.id" 
               class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ assignment.name.split(' ').map(n => n[0]).join('') }}
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ assignment.name }}</h3>
                  <p class="text-sm text-gray-600">{{ assignment.specialty }}</p>
                </div>
              </div>
              <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`">
                {{ getStatusLabel(assignment.status) }}
              </span>
            </div>
            <div class="text-sm text-gray-600 mb-3">
              <p><strong>Asignado:</strong> {{ assignment.assignedDate }}</p>
              <p><strong>Próxima cita:</strong> {{ assignment.nextAppointment || 'No programada' }}</p>
            </div>
            <div class="flex gap-2">
              <button class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                Ver Detalles
              </button>
              <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                Programar Cita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Patients -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
            <UserPlus class="h-5 w-5" />
            Pacientes Disponibles
          </h2>
          <div class="text-sm text-gray-600">
            Puedes asignar {{ maxPatients - currentAssignments.length }} pacientes más
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="p-6 border-b border-gray-200">
        <div class="grid gap-4 md:grid-cols-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
            <select v-model="specialtyFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">Todas las especialidades</option>
              <option value="general">General</option>
              <option value="endodoncia">Endodoncia</option>
              <option value="ortodoncia">Ortodoncia</option>
              <option value="cirugia">Cirugía</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
            <select v-model="priorityFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">Todas las prioridades</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Complejidad</label>
            <select v-model="complexityFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="">Todas</option>
              <option value="basic">Básica</option>
              <option value="intermediate">Intermedia</option>
              <option value="advanced">Avanzada</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Nombre del paciente..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div v-if="filteredAvailablePatients.length === 0" class="text-center py-8">
          <UserPlus class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600">No hay pacientes disponibles con los filtros seleccionados</p>
        </div>
        <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="patient in filteredAvailablePatients" :key="patient.id" 
               class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {{ patient.name.split(' ').map(n => n[0]).join('') }}
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ patient.name }}</h3>
                  <p class="text-sm text-gray-600">{{ patient.age }} años</p>
                </div>
              </div>
              <div class="text-right">
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(patient.priority)}`">
                  {{ getPriorityLabel(patient.priority) }}
                </span>
              </div>
            </div>

            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Especialidad:</span>
                <span class="font-medium">{{ patient.specialty }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Complejidad:</span>
                <span :class="`font-medium ${getComplexityColor(patient.complexity)}`">
                  {{ getComplexityLabel(patient.complexity) }}
                </span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Tiempo estimado:</span>
                <span class="font-medium">{{ patient.estimatedTime }}</span>
              </div>
            </div>

            <div class="mb-4">
              <p class="text-sm text-gray-700">
                <strong>Diagnóstico:</strong> {{ patient.diagnosis }}
              </p>
            </div>

            <div class="flex gap-2">
              <button 
                @click="requestAssignment(patient)"
                :disabled="currentAssignments.length >= maxPatients"
                class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-3 rounded text-sm transition-colors"
              >
                Solicitar Asignación
              </button>
              <button 
                @click="viewPatientDetails(patient)"
                class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors"
              >
                Ver Más
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Assignment Requests -->
    <div v-if="pendingRequests.length > 0" class="bg-white rounded-lg border border-yellow-200 shadow-sm">
      <div class="p-6 border-b border-yellow-200">
        <h2 class="text-xl font-semibold text-yellow-800 flex items-center gap-2">
          <Clock class="h-5 w-5" />
          Solicitudes Pendientes
        </h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="request in pendingRequests" :key="request.id" 
               class="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">{{ request.patientName }}</h3>
                <p class="text-sm text-gray-600">Solicitado: {{ request.requestDate }}</p>
              </div>
              <span class="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pendiente
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Patient Details Modal -->
    <div v-if="showPatientModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Detalles del Paciente: {{ selectedPatientDetails?.name }}
          </h3>
          <button @click="showPatientModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <div v-if="selectedPatientDetails" class="space-y-6">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Información Personal</h4>
              <div class="space-y-2 text-sm">
                <p><strong>Edad:</strong> {{ selectedPatientDetails.age }} años</p>
                <p><strong>Género:</strong> {{ selectedPatientDetails.gender }}</p>
                <p><strong>Teléfono:</strong> {{ selectedPatientDetails.phone }}</p>
                <p><strong>Email:</strong> {{ selectedPatientDetails.email }}</p>
              </div>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Información Clínica</h4>
              <div class="space-y-2 text-sm">
                <p><strong>Especialidad:</strong> {{ selectedPatientDetails.specialty }}</p>
                <p><strong>Complejidad:</strong> {{ getComplexityLabel(selectedPatientDetails.complexity) }}</p>
                <p><strong>Prioridad:</strong> {{ getPriorityLabel(selectedPatientDetails.priority) }}</p>
                <p><strong>Tiempo estimado:</strong> {{ selectedPatientDetails.estimatedTime }}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-2">Diagnóstico</h4>
            <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded">
              {{ selectedPatientDetails.diagnosis }}
            </p>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-2">Plan de Tratamiento</h4>
            <div class="space-y-2">
              <div v-for="step in selectedPatientDetails.treatmentPlan" :key="step.id" 
                   class="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <div class="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {{ step.step }}
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium">{{ step.procedure }}</p>
                  <p class="text-xs text-gray-600">{{ step.duration }} • {{ step.sessions }} sesiones</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-2">Historial Médico</h4>
            <div class="space-y-2 text-sm">
              <p><strong>Alergias:</strong> {{ selectedPatientDetails.allergies || 'Ninguna conocida' }}</p>
              <p><strong>Medicamentos:</strong> {{ selectedPatientDetails.medications || 'Ninguno' }}</p>
              <p><strong>Condiciones médicas:</strong> {{ selectedPatientDetails.medicalConditions || 'Ninguna' }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="showPatientModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Cerrar
          </button>
          <button 
            @click="requestAssignmentFromModal"
            :disabled="currentAssignments.length >= maxPatients"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Solicitar Asignación
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Users, UserPlus, Search, Clock, X } from 'lucide-vue-next'

const maxPatients = 5
const specialtyFilter = ref('')
const priorityFilter = ref('')
const complexityFilter = ref('')
const searchTerm = ref('')
const showPatientModal = ref(false)
const selectedPatientDetails = ref(null)

const currentAssignments = ref([
  {
    id: 1,
    name: 'María García',
    specialty: 'Endodoncia',
    status: 'in-progress',
    assignedDate: '10 Ene 2025',
    nextAppointment: '15 Ene 2025, 10:00 AM'
  },
  {
    id: 2,
    name: 'Carlos López',
    specialty: 'Ortodoncia',
    status: 'scheduled',
    assignedDate: '8 Ene 2025',
    nextAppointment: '16 Ene 2025, 2:00 PM'
  }
])

const availablePatients = ref([
  {
    id: 3,
    name: 'Ana Martínez',
    age: 28,
    gender: 'Femenino',
    phone: '+593 99 123 4567',
    email: 'ana.martinez@email.com',
    specialty: 'General',
    priority: 'medium',
    complexity: 'basic',
    estimatedTime: '2-3 sesiones',
    diagnosis: 'Caries dental en molares superiores, requiere obturaciones',
    allergies: 'Penicilina',
    medications: 'Ninguno',
    medicalConditions: 'Ninguna',
    treatmentPlan: [
      { id: 1, step: 1, procedure: 'Evaluación inicial', duration: '45 min', sessions: 1 },
      { id: 2, step: 2, procedure: 'Obturación molar derecho', duration: '60 min', sessions: 1 },
      { id: 3, step: 3, procedure: 'Obturación molar izquierdo', duration: '60 min', sessions: 1 }
    ]
  },
  {
    id: 4,
    name: 'Pedro González',
    age: 45,
    gender: 'Masculino',
    phone: '+593 99 765 4321',
    email: 'pedro.gonzalez@email.com',
    specialty: 'Endodoncia',
    priority: 'high',
    complexity: 'advanced',
    estimatedTime: '4-5 sesiones',
    diagnosis: 'Necrosis pulpar en incisivo central, requiere endodoncia',
    allergies: 'Ninguna conocida',
    medications: 'Ibuprofeno 400mg',
    medicalConditions: 'Hipertensión controlada',
    treatmentPlan: [
      { id: 1, step: 1, procedure: 'Diagnóstico y radiografías', duration: '30 min', sessions: 1 },
      { id: 2, step: 2, procedure: 'Apertura cameral', duration: '90 min', sessions: 1 },
      { id: 3, step: 3, procedure: 'Instrumentación', duration: '90 min', sessions: 2 },
      { id: 4, step: 4, procedure: 'Obturación definitiva', duration: '60 min', sessions: 1 }
    ]
  },
  {
    id: 5,
    name: 'Lucía Herrera',
    age: 16,
    gender: 'Femenino',
    phone: '+593 99 555 1234',
    email: 'lucia.herrera@email.com',
    specialty: 'Ortodoncia',
    priority: 'low',
    complexity: 'intermediate',
    estimatedTime: '18-24 meses',
    diagnosis: 'Maloclusión clase II, apiñamiento dental',
    allergies: 'Látex',
    medications: 'Ninguno',
    medicalConditions: 'Ninguna',
    treatmentPlan: [
      { id: 1, step: 1, procedure: 'Estudio ortodóncico completo', duration: '60 min', sessions: 1 },
      { id: 2, step: 2, procedure: 'Colocación de brackets', duration: '120 min', sessions: 1 },
      { id: 3, step: 3, procedure: 'Controles mensuales', duration: '30 min', sessions: 24 }
    ]
  }
])

const pendingRequests = ref([
  {
    id: 1,
    patientName: 'Roberto Silva',
    requestDate: '12 Ene 2025'
  }
])

const filteredAvailablePatients = computed(() => {
  return availablePatients.value.filter(patient => {
    const matchesSpecialty = !specialtyFilter.value || patient.specialty.toLowerCase().includes(specialtyFilter.value.toLowerCase())
    const matchesPriority = !priorityFilter.value || patient.priority === priorityFilter.value
    const matchesComplexity = !complexityFilter.value || patient.complexity === complexityFilter.value
    const matchesSearch = !searchTerm.value || patient.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    return matchesSpecialty && matchesPriority && matchesComplexity && matchesSearch
  })
})

const getStatusColor = (status) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800'
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'scheduled':
      return 'Programado'
    case 'in-progress':
      return 'En progreso'
    case 'completed':
      return 'Completado'
    default:
      return 'Desconocido'
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityLabel = (priority) => {
  switch (priority) {
    case 'high':
      return 'Alta'
    case 'medium':
      return 'Media'
    case 'low':
      return 'Baja'
    default:
      return 'No definida'
  }
}

const getComplexityColor = (complexity) => {
  switch (complexity) {
    case 'basic':
      return 'text-green-600'
    case 'intermediate':
      return 'text-yellow-600'
    case 'advanced':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

const getComplexityLabel = (complexity) => {
  switch (complexity) {
    case 'basic':
      return 'Básica'
    case 'intermediate':
      return 'Intermedia'
    case 'advanced':
      return 'Avanzada'
    default:
      return 'No definida'
  }
}

const requestAssignment = (patient) => {
  if (currentAssignments.value.length >= maxPatients) {
    alert('Has alcanzado el límite máximo de pacientes asignados')
    return
  }

  // Add to pending requests
  pendingRequests.value.push({
    id: Date.now(),
    patientName: patient.name,
    requestDate: new Date().toLocaleDateString('es-ES')
  })

  // Remove from available patients
  const index = availablePatients.value.findIndex(p => p.id === patient.id)
  if (index > -1) {
    availablePatients.value.splice(index, 1)
  }

  alert(`Solicitud de asignación enviada para ${patient.name}. Esperando aprobación del profesor.`)
}

const viewPatientDetails = (patient) => {
  selectedPatientDetails.value = patient
  showPatientModal.value = true
}

const requestAssignmentFromModal = () => {
  if (selectedPatientDetails.value) {
    requestAssignment(selectedPatientDetails.value)
    showPatientModal.value = false
  }
}
</script>
