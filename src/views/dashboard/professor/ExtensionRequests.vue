<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Solicitudes de Extensión</h1>
      <p class="text-green-600">Revisar y gestionar solicitudes de extensión de tareas</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-6 md:grid-cols-4">
      <div class="bg-white rounded-lg border border-yellow-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-yellow-800">Pendientes</p>
            <p class="text-2xl font-bold text-yellow-700">{{ stats.pending }}</p>
          </div>
          <Clock class="h-8 w-8 text-yellow-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-800">Aprobadas</p>
            <p class="text-2xl font-bold text-green-700">{{ stats.approved }}</p>
          </div>
          <CheckCircle class="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-red-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-red-800">Rechazadas</p>
            <p class="text-2xl font-bold text-red-700">{{ stats.rejected }}</p>
          </div>
          <XCircle class="h-8 w-8 text-red-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-800">Esta Semana</p>
            <p class="text-2xl font-bold text-blue-700">{{ stats.thisWeek }}</p>
          </div>
          <Calendar class="h-8 w-8 text-blue-600" />
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div class="grid gap-4 md:grid-cols-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="statusFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="approved">Aprobadas</option>
            <option value="rejected">Rechazadas</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Materia</label>
          <select v-model="subjectFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todas</option>
            <option value="endodoncia">Endodoncia</option>
            <option value="ortodoncia">Ortodoncia</option>
            <option value="cirugia">Cirugía Oral</option>
            <option value="periodoncia">Periodoncia</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Urgencia</label>
          <select v-model="urgencyFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todas</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Estudiante o tarea..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Extension Requests List -->
    <div class="space-y-4">
      <div v-for="request in filteredRequests" :key="request.id" 
           class="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ request.assignmentTitle }}</h3>
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`">
                  {{ getStatusLabel(request.status) }}
                </span>
                <span v-if="request.urgency === 'high'" class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Urgente
                </span>
              </div>
              <div class="flex items-center gap-6 text-sm text-gray-600 mb-3">
                <div class="flex items-center gap-1">
                  <User class="h-4 w-4" />
                  <span>{{ request.studentName }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <BookOpen class="h-4 w-4" />
                  <span>{{ request.subject }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Calendar class="h-4 w-4" />
                  <span>Solicitada: {{ request.requestDate }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Clock class="h-4 w-4" />
                  <span>Vence: {{ request.originalDueDate }}</span>
                </div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 class="font-medium text-gray-900 mb-2">Justificación:</h4>
                <p class="text-sm text-gray-700">{{ request.reason }}</p>
              </div>
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <p class="text-sm font-medium text-gray-900">Fecha original de vencimiento:</p>
                  <p class="text-sm text-gray-600">{{ request.originalDueDate }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Nueva fecha solicitada:</p>
                  <p class="text-sm text-gray-600">{{ request.requestedDueDate }}</p>
                </div>
              </div>
            </div>
            <div v-if="request.status === 'pending'" class="flex items-center gap-2 ml-4">
              <button 
                @click="approveRequest(request)"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-1"
              >
                <CheckCircle class="h-4 w-4" />
                Aprobar
              </button>
              <button 
                @click="openRejectModal(request)"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-1"
              >
                <XCircle class="h-4 w-4" />
                Rechazar
              </button>
              <button 
                @click="viewRequestDetails(request)"
                class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm transition-colors"
              >
                Ver Detalles
              </button>
            </div>
            <div v-else class="ml-4">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">
                  {{ request.status === 'approved' ? 'Aprobada' : 'Rechazada' }}
                </p>
                <p class="text-sm text-gray-600">{{ request.reviewDate }}</p>
                <p class="text-xs text-gray-500">por {{ request.reviewedBy }}</p>
              </div>
            </div>
          </div>

          <!-- Response/Feedback -->
          <div v-if="request.response" class="border-t pt-4">
            <h4 class="font-medium text-gray-900 mb-2">Respuesta del profesor:</h4>
            <p class="text-sm text-gray-700 bg-blue-50 p-3 rounded">{{ request.response }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Request Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Detalles de Solicitud de Extensión
          </h3>
          <button @click="showDetailsModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <div v-if="selectedRequest" class="space-y-6">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Información del Estudiante</h4>
              <div class="space-y-2 text-sm">
                <p><strong>Nombre:</strong> {{ selectedRequest.studentName }}</p>
                <p><strong>Email:</strong> {{ selectedRequest.studentEmail }}</p>
                <p><strong>Semestre:</strong> {{ selectedRequest.studentSemester }}°</p>
                <p><strong>Promedio:</strong> {{ selectedRequest.studentGPA }}</p>
              </div>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Información de la Tarea</h4>
              <div class="space-y-2 text-sm">
                <p><strong>Título:</strong> {{ selectedRequest.assignmentTitle }}</p>
                <p><strong>Materia:</strong> {{ selectedRequest.subject }}</p>
                <p><strong>Fecha original:</strong> {{ selectedRequest.originalDueDate }}</p>
                <p><strong>Nueva fecha:</strong> {{ selectedRequest.requestedDueDate }}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-2">Justificación Completa</h4>
            <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded">
              {{ selectedRequest.reason }}
            </p>
          </div>

          <div v-if="selectedRequest.previousExtensions > 0">
            <h4 class="font-medium text-gray-900 mb-2">Historial de Extensiones</h4>
            <p class="text-sm text-gray-700">
              Este estudiante ha solicitado {{ selectedRequest.previousExtensions }} extensiones anteriormente en esta materia.
            </p>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-2">Progreso de la Tarea</h4>
            <div class="flex items-center gap-3">
              <div class="flex-1 bg-gray-200 rounded-full h-2">
                <div :class="`h-2 rounded-full ${getProgressColor(selectedRequest.assignmentProgress)}`" 
                     :style="`width: ${selectedRequest.assignmentProgress}%`"></div>
              </div>
              <span class="text-sm font-medium text-gray-700">{{ selectedRequest.assignmentProgress }}%</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="showDetailsModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Cerrar
          </button>
          <button 
            v-if="selectedRequest?.status === 'pending'"
            @click="approveRequestFromModal"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Aprobar
          </button>
          <button 
            v-if="selectedRequest?.status === 'pending'"
            @click="openRejectModalFromDetails"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Rechazar Solicitud</h3>
          <button @click="showRejectModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <form @submit.prevent="rejectRequest" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estudiante</label>
            <p class="text-sm text-gray-900 bg-gray-50 p-2 rounded">{{ rejectData.studentName }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tarea</label>
            <p class="text-sm text-gray-900 bg-gray-50 p-2 rounded">{{ rejectData.assignmentTitle }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Motivo del rechazo *</label>
            <textarea
              v-model="rejectData.reason"
              rows="4"
              required
              placeholder="Explica por qué se rechaza la solicitud de extensión..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sugerencias (opcional)</label>
            <textarea
              v-model="rejectData.suggestions"
              rows="3"
              placeholder="Sugerencias para el estudiante..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="showRejectModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Confirmar Rechazo
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Clock, CheckCircle, XCircle, Calendar, Search, User, BookOpen, X 
} from 'lucide-vue-next'

const statusFilter = ref('')
const subjectFilter = ref('')
const urgencyFilter = ref('')
const searchTerm = ref('')
const showDetailsModal = ref(false)
const showRejectModal = ref(false)
const selectedRequest = ref(null)

const rejectData = ref({
  requestId: null,
  studentName: '',
  assignmentTitle: '',
  reason: '',
  suggestions: ''
})

const stats = ref({
  pending: 5,
  approved: 12,
  rejected: 3,
  thisWeek: 8
})

const extensionRequests = ref([
  {
    id: 1,
    studentName: 'Juan Pérez',
    studentEmail: 'juan.perez@estudiante.com',
    studentSemester: 8,
    studentGPA: 8.5,
    assignmentTitle: 'Caso Clínico: Endodoncia Compleja',
    subject: 'Endodoncia',
    originalDueDate: '25 Ene 2025',
    requestedDueDate: '30 Ene 2025',
    requestDate: '20 Ene 2025',
    reason: 'He tenido complicaciones familiares que han afectado mi capacidad para completar la tarea a tiempo. Mi abuela fue hospitalizada y he tenido que cuidar de ella. Solicito una extensión de 5 días para poder entregar un trabajo de calidad.',
    status: 'pending',
    urgency: 'high',
    assignmentProgress: 45,
    previousExtensions: 1
  },
  {
    id: 2,
    studentName: 'Elena Morales',
    studentEmail: 'elena.morales@estudiante.com',
    studentSemester: 9,
    studentGPA: 9.2,
    assignmentTitle: 'Revisión Bibliográfica: Ortodoncia Interceptiva',
    subject: 'Ortodoncia',
    originalDueDate: '22 Ene 2025',
    requestedDueDate: '27 Ene 2025',
    requestDate: '18 Ene 2025',
    reason: 'Solicito una extensión debido a que he estado trabajando en un proyecto de investigación adicional que complementará significativamente mi revisión bibliográfica. Creo que con unos días adicionales podré entregar un trabajo excepcional.',
    status: 'approved',
    urgency: 'medium',
    assignmentProgress: 70,
    previousExtensions: 0,
    reviewDate: '19 Ene 2025',
    reviewedBy: 'Dr. González',
    response: 'Aprobada la extensión considerando tu excelente historial académico y la justificación válida.'
  },
  {
    id: 3,
    studentName: 'Miguel Sánchez',
    studentEmail: 'miguel.sanchez@estudiante.com',
    studentSemester: 7,
    studentGPA: 7.8,
    assignmentTitle: 'Presentación: Técnicas de Cirugía Oral',
    subject: 'Cirugía Oral',
    originalDueDate: '20 Ene 2025',
    requestedDueDate: '28 Ene 2025',
    requestDate: '19 Ene 2025',
    reason: 'No he podido completar la presentación debido a que he estado enfermo con gripe. Adjunto certificado médico.',
    status: 'rejected',
    urgency: 'low',
    assignmentProgress: 20,
    previousExtensions: 2,
    reviewDate: '20 Ene 2025',
    reviewedBy: 'Dr. González',
    response: 'Solicitud rechazada. Has tenido múltiples extensiones anteriormente. La enfermedad no justifica 8 días de extensión.'
  }
])

const filteredRequests = computed(() => {
  return extensionRequests.value.filter(request => {
    const matchesStatus = !statusFilter.value || request.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || request.subject.toLowerCase().includes(subjectFilter.value.toLowerCase())
    const matchesUrgency = !urgencyFilter.value || request.urgency === urgencyFilter.value
    const matchesSearch = !searchTerm.value || 
      request.studentName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      request.assignmentTitle.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    return matchesStatus && matchesSubject && matchesUrgency && matchesSearch
  })
})

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'pending':
      return 'Pendiente'
    case 'approved':
      return 'Aprobada'
    case 'rejected':
      return 'Rechazada'
    default:
      return 'Desconocido'
  }
}

const getProgressColor = (progress) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 60) return 'bg-blue-500'
  if (progress >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
}

const approveRequest = (request) => {
  request.status = 'approved'
  request.reviewDate = new Date().toLocaleDateString('es-ES')
  request.reviewedBy = 'Dr. González'
  request.response = 'Solicitud aprobada.'
  
  // Update stats
  stats.value.pending--
  stats.value.approved++
  
  alert(`Solicitud de ${request.studentName} aprobada exitosamente`)
}

const openRejectModal = (request) => {
  rejectData.value = {
    requestId: request.id,
    studentName: request.studentName,
    assignmentTitle: request.assignmentTitle,
    reason: '',
    suggestions: ''
  }
  showRejectModal.value = true
}

const rejectRequest = () => {
  const request = extensionRequests.value.find(r => r.id === rejectData.value.requestId)
  if (request) {
    request.status = 'rejected'
    request.reviewDate = new Date().toLocaleDateString('es-ES')
    request.reviewedBy = 'Dr. González'
    request.response = rejectData.value.reason + (rejectData.value.suggestions ? '\n\nSugerencias: ' + rejectData.value.suggestions : '')
    
    // Update stats
    stats.value.pending--
    stats.value.rejected++
    
    alert(`Solicitud de ${request.studentName} rechazada`)
  }
  
  showRejectModal.value = false
  rejectData.value = {
    requestId: null,
    studentName: '',
    assignmentTitle: '',
    reason: '',
    suggestions: ''
  }
}

const viewRequestDetails = (request) => {
  selectedRequest.value = request
  showDetailsModal.value = true
}

const approveRequestFromModal = () => {
  if (selectedRequest.value) {
    approveRequest(selectedRequest.value)
    showDetailsModal.value = false
  }
}

const openRejectModalFromDetails = () => {
  if (selectedRequest.value) {
    openRejectModal(selectedRequest.value)
    showDetailsModal.value = false
  }
}
</script>
