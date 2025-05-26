"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ErrorDisplayProps {
  title?: string
  message: string
  showBackButton?: boolean
  backButtonLabel?: string
  backButtonPath?: string
}

export function ErrorDisplay({
  title = "Error",
  message,
  showBackButton = true,
  backButtonLabel = "Volver al Dashboard",
  backButtonPath = "/dashboard",
}: ErrorDisplayProps) {
  const router = useRouter()

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        {showBackButton && (
          <div className="mt-4 flex justify-center">
            <Button onClick={() => router.push(backButtonPath)}>{backButtonLabel}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
