import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppointmentProvider } from "@/contexts/appointment-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Appointment Management System",
  description: "A comprehensive appointment management system with student portal",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppointmentProvider>
          {children}
          <Toaster />
        </AppointmentProvider>
      </body>
    </html>
  )
}
