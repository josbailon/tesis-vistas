"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Reply,
  Forward,
  Archive,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function SecretaryCommunicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

  // Mock data for communications
  const messages = [
    {
      id: "msg1",
      type: "email",
      from: "ana.garcia@gmail.com",
      to: "clinica@uleam.edu.ec",
      subject: "Consulta sobre cita programada",
      content:
        "Buenos días, me gustaría confirmar mi cita del próximo martes a las 9:00 AM. ¿Podrían confirmarme si está todo en orden?",
      timestamp: "2024-01-22 14:30",
      status: "unread",
      priority: "normal",
      category: "appointment",
    },
    {
      id: "msg2",
      type: "sms",
      from: "0998-234-567",
      to: "clinica",
      subject: "Recordatorio de cita",
      content: "Hola, ¿podrían recordarme la hora de mi cita de mañana? Gracias.",
      timestamp: "2024-01-22 16:45",
      status: "read",
      priority: "normal",
      category: "reminder",
    },
    {
      id: "msg3",
      type: "notification",
      from: "sistema",
      to: "secretaria",
      subject: "Nueva cita programada",
      content: "Se ha programado una nueva cita para Carmen Vega Torres el 25/01/2024 a las 11:00 AM.",
      timestamp: "2024-01-22 10:15",
      status: "read",
      priority: "high",
      category: "system",
    },
    {
      id: "msg4",
      type: "email",
      from: "roberto.silva@hotmail.com",
      to: "clinica@uleam.edu.ec",
      subject: "Cancelación de cita",
      content:
        "Estimados, necesito cancelar mi cita del viernes debido a un compromiso laboral. ¿Podrían reprogramarla para la próxima semana?",
      timestamp: "2024-01-22 09:20",
      status: "unread",
      priority: "high",
      category: "cancellation",
    },
    {
      id: "msg5",
      type: "phone",
      from: "0997-345-678",
      to: "clinica",
      subject: "Llamada perdida",
      content: "Llamada perdida de Carmen Vega Torres a las 13:45. Motivo: Consulta sobre tratamiento.",
      timestamp: "2024-01-22 13:45",
      status: "unread",
      priority: "normal",
      category: "missed_call",
    },
  ]

  const notifications = [
    {
      id: "not1",
      title: "Recordatorio de cita",
      message: "Ana García López tiene cita en 1 hora",
      type: "reminder",
      timestamp: "2024-01-22 08:00",
      status: "active",
    },
    {
      id: "not2",
      title: "Cita cancelada",
      message: "Roberto Silva canceló su cita del viernes",
      type: "cancellation",
      timestamp: "2024-01-22 09:20",
      status: "new",
    },
    {
      id: "not3",
      title: "Nuevo paciente registrado",
      message: "Luis Morales Castro se registró en el sistema",
      type: "registration",
      timestamp: "2024-01-22 11:30",
      status: "read",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "notification":
        return <Bell className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            No leído
          </Badge>
        )
      case "read":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Leído
          </Badge>
        )
      case "replied":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Reply className="h-3 w-3 mr-1" />
            Respondido
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Alta</Badge>
      case "normal":
        return <Badge variant="outline">Normal</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-600">Baja</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || message.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comunicaciones</h1>
          <p className="text-muted-foreground">Gestiona mensajes, llamadas y notificaciones</p>
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Mensaje
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Componer Mensaje</DialogTitle>
              <DialogDescription>Envía un nuevo mensaje o notificación</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="messageType">Tipo de Mensaje</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="notification">Notificación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient">Destinatario</Label>
                <Input id="recipient" placeholder="Correo electrónico o número de teléfono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" placeholder="Asunto del mensaje" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Mensaje</Label>
                <Textarea id="content" placeholder="Escribe tu mensaje aquí..." rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsComposeOpen(false)}>
                <Send className="mr-2 h-4 w-4" />
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mensajes</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No Leídos</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.status === "unread").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emails</CardTitle>
            <Mail className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.type === "email").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notificaciones</CardTitle>
            <Bell className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.filter((n) => n.status === "new").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar mensajes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="email">Emails</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="phone">Llamadas</SelectItem>
                  <SelectItem value="notification">Notificaciones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  message.status === "unread" ? "border-blue-200 bg-blue-50" : ""
                }`}
                onClick={() => {
                  setSelectedMessage(message)
                  setIsViewOpen(true)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                        {getTypeIcon(message.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{message.subject}</h3>
                          {getStatusBadge(message.status)}
                          {getPriorityBadge(message.priority)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>De: {message.from}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 truncate">{message.content}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Reply className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card key={notification.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
                        <Bell className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <Badge
                            variant={notification.status === "new" ? "default" : "outline"}
                            className={notification.status === "new" ? "bg-purple-100 text-purple-800" : ""}
                          >
                            {notification.status === "new" ? "Nuevo" : "Leído"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Mensajes</CardTitle>
              <CardDescription>Plantillas predefinidas para comunicaciones frecuentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Recordatorio de Cita</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Estimado/a [NOMBRE], le recordamos su cita programada para el [FECHA] a las [HORA] en [UBICACIÓN].
                  </p>
                  <Button variant="outline" size="sm">
                    Usar Plantilla
                  </Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Confirmación de Cita</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Su cita ha sido confirmada para el [FECHA] a las [HORA]. Por favor llegue 15 minutos antes.
                  </p>
                  <Button variant="outline" size="sm">
                    Usar Plantilla
                  </Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Cancelación de Cita</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Lamentamos informarle que su cita del [FECHA] ha sido cancelada. Contacte para reprogramar.
                  </p>
                  <Button variant="outline" size="sm">
                    Usar Plantilla
                  </Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Bienvenida Nuevo Paciente</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bienvenido/a a la Clínica Dental ULEAM. Su primera cita está programada para [FECHA] a las [HORA].
                  </p>
                  <Button variant="outline" size="sm">
                    Usar Plantilla
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Message View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        {selectedMessage && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {getTypeIcon(selectedMessage.type)}
                {selectedMessage.subject}
              </DialogTitle>
              <DialogDescription>
                De: {selectedMessage.from} • {selectedMessage.timestamp}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedMessage.status)}
                {getPriorityBadge(selectedMessage.priority)}
                <Badge variant="outline">{selectedMessage.category}</Badge>
              </div>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Contenido del Mensaje</h4>
                <p className="text-sm">{selectedMessage.content}</p>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Detalles</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Tipo:</p>
                    <p className="text-muted-foreground">{selectedMessage.type}</p>
                  </div>
                  <div>
                    <p className="font-medium">Categoría:</p>
                    <p className="text-muted-foreground">{selectedMessage.category}</p>
                  </div>
                  <div>
                    <p className="font-medium">De:</p>
                    <p className="text-muted-foreground">{selectedMessage.from}</p>
                  </div>
                  <div>
                    <p className="font-medium">Para:</p>
                    <p className="text-muted-foreground">{selectedMessage.to}</p>
                  </div>
                </div>
              </Card>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                Cerrar
              </Button>
              <Button variant="outline">
                <Reply className="mr-2 h-4 w-4" />
                Responder
              </Button>
              <Button variant="outline">
                <Forward className="mr-2 h-4 w-4" />
                Reenviar
              </Button>
              <Button>
                <Archive className="mr-2 h-4 w-4" />
                Archivar
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
