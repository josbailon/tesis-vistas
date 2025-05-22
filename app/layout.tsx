import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SessionCheck from "@/components/session-check"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Clínica Dental",
  description: "Sistema de gestión para clínica dental universitaria",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionCheck>{children}</SessionCheck>
        </ThemeProvider>
      </body>
    </html>
  )
}
