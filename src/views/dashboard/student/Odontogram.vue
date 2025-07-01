<!--
  PÁGINA DEL ODONTOGRAMA PARA ESTUDIANTES
  
  Esta página permite a los estudiantes usar la herramienta profesional de odontograma
  para registrar y gestionar el estado dental de sus pacientes asignados.
-->
<template>
  <div class="space-y-6">
    
    <!-- HEADER DE LA PÁGINA -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Odontograma Digital</h1>
        <p class="text-gray-600 mt-2">
          Herramienta profesional para el registro del estado dental de pacientes
        </p>
      </div>
      
      <!-- SELECTOR DE PACIENTE -->
      <div class="flex items-center gap-4">
        <div class="min-w-0 flex-1">
          <label for="patient-select" class="block text-sm font-medium text-gray-700 mb-1">
            Seleccionar Paciente
          </label>
          <select
            id="patient-select"
            v-model="selectedPatientId"
            @change="handlePatientChange"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Seleccionar paciente...</option>
            <option
              v-for="patient in availablePatients"
              :key="patient.id"
              :value="patient.id"
            >
              {{ patient.name }} - {{ patient.id }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- MENSAJE SI NO HAY PACIENTE SELECCIONADO -->
    <div v-if="!selectedPatientId" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <Users class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Selecciona un Paciente</h3>
      <p class="text-gray-600">
        Elige un paciente de la lista para comenzar a trabajar con su odontograma
      </p>
    </div>

    <!-- COMPONENTE ODONTOGRAMA PROFESIONAL -->
    <div v-else>
      <ProfessionalOdontogram
        :patient-id="selectedPatientId"
        :initial-data="currentOdontogramData"
        @save="handleSaveOdontogram"
        @export="handleExportOdontogram"
      />
    </div>

    <!-- HISTORIAL DE ODONTOGRAMAS -->
    <div v-if="selectedPatientId && odontogramHistory.length > 0" class="bg-white border border-gray-200 rounded-lg">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Clock class="h-5 w-5 text-blue-600" />
          Historial de Odontogramas
        </h3>
      </div>
      
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="entry in odontogramHistory"
            :key="entry.id"
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow-sm transition-shadow"
          >
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-medium text-gray-900">{{ entry.date }}</span>
                <span class="text-sm text-gray-500">•</span>
                <span class="text-sm text-gray-600">{{ entry.time }}</span>
              </div>
              <p class="text-sm text-gray-600">{{ entry.description }}</p>
              <p class="text-xs text-gray-500 mt-1">
                Modificado por: {{ entry.modifiedBy }}
              </p>
            </div>
            
            <div class="flex items-center gap-2">
              <button
                @click="loadOdontogramVersion(entry)"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Cargar
              </button>
              <button
                @click="compareOdontogramVersion(entry)"
                class="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Comparar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTAS Y OBSERVACIONES -->
    <div v-if="selectedPatientId" class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FileText class="h-5 w-5 text-green-600" />
        Notas y Observaciones
      </h3>
      
      <div class="space-y-4">
        <div>
          <label for="session-notes" class="block text-sm font-medium text-gray-700 mb-2">
            Notas de la Sesión Actual
          </label>
          <textarea
            id="session-notes"
            v-model="sessionNotes"
            rows="4"
            placeholder="Registra observaciones importantes sobre el estado dental del paciente, tratamientos realizados, recomendaciones, etc."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>
        
        <div class="flex justify-end gap-3">
          <button
            @click="saveSessionNotes"
            :disabled="!sessionNotes.trim()"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar Notas
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
import { ref, computed, onMounted } from 'vue'
// Importar store de autenticación
import { useAuthStore } from '../../../stores/auth'
// Importar componentes
import ProfessionalOdontogram from '../../../components/ProfessionalOdontogram.vue'
// Importar iconos
import { Users, Clock, FileText } from 'lucide-vue-next'

// Obtener store de autenticación
const authStore = useAuthStore()

/**
 * ESTADO REACTIVO DEL COMPONENTE
 * 
 * Variables que controlan el estado de la página
 */

// ID del paciente actualmente seleccionado
const selectedPatientId = ref('')

// Datos actuales del odontograma
const currentOdontogramData = ref({})

// Notas de la sesión actual
const sessionNotes = ref('')

/**
 * DATOS DE PACIENTES DISPONIBLES
 * 
 * Lista de pacientes asignados al estudiante actual
 * En una aplicación real, estos datos vendrían de una API
 */
const availablePatients = ref([
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
])

/**
 * HISTORIAL DE ODONTOGRAMAS
 * 
 * Historial de versiones anteriores del odontograma del paciente seleccionado
 */
const odontogramHistory = ref([])

/**
 * COMPUTED PROPERTIES
 * 
 * Propiedades calculadas que se actualizan automáticamente
 */

// Obtener información del paciente seleccionado
const selectedPatient = computed(() => {
  return availablePatients.value.find(p => p.id === selectedPatientId.value)
})

/**
 * MÉTODOS DEL COMPONENTE
 * 
 * Funciones que manejan la lógica de la página
 */

/**
 * MANEJAR CAMBIO DE PACIENTE
 * 
 * Se ejecuta cuando el usuario selecciona un paciente diferente
 */
const handlePatientChange = async () => {
  if (selectedPatientId.value) {
    // Cargar datos del odontograma para el paciente seleccionado
    await loadPatientOdontogram(selectedPatientId.value)
    
    // Cargar historial de odontogramas
    await loadOdontogramHistory(selectedPatientId.value)
    
    // Limpiar notas de sesión
    sessionNotes.value = ''
  } else {
    // Limpiar datos si no hay paciente seleccionado
    currentOdontogramData.value = {}
    odontogramHistory.value = []
    sessionNotes.value = ''
  }
}

/**
 * CARGAR ODONTOGRAMA DEL PACIENTE
 * 
 * Carga los datos existentes del odontograma para el paciente especificado
 */
const loadPatientOdontogram = async (patientId) => {
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Datos de ejemplo para demostración
    const mockOdontogramData = {
      16: { condition: 'caries', surfaces: ['oclusal'], notes: 'Caries profunda' },
      21: { condition: 'restoration', surfaces: ['mesial', 'oclusal'], notes: 'Restauración con resina' },
      36: { condition: 'crown', surfaces: [], notes: 'Corona de porcelana' }
    }
    
    currentOdontogramData.value = mockOdontogramData
    
    console.log('Odontograma cargado para paciente:', patientId)
  } catch (error) {
    console.error('Error al cargar odontograma:', error)
    currentOdontogramData.value = {}
  }
}

/**
 * CARGAR HISTORIAL DE ODONTOGRAMAS
 * 
 * Carga el historial de versiones anteriores del odontograma
 */
const loadOdontogramHistory = async (patientId) => {
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Datos de ejemplo para demostración
    const mockHistory = [
      {
        id: 1,
        date: '2024-02-15',
        time: '10:30 AM',
        description: 'Diagnóstico inicial - Detección de caries en diente 16',
        modifiedBy: authStore.user?.name || 'Estudiante',
        data: { 16: { condition: 'caries', surfaces: ['oclusal'], notes: 'Caries inicial' } }
      },
      {
        id: 2,
        date: '2024-02-10',
        time: '2:15 PM',
        description: 'Restauración completada en diente 21',
        modifiedBy: authStore.user?.name || 'Estudiante',
        data: { 21: { condition: 'restoration', surfaces: ['mesial'], notes: 'Restauración temporal' } }
      },
      {
        id: 3,
        date: '2024-02-05',
        time: '9:00 AM',
        description: 'Primera consulta - Evaluación general',
        modifiedBy: authStore.user?.name || 'Estudiante',
        data: {}
      }
    ]
    
    odontogramHistory.value = mockHistory
    
    console.log('Historial cargado para paciente:', patientId)
  } catch (error) {
    console.error('Error al cargar historial:', error)
    odontogramHistory.value = []
  }
}

/**
 * MANEJAR GUARDADO DE ODONTOGRAMA
 * 
 * Se ejecuta cuando el componente ProfessionalOdontogram emite el evento 'save'
 */
const handleSaveOdontogram = async (odontogramData) => {
  try {
    console.log('Guardando odontograma:', odontogramData)
    
    // Simular llamada a API para guardar
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Actualizar datos actuales
    currentOdontogramData.value = odontogramData.teeth
    
    // Agregar entrada al historial
    const newHistoryEntry = {
      id: odontogramHistory.value.length + 1,
      date: new Date().toLocaleDateString('es-ES'),
      time: new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      description: 'Odontograma actualizado',
      modifiedBy: authStore.user?.name || 'Estudiante',
      data: odontogramData.teeth
    }
    
    odontogramHistory.value.unshift(newHistoryEntry)
    
    // Mostrar mensaje de éxito
    alert('Odontograma guardado exitosamente')
    
  } catch (error) {
    console.error('Error al guardar odontograma:', error)
    alert('Error al guardar el odontograma')
  }
}

/**
 * MANEJAR EXPORTACIÓN DE ODONTOGRAMA
 * 
 * Se ejecuta cuando el componente ProfessionalOdontogram emite el evento 'export'
 */
const handleExportOdontogram = async (exportData) => {
  try {
    console.log('Exportando odontograma:', exportData)
    
    // Simular generación de PDF
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // En una aplicación real, aquí se generaría y descargaría el PDF
    alert('Odontograma exportado exitosamente')
    
  } catch (error) {
    console.error('Error al exportar odontograma:', error)
    alert('Error al exportar el odontograma')
  }
}

/**
 * CARGAR VERSIÓN ESPECÍFICA DEL ODONTOGRAMA
 * 
 * Carga una versión anterior del odontograma desde el historial
 */
const loadOdontogramVersion = (historyEntry) => {
  if (confirm('¿Deseas cargar esta versión del odontograma? Los cambios no guardados se perderán.')) {
    currentOdontogramData.value = historyEntry.data || {}
    
    // Agregar nota sobre la versión cargada
    sessionNotes.value = `Versión cargada del ${historyEntry.date} - ${historyEntry.description}`
    
    console.log('Versión cargada:', historyEntry)
  }
}

/**
 * COMPARAR VERSIÓN DEL ODONTOGRAMA
 * 
 * Muestra una comparación entre la versión actual y una versión anterior
 */
const compareOdontogramVersion = (historyEntry) => {
  // En una implementación completa, esto abriría un modal de comparación
  alert(`Comparando con versión del ${historyEntry.date}\n\nEsta funcionalidad mostraría las diferencias entre versiones.`)
  
  console.log('Comparando versiones:', {
    current: currentOdontogramData.value,
    previous: historyEntry.data
  })
}

/**
 * GUARDAR NOTAS DE SESIÓN
 * 
 * Guarda las notas de la sesión actual
 */
const saveSessionNotes = async () => {
  try {
    if (!sessionNotes.value.trim()) {
      alert('Por favor, ingresa algunas notas antes de guardar.')
      return
    }
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Agregar entrada al historial con las notas
    const notesEntry = {
      id: odontogramHistory.value.length + 1,
      date: new Date().toLocaleDateString('es-ES'),
      time: new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      description: `Notas de sesión: ${sessionNotes.value.substring(0, 50)}${sessionNotes.value.length > 50 ? '...' : ''}`,
      modifiedBy: authStore.user?.name || 'Estudiante',
      data: currentOdontogramData.value,
      notes: sessionNotes.value
    }
    
    odontogramHistory.value.unshift(notesEntry)
    
    // Limpiar notas después de guardar
    sessionNotes.value = ''
    
    alert('Notas guardadas exitosamente')
    
  } catch (error) {
    console.error('Error al guardar notas:', error)
    alert('Error al guardar las notas')
  }
}

/**
 * INICIALIZACIÓN DEL COMPONENTE
 * 
 * Se ejecuta cuando el componente se monta en el DOM
 */
onMounted(() => {
  console.log('Página de Odontograma inicializada para estudiante:', authStore.user?.name)
})
</script>
