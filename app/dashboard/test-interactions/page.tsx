"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, Trash2, Eye, Plus, CheckCircle, AlertCircle, Info, X } from "lucide-react"

export default function InteractionsTestPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, type: "success", message: "Cita confirmada exitosamente" },
    { id: 2, type: "warning", message: "Recordatorio: Cita mañana a las 10:00" },
    { id: 3, type: "info", message: "Nueva funcionalidad disponible" },
  ])

  const testButtons = [
    { label: "Botón Primario", variant: "primary", icon: Plus },
    { label: "Botón Secundario", variant: "secondary", icon: Edit },
    { label: "Botón de Éxito", variant: "success", icon: CheckCircle },
    { label: "Botón de Advertencia", variant: "warning", icon: AlertCircle },
    { label: "Botón de Información", variant: "info", icon: Info },
    { label: "Botón de Peligro", variant: "danger", icon: Trash2 },
  ]

  const getButtonStyle = (variant: string) => {
    const styles = {
      primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white",
      secondary: "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white",
      success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white",
      warning: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white",
      info: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white",
      danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white",
    }
    return `${styles[variant as keyof typeof styles]} font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center gap-2`
  }

  const getNotificationStyle = (type: string) => {
    const styles = {
      success: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700",
      warning: "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 text-yellow-700",
      info: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-700",
    }
    return `${styles[type as keyof typeof styles]} p-4 rounded-lg border transition-all duration-200 hover:shadow-md`
  }

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-8 p-6">
      <div className="fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Prueba de Elementos Interactivos
        </h1>
        <p className="text-blue-600 mt-2 text-lg">Verificación de funcionalidad y experiencia de usuario</p>
      </div>

      {/* Sección de Botones */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-blue-700">Botones Interactivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testButtons.map((button, index) => {
              const Icon = button.icon
              return (
                <button
                  key={index}
                  className={getButtonStyle(button.variant)}
                  onClick={() => alert(`${button.label} clickeado!`)}
                >
                  <Icon className="h-5 w-5" />
                  {button.label}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sección de Formularios */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-blue-700">Elementos de Formulario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-700 font-medium mb-2">Campo de Búsqueda</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                <Input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-200 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-blue-700 font-medium mb-2">Selector de Filtro</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-blue-300 transition-all duration-200"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
                <option value="pending">Pendientes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="email"
              placeholder="Correo electrónico"
              className="border-blue-200 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-all duration-200"
            />
            <Input
              type="tel"
              placeholder="Teléfono"
              className="border-blue-200 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-all duration-200"
            />
            <Input
              type="date"
              className="border-blue-200 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-all duration-200"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sección de Badges y Estados */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-blue-700">Badges y Estados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors cursor-pointer">
              Confirmado
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors cursor-pointer">
              Pendiente
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors cursor-pointer">
              En Proceso
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors cursor-pointer">
              Completado
            </Badge>
            <Badge className="bg-red-100 text-red-700 hover:bg-red-200 transition-colors cursor-pointer">
              Cancelado
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Sección de Notificaciones */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-blue-700">Sistema de Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className={getNotificationStyle(notification.type)}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{notification.message}</span>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-current hover:bg-white/50 rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              setNotifications([
                ...notifications,
                {
                  id: Date.now(),
                  type: "info",
                  message: "Nueva notificación de prueba",
                },
              ])
            }
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Agregar Notificación
          </button>
        </CardContent>
      </Card>

      {/* Sección de Tarjetas Interactivas */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-blue-700">Tarjetas Interactivas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => alert(`Tarjeta ${item} clickeada!`)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-blue-700">Tarjeta {item}</h3>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </button>
                  </div>
                </div>
                <p className="text-blue-600 text-sm">
                  Esta es una tarjeta interactiva de ejemplo con efectos hover y click.
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Prueba */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-blue-700">Modal de Prueba</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="text-blue-600 mb-6">
              Este es un modal de prueba para verificar la funcionalidad de los elementos emergentes.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón para abrir modal */}
      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          Abrir Modal de Prueba
        </button>
      </div>
    </div>
  )
}
