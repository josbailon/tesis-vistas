"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SmileIcon as Tooth, Baby, Users, ArrowRight, Calendar, FileText } from "lucide-react"
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
    href: "/dashboard/patient/odontogram/adult",
  },
  {
    id: "pediatric",
    title: "Odontograma Pediátrico",
    description: "Dentición temporal (20 dientes de leche)",
    icon: Baby,
    color: "from-green-500 to-green-600",
    teeth: 20,
    ageRange: "2-6 años",
    href: "/dashboard/patient/odontogram/pediatric",
  },
  {
    id: "mixed",
    title: "Odontograma Mixto",
    description: "Dentición mixta (temporal y permanente)",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    teeth: "Variable",
    ageRange: "6-12 años",
    href: "/dashboard/patient/odontogram/mixed",
  },
]

export default function OdontogramPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Odontogramas
        </h1>
        <p className="text-gray-600 mt-2">Selecciona el tipo de odontograma según la edad y dentición del paciente</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {odontogramTypes.map((type) => {
          const Icon = type.icon
          return (
            <Card key={type.id} className="medical-card group hover:scale-105">
              <CardHeader className="pb-3">
                <div className={`p-4 rounded-lg bg-gradient-to-r ${type.color} w-fit`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{type.title}</CardTitle>
                <p className="text-sm text-gray-600">{type.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Dientes:</span>
                    <div className="font-medium text-gray-800">{type.teeth}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Edad:</span>
                    <div className="font-medium text-gray-800">{type.ageRange}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Estándar FDI
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Interactivo
                  </Badge>
                </div>

                <Link href={type.href}>
                  <Button className="w-full btn-medical group-hover:shadow-xl">
                    Abrir Odontograma
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Información adicional */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <FileText className="h-5 w-5 text-blue-500" />
              Información del Sistema FDI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-600">
            <p>
              El sistema de numeración FDI (Fédération Dentaire Internationale) es el estándar internacional para
              identificar dientes humanos.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Cuadrante 1: Maxilar derecho permanente (11-18)</li>
              <li>Cuadrante 2: Maxilar izquierdo permanente (21-28)</li>
              <li>Cuadrante 3: Mandíbula izquierda permanente (31-38)</li>
              <li>Cuadrante 4: Mandíbula derecha permanente (41-48)</li>
              <li>Cuadrante 5: Maxilar derecho temporal (51-55)</li>
              <li>Cuadrante 6: Maxilar izquierdo temporal (61-65)</li>
              <li>Cuadrante 7: Mandíbula izquierda temporal (71-75)</li>
              <li>Cuadrante 8: Mandíbula derecha temporal (81-85)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Calendar className="h-5 w-5 text-green-500" />
              Estados Dentales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="tooth tooth-healthy">S</div>
                <span>Sano</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-caries">C</div>
                <span>Caries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-filled">O</div>
                <span>Obturado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-crown">Co</div>
                <span>Corona</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-missing">X</div>
                <span>Ausente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-root-canal">E</div>
                <span>Endodoncia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="tooth tooth-implant">I</div>
                <span>Implante</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
