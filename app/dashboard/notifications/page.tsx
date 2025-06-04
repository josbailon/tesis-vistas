"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Search,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  Info,
  Calendar,
  User,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error" | "appointment" | "evaluation"
  priority: "low" | "medium" | "high" | "urgent"
  isRead: boolean
  createdAt: string
  from: string
  relatedTo?: string
  actionRequired?: boolean
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "n1",
      title: "Nueva Evaluación Disponible",
      message: "Tu profesor ha publicado una nueva evaluación para el caso de endodoncia.",
      type: "evaluation",
      priority: "high",
      isRead: false,
      createdAt: "2024-01-22T10:30:00",
      from: "Dr. Martínez",
      relatedTo: "Caso Clínico #CC001",
      actionRequired: true,
    },
    {
      id: "n2",
      title: "Cita Programada",
      message: "Se ha programado una cita para mañana a las 14:00 con el paciente Ana García.",
      type: "appointment",
      priority: "medium",
      isRead: false,
      createdAt: "2024-01-22T09:15:00",
      from: "Sistema",
      relatedTo: "Paciente: Ana García",
      actionRequired: false,
    },
    {
      id: "n3",
      title: "Historia Clínica Aprobada",
      message: "Tu historia clínica del paciente Carlos López ha sido aprobada.",
      type: "success",
      priority: "low",
      isRead: true,
      createdAt: "2024-01-21T16:45:00",
      from: "Dra. López",
      relatedTo: "Historia Clínica #HC003",
      actionRequired: false,
    },
    {
      id: "n4",
      title: "Recordatorio de Horario",
      message: "Tienes clase de Periodoncia en 30 minutos en el Aula 201.",
      type: "info",
      priority: "medium",
      isRead: false,
      createdAt: "2024-01-22T13:30:00",
      from: "Sistema",
      relatedTo: "Horario Académico",
      actionRequired: false,
    },
    {
      id: "n5",
      title: "Documento Requiere Revisión",
      message: "Tu caso clínico de ortodoncia necesita correcciones antes de la aprobación final.",
      type: "warning",
      priority: "high",
      isRead: false,
      createdAt: "2024-01-22T08:20:00",
      from: "Dra. Rodríguez",
      relatedTo: "Caso Clínico #CC005",
      actionRequired: true,
    },
    {
      id: "n6",
      title: "Sistema en Mantenimiento",
      message: "El sistema estará en mantenimiento el sábado de 2:00 AM a 6:00 AM.",
      type: "info",
      priority: "low",
      isRead: true,
      createdAt: "2024-01-20T12:00:00",
      from: "Administración",
      relatedTo: "Mantenimiento del Sistema",
      actionRequired: false,
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "appointment":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "evaluation":
        return <User className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "info":
        return <Badge className="bg-blue-100 text-blue-700">Información</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-700">Advertencia</Badge>
      case "success":
        return <Badge className="bg-green-100 text-green-700">Éxito</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-700">Error</Badge>
      case "appointment":
        return <Badge className="bg-purple-100 text-purple-700">Cita</Badge>
      case "evaluation":
        return <Badge className="bg-orange-100 text-orange-700">Evaluación</Badge>
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-700">Urgente</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-700">Alta</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700">Media</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-700">Baja</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `Hace ${diffInMinutes} minutos`
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} horas`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `Hace ${diffInDays} días`
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAsUnread = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: false } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.from.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "unread" && !notification.isRead) ||
      (statusFilter === "read" && notification.isRead)

    return matchesSearch && matchesType && matchesStatus
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const urgentCount = notifications.filter((n) => n.priority === "urgent" && !n.isRead).length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between fade-in">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notificaciones
          </h1>
          <p className="text-blue-600 mt-2">Mantente al día con todas tus actividades</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-100 text-blue-700">{unreadCount} sin leer</Badge>
          {urgentCount > 0 && <Badge className="bg-red-100 text-red-700">{urgentCount} urgentes</Badge>}
          <Button onClick={markAllAsRead} className="btn-medical">
            Marcar Todas como Leídas
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total</p>
                <p className="text-2xl font-bold text-blue-800">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Sin Leer</p>
                <p className="text-2xl font-bold text-orange-800">{unreadCount}</p>
              </div>
              <MarkAsUnread className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Urgentes</p>
                <p className="text-2xl font-bold text-red-800">{urgentCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Acción Requerida</p>
                <p className="text-2xl font-bold text-green-800">
                  {notifications.filter((n) => n.actionRequired && !n.isRead).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-blue-500" />
              <Input
                placeholder="Buscar notificaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-blue-50/50 border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="type-filter" className="text-sm text-blue-700">
                  Tipo:
                </Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger id="type-filter" className="w-[150px] border-blue-200">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="info">Información</SelectItem>
                    <SelectItem value="warning">Advertencia</SelectItem>
                    <SelectItem value="success">Éxito</SelectItem>
                    <SelectItem value="appointment">Citas</SelectItem>
                    <SelectItem value="evaluation">Evaluaciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="status-filter" className="text-sm text-blue-700">
                  Estado:
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="w-[150px] border-blue-200">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="unread">Sin leer</SelectItem>
                    <SelectItem value="read">Leídas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Notificaciones */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-blue-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Todas ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Sin Leer ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="urgent" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Urgentes ({urgentCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`medical-card hover:scale-105 transition-all duration-300 ${
                  !notification.isRead ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-full shadow-sm">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1">
                        <CardTitle
                          className={`text-lg ${!notification.isRead ? "text-blue-800 font-bold" : "text-blue-700"}`}
                        >
                          {notification.title}
                        </CardTitle>
                        <CardDescription className="text-blue-600">
                          De: {notification.from} • {formatDate(notification.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {getTypeBadge(notification.type)}
                      {getPriorityBadge(notification.priority)}
                      {notification.actionRequired && (
                        <Badge className="bg-red-100 text-red-700">Acción Requerida</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-blue-700 bg-blue-50 p-3 rounded-lg">{notification.message}</p>

                    {notification.relatedTo && (
                      <div className="text-sm">
                        <span className="text-blue-600">Relacionado con: </span>
                        <span className="font-medium text-blue-800">{notification.relatedTo}</span>
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      {!notification.isRead ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Marcar como Leída
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-300 text-orange-700 hover:bg-orange-50"
                          onClick={() => markAsUnread(notification.id)}
                        >
                          <MarkAsUnread className="h-3.5 w-3.5 mr-1" />
                          Marcar como No Leída
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-700 hover:bg-red-50"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <div className="space-y-3">
            {filteredNotifications
              .filter((n) => !n.isRead)
              .map((notification) => (
                <Card
                  key={notification.id}
                  className="medical-card hover:scale-105 transition-all duration-300 border-l-4 border-l-blue-500 bg-blue-50/30"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-full shadow-sm">{getTypeIcon(notification.type)}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-blue-800 font-bold">{notification.title}</CardTitle>
                          <CardDescription className="text-blue-600">
                            De: {notification.from} • {formatDate(notification.createdAt)}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getTypeBadge(notification.type)}
                        {getPriorityBadge(notification.priority)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-blue-700 bg-blue-50 p-3 rounded-lg">{notification.message}</p>
                      <div className="flex justify-end gap-2">
                        <Button className="btn-medical" onClick={() => markAsRead(notification.id)}>
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Marcar como Leída
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <div className="space-y-3">
            {filteredNotifications
              .filter((n) => n.priority === "urgent")
              .map((notification) => (
                <Card
                  key={notification.id}
                  className="medical-card hover:scale-105 transition-all duration-300 border-l-4 border-l-red-500 bg-red-50/30"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-full shadow-sm">{getTypeIcon(notification.type)}</div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-red-800 font-bold">{notification.title}</CardTitle>
                          <CardDescription className="text-red-600">
                            De: {notification.from} • {formatDate(notification.createdAt)}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        {getTypeBadge(notification.type)}
                        <Badge className="bg-red-100 text-red-700">URGENTE</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-red-700 bg-red-50 p-3 rounded-lg border border-red-200">
                        {notification.message}
                      </p>
                      <div className="flex justify-end gap-2">
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Atender Urgente
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
