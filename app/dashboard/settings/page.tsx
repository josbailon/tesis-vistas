"use client"

import { useState } from "react"
import { Save, Lock, Building, Bell, Database, Shield, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [appointmentReminders, setAppointmentReminders] = useState(true)
  const [approvalNotifications, setApprovalNotifications] = useState(true)
  const [academicNotifications, setAcademicNotifications] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra la configuración del sistema</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="database">Base de Datos</TabsTrigger>
          <TabsTrigger value="backup">Respaldos</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Clínica</CardTitle>
              <CardDescription>Configura la información básica de la clínica dental</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinic-name">Nombre de la Clínica</Label>
                <Input id="clinic-name" defaultValue="Clínica Dental Universitaria" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinic-address">Dirección</Label>
                <Input id="clinic-address" defaultValue="Av. Universidad 123, Ciudad Universitaria" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-phone">Teléfono</Label>
                  <Input id="clinic-phone" defaultValue="555-123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-email">Correo Electrónico</Label>
                  <Input id="clinic-email" defaultValue="contacto@clinicadental.edu" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinic-description">Descripción</Label>
                <Textarea
                  id="clinic-description"
                  defaultValue="Clínica Dental Universitaria dedicada a la formación de profesionales y atención a la comunidad."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinic-logo">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                    <Building className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Cambiar Logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>Configura los parámetros generales del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-language">Idioma del Sistema</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="system-language">
                    <SelectValue placeholder="Seleccionar idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">Inglés</SelectItem>
                    <SelectItem value="fr">Francés</SelectItem>
                    <SelectItem value="pt">Portugués</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-timezone">Zona Horaria</Label>
                <Select defaultValue="america_mexico_city">
                  <SelectTrigger id="system-timezone">
                    <SelectValue placeholder="Seleccionar zona horaria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america_mexico_city">América/Ciudad de México</SelectItem>
                    <SelectItem value="america_bogota">América/Bogotá</SelectItem>
                    <SelectItem value="america_santiago">América/Santiago</SelectItem>
                    <SelectItem value="america_buenos_aires">América/Buenos Aires</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-date-format">Formato de Fecha</Label>
                <Select defaultValue="dd_mm_yyyy">
                  <SelectTrigger id="system-date-format">
                    <SelectValue placeholder="Seleccionar formato de fecha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd_mm_yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mm_dd_yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="yyyy_mm_dd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-time-format">Formato de Hora</Label>
                <Select defaultValue="24h">
                  <SelectTrigger id="system-time-format">
                    <SelectValue placeholder="Seleccionar formato de hora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24 horas</SelectItem>
                    <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Políticas de Seguridad</CardTitle>
              <CardDescription>Configura las políticas de seguridad del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Política de Contraseñas</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Seleccionar política" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básica (mínimo 6 caracteres)</SelectItem>
                    <SelectItem value="medium">Media (mínimo 8 caracteres, incluir números)</SelectItem>
                    <SelectItem value="strong">Fuerte (mínimo 10 caracteres, incluir números y símbolos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tiempo de Inactividad de Sesión</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Seleccionar tiempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Autenticación de Dos Factores</Label>
                  <p className="text-sm text-muted-foreground">
                    Requerir autenticación de dos factores para todos los usuarios
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-restriction">Restricción de IP</Label>
                  <p className="text-sm text-muted-foreground">Limitar el acceso a rangos de IP específicos</p>
                </div>
                <Switch id="ip-restriction" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="login-attempts">Bloqueo por Intentos Fallidos</Label>
                  <p className="text-sm text-muted-foreground">
                    Bloquear cuenta después de 5 intentos fallidos de inicio de sesión
                  </p>
                </div>
                <Switch id="login-attempts" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Lock className="mr-2 h-4 w-4" />
                Guardar Configuración de Seguridad
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Permisos de Usuarios</CardTitle>
              <CardDescription>Configura los permisos por defecto para cada rol de usuario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Administradores</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="admin-users" defaultChecked />
                    <Label htmlFor="admin-users">Gestión de Usuarios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="admin-settings" defaultChecked />
                    <Label htmlFor="admin-settings">Configuración del Sistema</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="admin-reports" defaultChecked />
                    <Label htmlFor="admin-reports">Reportes y Estadísticas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="admin-backup" defaultChecked />
                    <Label htmlFor="admin-backup">Respaldos y Restauración</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Profesores</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="professor-students" defaultChecked />
                    <Label htmlFor="professor-students">Gestión de Estudiantes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="professor-approvals" defaultChecked />
                    <Label htmlFor="professor-approvals">Aprobaciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="professor-evaluations" defaultChecked />
                    <Label htmlFor="professor-evaluations">Evaluaciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="professor-reports" defaultChecked />
                    <Label htmlFor="professor-reports">Reportes</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Estudiantes</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="student-patients" defaultChecked />
                    <Label htmlFor="student-patients">Gestión de Pacientes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="student-appointments" defaultChecked />
                    <Label htmlFor="student-appointments">Gestión de Citas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="student-records" defaultChecked />
                    <Label htmlFor="student-records">Expedientes Médicos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="student-requests" defaultChecked />
                    <Label htmlFor="student-requests">Solicitudes de Aprobación</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Pacientes</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="patient-appointments" defaultChecked />
                    <Label htmlFor="patient-appointments">Ver Citas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="patient-records" defaultChecked />
                    <Label htmlFor="patient-records">Ver Expediente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="patient-request-appointments" defaultChecked />
                    <Label htmlFor="patient-request-appointments">Solicitar Citas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="patient-documents" defaultChecked />
                    <Label htmlFor="patient-documents">Descargar Documentos</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Shield className="mr-2 h-4 w-4" />
                Guardar Permisos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo se envían las notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificaciones por Correo Electrónico</Label>
                    <p className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
                    <p className="text-sm text-muted-foreground">Recibir notificaciones por mensaje de texto</p>
                  </div>
                  <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tipos de Notificaciones</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appointment-reminders">Recordatorios de Citas</Label>
                    <Switch
                      id="appointment-reminders"
                      checked={appointmentReminders}
                      onCheckedChange={setAppointmentReminders}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="approval-notifications">Solicitudes de Aprobación</Label>
                    <Switch
                      id="approval-notifications"
                      checked={approvalNotifications}
                      onCheckedChange={setApprovalNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="academic-notifications">Notificaciones Académicas</Label>
                    <Switch
                      id="academic-notifications"
                      checked={academicNotifications}
                      onCheckedChange={setAcademicNotifications}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-frequency">Frecuencia de Recordatorios de Citas</Label>
                <Select defaultValue="24">
                  <SelectTrigger id="notification-frequency">
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 horas antes</SelectItem>
                    <SelectItem value="24">24 horas antes</SelectItem>
                    <SelectItem value="48">48 horas antes</SelectItem>
                    <SelectItem value="72">72 horas antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-template">Plantilla de Correo Electrónico</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="email-template">
                    <SelectValue placeholder="Seleccionar plantilla" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Plantilla Predeterminada</SelectItem>
                    <SelectItem value="minimal">Plantilla Minimalista</SelectItem>
                    <SelectItem value="detailed">Plantilla Detallada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Bell className="mr-2 h-4 w-4" />
                Guardar Configuración de Notificaciones
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Correo Electrónico</CardTitle>
              <CardDescription>Configura el servidor de correo electrónico para enviar notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-server">Servidor SMTP</Label>
                <Input id="smtp-server" defaultValue="smtp.clinicadental.edu" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Puerto</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-security">Seguridad</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="smtp-security">
                      <SelectValue placeholder="Seleccionar seguridad" />
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
                <Label htmlFor="smtp-username">Usuario</Label>
                <Input id="smtp-username" defaultValue="notificaciones@clinicadental.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Contraseña</Label>
                <Input id="smtp-password" type="password" defaultValue="********" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email">Correo Electrónico de Origen</Label>
                <Input id="from-email" defaultValue="notificaciones@clinicadental.edu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-name">Nombre de Origen</Label>
                <Input id="from-name" defaultValue="Clínica Dental Universitaria" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Guardar Configuración de Correo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Base de Datos</CardTitle>
              <CardDescription>Configura la conexión a la base de datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-type">Tipo de Base de Datos</Label>
                <Select defaultValue="mysql">
                  <SelectTrigger id="db-type">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="sqlserver">SQL Server</SelectItem>
                    <SelectItem value="oracle">Oracle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-host">Servidor</Label>
                <Input id="db-host" defaultValue="localhost" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="db-port">Puerto</Label>
                  <Input id="db-port" defaultValue="3306" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Nombre de la Base de Datos</Label>
                  <Input id="db-name" defaultValue="clinica_dental" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-username">Usuario</Label>
                <Input id="db-username" defaultValue="admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-password">Contraseña</Label>
                <Input id="db-password" type="password" defaultValue="********" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="db-ssl">Conexión SSL</Label>
                  <p className="text-sm text-muted-foreground">Usar conexión segura SSL</p>
                </div>
                <Switch id="db-ssl" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Database className="mr-2 h-4 w-4" />
                Guardar Configuración de Base de Datos
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mantenimiento de Base de Datos</CardTitle>
              <CardDescription>Opciones de mantenimiento y optimización</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Operaciones de Mantenimiento</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Optimizar Tablas</Button>
                  <Button variant="outline">Reparar Tablas</Button>
                  <Button variant="outline">Vaciar Caché</Button>
                  <Button variant="outline">Verificar Integridad</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="auto-optimize">Optimización Automática</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger id="auto-optimize">
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diariamente</SelectItem>
                    <SelectItem value="weekly">Semanalmente</SelectItem>
                    <SelectItem value="monthly">Mensualmente</SelectItem>
                    <SelectItem value="never">Nunca</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-retention">Retención de Logs</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="log-retention">
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 días</SelectItem>
                    <SelectItem value="30">30 días</SelectItem>
                    <SelectItem value="90">90 días</SelectItem>
                    <SelectItem value="365">1 año</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Configuración de Mantenimiento
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Respaldos</CardTitle>
              <CardDescription>Configura la programación y almacenamiento de respaldos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Frecuencia de Respaldo</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Cada hora</SelectItem>
                    <SelectItem value="daily">Diariamente</SelectItem>
                    <SelectItem value="weekly">Semanalmente</SelectItem>
                    <SelectItem value="monthly">Mensualmente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-time">Hora del Respaldo</Label>
                <Select defaultValue="02:00">
                  <SelectTrigger id="backup-time">
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00:00">00:00</SelectItem>
                    <SelectItem value="02:00">02:00</SelectItem>
                    <SelectItem value="04:00">04:00</SelectItem>
                    <SelectItem value="22:00">22:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Retención de Respaldos</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="backup-retention">
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 días</SelectItem>
                    <SelectItem value="30">30 días</SelectItem>
                    <SelectItem value="90">90 días</SelectItem>
                    <SelectItem value="365">1 año</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-storage">Almacenamiento de Respaldos</Label>
                <Select defaultValue="local">
                  <SelectTrigger id="backup-storage">
                    <SelectValue placeholder="Seleccionar almacenamiento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Almacenamiento Local</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="dropbox">Dropbox</SelectItem>
                    <SelectItem value="google">Google Drive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-path">Ruta de Almacenamiento Local</Label>
                <Input id="backup-path" defaultValue="/var/backups/clinica_dental" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="backup-compression">Compresión de Respaldos</Label>
                  <p className="text-sm text-muted-foreground">Comprimir respaldos para ahorrar espacio</p>
                </div>
                <Switch id="backup-compression" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="backup-encryption">Cifrado de Respaldos</Label>
                  <p className="text-sm text-muted-foreground">Cifrar respaldos para mayor seguridad</p>
                </div>
                <Switch id="backup-encryption" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Crear Respaldo Manual</Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar Configuración de Respaldos
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Restauración de Respaldos</CardTitle>
              <CardDescription>Restaura el sistema desde un respaldo previo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-list">Respaldos Disponibles</Label>
                <Select>
                  <SelectTrigger id="backup-list">
                    <SelectValue placeholder="Seleccionar respaldo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="backup-20250520-020000">20/05/2025 02:00:00</SelectItem>
                    <SelectItem value="backup-20250519-020000">19/05/2025 02:00:00</SelectItem>
                    <SelectItem value="backup-20250518-020000">18/05/2025 02:00:00</SelectItem>
                    <SelectItem value="backup-20250517-020000">17/05/2025 02:00:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subir Archivo de Respaldo</Label>
                <div className="flex items-center gap-4">
                  <Input type="file" />
                  <Button variant="outline">Subir</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Opciones de Restauración</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="restore-data" className="rounded border-gray-300" />
                    <Label htmlFor="restore-data">Restaurar Datos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="restore-files" className="rounded border-gray-300" />
                    <Label htmlFor="restore-files">Restaurar Archivos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="restore-settings" className="rounded border-gray-300" />
                    <Label htmlFor="restore-settings">Restaurar Configuración</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">Restaurar Sistema</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
