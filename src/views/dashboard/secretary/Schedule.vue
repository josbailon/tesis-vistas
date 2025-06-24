<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-green-800">Gestión de Horarios</h1>
        <p class="text-green-600">Visualizar y gestionar horarios para prevenir conflictos</p>
      </div>
      <div class="flex gap-2">
        <button @click="currentView = 'day'" :class="`px-3 py-2 rounded-md text-sm ${currentView === 'day' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`">
          Día
        </button>
        <button @click="currentView = 'week'" :class="`px-3 py-2 rounded-md text-sm ${currentView === 'week' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`">
          Semana
        </button>
        <button @click="currentView = 'month'" :class="`px-3 py-2 rounded-md text-sm ${currentView === 'month' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`">
          Mes
        </button>
      </div>
    </div>

    <!-- Date Navigation -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div class="flex items-center justify-between">
        <button @click="navigateDate(-1)" class="p-2 hover:bg-gray-100 rounded-md">
          <ChevronLeft class="h-5 w-5" />
        </button>
        <h2 class="text-xl font-semibold text-gray-900">{{ currentDateDisplay }}</h2>
        <button @click="navigateDate(1)" class="p-2 hover:bg-gray-100 rounded-md">
          <ChevronRight class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div class="grid gap-4 md:grid-cols-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estudiante</label>
          <select v-model="selectedStudent" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todos los estudiantes</option>
            <option v-for="student in students" :key="student.id" :value="student.id">
              {{ student.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
          <select v-model="selectedSpecialty" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todas las especialidades</option>
            <option value="general">General</option>
            <option value="endodoncia">Endodoncia</option>
            <option value="ortodoncia">Ortodoncia</option>
            <option value="cirugia">Cirugía</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="selectedStatus" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Todos los estados</option>
              <option value="scheduled">Programada</option>
              <option value="in-progress">En progreso</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Paciente o estudiante..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Schedule Grid -->
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm mt-6">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Calendar class="h-5 w-5" />
            Horarios - Vista {{ currentView === 'day' ? 'Diaria' : currentView === 'week' ? 'Semanal' : 'Mensual' }}
          </h2>
        </div>
        
        <!-- Day View -->
        <div v-if="currentView === 'day'" class="p-6">
          <div class="grid grid-cols-1 gap-4">
            <div class="grid grid-cols-13 gap-1 text-sm">
              <div class="font-medium text-gray-700 p-2">Hora</div>
              <div v-for="hour in dayHours" :key="hour" class="font-medium text-gray-700 p-2 text-center">
                {{ hour }}
              </div>
            </div>
            <div v-for="student in filteredStudents" :key="student.id" class="grid grid-cols-13 gap-1">
              <div class="p-2 font-medium text-gray-900 bg-gray-50 rounded">
                {{ student.name }}
              </div>
              <div v-for="hour in dayHours" :key="`${student.id}-${hour}`" class="relative">
                <div class="h-16 border border-gray-200 rounded">
                  <div v-for="appointment in getAppointmentsForStudentAndHour(student.id, hour)" 
                       :key="appointment.id"
                       :class="`absolute inset-1 rounded text-xs p-1 text-white ${getAppointmentColor(appointment.status)}`">
                    <div class="font-medium">{{ appointment.patient }}</div>
                    <div class="opacity-75">{{ appointment.type }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-if="currentView === 'week'" class="p-6">
          <div class="grid grid-cols-8 gap-1 text-sm">
            <div class="font-medium text-gray-700 p-2"></div>
            <div v-for="day in weekDays" :key="day" class="font-medium text-gray-700 p-2 text-center">
              {{ day }}
            </div>
          </div>
          <div v-for="hour in dayHours" :key="hour" class="grid grid-cols-8 gap-1 border-b border-gray-100">
            <div class="p-2 font-medium text-gray-600 bg-gray-50">{{ hour }}</div>
            <div v-for="day in weekDays" :key="`${hour}-${day}`" class="relative">
              <div class="h-12 border-r border-gray-100">
                <div v-for="appointment in getAppointmentsForDayAndHour(day, hour)" 
                     :key="appointment.id"
                     :class="`absolute inset-0 rounded text-xs p-1 text-white ${getAppointmentColor(appointment.status)}`">
                  <div class="font-medium truncate">{{ appointment.patient }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Month View -->
        <div v-if="currentView === 'month'" class="p-6">
          <div class="grid grid-cols-7 gap-1">
            <div v-for="day in ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']" 
                 :key="day" 
                 class="font-medium text-gray-700 p-2 text-center">
              {{ day }}
            </div>
          </div>
          <div class="grid grid-cols-7 gap-1">
            <div v-for="date in monthDates" :key="date.date" 
                 class="h-24 border border-gray-200 rounded p-1">
              <div class="text-sm font-medium text-gray-900 mb-1">{{ date.day }}</div>
              <div class="space-y-1">
                <div v-for="appointment in getAppointmentsForDate(date.date)" 
                     :key="appointment.id"
                     :class="`text-xs p-1 rounded text-white truncate ${getAppointmentColor(appointment.status)}`">
                  {{ appointment.patient }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conflict Detection -->
      <div v-if="conflicts.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
        <div class="flex items-center gap-2 mb-3">
          <AlertTriangle class="h-5 w-5 text-red-600" />
          <h3 class="font-semibold text-red-800">Conflictos Detectados</h3>
        </div>
        <div class="space-y-2">
          <div v-for="conflict in conflicts" :key="conflict.id" 
               class="bg-white border border-red-200 rounded p-3">
            <div class="font-medium text-red-800">{{ conflict.message }}</div>
            <div class="text-sm text-red-600 mt-1">{{ conflict.details }}</div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="grid gap-4 md:grid-cols-4 mt-6">
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-blue-600">{{ scheduleStats.totalAppointments }}</div>
          <div class="text-sm text-blue-600">Citas Totales</div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-green-600">{{ scheduleStats.availableSlots }}</div>
          <div class="text-sm text-green-600">Espacios Disponibles</div>
        </div>
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-yellow-600">{{ scheduleStats.conflicts }}</div>
          <div class="text-sm text-yellow-600">Conflictos</div>
        </div>
        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div class="text-2xl font-bold text-purple-600">{{ scheduleStats.utilization }}%</div>
          <div class="text-sm text-purple-600">Utilización</div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed } from 'vue'
  import { Calendar, ChevronLeft, ChevronRight, Search, AlertTriangle } from 'lucide-vue-next'

  const currentView = ref('week')
  const currentDate = ref(new Date())
  const selectedStudent = ref('')
  const selectedSpecialty = ref('')
  const selectedStatus = ref('')
  const searchTerm = ref('')

  const students = ref([
    { id: 1, name: 'Juan Pérez', specialty: 'Endodoncia' },
    { id: 2, name: 'Elena Morales', specialty: 'Ortodoncia' },
    { id: 3, name: 'Miguel Sánchez', specialty: 'General' },
    { id: 4, name: 'Ana García', specialty: 'Cirugía' }
  ])

  const appointments = ref([
    {
      id: 1,
      student: 'Juan Pérez',
      studentId: 1,
      patient: 'María López',
      type: 'Endodoncia',
      date: '2025-01-15',
      time: '09:00',
      status: 'scheduled'
    },
    {
      id: 2,
      student: 'Elena Morales',
      studentId: 2,
      patient: 'Carlos Ruiz',
      type: 'Ortodoncia',
      date: '2025-01-15',
      time: '10:00',
      status: 'in-progress'
    },
    {
      id: 3,
      student: 'Miguel Sánchez',
      studentId: 3,
      patient: 'Ana Martínez',
      type: 'Limpieza',
      date: '2025-01-15',
      time: '11:00',
      status: 'completed'
    }
  ])

  const conflicts = ref([
    {
      id: 1,
      message: 'Conflicto de horario detectado',
      details: 'Juan Pérez tiene dos citas programadas para las 14:00 el 15 de enero'
    }
  ])

  const scheduleStats = ref({
    totalAppointments: 24,
    availableSlots: 36,
    conflicts: 1,
    utilization: 67
  })

  const dayHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  const currentDateDisplay = computed(() => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: currentView.value === 'day' ? 'numeric' : undefined 
    }
    return currentDate.value.toLocaleDateString('es-ES', options)
  })

  const filteredStudents = computed(() => {
    return students.value.filter(student => {
      const matchesStudent = !selectedStudent.value || student.id.toString() === selectedStudent.value
      const matchesSpecialty = !selectedSpecialty.value || student.specialty.toLowerCase().includes(selectedSpecialty.value.toLowerCase())
      const matchesSearch = !searchTerm.value || student.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      
      return matchesStudent && matchesSpecialty && matchesSearch
    })
  })

  const monthDates = computed(() => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const dates = []

    for (let day = 1; day <= lastDay.getDate(); day++) {
      dates.push({
        date: `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
        day: day
      })
    }

    return dates
  })

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate.value)
    
    if (currentView.value === 'day') {
      newDate.setDate(newDate.getDate() + direction)
    } else if (currentView.value === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7))
    } else if (currentView.value === 'month') {
      newDate.setMonth(newDate.getMonth() + direction)
    }
    
    currentDate.value = newDate
  }

  const getAppointmentColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500'
      case 'in-progress':
        return 'bg-yellow-500'
      case 'completed':
        return 'bg-green-500'
      case 'cancelled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getAppointmentsForStudentAndHour = (studentId, hour) => {
    return appointments.value.filter(apt => 
      apt.studentId === studentId && 
      apt.time === hour &&
      apt.date === currentDate.value.toISOString().split('T')[0]
    )
  }

  const getAppointmentsForDayAndHour = (day, hour) => {
    // This would need proper date calculation based on the week
    return appointments.value.filter(apt => apt.time === hour)
  }

  const getAppointmentsForDate = (date) => {
    return appointments.value.filter(apt => apt.date === date)
  }
  </script>
