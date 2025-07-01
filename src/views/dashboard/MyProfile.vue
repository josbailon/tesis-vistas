<!--
  PÁGINA DE PERFIL DE USUARIO
  
  Permite a los usuarios ver y editar su información personal,
  cambiar contraseña y configurar preferencias
-->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
      <p class="text-gray-600">
        Gestiona tu información personal y configuraciones de cuenta
      </p>
    </div>

    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Información Personal -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Información Personal</h2>
        </div>
        <div class="p-6">
          <form @submit.prevent="updateProfile" class="space-y-6">
            <!-- Avatar -->
            <div class="flex items-center space-x-6">
              <div class="relative">
                <img 
                  :src="profileForm.avatar || '/placeholder-user.jpg'" 
                  :alt="profileForm.name"
                  class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                >
                <button 
                  type="button"
                  @click="changeAvatar"
                  class="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ user.name }}</h3>
                <p class="text-gray-500">{{ getRoleDisplayName(user.role) }}</p>
                <p class="text-sm text-gray-400">Miembro desde enero 2024</p>
              </div>
            </div>

            <!-- Campos del formulario -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input 
                  v-model="profileForm.name"
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input 
                  v-model="profileForm.email"
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input 
                  v-model="profileForm.phone"
                  type="tel" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Nacimiento
                </label>
                <input 
                  v-model="profileForm.birthDate"
                  type="date" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>

              <div v-if="user.role === 'professor' || user.role === 'student'" class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Especialidad
                </label>
                <select 
                  v-model="profileForm.specialty"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar especialidad...</option>
                  <option value="Odontología General">Odontología General</option>
                  <option value="Endodoncia">Endodoncia</option>
                  <option value="Ortodoncia">Ortodoncia</option>
                  <option value="Periodoncia">Periodoncia</option>
                  <option value="Cirugía Oral">Cirugía Oral</option>
                  <option value="Odontopediatría">Odontopediatría</option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Biografía
                </label>
                <textarea 
                  v-model="profileForm.bio"
                  rows="4" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cuéntanos un poco sobre ti..."
                ></textarea>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-end space-x-4">
              <button 
                type="button"
                @click="resetForm"
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                :disabled="loading"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Cambiar Contraseña -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Cambiar Contraseña</h2>
        </div>
        <div class="p-6">
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña Actual
              </label>
              <input 
                v-model="passwordForm.current"
                type="password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nueva Contraseña
              </label>
              <input 
                v-model="passwordForm.new"
                type="password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Nueva Contraseña
              </label>
              <input 
                v-model="passwordForm.confirm"
                type="password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
            </div>

            <div class="flex justify-end">
              <button 
                type="submit"
                :disabled="passwordLoading"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {{ passwordLoading ? 'Cambiando...' : 'Cambiar Contraseña' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Estadísticas del Usuario -->
      <div v-if="user.role === 'student' || user.role === 'professor'" class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Estadísticas</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">{{ userStats.totalPatients }}</div>
              <div class="text-gray-600">Pacientes Atendidos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ userStats.completedTreatments }}</div>
              <div class="text-gray-600">Tratamientos Completados</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">{{ userStats.hoursLogged }}</div>
              <div class="text-gray-600">Horas Registradas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL COMPONENTE MI PERFIL
 * 
 * Maneja la edición de información personal, cambio de contraseña
 * y visualización de estadísticas del usuario
 */

import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

// Store de autenticación
const authStore = useAuthStore()
const { user, getRoleDisplayName } = authStore

// Estado reactivo
const loading = ref(false)
const passwordLoading = ref(false)

// Formulario de perfil
const profileForm = reactive({
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  specialty: '',
  bio: '',
  avatar: ''
})

// Formulario de contraseña
const passwordForm = reactive({
  current: '',
  new: '',
  confirm: ''
})

// Estadísticas del usuario
const userStats = ref({
  totalPatients: 0,
  completedTreatments: 0,
  hoursLogged: 0
})

/**
 * Inicializar datos del perfil
 */
onMounted(() => {
  // Cargar datos del usuario actual
  profileForm.name = user.name || ''
  profileForm.email = user.email || ''
  profileForm.specialty = user.specialty || ''
  
  // Datos de ejemplo adicionales
  profileForm.phone = '0987654321'
  profileForm.birthDate = '1995-05-15'
  profileForm.bio = 'Estudiante de odontología comprometido con brindar la mejor atención a los pacientes.'
  
  // Estadísticas de ejemplo
  if (user.role === 'student' || user.role === 'professor') {
    userStats.value = {
      totalPatients: user.role === 'student' ? 15 : 45,
      completedTreatments: user.role === 'student' ? 8 : 32,
      hoursLogged: user.role === 'student' ? 120 : 480
    }
  }
})

/**
 * Actualizar perfil
 */
const updateProfile = async () => {
  loading.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Actualizar datos en el store (simulado)
    console.log('Perfil actualizado:', profileForm)
    
    alert('Perfil actualizado exitosamente')
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    alert('Error al actualizar el perfil')
  } finally {
    loading.value = false
  }
}

/**
 * Cambiar contraseña
 */
const changePassword = async () => {
  // Validar que las contraseñas coincidan
  if (passwordForm.new !== passwordForm.confirm) {
    alert('Las contraseñas no coinciden')
    return
  }
  
  // Validar longitud mínima
  if (passwordForm.new.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres')
    return
  }
  
  passwordLoading.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Contraseña cambiada')
    
    // Limpiar formulario
    passwordForm.current = ''
    passwordForm.new = ''
    passwordForm.confirm = ''
    
    alert('Contraseña cambiada exitosamente')
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
    alert('Error al cambiar la contraseña')
  } finally {
    passwordLoading.value = false
  }
}

/**
 * Cambiar avatar
 */
const changeAvatar = () => {
  // Simular selección de archivo
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // En una aplicación real, aquí se subiría el archivo
      const reader = new FileReader()
      reader.onload = (e) => {
        profileForm.avatar = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  input.click()
}

/**
 * Resetear formulario
 */
const resetForm = () => {
  profileForm.name = user.name || ''
  profileForm.email = user.email || ''
  profileForm.specialty = user.specialty || ''
}
</script>
