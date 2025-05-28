<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Dashboard</h1>
      <p class="text-green-600">Bienvenido, {{ authStore.user?.name }}</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div class="border border-green-200 rounded-lg p-6 bg-white shadow-sm">
        <div class="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 class="text-sm font-medium text-green-800">Redirigiendo...</h3>
          <Calendar class="h-4 w-4 text-green-600" />
        </div>
        <div class="text-2xl font-bold text-green-700">Cargando</div>
        <p class="text-xs text-green-600">Preparando tu dashboard</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { Calendar } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.user) {
    switch (authStore.user.role) {
      case 'patient':
        router.replace('/dashboard/my-appointments')
        break
      case 'student':
        router.replace('/dashboard/patients')
        break
      case 'professor':
        router.replace('/dashboard/teacher')
        break
      case 'admin':
        router.replace('/dashboard/admin')
        break
    }
  }
})
</script>
