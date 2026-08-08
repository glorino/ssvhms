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
  { label: "Total Revenue", value: "₦25,800,000", color: accent },
  { label: "Collected", value: "₦22,100,000", color: "#059669" },
  { label: "Pending", value: "₦3,700,000", color: "#f59e0b" },
  { label: "Collection Rate", value: "86%", color: "#6366f1" },
]

const billingData = [
  { month: "August 2026", billsGenerated: 485, revenue: 4300000, collected: 3700000, pending: 600000, rate: "86%" },
  { month: "July 2026", billsGenerated: 462, revenue: 4150000, collected: 3580000, pending: 570000, rate: "86%" },
  { month: "June 2026", billsGenerated: 510, revenue: 4500000, collected: 3850000, pending: 650000, rate: "86%" },
  { month: "May 2026", billsGenerated: 438, revenue: 3950000, collected: 3400000, pending: 550000, rate: "86%" },
  { month: "April 2026", billsGenerated: 475, revenue: 4200000, collected: 3620000, pending: 580000, rate: "86%" },
  { month: "March 2026", billsGenerated: 445, revenue: 4700000, collected: 3950000, pending: 750000, rate: "84%" },
]

export default function BillingReportPage() {
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
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Billing Report</h1>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Billing and collection performance</p>
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
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>Monthly Billing Summary</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                {["Month", "Bills Generated", "Revenue (₦)", "Collected (₦)", "Pending (₦)", "Rate"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {billingData.map((row) => (
                <tr key={row.month} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#0f172a" }}>{row.month}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{row.billsGenerated}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>₦{row.revenue.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#059669" }}>₦{row.collected.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#d97706" }}>₦{row.pending.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: parseFloat(row.rate) >= 85 ? "#ecfdf5" : "#fef3c7", color: parseFloat(row.rate) >= 85 ? "#059669" : "#d97706" }}>
                      {row.rate}
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
