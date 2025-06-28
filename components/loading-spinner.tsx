import { Loader2 } from "lucide-react"
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
    default: "text-blue-600",
    medical: "text-teal-600",
    minimal: "text-gray-400",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      <Loader2 className={cn("animate-spin", sizeClasses[size], variantClasses[variant])} />
      {text && (
        <p className={cn("text-sm font-medium", variant === "medical" ? "text-teal-700" : "text-gray-600")}>{text}</p>
      )}
    </div>
  )
}
