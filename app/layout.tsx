import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppointmentProvider } from "@/contexts/appointment-context"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Clínica Dental ULEAM",
  description: "Sistema de gestión para la Clínica Dental Universitaria ULEAM",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <AppointmentProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </AppointmentProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
