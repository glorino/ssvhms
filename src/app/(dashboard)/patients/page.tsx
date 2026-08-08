"use client"

import React, { useState, useMemo } from "react"
import { usePatients } from "@/lib/patient-context"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
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

const gradients = [
  "linear-gradient(135deg, #3b82f6, #6366f1)",
  "linear-gradient(135deg, #10b981, #14b8a6)",
  "linear-gradient(135deg, #f97316, #f59e0b)",
  "linear-gradient(135deg, #f43f5e, #ec4899)",
]

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

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
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
      {
        title: "Total Patients",
        value: totalPatients.toLocaleString(),
        icon: Users,
        gradient: gradients[0],
        iconBg: "rgba(59, 130, 246, 0.1)",
        iconColor: "#3b82f6",
      },
      {
        title: "Active Patients",
        value: activePatients.toLocaleString(),
        icon: Activity,
        gradient: gradients[1],
        iconBg: "rgba(16, 185, 129, 0.1)",
        iconColor: "#10b981",
      },
      {
        title: "New This Month",
        value: newThisMonth.toLocaleString(),
        icon: TrendingUp,
        gradient: gradients[2],
        iconBg: "rgba(249, 115, 22, 0.1)",
        iconColor: "#f97316",
      },
      {
        title: "Currently Admitted",
        value: currentlyAdmitted.toLocaleString(),
        icon: Heart,
        gradient: gradients[3],
        iconBg: "rgba(244, 63, 94, 0.1)",
        iconColor: "#f43f5e",
      },
    ]
  }, [patients, currentMonth, currentYear])

  const filteredPatients = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return patients.filter((p) => {
      const fullName = `${p.firstName} ${p.lastName}`.toLowerCase()
      return (
        fullName.includes(q) ||
        p.uniqueNumber.toLowerCase().includes(q) ||
        p.phone.includes(q)
      )
    })
  }, [patients, searchTerm])

  return (
    <AnimatedPage>
      <div style={{ padding: "32px 40px", minHeight: "100vh", background: "linear-gradient(180deg, #f0fdfa 0%, #f8fafc 30%, #ffffff 100%)" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  background: "linear-gradient(135deg, #0f766e, #14b8a6, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Patients
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#64748b" }}>
                Manage patient records and medical history
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1"
                  e.currentTarget.style.background = "#f8fafc"
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0"
                  e.currentTarget.style.background = "#ffffff"
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"
                }}
              >
                <Download size={16} />
                Export
              </button>
              <Link href="/patients/new">
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#ffffff",
                    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 14px rgba(20, 184, 166, 0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(20, 184, 166, 0.5)"
                    e.currentTarget.style.transform = "translateY(-1px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(20, 184, 166, 0.35)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <UserPlus size={16} />
                  New Patient
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
              >
                {/* Decorative gradient bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: stat.gradient,
                    borderRadius: "16px 16px 0 0",
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {stat.title}
                    </p>
                    <p style={{ margin: "8px 0 0", fontSize: "32px", fontWeight: 800, color: "#1e293b", letterSpacing: "-0.025em" }}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      background: stat.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <stat.icon size={24} style={{ color: stat.iconColor }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Patient List Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              padding: "24px 28px 20px",
              borderBottom: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 700,
                color: "#1e293b",
                letterSpacing: "-0.01em",
              }}
            >
              Patient List
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                  }}
                />
                <input
                  type="search"
                  placeholder="Search by name, UMR, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "10px 14px 10px 40px",
                    fontSize: "13px",
                    width: "280px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    outline: "none",
                    background: "#f8fafc",
                    color: "#1e293b",
                    transition: "all 0.2s",
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
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#475569",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s",
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
                <Filter size={14} />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["UMR", "Patient Name", "Age/Gender", "Contact", "Blood Group", "Last Visit", "Status", "Actions"].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: "14px 16px",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#64748b",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        textAlign: header === "Actions" ? "right" : "left",
                        borderBottom: "2px solid #f1f5f9",
                        background: "#fafbfc",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      transition: "all 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(90deg, rgba(20, 184, 166, 0.04), rgba(59, 130, 246, 0.04), rgba(139, 92, 246, 0.02))"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent"
                    }}
                  >
                    <td style={{ padding: "16px", fontSize: "13px", fontWeight: 600, color: "#0f766e" }}>
                      {patient.uniqueNumber}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            background: avatarGradients[index % avatarGradients.length],
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 2px 8px ${["rgba(59,130,246,0.25)", "rgba(139,92,246,0.25)", "rgba(20,184,166,0.25)", "rgba(249,115,22,0.25)", "rgba(6,182,212,0.25)"][index % 5]}`,
                            flexShrink: 0,
                          }}
                        >
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#ffffff" }}>
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
                    <td style={{ padding: "16px", fontSize: "13px", color: "#64748b" }}>
                      {getAge(patient.dateOfBirth)} / {patient.gender}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <span style={{ fontSize: "13px", color: "#1e293b", fontWeight: 500 }}>{patient.phone}</span>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{patient.email}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px" }}>
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
                    <td style={{ padding: "16px", fontSize: "13px", color: "#64748b" }}>
                      {getLastVisit(patient)}
                    </td>
                    <td style={{ padding: "16px" }}>
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
                    <td style={{ padding: "16px", textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                        <Link href={`/patients/${patient.id}`}>
                          <button
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
                          </button>
                        </Link>
                        <Link href={`/patients/${patient.id}/edit`}>
                          <button
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
                          </button>
                        </Link>
                        <button
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
                            e.currentTarget.style.background = "#fef2f2"
                            e.currentTarget.style.color = "#ef4444"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.color = "#94a3b8"
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
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
