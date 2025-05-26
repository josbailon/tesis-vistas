"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Shield,
  AlertTriangle,
  Eye,
  Unlock,
  Activity,
  Database,
  RefreshCw,
  Download,
  Settings,
  Users,
  Clock,
  MapPin,
  Smartphone,
  Search,
  Ban,
  CheckCircle,
} from "lucide-react"

interface SecurityAlert {
  id: number
  type: "failed_login" | "suspicious_activity" | "permission_escalation" | "data_breach" | "malware"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  timestamp: string
  status: "active" | "investigating" | "resolved" | "dismissed"
  user: string
  ip: string
  location?: string
  actions: string[]
}

interface SystemLog {
  id: number
  timestamp: string
  level: "INFO" | "WARN" | "ERROR" | "DEBUG"
  module: string
  message: string
  ip: string
  user?: string
}

interface ActiveSession {
  id: string
  user: string
  role: string
  ip: string
  location: string
  device: string
  loginTime: string
  lastActivity: string
  status: "active" | "idle" | "suspicious"
  riskScore: number
}

export default function SecurityPage() {
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([])
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([])
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [logLevelFilter, setLogLevelFilter] = useState("all")
  const { toast } = useToast()

  const loadSecurityData = async (showToast = false) => {
    try {
      setRefreshing(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Enhanced mock data
      const mockAlerts: SecurityAlert[] = [
        {
          id: 1,
          type: "failed_login",
          severity: "medium",
          message: "Múltiples intentos de acceso fallidos desde IP 192.168.1.100",
          timestamp: "2024-01-15 14:30:25",
          status: "active",
          user: "carlos.lopez@uleam.edu.ec",
          ip: "192.168.1.100",
          location: "Manta, Ecuador",
          actions: ["block_ip", "notify_user", "require_2fa"],
        },
        {
          id: 2,
          type: "suspicious_activity",
          severity: "high",
          message: "Acceso desde ubicación inusual detectado",
          timestamp: "2024-01-15 13:15:10",
          status: "investigating",
          user: "maria.rodriguez@gmail.com",
          ip: "201.123.45.67",
          location: "Quito, Ecuador",
          actions: ["verify_identity", "temporary_lock", "notify_admin"],
        },
        {
          id: 3,
          type: "permission_escalation",
          severity: "critical",
          message: "Intento de escalación de privilegios detectado",
          timestamp: "2024-01-15 12:45:33",
          status: "resolved",
          user: "admin@uleam.edu.ec",
          ip: "192.168.1.1",
          location: "Manta, Ecuador",
          actions: ["audit_permissions", "review_logs", "strengthen_access"],
        },
      ]

      const mockLogs: SystemLog[] = [
        {
          id: 1,
          timestamp: "2024-01-15 15:30:25",
          level: "INFO",
          module: "AUTH",
          message: "Usuario ana.garcia@uleam.edu.ec inició sesión exitosamente",
          ip: "192.168.1.50",
          user: "ana.garcia@uleam.edu.ec",
        },
        {
          id: 2,
          timestamp: "2024-01-15 15:28:10",
          level: "WARN",
          module: "DATABASE",
          message: "Consulta lenta detectada en tabla 'clinical_cases' (2.3s)",
          ip: "localhost",
        },
        {
          id: 3,
          timestamp: "2024-01-15 15:25:45",
          level: "ERROR",
          module: "API",
          message: "Error 500 en endpoint /api/patients/create",
          ip: "192.168.1.75",
          user: "pedro.gomez@uleam.edu.ec",
        },
        {
          id: 4,
          timestamp: "2024-01-15 15:20:12",
          level: "INFO",
          module: "BACKUP",
          message: "Respaldo automático completado exitosamente",
          ip: "localhost",
        },
      ]

      const mockSessions: ActiveSession[] = [
        {
          id: "s1",
          user: "ana.garcia@uleam.edu.ec",
          role: "professor",
          ip: "192.168.1.50",
          location: "Manta, Ecuador",
          device: "Chrome/Windows",
          loginTime: "14:30:25",
          lastActivity: "15:45:10",
          status: "active",
          riskScore: 15,
        },
        {
          id: "s2",
          user: "carlos.lopez@uleam.edu.ec",
          role: "student",
          ip: "192.168.1.75",
          location: "Manta, Ecuador",
          device: "Firefox/Linux",
          loginTime: "13:45:10",
          lastActivity: "15:30:22",
          status: "active",
          riskScore: 25,
        },
        {
          id: "s3",
          user: "maria.rodriguez@gmail.com",
          role: "patient",
          ip: "201.123.45.67",
          location: "Quito, Ecuador",
          device: "Safari/iOS",
          loginTime: "12:20:33",
          lastActivity: "14:15:45",
          status: "suspicious",
          riskScore: 85,
        },
      ]

      setSecurityAlerts(mockAlerts)
      setSystemLogs(mockLogs)
      setActiveSessions(mockSessions)

      if (showToast) {
        toast({
          title: "Datos de seguridad actualizados",
          description: "La información de seguridad se ha actualizado correctamente.",
        })
      }
    } catch (error) {
      toast({
        title: "Error al cargar datos de seguridad",
        description: "No se pudieron cargar los datos de seguridad.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadSecurityData()
    // Set up real-time updates
    const interval = setInterval(() => loadSecurityData(), 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    loadSecurityData(true)
  }

  const handleAlertAction = async (alertId: number, action: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSecurityAlerts((prev) =>
        prev.map((alert) =>
          alert.id === alertId
            ? {
                ...alert,
                status: action === "resolve" ? "resolved" : action === "dismiss" ? "dismissed" : "investigating",
              }
            : alert,
        ),
      )

      toast({
        title: "Acción ejecutada",
        description: `La acción "${action}" se ha ejecutado correctamente.`,
      })
    } catch (error) {
      toast({
        title: "Error al ejecutar acción",
        description: "No se pudo ejecutar la acción solicitada.",
        variant: "destructive",
      })
    }
  }

  const terminateSession = async (sessionId: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setActiveSessions((prev) => prev.filter((session) => session.id !== sessionId))

      toast({
        title: "Sesión terminada",
        description: "La sesión ha sido terminada exitosamente.",
      })
    } catch (error) {
      toast({
        title: "Error al terminar sesión",
        description: "No se pudo terminar la sesión.",
        variant: "destructive",
      })
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "text-red-600 bg-red-50"
      case "WARN":
        return "text-yellow-600 bg-yellow-50"
      case "INFO":
        return "text-blue-600 bg-blue-50"
      case "DEBUG":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50"
    if (score >= 50) return "text-yellow-600 bg-yellow-50"
    if (score >= 30) return "text-blue-600 bg-blue-50"
    return "text-green-600 bg-green-50"
  }

  const filteredAlerts = securityAlerts.filter((alert) => {
    const matchesSearch =
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  const filteredLogs = systemLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = logLevelFilter === "all" || log.level === logLevelFilter
    return matchesSearch && matchesLevel
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Seguridad y Monitoreo</h1>
          <p className="text-muted-foreground">Monitoreo de seguridad, logs del sistema y gestión de accesos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Logs
          </Button>
        </div>
      </div>

      {/* Enhanced Security Status Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado de Seguridad</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Seguro</div>
            <p className="text-xs text-muted-foreground">
              {securityAlerts.filter((a) => a.status === "active").length} alertas activas
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sesiones Activas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSessions.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeSessions.filter((s) => s.status === "suspicious").length} sospechosas
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intentos Fallidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Últimas 24 horas</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime del Sistema</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 días</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="alerts">Alertas de Seguridad</TabsTrigger>
          <TabsTrigger value="logs">Logs del Sistema</TabsTrigger>
          <TabsTrigger value="sessions">Sesiones Activas</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoreo</TabsTrigger>
          <TabsTrigger value="backup">Respaldos</TabsTrigger>
        </TabsList>

        {/* Enhanced Security Alerts */}
        <TabsContent value="alerts" className="space-y-4">
          {/* Search and Filter Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar alertas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por severidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las severidades</SelectItem>
                    <SelectItem value="critical">Crítico</SelectItem>
                    <SelectItem value="high">Alto</SelectItem>
                    <SelectItem value="medium">Medio</SelectItem>
                    <SelectItem value="low">Bajo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alertas de Seguridad ({filteredAlerts.length})</CardTitle>
              <CardDescription>Eventos de seguridad que requieren atención</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="flex items-center justify-between">
                      <span>Alerta de Seguridad - {alert.severity.toUpperCase()}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                          {alert.status === "active"
                            ? "Activa"
                            : alert.status === "investigating"
                              ? "Investigando"
                              : alert.status === "resolved"
                                ? "Resuelta"
                                : "Descartada"}
                        </Badge>
                        <Badge variant="outline">{alert.type.replace("_", " ")}</Badge>
                      </div>
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      <div className="space-y-3">
                        <p>{alert.message}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {alert.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {alert.ip}
                          </span>
                          {alert.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {alert.location}
                            </span>
                          )}
                        </div>
                        {alert.status === "active" && (
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAlertAction(alert.id, "investigate")}
                            >
                              <Eye className="mr-2 h-3 w-3" />
                              Investigar
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleAlertAction(alert.id, "resolve")}>
                              <CheckCircle className="mr-2 h-3 w-3" />
                              Resolver
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                              onClick={() => handleAlertAction(alert.id, "block")}
                            >
                              <Ban className="mr-2 h-3 w-3" />
                              Bloquear Usuario
                            </Button>
                          </div>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced System Logs */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar en logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={logLevelFilter} onValueChange={setLogLevelFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los niveles</SelectItem>
                    <SelectItem value="ERROR">Error</SelectItem>
                    <SelectItem value="WARN">Advertencia</SelectItem>
                    <SelectItem value="INFO">Información</SelectItem>
                    <SelectItem value="DEBUG">Debug</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logs del Sistema ({filteredLogs.length})</CardTitle>
              <CardDescription>Registro detallado de eventos del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Nivel</TableHead>
                    <TableHead>Módulo</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Mensaje</TableHead>
                    <TableHead>IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getLogLevelColor(log.level)}>
                          {log.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{log.module}</Badge>
                      </TableCell>
                      <TableCell className="text-xs">{log.user || "-"}</TableCell>
                      <TableCell className="max-w-md truncate">{log.message}</TableCell>
                      <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Active Sessions */}
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sesiones Activas ({activeSessions.length})</CardTitle>
              <CardDescription>Usuarios conectados actualmente al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Riesgo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              session.status === "active"
                                ? "bg-green-500"
                                : session.status === "idle"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <div>
                            <div className="font-medium">{session.user}</div>
                            <div className="text-xs text-muted-foreground">Último: {session.lastActivity}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {session.role === "professor"
                            ? "Profesor"
                            : session.role === "student"
                              ? "Estudiante"
                              : session.role === "admin"
                                ? "Admin"
                                : "Paciente"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{session.ip}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Smartphone className="h-3 w-3" />
                          {session.device}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={session.riskScore} className="w-16 h-2" />
                          <Badge variant="outline" className={getRiskScoreColor(session.riskScore)}>
                            {session.riskScore}%
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            session.status === "active"
                              ? "default"
                              : session.status === "idle"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {session.status === "active"
                            ? "Activa"
                            : session.status === "idle"
                              ? "Inactiva"
                              : "Sospechosa"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => terminateSession(session.id)}
                          >
                            <Unlock className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Monitoring remains the same */}
        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Servicios</CardTitle>
                <CardDescription>Monitoreo de servicios críticos del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Base de Datos", status: "operational", uptime: 99.9, responseTime: "12ms" },
                  { name: "Servidor Web", status: "operational", uptime: 99.8, responseTime: "45ms" },
                  { name: "Servicio de Correo", status: "degraded", uptime: 97.5, responseTime: "120ms" },
                  { name: "Sistema de Archivos", status: "operational", uptime: 99.7, responseTime: "8ms" },
                  { name: "API Gateway", status: "operational", uptime: 99.6, responseTime: "25ms" },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          service.status === "operational"
                            ? "bg-green-500"
                            : service.status === "degraded"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {service.status === "operational"
                            ? "Operacional"
                            : service.status === "degraded"
                              ? "Degradado"
                              : "Fuera de servicio"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{service.uptime}%</div>
                      <div className="text-sm text-muted-foreground">{service.responseTime}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recursos del Sistema</CardTitle>
                <CardDescription>Uso actual de recursos del servidor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">8 cores @ 2.4GHz</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memoria RAM</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">10.8GB / 16GB</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Almacenamiento</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">360GB / 500GB</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Ancho de Banda</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">230Mbps / 1Gbps</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-sm text-muted-foreground">Conexiones</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">1.2GB</div>
                      <div className="text-sm text-muted-foreground">Tráfico/hora</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enhanced Backup Management */}
        <TabsContent value="backup" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Respaldos</CardTitle>
                <CardDescription>Información sobre respaldos automáticos y manuales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Último Respaldo Completo</div>
                      <div className="text-sm text-muted-foreground">15 Enero 2024, 02:00 AM</div>
                      <div className="text-xs text-muted-foreground">Tamaño: 2.4GB</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Exitoso</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Respaldo Incremental</div>
                      <div className="text-sm text-muted-foreground">15 Enero 2024, 14:00 PM</div>
                      <div className="text-xs text-muted-foreground">Tamaño: 156MB</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Exitoso</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Próximo Respaldo</div>
                      <div className="text-sm text-muted-foreground">16 Enero 2024, 02:00 AM</div>
                      <div className="text-xs text-muted-foreground">Tipo: Completo</div>
                    </div>
                    <Badge variant="outline">Programado</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full">
                    <Database className="mr-2 h-4 w-4" />
                    Crear Respaldo Manual
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración de Respaldos</CardTitle>
                <CardDescription>Configuración y programación de respaldos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Respaldos Automáticos</div>
                      <div className="text-sm text-muted-foreground">Diariamente a las 02:00 AM</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Activo</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Retención</div>
                      <div className="text-sm text-muted-foreground">30 días para respaldos completos</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Almacenamiento</div>
                      <div className="text-sm text-muted-foreground">Servidor local + AWS S3</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Cifrado</div>
                      <div className="text-sm text-muted-foreground">AES-256 habilitado</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Seguro</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Verificación de Integridad</div>
                      <div className="text-sm text-muted-foreground">Checksums SHA-256</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Activo</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurar Respaldos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
