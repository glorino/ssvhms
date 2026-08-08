"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Pill, Package, AlertTriangle, TrendingUp, ShoppingCart } from "lucide-react"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"
import { filterByPeriod } from "@/lib/filter-utils"

const medicines = [
  { id: "MED001", name: "Paracetamol 500mg", generic: "Paracetamol", category: "Analgesic", manufacturer: "Cipla", batchNo: "BAT001", stock: 500, minStock: 100, purchasePrice: 2, sellingPrice: 5, expiryDate: "2027-12-31", status: "In Stock" },
  { id: "MED002", name: "Amoxicillin 250mg", generic: "Amoxicillin", category: "Antibiotic", manufacturer: "Sun Pharma", batchNo: "BAT002", stock: 200, minStock: 50, purchasePrice: 8, sellingPrice: 15, expiryDate: "2027-06-30", status: "In Stock" },
  { id: "MED003", name: "Metformin 500mg", generic: "Metformin", category: "Antidiabetic", manufacturer: "Dr. Reddy's", batchNo: "BAT003", stock: 30, minStock: 50, purchasePrice: 5, sellingPrice: 10, expiryDate: "2027-09-30", status: "Low Stock" },
  { id: "MED004", name: "Amlodipine 5mg", generic: "Amlodipine", category: "Antihypertensive", manufacturer: "Pfizer", batchNo: "BAT004", stock: 150, minStock: 50, purchasePrice: 8, sellingPrice: 18, expiryDate: "2027-03-31", status: "In Stock" },
  { id: "MED005", name: "Omeprazole 20mg", generic: "Omeprazole", category: "Antacid", manufacturer: "AstraZeneca", batchNo: "BAT005", stock: 5, minStock: 30, purchasePrice: 6, sellingPrice: 12, expiryDate: "2026-12-31", status: "Low Stock" },
  { id: "MED006", name: "Cetirizine 10mg", generic: "Cetirizine", category: "Antihistamine", manufacturer: "Cipla", batchNo: "BAT006", stock: 400, minStock: 100, purchasePrice: 3, sellingPrice: 7, expiryDate: "2027-08-31", status: "In Stock" },
]

const purchases = [
  { id: "PUR001", purchaseNo: "PUR2026001", supplier: "Medico Pharma", invoiceNo: "INV-456", totalAmount: 25000, paidAmount: 25000, date: "2026-08-05", status: "Paid" },
  { id: "PUR002", purchaseNo: "PUR2026002", supplier: "HealthCare Supplies", invoiceNo: "INV-789", totalAmount: 45000, paidAmount: 20000, date: "2026-08-03", status: "Partial" },
  { id: "PUR003", purchaseNo: "PUR2026003", supplier: "Generic Drugs Ltd", invoiceNo: "INV-012", totalAmount: 18000, paidAmount: 18000, date: "2026-08-01", status: "Paid" },
]

const sales = [
  { id: "SAL001", saleNo: "SAL2026001", patient: "Rajesh Kumar", items: 3, totalAmount: 450, paidAmount: 450, date: "2026-08-07", status: "Paid" },
  { id: "SAL002", saleNo: "SAL2026002", patient: "Anita Patel", items: 2, totalAmount: 280, paidAmount: 280, date: "2026-08-07", status: "Paid" },
  { id: "SAL003", saleNo: "SAL2026003", patient: "Suresh Reddy", items: 5, totalAmount: 850, paidAmount: 500, date: "2026-08-06", status: "Partial" },
]

const statsData = [
  { title: "Total Medicines", value: "6", icon: Pill, gradient: "linear-gradient(135deg, #14b8a6, #22c55e)", shadow: "0 8px 32px rgba(20,184,166,0.30)" },
  { title: "Total Stock Units", value: "1,285", icon: Package, gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)", shadow: "0 8px 32px rgba(59,130,246,0.30)" },
  { title: "Low Stock Alert", value: "2", icon: AlertTriangle, gradient: "linear-gradient(135deg, #ef4444, #ec4899)", shadow: "0 8px 32px rgba(239,68,68,0.30)" },
  { title: "Today Sales", value: "₦1,580", icon: TrendingUp, gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)", shadow: "0 8px 32px rgba(139,92,246,0.30)" },
]

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("medicines")
  const [activePeriod, setActivePeriod] = useState("all")

  const filteredMedicines = medicines.filter(
    (med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()) || med.generic.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPurchases = useMemo(() => filterByPeriod(purchases, activePeriod, "date"), [activePeriod])
  const filteredSales = useMemo(() => filterByPeriod(sales, activePeriod, "date"), [activePeriod])

  const getStockLevel = (stock: number, minStock: number) => {
    const ratio = stock / minStock
    if (ratio >= 3) return { color: "#22c55e", background: "linear-gradient(135deg, #dcfce7, #d1fae5)", label: "High" }
    if (ratio >= 1) return { color: "#f97316", background: "linear-gradient(135deg, #fff7ed, #ffedd5)", label: "Medium" }
    return { color: "#ef4444", background: "linear-gradient(135deg, #fef2f2, #fee2e2)", label: "Low" }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return { background: "linear-gradient(135deg, #dcfce7, #d1fae5)", color: "#166534", border: "1px solid #bbf7d0" }
      default:
        return { background: "linear-gradient(135deg, #fef3c7, #fde68a)", color: "#92400e", border: "1px solid #fcd34d" }
    }
  }

  return (
    <AnimatedPage>
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", background: "linear-gradient(135deg, #14b8a6, #22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
              Pharmacy
            </h1>
            <p style={{ color: "#64748b", margin: "4px 0 0 0" }}>Manage medicine inventory, purchases, and sales</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => alert("Exporting pharmacy data...")} style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "white", color: "#475569", cursor: "pointer", fontSize: "14px", fontWeight: "500", transition: "all 0.2s" }}>
              <Download style={{ width: "16px", height: "16px", marginRight: "8px" }} />
              Export
            </button>
            <Link href="/pharmacy/medicines/new">
              <button style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #14b8a6, #22c55e)", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "500", boxShadow: "0 8px 32px rgba(20,184,166,0.30)", transition: "all 0.2s" }}>
                <Plus style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                Add Medicine
              </button>
            </Link>
          </div>
        </div>

        <StaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "24px" }}>
          {statsData.map((stat) => (
            <StaggerItem key={stat.title}>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.8)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: stat.gradient }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "32px", fontWeight: "bold", color: "#1e293b" }}>{stat.value}</div>
                      <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0 0" }}>{stat.title}</p>
                    </div>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: stat.gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: stat.shadow }}>
                      <stat.icon style={{ width: "24px", height: "24px", color: "white" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", background: "white", padding: "8px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.8)" }}>
            {[
              { key: "medicines", label: "Medicines", gradient: "linear-gradient(135deg, #14b8a6, #22c55e)" },
              { key: "purchases", label: "Purchases", gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)" },
              { key: "sales", label: "Sales", gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: activeTab === tab.key ? tab.gradient : "transparent",
                  color: activeTab === tab.key ? "white" : "#64748b",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Period Filter Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            {[
              { key: "all", label: "All Time" },
              { key: "today", label: "Today" },
              { key: "week", label: "This Week" },
              { key: "month", label: "This Month" },
            ].map((period) => (
              <button
                key={period.key}
                onClick={() => setActivePeriod(period.key)}
                style={{
                  padding: "8px 18px", borderRadius: "20px",
                  border: activePeriod === period.key ? "1.5px solid #14b8a6" : "1.5px solid #e2e8f0",
                  background: activePeriod === period.key ? "linear-gradient(135deg, #14b8a6, #22c55e)" : "#fff",
                  color: activePeriod === period.key ? "#fff" : "#64748b",
                  cursor: "pointer", fontSize: "13px", fontWeight: 600, transition: "all 0.2s",
                  boxShadow: activePeriod === period.key ? "0 4px 12px rgba(20,184,166,0.3)" : "none",
                }}
              >
                {period.label}
              </button>
            ))}
          </div>

          {activeTab === "medicines" && (
            <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.8)", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #1e293b, #475569)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>Medicine Inventory</h2>
                <div style={{ position: "relative" }}>
                  <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#94a3b8" }} />
                  <input
                    type="search"
                    placeholder="Search medicines..."
                    style={{ paddingLeft: "36px", width: "256px", padding: "10px 12px 10px 36px", borderRadius: "12px", border: "1px solid #e2e8f0", outline: "none", fontSize: "14px", transition: "all 0.2s" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ padding: "0 24px 24px 24px", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Medicine</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Generic</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Category</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Batch</th>
                      <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Stock</th>
                      <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Price</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Expiry</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Status</th>
                      <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMedicines.map((med, index) => {
                      const stockLevel = getStockLevel(med.stock, med.minStock)
                      return (
                        <motion.tr
                          key={med.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          style={{ borderBottom: "1px solid #f1f5f9", transition: "all 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(90deg, rgba(20,184,166,0.05), rgba(34,197,94,0.05))"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <td style={{ padding: "14px 16px" }}>
                            <div>
                              <p style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", margin: 0 }}>{med.name}</p>
                              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}>{med.manufacturer}</p>
                            </div>
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{med.generic}</td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #e2e8f0", fontSize: "12px", color: "#64748b", fontWeight: "500" }}>{med.category}</span>
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{med.batchNo}</td>
                          <td style={{ padding: "14px 16px", textAlign: "right" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                              <span style={{ padding: "2px 8px", borderRadius: "8px", background: stockLevel.background, color: stockLevel.color, fontSize: "12px", fontWeight: "600" }}>{stockLevel.label}</span>
                              <span style={{ fontSize: "14px", fontWeight: "600", color: med.stock < med.minStock ? "#ef4444" : "#334155" }}>{med.stock}</span>
                            </div>
                          </td>
                          <td style={{ padding: "14px 16px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#334155" }}>₦{med.sellingPrice}</td>
                          <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{med.expiryDate}</td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ ...getPaymentBadge(med.status === "In Stock" ? "Paid" : "Partial"), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                              {med.status}
                            </span>
                          </td>
                          <td style={{ padding: "14px 16px", textAlign: "right" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                              <button onClick={() => alert("View: " + med.name)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6" }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                              >
                                <Eye style={{ width: "16px", height: "16px" }} />
                              </button>
                              <button onClick={() => alert("Edit: " + med.name)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "none", background: "transparent", color: "#64748b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0fdfa"; e.currentTarget.style.color = "#14b8a6" }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                              >
                                <Edit style={{ width: "16px", height: "16px" }} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "purchases" && (
            <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.8)", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #1e293b, #475569)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>Purchase History</h2>
                <Link href="/pharmacy/purchases/new">
                  <button style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "500", boxShadow: "0 8px 32px rgba(59,130,246,0.30)", transition: "all 0.2s" }}>
                    <ShoppingCart style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                    New Purchase
                  </button>
                </Link>
              </div>
              <div style={{ padding: "0 24px 24px 24px", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Purchase No.</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Supplier</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Invoice</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Date</th>
                      <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Amount</th>
                      <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Paid</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPurchases.map((pur, index) => (
                      <motion.tr
                        key={pur.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f1f5f9", transition: "all 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(90deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "500", color: "#334155" }}>{pur.purchaseNo}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{pur.supplier}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{pur.invoiceNo}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{pur.date}</td>
                        <td style={{ padding: "14px 16px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#334155" }}>₦{pur.totalAmount.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#334155" }}>₦{pur.paidAmount.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ ...getPaymentBadge(pur.status), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            {pur.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "sales" && (
            <div style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.8)", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "600", background: "linear-gradient(135deg, #1e293b, #475569)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>Sales History</h2>
              </div>
              <div style={{ padding: "0 24px 24px 24px", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Sale No.</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Patient</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Items</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Date</th>
                      <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Amount</th>
                      <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Paid</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid #f1f5f9" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map((sale, index) => (
                      <motion.tr
                        key={sale.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f1f5f9", transition: "all 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(90deg, rgba(139,92,246,0.05), rgba(168,85,247,0.05))"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "500", color: "#334155" }}>{sale.saleNo}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{sale.patient}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{sale.items}</td>
                        <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b" }}>{sale.date}</td>
                        <td style={{ padding: "14px 16px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#334155" }}>₦{sale.totalAmount.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px", textAlign: "right", fontSize: "14px", fontWeight: "500", color: "#334155" }}>₦{sale.paidAmount.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ ...getPaymentBadge(sale.status), padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                            {sale.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatedPage>
  )
}