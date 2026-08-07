"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Scissors, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const surgeries = [
  { id: "SUR001", surgeryNumber: "SRG2026001", patient: "Rajesh Kumar", umr: "UMR2026001", doctor: "Dr. Priya Sharma", surgeryName: "Coronary Artery Bypass", type: "Cardiac", scheduledDate: "2026-08-08", scheduledTime: "08:00 AM", ot: "OT-1", status: "Scheduled" },
  { id: "SUR002", surgeryNumber: "SRG2026002", patient: "Anita Patel", umr: "UMR2026002", doctor: "Dr. Amit Singh", surgeryName: "Knee Replacement", type: "Orthopedic", scheduledDate: "2026-08-07", scheduledTime: "10:00 AM", ot: "OT-2", status: "In Progress" },
  { id: "SUR003", surgeryNumber: "SRG2026003", patient: "Suresh Reddy", umr: "UMR2026003", doctor: "Dr. Neha Gupta", surgeryName: "Appendectomy", type: "General", scheduledDate: "2026-08-07", scheduledTime: "02:00 PM", ot: "OT-1", status: "Scheduled" },
  { id: "SUR004", surgeryNumber: "SRG2026004", patient: "Priya Verma", umr: "UMR2026004", doctor: "Dr. Rahul Joshi", surgeryName: "Cataract Surgery", type: "Ophthalmology", scheduledDate: "2026-08-06", scheduledTime: "09:00 AM", ot: "OT-3", status: "Completed" },
  { id: "SUR005", surgeryNumber: "SRG2026005", patient: "Mohammed Ali", umr: "UMR2026005", doctor: "Dr. Sanjay Mehta", surgeryName: "Cholecystectomy", type: "Laparoscopic", scheduledDate: "2026-08-06", scheduledTime: "11:00 AM", ot: "OT-2", status: "Completed" },
  { id: "SUR006", surgeryNumber: "SRG2026006", patient: "Deepika Singh", umr: "UMR2026006", doctor: "Dr. Priya Sharma", surgeryName: "Hernia Repair", type: "General", scheduledDate: "2026-08-05", scheduledTime: "03:00 PM", ot: "OT-1", status: "Cancelled" },
  { id: "SUR007", surgeryNumber: "SRG2026007", patient: "Vikram Rao", umr: "UMR2026007", doctor: "Dr. Amit Singh", surgeryName: "ACL Reconstruction", type: "Orthopedic", scheduledDate: "2026-08-05", scheduledTime: "10:30 AM", ot: "OT-2", status: "Completed" },
  { id: "SUR008", surgeryNumber: "SRG2026008", patient: "Kavita Joshi", umr: "UMR2026008", doctor: "Dr. Neha Gupta", surgeryName: "Hysterectomy", type: "Gynecology", scheduledDate: "2026-08-04", scheduledTime: "08:30 AM", ot: "OT-3", status: "Completed" },
]

const scheduledCount = surgeries.filter((s) => s.status === "Scheduled").length
const inProgressCount = surgeries.filter((s) => s.status === "In Progress").length
const completedCount = surgeries.filter((s) => s.status === "Completed").length
const cancelledCount = surgeries.filter((s) => s.status === "Cancelled").length

const statsData = [
  { title: "Total Surgeries", value: "8", icon: Scissors, gradient: "from-teal-500 to-cyan-600", shadow: "shadow-teal-500/30" },
  { title: "Scheduled", value: scheduledCount, icon: Clock, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30" },
  { title: "In Progress", value: inProgressCount, icon: AlertCircle, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
  { title: "Completed", value: completedCount, icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "Cancelled", value: cancelledCount, icon: XCircle, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30" },
]

export default function SurgeryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSurgeries = surgeries.filter(
    (surgery) =>
      surgery.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.surgeryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.surgeryName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Surgery Management</h1>
            <p className="text-slate-500">Manage surgical procedures and operating theaters</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Link href="/surgery/new">
              <Button size="sm" className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-500/30">
                <Plus className="mr-2 h-4 w-4" />Schedule Surgery
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
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-slate-500">{stat.title}</p>
                      </div>
                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="h-5 w-5 text-white" />
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
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Surgeries</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input type="search" placeholder="Search surgeries..." className="pl-10 w-64 border-slate-200 focus:border-teal-500 focus:ring-teal-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead className="font-semibold text-slate-700">Surgery No.</TableHead>
                    <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                    <TableHead className="font-semibold text-slate-700">Doctor</TableHead>
                    <TableHead className="font-semibold text-slate-700">Surgery</TableHead>
                    <TableHead className="font-semibold text-slate-700">Type</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date & Time</TableHead>
                    <TableHead className="font-semibold text-slate-700">OT</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSurgeries.map((surgery, index) => (
                    <motion.tr
                      key={surgery.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-slate-100 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-700">{surgery.surgeryNumber}</TableCell>
                      <TableCell>
                        <div><p className="font-medium text-slate-800">{surgery.patient}</p><p className="text-xs text-slate-500">{surgery.umr}</p></div>
                      </TableCell>
                      <TableCell className="text-slate-600">{surgery.doctor}</TableCell>
                      <TableCell className="font-medium text-slate-700">{surgery.surgeryName}</TableCell>
                      <TableCell><Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{surgery.type}</Badge></TableCell>
                      <TableCell>
                        <div><p className="text-slate-700">{surgery.scheduledDate}</p><p className="text-xs text-slate-500">{surgery.scheduledTime}</p></div>
                      </TableCell>
                      <TableCell className="text-slate-600">{surgery.ot}</TableCell>
                      <TableCell>
                        <Badge variant={surgery.status === "Completed" ? "success" : surgery.status === "In Progress" ? "warning" : surgery.status === "Scheduled" ? "info" : "destructive"} className={
                          surgery.status === "Completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          surgery.status === "In Progress" ? "bg-amber-100 text-amber-700 border-amber-200" :
                          surgery.status === "Scheduled" ? "bg-blue-100 text-blue-700 border-blue-200" :
                          "bg-red-100 text-red-700 border-red-200"
                        }>{surgery.status}</Badge>
                      </TableCell>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-teal-50 hover:text-teal-600"><Edit className="h-4 w-4" /></Button>
                        </div>
                      </td>
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
