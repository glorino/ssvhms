"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, UserX } from "lucide-react"

const ACCENT = "#14b8a6"
const ACCENT_LIGHT = "#ccfbf1"
const ACCENT_DARK = "#0d9488"

const stats = [
  { title: "Present", value: "120", icon: CheckCircle, bg: "linear-gradient(135deg, #14b8a6, #0d9488)" },
  { title: "Absent", value: "8", icon: XCircle, bg: "linear-gradient(135deg, #ef4444, #dc2626)" },
  { title: "Late", value: "12", icon: Clock, bg: "linear-gradient(135deg, #f59e0b, #d97706)" },
  { title: "On Leave", value: "16", icon: UserX, bg: "linear-gradient(135deg, #6366f1, #4f46e5)" },
]

const today = new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

const attendanceData = [
  { name: "Dr. Adebayo Okafor", department: "Cardiology", clockIn: "07:55 AM", clockOut: "05:10 PM", hours: "9h 15m", status: "Present" },
  { name: "Nurse Fatima Bello", department: "Pediatrics", clockIn: "08:00 AM", clockOut: "05:00 PM", hours: "9h 00m", status: "Present" },
  { name: "Dr. Chinedu Eze", department: "Orthopedics", clockIn: "08:30 AM", clockOut: "-", hours: "-", status: "Late" },
  { name: "Grace Nwankwo", department: "Administration", clockIn: "-", clockOut: "-", hours: "-", status: "On Leave" },
  { name: "Dr. Emeka Obi", department: "Neurology", clockIn: "-", clockOut: "-", hours: "-", status: "Absent" },
  { name: "Amina Yusuf", department: "Pharmacy", clockIn: "07:45 AM", clockOut: "04:55 PM", hours: "9h 10m", status: "Present" },
]

const s: Record<string, React.CSSProperties> = {
  page: { padding: 0, minHeight: "100vh", background: "#f8fafc" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  titleGroup: {},
  title: { fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: 14, color: "#64748b", marginTop: 4 },
  dateBadge: { display: "inline-block", padding: "8px 16px", borderRadius: 8, background: ACCENT_LIGHT, color: ACCENT_DARK, fontSize: 13, fontWeight: 500 },
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
  clockTag: { padding: "4px 10px", borderRadius: 6, fontSize: 12, fontFamily: "monospace" as const },
}

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: bg, color,
})

export default function AttendancePage() {
  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.titleGroup}>
          <h1 style={s.title}>Attendance</h1>
          <p style={s.subtitle}>Track daily staff attendance</p>
        </div>
        <div style={s.dateBadge}>{today}</div>
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
          <h2 style={s.tableTitle}>Today&apos;s Attendance</h2>
        </div>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Staff Name</th>
              <th style={s.th}>Department</th>
              <th style={s.th}>Clock In</th>
              <th style={s.th}>Clock Out</th>
              <th style={s.th}>Hours Worked</th>
              <th style={s.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((att, i) => (
              <tr key={i} style={{ transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdfa")} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                <td style={{ ...s.td, fontWeight: 500, color: "#0f172a" }}>{att.name}</td>
                <td style={s.td}>{att.department}</td>
                <td style={s.td}>
                  <span style={{ ...s.clockTag, background: att.clockIn !== "-" ? "#ecfdf5" : "#f8fafc", color: att.clockIn !== "-" ? "#15803d" : "#94a3b8" }}>
                    {att.clockIn}
                  </span>
                </td>
                <td style={s.td}>
                  <span style={{ ...s.clockTag, background: att.clockOut !== "-" ? "#ecfdf5" : "#f8fafc", color: att.clockOut !== "-" ? "#15803d" : "#94a3b8" }}>
                    {att.clockOut}
                  </span>
                </td>
                <td style={s.td}>{att.hours}</td>
                <td style={s.td}>
                  <span style={badgeStyle(
                    att.status === "Present" ? "#dcfce7" : att.status === "Late" ? "#fef3c7" : att.status === "On Leave" ? "#e0e7ff" : "#fee2e2",
                    att.status === "Present" ? "#15803d" : att.status === "Late" ? "#b45309" : att.status === "On Leave" ? "#4338ca" : "#dc2626"
                  )}>
                    {att.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
