<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Mi Perfil</h1>
      <p class="text-green-600">Gestiona tu información personal y configuración de cuenta</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Profile Card -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
          <div class="text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              {{ authStore.user?.name.charAt(0).toUpperCase() }}
            </div>
            <h3 class="text-xl font-semibold text-gray-900">{{ authStore.user?.name }}</h3>
            <p class="text-gray-600">{{ authStore.user?.email }}</p>
            <span :class="`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRoleColor(authStore.user?.role)}`">
              {{ authStore.getRoleDisplayName(authStore.user?.role) }}
            </span>
          </div>
          
          <div class="mt-6 space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Miembro desde</span>
              <span class="font-medium">Enero 2024</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Estado</span>
              <span class="text-green-600 font-medium">Activo</span>
            </div>
            <div v-if="authStore.user?.specialty" class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Especialidad</span>
              <span class="font-medium">{{ authStore.user.specialty }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg border border-green-200 shadow-sm">
          <div class="p-6 border-b border-green-200">
            <h2 class="text-xl font-semibold text-green-800">Información Personal</h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <input
                    id="name"
                    type="text"
                    v-model="profileForm.name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                  <input
                    id="email"
                    type="email"
                    v-model="profileForm.email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    id="phone"
                    type="tel"
                    v-model="profileForm.phone"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label for="birthDate" class="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento</label>
                  <input
                    id="birthDate"
                    type="date"
                    v-model="profileForm.birthDate"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <textarea
                  id="address"
                  v-model="profileForm.address"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="loading"
                  class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
                >
                  {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="bg-white rounded-lg border border-green-200 shadow-sm mt-6">
          <div class="p-6 border-b border-green-200">
            <h2 class="text-xl font-semibold text-green-800">Seguridad</h2>
          </div>
          <div class="p-6">
            <form @submit.prevent="changePassword" class="space-y-6">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">Contraseña Actual</label>
                <input
                  id="currentPassword"
                  type="password"
                  v-model="passwordForm.currentPassword"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
                  <input
                    id="newPassword"
                    type="password"
                    v-model="passwordForm.newPassword"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirmar Contraseña</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    v-model="passwordForm.confirmPassword"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="passwordLoading"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
                >
                  {{ passwordLoading ? 'Cambiando...' : 'Cambiar Contraseña' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const loading = ref(false)
const passwordLoading = ref(false)

const profileForm = ref({
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  address: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const getRoleColor = (role) => {
  switch (role) {
    case 'patient':
      return 'bg-blue-100 text-blue-600 border-blue-300'
    case 'student':
      return 'bg-green-100 text-green-600 border-green-300'
    case 'professor':
      return 'bg-purple-100 text-purple-600 border-purple-300'
    case 'admin':
      return 'bg-red-100 text-red-600 border-red-300'
    default:
      return 'bg-gray-100 text-gray-600 border-gray-300'
  }
}

const updateProfile = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Perfil actualizado exitosamente')
  } catch (error) {
    alert('Error al actualizar el perfil')
  } finally {
    loading.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Las contraseñas no coinciden')
    return
  }

  passwordLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Contraseña cambiada exitosamente')
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error) {
    alert('Error al cambiar la contraseña')
  } finally {
    passwordLoading.value = false
  }
}

onMounted(() => {
  if (authStore.user) {
    profileForm.value.name = authStore.user.name
    profileForm.value.email = authStore.user.email
  }
})
</script>
