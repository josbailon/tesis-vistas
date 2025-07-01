<!--
  COMPONENTE PROFESIONAL DE ODONTOGRAMA
  
  Este es un componente avanzado para el manejo de odontogramas dentales.
  Permite a estudiantes y profesores registrar y visualizar el estado dental de pacientes.
  
  Características principales:
  - Representación visual de 32 dientes permanentes
  - 9 tipos diferentes de condiciones dentales
  - Selección de superficies dentales específicas
  - Historial de tratamientos
  - Estadísticas en tiempo real
-->
<template>
  <!-- Contenedor principal del odontograma -->
  <div class="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    
    <!-- HEADER DEL ODONTOGRAMA -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Activity class="h-8 w-8 text-blue-600" />
            Odontograma Profesional
          </h2>
          <p class="text-gray-600 mt-2">
            Herramienta digital para el registro y seguimiento del estado dental del paciente
          </p>
        </div>
        
        <!-- INFORMACIÓN DEL PACIENTE -->
        <div class="text-right">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 class="font-semibold text-blue-900">{{ patientInfo.name }}</h3>
            <p class="text-sm text-blue-700">ID: {{ patientInfo.id }}</p>
            <p class="text-sm text-blue-700">Edad: {{ patientInfo.age }} años</p>
          </div>
        </div>
      </div>
    </div>

    <!-- SISTEMA DE TABS -->
    <div class="mb-6">
      <!-- Navegación de tabs -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`"
          >
            <component :is="tab.icon" class="h-5 w-5 inline mr-2" />
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- CONTENIDO DE LOS TABS -->
    
    <!-- TAB: ODONTOGRAMA VISUAL -->
    <div v-if="activeTab === 'odontogram'" class="space-y-8">
      
      <!-- LEYENDA DE CONDICIONES DENTALES -->
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Info class="h-5 w-5 text-blue-600" />
          Leyenda de Condiciones Dentales
        </h3>
        
        <!-- Grid de condiciones -->
        <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
          <div
            v-for="condition in dentalConditions"
            :key="condition.id"
            @click="selectedCondition = condition.id"
            :class="`cursor-pointer p-3 rounded-lg border-2 transition-all hover:shadow-md ${
              selectedCondition === condition.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`"
          >
            <!-- Símbolo visual de la condición -->
            <div :class="`w-8 h-8 mx-auto mb-2 rounded flex items-center justify-center text-white font-bold ${condition.color}`">
              {{ condition.symbol }}
            </div>
            <!-- Nombre de la condición -->
            <p class="text-xs text-center font-medium text-gray-700">{{ condition.name }}</p>
          </div>
        </div>
        
        <!-- Condición seleccionada -->
        <div v-if="selectedCondition" class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>Condición seleccionada:</strong> 
            {{ dentalConditions.find(c => c.id === selectedCondition)?.name }}
          </p>
        </div>
      </div>

      <!-- REPRESENTACIÓN VISUAL DEL ODONTOGRAMA -->
      <div class="bg-gradient-to-b from-blue-50 to-white border border-blue-200 rounded-xl p-8">
        
        <!-- ARCADA SUPERIOR -->
        <div class="mb-12">
          <h4 class="text-center text-lg font-semibold text-gray-800 mb-6">Arcada Superior</h4>
          
          <!-- Cuadrante Superior Derecho y Superior Izquierdo -->
          <div class="flex justify-center">
            <div class="grid grid-cols-8 gap-3">
              <!-- Dientes 18-11 (Superior Derecho) -->
              <div
                v-for="toothNumber in [18, 17, 16, 15, 14, 13, 12, 11]"
                :key="toothNumber"
                @click="selectTooth(toothNumber)"
                :class="`relative cursor-pointer transition-all hover:scale-110 ${
                  selectedTooth === toothNumber ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`"
              >
                <!-- Representación visual del diente -->
                <div :class="`w-12 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${getToothColor(toothNumber)}`">
                  <!-- Número del diente -->
                  <span class="text-gray-700">{{ toothNumber }}</span>
                  
                  <!-- Símbolo de condición si existe -->
                  <div v-if="teethData.get(toothNumber)?.condition" 
                       class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white"
                       :class="getDentalCondition(teethData.get(toothNumber)?.condition)?.color">
                    {{ getDentalCondition(teethData.get(toothNumber)?.condition)?.symbol }}
                  </div>
                </div>
                
                <!-- Etiqueta del diente -->
                <p class="text-xs text-center mt-1 text-gray-600">{{ getToothName(toothNumber) }}</p>
              </div>
              
              <!-- Dientes 21-28 (Superior Izquierdo) -->
              <div
                v-for="toothNumber in [21, 22, 23, 24, 25, 26, 27, 28]"
                :key="toothNumber"
                @click="selectTooth(toothNumber)"
                :class="`relative cursor-pointer transition-all hover:scale-110 ${
                  selectedTooth === toothNumber ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`"
              >
                <!-- Representación visual del diente -->
                <div :class="`w-12 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${getToothColor(toothNumber)}`">
                  <!-- Número del diente -->
                  <span class="text-gray-700">{{ toothNumber }}</span>
                  
                  <!-- Símbolo de condición si existe -->
                  <div v-if="teethData.get(toothNumber)?.condition" 
                       class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white"
                       :class="getDentalCondition(teethData.get(toothNumber)?.condition)?.color">
                    {{ getDentalCondition(teethData.get(toothNumber)?.condition)?.symbol }}
                  </div>
                </div>
                
                <!-- Etiqueta del diente -->
                <p class="text-xs text-center mt-1 text-gray-600">{{ getToothName(toothNumber) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- LÍNEA DIVISORIA -->
        <div class="border-t-2 border-dashed border-gray-300 my-8"></div>

        <!-- ARCADA INFERIOR -->
        <div>
          <h4 class="text-center text-lg font-semibold text-gray-800 mb-6">Arcada Inferior</h4>
          
          <!-- Cuadrante Inferior Derecho y Inferior Izquierdo -->
          <div class="flex justify-center">
            <div class="grid grid-cols-8 gap-3">
              <!-- Dientes 48-41 (Inferior Derecho) -->
              <div
                v-for="toothNumber in [48, 47, 46, 45, 44, 43, 42, 41]"
                :key="toothNumber"
                @click="selectTooth(toothNumber)"
                :class="`relative cursor-pointer transition-all hover:scale-110 ${
                  selectedTooth === toothNumber ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`"
              >
                <!-- Representación visual del diente -->
                <div :class="`w-12 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${getToothColor(toothNumber)}`">
                  <!-- Número del diente -->
                  <span class="text-gray-700">{{ toothNumber }}</span>
                  
                  <!-- Símbolo de condición si existe -->
                  <div v-if="teethData.get(toothNumber)?.condition" 
                       class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white"
                       :class="getDentalCondition(teethData.get(toothNumber)?.condition)?.color">
                    {{ getDentalCondition(teethData.get(toothNumber)?.condition)?.symbol }}
                  </div>
                </div>
                
                <!-- Etiqueta del diente -->
                <p class="text-xs text-center mt-1 text-gray-600">{{ getToothName(toothNumber) }}</p>
              </div>
              
              <!-- Dientes 31-38 (Inferior Izquierdo) -->
              <div
                v-for="toothNumber in [31, 32, 33, 34, 35, 36, 37, 38]"
                :key="toothNumber"
                @click="selectTooth(toothNumber)"
                :class="`relative cursor-pointer transition-all hover:scale-110 ${
                  selectedTooth === toothNumber ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                }`"
              >
                <!-- Representación visual del diente -->
                <div :class="`w-12 h-16 border-2 border-gray-400 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${getToothColor(toothNumber)}`">
                  <!-- Número del diente -->
                  <span class="text-gray-700">{{ toothNumber }}</span>
                  
                  <!-- Símbolo de condición si existe -->
                  <div v-if="teethData.get(toothNumber)?.condition" 
                       class="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white"
                       :class="getDentalCondition(teethData.get(toothNumber)?.condition)?.color">
                    {{ getDentalCondition(teethData.get(toothNumber)?.condition)?.symbol }}
                  </div>
                </div>
                
                <!-- Etiqueta del diente -->
                <p class="text-xs text-center mt-1 text-gray-600">{{ getToothName(toothNumber) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PANEL DE DETALLES DEL DIENTE SELECCIONADO -->
      <div v-if="selectedTooth" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Tooth class="h-6 w-6 text-blue-600" />
          Diente {{ selectedTooth }} - {{ getToothName(selectedTooth) }}
        </h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- SELECCIÓN DE CONDICIÓN -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Condición Dental</h4>
            <select
              v-model="currentToothData.condition"
              @change="updateToothCondition"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar condición</option>
              <option
                v-for="condition in dentalConditions"
                :key="condition.id"
                :value="condition.id"
              >
                {{ condition.symbol }} {{ condition.name }}
              </option>
            </select>
          </div>
          
          <!-- SELECCIÓN DE SUPERFICIES -->
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Superficies Afectadas</h4>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="surface in dentalSurfaces"
                :key="surface.id"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :value="surface.id"
                  v-model="currentToothData.surfaces"
                  @change="updateToothSurfaces"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span class="text-sm text-gray-700">{{ surface.name }}</span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- NOTAS ADICIONALES -->
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Notas Adicionales
          </label>
          <textarea
            v-model="currentToothData.notes"
            @input="updateToothNotes"
            rows="3"
            placeholder="Observaciones, tratamientos realizados, etc."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- TAB: ESTADÍSTICAS -->
    <div v-if="activeTab === 'statistics'" class="space-y-6">
      
      <!-- RESUMEN ESTADÍSTICO -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- TOTAL DE DIENTES -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-blue-800">Total Dientes</p>
              <p class="text-3xl font-bold text-blue-900">32</p>
            </div>
            <Tooth class="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <!-- DIENTES SANOS -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-green-800">Dientes Sanos</p>
              <p class="text-3xl font-bold text-green-900">{{ healthyTeethCount }}</p>
            </div>
            <CheckCircle class="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <!-- DIENTES CON CARIES -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-red-800">Con Caries</p>
              <p class="text-3xl font-bold text-red-900">{{ cariesCount }}</p>
            </div>
            <AlertTriangle class="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <!-- DIENTES RESTAURADOS -->
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-yellow-800">Restaurados</p>
              <p class="text-3xl font-bold text-yellow-900">{{ restoredTeethCount }}</p>
            </div>
            <Wrench class="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>
      
      <!-- DISTRIBUCIÓN POR CONDICIONES -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Distribución por Condiciones</h3>
        <div class="space-y-3">
          <div
            v-for="condition in dentalConditions"
            :key="condition.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div :class="`w-6 h-6 rounded flex items-center justify-center text-white text-sm font-bold ${condition.color}`">
                {{ condition.symbol }}
              </div>
              <span class="font-medium text-gray-900">{{ condition.name }}</span>
            </div>
            <span class="text-lg font-bold text-gray-700">
              {{ getConditionCount(condition.id) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB: HISTORIAL -->
    <div v-if="activeTab === 'history'" class="space-y-6">
      
      <!-- HISTORIAL DE TRATAMIENTOS -->
      <div class="bg-white border border-gray-200 rounded-lg">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Clock class="h-5 w-5 text-blue-600" />
            Historial de Tratamientos
          </h3>
        </div>
        
        <div class="p-6">
          <div v-if="treatmentHistory.length === 0" class="text-center py-8">
            <FileText class="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600">No hay tratamientos registrados</p>
          </div>
          
          <div v-else class="space-y-4">
            <div
              v-for="treatment in treatmentHistory"
              :key="treatment.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="font-semibold text-gray-900">Diente {{ treatment.tooth }}</span>
                    <span class="text-sm text-gray-500">•</span>
                    <span class="text-sm text-gray-600">{{ treatment.date }}</span>
                  </div>
                  <p class="text-gray-700 mb-2">{{ treatment.procedure }}</p>
                  <p class="text-sm text-gray-600">
                    <strong>Estudiante:</strong> {{ treatment.student }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <strong>Supervisor:</strong> {{ treatment.supervisor }}
                  </p>
                </div>
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(treatment.status)}`">
                  {{ treatment.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTONES DE ACCIÓN -->
    <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
      <div class="flex gap-3">
        <button
          @click="saveOdontogram"
          :disabled="saving"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Save class="h-4 w-4" />
          {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
        
        <button
          @click="exportOdontogram"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
        >
          <Download class="h-4 w-4" />
          Exportar PDF
        </button>
      </div>
      
      <button
        @click="resetOdontogram"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
      >
        <RotateCcw class="h-4 w-4" />
        Limpiar Todo
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL COMPONENTE ODONTOGRAMA PROFESIONAL
 * 
 * Este componente maneja toda la funcionalidad del odontograma:
 * - Representación visual de dientes
 * - Gestión de condiciones dentales
 * - Estadísticas en tiempo real
 * - Historial de tratamientos
 * - Persistencia de datos
 */

// Importar hooks de Vue
import { ref, computed, onMounted } from 'vue'
// Importar iconos de Lucide Vue
import {
  Activity, Info, Tooth, CheckCircle, AlertTriangle, Wrench, Clock, FileText,
  Save, Download, RotateCcw
} from 'lucide-vue-next'

/**
 * PROPS DEL COMPONENTE
 * 
 * Datos que recibe el componente desde el componente padre
 */
const props = defineProps({
  // ID del paciente para el cual se está creando el odontograma
  patientId: {
    type: String,
    required: true
  },
  // Datos iniciales del odontograma (para edición)
  initialData: {
    type: Object,
    default: () => ({})
  }
})

/**
 * EMITS DEL COMPONENTE
 * 
 * Eventos que el componente puede emitir hacia el componente padre
 */
const emit = defineEmits(['save', 'export'])

/**
 * ESTADO REACTIVO DEL COMPONENTE
 * 
 * Variables que controlan el estado y comportamiento del odontograma
 */

// Tab actualmente activo
const activeTab = ref('odontogram')

// Diente actualmente seleccionado
const selectedTooth = ref(null)

// Condición dental seleccionada para aplicar
const selectedCondition = ref('')

// Estado de guardado
const saving = ref(false)

/**
 * INFORMACIÓN DEL PACIENTE
 * 
 * Datos del paciente para mostrar en el header
 */
const patientInfo = ref({
  id: props.patientId,
  name: 'María González',
  age: 28
})

/**
 * CONFIGURACIÓN DE TABS
 * 
 * Definición de las pestañas disponibles en el odontograma
 */
const tabs = [
  { id: 'odontogram', label: 'Odontograma', icon: Tooth },
  { id: 'statistics', label: 'Estadísticas', icon: Activity },
  { id: 'history', label: 'Historial', icon: Clock }
]

/**
 * CONDICIONES DENTALES DISPONIBLES
 * 
 * Catálogo de todas las condiciones que se pueden aplicar a los dientes
 */
const dentalConditions = ref([
  { id: 'healthy', name: 'Sano', symbol: '✓', color: 'bg-green-500' },
  { id: 'caries', name: 'Caries', symbol: '●', color: 'bg-red-500' },
  { id: 'restoration', name: 'Restauración', symbol: '■', color: 'bg-blue-500' },
  { id: 'crown', name: 'Corona', symbol: '♦', color: 'bg-yellow-500' },
  { id: 'missing', name: 'Ausente', symbol: '✗', color: 'bg-gray-500' },
  { id: 'implant', name: 'Implante', symbol: '▲', color: 'bg-purple-500' },
  { id: 'endodontics', name: 'Endodoncia', symbol: '◆', color: 'bg-orange-500' },
  { id: 'fracture', name: 'Fractura', symbol: '⚡', color: 'bg-red-700' },
  { id: 'extraction', name: 'Extracción', symbol: '⚠', color: 'bg-black' }
])

/**
 * SUPERFICIES DENTALES
 * 
 * Diferentes superficies de un diente que pueden ser afectadas
 */
const dentalSurfaces = ref([
  { id: 'mesial', name: 'Mesial' },
  { id: 'distal', name: 'Distal' },
  { id: 'vestibular', name: 'Vestibular' },
  { id: 'lingual', name: 'Lingual/Palatino' },
  { id: 'oclusal', name: 'Oclusal/Incisal' }
])

/**
 * DATOS DE LOS DIENTES
 * 
 * Map que almacena la información de cada diente
 * Clave: número del diente, Valor: objeto con condición, superficies y notas
 */
const teethData = ref(new Map())

/**
 * DATOS DEL DIENTE ACTUALMENTE SELECCIONADO
 * 
 * Objeto reactivo que se sincroniza con el diente seleccionado
 */
const currentToothData = ref({
  condition: '',
  surfaces: [],
  notes: ''
})

/**
 * HISTORIAL DE TRATAMIENTOS
 * 
 * Array con el historial de tratamientos del paciente
 */
const treatmentHistory = ref([
  {
    id: 1,
    tooth: 16,
    date: '2024-01-15',
    procedure: 'Restauración con resina compuesta',
    student: 'Juan Pérez',
    supervisor: 'Dr. María González',
    status: 'Completado'
  },
  {
    id: 2,
    tooth: 26,
    date: '2024-01-10',
    procedure: 'Tratamiento de conducto',
    student: 'Ana López',
    supervisor: 'Dr. Carlos Ruiz',
    status: 'En progreso'
  },
  {
    id: 3,
    tooth: 36,
    date: '2024-01-05',
    procedure: 'Limpieza y profilaxis',
    student: 'Miguel Sánchez',
    supervisor: 'Dr. Elena Morales',
    status: 'Completado'
  }
])

/**
 * COMPUTED PROPERTIES
 * 
 * Propiedades calculadas que se actualizan automáticamente
 */

// Contar dientes sanos
const healthyTeethCount = computed(() => {
  let count = 0
  teethData.value.forEach(tooth => {
    if (tooth.condition === 'healthy') count++
  })
  return count
})

// Contar dientes con caries
const cariesCount = computed(() => {
  let count = 0
  teethData.value.forEach(tooth => {
    if (tooth.condition === 'caries') count++
  })
  return count
})

// Contar dientes restaurados
const restoredTeethCount = computed(() => {
  let count = 0
  teethData.value.forEach(tooth => {
    if (tooth.condition === 'restoration') count++
  })
  return count
})

/**
 * MÉTODOS DEL COMPONENTE
 * 
 * Funciones que manejan la lógica del odontograma
 */

/**
 * SELECCIONAR UN DIENTE
 * 
 * Función que se ejecuta cuando el usuario hace clic en un diente
 */
const selectTooth = (toothNumber) => {
  selectedTooth.value = toothNumber
  
  // Cargar datos del diente seleccionado
  const toothData = teethData.value.get(toothNumber) || {
    condition: '',
    surfaces: [],
    notes: ''
  }
  
  currentToothData.value = { ...toothData }
  
  // Si hay una condición seleccionada, aplicarla automáticamente
  if (selectedCondition.value) {
    currentToothData.value.condition = selectedCondition.value
    updateToothCondition()
  }
}

/**
 * ACTUALIZAR CONDICIÓN DEL DIENTE
 * 
 * Guarda la condición seleccionada para el diente actual
 */
const updateToothCondition = () => {
  if (!selectedTooth.value) return
  
  const toothData = teethData.value.get(selectedTooth.value) || {}
  toothData.condition = currentToothData.value.condition
  teethData.value.set(selectedTooth.value, toothData)
}

/**
 * ACTUALIZAR SUPERFICIES DEL DIENTE
 * 
 * Guarda las superficies afectadas del diente actual
 */
const updateToothSurfaces = () => {
  if (!selectedTooth.value) return
  
  const toothData = teethData.value.get(selectedTooth.value) || {}
  toothData.surfaces = [...currentToothData.value.surfaces]
  teethData.value.set(selectedTooth.value, toothData)
}

/**
 * ACTUALIZAR NOTAS DEL DIENTE
 * 
 * Guarda las notas del diente actual
 */
const updateToothNotes = () => {
  if (!selectedTooth.value) return
  
  const toothData = teethData.value.get(selectedTooth.value) || {}
  toothData.notes = currentToothData.value.notes
  teethData.value.set(selectedTooth.value, toothData)
}

/**
 * OBTENER COLOR DEL DIENTE
 * 
 * Retorna las clases CSS para colorear un diente según su condición
 */
const getToothColor = (toothNumber) => {
  const toothData = teethData.value.get(toothNumber)
  if (!toothData?.condition) return 'bg-white'
  
  const condition = getDentalCondition(toothData.condition)
  if (!condition) return 'bg-white'
  
  // Mapear colores de fondo para los dientes
  const colorMap = {
    'bg-green-500': 'bg-green-100',
    'bg-red-500': 'bg-red-100',
    'bg-blue-500': 'bg-blue-100',
    'bg-yellow-500': 'bg-yellow-100',
    'bg-gray-500': 'bg-gray-100',
    'bg-purple-500': 'bg-purple-100',
    'bg-orange-500': 'bg-orange-100',
    'bg-red-700': 'bg-red-200',
    'bg-black': 'bg-gray-300'
  }
  
  return colorMap[condition.color] || 'bg-white'
}

/**
 * OBTENER NOMBRE DEL DIENTE
 * 
 * Retorna el nombre descriptivo de un diente según su número
 */
const getToothName = (toothNumber) => {
  const toothNames = {
    // Arcada Superior Derecha
    18: 'Tercer Molar', 17: 'Segundo Molar', 16: 'Primer Molar', 15: 'Segundo Premolar',
    14: 'Primer Premolar', 13: 'Canino', 12: 'Incisivo Lateral', 11: 'Incisivo Central',
    // Arcada Superior Izquierda
    21: 'Incisivo Central', 22: 'Incisivo Lateral', 23: 'Canino', 24: 'Primer Premolar',
    25: 'Segundo Premolar', 26: 'Primer Molar', 27: 'Segundo Molar', 28: 'Tercer Molar',
    // Arcada Inferior Derecha
    48: 'Tercer Molar', 47: 'Segundo Molar', 46: 'Primer Molar', 45: 'Segundo Premolar',
    44: 'Primer Premolar', 43: 'Canino', 42: 'Incisivo Lateral', 41: 'Incisivo Central',
    // Arcada Inferior Izquierda
    31: 'Incisivo Central', 32: 'Incisivo Lateral', 33: 'Canino', 34: 'Primer Premolar',
    35: 'Segundo Premolar', 36: 'Primer Molar', 37: 'Segundo Molar', 38: 'Tercer Molar'
  }
  
  return toothNames[toothNumber] || 'Desconocido'
}

/**
 * OBTENER CONDICIÓN DENTAL
 * 
 * Busca una condición dental por su ID
 */
const getDentalCondition = (conditionId) => {
  return dentalConditions.value.find(c => c.id === conditionId)
}

/**
 * CONTAR DIENTES POR CONDICIÓN
 * 
 * Cuenta cuántos dientes tienen una condición específica
 */
const getConditionCount = (conditionId) => {
  let count = 0
  teethData.value.forEach(tooth => {
    if (tooth.condition === conditionId) count++
  })
  return count
}

/**
 * OBTENER COLOR DE ESTADO
 * 
 * Retorna clases CSS para colorear el estado de un tratamiento
 */
const getStatusColor = (status) => {
  switch (status) {
    case 'Completado':
      return 'bg-green-100 text-green-800'
    case 'En progreso':
      return 'bg-yellow-100 text-yellow-800'
    case 'Pendiente':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * GUARDAR ODONTOGRAMA
 * 
 * Función para persistir los datos del odontograma
 */
const saveOdontogram = async () => {
  saving.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Preparar datos para enviar
    const odontogramData = {
      patientId: props.patientId,
      teeth: Object.fromEntries(teethData.value),
      lastModified: new Date().toISOString()
    }
    
    // Emitir evento al componente padre
    emit('save', odontogramData)
    
    alert('Odontograma guardado exitosamente')
  } catch (error) {
    alert('Error al guardar el odontograma')
  } finally {
    saving.value = false
  }
}

/**
 * EXPORTAR ODONTOGRAMA
 * 
 * Función para exportar el odontograma a PDF
 */
const exportOdontogram = () => {
  // Preparar datos para exportar
  const exportData = {
    patient: patientInfo.value,
    teeth: Object.fromEntries(teethData.value),
    statistics: {
      healthy: healthyTeethCount.value,
      caries: cariesCount.value,
      restored: restoredTeethCount.value
    },
    history: treatmentHistory.value
  }
  
  // Emitir evento al componente padre
  emit('export', exportData)
  
  alert('Exportando odontograma a PDF...')
}

/**
 * LIMPIAR ODONTOGRAMA
 * 
 * Función para resetear todos los datos del odontograma
 */
const resetOdontogram = () => {
  if (confirm('¿Estás seguro de que quieres limpiar todo el odontograma?')) {
    teethData.value.clear()
    selectedTooth.value = null
    selectedCondition.value = ''
    currentToothData.value = {
      condition: '',
      surfaces: [],
      notes: ''
    }
  }
}

/**
 * INICIALIZACIÓN DEL COMPONENTE
 * 
 * Se ejecuta cuando el componente se monta en el DOM
 */
onMounted(() => {
  // Cargar datos iniciales si se proporcionan
  if (props.initialData && Object.keys(props.initialData).length > 0) {
    // Convertir datos iniciales al formato del Map
    Object.entries(props.initialData).forEach(([toothNumber, data]) => {
      teethData.value.set(parseInt(toothNumber), data)
    })
  }
  
  console.log('Odontograma profesional inicializado')
})
</script>
