"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Pill, Package, AlertTriangle, TrendingUp, Edit, Eye, Filter } from "lucide-react"

const drugs = [
  { id: 1, name: "Amoxicillin 500mg", category: "Capsule", batchNo: "BAT-2026-001", stockQty: 320, unitPrice: 1200, expiryDate: "2027-06-15", supplier: "Medico Pharma", status: "In Stock" },
  { id: 2, name: "Metformin 850mg", category: "Tablet", batchNo: "BAT-2026-002", stockQty: 45, unitPrice: 800, expiryDate: "2027-03-20", supplier: "HealthCare Supplies", status: "Low Stock" },
  { id: 3, name: "Paracetamol 500mg", category: "Tablet", batchNo: "BAT-2026-003", stockQty: 580, unitPrice: 300, expiryDate: "2028-01-10", supplier: "Generic Drugs Ltd", status: "In Stock" },
  { id: 4, name: "Insulin Glargine", category: "Injection", batchNo: "BAT-2026-004", stockQty: 0, unitPrice: 15000, expiryDate: "2026-12-01", supplier: "BioMed Solutions", status: "Out of Stock" },
  { id: 5, name: "Normal Saline 500ml", category: "Syringe", batchNo: "BAT-2026-005", stockQty: 200, unitPrice: 500, expiryDate: "2027-09-30", supplier: "IV Solutions Ltd", status: "In Stock" },
  { id: 6, name: "Cough Syrup (DXM)", category: "Syrup", batchNo: "BAT-2026-006", stockQty: 28, unitPrice: 650, expiryDate: "2027-05-18", supplier: "Medico Pharma", status: "Low Stock" },
  { id: 7, name: "Betamethasone Cream", category: "Ointment", batchNo: "BAT-2026-007", stockQty: 95, unitPrice: 900, expiryDate: "2027-11-25", supplier: "DermCare Pharma", status: "In Stock" },
  { id: 8, name: "Ciprofloxacin 250mg", category: "Tablet", batchNo: "BAT-2026-008", stockQty: 15, unitPrice: 700, expiryDate: "2027-02-28", supplier: "HealthCare Supplies", status: "Low Stock" },
]

const stats = [
  { title: "Total Items", value: "156", icon: Package, color: "#14b8a6", bg: "#f0fdfa" },
  { title: "Low Stock", value: "12", icon: AlertTriangle, color: "#f59e0b", bg: "#fffbeb" },
  { title: "Expiring Soon", value: "8", icon: AlertTriangle, color: "#ef4444", bg: "#fef2f2" },
  { title: "Total Value", value: "₦4,250,000", icon: TrendingUp, color: "#8b5cf6", bg: "#f5f3ff" },
]

const statusStyles: Record<string, { bg: string; color: string }> = {
  "In Stock": { bg: "#dcfce7", color: "#16a34a" },
  "Low Stock": { bg: "#fef9c3", color: "#ca8a04" },
  "Out of Stock": { bg: "#fee2e2", color: "#dc2626" },
}

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = drugs.filter(
    (d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Drug Inventory</h1>
            <p style={{ color: "#64748b", fontSize: 14 }}>Manage pharmaceutical stock, categories, and expiry tracking</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
              borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff",
              fontSize: 13, fontWeight: 500, color: "#475569", cursor: "pointer",
            }}>
              <Filter size={16} /> Filter
            </button>
            <button style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
              borderRadius: 10, border: "none", background: "linear-gradient(135deg, #0f766e, #14b8a6)",
              fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer",
              boxShadow: "0 4px 14px rgba(20,184,166,0.3)",
            }}>
              <Plus size={16} /> Add Drug
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              style={{
                background: "#fff", borderRadius: 14, padding: "20px 22px",
                border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{stat.title}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", lineHeight: 1.1 }}>{stat.value}</p>
              </div>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: stat.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${stat.color}22`, flexShrink: 0,
              }}>
                <stat.icon size={22} color={stat.color} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{
          background: "#fff", borderRadius: 14, padding: "16px 22px",
          border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}>
          <div style={{ position: "relative" }}>
            <Search size={16} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search drugs by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px 12px 42px", borderRadius: 10,
                border: "1px solid #e2e8f0", fontSize: 13, color: "#0f172a",
                outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden",
        }}>
          <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #0f766e, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Pill size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>Drug Inventory ({filtered.length} items)</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Drug Name", "Category", "Batch No", "Stock Qty", "Unit Price (₦)", "Expiry Date", "Supplier", "Status", "Actions"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((drug, i) => {
                  const st = statusStyles[drug.status] || statusStyles["In Stock"]
                  return (
                    <motion.tr
                      key={drug.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      style={{ borderBottom: "1px solid #f8fafc" }}
                    >
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{drug.name}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          display: "inline-block", padding: "4px 10px", borderRadius: 6,
                          fontSize: 11, fontWeight: 600, background: "#f0f9ff", color: "#0369a1",
                        }}>{drug.category}</span>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569", fontFamily: "monospace" }}>{drug.batchNo}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: drug.stockQty < 30 ? "#dc2626" : "#0f172a" }}>{drug.stockQty}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>₦{drug.unitPrice.toLocaleString()}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{drug.expiryDate}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{drug.supplier}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          display: "inline-block", padding: "4px 12px", borderRadius: 20,
                          fontSize: 11, fontWeight: 600, background: st.bg, color: st.color,
                        }}>{drug.status}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button onClick={() => alert(`Drug: ${drug.name}\nCategory: ${drug.category}\nBatch: ${drug.batchNo}\nStock: ${drug.stockQty}\nPrice: ₦${drug.unitPrice.toLocaleString()}\nExpiry: ${drug.expiryDate}\nSupplier: ${drug.supplier}\nStatus: ${drug.status}`)} style={{
                            width: 32, height: 32, borderRadius: 8, border: "none",
                            background: "#f0f9ff", color: "#0369a1", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}><Eye size={14} /></button>
                          <button onClick={() => alert(`Edit drug: ${drug.name}`)} style={{
                            width: 32, height: 32, borderRadius: 8, border: "none",
                            background: "#f0fdf4", color: "#16a34a", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}><Edit size={14} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
