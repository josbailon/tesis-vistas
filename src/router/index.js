/**
 * CONFIGURACIÓN DEL ROUTER DE VUE
 *
 * Este archivo define todas las rutas de la aplicación y maneja:
 * - Navegación entre páginas
 * - Protección de rutas (autenticación y autorización)
 * - Lazy loading de componentes
 * - Guards de navegación
 */

// Importar funciones de Vue Router
import { createRouter, createWebHistory } from "vue-router"
// Importar store de autenticación para verificar permisos
import { useAuthStore } from "../stores/auth"

/**
 * DEFINICIÓN DE RUTAS
 *
 * Cada ruta define:
 * - path: URL de la ruta
 * - name: nombre único para referencia
 * - component: componente a renderizar (con lazy loading)
 * - meta: metadatos para guards (requiresAuth, roles, etc.)
 */
const routes = [
  /**
   * RUTA PRINCIPAL (HOME)
   * Página de inicio pública con información de la clínica
   */
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomePage.vue"),
  },

  /**
   * RUTA DE LOGIN
   * Página de inicio de sesión
   * Solo accesible para usuarios no autenticados
   */
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
    meta: { requiresGuest: true }, // Solo usuarios no logueados
  },

  /**
   * RUTA DE REGISTRO
   * Página de registro de nuevos usuarios
   * Solo accesible para usuarios no autenticados
   */
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterPage.vue"),
    meta: { requiresGuest: true },
  },

  /**
   * RUTAS DEL DASHBOARD
   * Área privada de la aplicación con layout específico
   * Todas las rutas hijas requieren autenticación
   */
  {
    path: "/dashboard",
    component: () => import("../layouts/DashboardLayout.vue"),
    meta: { requiresAuth: true }, // Requiere autenticación
    children: [
      /**
       * DASHBOARD PRINCIPAL
       * Redirige automáticamente según el rol del usuario
       */
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/dashboard/DashboardPage.vue"),
      },

      /**
       * RUTAS PARA PACIENTES
       * Solo accesibles por usuarios con rol 'patient'
       */
      {
        path: "my-appointments",
        name: "MyAppointments",
        component: () => import("../views/dashboard/patient/MyAppointments.vue"),
        meta: { roles: ["patient"] },
      },
      {
        path: "book-appointment",
        name: "BookAppointment",
        component: () => import("../views/dashboard/patient/BookAppointment.vue"),
        meta: { roles: ["patient"] },
      },
      {
        path: "my-records",
        name: "MyRecords",
        component: () => import("../views/dashboard/patient/MyRecords.vue"),
        meta: { roles: ["patient"] },
      },

      /**
       * RUTAS PARA ESTUDIANTES
       * Solo accesibles por usuarios con rol 'student'
       */
      {
        path: "patients",
        name: "Patients",
        component: () => import("../views/dashboard/student/Patients.vue"),
        meta: { roles: ["student"] },
      },
      {
        path: "appointments",
        name: "Appointments",
        component: () => import("../views/dashboard/student/Appointments.vue"),
        meta: { roles: ["student"] },
      },
      {
        path: "clinical-cases",
        name: "ClinicalCases",
        component: () => import("../views/dashboard/student/ClinicalCases.vue"),
        meta: { roles: ["student"] },
      },
      {
        path: "clinical-history",
        name: "ClinicalHistory",
        component: () => import("../views/dashboard/student/ClinicalHistory.vue"),
        meta: { roles: ["student"] },
      },
      {
        path: "academic",
        name: "Academic",
        component: () => import("../views/dashboard/student/Academic.vue"),
        meta: { roles: ["student"] },
      },
      {
        path: "odontogram",
        name: "Odontogram",
        component: () => import("../views/dashboard/student/Odontogram.vue"),
        meta: { roles: ["student"] },
      },

      /**
       * RUTAS PARA PROFESORES
       * Solo accesibles por usuarios con rol 'professor'
       */
      {
        path: "teacher",
        name: "Teacher",
        component: () => import("../views/dashboard/professor/Teacher.vue"),
        meta: { roles: ["professor"] },
      },
      {
        path: "teacher/students",
        name: "TeacherStudents",
        component: () => import("../views/dashboard/professor/Students.vue"),
        meta: { roles: ["professor"] },
      },
      {
        path: "teacher/approvals",
        name: "TeacherApprovals",
        component: () => import("../views/dashboard/professor/Approvals.vue"),
        meta: { roles: ["professor"] },
      },
      {
        path: "specialty",
        name: "Specialty",
        component: () => import("../views/dashboard/professor/Specialty.vue"),
        meta: { roles: ["professor"] },
      },

      /**
       * RUTAS PARA ADMINISTRADORES
       * Solo accesibles por usuarios con rol 'admin'
       */
      {
        path: "admin",
        name: "Admin",
        component: () => import("../views/dashboard/admin/Admin.vue"),
        meta: { roles: ["admin"] },
      },
      {
        path: "admin/users",
        name: "AdminUsers",
        component: () => import("../views/dashboard/admin/Users.vue"),
        meta: { roles: ["admin"] },
      },
      {
        path: "admin/analytics",
        name: "AdminAnalytics",
        component: () => import("../views/dashboard/admin/Analytics.vue"),
        meta: { roles: ["admin"] },
      },

      /**
       * RUTAS COMUNES
       * Accesibles por todos los usuarios autenticados
       */
      {
        path: "specialties",
        name: "Specialties",
        component: () => import("../views/dashboard/Specialties.vue"),
      },
      {
        path: "my-profile",
        name: "MyProfile",
        component: () => import("../views/dashboard/MyProfile.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../views/dashboard/Settings.vue"),
      },
    ],
  },
]

/**
 * CREAR INSTANCIA DEL ROUTER
 *
 * Configurar el router con:
 * - Historial del navegador (URLs limpias sin #)
 * - Rutas definidas arriba
 */
const router = createRouter({
  history: createWebHistory(), // Usar HTML5 History API
  routes, // Rutas definidas
})

/**
 * GUARD DE NAVEGACIÓN GLOBAL
 *
 * Se ejecuta antes de cada cambio de ruta para:
 * - Verificar autenticación
 * - Verificar autorización por roles
 * - Redirigir usuarios según su estado
 */
router.beforeEach((to, from, next) => {
  // Obtener store de autenticación
  const authStore = useAuthStore()

  /**
   * VERIFICAR AUTENTICACIÓN REQUERIDA
   * Si la ruta requiere autenticación y el usuario no está logueado
   */
  if (to.meta.requiresAuth && !authStore.user) {
    // Redirigir a login con la ruta de destino como query param
    next({ name: "Login", query: { redirect: to.fullPath } })
    return
  }

  /**
   * VERIFICAR RUTAS SOLO PARA INVITADOS
   * Si la ruta es solo para no autenticados y el usuario está logueado
   */
  if (to.meta.requiresGuest && authStore.user) {
    // Redirigir al dashboard
    next({ name: "Dashboard" })
    return
  }

  /**
   * VERIFICAR AUTORIZACIÓN POR ROLES
   * Si la ruta especifica roles y el usuario no tiene el rol requerido
   */
  if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
    // Redirigir al dashboard principal
    next({ name: "Dashboard" })
    return
  }

  // Si todas las verificaciones pasan, continuar con la navegación
  next()
})

// Exportar router para uso en main.js
export default router
