import { users } from "./mock-data"

// Función para simular autenticación
export const authenticate = (email: string, password: string) => {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (!user) {
    return { success: false, message: "Credenciales inválidas" }
  }

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  }
}

// Función para obtener el usuario actual (simulada)
export const getCurrentUser = () => {
  // En una aplicación real, esto verificaría la sesión o token
  // Para propósitos de demostración, devolvemos un usuario predeterminado
  const defaultUser = users.find((u) => u.role === "admin")

  if (!defaultUser) {
    return null
  }

  return {
    id: defaultUser.id,
    name: defaultUser.name,
    email: defaultUser.email,
    role: defaultUser.role,
    status: defaultUser.status,
  }
}

// Función para verificar permisos
export const hasPermission = (userId: string, permission: string) => {
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return false
  }

  if (user.role === "admin") {
    return true
  }

  // Aquí se implementaría la lógica específica de permisos por rol
  switch (user.role) {
    case "professor":
      return ["view_students", "approve_requests", "evaluate_students", "view_cases"].includes(permission)
    case "student":
      return ["view_patients", "create_requests", "submit_tasks", "view_own_evaluations"].includes(permission)
    case "patient":
      return ["view_own_records", "schedule_appointments", "view_own_appointments"].includes(permission)
    default:
      return false
  }
}
