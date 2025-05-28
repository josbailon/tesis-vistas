<template>
  <div :class="getVariantClasses()">
    <div v-if="variant === 'logo-only'" class="flex items-center">
      <div class="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
        <span class="text-white font-bold text-sm">U</span>
      </div>
    </div>
    
    <div v-else-if="variant === 'full'" class="text-center">
      <div class="flex items-center justify-center mb-2">
        <div class="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-3">
          <span class="text-white font-bold text-lg">U</span>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-green-800">ULEAM</h1>
          <p class="text-sm text-green-600">Universidad Laica Eloy Alfaro de Manabí</p>
        </div>
      </div>
      <p class="text-xs text-green-600">Clínica Dental Universitaria</p>
    </div>
    
    <div v-else-if="variant === 'header'" class="text-center">
      <div class="flex items-center justify-center mb-4">
        <div class="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-4">
          <span class="text-white font-bold text-2xl">U</span>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-green-800">ULEAM</h1>
          <p class="text-lg text-green-600">Clínica Dental</p>
        </div>
      </div>
    </div>
    
    <div v-else-if="variant === 'footer'" class="flex items-center">
      <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-3">
        <span class="text-white font-bold">U</span>
      </div>
      <div>
        <h3 class="font-bold text-green-800">ULEAM</h3>
        <p class="text-sm text-green-600">Clínica Dental</p>
      </div>
    </div>
    
    <div v-else class="flex items-center">
      <div class="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-2">
        <span class="text-white font-bold text-sm">U</span>
      </div>
      <span class="font-semibold text-green-800">ULEAM</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['logo-only', 'full', 'header', 'footer', 'sidebar', 'default'].includes(value)
  }
})

const getVariantClasses = computed(() => {
  switch (props.variant) {
    case 'full':
      return 'p-4'
    case 'header':
      return 'p-6'
    case 'footer':
      return 'mb-4'
    default:
      return ''
  }
})
</script>
