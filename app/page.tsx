import Link from "next/link"
import { Calendar, Users, Activity, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Appointment Management System</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your scheduling with our comprehensive appointment management platform
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Smart Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Intelligent appointment scheduling with conflict detection and availability management
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Student Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Dedicated student management system with progress tracking and scheduling
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Activity className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
              <CardTitle>Status Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visual status indicators with traffic light system for quick status recognition
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Daily Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Comprehensive daily view with time slots and appointment details</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/appointments">
            <Button size="lg" className="w-full sm:w-auto">
              <Calendar className="mr-2 h-5 w-5" />
              Manage Appointments
            </Button>
          </Link>
          <Link href="/students">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Users className="mr-2 h-5 w-5" />
              Student Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
