<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Odontogramas</h1>
      <p class="text-green-600">Herramientas de diagnóstico dental para diferentes tipos de dentición</p>
    </div>

    <!-- Odontogram Types -->
    <div class="grid gap-6 md:grid-cols-3">
      <div class="bg-white rounded-lg border border-green-200 shadow-sm overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 mx-auto">
            <User class="h-8 w-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-center text-gray-900 mb-2">Odontograma Adulto</h3>
          <p class="text-gray-600 text-center mb-4">Dentición permanente completa (32 dientes)</p>
          <div class="text-center">
            <button 
              @click="openOdontogram('adult')"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Abrir Odontograma
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-green-200 shadow-sm overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-4 mx-auto">
            <Baby class="h-8 w-8 text-green-600" />
          </div>
          <h3 class="text-xl font-semibold text-center text-gray-900 mb-2">Odontograma Pediátrico</h3>
          <p class="text-gray-600 text-center mb-4">Dentición temporal (20 dientes)</p>
          <div class="text-center">
            <button 
              @click="openOdontogram('pediatric')"
              class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Abrir Odontograma
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-green-200 shadow-sm overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-lg mb-4 mx-auto">
            <Users class="h-8 w-8 text-purple-600" />
          </div>
          <h3 class="text-xl font-semibold text-center text-gray-900 mb-2">Odontograma Mixto</h3>
          <p class="text-gray-600 text-center mb-4">Dentición mixta (temporal y permanente)</p>
          <div class="text-center">
            <button 
              @click="openOdontogram('mixed')"
              class="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Abrir Odontograma
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Odontograms -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
          <FileText class="h-5 w-5" />
          Odontogramas Recientes
        </h2>
      </div>
      <div class="p-6">
        <div v-if="recentOdontograms.length === 0" class="text-center py-8">
          <FileText class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600">No hay odontogramas guardados</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="odontogram in recentOdontograms" :key="odontogram.id" 
               class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div :class="`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(odontogram.type)}`">
                  <component :is="getTypeIcon(odontogram.type)" class="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ odontogram.patientName }}</h3>
                  <p class="text-sm text-gray-600">{{ getTypeLabel(odontogram.type) }} • {{ odontogram.date }}</p>
                  <p class="text-xs text-gray-500">{{ odontogram.findings }} hallazgos registrados</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  @click="viewOdontogram(odontogram)"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Ver
                </button>
                <button 
                  @click="editOdontogram(odontogram)"
                  class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Editar
                </button>
                <button 
                  @click="exportOdontogram(odontogram)"
                  class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 rounded text-sm transition-colors"
                >
                  Exportar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid gap-6 md:grid-cols-4">
      <div class="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-800">Odontogramas Adulto</p>
            <p class="text-2xl font-bold text-blue-700">{{ stats.adult }}</p>
          </div>
          <User class="h-8 w-8 text-blue-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-800">Odontogramas Pediátricos</p>
            <p class="text-2xl font-bold text-green-700">{{ stats.pediatric }}</p>
          </div>
          <Baby class="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-purple-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-800">Odontogramas Mixtos</p>
            <p class="text-2xl font-bold text-purple-700">{{ stats.mixed }}</p>
          </div>
          <Users class="h-8 w-8 text-purple-600" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-orange-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-800">Total Hallazgos</p>
            <p class="text-2xl font-bold text-orange-700">{{ stats.totalFindings }}</p>
          </div>
          <Search class="h-8 w-8 text-orange-600" />
        </div>
      </div>
    </div>

    <!-- Odontogram Modal -->
    <div v-if="showOdontogramModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[95vh] overflow-hidden">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              {{ getTypeLabel(currentOdontogramType) }}
            </h3>
            <p class="text-sm text-gray-600">{{ currentPatient || 'Nuevo odontograma' }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="saveOdontogram"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              Guardar
            </button>
            <button 
              @click="exportCurrentOdontogram"
              class="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm transition-colors"
            >
              Exportar
            </button>
            <button @click="showOdontogramModal = false" class="text-gray-400 hover:text-gray-600">
              <X class="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          <!-- Interactive Odontogram Component would go here -->
          <div class="bg-gray-100 rounded-lg p-8 text-center">
            <Stethoscope class="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 class="text-lg font-medium text-gray-700 mb-2">Odontograma Interactivo</h4>
            <p class="text-gray-600 mb-4">
              {{ getOdontogramDescription(currentOdontogramType) }}
            </p>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-2xl mx-auto">
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                <p class="text-xs text-gray-600">Caries</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                <p class="text-xs text-gray-600">Obturación</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p class="text-xs text-gray-600">Corona</p>
              </div>
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="w-8 h-8 bg-gray-500 rounded-full mx-auto mb-2"></div>
                <p class="text-xs text-gray-600">Ausente</p>
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
import { User, Users, FileText, Search, X, Stethoscope, Baby } from 'lucide-vue-next'

const showOdontogramModal = ref(false)
const currentOdontogramType = ref('')
const currentPatient = ref('')

const stats = ref({
  adult: 12,
  pediatric: 8,
  mixed: 5,
  totalFindings: 147
})

const recentOdontograms = ref([
  {
    id: 1,
    patientName: 'María García',
    type: 'adult',
    date: '15 Ene 2025',
    findings: 8
  },
  {
    id: 2,
    patientName: 'Carlos López (7 años)',
    type: 'pediatric',
    date: '14 Ene 2025',
    findings: 3
  },
  {
    id: 3,
    patientName: 'Ana Martínez (9 años)',
    type: 'mixed',
    date: '13 Ene 2025',
    findings: 5
  }
])

const openOdontogram = (type) => {
  currentOdontogramType.value = type
  currentPatient.value = ''
  showOdontogramModal.value = true
}

const viewOdontogram = (odontogram) => {
  currentOdontogramType.value = odontogram.type
  currentPatient.value = odontogram.patientName
  showOdontogramModal.value = true
}

const editOdontogram = (odontogram) => {
  currentOdontogramType.value = odontogram.type
  currentPatient.value = odontogram.patientName
  showOdontogramModal.value = true
}

const exportOdontogram = (odontogram) => {
  alert(`Exportando odontograma de ${odontogram.patientName}`)
}

const saveOdontogram = () => {
  alert('Odontograma guardado exitosamente')
  showOdontogramModal.value = false
}

const exportCurrentOdontogram = () => {
  alert('Exportando odontograma actual')
}

const getTypeColor = (type) => {
  switch (type) {
    case 'adult':
      return 'bg-blue-600'
    case 'pediatric':
      return 'bg-green-600'
    case 'mixed':
      return 'bg-purple-600'
    default:
      return 'bg-gray-600'
  }
}

const getTypeIcon = (type) => {
  switch (type) {
    case 'adult':
      return User
    case 'pediatric':
      return Baby
    case 'mixed':
      return Users
    default:
      return User
  }
}

const getTypeLabel = (type) => {
  switch (type) {
    case 'adult':
      return 'Odontograma Adulto'
    case 'pediatric':
      return 'Odontograma Pediátrico'
    case 'mixed':
      return 'Odontograma Mixto'
    default:
      return 'Odontograma'
  }
}

const getOdontogramDescription = (type) => {
  switch (type) {
    case 'adult':
      return 'Dentición permanente completa con 32 dientes. Haz clic en cada diente para registrar hallazgos clínicos.'
    case 'pediatric':
      return 'Dentición temporal con 20 dientes. Ideal para pacientes de 2 a 6 años aproximadamente.'
    case 'mixed':
      return 'Dentición mixta combinando dientes temporales y permanentes. Para pacientes de 6 a 12 años.'
    default:
      return 'Selecciona un tipo de odontograma para comenzar.'
  }
}
</script>
