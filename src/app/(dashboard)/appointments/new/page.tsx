"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePatients } from "@/lib/patient-context"
import { ArrowLeft, Save, Calendar } from "lucide-react"

const accent = "#14b8a6"
const accentDark = "#0d9488"
const accentLight = "#ccfbf1"

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
  "Dr. Kavitha Nair - Obstetrics",
]

const departmentOptions = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Dermatology",
  "General Medicine",
  "Pediatrics",
  "ENT",
  "Ophthalmology",
  "Obstetrics",
]

export default function NewAppointmentPage() {
  const { patients } = usePatients()
  const [formData, setFormData] = useState({
    patientId: "",
    doctor: "",
    department: "",
    date: "",
    time: "",
    reason: "",
    priority: "Medium",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Appointment data:", formData)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/appointments">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Appointment</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Schedule a new patient appointment</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Appointment scheduled successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
                Appointment Details
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
                  <label style={labelStyle}>Doctor *</label>
                  <select name="doctor" value={formData.doctor} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                    <option value="">Select Doctor</option>
                    {doctorOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
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
                  <label style={labelStyle}>Priority *</label>
                  <select name="priority" value={formData.priority} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Time *</label>
                  <input type="time" name="time" value={formData.time} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: "16px" }}>
                <label style={labelStyle}>Reason for Visit *</label>
                <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Describe the reason for the appointment..." rows={3} required style={{ ...inputStyle, resize: "vertical" as const, minHeight: "80px" }} />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
                Summary
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Date</span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.date || new Date().toLocaleDateString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Time</span>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.time || "--:--"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Priority</span>
                  <span style={{ fontWeight: 600, color: accent }}>{formData.priority}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Status</span>
                  <span style={{ fontWeight: 600, color: "#059669", background: "#ecfdf5", padding: "2px 10px", borderRadius: "12px", fontSize: "12px" }}>Scheduled</span>
                </div>
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Schedule Appointment
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
