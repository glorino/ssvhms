"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Users, Phone, Mail, CheckCircle } from "lucide-react"

const stats = [
  { title: "Visitors Today", value: "128", icon: Users, gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)", shadow: "0 8px 24px rgba(20,184,166,0.35)" },
  { title: "Currently In", value: "4", icon: CheckCircle, gradient: "linear-gradient(135deg, #22c55e, #16a34a)", shadow: "0 8px 24px rgba(34,197,94,0.35)" },
  { title: "Calls Today", value: "5", icon: Phone, gradient: "linear-gradient(135deg, #f59e0b, #d97706)", shadow: "0 8px 24px rgba(245,158,11,0.35)" },
  { title: "Postal Items", value: "5", icon: Mail, gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)", shadow: "0 8px 24px rgba(139,92,246,0.35)" },
]

const visitors = [
  { id: "VIS001", visitorName: "Rahul Sharma", contact: "9876543230", patientName: "Rajesh Kumar", relation: "Son", purpose: "Visiting", inTime: "08:30 AM", outTime: "-", floor: "3rd Floor", status: "In" },
  { id: "VIS002", visitorName: "Priya Mehta", contact: "9876543231", patientName: "Anita Patel", relation: "Daughter", purpose: "Attendant", inTime: "09:00 AM", outTime: "-", floor: "2nd Floor", status: "In" },
  { id: "VIS003", visitorName: "Vikram Singh", contact: "9876543232", patientName: "Suresh Reddy", relation: "Friend", purpose: "Visiting", inTime: "10:15 AM", outTime: "11:30 AM", floor: "4th Floor", status: "Out" },
  { id: "VIS004", visitorName: "Kavita Rao", contact: "9876543233", patientName: "Priya Verma", relation: "Sister", purpose: "Attendant", inTime: "07:45 AM", outTime: "-", floor: "1st Floor", status: "In" },
  { id: "VIS005", visitorName: "Mohammed Khan", contact: "9876543234", patientName: "Mohammed Ali", relation: "Brother", purpose: "Visiting", inTime: "11:00 AM", outTime: "12:00 PM", floor: "3rd Floor", status: "Out" },
  { id: "VIS006", visitorName: "Deepak Verma", contact: "9876543235", patientName: "Deepika Singh", relation: "Husband", purpose: "Attendant", inTime: "06:30 AM", outTime: "-", floor: "ICU", status: "In" },
]

const phoneCalls = [
  { id: "PHN001", callerName: "Rajesh Kumar", contact: "9876543240", department: "Reception", callTime: "08:15 AM", duration: "3 min", purpose: "Appointment Inquiry", handledBy: "Sunita", status: "Resolved" },
  { id: "PHN002", callerName: "Anita Sharma", contact: "9876543241", department: "OPD", callTime: "09:30 AM", duration: "5 min", purpose: "Report Inquiry", handledBy: "Meena", status: "Resolved" },
  { id: "PHN003", callerName: "Suresh Patel", contact: "9876543242", department: "Emergency", callTime: "10:45 AM", duration: "8 min", purpose: "Emergency", handledBy: "Rahul", status: "Escalated" },
  { id: "PHN004", callerName: "Priya Joshi", contact: "9876543243", department: "Billing", callTime: "11:20 AM", duration: "4 min", purpose: "Bill Query", handledBy: "Sunita", status: "Resolved" },
  { id: "PHN005", callerName: "Vikram Mehta", contact: "9876543244", department: "Reception", callTime: "02:00 PM", duration: "2 min", purpose: "Direction Inquiry", handledBy: "Meena", status: "Resolved" },
]

const postal = [
  { id: "PST001", trackingNumber: "IND2026001", type: "Incoming", sender: "Medico Pharma", recipient: "Pharmacy Dept", description: "Medicine Delivery", receivedDate: "2026-08-07", receivedBy: "Sunita", status: "Delivered" },
  { id: "PST002", trackingNumber: "IND2026002", type: "Outgoing", sender: "SSV Hospital", recipient: "Insurance Corp", description: "Claim Documents", receivedDate: "2026-08-07", receivedBy: "Rahul", status: "Dispatched" },
  { id: "PST003", trackingNumber: "IND2026003", type: "Incoming", sender: "Health Dept", recipient: "Admin Office", description: "License Renewal", receivedDate: "2026-08-06", receivedBy: "Meena", status: "Delivered" },
  { id: "PST004", trackingNumber: "IND2026004", type: "Outgoing", sender: "SSV Hospital", recipient: "Lab Supplier", description: "Reagent Order", receivedDate: "2026-08-06", receivedBy: "Sunita", status: "Dispatched" },
  { id: "PST005", trackingNumber: "IND2026005", type: "Incoming", sender: "Blood Bank Assoc", recipient: "Blood Bank", description: "Certification Docs", receivedDate: "2026-08-05", receivedBy: "Rahul", status: "Delivered" },
]

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  In: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  Out: { bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0" },
  Resolved: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  Escalated: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
  Delivered: { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  Dispatched: { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
  Incoming: { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
  Outgoing: { bg: "#fff7ed", color: "#9a3412", border: "#fed7aa" },
}

const tabs = ["Visitors", "Phone Calls", "Postal"] as const

export default function FrontOfficePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"Visitors" | "Phone Calls" | "Postal">("Visitors")

  const filteredVisitors = visitors.filter(
    v => v.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) || v.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCalls = phoneCalls.filter(
    c => c.callerName.toLowerCase().includes(searchTerm.toLowerCase()) || c.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPostal = postal.filter(
    p => p.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) || p.sender.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Gradient Banner */}
      <div style={{
        background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
        padding: "32px 40px 28px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-40%", right: "-5%", width: "300px", height: "300px",
          borderRadius: "50%", background: "rgba(255,255,255,0.08)",
        }} />
        <div style={{
          position: "absolute", bottom: "-30%", left: "10%", width: "200px", height: "200px",
          borderRadius: "50%", background: "rgba(255,255,255,0.06)",
        }} />
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>
              Front Office
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>Manage visitors, phone calls, and postal services</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "9px 18px", borderRadius: "10px", border: "1.5px solid rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.25)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)" }}
            >
              <Download size={15} /> Export
            </button>
            <Link href="/front-office/visitor/new">
              <button style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "9px 20px", borderRadius: "10px", border: "none",
                background: "#fff", color: "#14b8a6", fontSize: "13px", fontWeight: 700,
                cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.2)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)" }}
              >
                <Plus size={15} /> Register Visitor
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 40px" }}>
        {/* Filter Bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px",
          background: "#fff", padding: "8px", borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)",
          width: "fit-content",
        }}>
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: "7px 18px", borderRadius: "8px", border: "none", fontSize: "13px",
                fontWeight: 600, cursor: "pointer", transition: "all 0.25s",
                background: activeTab === t ? "linear-gradient(135deg, #14b8a6, #06b6d4)" : "transparent",
                color: activeTab === t ? "#fff" : "#64748b",
                boxShadow: activeTab === t ? "0 4px 12px rgba(20,184,166,0.3)" : "none",
              }}
              onMouseEnter={e => { if (activeTab !== t) e.currentTarget.style.background = "#f0fdfa" }}
              onMouseLeave={e => { if (activeTab !== t) e.currentTarget.style.background = "transparent" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring" as const, stiffness: 300 }}
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                background: "#fff", borderRadius: "16px", padding: "20px",
                boxShadow: stat.shadow, border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "26px", fontWeight: 800, color: "#1e293b" }}>{stat.value}</div>
                  <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px", fontWeight: 500 }}>{stat.title}</p>
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

        {/* Visitors Table */}
        {activeTab === "Visitors" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Visitor Log</h2>
                <div style={{ position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input
                    type="search"
                    placeholder="Search visitors..."
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
                    {["Visitor", "Contact", "Patient", "Relation", "Purpose", "In Time", "Out Time", "Floor", "Status"].map(h => (
                      <th key={h} style={{
                        padding: "12px 16px", textAlign: "left",
                        fontWeight: 700, color: "#64748b", fontSize: "11px",
                        textTransform: "uppercase" as const, letterSpacing: "0.05em",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredVisitors.map((visitor, index) => (
                      <motion.tr
                        key={visitor.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(20,184,166,0.04), rgba(6,182,212,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e293b" }}>{visitor.visitorName}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{visitor.contact}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{visitor.patientName}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{visitor.relation}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block", padding: "3px 10px", borderRadius: "6px",
                            background: "#f0fdfa", border: "1px solid #99f6e4",
                            fontSize: "12px", color: "#0f766e", fontWeight: 500,
                          }}>
                            {visitor.purpose}
                          </span>
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{visitor.inTime}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{visitor.outTime}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{visitor.floor}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[visitor.status] || statusStyles.In
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {visitor.status}
                              </span>
                            )
                          })()}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filteredVisitors.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No visitors found matching your search.
              </div>
            )}
          </motion.div>
        )}

        {/* Phone Calls Table */}
        {activeTab === "Phone Calls" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Phone Call Log</h2>
                <Link href="/front-office/call/new">
                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "9px 20px", borderRadius: "10px", border: "none",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    color: "#fff", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", boxShadow: "0 4px 16px rgba(20,184,166,0.4)", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(20,184,166,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,184,166,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
                  >
                    <Phone size={15} /> Log Call
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Caller", "Contact", "Department", "Call Time", "Duration", "Purpose", "Handled By", "Status"].map(h => (
                      <th key={h} style={{
                        padding: "12px 16px", textAlign: "left",
                        fontWeight: 700, color: "#64748b", fontSize: "11px",
                        textTransform: "uppercase" as const, letterSpacing: "0.05em",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredCalls.map((call, index) => (
                      <motion.tr
                        key={call.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(20,184,166,0.04), rgba(6,182,212,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#1e293b" }}>{call.callerName}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.contact}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.department}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.callTime}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.duration}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.purpose}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{call.handledBy}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[call.status] || statusStyles.Resolved
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {call.status}
                              </span>
                            )
                          })()}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filteredCalls.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No calls found matching your search.
              </div>
            )}
          </motion.div>
        )}

        {/* Postal Table */}
        {activeTab === "Postal" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: "#fff", borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
            }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>Postal Register</h2>
                <Link href="/front-office/postal/new">
                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    padding: "9px 20px", borderRadius: "10px", border: "none",
                    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                    color: "#fff", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", boxShadow: "0 4px 16px rgba(20,184,166,0.4)", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(20,184,166,0.5)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,184,166,0.4)"; e.currentTarget.style.transform = "translateY(0)" }}
                  >
                    <Plus size={15} /> Add Postal
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Tracking No.", "Type", "Sender", "Recipient", "Description", "Date", "Received By", "Status"].map(h => (
                      <th key={h} style={{
                        padding: "12px 16px", textAlign: "left",
                        fontWeight: 700, color: "#64748b", fontSize: "11px",
                        textTransform: "uppercase" as const, letterSpacing: "0.05em",
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredPostal.map((post, index) => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.05 }}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, rgba(20,184,166,0.04), rgba(6,182,212,0.02))"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "14px 16px", fontWeight: 600, color: "#334155" }}>{post.trackingNumber}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[post.type] || statusStyles.Incoming
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {post.type}
                              </span>
                            )
                          })()}
                        </td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{post.sender}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{post.recipient}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{post.description}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{post.receivedDate}</td>
                        <td style={{ padding: "14px 16px", color: "#64748b" }}>{post.receivedBy}</td>
                        <td style={{ padding: "14px 16px" }}>
                          {(() => {
                            const s = statusStyles[post.status] || statusStyles.Delivered
                            return (
                              <span style={{
                                display: "inline-block", padding: "4px 12px", borderRadius: "20px",
                                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                                fontSize: "12px", fontWeight: 600,
                              }}>
                                {post.status}
                              </span>
                            )
                          })()}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
            {filteredPostal.length === 0 && (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No postal items found matching your search.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
