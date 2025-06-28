"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, ClipboardCheck, Clock, Eye, Edit } from "lucide-react"
import { students, clinicalCases, academicTasks, approvalRequests } from "@/lib/mock-data"

export default function OrtodonciaSpecialtyPage() {
  // Filtrar datos por especialidad de Ortodoncia
  const ortodonciaStudents = students.filter((s) => s.specialty === "Ortodoncia")
  const ortodonciaCases = clinicalCases.filter((c) => c.specialty === "Ortodoncia")
  const ortodonciaTasks = academicTasks.filter((t) => t.specialty === "Ortodoncia")
  const ortodonciaApprovals = approvalRequests.filter((a) => a.specialty === "Ortodoncia")

  const pendingApprovals = ortodonciaApprovals.filter((a) => a.status === "pending")
  const activeCases = ortodonciaCases.filter((c) => c.status === "in-progress")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Especialidad: Ortodoncia</h1>
          <p className="text-muted-foreground">Gestión de estudiantes y casos de ortodoncia</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ortodonciaStudents.length}</div>
            <p className="text-xs text-muted-foreground">En ortodoncia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Activos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCases.length}</div>
            <p className="text-xs text-muted-foreground">En progreso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobaciones</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ortodonciaTasks.length}</div>
            <p className="text-xs text-muted-foreground">Asignadas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
          <TabsTrigger value="cases">Casos Clínicos</TabsTrigger>
          <TabsTrigger value="approvals">Aprobaciones</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estudiantes de Ortodoncia</CardTitle>
              <CardDescription>Gestiona y supervisa a tus estudiantes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Semestre</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Casos Activos</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ortodonciaStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.semester}°</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={student.progress} className="w-16" />
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {ortodonciaCases.filter((c) => c.studentId === student.id && c.status === "in-progress").length}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resto de tabs similares a endodoncia... */}
      </Tabs>
    </div>
  )
}
