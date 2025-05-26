"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addDays, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, CheckCircle2, ArrowLeft, ArrowRight, Star, CalendarDays, Timer, Info, Heart } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { StudentProfile, TimeSlot, AppointmentType } from "@/lib/student-availability"
import { getAvailableSlots } from "@/lib/student-availability"

interface TimeSlotBookingInterfaceProps {
  student: StudentProfile
  appointmentType: AppointmentType
  selectedDate: Date | null
  selectedTimeSlot: TimeSlot | null
  onDateSelect: (date: Date) => void
  onTimeSlotSelect: (slot: TimeSlot) => void
}

export function TimeSlotBookingInterface({
  student,
  appointmentType,
  selectedDate,
  selectedTimeSlot,
  onDateSelect,
  onTimeSlotSelect,
}: TimeSlotBookingInterfaceProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [availableSlots, setAvailableSlots] = useState<Record<string, TimeSlot[]>>({})
  const [loading, setLoading] = useState(false)

  // Get week days
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }) // Monday
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd }).filter((day) => day.getDay() !== 0) // Exclude Sunday

  // Load availability for the week
  useEffect(() => {
    const loadWeekAvailability = async () => {
      setLoading(true)
      const slots: Record<string, TimeSlot[]> = {}

      weekDays.forEach((day) => {
        const dayKey = format(day, "yyyy-MM-dd")
        slots[dayKey] = getAvailableSlots(student.id, day, appointmentType.duration)
      })

      setAvailableSlots(slots)
      setLoading(false)
    }

    loadWeekAvailability()
  }, [student.id, appointmentType.duration, currentWeek, weekDays])

  const goToPreviousWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7))
  }

  const goToNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7))
  }

  const getDaySlots = (date: Date) => {
    const dayKey = format(date, "yyyy-MM-dd")
    return availableSlots[dayKey] || []
  }

  const getTotalSlotsInWeek = () => {
    return Object.values(availableSlots).reduce((total, slots) => total + slots.length, 0)
  }

  const getTimeSlotsByPeriod = (date: Date) => {
    const slots = getDaySlots(date)
    const morning = slots.filter((slot) => slot.start.getHours() < 12)
    const afternoon = slots.filter((slot) => slot.start.getHours() >= 12 && slot.start.getHours() < 18)
    const evening = slots.filter((slot) => slot.start.getHours() >= 18)

    return { morning, afternoon, evening }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold text-gray-900">Seleccionar Fecha y Hora</h2>
          <p className="text-lg text-muted-foreground">
            Elige el mejor horario para tu cita con <span className="font-semibold text-blue-600">{student.name}</span>
          </p>
        </motion.div>

        {/* Student Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                  <AvatarImage src={student.profileImage || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-green-600 text-white">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{student.rating}</span>
                    <span className="text-sm text-muted-foreground">• {student.completedCases} casos</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    <Timer className="h-3 w-3 mr-1" />
                    {appointmentType.duration} min
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{appointmentType.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Calendar Interface */}
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Vista Calendario</TabsTrigger>
          <TabsTrigger value="list">Vista Lista</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          {/* Week Navigation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={goToPreviousWeek} size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Semana Anterior
                </Button>
                <div className="text-center">
                  <CardTitle className="text-lg">
                    {format(weekStart, "d 'de' MMMM", { locale: es })} -{" "}
                    {format(weekEnd, "d 'de' MMMM yyyy", { locale: es })}
                  </CardTitle>
                  <CardDescription>{getTotalSlotsInWeek()} horarios disponibles esta semana</CardDescription>
                </div>
                <Button variant="outline" onClick={goToNextWeek} size="sm">
                  Semana Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Calendar Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {weekDays.map((day, index) => {
              const daySlots = getDaySlots(day)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isToday = isSameDay(day, new Date())
              const { morning, afternoon, evening } = getTimeSlotsByPeriod(day)

              return (
                <motion.div
                  key={day.toISOString()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected
                        ? "border-2 border-blue-500 bg-blue-50"
                        : daySlots.length > 0
                          ? "hover:border-blue-300 hover:scale-105"
                          : "opacity-50"
                    } ${isToday ? "ring-2 ring-green-200" : ""}`}
                    onClick={() => daySlots.length > 0 && onDateSelect(day)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground uppercase">
                            {format(day, "EEE", { locale: es })}
                          </p>
                          <p className={`text-lg font-bold ${isToday ? "text-green-600" : ""}`}>{format(day, "d")}</p>
                          {isToday && (
                            <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                              Hoy
                            </Badge>
                          )}
                        </div>

                        {daySlots.length > 0 ? (
                          <div className="space-y-2">
                            <Badge variant="outline" className="text-xs">
                              {daySlots.length} horarios
                            </Badge>
                            <div className="space-y-1">
                              {morning.length > 0 && (
                                <div className="text-xs text-blue-600">🌅 {morning.length} mañana</div>
                              )}
                              {afternoon.length > 0 && (
                                <div className="text-xs text-orange-600">☀️ {afternoon.length} tarde</div>
                              )}
                              {evening.length > 0 && (
                                <div className="text-xs text-purple-600">🌙 {evening.length} noche</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">No disponible</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Time Slots for Selected Date */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-blue-600" />
                      Horarios para {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                    </CardTitle>
                    <CardDescription>Selecciona el horario que mejor se adapte a tu disponibilidad</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const { morning, afternoon, evening } = getTimeSlotsByPeriod(selectedDate)
                      const allSlots = [...morning, ...afternoon, ...evening]

                      if (allSlots.length === 0) {
                        return (
                          <div className="text-center py-8">
                            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No hay horarios disponibles para esta fecha</p>
                          </div>
                        )
                      }

                      return (
                        <div className="space-y-6">
                          {morning.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                🌅 Mañana <Badge variant="outline">{morning.length} horarios</Badge>
                              </h4>
                              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {morning.map((slot, index) => (
                                  <Button
                                    key={index}
                                    variant={
                                      selectedTimeSlot?.start.getTime() === slot.start.getTime() ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() => onTimeSlotSelect(slot)}
                                    className="text-xs"
                                  >
                                    {format(slot.start, "HH:mm")}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {afternoon.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                ☀️ Tarde <Badge variant="outline">{afternoon.length} horarios</Badge>
                              </h4>
                              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {afternoon.map((slot, index) => (
                                  <Button
                                    key={index}
                                    variant={
                                      selectedTimeSlot?.start.getTime() === slot.start.getTime() ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() => onTimeSlotSelect(slot)}
                                    className="text-xs"
                                  >
                                    {format(slot.start, "HH:mm")}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {evening.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                🌙 Noche <Badge variant="outline">{evening.length} horarios</Badge>
                              </h4>
                              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {evening.map((slot, index) => (
                                  <Button
                                    key={index}
                                    variant={
                                      selectedTimeSlot?.start.getTime() === slot.start.getTime() ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() => onTimeSlotSelect(slot)}
                                    className="text-xs"
                                  >
                                    {format(slot.start, "HH:mm")}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Horarios Disponibles</CardTitle>
              <CardDescription>Lista de horarios disponibles en los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {weekDays.map((day) => {
                    const daySlots = getDaySlots(day)
                    if (daySlots.length === 0) return null

                    return (
                      <div key={day.toISOString()} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{format(day, "EEEE, d 'de' MMMM", { locale: es })}</h4>
                        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                          {daySlots.slice(0, 12).map((slot, index) => (
                            <Button
                              key={index}
                              variant={
                                selectedTimeSlot?.start.getTime() === slot.start.getTime() ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => {
                                onDateSelect(day)
                                onTimeSlotSelect(slot)
                              }}
                              className="text-xs"
                            >
                              {format(slot.start, "HH:mm")}
                            </Button>
                          ))}
                          {daySlots.length > 12 && (
                            <Badge variant="secondary" className="text-xs">
                              +{daySlots.length - 12} más
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Appointment Summary */}
      {selectedDate && selectedTimeSlot && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <strong>Cita seleccionada:</strong>{" "}
              {format(selectedDate, "EEEE, d 'de' MMMM 'a las' HH:mm", {
                locale: es,
              }).replace("HH:mm", format(selectedTimeSlot.start, "HH:mm"))}{" "}
              con {student.name} ({appointmentType.duration} minutos) -{" "}
              <span className="font-semibold text-green-600">Completamente Gratuito</span>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Free Service Reminder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
      >
        <div className="flex items-center justify-center gap-3">
          <Heart className="h-6 w-6 text-red-500" />
          <div className="text-center">
            <h3 className="font-semibold text-lg text-gray-900">Servicio Gratuito ULEAM</h3>
            <p className="text-sm text-muted-foreground">
              Todos los tratamientos son completamente gratuitos. La atención está supervisada por profesores
              especializados para garantizar la máxima calidad.
            </p>
          </div>
          <Info className="h-6 w-6 text-blue-500" />
        </div>
      </motion.div>
    </div>
  )
}
