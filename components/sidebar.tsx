import Link from "next/link"
import { useSession } from "next-auth/react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar-menu"
import { BookOpen, FileText, Stethoscope, Calendar, UserPlus, BarChart } from "lucide-react"

export function Sidebar() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="md:hidden" />
      </SheetTrigger>
      <SheetContent className="w-full sm:w-64">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navega a través de las opciones disponibles.</SheetDescription>
        </SheetHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">Inicio</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {user?.role === "student" && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/assignments">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Mis Tareas
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {user?.role === "professor" && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/teacher/clinical-history">
                    <FileText className="mr-2 h-4 w-4" />
                    Historias Clínicas
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/teacher/clinical-cases">
                    <Stethoscope className="mr-2 h-4 w-4" />
                    Casos Clínicos
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
          {user?.role === "secretary" && (
            <>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/secretary/appointments">
                    <Calendar className="mr-2 h-4 w-4" />
                    Gestión de Citas
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/secretary/patient-registration">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registro de Pacientes
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/secretary/reports">
                    <BarChart className="mr-2 h-4 w-4" />
                    Reportes
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
        </SidebarMenu>
      </SheetContent>
    </Sheet>
  )
}
