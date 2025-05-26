"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, Clock, DollarSign, ArrowRight } from "lucide-react"

interface Specialization {
  id: string
  name: string
  icon: string
  description: string
  color: string
  gradient: string
  studentCount: number
  avgDuration: string
  treatments: string[]
  benefits: string[]
}

interface SpecializationGridProps {
  onSpecializationSelect: (specialization: Specialization) => void
  selectedSpecialization?: Specialization | null
}

const specializations: Specialization[] = [
  {
    id: "cirugia-oral",
    name: "Cirugía Oral y Maxilofacial",
    icon: "🔪",
    description: "Extracciones, cirugías orales y procedimientos maxilofaciales especializados",
    color: "red",
    gradient: "from-red-500 to-pink-600",
    studentCount: 3,
    avgDuration: "45-120 min",
    treatments: ["Extracciones simples", "Extracciones complejas", "Cirugía de cordales", "Biopsias orales"],
    benefits: ["Procedimientos especializados", "Técnicas avanzadas", "Recuperación supervisada"],
  },
  {
    id: "endodoncia",
    name: "Endodoncia",
    icon: "🦷",
    description: "Tratamientos de conducto y terapia pulpar para salvar dientes naturales",
    color: "blue",
    gradient: "from-blue-500 to-cyan-600",
    studentCount: 3,
    avgDuration: "60-150 min",
    treatments: ["Tratamiento de conducto", "Retratamientos", "Pulpotomías", "Terapia pulpar"],
    benefits: ["Conservación dental", "Alivio del dolor", "Técnicas modernas"],
  },
  {
    id: "ortodoncia",
    name: "Ortodoncia",
    icon: "😁",
    description: "Corrección de la posición dental y maloclusiones para una sonrisa perfecta",
    color: "green",
    gradient: "from-green-500 to-emerald-600",
    studentCount: 3,
    avgDuration: "30-120 min",
    treatments: ["Brackets metálicos", "Aparatos removibles", "Retenedores", "Ajustes ortodónticos"],
    benefits: ["Sonrisa perfecta", "Mejor función masticatoria", "Autoestima mejorada"],
  },
  {
    id: "odontopediatria",
    name: "Odontopediatría",
    icon: "👶",
    description: "Atención dental especializada para niños y adolescentes en un ambiente amigable",
    color: "purple",
    gradient: "from-purple-500 to-violet-600",
    studentCount: 3,
    avgDuration: "30-75 min",
    treatments: ["Revisiones pediátricas", "Sellantes", "Fluorización", "Restauraciones infantiles"],
    benefits: ["Ambiente amigable", "Técnicas especializadas", "Prevención temprana"],
  },
]

export function SpecializationGrid({ onSpecializationSelect, selectedSpecialization }: SpecializationGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl font-bold text-gray-900">Especialidades Disponibles</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona la especialidad que necesitas. Todos nuestros servicios son{" "}
            <span className="font-semibold text-green-600">completamente gratuitos</span> como parte de la formación
            universitaria ULEAM.
          </p>
        </motion.div>

        {/* Free Service Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full border border-green-200"
        >
          <DollarSign className="h-5 w-5" />
          <span className="font-semibold">Servicios 100% Gratuitos</span>
          <Badge variant="secondary" className="bg-green-200 text-green-800">
            Universidad Pública
          </Badge>
        </motion.div>
      </div>

      {/* Specialization Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {specializations.map((spec, index) => (
          <motion.div
            key={spec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredCard(spec.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedSpecialization?.id === spec.id
                  ? "border-2 border-blue-500 shadow-lg bg-blue-50"
                  : "border hover:border-gray-300"
              } ${hoveredCard === spec.id ? "shadow-2xl" : ""}`}
              onClick={() => onSpecializationSelect(spec)}
            >
              <CardContent className="p-0">
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${spec.gradient} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-4xl">{spec.icon}</div>
                      {selectedSpecialization?.id === spec.id && <CheckCircle2 className="h-6 w-6 text-white" />}
                    </div>
                    <h3 className="font-bold text-lg leading-tight">{spec.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{spec.description}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-blue-600">
                      <Users className="h-3 w-3" />
                      <span>{spec.studentCount} especialistas</span>
                    </div>
                    <div className="flex items-center gap-1 text-purple-600">
                      <Clock className="h-3 w-3" />
                      <span>{spec.avgDuration}</span>
                    </div>
                  </div>

                  {/* Treatments Preview */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Tratamientos incluidos:</p>
                    <div className="flex flex-wrap gap-1">
                      {spec.treatments.slice(0, 2).map((treatment, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {treatment}
                        </Badge>
                      ))}
                      {spec.treatments.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{spec.treatments.length - 2} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Beneficios:</p>
                    <div className="space-y-1">
                      {spec.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-green-600">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full mt-4 bg-gradient-to-r ${spec.gradient} hover:opacity-90 transition-all`}
                    size="sm"
                  >
                    Seleccionar Especialidad
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200"
      >
        <div className="text-center space-y-3">
          <h3 className="font-semibold text-lg text-gray-900">¿Por qué elegir la Clínica Dental ULEAM?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Atención supervisada por profesores especializados</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Equipos y tecnología de última generación</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Servicios completamente gratuitos</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
