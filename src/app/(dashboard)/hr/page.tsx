"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Users, CheckCircle, Clock, AlertCircle, Banknote, Filter } from "lucide-react"
import { filterByPeriod } from "@/lib/filter-utils"

const stats = [
  { title: "Total Staff", value: "6", icon: Users, gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)", shadow: "0 8px 24px rgba(139,92,246,0.35)" },
  { title: "Present Today", value: "4", icon: CheckCircle, gradient: "linear-gradient(135deg, #22c55e, #16a34a)", shadow: "0 8px 24px rgba(34,197,94,0.35)" },
  { title: "On Leave", value: "2", icon: Clock, gradient: "linear-gradient(135deg, #f59e0b, #d97706)", shadow: "0 8px 24px rgba(245,158,11,0.35)" },
  { title: "Monthly Payroll", value: "₦3,63,000", icon: Banknote, gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)", shadow: "0 8px 24px rgba(139,92,246,0.35)" },
]

const staff = [
  { id: "STF001", employeeId: "EMP2026001", name: "Dr. Priya Sharma", department: "Cardiology", designation: "Senior Doctor", joiningDate: "2020-03-15", contact: "9876543250", email: "priya@ssvhospital.com", salary: 150000, status: "Active" },
  { id: "STF002", employeeId: "EMP2026002", name: "Dr. Amit Singh", department: "Orthopedics", designation: "Doctor", joiningDate: "2021-06-20", contact: "9876543251", email: "amit@ssvhospital.com", salary: 120000, status: "Active" },
  { id: "STF003", employeeId: "EMP2026003", name: "Neha Gupta", department: "Nursing", designation: "Head Nurse", joiningDate: "2019-01-10", contact: "9876543252", email: "neha@ssvhospital.com", salary: 45000, status: "Active" },
  { id: "STF004", employeeId: "EMP2026004", name: "Rahul Joshi", department: "Administration", designation: "Manager", joiningDate: "2022-04-05", contact: "9876543253", email: "rahul@ssvhospital.com", salary: 55000, status: "Active" },
  { id: "STF005", employeeId: "EMP2026005", name: "Sanjay Mehta", department: "Pharmacy", designation: "Pharmacist", joiningDate: "2023-07-12", contact: "9876543254", email: "sanjay@ssvhospital.com", salary: 35000, status: "Active" },
  { id: "STF006", employeeId: "EMP2026006", name: "Sunita Patil", department: "Reception", designation: "Receptionist", joiningDate: "2024-02-28", contact: "9876543255", email: "sunita@ssvhospital.com", salary: 25000, status: "On Leave" },
]

const attendance = [
  { id: "ATT001", employeeId: "EMP2026001", name: "Dr. Priya Sharma", date: "2026-08-07", clockIn: "08:00 AM", clockOut: "-", hours: "-", status: "Present" },
  { id: "ATT002", employeeId: "EMP2026002", name: "Dr. Amit Singh", date: "2026-08-07", clockIn: "08:15 AM", clockOut: "-", hours: "-", status: "Present" },
  { id: "ATT003", employeeId: "EMP2026003", name: "Neha Gupta", date: "2026-08-07", clockIn: "07:45 AM", clockOut: "-", hours: "-", status: "Present" },
  { id: "ATT004", employeeId: "EMP2026004", name: "Rahul Joshi", date: "2026-08-07", clockIn: "-", clockOut: "-", hours: "-", status: "Absent" },
  { id: "ATT005", employeeId: "EMP2026005", name: "Sanjay Mehta", date: "2026-08-07", clockIn: "09:00 AM", clockOut: "-", hours: "-", status: "Present" },
  { id: "ATT006", employeeId: "EMP2026006", name: "Sunita Patil", date: "2026-08-07", clockIn: "-", clockOut: "-", hours: "-", status: "On Leave" },
]

const leaves = [
  { id: "LVE001", employeeId: "EMP2026006", name: "Sunita Patil", leaveType: "Casual Leave", startDate: "2026-08-07", endDate: "2026-08-09", days: 3, reason: "Family function", status: "Approved" },
  { id: "LVE002", employeeId: "EMP2026004", name: "Rahul Joshi", leaveType: "Sick Leave", startDate: "2026-08-07", endDate: "2026-08-07", days: 1, reason: "Fever", status: "Approved" },
  { id: "LVE003", employeeId: "EMP2026002", name: "Dr. Amit Singh", leaveType: "Earned Leave", startDate: "2026-08-15", endDate: "2026-08-20", days: 6, reason: "Vacation", status: "Pending" },
  { id: "LVE004", employeeId: "EMP2026005", name: "Sanjay Mehta", leaveType: "Casual Leave", startDate: "2026-08-10", endDate: "2026-08-11", days: 2, reason: "Personal work", status: "Pending" },
]

const payroll = [
  { id: "PAY001", employeeId: "EMP2026001", name: "Dr. Priya Sharma", month: "July 2026", basic: 100000, allowances: 50000, deductions: 15000, netPay: 135000, status: "Paid" },
  { id: "PAY002", employeeId: "EMP2026002", name: "Dr. Amit Singh", month: "July 2026", basic: 80000, allowances: 40000, deductions: 12000, netPay: 108000, status: "Paid" },
  { id: "PAY003", employeeId: "EMP2026003", name: "Neha Gupta", month: "July 2026", basic: 30000, allowances: 15000, deductions: 5000, netPay: 40000, status: "Paid" },
  { id: "PAY004", employeeId: "EMP2026004", name: "Rahul Joshi", month: "July 2026", basic: 35000, allowances: 20000, deductions: 6000, netPay: 49000, status: "Pending" },
  { id: "PAY005", employeeId: "EMP2026005", name: "Sanjay Mehta", month: "July 2026", basic: 22000, allowances: 13000, deductions: 4000, netPay: 31000, status: "Paid" },
]

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Active: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  "On Leave": { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
  Present: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  Absent: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
  Approved: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  Pending: { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
  Paid: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
}

const tabs = ["Staff", "Attendance", "Leaves", "Payroll"] as const

function getInitials(name: string) {
  return name.split(" ").map(n => n[0]).join("")
}

export default function HRPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"Staff" | "Attendance" | "Leaves" | "Payroll">("Staff")
  const [activePeriod, setActivePeriod] = useState("all")

  const filteredAttendance = useMemo(() => filterByPeriod(attendance, activePeriod, "date"), [activePeriod])
  const filteredLeaves = useMemo(() => filterByPeriod(leaves, activePeriod, "startDate"), [activePeriod])

  const filteredStaff = staff.filter(
    s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Gradient Banner */}
      <div style={{
        background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
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
              Human Resources
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>Manage staff, attendance, leaves, and payroll</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button onClick={() => alert("Exporting HR data...")} style={{
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
            <Link href="/hr/staff/new">
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "9px 20px", borderRadius: "10px", border: "none",
                background: "#fff", color: "#8b5cf6", fontSize: "13px", fontWeight: 700,
                cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.2)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)" }}
              >
                <Plus size={15} /> Add Staff
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
                background: activeTab === t ? "linear-gradient(135deg, #8b5cf6, #a855f7)" : "transparent",
                color: activeTab === t ? "#fff" : "#64748b",
                boxShadow: activeTab === t ? "0 4px 12px rgba(139,92,246,0.3)" : "none",
              }}
              onMouseEnter={e => { if (activeTab !== t) e.currentTarget.style.background = "#f5f3ff" }}
              onMouseLeave={e => { if (activeTab !== t) e.currentTarget.style.background = "transparent" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Period Filter Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
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
                background: activePeriod === period.key ? "linear-gradient(135deg, #8b5cf6, #a855f7)" : "#fff",
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {stats.map((stat, i) => (
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

        {/* Staff Table */}
        {activeTab === "Staff" && (
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
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Staff Directory</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ position: "relative" }}>
                    <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input
                      type="search"
                      placeholder="Search staff..."
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
                  <button onClick={() => alert("Filter options coming soon")} style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "9px 16px", borderRadius: "10px", border: "1.5px solid #e2e8f0",
                    background: "#fff", color: "#475569", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0" }}
                  >
                    <Filter size={14} /> Filter
                  </button>
                </div>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Employee ID", "Name", "Department", "Designation", "Joining Date", "Contact", "Salary", "Status", "Actions"].map(h => (
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
                    {filteredStaff.map((s, index) => (
                      <motion.tr
                        key={s.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(139,92,246,0.04), rgba(168,85,247,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{s.employeeId}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                              width: "36px", height: "36px", borderRadius: "50%",
                              background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
                            }}>
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>{getInitials(s.name)}</span>
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#1e293b" }}>{s.name}</div>
                              <div style={{ fontSize: "11px", color: "#94a3b8" }}>{s.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{s.department}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                            background: "#f5f3ff", border: "1px solid #ddd6fe",
                            fontSize: "12px", color: "#7c3aed", fontWeight: 500,
                          }}>
                            {s.designation}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{s.joiningDate}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{s.contact}</td>
                        <td style={{ padding: "14px 16px", color: "#334155", fontWeight: 600 }}>₦{s.salary.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s2 = statusStyles[s.status] || statusStyles.Active
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s2.bg, color: s2.color, border: `1px solid ${s2.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {s.status}
                              </span>
                            )
                          })()}
                        </td>
                        <td style={{ padding: "14px 16px", textAlign: "right" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                            <button onClick={() => alert("View staff: " + s.name)} style={{
                              width: "32px", height: "32px", borderRadius: "8px", border: "none",
                              background: "transparent", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#64748b", transition: "all 0.2s",
                            }}
                              onMouseEnter={e => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.color = "#8b5cf6" }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                            >
                              <Eye size={16} />
                            </button>
                            <button onClick={() => alert("Edit staff: " + s.name)} style={{
                              width: "32px", height: "32px", borderRadius: "8px", border: "none",
                              background: "transparent", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#64748b", transition: "all 0.2s",
                            }}
                              onMouseEnter={e => { e.currentTarget.style.background = "#fef3c7"; e.currentTarget.style.color = "#f59e0b" }}
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
            {filteredStaff.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No staff found matching your search.
              </div>
            )}
          </motion.div>
        )}

        {/* Attendance Table */}
        {activeTab === "Attendance" && (
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
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Today&apos;s Attendance</h2>
                <button onClick={() => alert("Attendance marked successfully!")} style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "9px 20px", borderRadius: "10px", border: "none",
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  color: "#fff", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", boxShadow: "0 4px 16px rgba(139,92,246,0.4)", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(139,92,246,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(139,92,246,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                  <Clock size={15} /> Mark Attendance
                </button>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Employee ID", "Name", "Date", "Clock In", "Clock Out", "Hours", "Status"].map(h => (
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
                    {filteredAttendance.map((att, index) => (
                      <motion.tr
                        key={att.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(139,92,246,0.04), rgba(168,85,247,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{att.employeeId}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{att.name}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{att.date}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{att.clockIn}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{att.clockOut}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{att.hours}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[att.status] || statusStyles.Present
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {att.status}
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
          </motion.div>
        )}

        {/* Leaves Table */}
        {activeTab === "Leaves" && (
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
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Leave Requests</h2>
                <Link href="/hr/leave/new">
                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "9px 20px", borderRadius: "10px", border: "none",
                    background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                    color: "#fff", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", boxShadow: "0 4px 16px rgba(139,92,246,0.4)", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(139,92,246,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(139,92,246,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
                  >
                    <Plus size={15} /> Apply Leave
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Employee", "Leave Type", "Start Date", "End Date", "Days", "Reason", "Status", "Actions"].map(h => (
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
                    {filteredLeaves.map((leave, index) => (
                      <motion.tr
                        key={leave.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(139,92,246,0.04), rgba(168,85,247,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                              width: "36px", height: "36px", borderRadius: "50%",
                              background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
                            }}>
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>{getInitials(leave.name)}</span>
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#1e293b" }}>{leave.name}</div>
                              <div style={{ fontSize: "11px", color: "#94a3b8" }}>{leave.employeeId}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                            background: "#f5f3ff", border: "1px solid #ddd6fe",
                            fontSize: "12px", color: "#7c3aed", fontWeight: 500,
                          }}>
                            {leave.leaveType}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{leave.startDate}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{leave.endDate}</td>
                        <td style={{ padding: "14px 16px", color: "#334155", fontWeight: 600 }}>{leave.days}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{leave.reason}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[leave.status] || statusStyles.Pending
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {leave.status}
                              </span>
                            )
                          })()}
                        </td>
                        <td style={{ padding: "14px 16px", textAlign: "right" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                            <button onClick={() => alert("View leave: " + leave.name)} style={{
                              width: "32px", height: "32px", borderRadius: "8px", border: "none",
                              background: "transparent", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#64748b", transition: "all 0.2s",
                            }}
                              onMouseEnter={e => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.color = "#8b5cf6" }}
                              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                            >
                              <Eye size={16} />
                            </button>
                            {leave.status === "Pending" && (
                              <button onClick={() => alert("Leave approved!")} style={{
                                width: "32px", height: "32px", borderRadius: "8px", border: "none",
                                background: "transparent", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#64748b", transition: "all 0.2s",
                              }}
                                onMouseEnter={e => { e.currentTarget.style.background = "#dcfce7"; e.currentTarget.style.color = "#22c55e" }}
                                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                              >
                                <CheckCircle size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Payroll Table */}
        {activeTab === "Payroll" && (
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
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Payroll - July 2026</h2>
                <button onClick={() => alert("Payroll processed successfully!")} style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "9px 20px", borderRadius: "10px", border: "none",
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                  color: "#fff", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", boxShadow: "0 4px 16px rgba(139,92,246,0.4)", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(139,92,246,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(139,92,246,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                  <Banknote size={15} /> Process Payroll
                </button>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Employee", "Basic", "Allowances", "Deductions", "Net Pay", "Status"].map(h => (
                      <th key={h} style={{
                        padding: "12px 16px",
                        textAlign: h === "Net Pay" ? "right" : "left",
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
                    {payroll.map((pay, index) => (
                      <motion.tr
                        key={pay.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(139,92,246,0.04), rgba(168,85,247,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{
                              width: "36px", height: "36px", borderRadius: "50%",
                              background: "linear-gradient(135deg, #8b5cf6, #a855f7)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
                            }}>
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>{getInitials(pay.name)}</span>
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "#1e293b" }}>{pay.name}</div>
                              <div style={{ fontSize: "11px", color: "#94a3b8" }}>{pay.employeeId}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#334155" }}>₦{pay.basic.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", color: "#334155" }}>₦{pay.allowances.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", color: "#ef4444", fontWeight: 600 }}>₦{pay.deductions.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 700, color: "#1e293b" }}>₦{pay.netPay.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[pay.status] || statusStyles.Paid
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {pay.status}
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
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
