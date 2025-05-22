"use client"

import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Calendar, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserData {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

export default function UsersPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Datos de ejemplo
  const users: UserData[] = [
    {
      id: "1",
      name: "Ana García",
      email: "ana.garcia@example.com",
      role: "patient",
      status: "active",
    },
    {
      id: "2",
      name: "Carlos López",
      email: "carlos.lopez@example.com",
      role: "student",
      status: "active",
    },
    {
      id: "3",
      name: "María Rodríguez",
      email: "maria.rodriguez@example.com",
      role: "professor",
      status: "inactive",
    },
  ]

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          // Si no hay usuario, redirigir a login
          router.push("/login")
        }
      } catch (e) {
        console.error("Error parsing user from localStorage", e)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary mx-auto"></div>
          <h2 className="text-2xl font-bold">Cargando...</h2>
          <p className="text-muted-foreground">Por favor espere mientras cargamos la lista de usuarios.</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">Administra los usuarios del sistema.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{user.name}</CardTitle>
                <Badge variant={user.status === "active" ? "default" : "secondary"}>
                  {user.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
              <CardDescription>{user.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Fecha de Registro: 2023-05-01</span>
                </div>
              </div>
            </CardContent>
            <Button variant="outline" size="sm" className="flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Ver Detalles
            </Button>
          </Card>
        ))}
      </div>

      <Button className="mt-4">Añadir Nuevo Usuario</Button>
    </div>
  )
}
