<!--
  DROPDOWN DEL USUARIO
  
  Menú desplegable con opciones del usuario
  como perfil, configuración y cerrar sesión
-->
<template>
  <div class="relative">
    <!-- Botón del usuario -->
    <button
      @click="isOpen = !isOpen"
      @keydown.escape="isOpen = false"
      class="flex items-center space-x-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
      :aria-expanded="isOpen"
      aria-haspopup="true"
    >
      <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
        <User class="h-5 w-5 text-white" />
      </div>
      <div class="hidden sm:block text-left">
        <p class="text-sm font-medium text-gray-900">
          {{ user?.name || 'Usuario' }}
        </p>
        <p class="text-xs text-gray-500">
          {{ getRoleLabel(user?.role) }}
        </p>
      </div>
      <ChevronDown 
        :class="{ 'rotate-180': isOpen }"
        class="h-4 w-4 transition-transform duration-200"
      />
    </button>

    <!-- Dropdown menu -->
    <Transition name="dropdown">
      <div
        v-if="isOpen"
        @click.away="isOpen = false"
        class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
        role="menu"
        aria-orientation="vertical"
      >
        <div class="py-1">
          
          <!-- Información del usuario -->
          <div class="px-4 py-3 border-b border-gray-100">
            <p class="text-sm font-medium text-gray-900">
              {{ user?.name || 'Usuario' }}
            </p>
            <p class="text-sm text-gray-500">
              {{ user?.email || 'email@ejemplo.com' }}
            </p>
          </div>
          
          <!-- Opciones del menú -->
          <router-link
            :to="{ name: 'MyProfile' }"
            @click="isOpen = false"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            <User class="h-4 w-4 mr-3" />
            Mi Perfil
          </router-link>
          
          <router-link
            :to="{ name: 'Settings' }"
            @click="isOpen = false"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            <Settings class="h-4 w-4 mr-3" />
            Configuración
          </router-link>
          
          <div class="border-t border-gray-100"></div>
          
          <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900"
            role="menuitem"
          >
            <LogOut class="h-4 w-4 mr-3" />
            Cerrar Sesión
          </button>
          
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { User, Settings, LogOut, ChevronDown } from 'lucide-vue-next'

/**
 * ESTADO REACTIVO
 */
const isOpen = ref(false)
const router = useRouter()
const authStore = useAuthStore()

/**
 * PROPIEDADES COMPUTADAS
 */
const user = computed(() => authStore.user)

/**
 * MÉTODOS
 */
const getRoleLabel = (role?: string): string => {
  const roleLabels = {
    patient: 'Paciente',
    student: 'Estudiante',
    professor: 'Profesor',
    admin: 'Administrador'
  }
  return roleLabels[role as keyof typeof roleLabels] || 'Usuario'
}

const handleLogout = async () => {
  try {
    isOpen.value = false
    await authStore.logout('Sesión cerrada por el usuario')
    router.push({ name: 'Login' })
  } catch (error) {
    console.error('Error cerrando sesión:', error)
  }
}

const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

/**
 * LIFECYCLE HOOKS
 */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/**
 * TRANSICIONES PARA EL DROPDOWN
 */
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}

.dropdown-leave-active {
  transition: all 0.2s ease-in;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/**
 * DIRECTIVA CLICK AWAY
 */
.v-click-away--active {
  pointer-events: auto;
}
</style>
