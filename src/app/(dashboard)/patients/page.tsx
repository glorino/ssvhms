"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  FileText,
  Phone,
  Mail,
  Calendar,
  MapPin,
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

const mockPatients = [
  {
    id: "PT001",
    umr: "UMR2026001",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "rajesh@email.com",
    bloodGroup: "O+",
    lastVisit: "2026-08-05",
    status: "Active",
  },
  {
    id: "PT002",
    umr: "UMR2026002",
    name: "Anita Patel",
    age: 32,
    gender: "Female",
    phone: "+91 98765 43211",
    email: "anita@email.com",
    bloodGroup: "A+",
    lastVisit: "2026-08-04",
    status: "Active",
  },
  {
    id: "PT003",
    umr: "UMR2026003",
    name: "Suresh Reddy",
    age: 58,
    gender: "Male",
    phone: "+91 98765 43212",
    email: "suresh@email.com",
    bloodGroup: "B+",
    lastVisit: "2026-08-03",
    status: "Active",
  },
  {
    id: "PT004",
    umr: "UMR2026004",
    name: "Priya Verma",
    age: 28,
    gender: "Female",
    phone: "+91 98765 43213",
    email: "priya@email.com",
    bloodGroup: "AB+",
    lastVisit: "2026-08-02",
    status: "Inactive",
  },
  {
    id: "PT005",
    umr: "UMR2026005",
    name: "Mohammed Ali",
    age: 67,
    gender: "Male",
    phone: "+91 98765 43214",
    email: "mohammed@email.com",
    bloodGroup: "O-",
    lastVisit: "2026-08-01",
    status: "Active",
  },
  {
    id: "PT006",
    umr: "UMR2026006",
    name: "Deepika Singh",
    age: 41,
    gender: "Female",
    phone: "+91 98765 43215",
    email: "deepika@email.com",
    bloodGroup: "A-",
    lastVisit: "2026-07-30",
    status: "Active",
  },
  {
    id: "PT007",
    umr: "UMR2026007",
    name: "Arun Sharma",
    age: 55,
    gender: "Male",
    phone: "+91 98765 43216",
    email: "arun@email.com",
    bloodGroup: "B-",
    lastVisit: "2026-07-28",
    status: "Active",
  },
  {
    id: "PT008",
    umr: "UMR2026008",
    name: "Kavita Joshi",
    age: 36,
    gender: "Female",
    phone: "+91 98765 43217",
    email: "kavita@email.com",
    bloodGroup: "AB-",
    lastVisit: "2026-07-25",
    status: "Active",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.umr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
          <p className="text-slate-500">Manage patient records and medical history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/patients/new">
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              New Patient
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-slate-500">Total Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">11,234</div>
            <p className="text-xs text-slate-500">Active Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">48</div>
            <p className="text-xs text-slate-500">New This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">156</div>
            <p className="text-xs text-slate-500">Currently Admitted</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Patient List</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Search by name, UMR, phone..."
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
                <TableHead>UMR</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.umr}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {patient.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {patient.age} / {patient.gender}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{patient.phone}</span>
                      <span className="text-xs text-slate-500">{patient.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.bloodGroup}</Badge>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge
                      variant={patient.status === "Active" ? "success" : "secondary"}
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/patients/${patient.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/patients/${patient.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
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
