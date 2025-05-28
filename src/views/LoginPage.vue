<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex">
    <!-- Left side - Login Form -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <UleamBranding variant="full" />
          <h2 class="mt-6 text-3xl font-bold text-green-800">Iniciar Sesión</h2>
          <p class="mt-2 text-sm text-green-600">Accede a la plataforma de la Clínica Dental Universitaria</p>
        </div>

        <div class="border border-green-200 shadow-lg rounded-lg bg-white">
          <div class="p-6">
            <h3 class="text-center text-green-800 text-lg font-semibold mb-2">Bienvenido</h3>
            <p class="text-center text-green-600 text-sm mb-6">Ingresa tus credenciales para continuar</p>
            
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3 flex items-center gap-2">
                <AlertCircle class="h-4 w-4 text-red-600" />
                <span class="text-red-700 text-sm">{{ error }}</span>
              </div>
              
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  placeholder="correo@ejemplo.com"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  v-model="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
              >
                {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
              </button>
            </form>
            
            <div class="mt-4 text-center">
              <p class="text-sm text-green-600">
                ¿No tienes una cuenta?
                <router-link to="/register" class="text-green-600 hover:underline">Regístrate</router-link>
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-green-200">
              <p class="text-sm font-medium mb-2 text-green-800">Credenciales de prueba:</p>
              <div class="text-xs text-green-600 space-y-1">
                <p><strong>Paciente:</strong> paciente@clinica.com / paciente</p>
                <p><strong>Estudiante:</strong> estudiante@clinica.com / estudiante</p>
                <p><strong>Profesor:</strong> profesor@clinica.com / profesor</p>
                <p><strong>Admin:</strong> admin@clinica.com / admin</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Demo Credentials -->
        <div class="border border-blue-200 bg-blue-50 rounded-lg">
          <div class="p-4">
            <h4 class="text-sm text-blue-800 font-semibold mb-3">Credenciales de Demostración</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
                <div class="flex items-center gap-2">
                  <Users class="h-4 w-4 text-blue-600" />
                  <span class="text-sm font-medium text-gray-800">Paciente</span>
                </div>
                <span class="bg-blue-100 text-blue-700 border border-blue-300 px-2 py-1 rounded text-xs">paciente@clinica.com</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-white rounded border border-green-200">
                <div class="flex items-center gap-2">
                  <GraduationCap class="h-4 w-4 text-green-600" />
                  <span class="text-sm font-medium text-gray-800">Estudiante</span>
                </div>
                <span class="bg-green-100 text-green-700 border border-green-300 px-2 py-1 rounded text-xs">estudiante@clinica.com</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-white rounded border border-yellow-200">
                <div class="flex items-center gap-2">
                  <Stethoscope class="h-4 w-4 text-yellow-600" />
                  <span class="text-sm font-medium text-gray-800">Profesor</span>
                </div>
                <span class="bg-yellow-100 text-yellow-700 border border-yellow-300 px-2 py-1 rounded text-xs">profesor@clinica.com</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-white rounded border border-red-200">
                <div class="flex items-center gap-2">
                  <Shield class="h-4 w-4 text-red-600" />
                  <span class="text-sm font-medium text-gray-800">Admin</span>
                </div>
                <span class="bg-red-100 text-red-700 border border-red-300 px-2 py-1 rounded text-xs">admin@clinica.com</span>
              </div>
            </div>
            <p class="text-xs text-blue-700 text-center mt-3">
              Contraseña para todas las cuentas: <strong>demo123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Information -->
    <div class="hidden lg:flex flex-1 bg-gradient-to-br from-green-600 to-green-700 text-white p-8 items-center justify-center">
      <div class="max-w-lg space-y-8">
        <div class="text-center">
          <Heart class="h-16 w-16 mx-auto mb-4 text-white" />
          <h3 class="text-2xl font-bold mb-4">Clínica Dental Universitaria ULEAM</h3>
          <p class="text-green-100 leading-relaxed">
            Plataforma integral para la gestión de la clínica dental universitaria, conectando estudiantes,
            profesores, pacientes y administradores.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <CheckCircle class="h-5 w-5 text-green-200" />
            <span class="text-green-100">Servicios odontológicos gratuitos</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle class="h-5 w-5 text-green-200" />
            <span class="text-green-100">Atención supervisada por especialistas</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle class="h-5 w-5 text-green-200" />
            <span class="text-green-100">Tecnología de última generación</span>
          </div>
          <div class="flex items-center gap-3">
            <CheckCircle class="h-5 w-5 text-green-200" />
            <span class="text-green-100">Formación práctica de excelencia</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 pt-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-white">4</div>
            <div class="text-sm text-green-200">Especialidades</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-white">100%</div>
            <div class="text-sm text-green-200">Gratuito</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import UleamBranding from '../components/UleamBranding.vue'
import { AlertCircle, Users, GraduationCap, Stethoscope, Shield, Heart, CheckCircle } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await authStore.login(email.value, password.value)
    
    if (result.success) {
      // Redirect based on role
      let redirectPath = '/dashboard'
      switch (result.user.role) {
        case 'patient':
          redirectPath = '/dashboard/my-appointments'
          break
        case 'student':
          redirectPath = '/dashboard/patients'
          break
        case 'professor':
          redirectPath = '/dashboard/specialty'
          break
        case 'admin':
          redirectPath = '/dashboard/admin/users'
          break
      }
      router.push(redirectPath)
    } else {
      error.value = result.message
    }
  } catch (err) {
    error.value = 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>
