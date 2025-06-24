"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserPlus,
  GraduationCap,
  CheckCircle,
  Clock,
  AlertCircle,
  Stethoscope,
  MessageSquare,
} from "lucide-react"
import { patients, students, appointments, medicalRecords, assignments } from "@/lib/mock-data"

interface WorkflowStep {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "pending" | "blocked"
  actor: "secretary" | "student" | "professor" | "patient" | "admin"
  dependencies?: string[]
  data?: any
}

export default function TestWorkflowPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("patient-assignment")
  const [currentStep, setCurrentStep] = useState<number>(0)

  // Workflow 1: Asignación de Paciente
  const patientAssignmentWorkflow: WorkflowStep[] = [
    {
      id: "register-patient",
      title: "Registro de Paciente",
      description: "Paciente se registra en el sistema o es registrado por secretario",
      status: "completed",
      actor: "secretary",
      data: {
        patient: patients[3], // Juan Pérez - sin asignar
        registrationDate: "2025-01-15",
      },
    },
    {
      id: "assign-patient",
      title: "Asignación a Estudiante",
      description: "Secretario asigna paciente a estudiante según especialidad y disponibilidad",
      status: "completed",
      actor: "secretary",
      dependencies: ["register-patient"],
      data: {
        patient: patients[3],
        assignedStudent: students[0], // Pedro Gómez - Endodoncia
        assignmentDate: "2025-01-16",
        specialty: "Endodoncia",
      },
    },
    {
      id: "schedule-appointment",
      title: "Programar Primera Cita",
      description: "Estudiante programa primera cita con el paciente",
      status: "in-progress",
      actor: "student",
      dependencies: ["assign-patient"],
      data: {
        appointment: {
          date: "2025-01-25",
          time: "10:00",
          type: "Primera Consulta",
          duration: 60,
        },
      },
    },
    {
      id: "initial-consultation",
      title: "Consulta Inicial",
      description: "Estudiante realiza evaluación inicial del paciente",
      status: "pending",
      actor: "student",
      dependencies: ["schedule-appointment"],
    },
    {
      id: "create-medical-record",
      title: "Crear Historia Clínica",
      description: "Estudiante documenta la consulta inicial",
      status: "pending",
      actor: "student",
      dependencies: ["initial-consultation"],
    },
    {
      id: "professor-review",
      title: "Revisión del Profesor",
      description: "Profesor revisa y aprueba la historia clínica",
      status: "pending",
      actor: "professor",
      dependencies: ["create-medical-record"],
    },
  ]

  // Workflow 2: Gestión de Tareas Académicas
  const academicTaskWorkflow: WorkflowStep[] = [
    {
      id: "create-assignment",
      title: "Crear Tarea",
      description: "Profesor crea nueva tarea académica",
      status: "completed",
      actor: "professor",
      data: {
        assignment: assignments[0],
        dueDate: "2025-05-30",
        maxScore: 100,
      },
    },
    {
      id: "notify-student",
      title: "Notificar Estudiante",
      description: "Sistema notifica al estudiante sobre nueva tarea",
      status: "completed",
      actor: "student",
      dependencies: ["create-assignment"],
    },
    {
      id: "work-on-assignment",
      title: "Trabajar en Tarea",
      description: "Estudiante desarrolla la tarea asignada",
      status: "in-progress",
      actor: "student",
      dependencies: ["notify-student"],
      data: {
        progress: 75,
        timeSpent: "15 horas",
      },
    },
    {
      id: "submit-assignment",
      title: "Entregar Tarea",
      description: "Estudiante sube archivos y entrega tarea",
      status: "pending",
      actor: "student",
      dependencies: ["work-on-assignment"],
    },
    {
      id: "grade-assignment",
      title: "Calificar Tarea",
      description: "Profesor evalúa y califica la tarea",
      status: "pending",
      actor: "professor",
      dependencies: ["submit-assignment"],
    },
    {
      id: "provide-feedback",
      title: "Dar Retroalimentación",
      description: "Profesor proporciona comentarios y sugerencias",
      status: "pending",
      actor: "professor",
      dependencies: ["grade-assignment"],
    },
  ]

  // Workflow 3: Caso Clínico Completo
  const clinicalCaseWorkflow: WorkflowStep[] = [
    {
      id: "patient-consultation",
      title: "Consulta del Paciente",
      description: "Paciente acude a consulta con síntomas",
      status: "completed",
      actor: "patient",
      data: {
        symptoms: "Dolor en molar superior derecho",
        urgency: "medium",
      },
    },
    {
      id: "initial-diagnosis",
      title: "Diagnóstico Inicial",
      description: "Estudiante realiza examen y diagnóstico preliminar",
      status: "completed",
      actor: "student",
      dependencies: ["patient-consultation"],
      data: {
        diagnosis: "Posible caries profunda con compromiso pulpar",
        tests: ["Pruebas térmicas", "Percusión", "Radiografía"],
      },
    },
    {
      id: "treatment-plan",
      title: "Plan de Tratamiento",
      description: "Estudiante propone plan de tratamiento",
      status: "completed",
      actor: "student",
      dependencies: ["initial-diagnosis"],
      data: {
        treatment: "Tratamiento de conducto",
        sessions: 3,
        estimatedDuration: "6 semanas",
      },
    },
    {
      id: "professor-approval",
      title: "Aprobación del Profesor",
      description: "Profesor revisa y aprueba el plan de tratamiento",
      status: "in-progress",
      actor: "professor",
      dependencies: ["treatment-plan"],
    },
    {
      id: "execute-treatment",
      title: "Ejecutar Tratamiento",
      description: "Estudiante realiza el tratamiento bajo supervisión",
      status: "pending",
      actor: "student",
      dependencies: ["professor-approval"],
    },
    {
      id: "document-case",
      title: "Documentar Caso",
      description: "Estudiante documenta todo el proceso clínico",
      status: "pending",
      actor: "student",
      dependencies: ["execute-treatment"],
    },
    {
      id: "final-evaluation",
      title: "Evaluación Final",
      description: "Profesor evalúa el desempeño del estudiante",
      status: "pending",
      actor: "professor",
      dependencies: ["document-case"],
    },
  ]

  const workflows = {
    "patient-assignment": {
      title: "Asignación de Pacientes",
      description: "Flujo completo desde registro hasta primera consulta",
      steps: patientAssignmentWorkflow,
      color: "blue",
    },
    "academic-task": {
      title: "Gestión de Tareas Académicas",
      description: "Proceso de creación, entrega y calificación de tareas",
      steps: academicTaskWorkflow,
      color: "green",
    },
    "clinical-case": {
      title: "Caso Clínico Completo",
      description: "Desde consulta inicial hasta evaluación final",
      steps: clinicalCaseWorkflow,
      color: "purple",
    },
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <AlertCircle className="h-5 w-5 text-gray-400" />
      case "blocked":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">En Progreso</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pendiente</Badge>
      case "blocked":
        return <Badge className="bg-red-100 text-red-800">Bloqueado</Badge>
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  const getActorIcon = (actor: string) => {
    switch (actor) {
      case "secretary":
        return <UserPlus className="h-4 w-4" />
      case "student":
        return <GraduationCap className="h-4 w-4" />
      case "professor":
        return <Users className="h-4 w-4" />
      case "patient":
        return <Stethoscope className="h-4 w-4" />
      case "admin":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const calculateProgress = (steps: WorkflowStep[]) => {
    const completed = steps.filter((step) => step.status === "completed").length
    return (completed / steps.length) * 100
  }

  const simulateNextStep = (workflowKey: string) => {
    const workflow = workflows[workflowKey as keyof typeof workflows]
    const nextPendingStep = workflow.steps.find((step) => step.status === "pending")

    if (nextPendingStep) {
      // Simulate completing the next step
      nextPendingStep.status = "in-progress"

      // You would implement actual logic here to update the system state
      console.log(`Simulating step: ${nextPendingStep.title}`)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Verificación de Workflows</h1>
          <p className="text-gray-600 mt-2">Prueba y verifica los flujos completos del sistema</p>
        </div>
      </div>

      {/* Workflow Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(workflows).map(([key, workflow]) => (
          <Card
            key={key}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedWorkflow === key ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedWorkflow(key)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{workflow.title}</CardTitle>
              <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span>{Math.round(calculateProgress(workflow.steps))}%</span>
                </div>
                <Progress value={calculateProgress(workflow.steps)} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{workflow.steps.filter((s) => s.status === "completed").length} completados</span>
                  <span>{workflow.steps.length} total</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Workflow View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {workflows[selectedWorkflow as keyof typeof workflows].title}
            <Badge variant="outline">{workflows[selectedWorkflow as keyof typeof workflows].steps.length} pasos</Badge>
          </CardTitle>
          <CardDescription>{workflows[selectedWorkflow as keyof typeof workflows].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows[selectedWorkflow as keyof typeof workflows].steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">{index + 1}</div>
                  {index < workflows[selectedWorkflow as keyof typeof workflows].steps.length - 1 && (
                    <div className="w-px h-8 bg-gray-200 mt-2" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(step.status)}
                      <h3 className="font-medium">{step.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        {getActorIcon(step.actor)}
                        <span className="capitalize">{step.actor}</span>
                      </div>
                    </div>
                    {getStatusBadge(step.status)}
                  </div>

                  <p className="text-sm text-gray-600">{step.description}</p>

                  {step.dependencies && (
                    <div className="text-xs text-gray-500">Depende de: {step.dependencies.join(", ")}</div>
                  )}

                  {step.data && (
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Datos:</strong>
                      <pre className="mt-1 text-xs overflow-x-auto">{JSON.stringify(step.data, null, 2)}</pre>
                    </div>
                  )}

                  {step.status === "in-progress" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => simulateNextStep(selectedWorkflow)}>
                        Completar Paso
                      </Button>
                      <Button size="sm" variant="outline">
                        Ver Detalles
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Integration Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Pruebas de Integración</CardTitle>
          <CardDescription>Verifica que todos los componentes funcionen correctamente</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="data-flow" className="w-full">
            <TabsList>
              <TabsTrigger value="data-flow">Flujo de Datos</TabsTrigger>
              <TabsTrigger value="permissions">Permisos</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="data-flow" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Datos de Pacientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Pacientes:</span>
                        <span className="font-medium">{patients.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Asignados:</span>
                        <span className="font-medium">{patients.filter((p) => p.assignedStudent).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sin Asignar:</span>
                        <span className="font-medium">{patients.filter((p) => !p.assignedStudent).length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Datos de Estudiantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Estudiantes:</span>
                        <span className="font-medium">{students.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Con Pacientes:</span>
                        <span className="font-medium">
                          {students.filter((s) => s.assignedPatients.length > 0).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Disponibles:</span>
                        <span className="font-medium">
                          {students.filter((s) => s.assignedPatients.length === 0).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Citas Médicas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Citas:</span>
                        <span className="font-medium">{appointments.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confirmadas:</span>
                        <span className="font-medium">
                          {appointments.filter((a) => a.status === "confirmed").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pendientes:</span>
                        <span className="font-medium">{appointments.filter((a) => a.status === "pending").length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Historias Clínicas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Registros:</span>
                        <span className="font-medium">{medicalRecords.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Por Especialidad:</span>
                        <span className="font-medium">5 áreas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activos:</span>
                        <span className="font-medium">{medicalRecords.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Matriz de Permisos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Acción</th>
                            <th className="text-center p-2">Admin</th>
                            <th className="text-center p-2">Profesor</th>
                            <th className="text-center p-2">Estudiante</th>
                            <th className="text-center p-2">Secretario</th>
                            <th className="text-center p-2">Paciente</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Crear Usuarios</td>
                            <td className="text-center p-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            </td>
                            <td className="text-center p-2">❌</td>
                            <td className="text-center p-2">❌</td>
                            <td className="text-center p-2">❌</td>
                            <td className="text-center p-2">❌</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Asignar Pacientes</td>
                            <td className="text-center p-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            </td>
                            <td className="text-center p-2">❌</td>
                            <td className="text-center p-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            </td>
                            <td className="text-center p-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            </td>
                            <td className="text-center p-2">❌</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Crear Tareas</td>
                            <td className="text-center p-2">❌</td>
                            <td className="text-center p-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            </td>
                            <td className="text-center p-2">❌</td>
                            <td className="text-center p-2">❌</td>
                            <td className="text-center p-2">❌</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Ver Historias Clínicas</td>
                            <td className="text-center p-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            </td>
                            <td className="text-center p-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            </td>
                            <td className="text-center p-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                            </td>
                            <td className="text-center p-2">❌</td>
                            <td className="text-center p-2">🔒</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notificaciones del Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-sm">Nueva Tarea Asignada</p>
                          <p className="text-xs text-gray-600">Profesor → Estudiante</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-sm">Paciente Asignado</p>
                          <p className="text-xs text-gray-600">Secretario → Estudiante</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-orange-50 rounded">
                        <Clock className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium text-sm">Cita Programada</p>
                          <p className="text-xs text-gray-600">Estudiante → Paciente</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estado de Integración</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Autenticación</span>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Gestión de Roles</span>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Base de Datos</span>
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notificaciones</span>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Archivos</span>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
