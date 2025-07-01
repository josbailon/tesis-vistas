<!--
  COMPONENTE DE BRANDING DE ULEAM
  
  Este componente muestra el logo y branding de la Universidad Laica Eloy Alfaro de Manabí
  en diferentes variantes según el contexto donde se use.
-->
<template>
  <!-- 
    Contenedor principal con clases dinámicas según la variante
    getVariantClasses() retorna las clases CSS apropiadas
  -->
  <div :class="getVariantClasses()">
    
    <!-- VARIANTE: Solo Logo -->
    <div v-if="variant === 'logo-only'" class="flex items-center">
      <!-- Logo circular con gradiente verde -->
      <div class="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
        <span class="text-white font-bold text-sm">U</span>
      </div>
    </div>
    
    <!-- VARIANTE: Completa con descripción -->
    <div v-else-if="variant === 'full'" class="text-center">
      <div class="flex items-center justify-center mb-2">
        <!-- Logo más grande para variante completa -->
        <div class="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-3">
          <span class="text-white font-bold text-lg">U</span>
        </div>
        <div>
          <!-- Nombre de la universidad -->
          <h1 class="text-2xl font-bold text-green-800">ULEAM</h1>
          <p class="text-sm text-green-600">Universidad Laica Eloy Alfaro de Manabí</p>
        </div>
      </div>
      <!-- Descripción adicional -->
      <p class="text-xs text-green-600">Clínica Dental Universitaria</p>
    </div>
    
    <!-- VARIANTE: Header (para páginas principales) -->
    <div v-else-if="variant === 'header'" class="text-center">
      <div class="flex items-center justify-center mb-4">
        <!-- Logo extra grande para headers -->
        <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-4">
          <span class="text-white font-bold text-2xl">U</span>
        </div>
        <div>
          <!-- Títulos grandes para headers -->
          <h1 class="text-3xl font-bold text-green-800">ULEAM</h1>
          <p class="text-lg text-green-600">Clínica Dental</p>
        </div>
      </div>
    </div>
    
    <!-- VARIANTE: Footer -->
    <div v-else-if="variant === 'footer'" class="flex items-center">
      <!-- Logo mediano para footer -->
      <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-3">
        <span class="text-white font-bold">U</span>
      </div>
      <div>
        <h3 class="font-bold text-green-800">ULEAM</h3>
        <p class="text-sm text-green-600">Clínica Dental</p>
      </div>
    </div>
    
    <!-- VARIANTE: Por defecto (compacta) -->
    <div v-else class="flex items-center">
      <!-- Logo pequeño para uso general -->
      <div class="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-2">
        <span class="text-white font-bold text-sm">U</span>
      </div>
      <span class="font-semibold text-green-800">ULEAM</span>
    </div>
    
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL COMPONENTE DE BRANDING
 * 
 * Maneja las diferentes variantes de presentación del logo ULEAM
 */

// Importar computed para propiedades reactivas calculadas
import { computed } from 'vue'

/**
 * DEFINICIÓN DE PROPS
 * 
 * Props que recibe el componente desde el componente padre
 */
const props = defineProps({
  // Variante del branding a mostrar
  variant: {
    type: String,
    default: 'default', // Valor por defecto
    // Validador para asegurar que solo se usen variantes válidas
    validator: (value) => [
      'logo-only', 
      'full', 
      'header', 
      'footer', 
      'sidebar', 
      'default'
    ].includes(value)
  }
})

/**
 * COMPUTED PROPERTY PARA CLASES CSS
 * 
 * Retorna las clases CSS apropiadas según la variante seleccionada
 * Se recalcula automáticamente cuando cambia la prop variant
 */
const getVariantClasses = computed(() => {
  switch (props.variant) {
    case 'full':
      return 'p-4' // Padding para variante completa
    case 'header':
      return 'p-6' // Padding mayor para headers
    case 'footer':
      return 'mb-4' // Margen inferior para footers
    default:
      return '' // Sin clases adicionales para variante por defecto
  }
})
</script>
