import type React from "react"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth-utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { LogoutButton } from "@/components/logout-button"
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
} from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold">Clínica Dental</h2>
            <p className="text-sm text-muted-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Inicio</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Patient Links */}
              {user.role === "patient" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/my-appointments">
                        <Calendar className="h-4 w-4" />
                        <span>Mis Citas</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/my-records">
                        <FileText className="h-4 w-4" />
                        <span>Mi Historial Clínico</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Student Links */}
              {user.role === "student" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/appointment-management">
                        <Calendar className="h-4 w-4" />
                        <span>Gestión de Citas</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/patients">
                        <Users className="h-4 w-4" />
                        <span>Pacientes</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/clinical-history">
                        <FileText className="h-4 w-4" />
                        <span>Historias Clínicas</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/approval-requests">
                        <CheckSquare className="h-4 w-4" />
                        <span>Solicitudes de Aprobación</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/academic">
                        <GraduationCap className="h-4 w-4" />
                        <span>Tareas Académicas</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Professor Links */}
              {user.role === "professor" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/specialty">
                        <Stethoscope className="h-4 w-4" />
                        <span>Mi Especialidad</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/students">
                        <GraduationCap className="h-4 w-4" />
                        <span>Mis Estudiantes</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/approvals">
                        <CheckSquare className="h-4 w-4" />
                        <span>Aprobaciones</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/schedule">
                        <Clock className="h-4 w-4" />
                        <span>Horario</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}

              {/* Admin Links */}
              {user.role === "admin" && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/users">
                        <Users className="h-4 w-4" />
                        <span>Gestión de Usuarios</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/specialties">
                        <Stethoscope className="h-4 w-4" />
                        <span>Especialidades</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/statistics">
                        <BarChart className="h-4 w-4" />
                        <span>Estadísticas</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/dashboard/settings">
                        <Settings className="h-4 w-4" />
                        <span>Configuración</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <LogoutButton />
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <SidebarTrigger />
            </div>
          </div>
          <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>
        </div>
      </div>
    </SidebarProvider>
  )
}
