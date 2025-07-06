/**
 * CONFIGURACIÓN DEL ROUTER DE VUE CON TYPESCRIPT
 *
 * Este archivo define todas las rutas de la aplicación y maneja:
 * - Navegación entre páginas con lazy loading
 * - Protección de rutas (autenticación y autorización)
 * - Guards de navegación con tipos seguros
 * - Manejo de errores de navegación
 */

import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import type { UserRole } from "@/types"

/**
 * DEFINICIÓN DE RUTAS CON TIPOS SEGUROS
 */
const routes: RouteRecordRaw[] = [
  /**
   * RUTA PRINCIPAL (HOME)
   */
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
    meta: {
      title: "Inicio - ULEAM Clínica Dental",
      description: "Clínica Dental Universitaria ULEAM - Atención odontológica de calidad",
      requiresAuth: false,
    },
  },

  /**
   * RUTA DE LOGIN
   */
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginPage.vue"),
    meta: {
      requiresGuest: true,
      title: "Iniciar Sesión - ULEAM Clínica Dental",
    },
  },

  /**
   * RUTA DE REGISTRO
   */
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterPage.vue"),
    meta: {
      requiresGuest: true,
      title: "Registro - ULEAM Clínica Dental",
    },
  },

  /**
   * RUTAS DEL DASHBOARD
   */
  {
    path: "/dashboard",
    component: () => import("@/layouts/DashboardLayout.vue"),
    meta: {
      requiresAuth: true,
      title: "Dashboard - ULEAM Clínica Dental",
    },
    children: [
      /**
       * DASHBOARD PRINCIPAL
       */
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/dashboard/DashboardPage.vue"),
        meta: {
          title: "Dashboard - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS PARA PACIENTES
       */
      {
        path: "my-appointments",
        name: "MyAppointments",
        component: () => import("@/views/dashboard/patient/MyAppointments.vue"),
        meta: {
          roles: ["patient"] as UserRole[],
          title: "Mis Citas - ULEAM Clínica Dental",
        },
      },
      {
        path: "book-appointment",
        name: "BookAppointment",
        component: () => import("@/views/dashboard/patient/BookAppointment.vue"),
        meta: {
          roles: ["patient"] as UserRole[],
          title: "Reservar Cita - ULEAM Clínica Dental",
        },
      },
      {
        path: "my-records",
        name: "MyRecords",
        component: () => import("@/views/dashboard/patient/MyRecords.vue"),
        meta: {
          roles: ["patient"] as UserRole[],
          title: "Mi Historial - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS PARA ESTUDIANTES
       */
      {
        path: "patients",
        name: "Patients",
        component: () => import("@/views/dashboard/student/Patients.vue"),
        meta: {
          roles: ["student"] as UserRole[],
          title: "Pacientes - ULEAM Clínica Dental",
        },
      },
      {
        path: "appointments",
        name: "Appointments",
        component: () => import("@/views/dashboard/student/Appointments.vue"),
        meta: {
          roles: ["student"] as UserRole[],
          title: "Citas - ULEAM Clínica Dental",
        },
      },
      {
        path: "clinical-cases",
        name: "ClinicalCases",
        component: () => import("@/views/dashboard/student/ClinicalCases.vue"),
        meta: {
          roles: ["student"] as UserRole[],
          title: "Casos Clínicos - ULEAM Clínica Dental",
        },
      },
      {
        path: "clinical-history",
        name: "ClinicalHistory",
        component: () => import("@/views/dashboard/student/ClinicalHistory.vue"),
        meta: {
          roles: ["student"] as UserRole[],
          title: "Historial Clínico - ULEAM Clínica Dental",
        },
      },
      {
        path: "academic",
        name: "Academic",
        component: () => import("@/views/dashboard/student/Academic.vue"),
        meta: {
          roles: ["student"] as UserRole[],
          title: "Académico - ULEAM Clínica Dental",
        },
      },
      {
        path: "odontogram",
        name: "Odontogram",
        component: () => import("@/views/dashboard/student/Odontogram.vue"),
        meta: {
          roles: ["student"] as UserRole[],
          title: "Odontograma - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS PARA PROFESORES
       */
      {
        path: "teacher",
        name: "Teacher",
        component: () => import("@/views/dashboard/professor/Teacher.vue"),
        meta: {
          roles: ["professor"] as UserRole[],
          title: "Panel Profesor - ULEAM Clínica Dental",
        },
      },
      {
        path: "teacher/students",
        name: "TeacherStudents",
        component: () => import("@/views/dashboard/professor/Students.vue"),
        meta: {
          roles: ["professor"] as UserRole[],
          title: "Estudiantes - ULEAM Clínica Dental",
        },
      },
      {
        path: "teacher/approvals",
        name: "TeacherApprovals",
        component: () => import("@/views/dashboard/professor/Approvals.vue"),
        meta: {
          roles: ["professor"] as UserRole[],
          title: "Aprobaciones - ULEAM Clínica Dental",
        },
      },
      {
        path: "specialty",
        name: "Specialty",
        component: () => import("@/views/dashboard/professor/Specialty.vue"),
        meta: {
          roles: ["professor"] as UserRole[],
          title: "Mi Especialidad - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS PARA ADMINISTRADORES
       */
      {
        path: "admin",
        name: "Admin",
        component: () => import("@/views/dashboard/admin/Admin.vue"),
        meta: {
          roles: ["admin"] as UserRole[],
          title: "Administración - ULEAM Clínica Dental",
        },
      },
      {
        path: "admin/users",
        name: "AdminUsers",
        component: () => import("@/views/dashboard/admin/Users.vue"),
        meta: {
          roles: ["admin"] as UserRole[],
          title: "Gestión de Usuarios - ULEAM Clínica Dental",
        },
      },
      {
        path: "admin/analytics",
        name: "AdminAnalytics",
        component: () => import("@/views/dashboard/admin/Analytics.vue"),
        meta: {
          roles: ["admin"] as UserRole[],
          title: "Analíticas - ULEAM Clínica Dental",
        },
      },

      /**
       * RUTAS COMUNES
       */
      {
        path: "specialties",
        name: "Specialties",
        component: () => import("@/views/dashboard/Specialties.vue"),
        meta: {
          title: "Especialidades - ULEAM Clínica Dental",
        },
      },
      {
        path: "my-profile",
        name: "MyProfile",
        component: () => import("@/views/dashboard/MyProfile.vue"),
        meta: {
          title: "Mi Perfil - ULEAM Clínica Dental",
        },
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/dashboard/Settings.vue"),
        meta: {
          title: "Configuración - ULEAM Clínica Dental",
        },
      },
    ],
  },

  /**
   * RUTA 404 - NO ENCONTRADO
   */
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundPage.vue"),
    meta: {
      title: "Página no encontrada - ULEAM Clínica Dental",
    },
  },
]

/**
 * CREAR INSTANCIA DEL ROUTER
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      }
    }
    return { top: 0 }
  },
})

/**
 * FUNCIÓN AUXILIAR PARA OBTENER RUTA POR DEFECTO SEGÚN ROL
 */
function getDefaultRouteForRole(role: UserRole): string {
  switch (role) {
    case "patient":
      return "/dashboard/my-appointments"
    case "student":
      return "/dashboard/patients"
    case "professor":
      return "/dashboard/teacher"
    case "admin":
      return "/dashboard/admin"
    default:
      return "/dashboard"
  }
}

/**
 * GUARD DE NAVEGACIÓN GLOBAL - BEFORE EACH
 */
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // Obtener store de autenticación
  const authStore = useAuthStore()

  try {
    console.log(`🔄 Navegando de ${from.path} a ${to.path}`)
    console.log(`👤 Usuario autenticado:`, authStore.isAuthenticated)
    console.log(`🎭 Rol del usuario:`, authStore.userRole)

    /**
     * VERIFICAR RUTAS QUE REQUIEREN SER INVITADO (no autenticado)
     */
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
      console.log(`🚫 Ruta ${to.path} requiere ser invitado, pero usuario está autenticado`)
      next({ name: "Dashboard", replace: true })
      return
    }

    /**
     * VERIFICAR RUTAS QUE REQUIEREN AUTENTICACIÓN
     */
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      console.log(`🔒 Ruta ${to.path} requiere autenticación`)
      next({
        name: "Login",
        query: { redirect: to.fullPath },
        replace: true,
      })
      return
    }

    /**
     * VERIFICAR AUTORIZACIÓN POR ROLES
     */
    if (to.meta.roles && authStore.user) {
      const requiredRoles = to.meta.roles as UserRole[]
      const userRole = authStore.userRole

      if (userRole && !requiredRoles.includes(userRole)) {
        console.log(
          `🚫 Usuario con rol '${userRole}' no tiene acceso a ruta que requiere roles: ${requiredRoles.join(", ")}`,
        )

        // Redirigir a la página apropiada según el rol
        const redirectPath = getDefaultRouteForRole(userRole)
        next({ path: redirectPath, replace: true })
        return
      }
    }

    // Si todas las verificaciones pasan, continuar
    console.log(`✅ Acceso permitido a ${to.path}`)
    next()
  } catch (error) {
    console.error("❌ Error en guard de navegación:", error)
    next({ name: "Login", replace: true })
  }
})

/**
 * GUARD DE NAVEGACIÓN GLOBAL - AFTER EACH
 */
router.afterEach((to, from) => {
  // Actualizar título de la página
  if (to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = "ULEAM Clínica Dental"
  }

  // Actualizar meta description
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", to.meta.description as string)
    }
  }

  console.log(`✅ Navegación completada: ${from.path} → ${to.path}`)
})

/**
 * MANEJO DE ERRORES DE NAVEGACIÓN
 */
router.onError((error) => {
  console.error("❌ Error de navegación:", error)

  // En producción, enviar error a servicio de monitoreo
  if (import.meta.env.PROD) {
    // Enviar a Sentry, LogRocket, etc.
  }
})

export default router
