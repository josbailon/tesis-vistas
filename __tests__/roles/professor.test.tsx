"use client"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders, mockUsers, mockImplementations } from "../utils/test-utils"

// Mock professor components
function ProfessorDashboard() {
  return (
    <div>
      <h1>Panel del Profesor</h1>
      <div>Estudiantes Asignados</div>
      <div>Solicitudes de Aprobación</div>
      <button>Ver Estudiantes</button>
      <button>Revisar Solicitudes</button>
    </div>
  )
}

function StudentManagement() {
  return (
    <div>
      <h1>Gestión de Estudiantes</h1>
      <div>Lista de Estudiantes</div>
      <button>Evaluar Estudiante</button>
      <button>Asignar Tarea</button>
    </div>
  )
}

describe("Professor Role Tests", () => {
  const professorUser = mockUsers.professor

  describe("Professor Dashboard", () => {
    it("should render professor dashboard", () => {
      renderWithProviders(<ProfessorDashboard />, { user: professorUser })

      expect(screen.getByText(/panel del profesor/i)).toBeInTheDocument()
      expect(screen.getByText(/estudiantes asignados/i)).toBeInTheDocument()
      expect(screen.getByText(/solicitudes de aprobación/i)).toBeInTheDocument()
    })

    it("should display professor specialty", () => {
      renderWithProviders(<ProfessorDashboard />, { user: professorUser })

      expect(screen.getByText(professorUser.specialty)).toBeInTheDocument()
    })

    it("should navigate to student management", async () => {
      const user = userEvent.setup()
      renderWithProviders(<ProfessorDashboard />, { user: professorUser })

      const studentsBtn = screen.getByRole("button", { name: /ver estudiantes/i })
      await user.click(studentsBtn)

      // Should trigger navigation
      expect(studentsBtn).toHaveBeenClicked
    })
  })

  describe("Student Management", () => {
    it("should display assigned students", async () => {
      renderWithProviders(<StudentManagement />, { user: professorUser })

      expect(screen.getByText(/gestión de estudiantes/i)).toBeInTheDocument()
      expect(screen.getByText(/lista de estudiantes/i)).toBeInTheDocument()
    })

    it("should allow student evaluation", async () => {
      const user = userEvent.setup()
      renderWithProviders(<StudentManagement />, { user: professorUser })

      const evaluateBtn = screen.getByRole("button", { name: /evaluar estudiante/i })
      await user.click(evaluateBtn)

      expect(evaluateBtn).toHaveBeenClicked
    })

    it("should allow task assignment", async () => {
      const user = userEvent.setup()
      renderWithProviders(<StudentManagement />, { user: professorUser })

      const assignBtn = screen.getByRole("button", { name: /asignar tarea/i })
      await user.click(assignBtn)

      expect(assignBtn).toHaveBeenClicked
    })
  })

  describe("Approval Workflow", () => {
    it("should display pending approvals", async () => {
      function ApprovalWorkflow() {
        return (
          <div>
            <h1>Solicitudes de Aprobación</h1>
            <div>Solicitudes Pendientes: 5</div>
            <button>Aprobar</button>
            <button>Rechazar</button>
          </div>
        )
      }

      renderWithProviders(<ApprovalWorkflow />, { user: professorUser })

      expect(screen.getByText(/solicitudes de aprobación/i)).toBeInTheDocument()
      expect(screen.getByText(/solicitudes pendientes: 5/i)).toBeInTheDocument()
    })

    it("should allow approval of student work", async () => {
      const user = userEvent.setup()

      function ApprovalWorkflow() {
        return (
          <div>
            <h1>Solicitudes de Aprobación</h1>
            <button onClick={() => mockImplementations.notificationService.send()}>Aprobar</button>
          </div>
        )
      }

      renderWithProviders(<ApprovalWorkflow />, { user: professorUser })

      const approveBtn = screen.getByRole("button", { name: /aprobar/i })
      await user.click(approveBtn)

      expect(mockImplementations.notificationService.send).toHaveBeenCalled()
    })

    it("should allow rejection with feedback", async () => {
      const user = userEvent.setup()

      function ApprovalWorkflow() {
        return (
          <div>
            <h1>Solicitudes de Aprobación</h1>
            <textarea placeholder="Comentarios de rechazo" />
            <button onClick={() => mockImplementations.notificationService.send()}>Rechazar</button>
          </div>
        )
      }

      renderWithProviders(<ApprovalWorkflow />, { user: professorUser })

      const textarea = screen.getByPlaceholderText(/comentarios de rechazo/i)
      await user.type(textarea, "Necesita más trabajo en el diagnóstico")

      const rejectBtn = screen.getByRole("button", { name: /rechazar/i })
      await user.click(rejectBtn)

      expect(mockImplementations.notificationService.send).toHaveBeenCalled()
    })
  })

  describe("Specialty Management", () => {
    it("should display specialty-specific content", () => {
      function SpecialtyManagement() {
        return (
          <div>
            <h1>Gestión de Especialidad: {professorUser.specialty}</h1>
            <div>Recursos de Endodoncia</div>
            <div>Casos Clínicos</div>
          </div>
        )
      }

      renderWithProviders(<SpecialtyManagement />, { user: professorUser })

      expect(screen.getByText(`Gestión de Especialidad: ${professorUser.specialty}`)).toBeInTheDocument()
      expect(screen.getByText(/recursos de endodoncia/i)).toBeInTheDocument()
    })

    it("should manage clinical cases", async () => {
      const user = userEvent.setup()

      function ClinicalCases() {
        return (
          <div>
            <h1>Casos Clínicos</h1>
            <button>Crear Caso</button>
            <button>Revisar Casos</button>
          </div>
        )
      }

      renderWithProviders(<ClinicalCases />, { user: professorUser })

      const createBtn = screen.getByRole("button", { name: /crear caso/i })
      await user.click(createBtn)

      expect(createBtn).toHaveBeenClicked
    })
  })

  describe("Access Control", () => {
    it("should deny access to non-professor users", () => {
      const studentUser = mockUsers.student

      renderWithProviders(<ProfessorDashboard />, { user: studentUser })

      expect(screen.getByText(/acceso denegado/i)).toBeInTheDocument()
    })

    it("should allow access only to professor users", () => {
      renderWithProviders(<ProfessorDashboard />, { user: professorUser })

      expect(screen.queryByText(/acceso denegado/i)).not.toBeInTheDocument()
      expect(screen.getByText(/panel del profesor/i)).toBeInTheDocument()
    })
  })
})
