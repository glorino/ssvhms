"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Users, TrendingUp } from "lucide-react"
import { usePatients } from "@/lib/patient-context"

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

export default function PatientReportPage() {
  const { patients } = usePatients()
  const [fromDate, setFromDate] = useState("2026-08-01")
  const [toDate, setToDate] = useState("2026-08-07")

  const activePatients = patients.filter((p) => p.status === "Active").length
  const malePatients = patients.filter((p) => p.gender === "Male").length
  const femalePatients = patients.filter((p) => p.gender === "Female").length

  const summaryCards = [
    { label: "Total Patients", value: patients.length.toString(), icon: Users, color: accent },
    { label: "Active Patients", value: activePatients.toString(), icon: Users, color: "#059669" },
    { label: "Male Patients", value: malePatients.toString(), icon: Users, color: "#3b82f6" },
    { label: "Female Patients", value: femalePatients.toString(), icon: Users, color: "#ec4899" },
  ]

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
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Patient Report</h1>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Patient registration and demographics report</p>
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px", color: "#64748b" }}>{card.label}</span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${card.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <card.icon size={18} style={{ color: card.color }} />
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a" }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Patient List */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>New Patients (Filtered Period)</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                {["ID", "Name", "Phone", "Gender", "Blood Group", "Registered", "Status"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: accent }}>{p.uniqueNumber}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 500, color: "#0f172a" }}>{p.firstName} {p.lastName}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{p.phone}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{p.gender}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{p.bloodGroup || "N/A"}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{p.registeredAt}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: p.status === "Active" ? "#ecfdf5" : "#fef3c7", color: p.status === "Active" ? "#059669" : "#d97706" }}>
                      {p.status}
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
