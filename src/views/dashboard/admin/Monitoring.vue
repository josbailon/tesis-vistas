<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-green-800">Sistema de Monitoreo</h1>
      <p class="text-green-600">Supervisión y gestión del sistema de la clínica dental</p>
    </div>

    <!-- System Status -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg border border-green-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-green-800">Estado del Sistema</p>
            <p class="text-lg font-bold text-green-700">Operativo</p>
          </div>
          <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div class="mt-2 text-xs text-green-600">
          Uptime: 99.9%
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-blue-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-blue-800">Usuarios Activos</p>
            <p class="text-2xl font-bold text-blue-700">{{ systemStats.activeUsers }}</p>
          </div>
          <Users class="h-8 w-8 text-blue-600" />
        </div>
        <div class="mt-2 text-xs text-blue-600">
          +{{ systemStats.newUsersToday }} hoy
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-purple-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-purple-800">Citas Hoy</p>
            <p class="text-2xl font-bold text-purple-700">{{ systemStats.appointmentsToday }}</p>
          </div>
          <Calendar class="h-8 w-8 text-purple-600" />
        </div>
        <div class="mt-2 text-xs text-purple-600">
          {{ systemStats.completedToday }} completadas
        </div>
      </div>
      
      <div class="bg-white rounded-lg border border-orange-200 shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-orange-800">Alertas</p>
            <p class="text-2xl font-bold text-orange-700">{{ systemStats.alerts }}</p>
          </div>
          <AlertTriangle class="h-8 w-8 text-orange-600" />
        </div>
        <div class="mt-2 text-xs text-orange-600">
          {{ systemStats.criticalAlerts }} críticas
        </div>
      </div>
    </div>

    <!-- System Performance -->
    <div class="grid gap-6 md:grid-cols-2">
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Activity class="h-5 w-5" />
            Rendimiento del Sistema
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-600">CPU</span>
              <span class="font-medium">{{ performance.cpu }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div :class="`h-2 rounded-full ${getCpuColor(performance.cpu)}`" 
                   :style="`width: ${performance.cpu}%`"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-600">Memoria</span>
              <span class="font-medium">{{ performance.memory }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div :class="`h-2 rounded-full ${getMemoryColor(performance.memory)}`" 
                   :style="`width: ${performance.memory}%`"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-600">Almacenamiento</span>
              <span class="font-medium">{{ performance.storage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div :class="`h-2 rounded-full ${getStorageColor(performance.storage)}`" 
                   :style="`width: ${performance.storage}%`"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-600">Red</span>
              <span class="font-medium">{{ performance.network }} ms</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div :class="`h-2 rounded-full ${getNetworkColor(performance.network)}`" 
                   :style="`width: ${Math.min(performance.network / 10, 100)}%`"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Database class="h-5 w-5" />
            Base de Datos
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <p class="text-sm text-gray-600">Conexiones activas</p>
              <p class="text-2xl font-bold text-gray-900">{{ database.activeConnections }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Consultas/seg</p>
              <p class="text-2xl font-bold text-gray-900">{{ database.queriesPerSecond }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Tamaño BD</p>
              <p class="text-2xl font-bold text-gray-900">{{ database.size }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Último backup</p>
              <p class="text-2xl font-bold text-gray-900">{{ database.lastBackup }}</p>
            </div>
          </div>
          <div class="pt-4 border-t">
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
              Crear Backup Manual
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Clock class="h-5 w-5" />
          Actividad Reciente del Sistema
        </h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" 
               class="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
            <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`">
              <component :is="activity.icon" class="h-4 w-4 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-600">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.timestamp }}</p>
            </div>
            <span :class="`px-2 py-1 rounded-full text-xs font-medium ${activity.statusColor}`">
              {{ activity.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- System Alerts -->
    <div v-if="alerts.length > 0" class="bg-white rounded-lg border border-red-200 shadow-sm">
      <div class="p-6 border-b border-red-200">
        <h2 class="text-xl font-semibold text-red-800 flex items-center gap-2">
          <AlertTriangle class="h-5 w-5" />
          Alertas del Sistema
        </h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="alert in alerts" :key="alert.id" 
               :class="`p-4 rounded-lg border ${getAlertColor(alert.severity)}`">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ alert.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ alert.description }}</p>
                <p class="text-xs text-gray-500 mt-2">{{ alert.timestamp }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`">
                  {{ alert.severity }}
                </span>
                <button 
                  @click="resolveAlert(alert)"
                  class="text-green-600 hover:text-green-800 text-sm"
                >
                  Resolver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- System Logs -->
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <FileText class="h-5 w-5" />
            Logs del Sistema
          </h2>
          <div class="flex items-center gap-2">
            <select v-model="logFilter" class="px-3 py-1 border border-gray-300 rounded text-sm">
              <option value="">Todos</option>
              <option value="error">Errores</option>
              <option value="warning">Advertencias</option>
              <option value="info">Información</option>
            </select>
            <button class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors">
              Exportar Logs
            </button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-2 max-h-96 overflow-y-auto">
          <div v-for="log in filteredLogs" :key="log.id" 
               class="flex items-start gap-3 p-2 hover:bg-gray-50 rounded text-sm">
            <span class="text-xs text-gray-500 w-20 flex-shrink-0">{{ log.time }}</span>
            <span :class="`px-2 py-1 rounded text-xs font-medium ${getLogLevelColor(log.level)}`">
              {{ log.level }}
            </span>
            <span class="flex-1 text-gray-700">{{ log.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Users, Calendar, AlertTriangle, Activity, Database, Clock, FileText,
  CheckCircle, XCircle, User, Settings
} from 'lucide-vue-next'

const logFilter = ref('')

const systemStats = ref({
  activeUsers: 47,
  newUsersToday: 3,
  appointmentsToday: 24,
  completedToday: 18,
  alerts: 2,
  criticalAlerts: 1
})

const performance = ref({
  cpu: 45,
  memory: 67,
  storage: 78,
  network: 23
})

const database = ref({
  activeConnections: 12,
  queriesPerSecond: 145,
  size: '2.3 GB',
  lastBackup: '2h ago'
})

const recentActivity = ref([
  {
    id: 1,
    title: 'Usuario creado',
    description: 'Nuevo estudiante registrado: Ana García',
    timestamp: 'Hace 5 minutos',
    icon: User,
    color: 'bg-green-600',
    status: 'Completado',
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: 2,
    title: 'Backup automático',
    description: 'Backup de base de datos completado exitosamente',
    timestamp: 'Hace 15 minutos',
