"use client"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthProvider, useAuth, TEST_USERS } from "@/contexts/auth-context"

// Test component to access auth context
function TestComponent() {
  const { user, login, logout, isLoading, isInitialized } = useAuth()

  return (
    <div>
      <div data-testid="user-info">{user ? `${user.name} (${user.role})` : "No user"}</div>
      <div data-testid="loading">{isLoading ? "Loading" : "Not loading"}</div>
      <div data-testid="initialized">{isInitialized ? "Initialized" : "Not initialized"}</div>
      <button onClick={() => login(TEST_USERS[0])} data-testid="login-btn">
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
    </div>
  )
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe("Provider Setup", () => {
    it("should throw error when useAuth is used outside provider", () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, "error").mockImplementation()

      expect(() => {
        render(<TestComponent />)
      }).toThrow("useAuth must be used within an AuthProvider")

      consoleSpy.mockRestore()
    })

    it("should provide auth context when wrapped with provider", () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      )

      expect(screen.getByTestId("user-info")).toHaveTextContent("No user")
      expect(screen.getByTestId("initialized")).toHaveTextContent("Initialized")
    })
  })

  describe("Authentication Flow", () => {
    it("should login user successfully", async () => {
      const user = userEvent.setup()

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      )

      await user.click(screen.getByTestId("login-btn"))

      await waitFor(() => {
        expect(screen.getByTestId("user-info")).toHaveTextContent("Dr. Admin (admin)")
      })

      expect(localStorage.setItem).toHaveBeenCalledWith("clinic_user", expect.stringContaining("Dr. Admin"))
    })

    it("should logout user successfully", async () => {
      const user = userEvent.setup()

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      )

      // Login first
      await user.click(screen.getByTestId("login-btn"))
      await waitFor(() => {
        expect(screen.getByTestId("user-info")).toHaveTextContent("Dr. Admin (admin)")
      })

      // Then logout
      await user.click(screen.getByTestId("logout-btn"))

      await waitFor(() => {
        expect(screen.getByTestId("user-info")).toHaveTextContent("No user")
      })

      expect(localStorage.removeItem).toHaveBeenCalledWith("clinic_user")
    })

    it("should restore user from localStorage on initialization", async () => {
      const mockUser = TEST_USERS[0]
      const userData = JSON.stringify(mockUser)
      const expiry = (Date.now() + 24 * 60 * 60 * 1000).toString()

      localStorage.getItem.mockImplementation((key) => {
        if (key === "clinic_user") return userData
        if (key === "clinic_expiry") return expiry
        return null
      })

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      )

      await waitFor(() => {
        expect(screen.getByTestId("user-info")).toHaveTextContent("Dr. Admin (admin)")
      })
    })

    it("should clear expired session on initialization", async () => {
      const mockUser = TEST_USERS[0]
      const userData = JSON.stringify(mockUser)
      const expiredTime = (Date.now() - 1000).toString() // Expired 1 second ago

      localStorage.getItem.mockImplementation((key) => {
        if (key === "clinic_user") return userData
        if (key === "clinic_expiry") return expiredTime
        return null
      })

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      )

      await waitFor(() => {
        expect(screen.getByTestId("user-info")).toHaveTextContent("No user")
      })

      expect(localStorage.removeItem).toHaveBeenCalledWith("clinic_user")
      expect(localStorage.removeItem).toHaveBeenCalledWith("clinic_expiry")
    })
  })

  describe("Error Handling", () => {
    it("should handle localStorage errors gracefully", async () => {
      localStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage error")
      })

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      )

      await waitFor(() => {
        expect(screen.getByTestId("user-info")).toHaveTextContent("No user")
        expect(screen.getByTestId("initialized")).toHaveTextContent("Initialized")
      })
    })

    it("should handle invalid JSON in localStorage", async () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === "clinic_user") return "invalid-json"
        if (key === "clinic_expiry") return "123456789"
        return null
      })

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      )

      await waitFor(() => {
        expect(screen.getByTestId("user-info")).toHaveTextContent("No user")
      })
    })
  })

  describe("User Roles", () => {
    TEST_USERS.forEach((testUser) => {
      it(`should handle ${testUser.role} role correctly`, async () => {
        const user = userEvent.setup()

        function RoleTestComponent() {
          const { user: currentUser, login } = useAuth()

          return (
            <div>
              <div data-testid="user-role">{currentUser?.role || "No role"}</div>
              <button onClick={() => login(testUser)} data-testid="login-btn">
                Login as {testUser.role}
              </button>
            </div>
          )
        }

        render(
          <AuthProvider>
            <RoleTestComponent />
          </AuthProvider>,
        )

        await user.click(screen.getByTestId("login-btn"))

        await waitFor(() => {
          expect(screen.getByTestId("user-role")).toHaveTextContent(testUser.role)
        })
      })
    })
  })
})
