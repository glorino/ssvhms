"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePatients, Patient } from "@/lib/patient-context"
import { z } from "zod"
import { patientSchema, vitalsSchema } from "@/lib/validations"
import {
  Search,
  ArrowLeft,
  UserPlus,
  Save,
  Activity,
  Stethoscope,
  FileText,
  CreditCard,
  Pill,
  Thermometer,
  Heart,
  Weight,
  Ruler,
  Wind,
  User,
  Phone as PhoneIcon,
  Mail,
  MapPin,
  Droplets,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react"

const accent = "#14b8a6"
const accentDark = "#0d9488"
const accentLight = "#ccfbf1"
const accentBg = "#f0fdfa"

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1.5px solid #e2e8f0",
  fontSize: "14px",
  color: "#1e293b",
  background: "#fff",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box" as const,
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#475569",
  marginBottom: "6px",
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  overflow: "hidden",
}

const btnPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "10px 24px",
  borderRadius: "10px",
  background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
  color: "#fff",
  fontSize: "14px",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  boxShadow: `0 4px 14px ${accent}44`,
  transition: "all 0.2s",
}

const btnOutline: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "10px 20px",
  borderRadius: "10px",
  background: "#fff",
  color: "#475569",
  fontSize: "14px",
  fontWeight: 500,
  border: "1.5px solid #e2e8f0",
  cursor: "pointer",
  transition: "all 0.2s",
}

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: 600,
  background: bg,
  color: color,
})

const tabBtnStyle = (active: boolean): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "10px 18px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: active ? 600 : 500,
  background: active ? accentLight : "transparent",
  color: active ? accentDark : "#64748b",
  border: active ? `1.5px solid ${accent}` : "1.5px solid transparent",
  cursor: "pointer",
  transition: "all 0.2s",
  whiteSpace: "nowrap" as const,
})

function calculateAge(dob: string): string {
  if (!dob) return ""
  const birth = new Date(dob)
  const today = new Date()
  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  if (months < 0) { years--; months += 12 }
  if (years > 0) return `${years}y ${months}m`
  return `${months}m`
}

export default function NewPatientPage() {
  const {
    searchPatients,
    addPatient,
    updateVitals,
    patients,
  } = usePatients()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [activeTab, setActiveTab] = useState<"vitals" | "visits" | "lab" | "bills" | "prescriptions">("vitals")
  const [registeredPatient, setRegisteredPatient] = useState<Patient | null>(null)
  const [successMessage, setSuccessMessage] = useState("")

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
    emergencyContactName: "",
    emergencyPhone: "",
    insuranceProvider: "",
    insuranceNumber: "",
    allergies: "",
    medicalHistory: "",
  })

  const [vitalsData, setVitalsData] = useState({
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    weight: "",
    height: "",
    oxygenSaturation: "",
    recordedBy: "",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [vitalsErrors, setVitalsErrors] = useState<Record<string, string>>({})

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    if (value.trim().length >= 2) {
      const results = searchPatients(value)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setShowRegistration(false)
    setSearchResults([])
    setSearchQuery(patient.uniqueNumber)
    setActiveTab("vitals")
  }

  const handleNewPatient = () => {
    setShowRegistration(true)
    setSelectedPatient(null)
    setRegisteredPatient(null)
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    const result = patientSchema.safeParse({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      emergencyContact: formData.emergencyContactName,
      emergencyPhone: formData.emergencyPhone,
      insuranceProvider: formData.insuranceProvider || undefined,
      insuranceNumber: formData.insuranceNumber || undefined,
      allergies: formData.allergies || undefined,
      medicalHistory: formData.medicalHistory || undefined,
    })
    if (!result.success) {
      const flat = z.flattenError(result.error)
      const errors: Record<string, string> = {}
      if (flat.formErrors.length > 0) errors._form = flat.formErrors.join(", ")
      Object.entries(flat.fieldErrors).forEach(([k, v]) => { errors[k] = (v as string[]).join(", ") })
      setFormErrors(errors)
      return
    }
    const newPatient = addPatient({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      emergencyContact: formData.emergencyContactName,
      emergencyPhone: formData.emergencyPhone,
      insuranceProvider: formData.insuranceProvider,
      insuranceNumber: formData.insuranceNumber,
      allergies: formData.allergies,
      medicalHistory: formData.medicalHistory,
      registeredBy: "Receptionist",
      registeredAt: new Date().toISOString().split("T")[0],
      status: "Active",
      vitals: {},
    })
    setRegisteredPatient(newPatient)
    setSuccessMessage(`Patient registered successfully! Unique Number: ${newPatient.uniqueNumber}`)
    setShowRegistration(false)
    setTimeout(() => setSuccessMessage(""), 8000)
  }

  const handleVitalsChange = (field: string, value: string) => {
    setVitalsData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveVitals = () => {
    const patient = selectedPatient || registeredPatient
    if (!patient) return
    setVitalsErrors({})
    const result = vitalsSchema.safeParse(vitalsData)
    if (!result.success) {
      const flat = z.flattenError(result.error)
      const errors: Record<string, string> = {}
      Object.entries(flat.fieldErrors).forEach(([k, v]) => { errors[k] = (v as string[]).join(", ") })
      setVitalsErrors(errors)
      return
    }
    updateVitals(patient.id, {
      temperature: vitalsData.temperature ? `${vitalsData.temperature}°C` : undefined,
      bloodPressure: vitalsData.bloodPressure ? `${vitalsData.bloodPressure} mmHg` : undefined,
      heartRate: vitalsData.heartRate ? `${vitalsData.heartRate} bpm` : undefined,
      weight: vitalsData.weight ? `${vitalsData.weight} kg` : undefined,
      height: vitalsData.height ? `${vitalsData.height} cm` : undefined,
      oxygenSaturation: vitalsData.oxygenSaturation ? `${vitalsData.oxygenSaturation}%` : undefined,
      recordedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      recordedBy: vitalsData.recordedBy,
    })
    setSuccessMessage("Vitals saved successfully!")
    setVitalsData({ temperature: "", bloodPressure: "", heartRate: "", weight: "", height: "", oxygenSaturation: "", recordedBy: "" })
    const updated = patients.find((p) => p.id === patient.id)
    if (updated) setSelectedPatient(updated)
    setTimeout(() => setSuccessMessage(""), 5000)
  }

  const currentPatient = selectedPatient || registeredPatient

  const FormError = ({ field }: { field: string }) => {
    const msg = formErrors[field]
    if (!msg) return null
    return <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{msg}</p>
  }

  const VitalsError = ({ field }: { field: string }) => {
    const msg = vitalsErrors[field]
    if (!msg) return null
    return <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{msg}</p>
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/patients" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: "#f1f5f9", color: "#475569", textDecoration: "none", transition: "all 0.2s" }}>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: 0 }}>Patient Registration</h1>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Search existing patients or register new ones</p>
          </div>
        </div>
        <button onClick={handleNewPatient} style={btnPrimary}>
          <UserPlus size={18} />
          New Patient
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 20px",
          borderRadius: 12,
          background: "#ecfdf5",
          border: "1.5px solid #a7f3d0",
          color: "#065f46",
          marginBottom: 20,
          fontSize: 14,
          fontWeight: 500,
        }}>
          <CheckCircle2 size={20} style={{ color: "#10b981", flexShrink: 0 }} />
          {successMessage}
        </div>
      )}

      {/* Search Bar */}
      <div style={{ ...cardStyle, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ position: "relative" }}>
          <Search size={20} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, phone, or patient number..."
            style={{
              ...inputStyle,
              paddingLeft: 48,
              fontSize: 16,
              padding: "14px 14px 14px 48px",
              borderRadius: 12,
              border: `2px solid ${accent}33`,
            }}
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 10, fontWeight: 500 }}>
              {searchResults.length} patient{searchResults.length !== 1 ? "s" : ""} found
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {searchResults.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: 12,
                    border: "1.5px solid #e2e8f0",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background: "#fff",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = accentBg }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontSize: 16,
                    }}>
                      {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#0f172a", fontSize: 15 }}>
                        {patient.firstName} {patient.lastName}
                      </div>
                      <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                        <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
                          <PhoneIcon size={12} /> {patient.phone}
                        </span>
                        <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
                          <Droplets size={12} /> {patient.bloodGroup || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    padding: "6px 14px", borderRadius: 8,
                    background: accentLight, color: accentDark,
                    fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                  }}>
                    {patient.uniqueNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchQuery.trim().length >= 2 && searchResults.length === 0 && (
          <div style={{ marginTop: 16, textAlign: "center", padding: "20px 0" }}>
            <p style={{ fontSize: 14, color: "#94a3b8" }}>No patients found matching your search.</p>
            <button onClick={handleNewPatient} style={{ ...btnPrimary, marginTop: 12 }}>
              <UserPlus size={16} />
              Register as New Patient
            </button>
          </div>
        )}
      </div>

      {/* Patient Found - Profile Card & Tabs */}
      {currentPatient && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Patient Profile Card */}
          <div style={cardStyle}>
            <div style={{
              background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
              padding: "24px 28px",
              color: "#fff",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 24, fontWeight: 700, border: "3px solid rgba(255,255,255,0.4)",
                  }}>
                    {currentPatient.firstName[0]}{currentPatient.lastName[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>
                      {currentPatient.firstName} {currentPatient.lastName}
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 6, opacity: 0.9, fontSize: 14 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <PhoneIcon size={14} /> {currentPatient.phone}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <Mail size={14} /> {currentPatient.email || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: "12px 24px", borderRadius: 12,
                  background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, opacity: 0.8, marginBottom: 4 }}>Patient ID</div>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>
                    {currentPatient.uniqueNumber}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "20px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f0fdfa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <User size={18} style={{ color: accent }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Gender</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{currentPatient.gender || "N/A"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Calendar size={18} style={{ color: "#d97706" }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Age</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{calculateAge(currentPatient.dateOfBirth) || "N/A"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Droplets size={18} style={{ color: "#dc2626" }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Blood Group</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{currentPatient.bloodGroup || "N/A"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MapPin size={18} style={{ color: "#7c3aed" }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Location</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{currentPatient.city || "N/A"}, {currentPatient.state || ""}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={18} style={{ color: "#2563eb" }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Insurance</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{currentPatient.insuranceProvider || "N/A"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fce7f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <PhoneIcon size={18} style={{ color: "#db2777" }} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>Emergency Contact</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{currentPatient.emergencyContact || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button onClick={() => setActiveTab("vitals")} style={tabBtnStyle(activeTab === "vitals")}><Activity size={15} /> Vitals</button>
            <button onClick={() => setActiveTab("visits")} style={tabBtnStyle(activeTab === "visits")}><Stethoscope size={15} /> Visits</button>
            <button onClick={() => setActiveTab("lab")} style={tabBtnStyle(activeTab === "lab")}><FileText size={15} /> Lab Results</button>
            <button onClick={() => setActiveTab("bills")} style={tabBtnStyle(activeTab === "bills")}><CreditCard size={15} /> Bills</button>
            <button onClick={() => setActiveTab("prescriptions")} style={tabBtnStyle(activeTab === "prescriptions")}><Pill size={15} /> Prescriptions</button>
          </div>

          {/* Tab Content */}
          <div style={cardStyle}>
            {/* Vitals Tab */}
            {activeTab === "vitals" && (
              <div style={{ padding: 28 }}>
                {/* Current Vitals Display */}
                {currentPatient.vitals && currentPatient.vitals.temperature && (
                  <div style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      <Activity size={18} style={{ color: accent }} />
                      Latest Recorded Vitals
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                      {[
                        { label: "Temperature", value: currentPatient.vitals.temperature, icon: <Thermometer size={16} />, color: "#ef4444" },
                        { label: "Blood Pressure", value: currentPatient.vitals.bloodPressure, icon: <Heart size={16} />, color: "#ec4899" },
                        { label: "Heart Rate", value: currentPatient.vitals.heartRate, icon: <Heart size={16} />, color: "#f43f5e" },
                        { label: "Weight", value: currentPatient.vitals.weight, icon: <Weight size={16} />, color: "#8b5cf6" },
                        { label: "Height", value: currentPatient.vitals.height, icon: <Ruler size={16} />, color: "#3b82f6" },
                        { label: "O₂ Saturation", value: currentPatient.vitals.oxygenSaturation, icon: <Wind size={16} />, color: accent },
                      ].map((item) => (
                        <div key={item.label} style={{
                          padding: "14px 16px", borderRadius: 12,
                          border: "1.5px solid #f1f5f9", background: "#fafafa",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, color: "#94a3b8" }}>
                            {item.icon}
                            <span style={{ fontSize: 12, fontWeight: 500 }}>{item.label}</span>
                          </div>
                          <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                    {currentPatient.vitals.recordedBy && (
                      <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 10 }}>
                        Recorded by {currentPatient.vitals.recordedBy} on {currentPatient.vitals.recordedAt}
                      </p>
                    )}
                  </div>
                )}

                {/* Record New Vitals Form */}
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <Stethoscope size={18} style={{ color: accent }} />
                    Record New Vitals
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                    {[
                      { label: "Temperature (°C)", field: "temperature", placeholder: "e.g., 36.8" },
                      { label: "Blood Pressure (mmHg)", field: "bloodPressure", placeholder: "e.g., 120/80" },
                      { label: "Heart Rate (bpm)", field: "heartRate", placeholder: "e.g., 72" },
                      { label: "Weight (kg)", field: "weight", placeholder: "e.g., 70" },
                      { label: "Height (cm)", field: "height", placeholder: "e.g., 170" },
                      { label: "Oxygen Saturation (%)", field: "oxygenSaturation", placeholder: "e.g., 98" },
                    ].map((item) => (
                      <div key={item.field}>
                        <label style={labelStyle}>{item.label}</label>
                        <input
                          type="text"
                          value={(vitalsData as any)[item.field]}
                          onChange={(e) => handleVitalsChange(item.field, e.target.value)}
                          placeholder={item.placeholder}
                          style={inputStyle}
                        />
                        <VitalsError field={item.field} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <label style={labelStyle}>Record By (Nurse/Staff Name)</label>
                    <input
                      type="text"
                      value={vitalsData.recordedBy}
                      onChange={(e) => handleVitalsChange("recordedBy", e.target.value)}
                      placeholder="Enter nurse or staff name"
                      style={{ ...inputStyle, maxWidth: 400 }}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <button onClick={handleSaveVitals} style={btnPrimary}>
                      <Save size={16} />
                      Save Vitals
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Visits Tab */}
            {activeTab === "visits" && (
              <div style={{ padding: 28 }}>
                {currentPatient.visits && currentPatient.visits.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {currentPatient.visits.map((visit) => (
                      <div key={visit.id} style={{
                        padding: "18px 20px", borderRadius: 12,
                        border: "1.5px solid #f1f5f9", background: "#fafafa",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                          <div>
                            <div style={{ fontWeight: 600, color: "#0f172a" }}>{visit.doctor}</div>
                            <div style={{ fontSize: 13, color: "#64748b" }}>{visit.department}</div>
                          </div>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <span style={badgeStyle(visit.type === "Emergency" ? "#fee2e2" : visit.type === "IPD" ? "#dbeafe" : "#ecfdf5", visit.type === "Emergency" ? "#dc2626" : visit.type === "IPD" ? "#2563eb" : accent)}>{visit.type}</span>
                            <span style={badgeStyle(visit.status === "Completed" ? "#ecfdf5" : visit.status === "In Progress" ? "#fef3c7" : "#f1f5f9", visit.status === "Completed" ? "#059669" : visit.status === "In Progress" ? "#d97706" : "#64748b")}>{visit.status}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>
                          <strong>Symptoms:</strong> {visit.symptoms}
                        </div>
                        <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>
                          <strong>Diagnosis:</strong> {visit.diagnosis}
                        </div>
                        <div style={{ fontSize: 13, color: "#475569" }}>
                          <strong>Prescription:</strong> {visit.prescription}
                        </div>
                        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>{visit.date}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
                    <Stethoscope size={40} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                    <p>No visits recorded yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Lab Results Tab */}
            {activeTab === "lab" && (
              <div style={{ padding: 28 }}>
                {currentPatient.labResults && currentPatient.labResults.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {currentPatient.labResults.map((result) => (
                      <div key={result.id} style={{
                        padding: "18px 20px", borderRadius: 12,
                        border: "1.5px solid #f1f5f9", background: "#fafafa",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}>
                        <div>
                          <div style={{ fontWeight: 600, color: "#0f172a" }}>{result.testName}</div>
                          <div style={{ fontSize: 13, color: "#64748b" }}>{result.category} — Ordered by {result.orderedBy}</div>
                          <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>{result.result}</div>
                          {result.notes && <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{result.notes}</div>}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                          <span style={badgeStyle(result.status === "Completed" ? "#ecfdf5" : result.status === "In Progress" ? "#fef3c7" : "#f1f5f9", result.status === "Completed" ? "#059669" : result.status === "In Progress" ? "#d97706" : "#64748b")}>{result.status}</span>
                          <span style={{ fontSize: 12, color: "#94a3b8" }}>{result.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
                    <FileText size={40} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                    <p>No lab results yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Bills Tab */}
            {activeTab === "bills" && (
              <div style={{ padding: 28 }}>
                {currentPatient.bills && currentPatient.bills.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {currentPatient.bills.map((bill) => (
                      <div key={bill.id} style={{
                        padding: "18px 20px", borderRadius: 12,
                        border: "1.5px solid #f1f5f9", background: "#fafafa",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}>
                        <div>
                          <div style={{ fontWeight: 600, color: "#0f172a" }}>{bill.items}</div>
                          <div style={{ fontSize: 13, color: "#64748b" }}>{bill.date}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 12, color: "#94a3b8" }}>Total</div>
                            <div style={{ fontWeight: 700, color: "#0f172a", fontSize: 16 }}>₦{bill.amount.toLocaleString()}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 12, color: "#94a3b8" }}>Paid</div>
                            <div style={{ fontWeight: 600, color: "#059669" }}>₦{bill.paid.toLocaleString()}</div>
                          </div>
                          {bill.due > 0 && (
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 12, color: "#94a3b8" }}>Due</div>
                              <div style={{ fontWeight: 600, color: "#dc2626" }}>₦{bill.due.toLocaleString()}</div>
                            </div>
                          )}
                          <span style={badgeStyle(bill.status === "Paid" ? "#ecfdf5" : bill.status === "Partial" ? "#fef3c7" : "#fee2e2", bill.status === "Paid" ? "#059669" : bill.status === "Partial" ? "#d97706" : "#dc2626")}>{bill.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
                    <CreditCard size={40} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                    <p>No bills yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === "prescriptions" && (
              <div style={{ padding: 28 }}>
                {currentPatient.prescriptions && currentPatient.prescriptions.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {currentPatient.prescriptions.map((prescription, index) => (
                      <div key={index} style={{
                        padding: "14px 18px", borderRadius: 12,
                        border: "1.5px solid #f1f5f9", background: "#fafafa",
                        display: "flex", alignItems: "center", gap: 12,
                      }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: accentLight, color: accentDark,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 700, fontSize: 13, flexShrink: 0,
                        }}>
                          {index + 1}
                        </div>
                        <span style={{ fontSize: 14, color: "#1e293b" }}>{prescription}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>
                    <Pill size={40} style={{ margin: "0 auto 12px", opacity: 0.4 }} />
                    <p>No prescriptions yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Patient Registration Form */}
      {showRegistration && (
        <div style={cardStyle}>
          <div style={{ padding: "20px 28px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: accentLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserPlus size={20} style={{ color: accent }} />
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: 0 }}>Register New Patient</h2>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Fill in the details below to register a new patient</p>
              </div>
            </div>
            <button onClick={() => setShowRegistration(false)} style={{ ...btnOutline, padding: "8px 12px" }}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleRegisterPatient} style={{ padding: 28 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
              {/* Left Column - Personal Info */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: accent, textTransform: "uppercase", letterSpacing: 1, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <User size={16} />
                  Personal Information
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>First Name *</label>
                      <input required type="text" value={formData.firstName} onChange={(e) => handleFormChange("firstName", e.target.value)} placeholder="First name" style={inputStyle} />
                      <FormError field="firstName" />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name *</label>
                      <input required type="text" value={formData.lastName} onChange={(e) => handleFormChange("lastName", e.target.value)} placeholder="Last name" style={inputStyle} />
                      <FormError field="lastName" />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input type="email" value={formData.email} onChange={(e) => handleFormChange("email", e.target.value)} placeholder="Email address" style={inputStyle} />
                    <FormError field="email" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input required type="tel" value={formData.phone} onChange={(e) => handleFormChange("phone", e.target.value)} placeholder="+234 xxx xxx xxxx" style={inputStyle} />
                    <FormError field="phone" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Date of Birth *</label>
                      <input required type="date" value={formData.dateOfBirth} onChange={(e) => handleFormChange("dateOfBirth", e.target.value)} style={inputStyle} />
                      <FormError field="dateOfBirth" />
                    </div>
                    <div>
                      <label style={labelStyle}>Gender *</label>
                      <select required value={formData.gender} onChange={(e) => handleFormChange("gender", e.target.value)} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <FormError field="gender" />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Blood Group</label>
                    <select value={formData.bloodGroup} onChange={(e) => handleFormChange("bloodGroup", e.target.value)} style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                    <FormError field="bloodGroup" />
                  </div>
                </div>
              </div>

              {/* Right Column - Contact & Medical */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: accent, textTransform: "uppercase", letterSpacing: 1, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <MapPin size={16} />
                  Contact & Medical Information
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Address</label>
                    <input type="text" value={formData.address} onChange={(e) => handleFormChange("address", e.target.value)} placeholder="Full address" style={inputStyle} />
                    <FormError field="address" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input type="text" value={formData.city} onChange={(e) => handleFormChange("city", e.target.value)} placeholder="City" style={inputStyle} />
                      <FormError field="city" />
                    </div>
                    <div>
                      <label style={labelStyle}>State</label>
                      <input type="text" value={formData.state} onChange={(e) => handleFormChange("state", e.target.value)} placeholder="State" style={inputStyle} />
                      <FormError field="state" />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Emergency Contact Name</label>
                      <input type="text" value={formData.emergencyContactName} onChange={(e) => handleFormChange("emergencyContactName", e.target.value)} placeholder="Contact name" style={inputStyle} />
                      <FormError field="emergencyContact" />
                    </div>
                    <div>
                      <label style={labelStyle}>Emergency Phone</label>
                      <input type="tel" value={formData.emergencyPhone} onChange={(e) => handleFormChange("emergencyPhone", e.target.value)} placeholder="Contact phone" style={inputStyle} />
                      <FormError field="emergencyPhone" />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Insurance Provider</label>
                      <input type="text" value={formData.insuranceProvider} onChange={(e) => handleFormChange("insuranceProvider", e.target.value)} placeholder="Provider name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Insurance Number</label>
                      <input type="text" value={formData.insuranceNumber} onChange={(e) => handleFormChange("insuranceNumber", e.target.value)} placeholder="Policy number" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Allergies</label>
                    <textarea value={formData.allergies} onChange={(e) => handleFormChange("allergies", e.target.value)} placeholder="List known allergies" rows={2} style={{ ...inputStyle, resize: "vertical" as const }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Medical History</label>
                    <textarea value={formData.medicalHistory} onChange={(e) => handleFormChange("medicalHistory", e.target.value)} placeholder="Previous medical conditions" rows={2} style={{ ...inputStyle, resize: "vertical" as const }} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button type="button" onClick={() => setShowRegistration(false)} style={btnOutline}>Cancel</button>
              <button type="submit" style={btnPrimary}>
                <Save size={16} />
                Register Patient
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
