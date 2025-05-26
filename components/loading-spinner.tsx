interface LoadingSpinnerProps {
  message?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ message = "Cargando...", size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}></div>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  )
}
