import { Home, LayoutDashboard, Settings, Users, FileText, Stethoscope } from "lucide-react"

interface SidebarItemProps {
  title: string
  href: string
  icon: any
  roles: string[]
}

const sidebarItems: SidebarItemProps[] = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: Home,
    roles: ["admin", "professor", "student", "secretary"],
  },
  {
    title: "Panel",
    href: "/dashboard/panel",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    title: "Ajustes",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["admin", "professor", "student", "secretary"],
  },
  // Para Secretario agregar:
  {
    title: "Gestión Pacientes",
    href: "/dashboard/secretary/patients",
    icon: Users,
    roles: ["secretary"],
  },

  // Para Estudiantes agregar:
  {
    title: "Casos Clínicos",
    href: "/dashboard/students/clinical-cases",
    icon: FileText,
    roles: ["student"],
  },
  {
    title: "Odontograma",
    href: "/dashboard/students/odontogram",
    icon: Stethoscope,
    roles: ["student"],
  },

  // Para Admin agregar:
  {
    title: "Usuarios",
    href: "/dashboard/admin/users",
    icon: Users,
    roles: ["admin"],
  },

  // Para Profesores agregar páginas por especialidad:
  {
    title: "Endodoncia",
    href: "/dashboard/professor/endodoncia",
    icon: Stethoscope,
    roles: ["professor"],
  },
  {
    title: "Ortodoncia",
    href: "/dashboard/professor/ortodoncia",
    icon: Stethoscope,
    roles: ["professor"],
  },
  {
    title: "Cirugía Oral",
    href: "/dashboard/professor/cirugia-oral",
    icon: Stethoscope,
    roles: ["professor"],
  },
]

export default sidebarItems
