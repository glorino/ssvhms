"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, TrendingUp } from "lucide-react"

const accent = "#14b8a6"
const accentDark = "#0d9488"

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  padding: "28px",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#0f172a",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box" as const,
}

const summaryCards = [
  { label: "Total Revenue", value: "₦4,250,000", change: "+12.5%", color: "#059669" },
  { label: "OPD Revenue", value: "₦1,850,000", change: "+8.2%", color: accent },
  { label: "IPD Revenue", value: "₦1,650,000", change: "+15.3%", color: "#6366f1" },
  { label: "Pharmacy Revenue", value: "₦750,000", change: "+5.1%", color: "#f59e0b" },
]

const dailyRevenue = [
  { date: "2026-08-07", opd: 285000, ipd: 245000, pharmacy: 125000, lab: 85000, radiology: 45000, total: 785000 },
  { date: "2026-08-06", opd: 265000, ipd: 220000, pharmacy: 110000, lab: 75000, radiology: 40000, total: 710000 },
  { date: "2026-08-05", opd: 295000, ipd: 260000, pharmacy: 130000, lab: 90000, radiology: 50000, total: 825000 },
  { date: "2026-08-04", opd: 240000, ipd: 210000, pharmacy: 105000, lab: 70000, radiology: 35000, total: 660000 },
  { date: "2026-08-03", opd: 275000, ipd: 235000, pharmacy: 120000, lab: 80000, radiology: 42000, total: 752000 },
]

export default function RevenueReportPage() {
  const [fromDate, setFromDate] = useState("2026-08-01")
  const [toDate, setToDate] = useState("2026-08-07")

  return (
    <div style={{ padding: "0", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/reports">
            <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Revenue Report</h1>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Track hospital revenue and financial performance</p>
          </div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 18px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", color: "#475569", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
          <Download size={16} /> Export
        </button>
      </div>

      {/* Date Range Filter */}
      <div style={{ ...cardStyle, marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>From Date</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ ...inputStyle, width: "200px" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>To Date</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ ...inputStyle, width: "200px" }} />
          </div>
          <button style={{ marginTop: "18px", padding: "10px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Apply Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {summaryCards.map((card) => (
          <div key={card.label} style={{ ...cardStyle, padding: "20px" }}>
            <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>{card.label}</div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>{card.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "6px", fontSize: "12px", fontWeight: 600, color: card.color }}>
              <TrendingUp size={14} /> {card.change}
            </div>
          </div>
        ))}
      </div>

      {/* Daily Revenue Table */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>Daily Revenue Breakdown</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                {["Date", "OPD", "IPD", "Pharmacy", "Lab", "Radiology", "Total"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dailyRevenue.map((row) => (
                <tr key={row.date} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#0f172a" }}>{row.date}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>₦{row.opd.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>₦{row.ipd.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>₦{row.pharmacy.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>₦{row.lab.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>₦{row.radiology.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: accent }}>₦{row.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
