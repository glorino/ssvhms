"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Search, Plus, Eye, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const accent = "#14b8a6"
const accentLight = "#ccfbf1"
const accentDark = "#0d9488"

const statsData = [
  { title: "Total", value: 89, bg: "#f0fdfa" },
  { title: "Active", value: 45, bg: "#ecfdf5" },
  { title: "Discharged", value: 38, bg: "#eff6ff" },
  { title: "Transferred", value: 6, bg: "#fefce8" },
]

const admissions = [
  { no: "ADM2026001", patient: "Rajesh Kumar", umr: "UMR2026001", doctor: "Dr. Priya Sharma", ward: "ICU", bed: "ICU-03", date: "2026-08-05", diagnosis: "Acute Myocardial Infarction", discharge: "-", status: "Admitted" },
  { no: "ADM2026002", patient: "Anita Patel", umr: "UMR2026002", doctor: "Dr. Amit Singh", ward: "Private", bed: "PW-12", date: "2026-08-04", diagnosis: "Fracture Left Femur", discharge: "-", status: "In Treatment" },
  { no: "ADM2026003", patient: "Suresh Reddy", umr: "UMR2026003", doctor: "Dr. Neha Gupta", ward: "General", bed: "GW-25", date: "2026-08-03", diagnosis: "Stroke", discharge: "-", status: "In Treatment" },
  { no: "ADM2026004", patient: "Priya Verma", umr: "UMR2026004", doctor: "Dr. Rahul Joshi", ward: "Semi-Private", bed: "SP-08", date: "2026-08-02", diagnosis: "Severe Burns", discharge: "2026-08-06", status: "Discharged" },
  { no: "ADM2026005", patient: "Mohammed Ali", umr: "UMR2026005", doctor: "Dr. Sanjay Mehta", ward: "General", bed: "GW-30", date: "2026-08-01", diagnosis: "Pneumonia", discharge: "-", status: "Admitted" },
  { no: "ADM2026006", patient: "Lakshmi Iyer", umr: "UMR2026006", doctor: "Dr. Kavitha Nair", ward: "Maternity", bed: "MT-05", date: "2026-07-30", diagnosis: "Normal Delivery", discharge: "2026-08-02", status: "Discharged" },
]

function statusStyle(s: string) {
  switch (s) {
    case "Admitted": return { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" }
    case "In Treatment": return { bg: "#fef9c3", color: "#854d0e", border: "#fef08a" }
    case "Discharged": return { bg: "#e0e7ff", color: "#3730a3", border: "#c7d2fe" }
    case "Transferred": return { bg: "#ffe4e6", color: "#9f1239", border: "#fecdd3" }
    default: return { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" }
  }
}

export default function IPDAdmissionsPage() {
  const [search, setSearch] = useState("")

  const filtered = admissions.filter(
    (a) =>
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.no.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            IPD Admissions
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>
            View and manage all inpatient admissions
          </p>
        </div>
        <Link href="/ipd/new">
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: accent,
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(20,184,166,0.35)",
            }}
          >
            <Plus size={16} />
            New Admission
          </button>
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {statsData.map((s) => (
          <Card key={s.title} style={{ background: s.bg, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <CardContent style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a" }}>{s.value}</div>
                  <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{s.title}</div>
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "18px",
                  }}
                >
                  {s.value}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: 0 }}>Admissions List</h2>
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}
            />
            <input
              type="text"
              placeholder="Search admissions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px 12px 8px 36px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "13px",
                width: "240px",
                outline: "none",
              }}
            />
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Admission No", "Patient", "Doctor", "Ward/Bed", "Admission Date", "Diagnosis", "Discharge Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#475569",
                        borderBottom: "2px solid #e2e8f0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const st = statusStyle(a.status)
                return (
                  <tr
                    key={a.no}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdfa")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: accent }}>{a.no}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: 500, color: "#0f172a" }}>{a.patient}</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{a.umr}</div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#475569" }}>{a.doctor}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ fontWeight: 500, color: "#0f172a" }}>{a.ward}</div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>{a.bed}</div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#475569" }}>{a.date}</td>
                    <td style={{ padding: "12px 16px", color: "#475569", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {a.diagnosis}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#475569" }}>{a.discharge}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: 600,
                          background: st.bg,
                          color: st.color,
                          border: `1px solid ${st.border}`,
                        }}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
