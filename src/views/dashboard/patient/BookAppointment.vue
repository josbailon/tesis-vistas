<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-green-600 to-blue-800 p-8 text-white shadow-xl">
      <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
      <div class="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10"></div>
      <div class="relative z-10">
        <div class="flex items-center justify-between">
          <div>
            <UleamBranding variant="header" />
            <h2 class="mt-4 text-3xl font-bold tracking-tight">Reservar Nueva Cita</h2>
            <p class="mt-2 max-w-2xl text-blue-100">
              Programa tu cita con nuestros estudiantes especializados de la Universidad Laica Eloy Alfaro de Manabí
            </p>
            <div class="mt-4 flex items-center gap-4 text-sm text-blue-200">
              <div class="flex items-center gap-1">
                <Stethoscope class="h-4 w-4" />
                <span>Atención Profesional</span>
              </div>
              <div class="flex items-center gap-1">
                <CheckCircle2 class="h-4 w-4" />
                <span>Supervisión Docente</span>
              </div>
              <div class="flex items-center gap-1">
                <Star class="h-4 w-4" />
                <span>Tecnología Avanzada</span>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="rounded-full bg-white/20 p-6">
              <Stethoscope class="h-16 w-16 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Indicator -->
    <div class="border border-green-200 rounded-lg p-6 bg-white shadow-sm border-l-4 border-l-blue-600">
      <div class="flex items-center justify-between">
        <div v-for="(step, index) in steps" :key="step.id" class="flex items-center">
          <div :class="`flex h-12 w-12 items-center justify-center rounded-full text-lg transition-all ${
            currentStep === step.id
              ? 'bg-blue-600 text-white shadow-lg scale-110'
              : index < getCurrentStepIndex()
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600'
          }`">
            {{ step.icon }}
          </div>
          <div class="ml-3 hidden sm:block">
            <p class="text-sm font-medium">{{ step.label }}</p>
            <p class="text-xs text-gray-500">{{ step.description }}</p>
          </div>
          <div v-if="index < steps.length - 1" class="mx-4 hidden sm:block">
            <ArrowRight :class="`h-5 w-5 ${
              index < getCurrentStepIndex() ? 'text-green-600' : 'text-gray-400'
            }`" />
          </div>
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="grid gap-8 lg:grid-cols-4">
      <div class="lg:col-span-3">
        <!-- Step 1: Specialty Selection -->
        <div v-if="currentStep === 'specialty'" class="space-y-6">
          <div class="text-center">
            <h3 class="text-xl font-semibold text-gray-900">Especialidades Disponibles</h3>
            <p class="text-sm text-gray-600 mt-1">
              Selecciona la especialidad y tipo de tratamiento que necesitas
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div v-for="specialty in specialties" :key="specialty.id" 
                 @click="selectSpecialty(specialty)"
                 :class="`cursor-pointer transition-all hover:shadow-md hover:scale-105 rounded-lg p-6 border ${
                   selectedSpecialty?.id === specialty.id
                     ? 'border-blue-500 bg-blue-50 shadow-lg'
                     : 'border-gray-200 hover:border-blue-300'
                 }`">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="h-2 w-2 rounded-full bg-blue-600"></div>
                    <h5 class="font-medium text-base">{{ specialty.name }}</h5>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">{{ specialty.description }}</p>
                  
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      ⏱️ {{ specialty.duration }} min
                    </span>
                    <span v-if="specialty.cost > 0" class="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs">
                      💰 ${{ specialty.cost }}
                    </span>
                    <span v-else class="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                      🆓 Gratuito
                    </span>
                  </div>
                </div>
                <CheckCircle2 v-if="selectedSpecialty?.id === specialty.id" class="h-5 w-5 text-blue-600 ml-2 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Student Selection -->
        <div v-if="currentStep === 'student'" class="space-y-6">
          <div class="text-center">
            <h3 class="text-xl font-semibold text-gray-900">Selecciona tu Estudiante</h3>
            <p class="text-sm text-gray-600 mt-1">
              Elige el estudiante que realizará tu tratamiento basándose en su experiencia y disponibilidad
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div v-for="student in availableStudents" :key="student.id"
                 @click="selectStudent(student)"
                 :class="`cursor-pointer transition-all hover:shadow-md rounded-lg p-4 border ${
                   selectedStudent?.id === student.id
                     ? 'border-blue-500 bg-blue-50'
                     : 'border-gray-200 hover:border-blue-300'
                 }`">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-12 w-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ student.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div>
                    <h4 class="font-medium">{{ student.name }}</h4>
                    <div class="flex items-center gap-1 text-sm text-gray-600">
                      <Star class="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {{ student.rating }} • {{ student.cases }} casos
                    </div>
                  </div>
                </div>
                <CheckCircle2 v-if="selectedStudent?.id === student.id" class="h-5 w-5 text-blue-600" />
              </div>
              
              <p class="text-sm text-gray-600 mt-2">{{ student.bio }}</p>
              
              <div class="flex flex-wrap gap-2 mt-3">
                <span :class="`px-2 py-1 rounded text-xs ${getExperienceColor(student.experience)}`">
                  {{ getExperienceLabel(student.experience) }}
                </span>
                <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                  Semestre {{ student.semester }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Date and Time Selection -->
        <div v-if="currentStep === 'datetime'" class="space-y-6">
          <div class="text-center">
            <h3 class="text-xl font-semibold text-gray-900">Selecciona Fecha y Hora</h3>
            <p class="text-sm text-gray-600 mt-1">
              Elige el día y horario que mejor se adapte a tu disponibilidad
            </p>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <!-- Calendar -->
            <div class="border border-gray-200 rounded-lg p-6">
              <h4 class="font-medium mb-4 flex items-center gap-2">
                <Calendar class="h-5 w-5" />
                Seleccionar Fecha
              </h4>
              <div class="grid grid-cols-7 gap-1 mb-4">
                <div v-for="day in ['L', 'M', 'X', 'J', 'V', 'S', 'D']" :key="day" 
                     class="text-center text-sm font-medium text-gray-500 p-2">
                  {{ day }}
                </div>
                <div v-for="date in calendarDates" :key="date.date"
                     @click="selectDate(date)"
                     :class="`text-center p-2 text-sm cursor-pointer rounded transition-colors ${
                       date.available
                         ? selectedDate?.date === date.date
                           ? 'bg-blue-600 text-white'
                           : 'hover:bg-blue-100'
                         : 'text-gray-300 cursor-not-allowed'
                     }`">
                  {{ date.day }}
                </div>
              </div>
            </div>

            <!-- Time Slots -->
            <div class="border border-gray-200 rounded-lg p-6">
              <h4 class="font-medium mb-4 flex items-center gap-2">
                <Clock class="h-5 w-5" />
                Horarios Disponibles
              </h4>
              <div v-if="!selectedDate" class="text-center py-8">
                <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p class="text-sm text-gray-500">Selecciona una fecha</p>
              </div>
              <div v-else-if="availableTimeSlots.length === 0" class="text-center py-8">
                <Clock class="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p class="text-sm text-gray-500">No hay horarios disponibles</p>
              </div>
              <div v-else class="grid grid-cols-2 gap-2">
                <button v-for="slot in availableTimeSlots" :key="slot.time"
                        @click="selectTimeSlot(slot)"
                        :class="`p-2 text-sm rounded border transition-colors ${
                          selectedTimeSlot?.time === slot.time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                        }`">
                  {{ slot.time }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Confirmation -->
        <div v-if="currentStep === 'confirm'" class="space-y-6">
          <div class="text-center">
            <h3 class="text-xl font-semibold text-gray-900">Confirmar Cita</h3>
            <p class="text-sm text-gray-600 mt-1">
              Revisa los detalles de tu cita antes de confirmar
            </p>
          </div>

          <div class="border border-gray-200 rounded-lg p-6">
            <h4 class="font-semibold text-lg border-b pb-2 mb-4">Resumen de la Cita</h4>
            <div class="grid gap-4 md:grid-cols-2">
              <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span class="text-sm text-gray-600">Especialidad:</span>
                  <span class="font-medium">{{ selectedSpecialty?.name }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span class="text-sm text-gray-600">Estudiante:</span>
                  <span class="font-medium">{{ selectedStudent?.name }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span class="text-sm text-gray-600">Fecha:</span>
                  <span class="font-medium">{{ selectedDate?.formatted }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span class="text-sm text-gray-600">Hora:</span>
                  <span class="font-medium">{{ selectedTimeSlot?.time }}</span>
                </div>
              </div>
              <div class="space-y-3">
                <div class="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-green-50">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {{ selectedStudent?.name.split(' ').map(n => n[0]).join('') }}
                    </div>
                    <div>
                      <p class="font-semibold">{{ selectedStudent?.name }}</p>
                      <p class="text-sm text-gray-600">{{ selectedStudent?.specialty }}</p>
                      <div class="flex items-center gap-1 text-sm mt-1">
                        <Star class="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{{ selectedStudent?.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                Notas Adicionales (Opcional)
              </label>
              <textarea
                id="notes"
                v-model="additionalNotes"
                rows="3"
                placeholder="Información adicional que consideres importante..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-center gap-2">
                <Info class="h-4 w-4 text-blue-600" />
                <p class="text-sm text-blue-800">
                  <strong>Información importante:</strong> Tu solicitud será revisada y recibirás confirmación por correo electrónico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Progress -->
        <div class="border border-green-200 rounded-lg p-4 bg-white shadow-sm border-l-4 border-l-green-600">
          <h4 class="text-base font-semibold flex items-center gap-2 mb-3">
            <CheckCircle2 class="h-4 w-4 text-green-600" />
            Tu Progreso
          </h4>
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div :class="`h-3 w-3 rounded-full ${selectedSpecialty ? 'bg-green-500' : 'bg-gray-300'}`"></div>
              <span class="text-sm">Especialidad seleccionada</span>
            </div>
            <div class="flex items-center gap-2">
              <div :class="`h-3 w-3 rounded-full ${selectedStudent ? 'bg-green-500' : 'bg-gray-300'}`"></div>
              <span class="text-sm">Estudiante seleccionado</span>
            </div>
            <div class="flex items-center gap-2">
              <div :class="`h-3 w-3 rounded-full ${selectedTimeSlot ? 'bg-green-500' : 'bg-gray-300'}`"></div>
              <span class="text-sm">Fecha y hora seleccionadas</span>
            </div>
          </div>
        </div>

        <!-- ULEAM Info -->
        <div class="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
          <h4 class="text-base font-semibold flex items-center gap-2 mb-3">
            <UleamBranding variant="logo-only" />
            Clínica ULEAM
          </h4>
          <div class="space-y-3 text-sm">
            <p class="font-medium text-blue-900">Clínica Dental Universitaria</p>
            <p class="text-gray-600">
              Atención odontológica de calidad con estudiantes supervisados por docentes especializados.
            </p>
            <div class="space-y-2 pt-2 border-t">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 text-green-600" />
                <span>Supervisión profesional</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 text-green-600" />
                <span>Equipos modernos</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="h-4 w-4 text-green-600" />
                <span>Precios accesibles</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          <h4 class="text-base font-semibold mb-3">¿Necesitas Ayuda?</h4>
          <p class="text-sm text-gray-600 mb-3">
            Si tienes preguntas sobre el proceso de reserva, contáctanos:
          </p>
          <div class="space-y-2 text-sm">
            <p><strong>Teléfono:</strong> (05) 2623-740</p>
            <p><strong>Email:</strong> clinica.dental@uleam.edu.ec</p>
            <p><strong>Horario:</strong> Lun-Vie 8:00-18:00</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between">
      <div>
        <button v-if="currentStep !== 'specialty'" @click="goToPreviousStep" 
                class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md transition-colors flex items-center gap-2">
          <ArrowLeft class="h-4 w-4" />
          Anterior
        </button>
      </div>

      <div class="flex gap-2">
        <button v-if="currentStep === 'specialty' && selectedSpecialty" @click="goToNextStep"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
          Continuar
          <ArrowRight class="h-4 w-4" />
        </button>

        <button v-if="currentStep === 'student' && selectedStudent" @click="goToNextStep"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
          Continuar
          <ArrowRight class="h-4 w-4" />
        </button>

        <button v-if="currentStep === 'datetime' && selectedDate && selectedTimeSlot" @click="goToNextStep"
                class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
          Continuar
          <ArrowRight class="h-4 w-4" />
        </button>

        <button v-if="currentStep === 'confirm'" @click="confirmAppointment" :disabled="loading"
                class="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50">
          <CheckCircle2 class="h-4 w-4" />
          {{ loading ? 'Procesando...' : 'Confirmar Cita' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import UleamBranding from '../../../components/UleamBranding.vue'
import {
  Stethoscope, CheckCircle2, Star, ArrowRight, ArrowLeft, Calendar, Clock,
  Info, Plus, Users, GraduationCap
} from 'lucide-vue-next'

const router = useRouter()

const currentStep = ref('specialty')
const loading = ref(false)
const additionalNotes = ref('')

const selectedSpecialty = ref(null)
const selectedStudent = ref(null)
const selectedDate = ref(null)
const selectedTimeSlot = ref(null)

const steps = [
  { id: 'specialty', label: 'Especialidad', icon: '🦷', description: 'Tipo de tratamiento' },
  { id: 'student', label: 'Especialista', icon: '👨‍⚕️', description: 'Estudiante ULEAM' },
  { id: 'datetime', label: 'Fecha y Hora', icon: '📅', description: 'Horario disponible' },
  { id: 'confirm', label: 'Confirmar', icon: '✅', description: 'Finalizar reserva' }
]

const specialties = ref([
  {
    id: 1,
    name: 'Consulta General',
    description: 'Evaluación inicial y diagnóstico',
    duration: 45,
    cost: 0
  },
  {
    id: 2,
    name: 'Limpieza Dental',
    description: 'Profilaxis y limpieza profesional',
    duration: 60,
    cost: 0
  },
  {
    id: 3,
    name: 'Endodoncia',
    description: 'Tratamiento de conductos radiculares',
    duration: 90,
    cost: 50
  },
  {
    id: 4,
    name: 'Ortodoncia',
    description: 'Corrección de malposiciones dentales',
    duration: 60,
    cost: 80
  }
])

const availableStudents = ref([
  {
    id: 1,
    name: 'Dr. Miguel Sánchez',
    specialty: 'Cirugía Oral',
    rating: 4.9,
    cases: 58,
    experience: 'advanced',
    semester: 9,
    bio: 'Estudiante senior especializado en cirugía oral y procedimientos complejos.'
  },
  {
    id: 2,
    name: 'Dra. Elena Morales',
    specialty: 'Endodoncia',
    rating: 4.7,
    cases: 48,
    experience: 'intermediate',
    semester: 8,
    bio: 'Estudiante dedicada a la endodoncia conservadora y tratamientos de conducto.'
  },
  {
    id: 3,
    name: 'Dr. Carlos Mendoza',
    specialty: 'Ortodoncia',
    rating: 4.6,
    cases: 45,
    experience: 'intermediate',
    semester: 8,
    bio: 'Especializado en ortodoncia para adolescentes y adultos.'
  }
])

const calendarDates = ref([])
const availableTimeSlots = ref([])

// Generate calendar dates for current month
const generateCalendarDates = () => {
  const today = new Date()
  const dates = []
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    dates.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      formatted: date.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      available: date.getDay() !== 0 && date.getDay() !== 6 // No weekends
    })
  }
  
  calendarDates.value = dates
}

// Generate time slots when date is selected
const generateTimeSlots = () => {
  if (!selectedDate.value) return
  
  const slots = []
  const startHour = 8
  const endHour = 18
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push({ time, available: Math.random() > 0.3 }) // Random availability
    }
  }
  
  availableTimeSlots.value = slots.filter(slot => slot.available)
}

const getCurrentStepIndex = () => {
  return steps.findIndex(step => step.id === currentStep.value)
}

const getExperienceColor = (experience) => {
  switch (experience) {
    case 'beginner': return 'bg-blue-100 text-blue-800'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800'
    case 'advanced': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getExperienceLabel = (experience) => {
  switch (experience) {
    case 'beginner': return 'Principiante'
    case 'intermediate': return 'Intermedio'
    case 'advanced': return 'Avanzado'
    default: return 'No especificado'
  }
}

const selectSpecialty = (specialty) => {
  selectedSpecialty.value = specialty
}

const selectStudent = (student) => {
  selectedStudent.value = student
}

const selectDate = (date) => {
  if (date.available) {
    selectedDate.value = date
    selectedTimeSlot.value = null
    generateTimeSlots()
  }
}

const selectTimeSlot = (slot) => {
  selectedTimeSlot.value = slot
}

const goToNextStep = () => {
  const stepIds = ['specialty', 'student', 'datetime', 'confirm']
  const currentIndex = stepIds.indexOf(currentStep.value)
  if (currentIndex < stepIds.length - 1) {
    currentStep.value = stepIds[currentIndex + 1]
  }
}

const goToPreviousStep = () => {
  const stepIds = ['specialty', 'student', 'datetime', 'confirm']
  const currentIndex = stepIds.indexOf(currentStep.value)
  if (currentIndex > 0) {
    currentStep.value = stepIds[currentIndex - 1]
  }
}

const confirmAppointment = async () => {
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    currentStep.value = 'specialty'
    selectedSpecialty.value = null
    selectedStudent.value = null
    selectedDate.value = null
    selectedTimeSlot.value = null
    additionalNotes.value = ''
    
    alert('¡Cita solicitada exitosamente! Recibirás una confirmación por correo electrónico.')
    router.push('/dashboard/my-appointments')
  } catch (error) {
    alert('Error al procesar la solicitud. Inténtalo de nuevo.')
  } finally {
    loading.value = false
  }
}

// Initialize calendar
const initCalendar = () => {
  generateCalendarDates()
}

// Watch for date selection to generate time slots
watch(selectedDate, generateTimeSlots)

// Call initCalendar at the top level
initCalendar()
</script>
