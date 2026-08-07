"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  Calendar,
  FileText,
  CreditCard,
  FlaskConical,
  Pill,
  Bell,
  User,
  LogOut,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Stethoscope,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatedStat, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const patientStats = [
  { title: "Upcoming Appointments", value: "3", icon: Calendar, gradient: "from-blue-500 to-cyan-500" },
  { title: "Active Prescriptions", value: "5", icon: Pill, gradient: "from-violet-500 to-purple-500" },
  { title: "Pending Reports", value: "2", icon: FlaskConical, gradient: "from-amber-500 to-orange-500" },
  { title: "Outstanding Bills", value: "₹4,500", icon: CreditCard, gradient: "from-rose-500 to-pink-500" },
]

const appointments = [
  { id: 1, doctor: "Dr. Priya Sharma", department: "Cardiology", date: "2026-08-10", time: "10:00 AM", status: "Confirmed" },
  { id: 2, doctor: "Dr. Amit Singh", department: "Orthopedics", date: "2026-08-15", time: "2:30 PM", status: "Scheduled" },
  { id: 3, doctor: "Dr. Neha Gupta", department: "Neurology", date: "2026-08-20", time: "11:00 AM", status: "Scheduled" },
]

const prescriptions = [
  { id: 1, doctor: "Dr. Priya Sharma", date: "2026-08-05", medicines: ["Amlodipine 5mg", "Aspirin 75mg"], status: "Active" },
  { id: 2, doctor: "Dr. Amit Singh", date: "2026-07-20", medicines: ["Metformin 500mg"], status: "Active" },
]

const labResults = [
  { id: 1, test: "Complete Blood Count", date: "2026-08-05", status: "Completed", result: "Normal" },
  { id: 2, test: "Lipid Profile", date: "2026-08-05", status: "Completed", result: "High Cholesterol" },
  { id: 3, test: "Blood Sugar Fasting", date: "2026-07-20", status: "Completed", result: "145 mg/dL (High)" },
]

export default function PatientPortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SSVHMS
                </h1>
                <p className="text-xs text-slate-400">Patient Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white">
                  3
                </span>
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  RK
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">Rajesh Kumar</p>
                  <p className="text-xs text-slate-500">UMR: UMR2026001</p>
                </div>
              </div>
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900">Welcome back, Rajesh!</h2>
          <p className="text-slate-500">Here&apos;s your health summary</p>
        </motion.div>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {patientStats.map((stat, index) => (
            <StaggerItem key={stat.title}>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-sm text-slate-500">{stat.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {appointments.map((apt, index) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
                        <Stethoscope className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{apt.doctor}</p>
                        <p className="text-sm text-slate-500">{apt.department}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{apt.date} at {apt.time}</span>
                        </div>
                      </div>
                      <Badge variant={apt.status === "Confirmed" ? "success" : "info"} className="rounded-full">
                        {apt.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                <Link href="/appointments">
                  <Button variant="ghost" className="w-full mt-4 text-blue-600">
                    View All Appointments
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Prescriptions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <Pill className="h-4 w-4 text-white" />
                  </div>
                  Active Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {prescriptions.map((presc, index) => (
                    <motion.div
                      key={presc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-slate-900">{presc.doctor}</p>
                        <Badge variant="success" className="rounded-full">{presc.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">Date: {presc.date}</p>
                      <div className="flex flex-wrap gap-2">
                        {presc.medicines.map((med, i) => (
                          <span key={i} className="px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
                            {med}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lab Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <FlaskConical className="h-4 w-4 text-white" />
                  </div>
                  Lab Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {labResults.map((lab, index) => (
                    <motion.div
                      key={lab.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        lab.result === "Normal" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {lab.result === "Normal" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{lab.test}</p>
                        <p className="text-sm text-slate-500">{lab.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${lab.result === "Normal" ? "text-green-600" : "text-red-600"}`}>
                          {lab.result}
                        </p>
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
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Calendar, label: "Book Appointment", color: "from-blue-500 to-cyan-500", href: "/appointments/new" },
                    { icon: CreditCard, label: "Pay Bills", color: "from-green-500 to-emerald-500", href: "/billing" },
                    { icon: FileText, label: "View Reports", color: "from-amber-500 to-orange-500", href: "/pathology" },
                    { icon: Pill, label: "Order Medicine", color: "from-violet-500 to-purple-500", href: "/pharmacy" },
                  ].map((action, index) => (
                    <motion.div
                      key={action.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={action.href}>
                        <div className={`h-24 rounded-xl bg-gradient-to-br ${action.color} flex flex-col items-center justify-center gap-2 shadow-lg cursor-pointer`}>
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
      </main>
    </div>
  )
}
