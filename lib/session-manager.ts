// Tipo para el usuario autenticado
export interface AuthUser {
  email: string
  role: string
  name: string
}

// Clase para gestionar la sesión del usuario
class SessionManager {
  private readonly SESSION_KEY = "dental_clinic_session"
  private readonly SESSION_EXPIRY_KEY = "dental_clinic_session_expiry"
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 horas en milisegundos

  // Iniciar sesión
  login(user: AuthUser): void {
    try {
      // Guardar datos del usuario
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user))

      // Establecer tiempo de expiración
      const expiryTime = Date.now() + this.SESSION_DURATION
      localStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString())

      // Establecer una cookie de sesión como respaldo
      this.setCookie("session_active", "true", this.SESSION_DURATION / 1000)

      console.log("Sesión iniciada correctamente:", user)
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
    }
  }

  // Cerrar sesión
  logout(): void {
    try {
      localStorage.removeItem(this.SESSION_KEY)
      localStorage.removeItem(this.SESSION_EXPIRY_KEY)
      this.deleteCookie("session_active")
      console.log("Sesión cerrada correctamente")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  // Obtener usuario actual
  getUser(): AuthUser | null {
    try {
      // Verificar si la sesión ha expirado
      if (this.isSessionExpired()) {
        console.log("La sesión ha expirado")
        this.logout()
        return null
      }

      // Obtener datos del usuario
      const userData = localStorage.getItem(this.SESSION_KEY)
      if (!userData) {
        return null
      }

      // Renovar la sesión automáticamente
      this.renewSession()

      return JSON.parse(userData) as AuthUser
    } catch (error) {
      console.error("Error al obtener usuario:", error)
      return null
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getUser() !== null
  }

  // Verificar si la sesión ha expirado
  private isSessionExpired(): boolean {
    try {
      const expiryTimeStr = localStorage.getItem(this.SESSION_EXPIRY_KEY)
      if (!expiryTimeStr) {
        return true
      }

      const expiryTime = Number.parseInt(expiryTimeStr, 10)
      return Date.now() > expiryTime
    } catch (error) {
      console.error("Error al verificar expiración de sesión:", error)
      return true
    }
  }

  // Renovar la sesión
  private renewSession(): void {
    try {
      const userData = localStorage.getItem(this.SESSION_KEY)
      if (!userData) {
        return
      }

      // Actualizar tiempo de expiración
      const expiryTime = Date.now() + this.SESSION_DURATION
      localStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString())

      // Renovar cookie de sesión
      this.setCookie("session_active", "true", this.SESSION_DURATION / 1000)

      console.log("Sesión renovada correctamente")
    } catch (error) {
      console.error("Error al renovar sesión:", error)
    }
  }

  // Establecer una cookie
  private setCookie(name: string, value: string, expirySeconds: number): void {
    try {
      const date = new Date()
      date.setTime(date.getTime() + expirySeconds * 1000)
      const expires = `expires=${date.toUTCString()}`
      document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`
    } catch (error) {
      console.error("Error al establecer cookie:", error)
    }
  }

  // Eliminar una cookie
  private deleteCookie(name: string): void {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
    } catch (error) {
      console.error("Error al eliminar cookie:", error)
    }
  }
}

// Exportar una instancia única del gestor de sesiones
export const sessionManager = new SessionManager()
