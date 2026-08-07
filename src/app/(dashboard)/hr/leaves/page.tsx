"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, XCircle, FileText } from "lucide-react"

const ACCENT = "#14b8a6"
const ACCENT_LIGHT = "#ccfbf1"
const ACCENT_DARK = "#0d9488"

const stats = [
  { title: "Pending", value: "5", icon: Clock, bg: "linear-gradient(135deg, #f59e0b, #d97706)" },
  { title: "Approved", value: "23", icon: CheckCircle, bg: "linear-gradient(135deg, #14b8a6, #0d9488)" },
  { title: "Rejected", value: "3", icon: XCircle, bg: "linear-gradient(135deg, #ef4444, #dc2626)" },
  { title: "Total", value: "31", icon: FileText, bg: "linear-gradient(135deg, #6366f1, #4f46e5)" },
]

const leavesData = [
  { name: "Dr. Adebayo Okafor", leaveType: "Annual Leave", from: "2026-08-10", to: "2026-08-15", days: 6, status: "Approved", approvedBy: "Dr. K. Adeyemi" },
  { name: "Nurse Fatima Bello", leaveType: "Sick Leave", from: "2026-08-07", to: "2026-08-08", days: 2, status: "Approved", approvedBy: "Grace Nwankwo" },
  { name: "Dr. Chinedu Eze", leaveType: "Maternity Leave", from: "2026-08-15", to: "2026-10-15", days: 62, status: "Pending", approvedBy: "-" },
  { name: "Grace Nwankwo", leaveType: "Annual Leave", from: "2026-08-20", to: "2026-08-22", days: 3, status: "Pending", approvedBy: "-" },
  { name: "Dr. Emeka Obi", leaveType: "Study Leave", from: "2026-07-01", to: "2026-07-15", days: 15, status: "Rejected", approvedBy: "Dr. K. Adeyemi" },
  { name: "Amina Yusuf", leaveType: "Compassionate Leave", from: "2026-08-05", to: "2026-08-06", days: 2, status: "Approved", approvedBy: "Grace Nwankwo" },
]

const s: Record<string, React.CSSProperties> = {
  page: { padding: 0, minHeight: "100vh", background: "#f8fafc" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: 14, color: "#64748b", marginTop: 4 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 },
  statCard: { borderRadius: 12, padding: "20px 24px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  statValue: { fontSize: 28, fontWeight: 700 },
  statLabel: { fontSize: 13, opacity: 0.9, marginTop: 2 },
  iconBox: { width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" },
  tableCard: { borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  tableHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #f1f5f9" },
  tableTitle: { fontSize: 16, fontWeight: 600, color: "#0f172a", margin: 0 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase" as const, letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" },
  td: { padding: "14px 16px", fontSize: 14, color: "#334155", borderBottom: "1px solid #f1f5f9" },
  leaveTypeBadge: { padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: ACCENT_LIGHT, color: ACCENT_DARK },
}

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: bg, color,
})

export default function LeavesPage() {
  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Leave Management</h1>
          <p style={s.subtitle}>Track and manage staff leave requests</p>
        </div>
      </div>

      <div style={s.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.title} style={{ ...s.statCard, background: stat.bg }}>
            <div>
              <div style={s.statValue}>{stat.value}</div>
              <div style={s.statLabel}>{stat.title}</div>
            </div>
            <div style={s.iconBox}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div style={s.tableCard}>
        <div style={s.tableHeader}>
          <h2 style={s.tableTitle}>Leave Requests</h2>
        </div>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Staff Name</th>
              <th style={s.th}>Leave Type</th>
              <th style={s.th}>From</th>
              <th style={s.th}>To</th>
              <th style={s.th}>Days</th>
              <th style={s.th}>Status</th>
              <th style={s.th}>Approved By</th>
            </tr>
          </thead>
          <tbody>
            {leavesData.map((leave, i) => (
              <tr key={i} style={{ transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdfa")} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                <td style={{ ...s.td, fontWeight: 500, color: "#0f172a" }}>{leave.name}</td>
                <td style={s.td}>
                  <span style={s.leaveTypeBadge}>{leave.leaveType}</span>
                </td>
                <td style={s.td}>{leave.from}</td>
                <td style={s.td}>{leave.to}</td>
                <td style={{ ...s.td, fontWeight: 600, color: "#0f172a" }}>{leave.days}</td>
                <td style={s.td}>
                  <span style={badgeStyle(
                    leave.status === "Approved" ? "#dcfce7" : leave.status === "Pending" ? "#fef3c7" : "#fee2e2",
                    leave.status === "Approved" ? "#15803d" : leave.status === "Pending" ? "#b45309" : "#dc2626"
                  )}>
                    {leave.status}
                  </span>
                </td>
                <td style={{ ...s.td, color: leave.approvedBy === "-" ? "#94a3b8" : "#334155" }}>
                  {leave.approvedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
