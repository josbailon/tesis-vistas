"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, FileText, BarChart3, Stethoscope, Save } from "lucide-react"

interface ToothData {
  number: number
  condition: string
  surfaces: string[]
  notes: string
  color: string
  symbol: string
  diagnosis?: string
}

interface OdontogramProps {
  patientId: string
  patientName?: string
  onSave?: (data: ToothData[]) => void
}

const TOOTH_CONDITIONS = {
  SANO: { color: "bg-white border-gray-300 text-gray-600", symbol: "○", diagnosis: "SANO" },
  "CARIES OCLUSAL": { color: "bg-red-100 border-red-400 text-red-800", symbol: "●", diagnosis: "CARIES OCLUSAL" },
  OBTURACIÓN: { color: "bg-blue-100 border-blue-400 text-blue-800", symbol: "◐", diagnosis: "OBTURACIÓN" },
  CORONA: { color: "bg-yellow-100 border-yellow-400 text-yellow-800", symbol: "◆", diagnosis: "CORONA" },
  EXTRACCIÓN: { color: "bg-gray-100 border-gray-400 text-gray-800", symbol: "✕", diagnosis: "EXTRACCIÓN" },
  AUSENTE: { color: "bg-gray-200 border-gray-500 text-gray-700", symbol: "—", diagnosis: "AUSENTE" },
  ENDODONCIA: { color: "bg-purple-100 border-purple-400 text-purple-800", symbol: "◉", diagnosis: "ENDODONCIA" },
  IMPLANTE: { color: "bg-green-100 border-green-400 text-green-800", symbol: "⬢", diagnosis: "IMPLANTE" },
  PRÓTESIS: { color: "bg-orange-100 border-orange-400 text-orange-800", symbol: "◈", diagnosis: "PRÓTESIS" },
}

const SURFACES = ["Vest", "Raz", "Oclu", "Ling", "Mesial", "Distal"]

const UPPER_TEETH = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28]
const LOWER_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38]

const createInitialTeeth = (): ToothData[] => {
  const allTeeth = [...UPPER_TEETH, ...LOWER_TEETH]
  return allTeeth.map((number) => ({
    number,
    condition: "SANO",
    surfaces: [],
    notes: "",
    color: "bg-white border-gray-300 text-gray-600",
    symbol: "○",
    diagnosis: "SANO",
  }))
}

export function Odontogram({ patientId, patientName = "Laura Medina", onSave }: OdontogramProps) {
  const [teeth, setTeeth] = useState<ToothData[]>(() => {
    const initialTeeth = createInitialTeeth()
    const exampleData = [
      { number: 21, condition: "CARIES OCLUSAL", surfaces: ["Oclu"], diagnosis: "CARIES OCLUSAL" },
      { number: 11, condition: "OBTURACIÓN", surfaces: ["Mesial", "Oclu"], diagnosis: "OBTURACIÓN MESIO-OCLUSAL" },
      { number: 16, condition: "CORONA", surfaces: [], diagnosis: "CORONA DE PORCELANA" },
    ]

    return initialTeeth.map((tooth) => {
      const example = exampleData.find((ex) => ex.number === tooth.number)
      if (example) {
        const conditionData = TOOTH_CONDITIONS[example.condition as keyof typeof TOOTH_CONDITIONS]
        return {
          ...tooth,
          condition: example.condition,
          surfaces: example.surfaces,
          diagnosis: example.diagnosis,
          color: conditionData.color,
          symbol: conditionData.symbol,
        }
      }
      return tooth
    })
  })

  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([])
  const [selectedCondition, setSelectedCondition] = useState<string>("SANO")
  const [activeTab, setActiveTab] = useState("tratamientos")

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber)
    const tooth = teeth.find((t) => t.number === toothNumber)
    if (tooth) {
      setSelectedSurfaces(tooth.surfaces)
      setSelectedCondition(tooth.condition)
    } else {
      setSelectedSurfaces([])
      setSelectedCondition("SANO")
    }
  }

  const handleSurfaceChange = (surface: string, checked: boolean) => {
    if (checked) {
      setSelectedSurfaces((prev) => [...prev, surface])
    } else {
      setSelectedSurfaces((prev) => prev.filter((s) => s !== surface))
    }
  }

  const handleTreat = () => {
    if (selectedTooth) {
      const conditionData = TOOTH_CONDITIONS[selectedCondition as keyof typeof TOOTH_CONDITIONS]
      const updatedTeeth = teeth.map((tooth) =>
        tooth.number === selectedTooth
          ? {
              ...tooth,
              condition: selectedCondition,
              surfaces: selectedSurfaces,
              color: conditionData.color,
              symbol: conditionData.symbol,
              diagnosis: conditionData.diagnosis,
            }
          : tooth,
      )
      setTeeth(updatedTeeth)
      onSave?.(updatedTeeth)
    }
  }

  const renderTooth = (toothNumber: number, isUpper: boolean) => {
    const tooth = teeth.find((t) => t.number === toothNumber)
    const isSelected = selectedTooth === toothNumber
    const conditionData = tooth
      ? TOOTH_CONDITIONS[tooth.condition as keyof typeof TOOTH_CONDITIONS]
      : TOOTH_CONDITIONS.SANO

    return (
      <div key={toothNumber} className="flex flex-col items-center">
        {isUpper && <div className="text-xs font-mono mb-1 text-gray-600">{toothNumber}</div>}

        <div
          className={`
            w-10 h-10 border-2 cursor-pointer flex items-center justify-center text-lg font-bold
            rounded-lg transition-all duration-200 hover:scale-105
            ${conditionData.color} 
            ${isSelected ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"}
          `}
          onClick={() => handleToothClick(toothNumber)}
          title={`Diente ${toothNumber}${tooth?.diagnosis ? ` - ${tooth.diagnosis}` : ""}`}
        >
          {conditionData.symbol}
        </div>

        {tooth && tooth.surfaces.length > 0 && (
          <div className="flex mt-1 gap-0.5">
            {tooth.surfaces.slice(0, 3).map((surface, index) => (
              <div key={index} className="w-1 h-1 bg-red-500 rounded-full"></div>
            ))}
            {tooth.surfaces.length > 3 && <div className="text-xs text-red-500 ml-1">+{tooth.surfaces.length - 3}</div>}
          </div>
        )}

        {!isUpper && <div className="text-xs font-mono mt-1 text-gray-600">{toothNumber}</div>}
      </div>
    )
  }

  const getStatistics = () => {
    const stats: Record<string, number> = {}
    teeth.forEach((tooth) => {
      stats[tooth.condition] = (stats[tooth.condition] || 0) + 1
    })
    return stats
  }

  const getHistory = () => [
    {
      date: "2024-01-15",
      tooth: 16,
      treatment: "Corona de porcelana",
      doctor: "Dr. Carlos Ruiz",
      status: "Completado",
    },
    { date: "2024-01-10", tooth: 21, treatment: "Diagnóstico de caries", doctor: "Dr. Ana López", status: "Pendiente" },
    {
      date: "2023-12-20",
      tooth: 11,
      treatment: "Obturación mesio-oclusal",
      doctor: "Dr. Carlos Ruiz",
      status: "Completado",
    },
  ]

  const selectedToothData = teeth.find((t) => t.number === selectedTooth)

  return (
    <div className="w-full max-w-7xl mx-auto bg-white">
      <div className="bg-blue-600 text-white">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-blue-700 border-0 h-12">
            <TabsTrigger
              value="tratamientos"
              className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white flex items-center gap-2"
            >
              <Stethoscope className="h-4 w-4" />
              Tratamientos
            </TabsTrigger>
            <TabsTrigger
              value="historial"
              className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Historial
            </TabsTrigger>
            <TabsTrigger
              value="estadistica"
              className="text-white data-[state=active]:bg-blue-500 data-[state=active]:text-white flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Estadística
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex min-h-[600px]">
        <div className="flex-1 p-6 bg-gray-50">
          <TabsContent value="tratamientos" className="mt-0">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="mb-12">
                <div className="text-center text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                  Maxilar Superior
                </div>
                <div className="flex justify-center gap-3 mb-6">
                  {UPPER_TEETH.map((toothNumber) => renderTooth(toothNumber, true))}
                </div>

                <div className="flex justify-center gap-3">
                  {UPPER_TEETH.map((toothNumber) => {
                    const tooth = teeth.find((t) => t.number === toothNumber)
                    const conditionData = tooth
                      ? TOOTH_CONDITIONS[tooth.condition as keyof typeof TOOTH_CONDITIONS]
                      : TOOTH_CONDITIONS.SANO

                    return (
                      <div key={`graphic-upper-${toothNumber}`} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-8 border-2 rounded-t-lg ${conditionData.color} relative overflow-hidden`}
                        >
                          {tooth && tooth.surfaces.includes("Oclu") && (
                            <div className="absolute top-0 left-0 right-0 h-2 bg-red-400 opacity-70"></div>
                          )}
                          {tooth && tooth.surfaces.includes("Vest") && (
                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-400 opacity-70"></div>
                          )}
                          {tooth && tooth.surfaces.includes("Ling") && (
                            <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-400 opacity-70"></div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-6 text-gray-500 font-medium">Línea Media</span>
                </div>
              </div>

              <div>
                <div className="flex justify-center gap-3 mb-6">
                  {LOWER_TEETH.map((toothNumber) => {
                    const tooth = teeth.find((t) => t.number === toothNumber)
                    const conditionData = tooth
                      ? TOOTH_CONDITIONS[tooth.condition as keyof typeof TOOTH_CONDITIONS]
                      : TOOTH_CONDITIONS.SANO

                    return (
                      <div key={`graphic-lower-${toothNumber}`} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-8 border-2 rounded-b-lg ${conditionData.color} relative overflow-hidden`}
                        >
                          {tooth && tooth.surfaces.includes("Oclu") && (
                            <div className="absolute bottom-0 left-0 right-0 h-2 bg-red-400 opacity-70"></div>
                          )}
                          {tooth && tooth.surfaces.includes("Vest") && (
                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-400 opacity-70"></div>
                          )}
                          {tooth && tooth.surfaces.includes("Ling") && (
                            <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-400 opacity-70"></div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-center gap-3 mb-4">
                  {LOWER_TEETH.map((toothNumber) => renderTooth(toothNumber, false))}
                </div>

                <div className="text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Maxilar Inferior
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="historial" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Historial de Tratamientos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getHistory().map((entry, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border">
                      <div className="flex-1">
                        <div className="font-semibold text-lg">Diente {entry.tooth}</div>
                        <div className="text-sm text-gray-600 mt-1">{entry.treatment}</div>
                        <div className="text-xs text-gray-500 mt-2">{entry.doctor}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{entry.date}</div>
                        <Badge variant={entry.status === "Completado" ? "default" : "secondary"} className="mt-1">
                          {entry.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estadistica" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Estadísticas Dentales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(getStatistics()).map(([condition, count]) => {
                    const conditionData = TOOTH_CONDITIONS[condition as keyof typeof TOOTH_CONDITIONS]
                    return (
                      <div key={condition} className={`text-center p-4 rounded-lg border-2 ${conditionData.color}`}>
                        <div className="text-3xl font-bold mb-2">{count}</div>
                        <div className="text-sm font-medium">{condition}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>

        <div className="w-80 bg-white border-l border-gray-200">
          <div className="p-6 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profesional
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg font-semibold">{patientName}</div>
                <div className="text-sm text-gray-600">ID: {patientId}</div>
              </CardContent>
            </Card>

            {selectedTooth && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Diente Seleccionado</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{selectedTooth}</div>
                    {selectedToothData && (
                      <Badge variant="outline" className="text-xs">
                        {selectedToothData.diagnosis}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <div className="font-semibold mb-3 text-sm">Superficies</div>
                    <div className="grid grid-cols-2 gap-2">
                      {SURFACES.map((surface) => (
                        <div key={surface} className="flex items-center space-x-2">
                          <Checkbox
                            id={surface}
                            checked={selectedSurfaces.includes(surface)}
                            onCheckedChange={(checked) => handleSurfaceChange(surface, checked as boolean)}
                          />
                          <label htmlFor={surface} className="text-sm cursor-pointer">
                            {surface}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold mb-3 text-sm">Diagnóstico</div>
                    <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(TOOTH_CONDITIONS).map((condition) => (
                          <SelectItem key={condition} value={condition} className="text-sm">
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleTreat}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                    disabled={!selectedTooth}
                  >
                    Tratar
                  </Button>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={() => onSave?.(teeth)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Guardar Odontograma
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
