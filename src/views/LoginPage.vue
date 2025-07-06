<!--
  PÁGINA DE LOGIN
  
  Esta página permite a los usuarios autenticarse en el sistema.
  Incluye formulario de login y credenciales de demostración.
-->
<template>
  <!-- Contenedor principal con diseño de dos columnas -->
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex">
    
    <!-- COLUMNA IZQUIERDA: Formulario de Login -->
    <div class="flex-1 flex items-center justify-center p-4 sm:p-8">
      <div class="w-full max-w-md space-y-8">
        
        <!-- HEADER DEL FORMULARIO -->
        <div class="text-center">
          <UleamBranding variant="full" />
          <h2 class="mt-6 text-3xl font-bold text-green-800">Iniciar Sesión</h2>
          <p class="mt-2 text-sm text-green-600">Accede a la plataforma de la Clínica Dental Universitaria</p>
        </div>

        <!-- TARJETA DEL FORMULARIO -->
        <div class="border border-green-200 shadow-lg rounded-lg bg-white">
          <div class="p-6">
            <h3 class="text-center text-green-800 text-lg font-semibold mb-2">Bienvenido</h3>
            <p class="text-center text-green-600 text-sm mb-6">Ingresa tus credenciales para continuar</p>
            
            <!-- FORMULARIO DE LOGIN -->
            <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
              
              <!-- MENSAJE DE ERROR GLOBAL -->
              <div 
                v-if="formError" 
                class="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2"
                role="alert"
                aria-live="polite"
              >
                <AlertCircle class="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span class="text-red-700 text-sm">{{ formError }}</span>
              </div>
              
              <!-- CAMPO EMAIL -->
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  :class="[
                    'w-full px-3 py-2 border rounded-md shadow-sm transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500',
                    errors.email 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  ]"
                  placeholder="correo@ejemplo.com"
                  autocomplete="email"
                  required
                  :disabled="loading"
                  @blur="validateField('email')"
                  @input="clearFieldError('email')"
                />
                <p v-if="errors.email" class="text-red-600 text-xs mt-1" role="alert">
                  {{ errors.email }}
                </p>
              </div>
              
              <!-- CAMPO CONTRASEÑA -->
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <div class="relative">
                  <input
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.password"
                    :class="[
                      'w-full px-3 py-2 pr-10 border rounded-md shadow-sm transition-colors',
                      'focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500',
                      errors.password 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    ]"
                    placeholder="Ingresa tu contraseña"
                    autocomplete="current-password"
                    required
                    :disabled="loading"
                    @blur="validateField('password')"
                    @input="clearFieldError('password')"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    :disabled="loading"
                  >
                    <Eye v-if="!showPassword" class="h-4 w-4" />
                    <EyeOff v-else class="h-4 w-4" />
                  </button>
                </div>
                <p v-if="errors.password" class="text-red-600 text-xs mt-1" role="alert">
                  {{ errors.password }}
                </p>
              </div>

              <!-- CHECKBOX RECORDARME -->
              <div class="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  v-model="form.rememberMe"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  :disabled="loading"
                />
                <label for="rememberMe" class="ml-2 block text-sm text-gray-900">Recordarme por 7 días</label>
              </div>
              
              <!-- BOTÓN DE SUBMIT -->
              <button
                type="submit"
                :disabled="loading || !isFormValid"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                <LoadingSpinner v-if="loading" size="small" color="white" class="mr-2" />
                {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
              </button>
            </form>
            
            <!-- ENLACE A REGISTRO -->
            <div class="mt-4 text-center">
              <p class="text-sm text-green-600">
                ¿No tienes una cuenta?
                <router-link to="/register" class="text-green-600 hover:underline">Regístrate</router-link>
              </p>
            </div>

            <!-- CREDENCIALES DE PRUEBA -->
            <div class="mt-6 pt-4 border-t border-green-200">
              <p class="text-sm font-medium mb-2 text-green-800">Credenciales de prueba:</p>
              <div class="space-y-2">
                <!-- CREDENCIAL PACIENTE -->
                <button
                  @click="fillCredentials('paciente@clinica.com', 'demo123')"
                  :disabled="loading"
                  class="w-full flex items-center justify-between p-2 bg-white rounded border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div class="flex items-center gap-2">
                    <Users class="h-4 w-4 text-blue-600" />
                    <span class="text-sm font-medium text-gray-800">Paciente</span>
                  </div>
                  <span class="bg-blue-100 text-blue-700 border border-blue-300 px-2 py-1 rounded text-xs">Ana López</span>
                </button>
                
                <!-- CREDENCIAL ESTUDIANTE -->
                <button
                  @click="fillCredentials('estudiante@clinica.com', 'demo123')"
                  :disabled="loading"
                  class="w-full flex items-center justify-between p-2 bg-white rounded border border-green-200 hover:border-green-300 hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div class="flex items-center gap-2">
                    <GraduationCap class="h-4 w-4 text-green-600" />
                    <span class="text-sm font-medium text-gray-800">Estudiante</span>
                  </div>
                  <span class="bg-green-100 text-green-700 border border-green-300 px-2 py-1 rounded text-xs">Juan Pérez</span>
                </button>
                
                <!-- CREDENCIAL PROFESOR -->
                <button
                  @click="fillCredentials('profesor@clinica.com', 'demo123')"
                  :disabled="loading"
                  class="w-full flex items-center justify-between p-2 bg-white rounded border border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div class="flex items-center gap-2">
                    <Stethoscope class="h-4 w-4 text-purple-600" />
                    <span class="text-sm font-medium text-gray-800">Profesor</span>
                  </div>
                  <span class="bg-purple-100 text-purple-700 border border-purple-300 px-2 py-1 rounded text-xs">Dra. González</span>
                </button>
                
                <!-- CREDENCIAL ADMIN -->
                <button
                  @click="fillCredentials('admin@clinica.com', 'demo123')"
                  :disabled="loading"
                  class="w-full flex items-center justify-between p-2 bg-white rounded border border-red-200 hover:border-red-300 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div class="flex items-center gap-2">
                    <Shield class="h-4 w-4 text-red-600" />
                    <span class="text-sm font-medium text-gray-800">Admin</span>
                  </div>
                  <span class="bg-red-100 text-red-700 border border-red-300 px-2 py-1 rounded text-xs">Dr. Admin</span>
                </button>
              </div>
              <p class="text-xs text-blue-700 text-center mt-3">
                Contraseña para todas las cuentas: <strong>demo123</strong>
              </p>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA: Información de la Clínica -->
        <div class="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-green-700 text-white p-8 items-center justify-center">
          <div class="max-w-lg space-y-8">
            
            <!-- HEADER INFORMATIVO -->
            <div class="text-center">
              <Heart class="h-16 w-16 mx-auto mb-4 text-white" />
              <h3 class="text-2xl font-bold mb-4">Clínica Dental Universitaria ULEAM</h3>
              <p class="text-green-100 leading-relaxed">
                Plataforma integral para la gestión de la clínica dental universitaria, conectando estudiantes,
                profesores, pacientes y administradores en un ecosistema digital moderno y eficiente.
              </p>
            </div>

            <!-- CARACTERÍSTICAS -->
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <CheckCircle class="h-5 w-5 text-green-200 flex-shrink-0" />
                <span class="text-green-100">Servicios odontológicos gratuitos de calidad</span>
              </div>
              <div class="flex items-center gap-3">
                <CheckCircle class="h-5 w-5 text-green-200 flex-shrink-0" />
                <span class="text-green-100">Atención supervisada por especialistas certificados</span>
              </div>
              <div class="flex items-center gap-3">
                <CheckCircle class="h-5 w-5 text-green-200 flex-shrink-0" />
                <span class="text-green-100">Tecnología de última generación</span>
              </div>
              <div class="flex items-center gap-3">
                <CheckCircle class="h-5 w-5 text-green-200 flex-shrink-0" />
                <span class="text-green-100">Formación práctica de excelencia académica</span>
              </div>
              <div class="flex items-center gap-3">
                <CheckCircle class="h-5 w-5 text-green-200 flex-shrink-0" />
                <span class="text-green-100">Sistema de gestión digital integrado</span>
              </div>
            </div>

            <!-- ESTADÍSTICAS -->
            <div class="grid grid-cols-2 gap-4 pt-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-white">6</div>
                <div class="text-sm text-green-200">Especialidades</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">100%</div>
                <div class="text-sm text-green-200">Gratuito</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">15+</div>
                <div class="text-sm text-green-200">Años de experiencia</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">500+</div>
                <div class="text-sm text-green-200">Pacientes atendidos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * LÓGICA DE LA PÁGINA DE LOGIN
 * 
 * Maneja la autenticación del usuario y redirección según el rol
 */

// Importar hooks de Vue
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Importar store de autenticación
import { useAuthStore } from '@/stores/auth'
// Importar componentes
import UleamBranding from '@/components/UleamBranding.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Importar iconos
import { 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Info,
  Users, 
  GraduationCap, 
  Stethoscope, 
  Shield, 
  Heart, 
  CheckCircle 
} from 'lucide-vue-next'

// Importar tipos y utilidades
import type { LoginCredentials } from '@/types'
import { isValidEmail, isValidPassword } from '@/utils/helpers'
import { ERROR_MESSAGES } from '@/utils/constants'

// Obtener instancias del router y store
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

/**
 * ESTADO REACTIVO DEL FORMULARIO
 * 
 * Variables que almacenan los datos del formulario y estado de la UI
 */
const form = ref<LoginCredentials>({
  email: '',           // Email ingresado por el usuario
  password: '',        // Contraseña ingresada por el usuario
  rememberMe: false   // Checkbox para recordar la sesión
})

const errors = ref<Record<string, string>>({})
const formError = ref<string>('')
const showPassword = ref<boolean>(false)
const loading = ref<boolean>(false)

/**
 * PROPIEDADES COMPUTADAS
 * 
 * Determina si el formulario es válido basado en los campos y errores
 */
const isFormValid = computed(() => {
  return form.value.email.length > 0 && 
         form.value.password.length > 0 && 
         Object.keys(errors.value).length === 0
})

/**
 * MÉTODOS DE VALIDACIÓN
 * 
 * Valida campos individuales y el formulario completo
 */
const validateField = (field: keyof LoginCredentials): void => {
  switch (field) {
    case 'email':
      if (!form.value.email) {
        errors.value.email = 'El email es requerido'
      } else if (!isValidEmail(form.value.email)) {
        errors.value.email = 'El email no es válido'
      } else {
        delete errors.value.email
      }
      break
      
    case 'password':
      if (!form.value.password) {
        errors.value.password = 'La contraseña es requerida'
      } else if (!isValidPassword(form.value.password)) {
        errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
      } else {
        delete errors.value.password
      }
      break
  }
}

const validateForm = (): boolean => {
  validateField('email')
  validateField('password')
  return Object.keys(errors.value).length === 0
}

const clearFieldError = (field: string): void => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
  if (formError.value) {
    formError.value = ''
  }
}

/**
 * MÉTODOS DE FORMULARIO
 * 
 * Llena las credenciales de prueba y maneja el submit del formulario
 */
const fillCredentials = (email: string, password: string): void => {
  form.value.email = email
  form.value.password = password
  
  // Limpiar errores
  errors.value = {}
  formError.value = ''
  
  // Validar campos automáticamente
  validateField('email')
  validateField('password')
}

const handleSubmit = async (): Promise<void> => {
  // Activar estado de carga
  loading.value = true
  // Limpiar errores previos
  formError.value = ''
  
  // Validar formulario
  if (!validateForm()) {
    formError.value = 'Por favor, corrige los errores en el formulario'
    loading.value = false
    return
  }

  try {
    // Intentar hacer login usando el store de autenticación
    const result = await authStore.login(form.value)
    
    if (result.success && result.user) {
      /**
       * LOGIN EXITOSO - REDIRIGIR SEGÚN ROL
       * 
       * Cada rol tiene una página de destino diferente
       * para optimizar la experiencia del usuario
       */
      let redirectPath = getRedirectPath(result.user.role)
      
      // Verificar si hay una URL de redirección en los query params
      const redirectTo = route.query.redirect as string
      const finalRedirect = redirectTo || redirectPath
      
      // Realizar la redirección
      await router.push(finalRedirect)
    } else {
      // Mostrar mensaje de error si el login falló
      formError.value = result.message || ERROR_MESSAGES.INVALID_CREDENTIALS
    }
  } catch (err) {
    // Manejar errores inesperados
    formError.value = ERROR_MESSAGES.SERVER_ERROR
  } finally {
    // Desactivar estado de carga
    loading.value = false
  }
}

/**
 * FUNCIÓN PARA OBTENER RUTA DE REDIRECCIÓN SEGÚN ROL
 */
const getRedirectPath = (role: string): string => {
  switch (role) {
    case 'patient':
      return '/dashboard/my-appointments'
    case 'student':
      return '/dashboard/patients'
    case 'professor':
      return '/dashboard/teacher'
    case 'admin':
      return '/dashboard/admin'
    default:
      return '/dashboard'
  }
}

/**
 * MANEJO DE EVENTOS DE TECLADO
 */
const handleKeydown = (event: KeyboardEvent): void => {
  // Enviar formulario con Enter si es válido
  if (event.key === 'Enter' && isFormValid.value && !loading.value) {
    handleSubmit()
  }
}

/**
 * LIFECYCLE HOOKS
 */
onMounted(() => {
  // Agregar listener para eventos de teclado
  document.addEventListener('keydown', handleKeydown)
  
  // Si el usuario ya está autenticado, redirigir
  if (authStore.isAuthenticated) {
    const redirectPath = getRedirectPath(authStore.userRole || 'patient')
    router.push(redirectPath)
  }
  
  // Focus en el campo email
  const emailInput = document.getElementById('email')
  if (emailInput) {
    emailInput.focus()
  }
})

onUnmounted(() => {
  // Limpiar listener
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Animación para los botones de credenciales */
button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease-in-out;
}

button:active {
  transform: translateY(0);
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
