"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  variant?: "default" | "medical" | "minimal"
  className?: string
}

export function LoadingSpinner({ size = "md", text, variant = "default", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const variantClasses = {
    default: "border-blue-200 border-t-blue-600",
    medical: "border-green-200 border-t-green-600",
    minimal: "border-gray-200 border-t-gray-600",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className={cn("animate-spin rounded-full border-4", sizeClasses[size], variantClasses[variant])} />
      {text && (
        <p
          className={cn(
            "mt-2 font-medium",
            variant === "medical" ? "text-green-800" : variant === "minimal" ? "text-gray-600" : "text-blue-800",
            size === "lg" ? "text-lg" : size === "md" ? "text-base" : "text-sm",
          )}
        >
          {text}
        </p>
      )}
    </div>
  )
}
