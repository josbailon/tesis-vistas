<!--
  PÁGINA DE CONFIGURACIONES
  
  Permite a los usuarios configurar preferencias de la aplicación,
  notificaciones, privacidad y configuraciones específicas por rol
-->
<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Configuraciones</h1>
      <p class="text-gray-600">
        Personaliza tu experiencia en la plataforma
      </p>
    </div>

    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Configuraciones Generales -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Configuraciones Generales</h2>
        </div>
        <div class="p-6 space-y-6">
          <!-- Tema -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Tema de la Aplicación</h3>
              <p class="text-gray-500">Elige entre tema claro u oscuro</p>
            </div>
            <select 
              v-model="settings.theme"
              @change="updateTheme"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="system">Sistema</option>
            </select>
          </div>

          <!-- Idioma -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Idioma</h3>
              <p class="text-gray-500">Selecciona el idioma de la interfaz</p>
            </div>
            <select 
              v-model="settings.language"
              @change="updateLanguage"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          <!-- Zona Horaria -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Zona Horaria</h3>
              <p class="text-gray-500">Configura tu zona horaria local</p>
            </div>
            <select 
              v-model="settings.timezone"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="America/Guayaquil">Ecuador (GMT-5)</option>
              <option value="America/Lima">Perú (GMT-5)</option>
              <option value="America/Bogota">Colombia (GMT-5)</option>
              <option value="America/Mexico_City">México (GMT-6)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notificaciones -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Notificaciones</h2>
        </div>
        <div class="p-6 space-y-6">
          <!-- Email -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Notificaciones por Email</h3>
              <p class="text-gray-500">Recibe actualizaciones importantes por correo</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                v-model="settings.notifications.email"
                type="checkbox" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <!-- Push -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Notificaciones Push</h3>
              <p class="text-gray-500">Recibe notificaciones en tiempo real</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                v-model="settings.notifications.push"
                type="checkbox" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <!-- Recordatorios de Citas -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Recordatorios de Citas</h3>
              <p class="text-gray-500">Recibe recordatorios antes de tus citas</p>
            </div>
            <select 
              v-model="settings.notifications.appointmentReminder"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">Sin recordatorios</option>
              <option value="15min">15 minutos antes</option>
              <option value="30min">30 minutos antes</option>
              <option value="1hour">1 hora antes</option>
              <option value="1day">1 día antes</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Privacidad y Seguridad -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Privacidad y Seguridad</h2>
        </div>
        <div class="p-6 space-y-6">
          <!-- Perfil Público -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Perfil Público</h3>
              <p class="text-gray-500">Permite que otros usuarios vean tu perfil</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                v-model="settings.privacy.publicProfile"
                type="checkbox" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <!-- Autenticación de Dos Factores -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Autenticación de Dos Factores</h3>
              <p class="text-gray-500">Añade una capa extra de seguridad</p>
            </div>
            <button 
              @click="setup2FA"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {{ settings.privacy.twoFactorEnabled ? 'Configurado' : 'Configurar' }}
            </button>
          </div>

          <!-- Sesiones Activas -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Sesiones Activas</h3>
            <p class="text-gray-500 mb-4">Gestiona dónde has iniciado sesión</p>
            <div class="space-y-3">
              <div 
                v-for="session in activeSessions" 
                :key="session.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p class="font-medium">{{ session.device }}</p>
                    <p class="text-sm text-gray-500">{{ session.location }} • {{ session.lastActive }}</p>
                  </div>
                </div>
                <button 
                  v-if="!session.current"
                  @click="terminateSession(session.id)"
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  Terminar
                </button>
                <span v-else class="text-sm text-green-600 font-medium">Actual</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Configuraciones Específicas por Rol -->
      <div v-if="user.role === 'student'" class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Configuraciones de Estudiante</h2>
        </div>
        <div class="p-6 space-y-6">
          <!-- Auto-guardado de Odontograma -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Auto-guardado de Odontograma</h3>
              <p class="text-gray-500">Guarda automáticamente los cambios cada 30 segundos</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                v-model="settings.student.autoSaveOdontogram"
                type="checkbox" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <!-- Mostrar Ayudas Visuales -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Ayudas Visuales</h3>
              <p class="text-gray-500">Muestra tooltips y guías en herramientas</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                v-model="settings.student.showVisualAids"
                type="checkbox" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="flex justify-between">
        <button 
          @click="resetToDefaults"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Restaurar Valores por Defecto
        </button>
        <button 
          @click="saveSettings"
          :disabled="saving"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {{ saving ? 'Guardando...' : 'Guardar Configuraciones' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL COMPONENTE CONFIGURACIONES
 * 
 * Maneja todas las configuraciones de la aplicación incluyendo
 * tema, notificaciones, privacidad y configuraciones específicas por rol
 */

import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

// Store de autenticación
const authStore = useAuthStore()
const { user } = authStore

// Estado reactivo
const saving = ref(false)

// Configuraciones
const settings = reactive({
  theme: 'light',
  language: 'es',
  timezone: 'America/Guayaquil',
  notifications: {
    email: true,
    push: true,
    appointmentReminder: '30min'
  },
  privacy: {
    publicProfile: false,
    twoFactorEnabled: false
  },
  student: {
    autoSaveOdontogram: true,
    showVisualAids: true
  }
})

// Sesiones activas
const activeSessions = ref([
  {
    id: 1,
    device: 'Chrome en Windows',
    location: 'Guayaquil, Ecuador',
    lastActive: 'Ahora',
    current: true
  },
  {
    id: 2,
    device: 'Safari en iPhone',
    location: 'Guayaquil, Ecuador',
    lastActive: 'Hace 2 horas',
    current: false
  }
])

// Hooks must be called at the top level
onMounted(() => {
  loadSettings()
})

/**
 * Cargar configuraciones guardadas
 */
const loadSettings = () => {
  try {
    const savedSettings = localStorage.getItem('dental_clinic_settings')
    if (savedSettings) {
      Object.assign(settings, JSON.parse(savedSettings))
    }
  } catch (error) {
    console.error('Error al cargar configuraciones:', error)
  }
}

/**
 * Actualizar tema
 */
const updateTheme = () => {
  // Aplicar tema inmediatamente
  document.documentElement.setAttribute('data-theme', settings.theme)
  console.log('Tema actualizado a:', settings.theme)
}

/**
 * Actualizar idioma
 */
const updateLanguage = () => {
  console.log('Idioma actualizado a:', settings.language)
  // Aquí se implementaría la lógica de internacionalización
}

/**
 * Configurar autenticación de dos factores
 */
const setup2FA = () => {
  if (settings.privacy.twoFactorEnabled) {
    // Deshabilitar 2FA
    if (confirm('¿Estás seguro de que quieres deshabilitar la autenticación de dos factores?')) {
      settings.privacy.twoFactorEnabled = false
      alert('Autenticación de dos factores deshabilitada')
    }
  } else {
    // Habilitar 2FA
    alert('Se abrirá el asistente de configuración de 2FA')
    // Aquí se abriría un modal o se redirigiría a la configuración
    settings.privacy.twoFactorEnabled = true
  }
}

/**
 * Terminar sesión específica
 */
const terminateSession = (sessionId) => {
  if (confirm('¿Estás seguro de que quieres terminar esta sesión?')) {
    activeSessions.value = activeSessions.value.filter(s => s.id !== sessionId)
    console.log('Sesión terminada:', sessionId)
  }
}

/**
 * Restaurar valores por defecto
 */
const resetToDefaults = () => {
  if (confirm('¿Estás seguro de que quieres restaurar todas las configuraciones a sus valores por defecto?')) {
    Object.assign(settings, {
      theme: 'light',
      language: 'es',
      timezone: 'America/Guayaquil',
      notifications: {
        email: true,
        push: true,
        appointmentReminder: '30min'
      },
      privacy: {
        publicProfile: false,
        twoFactorEnabled: false
      },
      student: {
        autoSaveOdontogram: true,
        showVisualAids: true
      }
    })
    
    updateTheme()
    alert('Configuraciones restauradas a valores por defecto')
  }
}

/**
 * Guardar configuraciones
 */
const saveSettings = async () => {
  saving.value = true
  
  try {
    // Simular guardado en servidor
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Guardar en localStorage
    localStorage.setItem('dental_clinic_settings', JSON.stringify(settings))
    
    console.log('Configuraciones guardadas:', settings)
    alert('Configuraciones guardadas exitosamente')
  } catch (error) {
    console.error('Error al guardar configuraciones:', error)
    alert('Error al guardar las configuraciones')
  } finally {
    saving.value = false
  }
}
</script>
