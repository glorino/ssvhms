"use client"

import React from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  Users, Stethoscope, Calendar, CreditCard, BedDouble, TrendingUp,
  ArrowUpRight, ArrowDownRight, Activity, UserPlus, CalendarCheck,
  FileText, Droplets, Pill, FlaskConical, Heart, Brain, Bone, Eye, Clock,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { title: "Total Patients", value: "12,847", change: "+12.5%", trend: "up" as const, icon: Users, gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)" },
  { title: "Appointments", value: "48", change: "+8.2%", trend: "up" as const, icon: Calendar, gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)" },
  { title: "Active Doctors", value: "32", change: "+2.1%", trend: "up" as const, icon: Stethoscope, gradient: "linear-gradient(135deg, #0f766e, #14b8a6)" },
  { title: "Revenue Today", value: "₦2,84,500", change: "+15.3%", trend: "up" as const, icon: CreditCard, gradient: "linear-gradient(135deg, #f59e0b, #f97316)" },
  { title: "Beds Occupied", value: "156/200", change: "78%", trend: "neutral" as const, icon: BedDouble, gradient: "linear-gradient(135deg, #f43f5e, #ec4899)" },
  { title: "Pending Bills", value: "₦4,25,000", change: "-5.2%", trend: "down" as const, icon: TrendingUp, gradient: "linear-gradient(135deg, #ef4444, #f97316)" },
]

const recentAppointments = [
  { id: "APT001", patient: "Rajesh Kumar", doctor: "Dr. Priya Sharma", dept: "Cardiology", time: "10:00 AM", status: "Completed", avatar: "RK" },
  { id: "APT002", patient: "Anita Patel", doctor: "Dr. Amit Singh", dept: "Orthopedics", time: "10:30 AM", status: "In Progress", avatar: "AP" },
  { id: "APT003", patient: "Suresh Reddy", doctor: "Dr. Neha Gupta", dept: "Neurology", time: "11:00 AM", status: "Scheduled", avatar: "SR" },
  { id: "APT004", patient: "Priya Verma", doctor: "Dr. Rahul Joshi", dept: "Dermatology", time: "11:30 AM", status: "Scheduled", avatar: "PV" },
  { id: "APT005", patient: "Mohammed Ali", doctor: "Dr. Sanjay Mehta", dept: "General Medicine", time: "12:00 PM", status: "Cancelled", avatar: "MA" },
]

const bedStatus = [
  { ward: "ICU", total: 10, occupied: 9, color: "#ef4444" },
  { ward: "General Ward", total: 40, occupied: 32, color: "#3b82f6" },
  { ward: "Private", total: 20, occupied: 15, color: "#8b5cf6" },
  { ward: "Semi-Private", total: 30, occupied: 22, color: "#14b8a6" },
  { ward: "Emergency", total: 10, occupied: 7, color: "#f59e0b" },
  { ward: "Maternity", total: 15, occupied: 11, color: "#ec4899" },
]

const departments = [
  { name: "Cardiology", patients: 45, revenue: "₦4,50,000", icon: Heart, color: "linear-gradient(135deg, #ef4444, #ec4899)" },
  { name: "Neurology", patients: 28, revenue: "₦5,10,000", icon: Brain, color: "linear-gradient(135deg, #8b5cf6, #a855f7)" },
  { name: "Orthopedics", patients: 38, revenue: "₦3,20,000", icon: Bone, color: "linear-gradient(135deg, #3b82f6, #06b6d4)" },
  { name: "Ophthalmology", patients: 22, revenue: "₦1,80,000", icon: Eye, color: "linear-gradient(135deg, #0f766e, #14b8a6)" },
]

const quickActions = [
  { icon: UserPlus, label: "New Patient", gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)", href: "/patients/new" },
  { icon: CalendarCheck, label: "Appointment", gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)", href: "/appointments" },
  { icon: Stethoscope, label: "OPD Visit", gradient: "linear-gradient(135deg, #0f766e, #14b8a6)", href: "/opd" },
  { icon: BedDouble, label: "Admission", gradient: "linear-gradient(135deg, #f43f5e, #ec4899)", href: "/ipd" },
  { icon: CreditCard, label: "New Bill", gradient: "linear-gradient(135deg, #f59e0b, #f97316)", href: "/billing" },
  { icon: FlaskConical, label: "Lab Test", gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)", href: "/pathology" },
  { icon: Droplets, label: "Blood Bank", gradient: "linear-gradient(135deg, #ef4444, #f43f5e)", href: "/blood-bank" },
  { icon: Pill, label: "Pharmacy", gradient: "linear-gradient(135deg, #22c55e, #10b981)", href: "/pharmacy" },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 17) return "Good afternoon"
  return "Good evening"
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const user = session?.user as any
  const userName = user?.name?.split(" ")[0] || "Admin"

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Welcome Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
              {getGreeting()}, {userName} 👋
            </h1>
            <p style={{ color: "#64748b", fontSize: 14 }}>Here&apos;s what&apos;s happening at your hospital today</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
              borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff",
              fontSize: 13, fontWeight: 500, color: "#475569", cursor: "pointer",
            }}>
              <Activity size={16} /> Refresh
            </button>
            <Link href="/patients/new" style={{ textDecoration: "none" }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                borderRadius: 10, border: "none", background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(20,184,166,0.3)",
              }}>
                <UserPlus size={16} /> New Patient
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {stats.map((stat) => (
            <div key={stat.title} style={{
              background: "#fff", borderRadius: 14, padding: "20px 22px",
              border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              display: "flex", alignItems: "flex-start", justifyContent: "space-between",
              transition: "box-shadow 0.2s",
            }}>
              <div>
                <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{stat.title}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", lineHeight: 1.1 }}>{stat.value}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                  {stat.trend === "up" && <ArrowUpRight size={14} color="#22c55e" />}
                  {stat.trend === "down" && <ArrowDownRight size={14} color="#ef4444" />}
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: stat.trend === "up" ? "#22c55e" : stat.trend === "down" ? "#ef4444" : "#64748b",
                  }}>
                    {stat.change}
                  </span>
                  <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 2 }}>vs yesterday</span>
                </div>
              </div>
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: stat.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", flexShrink: 0,
              }}>
                <stat.icon size={22} color="#fff" />
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>

          {/* Recent Appointments */}
          <div style={{
            background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden",
          }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 22px", borderBottom: "1px solid #f1f5f9",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #8b5cf6, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock size={16} color="#fff" />
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>Recent Appointments</span>
              </div>
              <Link href="/appointments" style={{ fontSize: 13, fontWeight: 600, color: "#14b8a6", textDecoration: "none" }}>
                View All ↗
              </Link>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={{ textAlign: "left", padding: "12px 22px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Patient</th>
                    <th style={{ textAlign: "left", padding: "12px 22px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Doctor</th>
                    <th style={{ textAlign: "left", padding: "12px 22px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Time</th>
                    <th style={{ textAlign: "left", padding: "12px 22px", fontSize: 12, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((apt) => (
                    <tr key={apt.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                      <td style={{ padding: "14px 22px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0,
                          }}>
                            {apt.avatar}
                          </div>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{apt.patient}</p>
                            <p style={{ fontSize: 11, color: "#94a3b8" }}>{apt.dept}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "14px 22px", fontSize: 13, color: "#475569" }}>{apt.doctor}</td>
                      <td style={{ padding: "14px 22px", fontSize: 13, color: "#475569" }}>{apt.time}</td>
                      <td style={{ padding: "14px 22px" }}>
                        <span style={{
                          display: "inline-block", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                          background: apt.status === "Completed" ? "#dcfce7" : apt.status === "In Progress" ? "#fef9c3" : apt.status === "Cancelled" ? "#fee2e2" : "#dbeafe",
                          color: apt.status === "Completed" ? "#16a34a" : apt.status === "In Progress" ? "#ca8a04" : apt.status === "Cancelled" ? "#dc2626" : "#2563eb",
                        }}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bed Status */}
          <div style={{
            background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "18px 22px", borderBottom: "1px solid #f1f5f9",
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #f43f5e, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BedDouble size={16} color="#fff" />
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>Bed Status</span>
            </div>
            <div style={{ padding: 22 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {bedStatus.map((ward) => {
                  const pct = Math.round((ward.occupied / ward.total) * 100)
                  return (
                    <div key={ward.ward}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: ward.color }} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#334155" }}>{ward.ward}</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{ward.occupied}<span style={{ color: "#94a3b8", fontWeight: 400 }}>/{ward.total}</span></span>
                      </div>
                      <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${pct}%`, borderRadius: 4,
                          background: ward.color, transition: "width 1s ease",
                        }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Bed Summary */}
              <div style={{ marginTop: 20, padding: 14, background: "#f8fafc", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Total Beds</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>200</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Available</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#22c55e" }}>44</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Occupancy Rate</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0f766e" }}>78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div style={{
          background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "18px 22px", borderBottom: "1px solid #f1f5f9",
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #0f766e, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Activity size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>Department Performance</span>
          </div>
          <div style={{ padding: 22 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {departments.map((dept) => (
                <div key={dept.name} style={{
                  borderRadius: 12, border: "1px solid #f1f5f9", padding: 20,
                  cursor: "pointer", transition: "all 0.2s", background: "#fff",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none" }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, background: dept.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 14, boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}>
                    <dept.icon size={22} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 2 }}>{dept.name}</h3>
                  <p style={{ fontSize: 12, color: "#94a3b8" }}>{dept.patients} patients today</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginTop: 10 }}>{dept.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "18px 22px", borderBottom: "1px solid #f1f5f9",
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>Quick Actions</span>
          </div>
          <div style={{ padding: 22 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 14 }}>
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
                  <div style={{
                    height: 88, borderRadius: 14, background: action.gradient,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)" }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)" }}
                  >
                    <action.icon size={22} color="#fff" />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
