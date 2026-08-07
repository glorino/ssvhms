"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePatients } from "@/lib/patient-context"
import { ArrowLeft, Save, FlaskConical } from "lucide-react"

const accent = "#14b8a6"
const accentDark = "#0d9488"

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "6px",
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

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  padding: "28px",
}

const doctorOptions = [
  "Dr. Priya Sharma - Cardiology",
  "Dr. Amit Singh - Orthopedics",
  "Dr. Neha Gupta - Neurology",
  "Dr. Rahul Joshi - Dermatology",
  "Dr. Sanjay Mehta - General Medicine",
  "Dr. Anita Kulkarni - Pediatrics",
]

const categoryOptions = ["Hematology", "Biochemistry", "Endocrinology", "Clinical Pathology"]

export default function NewLabTestPage() {
  const { patients, addLabResult } = usePatients()
  const [formData, setFormData] = useState({
    patientId: "",
    doctor: "",
    testName: "",
    category: "",
    notes: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.patientId) {
      addLabResult(formData.patientId, {
        testName: formData.testName,
        category: formData.category,
        result: "",
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
        orderedBy: formData.doctor,
        notes: formData.notes,
      })
    }
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
    setFormData({ patientId: "", doctor: "", testName: "", category: "", notes: "" })
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/pathology">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Lab Test</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Order a new pathology test</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Lab test ordered successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
              <FlaskConical size={18} style={{ color: accent }} />
              Test Information
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Patient *</label>
                <select name="patientId" value={formData.patientId} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.uniqueNumber})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Ordered By (Doctor) *</label>
                <select name="doctor" value={formData.doctor} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select Doctor</option>
                  {doctorOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Test Name *</label>
                <input type="text" name="testName" value={formData.testName} onChange={handleChange} placeholder="e.g., Complete Blood Count" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select Category</option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional instructions or notes..." rows={3} style={{ ...inputStyle, resize: "vertical" as const, minHeight: "80px" }} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
              Test Summary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Date</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{new Date().toLocaleDateString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Status</span>
                <span style={{ fontWeight: 600, color: "#d97706", background: "#fef3c7", padding: "2px 10px", borderRadius: "12px", fontSize: "12px" }}>Pending</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Test</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.testName || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Category</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.category || "-"}</span>
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "20px", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Order Test
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
