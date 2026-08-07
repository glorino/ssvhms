"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Users,
  Stethoscope,
  Calendar,
  CreditCard,
  BedDouble,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserPlus,
  CalendarCheck,
  FileText,
  Droplets,
  Pill,
  FlaskConical,
  Scan,
  Heart,
  Brain,
  Bone,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatedStat, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const stats = [
  {
    title: "Total Patients",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50",
  },
  {
    title: "Today's Appointments",
    value: "48",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
    gradient: "from-violet-500 to-purple-500",
    bgLight: "bg-violet-50",
  },
  {
    title: "Active Doctors",
    value: "32",
    change: "+2.1%",
    trend: "up",
    icon: Stethoscope,
    gradient: "from-emerald-500 to-green-500",
    bgLight: "bg-emerald-50",
  },
  {
    title: "Revenue Today",
    value: "₹2,84,500",
    change: "+15.3%",
    trend: "up",
    icon: CreditCard,
    gradient: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50",
  },
  {
    title: "Beds Occupied",
    value: "156/200",
    change: "78%",
    trend: "neutral",
    icon: BedDouble,
    gradient: "from-rose-500 to-pink-500",
    bgLight: "bg-rose-50",
  },
  {
    title: "Pending Bills",
    value: "₹4,25,000",
    change: "-5.2%",
    trend: "down",
    icon: TrendingUp,
    gradient: "from-red-500 to-rose-500",
    bgLight: "bg-red-50",
  },
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
  { ward: "Semi-Private", total: 30, occupied: 22, color: "from-emerald-500 to-green-500" },
  { ward: "Emergency", total: 10, occupied: 7, color: "from-amber-500 to-orange-500" },
  { ward: "Maternity", total: 15, occupied: 11, color: "from-pink-500 to-rose-500" },
]

const departmentStats = [
  { name: "Cardiology", patients: 45, revenue: "₹4,50,000", icon: Heart, color: "from-red-500 to-pink-500" },
  { name: "Neurology", patients: 28, revenue: "₹5,10,000", icon: Brain, color: "from-violet-500 to-purple-500" },
  { name: "Orthopedics", patients: 38, revenue: "₹3,20,000", icon: Bone, color: "from-blue-500 to-cyan-500" },
  { name: "Ophthalmology", patients: 22, revenue: "₹1,80,000", icon: Eye, color: "from-emerald-500 to-green-500" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, Super Admin</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-slate-200">
            <Activity className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/patients/new">
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg">
              <UserPlus className="mr-2 h-4 w-4" />
              New Patient
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat, index) => (
          <StaggerItem key={stat.title}>
            <AnimatedStat delay={index * 0.1}>
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center text-sm">
                      {stat.trend === "up" && <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />}
                      {stat.trend === "down" && <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
                      <span className={stat.trend === "up" ? "text-green-500" : stat.trend === "down" ? "text-red-500" : "text-slate-500"}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedStat>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                Recent Appointments
              </CardTitle>
              <Link href="/appointments">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAppointments.map((apt, index) => (
                    <motion.tr
                      key={apt.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="border-b hover:bg-slate-50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs shadow-md">
                            {apt.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{apt.patient}</p>
                            <p className="text-xs text-slate-500">{apt.department}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{apt.doctor}</TableCell>
                      <TableCell>{apt.time}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            apt.status === "Completed"
                              ? "success"
                              : apt.status === "In Progress"
                              ? "warning"
                              : apt.status === "Cancelled"
                              ? "destructive"
                              : "info"
                          }
                          className="rounded-full"
                        >
                          {apt.status}
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bed Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                  <BedDouble className="h-4 w-4 text-white" />
                </div>
                Bed Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {bedStatus.map((ward, index) => (
                  <motion.div
                    key={ward.ward}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{ward.ward}</span>
                      <span className="text-sm text-slate-500">
                        {ward.occupied}/{ward.total}
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${ward.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Department Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {departmentStats.map((dept, index) => (
                <motion.div
                  key={dept.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="relative overflow-hidden rounded-2xl border p-4 cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-10`} />
                  <div className="relative">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <dept.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{dept.name}</h3>
                    <p className="text-sm text-slate-500">{dept.patients} patients</p>
                    <p className="text-lg font-bold text-slate-900 mt-2">{dept.revenue}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {[
                { icon: UserPlus, label: "New Patient", color: "from-blue-500 to-cyan-500", href: "/patients/new" },
                { icon: CalendarCheck, label: "Appointment", color: "from-violet-500 to-purple-500", href: "/appointments/new" },
                { icon: Stethoscope, label: "OPD Visit", color: "from-emerald-500 to-green-500", href: "/opd/new" },
                { icon: BedDouble, label: "Admission", color: "from-rose-500 to-pink-500", href: "/ipd/new" },
                { icon: CreditCard, label: "New Bill", color: "from-amber-500 to-orange-500", href: "/billing/new" },
                { icon: FlaskConical, label: "Lab Test", color: "from-cyan-500 to-blue-500", href: "/pathology/new" },
                { icon: Droplets, label: "Blood Bank", color: "from-red-500 to-rose-500", href: "/blood-bank" },
                { icon: Pill, label: "Pharmacy", color: "from-green-500 to-emerald-500", href: "/pharmacy" },
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={action.href}>
                    <div className={`h-20 rounded-2xl bg-gradient-to-br ${action.color} flex flex-col items-center justify-center gap-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow`}>
                      <action.icon className="h-6 w-6 text-white" />
                      <span className="text-xs font-medium text-white">{action.label}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
