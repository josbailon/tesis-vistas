<!--
  COMPONENTE DE SPINNER DE CARGA
  
  Componente reutilizable para mostrar estados de carga
  en diferentes partes de la aplicación
-->
<template>
  <div :class="containerClass">
    <!-- Spinner animado -->
    <div :class="spinnerClass">
      <svg 
        class="animate-spin h-full w-full" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          class="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          stroke-width="4"
        ></circle>
        <path 
          class="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    
    <!-- Texto de carga (opcional) -->
    <p v-if="text" :class="textClass">
      {{ text }}
    </p>
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL COMPONENTE LOADING SPINNER
 * 
 * Componente simple y reutilizable para mostrar estados de carga
 */

import { computed } from 'vue'

// Props del componente
const props = defineProps({
  // Tamaño del spinner
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  // Texto a mostrar debajo del spinner
  text: {
    type: String,
    default: ''
  },
  // Si debe ocupar toda la pantalla
  fullscreen: {
    type: Boolean,
    default: false
  },
  // Color del spinner
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'red', 'yellow', 'gray'].includes(value)
  }
})

// Clases computadas para el contenedor
const containerClass = computed(() => {
  const baseClasses = 'flex flex-col items-center justify-center'
  
  if (props.fullscreen) {
    return `${baseClasses} fixed inset-0 bg-white bg-opacity-90 z-50`
  }
  
  return `${baseClasses} p-4`
})

// Clases computadas para el spinner
const spinnerClass = computed(() => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }
  
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    gray: 'text-gray-600'
  }
  
  return `${sizeClasses[props.size]} ${colorClasses[props.color]}`
})

// Clases computadas para el texto
const textClass = computed(() => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }
  
  return `mt-2 text-gray-600 ${sizeClasses[props.size]}`
})
</script>
