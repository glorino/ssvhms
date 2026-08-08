"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Stethoscope,
  Clock,
  User,
  FileText,
} from "lucide-react"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"
import { usePatients } from "@/lib/patient-context"

export default function OPDPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { patients } = usePatients()

  const allOpdVisits = patients.flatMap((p) =>
    p.visits.filter((v) => v.type === "OPD").map((v, i) => ({
      ...v,
      visitNumber: `VIS${v.date.replace(/-/g, "")}${String(i + 1).padStart(3, "0")}`,
      patient: `${p.firstName} ${p.lastName}`,
      umr: p.uniqueNumber,
    }))
  )
  const totalVisits = allOpdVisits.length
  const completedVisits = allOpdVisits.filter((v) => v.status === "Completed").length
  const inProgressVisits = allOpdVisits.filter((v) => v.status === "In Progress").length
  const scheduledVisits = allOpdVisits.filter((v) => v.status === "Scheduled").length

  const statsData = [
    { title: "Today's Visits", value: String(totalVisits), icon: Stethoscope, gradient: "linear-gradient(135deg, #14b8a6, #3b82f6)", shadow: "0 8px 32px rgba(20,184,166,0.30)" },
    { title: "Completed", value: String(completedVisits), icon: Clock, gradient: "linear-gradient(135deg, #22c55e, #14b8a6)", shadow: "0 8px 32px rgba(34,197,94,0.30)" },
    { title: "In Progress", value: String(inProgressVisits), icon: User, gradient: "linear-gradient(135deg, #f97316, #ef4444)", shadow: "0 8px 32px rgba(249,115,22,0.30)" },
    { title: "Scheduled", value: String(scheduledVisits), icon: FileText, gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)", shadow: "0 8px 32px rgba(139,92,246,0.30)" },
  ]

  const filteredVisits = allOpdVisits.filter(
    (visit) =>
      visit.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.visitNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return { background: "linear-gradient(135deg, #dcfce7, #d1fae5)", color: "#166534", border: "1px solid #bbf7d0" }
      case "In Progress":
        return { background: "linear-gradient(135deg, #fef3c7, #fde68a)", color: "#92400e", border: "1px solid #fcd34d" }
      default:
        return { background: "linear-gradient(135deg, #dbeafe, #bfdbfe)", color: "#1e40af", border: "1px solid #93c5fd" }
    }
  }

  return (
    <AnimatedPage>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", background: "linear-gradient(135deg, #14b8a6, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
              OPD (Out Patient Department)
            </h1>
            <p style={{ color: "#64748b", margin: "4px 0 0 0" }}>Manage outpatient visits and consultations</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", color: "#475569", cursor: "pointer", fontSize: "14px", fontWeight: "500", transition: "all 0.2s" }}>
              <Download style={{ width: "16px", height: "16px", marginRight: "8px" }} />
              Export
            </button>
            <Link href="/opd/new">
              <button style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #14b8a6, #3b82f6)", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "500", boxShadow: "0 8px 32px rgba(20,184,166,0.30)", transition: "all 0.2s" }}>
                <Plus style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                New Visit
              </button>
            </Link>
          </div>
        </div>

        <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "24px" }}>
          {statsData.map((stat) => (
            <StaggerItem key={stat.title}>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.8)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: stat.gradient }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "32px", fontWeight: "bold", color: "#1e293b" }}>{stat.value}</div>
                      <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0 0" }}>{stat.title}</p>
                    </div>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: stat.gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: stat.shadow }}>
                      <stat.icon style={{ width: "24px", height: "24px", color: "white" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.8)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #1e293b, #475569)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>OPD Visit History</h2>
              <div style={{ position: "relative" }}>
                <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#94a3b8" }} />
                <input
                  type="search"
                  placeholder="Search visits..."
                  style={{ paddingLeft: "36px", width: "256px", padding: "10px 12px 10px 36px", borderRadius: "12px", border: "1px solid #e2e8f0", outline: "none", fontSize: "14px", transition: "all 0.2s" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div style={{ padding: "0 24px 24px 24px", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Visit No.</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Date</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Patient</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Doctor</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Department</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Symptoms</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Diagnosis</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Status</th>
                    <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map((visit, index) => (
                    <motion.tr
                      key={visit.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      style={{ borderBottom: "1px solid #f1f5f9", transition: "all 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(90deg, rgba(20,184,166,0.05), rgba(59,130,246,0.05))"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "500", color: "#334155" }}>{visit.visitNumber}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{visit.date}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", margin: 0 }}>{visit.patient}</p>
                          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}>{visit.umr}</p>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{visit.doctor}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{visit.department}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{visit.symptoms}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "500", color: "#334155" }}>{visit.diagnosis}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ ...getStatusBadge(visit.status), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                          {visit.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                          <button onClick={() => alert(`Visit: ${visit.visitNumber}\nPatient: ${visit.patient}\nDoctor: ${visit.doctor}\nDepartment: ${visit.department}\nDiagnosis: ${visit.diagnosis}\nStatus: ${visit.status}`)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Eye style={{ width: "16px", height: "16px" }} />
                          </button>
                          <button onClick={() => alert(`Edit visit: ${visit.visitNumber}`)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0fdfa"; e.currentTarget.style.color = "#14b8a6" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Edit style={{ width: "16px", height: "16px" }} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}