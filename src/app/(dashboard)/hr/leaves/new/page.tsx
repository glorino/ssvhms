"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Calendar } from "lucide-react"

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

const leaveTypeOptions = ["Sick Leave", "Casual Leave", "Annual Leave", "Maternity Leave", "Paternity Leave", "Unpaid Leave"]
const staffOptions = [
  "Dr. Adebayo Okafor",
  "Nurse Fatima Bello",
  "Dr. Chukwuma Eze",
  "Grace Nwankwo",
  "Ibrahim Musa",
  "Dr. Kemi Adeyemi",
]

export default function NewLeaveRequestPage() {
  const [formData, setFormData] = useState({
    staffName: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Leave request:", formData)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
    setFormData({ staffName: "", leaveType: "", fromDate: "", toDate: "", reason: "" })
  }

  const daysCount = formData.fromDate && formData.toDate
    ? Math.ceil((new Date(formData.toDate).getTime() - new Date(formData.fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/hr/leaves">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Leave Request</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Submit a new leave request</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Leave request submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={18} style={{ color: accent }} />
              Leave Details
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Staff Name *</label>
                <select name="staffName" value={formData.staffName} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select Staff</option>
                  {staffOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Leave Type *</label>
                <select name="leaveType" value={formData.leaveType} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select Leave Type</option>
                  {leaveTypeOptions.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>From Date *</label>
                <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>To Date *</label>
                <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required style={inputStyle} />
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <label style={labelStyle}>Reason *</label>
              <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Provide reason for leave request..." rows={4} required style={{ ...inputStyle, resize: "vertical" as const, minHeight: "100px" }} />
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
              Request Summary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Staff</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.staffName || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Leave Type</span>
                <span style={{ fontWeight: 600, color: accent }}>{formData.leaveType || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>From</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.fromDate || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>To</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.toDate || "-"}</span>
              </div>
              {daysCount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Total Days</span>
                  <span style={{ fontWeight: 600, color: accent, fontSize: "16px" }}>{daysCount}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Status</span>
                <span style={{ fontWeight: 600, color: "#d97706", background: "#fef3c7", padding: "2px 10px", borderRadius: "12px", fontSize: "12px" }}>Pending</span>
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "20px", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
