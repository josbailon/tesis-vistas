<!--
  LAYOUT DEL DASHBOARD
  
  Este componente define la estructura visual del área privada de la aplicación.
  Incluye el sidebar de navegación y el área principal de contenido.
-->
<template>
  <!-- 
    Contenedor principal con altura completa de pantalla
    Usa flexbox para dividir el espacio entre sidebar y contenido
  -->
  <div class="flex h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
    
    <!-- SIDEBAR DE NAVEGACIÓN -->
    <!-- Componente reutilizable que maneja toda la navegación -->
    <Sidebar />
    
    <!-- ÁREA PRINCIPAL DE CONTENIDO -->
    <div class="flex-grow overflow-y-auto">
      <!-- Contenedor con padding para el contenido -->
      <main class="p-6">
        <!-- 
          Tarjeta principal que envuelve el contenido
          Proporciona un fondo blanco con bordes redondeados y sombra
        -->
        <div class="bg-white rounded-xl shadow-lg border border-green-200/50 min-h-full p-6 backdrop-blur-sm">
          <!-- 
            router-view renderiza el componente de la ruta actual
            Aquí se muestran las diferentes páginas del dashboard
          -->
          <router-view />
        </div>
      </main>
    </div>
    
  </div>
</template>

<script setup>
/**
 * LÓGICA DEL LAYOUT DEL DASHBOARD
 * 
 * Este layout es simple ya que la lógica principal está en el Sidebar
 * Solo necesita importar y usar el componente Sidebar
 */

// Importar el componente Sidebar
import Sidebar from '../components/Sidebar.vue'
</script>
