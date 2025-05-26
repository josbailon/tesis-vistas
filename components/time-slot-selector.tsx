"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, AlertTriangle, CheckCircle2, ArrowRight, Info } from "lucide-react"
import {
  type TimeSlot,
  type StudentProfile,
  type AppointmentType,
  getAvailableSlots,
  validateAppointmentSlot,
  suggestAlternativeSlots,
} from "@/lib/student-availability"

interface TimeSlotSelectorProps {
  student: StudentProfile
  appointmentType: AppointmentType
  selectedDate: Date | null
  selectedTimeSlot: TimeSlot | null
  onDateSelect: (date: Date) => void
  onTimeSlotSelect: (slot: TimeSlot) => void
}

export function TimeSlotSelector({
  student,
  appointmentType,
  selectedDate,
  selectedTimeSlot,
  onDateSelect,
  onTimeSlotSelect,
}: TimeSlotSelectorProps) {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [alternatives, setAlternatives] = useState<{ date: Date; slots: TimeSlot[] }[]>([])
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedDate && student && appointmentType) {
      setLoading(true)
      // Simular carga de datos
      setTimeout(() => {
        const slots = getAvailableSlots(student.id, selectedDate, appointmentType.duration)
        setAvailableSlots(slots)
        setLoading(false)

        // Si no hay slots disponibles, buscar alternativas
        if (slots.length === 0) {
          const alternativeSlots = suggestAlternativeSlots(student.id, selectedDate, appointmentType.duration)
          setAlternatives(alternativeSlots)
          setValidationMessage("No hay horarios disponibles para la fecha seleccionada")
        } else {
          setAlternatives([])
          setValidationMessage(null)
        }
      }, 500)
    }
  }, [selectedDate, student, appointmentType])

  const handleTimeSlotClick = (slot: TimeSlot) => {
    const validation = validateAppointmentSlot(student.id, slot.start, appointmentType.duration)

    if (validation.valid) {
      onTimeSlotSelect(slot)
      setValidationMessage(null)
    } else {
      setValidationMessage(validation.message || "Horario no disponible")
      if (validation.alternatives) {
        setAlternatives(validation.alternatives)
      }
    }
  }

  const handleAlternativeSelect = (date: Date, slot: TimeSlot) => {
    onDateSelect(date)
    onTimeSlotSelect(slot)
    setValidationMessage(null)
    setAlternatives([])
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Selecciona Fecha y Hora</h3>
        <p className="text-sm text-muted-foreground">Elige el día y horario que mejor se adapte a tu disponibilidad</p>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="quick">Próximos Disponibles</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Calendario */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Seleccionar Fecha
                </CardTitle>
                <CardDescription>Elige el día para tu cita con {student.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => date && onDateSelect(date)}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Deshabilitar domingos
                  className="rounded-md border"
                  locale={es}
                />
                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                    <span>No disponible</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horarios disponibles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horarios Disponibles
                </CardTitle>
                <CardDescription>
                  {selectedDate
                    ? `Horarios para ${format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}`
                    : "Selecciona una fecha para ver horarios"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!selectedDate ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Selecciona una fecha en el calendario</p>
                  </div>
                ) : loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                  </div>
                ) : availableSlots.length > 0 ? (
                  <ScrollArea className="h-[300px]">
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((slot, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Button
                            variant={selectedTimeSlot?.start.getTime() === slot.start.getTime() ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => handleTimeSlotClick(slot)}
                          >
                            <Clock className="mr-2 h-3 w-3" />
                            {format(slot.start, "HH:mm")}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertTriangle className="h-12 w-12 text-amber-500" />
                    <p className="mt-2 text-sm font-medium">No hay horarios disponibles</p>
                    <p className="text-xs text-muted-foreground">Intenta con otra fecha o revisa las sugerencias</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Información de la cita */}
          {selectedDate && selectedTimeSlot && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  <strong>Cita seleccionada:</strong>{" "}
                  {format(selectedDate, "EEEE, d 'de' MMMM 'a las' HH:mm", { locale: es })} con {student.name} (
                  {appointmentType.duration} minutos)
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Mensaje de validación */}
          {validationMessage && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{validationMessage}</AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="quick" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Horarios Disponibles</CardTitle>
              <CardDescription>Horarios disponibles en los próximos días con {student.name}</CardDescription>
            </CardHeader>
            <CardContent>
              {alternatives.length > 0 ? (
                <div className="space-y-4">
                  {alternatives.map((alternative, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">
                                {format(alternative.date, "EEEE, d 'de' MMMM", { locale: es })}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {alternative.slots.length} horarios disponibles
                              </p>
                            </div>
                            <Badge variant="outline">{format(alternative.date, "dd/MM", { locale: es })}</Badge>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {alternative.slots.slice(0, 4).map((slot, slotIndex) => (
                              <Button
                                key={slotIndex}
                                variant="outline"
                                size="sm"
                                onClick={() => handleAlternativeSelect(alternative.date, slot)}
                                className="gap-1"
                              >
                                {format(slot.start, "HH:mm")}
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            ))}
                            {alternative.slots.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{alternative.slots.length - 4} más
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Info className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm font-medium">No hay alternativas disponibles</p>
                  <p className="text-xs text-muted-foreground">Intenta seleccionar una fecha en el calendario</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
