<!--
  PÁGINA DEL ODONTOGRAMA PARA ESTUDIANTES
  
  Esta página permite a los estudiantes crear y editar odontogramas
  para sus pacientes asignados. Incluye el componente profesional
  de odontograma con todas sus funcionalidades.
-->
<template>
  <!-- Contenedor principal de la página -->
  <div class="space-y-6">
    
    <!-- HEADER DE LA PÁGINA -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Activity class="h-8 w-8 text-blue-600" />
          Odontograma Digital
        </h1>
        <p class="text-gray-600 mt-2">
          Herramienta profesional para el registro y seguimiento del estado dental de tus pacientes
        </p>
      </div>
      
      <!-- SELECTOR DE PACIENTE -->
      <div class="flex items-center gap-4">
        <div class="min-w-0 flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Paciente
          </label>
          <select
            v-model="selectedPatientId"
            @change="loadPatientOdontogram"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecciona un paciente</option>
            <option
              v-for="patient in assignedPatients"
              :key="patient.id"
              :value="patient.id"
            >
              {{ patient.name }} - {{ patient.id }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- INFORMACIÓN DEL ESTUDIANTE -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-center gap-3">
        <GraduationCap class="h-6 w-6 text-blue-600" />
        <div>
          <h3 class="font-semibold text-blue-900">{{ studentInfo.name }}</h3>
          <p class="text-sm text-blue-700">
            Estudiante de {{ studentInfo.semester }}° Semestre - {{ studentInfo.specialty }}
          </p>
          <p class="text-sm text-blue-700">
            Supervisor: {{ studentInfo.supervisor }}
          </p>
        </div>
      </div>
    </div>

    <!-- MENSAJE SI NO HAY PACIENTE SELECCIONADO -->
    <div v-if="!selectedPatientId" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <Users class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">Selecciona un Paciente</h3>
      <p class="text-gray-600">
        Para comenzar a trabajar con el odontograma, selecciona uno de tus pacientes asignados.
      </p>
    </div>

    <!-- COMPONENTE ODONTOGRAMA PROFESIONAL -->
    <div v-if="selectedPatientId">
      <ProfessionalOdontogram
        :patient-id="selectedPatientId"
        :initial-data="currentOdontogramData"
        @save="handleSaveOdontogram"
        @export="handleExportOdontogram"
      />
    </div>

    <!-- PANEL DE AYUDA -->
    <div v-if="selectedPatientId" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <div class="flex items-start gap-3">
        <HelpCircle class="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 class="font-semibold text-yellow-900 mb-2">Instrucciones de Uso</h3>
          <ul class="text-sm text-yellow-800 space-y-1">
            <li>• Haz clic en un diente para seleccionarlo y registrar su condición</li>
            <li>• Usa la leyenda de colores para aplicar diferentes condiciones dentales</li>
            <li>• Marca las superficies afectadas en cada diente</li>
            <li>• Agrega notas detalladas sobre tratamientos o observaciones</li>
            <li>• Revisa las estadísticas para obtener un resumen del estado dental</li>
            <li>• Consulta el historial para ver tratamientos previos</li>
            <li>• Recuerda guardar tus cambios regularmente</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- PANEL DE SOLICITUD DE APROBACIÓN -->
    <div v-if="selectedPatientId && needsApproval" class="bg-orange-50 border border-orange-200 rounded-lg p-6">
      <div class="flex items-start justify-between">
        <div class="flex items-start gap-3">
          <AlertTriangle class="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-orange-900 mb-2">Solicitar Aprobación</h3>
            <p class="text-sm text-orange-800 mb-4">
              Algunos tratamientos requieren aprobación del supervisor antes de proceder.
            </p>
            <div class="space-y-2">
              <div v-for="treatment in pendingTreatments" :key="treatment.id" 
                   class="bg-white border border-orange-200 rounded p-3">
                <p class="font-medium text-orange-900">{{ treatment.procedure }}</p>
                <p class="text-sm text-orange-700">Diente: {{ treatment.tooth }}</p>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="requestApproval"
          class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Solicitar Aprobación
        </button>
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
 * - Carga y guardado de datos del odontograma
 * - Solicitudes de aprobación para tratamientos
 * - Integración con el componente profesional de odontograma
 */

// Importar hooks de Vue
import { ref, computed, onMounted } from 'vue'
// Importar store de autenticación
import { useAuthStore } from '../../../stores/auth'
// Importar componente de odontograma
import ProfessionalOdontogram from '../../../components/ProfessionalOdontogram.vue'
// Importar iconos
import { Activity, GraduationCap, Users, HelpCircle, AlertTriangle } from 'lucide-vue-next'

// Obtener store de autenticación
const authStore = useAuthStore()

/**
 * ESTADO REACTIVO DEL COMPONENTE
 * 
 * Variables que controlan el estado de la página
 */

// ID del paciente actualmente seleccionado
const selectedPatientId = ref('')

// Datos del odontograma actual
const currentOdontogramData = ref({})

// Estado de carga
const loading = ref(false)

/**
 * INFORMACIÓN DEL ESTUDIANTE
 * 
 * Datos del estudiante logueado obtenidos del store de autenticación
 */
const studentInfo = ref({
  name: authStore.user?.name || 'Estudiante',
  semester: '8',
  specialty: 'Odontología General',
  supervisor: 'Dr. María González'
})

/**
 * PACIENTES ASIGNADOS AL ESTUDIANTE
 * 
 * Lista de pacientes que el estudiante puede atender
 * En una aplicación real, estos datos vendrían de una API
 */
const assignedPatients = ref([
  {
    id: 'PAT001',
    name: 'María González',
    age: 28,
    phone: '0987654321',
    lastVisit: '2024-01-15'
  },
  {
    id: 'PAT002',
    name: 'Carlos Rodríguez',
    age: 35,
    phone: '0987654322',
    lastVisit: '2024-01-10'
  },
  {
    id: 'PAT003',
    name: 'Ana López',
    age: 42,
    phone: '0987654323',
    lastVisit: '2024-01-08'
  },
  {
    id: 'PAT004',
    name: 'Luis Martínez',
    age: 25,
    phone: '0987654324',
    lastVisit: '2024-01-05'
  }
])

/**
 * TRATAMIENTOS PENDIENTES DE APROBACIÓN
 * 
 * Lista de tratamientos que requieren aprobación del supervisor
 */
const pendingTreatments = ref([
  {
    id: 1,
    tooth: 16,
    procedure: 'Endodoncia',
    complexity: 'Alta',
    estimatedTime: '2 horas'
  },
  {
    id: 2,
    tooth: 26,
    procedure: 'Corona dental',
    complexity: 'Media',
    estimatedTime: '1.5 horas'
  }
])

/**
 * COMPUTED PROPERTIES
 * 
 * Propiedades calculadas que se actualizan automáticamente
 */

// Verificar si hay tratamientos que necesitan aprobación
const needsApproval = computed(() => {
  return pendingTreatments.value.length > 0
})

// Obtener información del paciente seleccionado
const selectedPatient = computed(() => {
  return assignedPatients.value.find(p => p.id === selectedPatientId.value)
})

/**
 * MÉTODOS DEL COMPONENTE
 * 
 * Funciones que manejan la lógica de la página
 */

/**
 * CARGAR ODONTOGRAMA DEL PACIENTE
 * 
 * Función que se ejecuta cuando se selecciona un paciente
 * Carga los datos existentes del odontograma si los hay
 */
const loadPatientOdontogram = async () => {
  if (!selectedPatientId.value) {
    currentOdontogramData.value = {}
    return
  }
  
  loading.value = true
  
  try {
    // Simular llamada a API para cargar datos del odontograma
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Datos de ejemplo para demostración
    // En una aplicación real, estos datos vendrían del backend
    const mockOdontogramData = {
      16: { condition: 'caries', surfaces: ['oclusal'], notes: 'Caries profunda en superficie oclusal' },
      26: { condition: 'restoration', surfaces: ['mesial', 'oclusal'], notes: 'Restauración con resina compuesta' },
      36: { condition: 'healthy', surfaces: [], notes: '' },
      46: { condition: 'crown', surfaces: ['todas'], notes: 'Corona de porcelana' }
    }
    
    currentOdontogramData.value = mockOdontogramData
    
    console.log(`Odontograma cargado para paciente ${selectedPatientId.value}`)
  } catch (error) {
    console.error('Error al cargar odontograma:', error)
    alert('Error al cargar los datos del odontograma')
  } finally {
    loading.value = false
  }
}

/**
 * MANEJAR GUARDADO DEL ODONTOGRAMA
 * 
 * Función que se ejecuta cuando se guarda el odontograma
 * desde el componente ProfessionalOdontogram
 */
const handleSaveOdontogram = async (odontogramData) => {
  try {
    // Simular llamada a API para guardar datos
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Actualizar datos locales
    currentOdontogramData.value = odontogramData.teeth
    
    console.log('Odontograma guardado:', odontogramData)
    
    // Mostrar mensaje de éxito
    alert('Odontograma guardado exitosamente')
  } catch (error) {
    console.error('Error al guardar odontograma:', error)
    alert('Error al guardar el odontograma')
  }
}

/**
 * MANEJAR EXPORTACIÓN DEL ODONTOGRAMA
 * 
 * Función que se ejecuta cuando se exporta el odontograma a PDF
 */
const handleExportOdontogram = (exportData) => {
  try {
    // Preparar datos para exportación
    const reportData = {
      ...exportData,
      student: studentInfo.value,
      date: new Date().toLocaleDateString(),
      supervisor: studentInfo.value.supervisor
    }
    
    console.log('Exportando odontograma:', reportData)
    
    // En una aplicación real, aquí se generaría el PDF
    // Por ahora, solo mostramos un mensaje
    alert('Generando reporte PDF del odontograma...')
  } catch (error) {
    console.error('Error al exportar odontograma:', error)
    alert('Error al exportar el odontograma')
  }
}

/**
 * SOLICITAR APROBACIÓN DE TRATAMIENTOS
 * 
 * Función para enviar solicitud de aprobación al supervisor
 */
const requestApproval = async () => {
  try {
    // Simular llamada a API para solicitar aprobación
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Preparar datos de la solicitud
    const approvalRequest = {
      studentId: authStore.user?.id,
      patientId: selectedPatientId.value,
      treatments: pendingTreatments.value,
      requestDate: new Date().toISOString(),
      notes: 'Solicitud de aprobación para tratamientos complejos'
    }
    
    console.log('Solicitud de aprobación enviada:', approvalRequest)
    
    // Limpiar tratamientos pendientes
    pendingTreatments.value = []
    
    alert('Solicitud de aprobación enviada al supervisor')
  } catch (error) {
    console.error('Error al solicitar aprobación:', error)
    alert('Error al enviar la solicitud de aprobación')
  }
}

/**
 * INICIALIZACIÓN DEL COMPONENTE
 * 
 * Se ejecuta cuando el componente se monta en el DOM
 */
onMounted(() => {
  console.log('Página de odontograma para estudiantes inicializada')
  
  // Si hay pacientes asignados, seleccionar el primero por defecto
  if (assignedPatients.value.length > 0) {
    // No seleccionar automáticamente, dejar que el usuario elija
    console.log(`${assignedPatients.value.length} pacientes asignados disponibles`)
  }
})
</script>
