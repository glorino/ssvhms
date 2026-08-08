"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Scissors, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Completed: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  "In Progress": { bg: "#fff7ed", color: "#9a3412", border: "#fed7aa" },
  Scheduled: { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
  Cancelled: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
}

const surgeries = [
  { id: "SUR001", surgeryNumber: "SRG2026001", patient: "Rajesh Kumar", umr: "UMR2026001", doctor: "Dr. Priya Sharma", surgeryName: "Coronary Artery Bypass", type: "Cardiac", scheduledDate: "2026-08-08", scheduledTime: "08:00 AM", ot: "OT-1", status: "Scheduled" },
  { id: "SUR002", surgeryNumber: "SRG2026002", patient: "Anita Patel", umr: "UMR2026002", doctor: "Dr. Amit Singh", surgeryName: "Knee Replacement", type: "Orthopedic", scheduledDate: "2026-08-07", scheduledTime: "10:00 AM", ot: "OT-2", status: "In Progress" },
  { id: "SUR003", surgeryNumber: "SRG2026003", patient: "Suresh Reddy", umr: "UMR2026003", doctor: "Dr. Neha Gupta", surgeryName: "Appendectomy", type: "General", scheduledDate: "2026-08-07", scheduledTime: "02:00 PM", ot: "OT-1", status: "Scheduled" },
  { id: "SUR004", surgeryNumber: "SRG2026004", patient: "Priya Verma", umr: "UMR2026004", doctor: "Dr. Rahul Joshi", surgeryName: "Cataract Surgery", type: "Ophthalmology", scheduledDate: "2026-08-06", scheduledTime: "09:00 AM", ot: "OT-3", status: "Completed" },
  { id: "SUR005", surgeryNumber: "SRG2026005", patient: "Mohammed Ali", umr: "UMR2026005", doctor: "Dr. Sanjay Mehta", surgeryName: "Cholecystectomy", type: "Laparoscopic", scheduledDate: "2026-08-06", scheduledTime: "11:00 AM", ot: "OT-2", status: "Completed" },
  { id: "SUR006", surgeryNumber: "SRG2026006", patient: "Deepika Singh", umr: "UMR2026006", doctor: "Dr. Priya Sharma", surgeryName: "Hernia Repair", type: "General", scheduledDate: "2026-08-05", scheduledTime: "03:00 PM", ot: "OT-1", status: "Cancelled" },
  { id: "SUR007", surgeryNumber: "SRG2026007", patient: "Vikram Rao", umr: "UMR2026007", doctor: "Dr. Amit Singh", surgeryName: "ACL Reconstruction", type: "Orthopedic", scheduledDate: "2026-08-05", scheduledTime: "10:30 AM", ot: "OT-2", status: "Completed" },
  { id: "SUR008", surgeryNumber: "SRG2026008", patient: "Kavita Joshi", umr: "UMR2026008", doctor: "Dr. Neha Gupta", surgeryName: "Hysterectomy", type: "Gynecology", scheduledDate: "2026-08-04", scheduledTime: "08:30 AM", ot: "OT-3", status: "Completed" },
]

const scheduledCount = surgeries.filter(s => s.status === "Scheduled").length
const inProgressCount = surgeries.filter(s => s.status === "In Progress").length
const completedCount = surgeries.filter(s => s.status === "Completed").length
const cancelledCount = surgeries.filter(s => s.status === "Cancelled").length

const statsData = [
  { title: "Total Surgeries", value: "8", icon: Scissors },
  { title: "Scheduled", value: scheduledCount.toString(), icon: Clock },
  { title: "In Progress", value: inProgressCount.toString(), icon: AlertCircle },
  { title: "Completed", value: completedCount.toString(), icon: CheckCircle },
  { title: "Cancelled", value: cancelledCount.toString(), icon: XCircle },
]

const statGradients = [
  "linear-gradient(135deg, #14b8a6, #0891b2)",
  "linear-gradient(135deg, #3b82f6, #2563eb)",
  "linear-gradient(135deg, #f97316, #ea580c)",
  "linear-gradient(135deg, #22c55e, #16a34a)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
]

const statShadows = [
  "0 8px 24px rgba(20,184,166,0.35)",
  "0 8px 24px rgba(59,130,246,0.35)",
  "0 8px 24px rgba(249,115,22,0.35)",
  "0 8px 24px rgba(34,197,94,0.35)",
  "0 8px 24px rgba(239,68,68,0.35)",
]

export default function SurgeryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSurgeries = surgeries.filter(
    surgery =>
      surgery.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.surgeryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.surgeryName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "24px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{
              fontSize: "26px", fontWeight: 800,
              background: "linear-gradient(135deg, #14b8a6, #0891b2)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: "4px",
            }}>
              Surgery Management
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Manage surgical procedures and operating theaters</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={{
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
            <Link href="/surgery/new">
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "8px 18px", borderRadius: "10px", border: "none",
                background: "linear-gradient(135deg, #14b8a6, #0891b2)",
                color: "#fff", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", boxShadow: "0 4px 16px rgba(20,184,166,0.4)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(20,184,166,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,184,166,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                <Plus size={15} /> Schedule Surgery
              </button>
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "16px" }}>
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.03, y: -3 }}
              style={{
                background: "#fff", borderRadius: "16px", padding: "18px",
                boxShadow: statShadows[i], border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                  <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px", fontWeight: 500 }}>{stat.title}</p>
                </div>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: statGradients[i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: statShadows[i],
                }}>
                  <stat.icon size={22} color="#fff" />
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
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Surgeries</h2>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="search"
                  placeholder="Search surgeries..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    paddingLeft: "36px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                    width: "260px", borderRadius: "10px",
                    border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#334155",
                    outline: "none", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#14b8a6"}
                  onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Surgery No.", "Patient", "Doctor", "Surgery", "Type", "Date & Time", "OT", "Status", "Actions"].map(h => (
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
                  {filteredSurgeries.map((surgery, index) => (
                    <motion.tr
                      key={surgery.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(20,184,166,0.04), rgba(20,184,166,0.02))"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{surgery.surgeryNumber}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>{surgery.patient}</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{surgery.umr}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b" }}>{surgery.doctor}</td>
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e293b" }}>{surgery.surgeryName}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                          background: "#f8fafc", border: "1px solid #e2e8f0",
                          fontSize: "12px", color: "#64748b", fontWeight: 500,
                        }}>
                          {surgery.type}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ color: "#334155", fontWeight: 500 }}>{surgery.scheduledDate}</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{surgery.scheduledTime}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b" }}>{surgery.ot}</td>
                      <td style={{ padding: "14px 16px" }}>
                        {(() => {
                          const s = statusStyles[surgery.status] || statusStyles.Scheduled
                          return (
                            <span style={{
                              display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                              background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                              fontSize: "12px", fontWeight: 600,
                            }}>
                              {surgery.status}
                            </span>
                          )
                        })()}
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                          <button style={{
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
                          <button style={{
                            width: "32px", height: "32px", borderRadius: "8px", border: "none",
                            background: "transparent", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", transition: "all 0.2s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#f0fdfa"; e.currentTarget.style.color = "#14b8a6" }}
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

          {filteredSurgeries.length === 0 && (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
              No surgeries found matching your search.
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
