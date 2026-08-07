"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const opdVisits = [
  {
    id: "OPD001",
    visitNumber: "VIS2026001",
    patient: "Rajesh Kumar",
    umr: "UMR2026001",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    date: "2026-08-07",
    symptoms: "Chest pain, shortness of breath",
    diagnosis: "Angina Pectoris",
    status: "Completed",
  },
  {
    id: "OPD002",
    visitNumber: "VIS2026002",
    patient: "Anita Patel",
    umr: "UMR2026002",
    doctor: "Dr. Amit Singh",
    department: "Orthopedics",
    date: "2026-08-07",
    symptoms: "Knee pain, swelling",
    diagnosis: "Osteoarthritis",
    status: "In Progress",
  },
  {
    id: "OPD003",
    visitNumber: "VIS2026003",
    patient: "Suresh Reddy",
    umr: "UMR2026003",
    doctor: "Dr. Neha Gupta",
    department: "Neurology",
    date: "2026-08-07",
    symptoms: "Recurrent headaches, dizziness",
    diagnosis: "Migraine",
    status: "Scheduled",
  },
  {
    id: "OPD004",
    visitNumber: "VIS2026004",
    patient: "Priya Verma",
    umr: "UMR2026004",
    doctor: "Dr. Rahul Joshi",
    department: "Dermatology",
    date: "2026-08-06",
    symptoms: "Skin rash, itching",
    diagnosis: "Eczema",
    status: "Completed",
  },
  {
    id: "OPD005",
    visitNumber: "VIS2026005",
    patient: "Mohammed Ali",
    umr: "UMR2026005",
    doctor: "Dr. Sanjay Mehta",
    department: "General Medicine",
    date: "2026-08-06",
    symptoms: "Fever, cough, body ache",
    diagnosis: "Viral Fever",
    status: "Completed",
  },
]

export default function OPDPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVisits = opdVisits.filter(
    (visit) =>
      visit.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.visitNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">OPD (Out Patient Department)</h1>
          <p className="text-slate-500">Manage outpatient visits and consultations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/opd/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Visit
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <Stethoscope className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">245</p>
                <p className="text-xs text-slate-500">Today&apos;s Visits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">180</p>
                <p className="text-xs text-slate-500">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2">
                <User className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">45</p>
                <p className="text-xs text-slate-500">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">20</p>
                <p className="text-xs text-slate-500">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visits Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>OPD Visit History</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Search visits..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visit No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Symptoms</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell className="font-medium">{visit.visitNumber}</TableCell>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{visit.patient}</p>
                      <p className="text-xs text-slate-500">{visit.umr}</p>
                    </div>
                  </TableCell>
                  <TableCell>{visit.doctor}</TableCell>
                  <TableCell>{visit.department}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{visit.symptoms}</TableCell>
                  <TableCell>{visit.diagnosis}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        visit.status === "Completed"
                          ? "success"
                          : visit.status === "In Progress"
                          ? "warning"
                          : "info"
                      }
                    >
                      {visit.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
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
