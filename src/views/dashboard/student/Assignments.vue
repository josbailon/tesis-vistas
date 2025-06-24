<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Mis Tareas</h1>
      <p class="text-green-600">Gestiona tus tareas académicas y entregas</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-800">Tareas Pendientes</p>
            <p class="text-2xl font-bold text-green-700">{{ stats.pending }}</p>
          </div>
          <Clock class="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-800">En Progreso</p>
            <p class="text-2xl font-bold text-blue-700">{{ stats.inProgress }}</p>
          </div>
          <BookOpen class="h-8 w-8 text-blue-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-purple-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-800">Completadas</p>
            <p class="text-2xl font-bold text-purple-700">{{ stats.completed }}</p>
          </div>
          <CheckCircle class="h-8 w-8 text-purple-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-orange-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-800">Promedio</p>
            <p class="text-2xl font-bold text-orange-700">{{ stats.average }}</p>
          </div>
          <TrendingUp class="h-8 w-8 text-orange-600" />
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
            <option value="in-progress">En progreso</option>
            <option value="submitted">Entregadas</option>
            <option value="graded">Calificadas</option>
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
          <label class="block text-sm font-medium text-gray-700 mb-2">Profesor</label>
          <select v-model="professorFilter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <option value="">Todos</option>
            <option value="dr-gonzalez">Dr. González</option>
            <option value="dr-martinez">Dr. Martínez</option>
            <option value="dr-lopez">Dr. López</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Título de la tarea..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Assignments List -->
    <div class="space-y-4">
      <div v-for="assignment in filteredAssignments" :key="assignment.id" 
           class="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ assignment.title }}</h3>
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`">
                  {{ getStatusLabel(assignment.status) }}
                </span>
                <span v-if="assignment.priority === 'high'" class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Urgente
                </span>
              </div>
              <p class="text-gray-600 mb-3">{{ assignment.description }}</p>
              <div class="flex items-center gap-6 text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <User class="h-4 w-4" />
                  <span>{{ assignment.professor }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <BookOpen class="h-4 w-4" />
                  <span>{{ assignment.subject }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Calendar class="h-4 w-4" />
                  <span>Asignada: {{ assignment.assignedDate }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Clock class="h-4 w-4" />
                  <span :class="getDueDateColor(assignment.dueDate)">
                    Vence: {{ assignment.dueDate }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button 
                v-if="assignment.status === 'pending' || assignment.status === 'in-progress'"
                @click="startAssignment(assignment)"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                {{ assignment.status === 'pending' ? 'Comenzar' : 'Continuar' }}
              </button>
              <button 
                v-if="assignment.status === 'in-progress'"
                @click="submitAssignment(assignment)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Entregar
              </button>
              <button 
                v-if="assignment.allowExtension && (assignment.status === 'pending' || assignment.status === 'in-progress')"
                @click="requestExtension(assignment)"
                class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Solicitar Extensión
              </button>
              <button 
                @click="viewAssignmentDetails(assignment)"
                class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm transition-colors"
              >
                Ver Detalles
              </button>
            </div>
          </div>

          <!-- Progress Bar -->
          <div v-if="assignment.status === 'in-progress'" class="mb-4">
            <div class="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Progreso</span>
              <span>{{ assignment.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div :class="`h-2 rounded-full ${getProgressColor(assignment.progress)}`" 
                   :style="`width: ${assignment.progress}%`"></div>
            </div>
          </div>

          <!-- Submission Info -->
          <div v-if="assignment.status === 'submitted' || assignment.status === 'graded'" 
               class="bg-gray-50 rounded-lg p-4 mb-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ assignment.status === 'submitted' ? 'Entregado' : 'Calificado' }}
                </p>
                <p class="text-sm text-gray-600">{{ assignment.submissionDate }}</p>
              </div>
              <div v-if="assignment.status === 'graded'" class="text-right">
                <div class="text-lg font-bold text-green-600">{{ assignment.grade }}/{{ assignment.maxGrade }}</div>
                <div class="text-sm text-gray-600">Calificación</div>
              </div>
            </div>
            <div v-if="assignment.feedback" class="mt-3">
              <p class="text-sm font-medium text-gray-900 mb-1">Retroalimentación:</p>
              <p class="text-sm text-gray-700">{{ assignment.feedback }}</p>
            </div>
          </div>

          <!-- Files -->
          <div v-if="assignment.files && assignment.files.length > 0" class="border-t pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Archivos adjuntos:</h4>
            <div class="flex flex-wrap gap-2">
              <div v-for="file in assignment.files" :key="file.id" 
                   class="flex items-center gap-2 bg-gray-100 rounded px-3 py-1 text-sm">
                <FileText class="h-4 w-4 text-gray-600" />
                <span>{{ file.name }}</span>
                <button class="text-blue-600 hover:text-blue-800">
                  <Download class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Assignment Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ selectedAssignment?.title }}
          </h3>
          <button @click="showDetailsModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <div v-if="selectedAssignment" class="space-y-6">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Información General</h4>
              <div class="space-y-2 text-sm">
                <p><strong>Profesor:</strong> {{ selectedAssignment.professor }}</p>
                <p><strong>Materia:</strong> {{ selectedAssignment.subject }}</p>
                <p><strong>Fecha de asignación:</strong> {{ selectedAssignment.assignedDate }}</p>
                <p><strong>Fecha de vencimiento:</strong> {{ selectedAssignment.dueDate }}</p>
                <p><strong>Puntos:</strong> {{ selectedAssignment.maxGrade }}</p>
              </div>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Estado</h4>
              <div class="space-y-2 text-sm">
                <p><strong>Estado actual:</strong> 
                  <span :class="`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAssignment.status)}`">
                    {{ getStatusLabel(selectedAssignment.status) }}
                  </span>
                </p>
                <p v-if="selectedAssignment.progress"><strong>Progreso:</strong> {{ selectedAssignment.progress }}%</p>
                <p v-if="selectedAssignment.grade"><strong>Calificación:</strong> {{ selectedAssignment.grade }}/{{ selectedAssignment.maxGrade }}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-2">Descripción</h4>
            <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded">
              {{ selectedAssignment.description }}
            </p>
          </div>

          <div v-if="selectedAssignment.requirements">
            <h4 class="font-medium text-gray-900 mb-2">Requisitos</h4>
            <ul class="space-y-1 text-sm text-gray-700">
              <li v-for="requirement in selectedAssignment.requirements" :key="requirement" 
                  class="flex items-start gap-2">
                <CheckCircle class="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                {{ requirement }}
              </li>
            </ul>
          </div>

          <div v-if="selectedAssignment.submissionInstructions">
            <h4 class="font-medium text-gray-900 mb-2">Instrucciones de Entrega</h4>
            <p class="text-sm text-gray-700 bg-blue-50 p-3 rounded">
              {{ selectedAssignment.submissionInstructions }}
            </p>
          </div>

          <div v-if="selectedAssignment.feedback">
            <h4 class="font-medium text-gray-900 mb-2">Retroalimentación del Profesor</h4>
            <p class="text-sm text-gray-700 bg-green-50 p-3 rounded">
              {{ selectedAssignment.feedback }}
            </p>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="showDetailsModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Cerrar
          </button>
          <button 
            v-if="selectedAssignment?.status === 'pending' || selectedAssignment?.status === 'in-progress'"
            @click="startAssignmentFromModal"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {{ selectedAssignment?.status === 'pending' ? 'Comenzar Tarea' : 'Continuar Tarea' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Extension Request Modal -->
    <div v-if="showExtensionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Solicitar Extensión</h3>
          <button @click="showExtensionModal = false" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <form @submit.prevent="submitExtensionRequest" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tarea</label>
            <p class="text-sm text-gray-900 bg-gray-50 p-2 rounded">{{ extensionRequest.assignmentTitle }}</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nueva fecha solicitada</label>
            <input
              v-model="extensionRequest.newDueDate"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Justificación</label>
            <textarea
              v-model="extensionRequest.reason"
              rows="4"
              required
              placeholder="Explica las razones por las que necesitas una extensión..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3">
            <button type="button" @click="showExtensionModal = false" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
              Enviar Solicitud
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
  Clock, BookOpen, CheckCircle, TrendingUp, Search, User, Calendar, 
  FileText, Download, X 
} from 'lucide-vue-next'

const statusFilter = ref('')
const subjectFilter = ref('')
const professorFilter = ref('')
const searchTerm = ref('')
const showDetailsModal = ref(false)
const showExtensionModal = ref(false)
const selectedAssignment = ref(null)

const extensionRequest = ref({
  assignmentId: null,
  assignmentTitle: '',
  newDueDate: '',
  reason: ''
})

const stats = ref({
  pending: 3,
  inProgress: 2,
  completed: 8,
  average: 8.5
})

const assignments = ref([
  {
    id: 1,
    title: 'Caso Clínico: Endodoncia Compleja',
    description: 'Análisis completo de caso clínico de endodoncia en molar con múltiples conductos',
    professor: 'Dr. González',
    subject: 'Endodoncia',
    assignedDate: '10 Ene 2025',
    dueDate: '25 Ene 2025',
    status: 'in-progress',
    progress: 65,
    maxGrade: 100,
    priority: 'high',
    allowExtension: true,
    requirements: [
      'Diagnóstico diferencial completo',
      'Plan de tratamiento detallado',
      'Radiografías pre y post operatorias',
      'Documentación fotográfica del procedimiento'
    ],
    submissionInstructions: 'Subir archivo PDF con máximo 10 páginas incluyendo imágenes y referencias bibliográficas.',
    files: [
      { id: 1, name: 'Instrucciones_Caso_Clinico.pdf' },
      { id: 2, name: 'Formato_Presentacion.docx' }
    ]
  },
  {
    id: 2,
    title: 'Revisión Bibliográfica: Ortodoncia Interceptiva',
    description: 'Revisión sistemática de literatura sobre técnicas de ortodoncia interceptiva en pacientes pediátricos',
    professor: 'Dr. Martínez',
    subject: 'Ortodoncia',
    assignedDate: '8 Ene 2025',
    dueDate: '22 Ene 2025',
    status: 'pending',
    progress: 0,
    maxGrade: 80,
    priority: 'medium',
    allowExtension: true,
    requirements: [
      'Mínimo 15 artículos científicos',
      'Artículos de los últimos 5 años',
      'Análisis crítico de metodologías',
      'Conclusiones basadas en evidencia'
    ],
    submissionInstructions: 'Formato APA, máximo 8 páginas, incluir tabla de evidencias.',
    files: [
      { id: 3, name: 'Guia_Revision_Bibliografica.pdf' }
    ]
  },
  {
    id: 3,
    title: 'Presentación: Técnicas de Cirugía Oral',
    description: 'Presentación oral sobre técnicas avanzadas de cirugía oral y maxilofacial',
    professor: 'Dr. López',
    subject: 'Cirugía Oral',
    assignedDate: '5 Ene 2025',
    dueDate: '20 Ene 2025',
    status: 'submitted',
    submissionDate: '18 Ene 2025',
    maxGrade: 90,
    grade: 85,
    feedback: 'Excelente presentación, muy bien estructurada. Mejorar la explicación de contraindicaciones.',
    requirements: [
      'Duración: 15-20 minutos',
      'Incluir casos clínicos',
      'Material audiovisual de apoyo',
      'Sesión de preguntas y respuestas'
    ]
  },
  {
    id: 4,
    title: 'Examen Práctico: Periodoncia',
    description: 'Evaluación práctica de técnicas de raspado y alisado radicular',
    professor: 'Dr. González',
    subject: 'Periodoncia',
    assignedDate: '12 Ene 2025',
    dueDate: '28 Ene 2025',
    status: 'graded',
    submissionDate: '26 Ene 2025',
    maxGrade: 100,
    grade: 92,
    feedback: 'Técnica excelente, muy buena destreza manual. Continuar practicando la angulación de instrumentos.',
    requirements: [
      'Demostración en paciente real',
      'Uso correcto de instrumentos',
      'Medidas de bioseguridad',
      'Documentación del procedimiento'
    ]
  }
])

const filteredAssignments = computed(() => {
  return assignments.value.filter(assignment => {
    const matchesStatus = !statusFilter.value || assignment.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || assignment.subject.toLowerCase().includes(subjectFilter.value.toLowerCase())
    const matchesProfessor = !professorFilter.value || assignment.professor.toLowerCase().includes(professorFilter.value.toLowerCase())
    const matchesSearch = !searchTerm.value || assignment.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    return matchesStatus && matchesSubject && matchesProfessor && matchesSearch
  })
})

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'in-progress':
      return 'bg-blue-100 text-blue-800'
    case 'submitted':
      return 'bg-purple-100 text-purple-800'
    case 'graded':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'pending':
      return 'Pendiente'
    case 'in-progress':
      return 'En progreso'
    case 'submitted':
      return 'Entregada'
    case 'graded':
      return 'Calificada'
    default:
      return 'Desconocido'
  }
}

const getDueDateColor = (dueDate) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'text-red-600 font-medium'
  if (diffDays <= 3) return 'text-orange-600 font-medium'
  if (diffDays <= 7) return 'text-yellow-600'
  return 'text-gray-600'
}

const getProgressColor = (progress) => {
  if (progress >= 80) return 'bg-green-500'
  if (progress >= 60) return 'bg-blue-500'
  if (progress >= 40) return 'bg-yellow-500'
  return 'bg-red-500'
}

const startAssignment = (assignment) => {
  assignment.status = 'in-progress'
  if (assignment.progress === 0) {
    assignment.progress = 10
  }
  alert(`Comenzando trabajo en: ${assignment.title}`)
}

const submitAssignment = (assignment) => {
  assignment.status = 'submitted'
  assignment.submissionDate = new Date().toLocaleDateString('es-ES')
  assignment.progress = 100
  alert(`Tarea entregada: ${assignment.title}`)
}

const requestExtension = (assignment) => {
  extensionRequest.value = {
    assignmentId: assignment.id,
    assignmentTitle: assignment.title,
    newDueDate: '',
    reason: ''
  }
  showExtensionModal.value = true
}

const viewAssignmentDetails = (assignment) => {
  selectedAssignment.value = assignment
  showDetailsModal.value = true
}

const startAssignmentFromModal = () => {
  if (selectedAssignment.value) {
    startAssignment(selectedAssignment.value)
    showDetailsModal.value = false
  }
}

const submitExtensionRequest = () => {
  // Here you would typically send the request to the server
  alert(`Solicitud de extensión enviada para: ${extensionRequest.value.assignmentTitle}`)
  showExtensionModal.value = false
  
  // Reset form
  extensionRequest.value = {
    assignmentId: null,
    assignmentTitle: '',
    newDueDate: '',
    reason: ''
  }
}
</script>
