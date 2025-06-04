"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "./login-form"
import { AuthWrapper } from "@/components/auth-wrapper"

export default function LoginPage() {
  const router = useRouter()
  const { user, isInitialized } = useAuth()

  useEffect(() => {
    // Only redirect if auth is initialized and user exists
    if (isInitialized && user) {
      console.log("🔐 User already logged in, redirecting to dashboard")
      router.replace("/dashboard")
    }
  }, [user, isInitialized, router])

  return (
    <AuthWrapper>
      <div className="min-h-screen flex items-center justify-center medical-gradient">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </AuthWrapper>
  )
}
