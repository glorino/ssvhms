"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, Edit, Scissors, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

export default function SurgeryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSurgeries = surgeries.filter(
    (surgery) =>
      surgery.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.surgeryNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.surgeryName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const scheduledCount = surgeries.filter((s) => s.status === "Scheduled").length
  const inProgressCount = surgeries.filter((s) => s.status === "In Progress").length
  const completedCount = surgeries.filter((s) => s.status === "Completed").length
  const cancelledCount = surgeries.filter((s) => s.status === "Cancelled").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Surgery Management</h1>
          <p className="text-slate-500">Manage surgical procedures and operating theaters</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Link href="/surgery/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />Schedule Surgery</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Scissors className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{surgeries.length}</p><p className="text-xs text-slate-500">Total Surgeries</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Clock className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold text-blue-600">{scheduledCount}</p><p className="text-xs text-slate-500">Scheduled</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2"><AlertCircle className="h-5 w-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p><p className="text-xs text-slate-500">In Progress</p></div>
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
              <div className="rounded-lg bg-red-100 p-2"><XCircle className="h-5 w-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-red-600">{cancelledCount}</p><p className="text-xs text-slate-500">Cancelled</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Surgeries</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input type="search" placeholder="Search surgeries..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Surgery No.</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Surgery</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>OT</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSurgeries.map((surgery) => (
                <TableRow key={surgery.id}>
                  <TableCell className="font-medium">{surgery.surgeryNumber}</TableCell>
                  <TableCell>
                    <div><p className="font-medium">{surgery.patient}</p><p className="text-xs text-slate-500">{surgery.umr}</p></div>
                  </TableCell>
                  <TableCell>{surgery.doctor}</TableCell>
                  <TableCell>{surgery.surgeryName}</TableCell>
                  <TableCell><Badge variant="outline">{surgery.type}</Badge></TableCell>
                  <TableCell>
                    <div><p>{surgery.scheduledDate}</p><p className="text-xs text-slate-500">{surgery.scheduledTime}</p></div>
                  </TableCell>
                  <TableCell>{surgery.ot}</TableCell>
                  <TableCell>
                    <Badge variant={surgery.status === "Completed" ? "success" : surgery.status === "In Progress" ? "warning" : surgery.status === "Scheduled" ? "info" : "destructive"}>{surgery.status}</Badge>
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
