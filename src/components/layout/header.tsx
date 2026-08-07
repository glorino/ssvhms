"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, User, LogOut, Settings, Moon, Sun, ChevronDown, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const notifications = [
  { id: 1, title: "New patient registered", message: "Rajesh Kumar has been added", time: "5 min ago", read: false, type: "patient" },
  { id: 2, title: "Appointment confirmed", message: "Dr. Priya Sharma - 10:00 AM", time: "15 min ago", read: false, type: "appointment" },
  { id: 3, title: "Lab results ready", message: "CBC test completed for Anita Patel", time: "1 hour ago", read: true, type: "lab" },
  { id: 4, title: "Payment received", message: "₹15,000 from Suresh Reddy", time: "2 hours ago", read: true, type: "payment" },
  { id: 5, title: "Bed status update", message: "ICU-03 now available", time: "3 hours ago", read: true, type: "bed" },
]

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-white/80 backdrop-blur-xl">
      <div className="flex h-full items-center gap-4 px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
            <Input
              type="search"
              placeholder="Search patients, doctors, bills..."
              className="pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className="h-9 w-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-9 w-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 relative transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden"
                >
                  <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-500">
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <p className="text-xs text-white/80">{unreadCount} unread</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        whileHover={{ backgroundColor: "#f8fafc" }}
                        className={`p-4 border-b cursor-pointer ${
                          !notif.read ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`h-2 w-2 rounded-full mt-2 ${
                              !notif.read ? "bg-blue-500" : "bg-transparent"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{notif.title}</p>
                            <p className="text-xs text-slate-500">{notif.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-3 border-t">
                    <Button variant="ghost" className="w-full text-sm">
                      View All Notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-slate-200 mx-1" />

          {/* Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                SA
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-900">Super Admin</p>
                <p className="text-xs text-slate-500">admin@ssvhms.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </motion.button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border overflow-hidden"
                >
                  <div className="p-4 border-b">
                    <p className="font-semibold text-slate-900">Super Admin</p>
                    <p className="text-sm text-slate-500">admin@ssvhms.com</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                      <User className="h-4 w-4" />
                      My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <div className="my-2 h-px bg-slate-100" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
