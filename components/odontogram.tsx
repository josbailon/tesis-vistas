"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ToothCondition {
  id: number
  condition: "healthy" | "caries" | "filled" | "crown" | "missing" | "root_canal" | "implant"
  notes?: string
  date?: string
  surfaces?: string[]
}

interface OdontogramProps {
  patientId: string
}

export function Odontogram({ patientId }: OdontogramProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [toothConditions, setToothConditions] = useState<Record<number, ToothCondition>>({
    11: { id: 11, condition: "healthy" },
    12: { id: 12, condition: "caries", notes: "Caries oclusal", surfaces: ["O"] },
    13: { id: 13, condition: "filled", notes: "Restauración de amalgama" },
    21: { id: 21, condition: "healthy" },
    22: { id: 22, condition: "crown", notes: "Corona de porcelana" },
    23: { id: 23, condition: "healthy" },
    // Agregar más dientes según sea necesario
  })

  // Numeración dental FDI
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

  const getToothColor = (condition: string) => {
    switch (condition) {
      case "healthy":
        return "bg-white border-gray-300"
      case "caries":
        return "bg-red-200 border-red-400"
      case "filled":
        return "bg-blue-200 border-blue-400"
      case "crown":
        return "bg-yellow-200 border-yellow-400"
      case "missing":
        return "bg-gray-400 border-gray-500"
      case "root_canal":
        return "bg-purple-200 border-purple-400"
      case "implant":
        return "bg-green-200 border-green-400"
      default:
        return "bg-white border-gray-300"
    }
  }

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "healthy":
        return "Sano"
      case "caries":
        return "Caries"
      case "filled":
        return "Obturado"
      case "crown":
        return "Corona"
      case "missing":
        return "Ausente"
      case "root_canal":
        return "Endodoncia"
      case "implant":
        return "Implante"
      default:
        return "Desconocido"
    }
  }

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber)
    setIsEditDialogOpen(true)
  }

  const updateToothCondition = (toothNumber: number, condition: ToothCondition) => {
    setToothConditions((prev) => ({
      ...prev,
      [toothNumber]: condition,
    }))
  }

  const ToothComponent = ({ number }: { number: number }) => {
    const condition = toothConditions[number] || { id: number, condition: "healthy" }

    return (
      <div
        className={`w-8 h-8 border-2 rounded cursor-pointer flex items-center justify-center text-xs font-medium hover:scale-110 transition-transform ${getToothColor(condition.condition)}`}
        onClick={() => handleToothClick(number)}
        title={`Diente ${number} - ${getConditionLabel(condition.condition)}`}
      >
        {number}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Leyenda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leyenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {[
              { condition: "healthy", label: "Sano" },
              { condition: "caries", label: "Caries" },
              { condition: "filled", label: "Obturado" },
              { condition: "crown", label: "Corona" },
              { condition: "missing", label: "Ausente" },
              { condition: "root_canal", label: "Endodoncia" },
              { condition: "implant", label: "Implante" },
            ].map(({ condition, label }) => (
              <div key={condition} className="flex items-center gap-2">
                <div className={`w-4 h-4 border-2 rounded ${getToothColor(condition)}`}></div>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Odontograma */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Odontograma</CardTitle>
          <CardDescription>Haz clic en cualquier diente para editar su estado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Dientes superiores */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-center">Maxilar Superior</h4>
            <div className="flex justify-center gap-1">
              {upperTeeth.map((number) => (
                <ToothComponent key={number} number={number} />
              ))}
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="border-t border-gray-300"></div>

          {/* Dientes inferiores */}
          <div className="space-y-2">
            <div className="flex justify-center gap-1">
              {lowerTeeth.map((number) => (
                <ToothComponent key={number} number={number} />
              ))}
            </div>
            <h4 className="text-sm font-medium text-center">Maxilar Inferior</h4>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de condiciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumen de Condiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.values(toothConditions)
              .filter((tooth) => tooth.condition !== "healthy")
              .map((tooth) => (
                <div key={tooth.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Diente {tooth.id}</span>
                    <Badge variant="outline">{getConditionLabel(tooth.condition)}</Badge>
                  </div>
                  {tooth.notes && <span className="text-sm text-muted-foreground">{tooth.notes}</span>}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de edición */}
      {selectedTooth && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Diente {selectedTooth}</DialogTitle>
              <DialogDescription>Actualiza el estado y las notas del diente seleccionado</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="condition">Estado del Diente</Label>
                <Select
                  defaultValue={toothConditions[selectedTooth]?.condition || "healthy"}
                  onValueChange={(value) => {
                    const currentCondition = toothConditions[selectedTooth] || {
                      id: selectedTooth,
                      condition: "healthy",
                    }
                    updateToothCondition(selectedTooth, {
                      ...currentCondition,
                      condition: value as any,
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthy">Sano</SelectItem>
                    <SelectItem value="caries">Caries</SelectItem>
                    <SelectItem value="filled">Obturado</SelectItem>
                    <SelectItem value="crown">Corona</SelectItem>
                    <SelectItem value="missing">Ausente</SelectItem>
                    <SelectItem value="root_canal">Endodoncia</SelectItem>
                    <SelectItem value="implant">Implante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="surfaces">Superficies Afectadas</Label>
                <div className="grid grid-cols-5 gap-2">
                  {["O", "M", "D", "V", "L"].map((surface) => (
                    <Button key={surface} variant="outline" size="sm" className="h-8">
                      {surface}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  O: Oclusal, M: Mesial, D: Distal, V: Vestibular, L: Lingual
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  placeholder="Agregar notas sobre el estado del diente..."
                  defaultValue={toothConditions[selectedTooth]?.notes || ""}
                  onChange={(e) => {
                    const currentCondition = toothConditions[selectedTooth] || {
                      id: selectedTooth,
                      condition: "healthy",
                    }
                    updateToothCondition(selectedTooth, {
                      ...currentCondition,
                      notes: e.target.value,
                    })
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
