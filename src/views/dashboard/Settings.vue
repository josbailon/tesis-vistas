<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Configuración</h1>
      <p class="text-green-600">Personaliza tu experiencia en la plataforma</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Notifications -->
      <div class="bg-white rounded-lg border border-green-200 shadow-sm">
        <div class="p-6 border-b border-green-200">
          <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
            <Bell class="h-5 w-5" />
            Notificaciones
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-gray-900">Recordatorios de citas</h3>
              <p class="text-sm text-gray-600">Recibe notificaciones antes de tus citas</p>
            </div>
            <input
              type="checkbox"
              v-model="settings.notifications.appointments"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-gray-900">Actualizaciones del sistema</h3>
              <p class="text-sm text-gray-600">Notificaciones sobre nuevas funciones</p>
            </div>
            <input
              type="checkbox"
              v-model="settings.notifications.system"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-gray-900">Mensajes</h3>
              <p class="text-sm text-gray-600">Notificaciones de mensajes nuevos</p>
            </div>
            <input
              type="checkbox"
              v-model="settings.notifications.messages"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div class="bg-white rounded-lg border border-green-200 shadow-sm">
        <div class="p-6 border-b border-green-200">
          <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
            <Palette class="h-5 w-5" />
            Apariencia
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tema</label>
            <select
              v-model="settings.appearance.theme"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
            <select
              v-model="settings.appearance.language"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Zona horaria</label>
            <select
              v-model="settings.appearance.timezone"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="America/Guayaquil">Ecuador (GMT-5)</option>
              <option value="America/Bogota">Colombia (GMT-5)</option>
              <option value="America/Lima">Perú (GMT-5)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Privacy -->
      <div class="bg-white rounded-lg border border-green-200 shadow-sm">
        <div class="p-6 border-b border-green-200">
          <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
            <Shield class="h-5 w-5" />
            Privacidad
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-gray-900">Perfil público</h3>
              <p class="text-sm text-gray-600">Permitir que otros vean tu perfil</p>
            </div>
            <input
              type="checkbox"
              v-model="settings.privacy.publicProfile"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium text-gray-900">Compartir datos de uso</h3>
              <p class="text-sm text-gray-600">Ayudar a mejorar la plataforma</p>
            </div>
            <input
              type="checkbox"
              v-model="settings.privacy.shareUsageData"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <!-- Account -->
      <div class="bg-white rounded-lg border border-green-200 shadow-sm">
        <div class="p-6 border-b border-green-200">
          <h2 class="text-xl font-semibold text-green-800 flex items-center gap-2">
            <User class="h-5 w-5" />
            Cuenta
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <button class="w-full text-left p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium text-gray-900">Exportar datos</h3>
                <p class="text-sm text-gray-600">Descargar una copia de tus datos</p>
              </div>
              <Download class="h-5 w-5 text-gray-400" />
            </div>
          </button>
          
          <button class="w-full text-left p-3 border border-red-300 rounded-md hover:bg-red-50 transition-colors text-red-600">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-medium">Eliminar cuenta</h3>
                <p class="text-sm text-red-500">Eliminar permanentemente tu cuenta</p>
              </div>
              <Trash2 class="h-5 w-5 text-red-400" />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        :disabled="loading"
        class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
      >
        {{ loading ? 'Guardando...' : 'Guardar Configuración' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bell, Palette, Shield, User, Download, Trash2 } from 'lucide-vue-next'

const loading = ref(false)

const settings = ref({
  notifications: {
    appointments: true,
    system: false,
    messages: true
  },
  appearance: {
    theme: 'light',
    language: 'es',
    timezone: 'America/Guayaquil'
  },
  privacy: {
    publicProfile: false,
    shareUsageData: true
  }
})

const saveSettings = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Configuración guardada exitosamente')
  } catch (error) {
    alert('Error al guardar la configuración')
  } finally {
    loading.value = false
  }
}
</script>
