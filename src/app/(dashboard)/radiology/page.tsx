"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, Edit, Scan, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

export default function RadiologyPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredScans = scans.filter(
    (scan) =>
      scan.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.scanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.testName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const completedCount = scans.filter((s) => s.status === "Completed").length
  const inProgressCount = scans.filter((s) => s.status === "In Progress").length
  const pendingCount = scans.filter((s) => s.status === "Pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Radiology</h1>
          <p className="text-slate-500">Manage radiology scans and imaging tests</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Link href="/radiology/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />New Scan</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Scan className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{scans.length}</p><p className="text-xs text-slate-500">Total Scans</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><CheckCircle className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-green-600">{completedCount}</p><p className="text-xs text-slate-500">Completed</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2"><Clock className="h-5 w-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p><p className="text-xs text-slate-500">In Progress</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2"><AlertCircle className="h-5 w-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-red-600">{pendingCount}</p><p className="text-xs text-slate-500">Pending</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Imaging Studies</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input type="search" placeholder="Search scans..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scan No.</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Modality</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Findings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScans.map((scan) => (
                <TableRow key={scan.id}>
                  <TableCell className="font-medium">{scan.scanNumber}</TableCell>
                  <TableCell>
                    <div><p className="font-medium">{scan.patient}</p><p className="text-xs text-slate-500">{scan.umr}</p></div>
                  </TableCell>
                  <TableCell>{scan.doctor}</TableCell>
                  <TableCell>{scan.testName}</TableCell>
                  <TableCell><Badge variant="outline">{scan.modality}</Badge></TableCell>
                  <TableCell>{scan.date}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{scan.findings}</TableCell>
                  <TableCell>
                    <Badge variant={scan.status === "Completed" ? "success" : scan.status === "In Progress" ? "warning" : "destructive"}>{scan.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
