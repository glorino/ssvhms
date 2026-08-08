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
  BedDouble,
  Clock,
  AlertCircle,
  CheckCircle,
  Building2,
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

const bedStatus = [
  { ward: "ICU", total: 10, occupied: 9, vacant: 1, reserved: 0, gradient: "from-rose-500 to-pink-600" },
  { ward: "General Ward", total: 40, occupied: 32, vacant: 6, reserved: 2, gradient: "from-blue-500 to-indigo-600" },
  { ward: "Private", total: 20, occupied: 15, vacant: 4, reserved: 1, gradient: "from-violet-500 to-purple-600" },
  { ward: "Semi-Private", total: 30, occupied: 22, vacant: 7, reserved: 1, gradient: "from-cyan-500 to-blue-600" },
  { ward: "Emergency", total: 10, occupied: 7, vacant: 3, reserved: 0, gradient: "from-amber-500 to-orange-600" },
  { ward: "Maternity", total: 15, occupied: 11, vacant: 3, reserved: 1, gradient: "from-emerald-500 to-teal-600" },
]

const ipdAdmissions = [
  { id: "IPD001", admissionNumber: "ADM2026001", patient: "Rajesh Kumar", umr: "UMR2026001", doctor: "Dr. Priya Sharma", department: "Cardiology", bed: "ICU-03", ward: "ICU", admissionDate: "2026-08-05", diagnosis: "Acute Myocardial Infarction", status: "Admitted" },
  { id: "IPD002", admissionNumber: "ADM2026002", patient: "Anita Patel", umr: "UMR2026002", doctor: "Dr. Amit Singh", department: "Orthopedics", bed: "PW-12", ward: "Private", admissionDate: "2026-08-04", diagnosis: "Fracture Left Femur", status: "In Treatment" },
  { id: "IPD003", admissionNumber: "ADM2026003", patient: "Suresh Reddy", umr: "UMR2026003", doctor: "Dr. Neha Gupta", department: "Neurology", bed: "GW-25", ward: "General Ward", admissionDate: "2026-08-03", diagnosis: "Stroke", status: "In Treatment" },
  { id: "IPD004", admissionNumber: "ADM2026004", patient: "Priya Verma", umr: "UMR2026004", doctor: "Dr. Rahul Joshi", department: "Dermatology", bed: "SP-08", ward: "Semi-Private", admissionDate: "2026-08-02", diagnosis: "Severe Burns", status: "Discharged" },
  { id: "IPD005", admissionNumber: "ADM2026005", patient: "Mohammed Ali", umr: "UMR2026005", doctor: "Dr. Sanjay Mehta", department: "General Medicine", bed: "GW-30", ward: "General Ward", admissionDate: "2026-08-01", diagnosis: "Pneumonia", status: "Admitted" },
]

const totalBeds = bedStatus.reduce((acc, ward) => acc + ward.total, 0)
const totalOccupied = bedStatus.reduce((acc, ward) => acc + ward.occupied, 0)
const totalVacant = bedStatus.reduce((acc, ward) => acc + ward.vacant, 0)
const totalReserved = bedStatus.reduce((acc, ward) => acc + ward.reserved, 0)

const statsData = [
  { title: "Total Beds", value: totalBeds, icon: BedDouble, gradient: "from-slate-500 to-slate-600", shadow: "shadow-slate-500/30" },
  { title: "Occupied", value: totalOccupied, icon: AlertCircle, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30" },
  { title: "Vacant", value: totalVacant, icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "Reserved", value: totalReserved, icon: Clock, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
]

export default function IPDPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAdmissions = ipdAdmissions.filter(
    (admission) =>
      admission.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">IPD (In Patient Department)</h1>
            <p className="text-slate-500">Manage inpatient admissions and bed management</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/ipd/new">
              <Button size="sm" className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg shadow-rose-500/30">
                <Plus className="mr-2 h-4 w-4" />
                New Admission
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
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Bed Status by Ward</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {bedStatus.map((ward, index) => (
                  <motion.div
                    key={ward.ward}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                  >
                    <div className="rounded-xl border-0 p-4 bg-white shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${ward.gradient} flex items-center justify-center`}>
                            <Building2 className="h-4 w-4 text-white" />
                          </div>
                          <h3 className="font-bold text-slate-800">{ward.ward}</h3>
                        </div>
                        <Badge variant="outline" className="bg-slate-50">{ward.total} beds</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Occupied</span>
                          <span className="font-bold text-rose-600">{ward.occupied}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Vacant</span>
                          <span className="font-bold text-emerald-600">{ward.vacant}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Reserved</span>
                          <span className="font-bold text-amber-600">{ward.reserved}</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Current Admissions</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input
                    type="search"
                    placeholder="Search admissions..."
                    className="pl-10 w-64 border-slate-200 focus:border-rose-500 focus:ring-rose-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ overflowX: "auto" }}>
                <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead className="font-semibold text-slate-700">Admission No.</TableHead>
                    <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                    <TableHead className="font-semibold text-slate-700">Doctor</TableHead>
                    <TableHead className="font-semibold text-slate-700">Ward/Bed</TableHead>
                    <TableHead className="font-semibold text-slate-700">Admission Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Diagnosis</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmissions.map((admission, index) => (
                    <motion.tr
                      key={admission.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-slate-100 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-700">{admission.admissionNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-800">{admission.patient}</p>
                          <p className="text-xs text-slate-500">{admission.umr}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{admission.doctor}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-slate-800">{admission.ward}</p>
                          <p className="text-xs text-slate-500">{admission.bed}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{admission.admissionDate}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-slate-600">{admission.diagnosis}</TableCell>
                      <TableCell>
                        <Badge
                          variant={admission.status === "Admitted" ? "info" : admission.status === "In Treatment" ? "warning" : "success"}
                          className={
                            admission.status === "Admitted" ? "bg-blue-100 text-blue-700 border-blue-200" :
                            admission.status === "In Treatment" ? "bg-amber-100 text-amber-700 border-amber-200" :
                            "bg-emerald-100 text-emerald-700 border-emerald-200"
                          }
                        >
                          {admission.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-rose-50 hover:text-rose-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}
