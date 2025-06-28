import { cn } from "@/lib/utils"
import { GraduationCap, Heart } from "lucide-react"

interface UleamBrandingProps {
  variant?: "full" | "compact" | "icon"
  className?: string
}

export function UleamBranding({ variant = "full", className }: UleamBrandingProps) {
  if (variant === "icon") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
            <GraduationCap className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
            <GraduationCap className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">ULEAM</h2>
          <p className="text-xs text-gray-600">Clínica Dental</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("text-center", className)}>
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">ULEAM</h1>
        <p className="text-sm text-gray-600 mb-1">Universidad Laica Eloy Alfaro de Manabí</p>
        <p className="text-xs text-gray-500">Clínica Dental Universitaria</p>
      </div>
    </div>
  )
}
