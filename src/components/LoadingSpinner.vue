<!--
  COMPONENTE DE SPINNER DE CARGA CON TYPESCRIPT
  
  Componente reutilizable y tipado para mostrar estados de carga
  con diferentes tamaños, colores y configuraciones
-->
<template>
  <div :class="containerClasses" :role="role" :aria-label="ariaLabel">
    <!-- Spinner SVG animado -->
    <div :class="spinnerClasses">
      <svg 
        class="animate-spin h-full w-full" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        :aria-hidden="true"
      >
        <circle 
          class="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="4"
        />
        <path 
          class="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
    
    <!-- Texto de carga (opcional) -->
    <p v-if="text" :class="textClasses">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * LÓGICA DEL COMPONENTE LOADING SPINNER CON TYPESCRIPT
 */

import { computed } from 'vue'

/**
 * TIPOS PARA LAS PROPS
 */
interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'white' | 'blue' | 'green' | 'red' | 'yellow' | 'gray' | 'purple'
  text?: string
  fullscreen?: boolean
  overlay?: boolean
  center?: boolean
}

/**
 * DEFINICIÓN DE PROPS CON VALORES POR DEFECTO
 */
const props = withDefaults(defineProps<LoadingSpinnerProps>(), {
  size: 'md',
  color: 'blue',
  text: '',
  fullscreen: false,
  overlay: false,
  center: true
})

/**
 * PROPIEDADES COMPUTADAS PARA CLASES CSS
 */
const containerClasses = computed(() => {
  const baseClasses = ['flex', 'items-center']
  
  if (props.center) {
    baseClasses.push('justify-center')
  }
  
  if (props.text) {
    baseClasses.push('flex-col', 'gap-2')
  } else {
    baseClasses.push('flex-row')
  }
  
  if (props.fullscreen) {
    baseClasses.push(
      'fixed', 'inset-0', 'z-50',
      'bg-white', 'bg-opacity-90'
    )
  } else if (props.overlay) {
    baseClasses.push(
      'absolute', 'inset-0', 'z-10',
      'bg-white', 'bg-opacity-75'
    )
  } else {
    baseClasses.push('p-4')
  }
  
  return baseClasses.join(' ')
})

const spinnerClasses = computed(() => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  const colorClasses = {
    white: 'text-white',
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    gray: 'text-gray-600',
    purple: 'text-purple-600'
  }
  
  return `${sizeClasses[props.size]} ${colorClasses[props.color]}`
})

const textClasses = computed(() => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  
  const colorClasses = {
    white: 'text-white',
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    gray: 'text-gray-600',
    purple: 'text-purple-600'
  }
  
  return `${sizeClasses[props.size]} ${colorClasses[props.color]} font-medium`
})

/**
 * PROPIEDADES PARA ACCESIBILIDAD
 */
const role = computed(() => props.fullscreen || props.overlay ? 'status' : undefined)
const ariaLabel = computed(() => props.text || 'Cargando...')
</script>

<style scoped>
/* Animación personalizada para el spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Mejoras de accesibilidad para usuarios con preferencias de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  .animate-spin {
    animation: none;
  }
}
</style>
