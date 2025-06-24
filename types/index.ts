export interface MainNavItem {
  title: string
  href: string
  disabled?: boolean
}

export interface SidebarNavItem {
  title: string
  href: string
  icon: any
  description?: string
}

export interface User {
  id: string
  email: string
  name: string
  role: string
  specialty?: string
}

export interface Appointment {
  id: string
  patientName: string
  studentName: string
  date: string
  time: string
  specialty: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  priority: "low" | "medium" | "high" | "urgent"
  notes?: string
}

export interface Student {
  id: string
  name: string
  email: string
  semester: number
  specialty: string
  credits: number
  totalCredits: number
  gpa: number
  attendance: number
  status: "active" | "inactive" | "graduated" | "suspended"
}
