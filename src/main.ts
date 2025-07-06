/**
 * PUNTO DE ENTRADA PRINCIPAL DE LA APLICACIÓN
 *
 * Este archivo configura e inicializa la aplicación Vue.js con:
 * - Pinia para gestión de estado
 * - Vue Router para navegación
 * - Configuración global de componentes
 * - Inicialización de servicios
 */

import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router"
import App from "./App.vue"

// Importar estilos globales
import "./assets/styles/globals.css"

// Importar store de autenticación para inicialización
import { useAuthStore } from "./stores/auth"

/**
 * CREAR INSTANCIA DE LA APLICACIÓN
 */
const app = createApp(App)

/**
 * INICIALIZAR APLICACIÓN
 */
const initializeApp = async () => {
  const authStore = useAuthStore()
  try {
    // Configurar PINIA (GESTIÓN DE ESTADO)
    const pinia = createPinia()
    app.use(pinia)

    // Configurar ROUTER
    app.use(router)

    // PROPIEDADES GLOBALES
    app.config.globalProperties.$appName = "ULEAM Clínica Dental"
    app.config.globalProperties.$version = "1.0.0"

    // Montar la aplicación
    const mountedApp = app.mount("#app")

    // Inicializar autenticación después del montaje
    await authStore.initializeAuth()

    console.log("✅ Aplicación inicializada correctamente")

    return mountedApp
  } catch (error) {
    console.error("❌ Error inicializando aplicación:", error)

    // Mostrar mensaje de error al usuario
    document.body.innerHTML = `
      <div style="
        display: flex; 
        justify-content: center; 
        align-items: center; 
        height: 100vh; 
        font-family: system-ui, -apple-system, sans-serif;
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      ">
        <div style="
          text-align: center; 
          padding: 2rem; 
          background: white; 
          border-radius: 8px; 
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          max-width: 400px;
        ">
          <h1 style="color: #dc2626; margin-bottom: 1rem;">Error de Inicialización</h1>
          <p style="color: #6b7280; margin-bottom: 1rem;">
            No se pudo cargar la aplicación. Por favor, recarga la página.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: #16a34a; 
              color: white; 
              border: none; 
              padding: 0.5rem 1rem; 
              border-radius: 4px; 
              cursor: pointer;
            "
          >
            Recargar Página
          </button>
        </div>
      </div>
    `
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}

// Exportar la aplicación para testing
export { app }
