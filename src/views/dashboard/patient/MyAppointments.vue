<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-green-800">Mis Citas</h1>
        <p class="text-green-600">Gestiona tus citas médicas y revisa tu historial</p>
      </div>
      <router-link to="/dashboard/book-appointment">
        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
          <Plus class="h-4 w-4" />
          Nueva Cita
        </button>
      </router-link>
    </div>

    <!-- Upcoming Appointments -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <Calendar class="h-5 w-5" />
          Próximas Citas
        </h2>
      </div>
      <div class="p-6">
        <div v-if="upcomingAppointments.length === 0" class="text-center py-8">
          <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600 mb-4">No tienes citas programadas</p>
          <router-link to="/dashboard/book-appointment">
            <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
              Reservar Primera Cita
            </button>
          </router-link>
        </div>
        <div v-else class="space-y-4">
          <div v-for="appointment in upcomingAppointments" :key="appointment.id" 
               class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Stethoscope class="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ appointment.type }}</h3>
                  <p class="text-sm text-gray-600">{{ appointment.date }} - {{ appointment.time }}</p>
                  <p class="text-sm text-gray-600">Dr. {{ appointment.doctor }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`">
                  {{ appointment.status }}
                </span>
                <button class="text-gray-400 hover:text-gray-600">
                  <MoreVertical class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Appointments -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <Clock class="h-5 w-5" />
          Historial de Citas
        </h2>
      </div>
      <div class="p-6">
        <div v-if="pastAppointments.length === 0" class="text-center py-8">
          <FileText class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600">No hay citas anteriores</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="appointment in pastAppointments" :key="appointment.id" 
               class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle class="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ appointment.type }}</h3>
                  <p class="text-sm text-gray-600">{{ appointment.date }} - {{ appointment.time }}</p>
                  <p class="text-sm text-gray-600">Dr. {{ appointment.doctor }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Completada
                </span>
                <button class="text-blue-600 hover:text-blue-800 text-sm">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Calendar, Plus, Stethoscope, Clock, FileText, CheckCircle, MoreVertical } from 'lucide-vue-next'

const upcomingAppointments = ref([
  {
    id: 1,
    type: 'Consulta General',
    date: '15 de Enero, 2025',
    time: '10:00 AM',
    doctor: 'María González',
    status: 'Confirmada'
  },
  {
    id: 2,
    type: 'Limpieza Dental',
    date: '22 de Enero, 2025',
    time: '2:00 PM',
    doctor: 'Carlos Ruiz',
    status: 'Pendiente'
  }
])

const pastAppointments = ref([
  {
    id: 3,
    type: 'Revisión General',
    date: '10 de Diciembre, 2024',
    time: '9:00 AM',
    doctor: 'Ana López',
    status: 'Completada'
  },
  {
    id: 4,
    type: 'Endodoncia',
    date: '5 de Diciembre, 2024',
    time: '11:30 AM',
    doctor: 'Pedro Gómez',
    status: 'Completada'
  }
])

const getStatusColor = (status) => {
  switch (status) {
    case 'Confirmada':
      return 'bg-green-100 text-green-800'
    case 'Pendiente':
      return 'bg-yellow-100 text-yellow-800'
    case 'Cancelada':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
