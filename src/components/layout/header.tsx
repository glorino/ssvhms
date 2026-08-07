"use client"

import React from "react"
import Link from "next/link"
import { Bell, Search, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search patients, doctors, bills..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white">
            5
          </span>
        </Button>
        <div className="flex items-center gap-2 border-l pl-4 ml-2">
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-sm font-medium text-white">SA</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">Super Admin</p>
            <p className="text-xs text-slate-500">admin@ssvhms.com</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
