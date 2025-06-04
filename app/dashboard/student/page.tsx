"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Calendar,
  BookOpen,
  Stethoscope,
  SmileIcon as Tooth,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const studentStats = {
    totalPatients: 12,
    activeCases: 8,
    completedCases: 15,
    pendingApprovals: 3,
    clinicalHours: 145,
    requiredHours: 200,
    averageGrade: 8.7,
  }

  const recentActivities = [
    {
      id: 1,
      type: "case",
      title: "Caso de Endodoncia - Ana García",
      status: "En progreso",
      date: "2024-01-15",
      progress: 75,
    },
    {
      id: 2,
      type: "history",
      title: "Historia Clínica - Carlos López",
      status: "Pendiente aprobación",
      date: "2024-01-14",
      progress: 100,
    },
    {
      id: 3,
      type: "odontogram",
      title: "Odontograma Adulto - María Fernández",
      status: "Completado",
      date: "2024-01-13",
      progress: 100,
    },
  ]

  const quickActions = [
    {
      title: "Gestionar Pacientes",
      description: "Ver y administrar tus pacientes asignados",
      icon: Users,
      href: "/dashboard/student/patients",
      color: "from-blue-500 to-cyan-500",
      count: studentStats.totalPatients,
    },
    {
      title: "Odontogramas",
      description: "Crear odontogramas para adultos, niños y casos mixtos",
      icon: Tooth,
      href: "/dashboard/student/odontograms",
      color: "from-green-500 to-emerald-500",
      count: "3 tipos",
    },
    {
      title: "Historias Clínicas",
      description: "Documentar y gestionar historias clínicas",
      icon: FileText,
      href: "/dashboard/student/clinical-histories",
      color: "from-purple-500 to-pink-500",
      count: studentStats.activeCases,
    },
    {
      title: "Casos Clínicos",
      description: "Administrar casos clínicos activos",
      icon: Stethoscope,
      href: "/dashboard/student/clinical-cases",
      color: "from-orange-500 to-red-500",
      count: studentStats.activeCases,
    },
    {
      title: "Mis Citas",
      description: "Ver horarios y citas programadas",
      icon: Calendar,
      href: "/dashboard/student/appointments",
      color: "from-indigo-500 to-purple-500",
      count: "Próximas",
    },
    {
      title: "Especialización",
      description: "Progreso en especialidades",
      icon: BookOpen,
      href: "/dashboard/student/specialization",
      color: "from-teal-500 to-blue-500",
      count: "En curso",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Panel de Estudiante
        </h1>
        <p className="text-blue-600 mt-2">Gestiona tus pacientes, casos clínicos y progreso académico</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 fade-in">
        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Pacientes Totales</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{studentStats.totalPatients}</div>
            <p className="text-xs text-blue-600">+2 este mes</p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Casos Activos</CardTitle>
            <Stethoscope className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{studentStats.activeCases}</div>
            <p className="text-xs text-green-600">En progreso</p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Horas Clínicas</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">{studentStats.clinicalHours}</div>
            <Progress value={(studentStats.clinicalHours / studentStats.requiredHours) * 100} className="mt-2" />
            <p className="text-xs text-purple-600">
              {studentStats.requiredHours - studentStats.clinicalHours} horas restantes
            </p>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{studentStats.averageGrade}</div>
            <p className="text-xs text-orange-600">Excelente rendimiento</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Card key={action.title} className="medical-card group hover:scale-105">
              <CardHeader className="pb-3">
                <div className={`p-4 rounded-lg bg-gradient-to-r ${action.color} w-fit`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-blue-800">{action.title}</CardTitle>
                <CardDescription className="text-blue-600">{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {action.count}
                  </Badge>
                </div>
                <Link href={action.href}>
                  <Button className="w-full btn-medical group-hover:shadow-xl">Acceder</Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activities */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-blue-800">Actividades Recientes</CardTitle>
          <CardDescription className="text-blue-600">Últimas acciones realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {activity.type === "case" && <Stethoscope className="h-4 w-4 text-blue-600" />}
                    {activity.type === "history" && <FileText className="h-4 w-4 text-blue-600" />}
                    {activity.type === "odontogram" && <Tooth className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">{activity.title}</p>
                    <p className="text-sm text-blue-600">{activity.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={activity.status === "Completado" ? "default" : "secondary"}
                    className={
                      activity.status === "Completado" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {activity.status}
                  </Badge>
                  {activity.status === "Completado" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
