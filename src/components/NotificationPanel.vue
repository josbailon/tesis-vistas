<!--
  PANEL DE NOTIFICACIONES
  
  Panel lateral que muestra las notificaciones del usuario
  con opciones para marcar como leídas y gestionar
-->
<template>
  <div class="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
    
    <!-- Overlay -->
    <div 
      class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="$emit('close')"
    />
    
    <!-- Panel -->
    <div class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
      
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Notificaciones</h2>
        <div class="flex items-center space-x-2">
          <button
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Marcar todas como leídas
          </button>
          <button
            @click="$emit('close')"
            class="p-2 text-gray-400 hover:text-gray-600 rounded-md"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <!-- Lista de notificaciones -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="notifications.length === 0" class="p-6 text-center">
          <Bell class="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">No tienes notificaciones</p>
        </div>
        
        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            :class="[
              'p-4 hover:bg-gray-50 cursor-pointer transition-colors',
              { 'bg-green-50': !notification.read }
            ]"
            @click="markAsRead(notification.id)"
          >
            <div class="flex items-start space-x-3">
              
              <!-- Icono -->
              <div :class="getIconClasses(notification.type)">
                <component :is="getIcon(notification.type)" class="h-5 w-5" />
              </div>
              
              <!-- Contenido -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-600 mt-1">
                  {{ notification.message }}
                </p>
                <p class="text-xs text-gray-400 mt-2">
                  {{ formatDate(notification.createdAt) }}
                </p>
              </div>
              
              <!-- Indicador de no leído -->
              <div
                v-if="!notification.read"
                class="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"
              />
              
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="border-t border-gray-200 p-4">
        <button
          @click="viewAllNotifications"
          class="w-full text-center text-sm text-green-600 hover:text-green-700 font-medium"
        >
          Ver todas las notificaciones
        </button>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Calendar,
  User
} from 'lucide-vue-next'

/**
 * COMPOSABLES
 */
const router = useRouter()

/**
 * EMITS
 */
const emit = defineEmits<{
  close: []
}>()

/**
 * TIPOS
 */
interface Notification {
  id: number
  type: 'success' | 'warning' | 'info' | 'appointment' | 'user'
  title: string
  message: string
  read: boolean
  createdAt: Date
}

/**
 * ESTADO REACTIVO
 */
const notifications = ref<Notification[]>([
  {
    id: 1,
    type: 'appointment',
    title: 'Nueva cita programada',
    message: 'Tienes una cita programada para mañana a las 10:00 AM',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutos atrás
  },
  {
    id: 2,
    type: 'success',
    title: 'Tratamiento completado',
    message: 'El tratamiento de endodoncia ha sido completado exitosamente',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 horas atrás
  },
  {
    id: 3,
    type: 'warning',
    title: 'Recordatorio de cita',
    message: 'No olvides tu cita de mañana a las 2:00 PM',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 día atrás
  }
])

/**
 * PROPIEDADES COMPUTADAS
 */
const unreadCount = computed(() => 
  notifications.value.filter(n => !n.read).length
)

/**
 * MÉTODOS
 */
const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    case 'appointment':
      return Calendar
    case 'user':
      return User
    default:
      return Bell
  }
}

const getIconClasses = (type: Notification['type']) => {
  const baseClasses = 'w-8 h-8 rounded-full flex items-center justify-center'
  
  switch (type) {
    case 'success':
      return `${baseClasses} bg-green-100 text-green-600`
    case 'warning':
      return `${baseClasses} bg-yellow-100 text-yellow-600`
    case 'info':
      return `${baseClasses} bg-blue-100 text-blue-600`
    case 'appointment':
      return `${baseClasses} bg-purple-100 text-purple-600`
    case 'user':
      return `${baseClasses} bg-gray-100 text-gray-600`
    default:
      return `${baseClasses} bg-gray-100 text-gray-600`
  }
}

const formatDate = (date: Date): string => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) {
    return 'Ahora mismo'
  } else if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`
  } else if (diffInMinutes < 1440) { // 24 horas
    const hours = Math.floor(diffInMinutes / 60)
    return `Hace ${hours} hora${hours > 1 ? 's' : ''}`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `Hace ${days} día${days > 1 ? 's' : ''}`
  }
}

const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}

const viewAllNotifications = () => {
  emit('close')
  router.push({ name: 'Notifications' })
}
</script>

<style scoped>
/**
 * SCROLL PERSONALIZADO
 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
