export interface AuthUser {
  email: string
  name: string
  role: string
}

class SessionManager {
  private readonly SESSION_KEY = "user"
  private readonly SESSION_EXPIRY_KEY = "session_expiry"
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 horas en milisegundos

  constructor() {
    // Inicializar si estamos en el cliente
    if (typeof window !== "undefined") {
      this.checkAndRenewSession()
    }
  }

  // Obtener usuario de la sesión
  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null

    try {
      // Verificar si la sesión ha expirado
      const expiryTime = localStorage.getItem(this.SESSION_EXPIRY_KEY)
      if (!expiryTime || new Date().getTime() > Number.parseInt(expiryTime)) {
        this.logout()
        return null
      }

      const userJson = localStorage.getItem(this.SESSION_KEY)
      if (!userJson) return null

      return JSON.parse(userJson) as AuthUser
    } catch (error) {
      console.error("Error al obtener usuario:", error)
      return null
    }
  }

  // Establecer usuario en la sesión
  setUser(user: AuthUser): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user))
      this.renewSession()
    } catch (error) {
      console.error("Error al establecer usuario:", error)
    }
  }

  // Renovar la sesión
  renewSession(): void {
    if (typeof window === "undefined") return

    const expiryTime = new Date().getTime() + this.SESSION_DURATION
    localStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString())
  }

  // Verificar y renovar la sesión si es necesario
  checkAndRenewSession(): void {
    if (typeof window === "undefined") return

    const user = this.getUser()
    if (user) {
      this.renewSession()
    }
  }

  // Cerrar sesión
  logout(): void {
    if (typeof window === "undefined") return

    localStorage.removeItem(this.SESSION_KEY)
    localStorage.removeItem(this.SESSION_EXPIRY_KEY)
  }
}

export const sessionManager = new SessionManager()
