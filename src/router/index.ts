import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import type { RouteRecordRaw } from "vue-router"

// Lazy load components for better performance
const HomePage = () => import("@/views/HomePage.vue")
const LoginPage = () => import("@/views/LoginPage.vue")
const RegisterPage = () => import("@/views/RegisterPage.vue")
const DashboardLayout = () => import("@/layouts/DashboardLayout.vue")
const DashboardPage = () => import("@/views/dashboard/DashboardPage.vue")
const MyProfile = () => import("@/views/dashboard/MyProfile.vue")
const Settings = () => import("@/views/dashboard/Settings.vue")
const Specialties = () => import("@/views/dashboard/Specialties.vue")

// Admin views
const AdminDashboard = () => import("@/views/dashboard/admin/Admin.vue")
const AdminUsers = () => import("@/views/dashboard/admin/Users.vue")
const AdminAnalytics = () => import("@/views/dashboard/admin/Analytics.vue")

// Professor views
const ProfessorDashboard = () => import("@/views/dashboard/professor/Teacher.vue")
const ProfessorStudents = () => import("@/views/dashboard/professor/Students.vue")
const ProfessorApprovals = () => import("@/views/dashboard/professor/Approvals.vue")
const ProfessorSpecialty = () => import("@/views/dashboard/professor/Specialty.vue")

// Student views
const StudentDashboard = () => import("@/views/dashboard/student/Academic.vue")
const StudentAppointments = () => import("@/views/dashboard/student/Appointments.vue")
const StudentPatients = () => import("@/views/dashboard/student/Patients.vue")
const StudentClinicalCases = () => import("@/views/dashboard/student/ClinicalCases.vue")
const StudentClinicalHistory = () => import("@/views/dashboard/student/ClinicalHistory.vue")
const StudentOdontogram = () => import("@/views/dashboard/student/Odontogram.vue")

// Patient views
const PatientDashboard = () => import("@/views/dashboard/patient/MyAppointments.vue")
const PatientBookAppointment = () => import("@/views/dashboard/patient/BookAppointment.vue")
const PatientRecords = () => import("@/views/dashboard/patient/MyRecords.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    meta: {
      title: "Inicio",
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      title: "Iniciar Sesión",
      requiresAuth: false,
      hideForAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      title: "Registro",
      requiresAuth: false,
      hideForAuth: true,
    },
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "dashboard",
        component: DashboardPage,
        meta: {
          title: "Dashboard",
          roles: ["admin", "profesor", "estudiante", "paciente", "secretario"],
        },
      },
      {
        path: "profile",
        name: "profile",
        component: MyProfile,
        meta: {
          title: "Mi Perfil",
          roles: ["admin", "profesor", "estudiante", "paciente", "secretario"],
        },
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
        meta: {
          title: "Configuración",
          roles: ["admin", "profesor", "estudiante", "paciente", "secretario"],
        },
      },
      {
        path: "specialties",
        name: "specialties",
        component: Specialties,
        meta: {
          title: "Especialidades",
          roles: ["admin", "profesor", "estudiante"],
        },
      },
      // Admin routes
      {
        path: "admin",
        name: "admin",
        component: AdminDashboard,
        meta: {
          title: "Administración",
          roles: ["admin"],
        },
      },
      {
        path: "admin/users",
        name: "admin-users",
        component: AdminUsers,
        meta: {
          title: "Gestión de Usuarios",
          roles: ["admin"],
        },
      },
      {
        path: "admin/analytics",
        name: "admin-analytics",
        component: AdminAnalytics,
        meta: {
          title: "Analíticas",
          roles: ["admin"],
        },
      },
      // Professor routes
      {
        path: "professor",
        name: "professor",
        component: ProfessorDashboard,
        meta: {
          title: "Panel Profesor",
          roles: ["profesor"],
        },
      },
      {
        path: "professor/students",
        name: "professor-students",
        component: ProfessorStudents,
        meta: {
          title: "Mis Estudiantes",
          roles: ["profesor"],
        },
      },
      {
        path: "professor/approvals",
        name: "professor-approvals",
        component: ProfessorApprovals,
        meta: {
          title: "Aprobaciones",
          roles: ["profesor"],
        },
      },
      {
        path: "professor/specialty",
        name: "professor-specialty",
        component: ProfessorSpecialty,
        meta: {
          title: "Mi Especialidad",
          roles: ["profesor"],
        },
      },
      // Student routes
      {
        path: "student",
        name: "student",
        component: StudentDashboard,
        meta: {
          title: "Panel Estudiante",
          roles: ["estudiante"],
        },
      },
      {
        path: "student/appointments",
        name: "student-appointments",
        component: StudentAppointments,
        meta: {
          title: "Mis Citas",
          roles: ["estudiante"],
        },
      },
      {
        path: "student/patients",
        name: "student-patients",
        component: StudentPatients,
        meta: {
          title: "Mis Pacientes",
          roles: ["estudiante"],
        },
      },
      {
        path: "student/clinical-cases",
        name: "student-clinical-cases",
        component: StudentClinicalCases,
        meta: {
          title: "Casos Clínicos",
          roles: ["estudiante"],
        },
      },
      {
        path: "student/clinical-history",
        name: "student-clinical-history",
        component: StudentClinicalHistory,
        meta: {
          title: "Historia Clínica",
          roles: ["estudiante"],
        },
      },
      {
        path: "student/odontogram",
        name: "student-odontogram",
        component: StudentOdontogram,
        meta: {
          title: "Odontograma",
          roles: ["estudiante"],
        },
      },
      // Patient routes
      {
        path: "patient",
        name: "patient",
        component: PatientDashboard,
        meta: {
          title: "Mis Citas",
          roles: ["paciente"],
        },
      },
      {
        path: "patient/book-appointment",
        name: "patient-book-appointment",
        component: PatientBookAppointment,
        meta: {
          title: "Agendar Cita",
          roles: ["paciente"],
        },
      },
      {
        path: "patient/records",
        name: "patient-records",
        component: PatientRecords,
        meta: {
          title: "Mis Registros",
          roles: ["paciente"],
        },
      },
    ],
  },
  // Catch all route - must be last
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Set page title
  if (to.meta.title) {
    document.title = `${to.meta.title} - Sistema Dental ULEAM`
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Redirect to login with return url
      next({
        name: "login",
        query: { redirect: to.fullPath },
      })
      return
    }

    // Check role-based access
    if (to.meta.roles && Array.isArray(to.meta.roles)) {
      const userRole = authStore.userRole
      if (!userRole || !to.meta.roles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        const dashboardRoute = getDashboardRouteForRole(userRole)
        next({ name: dashboardRoute })
        return
      }
    }

    // Refresh session activity
    authStore.refreshSession()
  }

  // Hide routes for authenticated users (like login, register)
  if (to.meta.hideForAuth && authStore.isAuthenticated) {
    const userRole = authStore.userRole
    const dashboardRoute = getDashboardRouteForRole(userRole)
    next({ name: dashboardRoute })
    return
  }

  next()
})

// Helper function to get dashboard route based on role
function getDashboardRouteForRole(role: string | null): string {
  switch (role) {
    case "admin":
      return "admin"
    case "profesor":
      return "professor"
    case "estudiante":
      return "student"
    case "paciente":
      return "patient"
    case "secretario":
      return "dashboard" // Secretary uses general dashboard
    default:
      return "dashboard"
  }
}

export default router
