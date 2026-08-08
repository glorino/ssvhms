"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Download, Receipt, Eye } from "lucide-react"

const payments = [
  { id: "PAY001", patient: "Adaeze Okonkwo", billNo: "BL2026001", amount: 45000, method: "Card", date: "2026-08-07", receipt: "RCP001" },
  { id: "PAY002", patient: "Emeka Nwosu", billNo: "BL2026002", amount: 500000, method: "Cash", date: "2026-08-06", receipt: "RCP002" },
  { id: "PAY003", patient: "Fatima Abubakar", billNo: "BL2026003", amount: 32000, method: "Insurance", date: "2026-08-05", receipt: "RCP003" },
  { id: "PAY004", patient: "Chidinma Eze", billNo: "BL2026005", amount: 28000, method: "Card", date: "2026-08-03", receipt: "RCP004" },
  { id: "PAY005", patient: "Ibrahim Musa", billNo: "BL2026006", amount: 480000, method: "Cash", date: "2026-08-02", receipt: "RCP005" },
  { id: "PAY006", patient: "Emeka Nwosu", billNo: "BL2026002", amount: 200000, method: "Card", date: "2026-08-01", receipt: "RCP006" },
]

const stats = [
  { title: "Total Payments", value: "₦2,950,000", color: "#14b8a6", bg: "#f0fdfa" },
  { title: "Cash", value: "₦1,200,000", color: "#059669", bg: "#ecfdf5" },
  { title: "Card", value: "₦1,500,000", color: "#2563eb", bg: "#eff6ff" },
  { title: "Insurance", value: "₦250,000", color: "#9333ea", bg: "#fdf4ff" },
]

const methodStyles: Record<string, { bg: string; color: string; border: string }> = {
  Cash: { bg: "#ecfdf5", color: "#059669", border: "#a7f3d0" },
  Card: { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  Insurance: { bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
}

function formatNaira(val: number) {
  return `₦${val.toLocaleString()}`
}

export default function PaymentsPage() {
  const [search, setSearch] = useState("")

  const filtered = payments.filter(
    (p) =>
      p.patient.toLowerCase().includes(search.toLowerCase()) ||
      p.billNo.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: "0", maxWidth: "1400px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#14b8a6", margin: 0 }}>Payment History</h1>
          <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "14px" }}>Track all patient payments and receipts</p>
        </div>
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
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>Payment Records</h2>
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
                placeholder="Search payments..."
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
                  {["Payment ID", "Patient", "Bill No", "Amount", "Method", "Date", "Receipt", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 14px",
                        textAlign: h === "Amount" || h === "Actions" ? "right" : "left",
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
                {filtered.map((pay, i) => (
                  <tr
                    key={pay.id}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      background: i % 2 === 0 ? "#fff" : "#f8fafc",
                    }}
                  >
                    <td style={{ padding: "14px", fontWeight: 600, color: "#1e293b" }}>{pay.id}</td>
                    <td style={{ padding: "14px", fontWeight: 500, color: "#1e293b" }}>{pay.patient}</td>
                    <td style={{ padding: "14px", color: "#475569" }}>{pay.billNo}</td>
                    <td style={{ padding: "14px", textAlign: "right", fontWeight: 600, color: "#14b8a6" }}>
                      {formatNaira(pay.amount)}
                    </td>
                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background: methodStyles[pay.method]?.bg || "#f1f5f9",
                          color: methodStyles[pay.method]?.color || "#64748b",
                          border: `1px solid ${methodStyles[pay.method]?.border || "#e2e8f0"}`,
                        }}
                      >
                        {pay.method}
                      </span>
                    </td>
                    <td style={{ padding: "14px", color: "#64748b", whiteSpace: "nowrap" }}>{pay.date}</td>
                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background: "#f0fdfa",
                          color: "#14b8a6",
                          border: "1px solid #99f6e4",
                        }}
                      >
                        <Receipt size={10} /> {pay.receipt}
                      </span>
                    </td>
                    <td style={{ padding: "14px", textAlign: "right" }}>
                      <button
                        onClick={() => alert(`Payment: ${pay.id}\nPatient: ${pay.patient}\nBill: ${pay.billNo}\nAmount: ${formatNaira(pay.amount)}\nMethod: ${pay.method}\nDate: ${pay.date}\nReceipt: ${pay.receipt}`)}
                        style={{
                          width: "30px",
                          height: "30px",
                          border: "none",
                          borderRadius: "6px",
                          background: "transparent",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#64748b",
                        }}
                        title="View receipt"
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>No payments found</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
