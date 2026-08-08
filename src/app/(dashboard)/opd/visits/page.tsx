"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { usePatients } from "@/lib/patient-context"

const ACCENT = "#14b8a6"

const statusStyles: Record<string, { bg: string; color: string }> = {
  Completed: { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
  "In Progress": { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
  Scheduled: { bg: "rgba(59,130,246,0.1)", color: "#3b82f6" },
}

export default function OPDVisitsPage() {
  const [search, setSearch] = useState("")
  const { patients } = usePatients()

  const opdVisits = patients.flatMap((p) =>
    p.visits.filter((v) => v.type === "OPD").map((v, i) => ({
      visitNo: `VIS${v.date.replace(/-/g, "")}${String(i + 1).padStart(3, "0")}`,
      patient: `${p.firstName} ${p.lastName}`,
      doctor: v.doctor,
      department: v.department,
      symptoms: v.symptoms,
      diagnosis: v.diagnosis,
      date: v.date,
      status: v.status,
    }))
  )

  const today = new Date().toISOString().slice(0, 10)
  const statsData = [
    { title: "Total Visits", value: String(opdVisits.length), color: ACCENT, bg: "rgba(20,184,166,0.1)" },
    { title: "Today", value: String(opdVisits.filter((v) => v.date === today).length), color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
    { title: "In Progress", value: String(opdVisits.filter((v) => v.status === "In Progress").length), color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    { title: "Completed", value: String(opdVisits.filter((v) => v.status === "Completed").length), color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  ]

  const filtered = opdVisits.filter(
    (v) =>
      v.patient.toLowerCase().includes(search.toLowerCase()) ||
      v.visitNo.toLowerCase().includes(search.toLowerCase()) ||
      v.doctor.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: "0", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
            OPD Visits
          </h1>
          <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>
            Manage outpatient visits, consultations, and diagnoses
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <svg
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search visits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingLeft: "36px",
              paddingRight: "14px",
              paddingTop: "9px",
              paddingBottom: "9px",
              fontSize: "13px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              outline: "none",
              width: "260px",
              color: "#334155",
              background: "#fff",
              transition: "border-color 0.2s",
            }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {statsData.map((stat) => (
          <Card key={stat.title} style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderRadius: "12px" }}>
            <CardContent style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#1e293b" }}>{stat.value}</div>
                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{stat.title}</div>
              </div>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {stat.title === "Total Visits" && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
                  {stat.title === "Today" && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>}
                  {stat.title === "In Progress" && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                  {stat.title === "Completed" && <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />}
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderRadius: "12px", overflow: "hidden" }}>
        <CardContent style={{ padding: 0 }}>
          <div style={{ padding: "20px 24px 0" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Visit History
            </h2>
          </div>
          <div style={{ overflowX: "auto", padding: "16px 0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  {["Visit No", "Patient", "Doctor", "Department", "Symptoms", "Diagnosis", "Date", "Status"].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((visit) => {
                  const st = statusStyles[visit.status] || { bg: "#f1f5f9", color: "#64748b" }
                  return (
                    <tr
                      key={visit.visitNo}
                      style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(20,184,166,0.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: ACCENT, whiteSpace: "nowrap" }}>
                        {visit.visitNo}
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: 500, color: "#1e293b" }}>{visit.patient}</td>
                      <td style={{ padding: "14px 16px", color: "#475569" }}>{visit.doctor}</td>
                      <td style={{ padding: "14px 16px", color: "#475569" }}>{visit.department}</td>
                      <td style={{ padding: "14px 16px", color: "#475569", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {visit.symptoms}
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: 500, color: "#1e293b" }}>{visit.diagnosis}</td>
                      <td style={{ padding: "14px 16px", color: "#64748b", whiteSpace: "nowrap" }}>{visit.date}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 500,
                            background: st.bg,
                            color: st.color,
                            border: `1px solid ${st.color}20`,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {visit.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
