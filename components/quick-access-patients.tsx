"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function QuickAccessPatients() {
  const { user } = useAuth()

  if (user?.role !== "student") return null

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-blue-900">Mis Pacientes</CardTitle>
              <CardDescription className="text-blue-700">Gestiona y visualiza tus pacientes asignados</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Acceso Rápido
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button asChild variant="outline" size="sm" className="justify-start">
            <Link href="/dashboard/patients">
              <Search className="mr-2 h-4 w-4" />
              Ver Todos
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="justify-start">
            <Link href="/dashboard/patients?filter=active">
              <Users className="mr-2 h-4 w-4" />
              Activos
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="justify-start">
            <Link href="/dashboard/patients?action=new">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo
            </Link>
          </Button>
        </div>
        <div className="pt-2 border-t border-blue-200">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard/patients">
              <Users className="mr-2 h-4 w-4" />
              Ir a Mis Pacientes
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
