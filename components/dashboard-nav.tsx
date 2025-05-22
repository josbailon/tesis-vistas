"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useAuth } from "./auth-provider"

export function DashboardNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  // Determinar los enlaces según el rol del usuario
  const getNavItems = () => {
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

  const navItems = getNavItems()

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
