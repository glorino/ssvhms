"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
import { usePatients } from "@/lib/patient-context"
import { filterByPeriod } from "@/lib/filter-utils"

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
  { title: "Total Admissions", value: totalBeds, icon: BedDouble, gradient: "linear-gradient(135deg, #f43f5e, #ec4899)", shadow: "0 8px 24px rgba(244,63,94,0.35)" },
  { title: "Active", value: totalOccupied, icon: AlertCircle, gradient: "linear-gradient(135deg, #f97316, #f59e0b)", shadow: "0 8px 24px rgba(249,115,22,0.35)" },
  { title: "Discharged", value: totalVacant, icon: CheckCircle, gradient: "linear-gradient(135deg, #22c55e, #16a34a)", shadow: "0 8px 24px rgba(34,197,94,0.35)" },
  { title: "Bed Occupancy", value: `${Math.round((totalOccupied / totalBeds) * 100)}%`, icon: Clock, gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", shadow: "0 8px 24px rgba(59,130,246,0.35)" },
]

export default function IPDPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activePeriod, setActivePeriod] = useState("all")
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

  const periodFilteredAdmissions = useMemo(() => filterByPeriod(ipdAdmissions, activePeriod, "admissionDate"), [ipdAdmissions, activePeriod])

  const filteredAdmissions = periodFilteredAdmissions.filter(
    (admission) =>
      admission.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAdmissionBadge = (status: string) => {
    switch (status) {
      case "Admitted":
        return { background: "#dbeafe", color: "#1e40af", border: "#93c5fd" }
      case "In Treatment":
        return { background: "#fff7ed", color: "#9a3412", border: "#fed7aa" }
      default:
        return { background: "#dcfce7", color: "#166534", border: "#bbf7d0" }
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "24px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Gradient Banner */}
        <div style={{
          background: "linear-gradient(135deg, #f43f5e, #ec4899)",
          borderRadius: "20px",
          padding: "32px",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, right: 0, width: "300px", height: "300px",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
            borderRadius: "50%", transform: "translate(30%, -30%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, width: "200px", height: "200px",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%", transform: "translate(-30%, 30%)",
          }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", position: "relative", zIndex: 1 }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>IPD (In Patient Department)</h1>
              <p style={{ opacity: 0.9, margin: "6px 0 0 0", fontSize: "14px" }}>Manage inpatient admissions and bed management</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={() => alert("Exporting IPD data...")} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "9px 18px", borderRadius: "10px", border: "1.5px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.15)", color: "white", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.2s",
              }}>
                <Download size={15} /> Export
              </button>
              <Link href="/ipd/new">
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "9px 20px", borderRadius: "10px", border: "none",
                  background: "white", color: "#ec4899", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", transition: "all 0.2s",
                }}>
                  <Plus size={15} /> New Admission
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
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
                border: activePeriod === period.key ? "1.5px solid #ec4899" : "1.5px solid #e2e8f0",
                background: activePeriod === period.key ? "linear-gradient(135deg, #f43f5e, #ec4899)" : "white",
                color: activePeriod === period.key ? "white" : "#64748b",
                cursor: "pointer", fontSize: "13px", fontWeight: 600, transition: "all 0.2s",
                boxShadow: activePeriod === period.key ? "0 4px 12px rgba(236,72,153,0.3)" : "none",
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
                boxShadow: stat.shadow, border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                  <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px", fontWeight: 500 }}>{stat.title}</p>
                </div>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: stat.gradient,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: stat.shadow,
                }}>
                  <stat.icon size={24} color="#fff" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bed Status Section */}
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
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Bed Status by Ward</h2>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
              {bedStatus.map((ward, index) => (
                <motion.div
                  key={ward.ward}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div style={{
                    background: "#fff", borderRadius: "14px", padding: "18px",
                    border: "1px solid #f1f5f9", transition: "all 0.2s",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "10px",
                          background: ward.gradient,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Building2 size={18} color="#fff" />
                        </div>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: 0 }}>{ward.ward}</h3>
                      </div>
                      <span style={{ padding: "4px 10px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", fontWeight: 500 }}>
                        {ward.total} beds
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px" }}>
                        <span style={{ color: "#64748b" }}>Occupied</span>
                        <span style={{ fontWeight: 700, color: "#ef4444" }}>{ward.occupied}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px" }}>
                        <span style={{ color: "#64748b" }}>Vacant</span>
                        <span style={{ fontWeight: 700, color: "#22c55e" }}>{ward.vacant}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px" }}>
                        <span style={{ color: "#64748b" }}>Reserved</span>
                        <span style={{ fontWeight: 700, color: "#f97316" }}>{ward.reserved}</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden", marginTop: "4px" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          style={{ height: "100%", background: "linear-gradient(135deg, #f43f5e, #ec4899)", borderRadius: "3px" }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Admissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: "#fff", borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
          }}
        >
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Current Admissions</h2>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="search"
                  placeholder="Search admissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    paddingLeft: "36px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                    width: "260px", borderRadius: "10px",
                    border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#334155",
                    outline: "none", transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#ec4899")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Admission No.", "Patient", "Doctor", "Ward/Bed", "Admission Date", "Diagnosis", "Status", "Actions"].map((h) => (
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
                  {filteredAdmissions.map((admission, index) => (
                    <motion.tr
                      key={admission.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg, rgba(244,63,94,0.04), rgba(236,72,153,0.02))")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{admission.admissionNumber}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>{admission.patient}</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{admission.umr}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b" }}>{admission.doctor}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 500, color: "#334155" }}>{admission.ward}</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{admission.bed}</div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b" }}>{admission.admissionDate}</td>
                      <td style={{ padding: "14px 16px", color: "#64748b", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{admission.diagnosis}</td>
                      <td style={{ padding: "14px 16px" }}>
                        {(() => {
                          const s = getAdmissionBadge(admission.status)
                          return (
                            <span style={{
                              display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                              background: s.background, color: s.color, border: `1px solid ${s.border}`,
                              fontSize: "12px", fontWeight: 600,
                            }}>
                              {admission.status}
                            </span>
                          )
                        })()}
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                          <button onClick={() => alert("View admission: " + admission.admissionNumber)} style={{
                            width: "32px", height: "32px", borderRadius: "8px", border: "none",
                            background: "transparent", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", transition: "all 0.2s",
                          }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Eye size={16} />
                          </button>
                          <button onClick={() => alert("Edit admission: " + admission.admissionNumber)} style={{
                            width: "32px", height: "32px", borderRadius: "8px", border: "none",
                            background: "transparent", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", transition: "all 0.2s",
                          }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#fff1f2"; e.currentTarget.style.color = "#f43f5e" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
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

          {filteredAdmissions.length === 0 && (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
              No admissions found matching your search.
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
