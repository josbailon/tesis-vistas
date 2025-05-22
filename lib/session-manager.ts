interface AuthUser {
  email: string
  role: string
  name: string
}

const SESSION_KEY = "user"
const EXPIRATION_KEY = "expiration"

const sessionManager = {
  login: (user: AuthUser) => {
    try {
      const expiration = new Date()
      expiration.setDate(expiration.getDate() + 1) // Expira en 24 horas

      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
      localStorage.setItem(EXPIRATION_KEY, expiration.toISOString())

      console.log("Sesión establecida:", user)
    } catch (e) {
      console.error("Error al establecer la sesión:", e)
    }
  },

  logout: () => {
    try {
      localStorage.removeItem(SESSION_KEY)
      localStorage.removeItem(EXPIRATION_KEY)
      console.log("Sesión cerrada")
    } catch (e) {
      console.error("Error al cerrar la sesión:", e)
    }
  },

  getUser: (): AuthUser | null => {
    try {
      const storedUser = localStorage.getItem(SESSION_KEY)
      const storedExpiration = localStorage.getItem(EXPIRATION_KEY)

      if (!storedUser || !storedExpiration) {
        return null
      }

      const expiration = new Date(storedExpiration)
      if (expiration <= new Date()) {
        // Sesión expirada, cerrar sesión
        sessionManager.logout()
        return null
      }

      // Renovar la expiración
      const user = JSON.parse(storedUser) as AuthUser
      sessionManager.login(user) // Renovar la sesión

      return user
    } catch (e) {
      console.error("Error al obtener el usuario de la sesión:", e)
      return null
    }
  },
}

export { sessionManager }
export type { AuthUser }
