"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  text?: string
  variant?: "default" | "medical" | "minimal"
}

const LoadingSpinner = memo(function LoadingSpinner({
  size = "md",
  className,
  text,
  variant = "default",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  if (variant === "minimal") {
    return (
      <div className={cn("inline-block", className)}>
        <div
          className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-blue-600", sizeClasses[size])}
        />
      </div>
    )
  }

  if (variant === "medical") {
    return (
      <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
        <div className="relative">
          <div
            className={cn("animate-spin rounded-full border-4 border-blue-100 border-t-blue-600", sizeClasses[size])}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          </div>
        </div>
        {text && <p className={cn("text-blue-700 font-medium animate-pulse", textSizeClasses[size])}>{text}</p>}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      <div className="relative">
        <div className={cn("animate-spin rounded-full border-4 border-blue-100", sizeClasses[size])}>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping opacity-75" />
        </div>
      </div>
      {text && (
        <div className="text-center">
          <p className={cn("text-blue-700 font-medium", textSizeClasses[size])}>{text}</p>
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      )}
    </div>
  )
})

LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner }
