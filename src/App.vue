<!--
  COMPONENTE RAÍZ DE LA APLICACIÓN
  
  Este es el componente principal que envuelve toda la aplicación.
  Contiene la estructura básica y maneja la inicialización de la autenticación.
-->
<template>
  <!-- 
    Contenedor principal de la aplicación
    El id="app" es donde se monta toda la aplicación Vue
  -->
  <div id="app">
    <!-- 
      router-view es donde se renderizan las diferentes páginas/vistas
      según la ruta actual del navegador
    -->
    <router-view />
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL COMPONENTE RAÍZ
 * 
 * Aquí se maneja la inicialización de la aplicación y la autenticación
 */

// Importar hooks de Vue para el ciclo de vida
import { onMounted } from 'vue'
// Importar el store de autenticación
import { useAuthStore } from './stores/auth'

// Obtener la instancia del store de autenticación
const authStore = useAuthStore()

/**
 * Hook que se ejecuta cuando el componente se monta en el DOM
 * Inicializa la autenticación verificando si hay una sesión guardada
 */
onMounted(() => {
  // Llamar al método del store para inicializar la autenticación
  // Esto verifica si hay un usuario logueado en localStorage
  authStore.initializeAuth()
})
</script>

<style>
/**
 * ESTILOS GLOBALES
 * 
 * Importa los estilos globales de Tailwind CSS
 * Estos estilos se aplican a toda la aplicación
 */
@import './assets/styles/globals.css';
</style>
