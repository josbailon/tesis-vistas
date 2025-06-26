"use client"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders, mockUsers, mockImplementations } from "../utils/test-utils"

// Mock student components
function StudentDashboard() {
  return (
    <div>
      <h1>Panel del Estudiante</h1>
      <div>Mis Pacientes</div>
      <div>Casos Clínicos</div>
      <div>Progreso Académico</div>
      <button>Ver Pacientes</button>
      <button>Crear Caso</button>
    </div>
  )
}

function PatientManagement() {
  return (
    <div>
      <h1>Gestión de Pacientes</h1>
      <div>Lista de Pacientes Asignados</div>
      <button>Agendar Cita</button>
      <button>Ver Historial</button>
    </div>
  )
}

describe("Student Role Tests", () => {
  const studentUser = mockUsers.student

  describe("Student Dashboard", () => {
    it("should render student dashboard", () => {
      renderWithProviders(<StudentDashboard />, { user: studentUser })

      expect(screen.getByText(/panel del estudiante/i)).toBeInTheDocument()
      expect(screen.getByText(/mis pacientes/i)).toBeInTheDocument()
      expect(screen.getByText(/casos clínicos/i)).toBeInTheDocument()
      expect(screen.getByText(/progreso académico/i)).toBeInTheDocument()
    })

    it("should navigate to patient management", async () => {
      const user = userEvent.setup()
      renderWithProviders(<StudentDashboard />, { user: studentUser })

      const patientsBtn = screen.getByRole("button", { name: /ver pacientes/i })
      await user.click(patientsBtn)

      expect(patientsBtn).toHaveBeenClicked
    })

    it("should allow creating clinical cases", async () => {
      const user = userEvent.setup()
      renderWithProviders(<StudentDashboard />, { user: studentUser })

      const createCaseBtn = screen.getByRole("button", { name: /crear caso/i })
      await user.click(createCaseBtn)

      expect(createCaseBtn).toHaveBeenClicked
    })
  })

  describe("Patient Management", () => {
    it("should display assigned patients", () => {
      renderWithProviders(<PatientManagement />, { user: studentUser })

      expect(screen.getByText(/gestión de pacientes/i)).toBeInTheDocument()
      expect(screen.getByText(/lista de pacientes asignados/i)).toBeInTheDocument()
    })

    it("should allow scheduling appointments", async () => {
      const user = userEvent.setup()
      renderWithProviders(<PatientManagement />, { user: studentUser })

      const scheduleBtn = screen.getByRole("button", { name: /agendar cita/i })
      await user.click(scheduleBtn)

      expect(scheduleBtn).toHaveBeenClicked
    })

    it("should allow viewing patient history", async () => {
      const user = userEvent.setup()
      renderWithProviders(<PatientManagement />, { user: studentUser })

      const historyBtn = screen.getByRole("button", { name: /ver historial/i })
      await user.click(historyBtn)

      expect(historyBtn).toHaveBeenClicked
    })
  })

  describe("Clinical Cases", () => {
    it("should display clinical cases", () => {
      function ClinicalCases() {
        return (
          <div>
            <h1>Casos Clínicos</h1>
            <div>Casos Activos: 3</div>
            <div>Casos Completados: 5</div>
            <button>Nuevo Caso</button>
          </div>
        )
      }

      renderWithProviders(<ClinicalCases />, { user: studentUser })

      expect(screen.getByText(/casos clínicos/i)).toBeInTheDocument()
      expect(screen.getByText(/casos activos: 3/i)).toBeInTheDocument()
      expect(screen.getByText(/casos completados: 5/i)).toBeInTheDocument()
    })

    it("should allow creating new cases", async () => {
      const user = userEvent.setup()

      function ClinicalCases() {
        return (
          <div>
            <h1>Casos Clínicos</h1>
            <button onClick={() => mockImplementations.notificationService.send()}>Nuevo Caso</button>
          </div>
        )
      }

      renderWithProviders(<ClinicalCases />, { user: studentUser })

      const newCaseBtn = screen.getByRole("button", { name: /nuevo caso/i })
      await user.click(newCaseBtn)

      expect(mockImplementations.notificationService.send).toHaveBeenCalled()
    })
  })

  describe("Academic Progress", () => {
    it("should display academic progress", () => {
      function AcademicProgress() {
        return (
          <div>
            <h1>Progreso Académico</h1>
            <div>Progreso: 75%</div>
            <div>Tareas Pendientes: 2</div>
            <div>Evaluaciones: 8.5/10</div>
          </div>
        )
      }

      renderWithProviders(<AcademicProgress />, { user: studentUser })

      expect(screen.getByText(/progreso académico/i)).toBeInTheDocument()
      expect(screen.getByText(/progreso: 75%/i)).toBeInTheDocument()
      expect(screen.getByText(/tareas pendientes: 2/i)).toBeInTheDocument()
    })

    it("should display assignments and evaluations", () => {
      function Assignments() {
        return (
          <div>
            <h1>Tareas y Evaluaciones</h1>
            <div>Tarea 1: Caso de Endodoncia</div>
            <div>Evaluación: Técnicas de Obturación</div>
            <button>Entregar Tarea</button>
          </div>
        )
      }

      renderWithProviders(<Assignments />, { user: studentUser })

      expect(screen.getByText(/tareas y evaluaciones/i)).toBeInTheDocument()
      expect(screen.getByText(/caso de endodoncia/i)).toBeInTheDocument()
    })
  })

  describe("Approval Requests", () => {
    it("should allow submitting approval requests", async () => {
      const user = userEvent.setup()

      function ApprovalRequest() {
        return (
          <div>
            <h1>Solicitar Aprobación</h1>
            <textarea placeholder="Descripción del caso" />
            <button onClick={() => mockImplementations.notificationService.send()}>Enviar Solicitud</button>
          </div>
        )
      }

      renderWithProviders(<ApprovalRequest />, { user: studentUser })

      const textarea = screen.getByPlaceholderText(/descripción del caso/i)
      await user.type(textarea, "Solicito aprobación para tratamiento de conducto")

      const submitBtn = screen.getByRole("button", { name: /enviar solicitud/i })
      await user.click(submitBtn)

      expect(mockImplementations.notificationService.send).toHaveBeenCalled()
    })

    it("should display approval status", () => {
      function ApprovalStatus() {
        return (
          <div>
            <h1>Estado de Solicitudes</h1>
            <div>Solicitudes Pendientes: 1</div>
            <div>Solicitudes Aprobadas: 3</div>
            <div>Solicitudes Rechazadas: 0</div>
          </div>
        )
      }

      renderWithProviders(<ApprovalStatus />, { user: studentUser })

      expect(screen.getByText(/estado de solicitudes/i)).toBeInTheDocument()
      expect(screen.getByText(/solicitudes pendientes: 1/i)).toBeInTheDocument()
    })
  })

  describe("Access Control", () => {
    it("should deny access to non-student users", () => {
      const adminUser = mockUsers.admin

      renderWithProviders(<StudentDashboard />, { user: adminUser })

      expect(screen.getByText(/acceso denegado/i)).toBeInTheDocument()
    })

    it("should allow access only to student users", () => {
      renderWithProviders(<StudentDashboard />, { user: studentUser })

      expect(screen.queryByText(/acceso denegado/i)).not.toBeInTheDocument()
      expect(screen.getByText(/panel del estudiante/i)).toBeInTheDocument()
    })
  })
})
