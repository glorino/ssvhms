"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import Link from "next/link"
import { z } from "zod"
import { billSchema } from "@/lib/validations"

interface BillItem {
  id: number
  name: string
  quantity: number
  unitPrice: number
  total: number
}

const patientOptions = [
  "Adaeze Okonkwo",
  "Emeka Nwosu",
  "Fatima Abubakar",
  "Oluwaseun Adebayo",
  "Chidinma Eze",
  "Ibrahim Musa",
]

const billTypes = ["OPD", "IPD", "Pathology", "Pharmacy", "Radiology"]

function formatNaira(val: number) {
  return `₦${val.toLocaleString()}`
}

export default function NewBillPage() {
  const [patient, setPatient] = useState("")
  const [billType, setBillType] = useState("")
  const [items, setItems] = useState<BillItem[]>([
    { id: 1, name: "", quantity: 1, unitPrice: 0, total: 0 },
  ])
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [itemErrors, setItemErrors] = useState<Record<number, Record<string, string>>>({})

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", quantity: 1, unitPrice: 0, total: 0 },
    ])
  }

  const removeItem = (id: number) => {
    if (items.length === 1) return
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (id: number, field: keyof BillItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const updated = { ...item, [field]: value }
        if (field === "quantity" || field === "unitPrice") {
          updated.total = (field === "quantity" ? Number(value) : item.quantity) *
            (field === "unitPrice" ? Number(value) : item.unitPrice)
        }
        return updated
      })
    )
  }

  const subtotal = items.reduce((acc, item) => acc + item.total, 0)
  const grandTotal = subtotal - discount + (subtotal * tax) / 100

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    setItemErrors({})
    const result = billSchema.safeParse({
      patient,
      billType,
      items: items.map((item) => ({ name: item.name, quantity: item.quantity, unitPrice: item.unitPrice })),
      discount: discount || undefined,
      tax: tax || undefined,
    })
    if (!result.success) {
      const flat = z.flattenError(result.error)
      const errors: Record<string, string> = {}
      if (flat.formErrors.length > 0) errors._form = flat.formErrors.join(", ")
      Object.entries(flat.fieldErrors).forEach(([k, v]) => { errors[k] = (v as string[]).join(", ") })
      setFormErrors(errors)
      return
    }

  }

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    outline: "none",
    background: "#fff",
    color: "#1e293b",
    appearance: "none" as const,
    cursor: "pointer",
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    outline: "none",
    background: "#fff",
    color: "#1e293b",
  }

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "#475569",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  }

  return (
    <div style={{ padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link
          href="/billing"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#64748b",
            fontSize: "13px",
            textDecoration: "none",
            marginBottom: "12px",
          }}
        >
          <ArrowLeft size={14} /> Back to Billing
        </Link>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#14b8a6", margin: 0 }}>New Bill</h1>
        <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "14px" }}>Create a new patient bill</p>
      </div>

      <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <CardContent style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1e293b", margin: "0 0 16px" }}>Patient Information</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Patient</label>
                  <select
                    style={selectStyle}
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                  >
                    <option value="">Select patient</option>
                    {patientOptions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  {formErrors.patient && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{formErrors.patient}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Bill Type</label>
                  <select
                    style={selectStyle}
                    value={billType}
                    onChange={(e) => setBillType(e.target.value)}
                  >
                    <option value="">Select type</option>
                    {billTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {formErrors.billType && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{formErrors.billType}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <CardContent style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1e293b", margin: 0 }}>Bill Items</h2>
                <button
                  onClick={addItem}
                  style={{
                    padding: "6px 14px",
                    border: "1px solid #14b8a6",
                    borderRadius: "6px",
                    background: "#f0fdfa",
                    color: "#14b8a6",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Plus size={12} /> Add Item
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 0.7fr 1fr 1fr auto",
                      gap: "10px",
                      alignItems: "end",
                      padding: "14px",
                      background: "#f8fafc",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div>
                      <label style={{ ...labelStyle, fontSize: "11px" }}>Item Name</label>
                      <input
                        style={inputStyle}
                        placeholder="Enter item name"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, fontSize: "11px" }}>Qty</label>
                      <input
                        style={inputStyle}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, fontSize: "11px" }}>Unit Price (₦)</label>
                      <input
                        style={inputStyle}
                        type="number"
                        min="0"
                        value={item.unitPrice || ""}
                        placeholder="0"
                        onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, fontSize: "11px" }}>Total</label>
                      <div
                        style={{
                          ...inputStyle,
                          background: "#f0fdfa",
                          color: "#14b8a6",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {formatNaira(item.total)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      style={{
                        width: "36px",
                        height: "36px",
                        border: "none",
                        borderRadius: "6px",
                        background: items.length === 1 ? "#f1f5f9" : "#fef2f2",
                        color: items.length === 1 ? "#cbd5e1" : "#dc2626",
                        cursor: items.length === 1 ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1px",
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", position: "sticky", top: "24px" }}>
          <CardContent style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#1e293b", margin: "0 0 20px" }}>Bill Summary</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#64748b" }}>Subtotal</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b" }}>{formatNaira(subtotal)}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={labelStyle}>Discount (₦)</label>
                <input
                  style={{ ...inputStyle, textAlign: "right" }}
                  type="number"
                  min="0"
                  value={discount || ""}
                  placeholder="0"
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={labelStyle}>Tax (%)</label>
                <input
                  style={{ ...inputStyle, textAlign: "right" }}
                  type="number"
                  min="0"
                  max="100"
                  value={tax || ""}
                  placeholder="0"
                  onChange={(e) => setTax(Number(e.target.value))}
                />
              </div>

              <div style={{ borderTop: "2px solid #e2e8f0", paddingTop: "14px", marginTop: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b" }}>Grand Total</span>
                  <span style={{ fontSize: "22px", fontWeight: 800, color: "#14b8a6" }}>{formatNaira(grandTotal)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(20,184,166,0.35)",
              }}
            >
              <Save size={16} /> Submit Bill
            </button>
          </CardContent>
        </Card>
      </div>
      </form>
    </div>
  )
}
