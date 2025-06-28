import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { AppointmentProvider } from "@/contexts/appointment-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Gestión Dental ULEAM",
  description: "Sistema integral para la gestión de la clínica dental de la Universidad Laica Eloy Alfaro de Manabí",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <AppointmentProvider>
              {children}
              <Toaster />
            </AppointmentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
