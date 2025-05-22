"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const [userType, setUserType] = useState("patient")

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Iniciar Sesión</h1>
          <p className="text-sm text-muted-foreground">Ingresa tus credenciales para acceder al sistema</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Acceso al Sistema</CardTitle>
            <CardDescription>Selecciona tu tipo de usuario e ingresa tus credenciales</CardDescription>
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
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" type="submit">
              Iniciar Sesión
            </Button>
            <div className="text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
