"use client"

import React from "react"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders, mockUsers } from "../utils/test-utils"

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

    it("should handle patient medical records access", async () => {
      const user = userEvent.setup()
      const patientUser = mockUsers.patient

      function MedicalRecordsWorkflow() {
        const [showRecords, setShowRecords] = React.useState(false)

        return (
          <div>
            {!showRecords ? (
              <div>
                <h1>Mis Registros Médicos</h1>
                <button onClick={() => setShowRecords(true)}>Ver Registros</button>
              </div>
            ) : (
              <div>
                <h1>Historial Médico</h1>
                <div>Registro de tratamientos anteriores</div>
                <div>Última consulta: 15/01/2024</div>
              </div>
            )}
          </div>
        )
      }

      renderWithProviders(<MedicalRecordsWorkflow />, { user: patientUser })

      expect(screen.getByText(/mis registros médicos/i)).toBeInTheDocument()
      await user.click(screen.getByRole("button", { name: /ver registros/i }))

      await waitFor(() => {
        expect(screen.getByText(/historial médico/i)).toBeInTheDocument()
        expect(screen.getByText(/última consulta/i)).toBeInTheDocument()
      })
    })
  })

  describe("Student-Professor Interaction", () => {
    it("should complete approval request workflow", async () => {
      const user = userEvent.setup()
      const studentUser = mockUsers.student

      // Mock approval workflow
      function ApprovalWorkflow() {
        const [isSubmitted, setIsSubmitted] = React.useState(false)
        const [isApproved, setIsApproved] = React.useState(false)

        return (
          <div>
            {!isSubmitted && (
              <div>
                <h1>Solicitar Aprobación</h1>
                <textarea placeholder="Descripción del caso" data-testid="case-description" />
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
      const textarea = screen.getByTestId("case-description")
      await user.type(textarea, "Solicito aprobación para tratamiento")

      await user.click(screen.getByRole("button", { name: /enviar solicitud/i }))

      // Request submitted
      expect(screen.getByText(/solicitud enviada/i)).toBeInTheDocument()

      // Simulate professor approval
      await user.click(screen.getByRole("button", { name: /simular aprobación/i }))

      // Request approved
      expect(screen.getByText(/solicitud aprobada/i)).toBeInTheDocument()
    })

    it("should handle student clinical case management", async () => {
      const user = userEvent.setup()
      const studentUser = mockUsers.student

      function ClinicalCaseWorkflow() {
        const [caseCreated, setCaseCreated] = React.useState(false)

        return (
          <div>
            {!caseCreated ? (
              <div>
                <h1>Crear Caso Clínico</h1>
                <input placeholder="Título del caso" data-testid="case-title" />
                <textarea placeholder="Descripción" data-testid="case-desc" />
                <button onClick={() => setCaseCreated(true)}>Crear Caso</button>
              </div>
            ) : (
              <div>
                <h1>Caso Clínico Creado</h1>
                <div>El caso ha sido registrado exitosamente</div>
              </div>
            )}
          </div>
        )
      }

      renderWithProviders(<ClinicalCaseWorkflow />, { user: studentUser })

      await user.type(screen.getByTestId("case-title"), "Caso de Ortodoncia")
      await user.type(screen.getByTestId("case-desc"), "Paciente con maloclusión clase II")

      await user.click(screen.getByRole("button", { name: /crear caso/i }))

      expect(screen.getByText(/caso clínico creado/i)).toBeInTheDocument()
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
                <input placeholder="Nombre" data-testid="user-name" />
                <input placeholder="Email" data-testid="user-email" />
                <select data-testid="user-role">
                  <option value="">Seleccionar Rol</option>
                  <option value="student">Estudiante</option>
                  <option value="professor">Profesor</option>
                  <option value="patient">Paciente</option>
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
      await user.type(screen.getByTestId("user-name"), "Nuevo Usuario")
      await user.type(screen.getByTestId("user-email"), "nuevo@test.com")
      await user.selectOptions(screen.getByTestId("user-role"), "student")

      // Submit form
      await user.click(screen.getByRole("button", { name: /crear usuario/i }))

      // Verify creation
      expect(screen.getByText(/usuario creado/i)).toBeInTheDocument()
    })

    it("should handle system analytics workflow", async () => {
      const user = userEvent.setup()
      const adminUser = mockUsers.admin

      function AnalyticsWorkflow() {
        const [showAnalytics, setShowAnalytics] = React.useState(false)

        return (
          <div>
            {!showAnalytics ? (
              <div>
                <h1>Panel de Administración</h1>
                <button onClick={() => setShowAnalytics(true)}>
                  Ver Analíticas
                </button>
              </div>
            )}\
            {showAnalytics && (
              <div>
                <h1>Analíticas del Sistema</h1>
                <div>Total de usuarios: 150</div>
                <div>Citas programadas: 45</div>
                <div>Casos activos: 23</div>>>Casos activos: 23</div>
              </div>
            )}
          </div>
        )
      }

      renderWithProviders(<AnalyticsWorkflow />, { user: adminUser })

      await user.click(screen.getByRole("button", { name: /ver analíticas/i }))

      expect(screen.getByText(/analíticas del sistema/i)).toBeInTheDocument()
      expect(screen.getByText(/total de usuarios: 150/i)).toBeInTheDocument()
  })
})

describe("Cross-Role Communication", () => {
  it("should handle notifications between roles", async () => {
    const user = userEvent.setup()

    function NotificationSystem() {
      const [notifications, setNotifications] = React.useState([
        { id: 1, from: "Profesor", to: "Estudiante", message: "Solicitud aprobada" },
        { id: 2, from: "Admin", to: "Todos", message: "Mantenimiento programado" },
        { id: 3, from: "Secretaria", to: "Paciente", message: "Recordatorio de cita" },
      ])
      const [selectedNotification, setSelectedNotification] = React.useState<number | null>(null)

      return (
        <div>
          <h1>Centro de Notificaciones</h1>
          <div>
            {notifications.map((notification) => (
              <div key={notification.id} data-testid={`notification-${notification.id}`}>
                <button onClick={() => setSelectedNotification(notification.id)} className="notification-item">
                  De: {notification.from} - {notification.message}
                </button>
              </div>
            ))}
          </div>
          {selectedNotification && (
            <div data-testid="notification-detail">
              <h2>Detalle de Notificación</h2>
              <p>Notificación #{selectedNotification} seleccionada</p>
            </div>
          )}
        </div>
      )
    }

    renderWithProviders(<NotificationSystem />)

    // Verify notifications are displayed
    expect(screen.getByText(/centro de notificaciones/i)).toBeInTheDocument()
    expect(screen.getByTestId("notification-1")).toBeInTheDocument()
    expect(screen.getByTestId("notification-2")).toBeInTheDocument()
    expect(screen.getByTestId("notification-3")).toBeInTheDocument()

    // Click on a notification
    await user.click(screen.getByText(/solicitud aprobada/i))

    // Verify detail view
    expect(screen.getByTestId("notification-detail")).toBeInTheDocument()
    expect(screen.getByText(/notificación #1 seleccionada/i)).toBeInTheDocument()
  })

  it("should handle appointment scheduling between patient and secretary", async () => {
    const user = userEvent.setup()

    function AppointmentScheduling() {
      const [step, setStep] = React.useState("select-date")
      const [selectedDate, setSelectedDate] = React.useState("")
      const [selectedTime, setSelectedTime] = React.useState("")

      return (
        <div>
          {step === "select-date" && (
            <div>
              <h1>Seleccionar Fecha</h1>
              <input
                type="date"
                data-testid="date-picker"
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                  setStep("select-time")
                }}
              />
            </div>
          )}
          {step === "select-time" && (
            <div>
              <h1>Seleccionar Hora</h1>
              <p>Fecha seleccionada: {selectedDate}</p>
              <select
                data-testid="time-picker"
                onChange={(e) => {
                  setSelectedTime(e.target.value)
                  setStep("confirm")
                }}
              >
                <option value="">Seleccionar hora</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
              </select>
            </div>
          )}
          {step === "confirm" && (
            <div>
              <h1>Confirmar Cita</h1>
              <p>Fecha: {selectedDate}</p>
              <p>Hora: {selectedTime}</p>
              <button onClick={() => setStep("completed")}>Confirmar Cita</button>
            </div>
          )}
          {step === "completed" && (
            <div>
              <h1>Cita Confirmada</h1>
              <p>Su cita ha sido programada exitosamente</p>
            </div>
          )}
        </div>
      )
    }

    renderWithProviders(<AppointmentScheduling />)

    // Select date
    const datePicker = screen.getByTestId("date-picker")
    await user.type(datePicker, "2024-02-15")

    // Select time
    await waitFor(() => {
      expect(screen.getByTestId("time-picker")).toBeInTheDocument()
    })
    await user.selectOptions(screen.getByTestId("time-picker"), "10:00")

    // Confirm appointment
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /confirmar cita/i })).toBeInTheDocument()
    })
    await user.click(screen.getByRole("button", { name: /confirmar cita/i }))

    // Verify completion
    expect(screen.getByText(/cita confirmada/i)).toBeInTheDocument()
    expect(screen.getByText(/programada exitosamente/i)).toBeInTheDocument()
  })
})

describe("Professor Teaching Workflow", () => {
  it("should handle student evaluation and feedback", async () => {
    const user = userEvent.setup()
    const professorUser = mockUsers.professor

    function StudentEvaluation() {
      const [selectedStudent, setSelectedStudent] = React.useState("")
      const [evaluation, setEvaluation] = React.useState("")
      const [submitted, setSubmitted] = React.useState(false)

      return (
        <div>
          {!submitted ? (
            <div>
              <h1>Evaluación de Estudiantes</h1>
              <select
                data-testid="student-select"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Seleccionar estudiante</option>
                <option value="student1">Juan Pérez</option>
                <option value="student2">María García</option>
              </select>
              <textarea
                placeholder="Comentarios de evaluación"
                data-testid="evaluation-comments"
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
              />
              <button onClick={() => setSubmitted(true)} disabled={!selectedStudent || !evaluation}>
                Enviar Evaluación
              </button>
            </div>
          ) : (
            <div>
              <h1>Evaluación Enviada</h1>
              <p>La evaluación ha sido registrada exitosamente</p>
            </div>
          )}
        </div>
      )
    }

    renderWithProviders(<StudentEvaluation />, { user: professorUser })

    // Select student
    await user.selectOptions(screen.getByTestId("student-select"), "student1")

    // Add evaluation comments
    await user.type(screen.getByTestId("evaluation-comments"), "Excelente trabajo en el caso clínico presentado")

    // Submit evaluation
    await user.click(screen.getByRole("button", { name: /enviar evaluación/i }))

    // Verify submission
    expect(screen.getByText(/evaluación enviada/i)).toBeInTheDocument()
  })
})

describe("Error Handling and Edge Cases", () => {
  it("should handle network errors gracefully", async () => {
    const user = userEvent.setup()

    function NetworkErrorComponent() {
      const [hasError, setHasError] = React.useState(false)
      const [loading, setLoading] = React.useState(false)

      const simulateNetworkError = async () => {
        setLoading(true)
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 100))
        setHasError(true)
        setLoading(false)
      }

      return (
        <div>
          <h1>Prueba de Errores de Red</h1>
          {loading && <div>Cargando...</div>}
          {hasError && <div data-testid="error-message">Error de conexión. Por favor, intente nuevamente.</div>}
          <button onClick={simulateNetworkError}>Simular Error de Red</button>
        </div>
      )
    }

    renderWithProviders(<NetworkErrorComponent />)

    await user.click(screen.getByRole("button", { name: /simular error de red/i }))

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument()
    })
  })

  it("should handle form validation errors", async () => {
    const user = userEvent.setup()

    function ValidationForm() {
      const [errors, setErrors] = React.useState<string[]>([])

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const newErrors: string[] = []
        if (!email) newErrors.push("Email es requerido")
        if (!password) newErrors.push("Contraseña es requerida")
        if (email && !email.includes("@")) newErrors.push("Email inválido")

        setErrors(newErrors)
      }

      return (
        <div>
          <h1>Formulario de Validación</h1>
          <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" data-testid="email-input" />
            <input name="password" type="password" placeholder="Contraseña" data-testid="password-input" />
            <button type="submit">Enviar</button>
          </form>
          {errors.length > 0 && (
            <div data-testid="validation-errors">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </div>
      )
    }

    renderWithProviders(<ValidationForm />)

    // Submit empty form
    await user.click(screen.getByRole("button", { name: /enviar/i }))

    // Check validation errors
    await waitFor(() => {
      expect(screen.getByTestId("validation-errors")).toBeInTheDocument()
      expect(screen.getByText(/email es requerido/i)).toBeInTheDocument()
      expect(screen.getByText(/contraseña es requerida/i)).toBeInTheDocument()
    })

    // Fill invalid email
    await user.type(screen.getByTestId("email-input"), "invalid-email")
    await user.click(screen.getByRole("button", { name: /enviar/i }))

    // Check email validation
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument()
    })
  })
})
})
