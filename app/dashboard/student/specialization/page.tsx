"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Calendar, Upload, FileText, Clock, CheckCircle, AlertCircle, Target } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

const specializations = [
  {
    id: "endodoncia",
    name: "Endodoncia",
    description: "Tratamientos de conducto y terapia pulpar",
    color: "bg-blue-500",
    icon: "🦷",
    progress: 75,
    totalCredits: 120,
    completedCredits: 90,
    tasks: [
      {
        id: "t1",
        title: "Caso Clínico: Tratamiento de Conducto Complejo",
        description: "Documentar un caso completo de endodoncia con complicaciones",
        dueDate: "2024-12-30",
        status: "pending",
        points: 25,
        type: "case_study",
      },
      {
        id: "t2",
        title: "Investigación: Nuevas Técnicas en Endodoncia",
        description: "Revisión bibliográfica sobre avances recientes",
        dueDate: "2024-12-25",
        status: "in_progress",
        points: 20,
        type: "research",
      },
    ],
  },
  {
    id: "ortodoncia",
    name: "Ortodoncia",
    description: "Corrección de maloclusiones y posición dental",
    color: "bg-green-500",
    icon: "😁",
    progress: 60,
    totalCredits: 100,
    completedCredits: 60,
    tasks: [
      {
        id: "t3",
        title: "Plan de Tratamiento Ortodóntico",
        description: "Desarrollar plan completo para paciente con maloclusión",
        dueDate: "2024-12-28",
        status: "pending",
        points: 30,
        type: "treatment_plan",
      },
    ],
  },
  {
    id: "cirugia",
    name: "Cirugía Oral",
    description: "Procedimientos quirúrgicos orales y maxilofaciales",
    color: "bg-red-500",
    icon: "🔪",
    progress: 45,
    totalCredits: 80,
    completedCredits: 36,
    tasks: [
      {
        id: "t4",
        title: "Protocolo de Extracción Quirúrgica",
        description: "Documentar procedimiento de extracción de terceros molares",
        dueDate: "2024-12-27",
        status: "completed",
        points: 35,
        type: "procedure",
      },
    ],
  },
  {
    id: "odontopediatria",
    name: "Odontopediatría",
    description: "Atención dental especializada para niños",
    color: "bg-purple-500",
    icon: "👶",
    progress: 80,
    totalCredits: 90,
    completedCredits: 72,
    tasks: [
      {
        id: "t5",
        title: "Manejo de Conducta en Pacientes Pediátricos",
        description: "Técnicas de manejo de ansiedad dental en niños",
        dueDate: "2024-12-26",
        status: "in_progress",
        points: 20,
        type: "behavioral",
      },
    ],
  },
]

export default function StudentSpecializationPage() {
  const [selectedSpecialization, setSelectedSpecialization] = useState(specializations[0])
  const [showUploadModal, setShowUploadModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="space-y-8">
        {/* Header */}
        <div className="medical-gradient rounded-xl p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Mi Especialización</h1>
              <p className="text-white/80">Selecciona tu especialización y accede a tus tareas asignadas</p>
            </div>
          </div>
        </div>

        {/* Specialization Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializations.map((spec) => (
            <Card
              key={spec.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedSpecialization.id === spec.id ? "ring-2 ring-blue-500 shadow-lg" : ""
              }`}
              onClick={() => setSelectedSpecialization(spec)}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl">{spec.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{spec.name}</h3>
                    <p className="text-sm text-gray-600">{spec.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span>{spec.progress}%</span>
                    </div>
                    <Progress value={spec.progress} className="h-2" />
                    <div className="text-xs text-gray-500">
                      {spec.completedCredits}/{spec.totalCredits} créditos
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Specialization Details */}
        <Tabs defaultValue="tasks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Tareas Asignadas</TabsTrigger>
            <TabsTrigger value="progress">Mi Progreso</TabsTrigger>
            <TabsTrigger value="upload">Subir Tarea</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Tareas de {selectedSpecialization.name}
                </CardTitle>
                <CardDescription>Tareas asignadas para tu especialización actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedSpecialization.tasks.map((task) => (
                    <Card key={task.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{task.title}</h4>
                              <Badge className={getStatusColor(task.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(task.status)}
                                  {task.status === "completed"
                                    ? "Completada"
                                    : task.status === "in_progress"
                                      ? "En Progreso"
                                      : "Pendiente"}
                                </div>
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{task.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Vence: {task.dueDate}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                <span>{task.points} puntos</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              Ver Detalles
                            </Button>
                            {task.status !== "completed" && (
                              <Button size="sm" className="btn-medical">
                                <Upload className="h-4 w-4 mr-1" />
                                Subir
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{selectedSpecialization.progress}%</div>
                  <p className="text-gray-600">Progreso General</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {selectedSpecialization.completedCredits}
                  </div>
                  <p className="text-gray-600">Créditos Completados</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {selectedSpecialization.tasks.filter((t) => t.status === "completed").length}
                  </div>
                  <p className="text-gray-600">Tareas Completadas</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Desglose de Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Créditos Teóricos</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Práctica Clínica</span>
                      <span>{selectedSpecialization.progress}%</span>
                    </div>
                    <Progress value={selectedSpecialization.progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Casos Documentados</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Subir Nueva Tarea
                </CardTitle>
                <CardDescription>Sube tu trabajo completado para {selectedSpecialization.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Arrastra archivos aquí</h3>
                    <p className="text-gray-600 mb-4">o haz clic para seleccionar archivos</p>
                    <Button className="btn-medical">Seleccionar Archivos</Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Formatos soportados: PDF, DOC, DOCX, JPG, PNG (Máx. 10MB)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tipo de Tarea</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        <option>Caso Clínico</option>
                        <option>Investigación</option>
                        <option>Plan de Tratamiento</option>
                        <option>Procedimiento</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tarea Asignada</label>
                      <select className="w-full p-2 border border-gray-300 rounded-md">
                        {selectedSpecialization.tasks.map((task) => (
                          <option key={task.id} value={task.id}>
                            {task.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Comentarios</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md"
                      rows={4}
                      placeholder="Describe tu trabajo, metodología utilizada, resultados obtenidos..."
                    />
                  </div>

                  <Button className="w-full btn-medical">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Tarea
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
