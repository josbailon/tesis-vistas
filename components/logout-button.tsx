"use client"

import { Button } from "@/components/ui/button"
import { Power } from "lucide-react"
import { sessionManager } from "@/lib/session-manager"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    sessionManager.logout()
    router.push("/login")
  }

  return (
    <Button variant="ghost" onClick={handleLogout}>
      <Power className="mr-2 h-4 w-4" />
      Cerrar Sesión
    </Button>
  )
}
