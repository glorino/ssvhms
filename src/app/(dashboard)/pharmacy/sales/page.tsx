"use client"

import React from "react"
import { motion } from "framer-motion"
import { TrendingUp, Clock, Calendar, BarChart3 } from "lucide-react"

const sales = [
  { id: 1, saleNo: "SAL-2026-001", patient: "Rajesh Kumar", items: 4, total: 8500, paid: 8500, date: "2026-08-07", status: "Paid" },
  { id: 2, saleNo: "SAL-2026-002", patient: "Anita Patel", items: 2, total: 3200, paid: 3200, date: "2026-08-07", status: "Paid" },
  { id: 3, saleNo: "SAL-2026-003", patient: "Suresh Reddy", items: 6, total: 12500, paid: 8000, date: "2026-08-06", status: "Partial" },
  { id: 4, saleNo: "SAL-2026-004", patient: "Priya Verma", items: 3, total: 5400, paid: 5400, date: "2026-08-06", status: "Paid" },
  { id: 5, saleNo: "SAL-2026-005", patient: "Mohammed Ali", items: 1, total: 1800, paid: 0, date: "2026-08-05", status: "Pending" },
  { id: 6, saleNo: "SAL-2026-006", patient: "Fatima Bello", items: 5, total: 9600, paid: 9600, date: "2026-08-05", status: "Paid" },
]

const stats = [
  { title: "Total Sales", value: "\u20A68,750,000", icon: TrendingUp, color: "#14b8a6", bg: "#f0fdfa" },
  { title: "Today", value: "\u20A645,000", icon: Clock, color: "#3b82f6", bg: "#eff6ff" },
  { title: "This Week", value: "\u20A6320,000", icon: Calendar, color: "#8b5cf6", bg: "#f5f3ff" },
  { title: "This Month", value: "\u20A61,580,000", icon: BarChart3, color: "#f59e0b", bg: "#fffbeb" },
]

const statusStyles: Record<string, { bg: string; color: string }> = {
  Paid: { bg: "#dcfce7", color: "#16a34a" },
  Partial: { bg: "#fef9c3", color: "#ca8a04" },
  Pending: { bg: "#fee2e2", color: "#dc2626" },
}

export default function SalesPage() {
  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Sales History</h1>
            <p style={{ color: "#64748b", fontSize: 14 }}>View pharmacy sales transactions and patient payments</p>
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

        {/* Table */}
        <div style={{
          background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden",
        }}>
          <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #0f766e, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingUp size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>All Sales ({sales.length} records)</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Sale No", "Patient", "Items", "Total (\u20A6)", "Paid (\u20A6)", "Date", "Status"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, i) => {
                  const st = statusStyles[sale.status]
                  return (
                    <motion.tr
                      key={sale.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{ borderBottom: "1px solid #f8fafc" }}
                    >
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0f172a", fontFamily: "monospace" }}>{sale.saleNo}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{sale.patient}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569", textAlign: "center" }}>{sale.items}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>\u20A6{sale.total.toLocaleString()}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>\u20A6{sale.paid.toLocaleString()}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>{sale.date}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          display: "inline-block", padding: "4px 12px", borderRadius: 20,
                          fontSize: 11, fontWeight: 600, background: st.bg, color: st.color,
                        }}>{sale.status}</span>
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
