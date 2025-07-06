<!--
  MODAL DE SESIÓN EXPIRADA
  
  Modal que se muestra cuando la sesión del usuario ha expirado
  o está próxima a expirar
-->
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <!-- Overlay -->
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div 
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            @click="handleOverlayClick"
          />

          <!-- Modal -->
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <Clock class="h-6 w-6 text-red-600" />
              </div>
              
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 
                  id="modal-title"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  {{ modalTitle }}
                </h3>
                
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ modalMessage }}
                  </p>
                  
                  <!-- Contador regresivo -->
                  <div 
                    v-if="showCountdown && timeRemaining > 0"
                    class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md"
                  >
                    <div class="flex items-center">
                      <AlertTriangle class="h-5 w-5 text-yellow-400 mr-2" />
                      <span class="text-sm text-yellow-800">
                        Tiempo restante: 
                        <strong class="font-mono">{{ formatTime(timeRemaining) }}</strong>
                      </span>
                    </div>
                    
                    <!-- Barra de progreso -->
                    <div class="mt-2 w-full bg-yellow-200 rounded-full h-2">
                      <div 
                        class="bg-yellow-400 h-2 rounded-full transition-all duration-1000"
                        :style="{ width: `${progressPercentage}%` }"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                v-if="!isExpired"
                @click="extendSession"
                :disabled="extending"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                <LoadingSpinner v-if="extending" size="small" color="white" class="mr-2" />
                {{ extending ? 'Extendiendo...' : 'Extender Sesión' }}
              </button>
              
              <button
                @click="logout"
                :disabled="extending"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {{ isExpired ? 'Iniciar Sesión' : 'Cerrar Sesión' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Clock, AlertTriangle } from 'lucide-vue-next'
import LoadingSpinner from './LoadingSpinner.vue'

/**
 * ESTADO REACTIVO
 */
const router = useRouter()
const authStore = useAuthStore()

const showModal = ref(false)
const extending = ref(false)
const timeRemaining = ref(0)
const intervalId = ref<number | null>(null)

/**
 * PROPIEDADES COMPUTADAS
 */
const isExpired = computed(() => timeRemaining.value <= 0)

const showCountdown = computed(() => !isExpired.value && timeRemaining.value <= 300) // 5 minutos

const modalTitle = computed(() => {
  if (isExpired.value) {
    return 'Sesión Expirada'
  }
  return 'Sesión Próxima a Expirar'
})

const modalMessage = computed(() => {
  if (isExpired.value) {
    return 'Tu sesión ha expirado por seguridad. Por favor, inicia sesión nuevamente para continuar.'
  }
  return 'Tu sesión está próxima a expirar. ¿Deseas extender tu sesión para continuar trabajando?'
})

const progressPercentage = computed(() => {
  if (timeRemaining.value <= 0) return 0
  const maxWarningTime = 300 // 5 minutos
  return Math.max(0, (timeRemaining.value / maxWarningTime) * 100)
})

/**
 * MÉTODOS
 */
const showSessionWarning = () => {
  showModal.value = true
  startCountdown()
}

const showSessionExpired = () => {
  showModal.value = true
  timeRemaining.value = 0
  stopCountdown()
}

const startCountdown = () => {
  stopCountdown() // Limpiar cualquier intervalo existente
  
  intervalId.value = window.setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      stopCountdown()
      if (authStore.isAuthenticated) {
        authStore.logout('Sesión expirada')
      }
    }
  }, 1000)
}

const stopCountdown = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

const extendSession = async () => {
  try {
    extending.value = true
    
    const success = await authStore.refreshSession()
    
    if (success) {
      showModal.value = false
      stopCountdown()
      
      // Mostrar notificación de éxito
      if (window.$notify) {
        window.$notify.success('Sesión extendida exitosamente')
      }
    } else {
      // Si no se pudo extender, cerrar sesión
      await logout()
    }
  } catch (error) {
    console.error('Error extendiendo sesión:', error)
    await logout()
  } finally {
    extending.value = false
  }
}

const logout = async () => {
  try {
    await authStore.logout('Sesión cerrada por el usuario')
    showModal.value = false
    stopCountdown()
    
    // Redirigir a login
    router.push({ name: 'Login' })
  } catch (error) {
    console.error('Error cerrando sesión:', error)
  }
}

const handleOverlayClick = () => {
  // No permitir cerrar el modal haciendo clic fuera si la sesión expiró
  if (!isExpired.value) {
    showModal.value = false
    stopCountdown()
  }
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * WATCHERS
 */
watch(() => authStore.shouldShowSessionWarning, (shouldShow) => {
  if (shouldShow && !showModal.value) {
    showSessionWarning()
  }
})

watch(() => authStore.sessionTimeRemaining, (remaining) => {
  timeRemaining.value = remaining * 60 // convertir minutos a segundos
  
  if (remaining <= 0 && authStore.isAuthenticated) {
    showSessionExpired()
  }
})

/**
 * LIFECYCLE HOOKS
 */
onMounted(() => {
  // Verificar estado inicial
  if (authStore.shouldShowSessionWarning) {
    showSessionWarning()
  }
})

onUnmounted(() => {
  stopCountdown()
})
</script>

<style scoped>
/**
 * TRANSICIONES PARA EL MODAL
 */
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .inline-block {
  transition: all 0.3s ease;
}

.modal-leave-active .inline-block {
  transition: all 0.3s ease;
}

.modal-enter-from .inline-block,
.modal-leave-to .inline-block {
  transform: scale(0.95);
  opacity: 0;
}
</style>
