import { type NextRequest, NextResponse } from "next/server"
import { authenticate } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email y contraseña son requeridos" }, { status: 400 })
    }

    const result = await authenticate(email, password)

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 401 })
    }

    // Crear una respuesta con la cookie de sesión ya establecida por authenticate()
    return NextResponse.json({
      success: true,
      user: {
        id: result.user?.id,
        name: result.user?.name,
        email: result.user?.email,
        role: result.user?.role,
      },
      redirectUrl: "/dashboard", // Añadir URL de redirección explícita
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 })
  }
}
