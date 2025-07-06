<!--
  LAYOUT DEL DASHBOARD
  
  Este componente define la estructura visual del área privada de la aplicación.
  Incluye el sidebar de navegación y el área principal de contenido.
-->
<template>
  <div class="flex h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
    
    <!-- SIDEBAR DE NAVEGACIÓN -->
    <Sidebar 
      :collapsed="sidebarCollapsed"
      @toggle="toggleSidebar"
    />
    
    <!-- ÁREA PRINCIPAL DE CONTENIDO -->
    <div class="flex-1 flex flex-col overflow-hidden">
      
      <!-- HEADER DEL DASHBOARD -->
      <header class="bg-white shadow-sm border-b border-green-200/50 px-6 py-4">
        <div class="flex items-center justify-between">
          
          <!-- Botón de toggle del sidebar (móvil) -->
          <button
            @click="toggleSidebar"
            class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Menu class="h-6 w-6" />
          </button>
          
          <!-- Breadcrumbs -->
          <nav class="hidden sm:flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li v-for="(crumb, index) in breadcrumbs" :key="index">
                <div class="flex items-center">
                  <ChevronRight v-if="index > 0" class="h-4 w-4 text-gray-400 mr-2" />
                  <router-link
                    v-if="crumb.to && index < breadcrumbs.length - 1"
                    :to="crumb.to"
                    class="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {{ crumb.label }}
                  </router-link>
                  <span
                    v-else
                    class="text-sm font-medium text-gray-900"
                  >
                    {{ crumb.label }}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <!-- Acciones del header -->
          <div class="flex items-center space-x-4">
            
            <!-- Notificaciones -->
            <button
              @click="showNotifications = !showNotifications"
              class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Bell class="h-6 w-6" />
              <span 
                v-if="unreadNotifications > 0"
                class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {{ unreadNotifications > 9 ? '9+' : unreadNotifications }}
              </span>
            </button>
            
            <!-- Perfil del usuario -->
            <UserDropdown />
            
          </div>
        </div>
      </header>
      
      <!-- CONTENIDO PRINCIPAL -->
      <main class="flex-1 overflow-y-auto p-6">
        <div class="bg-white rounded-xl shadow-lg border border-green-200/50 min-h-full p-6 backdrop-blur-sm">
          
          <!-- Indicador de carga global -->
          <div 
            v-if="loading" 
            class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10"
          >
            <LoadingSpinner size="large" text="Cargando..." />
          </div>
          
          <!-- Contenido de la ruta actual -->
          <router-view v-slot="{ Component, route }">
            <Transition name="page" mode="out-in">
              <Suspense>
                <template #default>
                  <component :is="Component" :key="route.path" />
                </template>
                <template #fallback>
                  <div class="flex items-center justify-center py-12">
                    <LoadingSpinner size="medium" text="Cargando página..." />
                  </div>
                </template>
              </Suspense>
            </Transition>
          </router-view>
          
        </div>
      </main>
      
    </div>
    
    <!-- Panel de notificaciones -->
    <NotificationPanel 
      v-if="showNotifications"
      @close="showNotifications = false"
    />
    
    <!-- Overlay para móvil cuando sidebar está abierto -->
    <div
      v-if="!sidebarCollapsed && isMobile"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
    />
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Menu, Bell, ChevronRight } from 'lucide-vue-next'

// Componentes
import Sidebar from '@/components/Sidebar.vue'
import UserDropdown from '@/components/UserDropdown.vue'
import NotificationPanel from '@/components/NotificationPanel.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

/**
 * ESTADO REACTIVO
 */
const route = useRoute()
const authStore = useAuthStore()

const sidebarCollapsed = ref(false)
const showNotifications = ref(false)
const loading = ref(false)
const isMobile = ref(false)
const unreadNotifications = ref(3) // Simulado

/**
 * PROPIEDADES COMPUTADAS
 */
const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const crumbs = []
  
  // Siempre incluir Dashboard como primer elemento
  crumbs.push({
    label: 'Dashboard',
    to: '/dashboard'
  })
  
  // Generar breadcrumbs basado en la ruta
  let currentPath = ''
  for (let i = 1; i < pathSegments.length; i++) {
    currentPath += '/' + pathSegments[i]
    const segment = pathSegments[i]
    
    // Convertir segment a label legible
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    crumbs.push({
      label,
      to: i < pathSegments.length - 1 ? currentPath : undefined
    })
  }
  
  return crumbs
})

/**
 * MÉTODOS
 */
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  
  // En móvil, colapsar sidebar por defecto
  if (isMobile.value) {
    sidebarCollapsed.value = true
  }
}

const handleResize = () => {
  checkMobile()
}

const handleKeydown = (event: KeyboardEvent) => {
  // Atajos de teclado
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 'b':
        event.preventDefault()
        toggleSidebar()
        break
      case 'n':
        event.preventDefault()
        showNotifications.value = !showNotifications.value
        break
    }
  }
  
  // Cerrar notificaciones con Escape
  if (event.key === 'Escape' && showNotifications.value) {
    showNotifications.value = false
  }
}

/**
 * WATCHERS
 */
watch(() => route.path, () => {
  // Cerrar notificaciones al cambiar de ruta
  showNotifications.value = false
  
  // En móvil, colapsar sidebar al navegar
  if (isMobile.value) {
    sidebarCollapsed.value = true
  }
})

/**
 * LIFECYCLE HOOKS
 */
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', handleResize)
  document.addEventListener('keydown', handleKeydown)
  
  // Verificar autenticación
  if (!authStore.isAuthenticated) {
    console.warn('Usuario no autenticado en DashboardLayout')
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/**
 * TRANSICIONES ENTRE PÁGINAS
 */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/**
 * MEJORAS DE ACCESIBILIDAD
 */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none !important;
  }
}

/**
 * ESTILOS RESPONSIVOS
 */
@media (max-width: 1023px) {
  .sidebar-overlay {
    display: block;
  }
}
</style>
