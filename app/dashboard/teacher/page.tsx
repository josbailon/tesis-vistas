"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { BookOpen, Users, ClipboardList, TrendingUp, Calendar, Bell } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  category: string
  progress: number
  students: number
  assignments: number
  completedAssignments: number
}

const TeacherDashboard = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/courses")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON")
        }

        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Could not fetch courses:", error)
        setError("No se pudieron cargar los cursos. Usando datos de ejemplo.")

        // Fallback to mock data
        setCourses([
          {
            id: "1",
            title: "Endodoncia Avanzada",
            description: "Técnicas modernas de tratamiento endodóntico",
            category: "Endodoncia",
            progress: 85,
            students: 12,
            assignments: 8,
            completedAssignments: 6,
          },
          {
            id: "2",
            title: "Ortodoncia Interceptiva",
            description: "Tratamientos ortodónticos en pacientes jóvenes",
            category: "Ortodoncia",
            progress: 72,
            students: 15,
            assignments: 10,
            completedAssignments: 7,
          },
        ])

        toast({
          title: "Advertencia",
          description: "Usando datos de ejemplo. Verifique la conexión.",
          variant: "default",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [toast])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Cargando dashboard del profesor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Dashboard del Profesor</h1>
          <p className="text-green-600">Bienvenido, {user?.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
            <Calendar className="h-4 w-4 mr-2" />
            Horarios
          </Button>
          <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
            <Bell className="h-4 w-4 mr-2" />
            Notificaciones
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Cursos</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{courses.length}</div>
            <p className="text-xs text-green-600">Cursos activos</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {courses.reduce((total, course) => total + course.students, 0)}
            </div>
            <p className="text-xs text-green-600">Estudiantes activos</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Tareas Pendientes</CardTitle>
            <ClipboardList className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {courses.reduce((total, course) => total + (course.assignments - course.completedAssignments), 0)}
            </div>
            <p className="text-xs text-green-600">Por revisar</p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Progreso Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {Math.round(courses.reduce((total, course) => total + course.progress, 0) / courses.length)}%
            </div>
            <p className="text-xs text-green-600">De todos los cursos</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-800">{course.title}</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {course.category}
                </Badge>
              </div>
              <CardDescription className="text-green-600">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Progreso del curso</span>
                <span className="font-medium text-green-800">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-green-600">Estudiantes</p>
                  <p className="font-semibold text-green-800">{course.students}</p>
                </div>
                <div>
                  <p className="text-green-600">Tareas</p>
                  <p className="font-semibold text-green-800">
                    {course.completedAssignments}/{course.assignments}
                  </p>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Ver Curso</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-green-50">
          <TabsTrigger value="recent" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Actividad Reciente
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Pendientes
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Actividad Reciente</CardTitle>
              <CardDescription className="text-green-600">Últimas acciones en tus cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Nueva tarea enviada en Endodoncia Avanzada</p>
                    <p className="text-xs text-green-600">Hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Estudiante completó evaluación en Ortodoncia</p>
                    <p className="text-xs text-green-600">Hace 4 horas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Tareas Pendientes</CardTitle>
              <CardDescription className="text-green-600">Elementos que requieren tu atención</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Revisar 3 tareas de Endodoncia</p>
                    <p className="text-sm text-green-600">Vencimiento: Mañana</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Revisar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Aprobar solicitudes de estudiantes</p>
                    <p className="text-sm text-green-600">5 solicitudes pendientes</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Ver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Configuración del Profesor</CardTitle>
              <CardDescription className="text-green-600">Personaliza tu experiencia de enseñanza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">Notificaciones por email</p>
                    <p className="text-sm text-green-600">Recibir alertas de nuevas tareas</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-green-200 text-green-700">
                    Configurar
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">Horarios de disponibilidad</p>
                    <p className="text-sm text-green-600">Establecer horarios de consulta</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-green-200 text-green-700">
                    Editar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}

export default TeacherDashboard
