"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Droplet, CheckCircle, Clock, AlertCircle, Heart } from "lucide-react"
import { filterByPeriod } from "@/lib/filter-utils"

const bloodInventory = [
  { bloodGroup: "A+", units: 25, minUnits: 10, lastUpdated: "2026-08-07" },
  { bloodGroup: "A-", units: 8, minUnits: 5, lastUpdated: "2026-08-07" },
  { bloodGroup: "B+", units: 30, minUnits: 10, lastUpdated: "2026-08-07" },
  { bloodGroup: "B-", units: 12, minUnits: 5, lastUpdated: "2026-08-06" },
  { bloodGroup: "AB+", units: 6, minUnits: 3, lastUpdated: "2026-08-06" },
  { bloodGroup: "AB-", units: 3, minUnits: 2, lastUpdated: "2026-08-05" },
  { bloodGroup: "O+", units: 35, minUnits: 15, lastUpdated: "2026-08-07" },
  { bloodGroup: "O-", units: 10, minUnits: 8, lastUpdated: "2026-08-07" },
]

const donations = [
  { id: "DON001", donorName: "Rajesh Kumar", bloodGroup: "A+", units: 1, donationDate: "2026-08-07", hemoglobin: "14.2", bp: "120/80", status: "Approved" },
  { id: "DON002", donorName: "Vikram Rao", bloodGroup: "B+", units: 1, donationDate: "2026-08-06", hemoglobin: "13.8", bp: "118/76", status: "Approved" },
  { id: "DON003", donorName: "Anita Sharma", bloodGroup: "O+", units: 1, donationDate: "2026-08-06", hemoglobin: "12.5", bp: "110/70", status: "Approved" },
  { id: "DON004", donorName: "Suresh Reddy", bloodGroup: "A-", units: 1, donationDate: "2026-08-05", hemoglobin: "15.0", bp: "125/82", status: "Approved" },
  { id: "DON005", donorName: "Mohammed Ali", bloodGroup: "AB+", units: 1, donationDate: "2026-08-05", hemoglobin: "11.8", bp: "108/68", status: "Rejected" },
  { id: "DON006", donorName: "Kavita Joshi", bloodGroup: "B-", units: 1, donationDate: "2026-08-04", hemoglobin: "13.2", bp: "115/75", status: "Approved" },
]

const issues = [
  { id: "ISS001", issueNumber: "BI2026001", patient: "Rajesh Kumar", bloodGroup: "A+", units: 2, issueDate: "2026-08-07", doctor: "Dr. Priya Sharma", department: "Cardiology", status: "Completed" },
  { id: "ISS002", issueNumber: "BI2026002", patient: "Anita Patel", bloodGroup: "O+", units: 1, issueDate: "2026-08-06", doctor: "Dr. Amit Singh", department: "Orthopedics", status: "Completed" },
  { id: "ISS003", issueNumber: "BI2026003", patient: "Suresh Reddy", bloodGroup: "B+", units: 3, issueDate: "2026-08-06", doctor: "Dr. Neha Gupta", department: "Neurology", status: "Pending" },
  { id: "ISS004", issueNumber: "BI2026004", patient: "Priya Verma", bloodGroup: "AB+", units: 1, issueDate: "2026-08-05", doctor: "Dr. Rahul Joshi", department: "Oncology", status: "Completed" },
  { id: "ISS005", issueNumber: "BI2026005", patient: "Mohammed Ali", bloodGroup: "O-", units: 2, issueDate: "2026-08-05", doctor: "Dr. Sanjay Mehta", department: "General Medicine", status: "Completed" },
]

const totalUnits = bloodInventory.reduce((acc, item) => acc + item.units, 0)
const lowStockGroups = bloodInventory.filter((item) => item.units < item.minUnits).length
const donationsToday = donations.filter((d) => d.donationDate === "2026-08-07").length
const issuesToday = issues.filter((i) => i.issueDate === "2026-08-07").length

const statsData = [
  { title: "Total Units", value: totalUnits, icon: Droplet, gradient: "linear-gradient(135deg, #ef4444, #f43f5e)", shadow: "0 8px 24px rgba(239,68,68,0.35)" },
  { title: "Donations Today", value: donationsToday, icon: Heart, gradient: "linear-gradient(135deg, #ec4899, #f43f5e)", shadow: "0 8px 24px rgba(236,72,153,0.35)" },
  { title: "Issues Today", value: issuesToday, icon: CheckCircle, gradient: "linear-gradient(135deg, #22c55e, #16a34a)", shadow: "0 8px 24px rgba(34,197,94,0.35)" },
  { title: "Low Stock Groups", value: lowStockGroups, icon: AlertCircle, gradient: "linear-gradient(135deg, #f97316, #ef4444)", shadow: "0 8px 24px rgba(249,115,22,0.35)" },
]

export default function BloodBankPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("donations")
  const [activePeriod, setActivePeriod] = useState("all")

  const periodFilteredDonations = useMemo(() => filterByPeriod(donations, activePeriod, "donationDate"), [activePeriod])
  const periodFilteredIssues = useMemo(() => filterByPeriod(issues, activePeriod, "issueDate"), [activePeriod])

  const filteredDonations = periodFilteredDonations.filter(
    (donation) => donation.donorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredIssues = periodFilteredIssues.filter(
    (issue) => issue.patient.toLowerCase().includes(searchTerm.toLowerCase()) || issue.issueNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "24px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Gradient Banner */}
        <div style={{
          background: "linear-gradient(135deg, #ef4444, #f43f5e)",
          borderRadius: "20px",
          padding: "32px",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, right: 0, width: "300px", height: "300px",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
            borderRadius: "50%", transform: "translate(30%, -30%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, width: "200px", height: "200px",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%", transform: "translate(-30%, 30%)",
          }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", position: "relative", zIndex: 1 }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0 }}>Blood Bank</h1>
              <p style={{ opacity: 0.9, margin: "6px 0 0 0", fontSize: "14px" }}>Manage blood donations, issues, and inventory</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={() => alert("Exporting blood bank data...")} style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "9px 18px", borderRadius: "10px", border: "1.5px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.15)", color: "white", fontSize: "13px", fontWeight: 600,
                cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.2s",
              }}>
                <Download size={15} /> Export
              </button>
              <Link href="/blood-bank/donate">
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "9px 20px", borderRadius: "10px", border: "none",
                  background: "white", color: "#ef4444", fontSize: "13px", fontWeight: 600,
                  cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", transition: "all 0.2s",
                }}>
                  <Plus size={15} /> Record Donation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
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
                border: activePeriod === period.key ? "1.5px solid #ef4444" : "1.5px solid #e2e8f0",
                background: activePeriod === period.key ? "linear-gradient(135deg, #ef4444, #f43f5e)" : "white",
                color: activePeriod === period.key ? "white" : "#64748b",
                cursor: "pointer", fontSize: "13px", fontWeight: 600, transition: "all 0.2s",
                boxShadow: activePeriod === period.key ? "0 4px 12px rgba(239,68,68,0.3)" : "none",
              }}
            >
              {period.label}
            </button>
          ))}
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
                background: "#fff", borderRadius: "16px", padding: "20px",
                boxShadow: stat.shadow, border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                  <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px", fontWeight: 500 }}>{stat.title}</p>
                </div>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: stat.gradient,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: stat.shadow,
                }}>
                  <stat.icon size={24} color="#fff" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blood Group Availability Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: "#fff", borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
          }}
        >
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Blood Group Availability</h2>
          </div>
          <div style={{ padding: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "14px" }}>
              {bloodInventory.map((item, index) => (
                <motion.div
                  key={item.bloodGroup}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  style={{
                    borderRadius: "14px",
                    padding: "18px 14px",
                    textAlign: "center",
                    border: item.units < item.minUnits ? "2px solid #fecaca" : "2px solid #f1f5f9",
                    background: item.units < item.minUnits ? "linear-gradient(135deg, #fef2f2, #fff1f2)" : "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.2s",
                  }}
                >
                  <p style={{ fontSize: "18px", fontWeight: 800, color: "#ef4444", margin: 0 }}>{item.bloodGroup}</p>
                  <p style={{ fontSize: "28px", fontWeight: 800, color: item.units < item.minUnits ? "#ef4444" : "#1e293b", margin: "4px 0 2px" }}>{item.units}</p>
                  <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>units</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <div style={{
          display: "flex", gap: "8px", background: "white", padding: "6px",
          borderRadius: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.04)", width: "fit-content",
        }}>
          {[
            { key: "donations", label: "Donations", gradient: "linear-gradient(135deg, #ef4444, #f43f5e)" },
            { key: "issues", label: "Issues", gradient: "linear-gradient(135deg, #ec4899, #f43f5e)" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "10px 28px", borderRadius: "10px", border: "none",
                background: activeTab === tab.key ? tab.gradient : "transparent",
                color: activeTab === tab.key ? "white" : "#64748b",
                cursor: "pointer", fontSize: "14px", fontWeight: 600, transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Donations Table */}
        {activeTab === "donations" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Donation Records</h2>
                <div style={{ position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input
                    type="search"
                    placeholder="Search donors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      paddingLeft: "36px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                      width: "260px", borderRadius: "10px",
                      border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#334155",
                      outline: "none", transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#ef4444")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                </div>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Donor Name", "Blood Group", "Units", "Donation Date", "Hb (g/dL)", "BP", "Status", "Actions"].map((h) => (
                      <th key={h} style={{
                        padding: "12px 16px",
                        textAlign: h === "Actions" ? "right" : "left",
                        fontWeight: 700, color: "#64748b", fontSize: "11px",
                        textTransform: "uppercase", letterSpacing: "0.05em",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredDonations.map((donation, index) => (
                      <motion.tr
                        key={donation.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg, rgba(239,68,68,0.04), rgba(244,63,94,0.02))")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{donation.donorName}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                            background: "#fef2f2", border: "1px solid #fecaca",
                            fontSize: "12px", color: "#ef4444", fontWeight: 600,
                          }}>
                            {donation.bloodGroup}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{donation.units}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{donation.donationDate}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{donation.hemoglobin}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{donation.bp}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                            background: donation.status === "Approved" ? "#dcfce7" : "#fef2f2",
                            color: donation.status === "Approved" ? "#166534" : "#991b1b",
                            border: `1px solid ${donation.status === "Approved" ? "#bbf7d0" : "#fecaca"}`,
                            fontSize: "12px", fontWeight: 600,
                          }}>
                            {donation.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", textAlign: "right" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                            <button onClick={() => alert("View donation: " + donation.donorName)} style={{
                              width: "32px", height: "32px", borderRadius: "8px", border: "none",
                              background: "transparent", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#64748b", transition: "all 0.2s",
                            }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6" }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                            >
                              <Eye size={16} />
                            </button>
                            <button onClick={() => alert("Edit donation: " + donation.donorName)} style={{
                              width: "32px", height: "32px", borderRadius: "8px", border: "none",
                              background: "transparent", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#64748b", transition: "all 0.2s",
                            }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#fff1f2"; e.currentTarget.style.color = "#ef4444" }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                            >
                              <Edit size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {filteredDonations.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No donations found matching your search.
              </div>
            )}
          </motion.div>
        )}

        {/* Issues Table */}
        {activeTab === "issues" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Issue Records</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ position: "relative" }}>
                    <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                    <input
                      type="search"
                      placeholder="Search issues..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        paddingLeft: "36px", paddingRight: "14px", paddingTop: "9px", paddingBottom: "9px",
                        width: "260px", borderRadius: "10px",
                        border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#334155",
                        outline: "none", transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#ec4899")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                  <Link href="/blood-bank/issue">
                    <button style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      padding: "9px 20px", borderRadius: "10px", border: "none",
                      background: "linear-gradient(135deg, #ec4899, #f43f5e)",
                      color: "#fff", fontSize: "13px", fontWeight: 600,
                      cursor: "pointer", boxShadow: "0 4px 16px rgba(236,72,153,0.4)",
                      transition: "all 0.2s",
                    }}>
                      <Plus size={15} /> New Issue
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Issue No.", "Patient", "Blood Group", "Units", "Issue Date", "Doctor", "Department", "Status", "Actions"].map((h) => (
                      <th key={h} style={{
                        padding: "12px 16px",
                        textAlign: h === "Actions" ? "right" : "left",
                        fontWeight: 700, color: "#64748b", fontSize: "11px",
                        textTransform: "uppercase", letterSpacing: "0.05em",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredIssues.map((issue, index) => (
                      <motion.tr
                        key={issue.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg, rgba(236,72,153,0.04), rgba(244,63,94,0.02))")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{issue.issueNumber}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{issue.patient}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                            background: "#fef2f2", border: "1px solid #fecaca",
                            fontSize: "12px", color: "#ef4444", fontWeight: 600,
                          }}>
                            {issue.bloodGroup}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{issue.units}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{issue.issueDate}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{issue.doctor}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{issue.department}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                            background: issue.status === "Completed" ? "#dcfce7" : "#fff7ed",
                            color: issue.status === "Completed" ? "#166534" : "#9a3412",
                            border: `1px solid ${issue.status === "Completed" ? "#bbf7d0" : "#fed7aa"}`,
                            fontSize: "12px", fontWeight: 600,
                          }}>
                            {issue.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", textAlign: "right" }}>
                          <button onClick={() => alert("View issue: " + issue.issueNumber)} style={{
                            width: "32px", height: "32px", borderRadius: "8px", border: "none",
                            background: "transparent", cursor: "pointer",
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            color: "#64748b", transition: "all 0.2s",
                          }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6" }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b" }}
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {filteredIssues.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No issues found matching your search.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
