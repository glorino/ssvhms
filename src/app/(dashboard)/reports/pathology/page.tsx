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
  { label: "Total Tests", value: "1,245", color: accent },
  { label: "Completed", value: "1,180", color: "#059669" },
  { label: "Pending", value: "45", color: "#f59e0b" },
  { label: "Revenue", value: "₦3,200,000", color: "#6366f1" },
]

const pathologyData = [
  { month: "August 2026", testsConducted: 210, completed: 198, pending: 12, revenue: 540000, status: "Completed" },
  { month: "July 2026", testsConducted: 195, completed: 187, pending: 8, revenue: 510000, status: "Completed" },
  { month: "June 2026", testsConducted: 225, completed: 210, pending: 15, revenue: 580000, status: "Completed" },
  { month: "May 2026", testsConducted: 188, completed: 175, pending: 13, revenue: 490000, status: "Completed" },
  { month: "April 2026", testsConducted: 205, completed: 195, pending: 10, revenue: 530000, status: "Completed" },
  { month: "March 2026", testsConducted: 222, completed: 215, pending: 7, revenue: 550000, status: "Completed" },
]

export default function PathologyReportPage() {
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
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Pathology Report</h1>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Lab test statistics and revenue</p>
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
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>Monthly Pathology Summary</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                {["Month", "Tests Conducted", "Completed", "Pending", "Revenue (₦)", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pathologyData.map((row) => (
                <tr key={row.month} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#0f172a" }}>{row.month}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{row.testsConducted}</td>
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
