"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Droplet } from "lucide-react"

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

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const statusOptions = ["Eligible", "Deferred", "Collected"]

export default function NewBloodDonationPage() {
  const [formData, setFormData] = useState({
    donorName: "",
    phone: "",
    bloodGroup: "",
    units: "1",
    hemoglobin: "",
    bp: "",
    pulse: "",
    status: "Eligible",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Donation data:", formData)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
    setFormData({ donorName: "", phone: "", bloodGroup: "", units: "1", hemoglobin: "", bp: "", pulse: "", status: "Eligible" })
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/blood-bank">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Blood Donation</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Register a new blood donation</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Blood donation recorded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
                <Droplet size={18} style={{ color: accent }} />
                Donor Information
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Donor Name *</label>
                  <input type="text" name="donorName" value={formData.donorName} onChange={handleChange} placeholder="Enter donor full name" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 xxx xxx xxxx" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Blood Group *</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                    <option value="">Select Blood Group</option>
                    {bloodGroupOptions.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Units *</label>
                  <input type="number" name="units" value={formData.units} onChange={handleChange} min="1" max="4" required style={inputStyle} />
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
                Screening Details
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Hemoglobin (g/dL) *</label>
                  <input type="text" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} placeholder="e.g., 12.5" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Blood Pressure *</label>
                  <input type="text" name="bp" value={formData.bp} onChange={handleChange} placeholder="e.g., 120/80" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Pulse (bpm) *</label>
                  <input type="text" name="pulse" value={formData.pulse} onChange={handleChange} placeholder="e.g., 72" required style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: "16px" }}>
                <label style={labelStyle}>Donation Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer", maxWidth: "300px" }}>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
              Donation Summary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Date</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{new Date().toLocaleDateString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Blood Group</span>
                <span style={{ fontWeight: 600, color: accent }}>{formData.bloodGroup || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Units</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.units}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Status</span>
                <span style={{ fontWeight: 600, color: "#059669", background: "#ecfdf5", padding: "2px 10px", borderRadius: "12px", fontSize: "12px" }}>{formData.status}</span>
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "20px", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Record Donation
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
