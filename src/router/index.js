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
    meta: {
      title: "Inicio - ULEAM Clínica Dental",
      description: "Clínica Dental Universitaria ULEAM - Atención odontológica de calidad",
    },
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
    meta: {
      requiresGuest: true,
      title: "Iniciar Sesión - ULEAM Clínica Dental",
    },
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
    meta: {
      requiresGuest: true,
      title: "Registro - ULEAM Clínica Dental",
    },
  },

  /**
   * RUTAS DEL DASHBOARD
   * Área privada de la aplicación con layout específico
   * Todas las rutas hijas requieren autenticación
   */
  {
    path: "/dashboard",
    component: () => import("../layouts/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      /**
       * DASHBOARD PRINCIPAL
       * Redirige automáticamente según el rol del usuario
       */
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/dashboard/DashboardPage.vue"),
        meta: {
          title: "Dashboard - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS PARA PACIENTES
       * Solo accesibles por usuarios con rol 'patient'
       */
      {
        path: "my-appointments",
        name: "MyAppointments",
        component: () => import("../views/dashboard/patient/MyAppointments.vue"),
        meta: {
          roles: ["patient"],
          title: "Mis Citas - ULEAM Clínica Dental",
        },
      },
      {
        path: "book-appointment",
        name: "BookAppointment",
        component: () => import("../views/dashboard/patient/BookAppointment.vue"),
        meta: {
          roles: ["patient"],
          title: "Reservar Cita - ULEAM Clínica Dental",
        },
      },
      {
        path: "my-records",
        name: "MyRecords",
        component: () => import("../views/dashboard/patient/MyRecords.vue"),
        meta: {
          roles: ["patient"],
          title: "Mi Historial - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS PARA ESTUDIANTES
       * Solo accesibles por usuarios con rol 'student'
       */
      {
        path: "patients",
        name: "Patients",
        component: () => import("../views/dashboard/student/Patients.vue"),
        meta: {
          roles: ["student"],
          title: "Pacientes - ULEAM Clínica Dental",
        },
      },
      {
        path: "appointments",
        name: "Appointments",
        component: () => import("../views/dashboard/student/Appointments.vue"),
        meta: {
          roles: ["student"],
          title: "Citas - ULEAM Clínica Dental",
        },
      },
      {
        path: "clinical-cases",
        name: "ClinicalCases",
        component: () => import("../views/dashboard/student/ClinicalCases.vue"),
        meta: {
          roles: ["student"],
          title: "Casos Clínicos - ULEAM Clínica Dental",
        },
      },
      {
        path: "clinical-history",
        name: "ClinicalHistory",
        component: () => import("../views/dashboard/student/ClinicalHistory.vue"),
        meta: {
          roles: ["student"],
          title: "Historial Clínico - ULEAM Clínica Dental",
        },
      },
      {
        path: "academic",
        name: "Academic",
        component: () => import("../views/dashboard/student/Academic.vue"),
        meta: {
          roles: ["student"],
          title: "Académico - ULEAM Clínica Dental",
        },
      },
      {
        path: "odontogram",
        name: "Odontogram",
        component: () => import("../views/dashboard/student/Odontogram.vue"),
        meta: {
          roles: ["student"],
          title: "Odontograma - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS PARA PROFESORES
       * Solo accesibles por usuarios con rol 'professor'
       */
      {
        path: "teacher",
        name: "Teacher",
        component: () => import("../views/dashboard/professor/Teacher.vue"),
        meta: {
          roles: ["professor"],
          title: "Panel Profesor - ULEAM Clínica Dental",
        },
      },
      {
        path: "teacher/students",
        name: "TeacherStudents",
        component: () => import("../views/dashboard/professor/Students.vue"),
        meta: {
          roles: ["professor"],
          title: "Estudiantes - ULEAM Clínica Dental",
        },
      },
      {
        path: "teacher/approvals",
        name: "TeacherApprovals",
        component: () => import("../views/dashboard/professor/Approvals.vue"),
        meta: {
          roles: ["professor"],
          title: "Aprobaciones - ULEAM Clínica Dental",
        },
      },
      {
        path: "specialty",
        name: "Specialty",
        component: () => import("../views/dashboard/professor/Specialty.vue"),
        meta: {
          roles: ["professor"],
          title: "Mi Especialidad - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS PARA ADMINISTRADORES
       * Solo accesibles por usuarios con rol 'admin'
       */
      {
        path: "admin",
        name: "Admin",
        component: () => import("../views/dashboard/admin/Admin.vue"),
        meta: {
          roles: ["admin"],
          title: "Administración - ULEAM Clínica Dental",
        },
      },
      {
        path: "admin/users",
        name: "AdminUsers",
        component: () => import("../views/dashboard/admin/Users.vue"),
        meta: {
          roles: ["admin"],
          title: "Gestión de Usuarios - ULEAM Clínica Dental",
        },
      },
      {
        path: "admin/analytics",
        name: "AdminAnalytics",
        component: () => import("../views/dashboard/admin/Analytics.vue"),
        meta: {
          roles: ["admin"],
          title: "Analíticas - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS COMUNES
       * Accesibles por todos los usuarios autenticados
       */
      {
        path: "specialties",
        name: "Specialties",
        component: () => import("../views/dashboard/Specialties.vue"),
        meta: {
          title: "Especialidades - ULEAM Clínica Dental",
        },
      },
      {
        path: "my-profile",
        name: "MyProfile",
        component: () => import("../views/dashboard/MyProfile.vue"),
        meta: {
          title: "Mi Perfil - ULEAM Clínica Dental",
        },
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../views/dashboard/Settings.vue"),
        meta: {
          title: "Configuración - ULEAM Clínica Dental",
        },
      },
    ],
  },

  /**
   * RUTA 404 - NO ENCONTRADO
   * Maneja rutas que no existen
   */
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundPage.vue"),
    meta: {
      title: "Página no encontrada - ULEAM Clínica Dental",
    },
  },
]

/**
 * CREAR INSTANCIA DEL ROUTER
 *
 * Configurar el router con:
 * - Historial del navegador (URLs limpias sin #)
 * - Rutas definidas arriba
 * - Comportamiento de scroll
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Configurar comportamiento del scroll
  scrollBehavior(to, from, savedPosition) {
    // Si hay una posición guardada (botón atrás), restaurarla
    if (savedPosition) {
      return savedPosition
    }
    // Si hay un hash, ir a ese elemento
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      }
    }
    // Por defecto, ir al inicio de la página
    return { top: 0 }
  },
})

/**
 * GUARD DE NAVEGACIÓN GLOBAL - BEFORE EACH
 *
 * Se ejecuta antes de cada cambio de ruta para:
 * - Verificar autenticación
 * - Verificar autorización por roles
 * - Redirigir usuarios según su estado
 * - Actualizar título de la página
 */
router.beforeEach(async (to, from, next) => {
  // Obtener store de autenticación
  const authStore = useAuthStore()

  // Mostrar indicador de carga (opcional)
  if (typeof window !== "undefined") {
    document.body.classList.add("loading")
  }

  /**
   * VERIFICAR AUTENTICACIÓN REQUERIDA
   * Si la ruta requiere autenticación y el usuario no está logueado
   */
  if (to.meta.requiresAuth && !authStore.user) {
    // Redirigir a login con la ruta de destino como query param
    next({
      name: "Login",
      query: { redirect: to.fullPath },
      replace: true,
    })
    return
  }

  /**
   * VERIFICAR RUTAS SOLO PARA INVITADOS
   * Si la ruta es solo para no autenticados y el usuario está logueado
   */
  if (to.meta.requiresGuest && authStore.user) {
    // Redirigir al dashboard
    next({ name: "Dashboard", replace: true })
    return
  }

  /**
   * VERIFICAR AUTORIZACIÓN POR ROLES
   * Si la ruta especifica roles y el usuario no tiene el rol requerido
   */
  if (to.meta.roles && authStore.user && !to.meta.roles.includes(authStore.user.role)) {
    // Redirigir al dashboard principal con mensaje de error
    console.warn(
      `Acceso denegado: usuario con rol '${authStore.user.role}' intentó acceder a ruta que requiere roles: ${to.meta.roles.join(", ")}`,
    )
    next({ name: "Dashboard", replace: true })
    return
  }

  // Si todas las verificaciones pasan, continuar con la navegación
  next()
})

/**
 * GUARD DE NAVEGACIÓN GLOBAL - AFTER EACH
 *
 * Se ejecuta después de cada cambio de ruta para:
 * - Actualizar título de la página
 * - Limpiar indicadores de carga
 * - Registrar analytics
 */
router.afterEach((to, from) => {
  // Actualizar título de la página
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = "ULEAM Clínica Dental"
  }

  // Actualizar meta description
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description)
    }
  }

  // Quitar indicador de carga
  if (typeof window !== "undefined") {
    document.body.classList.remove("loading")
  }

  // Registrar navegación en analytics (en producción)
  if (import.meta.env.PROD) {
    // Aquí se registraría la navegación en Google Analytics, etc.
    console.log(`Navegación: ${from.path} → ${to.path}`)
  }
})

/**
 * GUARD DE ERROR GLOBAL
 *
 * Maneja errores durante la navegación
 */
router.onError((error) => {
  console.error("Error de navegación:", error)

  // En producción, enviar error a servicio de monitoreo
  if (import.meta.env.PROD) {
    // Enviar a Sentry, LogRocket, etc.
  }
})

// Exportar router para uso en main.js
export default router
