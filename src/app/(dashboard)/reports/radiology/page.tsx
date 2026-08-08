"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp } from "lucide-react"

const accent = "#14b8a6"
const accentDark = "#0d9488"

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  padding: "28px",
}

const summaryCards = [
  { label: "Total Scans", value: "890", color: accent },
  { label: "Completed", value: "845", color: "#059669" },
  { label: "Pending", value: "35", color: "#f59e0b" },
  { label: "Revenue", value: "₦5,600,000", color: "#6366f1" },
]

const radiologyData = [
  { month: "August 2026", scansDone: 152, completed: 144, pending: 8, revenue: 960000, status: "Completed" },
  { month: "July 2026", scansDone: 145, completed: 138, pending: 7, revenue: 920000, status: "Completed" },
  { month: "June 2026", scansDone: 160, completed: 150, pending: 10, revenue: 1010000, status: "Completed" },
  { month: "May 2026", scansDone: 138, completed: 130, pending: 8, revenue: 880000, status: "Completed" },
  { month: "April 2026", scansDone: 148, completed: 140, pending: 8, revenue: 940000, status: "Completed" },
  { month: "March 2026", scansDone: 147, completed: 143, pending: 4, revenue: 890000, status: "Completed" },
]

export default function RadiologyReportPage() {
  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/reports">
            <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Radiology Report</h1>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Radiology scan statistics and revenue</p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {summaryCards.map((card) => (
          <div key={card.label} style={{ ...cardStyle, padding: "20px" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>{card.label}</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>{card.value}</div>
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>Monthly Radiology Summary</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                {["Month", "Scans Done", "Completed", "Pending", "Revenue (₦)", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {radiologyData.map((row) => (
                <tr key={row.month} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#0f172a" }}>{row.month}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{row.scansDone}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#059669" }}>{row.completed}</td>
                  <td style={{ padding: "12px 16px", color: "#d97706" }}>{row.pending}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: accent }}>₦{row.revenue.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: "#ecfdf5", color: "#059669" }}>
                      {row.status}
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
