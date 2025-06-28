"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

interface UleamBrandingProps {
  variant?: "light" | "dark"
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
}

const UleamBranding = memo(function UleamBranding({
  variant = "dark",
  size = "md",
  className,
  showText = true,
}: UleamBrandingProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  const subtextSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  const textColor = variant === "light" ? "text-white" : "text-gray-900"
  const subtextColor = variant === "light" ? "text-blue-100" : "text-gray-600"

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="relative">
        <div className={cn("rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 p-2 shadow-lg", sizeClasses[size])}>
          <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
            <span className="font-bold text-blue-600 text-sm">U</span>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-white" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <h1 className={cn("font-bold leading-tight", textSizeClasses[size], textColor)}>ULEAM</h1>
          <p className={cn("leading-tight", subtextSizeClasses[size], subtextColor)}>Clínica Dental</p>
        </div>
      )}
    </div>
  )
})

UleamBranding.displayName = "UleamBranding"

export { UleamBranding }
