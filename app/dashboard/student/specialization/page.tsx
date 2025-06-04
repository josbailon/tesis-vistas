"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Stethoscope, SmileIcon as Tooth, Scissors, Baby, Heart, CheckCircle, Clock, BookOpen } from "lucide-react"

const specializations = [
  {
    id: "endodoncia",
    name: "Endodoncia",
    icon: Tooth,
    color: "from-purple-500 to-purple-600",
    description: "Tratamiento de conductos radiculares y pulpa dental",
    courses: 8,
    completed: 5,
    assignments: 12,
  },
  {
    id: "ortodoncia",
    name: "Ortodoncia",
    icon: Stethoscope,
    color: "from-blue-500 to-blue-600",
    description: "Corrección de malposiciones dentales y maxilares",
    courses: 10,
    completed: 7,
    assignments: 15,
  },
  {
    id: "cirugia",
    name: "Cirugía Oral",
    icon: Scissors,
    color: "from-red-500 to-red-600",
    description: "Procedimientos quirúrgicos en cavidad oral",
    courses: 6,
    completed: 3,
    assignments: 8,
  },
  {
    id: "odontopediatria",
    name: "Odontopediatría",
    icon: Baby,
    color: "from-green-500 to-green-600",
    description: "Atención dental especializada en niños",
    courses: 7,
    completed: 4,
    assignments: 10,
  },
  {
    id: "periodoncia",
    name: "Periodoncia",
    icon: Heart,
    color: "from-pink-500 to-pink-600",
    description: "Tratamiento de enfermedades periodontales",
    courses: 5,
    completed: 2,
    assignments: 6,
  },
]

export default function SpecializationPage() {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null)

  const handleSelectSpecialization = (id: string) => {
    setSelectedSpecialization(id)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mi Especialización
        </h1>
        <p className="text-gray-600 mt-2">Selecciona tu especialización y accede a tus cursos y tareas asignadas</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specializations.map((spec) => {
          const Icon = spec.icon
          const isSelected = selectedSpecialization === spec.id
          const progress = (spec.completed / spec.courses) * 100

          return (
            <Card
              key={spec.id}
              className={`medical-card cursor-pointer transition-all duration-300 ${
                isSelected ? "ring-2 ring-blue-500 shadow-xl scale-105" : ""
              }`}
              onClick={() => handleSelectSpecialization(spec.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${spec.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  {isSelected && <CheckCircle className="h-6 w-6 text-green-500" />}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{spec.name}</CardTitle>
                <p className="text-sm text-gray-600">{spec.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progreso del curso</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600">
                      {spec.completed}/{spec.courses} Cursos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-gray-600">{spec.assignments} Tareas</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Activo
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Semestre 2024-1
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedSpecialization && (
        <Card className="medical-card slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">
              Tareas Pendientes - {specializations.find((s) => s.id === selectedSpecialization)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((task) => (
                <div key={task} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Caso Clínico #{task}</h4>
                    <p className="text-sm text-gray-600">
                      Entrega: {new Date(Date.now() + task * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm" className="btn-medical">
                    Ver Detalles
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
