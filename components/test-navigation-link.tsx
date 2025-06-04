"use client"

import Link from "next/link"
import { TestTube, ArrowRight } from "lucide-react"

export function TestNavigationLink() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        href="/dashboard/test-interactions"
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <TestTube className="h-5 w-5" />
        Probar Interacciones
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
