"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Package, AlertTriangle, TrendingUp, Edit, Eye, X, Save } from "lucide-react"
import Link from "next/link"

const initialDrugs = [
  { id: 1, name: "Amoxicillin 500mg", category: "Capsule", batchNo: "BAT-2026-001", stockQty: 320, unitPrice: 1200, expiryDate: "2027-06-15", supplier: "Medico Pharma", status: "In Stock" },
  { id: 2, name: "Metformin 850mg", category: "Tablet", batchNo: "BAT-2026-002", stockQty: 45, unitPrice: 800, expiryDate: "2027-03-20", supplier: "HealthCare Supplies", status: "Low Stock" },
  { id: 3, name: "Paracetamol 500mg", category: "Tablet", batchNo: "BAT-2026-003", stockQty: 580, unitPrice: 300, expiryDate: "2028-01-10", supplier: "Generic Drugs Ltd", status: "In Stock" },
  { id: 4, name: "Insulin Glargine", category: "Injection", batchNo: "BAT-2026-004", stockQty: 0, unitPrice: 15000, expiryDate: "2026-12-01", supplier: "BioMed Solutions", status: "Out of Stock" },
  { id: 5, name: "Normal Saline 500ml", category: "Syringe", batchNo: "BAT-2026-005", stockQty: 200, unitPrice: 500, expiryDate: "2027-09-30", supplier: "IV Solutions Ltd", status: "In Stock" },
  { id: 6, name: "Cough Syrup (DXM)", category: "Syrup", batchNo: "BAT-2026-006", stockQty: 28, unitPrice: 650, expiryDate: "2027-05-18", supplier: "Medico Pharma", status: "Low Stock" },
  { id: 7, name: "Betamethasone Cream", category: "Ointment", batchNo: "BAT-2026-007", stockQty: 95, unitPrice: 900, expiryDate: "2027-11-25", supplier: "DermCare Pharma", status: "In Stock" },
  { id: 8, name: "Ciprofloxacin 250mg", category: "Tablet", batchNo: "BAT-2026-008", stockQty: 15, unitPrice: 700, expiryDate: "2027-02-28", supplier: "HealthCare Supplies", status: "Low Stock" },
]

const canEdit = (role: string) => ["SUPER_ADMIN", "ADMIN", "PHARMACIST"].includes(role)

export default function DrugInventoryPage() {
  const { data: session } = useSession()
  const role = (session?.user as any)?.role || "SUPER_ADMIN"
  const [drugs, setDrugs] = useState(initialDrugs)
  const [search, setSearch] = useState("")
  const [viewDrug, setViewDrug] = useState<typeof initialDrugs[0] | null>(null)
  const [editDrug, setEditDrug] = useState<typeof initialDrugs[0] | null>(null)
  const [editForm, setEditForm] = useState({ name: "", category: "", batchNo: "", stockQty: 0, unitPrice: 0, expiryDate: "", supplier: "" })

  const filtered = drugs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase()))

  const openEdit = (drug: typeof initialDrugs[0]) => {
    setEditDrug(drug)
    setEditForm({ name: drug.name, category: drug.category, batchNo: drug.batchNo, stockQty: drug.stockQty, unitPrice: drug.unitPrice, expiryDate: drug.expiryDate, supplier: drug.supplier })
  }

  const saveEdit = () => {
    if (!editDrug) return
    const newStock = editForm.stockQty
    const status = newStock === 0 ? "Out of Stock" : newStock <= 50 ? "Low Stock" : "In Stock"
    setDrugs(prev => prev.map(d => d.id === editDrug.id ? { ...d, ...editForm, status } : d))
    setEditDrug(null)
  }

  const stats = [
    { title: "Total Items", value: drugs.length.toString(), icon: Package, color: "#14b8a6", bg: "#f0fdfa" },
    { title: "Low Stock", value: drugs.filter(d => d.status === "Low Stock").length.toString(), icon: AlertTriangle, color: "#f59e0b", bg: "#fffbeb" },
    { title: "Out of Stock", value: drugs.filter(d => d.status === "Out of Stock").length.toString(), icon: AlertTriangle, color: "#ef4444", bg: "#fef2f2" },
    { title: "Total Value", value: "₦" + drugs.reduce((a, d) => a + d.unitPrice * d.stockQty, 0).toLocaleString(), icon: TrendingUp, color: "#8b5cf6", bg: "#f5f3ff" },
  ]

  const statusColors: Record<string, { bg: string; color: string }> = {
    "In Stock": { bg: "#dcfce7", color: "#16a34a" },
    "Low Stock": { bg: "#fef9c3", color: "#ca8a04" },
    "Out of Stock": { bg: "#fee2e2", color: "#dc2626" },
  }

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }
  const labelStyle: React.CSSProperties = { fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px", display: "block" }

  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Drug Inventory</h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>Manage medicine stock, purchases, and tracking</p>
        </div>
        {canEdit(role) && (
          <Link href="/pharmacy/medicines/new">
            <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #0f766e, #14b8a6)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 14px rgba(20,184,166,0.3)" }}>
              <Plus size={16} /> Add Drug
            </button>
          </Link>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.title}</p>
                <p style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>{stat.value}</p>
              </div>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <stat.icon size={20} color={stat.color} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "16px 20px", marginBottom: "20px", border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div style={{ position: "relative", maxWidth: "400px" }}>
          <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search drugs..." style={{ ...inputStyle, paddingLeft: "38px" }} />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Drug Name", "Category", "Batch No", "Stock Qty", "Unit Price", "Expiry Date", "Supplier", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "14px 16px", fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left", borderBottom: "1px solid #f1f5f9" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((drug, i) => (
                <motion.tr key={drug.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: "1px solid #f8fafc" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f0fdfa")}
                  onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0f172a" }}>{drug.name}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, background: "#f1f5f9", color: "#475569" }}>{drug.category}</span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b" }}>{drug.batchNo}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 700, color: drug.stockQty === 0 ? "#dc2626" : drug.stockQty <= 50 ? "#ca8a04" : "#0f172a" }}>{drug.stockQty}</td>
                  <td style={{ padding: "14px 16px", fontWeight: 500, color: "#0f172a" }}>₦{drug.unitPrice.toLocaleString()}</td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b" }}>{drug.expiryDate}</td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b" }}>{drug.supplier}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, background: statusColors[drug.status]?.bg, color: statusColors[drug.status]?.color }}>{drug.status}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => setViewDrug(drug)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#3b82f6" }}>
                        <Eye size={14} />
                      </button>
                      {canEdit(role) && (
                        <button onClick={() => openEdit(drug)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#22c55e" }}>
                          <Edit size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {viewDrug && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
            onClick={() => setViewDrug(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: "#fff", borderRadius: "16px", padding: "28px", width: "440px", maxWidth: "90vw", boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Drug Details</h3>
                <button onClick={() => setViewDrug(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "4px" }}><X size={20} /></button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {[
                  ["Name", viewDrug.name], ["Category", viewDrug.category], ["Batch No", viewDrug.batchNo],
                  ["Stock", `${viewDrug.stockQty} units`], ["Unit Price", `₦${viewDrug.unitPrice.toLocaleString()}`],
                  ["Expiry", viewDrug.expiryDate], ["Supplier", viewDrug.supplier], ["Status", viewDrug.status],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>{label}</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>{value}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setViewDrug(null)} style={{ width: "100%", marginTop: "20px", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", fontSize: "14px", fontWeight: 600, color: "#475569", cursor: "pointer" }}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editDrug && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
            onClick={() => setEditDrug(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: "#fff", borderRadius: "16px", padding: "28px", width: "480px", maxWidth: "90vw", boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Edit Drug</h3>
                <button onClick={() => setEditDrug(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "4px" }}><X size={20} /></button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Drug Name</label>
                  <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} style={inputStyle}>
                    {["Tablet", "Capsule", "Injection", "Syringe", "Syrup", "Ointment"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Batch No</label>
                  <input value={editForm.batchNo} onChange={e => setEditForm({ ...editForm, batchNo: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Stock Quantity</label>
                  <input type="number" value={editForm.stockQty} onChange={e => setEditForm({ ...editForm, stockQty: Number(e.target.value) })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Unit Price (₦)</label>
                  <input type="number" value={editForm.unitPrice} onChange={e => setEditForm({ ...editForm, unitPrice: Number(e.target.value) })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Expiry Date</label>
                  <input type="date" value={editForm.expiryDate} onChange={e => setEditForm({ ...editForm, expiryDate: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Supplier</label>
                  <input value={editForm.supplier} onChange={e => setEditForm({ ...editForm, supplier: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button onClick={() => setEditDrug(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#fff", fontSize: "14px", fontWeight: 600, color: "#475569", cursor: "pointer" }}>Cancel</button>
                <button onClick={saveEdit} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #0f766e, #14b8a6)", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <Save size={14} /> Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
