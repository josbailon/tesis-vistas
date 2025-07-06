<!--
  COMPONENTE RAÍZ DE LA APLICACIÓN
  
  Este es el componente principal que envuelve toda la aplicación.
  Maneja la inicialización global y proporciona contexto para toda la app.
-->
<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- 
      Suspense para manejar componentes asíncronos
      Muestra un loading mientras se cargan los componentes
    -->
    <Suspense>
      <template #default>
        <!-- router-view renderiza el componente de la ruta actual -->
        <router-view v-slot="{ Component, route }">
          <!-- Transición entre rutas -->
          <Transition
            :name="getTransitionName(route)"
            mode="out-in"
            @before-enter="onBeforeEnter"
            @after-enter="onAfterEnter"
          >
            <component :is="Component" :key="route.path" />
          </Transition>
        </router-view>
      </template>
      
      <template #fallback>
        <!-- Loading global mientras se cargan componentes -->
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50">
          <div class="text-center">
            <LoadingSpinner size="large" />
            <p class="mt-4 text-green-600 font-medium">Cargando aplicación...</p>
          </div>
        </div>
      </template>
    </Suspense>

    <!-- Notificaciones globales -->
    <NotificationContainer />
    
    <!-- Modal de sesión expirada -->
    <SessionExpiredModal />
  </div>
</template>

<script setup lang="ts">
/**
 * LÓGICA DEL COMPONENTE RAÍZ
 */

import { onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import SessionExpiredModal from '@/components/SessionExpiredModal.vue'

// Obtener instancias
const route = useRoute()
const authStore = useAuthStore()

/**
 * PROPIEDADES COMPUTADAS
 */
const isAuthenticated = computed(() => authStore.isAuthenticated)

/**
 * MÉTODOS PARA TRANSICIONES
 */
const getTransitionName = (currentRoute: any): string => {
  // Diferentes transiciones según el tipo de navegación
  if (currentRoute.path.startsWith('/dashboard')) {
    return 'slide-left'
  }
  if (currentRoute.path === '/login' || currentRoute.path === '/register') {
    return 'fade'
  }
  return 'slide-right'
}

const onBeforeEnter = () => {
  // Lógica antes de entrar a una nueva ruta
  document.body.classList.add('route-transitioning')
}

const onAfterEnter = () => {
  // Lógica después de entrar a una nueva ruta
  document.body.classList.remove('route-transitioning')
}

/**
 * MANEJO DE EVENTOS GLOBALES
 */
const handleVisibilityChange = () => {
  if (document.hidden) {
    console.log('🔄 Aplicación en segundo plano')
  } else {
    console.log('🔄 Aplicación en primer plano')
    // Verificar sesión cuando la app vuelve al primer plano
    if (isAuthenticated.value) {
      authStore.refreshSession()
    }
  }
}

const handleOnline = () => {
  console.log('🌐 Conexión restaurada')
  // Reintentrar operaciones pendientes
}

const handleOffline = () => {
  console.log('📡 Sin conexión a internet')
  // Mostrar mensaje de sin conexión
}

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  // Advertir si hay cambios sin guardar
  if (hasUnsavedChanges()) {
    event.preventDefault()
    event.returnValue = '¿Estás seguro de que quieres salir? Hay cambios sin guardar.'
  }
}

const hasUnsavedChanges = (): boolean => {
  // Lógica para verificar cambios sin guardar
  // Por ahora retorna false, pero se puede implementar según necesidades
  return false
}

/**
 * LIFECYCLE HOOKS
 */
const setupMetaTags = () => {
  // Configurar meta tags básicos
  const metaViewport = document.querySelector('meta[name="viewport"]')
  if (!metaViewport) {
    const viewport = document.createElement('meta')
    viewport.name = 'viewport'
    viewport.content = 'width=device-width, initial-scale=1.0'
    document.head.appendChild(viewport)
  }
  
  // Meta tag para tema de color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  if (!metaThemeColor) {
    const themeColor = document.createElement('meta')
    themeColor.name = 'theme-color'
    themeColor.content = '#16a34a'
    document.head.appendChild(themeColor)
  }
}

const initializeGlobalServices = async () => {
  try {
    // Inicializar servicios que requieren configuración global
    console.log('🔧 Inicializando servicios globales...')
    
    // Aquí se pueden inicializar servicios como:
    // - Analytics
    // - Error reporting
    // - Push notifications
    // - etc.
    
    console.log('✅ Servicios globales inicializados')
  } catch (error) {
    console.error('❌ Error inicializando servicios globales:', error)
  }
}

onMounted(async () => {
  console.log('🚀 Aplicación montada')
  
  // Agregar event listeners globales
  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  window.addEventListener('beforeunload', handleBeforeUnload)
  
  // Configurar meta tags dinámicos
  setupMetaTags()
  
  // Inicializar servicios globales
  await initializeGlobalServices()
})

onUnmounted(() => {
  console.log('🔄 Aplicación desmontada')
  
  // Limpiar event listeners
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<style>
/**
 * ESTILOS GLOBALES
 */
@import '@/assets/styles/globals.css';

/**
 * TRANSICIONES ENTRE RUTAS
 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

/**
 * ESTADO DE TRANSICIÓN
 */
.route-transitioning {
  overflow: hidden;
}

/**
 * MEJORAS DE ACCESIBILIDAD
 */
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: none !important;
  }
}

/**
 * ESTILOS PARA ESTADOS DE CARGA
 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/**
 * ESTILOS PARA SCROLL PERSONALIZADO
 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/**
 * ESTILOS PARA FOCUS VISIBLE
 */
.focus-visible {
  outline: 2px solid #16a34a;
  outline-offset: 2px;
}
</style>
