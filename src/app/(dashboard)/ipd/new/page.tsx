"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const accent = "#14b8a6"
const accentDark = "#0d9488"

const wardOptions = ["ICU", "General", "Private", "Semi-Private", "Emergency", "Maternity"]

const patientOptions = [
  { value: "", label: "Select Patient" },
  { value: "p1", label: "Rajesh Kumar (UMR2026001)" },
  { value: "p2", label: "Anita Patel (UMR2026002)" },
  { value: "p3", label: "Suresh Reddy (UMR2026003)" },
  { value: "p4", label: "Priya Verma (UMR2026004)" },
  { value: "p5", label: "Mohammed Ali (UMR2026005)" },
  { value: "p6", label: "Lakshmi Iyer (UMR2026006)" },
]

const doctorOptions = [
  { value: "", label: "Select Doctor" },
  { value: "d1", label: "Dr. Priya Sharma - Cardiology" },
  { value: "d2", label: "Dr. Amit Singh - Orthopedics" },
  { value: "d3", label: "Dr. Neha Gupta - Neurology" },
  { value: "d4", label: "Dr. Rahul Joshi - Dermatology" },
  { value: "d5", label: "Dr. Sanjay Mehta - General Medicine" },
  { value: "d6", label: "Dr. Kavitha Nair - Obstetrics" },
]

const bedOptions = [
  { value: "", label: "Select Bed" },
  { value: "ICU-01", label: "ICU-01" },
  { value: "ICU-02", label: "ICU-02" },
  { value: "ICU-03", label: "ICU-03" },
  { value: "GW-01", label: "General Ward - 01" },
  { value: "GW-02", label: "General Ward - 02" },
  { value: "PW-01", label: "Private - 01" },
  { value: "PW-02", label: "Private - 02" },
  { value: "SP-01", label: "Semi-Private - 01" },
  { value: "MT-01", label: "Maternity - 01" },
  { value: "EM-01", label: "Emergency - 01" },
]

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "6px",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#0f172a",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "36px",
}

export default function NewIPDAdmissionPage() {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    ward: "",
    bed: "",
    diagnosis: "",
    doctorNotes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Admission data:", formData)
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/ipd">
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#475569",
            }}
          >
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            New IPD Admission
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>
            Fill in the details to admit a new patient
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Card style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <CardContent style={{ padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
                  Patient & Doctor Information
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Patient *</label>
                    <select name="patient" value={formData.patient} onChange={handleChange} style={selectStyle} required>
                      {patientOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Doctor *</label>
                    <select name="doctor" value={formData.doctor} onChange={handleChange} style={selectStyle} required>
                      {doctorOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <CardContent style={{ padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
                  Ward & Bed Assignment
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Ward *</label>
                    <select name="ward" value={formData.ward} onChange={handleChange} style={selectStyle} required>
                      <option value="">Select Ward</option>
                      {wardOptions.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Bed *</label>
                    <select name="bed" value={formData.bed} onChange={handleChange} style={selectStyle} required>
                      {bedOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <CardContent style={{ padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
                  Clinical Information
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={labelStyle}>Diagnosis *</label>
                    <textarea
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      placeholder="Enter primary diagnosis..."
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Doctor Notes</label>
                    <textarea
                      name="doctorNotes"
                      value={formData.doctorNotes}
                      onChange={handleChange}
                      placeholder="Enter additional notes or instructions..."
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Card style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <CardContent style={{ padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
                  Admission Summary
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Date</span>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>{new Date().toLocaleDateString("en-IN")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Time</span>
                    <span style={{ fontWeight: 600, color: "#0f172a" }}>{new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Admission No.</span>
                    <span style={{ fontWeight: 600, color: accent }}>ADM2026007</span>
                  </div>
                  <div style={{ height: "1px", background: "#f1f5f9", margin: "4px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Status</span>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600,
                        background: "#dcfce7",
                        color: "#166534",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      Pending
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <CardContent style={{ padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
                  Admission Guidelines
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    "Ensure patient identity is verified",
                    "Confirm ward and bed availability",
                    "Record initial vital signs",
                    "Attach relevant OPD records",
                    "Inform nursing station",
                  ].map((tip, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#475569", lineHeight: "1.5" }}>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: accent,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      >
                        {i + 1}
                      </div>
                      {tip}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <button
              type="submit"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "14px 20px",
                background: accent,
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(20,184,166,0.35)",
              }}
            >
              <Save size={18} />
              Submit Admission
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
