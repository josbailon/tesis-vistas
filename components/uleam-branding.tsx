"use client"

import { cn } from "@/lib/utils"

interface UleamBrandingProps {
  variant?: "header" | "sidebar" | "footer" | "logo-only"
  className?: string
}

export function UleamBranding({ variant = "header", className }: UleamBrandingProps) {
  if (variant === "logo-only") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">🦷</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "sidebar") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <UleamBranding variant="logo-only" />
        <div>
          <h3 className="font-bold text-sm text-blue-900">ULEAM</h3>
          <p className="text-xs text-muted-foreground">Clínica Dental</p>
        </div>
      </div>
    )
  }

  if (variant === "footer") {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <UleamBranding variant="logo-only" />
        <div className="text-center">
          <h3 className="font-bold text-lg text-blue-900">ULEAM</h3>
          <p className="text-sm text-muted-foreground">Universidad Laica Eloy Alfaro de Manabí</p>
          <p className="text-xs text-muted-foreground">Clínica Dental Universitaria</p>
        </div>
      </div>
    )
  }

  // variant === "header"
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative">
        <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <span className="text-white font-bold text-xl">U</span>
        </div>
        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
          <span className="text-white text-sm">🦷</span>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-2xl text-white">ULEAM</h1>
        <p className="text-blue-100 text-sm">Universidad Laica Eloy Alfaro de Manabí</p>
        <p className="text-blue-200 text-xs">Clínica Dental Universitaria</p>
      </div>
    </div>
  )
}
