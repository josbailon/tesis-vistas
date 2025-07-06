/**
 * STORE DE AUTENTICACIÓN CON PINIA
 *
 * Este store maneja todo el estado relacionado con la autenticación:
 * - Usuario actual logueado
 * - Estado de carga
 * - Funciones de login/logout
 * - Persistencia en localStorage
 * - Gestión de sesiones
 */

// Importar defineStore de Pinia para crear el store
import { defineStore } from "pinia"
// Importar ref y computed para reactividad
import { ref } from "vue"

/**
 * USUARIOS DE PRUEBA PARA DEMOSTRACIÓN
 *
 * Estos usuarios simulan una base de datos para testing
 * En producción, estos datos vendrían de una API
 */
export const TEST_USERS = [
  {
    id: 1,
    email: "paciente@clinica.com",
    password: "demo123",
    name: "Ana López",
    role: "patient",
    specialty: null,
    avatar: null,
    phone: "0987654321",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: null,
  },
  {
    id: 2,
    email: "estudiante@clinica.com",
    password: "demo123",
    name: "Juan Pérez",
    role: "student",
    specialty: "Odontología General",
    avatar: null,
    phone: "0976543210",
    semester: 8,
    studentId: "EST2024001",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: null,
  },
  {
    id: 3,
    email: "profesor@clinica.com",
    password: "demo123",
    name: "Dr. María González",
    role: "professor",
    specialty: "Endodoncia",
    avatar: null,
    phone: "0965432109",
    experience: 15,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: null,
  },
  {
    id: 4,
    email: "admin@clinica.com",
    password: "demo123",
    name: "Dr. Admin",
    role: "admin",
    specialty: null,
    avatar: null,
    phone: "0954321098",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: null,
  },
]

/**
 * DEFINICIÓN DEL STORE DE AUTENTICACIÓN
 *
 * useAuthStore es la función que retorna el store de autenticación
 * Puede ser usado en cualquier componente de la aplicación
 */
export const useAuthStore = defineStore("auth", () => {
  /**
   * ESTADO REACTIVO DEL STORE
   *
   * Estas variables son reactivas y se actualizan automáticamente
   * cuando cambian, triggereando re-renders en los componentes
   */

  // Usuario actualmente logueado (null si no hay usuario)
  const user = ref(null)

  // Estado de carga para mostrar spinners durante operaciones async
  const loading = ref(false)

  // Token de autenticación (simulado)
  const token = ref(null)

  // Tiempo de expiración de la sesión
  const sessionExpiry = ref(null)

  // Configuración de la sesión
  const sessionConfig = ref({
    timeout: 30 *
