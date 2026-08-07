"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Scan, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const scans = [
  { id: "RAD001", scanNumber: "RAD2026001", patient: "Rajesh Kumar", umr: "UMR2026001", doctor: "Dr. Priya Sharma", testName: "Chest X-Ray", modality: "X-Ray", date: "2026-08-07", findings: "Normal chest X-ray", status: "Completed" },
  { id: "RAD002", scanNumber: "RAD2026002", patient: "Anita Patel", umr: "UMR2026002", doctor: "Dr. Amit Singh", testName: "MRI Brain", modality: "MRI", date: "2026-08-07", findings: "-", status: "In Progress" },
  { id: "RAD003", scanNumber: "RAD2026003", patient: "Suresh Reddy", umr: "UMR2026003", doctor: "Dr. Neha Gupta", testName: "CT Scan Abdomen", modality: "CT Scan", date: "2026-08-07", findings: "-", status: "Pending" },
  { id: "RAD004", scanNumber: "RAD2026004", patient: "Priya Verma", umr: "UMR2026004", doctor: "Dr. Rahul Joshi", testName: "Ultrasound Abdomen", modality: "Ultrasound", date: "2026-08-06", findings: "No abnormality detected", status: "Completed" },
  { id: "RAD005", scanNumber: "RAD2026005", patient: "Mohammed Ali", umr: "UMR2026005", doctor: "Dr. Sanjay Mehta", testName: "X-Ray Knee", modality: "X-Ray", date: "2026-08-06", findings: "Fracture detected", status: "Completed" },
  { id: "RAD006", scanNumber: "RAD2026006", patient: "Deepika Singh", umr: "UMR2026006", doctor: "Dr. Priya Sharma", testName: "MRI Spine", modality: "MRI", date: "2026-08-06", findings: "-", status: "Pending" },
  { id: "RAD007", scanNumber: "RAD2026007", patient: "Vikram Rao", umr: "UMR2026007", doctor: "Dr. Amit Singh", testName: "CT Scan Head", modality: "CT Scan", date: "2026-08-05", findings: "No intracranial bleed", status: "Completed" },
  { id: "RAD008", scanNumber: "RAD2026008", patient: "Kavita Joshi", umr: "UMR2026008", doctor: "Dr. Neha Gupta", testName: "Ultrasound Pelvis", modality: "Ultrasound", date: "2026-08-05", findings: "-", status: "In Progress" },
]

const statsData = [
  { title: "Total Scans", value: "8", icon: Scan, gradient: "from-pink-500 to-rose-600", shadow: "shadow-pink-500/30" },
  { title: "Completed", value: "4", icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "In Progress", value: "2", icon: Clock, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
  { title: "Pending", value: "2", icon: AlertCircle, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30" },
]

export default function RadiologyPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredScans = scans.filter(
    (scan) =>
      scan.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.scanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.testName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Radiology</h1>
            <p className="text-slate-500">Manage radiology scans and imaging tests</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Link href="/radiology/new">
              <Button size="sm" className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg shadow-pink-500/30">
                <Plus className="mr-2 h-4 w-4" />New Scan
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
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Imaging Studies</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input type="search" placeholder="Search scans..." className="pl-10 w-64 border-slate-200 focus:border-pink-500 focus:ring-pink-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead className="font-semibold text-slate-700">Scan No.</TableHead>
                    <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                    <TableHead className="font-semibold text-slate-700">Doctor</TableHead>
                    <TableHead className="font-semibold text-slate-700">Test Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Modality</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Findings</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredScans.map((scan, index) => (
                    <motion.tr
                      key={scan.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-slate-100 hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-rose-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-700">{scan.scanNumber}</TableCell>
                      <TableCell>
                        <div><p className="font-medium text-slate-800">{scan.patient}</p><p className="text-xs text-slate-500">{scan.umr}</p></div>
                      </TableCell>
                      <TableCell className="text-slate-600">{scan.doctor}</TableCell>
                      <TableCell className="font-medium text-slate-700">{scan.testName}</TableCell>
                      <TableCell><Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{scan.modality}</Badge></TableCell>
                      <TableCell className="text-slate-600">{scan.date}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-slate-600">{scan.findings}</TableCell>
                      <TableCell>
                        <Badge variant={scan.status === "Completed" ? "success" : scan.status === "In Progress" ? "warning" : "destructive"} className={
                          scan.status === "Completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          scan.status === "In Progress" ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-red-100 text-red-700 border-red-200"
                        }>{scan.status}</Badge>
                      </TableCell>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-pink-50 hover:text-pink-600"><Edit className="h-4 w-4" /></Button>
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
