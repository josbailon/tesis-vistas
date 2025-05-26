"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Save, RefreshCw, Database, Shield, Mail, Bell, FileText } from "lucide-react"

export default function SystemConfigPage() {
  const [specialties, setSpecialties] = useState([
    {
      id: 1,
      name: "Endodoncia",
      code: "ENDO",
      description: "Tratamiento de conductos radiculares",
      active: true,
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Ortodoncia",
      code: "ORTO",
      description: "Corrección de malposiciones dentales",
      active: true,
      color: "#10B981",
    },
    {
      id: 3,
      name: "Cirugía Oral",
      code: "CIRU",
      description: "Procedimientos quirúrgicos orales",
      active: true,
      color: "#F59E0B",
    },
    {
      id: 4,
      name: "Odontopediatría",
      code: "PEDI",
      description: "Odontología para niños",
      active: true,
      color: "#EF4444",
    },
    {
      id: 5,
      name: "Periodoncia",
      code: "PERI",
      description: "Tratamiento de encías y periodonto",
      active: false,
      color: "#8B5CF6",
    },
  ])

  const [assignmentTypes, setAssignmentTypes] = useState([
    {
      id: 1,
      name: "Caso Clínico",
      description: "Análisis de casos reales",
      maxPoints: 100,
      timeLimit: 7,
      active: true,
    },
    {
      id: 2,
      name: "Investigación",
      description: "Trabajo de investigación académica",
      maxPoints: 150,
      timeLimit: 14,
      active: true,
    },
    { id: 3, name: "Presentación", description: "Exposición oral de temas", maxPoints: 80, timeLimit: 3, active: true },
    {
      id: 4,
      name: "Examen Práctico",
      description: "Evaluación práctica de habilidades",
      maxPoints: 200,
      timeLimit: 1,
      active: true,
    },
  ])

  const [gradingScales, setGradingScales] = useState([
    { id: 1, name: "Escala Tradicional", min: 0, max: 20, passGrade: 14, active: true },
    { id: 2, name: "Escala Porcentual", min: 0, max: 100, passGrade: 70, active: false },
    { id: 3, name: "Escala Literal", min: 0, max: 4, passGrade: 2.5, active: false },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
        <p className="text-muted-foreground">Administra la configuración global del sistema y parámetros académicos</p>
      </div>

      <Tabs defaultValue="specialties">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="specialties">Especialidades</TabsTrigger>
          <TabsTrigger value="assignments">Tipos de Tareas</TabsTrigger>
          <TabsTrigger value="grading">Escalas de Calificación</TabsTrigger>
          <TabsTrigger value="academic">Configuración Académica</TabsTrigger>
          <TabsTrigger value="system">Sistema General</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
        </TabsList>

        {/* Specialties Management */}
        <TabsContent value="specialties" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gestión de Especialidades</CardTitle>
                <CardDescription>Configura las especialidades odontológicas disponibles en el sistema</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Especialidad
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nueva Especialidad</DialogTitle>
                    <DialogDescription>Define una nueva especialidad odontológica</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty-name">Nombre de la Especialidad</Label>
                      <Input id="specialty-name" placeholder="Ej: Implantología" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty-code">Código</Label>
                      <Input id="specialty-code" placeholder="Ej: IMPL" maxLength={4} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty-description">Descripción</Label>
                      <Textarea id="specialty-description" placeholder="Descripción de la especialidad..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty-color">Color Identificativo</Label>
                      <Input id="specialty-color" type="color" defaultValue="#3B82F6" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="specialty-active" defaultChecked />
                      <Label htmlFor="specialty-active">Especialidad activa</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button>Crear Especialidad</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specialties.map((specialty) => (
                    <TableRow key={specialty.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: specialty.color }} />
                          <span className="font-medium">{specialty.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{specialty.code}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{specialty.description}</TableCell>
                      <TableCell>
                        <Badge variant={specialty.active ? "default" : "secondary"}>
                          {specialty.active ? "Activa" : "Inactiva"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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

        {/* Assignment Types */}
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tipos de Asignaciones</CardTitle>
                <CardDescription>Define los tipos de tareas y evaluaciones disponibles</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Tipo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Tipo de Asignación</DialogTitle>
                    <DialogDescription>Define un nuevo tipo de tarea o evaluación</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignment-name">Nombre del Tipo</Label>
                      <Input id="assignment-name" placeholder="Ej: Examen Oral" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignment-description">Descripción</Label>
                      <Textarea id="assignment-description" placeholder="Descripción del tipo de asignación..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="max-points">Puntuación Máxima</Label>
                        <Input id="max-points" type="number" placeholder="100" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-limit">Tiempo Límite (días)</Label>
                        <Input id="time-limit" type="number" placeholder="7" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="assignment-active" defaultChecked />
                      <Label htmlFor="assignment-active">Tipo activo</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button>Crear Tipo</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Asignación</TableHead>
                    <TableHead>Puntuación Máxima</TableHead>
                    <TableHead>Tiempo Límite</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignmentTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{type.maxPoints} pts</Badge>
                      </TableCell>
                      <TableCell>{type.timeLimit} días</TableCell>
                      <TableCell>
                        <Badge variant={type.active ? "default" : "secondary"}>
                          {type.active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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

        {/* Grading Scales */}
        <TabsContent value="grading" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Escalas de Calificación</CardTitle>
                <CardDescription>Configura las escalas de calificación utilizadas en el sistema</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Escala
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Escala de Calificación</DialogTitle>
                    <DialogDescription>
                      Define una nueva escala para evaluar el rendimiento estudiantil
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="scale-name">Nombre de la Escala</Label>
                      <Input id="scale-name" placeholder="Ej: Escala ECTS" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="min-grade">Calificación Mínima</Label>
                        <Input id="min-grade" type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-grade">Calificación Máxima</Label>
                        <Input id="max-grade" type="number" placeholder="20" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pass-grade">Nota de Aprobación</Label>
                        <Input id="pass-grade" type="number" placeholder="14" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="scale-active" />
                      <Label htmlFor="scale-active">Escala activa</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button>Crear Escala</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Escala</TableHead>
                    <TableHead>Rango</TableHead>
                    <TableHead>Nota de Aprobación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gradingScales.map((scale) => (
                    <TableRow key={scale.id}>
                      <TableCell className="font-medium">{scale.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {scale.min} - {scale.max}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">≥ {scale.passGrade}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={scale.active ? "default" : "secondary"}>
                          {scale.active ? "Activa" : "Inactiva"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
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

        {/* Academic Configuration */}
        <TabsContent value="academic" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuración Académica</CardTitle>
                <CardDescription>Parámetros generales del sistema académico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="semester-duration">Duración del Semestre (semanas)</Label>
                  <Input id="semester-duration" type="number" defaultValue="16" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-students-per-teacher">Máximo Estudiantes por Profesor</Label>
                  <Input id="max-students-per-teacher" type="number" defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignment-deadline-days">Días límite para entrega de tareas</Label>
                  <Input id="assignment-deadline-days" type="number" defaultValue="7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approval-timeout-hours">Tiempo límite para aprobaciones (horas)</Label>
                  <Input id="approval-timeout-hours" type="number" defaultValue="48" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-assign-students" defaultChecked />
                  <Label htmlFor="auto-assign-students">Asignación automática de estudiantes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="allow-late-submissions" />
                  <Label htmlFor="allow-late-submissions">Permitir entregas tardías</Label>
                </div>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración Académica
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración de Evaluaciones</CardTitle>
                <CardDescription>Parámetros para el sistema de evaluaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="min-grade-to-pass">Calificación mínima para aprobar (%)</Label>
                  <Input id="min-grade-to-pass" type="number" defaultValue="70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-attempts">Máximo intentos por evaluación</Label>
                  <Input id="max-attempts" type="number" defaultValue="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="evaluation-window">Ventana de evaluación (días)</Label>
                  <Input id="evaluation-window" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback-deadline">Plazo para retroalimentación (días)</Label>
                  <Input id="feedback-deadline" type="number" defaultValue="3" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="require-feedback" defaultChecked />
                  <Label htmlFor="require-feedback">Retroalimentación obligatoria</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="anonymous-evaluations" />
                  <Label htmlFor="anonymous-evaluations">Evaluaciones anónimas</Label>
                </div>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración de Evaluaciones
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System General */}
        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
                <CardDescription>Configuraciones básicas del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">Nombre del Sistema</Label>
                  <Input id="system-name" defaultValue="Sistema de Gestión Clínica Dental ULEAM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution-name">Nombre de la Institución</Label>
                  <Input id="institution-name" defaultValue="Universidad Laica Eloy Alfaro de Manabí" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="system-timezone">Zona Horaria</Label>
                  <Select defaultValue="america_guayaquil">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america_guayaquil">América/Guayaquil (ECT)</SelectItem>
                      <SelectItem value="america_bogota">América/Bogotá (COT)</SelectItem>
                      <SelectItem value="america_lima">América/Lima (PET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-language">Idioma Predeterminado</Label>
                  <Select defaultValue="es">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="pt">Portugués</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Tiempo de sesión (minutos)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Configuración General
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración de Seguridad</CardTitle>
                <CardDescription>Parámetros de seguridad del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password-min-length">Longitud mínima de contraseña</Label>
                  <Input id="password-min-length" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Máximo intentos de login</Label>
                  <Input id="max-login-attempts" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockout-duration">Duración de bloqueo (minutos)</Label>
                  <Input id="lockout-duration" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="require-2fa" />
                  <Label htmlFor="require-2fa">Requerir autenticación de dos factores</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="force-password-change" defaultChecked />
                  <Label htmlFor="force-password-change">Forzar cambio de contraseña cada 90 días</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="log-user-activity" defaultChecked />
                  <Label htmlFor="log-user-activity">Registrar actividad de usuarios</Label>
                </div>
                <Button className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Guardar Configuración de Seguridad
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Integraciones de Correo</CardTitle>
                <CardDescription>Configuración de servicios de correo electrónico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-server">Servidor SMTP</Label>
                  <Input id="smtp-server" defaultValue="smtp.uleam.edu.ec" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Puerto</Label>
                    <Input id="smtp-port" type="number" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-security">Seguridad</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Ninguna</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="tls">TLS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Usuario SMTP</Label>
                  <Input id="smtp-username" defaultValue="sistema@uleam.edu.ec" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Contraseña SMTP</Label>
                  <Input id="smtp-password" type="password" defaultValue="••••••••" />
                </div>
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Probar Conexión SMTP
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integraciones Externas</CardTitle>
                <CardDescription>Conexiones con sistemas externos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Sistema de Información Estudiantil</div>
                        <div className="text-sm text-muted-foreground">Sincronización de datos estudiantiles</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Sistema de Notificaciones SMS</div>
                        <div className="text-sm text-muted-foreground">Envío de notificaciones por SMS</div>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Sistema de Gestión Documental</div>
                        <div className="text-sm text-muted-foreground">Almacenamiento de documentos</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div>
                        <div className="font-medium">Calendario Institucional</div>
                        <div className="text-sm text-muted-foreground">Sincronización con calendario ULEAM</div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sincronizar Todas las Integraciones
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
