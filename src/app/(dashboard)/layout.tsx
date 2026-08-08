"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const role = (session?.user as any)?.role || "SUPER_ADMIN"

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Sidebar userRole={role} />
      <div style={{ marginLeft: 280, transition: "margin-left 0.3s", minHeight: "100vh", overflow: "hidden", minWidth: 0 }}>
        <Header />
        <main style={{ padding: 24 }}>{children}</main>
      </div>
    </div>
  )
}
