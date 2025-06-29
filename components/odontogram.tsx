"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, User, FileText, BarChart3, Stethoscope } from "lucide-react"

interface ToothCondition {
  id: number
  condition:
    | "healthy"
    | "caries"
    | "filled"
    | "crown"
    | "missing"
    | "root_canal"
    | "implant"
    | "fracture"
    | "mobility"
    | "to_treat"
  surfaces: {
    vestibular: boolean
    lingual: boolean
    mesial: boolean
    distal: boolean
    oclusal: boolean
    radicular: boolean
  }
  notes?: string
  diagnosis?: string
  treatment?: string
  date?: string
}

interface OdontogramProps {
  patientId: string
  patientName?: string
  onSave?: (data: any) => void
}

export function Odontogram({ patientId, patientName = "Laura Medina", onSave }: OdontogramProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("tratamientos")

  const [toothConditions, setToothConditions] = useState<Record<number, ToothCondition>>({
    // Datos de ejemplo basados en la imagen
    21: {
      id: 21,
      condition: "to_treat",
      surfaces: { vestibular: false, lingual: false, mesial: false, distal: false, oclusal: true, radicular: false },
      diagnosis: "CARIES OCLUSAL",
      treatment: "Restauración con resina compuesta",
    },
    11: {
      id: 11,
      condition: "filled",
      surfaces: { vestibular: false, lingual: false, mesial: true, distal: false, oclusal: true, radicular: false },
      diagnosis: "OBTURACIÓN MESIO-OCLUSAL",
    },
    22: {
      id: 22,
      condition: "caries",
      surfaces: { vestibular: true, lingual: false, mesial: false, distal: false, oclusal: false, radicular: false },
      diagnosis: "CARIES VESTIBULAR",
    },
  })

  // Numeración dental FDI
  const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
  const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

  const getToothSymbol = (toothNumber: number) => {
    const condition = toothConditions[toothNumber]
    if (!condition) return "○"

    switch (condition.condition) {
      case "healthy":
        return "○"
      case "caries":
        return "●"
      case "filled":
        return "◐"
      case "crown":
        return "◆"
      case "missing":
        return "✕"
      case "root_canal":
        return "◉"
      case "implant":
        return "⬢"
      case "fracture":
        return "⚡"
      case "mobility":
        return "~"
      case "to_treat":
        return "!"
      default:
        return "○"
    }
  }

  const getToothColor = (toothNumber: number) => {
    const condition = toothConditions[toothNumber]
    if (!condition) return "text-gray-400"

    switch (condition.condition) {
      case "healthy":
        return "text-green-600"
      case "caries":
        return "text-red-600"
      case "filled":
        return "text-blue-600"
      case "crown":
        return "text-yellow-600"
      case "missing":
        return "text-gray-600"
      case "root_canal":
        return "text-purple-600"
      case "implant":
        return "text-teal-600"
      case "fracture":
        return "text-orange-600"
      case "mobility":
        return "text-pink-600"
      case "to_treat":
        return "text-red-700 font-bold"
      default:
        return "text-gray-400"
    }
  }

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber)
    setIsEditDialogOpen(true)
  }

  const updateToothCondition = (updates: Partial<ToothCondition>) => {
    if (selectedTooth === null) return

    setToothConditions((prev) => ({
      ...prev,
      [selectedTooth]: {
        ...prev[selectedTooth],
        id: selectedTooth,
        condition: "healthy",
        surfaces: { vestibular: false, lingual: false, mesial: false, distal: false, oclusal: false, radicular: false },
        ...updates,
        date: new Date().toISOString(),
      },
    }))
  }

  const ToothComponent = ({ number, position }: { number: number; position: "upper" | "lower" }) => {
    const condition = toothConditions[number]
    const isSelected = selectedTooth === number

    return (
      <div className="flex flex-col items-center">
        {position === "upper" && <div className="text-xs text-gray-600 mb-1 font-mono">{number}</div>}

        <div
          className={`
            relative w-8 h-8 cursor-pointer flex items-center justify-center
            text-lg font-bold transition-all duration-200
            ${getToothColor(number)}
            ${isSelected ? "bg-blue-100 rounded-full" : "hover:bg-gray-100 rounded-full"}
          `}
          onClick={() => handleToothClick(number)}
          title={`Diente ${number}${condition?.diagnosis ? ` - ${condition.diagnosis}` : ""}`}
        >
          {getToothSymbol(number)}

          {/* Indicadores de superficies */}
          {condition?.surfaces && (
            <>
              {condition.surfaces.vestibular && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
              {condition.surfaces.lingual && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
              {condition.surfaces.mesial && (
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
              {condition.surfaces.distal && (
                <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
              {condition.surfaces.oclusal && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </>
          )}
        </div>

        {position === "lower" && <div className="text-xs text-gray-600 mt-1 font-mono">{number}</div>}
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Header con tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-blue-600 text-white p-4">
          <TabsList className="bg-blue-700 border-blue-500">
            <TabsTrigger value="tratamientos" className="data-[state=active]:bg-blue-500">
              <Stethoscope className="h-4 w-4 mr-2" />
              Tratamientos
            </TabsTrigger>
            <TabsTrigger value="historial" className="data-[state=active]:bg-blue-500">
              <FileText className="h-4 w-4 mr-2" />
              Historial
            </TabsTrigger>
            <TabsTrigger value="estadistica" className="data-[state=active]:bg-blue-500">
              <BarChart3 className="h-4 w-4 mr-2" />
              Estadística
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tratamientos" className="mt-0">
          <div className="flex">
            {/* Panel principal del odontograma */}
            <div className="flex-1 p-6 bg-gray-50">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {/* Dientes superiores */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-center gap-3">
                    {upperTeeth.map((number) => (
                      <ToothComponent key={number} number={number} position="upper" />
                    ))}
                  </div>

                  {/* Representación gráfica de dientes superiores */}
                  <div className="flex justify-center gap-3">
                    {upperTeeth.map((number) => (
                      <div key={`graphic-${number}`} className="flex flex-col items-center">
                        <div className="w-6 h-8 border border-gray-300 rounded-t-lg bg-white relative">
                          {toothConditions[number] && (
                            <div
                              className={`absolute inset-1 rounded ${
                                toothConditions[number].condition === "caries"
                                  ? "bg-red-200"
                                  : toothConditions[number].condition === "filled"
                                    ? "bg-blue-200"
                                    : toothConditions[number].condition === "to_treat"
                                      ? "bg-yellow-200"
                                      : "bg-white"
                              }`}
                            ></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-gray-300 my-6"></div>

                {/* Dientes inferiores */}
                <div className="space-y-4">
                  {/* Representación gráfica de dientes inferiores */}
                  <div className="flex justify-center gap-3">
                    {lowerTeeth.map((number) => (
                      <div key={`graphic-${number}`} className="flex flex-col items-center">
                        <div className="w-6 h-8 border border-gray-300 rounded-b-lg bg-white relative">
                          {toothConditions[number] && (
                            <div
                              className={`absolute inset-1 rounded ${
                                toothConditions[number].condition === "caries"
                                  ? "bg-red-200"
                                  : toothConditions[number].condition === "filled"
                                    ? "bg-blue-200"
                                    : toothConditions[number].condition === "to_treat"
                                      ? "bg-yellow-200"
                                      : "bg-white"
                              }`}
                            ></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center gap-3">
                    {lowerTeeth.map((number) => (
                      <ToothComponent key={number} number={number} position="lower" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Panel lateral derecho */}
            <div className="w-80 bg-white border-l border-gray-200 p-4">
              <div className="space-y-4">
                {/* Información del paciente */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Paciente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-lg font-semibold">{patientName}</div>
                    <div className="text-sm text-gray-600">ID: {patientId}</div>
                  </CardContent>
                </Card>

                {/* Información del diente seleccionado */}
                {selectedTooth && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Diente Seleccionado</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="text-2xl font-bold text-center p-4 bg-blue-50 rounded-lg">{selectedTooth}</div>

                      {toothConditions[selectedTooth] && (
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Diagnóstico:</span>
                            <div className="mt-1 p-2 bg-gray-50 rounded text-xs">
                              {toothConditions[selectedTooth].diagnosis || "Sin diagnóstico"}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Superficies */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Superficies</Label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="vest"
                              checked={toothConditions[selectedTooth]?.surfaces?.vestibular || false}
                              onCheckedChange={(checked) => {
                                if (selectedTooth) {
                                  const current = toothConditions[selectedTooth] || {
                                    id: selectedTooth,
                                    condition: "healthy" as const,
                                    surfaces: {
                                      vestibular: false,
                                      lingual: false,
                                      mesial: false,
                                      distal: false,
                                      oclusal: false,
                                      radicular: false,
                                    },
                                  }
                                  updateToothCondition({
                                    ...current,
                                    surfaces: { ...current.surfaces, vestibular: checked as boolean },
                                  })
                                }
                              }}
                            />
                            <label htmlFor="vest">Vest</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="raz"
                              checked={toothConditions[selectedTooth]?.surfaces?.radicular || false}
                              onCheckedChange={(checked) => {
                                if (selectedTooth) {
                                  const current = toothConditions[selectedTooth] || {
                                    id: selectedTooth,
                                    condition: "healthy" as const,
                                    surfaces: {
                                      vestibular: false,
                                      lingual: false,
                                      mesial: false,
                                      distal: false,
                                      oclusal: false,
                                      radicular: false,
                                    },
                                  }
                                  updateToothCondition({
                                    ...current,
                                    surfaces: { ...current.surfaces, radicular: checked as boolean },
                                  })
                                }
                              }}
                            />
                            <label htmlFor="raz">Raz</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="oclu"
                              checked={toothConditions[selectedTooth]?.surfaces?.oclusal || false}
                              onCheckedChange={(checked) => {
                                if (selectedTooth) {
                                  const current = toothConditions[selectedTooth] || {
                                    id: selectedTooth,
                                    condition: "healthy" as const,
                                    surfaces: {
                                      vestibular: false,
                                      lingual: false,
                                      mesial: false,
                                      distal: false,
                                      oclusal: false,
                                      radicular: false,
                                    },
                                  }
                                  updateToothCondition({
                                    ...current,
                                    surfaces: { ...current.surfaces, oclusal: checked as boolean },
                                  })
                                }
                              }}
                            />
                            <label htmlFor="oclu">Oclu</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="ling"
                              checked={toothConditions[selectedTooth]?.surfaces?.lingual || false}
                              onCheckedChange={(checked) => {
                                if (selectedTooth) {
                                  const current = toothConditions[selectedTooth] || {
                                    id: selectedTooth,
                                    condition: "healthy" as const,
                                    surfaces: {
                                      vestibular: false,
                                      lingual: false,
                                      mesial: false,
                                      distal: false,
                                      oclusal: false,
                                      radicular: false,
                                    },
                                  }
                                  updateToothCondition({
                                    ...current,
                                    surfaces: { ...current.surfaces, lingual: checked as boolean },
                                  })
                                }
                              }}
                            />
                            <label htmlFor="ling">Ling</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="mesial"
                              checked={toothConditions[selectedTooth]?.surfaces?.mesial || false}
                              onCheckedChange={(checked) => {
                                if (selectedTooth) {
                                  const current = toothConditions[selectedTooth] || {
                                    id: selectedTooth,
                                    condition: "healthy" as const,
                                    surfaces: {
                                      vestibular: false,
                                      lingual: false,
                                      mesial: false,
                                      distal: false,
                                      oclusal: false,
                                      radicular: false,
                                    },
                                  }
                                  updateToothCondition({
                                    ...current,
                                    surfaces: { ...current.surfaces, mesial: checked as boolean },
                                  })
                                }
                              }}
                            />
                            <label htmlFor="mesial">Mesial</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="distal"
                              checked={toothConditions[selectedTooth]?.surfaces?.distal || false}
                              onCheckedChange={(checked) => {
                                if (selectedTooth) {
                                  const current = toothConditions[selectedTooth] || {
                                    id: selectedTooth,
                                    condition: "healthy" as const,
                                    surfaces: {
                                      vestibular: false,
                                      lingual: false,
                                      mesial: false,
                                      distal: false,
                                      oclusal: false,
                                      radicular: false,
                                    },
                                  }
                                  updateToothCondition({
                                    ...current,
                                    surfaces: { ...current.surfaces, distal: checked as boolean },
                                  })
                                }
                              }}
                            />
                            <label htmlFor="distal">Distal</label>
                          </div>
                        </div>
                      </div>

                      {/* Diagnóstico */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Diagnóstico</Label>
                        <Select
                          value={toothConditions[selectedTooth]?.condition || "healthy"}
                          onValueChange={(value) => {
                            if (selectedTooth) {
                              const current = toothConditions[selectedTooth] || {
                                id: selectedTooth,
                                condition: "healthy" as const,
                                surfaces: {
                                  vestibular: false,
                                  lingual: false,
                                  mesial: false,
                                  distal: false,
                                  oclusal: false,
                                  radicular: false,
                                },
                              }
                              updateToothCondition({
                                ...current,
                                condition: value as any,
                                diagnosis:
                                  value === "caries"
                                    ? "CARIES OCLUSAL"
                                    : value === "filled"
                                      ? "OBTURACIÓN"
                                      : value === "to_treat"
                                        ? "REQUIERE TRATAMIENTO"
                                        : "SANO",
                              })
                            }
                          }}
                        >
                          <SelectTrigger className="text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="healthy">Sano</SelectItem>
                            <SelectItem value="caries">Caries</SelectItem>
                            <SelectItem value="filled">Obturado</SelectItem>
                            <SelectItem value="crown">Corona</SelectItem>
                            <SelectItem value="missing">Ausente</SelectItem>
                            <SelectItem value="root_canal">Endodoncia</SelectItem>
                            <SelectItem value="to_treat">Por Tratar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          // Lógica para tratar
                          console.log("Tratando diente", selectedTooth)
                        }}
                      >
                        Tratar
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Botón guardar */}
                <Button
                  onClick={() => onSave && onSave(toothConditions)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historial" className="mt-0 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Tratamientos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.values(toothConditions)
                  .filter((tooth) => tooth.condition !== "healthy")
                  .map((tooth) => (
                    <div key={tooth.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="font-semibold">Diente {tooth.id}</div>
                      <div className="text-sm text-gray-600">{tooth.diagnosis}</div>
                      {tooth.date && (
                        <div className="text-xs text-gray-400">{new Date(tooth.date).toLocaleDateString("es-ES")}</div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadistica" className="mt-0 p-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumen General</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Dientes sanos:</span>
                    <span className="font-bold text-green-600">{32 - Object.keys(toothConditions).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Con tratamiento:</span>
                    <span className="font-bold text-blue-600">
                      {Object.values(toothConditions).filter((t) => t.condition === "filled").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Con caries:</span>
                    <span className="font-bold text-red-600">
                      {Object.values(toothConditions).filter((t) => t.condition === "caries").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Por tratar:</span>
                    <span className="font-bold text-yellow-600">
                      {Object.values(toothConditions).filter((t) => t.condition === "to_treat").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
