"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, CheckCircle, Clock, TrendingUp } from "lucide-react"

const ACCENT = "#14b8a6"
const ACCENT_LIGHT = "#ccfbf1"
const ACCENT_DARK = "#0d9488"

const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`

const stats = [
  { title: "Total Payroll", value: formatNaira(12500000), icon: Wallet, bg: "linear-gradient(135deg, #14b8a6, #0d9488)" },
  { title: "Processed", value: formatNaira(10200000), icon: CheckCircle, bg: "linear-gradient(135deg, #22c55e, #16a34a)" },
  { title: "Pending", value: formatNaira(2300000), icon: Clock, bg: "linear-gradient(135deg, #f59e0b, #d97706)" },
]

const payrollData = [
  { name: "Dr. Adebayo Okafor", department: "Cardiology", basic: 450000, allowances: 180000, deductions: 67500, netPay: 562500, status: "Paid" },
  { name: "Nurse Fatima Bello", department: "Pediatrics", basic: 280000, allowances: 112000, deductions: 42000, netPay: 350000, status: "Paid" },
  { name: "Dr. Chinedu Eze", department: "Orthopedics", basic: 420000, allowances: 168000, deductions: 63000, netPay: 525000, status: "Paid" },
  { name: "Grace Nwankwo", department: "Administration", basic: 320000, allowances: 96000, deductions: 48000, netPay: 368000, status: "Pending" },
  { name: "Dr. Emeka Obi", department: "Neurology", basic: 380000, allowances: 152000, deductions: 57000, netPay: 475000, status: "Paid" },
  { name: "Amina Yusuf", department: "Pharmacy", basic: 350000, allowances: 105000, deductions: 52500, netPay: 402500, status: "Pending" },
]

const s: Record<string, React.CSSProperties> = {
  page: { padding: 0, minHeight: "100vh", background: "#f8fafc" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: 14, color: "#64748b", marginTop: 4 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 },
  statCard: { borderRadius: 12, padding: "20px 24px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  statValue: { fontSize: 24, fontWeight: 700, wordBreak: "break-all" },
  statLabel: { fontSize: 13, opacity: 0.9, marginTop: 2 },
  iconBox: { width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  tableCard: { borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
  tableHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #f1f5f9" },
  tableTitle: { fontSize: 16, fontWeight: 600, color: "#0f172a", margin: 0 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase" as const, letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" },
  thRight: { padding: "12px 16px", textAlign: "right" as const, fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase" as const, letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" },
  td: { padding: "14px 16px", fontSize: 14, color: "#334155", borderBottom: "1px solid #f1f5f9" },
  tdRight: { padding: "14px 16px", fontSize: 14, color: "#334155", borderBottom: "1px solid #f1f5f9", textAlign: "right" as const },
  naira: { fontFamily: "monospace" as const, fontWeight: 500 },
  nairaRed: { fontFamily: "monospace" as const, fontWeight: 500, color: "#dc2626" },
  nairaBold: { fontFamily: "monospace" as const, fontWeight: 700, color: "#0f172a" },
}

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: bg, color,
})

export default function PayrollPage() {
  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Payroll</h1>
          <p style={s.subtitle}>Manage staff salaries and payments</p>
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
          <h2 style={s.tableTitle}>July 2026 Payroll</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Staff Name</th>
                <th style={s.th}>Department</th>
                <th style={s.thRight}>Basic (₦)</th>
                <th style={s.thRight}>Allowances (₦)</th>
                <th style={s.thRight}>Deductions (₦)</th>
                <th style={s.thRight}>Net Pay (₦)</th>
                <th style={s.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map((pay, i) => (
                <tr key={i} style={{ transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdfa")} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                  <td style={{ ...s.td, fontWeight: 500, color: "#0f172a" }}>{pay.name}</td>
                  <td style={s.td}>{pay.department}</td>
                  <td style={s.tdRight}><span style={s.naira}>{formatNaira(pay.basic)}</span></td>
                  <td style={s.tdRight}><span style={s.naira}>{formatNaira(pay.allowances)}</span></td>
                  <td style={s.tdRight}><span style={s.nairaRed}>{formatNaira(pay.deductions)}</span></td>
                  <td style={s.tdRight}><span style={s.nairaBold}>{formatNaira(pay.netPay)}</span></td>
                  <td style={s.td}>
                    <span style={badgeStyle(
                      pay.status === "Paid" ? "#dcfce7" : "#fef3c7",
                      pay.status === "Paid" ? "#15803d" : "#b45309"
                    )}>
                      {pay.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
