"use client"

import { SessionProvider } from "next-auth/react"
import { PatientProvider } from "@/lib/patient-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PatientProvider>{children}</PatientProvider>
    </SessionProvider>
  )
}
