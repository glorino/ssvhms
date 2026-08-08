"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Ambulance, CheckCircle, Clock, AlertCircle, Phone } from "lucide-react"

const vehicles = [
  { id: "AMB001", vehicleNumber: "MH-01-AB-1234", type: "ALS", driver: "Ramesh Yadav", contact: "9876543210", status: "Available", lastService: "2026-07-15", nextService: "2026-10-15" },
  { id: "AMB002", vehicleNumber: "MH-01-CD-5678", type: "BLS", driver: "Suresh Patil", contact: "9876543211", status: "On Call", lastService: "2026-07-20", nextService: "2026-10-20" },
  { id: "AMB003", vehicleNumber: "MH-01-EF-9012", type: "ALS", driver: "Mahesh Kumar", contact: "9876543212", status: "Available", lastService: "2026-07-10", nextService: "2026-10-10" },
  { id: "AMB004", vehicleNumber: "MH-01-GH-3456", type: "Patient Transport", driver: "Rajesh Sharma", contact: "9876543213", status: "Maintenance", lastService: "2026-08-01", nextService: "2026-08-15" },
  { id: "AMB005", vehicleNumber: "MH-01-IJ-7890", type: "BLS", driver: "Anil Verma", contact: "9876543214", status: "Available", lastService: "2026-07-25", nextService: "2026-10-25" },
]

const callHistory = [
  { id: "CAL001", callNumber: "CAL2026001", callerName: "Rajesh Kumar", contact: "9876543220", pickupLocation: "Andheri West", dropLocation: "SSV Hospital", callTime: "2026-08-07 08:30", assignedVehicle: "MH-01-AB-1234", driver: "Ramesh Yadav", status: "Completed" },
  { id: "CAL002", callNumber: "CAL2026002", callerName: "Anita Sharma", contact: "9876543221", pickupLocation: "Bandra East", dropLocation: "SSV Hospital", callTime: "2026-08-07 09:15", assignedVehicle: "MH-01-CD-5678", driver: "Suresh Patil", status: "In Progress" },
  { id: "CAL003", callNumber: "CAL2026003", callerName: "Vikram Rao", contact: "9876543222", pickupLocation: "Juhu", dropLocation: "SSV Hospital", callTime: "2026-08-07 10:00", assignedVehicle: "-", driver: "-", status: "Pending" },
  { id: "CAL004", callNumber: "CAL2026004", callerName: "Kavita Joshi", contact: "9876543223", pickupLocation: "Dadar", dropLocation: "SSV Hospital", callTime: "2026-08-06 14:30", assignedVehicle: "MH-01-EF-9012", driver: "Mahesh Kumar", status: "Completed" },
  { id: "CAL005", callNumber: "CAL2026005", callerName: "Suresh Reddy", contact: "9876543224", pickupLocation: "Powai", dropLocation: "SSV Hospital", callTime: "2026-08-06 16:45", assignedVehicle: "MH-01-IJ-7890", driver: "Anil Verma", status: "Completed" },
]

const availableCount = vehicles.filter(v => v.status === "Available").length
const onCallCount = vehicles.filter(v => v.status === "On Call").length
const maintenanceCount = vehicles.filter(v => v.status === "Maintenance").length

const statsData = [
  { title: "Total Vehicles", value: "5", icon: Ambulance, gradient: "linear-gradient(135deg, #f97316, #ef4444)", shadow: "0 8px 24px rgba(249,115,22,0.35)" },
  { title: "Available", value: availableCount.toString(), icon: CheckCircle, gradient: "linear-gradient(135deg, #22c55e, #16a34a)", shadow: "0 8px 24px rgba(34,197,94,0.35)" },
  { title: "On Call", value: onCallCount.toString(), icon: Phone, gradient: "linear-gradient(135deg, #f59e0b, #d97706)", shadow: "0 8px 24px rgba(245,158,11,0.35)" },
  { title: "Maintenance", value: maintenanceCount.toString(), icon: AlertCircle, gradient: "linear-gradient(135deg, #ef4444, #dc2626)", shadow: "0 8px 24px rgba(239,68,68,0.35)" },
]

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Available: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  "On Call": { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
  Maintenance: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
  Completed: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  "In Progress": { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
  Pending: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
}

const tabs = ["Vehicles", "Call History"] as const

export default function AmbulancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"Vehicles" | "Call History">("Vehicles")

  const filteredVehicles = vehicles.filter(
    v => v.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) || v.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCalls = callHistory.filter(
    c => c.callerName.toLowerCase().includes(searchTerm.toLowerCase()) || c.callNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Gradient Banner */}
      <div style={{
        background: "linear-gradient(135deg, #f97316, #ef4444)",
        padding: "32px 40px 28px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-40%", right: "-5%", width: "300px", height: "300px",
          borderRadius: "50%", background: "rgba(255,255,255,0.08)",
        }} />
        <div style={{
          position: "absolute", bottom: "-30%", left: "10%", width: "200px", height: "200px",
          borderRadius: "50%", background: "rgba(255,255,255,0.06)",
        }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
              Ambulance Management
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>Manage ambulance fleet and emergency calls</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 18px", borderRadius: "10px", border: "1.5px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.25)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)" }}
            >
              <Download size={15} /> Export
            </button>
            <Link href="/ambulance/new">
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "9px 20px", borderRadius: "10px", border: "none",
                background: "#fff", color: "#f97316", fontSize: "13px", fontWeight: 700,
                cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.2)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)" }}
              >
                <Plus size={15} /> New Vehicle
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 40px" }}>
        {/* Filter Bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px",
          background: "#fff", padding: "8px", borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)",
          width: "fit-content",
        }}>
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: "7px 18px", borderRadius: "8px", border: "none", fontSize: "13px",
                fontWeight: 600, cursor: "pointer", transition: "all 0.25s",
                background: activeTab === t ? "linear-gradient(135deg, #f97316, #ef4444)" : "transparent",
                color: activeTab === t ? "#fff" : "#64748b",
                boxShadow: activeTab === t ? "0 4px 12px rgba(249,115,22,0.3)" : "none",
              }}
              onMouseEnter={e => { if (activeTab !== t) e.currentTarget.style.background = "#fff7ed" }}
              onMouseLeave={e => { if (activeTab !== t) e.currentTarget.style.background = "transparent" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring" as const, stiffness: 300 }}
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                background: "#fff", borderRadius: "16px", padding: "20px",
                boxShadow: stat.shadow, border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                  <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px", fontWeight: 500 }}>{stat.title}</p>
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

        {/* Vehicles Table */}
        {activeTab === "Vehicles" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Vehicle Fleet</h2>
                <div style={{ position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input
                    type="search"
                    placeholder="Search vehicles..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{
                      paddingLeft: "36px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                      width: "260px", borderRadius: "10px",
                      border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#334155",
                      outline: "none", transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "#f97316"}
                    onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                  />
                </div>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Vehicle No.", "Type", "Driver", "Contact", "Last Service", "Next Service", "Status", "Actions"].map(h => (
                      <th key={h} style={{
                        padding: "12px 16px",
                        textAlign: h === "Actions" ? "right" : "left",
                        fontWeight: 700, color: "#64748b", fontSize: "11px",
                        textTransform: "uppercase" as const, letterSpacing: "0.05em",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredVehicles.map((vehicle, index) => (
                      <motion.tr
                        key={vehicle.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(249,115,22,0.04), rgba(239,68,68,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{vehicle.vehicleNumber}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                            background: "#fff7ed", border: "1px solid #fed7aa",
                            fontSize: "12px", color: "#9a3412", fontWeight: 500,
                          }}>
                            {vehicle.type}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{vehicle.driver}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{vehicle.contact}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{vehicle.lastService}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{vehicle.nextService}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[vehicle.status] || statusStyles.Available
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {vehicle.status}
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
                              onMouseEnter={e => { e.currentTarget.style.background = "#fef3c7"; e.currentTarget.style.color = "#f97316" }}
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
                              onMouseEnter={e => { e.currentTarget.style.background = "#fff7ed"; e.currentTarget.style.color = "#ef4444" }}
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
            {filteredVehicles.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No vehicles found matching your search.
              </div>
            )}
          </motion.div>
        )}

        {/* Call History Table */}
        {activeTab === "Call History" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Call History</h2>
                <Link href="/ambulance/call">
                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "9px 20px", borderRadius: "10px", border: "none",
                    background: "linear-gradient(135deg, #f97316, #ef4444)",
                    color: "#fff", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", boxShadow: "0 4px 16px rgba(249,115,22,0.4)", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(249,115,22,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(249,115,22,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
                  >
                    <Phone size={15} /> New Call
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Call No.", "Caller", "Contact", "Pickup", "Drop", "Call Time", "Vehicle", "Status"].map(h => (
                      <th key={h} style={{
                        padding: "12px 16px", textAlign: "left",
                        fontWeight: 700, color: "#64748b", fontSize: "11px",
                        textTransform: "uppercase" as const, letterSpacing: "0.05em",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredCalls.map((call, index) => (
                      <motion.tr
                        key={call.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(249,115,22,0.04), rgba(239,68,68,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{call.callNumber}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.callerName}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.contact}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{call.pickupLocation}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{call.dropLocation}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.callTime}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "12px" }}>{call.assignedVehicle}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[call.status] || statusStyles.Pending
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {call.status}
                              </span>
                            )
                          })()}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filteredCalls.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No calls found matching your search.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
