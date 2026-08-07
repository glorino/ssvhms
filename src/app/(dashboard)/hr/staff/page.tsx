"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Stethoscope, Heart, Shield } from "lucide-react"

const ACCENT = "#14b8a6"
const ACCENT_LIGHT = "#ccfbf1"
const ACCENT_DARK = "#0d9488"

const stats = [
  { title: "Total Staff", value: "156", icon: Users, bg: "linear-gradient(135deg, #14b8a6, #0d9488)" },
  { title: "Doctors", value: "42", icon: Stethoscope, bg: "linear-gradient(135deg, #6366f1, #4f46e5)" },
  { title: "Nurses", value: "68", icon: Heart, bg: "linear-gradient(135deg, #f43f5e, #e11d48)" },
  { title: "Admin", value: "46", icon: Shield, bg: "linear-gradient(135deg, #f59e0b, #d97706)" },
]

const staffData = [
  { id: "EMP001", name: "Dr. Adebayo Okafor", department: "Cardiology", designation: "Consultant", phone: "0801-234-5678", status: "Active" },
  { id: "EMP002", name: "Nurse Fatima Bello", department: "Pediatrics", designation: "Head Nurse", phone: "0802-345-6789", status: "Active" },
  { id: "EMP003", name: "Dr. Chinedu Eze", department: "Orthopedics", designation: "Senior Doctor", phone: "0803-456-7890", status: "Active" },
  { id: "EMP004", name: "Grace Nwankwo", department: "Administration", designation: "HR Manager", phone: "0804-567-8901", status: "On Leave" },
  { id: "EMP005", name: "Dr. Emeka Obi", department: "Neurology", designation: "Resident Doctor", phone: "0805-678-9012", status: "Active" },
  { id: "EMP006", name: "Amina Yusuf", department: "Pharmacy", designation: "Chief Pharmacist", phone: "0806-789-0123", status: "Active" },
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
  nameCell: { display: "flex", alignItems: "center", gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 600 },
  searchInput: { padding: "8px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", width: 240, transition: "border-color 0.2s" },
}

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: bg, color,
})

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2)
}

export default function StaffDirectoryPage() {
  const [search, setSearch] = useState("")

  const filtered = staffData.filter(
    (st) => st.name.toLowerCase().includes(search.toLowerCase()) || st.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Staff Directory</h1>
          <p style={s.subtitle}>Manage all hospital staff members</p>
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
          <h2 style={s.tableTitle}>All Staff Members</h2>
          <input
            style={s.searchInput}
            type="search"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Employee ID</th>
              <th style={s.th}>Name</th>
              <th style={s.th}>Department</th>
              <th style={s.th}>Designation</th>
              <th style={s.th}>Phone</th>
              <th style={s.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((st) => (
              <tr key={st.id} style={{ transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdfa")} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                <td style={{ ...s.td, fontWeight: 500, fontFamily: "monospace" }}>{st.id}</td>
                <td style={s.td}>
                  <div style={s.nameCell}>
                    <div style={s.avatar}>{getInitials(st.name)}</div>
                    <span style={{ fontWeight: 500, color: "#0f172a" }}>{st.name}</span>
                  </div>
                </td>
                <td style={s.td}>{st.department}</td>
                <td style={s.td}>
                  <span style={badgeStyle(ACCENT_LIGHT, ACCENT_DARK)}>{st.designation}</span>
                </td>
                <td style={s.td}>{st.phone}</td>
                <td style={s.td}>
                  <span style={badgeStyle(st.status === "Active" ? "#dcfce7" : "#fef3c7", st.status === "Active" ? "#15803d" : "#b45309")}>
                    {st.status}
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
