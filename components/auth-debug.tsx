"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export function AuthDebug() {
  const { user, isAuthenticated, checkAuth, logout } = useAuth()
  const [showDebug, setShowDebug] = useState(false)
  const [storageData, setStorageData] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userData = localStorage.getItem("user")
        const sessionExpiry = localStorage.getItem("session_expiry")

        setStorageData({
          user: userData ? JSON.parse(userData) : null,
          expiry: sessionExpiry ? new Date(Number.parseInt(sessionExpiry)).toLocaleString() : null,
          isExpired: sessionExpiry ? new Date().getTime() > Number.parseInt(sessionExpiry) : true,
        })
      } catch (error) {
        console.error("Error al leer localStorage:", error)
      }
    }
  }, [isAuthenticated])

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDebug(true)}
          className="bg-background/80 backdrop-blur-sm"
        >
          Debug Auth
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-background/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex justify-between">
            <span>Estado de Autenticación</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowDebug(false)}>
              ×
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">{isAuthenticated ? "Autenticado" : "No autenticado"}</CardDescription>
        </CardHeader>
        <CardContent className="text-xs space-y-2">
          <div>
            <strong>Usuario en contexto:</strong>
            <pre className="mt-1 bg-muted p-1 rounded text-[10px] overflow-auto">{JSON.stringify(user, null, 2)}</pre>
          </div>
          <div>
            <strong>Usuario en localStorage:</strong>
            <pre className="mt-1 bg-muted p-1 rounded text-[10px] overflow-auto">
              {JSON.stringify(storageData?.user, null, 2)}
            </pre>
          </div>
          <div>
            <strong>Expiración:</strong> {storageData?.expiry || "No establecida"}
          </div>
          <div>
            <strong>¿Expirada?</strong> {storageData?.isExpired ? "Sí" : "No"}
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <Button variant="outline" size="sm" onClick={() => checkAuth()}>
            Verificar
          </Button>
          <Button variant="destructive" size="sm" onClick={logout}>
            Cerrar Sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
