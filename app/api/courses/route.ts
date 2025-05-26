import { NextResponse } from "next/server"

// Mock courses data for teachers
const mockCourses = [
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
  {
    id: "3",
    title: "Cirugía Oral Básica",
    description: "Procedimientos quirúrgicos fundamentales",
    category: "Cirugía Oral",
    progress: 90,
    students: 8,
    assignments: 6,
    completedAssignments: 5,
  },
  {
    id: "4",
    title: "Odontopediatría Clínica",
    description: "Atención dental especializada en niños",
    category: "Odontopediatría",
    progress: 78,
    students: 18,
    assignments: 12,
    completedAssignments: 9,
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(mockCourses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
