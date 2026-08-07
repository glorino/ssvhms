"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Stethoscope,
  Clock,
  User,
  FileText,
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

const statsData = [
  { title: "Today's Visits", value: "245", icon: Stethoscope, gradient: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/30" },
  { title: "Completed", value: "180", icon: Clock, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "In Progress", value: "45", icon: User, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
  { title: "Scheduled", value: "20", icon: FileText, gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/30" },
]

const opdVisits = [
  { id: "OPD001", visitNumber: "VIS2026001", patient: "Rajesh Kumar", umr: "UMR2026001", doctor: "Dr. Priya Sharma", department: "Cardiology", date: "2026-08-07", symptoms: "Chest pain, shortness of breath", diagnosis: "Angina Pectoris", status: "Completed" },
  { id: "OPD002", visitNumber: "VIS2026002", patient: "Anita Patel", umr: "UMR2026002", doctor: "Dr. Amit Singh", department: "Orthopedics", date: "2026-08-07", symptoms: "Knee pain, swelling", diagnosis: "Osteoarthritis", status: "In Progress" },
  { id: "OPD003", visitNumber: "VIS2026003", patient: "Suresh Reddy", umr: "UMR2026003", doctor: "Dr. Neha Gupta", department: "Neurology", date: "2026-08-07", symptoms: "Recurrent headaches, dizziness", diagnosis: "Migraine", status: "Scheduled" },
  { id: "OPD004", visitNumber: "VIS2026004", patient: "Priya Verma", umr: "UMR2026004", doctor: "Dr. Rahul Joshi", department: "Dermatology", date: "2026-08-06", symptoms: "Skin rash, itching", diagnosis: "Eczema", status: "Completed" },
  { id: "OPD005", visitNumber: "VIS2026005", patient: "Mohammed Ali", umr: "UMR2026005", doctor: "Dr. Sanjay Mehta", department: "General Medicine", date: "2026-08-06", symptoms: "Fever, cough, body ache", diagnosis: "Viral Fever", status: "Completed" },
]

export default function OPDPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVisits = opdVisits.filter(
    (visit) =>
      visit.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.visitNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">OPD (Out Patient Department)</h1>
            <p className="text-slate-500">Manage outpatient visits and consultations</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/opd/new">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/30">
                <Plus className="mr-2 h-4 w-4" />
                New Visit
              </Button>
            </Link>
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-4">
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
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="h-6 w-6 text-white" />
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
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">OPD Visit History</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input
                    type="search"
                    placeholder="Search visits..."
                    className="pl-10 w-64 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
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
                    <TableHead className="font-semibold text-slate-700">Visit No.</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                    <TableHead className="font-semibold text-slate-700">Doctor</TableHead>
                    <TableHead className="font-semibold text-slate-700">Department</TableHead>
                    <TableHead className="font-semibold text-slate-700">Symptoms</TableHead>
                    <TableHead className="font-semibold text-slate-700">Diagnosis</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisits.map((visit, index) => (
                    <motion.tr
                      key={visit.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-slate-100 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-700">{visit.visitNumber}</TableCell>
                      <TableCell className="text-slate-600">{visit.date}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-800">{visit.patient}</p>
                          <p className="text-xs text-slate-500">{visit.umr}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{visit.doctor}</TableCell>
                      <TableCell className="text-slate-600">{visit.department}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-slate-600">{visit.symptoms}</TableCell>
                      <TableCell className="font-medium text-slate-700">{visit.diagnosis}</TableCell>
                      <TableCell>
                        <Badge
                          variant={visit.status === "Completed" ? "success" : visit.status === "In Progress" ? "warning" : "info"}
                          className={
                            visit.status === "Completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                            visit.status === "In Progress" ? "bg-amber-100 text-amber-700 border-amber-200" :
                            "bg-blue-100 text-blue-700 border-blue-200"
                          }
                        >
                          {visit.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-cyan-50 hover:text-cyan-600">
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
