"use client"
import { AppointmentForm } from "@/components/appointment-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateAppointmentPage() {
  const router = useRouter()

  const handleSubmit = (appointmentData: any) => {
    console.log("Nueva cita creada:", appointmentData)
    // Aquí guardarías los datos
    router.push("/dashboard/secretary/appointments")
  }

  const handleCancel = () => {
    router.push("/dashboard/secretary/appointments")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Nueva Cita</h1>
          <p className="text-muted-foreground">Programa una nueva cita para un paciente</p>
        </div>
      </div>

      <AppointmentForm mode="create" onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}
