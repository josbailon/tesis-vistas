import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()

    if (session) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          role: session.user.role,
        },
      })
    } else {
      return NextResponse.json({ authenticated: false })
    }
  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json({ authenticated: false, error: "Error al verificar la sesión" }, { status: 500 })
  }
}
