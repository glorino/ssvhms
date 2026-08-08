"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, UserPlus } from "lucide-react"

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
  "Dermatology",
  "General Medicine",
  "Pediatrics",
  "Pharmacy",
  "Laboratory",
  "Radiology",
  "Nursing",
  "Administration",
  "Finance",
  "HR",
]

const designationOptions = [
  "Doctor",
  "Nurse",
  "Lab Technician",
  "Pharmacist",
  "Receptionist",
  "Admin Officer",
  "Accountant",
  "Ward Assistant",
  "Ambulance Driver",
  "Security",
  "Cleaner",
]

const statusOptions = ["Active", "Inactive", "On Leave"]

export default function NewStaffPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    dateOfJoining: "",
    salary: "",
    status: "Active",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
    setFormData({ name: "", email: "", phone: "", department: "", designation: "", dateOfJoining: "", salary: "", status: "Active" })
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/hr/staff">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Staff</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Add a new staff member</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Staff member added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
              <UserPlus size={18} style={{ color: accent }} />
              Staff Information
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone *</label>
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
                <label style={labelStyle}>Designation *</label>
                <select name="designation" value={formData.designation} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select Designation</option>
                  {designationOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Date of Joining *</label>
                <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Salary (₦) *</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Monthly salary" min="0" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
              Summary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Name</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.name || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Department</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.department || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Designation</span>
                <span style={{ fontWeight: 600, color: accent }}>{formData.designation || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Salary</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.salary ? `₦${Number(formData.salary).toLocaleString()}` : "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Status</span>
                <span style={{ fontWeight: 600, color: "#059669", background: "#ecfdf5", padding: "2px 10px", borderRadius: "12px", fontSize: "12px" }}>{formData.status}</span>
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "20px", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Add Staff
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
