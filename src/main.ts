import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router"
import App from "./App.vue"

// Import global styles
import "./assets/styles/globals.css"

// Create Vue app
const app = createApp(App)

// Use Pinia for state management
const pinia = createPinia()
app.use(pinia)

// Use Vue Router
app.use(router)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error("Global error:", err)
  console.error("Component instance:", instance)
  console.error("Error info:", info)

  // You can send error to logging service here
  // logErrorToService(err, instance, info)
}

// Global warning handler
app.config.warnHandler = (msg, instance, trace) => {
  console.warn("Global warning:", msg)
  console.warn("Component instance:", instance)
  console.warn("Component trace:", trace)
}

// Mount the app
app.mount("#app")

// Service worker registration (optional)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Performance monitoring (optional)
if (import.meta.env.DEV) {
  // Development performance monitoring
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log("Performance entry:", entry)
    }
  })

  observer.observe({ entryTypes: ["navigation", "resource"] })
}
