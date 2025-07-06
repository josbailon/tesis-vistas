<!--
  COMPONENTE ITEM DEL SIDEBAR
  
  Elemento individual de navegación del sidebar
  con soporte para iconos y estados activos
-->
<template>
  <router-link
    :to="to"
    v-slot="{ href, navigate, isActive, isExactActive }"
  >
    <a
      :href="href"
      @click="navigate"
      :class="[
        'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
        {
          'bg-green-700/50 text-white': isActive || isExactActive,
          'text-green-200 hover:text-white hover:bg-green-700/30': !isActive && !isExactActive,
          'justify-center': collapsed,
          'space-x-3': !collapsed
        }
      ]"
      :title="collapsed ? label : undefined"
    >
      <!-- Icono -->
      <component 
        :is="icon" 
        class="h-5 w-5 flex-shrink-0"
        :class="{
          'text-white': isActive || isExactActive,
          'text-green-300 group-hover:text-white': !isActive && !isExactActive
        }"
      />
      
      <!-- Label (solo visible cuando no está colapsado) -->
      <span 
        v-if="!collapsed"
        class="transition-opacity duration-300"
        :class="{
          'text-white': isActive || isExactActive,
          'text-green-200 group-hover:text-white': !isActive && !isExactActive
        }"
      >
        {{ label }}
      </span>
      
      <!-- Indicador de activo -->
      <div
        v-if="(isActive || isExactActive) && !collapsed"
        class="ml-auto w-2 h-2 bg-white rounded-full"
      />
    </a>
  </router-link>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { Component } from 'vue'

/**
 * PROPS DEL COMPONENTE
 */
interface Props {
  to: RouteLocationRaw
  icon: Component
  label: string
  collapsed: boolean
}

defineProps<Props>()
</script>

<style scoped>
/**
 * TRANSICIONES SUAVES
 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/**
 * EFECTOS HOVER
 */
.group:hover .group-hover\:text-white {
  color: white;
}

/**
 * ESTADOS DE FOCUS
 */
a:focus {
  outline: 2px solid rgba(34, 197, 94, 0.5);
  outline-offset: 2px;
}
</style>
