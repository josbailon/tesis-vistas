"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Star,
  Award,
  Languages,
  CheckCircle2,
  Calendar,
  User,
  GraduationCap,
  Heart,
  ArrowRight,
  Info,
} from "lucide-react"
import { format, addDays, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import type { StudentProfile, TimeSlot } from "@/lib/student-availability"
import { getAvailableSlots } from "@/lib/student-availability"

interface StudentSelectionInterfaceProps {
  students: StudentProfile[]
  selectedStudent: StudentProfile | null
  onStudentSelect: (student: StudentProfile) => void
  specialtyName: string
}

export function StudentSelectionInterface({
  students,
  selectedStudent,
  onStudentSelect,
  specialtyName,
}: StudentSelectionInterfaceProps) {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)
  const [studentAvailability, setStudentAvailability] = useState<Record<string, TimeSlot[]>>({})
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Load availability for all students
  useEffect(() => {
    const loadAvailability = async () => {
      const availability: Record<string, TimeSlot[]> = {}
      students.forEach((student) => {
        availability[student.id] = getAvailableSlots(student.id, selectedDate, 60)
      })
      setStudentAvailability(availability)
    }
    loadAvailability()
  }, [students, selectedDate])

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "beginner":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getExperienceLabel = (experience: string) => {
    switch (experience) {
      case "beginner":
        return "Principiante"
      case "intermediate":
        return "Intermedio"
      case "advanced":
        return "Avanzado"
      default:
        return "No especificado"
    }
  }

  const getNextAvailableDays = (studentId: string) => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i)
      const slots = getAvailableSlots(studentId, date, 60)
      if (slots.length > 0) {
        days.push({ date, slotsCount: slots.length })
      }
    }
    return days.slice(0, 3)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold text-gray-900">Estudiantes Especialistas</h2>
          <p className="text-lg text-muted-foreground">
            Especialistas en <span className="font-semibold text-blue-600">{specialtyName}</span> disponibles para tu
            atención
          </p>
        </motion.div>

        {/* Date Selector */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-sm font-medium">Ver disponibilidad para:</span>
          {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) => {
            const date = addDays(new Date(), dayOffset)
            const isSelected = isSameDay(date, selectedDate)
            return (
              <Button
                key={dayOffset}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDate(date)}
                className={`text-xs ${isSelected ? "bg-blue-600" : ""}`}
              >
                {format(date, "EEE d", { locale: es })}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {students.map((student, index) => {
          const isSelected = selectedStudent?.id === student.id
          const isExpanded = expandedStudent === student.id
          const availableSlots = studentAvailability[student.id] || []
          const nextDays = getNextAvailableDays(student.id)

          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  isSelected
                    ? "border-2 border-blue-500 shadow-lg bg-blue-50"
                    : "border hover:border-blue-300 hover:scale-105"
                }`}
                onClick={() => onStudentSelect(student)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                        <AvatarImage src={student.profileImage || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-green-600 text-white text-lg font-semibold">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{student.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-sm">{student.rating}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">•</span>
                          <span className="text-sm text-muted-foreground">{student.completedCases} casos</span>
                        </div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="h-6 w-6 text-blue-600 flex-shrink-0" />}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Experience and Semester */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getExperienceColor(student.experience)}>
                      <Award className="mr-1 h-3 w-3" />
                      {getExperienceLabel(student.experience)}
                    </Badge>
                    <Badge variant="outline">
                      <GraduationCap className="mr-1 h-3 w-3" />
                      Semestre {student.semester}
                    </Badge>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed">{student.bio}</p>

                  {/* Availability Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        Disponibilidad {format(selectedDate, "d/MM", { locale: es })}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {availableSlots.length} horarios
                      </Badge>
                    </div>

                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-1">
                        {availableSlots.slice(0, 6).map((slot, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs justify-center py-1">
                            {format(slot.start, "HH:mm")}
                          </Badge>
                        ))}
                        {availableSlots.length > 6 && (
                          <Badge variant="secondary" className="text-xs justify-center">
                            +{availableSlots.length - 6}
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-2">
                        <p className="text-xs text-muted-foreground">No disponible este día</p>
                        {nextDays.length > 0 && (
                          <p className="text-xs text-blue-600">
                            Próximo: {format(nextDays[0].date, "EEE d/MM", { locale: es })}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{student.rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{student.completedCases}</div>
                      <div className="text-xs text-muted-foreground">Casos</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{nextDays.length}</div>
                      <div className="text-xs text-muted-foreground">Días disp.</div>
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedStudent(isExpanded ? null : student.id)
                    }}
                  >
                    {isExpanded ? "Ver menos" : "Ver más detalles"}
                    <ArrowRight className={`h-3 w-3 ml-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </Button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 border-t pt-4"
                      >
                        <Tabs defaultValue="languages" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="languages" className="text-xs">
                              Idiomas
                            </TabsTrigger>
                            <TabsTrigger value="certifications" className="text-xs">
                              Certificaciones
                            </TabsTrigger>
                            <TabsTrigger value="schedule" className="text-xs">
                              Horarios
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="languages" className="mt-3">
                            <div className="space-y-2">
                              <h5 className="flex items-center gap-1 text-sm font-medium">
                                <Languages className="h-3 w-3" />
                                Idiomas que maneja
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {student.languages.map((lang, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="certifications" className="mt-3">
                            <div className="space-y-2">
                              <h5 className="flex items-center gap-1 text-sm font-medium">
                                <Award className="h-3 w-3" />
                                Certificaciones
                              </h5>
                              <ScrollArea className="h-20">
                                <div className="space-y-1">
                                  {student.certifications.map((cert, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs">
                                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                                      <span>{cert}</span>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          </TabsContent>

                          <TabsContent value="schedule" className="mt-3">
                            <div className="space-y-2">
                              <h5 className="flex items-center gap-1 text-sm font-medium">
                                <Calendar className="h-3 w-3" />
                                Próximos días disponibles
                              </h5>
                              <div className="space-y-1">
                                {nextDays.map((day, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between items-center text-xs p-2 bg-gray-50 rounded"
                                  >
                                    <span>{format(day.date, "EEEE d/MM", { locale: es })}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {day.slotsCount} horarios
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Select Button */}
                  <Button
                    className={`w-full ${
                      isSelected
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onStudentSelect(student)
                    }}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Estudiante Seleccionado
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 mr-2" />
                        Seleccionar Estudiante
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

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
            <h3 className="font-semibold text-lg text-gray-900">Atención Gratuita y de Calidad</h3>
            <p className="text-sm text-muted-foreground">
              Todos nuestros estudiantes están supervisados por profesores especializados. La atención es completamente
              gratuita como parte del programa educativo de ULEAM.
            </p>
          </div>
          <Info className="h-6 w-6 text-blue-500" />
        </div>
      </motion.div>
    </div>
  )
}
