<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
      <p class="text-gray-600">Administra todos los usuarios del sistema</p>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar usuarios..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        v-model="selectedRole"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Todos los roles</option>
        <option value="estudiante">Estudiantes</option>
        <option value="profesor">Profesores</option>
        <option value="admin">Administradores</option>
        <option value="paciente">Pacientes</option>
        <option value="secretario">Secretarios</option>
      </select>
      <button class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
        Nuevo Usuario
      </button>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último acceso</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-blue-600">{{ user.name.charAt(0) }}</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                  <div class="text-sm text-gray-500">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getRoleClass(user.role)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ getRoleName(user.role) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(user.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(user.last_login) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div class="flex space-x-2">
                <button class="text-blue-600 hover:text-blue-900">Editar</button>
                <button class="text-red-600 hover:text-red-900">Eliminar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="filteredUsers.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
      <p class="mt-1 text-sm text-gray-500">No se encontraron usuarios que coincidan con los filtros.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const selectedRole = ref('')

const users = ref([
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'estudiante@clinica.com',
    role: 'estudiante',
    status: 'Activo',
    last_login: '2024-01-15'
  },
  {
    id: 2,
    name: 'Dr. María González',
    email: 'profesor@clinica.com',
    role: 'profesor',
    status: 'Activo',
    last_login: '2024-01-14'
  },
  {
    id: 3,
    name: 'Dr. Admin',
    email: 'admin@clinica.com',
    role: 'admin',
    status: 'Activo',
    last_login: '2024-01-15'
  },
  {
    id: 4,
    name: 'Ana López',
    email: 'paciente@clinica.com',
    role: 'paciente',
    status: 'Activo',
    last_login: '2024-01-10'
  },
  {
    id: 5,
    name: 'María Secretaria',
    email: 'secretario@clinica.com',
    role: 'secretario',
    status: 'Activo',
    last_login: '2024-01-15'
  }
])

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesRole = !selectedRole.value || user.role === selectedRole.value
    return matchesSearch && matchesRole
  })
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getRoleName = (role) => {
  const names = {
    'estudiante': 'Estudiante',
    'profesor': 'Profesor',
    'admin': 'Administrador',
    'paciente': 'Paciente',
    'secretario': 'Secretario'
  }
  return names[role] || role
}

const getRoleClass = (role) => {
  const classes = {
    'estudiante': 'bg-blue-100 text-blue-800',
    'profesor': 'bg-green-100 text-green-800',
    'admin': 'bg-red-100 text-red-800',
    'paciente': 'bg-yellow-100 text-yellow-800',
    'secretario': 'bg-purple-100 text-purple-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (status) => {
  const classes = {
    'Activo': 'bg-green-100 text-green-800',
    'Inactivo': 'bg-gray-100 text-gray-800',
    'Suspendido': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
