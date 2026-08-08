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
  BedDouble,
  Clock,
  AlertCircle,
  CheckCircle,
  Building2,
} from "lucide-react"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"
import { usePatients } from "@/lib/patient-context"

const bedStatus = [
  { ward: "ICU", total: 10, occupied: 9, vacant: 1, reserved: 0, gradient: "linear-gradient(135deg, #ef4444, #ec4899)" },
  { ward: "General Ward", total: 40, occupied: 32, vacant: 6, reserved: 2, gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)" },
  { ward: "Private", total: 20, occupied: 15, vacant: 4, reserved: 1, gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)" },
  { ward: "Semi-Private", total: 30, occupied: 22, vacant: 7, reserved: 1, gradient: "linear-gradient(135deg, #14b8a6, #3b82f6)" },
  { ward: "Emergency", total: 10, occupied: 7, vacant: 3, reserved: 0, gradient: "linear-gradient(135deg, #f97316, #ef4444)" },
  { ward: "Maternity", total: 15, occupied: 11, vacant: 3, reserved: 1, gradient: "linear-gradient(135deg, #22c55e, #14b8a6)" },
]

function getIPDStatus(visitStatus: string) {
  switch (visitStatus) {
    case "In Progress": return "In Treatment"
    case "Completed": return "Discharged"
    case "Cancelled": return "Discharged"
    default: return "Admitted"
  }
}

const totalBeds = bedStatus.reduce((acc, ward) => acc + ward.total, 0)
const totalOccupied = bedStatus.reduce((acc, ward) => acc + ward.occupied, 0)
const totalVacant = bedStatus.reduce((acc, ward) => acc + ward.vacant, 0)
const totalReserved = bedStatus.reduce((acc, ward) => acc + ward.reserved, 0)

const statsData = [
  { title: "Total Beds", value: totalBeds, icon: BedDouble, gradient: "linear-gradient(135deg, #14b8a6, #3b82f6)", shadow: "0 8px 32px rgba(20,184,166,0.30)" },
  { title: "Occupied", value: totalOccupied, icon: AlertCircle, gradient: "linear-gradient(135deg, #ef4444, #ec4899)", shadow: "0 8px 32px rgba(239,68,68,0.30)" },
  { title: "Vacant", value: totalVacant, icon: CheckCircle, gradient: "linear-gradient(135deg, #22c55e, #14b8a6)", shadow: "0 8px 32px rgba(34,197,94,0.30)" },
  { title: "Reserved", value: totalReserved, icon: Clock, gradient: "linear-gradient(135deg, #f97316, #ef4444)", shadow: "0 8px 32px rgba(249,115,22,0.30)" },
]

export default function IPDPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { patients } = usePatients()

  const ipdAdmissions = patients.flatMap((p) =>
    p.visits.filter((v) => v.type === "IPD").map((v, i) => ({
      id: v.id,
      admissionNumber: `ADM${v.date.replace(/-/g, "")}${String(i + 1).padStart(3, "0")}`,
      patient: `${p.firstName} ${p.lastName}`,
      umr: p.uniqueNumber,
      doctor: v.doctor,
      department: v.department,
      bed: "-",
      ward: "-",
      admissionDate: v.date,
      diagnosis: v.diagnosis,
      status: getIPDStatus(v.status),
    }))
  )

  const filteredAdmissions = ipdAdmissions.filter(
    (admission) =>
      admission.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAdmissionBadge = (status: string) => {
    switch (status) {
      case "Admitted":
        return { background: "linear-gradient(135deg, #dbeafe, #bfdbfe)", color: "#1e40af", border: "1px solid #93c5fd" }
      case "In Treatment":
        return { background: "linear-gradient(135deg, #fef3c7, #fde68a)", color: "#92400e", border: "1px solid #fcd34d" }
      default:
        return { background: "linear-gradient(135deg, #dcfce7, #d1fae5)", color: "#166534", border: "1px solid #bbf7d0" }
    }
  }

  return (
    <AnimatedPage>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", background: "linear-gradient(135deg, #ef4444, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
              IPD (In Patient Department)
            </h1>
            <p style={{ color: "#64748b", margin: "4px 0 0 0" }}>Manage inpatient admissions and bed management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", color: "#475569", cursor: "pointer", fontSize: "14px", fontWeight: "500", transition: "all 0.2s" }}>
              <Download style={{ width: "16px", height: "16px", marginRight: "8px" }} />
              Export
            </button>
            <Link href="/ipd/new">
              <button style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #ef4444, #ec4899)", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "500", boxShadow: "0 8px 32px rgba(239,68,68,0.30)", transition: "all 0.2s" }}>
                <Plus style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                New Admission
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
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #1e293b, #475569)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>Bed Status by Ward</h2>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                {bedStatus.map((ward, index) => (
                  <motion.div
                    key={ward.ward}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                  >
                    <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9", transition: "all 0.3s" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: ward.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Building2 style={{ width: "18px", height: "18px", color: "white" }} />
                          </div>
                          <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b", margin: 0 }}>{ward.ward}</h3>
                        </div>
                        <span style={{ padding: "4px 10px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", fontWeight: "500" }}>{ward.total} beds</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "14px" }}>
                          <span style={{ color: "#64748b" }}>Occupied</span>
                          <span style={{ fontWeight: "bold", color: "#ef4444" }}>{ward.occupied}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "14px" }}>
                          <span style={{ color: "#64748b" }}>Vacant</span>
                          <span style={{ fontWeight: "bold", color: "#22c55e" }}>{ward.vacant}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "14px" }}>
                          <span style={{ color: "#64748b" }}>Reserved</span>
                          <span style={{ fontWeight: "bold", color: "#f97316" }}>{ward.reserved}</span>
                        </div>
                        <div style={{ width: "100%", height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden", marginTop: "4px" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            style={{ height: "100%", background: "linear-gradient(135deg, #ef4444, #ec4899)", borderRadius: "4px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ marginTop: "24px" }}>
          <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.8)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #1e293b, #475569)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>Current Admissions</h2>
              <div style={{ position: "relative" }}>
                <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#94a3b8" }} />
                <input
                  type="search"
                  placeholder="Search admissions..."
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
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Admission No.</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Patient</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Doctor</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Ward/Bed</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Admission Date</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Diagnosis</th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Status</th>
                    <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmissions.map((admission, index) => (
                    <motion.tr
                      key={admission.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      style={{ borderBottom: "1px solid #f1f5f9", transition: "all 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(90deg, rgba(239,68,68,0.05), rgba(236,72,153,0.05))"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "500", color: "#334155" }}>{admission.admissionNumber}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", margin: 0 }}>{admission.patient}</p>
                          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}>{admission.umr}</p>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{admission.doctor}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: "500", color: "#334155", margin: 0 }}>{admission.ward}</p>
                          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}>{admission.bed}</p>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{admission.admissionDate}</td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{admission.diagnosis}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ ...getAdmissionBadge(admission.status), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                          {admission.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                          <button style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Eye style={{ width: "16px", height: "16px" }} />
                          </button>
                          <button style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#ef4444" }}
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