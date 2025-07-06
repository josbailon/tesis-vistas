<!--
  COMPONENTE DE BRANDING ULEAM
  
  Componente reutilizable que muestra el logo y branding
  de la Universidad Laica Eloy Alfaro de Manabí
-->
<template>
  <div :class="containerClass">
    <!-- Logo SVG -->
    <div v-if="showLogo" :class="logoClass">
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        class="w-full h-full"
      >
        <!-- Círculo exterior -->
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="currentColor" 
          stroke-width="3" 
          fill="none"
        />
        
        <!-- Símbolo dental estilizado -->
        <path 
          d="M35 30 C35 25, 40 20, 50 20 C60 20, 65 25, 65 30 L65 45 C65 55, 60 65, 50 70 C40 65, 35 55, 35 45 Z" 
          fill="currentColor" 
          opacity="0.8"
        />
        
        <!-- Detalle interno -->
        <ellipse 
          cx="50" 
          cy="40" 
          rx="8" 
          ry="12" 
          fill="white"
        />
        
        <!-- Texto ULEAM estilizado -->
        <text 
          x="50" 
          y="85" 
          text-anchor="middle" 
          class="text-xs font-bold" 
          fill="currentColor"
        >
          ULEAM
        </text>
      </svg>
    </div>
    
    <!-- Texto -->
    <div v-if="showText" :class="textContainerClass">
      <h1 v-if="variant === 'full' || variant === 'header'" :class="titleClass">
        {{ title }}
      </h1>
      <p v-if="showSubtitle" :class="subtitleClass">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL COMPONENTE ULEAM BRANDING
 * 
 * Componente flexible que puede mostrar diferentes variantes
 * del branding de ULEAM según las necesidades
 */

import { computed } from 'vue'

// Props del componente
const props = defineProps({
  // Variante del branding
  variant: {
    type: String,
    default: 'full',
    validator: (value) => ['full', 'logo-only', 'text-only', 'header', 'compact'].includes(value)
  },
  // Tamaño del componente
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  // Color del branding
  color: {
    type: String,
    default: 'green',
    validator: (value) => ['green', 'blue', 'white', 'gray'].includes(value)
  },
  // Título personalizado
  customTitle: {
    type: String,
    default: ''
  },
  // Subtítulo personalizado
  customSubtitle: {
    type: String,
    default: ''
  }
})

// Títulos y subtítulos por defecto
const defaultTitles = {
  full: 'Universidad Laica Eloy Alfaro de Manabí',
  header: 'ULEAM',
  compact: 'ULEAM'
}

const defaultSubtitles = {
  full: 'Clínica Dental Universitaria',
  header: 'Clínica Dental',
  compact: 'Dental'
}

// Computed properties
const showLogo = computed(() => {
  return ['full', 'logo-only', 'header', 'compact'].includes(props.variant)
})

const showText = computed(() => {
  return ['full', 'text-only', 'header', 'compact'].includes(props.variant)
})

const showSubtitle = computed(() => {
  return ['full', 'header'].includes(props.variant)
})

const title = computed(() => {
  return props.customTitle || defaultTitles[props.variant] || 'ULEAM'
})

const subtitle = computed(() => {
  return props.customSubtitle || defaultSubtitles[props.variant] || 'Clínica Dental'
})

// Clases CSS computadas
const containerClass = computed(() => {
  const baseClasses = 'flex items-center'
  const orientationClasses = {
    full: 'flex-col text-center',
    'logo-only': 'justify-center',
    'text-only': 'flex-col',
    header: 'gap-3',
    compact: 'gap-2'
  }
  
  return `${baseClasses} ${orientationClasses[props.variant] || ''}`
})

const logoClass = computed(() => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }
  
  const colorClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600'
  }
  
  // Ajustar tamaño según variante
  let size = props.size
  if (props.variant === 'compact') {
    size = 'small'
  } else if (props.variant === 'full') {
    size = props.size === 'small' ? 'medium' : props.size === 'medium' ? 'large' : 'large'
  }
  
  return `${sizeClasses[size]} ${colorClasses[props.color]} flex-shrink-0`
})

const textContainerClass = computed(() => {
  if (props.variant === 'full') {
    return 'mt-3'
  } else if (props.variant === 'compact') {
    return 'min-w-0'
  }
  return ''
})

const titleClass = computed(() => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl'
  }
  
  const colorClasses = {
    green: 'text-green-700',
    blue: 'text-blue-700',
    white: 'text-white',
    gray: 'text-gray-700'
  }
  
  let size = props.size
  if (props.variant === 'compact') {
    size = 'small'
  } else if (props.variant === 'header') {
    size = props.size === 'large' ? 'large' : 'medium'
  }
  
  return `font-bold ${sizeClasses[size]} ${colorClasses[props.color]} leading-tight`
})

const subtitleClass = computed(() => {
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  }
  
  const colorClasses = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    white: 'text-white opacity-90',
    gray: 'text-gray-600'
  }
  
  let size = props.size
  if (props.variant === 'compact') {
    size = 'small'
  }
  
  return `${sizeClasses[size]} ${colorClasses[props.color]} mt-1`
})
</script>
