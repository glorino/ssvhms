"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { usePatients } from "@/lib/patient-context"
import { ArrowLeft, Save, Edit } from "lucide-react"

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

export default function EditPatientPage() {
  const params = useParams()
  const router = useRouter()
  const { getPatientById, updatePatient } = usePatients()
  const patientId = params.id as string

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
    city: "",
    state: "",
    emergencyContact: "",
    emergencyPhone: "",
    insuranceProvider: "",
    insuranceNumber: "",
    allergies: "",
    medicalHistory: "",
  })
  const [success, setSuccess] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const patient = getPatientById(patientId)
    if (patient) {
      setFormData({
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup,
        address: patient.address,
        city: patient.city,
        state: patient.state,
        emergencyContact: patient.emergencyContact,
        emergencyPhone: patient.emergencyPhone,
        insuranceProvider: patient.insuranceProvider,
        insuranceNumber: patient.insuranceNumber,
        allergies: patient.allergies,
        medicalHistory: patient.medicalHistory,
      })
    } else {
      setNotFound(true)
    }
  }, [patientId, getPatientById])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updatePatient(patientId, formData)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      router.push(`/patients/${patientId}`)
    }, 2000)
  }

  if (notFound) {
    return (
      <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#0f172a", marginBottom: "8px" }}>Patient Not Found</h2>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>The patient you are looking for does not exist.</p>
          <Link href="/patients" style={{ color: accent, fontWeight: 600, textDecoration: "none" }}>Go back to patients</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href={`/patients/${patientId}`}>
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Edit Patient</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Update patient information</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Patient updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "1100px" }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
              <Edit size={18} style={{ color: accent }} />
              Personal Information
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Date of Birth *</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Blood Group</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
              Contact & Medical
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Emergency Contact</label>
                  <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Emergency Phone</label>
                  <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Insurance Provider</label>
                  <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Insurance Number</label>
                  <input type="text" name="insuranceNumber" value={formData.insuranceNumber} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Allergies</label>
                <textarea name="allergies" value={formData.allergies} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: "vertical" as const }} />
              </div>
              <div>
                <label style={labelStyle}>Medical History</label>
                <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} rows={2} style={{ ...inputStyle, resize: "vertical" as const }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "12px", maxWidth: "1100px" }}>
          <Link href={`/patients/${patientId}`} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: "10px", background: "#fff", color: "#475569", fontSize: "14px", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            Cancel
          </Link>
          <button type="submit" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px 24px", borderRadius: "10px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", boxShadow: `0 4px 14px ${accent}44` }}>
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
