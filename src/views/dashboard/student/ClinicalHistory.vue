<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Historia Clínica</h1>
      <p class="text-gray-600">Accede y gestiona las historias clínicas de tus pacientes</p>
    </div>

    <!-- Patient Search -->
    <div class="mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar paciente por nombre o cédula..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Buscar
        </button>
      </div>
    </div>

    <!-- Patient List -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="patient in filteredPatients"
        :key="patient.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        @click="selectPatient(patient)"
      >
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-lg font-semibold text-blue-600">{{ patient.name.charAt(0) }}</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ patient.name }}</h3>
              <p class="text-sm text-gray-600">{{ patient.age }} años</p>
            </div>
          </div>

          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Cédula:</span>
              <span class="font-medium">{{ patient.id_number }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Última visita:</span>
              <span class="font-medium">{{ formatDate(patient.last_visit) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tratamientos:</span>
              <span class="font-medium">{{ patient.treatments_count }}</span>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span :class="getStatusClass(patient.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ patient.status }}
              </span>
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver historia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Patient Detail Modal -->
    <div v-if="selectedPatient" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900">Historia Clínica - {{ selectedPatient.name }}</h2>
            <button @click="selectedPatient = null" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6">
          <!-- Patient Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Nombre completo:</span>
                  <span class="font-medium">{{ selectedPatient.name }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Edad:</span>
                  <span class="font-medium">{{ selectedPatient.age }} años</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Cédula:</span>
                  <span class="font-medium">{{ selectedPatient.id_number }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Teléfono:</span>
                  <span class="font-medium">{{ selectedPatient.phone }}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Médica</h3>
              <div class="space-y-3">
                <div>
                  <span class="text-gray-600">Alergias:</span>
                  <p class="font-medium">{{ selectedPatient.allergies || 'Ninguna conocida' }}</p>
                </div>
                <div>
                  <span class="text-gray-600">Medicamentos:</span>
                  <p class="font-medium">{{ selectedPatient.medications || 'Ninguno' }}</p>
                </div>
                <div>
                  <span class="text-gray-600">Condiciones médicas:</span>
                  <p class="font-medium">{{ selectedPatient.conditions || 'Ninguna' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Treatment History -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Historial de Tratamientos</h3>
            <div class="space-y-4">
              <div v-for="treatment in selectedPatient.treatments" :key="treatment.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-gray-900">{{ treatment.procedure }}</h4>
                  <span class="text-sm text-gray-500">{{ formatDate(treatment.date) }}</span>
                </div>
                <p class="text-gray-700 mb-2">{{ treatment.description }}</p>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Estudiante: {{ treatment.student }}</span>
                  <span class="text-gray-600">Supervisor: {{ treatment.supervisor }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPatients.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay pacientes</h3>
      <p class="mt-1 text-sm text-gray-500">No se encontraron pacientes que coincidan con la búsqueda.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const selectedPatient = ref(null)

const patients = ref([
  {
    id: 1,
    name: 'María González',
    age: 35,
    id_number: '1234567890',
    phone: '0987654321',
    last_visit: '2024-01-10',
    treatments_count: 3,
    status: 'Activo',
    allergies: 'Penicilina',
    medications: 'Ibuprofeno 400mg',
    conditions: 'Hipertensión',
    treatments: [
      {
        id: 1,
        procedure: 'Limpieza dental',
        date: '2024-01-10',
        description: 'Profilaxis dental completa con aplicación de flúor',
        student: 'Juan Pérez',
        supervisor: 'Dr. García'
      },
      {
        id: 2,
        procedure: 'Obturación',
        date: '2023-12-15',
        description: 'Restauración de caries en molar superior derecho',
        student: 'Juan Pérez',
        supervisor: 'Dr. García'
      }
    ]
  },
  {
    id: 2,
    name: 'Carlos López',
    age: 28,
    id_number: '0987654321',
    phone: '0987654322',
    last_visit: '2024-01-08',
    treatments_count: 2,
    status: 'Activo',
    allergies: 'Ninguna conocida',
    medications: 'Ninguno',
    conditions: 'Ninguna',
    treatments: [
      {
        id: 3,
        procedure: 'Extracción',
        date: '2024-01-08',
        description: 'Extracción de tercer molar inferior izquierdo',
        student: 'Juan Pérez',
        supervisor: 'Dr. López'
      }
    ]
  }
])

const filteredPatients = computed(() => {
  if (!searchTerm.value) return patients.value
  
  return patients.value.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    patient.id_number.includes(searchTerm.value)
  )
})

const selectPatient = (patient) => {
  selectedPatient.value = patient
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    'Activo': 'bg-green-100 text-green-800',
    'Inactivo': 'bg-gray-100 text-gray-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
