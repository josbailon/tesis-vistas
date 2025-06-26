import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import "./assets/styles/globals.css"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error("Global error:", err, info)
}

// Global warning handler
app.config.warnHandler = (msg, vm, trace) => {
  console.warn("Global warning:", msg, trace)
}

app.mount("#app")
