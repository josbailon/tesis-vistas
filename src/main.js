/**
 * ARCHIVO PRINCIPAL DE LA APLICACIÓN VUE
 *
 * Este archivo inicializa la aplicación Vue y configura
 * todos los plugins y dependencias necesarias
 */

// Importar función para crear la aplicación Vue
import { createApp } from "vue"
// Importar el componente raíz
import App from "./App.vue"
// Importar el router
import router from "./router"
// Importar Pinia para gestión de estado
import { createPinia } from "pinia"
// Importar estilos globales
import "./assets/styles/globals.css"

/**
 * CREAR INSTANCIA DE LA APLICACIÓN
 *
 * Crear la aplicación Vue con el componente raíz
 */
const app = createApp(App)

/**
 * CONFIGURAR PINIA
 *
 * Pinia es el store oficial de Vue 3 para gestión de estado
 */
const pinia = createPinia()

/**
 * INSTALAR PLUGINS
 *
 * Instalar router y pinia en la aplicación
 */
app.use(router)
app.use(pinia)

/**
 * CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
 *
 * Configuraciones que se aplican a toda la aplicación
 */

// Configurar propiedades globales
app.config.globalProperties.$appName = "ULEAM Clínica Dental"
app.config.globalProperties.$version = "1.0.0"

// Configurar manejo de errores global
app.config.errorHandler = (err, instance, info) => {
  console.error("Error global capturado:", err)
  console.error("Información del error:", info)

  // En producción, aquí se enviaría el error a un servicio de monitoreo
  // como Sentry, LogRocket, etc.
}

// Configurar advertencias en desarrollo
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn("Advertencia Vue:", msg)
    console.warn("Trace:", trace)
  }
}

/**
 * MONTAR LA APLICACIÓN
 *
 * Montar la aplicación en el elemento con id 'app'
 */
app.mount("#app")

/**
 * CONFIGURACIÓN ADICIONAL PARA DESARROLLO
 *
 * Configuraciones que solo se aplican en modo desarrollo
 */
if (import.meta.env.DEV) {
  // Hacer la aplicación accesible globalmente para debugging
  window.__VUE_APP__ = app

  // Log de información de la aplicación
  console.log("🦷 ULEAM Clínica Dental - Aplicación iniciada")
  console.log("📱 Modo:", import.meta.env.MODE)
  console.log("🔧 Versión de Vue:", app.version)
}

/**
 * CONFIGURACIÓN DE SERVICE WORKER
 *
 * Registrar service worker para funcionalidades PWA (opcional)
 */
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registrado: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registro falló: ", registrationError)
      })
  })
}

/**
 * CONFIGURACIÓN DE NOTIFICACIONES
 *
 * Solicitar permisos para notificaciones del navegador
 */
if ("Notification" in window && import.meta.env.PROD) {
  // Solicitar permiso para notificaciones
  if (Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      console.log("Permiso de notificaciones:", permission)
    })
  }
}

/**
 * CONFIGURACIÓN DE ANALYTICS
 *
 * Inicializar servicios de analytics en producción
 */
if (import.meta.env.PROD) {
  // Aquí se inicializarían servicios como Google Analytics, Mixpanel, etc.
  console.log("Analytics inicializado")
}

/**
 * EXPORTAR INSTANCIA DE LA APLICACIÓN
 *
 * Exportar para uso en tests o configuraciones adicionales
 */
export default app
