"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Download, Stethoscope, TrendingUp } from "lucide-react"

const accent = "#14b8a6"
const accentDark = "#0d9488"

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  padding: "28px",
}

const doctors = [
  { name: "Dr. Priya Sharma", department: "Cardiology", patientsSeen: 145, revenue: 1250000, appointments: 180, rating: 4.8 },
  { name: "Dr. Amit Singh", department: "Orthopedics", patientsSeen: 132, revenue: 980000, appointments: 165, rating: 4.7 },
  { name: "Dr. Neha Gupta", department: "Neurology", patientsSeen: 98, revenue: 870000, appointments: 120, rating: 4.9 },
  { name: "Dr. Sanjay Mehta", department: "General Medicine", patientsSeen: 178, revenue: 750000, appointments: 210, rating: 4.6 },
  { name: "Dr. Rahul Joshi", department: "Dermatology", patientsSeen: 87, revenue: 620000, appointments: 105, rating: 4.5 },
  { name: "Dr. Kavitha Nair", department: "Obstetrics", patientsSeen: 76, revenue: 1100000, appointments: 95, rating: 4.8 },
  { name: "Dr. Anita Kulkarni", department: "Pediatrics", patientsSeen: 110, revenue: 550000, appointments: 140, rating: 4.7 },
]

const summaryCards = [
  { label: "Total Doctors", value: "7", icon: Stethoscope, color: accent },
  { label: "Total Patients Seen", value: "826", icon: TrendingUp, color: "#059669" },
  { label: "Total Revenue", value: "₦6.12M", icon: TrendingUp, color: "#6366f1" },
  { label: "Avg Rating", value: "4.71", icon: Stethoscope, color: "#f59e0b" },
]

export default function DoctorReportPage() {
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
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Doctor Report</h1>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Doctor performance and productivity report</p>
          </div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 18px", border: "1px solid #e2e8f0", borderRadius: "8px", background: "#fff", color: "#475569", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
          <Download size={16} /> Export
        </button>
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

      {/* Doctor Performance Table */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px" }}>Doctor Performance Summary</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                {["Doctor", "Department", "Patients Seen", "Appointments", "Revenue", "Rating"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.name} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a" }}>{doc.name}</td>
                  <td style={{ padding: "12px 16px", color: accent }}>{doc.department}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a" }}>{doc.patientsSeen}</td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{doc.appointments}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#059669" }}>₦{doc.revenue.toLocaleString()}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: doc.rating >= 4.7 ? "#ecfdf5" : "#fef3c7", color: doc.rating >= 4.7 ? "#059669" : "#d97706" }}>
                      {doc.rating} ★
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
