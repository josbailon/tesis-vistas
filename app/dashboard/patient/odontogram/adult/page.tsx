"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Download, PrinterIcon as Print, RotateCcw, Info } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"

interface ToothCondition {
  id: number
  condition: "healthy" | "caries" | "filled" | "crown" | "missing" | "root_canal" | "implant"
  notes?: string
  date?: string
  surfaces?: string[]
}

export default function AdultOdontogramPage() {
  const { toast } = useToast()
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [toothConditions, setToothConditions] = useState<Record<number, ToothCondition>>({
    11: { id: 11, condition: "healthy" },
    12: { id: 12, condition: "caries", notes: "Caries oclusal", surfaces: ["O"] },
    13: { id: 13, condition: "filled", notes: "Restauración de amalgama" },
    14: { id: 14, condition: "healthy" },
    15: { id: 15, condition: "healthy" },
    16: { id: 16, condition: "crown", notes: "Corona de porcelana" },
    17: { id: 17, condition: "healthy" },
    18: { id: 18, condition: "missing", notes: "Extracción previa" },
    // Add more teeth as needed
  })

  // Adult teeth numbering (FDI system)
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

  const getToothClass = (condition: string) => {
    switch (condition) {
      case "healthy":
        return "tooth tooth-healthy"
      case "caries":
        return "tooth tooth-caries"
      case "filled":
        return "tooth tooth-filled"
      case "crown":
        return "tooth tooth-crown"
      case "missing":
        return "tooth tooth-missing"
      case "root_canal":
        return "tooth tooth-root-canal"
      case "implant":
        return "tooth tooth-implant"
      default:
        return "tooth tooth-healthy"
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

  const updateToothCondition = (toothNumber: number, condition: string, notes?: string, surfaces?: string[]) => {
    setToothConditions((prev) => ({
      ...prev,
      [toothNumber]: {
        id: toothNumber,
        condition: condition as any,
        notes,
        surfaces,
        date: new Date().toISOString().split("T")[0],
      },
    }))

    toast({
      title: "Diente Actualizado",
      description: `Diente ${toothNumber} marcado como ${getConditionLabel(condition)}`,
    })
  }

  const resetOdontogram = () => {
    const resetConditions: Record<number, ToothCondition> = {}
    \
    [...upperTeeth, ...lowerTeeth].forEach(tooth =>
    \
      resetConditions[tooth] =
    id: tooth, condition
    : "healthy"
    \
    )\
    
    setToothConditions(resetConditions)
    
    toast(
    title: "Odontograma Reiniciado",\
    description: "Todos los dientes han sido marcados como sanos",\
    )\
  }

  const saveOdontogram = () => {
    // Here you would typically save to your backend
    toast({
      title: "Odontograma Guardado",
      description: "Los cambios han sido guardados exitosamente",
    })
  }

  const ToothComponent = ({ number }: { number: number }) => {
    const condition = toothConditions[number] || { id: number, condition: "healthy" }

    return (
      <div
        className={getToothClass(condition.condition)}
        onClick={() => handleToothClick(number)}
        title={`Diente ${number} - ${getConditionLabel(condition.condition)}`}
      >
        {number}
      </div>
    )
  }

  return (
    <ProtectedRoute allowedRoles={["student", "professor", "admin"]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/patient/odontogram">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Odontograma Adulto</h1>
              <p className="text-gray-600">Dentición permanente completa (32 dientes)</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetOdontogram}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reiniciar
            </Button>
            <Button variant="outline">
              <Print className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={saveOdontogram} className="btn-medical">
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leyenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
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
                  <div className={getToothClass(condition)}></div>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Odontogram */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Odontograma Adulto</CardTitle>
            <CardDescription>Haz clic en cualquier diente para editar su estado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Upper teeth */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-center">Maxilar Superior</h4>
              <div className="flex justify-center gap-1">
                {upperTeeth.map((number) => (
                  <ToothComponent key={number} number={number} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300"></div>

            {/* Lower teeth */}
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

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen de Condiciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.values(toothConditions)
                .filter((tooth) => tooth.condition !== "healthy")
                .map((tooth) => (
                  <div key={tooth.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={getToothClass(tooth.condition)}>{tooth.id}</div>
                      <div>
                        <span className="font-medium">Diente {tooth.id}</span>
                        <Badge variant="outline" className="ml-2">
                          {getConditionLabel(tooth.condition)}
                        </Badge>
                      </div>
                    </div>
                    {tooth.notes && <span className="text-sm text-gray-600 max-w-xs truncate">{tooth.notes}</span>}
                  </div>
                ))}

              {Object.values(toothConditions).filter((tooth) => tooth.condition !== "healthy").length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Info className="h-8 w-8 mx-auto mb-2" />
                  <p>No hay condiciones especiales registradas</p>
                  <p className="text-sm">Todos los dientes están marcados como sanos</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
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
                      updateToothCondition(selectedTooth, value)
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
                  <p className="text-xs text-gray-500">O: Oclusal, M: Mesial, D: Distal, V: Vestibular, L: Lingual</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    placeholder="Agregar notas sobre el estado del diente..."
                    defaultValue={toothConditions[selectedTooth]?.notes || ""}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)} className="btn-medical">
                  Guardar Cambios
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ProtectedRoute>
  )
}
