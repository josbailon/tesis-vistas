<!--
  PÁGINA DE PERFIL DE USUARIO
  
  Esta página permite a los usuarios ver y editar su información personal.
  Se adapta según el rol del usuario para mostrar campos relevantes.
-->
<template>
  <div class="space-y-6">
    
    <!-- HEADER DE LA PÁGINA -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        <p class="text-gray-600 mt-2">
          Gestiona tu información personal y configuración de cuenta
        </p>
      </div>
      
      <!-- BOTÓN DE EDITAR -->
      <button
        @click="toggleEditMode"
        :class="`px-4 py-2 rounded-md transition-colors ${
          isEditing 
            ? 'bg-gray-600 hover:bg-gray-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`"
      >
        {{ isEditing ? 'Cancelar' : 'Editar Perfil' }}
      </button>
    </div>

    <!-- TARJETA DE INFORMACIÓN PERSONAL -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <User class="h-5 w-5 text-blue-600" />
          Información Personal
        </h2>
      </div>
      
      <div class="p-6">
        <form @submit.prevent="handleSaveProfile" class="space-y-6">
          
          <!-- AVATAR Y NOMBRE -->
          <div class="flex items-center gap-6">
            <!-- Avatar -->
            <div class="relative">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {{ profileData.name.charAt(0).toUpperCase() }}
              </div>
              <button
                v-if="isEditing"
                type="button"
                class="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
              >
                <Camera class="h-4 w-4" />
              </button>
            </div>
            
            <!-- Información básica -->
            <div class="flex-1">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    v-model="profileData.name"
                    :disabled="!isEditing"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    v-model="profileData.email"
                    :disabled="!isEditing"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- INFORMACIÓN DE CONTACTO -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                v-model="profileData.phone"
                :disabled="!isEditing"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento
              </label>
              <input
                v-model="profileData.birthDate"
                :disabled="!isEditing"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <!-- DIRECCIÓN -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <textarea
              v-model="profileData.address"
              :disabled="!isEditing"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            ></textarea>
          </div>

          <!-- INFORMACIÓN ESPECÍFICA POR ROL -->
          <div v-if="authStore.user?.role === 'student'" class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Académica</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Número de Matrícula
                </label>
                <input
                  v-model="profileData.studentId"
                  disabled
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Semestre Actual
                </label>
                <input
                  v-model="profileData.currentSemester"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>

          <div v-if="authStore.user?.role === 'professor'" class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Profesional</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Especialidad
                </label>
                <input
                  v-model="profileData.specialty"
                  :disabled="!isEditing"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Años de Experiencia
                </label>
                <input
                  v-model="profileData.experience"
                  :disabled="!isEditing"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>

          <!-- BOTONES DE ACCIÓN -->
          <div v-if="isEditing" class="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="cancelEdit"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
            >
              {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- TARJETA DE SEGURIDAD -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Shield class="h-5 w-5 text-green-600" />
          Seguridad de la Cuenta
        </h2>
      </div>
      
      <div class="p-6 space-y-4">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 class="font-medium text-gray-900">Cambiar Contraseña</h3>
            <p class="text-sm text-gray-600">Actualiza tu contraseña regularmente para mayor seguridad</p>
          </div>
          <button
            @click="showChangePassword = true"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
          >
            Cambiar
          </button>
        </div>
        
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 class="font-medium text-gray-900">Autenticación de Dos Factores</h3>
            <p class="text-sm text-gray-600">Agrega una capa extra de seguridad a tu cuenta</p>
          </div>
          <button
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Configurar
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL CAMBIAR CONTRASEÑA -->
    <div v-if="showChangePassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Cambiar Contraseña</h3>
        
        <form @submit.prevent="handleChangePassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Contraseña Actual
            </label>
            <input
              v-model="passwordData.current"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nueva Contraseña
            </label>
            <input
              v-model="passwordData.new"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Nueva Contraseña
            </label>
            <input
              v-model="passwordData.confirm"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="cancelChangePassword"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DE LA PÁGINA DE PERFIL
 * 
 * Esta página maneja:
 * - Visualización y edición de información personal
 * - Campos específicos según el rol del usuario
 * - Cambio de contraseña
 * - Configuración de seguridad
 */

// Importar hooks de Vue
import { ref, reactive, onMounted } from 'vue'
// Importar store de autenticación
import { useAuthStore } from '../../stores/auth'
// Importar iconos
import { User, Shield, Camera } from 'lucide-vue-next'

// Obtener store de autenticación
const authStore = useAuthStore()

/**
 * ESTADO REACTIVO DEL COMPONENTE
 * 
 * Variables que controlan el estado de la página
 */

// Estado de edición
const isEditing = ref(false)
const saving = ref(false)

// Modal de cambio de contraseña
const showChangePassword = ref(false)

// Datos del perfil
const profileData = reactive({
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  address: '',
  // Campos específicos por rol
  studentId: '',
  currentSemester: '',
  specialty: '',
  experience: ''
})

// Datos originales para cancelar edición
const originalProfileData = reactive({})

// Datos para cambio de contraseña
const passwordData = reactive({
  current: '',
  new: '',
  confirm: ''
})

/**
 * MÉTODOS DEL COMPONENTE
 * 
 * Funciones que manejan la lógica de la página
 */

/**
 * ALTERNAR MODO DE EDICIÓN
 * 
 * Activa o desactiva el modo de edición del perfil
 */
const toggleEditMode = () => {
  if (isEditing.value) {
    cancelEdit()
  } else {
    // Guardar datos originales para poder cancelar
    Object.assign(originalProfileData, profileData)
    isEditing.value = true
  }
}

/**
 * CANCELAR EDICIÓN
 * 
 * Restaura los datos originales y sale del modo de edición
 */
const cancelEdit = () => {
  // Restaurar datos originales
  Object.assign(profileData, originalProfileData)
  isEditing.value = false
}

/**
 * MANEJAR GUARDADO DE PERFIL
 * 
 * Guarda los cambios realizados en el perfil
 */
const handleSaveProfile = async () => {
  saving.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Actualizar datos en el store de autenticación
    if (authStore.user) {
      authStore.user.name = profileData.name
      authStore.user.email = profileData.email
      
      // Persistir cambios en localStorage
      localStorage.setItem('dental_clinic_user', JSON.stringify(authStore.user))
    }
    
    // Salir del modo de edición
    isEditing.value = false
    
    alert('Perfil actualizado exitosamente')
    
  } catch (error) {
    console.error('Error al guardar perfil:', error)
    alert('Error al guardar los cambios')
  } finally {
    saving.value = false
  }
}

/**
 * MANEJAR CAMBIO DE CONTRASEÑA
 * 
 * Procesa el cambio de contraseña del usuario
 */
const handleChangePassword = async () => {
  // Validar que las contraseñas coincidan
  if (passwordData.new !== passwordData.confirm) {
    alert('Las contraseñas no coinciden')
    return
  }
  
  // Validar longitud mínima
  if (passwordData.new.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres')
    return
  }
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Limpiar formulario
    passwordData.current = ''
    passwordData.new = ''
    passwordData.confirm = ''
    
    // Cerrar modal
    showChangePassword.value = false
    
    alert('Contraseña cambiada exitosamente')
    
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
    alert('Error al cambiar la contraseña')
  }
}

/**
 * CANCELAR CAMBIO DE CONTRASEÑA
 * 
 * Cierra el modal y limpia el formulario
 */
const cancelChangePassword = () => {
  passwordData.current = ''
  passwordData.new = ''
  passwordData.confirm = ''
  showChangePassword.value = false
}

/**
 * CARGAR DATOS DEL PERFIL
 * 
 * Carga los datos del perfil desde el store o API
 */
const loadProfileData = () => {
  if (authStore.user) {
    // Cargar datos básicos del usuario
    profileData.name = authStore.user.name || ''
    profileData.email = authStore.user.email || ''
    
    // Datos de ejemplo adicionales
    profileData.phone = '0987654321'
    profileData.birthDate = '1995-06-15'
    profileData.address = 'Av. Principal 123, Manta, Ecuador'
    
    // Datos específicos por rol
    if (authStore.user.role === 'student') {
      profileData.studentId = 'EST2024001'
      profileData.currentSemester = '8vo Semestre'
    } else if (authStore.user.role === 'professor') {
      profileData.specialty = authStore.user.specialty || 'Odontología General'
      profileData.experience = '10'
    }
    
    // Guardar copia original
    Object.assign(originalProfileData, profileData)
  }
}

/**
 * INICIALIZACIÓN DEL COMPONENTE
 * 
 * Se ejecuta cuando el componente se monta en el DOM
 */
onMounted(() => {
  loadProfileData()
  console.log('Página de perfil inicializada para:', authStore.user?.name)
})
</script>
