"use client"

import { cn } from "@/lib/utils"

export type TrafficLightStatus = "available" | "pending" | "unavailable"

interface TrafficLightProps {
  status: TrafficLightStatus
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

const statusConfig = {
  available: {
    color: "bg-green-500",
    label: "Disponible",
    description: "Sistema funcionando correctamente",
  },
  pending: {
    color: "bg-yellow-500",
    label: "Pendiente",
    description: "Requiere atención",
  },
  unavailable: {
    color: "bg-red-500",
    label: "No disponible",
    description: "Sistema ocupado o con problemas",
  },
}

const sizeConfig = {
  sm: {
    container: "w-6 h-16",
    light: "w-4 h-4",
    text: "text-xs",
  },
  md: {
    container: "w-8 h-20",
    light: "w-5 h-5",
    text: "text-sm",
  },
  lg: {
    container: "w-12 h-28",
    light: "w-8 h-8",
    text: "text-base",
  },
}

export function TrafficLight({ status, size = "md", showLabel = false, className }: TrafficLightProps) {
  const config = statusConfig[status]
  const sizes = sizeConfig[size]

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      {/* Traffic Light Container */}
      <div className={cn("bg-gray-800 rounded-lg p-1 flex flex-col items-center justify-between", sizes.container)}>
        {/* Red Light */}
        <div
          className={cn(
            "rounded-full border border-gray-600",
            sizes.light,
            status === "unavailable" ? "bg-red-500 shadow-red-500/50 shadow-lg" : "bg-red-900/30",
          )}
        />

        {/* Yellow Light */}
        <div
          className={cn(
            "rounded-full border border-gray-600",
            sizes.light,
            status === "pending" ? "bg-yellow-500 shadow-yellow-500/50 shadow-lg" : "bg-yellow-900/30",
          )}
        />

        {/* Green Light */}
        <div
          className={cn(
            "rounded-full border border-gray-600",
            sizes.light,
            status === "available" ? "bg-green-500 shadow-green-500/50 shadow-lg" : "bg-green-900/30",
          )}
        />
      </div>

      {/* Label */}
      {showLabel && (
        <div className="text-center">
          <p className={cn("font-medium", sizes.text)}>{config.label}</p>
          <p className={cn("text-gray-600", sizes.text)}>{config.description}</p>
        </div>
      )}
    </div>
  )
}

// Traffic Light with tooltip
export function TrafficLightWithTooltip({ status, size = "md", className }: TrafficLightProps) {
  const config = statusConfig[status]

  return (
    <div className={cn("group relative", className)}>
      <TrafficLight status={status} size={size} />

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        <div className="font-medium">{config.label}</div>
        <div className="text-xs text-gray-300">{config.description}</div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  )
}
