"use client"

import { useState } from "react"
import { BarChart, LineChart, PieChart, Calendar, Users, FileText, CheckSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Importar datos de prueba
import { appointments, approvalRequests, students, patients, clinicalCases } from "@/lib/mock-data"

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [specialty, setSpecialty] = useState("all")

  // Calcular estadísticas generales
  const totalAppointments = appointments.length
  const confirmedAppointments = appointments.filter((a) => a.status === "confirmed").length
  const pendingAppointments = appointments.filter((a) => a.status === "pending").length
  const completedAppointments = appointments.filter((a) => a.status === "completed").length

  const totalPatients = patients.length
  const activePatients = patients.filter((p) => p.status === "active").length

  const totalStudents = students.length
  const activeStudents = students.filter((s) => s.status === "active").length

  const totalCases = clinicalCases.length
  const activeCases = clinicalCases.filter((c) => c.status === "in-progress").length
  const completedCases = clinicalCases.filter((c) => c.status === "completed").length

  const totalApprovals = approvalRequests.length
  const pendingApprovals = approvalRequests.filter((a) => a.status === "pending").length
  const approvedApprovals = approvalRequests.filter((a) => a.status === "approved").length
  const rejectedApprovals = approvalRequests.filter((a) => a.status === "rejected").length

  // Calcular distribución por especialidad
  const specialtyDistribution = [
    { name: "Endodoncia", value: 35 },
    { name: "Ortodoncia", value: 25 },
    { name: "Periodoncia", value: 15 },
    { name: "Cirugía Oral", value: 15 },
    { name: "Odontopediatría", value: 10 },
  ]

  // Calcular distribución por tipo de tratamiento
  const treatmentDistribution = [
    { name: "Tratamiento de conducto", value: 30 },
    { name: "Ortodoncia", value: 25 },
    { name: "Limpieza profunda", value: 15 },
    { name: "Extracciones", value: 10 },
    { name: "Restauraciones", value: 20 },
  ]

  // Datos para gráficos de tendencia (simulados)
  const monthlyAppointments = [
    { month: "Ene", count: 45 },
    { month: "Feb", count: 52 },
    { month: "Mar", count: 48 },
    { month: "Abr", count: 58 },
    { month: "May", count: 62 },
    { month: "Jun", count: 55 },
    { month: "Jul", count: 50 },
    { month: "Ago", count: 48 },
    { month: "Sep", count: 60 },
    { month: "Oct", count: 65 },
    { month: "Nov", count: 68 },
    { month: "Dic", count: 52 },
  ]

  const monthlyPatients = [
    { month: "Ene", count: 12 },
    { month: "Feb", count: 15 },
    { month: "Mar", count: 10 },
    { month: "Abr", count: 18 },
    { month: "May", count: 20 },
    { month: "Jun", count: 17 },
    { month: "Jul", count: 14 },
    { month: "Ago", count: 12 },
    { month: "Sep", count: 16 },
    { month: "Oct", count: 22 },
    { month: "Nov", count: 25 },
    { month: "Dic", count: 18 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Estadísticas</h1>
        <p className="text-muted-foreground">Análisis y métricas del sistema de gestión de la clínica dental</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rango de tiempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último año</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Especialidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las especialidades</SelectItem>
              <SelectItem value="endodoncia">Endodoncia</SelectItem>
              <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
              <SelectItem value="periodoncia">Periodoncia</SelectItem>
              <SelectItem value="cirugia">Cirugía Oral</SelectItem>
              <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Citas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground">
              {confirmedAppointments} confirmadas, {pendingAppointments} pendientes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePatients}</div>
            <p className="text-xs text-muted-foreground">De un total de {totalPatients} pacientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Clínicos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCases}</div>
            <p className="text-xs text-muted-foreground">
              {activeCases} activos, {completedCases} completados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobaciones</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApprovals}</div>
            <p className="text-xs text-muted-foreground">
              {pendingApprovals} pendientes, {approvedApprovals} aprobadas, {rejectedApprovals} rechazadas
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Resumen General</TabsTrigger>
          <TabsTrigger value="appointments">Citas</TabsTrigger>
          <TabsTrigger value="treatments">Tratamientos</TabsTrigger>
          <TabsTrigger value="academic">Académico</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Especialidad</CardTitle>
                <CardDescription>Distribución de casos por especialidad</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Gráfico de distribución por especialidad</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    {specialtyDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <span>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Citas</CardTitle>
                <CardDescription>Número de citas por mes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Gráfico de tendencia de citas</p>
                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {monthlyAppointments.slice(0, 6).map((item) => (
                        <div key={item.month}>{item.month}</div>
                      ))}
                    </div>
                    <div className="mt-1 h-16 flex items-end">
                      {monthlyAppointments.slice(0, 6).map((item) => (
                        <div
                          key={item.month}
                          className="flex-1 mx-0.5 bg-primary/60"
                          style={{ height: `${(item.count / 70) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Tratamiento</CardTitle>
                <CardDescription>Tipos de tratamientos realizados</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Gráfico de distribución por tratamiento</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    {treatmentDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <span>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Nuevos Pacientes</CardTitle>
                <CardDescription>Pacientes nuevos por mes</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Gráfico de nuevos pacientes</p>
                  <div className="mt-4 w-full">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {monthlyPatients.slice(0, 6).map((item) => (
                        <div key={item.month}>{item.month}</div>
                      ))}
                    </div>
                    <div className="mt-1 h-16 flex items-end">
                      {monthlyPatients.slice(0, 6).map((item) => (
                        <div
                          key={item.month}
                          className="flex-1 mx-0.5 bg-primary/60"
                          style={{ height: `${(item.count / 25) * 100}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Citas</CardTitle>
              <CardDescription>Análisis detallado de las citas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Estado de Citas</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-2xl font-bold">{totalAppointments}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Confirmadas</p>
                      <p className="text-2xl font-bold">{confirmedAppointments}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Pendientes</p>
                      <p className="text-2xl font-bold">{pendingAppointments}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Completadas</p>
                      <p className="text-2xl font-bold">{completedAppointments}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Distribución por Tipo de Cita</h3>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                      <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Gráfico de distribución por tipo de cita</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Tendencia de Citas</h3>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                      <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Gráfico de tendencia de citas</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="treatments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Tratamientos</CardTitle>
              <CardDescription>Análisis detallado de los tratamientos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Estado de Tratamientos</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-2xl font-bold">{totalCases}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">En Progreso</p>
                      <p className="text-2xl font-bold">{activeCases}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Completados</p>
                      <p className="text-2xl font-bold">{completedCases}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Distribución por Tipo de Tratamiento</h3>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                      <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Gráfico de distribución por tipo de tratamiento</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Duración Promedio de Tratamientos</h3>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                      <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Gráfico de duración promedio de tratamientos</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas Académicas</CardTitle>
              <CardDescription>Análisis del desempeño académico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Estudiantes</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-2xl font-bold">{totalStudents}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Activos</p>
                      <p className="text-2xl font-bold">{activeStudents}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Progreso Promedio</p>
                      <p className="text-2xl font-bold">
                        {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Distribución por Especialidad</h3>
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="text-center flex flex-col items-center">
                      <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Gráfico de distribución de estudiantes por especialidad</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Aprobaciones</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-2xl font-bold">{totalApprovals}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Pendientes</p>
                      <p className="text-2xl font-bold">{pendingApprovals}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Aprobadas</p>
                      <p className="text-2xl font-bold">{approvedApprovals}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Rechazadas</p>
                      <p className="text-2xl font-bold">{rejectedApprovals}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
