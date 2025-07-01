<!--
  PÁGINA DE ESPECIALIDADES
  
  Esta página muestra información sobre las diferentes especialidades
  odontológicas disponibles en la clínica dental ULEAM.
-->
<template>
  <div class="space-y-6">
    
    <!-- HEADER DE LA PÁGINA -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Especialidades Odontológicas</h1>
      <p class="text-gray-600 mt-2">
        Conoce las diferentes áreas de especialización disponibles en la Clínica Dental ULEAM
      </p>
    </div>

    <!-- FILTROS Y BÚSQUEDA -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Búsqueda -->
        <div class="flex-1">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar especialidades..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <!-- Filtro por categoría -->
        <div class="md:w-48">
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas las categorías</option>
            <option value="preventiva">Preventiva</option>
            <option value="restaurativa">Restaurativa</option>
            <option value="quirurgica">Quirúrgica</option>
            <option value="estetica">Estética</option>
            <option value="pediatrica">Pediátrica</option>
          </select>
        </div>
      </div>
    </div>

    <!-- GRID DE ESPECIALIDADES -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="specialty in filteredSpecialties"
        :key="specialty.id"
        class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <!-- Imagen de la especialidad -->
        <div class="h-48 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
          <component 
            :is="specialty.icon" 
            :class="`h-16 w-16 ${specialty.iconColor}`"
          />
        </div>
        
        <!-- Contenido -->
        <div class="p-6">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-semibold text-gray-900">{{ specialty.name }}</h3>
            <span :class="`px-2 py-1 rounded-full text-xs font-medium ${specialty.categoryColor}`">
              {{ specialty.category }}
            </span>
          </div>
          
          <p class="text-gray-600 text-sm mb-4">{{ specialty.description }}</p>
          
          <!-- Información adicional -->
          <div class="space-y-2 mb-4">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Clock class="h-4 w-4" />
              <span>Duración promedio: {{ specialty.duration }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <Users class="h-4 w-4" />
              <span>{{ specialty.professorsCount }} profesores especializados</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <GraduationCap class="h-4 w-4" />
              <span>{{ specialty.studentsCount }} estudiantes en práctica</span>
            </div>
          </div>
          
          <!-- Procedimientos comunes -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Procedimientos Comunes:</h4>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="procedure in specialty.procedures.slice(0, 3)"
                :key="procedure"
                class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {{ procedure }}
              </span>
              <span
                v-if="specialty.procedures.length > 3"
                class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                +{{ specialty.procedures.length - 3 }} más
              </span>
            </div>
          </div>
          
          <!-- Botones de acción -->
          <div class="flex gap-2">
            <button
              @click="showSpecialtyDetails(specialty)"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
            >
              Ver Detalles
            </button>
            <button
              v-if="authStore.user?.role === 'patient'"
              @click="requestAppointment(specialty)"
              class="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium py-2 px-4 rounded-md transition-colors"
            >
              Solicitar Cita
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MENSAJE SI NO HAY RESULTADOS -->
    <div v-if="filteredSpecialties.length === 0" class="text-center py-12">
      <Search class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No se encontraron especialidades</h3>
      <p class="text-gray-600">
        Intenta ajustar los filtros de búsqueda o explora todas las especialidades disponibles.
      </p>
    </div>

    <!-- MODAL DE DETALLES DE ESPECIALIDAD -->
    <div v-if="selectedSpecialty" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold text-gray-900">{{ selectedSpecialty.name }}</h3>
            <button
              @click="selectedSpecialty = null"
              class="text-gray-400 hover:text-gray-600"
            >
              <X class="h-6 w-6" />
            </button>
          </div>
          
          <div class="space-y-6">
            <!-- Descripción detallada -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Descripción</h4>
              <p class="text-gray-600">{{ selectedSpecialty.detailedDescription }}</p>
            </div>
            
            <!-- Todos los procedimientos -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Procedimientos Disponibles</h4>
              <div class="grid grid-cols-2 gap-2">
                <span
                  v-for="procedure in selectedSpecialty.procedures"
                  :key="procedure"
                  class="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-md"
                >
                  {{ procedure }}
                </span>
              </div>
            </div>
            
            <!-- Profesores -->
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Profesores Especializados</h4>
              <div class="space-y-2">
                <div
                  v-for="professor in selectedSpecialty.professors"
                  :key="professor.id"
                  class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {{ professor.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ professor.name }}</p>
                    <p class="text-sm text-gray-600">{{ professor.experience }} años de experiencia</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Botones de acción -->
            <div class="flex gap-3 pt-4 border-t border-gray-200">
              <button
                @click="selectedSpecialty = null"
                class="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              <button
                v-if="authStore.user?.role === 'patient'"
                @click="requestAppointment(selectedSpecialty)"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Solicitar Cita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DE LA PÁGINA DE ESPECIALIDADES
 * 
 * Esta página maneja:
 * - Visualización de especialidades odontológicas
 * - Filtrado y búsqueda de especialidades
 * - Detalles de cada especialidad
 * - Solicitud de citas (para pacientes)
 */

// Importar hooks de Vue
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// Importar store de autenticación
import { useAuthStore } from '../../stores/auth'
// Importar iconos
import { 
  Search, Clock, Users, GraduationCap, X, Stethoscope, 
  Heart, Scissors, Smile, Baby, Shield, Activity 
} from 'lucide-vue-next'

// Obtener instancias
const router = useRouter()
const authStore = useAuthStore()

/**
 * ESTADO REACTIVO DEL COMPONENTE
 * 
 * Variables que controlan el estado de la página
 */

// Filtros
const searchQuery = ref('')
const selectedCategory = ref('')

// Modal de detalles
const selectedSpecialty = ref(null)

/**
 * DATOS DE ESPECIALIDADES
 * 
 * Información completa sobre las especialidades disponibles
 */
const specialties = ref([
  {
    id: 1,
    name: 'Endodoncia',
    category: 'Restaurativa',
    categoryColor: 'bg-blue-100 text-blue-800',
    description: 'Tratamiento de la pulpa dental y tejidos periapicales para preservar los dientes naturales.',
    detailedDescription: 'La endodoncia se especializa en el diagnóstico y tratamiento de enfermedades de la pulpa dental y los tejidos que rodean las raíces de los dientes. Nuestros especialistas utilizan técnicas avanzadas para salvar dientes que de otra manera requerirían extracción.',
    duration: '1-2 horas',
    professorsCount: 3,
    studentsCount: 12,
    icon: Activity,
    iconColor: 'text-red-600',
    procedures: [
      'Tratamiento de conducto',
      'Pulpotomía',
      'Apicectomía',
      'Retratamiento endodóntico',
      'Blanqueamiento interno',
      'Obturación de conductos'
    ],
    professors: [
      { id: 1, name: 'Dr. María González', experience: 15 },
      { id: 2, name: 'Dr. Carlos Ruiz', experience: 12 },
      { id: 3, name: 'Dra. Ana López', experience: 8 }
    ]
  },
  {
    id: 2,
    name: 'Ortodoncia',
    category: 'Estética',
    categoryColor: 'bg-purple-100 text-purple-800',
    description: 'Corrección de malposiciones dentales y problemas de mordida para mejorar función y estética.',
    detailedDescription: 'La ortodoncia se encarga de la prevención, diagnóstico y tratamiento de las irregularidades dentofaciales. Utilizamos aparatos fijos y removibles para corregir la posición de los dientes y mejorar la función masticatoria.',
    duration: '12-24 meses',
    professorsCount: 2,
    studentsCount: 8,
    icon: Smile,
    iconColor: 'text-purple-600',
    procedures: [
      'Brackets metálicos',
      'Brackets estéticos',
      'Ortodoncia invisible',
      'Aparatos removibles',
      'Retención ortodóntica',
      'Ortopedia maxilar'
    ],
    professors: [
      { id: 4, name: 'Dr. Luis Hernández', experience: 20 },
      { id: 5, name: 'Dra. Elena Morales', experience: 10 }
    ]
  },
  {
    id: 3,
    name: 'Cirugía Oral',
    category: 'Quirúrgica',
    categoryColor: 'bg-red-100 text-red-800',
    description: 'Procedimientos quirúrgicos especializados en la cavidad oral y estructuras relacionadas.',
    detailedDescription: 'La cirugía oral abarca todos los procedimientos quirúrgicos realizados en la boca, desde extracciones simples hasta cirugías complejas de implantes y reconstrucción maxilofacial.',
    duration: '30 min - 3 horas',
    professorsCount: 2,
    studentsCount: 6,
    icon: Scissors,
    iconColor: 'text-red-600',
    procedures: [
      'Extracciones simples',
      'Extracciones complejas',
      'Implantes dentales',
      'Cirugía de cordales',
      'Biopsia oral',
      'Frenectomía'
    ],
    professors: [
      { id: 6, name: 'Dr. Miguel Sánchez', experience: 18 },
      { id: 7, name: 'Dr. Roberto Castro', experience: 14 }
    ]
  },
  {
    id: 4,
    name: 'Odontopediatría',
    category: 'Pediátrica',
    categoryColor: 'bg-green-100 text-green-800',
    description: 'Atención dental especializada para bebés, niños y adolescentes.',
    detailedDescription: 'La odontopediatría se dedica al cuidado oral de los niños desde la infancia hasta la adolescencia. Nuestros especialistas están entrenados para manejar las necesidades únicas de los pacientes pediátricos.',
    duration: '30-60 minutos',
    professorsCount: 2,
    studentsCount: 10,
    icon: Baby,
    iconColor: 'text-green-600',
    procedures: [
      'Limpieza dental pediátrica',
      'Aplicación de flúor',
      'Selladores de fosas',
      'Pulpotomía en dientes temporales',
      'Coronas pediátricas',
      'Manejo de conducta'
    ],
    professors: [
      { id: 8, name: 'Dra. Patricia Vega', experience: 12 },
      { id: 9, name: 'Dr. Fernando Díaz', experience: 9 }
    ]
  },
  {
    id: 5,
    name: 'Periodoncia',
    category: 'Preventiva',
    categoryColor: 'bg-yellow-100 text-yellow-800',
    description: 'Tratamiento de enfermedades de las encías y estructuras de soporte dental.',
    detailedDescription: 'La periodoncia se especializa en la prevención, diagnóstico y tratamiento de enfermedades que afectan las encías y el hueso que soporta los dientes.',
    duration: '45-90 minutos',
    professorsCount: 2,
    studentsCount: 8,
    icon: Shield,
    iconColor: 'text-yellow-600',
    procedures: [
      'Limpieza profunda',
      'Raspado y alisado radicular',
      'Cirugía periodontal',
      'Injertos de encía',
      'Regeneración ósea',
      'Mantenimiento periodontal'
    ],
    professors: [
      { id: 10, name: 'Dr. Andrés Moreno', experience: 16 },
      { id: 11, name: 'Dra. Carmen Silva', experience: 11 }
    ]
  },
  {
    id: 6,
    name: 'Prostodoncia',
    category: 'Restaurativa',
    categoryColor: 'bg-blue-100 text-blue-800',
    description: 'Rehabilitación oral mediante prótesis dentales fijas y removibles.',
    detailedDescription: 'La prostodoncia se encarga de la rehabilitación oral mediante la reposición de dientes perdidos con prótesis dentales, mejorando la función masticatoria y la estética.',
    duration: '1-3 horas',
    professorsCount: 2,
    studentsCount: 7,
    icon: Heart,
    iconColor: 'text-blue-600',
    procedures: [
      'Coronas individuales',
      'Puentes fijos',
      'Prótesis parciales',
      'Prótesis totales',
      'Prótesis sobre implantes',
      'Rehabilitación oral completa'
    ],
    professors: [
      { id: 12, name: 'Dr. José Ramírez', experience: 22 },
      { id: 13, name: 'Dra. Lucía Torres', experience: 13 }
    ]
  }
])

/**
 * COMPUTED PROPERTIES
 * 
 * Propiedades calculadas que se actualizan automáticamente
 */

// Especialidades filtradas
const filteredSpecialties = computed(() => {
  let filtered = specialties.value
  
  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(specialty => 
      specialty.name.toLowerCase().includes(query) ||
      specialty.description.toLowerCase().includes(query) ||
      specialty.procedures.some(proc => proc.toLowerCase().includes(query))
    )
  }
  
  // Filtrar por categoría
  if (selectedCategory.value) {
    filtered = filtered.filter(specialty => 
      specialty.category.toLowerCase() === selectedCategory.value
    )
  }
  
  return filtered
})

/**
 * MÉTODOS DEL COMPONENTE
 * 
 * Funciones que manejan la lógica de la página
 */

/**
 * MOSTRAR DETALLES DE ESPECIALIDAD
 * 
 * Abre el modal con información detallada de la especialidad
 */
const showSpecialtyDetails = (specialty) => {
  selectedSpecialty.value = specialty
}

/**
 * SOLICITAR CITA
 * 
 * Redirige al formulario de solicitud de cita para la especialidad seleccionada
 */
const requestAppointment = (specialty) => {
  // Cerrar modal si está abierto
  selectedSpecialty.value = null
  
  // Redirigir a la página de reserva de citas con la especialidad preseleccionada
  router.push({
    name: 'BookAppointment',
    query: { specialty: specialty.id }
  })
}
</script>
