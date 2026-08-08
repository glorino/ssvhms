"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Phone } from "lucide-react"

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

const departmentOptions = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "General Medicine",
  "Pediatrics",
  "Pharmacy",
  "Laboratory",
  "Radiology",
  "Administration",
]

export default function NewPhoneCallPage() {
  const [formData, setFormData] = useState({
    callerName: "",
    phone: "",
    department: "",
    subject: "",
    duration: "",
    handledBy: "",
    notes: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
    setFormData({ callerName: "", phone: "", department: "", subject: "", duration: "", handledBy: "", notes: "" })
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/front-office">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Phone Call</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Log a new phone call record</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Phone call logged successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
              <Phone size={18} style={{ color: accent }} />
              Call Details
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Caller Name *</label>
                <input type="text" name="callerName" value={formData.callerName} onChange={handleChange} placeholder="Enter caller name" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 xxx xxx xxxx" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Department *</label>
                <select name="department" value={formData.department} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select Department</option>
                  {departmentOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Duration (minutes)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g., 5" min="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Subject *</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Brief subject of the call" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Handled By *</label>
                <input type="text" name="handledBy" value={formData.handledBy} onChange={handleChange} placeholder="Staff member name" required style={inputStyle} />
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Call summary, action items, etc." rows={3} style={{ ...inputStyle, resize: "vertical" as const, minHeight: "80px" }} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
              Call Summary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Date</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{new Date().toLocaleDateString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Time</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Department</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.department || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Status</span>
                <span style={{ fontWeight: 600, color: "#059669", background: "#ecfdf5", padding: "2px 10px", borderRadius: "12px", fontSize: "12px" }}>Logged</span>
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "20px", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Log Call
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
