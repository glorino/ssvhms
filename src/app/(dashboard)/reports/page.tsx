"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Download,
  IndianRupee,
  Users,
  Stethoscope,
  Pill,
  FlaskConical,
  Scan,
  Calendar,
  TrendingUp,
  BarChart3,
  FileText,
  BarChart2,
} from "lucide-react"
import { filterByPeriod } from "@/lib/filter-utils"

const reportTypes = [
  { id: "revenue", title: "Revenue Report", description: "Daily, weekly, and monthly revenue analytics", icon: IndianRupee, color: "#3b82f6", bgColor: "#eff6ff", href: "/reports/revenue" },
  { id: "patients", title: "Patient Report", description: "Patient registration, discharge, and demographics", icon: Users, color: "#10b981", bgColor: "#ecfdf5", href: "/reports/patients" },
  { id: "doctors", title: "Doctor Report", description: "Doctor performance and consultation analytics", icon: Stethoscope, color: "#8b5cf6", bgColor: "#f5f3ff", href: "/reports/doctors" },
  { id: "pharmacy", title: "Pharmacy Report", description: "Medicine sales, inventory, and purchase analytics", icon: Pill, color: "#f59e0b", bgColor: "#fffbeb", href: "/reports/pharmacy" },
  { id: "pathology", title: "Pathology Report", description: "Lab tests conducted, results, and turnaround time", icon: FlaskConical, color: "#ef4444", bgColor: "#fef2f2", href: "/reports/pathology" },
  { id: "radiology", title: "Radiology Report", description: "Imaging studies and diagnostic analytics", icon: Scan, color: "#6366f1", bgColor: "#eef2ff", href: "/reports/radiology" },
  { id: "appointments", title: "Appointment Report", description: "Appointment scheduling and attendance analytics", icon: Calendar, color: "#14b8a6", bgColor: "#f0fdfa", href: "/reports/appointments" },
  { id: "billing", title: "Billing Report", description: "Invoice generation, payments, and dues analytics", icon: FileText, color: "#f97316", bgColor: "#fff7ed", href: "/reports/billing" },
]

const recentReports = [
  { id: "RPT001", reportName: "Daily Revenue Summary", generatedBy: "System", date: "2026-08-07", type: "Revenue", status: "Ready" },
  { id: "RPT002", reportName: "Patient Discharge Report", generatedBy: "Dr. Priya Sharma", date: "2026-08-07", type: "Patient", status: "Ready" },
  { id: "RPT003", reportName: "Pharmacy Sales Report", generatedBy: "Sanjay Mehta", date: "2026-08-06", type: "Pharmacy", status: "Ready" },
  { id: "RPT004", reportName: "Weekly Lab Tests Summary", generatedBy: "System", date: "2026-08-05", type: "Pathology", status: "Ready" },
  { id: "RPT005", reportName: "Monthly Payroll Report", generatedBy: "Rahul Joshi", date: "2026-08-01", type: "HR", status: "Ready" },
]

export default function ReportsPage() {
  const [activePeriod, setActivePeriod] = useState("All Time")

  const periods = ["Today", "This Week", "This Month", "All Time"]

  const filterKey = useMemo(() => {
    switch (activePeriod) {
      case "Today": return "today"
      case "This Week": return "week"
      case "This Month": return "month"
      default: return "all"
    }
  }, [activePeriod])

  const filteredReports = useMemo(() => filterByPeriod(recentReports, filterKey, "date"), [filterKey])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Gradient Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, #059669 0%, #14b8a6 100%)",
          padding: "32px 40px",
          borderRadius: "0 0 24px 24px",
          boxShadow: "0 10px 40px rgba(20, 184, 166, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          transform: "translate(100px, -100px)",
        }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          transform: "translate(-50px, 50px)",
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", margin: 0 }}>
              Reports & Analytics
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", marginTop: "8px" }}>
              Generate and view hospital analytics reports
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "white",
              color: "#059669",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Download size={18} />
            Export All
          </motion.button>
        </div>
      </motion.div>

      <div style={{ padding: "24px 40px" }}>
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "16px 24px",
            marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Filter:</span>
          {periods.map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePeriod(period)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: activePeriod === period ? "#059669" : "#f1f5f9",
                color: activePeriod === period ? "white" : "#64748b",
              }}
            >
              {period}
            </motion.button>
          ))}
        </motion.div>

        {/* Report Types Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {reportTypes.map((report) => (
            <motion.div
              key={report.id}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <Link href={report.href} style={{ textDecoration: "none" }}>
                <div style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  height: "100%",
                }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    backgroundColor: report.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <report.icon size={24} style={{ color: report.color }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#1e293b", margin: "0 0 4px 0" }}>
                      {report.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: "1.5" }}>
                      {report.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Reports Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            overflow: "hidden",
          }}
        >
          <div style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
              Recently Generated Reports
            </h2>
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              {filteredReports.length} reports
            </span>
          </div>

          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto",
            padding: "12px 24px",
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Report Name
            </span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Generated By
            </span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Date
            </span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Type
            </span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Status
            </span>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Action
            </span>
          </div>

          {/* Table Body */}
          <div>
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto",
                  padding: "16px 24px",
                  borderBottom: "1px solid #f1f5f9",
                  alignItems: "center",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8fafc"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #059669 0%, #14b8a6 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <BarChart2 size={18} style={{ color: "white" }} />
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#1e293b" }}>
                    {report.reportName}
                  </span>
                </div>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  {report.generatedBy}
                </span>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  {report.date}
                </span>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  {report.type}
                </span>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "12px",
                  backgroundColor: "#ecfdf5",
                  color: "#059669",
                  fontSize: "12px",
                  fontWeight: 500,
                  display: "inline-block",
                  width: "fit-content",
                }}>
                  {report.status}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#f1f5f9",
                    color: "#059669",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Download size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}