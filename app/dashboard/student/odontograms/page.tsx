"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SmileIcon as Tooth, Baby, Users, ArrowRight, Calendar, FileText, Plus } from "lucide-react"
import Link from "next/link"

const odontogramTypes = [
  {
    id: "adult",
    title: "Odontograma Adulto",
    description: "Dentición permanente completa (32 dientes)",
    icon: Tooth,
    color: "from-blue-500 to-blue-600",
    teeth: 32,
    ageRange: "18+ años",
    href: "/dashboard/student/odontograms/adult",
    features: ["Sistema FDI", "32 dientes permanentes", "Cuadrantes 1-4"],
  },
  {
    id: "pediatric",
    title: "Odontograma Pediátrico",
    description: "Dentición temporal (20 dientes de leche)",
    icon: Baby,
    color: "from-green-500 to-green-600",
    teeth: 20,
    ageRange: "2-6 años",
    href: "/dashboard/student/odontograms/pediatric",
    features: ["Dientes temporales", "20 dientes de leche", "Cuadrantes 5-8"],
  },
  {
    id: "mixed",
    title: "Odontograma Mixto",
    description: "Dentición mixta (temporal y permanente)",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    teeth: "Variable",
    ageRange: "6-12 años",
    href: "/dashboard/student/odontograms/mixed",
    features: ["Dentición mixta", "Temporales + Permanentes", "Transición dental"],
  },
]

const recentOdontograms = [
  {
    id: 1,
    patientName: "Ana García",
    type: "Adulto",
    date: "2024-01-15",
    status: "Completado",
    progress: 100,
  },
  {
    id: 2,
    patientName: "Carlos López Jr.",
    type: "Pediátrico",
    date: "2024-01-14",
    status: "En progreso",
    progress: 75,
  },
  {
    id: 3,
    patientName: "María Fernández",
    type: "Mixto",
    date: "2024-01-13",
    status: "Pendiente revisión",
    progress: 90,
  },
]

export default function StudentOdontogramsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Odontogramas - Estudiante
        </h1>
        <p className="text-blue-600 mt-2">Crea y gestiona odontogramas para todos los tipos de dentición</p>
      </div>

      {/* Tipos de Odontogramas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {odontogramTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card key={type.id} className="medical-card group hover:scale-105">
              <CardHeader className="pb-3">
                <div className={`p-4 rounded-lg bg-gradient-to-r ${type.color} w-fit`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-blue-800">{type.title}</CardTitle>
                <CardDescription className="text-blue-600">{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-500 font-medium">Dientes:</span>
                    <div className="font-bold text-blue-800">{type.teeth}</div>
                  </div>
                  <div>
                    <span className="text-blue-500 font-medium">Edad:</span>
                    <div className="font-bold text-blue-800">{type.ageRange}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-blue-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                    Estándar FDI
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">
                    Interactivo
                  </Badge>
                </div>

                <Link href={type.href}>
                  <Button className="w-full btn-medical group-hover:shadow-xl">
                    Crear Odontograma
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Odontogramas Recientes */}
      <Card className="medical-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-blue-800">Odontogramas Recientes</CardTitle>
            <CardDescription className="text-blue-600">Últimos odontogramas trabajados</CardDescription>
          </div>
          <Button className="btn-medical">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Odontograma
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOdontograms.map((odontogram) => (
              <div
                key={odontogram.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Tooth className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">{odontogram.patientName}</p>
                    <p className="text-sm text-blue-600">
                      Tipo: {odontogram.type} • {odontogram.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge
                      variant={odontogram.status === "Completado" ? "default" : "secondary"}
                      className={
                        odontogram.status === "Completado"
                          ? "bg-green-100 text-green-700"
                          : odontogram.status === "En progreso"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {odontogram.status}
                    </Badge>
                    <p className="text-xs text-blue-600 mt-1">{odontogram.progress}% completado</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Información del Sistema FDI */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <FileText className="h-5 w-5 text-blue-500" />
              Sistema de Numeración FDI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-700">
            <p>El sistema FDI es el estándar internacional para identificar dientes humanos.</p>
            <div className="space-y-2">
              <div className="p-2 bg-blue-50 rounded">
                <strong>Dentición Permanente:</strong>
                <ul className="mt-1 space-y-1 list-disc list-inside text-blue-600">
                  <li>Cuadrante 1: Maxilar derecho (11-18)</li>
                  <li>Cuadrante 2: Maxilar izquierdo (21-28)</li>
                  <li>Cuadrante 3: Mandíbula izquierda (31-38)</li>
                  <li>Cuadrante 4: Mandíbula derecha (41-48)</li>
                </ul>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <strong>Dentición Temporal:</strong>
                <ul className="mt-1 space-y-1 list-disc list-inside text-green-600">
                  <li>Cuadrante 5: Maxilar derecho (51-55)</li>
                  <li>Cuadrante 6: Maxilar izquierdo (61-65)</li>
                  <li>Cuadrante 7: Mandíbula izquierda (71-75)</li>
                  <li>Cuadrante 8: Mandíbula derecha (81-85)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Calendar className="h-5 w-5 text-green-500" />
              Estados Dentales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="tooth tooth-healthy">S</div>
                <span className="text-blue-700">Sano</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-caries">C</div>
                <span className="text-blue-700">Caries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-filled">O</div>
                <span className="text-blue-700">Obturado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-crown">Co</div>
                <span className="text-blue-700">Corona</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-missing">X</div>
                <span className="text-blue-700">Ausente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-root-canal">E</div>
                <span className="text-blue-700">Endodoncia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-implant">I</div>
                <span className="text-blue-700">Implante</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
