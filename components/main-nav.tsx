"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "./auth-provider"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  const { user } = useAuth()

  // Determinar los enlaces según el rol del usuario
  const getNavLinks = () => {
    if (!user) return []

    switch (user.role) {
      case "patient":
        return [
          { href: "/dashboard/my-appointments", label: "Mis Citas" },
          { href: "/dashboard/my-records", label: "Mi Expediente" },
        ]
      case "student":
        return [
          { href: "/dashboard/patients", label: "Pacientes" },
          { href: "/dashboard/appointment-management", label: "Gestión de Citas" },
          { href: "/dashboard/clinical-history", label: "Historias Clínicas" },
          { href: "/dashboard/approval-requests", label: "Solicitudes de Aprobación" },
          { href: "/dashboard/academic", label: "Tareas Académicas" },
        ]
      case "professor":
        return [
          { href: "/dashboard/specialty", label: "Mi Especialidad" },
          { href: "/dashboard/students", label: "Estudiantes" },
          { href: "/dashboard/approvals", label: "Aprobaciones" },
          { href: "/dashboard/schedule", label: "Horario" },
        ]
      case "admin":
        return [
          { href: "/dashboard/users", label: "Usuarios" },
          { href: "/dashboard/specialties", label: "Especialidades" },
          { href: "/dashboard/statistics", label: "Estadísticas" },
          { href: "/dashboard/settings", label: "Configuración" },
        ]
      default:
        return []
    }
  }

  const navLinks = getNavLinks()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href ? "text-primary" : "text-muted-foreground",
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
