import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1"

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token")
        localStorage.removeItem("clinic_user")
        localStorage.removeItem("clinic_expiry")
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

// API endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) => apiClient.post("/auth/login", credentials),

  register: (userData: any) => apiClient.post("/auth/register", userData),

  getProfile: () => apiClient.get("/auth/profile"),

  refreshToken: () => apiClient.post("/auth/refresh"),
}

export const usersAPI = {
  getAll: (role?: string) => apiClient.get(`/users${role ? `?role=${role}` : ""}`),

  getById: (id: string) => apiClient.get(`/users/${id}`),

  create: (userData: any) => apiClient.post("/users", userData),

  update: (id: string, userData: any) => apiClient.patch(`/users/${id}`, userData),

  delete: (id: string) => apiClient.delete(`/users/${id}`),
}

export const patientsAPI = {
  getAll: () => apiClient.get("/patients"),

  getById: (id: string) => apiClient.get(`/patients/${id}`),

  getByUserId: (userId: string) => apiClient.get(`/patients/user/${userId}`),

  create: (patientData: any) => apiClient.post("/patients", patientData),

  update: (id: string, patientData: any) => apiClient.patch(`/patients/${id}`, patientData),

  delete: (id: string) => apiClient.delete(`/patients/${id}`),
}

export const appointmentsAPI = {
  getAll: () => apiClient.get("/appointments"),

  getById: (id: string) => apiClient.get(`/appointments/${id}`),

  create: (appointmentData: any) => apiClient.post("/appointments", appointmentData),

  update: (id: string, appointmentData: any) => apiClient.patch(`/appointments/${id}`, appointmentData),

  delete: (id: string) => apiClient.delete(`/appointments/${id}`),

  getByPatient: (patientId: string) => apiClient.get(`/appointments/patient/${patientId}`),

  getByStudent: (studentId: string) => apiClient.get(`/appointments/student/${studentId}`),
}

export const medicalRecordsAPI = {
  getAll: () => apiClient.get("/medical-records"),

  getById: (id: string) => apiClient.get(`/medical-records/${id}`),

  create: (recordData: any) => apiClient.post("/medical-records", recordData),

  update: (id: string, recordData: any) => apiClient.patch(`/medical-records/${id}`, recordData),

  delete: (id: string) => apiClient.delete(`/medical-records/${id}`),

  getByPatient: (patientId: string) => apiClient.get(`/medical-records/patient/${patientId}`),
}
