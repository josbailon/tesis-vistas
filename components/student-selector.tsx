"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, Award, Languages, CheckCircle2 } from "lucide-react"
import type { StudentProfile } from "@/lib/student-availability"

interface StudentSelectorProps {
  students: StudentProfile[]
  selectedStudent: StudentProfile | null
  onStudentSelect: (student: StudentProfile) => void
}

export function StudentSelector({ students, selectedStudent, onStudentSelect }: StudentSelectorProps) {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "beginner":
        return "bg-blue-100 text-blue-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Selecciona tu Estudiante</h3>
        <p className="text-sm text-muted-foreground">
          Elige el estudiante que realizará tu tratamiento basándose en su experiencia y disponibilidad
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {students.map((student) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedStudent?.id === student.id ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => onStudentSelect(student)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.profileImage || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{student.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {student.rating} • {student.completedCases} casos
                      </CardDescription>
                    </div>
                  </div>
                  {selectedStudent?.id === student.id && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getExperienceColor(student.experience)}>
                    {getExperienceLabel(student.experience)}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    Semestre {student.semester}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{student.bio}</p>

                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedStudent(expandedStudent === student.id ? null : student.id)
                    }}
                  >
                    {expandedStudent === student.id ? "Ver menos" : "Ver más detalles"}
                  </Button>

                  {expandedStudent === student.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 border-t pt-3"
                    >
                      <div>
                        <h4 className="flex items-center gap-1 text-sm font-medium">
                          <Languages className="h-3 w-3" />
                          Idiomas
                        </h4>
                        <p className="text-xs text-muted-foreground">{student.languages.join(", ")}</p>
                      </div>

                      <div>
                        <h4 className="flex items-center gap-1 text-sm font-medium">
                          <Award className="h-3 w-3" />
                          Certificaciones
                        </h4>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {student.certifications.map((cert, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
