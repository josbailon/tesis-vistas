"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import { getSpecialtyInfo, type AppointmentType } from "@/lib/student-availability"

interface SpecialtySelectorProps {
  appointmentTypes: AppointmentType[]
  selectedType: AppointmentType | null
  onTypeSelect: (type: AppointmentType) => void
}

export function SpecialtySelector({ appointmentTypes, selectedType, onTypeSelect }: SpecialtySelectorProps) {
  // Agrupar tipos de cita por especialidad
  const groupedTypes = appointmentTypes.reduce(
    (acc, type) => {
      if (!acc[type.specialty]) {
        acc[type.specialty] = []
      }
      acc[type.specialty].push(type)
      return acc
    },
    {} as Record<string, AppointmentType[]>,
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">Especialidades Disponibles</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Selecciona la especialidad y tipo de tratamiento que necesitas
        </p>
      </div>

      {Object.entries(groupedTypes).map(([specialty, types]) => {
        const specialtyInfo = getSpecialtyInfo(specialty)

        return (
          <motion.div
            key={specialty}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`text-2xl`}>{specialtyInfo.icon}</div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">{specialty}</h4>
                  <p className="text-sm text-muted-foreground">{specialtyInfo.description}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {types.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-md hover:scale-105 ${
                      selectedType?.id === type.id
                        ? `border-${specialtyInfo.color}-500 bg-${specialtyInfo.color}-50 shadow-lg`
                        : "hover:border-blue-300"
                    }`}
                    onClick={() => onTypeSelect(type)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`h-2 w-2 rounded-full bg-${specialtyInfo.color}-600`}></div>
                            <h5 className="font-medium text-base">{type.name}</h5>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{type.description}</p>

                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              ⏱️ {type.duration} min
                            </Badge>
                            {type.estimatedCost > 0 ? (
                              <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                                💰 ${type.estimatedCost}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                🆓 Gratuito
                              </Badge>
                            )}
                          </div>

                          {type.requirements.length > 0 && (
                            <div className="mt-2 p-2 bg-gray-50 rounded-md">
                              <p className="text-xs font-medium text-gray-700 mb-1">Requisitos:</p>
                              <ul className="text-xs text-gray-600 space-y-0.5">
                                {type.requirements.slice(0, 2).map((req, index) => (
                                  <li key={index} className="flex items-start gap-1">
                                    <span className="text-blue-600 mt-0.5">•</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                                {type.requirements.length > 2 && (
                                  <li className="text-xs text-muted-foreground italic">
                                    +{type.requirements.length - 2} más...
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                        {selectedType?.id === type.id && (
                          <CheckCircle2 className="h-5 w-5 text-blue-600 ml-2 flex-shrink-0" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
