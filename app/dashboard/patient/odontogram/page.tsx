"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Baby, Users, Stethoscope, FileText, AlertTriangle } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"

export default function OdontogramSelectionPage() {
  return (
    <ProtectedRoute allowedRoles={["student", "professor", "admin"]}>
      <div className="space-y-8">
        {/* Header */}
        <div className="medical-gradient rounded-xl p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Odontogramas</h1>
              <p className="text-white/80">Selecciona el tipo de odontograma según el paciente</p>
            </div>
          </div>
        </div>

        {/* Odontogram Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Adult Odontogram */}
          <Card className="card-hover group">
            <CardHeader className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Odontograma Adulto</CardTitle>
              <CardDescription>Para pacientes adultos con dentición permanente completa (32 dientes)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Dientes:</span>
                  <Badge variant="outline">32 permanentes</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Edad:</span>
                  <Badge variant="outline">18+ años</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Numeración:</span>
                  <Badge variant="outline">FDI</Badge>
                </div>
              </div>
              <Link href="/dashboard/patient/odontogram/adult">
                <Button className="w-full btn-medical">
                  <FileText className="h-4 w-4 mr-2" />
                  Abrir Odontograma Adulto
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pediatric Odontogram */}
          <Card className="card-hover group">
            <CardHeader className="text-center">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Baby className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Odontograma Pediátrico</CardTitle>
              <CardDescription>Para pacientes pediátricos con dentición temporal (20 dientes)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Dientes:</span>
                  <Badge variant="outline">20 temporales</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Edad:</span>
                  <Badge variant="outline">2-12 años</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Numeración:</span>
                  <Badge variant="outline">FDI Temporal</Badge>
                </div>
              </div>
              <Link href="/dashboard/patient/odontogram/pediatric">
                <Button className="w-full btn-medical-secondary">
                  <FileText className="h-4 w-4 mr-2" />
                  Abrir Odontograma Pediátrico
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Mixed Odontogram */}
          <Card className="card-hover group">
            <CardHeader className="text-center">
              <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Odontograma Mixto</CardTitle>
              <CardDescription>Para pacientes en dentición mixta (temporales y permanentes)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Dientes:</span>
                  <Badge variant="outline">Mixta</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Edad:</span>
                  <Badge variant="outline">6-12 años</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Numeración:</span>
                  <Badge variant="outline">FDI Mixta</Badge>
                </div>
              </div>
              <Link href="/dashboard/patient/odontogram/mixed">
                <Button className="w-full medical-gradient-accent text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Abrir Odontograma Mixto
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Information Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Información Importante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Numeración FDI</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Adultos: 11-18, 21-28, 31-38, 41-48</li>
                  <li>• Temporales: 51-55, 61-65, 71-75, 81-85</li>
                  <li>• Sistema internacional estándar</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Estados Dentales</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="tooth-healthy">Sano</Badge>
                  <Badge className="tooth-caries">Caries</Badge>
                  <Badge className="tooth-filled">Obturado</Badge>
                  <Badge className="tooth-crown">Corona</Badge>
                  <Badge className="tooth-missing">Ausente</Badge>
                  <Badge className="tooth-root-canal">Endodoncia</Badge>
                  <Badge className="tooth-implant">Implante</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Records */}
        <Card>
          <CardHeader>
            <CardTitle>Registros Recientes</CardTitle>
            <CardDescription>Últimos odontogramas realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">María González - Adulto</p>
                    <p className="text-sm text-gray-600">Última actualización: 15/12/2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Baby className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Carlos Pérez - Pediátrico</p>
                    <p className="text-sm text-gray-600">Última actualización: 12/12/2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Ana Martínez - Mixto</p>
                    <p className="text-sm text-gray-600">Última actualización: 10/12/2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
