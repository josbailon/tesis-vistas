"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Calendar,
  FileText,
  Users,
  Stethoscope,
  GraduationCap,
  CheckSquare,
  BarChart,
  Settings,
  Clock,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { sessionManager } from "@/lib/session-manager"
import { useRouter } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== "undefined") {
      const currentUser = sessionManager.getUser()
      if (currentUser) {
        setUser(currentUser)
      } else {
        router.push("/login")
      }
    }
  }, [router])

  const handleLogout = () => {
    sessionManager.logout()
    router.push("/login")
  }

  if (!user) {
    return null
  }

  return (
    <div className={cn("w-64 border-r bg-background h-screen", className)} {...props}>
      <div className="flex flex-col h-full p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Clínica Dental</h2>
          <p className="text-sm text-muted-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
        </div>

        <nav className="flex-1 space-y-1">
          <Link
            href="/dashboard"
            className={cn("flex items-center p-2 rounded-md hover:bg-accent", pathname === "/dashboard" && "bg-accent")}
          >
            <Home className="h-4 w-4 mr-2" />
            <span>Inicio</span>
          </Link>

          {/* Patient Links */}
          {user.role === "patient" && (
            <>
              <Link
                href="/dashboard/my-appointments"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/my-appointments" && "bg-accent",
                )}
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span>Mis Citas</span>
              </Link>
              <Link
                href="/dashboard/my-records"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/my-records" && "bg-accent",
                )}
              >
                <FileText className="h-4 w-4 mr-2" />
                <span>Mi Historial Clínico</span>
              </Link>
            </>
          )}

          {/* Student Links */}
          {user.role === "student" && (
            <>
              <Link
                href="/dashboard/appointment-management"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/appointment-management" && "bg-accent",
                )}
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span>Gestión de Citas</span>
              </Link>
              <Link
                href="/dashboard/patients"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/patients" && "bg-accent",
                )}
              >
                <Users className="h-4 w-4 mr-2" />
                <span>Pacientes</span>
              </Link>
              <Link
                href="/dashboard/clinical-history"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/clinical-history" && "bg-accent",
                )}
              >
                <FileText className="h-4 w-4 mr-2" />
                <span>Historias Clínicas</span>
              </Link>
              <Link
                href="/dashboard/approval-requests"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/approval-requests" && "bg-accent",
                )}
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                <span>Solicitudes de Aprobación</span>
              </Link>
              <Link
                href="/dashboard/academic"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/academic" && "bg-accent",
                )}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>Tareas Académicas</span>
              </Link>
            </>
          )}

          {/* Professor Links */}
          {user.role === "professor" && (
            <>
              <Link
                href="/dashboard/specialty"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/specialty" && "bg-accent",
                )}
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                <span>Mi Especialidad</span>
              </Link>
              <Link
                href="/dashboard/students"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/students" && "bg-accent",
                )}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>Mis Estudiantes</span>
              </Link>
              <Link
                href="/dashboard/approvals"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/approvals" && "bg-accent",
                )}
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                <span>Aprobaciones</span>
              </Link>
              <Link
                href="/dashboard/schedule"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/schedule" && "bg-accent",
                )}
              >
                <Clock className="h-4 w-4 mr-2" />
                <span>Horario</span>
              </Link>
            </>
          )}

          {/* Admin Links */}
          {user.role === "admin" && (
            <>
              <Link
                href="/dashboard/users"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/users" && "bg-accent",
                )}
              >
                <Users className="h-4 w-4 mr-2" />
                <span>Gestión de Usuarios</span>
              </Link>
              <Link
                href="/dashboard/specialties"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/specialties" && "bg-accent",
                )}
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                <span>Especialidades</span>
              </Link>
              <Link
                href="/dashboard/statistics"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/statistics" && "bg-accent",
                )}
              >
                <BarChart className="h-4 w-4 mr-2" />
                <span>Estadísticas</span>
              </Link>
              <Link
                href="/dashboard/settings"
                className={cn(
                  "flex items-center p-2 rounded-md hover:bg-accent",
                  pathname === "/dashboard/settings" && "bg-accent",
                )}
              >
                <Settings className="h-4 w-4 mr-2" />
                <span>Configuración</span>
              </Link>
            </>
          )}
        </nav>

        <div className="mt-auto pt-4">
          <Button variant="outline" className="w-full flex items-center justify-center" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
