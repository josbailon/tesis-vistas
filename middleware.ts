import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Permitir que todas las rutas continúen sin verificación
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
