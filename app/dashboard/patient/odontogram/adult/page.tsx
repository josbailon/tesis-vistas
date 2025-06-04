"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Download, RotateCcw, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Definición de dientes permanentes según FDI
const adultTeeth = {
  maxillarRight: [18, 17, 16, 15, 14, 13, 12, 11],
  maxillarLeft: [21, 22, 23, 24, 25, 26, 27, 28],
  mandibularLeft: [31, 32, 33, 34, 35, 36, 37, 38],
  mandibularRight: [48, 47, 46, 45, 44, 43, 42, 41],
}

const toothStates = [
  { value: "healthy", label: "Sano", symbol: "S", className: "tooth-healthy" },
  { value: "caries", label: "Caries", symbol: "C", className: "tooth-caries" },
  { value: "filled", label: "Obturado", symbol: "O", className: "tooth-filled" },
  { value: "crown", label: "Corona", symbol: "Co", className: "tooth-crown" },
  { value: "missing", label: "Ausente", symbol: "X", className: "tooth-missing" },
  { value: "root-canal", label: "Endodoncia", symbol: "E", className: "tooth-root-canal" },
  { value: "implant", label: "Implante", symbol: "I", className: "tooth-implant" },
]

export default function AdultOdontogramPage() {
  const [toothConditions, setToothConditions] = useState<{ [key: number]: string }>({})
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [selectedState, setSelectedState] = useState("")

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber)
    setSelectedState(toothConditions[toothNumber] || "healthy")
  }

  const handleStateChange = (state: string) => {
    if (selectedTooth) {
      setToothConditions((prev) => ({
        ...prev,
        [selectedTooth]: state,
      }))
      setSelectedState(state)
    }
  }

  const getToothDisplay = (toothNumber: number) => {
    const condition = toothConditions[toothNumber] || "healthy"
    const stateInfo = toothStates.find((s) => s.value === condition)
    return {
      symbol: stateInfo?.symbol || "S",
      className: stateInfo?.className || "tooth-healthy",
    }
  }

  const resetOdontogram = () => {
    setToothConditions({})
    setSelectedTooth(null)
    setSelectedState("")
  }

  const saveOdontogram = () => {
    // Simular guardado
    alert("Odontograma guardado exitosamente")
  }

  const exportOdontogram = () => {
    // Simular exportación
    alert("Odontograma exportado como PDF")
  }

  const ToothComponent = ({ number }: { number: number }) => {
    const { symbol, className } = getToothDisplay(number)
    const isSelected = selectedTooth === number

    return (
      <div
        className={`tooth ${className} ${isSelected ? "ring-2 ring-blue-500 scale-110" : ""}`}
        onClick={() => handleToothClick(number)}
        title={`Diente ${number}`}
      >
        {symbol}
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4 fade-in">
        <Link href="/dashboard/patient/odontogram">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Odontograma Adulto
          </h1>
          <p className="text-gray-600 mt-1">Dentición permanente completa (32 dientes) - Sistema FDI</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Odontograma principal */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-800">
                <span>Odontograma Interactivo</span>
                <Badge variant="outline">32 dientes</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Maxilar Superior */}
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-600 mb-3">MAXILAR SUPERIOR</h3>
                  <div className="flex justify-center gap-1 mb-2">
                    <span className="text-xs text-gray-500 w-8">Der</span>
                    <div className="flex gap-1">
                      {adultTeeth.maxillarRight.map((number) => (
                        <ToothComponent key={number} number={number} />
                      ))}
                    </div>
                    <div className="w-4"></div>
                    <div className="flex gap-1">
                      {adultTeeth.maxillarLeft.map((number) => (
                        <ToothComponent key={number} number={number} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 w-8">Izq</span>
                  </div>
                  <div className="flex justify-center gap-1 text-xs text-gray-400">
                    {adultTeeth.maxillarRight.map((number) => (
                      <span key={number} className="w-10 text-center">
                        {number}
                      </span>
                    ))}
                    <span className="w-4"></span>
                    {adultTeeth.maxillarLeft.map((number) => (
                      <span key={number} className="w-10 text-center">
                        {number}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t-2 border-dashed border-gray-300 mx-8"></div>

                {/* Maxilar Inferior */}
                <div className="text-center">
                  <div className="flex justify-center gap-1 text-xs text-gray-400 mb-1">
                    {adultTeeth.mandibularRight.reverse().map((number) => (
                      <span key={number} className="w-10 text-center">
                        {number}
                      </span>
                    ))}
                    <span className="w-4"></span>
                    {adultTeeth.mandibularLeft.map((number) => (
                      <span key={number} className="w-10 text-center">
                        {number}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center gap-1 mb-3">
                    <span className="text-xs text-gray-500 w-8">Der</span>
                    <div className="flex gap-1">
                      {adultTeeth.mandibularRight.map((number) => (
                        <ToothComponent key={number} number={number} />
                      ))}
                    </div>
                    <div className="w-4"></div>
                    <div className="flex gap-1">
                      {adultTeeth.mandibularLeft.map((number) => (
                        <ToothComponent key={number} number={number} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 w-8">Izq</span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">MAXILAR INFERIOR</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de control */}
        <div className="space-y-6">
          {/* Selector de estado */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-gray-800">
                {selectedTooth ? `Diente ${selectedTooth}` : "Seleccionar Diente"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTooth ? (
                <>
                  <div className="text-sm text-gray-600">Selecciona el estado del diente:</div>
                  <Select value={selectedState} onValueChange={handleStateChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado del diente" />
                    </SelectTrigger>
                    <SelectContent>
                      {toothStates.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          <div className="flex items-center gap-2">
                            <div className={`tooth ${state.className} scale-75`}>{state.symbol}</div>
                            {state.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Info className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Haz clic en un diente para editarlo</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leyenda */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-gray-800">Leyenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {toothStates.map((state) => (
                  <div key={state.value} className="flex items-center gap-2">
                    <div className={`tooth ${state.className} scale-75`}>{state.symbol}</div>
                    <span>{state.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="text-gray-800">Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={saveOdontogram} className="w-full btn-medical">
                <Save className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              <Button onClick={exportOdontogram} className="w-full btn-medical-secondary">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button onClick={resetOdontogram} variant="outline" className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
