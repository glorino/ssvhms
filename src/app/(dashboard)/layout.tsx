"use client"

import React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="pl-[280px] transition-all duration-300 min-w-0 overflow-x-hidden">
        <Header />
        <main className="p-6 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
