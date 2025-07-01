<!--
  PÁGINA DE CONFIGURACIÓN
  
  Esta página permite a los usuarios personalizar su experiencia en la aplicación
  con diferentes opciones de configuración y preferencias.
-->
<template>
  <div class="space-y-6">
    
    <!-- HEADER DE LA PÁGINA -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Configuración</h1>
      <p class="text-gray-600 mt-2">
        Personaliza tu experiencia en la plataforma de la Clínica Dental ULEAM
      </p>
    </div>

    <!-- CONFIGURACIÓN DE APARIENCIA -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Palette class="h-5 w-5 text-purple-600" />
          Apariencia
        </h2>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Tema -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Tema de la Aplicación</h3>
            <p class="text-sm text-gray-600">Elige entre tema claro u oscuro</p>
          </div>
          <select
            v-model="settings.theme"
            @change="updateTheme"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
            <option value="system">Sistema</option>
          </select>
        </div>
        
        <!-- Tamaño de fuente -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Tamaño de Fuente</h3>
            <p class="text-sm text-gray-600">Ajusta el tamaño del texto para mejor legibilidad</p>
          </div>
          <select
            v-model="settings.fontSize"
            @change="updateFontSize"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>
        
        <!-- Idioma -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Idioma</h3>
            <p class="text-sm text-gray-600">Selecciona el idioma de la interfaz</p>
          </div>
          <select
            v-model="settings.language"
            @change="updateLanguage"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>

    <!-- CONFIGURACIÓN DE NOTIFICACIONES -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Bell class="h-5 w-5 text-yellow-600" />
          Notificaciones
        </h2>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Notificaciones por email -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Notificaciones por Email</h3>
            <p class="text-sm text-gray-600">Recibe actualizaciones importantes por correo electrónico</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="settings.emailNotifications"
              @change="updateNotificationSettings"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <!-- Notificaciones push -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Notificaciones Push</h3>
            <p class="text-sm text-gray-600">Recibe notificaciones en tiempo real en tu navegador</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="settings.pushNotifications"
              @change="updateNotificationSettings"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <!-- Recordatorios de citas -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Recordatorios de Citas</h3>
            <p class="text-sm text-gray-600">Recibe recordatorios antes de tus citas programadas</p>
          </div>
          <select
            v-model="settings.appointmentReminders"
            @change="updateNotificationSettings"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="none">Sin recordatorios</option>
            <option value="15min">15 minutos antes</option>
            <option value="1hour">1 hora antes</option>
            <option value="1day">1 día antes</option>
          </select>
        </div>
      </div>
    </div>

    <!-- CONFIGURACIÓN DE PRIVACIDAD -->
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Shield class="h-5 w-5 text-green-600" />
          Privacidad y Seguridad
        </h2>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Visibilidad del perfil -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Perfil Público</h3>
            <p class="text-sm text-gray-600">Permite que otros usuarios vean tu información básica</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="settings.publicProfile"
              @change="updatePrivacySettings"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <!-- Compartir datos para investigación -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Datos para Investigación</h3>
            <p class="text-sm text-gray-600">Contribuye con datos anónimos para investigación médica</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="settings.shareDataForResearch"
              @change="updatePrivacySettings"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <!-- Sesiones activas -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Sesiones Activas</h3>
            <p class="text-sm text-gray-600">Gestiona los dispositivos donde has iniciado sesión</p>
          </div>
          <button
            @click="showActiveSessions = true"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Ver Sesiones
          </button>
        </div>
      </div>
    </div>

    <!-- CONFIGURACIÓN ESPECÍFICA POR ROL -->
    <div v-if="authStore.user?.role === 'student'" class="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <GraduationCap class="h-5 w-5 text-blue-600" />
          Configuración de Estudiante
        </h2>
      </div>
      
      <div class="p-6 space-y-6">
        <!-- Auto-guardado de odontogramas -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Auto-guardado de Odontogramas</h3>
            <p class="text-sm text-gray-600">Guarda automáticamente los cambios cada 5 minutos</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="settings.autoSaveOdontograms"
              @change="updateStudentSettings"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <!-- Solicitar aprobación automática -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium text-gray-900">Solicitar Aprobación Automática</h3>
            <p class="text-sm text-gray-600">Envía automáticamente solicitudes de aprobación para tratamientos</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              v-model="settings.autoRequestApproval"
              @change="updateStudentSettings"
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- BOTONES DE ACCIÓN -->
    <div class="flex justify-between items-center pt-6 border-t border-gray-200">
      <button
        @click="resetToDefaults"
        class="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
      >
        Restaurar Valores por Defecto
      </button>
      
      <div class="flex gap-3">
        <button
          @click="exportSettings"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Exportar Configuración
        </button>
        <button
          @click="saveSettings"
          :disabled="saving"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
        >
          {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
    </div>

    <!-- MODAL DE SESIONES ACTIVAS -->
    <div v-if="showActiveSessions" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Sesiones Activas</h3>
          <button
            @click="showActiveSessions = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <X class="h-6 w-6" />
          </button>
        </div>
        
        <div class="space-y-4">
          <div
            v-for="session in activeSessions"
            :key="session.id"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 rounded-lg">
                <Monitor class="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900">{{ session.device }}</h4>
                <p class="text-sm text-gray-600">{{ session.location }}</p>
                <p class="text-xs text-gray-500">Última actividad: {{ session.lastActivity }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-2">
              <span
                :class="`px-2 py-1 rounded-full text-xs font-medium ${
                  session.current 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`"
              >
                {{ session.current ? 'Actual' : 'Activa' }}
              </span>
              <button
                v-if="!session.current"
                @click="terminateSession(session.id)"
                class="text-red-600 hover:text-red-700 text-sm"
              >
                Terminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DE LA PÁGINA DE CONFIGURACIÓN
 * 
 * Esta página maneja:
 * - Configuración de apariencia (tema, fuente, idioma)
 * - Configuración de notificaciones
 * - Configuración de privacidad y seguridad
 * - Configuraciones específicas por rol
 * - Gestión de sesiones activas
 */

// Importar hooks de Vue
import { ref, reactive, onMounted } from 'vue'
// Importar store de autenticación
import { useAuthStore } from '../../stores/auth'
// Importar iconos
import { Palette, Bell, Shield, GraduationCap, Monitor, X } from 'lucide-vue-next'

// Obtener store de autenticación
const authStore = useAuthStore()

/**
 * ESTADO REACTIVO DEL COMPONENTE
 * 
 * Variables que controlan el estado de la página
 */

// Estado de guardado
const saving = ref(false)

// Modal de sesiones activas
const showActiveSessions = ref(false)

// Configuraciones del usuario
const settings = reactive({
  // Apariencia
  theme: 'light',
  fontSize: 'medium',
  language: 'es',
  
  // Notificaciones
  emailNotifications: true,
  pushNotifications: true,
  appointmentReminders: '1hour',
  
  // Privacidad
  publicProfile: false,
  shareDataForResearch: true,
  
  // Específicas de estudiante
  autoSaveOdontograms: true,
  autoRequestApproval: false
})

// Sesiones activas (datos de ejemplo)
const activeSessions = ref([
  {
    id: 1,
    device: 'Chrome en Windows',
    location: 'Manta, Ecuador',
    lastActivity: 'Ahora',
    current: true
  },
  {
    id: 2,
    device: 'Safari en iPhone',
    location: 'Manta, Ecuador',
    lastActivity: 'Hace 2 horas',
    current: false
  },
  {
    id: 3,
    device: 'Firefox en Linux',
    location: 'Portoviejo, Ecuador',
    lastActivity: 'Hace 1 día',
    current: false
  }
])

/**
 * MÉTODOS DEL COMPONENTE
 * 
 * Funciones que manejan la lógica de la página
 */

/**
 * ACTUALIZAR TEMA
 * 
 * Cambia el tema de la aplicación
 */
const updateTheme = () => {
  // En una implementación completa, esto cambiaría el tema CSS
  console.log('Tema actualizado a:', settings.theme)
  
  // Aplicar tema al documento
  if (settings.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/**
 * ACTUALIZAR TAMAÑO DE FUENTE
 * 
 * Cambia el tamaño de fuente de la aplicación
 */
const updateFontSize = () => {
  console.log('Tamaño de fuente actualizado a:', settings.fontSize)
  
  // Aplicar tamaño de fuente al documento
  const fontSizes = {
    small: '14px',
    medium: '16px',
    large: '18px'
  }
  
  document.documentElement.style.fontSize = fontSizes[settings.fontSize]
}

/**
 * ACTUALIZAR IDIOMA
 * 
 * Cambia el idioma de la interfaz
 */
const updateLanguage = () => {
  console.log('Idioma actualizado a:', settings.language)
  // En una implementación completa, esto cambiaría el idioma de la interfaz
}

/**
 * ACTUALIZAR CONFIGURACIÓN DE NOTIFICACIONES
 * 
 * Guarda los cambios en las configuraciones de notificaciones
 */
const updateNotificationSettings = () => {
  console.log('Configuración de notificaciones actualizada:', {
    email: settings.emailNotifications,
    push: settings.pushNotifications,
    reminders: settings.appointmentReminders
  })
}

/**
 * ACTUALIZAR CONFIGURACIÓN DE PRIVACIDAD
 * 
 * Guarda los cambios en las configuraciones de privacidad
 */
const updatePrivacySettings = () => {
  console.log('Configuración de privacidad actualizada:', {
    publicProfile: settings.publicProfile,
    shareData: settings.shareDataForResearch
  })
}

/**
 * ACTUALIZAR CONFIGURACIÓN DE ESTUDIANTE
 * 
 * Guarda los cambios en las configuraciones específicas de estudiante
 */
const updateStudentSettings = () => {
  console.log('Configuración de estudiante actualizada:', {
    autoSave: settings.autoSaveOdontograms,
    autoApproval: settings.autoRequestApproval
  })
}

/**
 * TERMINAR SESIÓN
 * 
 * Termina una sesión activa específica
 */
const terminateSession = (sessionId) => {
  if (confirm('¿Estás seguro de que quieres terminar esta sesión?')) {
    // Filtrar la sesión terminada
    activeSessions.value = activeSessions.value.filter(session => session.id !== sessionId)
    console.log('Sesión terminada:', sessionId)
  }
}

/**
 * RESTAURAR VALORES POR DEFECTO
 * 
 * Restaura todas las configuraciones a sus valores por defecto
 */
const resetToDefaults = () => {
  if (confirm('¿Estás seguro de que quieres restaurar todas las configuraciones a sus valores por defecto?')) {
    // Restaurar configuraciones por defecto
    settings.theme = 'light'
    settings.fontSize = 'medium'
    settings.language = 'es'
    settings.emailNotifications = true
    settings.pushNotifications = true
    settings.appointmentReminders = '1hour'
    settings.publicProfile = false
    settings.shareDataForResearch = true
    settings.autoSaveOdontograms = true
    settings.autoRequestApproval = false
    
    // Aplicar cambios
    updateTheme()
    updateFontSize()
    
    alert('Configuraciones restauradas a valores por defecto')
  }
}

/**
 * EXPORTAR CONFIGURACIÓN
 * 
 * Exporta las configuraciones actuales a un archivo JSON
 */
const exportSettings = () => {
  const settingsData = {
    ...settings,
    exportDate: new Date().toISOString(),
    userId: authStore.user?.id
  }
  
  const dataStr = JSON.stringify(settingsData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(dataBlob)
  link.download = `configuracion-uleam-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  
  console.log('Configuración exportada')
}

/**
 * GUARDAR CONFIGURACIÓN
 * 
 * Guarda todas las configuraciones en el servidor
 */
const saveSettings = async () => {
  saving.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Guardar en localStorage como respaldo
    localStorage.setItem('dental_clinic_settings', JSON.stringify(settings))
    
    alert('Configuración guardada exitosamente')
    
  } catch (error) {
    console.error('Error al guardar configuración:', error)
    alert('Error al guardar la configuración')
  } finally {
    saving.value = false
  }
}

/**
 * CARGAR CONFIGURACIÓN
 * 
 * Carga las configuraciones guardadas del usuario
 */
const loadSettings = () => {
  try {
    const savedSettings = localStorage.getItem('dental_clinic_settings')
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)
      Object.assign(settings, parsedSettings)
      
      // Aplicar configuraciones cargadas
      updateTheme()
      updateFontSize()
    }
  } catch (error) {
    console.error('Error al cargar configuración:', error)
  }
}

/**
 * INICIALIZACIÓN DEL COMPONENTE
 * 
 * Se ejecuta cuando el componente se monta en el DOM
 */
onMounted(() => {
  loadSettings()
  console.log('Página de configuración inicializada para:', authStore.user?.name)
})
</script>
