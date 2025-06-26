<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Mis Citas</h1>
      <p class="text-gray-600">Gestiona tus citas programadas con pacientes</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Hoy</p>
            <p class="text-2xl font-semibold text-gray-900">{{ todayAppointments.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completadas</p>
            <p class="text-2xl font-semibold text-gray-900">{{ completedAppointments.length }}</p>
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
            <p class="text-sm font-medium text-gray-600">Pendientes</p>
            <p class="text-2xl font-semibold text-gray-900">{{ pendingAppointments.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Pacientes</p>
            <p class="text-2xl font-semibold text-gray-900">{{ totalPatients }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Appointments List -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Próximas Citas</h2>
      </div>
      <div class="divide-y divide-gray-200">
        <div v-for="appointment in appointments" :key="appointment.id" class="p-6 hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-blue-600">{{ appointment.patient.name.charAt(0) }}</span>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">{{ appointment.patient.name }}</h3>
                <p class="text-sm text-gray-500">{{ appointment.treatment }}</p>
                <p class="text-xs text-gray-400">{{ formatDate(appointment.date) }} - {{ appointment.time }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span :class="getStatusClass(appointment.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ appointment.status }}
              </span>
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const appointments = ref([
  {
    id: 1,
    patient: { name: 'María García', phone: '0987654321' },
    date: '2024-01-15',
    time: '09:00',
    treatment: 'Limpieza dental',
    status: 'Confirmada'
  },
  {
    id: 2,
    patient: { name: 'Carlos López', phone: '0987654322' },
    date: '2024-01-15',
    time: '10:30',
    treatment: 'Extracción',
    status: 'Pendiente'
  },
  {
    id: 3,
    patient: { name: 'Ana Rodríguez', phone: '0987654323' },
    date: '2024-01-16',
    time: '14:00',
    treatment: 'Endodoncia',
    status: 'Completada'
  }
])

const todayAppointments = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return appointments.value.filter(apt => apt.date === today)
})

const completedAppointments = computed(() => 
  appointments.value.filter(apt => apt.status === 'Completada')
)

const pendingAppointments = computed(() => 
  appointments.value.filter(apt => apt.status === 'Pendiente')
)

const totalPatients = computed(() => 
  new Set(appointments.value.map(apt => apt.patient.name)).size
)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    'Confirmada': 'bg-green-100 text-green-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Completada': 'bg-blue-100 text-blue-800',
    'Cancelada': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
