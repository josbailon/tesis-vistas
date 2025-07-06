/**
 * CONSTANTES DE LA APLICACIÓN
 *
 * Archivo centralizado para todas las constantes utilizadas
 * en la aplicación para facilitar el mantenimiento
 */

/**
 * CONFIGURACIÓN DE AUTENTICACIÓN
 */
export const AUTH_CONFIG = {
  TOKEN_KEY: "dental_clinic_token",
  USER_KEY: "dental_clinic_user",
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos en ms
  REMEMBER_ME_DURATION: 7 * 24 * 60 * 60 * 1000, // 7 días en ms
  WARNING_TIME: 5 * 60 * 1000, // 5 minutos antes de expirar
} as const

/**
 * ROLES Y PERMISOS
 */
export const USER_ROLES = {
  PATIENT: "patient",
  STUDENT: "student",
  PROFESSOR: "professor",
  ADMIN: "admin",
} as const

export const ROLE_PERMISSIONS = {
  [USER_ROLES.PATIENT]: ["view_own_appointments", "book_appointments", "view_own_records", "update_own_profile"],
  [USER_ROLES.STUDENT]: [
    "view_assigned_patients",
    "manage_patient_appointments",
    "create_medical_records",
    "view_clinical_cases",
    "request_approvals",
  ],
  [USER_ROLES.PROFESSOR]: [
    "view_all_students",
    "approve_treatments",
    "supervise_students",
    "manage_specialty",
    "view_all_appointments",
  ],
  [USER_ROLES.ADMIN]: ["manage_users", "view_analytics", "system_configuration", "manage_specialties", "full_access"],
} as const

/**
 * ESPECIALIDADES MÉDICAS
 */
export const MEDICAL_SPECIALTIES = {
  ENDODONCIA: "endodoncia",
  ORTODONCIA: "ortodoncia",
  CIRUGIA_ORAL: "cirugia-oral",
  ODONTOPEDIATRIA: "odontopediatria",
  PERIODONCIA: "periodoncia",
  PROTESIS: "protesis",
} as const

export const SPECIALTY_LABELS = {
  [MEDICAL_SPECIALTIES.ENDODONCIA]: "Endodoncia",
  [MEDICAL_SPECIALTIES.ORTODONCIA]: "Ortodoncia",
  [MEDICAL_SPECIALTIES.CIRUGIA_ORAL]: "Cirugía Oral",
  [MEDICAL_SPECIALTIES.ODONTOPEDIATRIA]: "Odontopediatría",
  [MEDICAL_SPECIALTIES.PERIODONCIA]: "Periodoncia",
  [MEDICAL_SPECIALTIES.PROTESIS]: "Prótesis",
} as const

/**
 * ESTADOS DE CITAS
 */
export const APPOINTMENT_STATUS = {
  SCHEDULED: "scheduled",
  CONFIRMED: "confirmed",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  NO_SHOW: "no-show",
} as const

export const APPOINTMENT_STATUS_LABELS = {
  [APPOINTMENT_STATUS.SCHEDULED]: "Programada",
  [APPOINTMENT_STATUS.CONFIRMED]: "Confirmada",
  [APPOINTMENT_STATUS.IN_PROGRESS]: "En Progreso",
  [APPOINTMENT_STATUS.COMPLETED]: "Completada",
  [APPOINTMENT_STATUS.CANCELLED]: "Cancelada",
  [APPOINTMENT_STATUS.NO_SHOW]: "No Asistió",
} as const

/**
 * CONFIGURACIÓN DE UI
 */
export const UI_CONFIG = {
  SIDEBAR_WIDTH: {
    EXPANDED: 288, // 72 * 4 = 288px (w-72)
    COLLAPSED: 64, // 16 * 4 = 64px (w-16)
  },
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
} as const

/**
 * CONFIGURACIÓN DE PAGINACIÓN
 */
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_VISIBLE_PAGES: 5,
} as const

/**
 * CONFIGURACIÓN DE ARCHIVOS
 */
export const FILE_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const

/**
 * MENSAJES DE ERROR COMUNES
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Error de conexión. Por favor, verifica tu conexión a internet.",
  UNAUTHORIZED: "No tienes permisos para realizar esta acción.",
  SESSION_EXPIRED: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
  VALIDATION_ERROR: "Por favor, corrige los errores en el formulario.",
  SERVER_ERROR: "Error interno del servidor. Por favor, intenta más tarde.",
  NOT_FOUND: "El recurso solicitado no fue encontrado.",
  INVALID_CREDENTIALS: "Credenciales incorrectas. Por favor, verifica tu email y contraseña.",
} as const

/**
 * CONFIGURACIÓN DE VALIDACIÓN
 */
export const VALIDATION_RULES = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^[0-9]{10}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const

/**
 * CONFIGURACIÓN DE FECHAS
 */
export const DATE_CONFIG = {
  DEFAULT_FORMAT: "dd/MM/yyyy",
  TIME_FORMAT: "HH:mm",
  DATETIME_FORMAT: "dd/MM/yyyy HH:mm",
  API_DATE_FORMAT: "yyyy-MM-dd",
  API_DATETIME_FORMAT: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const

/**
 * COLORES DEL TEMA
 */
export const THEME_COLORS = {
  PRIMARY: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  GRAY: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
} as const

/**
 * CONFIGURACIÓN DE NOTIFICACIONES
 */
export const NOTIFICATION_CONFIG = {
  TYPES: {
    INFO: "info",
    SUCCESS: "success",
    WARNING: "warning",
    ERROR: "error",
  },
  DURATION: {
    SHORT: 3000,
    MEDIUM: 5000,
    LONG: 8000,
    PERSISTENT: 0,
  },
  POSITION: {
    TOP_RIGHT: "top-right",
    TOP_LEFT: "top-left",
    BOTTOM_RIGHT: "bottom-right",
    BOTTOM_LEFT: "bottom-left",
  },
} as const

/**
 * RUTAS DE LA API (simuladas)
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    PROFILE: "/api/auth/profile",
  },
  USERS: {
    LIST: "/api/users",
    CREATE: "/api/users",
    UPDATE: "/api/users/:id",
    DELETE: "/api/users/:id",
    PROFILE: "/api/users/profile",
  },
  APPOINTMENTS: {
    LIST: "/api/appointments",
    CREATE: "/api/appointments",
    UPDATE: "/api/appointments/:id",
    DELETE: "/api/appointments/:id",
    BY_USER: "/api/appointments/user/:userId",
  },
  PATIENTS: {
    LIST: "/api/patients",
    CREATE: "/api/patients",
    UPDATE: "/api/patients/:id",
    DELETE: "/api/patients/:id",
    RECORDS: "/api/patients/:id/records",
  },
} as const
