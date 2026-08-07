"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const ACCENT = "#14b8a6"

const patientOptions = [
  { value: "", label: "Select patient" },
  { value: "rajesh-kumar", label: "Rajesh Kumar (UMR2026001)" },
  { value: "anita-patel", label: "Anita Patel (UMR2026002)" },
  { value: "suresh-reddy", label: "Suresh Reddy (UMR2026003)" },
  { value: "priya-verma", label: "Priya Verma (UMR2026004)" },
  { value: "mohammed-ali", label: "Mohammed Ali (UMR2026005)" },
  { value: "deepika-singh", label: "Deepika Singh (UMR2026006)" },
]

const doctorOptions = [
  { value: "", label: "Select doctor" },
  { value: "dr-priya-sharma", label: "Dr. Priya Sharma - Cardiology" },
  { value: "dr-amit-singh", label: "Dr. Amit Singh - Orthopedics" },
  { value: "dr-neha-gupta", label: "Dr. Neha Gupta - Neurology" },
  { value: "dr-rahul-joshi", label: "Dr. Rahul Joshi - Dermatology" },
  { value: "dr-sanjay-mehta", label: "Dr. Sanjay Mehta - General Medicine" },
  { value: "dr-anita-kulkarni", label: "Dr. Anita Kulkarni - Pediatrics" },
]

const departmentOptions = [
  { value: "", label: "Select department" },
  { value: "cardiology", label: "Cardiology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "neurology", label: "Neurology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "general-medicine", label: "General Medicine" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "ent", label: "ENT" },
  { value: "ophthalmology", label: "Ophthalmology" },
]

export default function NewOPDVisitPage() {
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    department: "",
    symptoms: "",
    diagnosis: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("OPD Visit data:", formData)
  }

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: 500,
    color: "#334155",
    marginBottom: "6px",
    display: "block",
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "13px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    outline: "none",
    color: "#1e293b",
    background: "#fff",
    transition: "border-color 0.2s, box-shadow 0.2s",
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical" as const,
    lineHeight: 1.5,
  }

  return (
    <div style={{ padding: "24px", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/opd"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              color: "#64748b",
              textDecoration: "none",
              transition: "all 0.15s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
              New OPD Visit
            </h1>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>
              Record a new outpatient department visit
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            href="/opd"
            style={{
              padding: "9px 18px",
              fontSize: "13px",
              fontWeight: 500,
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              color: "#475569",
              textDecoration: "none",
              background: "#fff",
              transition: "all 0.15s",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            style={{
              padding: "9px 22px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              background: `linear-gradient(135deg, ${ACCENT}, #0d9488)`,
              boxShadow: "0 2px 8px rgba(20,184,166,0.35)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Save Visit
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          {/* Main Form Card */}
          <Card style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderRadius: "12px" }}>
            <CardContent style={{ padding: "28px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: "0 0 24px" }}>
                Visit Details
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                <div>
                  <label style={labelStyle}>Patient *</label>
                  <select
                    value={formData.patient}
                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    required
                    style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}
                  >
                    {patientOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Doctor *</label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    required
                    style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}
                  >
                    {doctorOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                    style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}
                  >
                    {departmentOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Symptoms *</label>
                <textarea
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  placeholder="Describe the patient's symptoms..."
                  required
                  style={textareaStyle}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Diagnosis *</label>
                <textarea
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  placeholder="Enter preliminary diagnosis..."
                  required
                  style={textareaStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Clinical Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes, observations, or instructions..."
                  style={{ ...textareaStyle, minHeight: "120px" }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Card */}
          <Card style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderRadius: "12px" }}>
            <CardContent style={{ padding: "28px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: "0 0 20px" }}>
                Visit Summary
              </h2>

              <div style={{ background: "rgba(20,184,166,0.06)", borderRadius: "10px", padding: "16px", marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>Visit Number</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: ACCENT }}>Auto-generated</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Date</span>
                  <span style={{ fontWeight: 500, color: "#1e293b" }}>{new Date().toLocaleDateString("en-IN")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Time</span>
                  <span style={{ fontWeight: 500, color: "#1e293b" }}>{new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#64748b" }}>Status</span>
                  <span
                    style={{
                      fontWeight: 500,
                      color: "#10b981",
                      background: "rgba(16,185,129,0.1)",
                      padding: "2px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  >
                    Scheduled
                  </span>
                </div>
              </div>

              <div style={{ marginTop: "24px", padding: "16px", background: "#f8fafc", borderRadius: "10px", border: "1px dashed #e2e8f0" }}>
                <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Required Fields</div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>Patient, Doctor, Department, Symptoms, Diagnosis</div>
                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "8px", marginBottom: "4px" }}>Optional Fields</div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>Clinical Notes</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
