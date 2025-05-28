<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Mi Historial Médico</h1>
      <p class="text-green-600">Accede a tu expediente clínico completo</p>
    </div>

    <!-- Patient Info Card -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <User class="h-5 w-5" />
          Información del Paciente
        </h2>
      </div>
      <div class="p-6">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-700">Nombre Completo</label>
              <p class="text-gray-900">{{ patientInfo.name }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <p class="text-gray-900">{{ patientInfo.birthDate }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700">Teléfono</label>
              <p class="text-gray-900">{{ patientInfo.phone }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-gray-700">Correo Electrónico</label>
              <p class="text-gray-900">{{ patientInfo.email }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700">Dirección</label>
              <p class="text-gray-900">{{ patientInfo.address }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700">Contacto de Emergencia</label>
              <p class="text-gray-900">{{ patientInfo.emergencyContact }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Medical History -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <FileText class="h-5 w-5" />
          Historial de Tratamientos
        </h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="treatment in medicalHistory" :key="treatment.id" 
               class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h3 class="font-semibold text-gray-900">{{ treatment.procedure }}</h3>
                <p class="text-sm text-gray-600">{{ treatment.date }}</p>
              </div>
              <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(treatment.status)}`">
                {{ treatment.status }}
              </span>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <p class="text-sm text-gray-600 mb-1">Estudiante:</p>
                <p class="font-medium">{{ treatment.student }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-1">Supervisor:</p>
                <p class="font-medium">{{ treatment.supervisor }}</p>
              </div>
            </div>
            <div class="mt-3">
              <p class="text-sm text-gray-600 mb-1">Notas:</p>
              <p class="text-gray-900">{{ treatment.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Odontogram -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <Stethoscope class="h-5 w-5" />
          Odontograma
        </h2>
      </div>
      <div class="p-6">
        <div class="text-center">
          <div class="inline-block p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Stethoscope class="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600">Odontograma interactivo</p>
            <p class="text-sm text-gray-500">Visualización del estado dental actual</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Documents -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <Download class="h-5 w-5" />
          Documentos Médicos
        </h2>
      </div>
      <div class="p-6">
        <div class="space-y-3">
          <div v-for="document in documents" :key="document.id" 
               class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText class="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ document.name }}</h3>
                <p class="text-sm text-gray-600">{{ document.date }} • {{ document.size }}</p>
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
</template>

<script setup>
import { ref } from 'vue'
import { User, FileText, Stethoscope, Download } from 'lucide-vue-next'

const patientInfo = ref({
  name: 'Ana López',
  birthDate: '15 de marzo, 1995',
  phone: '+593 99 123 4567',
  email: 'ana.lopez@email.com',
  address: 'Av. Universidad 123, Manta, Ecuador',
  emergencyContact: 'María López - +593 99 765 4321'
})

const medicalHistory = ref([
  {
    id: 1,
    procedure: 'Limpieza Dental',
    date: '10 de diciembre, 2024',
    student: 'Juan Pérez',
    supervisor: 'Dr. María González',
    status: 'Completado',
    notes: 'Limpieza profunda realizada. Se recomienda uso de hilo dental diario.'
  },
  {
    id: 2,
    procedure: 'Consulta General',
    date: '5 de noviembre, 2024',
    student: 'Elena Morales',
    supervisor: 'Dr. Carlos Ruiz',
    status: 'Completado',
    notes: 'Evaluación inicial. Se detectó caries en molar superior derecho.'
  },
  {
    id: 3,
    procedure: 'Endodoncia',
    date: '20 de enero, 2025',
    student: 'Miguel Sánchez',
    supervisor: 'Dr. Pedro Gómez',
    status: 'Programado',
    notes: 'Tratamiento de conducto programado para molar superior derecho.'
  }
])

const documents = ref([
  {
    id: 1,
    name: 'Radiografía Panorámica',
    date: '10 dic 2024',
    size: '2.3 MB'
  },
  {
    id: 2,
    name: 'Consentimiento Informado',
    date: '5 nov 2024',
    size: '156 KB'
  },
  {
    id: 3,
    name: 'Plan de Tratamiento',
    date: '5 nov 2024',
    size: '89 KB'
  }
])

const getStatusColor = (status) => {
  switch (status) {
    case 'Completado':
      return 'bg-green-100 text-green-800'
    case 'Programado':
      return 'bg-blue-100 text-blue-800'
    case 'En Progreso':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
