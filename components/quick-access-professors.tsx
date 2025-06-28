"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Clock, Eye, BarChart3, FileText } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function QuickAccessProfessors() {
  const { user } = useAuth()

  if (user?.role !== "professor") return null

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-green-900">Mis Estudiantes</CardTitle>
              <CardDescription className="text-green-700">
                Supervisa y gestiona estudiantes de {user.specialty}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Profesor
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-green-900">15</div>
            <div className="text-xs text-green-700">Estudiantes</div>
          </div>
          <div className="p-2 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">8</div>
            <div className="text-xs text-green-700">Pendientes</div>
          </div>
          <div className="p-2 bg-white/50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">142</div>
            <div className="text-xs text-green-700">Completados</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="sm" className="justify-start h-auto p-3 bg-transparent">
            <Link href="/dashboard/teacher/students">
              <div className="flex flex-col items-center gap-1">
                <Eye className="h-4 w-4" />
                <span className="text-xs">Ver Todos</span>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="justify-start h-auto p-3 bg-transparent">
            <Link href="/dashboard/teacher/approvals">
              <div className="flex flex-col items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs">Pendientes</span>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="justify-start h-auto p-3 bg-transparent">
            <Link href="/dashboard/teacher/progress">
              <div className="flex flex-col items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs">Progreso</span>
              </div>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="justify-start h-auto p-3 bg-transparent">
            <Link href="/dashboard/teacher/clinical-cases">
              <div className="flex flex-col items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="text-xs">Casos</span>
              </div>
            </Link>
          </Button>
        </div>

        {/* Main Action */}
        <div className="pt-2 border-t border-green-200">
          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <Link href="/dashboard/teacher/students">
              <GraduationCap className="mr-2 h-4 w-4" />
              Gestionar Estudiantes
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
