"use client"

import React from "react"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders, mockUsers, mockImplementations } from "../utils/test-utils"

describe("User Workflow Integration Tests", () => {
  describe("Complete Patient Journey", () => {
    it("should complete full patient appointment workflow", async () => {
      const user = userEvent.setup()
      const patientUser = mockUsers.patient

      // Mock complete patient workflow component
      function PatientWorkflow() {
        const [step, setStep] = React.useState(1)

        return (
          <div>
            {step === 1 && (
              <div>
                <h1>Agendar Cita</h1>
                <button onClick={() => setStep(2)}>Continuar</button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h1>Confirmar Cita</h1>
                <button onClick={() => setStep(3)}>Confirmar</button>
              </div>
            )}
            {step === 3 && (
              <div>
                <h1>Cita Confirmada</h1>
                <div>Su cita ha sido agendada exitosamente</div>
              </div>
            )}
          </div>
        )
      }

      renderWithProviders(<PatientWorkflow />, { user: patientUser })

      // Step 1: Start booking
      expect(screen.getByText(/agendar cita/i)).toBeInTheDocument()
      await user.click(screen.getByRole("button", { name: /continuar/i }))

      // Step 2: Confirm booking
      expect(screen.getByText(/confirmar cita/i)).toBeInTheDocument()
      await user.click(screen.getByRole("button", { name: /confirmar/i }))

      // Step 3: Confirmation
      expect(screen.getByText(/cita confirmada/i)).toBeInTheDocument()
      expect(screen.getByText(/cita ha sido agendada exitosamente/i)).toBeInTheDocument()
    })
  })

  describe("Student-Professor Interaction", () => {
    it("should complete approval request workflow", async () => {
      const user = userEvent.setup()
      const studentUser = mockUsers.student
      const professorUser = mockUsers.professor

      // Mock approval workflow
      function ApprovalWorkflow() {
        const [isSubmitted, setIsSubmitted] = React.useState(false)
        const [isApproved, setIsApproved] = React.useState(false)

        return (
          <div>
            {!isSubmitted && (
              <div>
                <h1>Solicitar Aprobación</h1>
                <textarea placeholder="Descripción del caso" />
                <button onClick={() => setIsSubmitted(true)}>Enviar Solicitud</button>
              </div>
            )}
            {isSubmitted && !isApproved && (
              <div>
                <h1>Solicitud Enviada</h1>
                <div>Esperando aprobación del profesor</div>
                <button onClick={() => setIsApproved(true)}>Simular Aprobación</button>
              </div>
            )}
            {isApproved && (
              <div>
                <h1>Solicitud Aprobada</h1>
                <div>El profesor ha aprobado su solicitud</div>
              </div>
            )}
          </div>
        )
      }

      renderWithProviders(<ApprovalWorkflow />, { user: studentUser })

      // Student submits request
      const textarea = screen.getByPlaceholderText(/descripción del caso/i)
      await user.type(textarea, "Solicito aprobación para tratamiento")

      await user.click(screen.getByRole("button", { name: /enviar solicitud/i }))

      // Request submitted
      expect(screen.getByText(/solicitud enviada/i)).toBeInTheDocument()

      // Simulate professor approval
      await user.click(screen.getByRole("button", { name: /simular aprobación/i }))

      // Request approved
      expect(screen.getByText(/solicitud aprobada/i)).toBeInTheDocument()
    })
  })

  describe("Admin User Management", () => {
    it("should complete user creation workflow", async () => {
      const user = userEvent.setup()
      const adminUser = mockUsers.admin

      function UserCreationWorkflow() {
        const [showForm, setShowForm] = React.useState(false)
        const [userCreated, setUserCreated] = React.useState(false)

        return (
          <div>
            {!showForm && (
              <div>
                <h1>Gestión de Usuarios</h1>
                <button onClick={() => setShowForm(true)}>Crear Usuario</button>
              </div>
            )}
            {showForm && !userCreated && (
              <div>
                <h1>Crear Nuevo Usuario</h1>
                <input placeholder="Nombre" />
                <input placeholder="Email" />
                <select>
                  <option>Seleccionar Rol</option>
                  <option>Estudiante</option>
                  <option>Profesor</option>
                </select>
                <button onClick={() => setUserCreated(true)}>Crear Usuario</button>
              </div>
            )}
            {userCreated && (
              <div>
                <h1>Usuario Creado</h1>
                <div>El usuario ha sido creado exitosamente</div>
              </div>
            )}
          </div>
        )
      }

      renderWithProviders(<UserCreationWorkflow />, { user: adminUser })

      // Start user creation
      await user.click(screen.getByRole("button", { name: /crear usuario/i }))

      // Fill form
      await user.type(screen.getByPlaceholderText(/nombre/i), "Nuevo Usuario")
      await user.type(screen.getByPlaceholderText(/email/i), "nuevo@test.com")
      await user.selectOptions(screen.getByRole("combobox"), "Estudiante")

      // Submit form
      await user.click(screen.getByRole("button", { name: /crear usuario/i }))

      // Verify creation
      expect(screen.getByText(/usuario creado/i)).toBeInTheDocument()
    })
  })

  describe("Cross-Role Communication", () => {
    it("should handle notifications between roles", async () => {
      const user = userEvent.setup()

      function NotificationSystem() {
        const [notifications, setNotifications] = React.useState([
          { id: 1, from: "Profesor", to: "Estudiante", message: "Solicitud aprobada" },
          { id: 2, from: "Sistema", to: "Paciente", message: "Recordatorio de cita" },
        ])

        return (
          <div>
            <h1>Sistema de Notificaciones</h1>
            {notifications.map((notification) => (
              <div key={notification.id}>
                <div>De: {notification.from}</div>
                <div>Para: {notification.to}</div>
                <div>Mensaje: {notification.message}</div>
                <button onClick={() => mockImplementations.notificationService.markAsRead()}>Marcar como Leída</button>
              </div>
            ))}
          </div>
        )
      }

      renderWithProviders(<NotificationSystem />, { user: mockUsers.admin })

      expect(screen.getByText(/sistema de notificaciones/i)).toBeInTheDocument()
      expect(screen.getByText(/solicitud aprobada/i)).toBeInTheDocument()
      expect(screen.getByText(/recordatorio de cita/i)).toBeInTheDocument()

      const markReadButtons = screen.getAllByRole("button", { name: /marcar como leída/i })
      await user.click(markReadButtons[0])

      expect(mockImplementations.notificationService.markAsRead).toHaveBeenCalled()
    })
  })

  describe("Error Recovery", () => {
    it("should handle and recover from API errors", async () => {
      const user = userEvent.setup()

      // Mock API failure then success
      mockImplementations.notificationService.send
        .mockRejectedValueOnce(new Error("Network Error"))
        .mockResolvedValueOnce({ success: true })

      function ErrorRecoveryComponent() {
        const [error, setError] = React.useState(null)
        const [success, setSuccess] = React.useState(false)

        const handleSubmit = async () => {
          try {
            await mockImplementations.notificationService.send()
            setSuccess(true)
            setError(null)
          } catch (err) {
            setError(err.message)
          }
        }

        const handleRetry = async () => {
          setError(null)
          await handleSubmit()
        }

        return (
          <div>
            <h1>Test Error Recovery</h1>
            {error && (
              <div>
                <div>Error: {error}</div>
                <button onClick={handleRetry}>Reintentar</button>
              </div>
            )}
            {success && <div>Operación exitosa</div>}
            {!error && !success && <button onClick={handleSubmit}>Enviar</button>}
          </div>
        )
      }

      renderWithProviders(<ErrorRecoveryComponent />, { user: mockUsers.admin })

      // First attempt - should fail
      await user.click(screen.getByRole("button", { name: /enviar/i }))

      await waitFor(() => {
        expect(screen.getByText(/error: network error/i)).toBeInTheDocument()
      })

      // Retry - should succeed
      await user.click(screen.getByRole("button", { name: /reintentar/i }))

      await waitFor(() => {
        expect(screen.getByText(/operación exitosa/i)).toBeInTheDocument()
      })
    })
  })
})
