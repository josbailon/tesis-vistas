<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-green-800">Asignación de Pacientes</h1>
        <p class="text-green-600">Asignar pacientes a estudiantes disponibles</p>
      </div>
      <button @click="showNewPatientModal = true" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
        <Plus class="h-4 w-4" />
        Nuevo Paciente
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div class="grid gap-4 md:grid-cols-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar Paciente</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Nombre o cédula..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="statusFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todos</option>
            <option value="unassigned">Sin asignar</option>
            <option value="assigned">Asignado</option>
            <option value="in-treatment">En tratamiento</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
          <select v-model="specialtyFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todas</option>
            <option value="general">General</option>
            <option value="endodoncia">Endodoncia</option>
            <option value="ortodoncia">Ortodoncia</option>
            <option value="cirugia">Cirugía</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
          <select v-model="priorityFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todas</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante Asignado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="patient in filteredPatients" :key="patient.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ patient.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ patient.name }}</div>
                    <div class="text-sm text-gray-500">{{ patient.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ patient.specialty }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`">
                  {{ getStatusLabel(patient.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(patient.priority)}`">
                  {{ getPriorityLabel(patient.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="patient.assignedStudent" class="text-sm text-gray-900">
                  {{ patient.assignedStudent }}
                </div>
                <div v-else class="text-sm text-gray-500">Sin asignar</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button 
                    v-if="!patient.assignedStudent"
                    @click="openAssignmentModal(patient)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Asignar
                  </button>
                  <button 
                    v-else
                    @click="openReassignmentModal(patient)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Reasignar
                  </button>
                  <button class="text-gray-600 hover:text-gray-900">Ver</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Assignment Modal -->
    <div v-if="showAssignmentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Asignar Paciente: {{ selectedPatient?.name }}
          </h3>
          <button @click="closeAssignmentModal" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estudiantes Disponibles</label>
            <div class="space-y-2 max-h-60 overflow-y-auto">
              <div v-for="student in availableStudents" :key="student.id"
                   @click="selectedStudent = student"
                   :class="`p-3 border rounded-lg cursor-pointer transition-colors ${
                     selectedStudent?.id === student.id
                       ? 'border-green-500 bg-green-50'
                       : 'border-gray-200 hover:border-green-300'
                   }`">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {{ student.name.split(' ').map(n => n[0]).join('') }}
                    </div>
                    <div>
                      <h4 class="font-medium text-gray-900">{{ student.name }}</h4>
                      <p class="text-sm text-gray-600">{{ student.semester }}° Semestre • {{ student.specialty }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-medium text-gray-900">{{ student.currentPatients }}/{{ student.maxPatients }}</div>
                    <div class="text-xs text-gray-500">Pacientes</div>
                  </div>
                </div>
                <div class="mt-2 flex items-center gap-4 text-xs text-gray-600">
                  <span>⭐ {{ student.rating }}</span>
                  <span>📅 {{ student.availability }}</span>
                  <span>🏆 {{ student.completedCases }} casos</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notas de Asignación</label>
            <textarea
              v-model="assignmentNotes"
              rows="3"
              placeholder="Notas adicionales sobre la asignación..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="closeAssignmentModal" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Cancelar
          </button>
          <button 
            @click="confirmAssignment"
            :disabled="!selectedStudent"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Asignación
          </button>
        </div>
      </div>
    </div>

    <!-- New Patient Modal -->
    <div v-if="showNewPatientModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Registrar Nuevo Paciente</h3>
          <button @click="showNewPatientModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <form @submit.prevent="createNewPatient" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                v-model="newPatient.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cédula</label>
              <input
                v-model="newPatient.id"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Especialidad Requerida</label>
            <select
              v-model="newPatient.specialty"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Seleccionar especialidad</option>
              <option value="general">General</option>
              <option value="endodoncia">Endodoncia</option>
              <option value="ortodoncia">Ortodoncia</option>
              <option value="cirugia">Cirugía</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
            <select
              v-model="newPatient.priority"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Seleccionar prioridad</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="showNewPatientModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Registrar Paciente
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Search, X } from 'lucide-vue-next'

const searchTerm = ref('')
const statusFilter = ref('')
const specialtyFilter = ref('')
const priorityFilter = ref('')

const showAssignmentModal = ref(false)
const showNewPatientModal = ref(false)
const selectedPatient = ref(null)
const selectedStudent = ref(null)
const assignmentNotes = ref('')

const newPatient = ref({
  name: '',
  id: '',
  specialty: '',
  priority: ''
})

const patients = ref([
  {
    id: '1234567890',
    name: 'María García',
    specialty: 'Endodoncia',
    status: 'unassigned',
    priority: 'high',
    assignedStudent: null
  },
  {
    id: '0987654321',
    name: 'Carlos López',
    specialty: 'Ortodoncia',
    status: 'assigned',
    priority: 'medium',
    assignedStudent: 'Juan Pérez'
  },
  {
    id: '1122334455',
    name: 'Ana Martínez',
    specialty: 'General',
    status: 'in-treatment',
    priority: 'low',
    assignedStudent: 'Elena Morales'
  }
])

const availableStudents = ref([
  {
    id: 1,
    name: 'Juan Pérez',
    semester: 8,
    specialty: 'Endodoncia',
    currentPatients: 3,
    maxPatients: 5,
    rating: 4.8,
    availability: 'Lun-Vie 8-12',
    completedCases: 12
  },
  {
    id: 2,
    name: 'Elena Morales',
    semester: 9,
    specialty: 'Ortodoncia',
    currentPatients: 2,
    maxPatients: 4,
    rating: 4.9,
    availability: 'Mar-Jue 14-18',
    completedCases: 15
  },
  {
    id: 3,
    name: 'Miguel Sánchez',
    semester: 7,
    specialty: 'General',
    currentPatients: 4,
    maxPatients: 6,
    rating: 4.6,
    availability: 'Lun-Mie 9-13',
    completedCases: 8
  }
])

const filteredPatients = computed(() => {
  return patients.value.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         patient.id.includes(searchTerm.value)
    const matchesStatus = !statusFilter.value || patient.status === statusFilter.value
    const matchesSpecialty = !specialtyFilter.value || patient.specialty.toLowerCase().includes(specialtyFilter.value.toLowerCase())
    const matchesPriority = !priorityFilter.value || patient.priority === priorityFilter.value
    
    return matchesSearch && matchesStatus && matchesSpecialty && matchesPriority
  })
})

const getStatusColor = (status) => {
  switch (status) {
    case 'unassigned':
      return 'bg-red-100 text-red-800'
    case 'assigned':
      return 'bg-yellow-100 text-yellow-800'
    case 'in-treatment':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'unassigned':
      return 'Sin asignar'
    case 'assigned':
      return 'Asignado'
    case 'in-treatment':
      return 'En tratamiento'
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

const openAssignmentModal = (patient) => {
  selectedPatient.value = patient
  selectedStudent.value = null
  assignmentNotes.value = ''
  showAssignmentModal.value = true
}

const openReassignmentModal = (patient) => {
  selectedPatient.value = patient
  selectedStudent.value = null
  assignmentNotes.value = ''
  showAssignmentModal.value = true
}

const closeAssignmentModal = () => {
  showAssignmentModal.value = false
  selectedPatient.value = null
  selectedStudent.value = null
  assignmentNotes.value = ''
}

const confirmAssignment = () => {
  if (selectedPatient.value && selectedStudent.value) {
    // Update patient assignment
    selectedPatient.value.assignedStudent = selectedStudent.value.name
    selectedPatient.value.status = 'assigned'
    
    // Update student patient count
    selectedStudent.value.currentPatients += 1
    
    alert(`Paciente ${selectedPatient.value.name} asignado exitosamente a ${selectedStudent.value.name}`)
    closeAssignmentModal()
  }
}

const createNewPatient = () => {
  const patient = {
    id: newPatient.value.id,
    name: newPatient.value.name,
    specialty: newPatient.value.specialty,
    status: 'unassigned',
    priority: newPatient.value.priority,
    assignedStudent: null
  }
  
  patients.value.push(patient)
  
  // Reset form
  newPatient.value = {
    name: '',
    id: '',
    specialty: '',
    priority: ''
  }
  
  showNewPatientModal.value = false
  alert('Paciente registrado exitosamente')
}
</script>
