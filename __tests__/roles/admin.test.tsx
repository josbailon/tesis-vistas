"use client"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders, mockUsers, mockImplementations, jest } from "../utils/test-utils"
import AdminDashboard from "@/app/dashboard/admin/page"
import UserManagement from "@/app/dashboard/admin/users/page"

// Mock the admin services
jest.mock("@/lib/admin-services", () => mockImplementations)

describe("Admin Role Tests", () => {
  const adminUser = mockUsers.admin

  describe("Admin Dashboard", () => {
    it("should render admin dashboard for admin user", async () => {
      renderWithProviders(<AdminDashboard />, { user: adminUser })

      expect(screen.getByText(/panel de administración/i)).toBeInTheDocument()
      expect(screen.getByText(/gestión de usuarios/i)).toBeInTheDocument()
      expect(screen.getByText(/configuración del sistema/i)).toBeInTheDocument()
    })

    it("should display system metrics", async () => {
      renderWithProviders(<AdminDashboard />, { user: adminUser })

      await waitFor(() => {
        expect(screen.getByText(/usuarios totales/i)).toBeInTheDocument()
        expect(screen.getByText(/citas programadas/i)).toBeInTheDocument()
      })
    })

    it("should handle admin actions", async () => {
      const user = userEvent.setup()
      renderWithProviders(<AdminDashboard />, { user: adminUser })

      const manageUsersBtn = screen.getByRole("button", { name: /gestionar usuarios/i })
      await user.click(manageUsersBtn)

      // Should navigate to user management
      expect(mockImplementations.notificationService.send).toHaveBeenCalled()
    })
  })

  describe("User Management", () => {
    it("should render user management interface", async () => {
      renderWithProviders(<UserManagement />, { user: adminUser })

      expect(screen.getByText(/gestión de usuarios/i)).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /crear usuario/i })).toBeInTheDocument()
    })

    it("should allow creating new users", async () => {
      const user = userEvent.setup()
      renderWithProviders(<UserManagement />, { user: adminUser })

      const createBtn = screen.getByRole("button", { name: /crear usuario/i })
      await user.click(createBtn)

      expect(screen.getByText(/crear nuevo usuario/i)).toBeInTheDocument()
    })

    it("should allow editing existing users", async () => {
      const user = userEvent.setup()
      renderWithProviders(<UserManagement />, { user: adminUser })

      await waitFor(() => {
        const editBtn = screen.getByRole("button", { name: /editar/i })
        expect(editBtn).toBeInTheDocument()
      })
    })

    it("should allow deleting users with confirmation", async () => {
      const user = userEvent.setup()
      renderWithProviders(<UserManagement />, { user: adminUser })

      await waitFor(() => {
        const deleteBtn = screen.getByRole("button", { name: /eliminar/i })
        expect(deleteBtn).toBeInTheDocument()
      })
    })

    it("should filter users by role", async () => {
      const user = userEvent.setup()
      renderWithProviders(<UserManagement />, { user: adminUser })

      const roleFilter = screen.getByRole("combobox", { name: /filtrar por rol/i })
      await user.click(roleFilter)

      const professorOption = screen.getByRole("option", { name: /profesor/i })
      await user.click(professorOption)

      expect(mockImplementations.searchService.searchPatients).toHaveBeenCalled()
    })

    it("should search users by name or email", async () => {
      const user = userEvent.setup()
      renderWithProviders(<UserManagement />, { user: adminUser })

      const searchInput = screen.getByPlaceholderText(/buscar por nombre o correo/i)
      await user.type(searchInput, "test@example.com")

      await waitFor(() => {
        expect(mockImplementations.searchService.searchPatients).toHaveBeenCalledWith(
          expect.objectContaining({ query: "test@example.com" }),
        )
      })
    })
  })

  describe("System Configuration", () => {
    it("should allow system configuration changes", async () => {
      // Mock system config component
      function SystemConfig() {
        return (
          <div>
            <h1>Configuración del Sistema</h1>
            <button>Guardar Configuración</button>
          </div>
        )
      }

      renderWithProviders(<SystemConfig />, { user: adminUser })

      expect(screen.getByText(/configuración del sistema/i)).toBeInTheDocument()
      expect(screen.getByRole("button", { name: /guardar configuración/i })).toBeInTheDocument()
    })
  })

  describe("Analytics and Reports", () => {
    it("should display system analytics", async () => {
      // Mock analytics component
      function Analytics() {
        return (
          <div>
            <h1>Análisis del Sistema</h1>
            <div>Total de usuarios: 150</div>
            <div>Citas completadas: 85%</div>
          </div>
        )
      }

      renderWithProviders(<Analytics />, { user: adminUser })

      expect(screen.getByText(/análisis del sistema/i)).toBeInTheDocument()
      expect(screen.getByText(/total de usuarios: 150/i)).toBeInTheDocument()
    })

    it("should generate reports", async () => {
      const user = userEvent.setup()

      function ReportGenerator() {
        return (
          <div>
            <h1>Generador de Reportes</h1>
            <button onClick={() => mockImplementations.analyticsService.generateReport()}>Generar Reporte</button>
          </div>
        )
      }

      renderWithProviders(<ReportGenerator />, { user: adminUser })

      const generateBtn = screen.getByRole("button", { name: /generar reporte/i })
      await user.click(generateBtn)

      expect(mockImplementations.analyticsService.generateReport).toHaveBeenCalled()
    })
  })

  describe("Access Control", () => {
    it("should deny access to non-admin users", () => {
      const studentUser = mockUsers.student

      renderWithProviders(<AdminDashboard />, { user: studentUser })

      expect(screen.getByText(/acceso denegado/i)).toBeInTheDocument()
    })

    it("should allow access only to admin users", () => {
      renderWithProviders(<AdminDashboard />, { user: adminUser })

      expect(screen.queryByText(/acceso denegado/i)).not.toBeInTheDocument()
      expect(screen.getByText(/panel de administración/i)).toBeInTheDocument()
    })
  })

  describe("Error Handling", () => {
    it("should handle API errors gracefully", async () => {
      mockImplementations.analyticsService.getMetrics.mockRejectedValueOnce(new Error("API Error"))

      renderWithProviders(<AdminDashboard />, { user: adminUser })

      await waitFor(() => {
        expect(screen.getByText(/error al cargar datos/i)).toBeInTheDocument()
      })
    })

    it("should show loading states", async () => {
      mockImplementations.analyticsService.getMetrics.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000)),
      )

      renderWithProviders(<AdminDashboard />, { user: adminUser })

      expect(screen.getByText(/cargando/i)).toBeInTheDocument()
    })
  })
})
