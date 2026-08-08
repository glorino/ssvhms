"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Download, Eye, Printer, Plus } from "lucide-react"
import Link from "next/link"

const bills = [
  { id: "BILL001", billNo: "BL2026001", patient: "Adaeze Okonkwo", umr: "UMR2026001", type: "OPD", amount: 45000, paid: 45000, due: 0, date: "2026-08-07", status: "Paid" },
  { id: "BILL002", billNo: "BL2026002", patient: "Emeka Nwosu", umr: "UMR2026002", type: "IPD", amount: 870000, paid: 500000, due: 370000, date: "2026-08-06", status: "Partial" },
  { id: "BILL003", billNo: "BL2026003", patient: "Fatima Abubakar", umr: "UMR2026003", type: "Pathology", amount: 32000, paid: 32000, due: 0, date: "2026-08-05", status: "Paid" },
  { id: "BILL004", billNo: "BL2026004", patient: "Oluwaseun Adebayo", umr: "UMR2026004", type: "Pharmacy", amount: 185000, paid: 0, due: 185000, date: "2026-08-04", status: "Pending" },
  { id: "BILL005", billNo: "BL2026005", patient: "Chidinma Eze", umr: "UMR2026005", type: "OPD", amount: 28000, paid: 28000, due: 0, date: "2026-08-03", status: "Paid" },
  { id: "BILL006", billNo: "BL2026006", patient: "Ibrahim Musa", umr: "UMR2026006", type: "IPD", amount: 620000, paid: 480000, due: 140000, date: "2026-08-02", status: "Partial" },
]

const totalRevenue = bills.reduce((acc, b) => acc + b.amount, 0)
const totalCollected = bills.reduce((acc, b) => acc + b.paid, 0)
const totalPending = bills.reduce((acc, b) => acc + b.due, 0)

const stats = [
  { title: "Total Revenue", value: formatNaira(totalRevenue), color: "#14b8a6", bg: "#f0fdfa" },
  { title: "Collected", value: formatNaira(totalCollected), color: "#059669", bg: "#ecfdf5" },
  { title: "Pending", value: formatNaira(totalPending), color: "#d97706", bg: "#fffbeb" },
  { title: "Overdue", value: formatNaira(bills.filter((b) => b.status === "Pending").reduce((acc, b) => acc + b.due, 0)), color: "#dc2626", bg: "#fef2f2" },
]

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  Paid: { bg: "#ecfdf5", color: "#059669", border: "#a7f3d0" },
  Partial: { bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  Pending: { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
}

const typeStyles: Record<string, { bg: string; color: string; border: string }> = {
  OPD: { bg: "#f0fdfa", color: "#14b8a6", border: "#99f6e4" },
  IPD: { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  Pathology: { bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
  Pharmacy: { bg: "#fff7ed", color: "#ea580c", border: "#fed7aa" },
}

function formatNaira(val: number) {
  return `₦${val.toLocaleString()}`
}

export default function AllBillsPage() {
  const [search, setSearch] = useState("")

  const filtered = bills.filter(
    (b) =>
      b.patient.toLowerCase().includes(search.toLowerCase()) ||
      b.billNo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: "0", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#14b8a6", margin: 0 }}>All Bills</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "14px" }}>View and manage all hospital bills</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              background: "#fff",
              color: "#334155",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Download size={14} /> Export
          </button>
          <Link href="/billing/new">
            <button
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                color: "#fff",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 14px rgba(20,184,166,0.35)",
              }}
            >
              <Plus size={14} /> New Bill
            </button>
          </Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {stats.map((s) => (
          <Card key={s.title} style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <CardContent style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#1e293b" }}>{s.value}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{s.title}</div>
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: s.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: s.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card style={{ border: "none", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <CardContent style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>Bill Records</h2>
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                }}
              />
              <input
                type="text"
                placeholder="Search bills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "8px 12px 8px 36px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "13px",
                  width: "240px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  {["Bill No", "Patient", "Type", "Amount", "Paid", "Due", "Date", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 14px",
                        textAlign: h === "Amount" || h === "Paid" || h === "Due" || h === "Actions" ? "right" : "left",
                        fontWeight: 600,
                        color: "#475569",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((bill, i) => (
                  <tr
                    key={bill.id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: i % 2 === 0 ? "#fff" : "#f8fafc",
                    }}
                  >
                    <td style={{ padding: "14px", fontWeight: 600, color: "#1e293b" }}>{bill.billNo}</td>
                    <td style={{ padding: "14px" }}>
                      <div style={{ fontWeight: 500, color: "#1e293b" }}>{bill.patient}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{bill.umr}</div>
                    </td>
                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background: typeStyles[bill.type]?.bg || "#f1f5f9",
                          color: typeStyles[bill.type]?.color || "#64748b",
                          border: `1px solid ${typeStyles[bill.type]?.border || "#e2e8f0"}`,
                        }}
                      >
                        {bill.type}
                      </span>
                    </td>
                    <td style={{ padding: "14px", textAlign: "right", fontWeight: 600, color: "#1e293b" }}>
                      {formatNaira(bill.amount)}
                    </td>
                    <td style={{ padding: "14px", textAlign: "right", fontWeight: 600, color: "#059669" }}>
                      {formatNaira(bill.paid)}
                    </td>
                    <td style={{ padding: "14px", textAlign: "right", fontWeight: 600, color: bill.due > 0 ? "#dc2626" : "#94a3b8" }}>
                      {formatNaira(bill.due)}
                    </td>
                    <td style={{ padding: "14px", color: "#64748b", whiteSpace: "nowrap" }}>{bill.date}</td>
                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background: statusStyles[bill.status]?.bg || "#f1f5f9",
                          color: statusStyles[bill.status]?.color || "#64748b",
                          border: `1px solid ${statusStyles[bill.status]?.border || "#e2e8f0"}`,
                        }}
                      >
                        {bill.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                        <button
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "none",
                            borderRadius: "6px",
                            background: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#64748b",
                          }}
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "none",
                            borderRadius: "6px",
                            background: "transparent",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#64748b",
                          }}
                          title="Print"
                        >
                          <Printer size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No bills found</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
