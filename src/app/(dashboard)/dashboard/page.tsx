"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Users, Stethoscope, Calendar, CreditCard, BedDouble, TrendingUp,
  ArrowUpRight, ArrowDownRight, Activity, UserPlus, CalendarCheck,
  FileText, Droplets, Pill, FlaskConical, Scan, Heart, Brain, Bone, Eye,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const stats = [
  { title: "Total Patients", value: "12,847", change: "+12.5%", trend: "up" as const, icon: Users, gradient: "from-blue-500 to-cyan-500" },
  { title: "Appointments", value: "48", change: "+8.2%", trend: "up" as const, icon: Calendar, gradient: "from-violet-500 to-purple-500" },
  { title: "Active Doctors", value: "32", change: "+2.1%", trend: "up" as const, icon: Stethoscope, gradient: "from-[#0f766e] to-[#14b8a6]" },
  { title: "Revenue Today", value: "₹2,84,500", change: "+15.3%", trend: "up" as const, icon: CreditCard, gradient: "from-amber-500 to-orange-500" },
  { title: "Beds Occupied", value: "156/200", change: "78%", trend: "neutral" as const, icon: BedDouble, gradient: "from-rose-500 to-pink-500" },
  { title: "Pending Bills", value: "₹4,25,000", change: "-5.2%", trend: "down" as const, icon: TrendingUp, gradient: "from-red-500 to-rose-500" },
]

const recentAppointments = [
  { id: "APT001", patient: "Rajesh Kumar", doctor: "Dr. Priya Sharma", department: "Cardiology", time: "10:00 AM", status: "Completed", avatar: "RK" },
  { id: "APT002", patient: "Anita Patel", doctor: "Dr. Amit Singh", department: "Orthopedics", time: "10:30 AM", status: "In Progress", avatar: "AP" },
  { id: "APT003", patient: "Suresh Reddy", doctor: "Dr. Neha Gupta", department: "Neurology", time: "11:00 AM", status: "Scheduled", avatar: "SR" },
  { id: "APT004", patient: "Priya Verma", doctor: "Dr. Rahul Joshi", department: "Dermatology", time: "11:30 AM", status: "Scheduled", avatar: "PV" },
  { id: "APT005", patient: "Mohammed Ali", doctor: "Dr. Sanjay Mehta", department: "General Medicine", time: "12:00 PM", status: "Cancelled", avatar: "MA" },
]

const bedStatus = [
  { ward: "ICU", total: 10, occupied: 9, color: "from-red-500 to-rose-500" },
  { ward: "General Ward", total: 40, occupied: 32, color: "from-blue-500 to-cyan-500" },
  { ward: "Private", total: 20, occupied: 15, color: "from-violet-500 to-purple-500" },
  { ward: "Semi-Private", total: 30, occupied: 22, color: "from-[#0f766e] to-[#14b8a6]" },
  { ward: "Emergency", total: 10, occupied: 7, color: "from-amber-500 to-orange-500" },
  { ward: "Maternity", total: 15, occupied: 11, color: "from-pink-500 to-rose-500" },
]

const departmentStats = [
  { name: "Cardiology", patients: 45, revenue: "₹4,50,000", icon: Heart, color: "from-red-500 to-pink-500" },
  { name: "Neurology", patients: 28, revenue: "₹5,10,000", icon: Brain, color: "from-violet-500 to-purple-500" },
  { name: "Orthopedics", patients: 38, revenue: "₹3,20,000", icon: Bone, color: "from-blue-500 to-cyan-500" },
  { name: "Ophthalmology", patients: 22, revenue: "₹1,80,000", icon: Eye, color: "from-[#0f766e] to-[#14b8a6]" },
]

const quickActions = [
  { icon: UserPlus, label: "New Patient", color: "from-blue-500 to-cyan-500", href: "/patients/new" },
  { icon: CalendarCheck, label: "Appointment", color: "from-violet-500 to-purple-500", href: "/appointments" },
  { icon: Stethoscope, label: "OPD Visit", color: "from-[#0f766e] to-[#14b8a6]", href: "/opd" },
  { icon: BedDouble, label: "Admission", color: "from-rose-500 to-pink-500", href: "/ipd" },
  { icon: CreditCard, label: "New Bill", color: "from-amber-500 to-orange-500", href: "/billing" },
  { icon: FlaskConical, label: "Lab Test", color: "from-cyan-500 to-blue-500", href: "/pathology" },
  { icon: Droplets, label: "Blood Bank", color: "from-red-500 to-rose-500", href: "/blood-bank" },
  { icon: Pill, label: "Pharmacy", color: "from-green-500 to-emerald-500", href: "/pharmacy" },
]

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>Dashboard</h1>
            <p style={{ color: "#64748b", fontSize: 14 }}>Welcome back, Super Admin</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Button variant="outline" size="sm" style={{ borderColor: "#e2e8f0" }}>
              <Activity style={{ marginRight: 8, width: 16, height: 16 }} />
              Refresh
            </Button>
            <Link href="/patients/new">
              <Button size="sm" style={{ background: "linear-gradient(135deg, #0f766e, #14b8a6)", color: "#fff", boxShadow: "0 4px 14px rgba(20,184,166,0.25)" }}>
                <UserPlus style={{ marginRight: 8, width: 16, height: 16 }} />
                New Patient
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid - 3 columns on lg, 6 on xl */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {stats.map((stat) => (
            <Card key={stat.title} style={{ border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", borderRadius: 12 }}>
              <CardContent style={{ padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `linear-gradient(135deg, ${stat.gradient.includes("blue") ? "#3b82f6,#06b6d4" : stat.gradient.includes("violet") ? "#8b5cf6,#a855f7" : stat.gradient.includes("#0f766e") ? "#0f766e,#14b8a6" : stat.gradient.includes("amber") ? "#f59e0b,#f97316" : stat.gradient.includes("rose") ? "#f43f5e,#ec4899" : "#ef4444,#f43f5e"})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}>
                    <stat.icon style={{ width: 20, height: 20, color: "#fff" }} />
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: 600,
                    color: stat.trend === "up" ? "#22c55e" : stat.trend === "down" ? "#ef4444" : "#64748b",
                  }}>
                    {stat.trend === "up" && "↗ "}
                    {stat.trend === "down" && "↘ "}
                    {stat.change}
                  </span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <p style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>{stat.value}</p>
                  <p style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content - 2:1 ratio */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "start" }}>
          {/* Recent Appointments */}
          <Card style={{ border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", borderRadius: 12, overflow: "hidden" }}>
            <CardHeader style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", padding: "16px 20px" }}>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #8b5cf6, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Calendar style={{ width: 16, height: 16, color: "#fff" }} />
                </div>
                Recent Appointments
              </CardTitle>
              <Link href="/appointments" style={{ fontSize: 13, fontWeight: 600, color: "#14b8a6", textDecoration: "none" }}>
                View All ↗
              </Link>
            </CardHeader>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={{ textAlign: "left", padding: "10px 20px", fontSize: 12, fontWeight: 600, color: "#64748b" }}>Patient</th>
                    <th style={{ textAlign: "left", padding: "10px 20px", fontSize: 12, fontWeight: 600, color: "#64748b" }}>Doctor</th>
                    <th style={{ textAlign: "left", padding: "10px 20px", fontSize: 12, fontWeight: 600, color: "#64748b" }}>Time</th>
                    <th style={{ textAlign: "left", padding: "10px 20px", fontSize: 12, fontWeight: 600, color: "#64748b" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((apt) => (
                    <tr key={apt.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: 12, fontWeight: 600,
                          }}>
                            {apt.avatar}
                          </div>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{apt.patient}</p>
                            <p style={{ fontSize: 11, color: "#94a3b8" }}>{apt.department}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: 13, color: "#475569" }}>{apt.doctor}</td>
                      <td style={{ padding: "12px 20px", fontSize: 13, color: "#475569" }}>{apt.time}</td>
                      <td style={{ padding: "12px 20px" }}>
                        <span style={{
                          display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
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
          </Card>

          {/* Bed Status */}
          <Card style={{ border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", borderRadius: 12, overflow: "hidden" }}>
            <CardHeader style={{ borderBottom: "1px solid #f1f5f9", padding: "16px 20px" }}>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #f43f5e, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BedDouble style={{ width: 16, height: 16, color: "#fff" }} />
                </div>
                Bed Status
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {bedStatus.map((ward) => {
                  const pct = Math.round((ward.occupied / ward.total) * 100)
                  return (
                    <div key={ward.ward}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#334155" }}>{ward.ward}</span>
                        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{ward.occupied}/{ward.total}</span>
                      </div>
                      <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", width: `${pct}%`, borderRadius: 4,
                          background: ward.color.includes("red") ? "linear-gradient(90deg, #ef4444, #f43f5e)"
                            : ward.color.includes("blue") ? "linear-gradient(90deg, #3b82f6, #06b6d4)"
                            : ward.color.includes("violet") ? "linear-gradient(90deg, #8b5cf6, #a855f7)"
                            : ward.color.includes("#0f766e") ? "linear-gradient(90deg, #0f766e, #14b8a6)"
                            : ward.color.includes("amber") ? "linear-gradient(90deg, #f59e0b, #f97316)"
                            : "linear-gradient(90deg, #ec4899, #f43f5e)",
                          transition: "width 1s ease",
                        }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance */}
        <Card style={{ border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", borderRadius: 12, overflow: "hidden" }}>
          <CardHeader style={{ borderBottom: "1px solid #f1f5f9", padding: "16px 20px" }}>
            <CardTitle style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #0f766e, #14b8a6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Activity style={{ width: 16, height: 16, color: "#fff" }} />
              </div>
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent style={{ padding: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {departmentStats.map((dept) => (
                <div key={dept.name} style={{
                  borderRadius: 12, border: "1px solid #f1f5f9", padding: 16,
                  cursor: "pointer", transition: "all 0.2s",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: dept.color.includes("red") ? "linear-gradient(135deg, #ef4444, #ec4899)"
                      : dept.color.includes("violet") ? "linear-gradient(135deg, #8b5cf6, #a855f7)"
                      : dept.color.includes("blue") ? "linear-gradient(135deg, #3b82f6, #06b6d4)"
                      : "linear-gradient(135deg, #0f766e, #14b8a6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}>
                    <dept.icon style={{ width: 20, height: 20, color: "#fff" }} />
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 2 }}>{dept.name}</h3>
                  <p style={{ fontSize: 12, color: "#94a3b8" }}>{dept.patients} patients</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginTop: 8 }}>{dept.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card style={{ border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", borderRadius: 12, overflow: "hidden" }}>
          <CardHeader style={{ borderBottom: "1px solid #f1f5f9", padding: "16px 20px" }}>
            <CardTitle style={{ fontSize: 15, fontWeight: 600 }}>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent style={{ padding: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 12 }}>
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
                  <div style={{
                    height: 80, borderRadius: 12,
                    background: action.color.includes("blue") ? "linear-gradient(135deg, #3b82f6, #06b6d4)"
                      : action.color.includes("violet") ? "linear-gradient(135deg, #8b5cf6, #a855f7)"
                      : action.color.includes("#0f766e") ? "linear-gradient(135deg, #0f766e, #14b8a6)"
                      : action.color.includes("rose") ? "linear-gradient(135deg, #f43f5e, #ec4899)"
                      : action.color.includes("amber") ? "linear-gradient(135deg, #f59e0b, #f97316)"
                      : action.color.includes("cyan") ? "linear-gradient(135deg, #06b6d4, #3b82f6)"
                      : action.color.includes("red") ? "linear-gradient(135deg, #ef4444, #f43f5e)"
                      : "linear-gradient(135deg, #22c55e, #10b981)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)", cursor: "pointer",
                  }}>
                    <action.icon style={{ width: 20, height: 20, color: "#fff" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
