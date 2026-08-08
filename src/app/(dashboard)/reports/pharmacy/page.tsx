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
  { label: "Total Medicines", value: "156", color: accent },
  { label: "Low Stock", value: "12", color: "#dc2626" },
  { label: "Revenue", value: "₦8,750,000", color: "#059669" },
  { label: "Expenses", value: "₦5,200,000", color: "#f59e0b" },
]

const pharmacyData = [
  { month: "August 2026", medicinesSold: 2340, revenue: 1450000, expenses: 850000, profit: 600000, status: "Profitable" },
  { month: "July 2026", medicinesSold: 2180, revenue: 1380000, expenses: 820000, profit: 560000, status: "Profitable" },
  { month: "June 2026", medicinesSold: 2050, revenue: 1290000, expenses: 790000, profit: 500000, status: "Profitable" },
  { month: "May 2026", medicinesSold: 1920, revenue: 1210000, expenses: 910000, profit: 300000, status: "Low Margin" },
  { month: "April 2026", medicinesSold: 2210, revenue: 1350000, expenses: 870000, profit: 480000, status: "Profitable" },
  { month: "March 2026", medicinesSold: 2050, revenue: 1070000, prices: 960000, profit: 110000, status: "Low Margin" },
]

export default function PharmacyReportPage() {
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
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Pharmacy Report</h1>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Pharmacy inventory and financial performance</p>
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
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>Monthly Pharmacy Summary</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                {["Month", "Medicines Sold", "Revenue (₦)", "Expenses (₦)", "Profit (₦)", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pharmacyData.map((row) => (
                <tr key={row.month} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#0f172a" }}>{row.month}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{row.medicinesSold.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>₦{row.revenue.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>₦{row.expenses.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: accent }}>₦{row.profit.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: row.status === "Profitable" ? "#ecfdf5" : "#fef3c7", color: row.status === "Profitable" ? "#059669" : "#d97706" }}>
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
