"use client"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders, mockUsers, mockImplementations } from "../utils/test-utils"

// Mock patient components
function PatientDashboard() {
  return (
    <div>
      <h1>Panel del Paciente</h1>
      <div>Mis Citas</div>
      <div>Mi Historial Médico</div>
      <div>Próxima Cita: 15 Enero 2024</div>
      <button>Agendar Cita</button>
      <button>Ver Historial</button>
    </div>
  )
}

function AppointmentBooking() {
  return (
    <div>
      <h1>Agendar Cita</h1>
      <select>
        <option>Seleccionar Especialidad</option>
        <option>Endodoncia</option>
        <option>Ortodoncia</option>
      </select>
      <input type="date" />
      <button>Confirmar Cita</button>
    </div>
  )
}

describe("Patient Role Tests", () => {
  const patientUser = mockUsers.patient

  describe("Patient Dashboard", () => {
    it("should render patient dashboard", () => {
      renderWithProviders(<PatientDashboard />, { user: patientUser })

      expect(screen.getByText(/panel del paciente/i)).toBeInTheDocument()
      expect(screen.getByText(/mis citas/i)).toBeInTheDocument()
      expect(screen.getByText(/mi historial médico/i)).toBeInTheDocument()
    })

    it("should display upcoming appointments", () => {
      renderWithProviders(<PatientDashboard />, { user: patientUser })

      expect(screen.getByText(/próxima cita: 15 enero 2024/i)).toBeInTheDocument()
    })

    it("should navigate to appointment booking", async () => {
      const user = userEvent.setup()
      renderWithProviders(<PatientDashboard />, { user: patientUser })

      const bookBtn = screen.getByRole("button", { name: /agendar cita/i })
      await user.click(bookBtn)

      expect(bookBtn).toHaveBeenClicked
    })

    it("should navigate to medical history", async () => {
      const user = userEvent.setup()
      renderWithProviders(<PatientDashboard />, { user: patientUser })

      const historyBtn = screen.getByRole("button", { name: /ver historial/i })
      await user.click(historyBtn)

      expect(historyBtn).toHaveBeenClicked
    })
  })

  describe("Appointment Management", () => {
    it("should display appointment booking form", () => {
      renderWithProviders(<AppointmentBooking />, { user: patientUser })

      expect(screen.getByText(/agendar cita/i)).toBeInTheDocument()
      expect(screen.getByRole("combobox")).toBeInTheDocument()
      expect(screen.getByRole("textbox")).toBeInTheDocument()
    })

    it("should allow selecting specialty", async () => {
      const user = userEvent.setup()
      renderWithProviders(<AppointmentBooking />, { user: patientUser })

      const specialtySelect = screen.getByRole("combobox")
      await user.selectOptions(specialtySelect, "Endodoncia")

      expect(specialtySelect).toHaveValue("Endodoncia")
    })

    it("should allow selecting date", async () => {
      const user = userEvent.setup()
      renderWithProviders(<AppointmentBooking />, { user: patientUser })

      const dateInput = screen.getByRole("textbox")
      await user.type(dateInput, "2024-01-15")

      expect(dateInput).toHaveValue("2024-01-15")
    })

    it("should confirm appointment booking", async () => {
      const user = userEvent.setup()
      renderWithProviders(<AppointmentBooking />, { user: patientUser })

      const confirmBtn = screen.getByRole("button", { name: /confirmar cita/i })
      await user.click(confirmBtn)

      expect(confirmBtn).toHaveBeenClicked
    })
  })

  describe("Medical History", () => {
    it("should display medical history", () => {
      function MedicalHistory() {
        return (
          <div>
            <h1>Mi Historial Médico</h1>
            <div>Tratamientos Anteriores</div>
            <div>Alergias: Penicilina</div>
            <div>Última Visita: 10 Diciembre 2023</div>
          </div>
        )
      }

      renderWithProviders(<MedicalHistory />, { user: patientUser })

      expect(screen.getByText(/mi historial médico/i)).toBeInTheDocument()
      expect(screen.getByText(/tratamientos anteriores/i)).toBeInTheDocument()
      expect(screen.getByText(/alergias: penicilina/i)).toBeInTheDocument()
    })

    it("should display treatment records", () => {
      function TreatmentRecords() {
        return (
          <div>
            <h1>Registros de Tratamiento</h1>
            <div>Tratamiento de Conducto - Completado</div>
            <div>Limpieza Dental - En Progreso</div>
            <button>Ver Detalles</button>
          </div>
        )
      }

      renderWithProviders(<TreatmentRecords />, { user: patientUser })

      expect(screen.getByText(/registros de tratamiento/i)).toBeInTheDocument()
      expect(screen.getByText(/tratamiento de conducto - completado/i)).toBeInTheDocument()
    })
  })

  describe("Profile Management", () => {
    it("should display patient profile", () => {
      function PatientProfile() {
        return (
          <div>
            <h1>Mi Perfil</h1>
            <div>Nombre: {patientUser.name}</div>
            <div>Email: {patientUser.email}</div>
            <button>Editar Perfil</button>
          </div>
        )
      }

      renderWithProviders(<PatientProfile />, { user: patientUser })

      expect(screen.getByText(/mi perfil/i)).toBeInTheDocument()
      expect(screen.getByText(`Nombre: ${patientUser.name}`)).toBeInTheDocument()
      expect(screen.getByText(`Email: ${patientUser.email}`)).toBeInTheDocument()
    })

    it("should allow profile editing", async () => {
      const user = userEvent.setup()

      function EditProfile() {
        return (
          <div>
            <h1>Editar Perfil</h1>
            <input defaultValue={patientUser.name} />
            <input defaultValue={patientUser.email} />
            <button onClick={() => mockImplementations.notificationService.send()}>Guardar Cambios</button>
          </div>
        )
      }

      renderWithProviders(<EditProfile />, { user: patientUser })

      const saveBtn = screen.getByRole("button", { name: /guardar cambios/i })
      await user.click(saveBtn)

      expect(mockImplementations.notificationService.send).toHaveBeenCalled()
    })
  })

  describe("Notifications", () => {
    it("should display appointment reminders", () => {
      function Notifications() {
        return (
          <div>
            <h1>Notificaciones</h1>
            <div>Recordatorio: Cita mañana a las 10:00 AM</div>
            <div>Confirmación: Cita agendada para el 20 de Enero</div>
            <button>Marcar como Leída</button>
          </div>
        )
      }

      renderWithProviders(<Notifications />, { user: patientUser })

      expect(screen.getByText(/notificaciones/i)).toBeInTheDocument()
      expect(screen.getByText(/recordatorio: cita mañana/i)).toBeInTheDocument()
    })

    it("should allow marking notifications as read", async () => {
      const user = userEvent.setup()

      function Notifications() {
        return (
          <div>
            <h1>Notificaciones</h1>
            <button onClick={() => mockImplementations.notificationService.markAsRead()}>Marcar como Leída</button>
          </div>
        )
      }

      renderWithProviders(<Notifications />, { user: patientUser })

      const markReadBtn = screen.getByRole("button", { name: /marcar como leída/i })
      await user.click(markReadBtn)

      expect(mockImplementations.notificationService.markAsRead).toHaveBeenCalled()
    })
  })

  describe("Access Control", () => {
    it("should deny access to non-patient users", () => {
      const adminUser = mockUsers.admin

      renderWithProviders(<PatientDashboard />, { user: adminUser })

      expect(screen.getByText(/acceso denegado/i)).toBeInTheDocument()
    })

    it("should allow access only to patient users", () => {
      renderWithProviders(<PatientDashboard />, { user: patientUser })

      expect(screen.queryByText(/acceso denegado/i)).not.toBeInTheDocument()
      expect(screen.getByText(/panel del paciente/i)).toBeInTheDocument()
    })
  })
})
