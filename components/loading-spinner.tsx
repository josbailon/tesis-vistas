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
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const variantClasses = {
    default: "border-blue-600 border-t-transparent",
    medical: "border-green-600 border-t-transparent",
    minimal: "border-gray-400 border-t-transparent",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      <div className={cn("animate-spin rounded-full border-2", sizeClasses[size], variantClasses[variant])} />
      {text && <p className="text-sm text-gray-600 animate-pulse">{text}</p>}
    </div>
  )
}
