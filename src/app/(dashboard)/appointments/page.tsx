"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Eye,
  Edit,
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

const appointments = [
  {
    id: "APT001",
    patient: "Rajesh Kumar",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    date: "2026-08-07",
    time: "10:00 AM",
    status: "Completed",
    priority: "Normal",
    reason: "Chest pain consultation",
  },
  {
    id: "APT002",
    patient: "Anita Patel",
    doctor: "Dr. Amit Singh",
    department: "Orthopedics",
    date: "2026-08-07",
    time: "10:30 AM",
    status: "In Progress",
    priority: "High",
    reason: "Knee pain",
  },
  {
    id: "APT003",
    patient: "Suresh Reddy",
    doctor: "Dr. Neha Gupta",
    department: "Neurology",
    date: "2026-08-07",
    time: "11:00 AM",
    status: "Scheduled",
    priority: "Normal",
    reason: "Headache follow-up",
  },
  {
    id: "APT004",
    patient: "Priya Verma",
    doctor: "Dr. Rahul Joshi",
    department: "Dermatology",
    date: "2026-08-07",
    time: "11:30 AM",
    status: "Scheduled",
    priority: "Low",
    reason: "Skin rash",
  },
  {
    id: "APT005",
    patient: "Mohammed Ali",
    doctor: "Dr. Sanjay Mehta",
    department: "General Medicine",
    date: "2026-08-07",
    time: "12:00 PM",
    status: "Cancelled",
    priority: "Normal",
    reason: "General checkup",
  },
  {
    id: "APT006",
    patient: "Deepika Singh",
    doctor: "Dr. Anita Kulkarni",
    department: "Pediatrics",
    date: "2026-08-07",
    time: "12:30 PM",
    status: "Scheduled",
    priority: "Urgent",
    reason: "Fever and cough",
  },
  {
    id: "APT007",
    patient: "Arun Sharma",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    date: "2026-08-07",
    time: "02:00 PM",
    status: "Scheduled",
    priority: "Normal",
    reason: "ECG review",
  },
  {
    id: "APT008",
    patient: "Kavita Joshi",
    doctor: "Dr. Amit Singh",
    department: "Orthopedics",
    date: "2026-08-07",
    time: "02:30 PM",
    status: "Scheduled",
    priority: "High",
    reason: "Post-surgery follow-up",
  },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("2026-08-07")

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: appointments.length,
    completed: appointments.filter((a) => a.status === "Completed").length,
    inProgress: appointments.filter((a) => a.status === "In Progress").length,
    scheduled: appointments.filter((a) => a.status === "Scheduled").length,
    cancelled: appointments.filter((a) => a.status === "Cancelled").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500">Manage patient appointments and scheduling</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-40"
          />
          <Link href="/appointments/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-2">
                <Calendar className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-slate-500">Total</p>
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
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-xs text-slate-500">Completed</p>
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
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                <p className="text-xs text-slate-500">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
                <p className="text-xs text-slate-500">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                <p className="text-xs text-slate-500">Cancelled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Today&apos;s Appointments</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input
                  type="search"
                  placeholder="Search appointments..."
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
                <TableHead>ID</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-400" />
                      {apt.time}
                    </div>
                  </TableCell>
                  <TableCell>{apt.patient}</TableCell>
                  <TableCell>{apt.doctor}</TableCell>
                  <TableCell>{apt.department}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{apt.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        apt.priority === "Urgent"
                          ? "destructive"
                          : apt.priority === "High"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {apt.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        apt.status === "Completed"
                          ? "success"
                          : apt.status === "In Progress"
                          ? "warning"
                          : apt.status === "Cancelled"
                          ? "destructive"
                          : "info"
                      }
                    >
                      {apt.status}
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
