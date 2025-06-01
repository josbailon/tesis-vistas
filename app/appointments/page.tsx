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
import { TrafficLight } from "@/components/traffic-light"
import { useAppointments } from "@/contexts/appointment-context"

export default function AppointmentsPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { appointments, getSystemStatus } = useAppointments()

  const systemStatus = getSystemStatus()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Management</h1>
            <p className="text-gray-600">Manage and track all appointments with real-time status updates</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <TrafficLight status={systemStatus} />
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
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
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="agenda" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agenda">Daily Agenda</TabsTrigger>
            <TabsTrigger value="list">All Appointments</TabsTrigger>
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
