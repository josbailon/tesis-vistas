import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/auth"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterPage.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    component: () => import("../layouts/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/dashboard/DashboardPage.vue"),
      },
      // Patient routes
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
        path: "my-profile",
        name: "MyProfile",
        component: () => import("../views/dashboard/MyProfile.vue"),
      },
      {
        path: "my-records",
        name: "MyRecords",
        component: () => import("../views/dashboard/patient/MyRecords.vue"),
        meta: { roles: ["patient"] },
      },
      // Student routes
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
      // Professor routes
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
      // Admin routes
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
      // Common routes
      {
        path: "specialties",
        name: "Specialties",
        component: () => import("../views/dashboard/Specialties.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../views/dashboard/Settings.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: "Login", query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && authStore.user) {
    next({ name: "Dashboard" })
  } else if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
    next({ name: "Dashboard" })
  } else {
    next()
  }
})

export default router
