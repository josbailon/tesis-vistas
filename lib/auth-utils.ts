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
}

export interface Session {
  user: User
  expires: Date
}

// Simulated authentication function
export async function authenticate(email: string, password: string) {
  // In a real application, you would verify credentials against a database
  // and use proper password hashing
  const user = users.find((u) => u.email === email)

  if (!user) {
    return { success: false, message: "Usuario no encontrado" }
  }

  // Simulate password check (in a real app, use proper password comparison)
  // For this mock, we'll assume the password is the first part of the email
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
    sameSite: "lax", // Added to ensure cookie is sent with navigation
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
    redirect("/dashboard") // Redirect to dashboard if role is not allowed
  }

  return session.user
}
