"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, FlaskConical, CheckCircle, Clock, AlertCircle, Microscope } from "lucide-react"
import { usePatients } from "@/lib/patient-context"
import { filterByPeriod } from "@/lib/filter-utils"

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Completed: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  "In Progress": { bg: "#fff7ed", color: "#9a3412", border: "#fed7aa" },
  Pending: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
}

const resultStyles: Record<string, { color: string; fontWeight: string }> = {
  Abnormal: { color: "#ef4444", fontWeight: "700" },
  Normal: { color: "#22c55e", fontWeight: "600" },
}

const statGradients = [
  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  "linear-gradient(135deg, #22c55e, #16a34a)",
  "linear-gradient(135deg, #f97316, #ea580c)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
]

const statShadows = [
  "0 8px 24px rgba(139,92,246,0.35)",
  "0 8px 24px rgba(34,197,94,0.35)",
  "0 8px 24px rgba(249,115,22,0.35)",
  "0 8px 24px rgba(239,68,68,0.35)",
]

export default function PathologyPage() {
  const { patients } = usePatients()
  const tests = patients.flatMap(p =>
    p.labResults.map(lr => ({
      ...lr,
      patient: `${p.firstName} ${p.lastName}`,
      umr: p.uniqueNumber,
      testNumber: lr.id,
      doctor: lr.orderedBy,
    }))
  )

  const [searchTerm, setSearchTerm] = useState("")
  const [activePeriod, setActivePeriod] = useState("all")

  const periodFilteredTests = useMemo(() => filterByPeriod(tests, activePeriod, "date"), [tests, activePeriod])

  const totalTests = periodFilteredTests.length
  const completedTests = periodFilteredTests.filter(t => t.status === "Completed").length
  const inProgressTests = periodFilteredTests.filter(t => t.status === "In Progress").length
  const pendingTests = periodFilteredTests.filter(t => t.status === "Pending").length

  const statsData = [
    { title: "Total Tests", value: totalTests.toString(), icon: FlaskConical },
    { title: "Completed", value: completedTests.toString(), icon: CheckCircle },
    { title: "In Progress", value: inProgressTests.toString(), icon: Clock },
    { title: "Pending", value: pendingTests.toString(), icon: AlertCircle },
  ]

  const filteredTests = periodFilteredTests.filter(
    test =>
      test.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "24px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{
              fontSize: "26px", fontWeight: 800,
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: "4px",
            }}>
              Pathology
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Manage pathology lab tests and results</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => alert("Exporting pathology data...")} style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "10px", border: "1.5px solid #e2e8f0",
              background: "#fff", color: "#475569", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1" }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0" }}
            >
              <Download size={15} /> Export
            </button>
            <Link href="/pathology/new">
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "8px 18px", borderRadius: "10px", border: "none",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                color: "#fff", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", boxShadow: "0 4px 16px rgba(139,92,246,0.4)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(139,92,246,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(139,92,246,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                <Plus size={15} /> New Test
              </button>
            </Link>
          </div>
        </div>

        {/* Period Filter Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All Time" },
            { key: "today", label: "Today" },
            { key: "week", label: "This Week" },
            { key: "month", label: "This Month" },
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => setActivePeriod(period.key)}
              style={{
                padding: "8px 18px", borderRadius: "20px",
                border: activePeriod === period.key ? "1.5px solid #8b5cf6" : "1.5px solid #e2e8f0",
                background: activePeriod === period.key ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "#fff",
                color: activePeriod === period.key ? "#fff" : "#64748b",
                cursor: "pointer", fontSize: "13px", fontWeight: 600, transition: "all 0.2s",
                boxShadow: activePeriod === period.key ? "0 4px 12px rgba(139,92,246,0.3)" : "none",
              }}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.03, y: -3 }}
              style={{
                background: "#fff", borderRadius: "16px", padding: "20px",
                boxShadow: statShadows[i], border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                  <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px", fontWeight: 500 }}>{stat.title}</p>
                </div>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: statGradients[i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: statShadows[i],
                }}>
                  <stat.icon size={24} color="#fff" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: "#fff", borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
          }}
        >
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Lab Tests</h2>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="search"
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    paddingLeft: "36px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                    width: "260px", borderRadius: "10px",
                    border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#334155",
                    outline: "none", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#8b5cf6"}
                  onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Test No.", "Patient", "Doctor", "Test Name", "Category", "Date", "Result", "Status", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "12px 16px",
                      textAlign: h === "Actions" ? "right" : "left",
                      fontWeight: 700, color: "#64748b", fontSize: "11px",
                      textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredTests.map((test, index) => (
                    <motion.tr
                      key={test.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(139,92,246,0.04), rgba(139,92,246,0.02))"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{test.testNumber}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>{test.patient}</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{test.umr}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b" }}>{test.doctor}</td>
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e293b" }}>{test.testName}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                          background: "#f8fafc", border: "1px solid #e2e8f0",
                          fontSize: "12px", color: "#64748b", fontWeight: 500,
                        }}>
                          {test.category}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b" }}>{test.date}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          color: resultStyles[test.result]?.color || "#94a3b8",
                          fontWeight: resultStyles[test.result]?.fontWeight || "400",
                        }}>
                          {test.result}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        {(() => {
                          const s = statusStyles[test.status] || statusStyles.Pending
                          return (
                            <span style={{
                              display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                              background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                              fontSize: "12px", fontWeight: 600,
                            }}>
                              {test.status}
                            </span>
                          )
                        })()}
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                          <button onClick={() => alert("View test: " + test.testName)} style={{
                            width: "32px", height: "32px", borderRadius: "8px", border: "none",
                            background: "transparent", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", transition: "all 0.2s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6" }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Eye size={16} />
                          </button>
                          <button onClick={() => alert("Edit test: " + test.testName)} style={{
                            width: "32px", height: "32px", borderRadius: "8px", border: "none",
                            background: "transparent", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", transition: "all 0.2s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.color = "#8b5cf6" }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredTests.length === 0 && (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
              No tests found matching your search.
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
