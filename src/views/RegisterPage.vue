<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex">
    <!-- Left side - Registration Form -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <UleamBranding variant="full" />
          <h2 class="mt-6 text-3xl font-bold text-green-800">Crear Cuenta</h2>
          <p class="mt-2 text-sm text-green-600">Regístrate en la plataforma de la Clínica Dental Universitaria</p>
        </div>

        <div class="border border-green-200 shadow-lg rounded-lg bg-white">
          <div class="p-6">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3 flex items-center gap-2">
                <AlertCircle class="h-4 w-4 text-red-600" />
                <span class="text-red-700 text-sm">{{ error }}</span>
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="firstName" class="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    id="firstName"
                    type="text"
                    v-model="form.firstName"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div class="space-y-2">
                  <label for="lastName" class="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    id="lastName"
                    type="text"
                    v-model="form.lastName"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div class="space-y-2">
                <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  id="phone"
                  type="tel"
                  v-model="form.phone"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  v-model="form.password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div class="space-y-2">
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                <input
                  id="confirmPassword"
                  type="password"
                  v-model="form.confirmPassword"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div class="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  v-model="form.acceptTerms"
                  required
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="terms" class="ml-2 block text-sm text-gray-900">
                  Acepto los <a href="#" class="text-green-600 hover:underline">términos y condiciones</a>
                </label>
              </div>
              
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {{ loading ? 'Creando cuenta...' : 'Crear Cuenta' }}
              </button>
            </form>
            
            <div class="mt-4 text-center">
              <p class="text-sm text-green-600">
                ¿Ya tienes una cuenta?
                <router-link to="/login" class="text-green-600 hover:underline">Inicia sesión</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Information -->
    <div class="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-green-700 text-white p-8 items-center justify-center">
      <div class="max-w-lg space-y-8">
        <div class="text-center">
          <UserPlus class="h-16 w-16 mx-auto mb-4 text-white" />
          <h3 class="text-2xl font-bold mb-4">Únete a ULEAM</h3>
          <p class="text-green-100 leading-relaxed">
            Regístrate como paciente y accede a servicios odontológicos de calidad con estudiantes supervisados por profesionales.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <CheckCircle class="h-5 w-5 text-green-200" />
            <span class="text-green-100">Atención odontológica gratuita</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle class="h-5 w-5 text-green-200" />
            <span class="text-green-100">Supervisión profesional constante</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle class="h-5 w-5 text-green-200" />
            <span class="text-green-100">Tecnología de vanguardia</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle class="h-5 w-5 text-green-200" />
            <span class="text-green-100">Horarios flexibles</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UleamBranding from '../components/UleamBranding.vue'
import { AlertCircle, UserPlus, CheckCircle } from 'lucide-vue-next'

const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (form.value.password !== form.value.confirmPassword) {
      error.value = 'Las contraseñas no coinciden'
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Cuenta creada exitosamente. Puedes iniciar sesión ahora.')
    router.push('/login')
  } catch (err) {
    error.value = 'Error al crear la cuenta'
  } finally {
    loading.value = false
  }
}
</script>
