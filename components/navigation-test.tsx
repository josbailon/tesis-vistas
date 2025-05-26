"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Navigation } from "lucide-react"

export function NavigationTest() {
  const pathname = usePathname()
  const [isPatientPage, setIsPatientPage] = useState(false)
  const [navigationWorking, setNavigationWorking] = useState(false)

  useEffect(() => {
    const checkPatientPage = pathname === "/dashboard/patients"
    setIsPatientPage(checkPatientPage)
    setNavigationWorking(checkPatientPage)
  }, [pathname])

  if (process.env.NODE_ENV === "production") return null

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 border-2 border-dashed border-gray-300 bg-white/95 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Navigation className="h-4 w-4" />
          Test de Navegación
        </CardTitle>
        <CardDescription className="text-xs">Verificación de la integración del sidebar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs">Página actual:</span>
          <Badge variant="outline" className="text-xs">
            {pathname}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Enlace pacientes:</span>
          {isPatientPage ? (
            <Badge className="text-xs bg-green-100 text-green-800">
              <CheckCircle className="mr-1 h-3 w-3" />
              Funcionando
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">
              <AlertCircle className="mr-1 h-3 w-3" />
              No activo
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Navegación:</span>
          {navigationWorking ? (
            <Badge className="text-xs bg-green-100 text-green-800">✓ Correcta</Badge>
          ) : (
            <Badge variant="outline" className="text-xs">
              Pendiente
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
