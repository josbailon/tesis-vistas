"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const [userType, setUserType] = useState("patient")

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Crear Cuenta</h1>
          <p className="text-sm text-muted-foreground">Ingresa tus datos para registrarte en el sistema</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Registro de Usuario</CardTitle>
            <CardDescription>Completa el formulario para crear tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-type">Tipo de Usuario</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger id="user-type">
                  <SelectValue placeholder="Selecciona tu tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Paciente</SelectItem>
                  <SelectItem value="student">Estudiante</SelectItem>
                  <SelectItem value="professor">Profesor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" placeholder="Nombre y Apellidos" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input id="confirm-password" type="password" />
            </div>
            {userType === "patient" && (
              <div className="space-y-2">
                <Label htmlFor="dob">Fecha de Nacimiento</Label>
                <Input id="dob" type="date" />
              </div>
            )}
            {userType === "student" && (
              <div className="space-y-2">
                <Label htmlFor="student-id">Número de Estudiante</Label>
                <Input id="student-id" placeholder="Ej: E12345" />
              </div>
            )}
            {userType === "professor" && (
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad</Label>
                <Select defaultValue="">
                  <SelectTrigger id="specialty">
                    <SelectValue placeholder="Selecciona tu especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="endodoncia">Endodoncia</SelectItem>
                    <SelectItem value="ortodoncia">Ortodoncia</SelectItem>
                    <SelectItem value="periodoncia">Periodoncia</SelectItem>
                    <SelectItem value="cirugia">Cirugía Oral</SelectItem>
                    <SelectItem value="odontopediatria">Odontopediatría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" type="submit">
              Registrarse
            </Button>
            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                Iniciar Sesión
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
