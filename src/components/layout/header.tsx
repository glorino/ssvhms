"use client"

import React, { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, User, LogOut, Settings, Moon, Sun, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"

const notifications = [
  { id: 1, title: "New patient registered", message: "Rajesh Kumar has been added", time: "5 min ago", read: false },
  { id: 2, title: "Appointment confirmed", message: "Dr. Priya Sharma - 10:00 AM", time: "15 min ago", read: false },
  { id: 3, title: "Lab results ready", message: "CBC test completed for Anita Patel", time: "1 hour ago", read: true },
  { id: 4, title: "Payment received", message: "₦15,000 from Suresh Reddy", time: "2 hours ago", read: true },
  { id: 5, title: "Bed status update", message: "ICU-03 now available", time: "3 hours ago", read: true },
]

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
}

function getRoleLabel(role: string) {
  return role.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}

export function Header() {
  const { data: session } = useSession()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const user = session?.user as any
  const userName = user?.name || "User"
  const userEmail = user?.email || ""
  const userRole = user?.role || "USER"
  const initials = getInitials(userName)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 30, height: 64,
      borderBottom: "1px solid #e2e8f0", background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", gap: 16, padding: "0 24px" }}>
        {/* Search */}
        <div style={{ flex: 1, maxWidth: 400 }}>
          <div style={{ position: "relative" }}>
            <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#94a3b8" }} />
            <input
              type="search"
              placeholder="Search patients, doctors, bills..."
              style={{
                width: "100%", padding: "10px 12px 10px 40px", borderRadius: 10,
                border: "1px solid #e2e8f0", fontSize: 13, color: "#0f172a",
                background: "#f8fafc", outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Theme Toggle */}
          <button style={{
            width: 36, height: 36, borderRadius: 10, border: "none", background: "none",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b",
          }}>
            <Moon size={18} />
          </button>

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                width: 36, height: 36, borderRadius: 10, border: "none", background: "none",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                color: "#64748b", position: "relative",
              }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute", top: -2, right: -2,
                  width: 18, height: 18, borderRadius: "50%",
                  background: "linear-gradient(135deg, #ef4444, #ec4899)",
                  color: "#fff", fontSize: 10, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: "absolute", right: 0, top: 44, width: 320,
                    background: "#fff", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    border: "1px solid #e2e8f0", overflow: "hidden", zIndex: 50,
                  }}
                >
                  <div style={{ padding: 16, borderBottom: "1px solid #f1f5f9", background: "linear-gradient(135deg, #0f766e, #14b8a6)" }}>
                    <h3 style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>Notifications</h3>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{unreadCount} unread</p>
                  </div>
                  <div style={{ maxHeight: 320, overflowY: "auto" }}>
                    {notifications.map((notif) => (
                      <div key={notif.id} style={{
                        padding: "12px 16px", borderBottom: "1px solid #f1f5f9",
                        background: !notif.read ? "rgba(20,184,166,0.04)" : "#fff", cursor: "pointer",
                      }}>
                        <div style={{ display: "flex", gap: 10 }}>
                          <div style={{
                            width: 8, height: 8, borderRadius: "50%", marginTop: 6, flexShrink: 0,
                            background: !notif.read ? "#14b8a6" : "transparent",
                          }} />
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{notif.title}</p>
                            <p style={{ fontSize: 12, color: "#64748b" }}>{notif.message}</p>
                            <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 12, borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                    <button style={{ fontSize: 13, fontWeight: 500, color: "#14b8a6", background: "none", border: "none", cursor: "pointer" }}>
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 32, background: "#e2e8f0", margin: "0 4px" }} />

          {/* Profile */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: 6, borderRadius: 12,
                border: "none", background: "none", cursor: "pointer",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 13, fontWeight: 600,
                boxShadow: "0 2px 8px rgba(20,184,166,0.3)",
              }}>
                {initials}
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", lineHeight: 1.2 }}>{userName}</p>
                <p style={{ fontSize: 11, color: "#94a3b8" }}>{getRoleLabel(userRole)}</p>
              </div>
              <ChevronDown style={{ width: 14, height: 14, color: "#94a3b8" }} />
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: "absolute", right: 0, top: 48, width: 220,
                    background: "#fff", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    border: "1px solid #e2e8f0", overflow: "hidden", zIndex: 50,
                  }}
                >
                  <div style={{ padding: 16, borderBottom: "1px solid #f1f5f9" }}>
                    <p style={{ fontWeight: 600, color: "#0f172a", fontSize: 14 }}>{userName}</p>
                    <p style={{ fontSize: 12, color: "#64748b" }}>{userEmail}</p>
                    <span style={{
                      display: "inline-block", marginTop: 4, padding: "2px 8px", borderRadius: 6,
                      fontSize: 10, fontWeight: 600, background: "rgba(20,184,166,0.1)", color: "#0f766e",
                    }}>
                      {getRoleLabel(userRole)}
                    </span>
                  </div>
                  <div style={{ padding: 8 }}>
                    <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, border: "none", background: "none", fontSize: 13, color: "#475569", cursor: "pointer" }}>
                      <User size={16} /> My Profile
                    </button>
                    <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, border: "none", background: "none", fontSize: 13, color: "#475569", cursor: "pointer" }}>
                      <Settings size={16} /> Settings
                    </button>
                    <div style={{ height: 1, background: "#f1f5f9", margin: "4px 0" }} />
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, border: "none", background: "none", fontSize: 13, color: "#dc2626", cursor: "pointer" }}
                    >
                      <LogOut size={16} /> Sign Out
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
