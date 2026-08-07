"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Plus, Trash2, ShoppingCart } from "lucide-react"

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

const supplierOptions = [
  "Medico Pharma",
  "HealthCare Supplies",
  "Generic Drugs Ltd",
  "BioMed Solutions",
  "DermCare Pharma",
  "IV Solutions Ltd",
]

interface PurchaseItem {
  id: number
  name: string
  quantity: number
  unitPrice: number
  total: number
}

export default function NewPurchasePage() {
  const [supplier, setSupplier] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [paidAmount, setPaidAmount] = useState(0)
  const [items, setItems] = useState<PurchaseItem[]>([
    { id: 1, name: "", quantity: 1, unitPrice: 0, total: 0 },
  ])
  const [success, setSuccess] = useState(false)

  const addItem = () => {
    setItems((prev) => [...prev, { id: Date.now(), name: "", quantity: 1, unitPrice: 0, total: 0 }])
  }

  const removeItem = (id: number) => {
    if (items.length === 1) return
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (id: number, field: keyof PurchaseItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const updated = { ...item, [field]: value }
        if (field === "quantity" || field === "unitPrice") {
          updated.total = (field === "quantity" ? Number(value) : item.quantity) * (field === "unitPrice" ? Number(value) : item.unitPrice)
        }
        return updated
      })
    )
  }

  const totalAmount = items.reduce((acc, item) => acc + item.total, 0)
  const balance = totalAmount - paidAmount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Purchase:", { supplier, date, items, totalAmount, paidAmount })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
    setSupplier("")
    setItems([{ id: 1, name: "", quantity: 1, unitPrice: 0, total: 0 }])
    setPaidAmount(0)
  }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/pharmacy/purchases">
          <button style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#475569" }}>
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>New Purchase</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Record a new pharmacy purchase</p>
        </div>
      </div>

      {success && (
        <div style={{ padding: "14px 20px", borderRadius: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46", marginBottom: "20px", fontSize: "14px", fontWeight: 500 }}>
          Purchase recorded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={cardStyle}>
              <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa", display: "flex", alignItems: "center", gap: "8px" }}>
                <ShoppingCart size={18} style={{ color: accent }} />
                Purchase Information
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Supplier *</label>
                  <select value={supplier} onChange={(e) => setSupplier(e.target.value)} required style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                    <option value="">Select Supplier</option>
                    {supplierOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Date *</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />
                </div>
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: 0 }}>Purchase Items</h2>
                <button type="button" onClick={addItem} style={{ padding: "6px 14px", border: `1px solid ${accent}`, borderRadius: "6px", background: "#f0fdfa", color: accent, fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Plus size={12} /> Add Item
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "grid", gridTemplateColumns: "2fr 0.7fr 1fr 1fr auto", gap: "10px", alignItems: "end", padding: "14px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                    <div>
                      <label style={{ ...labelStyle, fontSize: "11px" }}>Item Name</label>
                      <input style={inputStyle} placeholder="Medicine name" value={item.name} onChange={(e) => updateItem(item.id, "name", e.target.value)} required />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, fontSize: "11px" }}>Qty</label>
                      <input style={inputStyle} type="number" min="1" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))} />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, fontSize: "11px" }}>Unit Price (₦)</label>
                      <input style={inputStyle} type="number" min="0" value={item.unitPrice || ""} placeholder="0" onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))} />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, fontSize: "11px" }}>Total</label>
                      <div style={{ ...inputStyle, background: "#f0fdfa", color: accent, fontWeight: 700, display: "flex", alignItems: "center" }}>
                        ₦{item.total.toLocaleString()}
                      </div>
                    </div>
                    <button type="button" onClick={() => removeItem(item.id)} disabled={items.length === 1} style={{ width: "36px", height: "36px", border: "none", borderRadius: "6px", background: items.length === 1 ? "#f1f5f9" : "#fef2f2", color: items.length === 1 ? "#cbd5e1" : "#dc2626", cursor: items.length === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1px" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", margin: "0 0 20px", padding: "0 0 12px", borderBottom: "2px solid #f0fdfa" }}>
              Purchase Summary
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Total Amount</span>
                <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "16px" }}>₦{totalAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={labelStyle}>Paid Amount (₦)</label>
                <input style={{ ...inputStyle, textAlign: "right" }} type="number" min="0" value={paidAmount || ""} placeholder="0" onChange={(e) => setPaidAmount(Number(e.target.value))} />
              </div>
              <div style={{ borderTop: "2px solid #e2e8f0", paddingTop: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b" }}>Balance</span>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: balance > 0 ? "#dc2626" : "#059669" }}>₦{balance.toLocaleString()}</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "#64748b" }}>Items</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>{items.length}</span>
              </div>
            </div>
            <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "20px", padding: "14px 20px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.35)" }}>
              <Save size={18} />
              Submit Purchase
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
