"use client"

import { useState } from "react"
import { Plus, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentForm } from "@/components/appointment-form"
import { DailyAgenda } from "@/components/daily-agenda"
import { AppointmentList } from "@/components/appointment-list"

export default function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Citas</h1>
            <p className="text-gray-600">
              Administra y rastrea todas las citas con actualizaciones de estado en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar citas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="agenda" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agenda">Agenda Diaria</TabsTrigger>
            <TabsTrigger value="list">Todas las Citas</TabsTrigger>
          </TabsList>

          <TabsContent value="agenda">
            <DailyAgenda selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </TabsContent>

          <TabsContent value="list">
            <AppointmentList searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>

        {/* Appointment Form Modal */}
        {showForm && <AppointmentForm onClose={() => setShowForm(false)} onSuccess={() => setShowForm(false)} />}
      </div>
    </div>
  )
}
