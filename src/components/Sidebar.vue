<!--
  COMPONENTE SIDEBAR DE NAVEGACIÓN
  
  Barra lateral de navegación que se adapta al rol del usuario
  y proporciona acceso rápido a todas las funcionalidades
-->
<template>
  <aside 
    :class="sidebarClasses"
    class="bg-gradient-to-b from-green-800 to-green-900 text-white transition-all duration-300 ease-in-out"
  >
    
    <!-- HEADER DEL SIDEBAR -->
    <div class="p-6 border-b border-green-700/50">
      <div class="flex items-center justify-between">
        
        <!-- Logo y título -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Stethoscope class="h-6 w-6 text-green-600" />
          </div>
          <div v-if="!collapsed" class="transition-opacity duration-300">
            <h1 class="text-lg font-bold text-white">ULEAM</h1>
            <p class="text-xs text-green-200">Clínica Dental</p>
          </div>
        </div>
        
        <!-- Botón de colapsar (desktop) -->
        <button
          v-if="!isMobile"
          @click="$emit('toggle')"
          class="p-2 rounded-md text-green-200 hover:text-white hover:bg-green-700/50 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <ChevronLeft :class="{ 'rotate-180': collapsed }" class="h-5 w-5 transition-transform duration-300" />
        </button>
        
      </div>
    </div>
    
    <!-- INFORMACIÓN DEL USUARIO -->
    <div v-if="!collapsed" class="p-4 border-b border-green-700/50">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
          <User class="h-6 w-6 text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">
            {{ user?.name || 'Usuario' }}
          </p>
          <p class="text-xs text-green-200 truncate">
            {{ getRoleLabel(user?.role) }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- NAVEGACIÓN PRINCIPAL -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
      
      <!-- Dashboard -->
      <SidebarItem
        :to="{ name: 'Dashboard' }"
        :icon="LayoutDashboard"
        label="Dashboard"
        :collapsed="collapsed"
      />
      
      <!-- Navegación específica por rol -->
      <template v-if="user?.role === 'patient'">
        <SidebarItem
          :to="{ name: 'MyAppointments' }"
          :icon="Calendar"
          label="Mis Citas"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'BookAppointment' }"
          :icon="CalendarPlus"
          label="Reservar Cita"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'MyRecords' }"
          :icon="FileText"
          label="Mi Historial"
          :collapsed="collapsed"
        />
      </template>
      
      <template v-else-if="user?.role === 'student'">
        <SidebarItem
          :to="{ name: 'Patients' }"
          :icon="Users"
          label="Pacientes"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'Appointments' }"
          :icon="Calendar"
          label="Citas"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'ClinicalCases' }"
          :icon="Clipboard"
          label="Casos Clínicos"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'ClinicalHistory' }"
          :icon="FileText"
          label="Historial Clínico"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'Academic' }"
          :icon="GraduationCap"
          label="Académico"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'Odontogram' }"
          :icon="Smile"
          label="Odontograma"
          :collapsed="collapsed"
        />
      </template>
      
      <template v-else-if="user?.role === 'professor'">
        <SidebarItem
          :to="{ name: 'Teacher' }"
          :icon="BookOpen"
          label="Panel Profesor"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'TeacherStudents' }"
          :icon="Users"
          label="Estudiantes"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'TeacherApprovals' }"
          :icon="CheckCircle"
          label="Aprobaciones"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'Specialty' }"
          :icon="Award"
          label="Mi Especialidad"
          :collapsed="collapsed"
        />
      </template>
      
      <template v-else-if="user?.role === 'admin'">
        <SidebarItem
          :to="{ name: 'Admin' }"
          :icon="Settings"
          label="Administración"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'AdminUsers' }"
          :icon="Users"
          label="Usuarios"
          :collapsed="collapsed"
        />
        <SidebarItem
          :to="{ name: 'AdminAnalytics' }"
          :icon="BarChart3"
          label="Analíticas"
          :collapsed="collapsed"
        />
      </template>
      
      <!-- Separador -->
      <div class="border-t border-green-700/50 my-4"></div>
      
      <!-- Navegación común -->
      <SidebarItem
        :to="{ name: 'Specialties' }"
        :icon="Stethoscope"
        label="Especialidades"
        :collapsed="collapsed"
      />
      <SidebarItem
        :to="{ name: 'MyProfile' }"
        :icon="User"
        label="Mi Perfil"
        :collapsed="collapsed"
      />
      <SidebarItem
        :to="{ name: 'Settings' }"
        :icon="Settings"
        label="Configuración"
        :collapsed="collapsed"
      />
      
    </nav>
    
    <!-- FOOTER DEL SIDEBAR -->
    <div class="p-4 border-t border-green-700/50">
      <button
        @click="handleLogout"
        :class="[
          'w-full flex items-center space-x-3 px-3 py-2 rounded-md text-green-200 hover:text-white hover:bg-green-700/50 transition-colors duration-200',
          { 'justify-center': collapsed }
        ]"
      >
        <LogOut class="h-5 w-5" />
        <span v-if="!collapsed" class="text-sm font-medium">Cerrar Sesión</span>
      </button>
    </div>
    
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  LayoutDashboard,
  Calendar,
  CalendarPlus,
  FileText,
  Users,
  Clipboard,
  GraduationCap,
  Smile,
  BookOpen,
  CheckCircle,
  Award,
  Settings,
  BarChart3,
  Stethoscope,
  User,
  LogOut,
  ChevronLeft
} from 'lucide-vue-next'

// Componentes
import SidebarItem from './SidebarItem.vue'

/**
 * PROPS Y EMITS
 */
interface Props {
  collapsed: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  toggle: []
}>()

/**
 * COMPOSABLES
 */
const router = useRouter()
const authStore = useAuthStore()

/**
 * PROPIEDADES COMPUTADAS
 */
const user = computed(() => authStore.user)

const isMobile = computed(() => {
  return window.innerWidth < 1024
})

const sidebarClasses = computed(() => [
  'fixed lg:relative inset-y-0 left-0 z-30 flex flex-col',
  {
    'w-64': !props.collapsed,
    'w-16': props.collapsed,
    'transform -translate-x-full lg:translate-x-0': props.collapsed && isMobile.value,
    'transform translate-x-0': !props.collapsed || !isMobile.value
  }
])

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
    await authStore.logout('Sesión cerrada por el usuario')
    router.push({ name: 'Login' })
  } catch (error) {
    console.error('Error cerrando sesión:', error)
  }
}

/**
 * LIFECYCLE HOOKS
 */
onMounted(() => {
  // Verificar que el usuario esté autenticado
  if (!authStore.isAuthenticated) {
    console.warn('Usuario no autenticado en Sidebar')
    router.push({ name: 'Login' })
  }
})
</script>

<style scoped>
/**
 * ESTILOS PARA SCROLL PERSONALIZADO
 */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: rgba(34, 197, 94, 0.1);
}

nav::-webkit-scrollbar-thumb {
  background: rgba(34, 197, 94, 0.3);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 197, 94, 0.5);
}

/**
 * TRANSICIONES
 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
