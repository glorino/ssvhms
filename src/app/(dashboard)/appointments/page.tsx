"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  CalendarCheck,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const appointments = [
  { id: "APT001", patient: "Rajesh Kumar", doctor: "Dr. Priya Sharma", department: "Cardiology", date: "2026-08-07", time: "10:00 AM", status: "Completed", priority: "Normal", reason: "Chest pain consultation" },
  { id: "APT002", patient: "Anita Patel", doctor: "Dr. Amit Singh", department: "Orthopedics", date: "2026-08-07", time: "10:30 AM", status: "In Progress", priority: "High", reason: "Knee pain" },
  { id: "APT003", patient: "Suresh Reddy", doctor: "Dr. Neha Gupta", department: "Neurology", date: "2026-08-07", time: "11:00 AM", status: "Scheduled", priority: "Normal", reason: "Headache follow-up" },
  { id: "APT004", patient: "Priya Verma", doctor: "Dr. Rahul Joshi", department: "Dermatology", date: "2026-08-07", time: "11:30 AM", status: "Scheduled", priority: "Low", reason: "Skin rash" },
  { id: "APT005", patient: "Mohammed Ali", doctor: "Dr. Sanjay Mehta", department: "General Medicine", date: "2026-08-07", time: "12:00 PM", status: "Cancelled", priority: "Normal", reason: "General checkup" },
  { id: "APT006", patient: "Deepika Singh", doctor: "Dr. Anita Kulkarni", department: "Pediatrics", date: "2026-08-07", time: "12:30 PM", status: "Scheduled", priority: "Urgent", reason: "Fever and cough" },
  { id: "APT007", patient: "Arun Sharma", doctor: "Dr. Priya Sharma", department: "Cardiology", date: "2026-08-07", time: "02:00 PM", status: "Scheduled", priority: "Normal", reason: "ECG review" },
  { id: "APT008", patient: "Kavita Joshi", doctor: "Dr. Amit Singh", department: "Orthopedics", date: "2026-08-07", time: "02:30 PM", status: "Scheduled", priority: "High", reason: "Post-surgery follow-up" },
]

const statsData = [
  { title: "Total", value: "8", icon: Calendar, gradient: "from-slate-500 to-slate-600", shadow: "shadow-slate-500/30" },
  { title: "Completed", value: "1", icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "In Progress", value: "1", icon: Clock, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
  { title: "Scheduled", value: "5", icon: AlertCircle, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30" },
  { title: "Cancelled", value: "1", icon: XCircle, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30" },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("2026-08-07")

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Appointments</h1>
            <p className="text-slate-500">Manage patient appointments and scheduling</p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <Link href="/appointments/new">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </Link>
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          {statsData.map((stat) => (
            <StaggerItem key={stat.title}>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className={`overflow-hidden shadow-lg ${stat.shadow} hover:shadow-xl transition-shadow duration-300`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Today&apos;s Appointments</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input
                    type="search"
                    placeholder="Search appointments..."
                    className="pl-10 w-64 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead className="font-semibold text-slate-700">ID</TableHead>
                    <TableHead className="font-semibold text-slate-700">Time</TableHead>
                    <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                    <TableHead className="font-semibold text-slate-700">Doctor</TableHead>
                    <TableHead className="font-semibold text-slate-700">Department</TableHead>
                    <TableHead className="font-semibold text-slate-700">Reason</TableHead>
                    <TableHead className="font-semibold text-slate-700">Priority</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((apt, index) => (
                    <motion.tr
                      key={apt.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-700">{apt.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-600">
                          <Clock className="h-4 w-4 text-blue-400" />
                          {apt.time}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-800">{apt.patient}</TableCell>
                      <TableCell className="text-slate-600">{apt.doctor}</TableCell>
                      <TableCell className="text-slate-600">{apt.department}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-slate-600">{apt.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant={apt.priority === "Urgent" ? "destructive" : apt.priority === "High" ? "warning" : "secondary"}
                          className={
                            apt.priority === "Urgent" ? "bg-red-100 text-red-700 border-red-200" :
                            apt.priority === "High" ? "bg-amber-100 text-amber-700 border-amber-200" :
                            "bg-slate-100 text-slate-600 border-slate-200"
                          }
                        >
                          {apt.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            apt.status === "Completed" ? "success" :
                            apt.status === "In Progress" ? "warning" :
                            apt.status === "Cancelled" ? "destructive" : "info"
                          }
                          className={
                            apt.status === "Completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                            apt.status === "In Progress" ? "bg-amber-100 text-amber-700 border-amber-200" :
                            apt.status === "Cancelled" ? "bg-red-100 text-red-700 border-red-200" :
                            "bg-blue-100 text-blue-700 border-blue-200"
                          }
                        >
                          {apt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-violet-50 hover:text-violet-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}
