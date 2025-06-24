"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { users } from "./mock-data"

export type UserRole = "patient" | "student" | "professor" | "admin" | "secretary"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  specialty?: string
  professor?: string
  profileImage?: string
  department?: string
  permissions?: string[]
}

export interface Session {
  user: User
  expires: Date
}

// Simulated authentication function
export async function authenticate(email: string, password: string) {
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { success: false, message: "Usuario no encontrado" }
  }

  // Simulate password check
  const mockPassword = email.split("@")[0]
  if (password !== mockPassword) {
    return { success: false, message: "Contraseña incorrecta" }
  }

  // Create a session
  const session: Session = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
      specialty: user.specialty,
      professor: user.professor,
      profileImage: user.profileImage,
      department: user.department,
      permissions: user.permissions,
    },
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
  }

  // Store session in cookies
  const sessionCookie = JSON.stringify(session)
  cookies().set("session", sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "lax",
  })

  return { success: true, user: session.user }
}

// Function to get the current session
export async function getSession(): Promise<Session | null> {
  const sessionCookie = cookies().get("session")?.value

  if (!sessionCookie) {
    return null
  }

  try {
    const session: Session = JSON.parse(sessionCookie)

    // Check if session has expired
    if (new Date(session.expires) < new Date()) {
      cookies().delete("session")
      return null
    }

    return session
  } catch (error) {
    return null
  }
}

// Function to get the current user
export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user || null
}

// Function to log out
export async function logout() {
  cookies().delete("session")
  redirect("/login")
}

// Middleware to protect routes based on role
export async function requireAuth(allowedRoles?: UserRole[]) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    redirect("/dashboard")
  }

  return session.user
}

// Check permissions
export function hasPermission(user: User, permission: string): boolean {
  if (user.role === "admin") return true
  return user.permissions?.includes(permission) || false
}

// Get role-specific permissions
export function getRolePermissions(role: UserRole): string[] {
  switch (role) {
    case "admin":
      return ["*"] // All permissions
    case "professor":
      return [
        "view_students",
        "manage_assignments",
        "grade_students",
        "approve_treatments",
        "view_medical_records",
        "manage_evaluations",
      ]
    case "student":
      return [
        "view_patients",
        "manage_own_patients",
        "create_medical_records",
        "submit_assignments",
        "request_extensions",
        "schedule_appointments",
      ]
    case "secretary":
      return [
        "assign_patients",
        "view_schedules",
        "manage_appointments",
        "view_student_schedules",
        "coordinate_assignments",
      ]
    case "patient":
      return ["view_own_records", "book_appointments", "view_appointments"]
    default:
      return []
  }
}
