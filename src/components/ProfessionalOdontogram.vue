<template>
  <!-- Contenedor principal del odontograma profesional -->
  <div class="w-full max-w-7xl mx-auto bg-white">
    <!-- Header con tabs de navegación estilo software médico -->
    <div class="bg-blue-600 text-white">
      <!-- Sistema de tabs para navegar entre diferentes vistas -->
      <div class="flex bg-blue-700 border-0 h-12">
        <!-- Tab de Tratamientos - Vista principal del odontograma -->
        <button
          @click="activeTab = 'tratamientos'"
          :class="[
            'px-4 py-2 text-white flex items-center gap-2 transition-colors',
            activeTab === 'tratamientos' ? 'bg-blue-500' : 'hover:bg-blue-600'
          ]"
        >
          <Stethoscope class="h-4 w-4" />
          Tratamientos
        </button>
        
        <!-- Tab de Historial - Muestra tratamientos anteriores -->
        <button
          @click="activeTab = 'historial'"
          :class="[
            'px-4 py-2 text-white flex items-center gap-2 transition-colors',
            activeTab === 'historial' ? 'bg-blue-500' : 'hover:bg-blue-600'
          ]"
        >
          <FileText class="h-4 w-4" />
          Historial
        </button>
        
        <!-- Tab de Estadísticas - Muestra métricas del estado dental -->
        <button
          @click="activeTab = 'estadistica'"
          :class="[
            'px-4 py-2 text-white flex items-center gap-2 transition-colors',
            activeTab === 'estadistica' ? 'bg-blue-500' : 'hover:bg-blue-600'
          ]"
        >
          <BarChart3 class="h-4 w-4" />
          Estadística
        </button>
      </div>
    </div>

    <!-- Layout principal con dos paneles: odontograma y controles -->
    <div class="flex min-h-[600px]">
      <!-- Panel izquierdo: Área principal del odontograma -->
      <div class="flex-1 p-6 bg-gray-50">
        
        <!-- Vista de Tratamientos: Odontograma interactivo -->
        <div v-if="activeTab === 'tratamientos'" class="bg-white p-8 rounded-lg shadow-sm border">
          
          <!-- Sección de dientes superiores (maxilar superior) -->
          <div class="mb-12">
            <!-- Título de la sección superior -->
            <div class="text-center text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Maxilar Superior
            </div>
            
            <!-- Fila de dientes superiores con numeración FDI -->
            <div class="flex justify-center gap-3 mb-6">
              <!-- Itera sobre cada diente superior y lo renderiza -->
              <div 
                v-for="toothNumber in UPPER_TEETH" 
                :key="toothNumber"
                class="flex flex-col items-center"
              >
                <!-- Número del diente según sistema FDI -->
                <div class="text-xs font-mono mb-1 text-gray-600">{{ toothNumber }}</div>
                
                <!-- Representación visual del diente -->
                <div
                  :class="[
                    'w-10 h-10 border-2 cursor-pointer flex items-center justify-center text-lg font-bold',
                    'rounded-lg transition-all duration-200 hover:scale-105',
                    getToothStyle(toothNumber),
                    selectedTooth === toothNumber ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                  ]"
                  @click="handleToothClick(toothNumber)"
                  :title="`Diente ${toothNumber}${getToothDiagnosis(toothNumber)}`"
                >
                  <!-- Símbolo que representa la condición del diente -->
                  {{ getToothSymbol(toothNumber) }}
                </div>

                <!-- Indicadores de superficies afectadas -->
                <div v-if="getToothSurfaces(toothNumber).length > 0" class="flex mt-1 gap-0.5">
                  <!-- Muestra hasta 3 puntos rojos para superficies afectadas -->
                  <div 
                    v-for="(surface, index) in getToothSurfaces(toothNumber).slice(0, 3)" 
                    :key="index"
                    class="w-1 h-1 bg-red-500 rounded-full"
                  ></div>
                  <!-- Si hay más de 3 superficies, muestra un contador -->
                  <div 
                    v-if="getToothSurfaces(toothNumber).length > 3" 
                    class="text-xs text-red-500 ml-1"
                  >
                    +{{ getToothSurfaces(toothNumber).length - 3 }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Representación gráfica de los dientes superiores -->
            <div class="flex justify-center gap-3">
              <div 
                v-for="toothNumber in UPPER_TEETH" 
                :key="`graphic-upper-${toothNumber}`"
                class="flex flex-col items-center"
              >
                <!-- Forma gráfica del diente con indicadores de superficies -->
                <div :class="[
                  'w-6 h-8 border-2 rounded-t-lg relative overflow-hidden',
                  getToothStyle(toothNumber)
                ]">
                  <!-- Indicador visual para superficie oclusal -->
                  <div 
                    v-if="getToothSurfaces(toothNumber).includes('Oclu')"
                    class="absolute top-0 left-0 right-0 h-2 bg-red-400 opacity-70"
                  ></div>
                  <!-- Indicador visual para superficie vestibular -->
                  <div 
                    v-if="getToothSurfaces(toothNumber).includes('Vest')"
                    class="absolute top-0 left-0 bottom-0 w-1 bg-red-400 opacity-70"
                  ></div>
                  <!-- Indicador visual para superficie lingual -->
                  <div 
                    v-if="getToothSurfaces(toothNumber).includes('Ling')"
                    class="absolute top-0 right-0 bottom-0 w-1 bg-red-400 opacity-70"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Línea divisoria entre maxilares -->
          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t-2 border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-6 text-gray-500 font-medium">Línea Media</span>
            </div>
          </div>

          <!-- Sección de dientes inferiores (maxilar inferior) -->
          <div>
            <!-- Representación gráfica de los dientes inferiores -->
            <div class="flex justify-center gap-3 mb-6">
              <div 
                v-for="toothNumber in LOWER_TEETH" 
                :key="`graphic-lower-${toothNumber}`"
                class="flex flex-col items-center"
              >
                <!-- Forma gráfica del diente inferior -->
                <div :class="[
                  'w-6 h-8 border-2 rounded-b-lg relative overflow-hidden',
                  getToothStyle(toothNumber)
                ]">
                  <!-- Indicadores de superficies para dientes inferiores -->
                  <div 
                    v-if="getToothSurfaces(toothNumber).includes('Oclu')"
                    class="absolute bottom-0 left-0 right-0 h-2 bg-red-400 opacity-70"
                  ></div>
                  <div 
                    v-if="getToothSurfaces(toothNumber).includes('Vest')"
                    class="absolute top-0 left-0 bottom-0 w-1 bg-red-400 opacity-70"
                  ></div>
                  <div 
                    v-if="getToothSurfaces(toothNumber).includes('Ling')"
                    class="absolute top-0 right-0 bottom-0 w-1 bg-red-400 opacity-70"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Fila de dientes inferiores -->
            <div class="flex justify-center gap-3 mb-4">
              <div 
                v-for="toothNumber in LOWER_TEETH" 
                :key="toothNumber"
                class="flex flex-col items-center"
              >
                <!-- Representación visual del diente inferior -->
                <div
                  :class="[
                    'w-10 h-10 border-2 cursor-pointer flex items-center justify-center text-lg font-bold',
                    'rounded-lg transition-all duration-200 hover:scale-105',
                    getToothStyle(toothNumber),
                    selectedTooth === toothNumber ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                  ]"
                  @click="handleToothClick(toothNumber)"
                  :title="`Diente ${toothNumber}${getToothDiagnosis(toothNumber)}`"
                >
                  {{ getToothSymbol(toothNumber) }}
                </div>

                <!-- Indicadores de superficies para dientes inferiores -->
                <div v-if="getToothSurfaces(toothNumber).length > 0" class="flex mt-1 gap-0.5">
                  <div 
                    v-for="(surface, index) in getToothSurfaces(toothNumber).slice(0, 3)" 
                    :key="index"
                    class="w-1 h-1 bg-red-500 rounded-full"
                  ></div>
                  <div 
                    v-if="getToothSurfaces(toothNumber).length > 3" 
                    class="text-xs text-red-500 ml-1"
                  >
                    +{{ getToothSurfaces(toothNumber).length - 3 }}
                  </div>
                </div>

                <!-- Número del diente inferior -->
                <div class="text-xs font-mono mt-1 text-gray-600">{{ toothNumber }}</div>
              </div>
            </div>

            <!-- Título de la sección inferior -->
            <div class="text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Maxilar Inferior
            </div>
          </div>
        </div>

        <!-- Vista de Historial: Lista de tratamientos anteriores -->
        <div v-else-if="activeTab === 'historial'" class="bg-white rounded-lg shadow-sm border">
          <div class="p-6">
            <div class="flex items-center gap-2 mb-6">
              <FileText class="h-5 w-5" />
              <h2 class="text-xl font-semibold">Historial de Tratamientos</h2>
            </div>
            
            <!-- Lista de tratamientos históricos -->
            <div class="space-y-4">
              <div 
                v-for="(entry, index) in getHistory()" 
                :key="index"
                class="flex justify-between items-center p-4 bg-gray-50 rounded-lg border"
              >
                <!-- Información del tratamiento -->
                <div class="flex-1">
                  <div class="font-semibold text-lg">Diente {{ entry.tooth }}</div>
                  <div class="text-sm text-gray-600 mt-1">{{ entry.treatment }}</div>
                  <div class="text-xs text-gray-500 mt-2">{{ entry.doctor }}</div>
                </div>
                
                <!-- Fecha y estado del tratamiento -->
                <div class="text-right">
                  <div class="text-sm font-medium">{{ entry.date }}</div>
                  <span :class="[
                    'inline-block px-2 py-1 rounded text-xs mt-1',
                    entry.status === 'Completado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ entry.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Vista de Estadísticas: Métricas del estado dental -->
        <div v-else-if="activeTab === 'estadistica'" class="bg-white rounded-lg shadow-sm border">
          <div class="p-6">
            <div class="flex items-center gap-2 mb-6">
              <BarChart3 class="h-5 w-5" />
              <h2 class="text-xl font-semibold">Estadísticas Dentales</h2>
            </div>
            
            <!-- Grid de estadísticas por condición dental -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div 
                v-for="[condition, count] in Object.entries(getStatistics())" 
                :key="condition"
                :class="[
                  'text-center p-4 rounded-lg border-2',
                  TOOTH_CONDITIONS[condition]?.color || 'bg-gray-100'
                ]"
              >
                <!-- Contador de dientes con esta condición -->
                <div class="text-3xl font-bold mb-2">{{ count }}</div>
                <!-- Nombre de la condición -->
                <div class="text-sm font-medium">{{ condition }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel derecho: Controles y información del paciente -->
      <div class="w-80 bg-white border-l border-gray-200">
        <div class="p-6 space-y-6">
          
          <!-- Información del paciente -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-3">
              <User class="h-4 w-4" />
              <span class="text-sm font-medium">Profesional</span>
            </div>
            <div class="text-lg font-semibold">{{ patientName }}</div>
            <div class="text-sm text-gray-600">ID: {{ patientId }}</div>
          </div>

          <!-- Panel de control del diente seleccionado -->
          <div v-if="selectedTooth" class="bg-gray-50 rounded-lg p-4">
            <div class="text-sm font-medium mb-3">Diente Seleccionado</div>
            
            <!-- Número del diente seleccionado -->
            <div class="text-center mb-4">
              <div class="text-4xl font-bold text-blue-600 mb-2">{{ selectedTooth }}</div>
              <span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {{ getToothCondition(selectedTooth) }}
              </span>
            </div>

            <!-- Controles de superficies dentales -->
            <div class="mb-4">
              <div class="font-semibold mb-3 text-sm">Superficies</div>
              <div class="grid grid-cols-2 gap-2">
                <!-- Checkbox para cada superficie dental -->
                <div 
                  v-for="surface in SURFACES" 
                  :key="surface"
                  class="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    :id="surface"
                    :checked="selectedSurfaces.includes(surface)"
                    @change="handleSurfaceChange(surface, $event.target.checked)"
                    class="rounded border-gray-300"
                  />
                  <label :for="surface" class="text-sm cursor-pointer">
                    {{ surface }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Selector de diagnóstico -->
            <div class="mb-4">
              <div class="font-semibold mb-3 text-sm">Diagnóstico</div>
              <select 
                v-model="selectedCondition"
                class="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option 
                  v-for="condition in Object.keys(TOOTH_CONDITIONS)" 
                  :key="condition"
                  :value="condition"
                >
                  {{ condition }}
                </option>
              </select>
            </div>

            <!-- Botón para aplicar tratamiento -->
            <button
              @click="handleTreat"
              :disabled="!selectedTooth"
              class="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Tratar
            </button>
          </div>

          <!-- Botón para guardar el odontograma -->
          <button
            @click="saveOdontogram"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors"
          >
            <Save class="h-4 w-4" />
            Guardar Odontograma
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importaciones de Vue 3 Composition API
import { ref, computed, onMounted } from 'vue'
// Importación de iconos de Lucide Vue
import { User, FileText, BarChart3, Stethoscope, Save } from 'lucide-vue-next'

// Props del componente - datos que recibe desde el componente padre
const props = defineProps({
  patientId: {
    type: String,
    required: true,
    default: "12345"
  },
  patientName: {
    type: String,
    default: "Laura Medina"
  }
})

// Eventos que el componente puede emitir al padre
const emit = defineEmits(['save'])

// Configuración de condiciones dentales con colores y símbolos
// Cada condición tiene un color específico y un símbolo Unicode
const TOOTH_CONDITIONS = {
  SANO: { 
    color: "bg-white border-gray-300 text-gray-600", 
    symbol: "○", 
    diagnosis: "SANO" 
  },
  "CARIES OCLUSAL": { 
    color: "bg-red-100 border-red-400 text-red-800", 
    symbol: "●", 
    diagnosis: "CARIES OCLUSAL" 
  },
  OBTURACIÓN: { 
    color: "bg-blue-100 border-blue-400 text-blue-800", 
    symbol: "◐", 
    diagnosis: "OBTURACIÓN" 
  },
  CORONA: { 
    color: "bg-yellow-100 border-yellow-400 text-yellow-800", 
    symbol: "◆", 
    diagnosis: "CORONA" 
  },
  EXTRACCIÓN: { 
    color: "bg-gray-100 border-gray-400 text-gray-800", 
    symbol: "✕", 
    diagnosis: "EXTRACCIÓN" 
  },
  AUSENTE: { 
    color: "bg-gray-200 border-gray-500 text-gray-700", 
    symbol: "—", 
    diagnosis: "AUSENTE" 
  },
  ENDODONCIA: { 
    color: "bg-purple-100 border-purple-400 text-purple-800", 
    symbol: "◉", 
    diagnosis: "ENDODONCIA" 
  },
  IMPLANTE: { 
    color: "bg-green-100 border-green-400 text-green-800", 
    symbol: "⬢", 
    diagnosis: "IMPLANTE" 
  },
  PRÓTESIS: { 
    color: "bg-orange-100 border-orange-400 text-orange-800", 
    symbol: "◈", 
    diagnosis: "PRÓTESIS" 
  },
}

// Superficies dentales según nomenclatura odontológica
const SURFACES = ["Vest", "Raz", "Oclu", "Ling", "Mesial", "Distal"]

// Numeración dental FDI (Fédération Dentaire Internationale)
// Sistema estándar internacional para numerar dientes
const UPPER_TEETH = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
const LOWER_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

// Estados reactivos del componente
const activeTab = ref("tratamientos") // Tab actualmente seleccionado
const selectedTooth = ref(null) // Diente actualmente seleccionado
const selectedSurfaces = ref([]) // Superficies seleccionadas para el diente actual
const selectedCondition = ref("SANO") // Condición seleccionada para aplicar

// Estado de todos los dientes con datos de ejemplo
const teeth = ref(new Map())

/**
 * Función para inicializar los dientes con datos de ejemplo
 * Crea un Map con todos los dientes y algunos casos clínicos de muestra
 */
const initializeTeeth = () => {
  // Crea todos los dientes como sanos inicialmente
  const allTeeth = [...UPPER_TEETH, ...LOWER_TEETH]
  allTeeth.forEach(number => {
    teeth.value.set(number, {
      number,
      condition: "SANO",
      surfaces: [],
      notes: "",
      diagnosis: "SANO",
    })
  })

  // Agrega algunos casos de ejemplo para demostración
  const exampleCases = [
    { 
      number: 21, 
      condition: "CARIES OCLUSAL", 
      surfaces: ["Oclu"], 
      diagnosis: "CARIES OCLUSAL" 
    },
    { 
      number: 11, 
      condition: "OBTURACIÓN", 
      surfaces: ["Mesial", "Oclu"], 
      diagnosis: "OBTURACIÓN MESIO-OCLUSAL" 
    },
    { 
      number: 16, 
      condition: "CORONA", 
      surfaces: [], 
      diagnosis: "CORONA DE PORCELANA" 
    },
  ]

  // Aplica los casos de ejemplo
  exampleCases.forEach(example => {
    teeth.value.set(example.number, {
      number: example.number,
      condition: example.condition,
      surfaces: example.surfaces,
      diagnosis: example.diagnosis,
      notes: `Tratamiento: ${example.diagnosis}`
    })
  })
}

/**
 * Maneja el clic en un diente
 * Actualiza el estado de selección y los controles
 * @param {number} toothNumber - Número del diente clickeado
 */
const handleToothClick = (toothNumber) => {
  selectedTooth.value = toothNumber
  const tooth = teeth.value.get(toothNumber)
  
  if (tooth) {
    // Actualiza los controles con los datos del diente seleccionado
    selectedSurfaces.value = [...tooth.surfaces]
    selectedCondition.value = tooth.condition
  } else {
    // Si no hay datos, usa valores por defecto
    selectedSurfaces.value = []
    selectedCondition.value = "SANO"
  }
}

/**
 * Maneja el cambio en las superficies seleccionadas
 * @param {string} surface - Superficie que cambió
 * @param {boolean} checked - Si está marcada o no
 */
const handleSurfaceChange = (surface, checked) => {
  if (checked) {
    // Agrega la superficie si no está ya incluida
    if (!selectedSurfaces.value.includes(surface)) {
      selectedSurfaces.value.push(surface)
    }
  } else {
    // Remueve la superficie de la lista
    selectedSurfaces.value = selectedSurfaces.value.filter(s => s !== surface)
  }
}

/**
 * Aplica el tratamiento al diente seleccionado
 * Actualiza el estado del diente con la nueva condición y superficies
 */
const handleTreat = () => {
  if (selectedTooth.value) {
    const conditionData = TOOTH_CONDITIONS[selectedCondition.value]
    
    // Actualiza los datos del diente
    teeth.value.set(selectedTooth.value, {
      number: selectedTooth.value,
      condition: selectedCondition.value,
      surfaces: [...selectedSurfaces.value],
      diagnosis: conditionData.diagnosis,
      notes: `Tratamiento aplicado: ${conditionData.diagnosis}`,
      lastUpdated: new Date().toISOString()
    })
    
    console.log(`Tratamiento aplicado al diente ${selectedTooth.value}:`, {
      condition: selectedCondition.value,
      surfaces: selectedSurfaces.value
    })
  }
}

/**
 * Guarda el odontograma completo
 * Emite evento al componente padre con todos los datos
 */
const saveOdontogram = () => {
  const odontogramData = {
    patientId: props.patientId,
    patientName: props.patientName,
    teeth: Array.from(teeth.value.values()),
    lastSaved: new Date().toISOString()
  }
  
  // Emite evento al componente padre
  emit('save', odontogramData)
  console.log('Odontograma guardado:', odontogramData)
}

// Funciones utilitarias para obtener información de los dientes

/**
 * Obtiene el estilo CSS para un diente específico
 * @param {number} toothNumber - Número del diente
 * @returns {string} Clases CSS para el estilo
 */
const getToothStyle = (toothNumber) => {
  const tooth = teeth.value.get(toothNumber)
  if (!tooth) return TOOTH_CONDITIONS.SANO.color
  
  const conditionData = TOOTH_CONDITIONS[tooth.condition]
  return conditionData ? conditionData.color : TOOTH_CONDITIONS.SANO.color
}

/**
 * Obtiene el símbolo Unicode para un diente
 * @param {number} toothNumber - Número del diente
 * @returns {string} Símbolo Unicode
 */
const getToothSymbol = (toothNumber) => {
  const tooth = teeth.value.get(toothNumber)
  if (!tooth) return TOOTH_CONDITIONS.SANO.symbol
  
  const conditionData = TOOTH_CONDITIONS[tooth.condition]
  return conditionData ? conditionData.symbol : TOOTH_CONDITIONS.SANO.symbol
}

/**
 * Obtiene las superficies afectadas de un diente
 * @param {number} toothNumber - Número del diente
 * @returns {Array} Array de superficies afectadas
 */
const getToothSurfaces = (toothNumber) => {
  const tooth = teeth.value.get(toothNumber)
  return tooth ? tooth.surfaces : []
}

/**
 * Obtiene el diagnóstico de un diente para el tooltip
 * @param {number} toothNumber - Número del diente
 * @returns {string} Diagnóstico formateado
 */
const getToothDiagnosis = (toothNumber) => {
  const tooth = teeth.value.get(toothNumber)
  return tooth && tooth.diagnosis !== "SANO" ? ` - ${tooth.diagnosis}` : ""
}

/**
 * Obtiene la condición actual de un diente
 * @param {number} toothNumber - Número del diente
 * @returns {string} Condición del diente
 */
const getToothCondition = (toothNumber) => {
  const tooth = teeth.value.get(toothNumber)
  return tooth ? tooth.condition : "SANO"
}

/**
 * Calcula estadísticas de todas las condiciones dentales
 * @returns {Object} Objeto con contadores por condición
 */
const getStatistics = () => {
  const stats = {}
  
  // Cuenta cada condición dental
  teeth.value.forEach(tooth => {
    stats[tooth.condition] = (stats[tooth.condition] || 0) + 1
  })
  
  return stats
}

/**
 * Obtiene el historial de tratamientos (datos de ejemplo)
 * @returns {Array} Array de tratamientos históricos
 */
const getHistory = () => [
  {
    date: "2024-01-15",
    tooth: 16,
    treatment: "Corona de porcelana",
    doctor: "Dr. Carlos Ruiz",
    status: "Completado",
  },
  { 
    date: "2024-01-10", 
    tooth: 21, 
    treatment: "Diagnóstico de caries", 
    doctor: "Dr. Ana López", 
    status: "Pendiente" 
  },
  {
    date: "2023-12-20",
    tooth: 11,
    treatment: "Obturación mesio-oclusal",
    doctor: "Dr. Carlos Ruiz",
    status: "Completado",
  },
]

// Hook de ciclo de vida - se ejecuta cuando el componente se monta
onMounted(() => {
  initializeTeeth()
  console.log('Odontograma profesional inicializado')
})
</script>

<style scoped>
/* Estilos específicos del componente */
/* Los estilos están principalmente en las clases de Tailwind CSS */
/* Este bloque se puede usar para estilos personalizados si es necesario */
</style>
