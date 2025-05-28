<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-green-800">Mis Pacientes</h1>
        <p class="text-green-600">Gestiona tus pacientes asignados y sus tratamientos</p>
      </div>
      <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
        <Plus class="h-4 w-4" />
        Nuevo Paciente
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-800">Total Pacientes</p>
            <p class="text-2xl font-bold text-green-700">{{ stats.totalPatients }}</p>
          </div>
          <Users class="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-800">Citas Hoy</p>
            <p class="text-2xl font-bold text-blue-700">{{ stats.appointmentsToday }}</p>
          </div>
          <Calendar class="h-8 w-8 text-blue-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-purple-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-800">Tratamientos Activos</p>
            <p class="text-2xl font-bold text-purple-700">{{ stats.activeTreatments }}</p>
          </div>
          <Stethoscope class="h-8 w-8 text-purple-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-orange-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-800">Casos Completados</p>
            <p class="text-2xl font-bold text-orange-700">{{ stats.completedCases }}</p>
          </div>
          <CheckCircle class="h-8 w-8 text-orange-600" />
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar pacientes..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
          <option value="">Todos los estados</option>
          <option value="active">Activo</option>
          <option value="completed">Completado</option>
          <option value="pending">Pendiente</option>
        </select>
        <select v-model="treatmentFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
          <option value="">Todos los tratamientos</option>
          <option value="endodoncia">Endodoncia</option>
          <option value="ortodoncia">Ortodoncia</option>
          <option value="cirugia">Cirugía</option>
          <option value="limpieza">Limpieza</option>
        </select>
      </div>
    </div>

    <!-- Patients List -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">Lista de Pacientes</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tratamiento</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próxima Cita</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progreso</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="patient in filteredPatients" :key="patient.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ patient.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ patient.name }}</div>
                    <div class="text-sm text-gray-500">{{ patient.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ patient.treatment }}</div>
                <div class="text-sm text-gray-500">{{ patient.specialty }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`">
                  {{ getStatusLabel(patient.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ patient.nextAppointment || 'No programada' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div :class="`h-2 rounded-full ${getProgressColor(patient.progress)}`" 
                         :style="`width: ${patient.progress}%`"></div>
                  </div>
                  <span class="text-sm text-gray-600">{{ patient.progress }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button class="text-green-600 hover:text-green-900">Ver</button>
                  <button class="text-blue-600 hover:text-blue-900">Editar</button>
                  <button class="text-gray-400 hover:text-gray-600">
                    <MoreVertical class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Users, Calendar, Stethoscope, CheckCircle, Search, MoreVertical } from 'lucide-vue-next'

const searchTerm = ref('')
const statusFilter = ref('')
const treatmentFilter = ref('')

const stats = ref({
  totalPatients: 24,
  appointmentsToday: 6,
  activeTreatments: 18,
  completedCases: 42
})

const patients = ref([
  {
    id: 1,
    name: 'María García',
    email: 'maria.garcia@email.com',
    treatment: 'Endodoncia',
    specialty: 'Tratamiento de conducto',
    status: 'active',
    nextAppointment: '15 Ene, 10:00 AM',
    progress: 75
  },
  {
    id: 2,
    name: 'Carlos López',
    email: 'carlos.lopez@email.com',
    treatment: 'Ortodoncia',
    specialty: 'Brackets metálicos',
    status: 'active',
    nextAppointment: '16 Ene, 2:00 PM',
    progress: 45
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    treatment: 'Limpieza',
    specialty: 'Profilaxis dental',
    status: 'completed',
    nextAppointment: null,
    progress: 100
  },
  {
    id: 4,
    name: 'Pedro Rodríguez',
    email: 'pedro.rodriguez@email.com',
    treatment: 'Cirugía',
    specialty: 'Extracción molar',
    status: 'pending',
    nextAppointment: '18 Ene, 9:00 AM',
    progress: 25
  }
])

const filteredPatients = computed(() => {
  return patients.value.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = !statusFilter.value || patient.status === statusFilter.value
    const matchesTreatment = !treatmentFilter.value || 
                            patient.treatment.toLowerCase().includes(treatmentFilter.value.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesTreatment
  })
})

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'active':
      return 'Activo'
    case 'completed':
      return 'Completado'
    case 'pending':
      return 'Pendiente'
    default:
      return 'Desconocido'
  }
}

const getProgressColor = (progress) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>
