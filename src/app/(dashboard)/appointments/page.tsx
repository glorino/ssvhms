"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
  Users,
  Activity,
} from "lucide-react"
import { usePatients } from "@/lib/patient-context"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
}

export default function AppointmentsPage() {
  const { patients } = usePatients()
  const appointments = patients.flatMap((p) =>
    p.visits.map((v) => ({ ...v, patient: `${p.firstName} ${p.lastName}` }))
  )

  const totalApts = appointments.length
  const completedApts = appointments.filter((a) => a.status === "Completed").length
  const inProgressApts = appointments.filter((a) => a.status === "In Progress").length
  const scheduledApts = appointments.filter((a) => a.status === "Scheduled").length
  const cancelledApts = appointments.filter((a) => a.status === "Cancelled").length

  const statsData = [
    {
      title: "Total",
      value: totalApts,
      icon: Calendar,
      color: "#14b8a6",
      gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
      glow: "0 8px 32px rgba(20,184,166,0.35)",
    },
    {
      title: "Completed",
      value: completedApts,
      icon: CheckCircle,
      color: "#22c55e",
      gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      glow: "0 8px 32px rgba(34,197,94,0.35)",
    },
    {
      title: "In Progress",
      value: inProgressApts,
      icon: Activity,
      color: "#f97316",
      gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
      glow: "0 8px 32px rgba(249,115,22,0.35)",
    },
    {
      title: "Scheduled",
      value: scheduledApts,
      icon: Clock,
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      glow: "0 8px 32px rgba(59,130,246,0.35)",
    },
    {
      title: "Cancelled",
      value: cancelledApts,
      icon: XCircle,
      color: "#ef4444",
      gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      glow: "0 8px 32px rgba(239,68,68,0.35)",
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [activePeriod, setActivePeriod] = useState("All Time")

  const periods = ["Today", "This Week", "This Month", "All Time"]

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusStyles: Record<string, { bg: string; color: string; border: string; dot: string }> = {
    Completed: {
      bg: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
      color: "#16a34a",
      border: "#86efac",
      dot: "#22c55e",
    },
    "In Progress": {
      bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
      color: "#ea580c",
      border: "#fdba74",
      dot: "#f97316",
    },
    Scheduled: {
      bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      color: "#2563eb",
      border: "#93c5fd",
      dot: "#3b82f6",
    },
    Cancelled: {
      bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
      color: "#dc2626",
      border: "#fca5a5",
      dot: "#ef4444",
    },
  }

  const avatarGradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #e8ecf1",
          padding: "28px 40px",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(20,184,166,0.3)",
              }}
            >
              <CalendarCheck style={{ width: "22px", height: "22px", color: "white" }} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#0f172a",
                  margin: 0,
                  letterSpacing: "-0.5px",
                }}
              >
                Appointments
              </h1>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: "2px 0 0 0" }}>
                Manage patient appointments and scheduling
              </p>
            </div>
          </div>
          <Link href="/appointments/new" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
                color: "white",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(20,184,166,0.35)",
                transition: "box-shadow 0.2s ease",
              }}
            >
              <Plus style={{ width: "18px", height: "18px" }} />
              New Appointment
            </motion.button>
          </Link>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "28px 40px 40px",
        }}
      >
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#64748b",
              marginRight: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Period:
          </span>
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                border: "none",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                background:
                  activePeriod === period
                    ? "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)"
                    : "white",
                color: activePeriod === period ? "white" : "#64748b",
                boxShadow:
                  activePeriod === period
                    ? "0 4px 12px rgba(20,184,166,0.3)"
                    : "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              {period}
            </button>
          ))}

          <div style={{ marginLeft: "auto", position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                height: "16px",
                color: "#94a3b8",
              }}
            />
            <input
              type="text"
              placeholder="Search patient or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px 16px 10px 40px",
                borderRadius: "10px",
                border: "1.5px solid #e2e8f0",
                background: "white",
                fontSize: "13px",
                color: "#1e293b",
                outline: "none",
                width: "260px",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#14b8a6"
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(20,184,166,0.12)"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0"
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"
              }}
            />
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "22px 24px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                border: "1px solid #eef2f7",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = stat.glow
                e.currentTarget.style.borderColor = stat.color + "30"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.04)"
                e.currentTarget.style.borderColor = "#eef2f7"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: stat.color + "08",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#94a3b8",
                      margin: "0 0 8px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                    }}
                  >
                    {stat.title}
                  </p>
                  <p
                    style={{
                      fontSize: "32px",
                      fontWeight: 800,
                      color: "#0f172a",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: stat.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 6px 20px ${stat.color}30`,
                  }}
                >
                  <stat.icon style={{ width: "22px", height: "22px", color: "white" }} />
                </div>
              </div>
              <div
                style={{
                  marginTop: "14px",
                  height: "3px",
                  borderRadius: "2px",
                  background: "#f1f5f9",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: totalApts > 0 ? `${(stat.value / totalApts) * 100}%` : "0%",
                  }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    background: stat.gradient,
                    borderRadius: "2px",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Appointments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" as const, stiffness: 200 }}
          style={{
            background: "white",
            borderRadius: "18px",
            boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
            border: "1px solid #eef2f7",
            overflow: "hidden",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              padding: "22px 28px",
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: "0 0 4px 0",
                }}
              >
                Appointments List
              </h2>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                {filteredAppointments.length} appointment
                {filteredAppointments.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Users style={{ width: "16px", height: "16px", color: "#94a3b8" }} />
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                Total: {totalApts}
              </span>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr
                  style={{
                    background: "#f8fafc",
                    borderBottom: "1px solid #eef2f7",
                  }}
                >
                  {["Patient", "Doctor", "Department", "Date & Time", "Type", "Status", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        style={{
                          padding: "13px 20px",
                          textAlign: header === "Actions" ? "right" : "left",
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.8px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredAppointments.map((apt, index) => {
                    const sStyle = statusStyles[apt.status] || statusStyles["Scheduled"]
                    const avatarGrad = avatarGradients[index % avatarGradients.length]
                    const initials = apt.patient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()

                    return (
                      <motion.tr
                        key={apt.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.03 }}
                        style={{
                          borderBottom: "1px solid #f1f5f9",
                          cursor: "default",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(90deg, #f0fdfa 0%, #f0f9ff 50%, #f0fdf4 100%)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent"
                        }}
                      >
                        {/* Patient with Avatar */}
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div
                              style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "12px",
                                background: avatarGrad,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "13px",
                                fontWeight: 700,
                                letterSpacing: "0.5px",
                                flexShrink: 0,
                              }}
                            >
                              {initials}
                            </div>
                            <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "14px" }}>
                              {apt.patient}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#475569", fontWeight: 500 }}>
                          {apt.doctor}
                        </td>
                        <td style={{ padding: "16px 20px", color: "#64748b" }}>{apt.department}</td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <span style={{ color: "#475569", fontWeight: 500, fontSize: "13px" }}>
                              {apt.date}
                            </span>
                            <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                              {apt.date}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span
                            style={{
                              padding: "4px 12px",
                              borderRadius: "8px",
                              fontSize: "12px",
                              fontWeight: 600,
                              background: "#f1f5f9",
                              color: "#64748b",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            {apt.type}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span
                            style={{
                              padding: "5px 14px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: 700,
                              background: sStyle.bg,
                              color: sStyle.color,
                              border: `1px solid ${sStyle.border}`,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              textTransform: "uppercase",
                              letterSpacing: "0.4px",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: sStyle.dot,
                                boxShadow: `0 0 6px ${sStyle.dot}60`,
                              }}
                            />
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
                                border: "1px solid transparent",
                                background: "transparent",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                                color: "#94a3b8",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#f0fdfa"
                                e.currentTarget.style.borderColor = "#99f6e4"
                                e.currentTarget.style.color = "#14b8a6"
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent"
                                e.currentTarget.style.borderColor = "transparent"
                                e.currentTarget.style.color = "#94a3b8"
                              }}
                            >
                              <Eye style={{ width: "15px", height: "15px" }} />
                            </button>
                            <button
                              title="Edit"
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "10px",
                                border: "1px solid transparent",
                                background: "transparent",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                                color: "#94a3b8",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#f5f3ff"
                                e.currentTarget.style.borderColor = "#ddd6fe"
                                e.currentTarget.style.color = "#8b5cf6"
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent"
                                e.currentTarget.style.borderColor = "transparent"
                                e.currentTarget.style.color = "#94a3b8"
                              }}
                            >
                              <Edit style={{ width: "15px", height: "15px" }} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAppointments.length === 0 && (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "18px",
                  background: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Search style={{ width: "28px", height: "28px", color: "#cbd5e1" }} />
              </div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#475569",
                  margin: "0 0 6px 0",
                }}
              >
                No appointments found
              </p>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            padding: "14px",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          Showing {filteredAppointments.length} of {totalApts} appointments
        </div>
      </div>
    </div>
  )
}
