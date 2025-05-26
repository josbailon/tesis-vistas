"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { UleamBranding } from "@/components/uleam-branding"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Edit3, Save, X, Shield, Heart, AlertTriangle, Info } from "lucide-react"

// Datos mock del perfil del paciente
const mockPatientProfile = {
  personalInfo: {
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+593 99 123 4567",
    address: "Av. 4 de Noviembre, Manta, Manabí",
    birthDate: "1995-03-15",
    gender: "Femenino",
    occupation: "Ingeniera de Sistemas",
    emergencyContact: {
      name: "Carlos González",
      relationship: "Hermano",
      phone: "+593 99 765 4321",
    },
  },
  medicalInfo: {
    bloodType: "O+",
    allergies: ["Penicilina", "Látex"],
    medications: ["Ibuprofeno 400mg (según necesidad)"],
    medicalConditions: ["Hipertensión controlada"],
    insuranceProvider: "IESS",
    insuranceNumber: "1234567890",
  },
  preferences: {
    preferredLanguage: "Español",
    communicationMethod: "Email",
    appointmentReminders: true,
    marketingEmails: false,
    dataSharing: true,
  },
}

export default function MyProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(mockPatientProfile)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsEditing(false)
    setLoading(false)
  }

  const handleCancel = () => {
    setProfileData(mockPatientProfile)
    setIsEditing(false)
  }

  return (
    <ProtectedRoute requiredRoles={["patient"]}>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white shadow-lg">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-4 border-white/20">
                  <AvatarImage src="/placeholder.svg" alt={user?.name} />
                  <AvatarFallback className="text-2xl bg-white/20">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
                  <p className="mt-2 text-blue-100">Gestiona tu información personal y preferencias</p>
                  <Badge variant="secondary" className="mt-2 bg-white/20 text-white">
                    Paciente ULEAM
                  </Badge>
                </div>
              </div>
              <div className="hidden md:block">
                <UleamBranding variant="header" />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal" className="gap-2">
              <User className="h-4 w-4" />
              Información Personal
            </TabsTrigger>
            <TabsTrigger value="medical" className="gap-2">
              <Heart className="h-4 w-4" />
              Información Médica
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Shield className="h-4 w-4" />
              Preferencias
            </TabsTrigger>
          </TabsList>

          {/* Información Personal */}
          <TabsContent value="personal">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Información Personal
                      </CardTitle>
                      <CardDescription>Mantén actualizada tu información de contacto</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <Button variant="outline" size="sm" onClick={handleCancel}>
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                          <Button size="sm" onClick={handleSave} disabled={loading}>
                            <Save className="h-4 w-4 mr-1" />
                            {loading ? "Guardando..." : "Guardar"}
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                          <Edit3 className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input
                        id="name"
                        value={profileData.personalInfo.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, name: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.personalInfo.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, email: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={profileData.personalInfo.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, phone: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={profileData.personalInfo.birthDate}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, birthDate: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Género</Label>
                      <Input
                        id="gender"
                        value={profileData.personalInfo.gender}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, gender: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Ocupación</Label>
                      <Input
                        id="occupation"
                        value={profileData.personalInfo.occupation}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            personalInfo: { ...profileData.personalInfo, occupation: e.target.value },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Textarea
                      id="address"
                      value={profileData.personalInfo.address}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          personalInfo: { ...profileData.personalInfo, address: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>

                  {/* Contacto de emergencia */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Contacto de Emergencia</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyName">Nombre</Label>
                        <Input
                          id="emergencyName"
                          value={profileData.personalInfo.emergencyContact.name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              personalInfo: {
                                ...profileData.personalInfo,
                                emergencyContact: {
                                  ...profileData.personalInfo.emergencyContact,
                                  name: e.target.value,
                                },
                              },
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyRelationship">Parentesco</Label>
                        <Input
                          id="emergencyRelationship"
                          value={profileData.personalInfo.emergencyContact.relationship}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              personalInfo: {
                                ...profileData.personalInfo,
                                emergencyContact: {
                                  ...profileData.personalInfo.emergencyContact,
                                  relationship: e.target.value,
                                },
                              },
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Teléfono</Label>
                        <Input
                          id="emergencyPhone"
                          value={profileData.personalInfo.emergencyContact.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              personalInfo: {
                                ...profileData.personalInfo,
                                emergencyContact: {
                                  ...profileData.personalInfo.emergencyContact,
                                  phone: e.target.value,
                                },
                              },
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Información Médica */}
          <TabsContent value="medical">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Información Médica
                  </CardTitle>
                  <CardDescription>Información importante para tu atención médica</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Esta información es confidencial y solo será compartida con el personal médico autorizado.
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Tipo de Sangre</Label>
                      <Input id="bloodType" value={profileData.medicalInfo.bloodType} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insuranceProvider">Seguro Médico</Label>
                      <Input
                        id="insuranceProvider"
                        value={profileData.medicalInfo.insuranceProvider}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Alergias</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profileData.medicalInfo.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Medicamentos Actuales</Label>
                      <div className="mt-2 space-y-2">
                        {profileData.medicalInfo.medications.map((medication, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">{medication}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Condiciones Médicas</Label>
                      <div className="mt-2 space-y-2">
                        {profileData.medicalInfo.medicalConditions.map((condition, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Preferencias */}
          <TabsContent value="preferences">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Preferencias y Privacidad
                  </CardTitle>
                  <CardDescription>
                    Configura cómo quieres recibir comunicaciones y gestionar tu privacidad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="preferredLanguage">Idioma Preferido</Label>
                      <Input
                        id="preferredLanguage"
                        value={profileData.preferences.preferredLanguage}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="communicationMethod">Método de Comunicación</Label>
                      <Input
                        id="communicationMethod"
                        value={profileData.preferences.communicationMethod}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Notificaciones</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Recordatorios de Citas</p>
                          <p className="text-sm text-muted-foreground">
                            Recibe recordatorios antes de tus citas programadas
                          </p>
                        </div>
                        <Badge variant={profileData.preferences.appointmentReminders ? "default" : "secondary"}>
                          {profileData.preferences.appointmentReminders ? "Activado" : "Desactivado"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Emails de Marketing</p>
                          <p className="text-sm text-muted-foreground">
                            Recibe información sobre nuevos servicios y promociones
                          </p>
                        </div>
                        <Badge variant={profileData.preferences.marketingEmails ? "default" : "secondary"}>
                          {profileData.preferences.marketingEmails ? "Activado" : "Desactivado"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Compartir Datos para Investigación</p>
                          <p className="text-sm text-muted-foreground">
                            Permitir el uso anónimo de datos para investigación médica
                          </p>
                        </div>
                        <Badge variant={profileData.preferences.dataSharing ? "default" : "secondary"}>
                          {profileData.preferences.dataSharing ? "Activado" : "Desactivado"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Puedes cambiar estas preferencias en cualquier momento. Los cambios se aplicarán inmediatamente.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
