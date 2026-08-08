"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import {
  Users, Stethoscope, Calendar, CreditCard, BedDouble, TrendingUp,
  ArrowUpRight, ArrowDownRight, Activity, Sparkles, Brain,
  AlertTriangle, CheckCircle, Clock,
} from "lucide-react"
import { usePatients } from "@/lib/patient-context"
import { filterByPeriod } from "@/lib/filter-utils"

const bedStatus = [
  { ward: "ICU", total: 20, occupied: 16, color: "#ef4444" },
  { ward: "General Ward", total: 80, occupied: 62, color: "#3b82f6" },
  { ward: "Private", total: 40, occupied: 30, color: "#8b5cf6" },
  { ward: "Semi-Private", total: 35, occupied: 28, color: "#14b8a6" },
  { ward: "Emergency", total: 15, occupied: 12, color: "#f59e0b" },
  { ward: "Maternity", total: 10, occupied: 8, color: "#ec4899" },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 17) return "Good afternoon"
  return "Good evening"
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const fadeInFromTop = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const fadeInFromBottom = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const userName = user?.name?.split(" ")[0] || "Admin"
  const { patients } = usePatients()

  const [activeFilter, setActiveFilter] = useState("Today")
  const filters = ["Today", "This Week", "This Month", "All Time"]

  const filterKey = useMemo(() => {
    switch (activeFilter) {
      case "Today": return "today"
      case "This Week": return "week"
      case "This Month": return "month"
      default: return "all"
    }
  }, [activeFilter])

  const filteredPatients = useMemo(() => filterByPeriod(patients, filterKey, "registeredAt"), [patients, filterKey])

  const totalPatients = filteredPatients.length

  const allAppointments = patients.flatMap((p) =>
    p.visits.map((v) => ({
      id: v.id,
      patient: `${p.firstName} ${p.lastName}`,
      doctor: v.doctor,
      dept: v.department,
      time: v.date,
      status: v.status,
      avatar: `${p.firstName[0]}${p.lastName[0]}`,
    }))
  )
  const recentAppointments = filterByPeriod(allAppointments, filterKey, "time")

  const totalBeds = bedStatus.reduce((sum, w) => sum + w.total, 0)
  const occupiedBeds = bedStatus.reduce((sum, w) => sum + w.occupied, 0)
  const availableBeds = totalBeds - occupiedBeds

  const stats = [
    {
      label: "Total Patients",
      value: totalPatients.toLocaleString(),
      subtitle: `${recentAppointments.length} transactions`,
      trend: "up",
      change: "+12.5%",
      icon: Users,
      iconBg: "rgba(79,70,229,0.1)",
      iconColor: "#4f46e5",
    },
    {
      label: "Active Doctors",
      value: "32",
      subtitle: "vs yesterday",
      trend: "up",
      change: "+2.1%",
      icon: Stethoscope,
      iconBg: "rgba(20,184,166,0.1)",
      iconColor: "#14b8a6",
    },
    {
      label: "Revenue Today",
      value: "₦284,500",
      subtitle: "+15.3% vs yesterday",
      trend: "up",
      change: "+15.3%",
      icon: CreditCard,
      iconBg: "rgba(249,115,22,0.1)",
      iconColor: "#f97316",
    },
    {
      label: "Beds Occupied",
      value: `${occupiedBeds}/${totalBeds}`,
      subtitle: `${availableBeds} available`,
      trend: "neutral",
      change: "78%",
      icon: BedDouble,
      iconBg: "rgba(124,58,237,0.1)",
      iconColor: "#7c3aed",
    },
  ]

  const insights = [
    {
      icon: Brain,
      title: "Peak Admission Time",
      description: "Admissions spike between 10AM - 12PM. Consider staffing adjustments.",
      actionText: "View Analysis",
      color: "#7c3aed",
    },
    {
      icon: AlertTriangle,
      title: "Low Stock Alert",
      description: "Amoxicillin and Paracetamol are below minimum stock levels.",
      actionText: "Reorder Now",
      color: "#f97316",
    },
  ]

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Welcome Banner */}
        <motion.div
          variants={fadeInFromTop}
          initial="hidden"
          animate="visible"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            borderRadius: 16,
            padding: "40px 36px",
            boxShadow: "0 8px 32px rgba(79,70,229,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: -40, right: -40, width: 200, height: 200,
            borderRadius: "50%", background: "rgba(255,255,255,0.06)",
          }} />
          <div style={{
            position: "absolute", bottom: -60, right: 80, width: 160, height: 160,
            borderRadius: "50%", background: "rgba(255,255,255,0.04)",
          }} />
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 8, position: "relative" }}>
            {getGreeting()}, {userName}!
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", position: "relative" }}>
            Here&apos;s what&apos;s happening at your hospital today
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          variants={fadeInUp}
          custom={0}
          initial="hidden"
          animate="visible"
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "16px 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: "#64748b" }}>Filter by period</span>
          <div style={{ display: "flex", gap: 8 }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 20,
                  border: activeFilter === f ? "none" : "1px solid #e2e8f0",
                  background: activeFilter === f ? "linear-gradient(135deg, #14b8a6, #0d9488)" : "#fff",
                  color: activeFilter === f ? "#fff" : "#64748b",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: activeFilter === f ? "0 4px 12px rgba(20,184,166,0.3)" : "none",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                cursor: "default",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <div>
                <p style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500, marginBottom: 10, letterSpacing: 0.3 }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", lineHeight: 1.1 }}>
                  {stat.value}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                  {stat.trend === "up" && <ArrowUpRight size={14} color="#22c55e" />}
                  {stat.trend === "down" && <ArrowDownRight size={14} color="#ef4444" />}
                  <span style={{
                    fontSize: 13, fontWeight: 600,
                    color: stat.trend === "up" ? "#22c55e" : stat.trend === "down" ? "#ef4444" : "#64748b",
                  }}>
                    {stat.change}
                  </span>
                  <span style={{ fontSize: 13, color: "#94a3b8" }}>{stat.subtitle}</span>
                </div>
              </div>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: stat.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <stat.icon size={26} color={stat.iconColor} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Insights Section */}
        <motion.div
          variants={fadeInFromBottom}
          initial="hidden"
          animate="visible"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>AI Insights</span>
            <span style={{
              padding: "4px 12px", borderRadius: 20,
              background: "rgba(34,197,94,0.1)", color: "#22c55e",
              fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
            }}>
              LIVE
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {insights.map((insight, i) => (
              <motion.div
                key={insight.title}
                custom={i}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "28px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  cursor: "default",
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${insight.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <insight.icon size={24} color={insight.color} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
                  {insight.title}
                </h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
                  {insight.description}
                </p>
                <span style={{
                  fontSize: 13, fontWeight: 600, color: insight.color, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}>
                  {insight.actionText} <ArrowUpRight size={14} />
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity Table */}
        <motion.div
          variants={fadeInFromBottom}
          initial="hidden"
          animate="visible"
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 28px",
            borderBottom: "1px solid #f1f5f9",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #14b8a6, #0d9488)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Clock size={18} color="#fff" />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Recent Activity</span>
            </div>
            <Link href="/appointments" style={{
              fontSize: 13, fontWeight: 600, color: "#4f46e5", textDecoration: "none",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ textAlign: "left", padding: "14px 28px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Patient</th>
                  <th style={{ textAlign: "left", padding: "14px 28px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Doctor</th>
                  <th style={{ textAlign: "left", padding: "14px 28px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Time</th>
                  <th style={{ textAlign: "left", padding: "14px 28px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: "40px 28px", textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
                      No appointments scheduled for today
                    </td>
                  </tr>
                )}
                {recentAppointments.map((apt, i) => (
                  <motion.tr
                    key={apt.id}
                    custom={i}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    style={{ borderBottom: "1px solid #f8fafc", cursor: "default" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc" }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
                  >
                    <td style={{ padding: "16px 28px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0,
                        }}>
                          {apt.avatar}
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{apt.patient}</p>
                          <p style={{ fontSize: 12, color: "#94a3b8" }}>{apt.dept}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 28px", fontSize: 14, color: "#475569" }}>{apt.doctor}</td>
                    <td style={{ padding: "16px 28px", fontSize: 14, color: "#475569" }}>{apt.time}</td>
                    <td style={{ padding: "16px 28px" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                        background: apt.status === "Completed" ? "rgba(34,197,94,0.1)" : apt.status === "In Progress" ? "rgba(234,179,8,0.1)" : apt.status === "Cancelled" ? "rgba(239,68,68,0.1)" : "rgba(79,70,229,0.1)",
                        color: apt.status === "Completed" ? "#22c55e" : apt.status === "In Progress" ? "#eab308" : apt.status === "Cancelled" ? "#ef4444" : "#4f46e5",
                      }}>
                        {apt.status === "Completed" && <CheckCircle size={12} />}
                        {apt.status === "In Progress" && <Activity size={12} />}
                        {apt.status === "Cancelled" && <AlertTriangle size={12} />}
                        {apt.status === "Scheduled" && <Calendar size={12} />}
                        {apt.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bed Status */}
        <motion.div
          variants={fadeInFromBottom}
          initial="hidden"
          animate="visible"
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 28px",
            borderBottom: "1px solid #f1f5f9",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #f97316, #f59e0b)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <BedDouble size={18} color="#fff" />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Bed Occupancy</span>
            </div>
            <Link href="/ipd" style={{
              fontSize: 13, fontWeight: 600, color: "#4f46e5", textDecoration: "none",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              View Details <ArrowUpRight size={14} />
            </Link>
          </div>
          <div style={{ padding: 28 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {bedStatus.map((ward) => {
                const pct = Math.round((ward.occupied / ward.total) * 100)
                return (
                  <div key={ward.ward} style={{ padding: 16, background: "#f8fafc", borderRadius: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: ward.color }} />
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>{ward.ward}</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                        {ward.occupied}<span style={{ color: "#94a3b8", fontWeight: 400 }}>/{ward.total}</span>
                      </span>
                    </div>
                    <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        style={{
                          height: "100%", borderRadius: 4,
                          background: `linear-gradient(90deg, ${ward.color}, ${ward.color}dd)`,
                        }}
                      />
                    </div>
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>{pct}% occupancy</p>
                  </div>
                )
              })}
            </div>
            <div style={{
              marginTop: 24, padding: 18, background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
              borderRadius: 14, display: "flex", justifyContent: "space-around",
            }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>{totalBeds}</p>
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Total Beds</p>
              </div>
              <div style={{ width: 1, background: "#e2e8f0" }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#22c55e" }}>{availableBeds}</p>
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Available</p>
              </div>
              <div style={{ width: 1, background: "#e2e8f0" }} />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#f97316" }}>{Math.round((occupiedBeds / totalBeds) * 100)}%</p>
                <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Occupancy</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
