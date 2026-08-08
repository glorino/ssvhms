"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Download, Eye, CreditCard, IndianRupee, CheckCircle, Clock, AlertCircle, FileText, Printer } from "lucide-react"
import { usePatients } from "@/lib/patient-context"

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Paid: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  Pending: { bg: "#fff7ed", color: "#9a3412", border: "#fed7aa" },
  Partial: { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
}

const statGradients = [
  "linear-gradient(135deg, #14b8a6, #0d9488)",
  "linear-gradient(135deg, #3b82f6, #2563eb)",
  "linear-gradient(135deg, #f97316, #ea580c)",
  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
]

const statShadows = [
  "0 8px 24px rgba(20,184,166,0.35)",
  "0 8px 24px rgba(59,130,246,0.35)",
  "0 8px 24px rgba(249,115,22,0.35)",
  "0 8px 24px rgba(139,92,246,0.35)",
]

export default function BillingPage() {
  const { patients } = usePatients()
  const bills = patients.flatMap(p =>
    p.bills.map(b => ({
      ...b,
      patient: `${p.firstName} ${p.lastName}`,
      umr: p.uniqueNumber,
      billNumber: b.id,
      billType: b.items,
      billDate: b.date,
      totalAmount: b.amount,
      paidAmount: b.paid,
      dueAmount: b.due,
      paymentStatus: b.status,
    }))
  )

  const totalRevenue = bills.reduce((acc, bill) => acc + Number(bill.totalAmount), 0)
  const totalCollected = bills.reduce((acc, bill) => acc + Number(bill.paidAmount), 0)
  const totalPending = bills.reduce((acc, bill) => acc + Number(bill.dueAmount), 0)

  const statsData = [
    { title: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: IndianRupee },
    { title: "Collected", value: `₦${totalCollected.toLocaleString()}`, icon: CheckCircle },
    { title: "Pending", value: `₦${totalPending.toLocaleString()}`, icon: AlertCircle },
    { title: "Total Bills", value: bills.length.toString(), icon: FileText },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const filteredBills = bills.filter(
    bill =>
      bill.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "24px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{
              fontSize: "26px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #14b8a6, #0d9488)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "4px",
            }}>
              Billing & Invoicing
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Manage bills, payments, and invoices</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "10px", border: "1.5px solid #e2e8f0",
              background: "#fff", color: "#475569", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1" }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e2e8f0" }}
            >
              <Download size={15} /> Export
            </button>
            <Link href="/billing/new">
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "8px 18px", borderRadius: "10px", border: "none",
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                color: "#fff", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", boxShadow: "0 4px 16px rgba(20,184,166,0.4)",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(20,184,166,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,184,166,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                <Plus size={15} /> New Bill
              </button>
            </Link>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.03, y: -3 }}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: statShadows[i],
                border: "1px solid rgba(0,0,0,0.04)",
                transition: "box-shadow 0.3s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                  <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px", fontWeight: 500 }}>{stat.title}</p>
                </div>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: statGradients[i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: statShadows[i],
                }}>
                  <stat.icon size={24} color="#fff" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>All Bills</h2>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="search"
                  placeholder="Search bills..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    paddingLeft: "36px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                    width: "260px", borderRadius: "10px",
                    border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#334155",
                    outline: "none", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "#14b8a6"}
                  onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Bill No.", "Patient", "Type", "Date", "Amount", "Paid", "Due", "Status", "Actions"].map(h => (
                    <th key={h} style={{
                      padding: "12px 16px", textAlign: h === "Amount" || h === "Paid" || h === "Due" || h === "Actions" ? "right" : "left",
                      fontWeight: 700, color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredBills.map((bill, index) => (
                    <motion.tr
                      key={bill.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      style={{
                        borderBottom: "1px solid #f8fafc",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(20,184,166,0.04), rgba(20,184,166,0.02))"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{bill.billNumber}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 600, color: "#1e293b" }}>{bill.patient}</div>
                        <div style={{ fontSize: "11px", color: "#94a3b8" }}>{bill.umr}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                          background: "#f8fafc", border: "1px solid #e2e8f0",
                          fontSize: "12px", color: "#64748b", fontWeight: 500,
                        }}>
                          {bill.billType}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b" }}>{bill.billDate}</td>
                      <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 600, color: "#1e293b" }}>
                        {"₦"}{Number(bill.totalAmount).toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 600, color: "#16a34a" }}>
                        {"₦"}{Number(bill.paidAmount).toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right", fontWeight: 600, color: "#ef4444" }}>
                        {"₦"}{Number(bill.dueAmount).toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        {(() => {
                          const s = statusStyles[bill.paymentStatus] || statusStyles.Pending
                          return (
                            <span style={{
                              display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                              background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                              fontSize: "12px", fontWeight: 600,
                            }}>
                              {bill.paymentStatus}
                            </span>
                          )
                        })()}
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                          <button onClick={() => alert(`Bill: ${bill.billNumber}\nPatient: ${bill.patient}\nAmount: ₦${Number(bill.totalAmount).toLocaleString()}\nPaid: ₦${Number(bill.paidAmount).toLocaleString()}\nDue: ₦${Number(bill.dueAmount).toLocaleString()}\nStatus: ${bill.paymentStatus}`)} style={{
                            width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", transition: "all 0.2s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6" }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Eye size={16} />
                          </button>
                          <button style={{
                            width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", transition: "all 0.2s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.color = "#22c55e" }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Printer size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredBills.length === 0 && (
            <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
              No bills found matching your search.
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
