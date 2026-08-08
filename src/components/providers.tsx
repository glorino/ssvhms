"use client"

import { SessionProvider } from "next-auth/react"
import { PatientProvider } from "@/lib/patient-context"
import { NotificationProvider } from "@/lib/notification-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PatientProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </PatientProvider>
    </SessionProvider>
  )
}
