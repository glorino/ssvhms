"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShoppingCart, TrendingUp, Clock, Truck, Plus } from "lucide-react"

const purchases = [
  { id: 1, purchaseNo: "PUR-2026-001", supplier: "Medico Pharma", itemsCount: 12, totalAmount: 2850000, paidAmount: 2850000, date: "2026-08-06", status: "Paid" },
  { id: 2, purchaseNo: "PUR-2026-002", supplier: "HealthCare Supplies", itemsCount: 8, totalAmount: 1650000, paidAmount: 1000000, date: "2026-08-04", status: "Partial" },
  { id: 3, purchaseNo: "PUR-2026-003", supplier: "Generic Drugs Ltd", itemsCount: 15, totalAmount: 3200000, paidAmount: 3200000, date: "2026-08-02", status: "Paid" },
  { id: 4, purchaseNo: "PUR-2026-004", supplier: "BioMed Solutions", itemsCount: 5, totalAmount: 980000, paidAmount: 0, date: "2026-07-30", status: "Pending" },
  { id: 5, purchaseNo: "PUR-2026-005", supplier: "DermCare Pharma", itemsCount: 6, totalAmount: 1420000, paidAmount: 1420000, date: "2026-07-28", status: "Paid" },
  { id: 6, purchaseNo: "PUR-2026-006", supplier: "IV Solutions Ltd", itemsCount: 9, totalAmount: 2400000, paidAmount: 1200000, date: "2026-07-25", status: "Partial" },
]

const stats = [
  { title: "Total Purchases", value: "\u20A612,500,000", icon: ShoppingCart, color: "#14b8a6", bg: "#f0fdfa" },
  { title: "This Month", value: "\u20A62,800,000", icon: TrendingUp, color: "#3b82f6", bg: "#eff6ff" },
  { title: "Pending Payment", value: "\u20A61,200,000", icon: Clock, color: "#f59e0b", bg: "#fffbeb" },
  { title: "Suppliers", value: "15", icon: Truck, color: "#8b5cf6", bg: "#f5f3ff" },
]

const statusStyles: Record<string, { bg: string; color: string }> = {
  Paid: { bg: "#dcfce7", color: "#16a34a" },
  Partial: { bg: "#fef9c3", color: "#ca8a04" },
  Pending: { bg: "#fee2e2", color: "#dc2626" },
}

export default function PurchasesPage() {
  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Purchase History</h1>
            <p style={{ color: "#64748b", fontSize: 14 }}>Track pharmaceutical purchases and supplier payments</p>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
            borderRadius: 10, border: "none", background: "linear-gradient(135deg, #0f766e, #14b8a6)",
            fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(20,184,166,0.3)",
          }}>
            <Plus size={16} /> New Purchase
          </button>
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

        {/* Table */}
        <div style={{
          background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden",
        }}>
          <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #0f766e, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShoppingCart size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>All Purchases ({purchases.length} records)</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Purchase No", "Supplier", "Items", "Total Amount (\u20A6)", "Paid (\u20A6)", "Date", "Status"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {purchases.map((pur, i) => {
                  const st = statusStyles[pur.status]
                  return (
                    <motion.tr
                      key={pur.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{ borderBottom: "1px solid #f8fafc" }}
                    >
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0f172a", fontFamily: "monospace" }}>{pur.purchaseNo}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{pur.supplier}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569", textAlign: "center" }}>{pur.itemsCount}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>\u20A6{pur.totalAmount.toLocaleString()}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>\u20A6{pur.paidAmount.toLocaleString()}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{pur.date}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          display: "inline-block", padding: "4px 12px", borderRadius: 20,
                          fontSize: 11, fontWeight: 600, background: st.bg, color: st.color,
                        }}>{pur.status}</span>
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
