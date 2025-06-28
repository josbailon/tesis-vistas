"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ToothCondition {
  id: number | string
  condition:
    | "healthy"
    | "caries"
    | "filled"
    | "crown"
    | "missing"
    | "root_canal"
    | "implant"
    | "extraction_needed"
    | "in_treatment"
  notes?: string
  date?: string
  surfaces?: string[]
  studentId?: string
  professorId?: string
  treatmentPlan?: string
}

interface OdontogramAdvancedProps {
  patientId: string
  patientAge?: number
  mode?: "adult" | "child" | "mixed"
  readonly?: boolean
  onToothUpdate?: (tooth: ToothCondition) => void
}

export function OdontogramAdvanced({
  patientId,
  patientAge = 25,
  mode = "adult",
  readonly = false,
  onToothUpdate,
}: OdontogramAdvancedProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [odontogramMode, setOdontogramMode] = useState(mode)
  const [toothConditions, setToothConditions] = useState<Record<string, ToothCondition>>({
    // Datos de ejemplo
    "11": { id: "11", condition: "healthy" },
    "12": { id: "12", condition: "caries", notes: "Caries oclusal", surfaces: ["O"] },
    "13": { id: "13", condition: "filled", notes: "Restauración de amalgama" },
    "21": { id: "21", condition: "healthy" },
    "22": { id: "22", condition: "crown", notes: "Corona de porcelana" },
    "23": { id: "23", condition: "healthy" },
  })

  // Numeración dental FDI para adultos
  const adultUpperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
  const adultLowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

  // Numeración dental para niños (dientes temporales)
  const childUpperTeeth = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65]
  const childLowerTeeth = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75]

  // Dentición mixta (combinación de temporales y permanentes)
  const mixedUpperTeeth = [16, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 26]
  const mixedLowerTeeth = [36, 75, 74, 73, 72, 71, 81, 82, 83, 84, 85, 46]

  const getTeethByMode = () => {
    switch (odontogramMode) {
      case "child":
        return { upper: childUpperTeeth, lower: childLowerTeeth }
      case "mixed":
        return { upper: mixedUpperTeeth, lower: mixedLowerTeeth }
      default:
        return { upper: adultUpperTeeth, lower: adultLowerTeeth }
    }
  }

  const getToothColor = (condition: string) => {
    switch (condition) {
      case "healthy":
        return "bg-white border-gray-300 hover:border-green-400"
      case "caries":
        return "bg-red-200 border-red-400 hover:border-red-500"
      case "filled":
        return "bg-blue-200 border-blue-400 hover:border-blue-500"
      case "crown":
        return "bg-yellow-200 border-yellow-400 hover:border-yellow-500"
      case "missing":
        return "bg-gray-400 border-gray-500 opacity-50"
      case "root_canal":
        return "bg-purple-200 border-purple-400 hover:border-purple-500"
      case "implant":
        return "bg-green-200 border-green-400 hover:border-green-500"
      case "extraction_needed":
        return "bg-red-300 border-red-500 hover:border-red-600"
      case "in_treatment":
        return "bg-orange-200 border-orange-400 hover:border-orange-500"
      default:
        return "bg-white border-gray-300 hover:border-gray-400"
    }
  }

  const getConditionLabel = (condition: string) => {
    const labels: Record<string, string> = {
      healthy: "Sano",
      caries: "Caries",
      filled: "Obturado",
      crown: "Corona",
      missing: "Ausente",
      root_canal: "Endodoncia",
      implant: "Implante",
      extraction_needed: "Extracción Necesaria",
      in_treatment: "En Tratamiento",
    }
    return labels[condition] || "Desconocido"
  }

  const isTemporaryTooth = (toothNumber: number | string) => {
    const num = typeof toothNumber === "string" ? Number.parseInt(toothNumber) : toothNumber
    return num >= 51 && num <= 85
  }

  const handleToothClick = (toothNumber: number | string) => {
    if (readonly) return
    setSelectedTooth(toothNumber)
    setIsEditDialogOpen(true)
  }

  const updateToothCondition = (toothNumber: number | string, condition: ToothCondition) => {
    const key = toothNumber.toString()
    setToothConditions((prev) => ({
      ...prev,
      [key]: condition,
    }))
    onToothUpdate?.(condition)
  }

  const ToothComponent = ({ number }: { number: number | string }) => {
    const condition = toothConditions[number.toString()] || { id: number, condition: "healthy" }
    const isTemporary = isTemporaryTooth(number)

    return (
      <div
        className={`
          w-10 h-10 border-2 rounded cursor-pointer flex items-center justify-center text-xs font-medium 
          transition-all duration-200 hover:scale-110 hover:shadow-md
          ${getToothColor(condition.condition)}
          ${isTemporary ? "italic font-bold" : ""}
          ${readonly ? "cursor-default" : "cursor-pointer"}
        `}
        onClick={() => handleToothClick(number)}
        title={`Diente ${number} ${isTemporary ? "(Temporal)" : "(Permanente)"} - ${getConditionLabel(condition.condition)}`}
      >
        {number}
      </div>
    )
  }

  const { upper: upperTeeth, lower: lowerTeeth } = getTeethByMode()

  return (
    <div className="space-y-6">
      {/* Controles del Odontograma */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Odontograma Digital</CardTitle>
              <CardDescription>
                Paciente: {patientId} | Edad: {patientAge} años | Modo: {odontogramMode}
              </CardDescription>
            </div>
            {!readonly && (
              <div className="flex gap-2">
                <Select value={odontogramMode} onValueChange={(value: any) => setOdontogramMode(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adult">Adulto</SelectItem>
                    <SelectItem value="child">Niño</SelectItem>
                    <SelectItem value="mixed">Mixta</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Exportar PDF
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Leyenda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leyenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { condition: "healthy", label: "Sano" },
              { condition: "caries", label: "Caries" },
              { condition: "filled", label: "Obturado" },
              { condition: "crown", label: "Corona" },
              { condition: "missing", label: "Ausente" },
              { condition: "root_canal", label: "Endodoncia" },
              { condition: "implant", label: "Implante" },
              { condition: "extraction_needed", label: "Extracción Necesaria" },
              { condition: "in_treatment", label: "En Tratamiento" },
            ].map(({ condition, label }) => (
              <div key={condition} className="flex items-center gap-2">
                <div className={`w-4 h-4 border-2 rounded ${getToothColor(condition)}`}></div>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Nota:</strong> Los números en <em>cursiva y negrita</em> representan dientes temporales (de
              leche). Los números normales representan dientes permanentes.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Odontograma Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Odontograma -{" "}
            {odontogramMode === "adult" ? "Adulto" : odontogramMode === "child" ? "Niño" : "Dentición Mixta"}
          </CardTitle>
          <CardDescription>
            {readonly ? "Vista de solo lectura" : "Haz clic en cualquier diente para editar su estado"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Dientes superiores */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-center text-gray-600">Maxilar Superior</h4>
            <div className="flex justify-center gap-1 flex-wrap">
              {upperTeeth.map((number) => (
                <ToothComponent key={number} number={number} />
              ))}
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="border-t border-gray-300 relative">
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
              Línea de Oclusión
            </div>
          </div>

          {/* Dientes inferiores */}
          <div className="space-y-2">
            <div className="flex justify-center gap-1 flex-wrap">
              {lowerTeeth.map((number) => (
                <ToothComponent key={number} number={number} />
              ))}
            </div>
            <h4 className="text-sm font-medium text-center text-gray-600">Maxilar Inferior</h4>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de Condiciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumen de Condiciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="problems">Problemas</TabsTrigger>
              <TabsTrigger value="treatments">Tratamientos</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-2">
              {Object.values(toothConditions).map((tooth) => (
                <div key={tooth.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Diente {tooth.id}</span>
                    <Badge variant="outline" className={getToothColor(tooth.condition)}>
                      {getConditionLabel(tooth.condition)}
                    </Badge>
                    {isTemporaryTooth(tooth.id) && <Badge variant="secondary">Temporal</Badge>}
                  </div>
                  {tooth.notes && (
                    <span className="text-sm text-muted-foreground max-w-xs truncate">{tooth.notes}</span>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="problems" className="space-y-2">
              {Object.values(toothConditions)
                .filter((tooth) => ["caries", "extraction_needed", "missing"].includes(tooth.condition))
                .map((tooth) => (
                  <div
                    key={tooth.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-red-800">Diente {tooth.id}</span>
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                        {getConditionLabel(tooth.condition)}
                      </Badge>
                    </div>
                    {tooth.notes && <span className="text-sm text-red-600 max-w-xs truncate">{tooth.notes}</span>}
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="treatments" className="space-y-2">
              {Object.values(toothConditions)
                .filter((tooth) =>
                  ["filled", "crown", "root_canal", "implant", "in_treatment"].includes(tooth.condition),
                )
                .map((tooth) => (
                  <div
                    key={tooth.id}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-green-800">Diente {tooth.id}</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        {getConditionLabel(tooth.condition)}
                      </Badge>
                    </div>
                    {tooth.notes && <span className="text-sm text-green-600 max-w-xs truncate">{tooth.notes}</span>}
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Diálogo de edición */}
      {selectedTooth && !readonly && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                Editar Diente {selectedTooth}
                {isTemporaryTooth(selectedTooth) && <span className="text-blue-600"> (Temporal)</span>}
              </DialogTitle>
              <DialogDescription>Actualiza el estado y las notas del diente seleccionado</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="condition">Estado del Diente</Label>
                <Select
                  defaultValue={toothConditions[selectedTooth.toString()]?.condition || "healthy"}
                  onValueChange={(value) => {
                    const currentCondition = toothConditions[selectedTooth.toString()] || {
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
                    <SelectItem value="extraction_needed">Extracción Necesaria</SelectItem>
                    <SelectItem value="in_treatment">En Tratamiento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="surfaces">Superficies Afectadas</Label>
                <div className="grid grid-cols-5 gap-2">
                  {["O", "M", "D", "V", "L"].map((surface) => (
                    <Button key={surface} variant="outline" size="sm" className="h-8 bg-transparent">
                      {surface}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  O: Oclusal, M: Mesial, D: Distal, V: Vestibular, L: Lingual
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas Clínicas</Label>
                <Textarea
                  id="notes"
                  placeholder="Agregar notas sobre el estado del diente, tratamiento realizado, observaciones..."
                  defaultValue={toothConditions[selectedTooth.toString()]?.notes || ""}
                  onChange={(e) => {
                    const currentCondition = toothConditions[selectedTooth.toString()] || {
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

              <div className="space-y-2">
                <Label htmlFor="treatmentPlan">Plan de Tratamiento</Label>
                <Textarea
                  id="treatmentPlan"
                  placeholder="Describir el plan de tratamiento propuesto..."
                  defaultValue={toothConditions[selectedTooth.toString()]?.treatmentPlan || ""}
                  onChange={(e) => {
                    const currentCondition = toothConditions[selectedTooth.toString()] || {
                      id: selectedTooth,
                      condition: "healthy",
                    }
                    updateToothCondition(selectedTooth, {
                      ...currentCondition,
                      treatmentPlan: e.target.value,
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
