export interface SessionData {
  user: {
    id: string
    email: string
    name: string
    role: string
    specialty?: string
  }
  expiresAt: number
}

class SessionManager {
  private readonly SESSION_KEY = "clinic_user"
  private readonly EXPIRY_KEY = "clinic_expiry"
  private readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  setSession(userData: SessionData["user"]): void {
    try {
      const expiresAt = Date.now() + this.SESSION_DURATION

      localStorage.setItem(this.SESSION_KEY, JSON.stringify(userData))
      localStorage.setItem(this.EXPIRY_KEY, expiresAt.toString())

      console.log("✅ Session saved:", userData.role)
    } catch (error) {
      console.error("❌ Failed to save session:", error)
    }
  }

  getSession(): SessionData["user"] | null {
    try {
      const userData = localStorage.getItem(this.SESSION_KEY)
      const expiry = localStorage.getItem(this.EXPIRY_KEY)

      if (!userData || !expiry) {
        return null
      }

      const expiresAt = Number.parseInt(expiry)
      if (Date.now() > expiresAt) {
        this.clearSession()
        console.log("⚠️ Session expired")
        return null
      }

      return JSON.parse(userData)
    } catch (error) {
      console.error("❌ Failed to get session:", error)
      this.clearSession()
      return null
    }
  }

  clearSession(): void {
    try {
      localStorage.removeItem(this.SESSION_KEY)
      localStorage.removeItem(this.EXPIRY_KEY)
      console.log("✅ Session cleared")
    } catch (error) {
      console.error("❌ Failed to clear session:", error)
    }
  }

  isSessionValid(): boolean {
    const session = this.getSession()
    return session !== null
  }

  extendSession(): void {
    const session = this.getSession()
    if (session) {
      this.setSession(session)
    }
  }

  getSessionExpiry(): number | null {
    try {
      const expiry = localStorage.getItem(this.EXPIRY_KEY)
      return expiry ? Number.parseInt(expiry) : null
    } catch (error) {
      return null
    }
  }
}

// Export singleton instance
export const sessionManager = new SessionManager()

// Export class for testing
export { SessionManager }
