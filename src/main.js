/**
 * ARCHIVO PRINCIPAL DE LA APLICACIÓN VUE.JS
 *
 * Este archivo es el punto de entrada de toda la aplicación Vue.js.
 * Aquí se configuran todas las dependencias globales, plugins y se monta la aplicación.
 */

// Importaciones principales de Vue y dependencias
import { createApp } from "vue" // Función para crear la instancia de Vue 3
import { createPinia } from "pinia" // Store manager para gestión de estado global
import App from "./App.vue" // Componente raíz de la aplicación
import router from "./router" // Configuración de rutas de Vue Router
import "./assets/styles/globals.css" // Estilos globales de Tailwind CSS

// Crear la instancia principal de la aplicación Vue
const app = createApp(App)

// Crear la instancia de Pinia para gestión de estado
const pinia = createPinia()

// Registrar Pinia como plugin global
// Esto permite usar stores en cualquier componente de la aplicación
app.use(pinia)

// Registrar Vue Router como plugin global
// Esto habilita la navegación entre páginas/vistas
app.use(router)

// Configurar manejador global de errores
// Captura errores no manejados en componentes y los registra en consola
app.config.errorHandler = (err, vm, info) => {
  console.error("Error global capturado:", err, info)
}

// Configurar manejador global de advertencias
// Captura advertencias de Vue en desarrollo y las registra
app.config.warnHandler = (msg, vm, trace) => {
  console.warn("Advertencia global:", msg, trace)
}

// Montar la aplicación en el elemento DOM con id="app"
// Este elemento debe existir en el archivo index.html
app.mount("#app")
