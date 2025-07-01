"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ToothData {
  number: number
  condition: string
  surfaces: string[]
  notes: string
  color: string
  symbol: string
}

interface OdontogramProps {
  patientName?: string
  onSave?: (data: ToothData[]) => void
}

const TOOTH_CONDITIONS = {
  SANO: { color: "bg-white border-gray-300", symbol: "○" },
  "CARIES OCLUSAL": { color: "bg-red-500", symbol: "●" },
  OBTURACIÓN: { color: "bg-blue-500", symbol: "◐" },
  CORONA: { color: "bg-yellow-500", symbol: "◆" },
  EXTRACCIÓN: { color: "bg-black", symbol: "✕" },
  AUSENTE: { color: "bg-gray-400", symbol: "—" },
  ENDODONCIA: { color: "bg-purple-500", symbol: "◉" },
  IMPLANTE: { color: "bg-green-500", symbol: "⬢" },
  PRÓTESIS: { color: "bg-orange-500", symbol: "◈" },
}

const SURFACES = ["Vest", "Raz", "Oclu", "Ling", "Mesial", "Distal"]

const INITIAL_TEETH = Array.from({ length: 32 }, (_, i) => ({
  number: i < 16 ? 18 - i : 31 + (16 - i),
  condition: "SANO",
  surfaces: [],
  notes: "",
  color: "bg-white border-gray-300",
  symbol: "○",
}))

export default function ProfessionalOdontogram({ patientName = "Laura Medina", onSave }: OdontogramProps) {
  const [teeth, setTeeth] = useState<ToothData[]>(INITIAL_TEETH)
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
    }
  }

  const handleSurfaceChange = (surface: string, checked: boolean) => {
    if (checked) {
      setSelectedSurfaces([...selectedSurfaces, surface])
    } else {
      setSelectedSurfaces(selectedSurfaces.filter((s) => s !== surface))
    }
  }

  const handleTreat = () => {
    if (selectedTooth) {
      const updatedTeeth = teeth.map((tooth) =>
        tooth.number === selectedTooth
          ? {
              ...tooth,
              condition: selectedCondition,
              surfaces: selectedSurfaces,
              color: TOOTH_CONDITIONS[selectedCondition as keyof typeof TOOTH_CONDITIONS].color,
              symbol: TOOTH_CONDITIONS[selectedCondition as keyof typeof TOOTH_CONDITIONS].symbol,
            }
          : tooth,
      )
      setTeeth(updatedTeeth)
      onSave?.(updatedTeeth)
    }
  }

  const renderTooth = (tooth: ToothData, isUpper: boolean) => {
    const isSelected = selectedTooth === tooth.number
    const conditionData = TOOTH_CONDITIONS[tooth.condition as keyof typeof TOOTH_CONDITIONS]

    return (
      <div key={tooth.number} className="flex flex-col items-center">
        <div className="text-xs font-mono mb-1">{tooth.number}</div>
        <div
          className={`
            w-8 h-8 border-2 cursor-pointer flex items-center justify-center text-sm font-bold
            ${conditionData.color} ${isSelected ? "ring-2 ring-blue-500" : ""}
            hover:ring-2 hover:ring-blue-300 transition-all
          `}
          onClick={() => handleToothClick(tooth.number)}
        >
          {conditionData.symbol}
        </div>
        {tooth.surfaces.length > 0 && (
          <div className="flex mt-1">
            {tooth.surfaces.map((surface) => (
              <div key={surface} className="w-1 h-1 bg-red-500 rounded-full mx-0.5"></div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const upperTeeth = teeth.filter((t) => t.number >= 11 && t.number <= 28)
  const lowerTeeth = teeth.filter((t) => t.number >= 31 && t.number <= 48)

  const getStatistics = () => {
    const stats: Record<string, number> = {}
    teeth.forEach((tooth) => {
      stats[tooth.condition] = (stats[tooth.condition] || 0) + 1
    })
    return stats
  }

  const getHistory = () => [
    { date: "2024-01-15", tooth: 16, treatment: "Obturación oclusal", doctor: "Dr. Carlos Ruiz" },
    { date: "2024-01-10", tooth: 26, treatment: "Limpieza dental", doctor: "Dr. Ana López" },
    { date: "2023-12-20", tooth: 36, treatment: "Endodoncia", doctor: "Dr. Carlos Ruiz" },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-blue-700">
            <TabsTrigger value="tratamientos" className="text-white data-[state=active]:bg-blue-500">
              Tratamientos
            </TabsTrigger>
            <TabsTrigger value="historial" className="text-white data-[state=active]:bg-blue-500">
              Historial
            </TabsTrigger>
            <TabsTrigger value="estadistica" className="text-white data-[state=active]:bg-blue-500">
              Estadística
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex">
        {/* Main Odontogram Area */}
        <div className="flex-1 p-6 bg-gray-50">
          <TabsContent value="tratamientos">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* Upper Teeth */}
              <div className="mb-8">
                <div className="grid grid-cols-8 gap-4 justify-center mb-4">
                  {upperTeeth.slice(0, 8).map((tooth) => renderTooth(tooth, true))}
                </div>
                <div className="grid grid-cols-8 gap-4 justify-center">
                  {upperTeeth.slice(8, 16).map((tooth) => renderTooth(tooth, true))}
                </div>
              </div>

              {/* Lower Teeth */}
              <div>
                <div className="grid grid-cols-8 gap-4 justify-center mb-4">
                  {lowerTeeth.slice(0, 8).map((tooth) => renderTooth(tooth, false))}
                </div>
                <div className="grid grid-cols-8 gap-4 justify-center">
                  {lowerTeeth.slice(8, 16).map((tooth) => renderTooth(tooth, false))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="historial">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Tratamientos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getHistory().map((entry, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-semibold">Diente {entry.tooth}</div>
                        <div className="text-sm text-gray-600">{entry.treatment}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{entry.date}</div>
                        <div className="text-xs text-gray-500">{entry.doctor}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estadistica">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas Dentales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(getStatistics()).map(([condition, count]) => (
                    <div key={condition} className="text-center p-4 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">{count}</div>
                      <div className="text-sm text-gray-600">{condition}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>

        {/* Right Panel */}
        <div className="w-80 bg-white border-l p-6">
          <div className="space-y-6">
            {/* Patient Info */}
            <div>
              <div className="text-sm text-gray-500">Profesional</div>
              <div className="font-semibold">{patientName}</div>
            </div>

            {/* Selected Tooth */}
            {selectedTooth && (
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{selectedTooth}</div>
                  <Badge variant="outline">Diente seleccionado</Badge>
                </div>
              </div>
            )}

            {/* Surfaces */}
            <div>
              <div className="font-semibold mb-3">Superficies</div>
              <div className="grid grid-cols-2 gap-2">
                {SURFACES.map((surface) => (
                  <div key={surface} className="flex items-center space-x-2">
                    <Checkbox
                      id={surface}
                      checked={selectedSurfaces.includes(surface)}
                      onCheckedChange={(checked) => handleSurfaceChange(surface, checked as boolean)}
                    />
                    <label htmlFor={surface} className="text-sm">
                      {surface}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnosis */}
            <div>
              <div className="font-semibold mb-3">Diagnóstico</div>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TOOTH_CONDITIONS).map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Treat Button */}
            <Button onClick={handleTreat} className="w-full bg-green-600 hover:bg-green-700" disabled={!selectedTooth}>
              Tratar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
