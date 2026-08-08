"use client"

import React, { useState, useMemo } from "react"
import { usePatients } from "@/lib/patient-context"
import { AnimatedPage } from "@/components/animated-wrapper"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  UserPlus,
  Users,
  Activity,
  TrendingUp,
  Heart,
} from "lucide-react"

function getAge(dob: string): number {
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

function getLastVisit(patient: { visits: { date: string }[] }): string {
  if (patient.visits.length === 0) return "N/A"
  return patient.visits.reduce((latest, v) => (v.date > latest ? v.date : latest), patient.visits[0].date)
}

const avatarGradients = [
  "linear-gradient(135deg, #3b82f6, #6366f1)",
  "linear-gradient(135deg, #8b5cf6, #ec4899)",
  "linear-gradient(135deg, #14b8a6, #22c55e)",
  "linear-gradient(135deg, #f97316, #ef4444)",
  "linear-gradient(135deg, #06b6d4, #3b82f6)",
]

function getStatusStyle(status: string) {
  switch (status) {
    case "Active":
      return { bg: "#dcfce7", color: "#166534", border: "#bbf7d0", dot: "#22c55e" }
    case "Admitted":
      return { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe", dot: "#3b82f6" }
    case "Discharged":
      return { bg: "#f3e8ff", color: "#6b21a8", border: "#e9d5ff", dot: "#8b5cf6" }
    default:
      return { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0", dot: "#94a3b8" }
  }
}

const statCardColors = [
  { border: "#3b82f6", bg: "rgba(59, 130, 246, 0.06)", iconBg: "rgba(59, 130, 246, 0.12)", iconColor: "#3b82f6" },
  { border: "#10b981", bg: "rgba(16, 185, 129, 0.06)", iconBg: "rgba(16, 185, 129, 0.12)", iconColor: "#10b981" },
  { border: "#f97316", bg: "rgba(249, 115, 22, 0.06)", iconBg: "rgba(249, 115, 22, 0.12)", iconColor: "#f97316" },
  { border: "#ec4899", bg: "rgba(236, 72, 153, 0.06)", iconBg: "rgba(236, 72, 153, 0.12)", iconColor: "#ec4899" },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const { patients } = usePatients()

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const stats = useMemo(() => {
    const totalPatients = patients.length
    const activePatients = patients.filter((p) => p.status === "Active").length
    const newThisMonth = patients.filter((p) => {
      const d = new Date(p.registeredAt)
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    }).length
    const currentlyAdmitted = patients.filter((p) => p.status === "Admitted").length
    return [
      { label: "Total Patients", value: totalPatients, subtitle: "All registered", icon: Users },
      { label: "Active Patients", value: activePatients, subtitle: "Currently active", icon: Activity },
      { label: "New This Month", value: newThisMonth, subtitle: "Recent registrations", icon: TrendingUp },
      { label: "Currently Admitted", value: currentlyAdmitted, subtitle: "In hospital", icon: Heart },
    ]
  }, [patients, currentMonth, currentYear])

  const filteredPatients = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return patients.filter((p) => {
      const fullName = `${p.firstName} ${p.lastName}`.toLowerCase()
      const matchesSearch =
        fullName.includes(q) ||
        p.uniqueNumber.toLowerCase().includes(q) ||
        p.phone.includes(q)
      const matchesFilter = filterStatus === "All" || p.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [patients, searchTerm, filterStatus])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
  }

  return (
    <AnimatedPage>
      <div style={{ padding: "32px 40px", minHeight: "100vh", background: "linear-gradient(180deg, #f0fdfa 0%, #f8fafc 40%, #ffffff 100%)" }}>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a", margin: 0, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
              Patients
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748b" }}>
              Manage your patient records
            </p>
          </div>
          <Link href="/patients/new">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(20, 184, 166, 0.45)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#ffffff",
                background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(20, 184, 166, 0.35)",
                transition: "box-shadow 0.3s",
              }}
            >
              <Plus size={18} strokeWidth={2.5} />
              New Patient
            </motion.button>
          </Link>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }}
        >
          {stats.map((stat, i) => {
            const colors = statCardColors[i]
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "0",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  borderLeft: `4px solid ${colors.border}`,
                  cursor: "default",
                }}
              >
                <div style={{ padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "12px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {stat.label}
                    </p>
                    <p style={{ margin: "6px 0 2px", fontSize: "34px", fontWeight: 800, color: "#1e293b", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                      {stat.value}
                    </p>
                    <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>
                      {stat.subtitle}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: colors.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <stat.icon size={24} style={{ color: colors.iconColor }} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "18px 24px",
            marginBottom: "20px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.04)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={16}
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}
            />
            <input
              type="search"
              placeholder="Search by name, UMR, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 40px",
                fontSize: "13px",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                outline: "none",
                background: "#f8fafc",
                color: "#1e293b",
                transition: "all 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#14b8a6"
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(20, 184, 166, 0.1)"
                e.currentTarget.style.background = "#ffffff"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0"
                e.currentTarget.style.boxShadow = "none"
                e.currentTarget.style.background = "#f8fafc"
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <Filter size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: "10px 32px 10px 34px",
                fontSize: "13px",
                fontWeight: 500,
                color: "#475569",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
              }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Admitted">Admitted</option>
              <option value="Discharged">Discharged</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#475569",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#cbd5e1"
              e.currentTarget.style.background = "#f8fafc"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0"
              e.currentTarget.style.background = "#ffffff"
            }}
          >
            <Download size={15} />
            Export
          </motion.button>
        </motion.div>

        {/* Patients Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Patient", "UMR", "Age/Gender", "Contact", "Blood Group", "Last Visit", "Status", "Actions"].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: "14px 18px",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        textAlign: header === "Actions" ? "right" : "left",
                        background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: "48px 18px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                      No patients found matching your search.
                    </td>
                  </tr>
                )}
                {filteredPatients.map((patient, index) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.03, type: "spring", stiffness: 300, damping: 24 }}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(90deg, rgba(20, 184, 166, 0.04), rgba(59, 130, 246, 0.03))"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    {/* Patient Name with Avatar */}
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: avatarGradients[index % avatarGradients.length],
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 3px 10px ${["rgba(59,130,246,0.25)", "rgba(139,92,246,0.25)", "rgba(20,184,166,0.25)", "rgba(249,115,22,0.25)", "rgba(6,182,212,0.25)"][index % 5]}`,
                            flexShrink: 0,
                          }}
                        >
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>
                            {patient.firstName[0]}{patient.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b" }}>
                            {patient.firstName} {patient.lastName}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* UMR */}
                    <td style={{ padding: "14px 18px", fontSize: "13px", fontWeight: 600, color: "#0f766e" }}>
                      {patient.uniqueNumber}
                    </td>

                    {/* Age / Gender */}
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "#475569" }}>
                      {getAge(patient.dateOfBirth)} / {patient.gender}
                    </td>

                    {/* Contact */}
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontSize: "13px", color: "#1e293b", fontWeight: 500 }}>{patient.phone}</span>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{patient.email}</span>
                      </div>
                    </td>

                    {/* Blood Group */}
                    <td style={{ padding: "14px 18px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "4px 10px",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#dc2626",
                          background: "#fef2f2",
                          border: "1px solid #fecaca",
                          borderRadius: "6px",
                        }}
                      >
                        {patient.bloodGroup}
                      </span>
                    </td>

                    {/* Last Visit */}
                    <td style={{ padding: "14px 18px", fontSize: "13px", color: "#64748b" }}>
                      {getLastVisit(patient)}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "14px 18px" }}>
                      {(() => {
                        const s = getStatusStyle(patient.status)
                        return (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "5px 12px",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: s.color,
                              background: s.bg,
                              border: `1px solid ${s.border}`,
                              borderRadius: "20px",
                            }}
                          >
                            <span
                              style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background: s.dot,
                                boxShadow: `0 0 6px ${s.dot}60`,
                              }}
                            />
                            {patient.status}
                          </span>
                        )
                      })()}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                        <Link href={`/patients/${patient.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              width: "34px",
                              height: "34px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "8px",
                              border: "none",
                              background: "transparent",
                              color: "#94a3b8",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#eff6ff"
                              e.currentTarget.style.color = "#3b82f6"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent"
                              e.currentTarget.style.color = "#94a3b8"
                            }}
                          >
                            <Eye size={16} />
                          </motion.button>
                        </Link>
                        <Link href={`/patients/${patient.id}/edit`}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              width: "34px",
                              height: "34px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "8px",
                              border: "none",
                              background: "transparent",
                              color: "#94a3b8",
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#fffbeb"
                              e.currentTarget.style.color = "#f59e0b"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent"
                              e.currentTarget.style.color = "#94a3b8"
                            }}
                          >
                            <Edit size={16} />
                          </motion.button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}