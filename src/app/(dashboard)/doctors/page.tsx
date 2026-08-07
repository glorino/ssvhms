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
  Trash2,
  Star,
  Clock,
  Calendar,
  IndianRupee,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const doctors = [
  {
    id: "DOC001",
    name: "Dr. Priya Sharma",
    specialization: "Cardiology",
    department: "Cardiology",
    qualification: "MD, DM Cardiology",
    experience: 15,
    consultationFee: 1500,
    rating: 4.8,
    patients: 1250,
    status: "Available",
    schedule: "Mon-Sat",
  },
  {
    id: "DOC002",
    name: "Dr. Amit Singh",
    specialization: "Orthopedics",
    department: "Orthopedics",
    qualification: "MS Orthopedics",
    experience: 12,
    consultationFee: 1200,
    rating: 4.7,
    patients: 980,
    status: "Available",
    schedule: "Mon-Fri",
  },
  {
    id: "DOC003",
    name: "Dr. Neha Gupta",
    specialization: "Neurology",
    department: "Neurology",
    qualification: "MD, DM Neurology",
    experience: 18,
    consultationFee: 2000,
    rating: 4.9,
    patients: 1500,
    status: "On Leave",
    schedule: "Tue-Sat",
  },
  {
    id: "DOC004",
    name: "Dr. Rahul Joshi",
    specialization: "Dermatology",
    department: "Dermatology",
    qualification: "MD Dermatology",
    experience: 8,
    consultationFee: 1000,
    rating: 4.6,
    patients: 750,
    status: "Available",
    schedule: "Mon-Sat",
  },
  {
    id: "DOC005",
    name: "Dr. Sanjay Mehta",
    specialization: "General Medicine",
    department: "General Medicine",
    qualification: "MBBS, MD",
    experience: 20,
    consultationFee: 800,
    rating: 4.8,
    patients: 2000,
    status: "Available",
    schedule: "Mon-Sun",
  },
  {
    id: "DOC006",
    name: "Dr. Anita Kulkarni",
    specialization: "Pediatrics",
    department: "Pediatrics",
    qualification: "MD Pediatrics",
    experience: 10,
    consultationFee: 1000,
    rating: 4.7,
    patients: 890,
    status: "Available",
    schedule: "Mon-Sat",
  },
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctors</h1>
          <p className="text-slate-500">Manage doctor profiles and schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/doctors/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-slate-500">Total Doctors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">28</div>
            <p className="text-xs text-slate-500">Available Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">15</div>
            <p className="text-xs text-slate-500">Departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">48</div>
            <p className="text-xs text-slate-500">Appointments Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Doctor Directory</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
              <Input
                type="search"
                placeholder="Search doctors..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-lg font-semibold">
                            {doctor.name.split(" ").slice(1).map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{doctor.name}</h3>
                          <p className="text-sm text-white/80">{doctor.specialization}</p>
                        </div>
                      </div>
                      <Badge
                        variant={doctor.status === "Available" ? "success" : "secondary"}
                      >
                        {doctor.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Experience</span>
                      <span className="font-medium">{doctor.experience} years</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Qualification</span>
                      <span className="font-medium">{doctor.qualification}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Consultation Fee</span>
                      <span className="font-medium">₹{doctor.consultationFee}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Patients</span>
                      <span className="font-medium">{doctor.patients}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Schedule</span>
                      <span className="font-medium">{doctor.schedule}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Link href={`/doctors/${doctor.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/doctors/${doctor.id}/edit`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
