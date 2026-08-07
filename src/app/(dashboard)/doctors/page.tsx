"use client"

import React, { useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import { usePatients, Patient } from "@/lib/patient-context"
import { z } from "zod"
import { vitalsSchema, visitSchema, labResultSchema, prescriptionSchema } from "@/lib/validations"
import { Search, User, Heart, Activity, Thermometer, Weight, Ruler, Wind, FileText, FlaskConical, Pill, CreditCard, Plus, X, Check, AlertCircle, Clock, UserCheck, Stethoscope } from "lucide-react"

const accent = "#14b8a6"
const accentLight = "#ccfbf1"
const accentDark = "#0d9488"
const accentHover = "#115e59"

const departments = ["Cardiology", "Neurology", "Orthopedics", "Dermatology", "General Medicine", "Pediatrics", "Oncology", "ENT", "Ophthalmology", "Urology"]
const labCategories = ["Hematology", "Biochemistry", "Endocrinology", "Clinical Pathology", "Radiology"]

type Tab = "vitals" | "visits" | "lab" | "prescriptions" | "bills"

export default function DoctorsPage() {
  const { data: session } = useSession()
  const { searchPatients, getPatientByNumber, updateVitals, addVisit, addLabResult, addPrescription } = usePatients()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>("vitals")

  const [showVitalsForm, setShowVitalsForm] = useState(false)
  const [showVisitForm, setShowVisitForm] = useState(false)
  const [showLabForm, setShowLabForm] = useState(false)
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false)

  const [vitalsData, setVitalsData] = useState({ temperature: "", bloodPressure: "", heartRate: "", weight: "", height: "", oxygenSaturation: "" })
  const [visitData, setVisitData] = useState({ type: "OPD" as "OPD" | "IPD", department: "", symptoms: "", diagnosis: "", prescription: "", notes: "", status: "Scheduled" as "Scheduled" | "In Progress" | "Completed" })
  const [labData, setLabData] = useState({ testName: "", category: "Hematology", notes: "" })
  const [prescriptionText, setPrescriptionText] = useState("")

  const [vitalsErrors, setVitalsErrors] = useState<Record<string, string>>({})
  const [visitErrors, setVisitErrors] = useState<Record<string, string>>({})
  const [labErrors, setLabErrors] = useState<Record<string, string>>({})
  const [prescriptionErrors, setPrescriptionErrors] = useState<Record<string, string>>({})

  const doctorName = session?.user?.name || "Doctor"

  const handleSearch = (q: string) => {
    setSearchQuery(q)
    if (q.trim().length === 0) { setSearchResults([]); return }
    const results = searchPatients(q)
    setSearchResults(results)
  }

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setSearchQuery(patient.uniqueNumber)
    setSearchResults([])
    setActiveTab("vitals")
  }

  const handleLookupByNumber = (e: React.FormEvent) => {
    e.preventDefault()
    const patient = getPatientByNumber(searchQuery.trim())
    if (patient) handleSelectPatient(patient)
  }

  const handleUpdateVitals = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPatient) return
    setVitalsErrors({})
    const result = vitalsSchema.safeParse(vitalsData)
    if (!result.success) {
      const flat = z.flattenError(result.error)
      const errors: Record<string, string> = {}
      Object.entries(flat.fieldErrors).forEach(([k, v]) => { errors[k] = (v as string[]).join(", ") })
      setVitalsErrors(errors)
      return
    }
    updateVitals(selectedPatient.id, {
      ...vitalsData,
      recordedAt: new Date().toLocaleString("en-NG", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
      recordedBy: doctorName,
    })
    setSelectedPatient({ ...selectedPatient, vitals: { ...selectedPatient.vitals, ...vitalsData, recordedAt: new Date().toLocaleString("en-NG"), recordedBy: doctorName } })
    setShowVitalsForm(false)
    setVitalsData({ temperature: "", bloodPressure: "", heartRate: "", weight: "", height: "", oxygenSaturation: "" })
  }

  const handleAddVisit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPatient) return
    setVisitErrors({})
    const result = visitSchema.safeParse({ department: visitData.department, symptoms: visitData.symptoms, diagnosis: visitData.diagnosis, prescription: visitData.prescription || undefined, notes: visitData.notes || undefined, status: visitData.status })
    if (!result.success) {
      const flat = z.flattenError(result.error)
      const errors: Record<string, string> = {}
      Object.entries(flat.fieldErrors).forEach(([k, v]) => { errors[k] = (v as string[]).join(", ") })
      setVisitErrors(errors)
      return
    }
    addVisit(selectedPatient.id, { ...visitData, doctor: doctorName, date: new Date().toISOString().split("T")[0] })
    setSelectedPatient({ ...selectedPatient, visits: [...selectedPatient.visits, { id: "V" + Date.now(), date: new Date().toISOString().split("T")[0], doctor: doctorName, ...visitData }] })
    setShowVisitForm(false)
    setVisitData({ type: "OPD", department: "", symptoms: "", diagnosis: "", prescription: "", notes: "", status: "Scheduled" })
  }

  const handleAddLabResult = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPatient) return
    setLabErrors({})
    const result = labResultSchema.safeParse({ testName: labData.testName, category: labData.category, notes: labData.notes || undefined })
    if (!result.success) {
      const flat = z.flattenError(result.error)
      const errors: Record<string, string> = {}
      Object.entries(flat.fieldErrors).forEach(([k, v]) => { errors[k] = (v as string[]).join(", ") })
      setLabErrors(errors)
      return
    }
    addLabResult(selectedPatient.id, { ...labData, result: "", status: "Pending", date: new Date().toISOString().split("T")[0], orderedBy: doctorName })
    setSelectedPatient({ ...selectedPatient, labResults: [...selectedPatient.labResults, { id: "L" + Date.now(), ...labData, result: "", status: "Pending", date: new Date().toISOString().split("T")[0], orderedBy: doctorName }] })
    setShowLabForm(false)
    setLabData({ testName: "", category: "Hematology", notes: "" })
  }

  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPatient) return
    setPrescriptionErrors({})
    const result = prescriptionSchema.safeParse({ prescriptionText })
    if (!result.success) {
      const flat = z.flattenError(result.error)
      const errors: Record<string, string> = {}
      Object.entries(flat.fieldErrors).forEach(([k, v]) => { errors[k] = (v as string[]).join(", ") })
      setPrescriptionErrors(errors)
      return
    }
    addPrescription(selectedPatient.id, prescriptionText.trim())
    setSelectedPatient({ ...selectedPatient, prescriptions: [...selectedPatient.prescriptions, prescriptionText.trim()] })
    setShowPrescriptionForm(false)
    setPrescriptionText("")
  }

  const s = (base: React.CSSProperties, extra?: React.CSSProperties): React.CSSProperties => ({ ...base, ...extra })
  const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }
  const labelStyle: React.CSSProperties = { fontSize: "13px", fontWeight: 600, color: "#475569", marginBottom: "6px", display: "block" }
  const btnPrimary: React.CSSProperties = { background: accent, color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }
  const btnOutline: React.CSSProperties = { background: "transparent", color: accent, border: `1px solid ${accent}`, padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }
  const tabStyle = (active: boolean): React.CSSProperties => ({ padding: "10px 20px", borderRadius: "8px 8px 0 0", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", background: active ? accent : "#f1f5f9", color: active ? "#fff" : "#64748b", transition: "all 0.2s" })

  const FieldError = ({ error }: { error?: string }) => {
    if (!error) return null
    return <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{error}</p>
  }

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1e293b", margin: 0 }}>Doctor&apos;s Workstation</h1>
        <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "14px" }}>Look up patients by number or name</p>
      </div>

      {(session?.user as any)?.role === "DOCTOR" && (
        <div style={{ ...cardStyle, padding: "24px", marginBottom: "24px", background: "linear-gradient(135deg, #f0fdfa 0%, #fff 100%)", borderLeft: `4px solid ${accent}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                <Stethoscope size={28} />
              </div>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>My Profile</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "14px", color: "#475569" }}>
                  <span><strong>Name:</strong> {session?.user?.name || doctorName}</span>
                  <span><strong>Email:</strong> {session?.user?.email || "N/A"}</span>
                  <span><strong>Role:</strong> Doctor</span>
                  <span><strong>Department:</strong> {(session?.user as any)?.department || "General Medicine"}</span>
                </div>
              </div>
            </div>
            <a href="/doctors" style={{ ...btnPrimary, textDecoration: "none", background: accentHover }}>
              <Clock size={14} /> View My Schedule
            </a>
          </div>
        </div>
      )}

      <form onSubmit={handleLookupByNumber} style={{ marginBottom: "24px", position: "relative" }}>
        <div style={{ position: "relative" }}>
          <Search size={20} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Enter patient number (e.g., SSV-2026-1001) or search by name..."
            style={{ ...inputStyle, paddingLeft: "48px", fontSize: "16px", padding: "14px 16px 14px 48px", borderRadius: "12px", border: "2px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
          />
          {searchQuery && (
            <button type="submit" style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", ...btnPrimary, padding: "8px 20px" }}>
              Search
            </button>
          )}
        </div>
        {searchResults.length > 0 && (
          <div style={{ position: "absolute", zIndex: 50, top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", marginTop: "4px", maxHeight: "320px", overflowY: "auto" }}>
            {searchResults.map((p) => (
              <div key={p.id} onClick={() => handleSelectPatient(p)} style={{ padding: "12px 16px", cursor: "pointer", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.15s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")} onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}>
                <div>
                  <span style={{ fontWeight: 600, color: "#1e293b" }}>{p.firstName} {p.lastName}</span>
                  <span style={{ marginLeft: "12px", color: "#94a3b8", fontSize: "13px" }}>{p.uniqueNumber}</span>
                </div>
                <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, background: p.status === "Active" ? "#dcfce7" : p.status === "Admitted" ? "#fef3c7" : "#fee2e2", color: p.status === "Active" ? "#166534" : p.status === "Admitted" ? "#92400e" : "#991b1b" }}>{p.status}</span>
              </div>
            ))}
          </div>
        )}
      </form>

      {!selectedPatient && (
        <div style={{ ...cardStyle, padding: "80px 40px", textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: accentLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <User size={36} style={{ color: accent }} />
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>No Patient Selected</h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Enter a patient number or search by name to load their profile</p>
        </div>
      )}

      {selectedPatient && (
        <>
          <div style={{ ...cardStyle, padding: "24px", marginBottom: "20px", background: "linear-gradient(135deg, #f0fdfa 0%, #fff 100%)", borderLeft: `4px solid ${accent}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "20px", fontWeight: 700, flexShrink: 0 }}>
                  {selectedPatient.firstName[0]}{selectedPatient.lastName[0]}
                </div>
                <div>
                  <span style={{ display: "inline-block", background: accent, color: "#fff", padding: "4px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "6px" }}>{selectedPatient.uniqueNumber}</span>
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1e293b", margin: 0 }}>{selectedPatient.firstName} {selectedPatient.lastName}</h2>
                  <div style={{ display: "flex", gap: "16px", marginTop: "4px", fontSize: "14px", color: "#475569" }}>
                    <span>{Math.floor((Date.now() - new Date(selectedPatient.dateOfBirth).getTime()) / 31557600000)} yrs</span>
                    <span>{selectedPatient.gender}</span>
                    <span>Blood: {selectedPatient.bloodGroup}</span>
                    <span>{selectedPatient.phone}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ padding: "5px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 600, background: selectedPatient.status === "Active" ? "#dcfce7" : selectedPatient.status === "Admitted" ? "#fef3c7" : "#fee2e2", color: selectedPatient.status === "Active" ? "#166534" : selectedPatient.status === "Admitted" ? "#92400e" : "#991b1b" }}>{selectedPatient.status}</span>
                <button onClick={() => setSelectedPatient(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#64748b" }}><X size={14} /> Close</button>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "20px" }}>
            {[
              { title: "Personal Info", icon: <User size={18} color={accent} />, items: [`DOB: ${selectedPatient.dateOfBirth}`, `Email: ${selectedPatient.email}`, `Address: ${selectedPatient.address}`, `${selectedPatient.city}, ${selectedPatient.state}`] },
              { title: "Emergency Contact", icon: <AlertCircle size={18} color="#ef4444" />, items: [selectedPatient.emergencyContact, selectedPatient.emergencyPhone] },
              { title: "Insurance", icon: <CreditCard size={18} color="#8b5cf6" />, items: [selectedPatient.insuranceProvider, selectedPatient.insuranceNumber] },
              { title: "Medical", icon: <Heart size={18} color="#ec4899" />, items: [`Allergies: ${selectedPatient.allergies || "None"}`, `History: ${selectedPatient.medicalHistory || "None"}`] },
            ].map((card, i) => (
              <div key={i} style={{ ...cardStyle, padding: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  {card.icon}
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{card.title}</span>
                </div>
                {card.items.map((item, j) => <div key={j} style={{ fontSize: "13px", color: "#475569", marginBottom: "4px", lineHeight: "1.5" }}>{item}</div>)}
              </div>
            ))}
          </div>

          <div style={{ ...cardStyle, marginBottom: "20px" }}>
            <div style={{ display: "flex", borderBottom: "2px solid #f1f5f9", padding: "0 16px" }}>
              {(["vitals", "visits", "lab", "prescriptions", "bills"] as Tab[]).map((tab) => {
                const icons: Record<Tab, React.ReactNode> = { vitals: <Activity size={14} />, visits: <Clock size={14} />, lab: <FlaskConical size={14} />, prescriptions: <Pill size={14} />, bills: <CreditCard size={14} /> }
                const labels: Record<Tab, string> = { vitals: "Vitals", visits: "Visits", lab: "Lab Results", prescriptions: "Prescriptions", bills: "Bills" }
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(activeTab === tab)}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>{icons[tab]}{labels[tab]}</span>
                  </button>
                )
              })}
            </div>

            <div style={{ padding: "20px" }}>
              {activeTab === "vitals" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: 0 }}>Patient Vitals</h3>
                    <button onClick={() => setShowVitalsForm(!showVitalsForm)} style={btnPrimary}>
                      {showVitalsForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Update Vitals</>}
                    </button>
                  </div>

                  {showVitalsForm && (
                    <form onSubmit={handleUpdateVitals} style={{ ...cardStyle, padding: "20px", marginBottom: "16px", background: "#f8fafc", border: `1px solid ${accentLight}` }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                        {[{ key: "temperature", label: "Temperature", placeholder: "36.8°C" }, { key: "bloodPressure", label: "Blood Pressure", placeholder: "120/80 mmHg" }, { key: "heartRate", label: "Heart Rate", placeholder: "72 bpm" }, { key: "weight", label: "Weight", placeholder: "70 kg" }, { key: "height", label: "Height", placeholder: "170 cm" }, { key: "oxygenSaturation", label: "O₂ Saturation", placeholder: "98%" }].map((field) => (
                          <div key={field.key}>
                            <label style={labelStyle}>{field.label}</label>
                            <input value={(vitalsData as any)[field.key]} onChange={(e) => setVitalsData({ ...vitalsData, [field.key]: e.target.value })} placeholder={field.placeholder} style={inputStyle} required />
                            <FieldError error={vitalsErrors[field.key]} />
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <button type="button" onClick={() => setShowVitalsForm(false)} style={btnOutline}>Cancel</button>
                        <button type="submit" style={btnPrimary}><Check size={14} /> Save Vitals</button>
                      </div>
                    </form>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                    {[
                      { label: "Temperature", value: selectedPatient.vitals?.temperature || "--", icon: <Thermometer size={16} color="#ef4444" /> },
                      { label: "Blood Pressure", value: selectedPatient.vitals?.bloodPressure || "--", icon: <Heart size={16} color="#ec4899" /> },
                      { label: "Heart Rate", value: selectedPatient.vitals?.heartRate || "--", icon: <Activity size={16} color="#f59e0b" /> },
                      { label: "Weight", value: selectedPatient.vitals?.weight || "--", icon: <Weight size={16} color="#3b82f6" /> },
                      { label: "Height", value: selectedPatient.vitals?.height || "--", icon: <Ruler size={16} color="#8b5cf6" /> },
                      { label: "O₂ Saturation", value: selectedPatient.vitals?.oxygenSaturation || "--", icon: <Wind size={16} color={accent} /> },
                    ].map((v, i) => (
                      <div key={i} style={{ background: "#f8fafc", borderRadius: "10px", padding: "16px", border: "1px solid #f1f5f9" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>{v.icon}<span style={{ fontSize: "13px", color: "#64748b" }}>{v.label}</span></div>
                        <div style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b" }}>{v.value}</div>
                      </div>
                    ))}
                  </div>
                  {selectedPatient.vitals?.recordedAt && (
                    <div style={{ marginTop: "12px", fontSize: "13px", color: "#94a3b8" }}>
                      Last recorded: {selectedPatient.vitals.recordedAt} by {selectedPatient.vitals.recordedBy}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "visits" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: 0 }}>Visit History</h3>
                    <button onClick={() => setShowVisitForm(!showVisitForm)} style={btnPrimary}>
                      {showVisitForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> New Visit</>}
                    </button>
                  </div>

                  {showVisitForm && (
                    <form onSubmit={handleAddVisit} style={{ ...cardStyle, padding: "20px", marginBottom: "16px", background: "#f8fafc", border: `1px solid ${accentLight}` }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                        <div><label style={labelStyle}>Doctor Name</label><input value={doctorName} readOnly style={{ ...inputStyle, background: "#f1f5f9" }} /></div>
                        <div><label style={labelStyle}>Department</label>
                          <select value={visitData.department} onChange={(e) => setVisitData({ ...visitData, department: e.target.value })} style={inputStyle} required>
                            <option value="">Select department</option>
                            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                          </select>
                          <FieldError error={visitErrors.department} />
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Symptoms</label><textarea value={visitData.symptoms} onChange={(e) => setVisitData({ ...visitData, symptoms: e.target.value })} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} placeholder="Patient symptoms..." required /><FieldError error={visitErrors.symptoms} /></div>
                        <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Diagnosis</label><textarea value={visitData.diagnosis} onChange={(e) => setVisitData({ ...visitData, diagnosis: e.target.value })} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} placeholder="Your diagnosis..." required /><FieldError error={visitErrors.diagnosis} /></div>
                        <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Prescription</label><textarea value={visitData.prescription} onChange={(e) => setVisitData({ ...visitData, prescription: e.target.value })} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} placeholder="Prescribed medication..." /></div>
                        <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Notes</label><textarea value={visitData.notes} onChange={(e) => setVisitData({ ...visitData, notes: e.target.value })} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} placeholder="Additional notes..." /></div>
                        <div><label style={labelStyle}>Status</label>
                          <select value={visitData.status} onChange={(e) => setVisitData({ ...visitData, status: e.target.value as any })} style={inputStyle}>
                            {["Scheduled", "In Progress", "Completed"].map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <button type="button" onClick={() => setShowVisitForm(false)} style={btnOutline}>Cancel</button>
                        <button type="submit" style={btnPrimary}><Check size={14} /> Save Visit</button>
                      </div>
                    </form>
                  )}

                  {selectedPatient.visits.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No visits recorded yet</div>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                            {["Date", "Type", "Doctor", "Department", "Symptoms", "Diagnosis", "Status"].map((h) => (
                              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#475569", whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPatient.visits.map((v) => (
                            <tr key={v.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "12px 16px", color: "#1e293b", fontWeight: 500 }}>{v.date}</td>
                              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600, background: v.type === "OPD" ? "#dbeafe" : v.type === "IPD" ? "#fef3c7" : "#fee2e2", color: v.type === "OPD" ? "#1e40af" : v.type === "IPD" ? "#92400e" : "#991b1b" }}>{v.type}</span></td>
                              <td style={{ padding: "12px 16px", color: "#475569" }}>{v.doctor}</td>
                              <td style={{ padding: "12px 16px", color: "#475569" }}>{v.department}</td>
                              <td style={{ padding: "12px 16px", color: "#475569", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.symptoms}</td>
                              <td style={{ padding: "12px 16px", color: "#475569", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.diagnosis}</td>
                              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600, background: v.status === "Completed" ? "#dcfce7" : v.status === "In Progress" ? "#dbeafe" : "#f1f5f9", color: v.status === "Completed" ? "#166534" : v.status === "In Progress" ? "#1e40af" : "#64748b" }}>{v.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "lab" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: 0 }}>Lab Results</h3>
                    <button onClick={() => setShowLabForm(!showLabForm)} style={btnPrimary}>
                      {showLabForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Order Test</>}
                    </button>
                  </div>

                  {showLabForm && (
                    <form onSubmit={handleAddLabResult} style={{ ...cardStyle, padding: "20px", marginBottom: "16px", background: "#f8fafc", border: `1px solid ${accentLight}` }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                        <div><label style={labelStyle}>Test Name</label><input value={labData.testName} onChange={(e) => setLabData({ ...labData, testName: e.target.value })} style={inputStyle} placeholder="e.g. Complete Blood Count" required /><FieldError error={labErrors.testName} /></div>
                        <div><label style={labelStyle}>Category</label>
                          <select value={labData.category} onChange={(e) => setLabData({ ...labData, category: e.target.value })} style={inputStyle}>
                            {labCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <FieldError error={labErrors.category} />
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}><label style={labelStyle}>Notes</label><textarea value={labData.notes} onChange={(e) => setLabData({ ...labData, notes: e.target.value })} style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} placeholder="Additional notes..." /></div>
                      </div>
                      <div style={{ marginTop: "16px", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <button type="button" onClick={() => setShowLabForm(false)} style={btnOutline}>Cancel</button>
                        <button type="submit" style={btnPrimary}><Check size={14} /> Order Test</button>
                      </div>
                    </form>
                  )}

                  {selectedPatient.labResults.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No lab results yet</div>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                            {["Test Name", "Category", "Result", "Date", "Ordered By", "Status"].map((h) => (
                              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#475569", whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPatient.labResults.map((lr) => (
                            <tr key={lr.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "12px 16px", color: "#1e293b", fontWeight: 500 }}>{lr.testName}</td>
                              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600, background: "#ede9fe", color: "#6d28d9" }}>{lr.category}</span></td>
                              <td style={{ padding: "12px 16px", color: "#475569" }}>{lr.result || "Pending"}</td>
                              <td style={{ padding: "12px 16px", color: "#475569" }}>{lr.date}</td>
                              <td style={{ padding: "12px 16px", color: "#475569" }}>{lr.orderedBy}</td>
                              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600, background: lr.status === "Completed" ? "#dcfce7" : lr.status === "In Progress" ? "#dbeafe" : "#fef3c7", color: lr.status === "Completed" ? "#166534" : lr.status === "In Progress" ? "#1e40af" : "#92400e" }}>{lr.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "prescriptions" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: 0 }}>Prescriptions</h3>
                    <button onClick={() => setShowPrescriptionForm(!showPrescriptionForm)} style={btnPrimary}>
                      {showPrescriptionForm ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Prescription</>}
                    </button>
                  </div>

                  {showPrescriptionForm && (
                    <form onSubmit={handleAddPrescription} style={{ ...cardStyle, padding: "20px", marginBottom: "16px", background: "#f8fafc", border: `1px solid ${accentLight}` }}>
                      <label style={labelStyle}>Prescription</label>
                      <textarea value={prescriptionText} onChange={(e) => setPrescriptionText(e.target.value)} style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} placeholder="e.g. Amoxicillin 500mg - Three times daily for 7 days" required />
                      <FieldError error={prescriptionErrors.prescriptionText} />
                      <div style={{ marginTop: "12px", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                        <button type="button" onClick={() => setShowPrescriptionForm(false)} style={btnOutline}>Cancel</button>
                        <button type="submit" style={btnPrimary}><Check size={14} /> Add</button>
                      </div>
                    </form>
                  )}

                  {selectedPatient.prescriptions.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No prescriptions yet</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {selectedPatient.prescriptions.map((p, i) => (
                        <div key={i} style={{ ...cardStyle, padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", borderLeft: `3px solid ${accent}` }}>
                          <Pill size={16} color={accent} style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: "14px", color: "#1e293b" }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "bills" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: 0 }}>Bills</h3>
                  </div>

                  {selectedPatient.bills.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8" }}>No bills yet</div>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                            {["Date", "Items", "Amount", "Paid", "Due", "Status"].map((h) => (
                              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#475569", whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPatient.bills.map((b) => (
                            <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "12px 16px", color: "#1e293b", fontWeight: 500 }}>{b.date}</td>
                              <td style={{ padding: "12px 16px", color: "#475569", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.items}</td>
                              <td style={{ padding: "12px 16px", color: "#1e293b", fontWeight: 600 }}>₦{b.amount.toLocaleString()}</td>
                              <td style={{ padding: "12px 16px", color: "#16a34a", fontWeight: 600 }}>₦{b.paid.toLocaleString()}</td>
                              <td style={{ padding: "12px 16px", color: b.due > 0 ? "#dc2626" : "#16a34a", fontWeight: 600 }}>₦{b.due.toLocaleString()}</td>
                              <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 600, background: b.status === "Paid" ? "#dcfce7" : b.status === "Partial" ? "#fef3c7" : "#fee2e2", color: b.status === "Paid" ? "#166534" : b.status === "Partial" ? "#92400e" : "#991b1b" }}>{b.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
