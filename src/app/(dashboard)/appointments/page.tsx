"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  CalendarCheck,
} from "lucide-react"
import { usePatients } from "@/lib/patient-context"

export default function AppointmentsPage() {
  const { patients } = usePatients()
  const appointments = patients.flatMap(p => p.visits.map(v => ({ ...v, patient: `${p.firstName} ${p.lastName}` })))

  const totalApts = appointments.length
  const completedApts = appointments.filter(a => a.status === "Completed").length
  const inProgressApts = appointments.filter(a => a.status === "In Progress").length
  const scheduledApts = appointments.filter(a => a.status === "Scheduled").length
  const cancelledApts = appointments.filter(a => a.status === "Cancelled").length

  const statsData = [
    { title: "Total", value: totalApts, icon: Calendar, color: "#14b8a6", gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)", glow: "0 8px 32px rgba(20,184,166,0.35)" },
    { title: "Completed", value: completedApts, icon: CheckCircle, color: "#22c55e", gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", glow: "0 8px 32px rgba(34,197,94,0.35)" },
    { title: "In Progress", value: inProgressApts, icon: Clock, color: "#f97316", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", glow: "0 8px 32px rgba(249,115,22,0.35)" },
    { title: "Scheduled", value: scheduledApts, icon: AlertCircle, color: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", glow: "0 8px 32px rgba(59,130,246,0.35)" },
    { title: "Cancelled", value: cancelledApts, icon: XCircle, color: "#ef4444", gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", glow: "0 8px 32px rgba(239,68,68,0.35)" },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("2026-08-07")

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
    "Completed": { bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", color: "#16a34a", border: "#86efac" },
    "In Progress": { bg: "linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)", color: "#ea580c", border: "#fdba74" },
    "Scheduled": { bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)", color: "#2563eb", border: "#93c5fd" },
    "Cancelled": { bg: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)", color: "#dc2626", border: "#fca5a5" },
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Gradient Header */}
      <div style={{
        background: "linear-gradient(135deg, #14b8a6 0%, #3b82f6 50%, #8b5cf6 100%)",
        padding: "32px 32px 48px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)"
        }} />
        <div style={{
          position: "absolute",
          bottom: "-30px",
          left: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.07)"
        }} />
        <div style={{
          position: "absolute",
          top: "20px",
          left: "60%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)"
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                <CalendarCheck style={{ width: "32px", height: "32px", color: "white" }} />
                <h1 style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "white",
                  margin: 0,
                  letterSpacing: "-0.5px"
                }}>
                  Appointments
                </h1>
              </div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", margin: 0, marginLeft: "44px" }}>
                Manage patient appointments and scheduling
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    padding: "10px 14px 10px 36px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    cursor: "pointer"
                  }}
                />
                <Calendar style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  color: "rgba(255,255,255,0.7)"
                }} />
              </div>
              <Link href="/appointments/new" style={{ textDecoration: "none" }}>
                <button style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "none",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.3)"
                    e.currentTarget.style.transform = "translateY(-1px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.2)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <Plus style={{ width: "18px", height: "18px" }} />
                  New Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        maxWidth: "1400px",
        margin: "-28px auto 0",
        padding: "0 32px 32px",
        position: "relative",
        zIndex: 2
      }}>
        {/* Stat Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "28px"
        }}>
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid #f1f5f9",
                cursor: "default",
                transition: "box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = stat.glow
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {stat.title}
                  </p>
                  <p style={{ fontSize: "36px", fontWeight: 800, color: "#1e293b", margin: 0, lineHeight: 1 }}>
                    {stat.value}
                  </p>
                </div>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: stat.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 6px 20px ${stat.color}33`
                }}>
                  <stat.icon style={{ width: "26px", height: "26px", color: "white" }} />
                </div>
              </div>
              {/* Progress bar accent */}
              <div style={{
                marginTop: "16px",
                height: "4px",
                borderRadius: "2px",
                background: "#f1f5f9",
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: totalApts > 0 ? `${(stat.value / totalApts) * 100}%` : "0%",
                  background: stat.gradient,
                  borderRadius: "2px",
                  transition: "width 0.8s ease"
                }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Appointments Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: "1px solid #f1f5f9",
            overflow: "hidden"
          }}
        >
          {/* Card Header */}
          <div style={{
            padding: "24px 28px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div>
              <h2 style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#1e293b",
                margin: "0 0 4px 0"
              }}>
                Today&apos;s Appointments
              </h2>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Search Input */}
            <div style={{ position: "relative" }}>
              <Search style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "18px",
                height: "18px",
                color: "#94a3b8"
              }} />
              <input
                type="text"
                placeholder="Search by patient or doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: "10px 16px 10px 42px",
                  borderRadius: "12px",
                  border: "1.5px solid #e2e8f0",
                  background: "#f8fafc",
                  fontSize: "14px",
                  color: "#1e293b",
                  outline: "none",
                  width: "280px",
                  transition: "all 0.2s ease"
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#3b82f6"
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"
                  e.currentTarget.style.background = "white"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.background = "#f8fafc"
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px"
            }}>
              <thead>
                <tr style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                  borderBottom: "1px solid #e2e8f0"
                }}>
                  {["ID", "Date", "Patient", "Doctor", "Department", "Type", "Status", "Actions"].map((header) => (
                    <th key={header} style={{
                      padding: "14px 20px",
                      textAlign: header === "Actions" ? "right" : "left",
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      whiteSpace: "nowrap"
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt, index) => {
                  const sStyle = statusStyles[apt.status] || statusStyles["Scheduled"]
                  return (
                    <motion.tr
                      key={apt.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.04 }}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        cursor: "default",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "linear-gradient(90deg, #f0f9ff 0%, #eff6ff 50%, #f0fdf4 100%)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent"
                      }}
                    >
                      <td style={{ padding: "16px 20px", color: "#64748b", fontWeight: 500 }}>
                        <span style={{
                          background: "#f1f5f9",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#475569"
                        }}>
                          {apt.id}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Clock style={{ width: "16px", height: "16px", color: "#3b82f6" }} />
                          <span style={{ color: "#475569" }}>{apt.date}</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", fontWeight: 600, color: "#1e293b" }}>
                        {apt.patient}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#475569" }}>{apt.doctor}</td>
                      <td style={{ padding: "16px 20px", color: "#475569" }}>{apt.department}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          padding: "4px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                          background: "#f1f5f9",
                          color: "#64748b",
                          border: "1px solid #e2e8f0"
                        }}>
                          {apt.type}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          padding: "5px 14px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: 700,
                          background: sStyle.bg,
                          color: sStyle.color,
                          border: `1px solid ${sStyle.border}`,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.3px"
                        }}>
                          <span style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: sStyle.color
                          }} />
                          {apt.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                          <button
                            title="View"
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "10px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s ease",
                              color: "#64748b"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#eff6ff"
                              e.currentTarget.style.color = "#3b82f6"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent"
                              e.currentTarget.style.color = "#64748b"
                            }}
                          >
                            <Eye style={{ width: "16px", height: "16px" }} />
                          </button>
                          <button
                            title="Edit"
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "10px",
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s ease",
                              color: "#64748b"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f5f3ff"
                              e.currentTarget.style.color = "#8b5cf6"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent"
                              e.currentTarget.style.color = "#64748b"
                            }}
                          >
                            <Edit style={{ width: "16px", height: "16px" }} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredAppointments.length === 0 && (
            <div style={{
              padding: "60px 20px",
              textAlign: "center"
            }}>
              <Search style={{ width: "48px", height: "48px", color: "#cbd5e1", margin: "0 auto 16px" }} />
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#64748b", margin: "0 0 6px 0" }}>
                No appointments found
              </p>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer accent */}
        <div style={{
          marginTop: "24px",
          textAlign: "center",
          padding: "16px",
          fontSize: "12px",
          color: "#94a3b8"
        }}>
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </div>
      </div>
    </div>
  )
}