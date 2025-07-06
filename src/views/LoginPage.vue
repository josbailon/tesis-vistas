<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="w-full max-w-md">
      <!-- Branding -->
      <div class="text-center mb-8">
        <UleamBranding />
        <h1 class="text-3xl font-bold text-gray-900 mt-4">
          Sistema de Gestión Dental
        </h1>
        <p class="text-gray-600 mt-2">
          Ingresa a tu cuenta para continuar
        </p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :disabled="isLoading"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="tu@email.com"
            />
            <div v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                :disabled="isLoading"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                :disabled="isLoading"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
            <div v-if="errors.password" class="text-red-500 text-sm mt-1">
              {{ errors.password }}
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.rememberMe"
                type="checkbox"
                :disabled="isLoading"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
              />
              <span class="ml-2 text-sm text-gray-600">Recordarme</span>
            </label>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-500 transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <!-- Error Message -->
          <div v-if="errors.general" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-red-700 text-sm">{{ errors.general }}</p>
            </div>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div v-if="isLoading" class="flex items-center justify-center">
              <LoadingSpinner size="sm" class="mr-2" />
              Iniciando sesión...
            </div>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>

        <!-- Quick Access Demo Credentials -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <h3 class="text-sm font-medium text-gray-700 mb-4 text-center">
            Acceso Rápido - Credenciales Demo
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="credential in demoCredentials"
              :key="credential.role"
              @click="fillCredentials(credential)"
              :disabled="isLoading"
              class="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div class="flex items-center">
                <div :class="credential.iconClass" class="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <component :is="credential.icon" class="w-4 h-4 text-white" />
                </div>
                <div>
                  <p class="font-medium text-gray-900 text-sm">{{ credential.name }}</p>
                  <p class="text-xs text-gray-500">{{ credential.role }}</p>
                </div>
              </div>
            </button>
          </div>
          <p class="text-xs text-gray-500 text-center mt-3">
            Haz clic en cualquier rol para llenar automáticamente las credenciales
          </p>
        </div>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            ¿No tienes una cuenta?
            <router-link to="/register" class="text-blue-600 hover:text-blue-500 font-medium transition-colors">
              Regístrate aquí
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { validateEmail, validatePassword } from '@/utils/helpers'
import UleamBranding from '@/components/UleamBranding.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Icons (you can replace these with actual icon components)
const UserIcon = 'div'
const AcademicCapIcon = 'div'
const UserGroupIcon = 'div'
const ClipboardDocumentListIcon = 'div'
const ShieldCheckIcon = 'div'

const router = useRouter()
const authStore = useAuthStore()

// Form state
const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const showPassword = ref(false)
const isLoading = ref(false)

// Validation errors
const errors = ref({
  email: '',
  password: '',
  general: ''
})

// Demo credentials for quick access
const demoCredentials = ref([
  {
    role: 'admin',
    name: 'Administrador',
    email: 'admin@uleam.edu.ec',
    password: 'admin123',
    icon: ShieldCheckIcon,
    iconClass: 'bg-red-500'
  },
  {
    role: 'profesor',
    name: 'Profesor',
    email: 'profesor@uleam.edu.ec',
    password: 'profesor123',
    icon: AcademicCapIcon,
    iconClass: 'bg-purple-500'
  },
  {
    role: 'estudiante',
    name: 'Estudiante',
    email: 'estudiante@uleam.edu.ec',
    password: 'estudiante123',
    icon: UserGroupIcon,
    iconClass: 'bg-green-500'
  },
  {
    role: 'paciente',
    name: 'Paciente',
    email: 'paciente@uleam.edu.ec',
    password: 'paciente123',
    icon: UserIcon,
    iconClass: 'bg-blue-500'
  },
  {
    role: 'secretario',
    name: 'Secretario',
    email: 'secretario@uleam.edu.ec',
    password: 'secretario123',
    icon: ClipboardDocumentListIcon,
    iconClass: 'bg-indigo-500'
  }
])

// Computed properties
const isFormValid = computed(() => {
  return form.value.email.length > 0 && 
         form.value.password.length > 0 && 
         !errors.value.email && 
         !errors.value.password
})

// Methods
const validateForm = () => {
  errors.value = { email: '', password: '', general: '' }
  
  // Validate email
  if (!form.value.email) {
    errors.value.email = 'El correo electrónico es requerido'
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = 'Ingresa un correo electrónico válido'
  }
  
  // Validate password
  if (!form.value.password) {
    errors.value.password = 'La contraseña es requerida'
  } else if (!validatePassword(form.value.password)) {
    errors.value.password = 'La contraseña debe tener al menos 6 caracteres'
  }
  
  return !errors.value.email && !errors.value.password
}

const fillCredentials = (credential: any) => {
  if (isLoading.value) return
  
  form.value.email = credential.email
  form.value.password = credential.password
  
  // Clear any existing errors
  errors.value = { email: '', password: '', general: '' }
  
  // Optional: Auto-submit after a short delay
  setTimeout(() => {
    if (isFormValid.value) {
      handleLogin()
    }
  }, 500)
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  errors.value.general = ''
  
  try {
    const success = await authStore.login({
      email: form.value.email,
      password: form.value.password,
      rememberMe: form.value.rememberMe
    })
    
    if (success) {
      // Redirect based on user role
      const user = authStore.user
      if (user) {
        switch (user.role) {
          case 'admin':
            router.push('/dashboard/admin')
            break
          case 'profesor':
            router.push('/dashboard/professor')
            break
          case 'estudiante':
            router.push('/dashboard/student')
            break
          case 'paciente':
            router.push('/dashboard/patient')
            break
          case 'secretario':
            router.push('/dashboard/secretary')
            break
          default:
            router.push('/dashboard')
        }
      } else {
        router.push('/dashboard')
      }
    } else {
      errors.value.general = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.'
    }
  } catch (error) {
    console.error('Login error:', error)
    errors.value.general = 'Error al iniciar sesión. Por favor, intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}

// Check if user is already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>

<style scoped>
/* Custom animations */
.transform {
  transition: transform 0.2s ease-in-out;
}

/* Focus styles */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Button hover effects */
button:not(:disabled):hover {
  transform: translateY(-1px);
}

button:not(:disabled):active {
  transform: translateY(0);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
