"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { UleamBranding } from "@/components/uleam-branding"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, Clock, MapPin, User, DollarSign, CheckCircle2, Info, Stethoscope, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockPatientData } from "@/lib/mock-data"

export default function MyAppointmentsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("upcoming")

  const upcomingAppointments = mockPatientData.upcomingAppointments
  const pastAppointments = [
    {
      id: "past1",
      type: "Consulta Inicial",
      student: "Dr. Carlos Mendoza",
      specialty: "Ortodoncia",
      date: new Date(2024, 10, 15, 9, 0),
      status: "completed",
      location: "Consultorio 2 - Clínica ULEAM",
      cost: "Gratuito",
      duration: 45,
      notes: "Evaluación inicial completada. Plan de tratamiento establecido.",
    },
    {
      id: "past2",
      type: "Limpieza Dental",
      student: "Dra. Elena Morales",
      specialty: "Endodoncia",
      date: new Date(2024, 9, 20, 14, 30),
      status: "completed",
      location: "Consultorio 1 - Clínica ULEAM",
      cost: "Gratuito",
      duration: 60,
      notes: "Limpieza profunda realizada. Excelente higiene oral.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success-100 text-success-700 border-success-300"
      case "pending":
        return "bg-warning-100 text-warning-700 border-warning-300"
      case "completed":
        return "bg-info-100 text-info-700 border-info-300"
      case "cancelled":
        return "bg-error-100 text-error-700 border-error-300"
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-300"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendiente"
      case "completed":
        return "Completada"
      case "cancelled":
        return "Cancelada"
      default:
        return "Desconocido"
    }
  }

  return (
    <ProtectedRoute requiredRoles={["patient"]}>
      <div className="space-y-8">
        {/* Header con branding ULEAM */}
        <div className="relative overflow-hidden rounded-xl bg-medical-gradient p-8 text-white shadow-soft-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <UleamBranding variant="header" />
                <h2 className="mt-4 text-3xl font-bold tracking-tight">Mis Citas</h2>
                <p className="mt-2 max-w-2xl text-primary-100">
                  Gestiona tus citas en la Clínica Dental Universitaria ULEAM
                </p>
              </div>
              <div className="hidden md:block">
                <div className="rounded-full bg-white/20 p-6">
                  <Calendar className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-primary-800">Gestión de Citas</h3>
            <p className="text-primary-600">Revisa y programa tus citas en las especialidades ULEAM</p>
          </div>
          <Button
            onClick={() => router.push("/dashboard/book-appointment")}
            className="gap-2 bg-primary-600 hover:bg-primary-700 text-white shadow-soft"
          >
            <Plus className="h-4 w-4" />
            Reservar Nueva Cita
          </Button>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-primary-200 hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary-600">Próximas Citas</p>
                    <p className="text-2xl font-bold text-primary-700">{upcomingAppointments.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-success-200 hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-success-600">Citas Completadas</p>
                    <p className="text-2xl font-bold text-success-700">{pastAppointments.length}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-success-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-info-200 hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-info-600">Especialidades</p>
                    <p className="text-2xl font-bold text-info-700">4</p>
                  </div>
                  <Stethoscope className="h-8 w-8 text-info-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-warning-200 hover:shadow-soft transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-warning-600">Total de Citas</p>
                    <p className="text-2xl font-bold text-warning-700">
                      {upcomingAppointments.length + pastAppointments.length}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-warning-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contenido principal */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-primary-50">
            <TabsTrigger
              value="upcoming"
              className="gap-2 data-[state=active]:bg-primary-600 data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4" />
              Próximas Citas ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="gap-2 data-[state=active]:bg-primary-600 data-[state=active]:text-white"
            >
              <CheckCircle2 className="h-4 w-4" />
              Historial ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-soft transition-shadow border-primary-200">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                              <Calendar className="h-6 w-6 text-primary-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg text-primary-800">{appointment.type}</h3>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {getStatusLabel(appointment.status)}
                                </Badge>
                              </div>

                              <div className="grid gap-2 md:grid-cols-2 text-sm text-primary-600">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span>{appointment.student}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Stethoscope className="h-4 w-4" />
                                  <span>{appointment.specialty}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {format(appointment.date, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{appointment.location}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-3">
                                <Badge variant="outline" className="border-primary-200 text-primary-700">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {appointment.duration} min
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary-200 text-primary-700 hover:bg-primary-50"
                            >
                              Ver Detalles
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-error-200 text-error-600 hover:bg-error-50"
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-primary-200">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-primary-800">No tienes citas próximas</h3>
                  <p className="text-primary-600 mb-6">
                    Programa tu primera cita gratuita en cualquiera de nuestras especialidades
                  </p>
                  <Button
                    onClick={() => router.push("/dashboard/book-appointment")}
                    className="gap-2 bg-primary-600 hover:bg-primary-700 shadow-soft"
                  >
                    <Plus className="h-4 w-4" />
                    Reservar Primera Cita
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastAppointments.length > 0 ? (
              <div className="space-y-4">
                {pastAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-soft transition-shadow border-success-200">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
                              <CheckCircle2 className="h-6 w-6 text-success-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg text-primary-800">{appointment.type}</h3>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {getStatusLabel(appointment.status)}
                                </Badge>
                              </div>

                              <div className="grid gap-2 md:grid-cols-2 text-sm text-primary-600">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span>{appointment.student}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Stethoscope className="h-4 w-4" />
                                  <span>{appointment.specialty}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {format(appointment.date, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{appointment.location}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-3">
                                <Badge variant="outline" className="border-primary-200 text-primary-700">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {appointment.duration} min
                                </Badge>
                              </div>

                              {appointment.notes && (
                                <div className="mt-3 p-3 bg-info-50 rounded-lg border border-info-200">
                                  <p className="text-sm text-info-700">
                                    <strong>Notas:</strong> {appointment.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary-200 text-primary-700 hover:bg-primary-50"
                            >
                              Ver Detalles
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary-200 text-primary-700 hover:bg-primary-50"
                            >
                              Descargar Reporte
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-primary-200">
                <CardContent className="p-12 text-center">
                  <CheckCircle2 className="h-16 w-16 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-primary-800">No hay citas completadas</h3>
                  <p className="text-primary-600">Aquí aparecerán tus citas una vez que las hayas completado</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Información adicional */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-info-50 to-primary-50 border-info-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-info-700">
                <Info className="h-5 w-5" />
                Información Importante
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-600 mt-0.5" />
                  <span className="text-primary-700">Llega 15 minutos antes de tu cita</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-600 mt-0.5" />
                  <span className="text-primary-700">Trae tu cédula de identidad</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-600 mt-0.5" />
                  <span className="text-primary-700">Todos los servicios son completamente gratuitos</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success-600 mt-0.5" />
                  <span className="text-primary-700">Atención supervisada por profesores especializados</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success-50 to-primary-50 border-success-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success-700">
                <Heart className="h-5 w-5 text-error-500" />
                Contacto ULEAM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-primary-700">
                <p>
                  <strong>Teléfono:</strong> (05) 2623-740
                </p>
                <p>
                  <strong>Email:</strong> clinica.dental@uleam.edu.ec
                </p>
                <p>
                  <strong>Horario:</strong> Lun-Vie 8:00-18:00
                </p>
                <p>
                  <strong>Dirección:</strong> Av. Circunvalación, Manta, Manabí
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
