<!--
  COMPONENTE DE LOADING SPINNER
  
  Spinner reutilizable con diferentes tamaños y colores
  para mostrar estados de carga en toda la aplicación
-->
<template>
  <div 
    :class="containerClasses"
    role="status" 
    :aria-label="ariaLabel"
  >
    <!-- Spinner SVG -->
    <svg
      :class="spinnerClasses"
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
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    
    <!-- Texto opcional -->
    <span v-if="text" :class="textClasses">
      {{ text }}
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * PROPS DEL COMPONENTE
 */
interface Props {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'white' | 'gray' | 'green'
  text?: string
  centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: 'primary',
  text: '',
  centered: false
})

/**
 * PROPIEDADES COMPUTADAS
 */
import { computed } from 'vue'

const containerClasses = computed(() => [
  'flex items-center',
  {
    'justify-center': props.centered,
    'gap-2': props.text,
    'gap-3': props.text && props.size === 'large'
  }
])

const spinnerClasses = computed(() => [
  'animate-spin',
  // Tamaños
  {
    'h-4 w-4': props.size === 'small',
    'h-6 w-6': props.size === 'medium',
    'h-8 w-8': props.size === 'large'
  },
  // Colores
  {
    'text-green-600': props.color === 'primary',
    'text-white': props.color === 'white',
    'text-gray-600': props.color === 'gray',
    'text-green-500': props.color === 'green'
  }
])

const textClasses = computed(() => [
  'font-medium',
  // Tamaños de texto
  {
    'text-sm': props.size === 'small',
    'text-base': props.size === 'medium',
    'text-lg': props.size === 'large'
  },
  // Colores de texto
  {
    'text-green-600': props.color === 'primary',
    'text-white': props.color === 'white',
    'text-gray-600': props.color === 'gray',
    'text-green-500': props.color === 'green'
  }
])

const ariaLabel = computed(() => {
  return props.text || 'Cargando...'
})
</script>

<style scoped>
/**
 * ANIMACIÓN PERSONALIZADA PARA EL SPINNER
 */
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

/**
 * MEJORAS DE ACCESIBILIDAD
 */
@media (prefers-reduced-motion: reduce) {
  .animate-spin {
    animation: none;
  }
}
</style>
