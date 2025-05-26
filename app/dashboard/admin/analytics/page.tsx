"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  FileText,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  Target,
  AlertTriangle,
  Activity,
} from "lucide-react"

interface AnalyticsData {
  performanceMetrics: {
    studentPerformance: {
      averageGrade: number
      passRate: number
      completionRate: number
      improvementRate: number
      trend: "up" | "down" | "stable"
    }
    teacherActivity: {
      averageResponseTime: number
      approvalRate: number
      assignmentsCreated: number
      feedbackQuality: number
      trend: "up" | "down" | "stable"
    }
    systemUsage: {
      dailyActiveUsers: number
      peakUsageHours: string
      averageSessionDuration: number
      featureAdoption: number
      trend: "up" | "down" | "stable"
    }
  }
  specialtyPerformance: Array<{
    name: string
    students: number
    avgGrade: number
    passRate: number
    completionRate: number
    trend: "up" | "down" | "stable"
  }>
  recentReports: Array<{
    id: number
    name: string
    type: string
    date: string
    status: "completed" | "processing" | "failed"
    downloadUrl?: string
  }>
  alerts: Array<{
    id: number
    type: "performance" | "system" | "security"
    severity: "low" | "medium" | "high" | "critical"
    message: string
    timestamp: string
  }>
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("last_30_days")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const { toast } = useToast()

  const loadAnalyticsData = async (showToast = false) => {
    try {
      setRefreshing(true)
      setError(null)

      // Simulate API call with potential failure
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.05) {
            // 95% success rate
            resolve(true)
          } else {
            reject(new Error("Error al conectar con el servidor de análisis"))
          }
        }, 1500)
      })

      // Enhanced mock data with trends and alerts
      const mockData: AnalyticsData = {
        performanceMetrics: {
          studentPerformance: {
            averageGrade: 16.8,
            passRate: 87.5,
            completionRate: 92.3,
            improvementRate: 12.4,
            trend: "up",
          },
          teacherActivity: {
            averageResponseTime: 4.2,
            approvalRate: 94.1,
            assignmentsCreated: 156,
            feedbackQuality: 4.6,
            trend: "up",
          },
          systemUsage: {
            dailyActiveUsers: 142,
            peakUsageHours: "10:00-12:00",
            averageSessionDuration: 45,
            featureAdoption: 78.9,
            trend: "stable",
          },
        },
        specialtyPerformance: [
          { name: "Endodoncia", students: 22, avgGrade: 17.2, passRate: 91, completionRate: 95, trend: "up" },
          { name: "Ortodoncia", students: 18, avgGrade: 16.8, passRate: 89, completionRate: 94, trend: "stable" },
          { name: "Cirugía Oral", students: 15, avgGrade: 16.1, passRate: 80, completionRate: 87, trend: "down" },
          { name: "Odontopediatría", students: 20, avgGrade: 17.5, passRate: 95, completionRate: 98, trend: "up" },
          { name: "Periodoncia", students: 10, avgGrade: 16.4, passRate: 85, completionRate: 90, trend: "stable" },
        ],
        recentReports: [
          {
            id: 1,
            name: "Reporte Mensual de Rendimiento",
            type: "performance",
            date: "2024-01-15",
            status: "completed",
            downloadUrl: "#",
          },
          {
            id: 2,
            name: "Análisis de Uso del Sistema",
            type: "usage",
            date: "2024-01-14",
            status: "completed",
            downloadUrl: "#",
          },
          { id: 3, name: "Evaluación de Profesores", type: "teacher", date: "2024-01-13", status: "processing" },
          { id: 4, name: "Reporte de Seguridad", type: "security", date: "2024-01-12", status: "failed" },
        ],
        alerts: [
          {
            id: 1,
            type: "performance",
            severity: "medium",
            message: "La tasa de aprobación en Cirugía Oral ha disminuido un 5% este mes",
            timestamp: "2024-01-15 14:30",
          },
          {
            id: 2,
            type: "system",
            severity: "low",
            message: "El uso del sistema ha aumentado un 15% en las últimas 2 semanas",
            timestamp: "2024-01-15 12:15",
          },
          {
            id: 3,
            type: "security",
            severity: "high",
            message: "Se detectaron 3 intentos de acceso no autorizado en las últimas 24 horas",
            timestamp: "2024-01-15 09:45",
          },
        ],
      }

      setData(mockData)

      if (showToast) {
        toast({
          title: "Datos actualizados",
          description: "Los análisis se han actualizado correctamente.",
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      toast({
        title: "Error al cargar análisis",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadAnalyticsData()
  }, [dateRange, selectedSpecialty])

  const handleRefresh = () => {
    loadAnalyticsData(true)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 bg-red-50 text-red-800"
      case "high":
        return "border-orange-500 bg-orange-50 text-orange-800"
      case "medium":
        return "border-yellow-500 bg-yellow-50 text-yellow-800"
      case "low":
        return "border-blue-500 bg-blue-50 text-blue-800"
      default:
        return "border-gray-500 bg-gray-50 text-gray-800"
    }
  }

  const generateReport = async (type: string) => {
    try {
      toast({
        title: "Generando reporte",
        description: "El reporte se está generando, recibirás una notificación cuando esté listo.",
      })

      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Reporte generado",
        description: "El reporte está listo para descargar.",
      })
    } catch (error) {
      toast({
        title: "Error al generar reporte",
        description: "No se pudo generar el reporte. Inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análisis y Reportes</h1>
          <p className="text-muted-foreground">Análisis detallado del rendimiento y uso del sistema</p>
        </div>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análisis y Reportes</h1>
          <p className="text-muted-foreground">Análisis detallado del rendimiento y uso del sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Últimos 7 días</SelectItem>
              <SelectItem value="last_30_days">Últimos 30 días</SelectItem>
              <SelectItem value="last_90_days">Últimos 90 días</SelectItem>
              <SelectItem value="last_year">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Alerts Section */}
      {data?.alerts && data.alerts.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Alertas del Sistema</h2>
          {data.alerts.map((alert) => (
            <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-xs opacity-75">{alert.timestamp}</p>
                </div>
                <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                  {alert.severity === "critical"
                    ? "Crítico"
                    : alert.severity === "high"
                      ? "Alto"
                      : alert.severity === "medium"
                        ? "Medio"
                        : "Bajo"}
                </Badge>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Enhanced Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento Promedio</CardTitle>
            <div className="flex items-center gap-1">
              {getTrendIcon(data?.performanceMetrics.studentPerformance.trend || "stable")}
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.performanceMetrics.studentPerformance.averageGrade}/20</div>
            <p className="text-xs text-muted-foreground">
              {data?.performanceMetrics.studentPerformance.trend === "up" ? "+" : ""}
              {data?.performanceMetrics.studentPerformance.improvementRate}% vs mes anterior
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Aprobación</CardTitle>
            <div className="flex items-center gap-1">
              {getTrendIcon(data?.performanceMetrics.studentPerformance.trend || "stable")}
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.performanceMetrics.studentPerformance.passRate}%</div>
            <p className="text-xs text-muted-foreground">
              {data?.performanceMetrics.studentPerformance.completionRate}% tasa de finalización
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <div className="flex items-center gap-1">
              {getTrendIcon(data?.performanceMetrics.systemUsage.trend || "stable")}
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.performanceMetrics.systemUsage.dailyActiveUsers}</div>
            <p className="text-xs text-muted-foreground">Promedio diario últimos 30 días</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
            <div className="flex items-center gap-1">
              {getTrendIcon(data?.performanceMetrics.teacherActivity.trend || "stable")}
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.performanceMetrics.teacherActivity.averageResponseTime}h</div>
            <p className="text-xs text-muted-foreground">Tiempo promedio de respuesta de profesores</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="usage">Uso del Sistema</TabsTrigger>
          <TabsTrigger value="teachers">Actividad Docente</TabsTrigger>
          <TabsTrigger value="specialties">Por Especialidad</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        {/* Enhanced Performance Analytics */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Calificaciones</CardTitle>
                <CardDescription>Análisis del rendimiento estudiantil por rangos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Excelente (18-20)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-24 h-2" />
                      <span className="text-sm font-medium">35%</span>
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Muy Bueno (16-17)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={42} className="w-24 h-2" />
                      <span className="text-sm font-medium">42%</span>
                      <Activity className="h-3 w-3 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bueno (14-15)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={18} className="w-24 h-2" />
                      <span className="text-sm font-medium">18%</span>
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Regular (12-13)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={4} className="w-24 h-2" />
                      <span className="text-sm font-medium">4%</span>
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Insuficiente (0-11)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={1} className="w-24 h-2" />
                      <span className="text-sm font-medium">1%</span>
                      <TrendingDown className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias de Rendimiento</CardTitle>
                <CardDescription>Evolución del rendimiento en los últimos meses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground">Gráfico de tendencias de rendimiento</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+12.4%</div>
                      <div className="text-muted-foreground">Mejora promedio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">87.5%</div>
                      <div className="text-muted-foreground">Tasa de éxito</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análisis Predictivo</CardTitle>
              <CardDescription>Predicciones basadas en tendencias actuales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Estudiantes en Riesgo</span>
                    <Badge className="bg-red-100 text-red-800">3</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Predicción basada en rendimiento actual</div>
                  <Progress value={15} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Proyección de Aprobación</span>
                    <Badge className="bg-green-100 text-green-800">89%</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Estimado para fin de semestre</div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Carga de Trabajo Óptima</span>
                    <Badge className="bg-blue-100 text-blue-800">85%</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Eficiencia del sistema actual</div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Specialty Performance */}
        <TabsContent value="specialties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Especialidad</CardTitle>
              <CardDescription>Comparativa detallada entre especialidades odontológicas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.specialtyPerformance.map((specialty, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {specialty.name}
                            {getTrendIcon(specialty.trend)}
                          </h3>
                          <p className="text-sm text-muted-foreground">{specialty.students} estudiantes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Promedio: {specialty.avgGrade}/20</Badge>
                        <Badge
                          variant={
                            specialty.trend === "up"
                              ? "default"
                              : specialty.trend === "down"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {specialty.trend === "up" ? "Mejorando" : specialty.trend === "down" ? "Declive" : "Estable"}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Tasa de Aprobación</div>
                        <div className="flex items-center gap-2">
                          <Progress value={specialty.passRate} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{specialty.passRate}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Tasa de Finalización</div>
                        <div className="flex items-center gap-2">
                          <Progress value={specialty.completionRate} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{specialty.completionRate}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Rendimiento General</div>
                        <div className="flex items-center gap-2">
                          <Progress value={(specialty.avgGrade / 20) * 100} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{Math.round((specialty.avgGrade / 20) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Reports Management */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Generar Nuevos Reportes</CardTitle>
                <CardDescription>Crea reportes personalizados del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => generateReport("student_performance")}
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Reporte de Rendimiento Estudiantil</div>
                        <div className="text-sm text-muted-foreground">
                          Análisis detallado por estudiante y especialidad
                        </div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => generateReport("teacher_activity")}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium">Reporte de Actividad Docente</div>
                        <div className="text-sm text-muted-foreground">Métricas de profesores y carga de trabajo</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => generateReport("system_usage")}
                  >
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                      <div className="text-left">
                        <div className="font-medium">Reporte de Uso del Sistema</div>
                        <div className="text-sm text-muted-foreground">Estadísticas de acceso y funcionalidades</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => generateReport("comprehensive")}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-orange-600" />
                      <div className="text-left">
                        <div className="font-medium">Reporte Académico Integral</div>
                        <div className="text-sm text-muted-foreground">Resumen completo del período académico</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reportes Recientes</CardTitle>
                <CardDescription>Historial de reportes generados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data?.recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{report.name}</div>
                          <div className="text-xs text-muted-foreground">{report.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            report.status === "completed"
                              ? "default"
                              : report.status === "processing"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {report.status === "completed"
                            ? "Completado"
                            : report.status === "processing"
                              ? "Procesando"
                              : "Error"}
                        </Badge>
                        {report.status === "completed" && report.downloadUrl && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Todos los Reportes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
