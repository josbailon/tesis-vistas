"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { sessionManager } from "@/lib/session-manager"

export function LogoutButton() {
  const handleLogout = () => {
    sessionManager.logout()
    window.location.href = "/login"
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout} className="w-full flex items-center justify-center">
      <LogOut className="mr-2 h-4 w-4" />
      <span>Cerrar Sesión</span>
    </Button>
  )
}
