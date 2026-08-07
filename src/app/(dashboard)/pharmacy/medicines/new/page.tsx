"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Pill } from "lucide-react"

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

const categoryOptions = ["Tablet", "Capsule", "Injection", "Syringe", "Syrup", "Ointment"]

export default function NewMedicinePage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    batchNo: "",
    stockQty: "",
    unitPrice: "",
    expiryDate: "",
    supplier: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Medicine data:", formData)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
    setFormData({ name: "", category: "", batchNo: "", stockQty: "", unitPrice: "", expiryDate: "", supplier: "" })
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/pharmacy/medicines">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Drug</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Add a new medicine to inventory</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Medicine added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
              <Pill size={18} style={{ color: accent }} />
              Medicine Information
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Medicine Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Amoxicillin 500mg" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option value="">Select Category</option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Batch Number *</label>
                <input type="text" name="batchNo" value={formData.batchNo} onChange={handleChange} placeholder="e.g., BAT-2026-001" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Stock Quantity *</label>
                <input type="number" name="stockQty" value={formData.stockQty} onChange={handleChange} placeholder="Units in stock" min="0" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Unit Price (₦) *</label>
                <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleChange} placeholder="Price per unit" min="0" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Expiry Date *</label>
                <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Supplier *</label>
                <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} placeholder="Supplier name" required style={inputStyle} />
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
                <span style={{ fontWeight: 600, color: "#0f172a", maxWidth: "150px", textAlign: "right" }}>{formData.name || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Category</span>
                <span style={{ fontWeight: 600, color: accent }}>{formData.category || "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Stock</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.stockQty || "0"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Unit Price</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{formData.unitPrice ? `₦${Number(formData.unitPrice).toLocaleString()}` : "-"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Total Value</span>
                <span style={{ fontWeight: 600, color: accent }}>
                  {formData.stockQty && formData.unitPrice ? `₦${(Number(formData.stockQty) * Number(formData.unitPrice)).toLocaleString()}` : "-"}
                </span>
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "20px", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Add Medicine
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
