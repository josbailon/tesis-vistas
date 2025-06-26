import type React from "react"
import type { ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { AuthProvider, type User } from "@/contexts/auth-context"

// Mock user data for different roles
export const mockUsers = {
  admin: {
    id: "1",
    email: "admin@test.com",
    name: "Test Admin",
    role: "admin",
  },
  professor: {
    id: "2",
    email: "professor@test.com",
    name: "Test Professor",
    role: "profesor",
    specialty: "Endodoncia",
  },
  student: {
    id: "3",
    email: "student@test.com",
    name: "Test Student",
    role: "estudiante",
  },
  patient: {
    id: "4",
    email: "patient@test.com",
    name: "Test Patient",
    role: "paciente",
  },
  secretary: {
    id: "5",
    email: "secretary@test.com",
    name: "Test Secretary",
    role: "secretario",
  },
}

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  user?: User | null
  initialRoute?: string
}

export function renderWithProviders(
  ui: ReactElement,
  { user = null, initialRoute = "/", ...renderOptions }: CustomRenderOptions = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    // Mock the auth context with provided user
    const mockAuthContext = {
      user,
      isLoading: false,
      isInitialized: true,
      login: jest.fn(),
      logout: jest.fn(),
    }

    return <AuthProvider value={mockAuthContext}>{children}</AuthProvider>
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Mock API responses
export const mockApiResponses = {
  appointments: [
    {
      id: "1",
      patientId: "1",
      studentId: "2",
      date: "2024-01-15",
      time: "10:00",
      status: "confirmed",
      type: "Consulta",
      specialty: "Endodoncia",
    },
  ],
  patients: [
    {
      id: "1",
      name: "John Doe",
      email: "john@test.com",
      phone: "123-456-7890",
      status: "active",
    },
  ],
  students: [
    {
      id: "1",
      name: "Jane Student",
      email: "jane@test.com",
      specialty: "Ortodoncia",
      semester: 8,
      progress: 75,
    },
  ],
}

// Test data generators
export const generateTestData = {
  user: (role: string, overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    email: `${role}@test.com`,
    name: `Test ${role}`,
    role,
    createdAt: new Date().toISOString(),
    ...overrides,
  }),

  appointment: (overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    patientId: "1",
    studentId: "2",
    date: "2024-01-15",
    time: "10:00",
    duration: 60,
    status: "confirmed",
    type: "Consulta",
    specialty: "Endodoncia",
    ...overrides,
  }),

  medicalRecord: (overrides = {}) => ({
    id: Math.random().toString(36).substr(2, 9),
    patientId: "1",
    studentId: "2",
    date: new Date().toISOString(),
    type: "Diagnóstico",
    title: "Test Record",
    description: "Test description",
    treatment: "Test treatment",
    specialty: "Endodoncia",
    ...overrides,
  }),
}

// Mock implementations for incomplete features
export const mockImplementations = {
  // Mock notification system
  notificationService: {
    send: jest.fn().mockResolvedValue({ success: true }),
    getNotifications: jest.fn().mockResolvedValue([]),
    markAsRead: jest.fn().mockResolvedValue({ success: true }),
  },

  // Mock search functionality
  searchService: {
    searchPatients: jest.fn().mockResolvedValue([]),
    searchAppointments: jest.fn().mockResolvedValue([]),
    searchStudents: jest.fn().mockResolvedValue([]),
  },

  // Mock file upload
  fileUploadService: {
    uploadFile: jest.fn().mockResolvedValue({ url: "test-file-url" }),
    deleteFile: jest.fn().mockResolvedValue({ success: true }),
  },

  // Mock analytics
  analyticsService: {
    getMetrics: jest.fn().mockResolvedValue({
      totalPatients: 100,
      totalAppointments: 50,
      completionRate: 85,
    }),
    generateReport: jest.fn().mockResolvedValue({ reportId: "123" }),
  },
}

// Custom matchers
expect.extend({
  toHaveRole(received, expectedRole) {
    const pass = received?.role === expectedRole
    if (pass) {
      return {
        message: () => `expected user not to have role ${expectedRole}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected user to have role ${expectedRole}, but got ${received?.role}`,
        pass: false,
      }
    }
  },
})

// Declare custom matcher types
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveRole(expectedRole: string): R
    }
  }
}
