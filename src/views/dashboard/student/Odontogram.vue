<!--
  PÁGINA DEL ODONTOGRAMA PARA ESTUDIANTES
  
  Esta página permite a los estudiantes usar la herramienta profesional de odontograma
  para registrar y gestionar el estado dental de sus pacientes asignados.
-->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header de la página -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Odontograma Digital</h1>
      <p class="text-gray-600">
        Herramienta profesional para el registro del estado dental de pacientes
      </p>
    </div>

    <!-- Selector de paciente -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Seleccionar Paciente</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Paciente Asignado
          </label>
          <select 
            v-model="selectedPatient" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar paciente...</option>
            <option 
              v-for="patient in assignedPatients" 
              :key="patient.id" 
              :value="patient"
            >
              {{ patient.name }} - {{ patient.age }} años
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Consulta
          </label>
          <input 
            v-model="consultationDate" 
            type="date" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div class="flex items-end">
          <button 
            @click="loadPatientOdontogram"
            :disabled="!selectedPatient"
            class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cargar Odontograma
          </button>
        </div>
      </div>
    </div>

    <!-- Componente de Odontograma Profesional -->
    <div v-if="selectedPatient" class="bg-white rounded-lg shadow-sm border">
      <ProfessionalOdontogram 
        :patient-data="selectedPatient"
        :consultation-date="consultationDate"
        @save-odontogram="handleSaveOdontogram"
      />
    </div>

    <!-- Estado vacío -->
    <div v-else class="bg-white rounded-lg shadow-sm border p-12 text-center">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Selecciona un paciente para comenzar
      </h3>
      <p class="text-gray-500">
        Elige un paciente de tu lista de asignados para crear o editar su odontograma
      </p>
    </div>

    <!-- Historial de odontogramas -->
    <div v-if="selectedPatient && odontogramHistory.length > 0" class="mt-6 bg-white rounded-lg shadow-sm border p-6">
      <h3 class="text-lg font-semibold mb-4">Historial de Odontogramas</h3>
      <div class="space-y-3">
        <div 
          v-for="record in odontogramHistory" 
          :key="record.id"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div>
            <p class="font-medium">{{ record.date }}</p>
            <p class="text-sm text-gray-600">{{ record.notes }}</p>
          </div>
          <button 
            @click="loadHistoricalOdontogram(record)"
            class="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DE LA PÁGINA DE ODONTOGRAMA PARA ESTUDIANTES
 * 
 * Esta página maneja:
 * - Selección de pacientes asignados al estudiante
 * - Integración con el componente ProfessionalOdontogram
 * - Gestión del historial de odontogramas
 * - Notas y observaciones de sesiones
 */

// Importar hooks de Vue
import { ref, onMounted } from 'vue'
// Importar componentes
import ProfessionalOdontogram from '../../../components/ProfessionalOdontogram.vue'

// Estado reactivo
const selectedPatient = ref(null)
const consultationDate = ref(new Date().toISOString().split('T')[0])
const assignedPatients = ref([])
const odontogramHistory = ref([])

// Pacientes de ejemplo asignados al estudiante
const mockPatients = [
  {
    id: 'PAT001',
    name: 'María González Pérez',
    age: 28,
    phone: '0987654321',
    assignedDate: '2024-01-15'
  },
  {
    id: 'PAT002',
    name: 'Carlos Rodríguez López',
    age: 35,
    phone: '0976543210',
    assignedDate: '2024-01-20'
  },
  {
    id: 'PAT003',
    name: 'Ana Martínez Silva',
    age: 42,
    phone: '0965432109',
    assignedDate: '2024-01-25'
  },
  {
    id: 'PAT004',
    name: 'Luis Hernández Castro',
    age: 31,
    phone: '0954321098',
    assignedDate: '2024-02-01'
  }
]

// Historial de ejemplo
const mockHistory = [
  {
    id: 1,
    patientId: 'PAT001',
    date: '2024-01-15',
    notes: 'Evaluación inicial - Caries en molares superiores'
  },
  {
    id: 2,
    patientId: 'PAT001',
    date: '2024-01-08',
    notes: 'Seguimiento post-tratamiento'
  }
]

/**
 * Cargar datos iniciales
 */
onMounted(() => {
  assignedPatients.value = mockPatients
})

/**
 * Cargar odontograma del paciente seleccionado
 */
const loadPatientOdontogram = () => {
  if (selectedPatient.value) {
    // Filtrar historial por paciente
    odontogramHistory.value = mockHistory.filter(
      record => record.patientId === selectedPatient.value.id
    )
    
    console.log('Cargando odontograma para:', selectedPatient.value.name)
  }
}

/**
 * Manejar guardado de odontograma
 */
const handleSaveOdontogram = (odontogramData) => {
  console.log('Guardando odontograma:', odontogramData)
  
  // Aquí se enviaría a la API
  // Por ahora solo mostramos confirmación
  alert('Odontograma guardado exitosamente')
  
  // Agregar al historial
  const newRecord = {
    id: Date.now(),
    patientId: selectedPatient.value.id,
    date: consultationDate.value,
    notes: 'Odontograma actualizado'
  }
  
  odontogramHistory.value.unshift(newRecord)
}

/**
 * Cargar odontograma histórico
 */
const loadHistoricalOdontogram = (record) => {
  console.log('Cargando odontograma histórico:', record)
  // Implementar lógica para cargar datos históricos
}
</script>
