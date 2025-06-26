"use client"

import { jest } from "@jest/globals"
import "@testing-library/jest-dom"

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return "/"
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock window.location
delete window.location
window.location = {
  href: "http://localhost:3000",
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
}

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

// Setup test utilities
global.testUtils = {
  createMockUser: (role = "patient", overrides = {}) => ({
    id: "1",
    email: `${role}@test.com`,
    name: `Test ${role}`,
    role,
    ...overrides,
  }),

  createMockAppointment: (overrides = {}) => ({
    id: "1",
    patientId: "1",
    studentId: "2",
    professorId: "3",
    date: "2024-01-15",
    time: "10:00",
    duration: 60,
    status: "confirmed",
    type: "Consulta",
    specialty: "Endodoncia",
    ...overrides,
  }),

  createMockPatient: (overrides = {}) => ({
    id: "1",
    name: "Test Patient",
    email: "patient@test.com",
    phone: "123-456-7890",
    dob: "1990-01-01",
    address: "Test Address",
    allergies: null,
    medicalHistory: null,
    ...overrides,
  }),
}
