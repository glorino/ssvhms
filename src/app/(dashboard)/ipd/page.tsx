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
  BedDouble,
  Clock,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
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

const ipdAdmissions = [
  {
    id: "IPD001",
    admissionNumber: "ADM2026001",
    patient: "Rajesh Kumar",
    umr: "UMR2026001",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    bed: "ICU-03",
    ward: "ICU",
    admissionDate: "2026-08-05",
    diagnosis: "Acute Myocardial Infarction",
    status: "Admitted",
  },
  {
    id: "IPD002",
    admissionNumber: "ADM2026002",
    patient: "Anita Patel",
    umr: "UMR2026002",
    doctor: "Dr. Amit Singh",
    department: "Orthopedics",
    bed: "PW-12",
    ward: "Private",
    admissionDate: "2026-08-04",
    diagnosis: "Fracture Left Femur",
    status: "In Treatment",
  },
  {
    id: "IPD003",
    admissionNumber: "ADM2026003",
    patient: "Suresh Reddy",
    umr: "UMR2026003",
    doctor: "Dr. Neha Gupta",
    department: "Neurology",
    bed: "GW-25",
    ward: "General Ward",
    admissionDate: "2026-08-03",
    diagnosis: "Stroke",
    status: "In Treatment",
  },
  {
    id: "IPD004",
    admissionNumber: "ADM2026004",
    patient: "Priya Verma",
    umr: "UMR2026004",
    doctor: "Dr. Rahul Joshi",
    department: "Dermatology",
    bed: "SP-08",
    ward: "Semi-Private",
    admissionDate: "2026-08-02",
    diagnosis: "Severe Burns",
    status: "Discharged",
  },
  {
    id: "IPD005",
    admissionNumber: "ADM2026005",
    patient: "Mohammed Ali",
    umr: "UMR2026005",
    doctor: "Dr. Sanjay Mehta",
    department: "General Medicine",
    bed: "GW-30",
    ward: "General Ward",
    admissionDate: "2026-08-01",
    diagnosis: "Pneumonia",
    status: "Admitted",
  },
]

const bedStatus = [
  { ward: "ICU", total: 10, occupied: 9, vacant: 1, reserved: 0 },
  { ward: "General Ward", total: 40, occupied: 32, vacant: 6, reserved: 2 },
  { ward: "Private", total: 20, occupied: 15, vacant: 4, reserved: 1 },
  { ward: "Semi-Private", total: 30, occupied: 22, vacant: 7, reserved: 1 },
  { ward: "Emergency", total: 10, occupied: 7, vacant: 3, reserved: 0 },
  { ward: "Maternity", total: 15, occupied: 11, vacant: 3, reserved: 1 },
]

export default function IPDPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAdmissions = ipdAdmissions.filter(
    (admission) =>
      admission.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalBeds = bedStatus.reduce((acc, ward) => acc + ward.total, 0)
  const totalOccupied = bedStatus.reduce((acc, ward) => acc + ward.occupied, 0)
  const totalVacant = bedStatus.reduce((acc, ward) => acc + ward.vacant, 0)
  const totalReserved = bedStatus.reduce((acc, ward) => acc + ward.reserved, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">IPD (In Patient Department)</h1>
          <p className="text-slate-500">Manage inpatient admissions and bed management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/ipd/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Admission
            </Button>
          </Link>
        </div>
      </div>

      {/* Bed Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-2">
                <BedDouble className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalBeds}</p>
                <p className="text-xs text-slate-500">Total Beds</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{totalOccupied}</p>
                <p className="text-xs text-slate-500">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{totalVacant}</p>
                <p className="text-xs text-slate-500">Vacant</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{totalReserved}</p>
                <p className="text-xs text-slate-500">Reserved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bed Status by Ward */}
      <Card>
        <CardHeader>
          <CardTitle>Bed Status by Ward</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bedStatus.map((ward) => (
              <div key={ward.ward} className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{ward.ward}</h3>
                  <Badge variant="outline">{ward.total} beds</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Occupied</span>
                    <span className="font-medium text-red-600">{ward.occupied}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Vacant</span>
                    <span className="font-medium text-green-600">{ward.vacant}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Reserved</span>
                    <span className="font-medium text-yellow-600">{ward.reserved}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{
                        width: `${(ward.occupied / ward.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admissions Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Current Admissions</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Search admissions..."
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
                <TableHead>Admission No.</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Ward/Bed</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell className="font-medium">{admission.admissionNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{admission.patient}</p>
                      <p className="text-xs text-slate-500">{admission.umr}</p>
                    </div>
                  </TableCell>
                  <TableCell>{admission.doctor}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{admission.ward}</p>
                      <p className="text-xs text-slate-500">{admission.bed}</p>
                    </div>
                  </TableCell>
                  <TableCell>{admission.admissionDate}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{admission.diagnosis}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        admission.status === "Admitted"
                          ? "info"
                          : admission.status === "In Treatment"
                          ? "warning"
                          : admission.status === "Discharged"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {admission.status}
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
