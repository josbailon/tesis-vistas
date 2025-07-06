<!--
  CONTENEDOR DE NOTIFICACIONES
  
  Sistema de notificaciones toast para mostrar mensajes
  de éxito, error, advertencia e información
-->
<template>
  <Teleport to="body">
    <div 
      class="fixed top-4 right-4 z-50 space-y-2"
      role="region"
      aria-label="Notificaciones"
    >
      <TransitionGroup
        name="notification"
        tag="div"
        class="space-y-2"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="getNotificationClasses(notification.type)"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
          role="alert"
          :aria-live="notification.type === 'error' ? 'assertive' : 'polite'"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component 
                  :is="getNotificationIcon(notification.type)"
                  :class="getIconClasses(notification.type)"
                  class="h-6 w-6"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p 
                  v-if="notification.title"
                  class="text-sm font-medium text-gray-900"
                >
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ notification.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="removeNotification(notification.id)"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span class="sr-only">Cerrar</span>
                  <X class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <!-- Barra de progreso para auto-dismiss -->
          <div 
            v-if="notification.duration && notification.duration > 0"
            class="h-1 bg-gray-200"
          >
            <div 
              :class="getProgressBarClasses(notification.type)"
              class="h-full transition-all ease-linear"
              :style="{ 
                width: `${getProgressWidth(notification)}%`,
                transitionDuration: `${notification.duration}ms`
              }"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X 
} from 'lucide-vue-next'

/**
 * TIPOS
 */
interface Notification {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number // 0 = persistente
  createdAt: number
}

/**
 * ESTADO REACTIVO
 */
const notifications = ref<Notification[]>([])
let notificationId = 0

/**
 * MÉTODOS
 */
const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
  const newNotification: Notification = {
    ...notification,
    id: ++notificationId,
    createdAt: Date.now(),
    duration: notification.duration ?? 5000 // 5 segundos por defecto
  }
  
  notifications.value.push(newNotification)
  
  // Auto-remove si tiene duración
  if (newNotification.duration && newNotification.duration > 0) {
    setTimeout(() => {
      removeNotification(newNotification.id)
    }, newNotification.duration)
  }
}

const removeNotification = (id: number) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

const clearAllNotifications = () => {
  notifications.value = []
}

const getNotificationClasses = (type: Notification['type']) => {
  const baseClasses = 'border-l-4'
  
  switch (type) {
    case 'success':
      return `${baseClasses} border-green-400`
    case 'error':
      return `${baseClasses} border-red-400`
    case 'warning':
      return `${baseClasses} border-yellow-400`
    case 'info':
      return `${baseClasses} border-blue-400`
    default:
      return baseClasses
  }
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertTriangle
    case 'info':
      return Info
    default:
      return Info
  }
}

const getIconClasses = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'text-green-400'
    case 'error':
      return 'text-red-400'
    case 'warning':
      return 'text-yellow-400'
    case 'info':
      return 'text-blue-400'
    default:
      return 'text-gray-400'
  }
}

const getProgressBarClasses = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-400'
    case 'error':
      return 'bg-red-400'
    case 'warning':
      return 'bg-yellow-400'
    case 'info':
      return 'bg-blue-400'
    default:
      return 'bg-gray-400'
  }
}

const getProgressWidth = (notification: Notification) => {
  if (!notification.duration || notification.duration === 0) return 0
  
  const elapsed = Date.now() - notification.createdAt
  const progress = Math.max(0, 100 - (elapsed / notification.duration) * 100)
  return progress
}

/**
 * API GLOBAL PARA NOTIFICACIONES
 */
const showSuccess = (message: string, title?: string, duration?: number) => {
  addNotification({ type: 'success', message, title, duration })
}

const showError = (message: string, title?: string, duration?: number) => {
  addNotification({ type: 'error', message, title, duration })
}

const showWarning = (message: string, title?: string, duration?: number) => {
  addNotification({ type: 'warning', message, title, duration })
}

const showInfo = (message: string, title?: string, duration?: number) => {
  addNotification({ type: 'info', message, title, duration })
}

/**
 * EXPONER API GLOBALMENTE
 */
onMounted(() => {
  // Hacer disponible globalmente
  window.$notify = {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    clear: clearAllNotifications
  }
})

onUnmounted(() => {
  // Limpiar referencia global
  if (window.$notify) {
    delete window.$notify
  }
})

// Exponer métodos para uso directo
defineExpose({
  addNotification,
  removeNotification,
  clearAllNotifications,
  showSuccess,
  showError,
  showWarning,
  showInfo
})
</script>

<style scoped>
/**
 * TRANSICIONES PARA NOTIFICACIONES
 */
.notification-enter-active {
  transition: all 0.3s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>
