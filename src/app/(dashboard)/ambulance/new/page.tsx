"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Truck } from "lucide-react"

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

export default function NewAmbulanceVehiclePage() {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    type: "Basic",
    driverName: "",
    driverPhone: "",
    status: "Available",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
    setFormData({ vehicleNumber: "", type: "Basic", driverName: "", driverPhone: "", status: "Available" })
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/ambulance">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Ambulance Vehicle</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Register a new ambulance vehicle</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Vehicle registered successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "900px" }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
              <Truck size={18} style={{ color: accent }} />
              Vehicle Information
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Vehicle Number *</label>
                <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="e.g., MH-01-AB-1234" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Vehicle Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="Basic">Basic Life Support (BLS)</option>
                  <option value="Advanced">Advanced Life Support (ALS)</option>
                  <option value="ICU">ICU Ambulance</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="Available">Available</option>
                  <option value="On Call">On Call</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
              Driver Information
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Driver Name *</label>
                <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} placeholder="Enter driver name" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Driver Phone *</label>
                <input type="tel" name="driverPhone" value={formData.driverPhone} onChange={handleChange} placeholder="+234 xxx xxx xxxx" required style={inputStyle} />
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "24px", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Register Vehicle
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
