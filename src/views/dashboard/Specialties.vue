<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Especialidades</h1>
      <p class="text-green-600">Conoce nuestras especialidades odontológicas disponibles</p>
    </div>

    <!-- Specialties Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="specialty in specialties" :key="specialty.id" 
           class="bg-white rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow">
        <div class="p-6">
          <div class="flex items-center gap-4 mb-4">
            <div :class="`w-12 h-12 rounded-full flex items-center justify-center ${specialty.color}`">
              <component :is="specialty.icon" class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ specialty.name }}</h3>
              <p class="text-sm text-gray-600">{{ specialty.department }}</p>
            </div>
          </div>
          
          <p class="text-gray-700 mb-4">{{ specialty.description }}</p>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Profesores:</span>
              <span class="font-medium">{{ specialty.professors }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Estudiantes:</span>
              <span class="font-medium">{{ specialty.students }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Duración promedio:</span>
              <span class="font-medium">{{ specialty.duration }}</span>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-200">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Procedimientos:</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="procedure in specialty.procedures" :key="procedure"
                    class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {{ procedure }}
              </span>
            </div>
          </div>
          
          <div class="mt-4">
            <button class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors">
              Ver Más Detalles
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="bg-white rounded-lg border border-green-200 shadow-sm">
      <div class="p-6 border-b border-green-200">
        <h2 class="text-xl font-semibold text-green-800">Estadísticas Generales</h2>
      </div>
      <div class="p-6">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{ stats.totalSpecialties }}</div>
            <div class="text-sm text-gray-600">Especialidades</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ stats.totalProfessors }}</div>
            <div class="text-sm text-gray-600">Profesores</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">{{ stats.totalStudents }}</div>
            <div class="text-sm text-gray-600">Estudiantes</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600">{{ stats.totalProcedures }}</div>
            <div class="text-sm text-gray-600">Procedimientos</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Stethoscope, Heart, Zap, Baby } from 'lucide-vue-next'

const specialties = ref([
  {
    id: 1,
    name: 'Endodoncia',
    department: 'Especialidades Clínicas',
    description: 'Tratamiento de enfermedades de la pulpa dental y tejidos periapicales.',
    professors: 3,
    students: 12,
    duration: '90 min',
    color: 'bg-blue-600',
    icon: Stethoscope,
    procedures: ['Tratamiento de conducto', 'Pulpotomía', 'Apicectomía']
  },
  {
    id: 2,
    name: 'Ortodoncia',
    department: 'Especialidades Clínicas',
    description: 'Corrección de malposiciones dentales y problemas de mordida.',
    professors: 2,
    students: 15,
    duration: '60 min',
    color: 'bg-green-600',
    icon: Heart,
    procedures: ['Brackets', 'Invisalign', 'Retenedores']
  },
  {
    id: 3,
    name: 'Cirugía Oral',
    department: 'Especialidades Quirúrgicas',
    description: 'Procedimientos quirúrgicos en la cavidad oral y estructuras relacionadas.',
    professors: 4,
    students: 8,
    duration: '120 min',
    color: 'bg-red-600',
    icon: Zap,
    procedures: ['Extracciones', 'Implantes', 'Cirugía periodontal']
  },
  {
    id: 4,
    name: 'Odontopediatría',
    department: 'Especialidades Clínicas',
    description: 'Atención dental especializada para niños y adolescentes.',
    professors: 2,
    students: 10,
    duration: '45 min',
    color: 'bg-purple-600',
    icon: Baby,
    procedures: ['Sellantes', 'Fluorización', 'Pulpotomía infantil']
  }
])

const stats = ref({
  totalSpecialties: 4,
  totalProfessors: 11,
  totalStudents: 45,
  totalProcedures: 12
})
</script>
