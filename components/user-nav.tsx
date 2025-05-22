"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "./auth-provider"

export function UserNav() {
  const { user } = useAuth()

  if (!user) return null

  // Obtener las iniciales del correo electrónico
  const getInitials = () => {
    if (!user.email) return "U"
    return user.email.charAt(0).toUpperCase()
  }

  // Obtener el nombre para mostrar basado en el rol
  const getDisplayRole = () => {
    switch (user.role) {
      case "patient":
        return "Paciente"
      case "student":
        return "Estudiante"
      case "professor":
        return "Profesor"
      case "admin":
        return "Administrador"
      default:
        return "Usuario"
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col space-y-0.5 text-right">
        <p className="text-sm font-medium">{user.email}</p>
        <p className="text-xs text-muted-foreground">{getDisplayRole()}</p>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarFallback>{getInitials()}</AvatarFallback>
      </Avatar>
    </div>
  )
}
