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
  Star,
  Stethoscope,
  Users,
  Calendar,
  Award,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const stats = [
  { title: "Total Doctors", value: "32", icon: Stethoscope, gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/30" },
  { title: "Available Today", value: "28", icon: Users, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "Departments", value: "15", icon: Award, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30" },
  { title: "Appointments Today", value: "48", icon: Calendar, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
]

const doctors = [
  { id: "DOC001", name: "Dr. Priya Sharma", specialization: "Cardiology", qualification: "MD, DM Cardiology", experience: 15, consultationFee: 1500, rating: 4.8, patients: 1250, status: "Available", schedule: "Mon-Sat", gradient: "from-rose-500 to-pink-600" },
  { id: "DOC002", name: "Dr. Amit Singh", specialization: "Orthopedics", qualification: "MS Orthopedics", experience: 12, consultationFee: 1200, rating: 4.7, patients: 980, status: "Available", schedule: "Mon-Fri", gradient: "from-blue-500 to-cyan-600" },
  { id: "DOC003", name: "Dr. Neha Gupta", specialization: "Neurology", qualification: "MD, DM Neurology", experience: 18, consultationFee: 2000, rating: 4.9, patients: 1500, status: "On Leave", schedule: "Tue-Sat", gradient: "from-violet-500 to-purple-600" },
  { id: "DOC004", name: "Dr. Rahul Joshi", specialization: "Dermatology", qualification: "MD Dermatology", experience: 8, consultationFee: 1000, rating: 4.6, patients: 750, status: "Available", schedule: "Mon-Sat", gradient: "from-amber-500 to-orange-600" },
  { id: "DOC005", name: "Dr. Sanjay Mehta", specialization: "General Medicine", qualification: "MBBS, MD", experience: 20, consultationFee: 800, rating: 4.8, patients: 2000, status: "Available", schedule: "Mon-Sun", gradient: "from-emerald-500 to-teal-600" },
  { id: "DOC006", name: "Dr. Anita Kulkarni", specialization: "Pediatrics", qualification: "MD Pediatrics", experience: 10, consultationFee: 1000, rating: 4.7, patients: 890, status: "Available", schedule: "Mon-Sat", gradient: "from-cyan-500 to-blue-600" },
]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Doctors</h1>
            <p className="text-slate-500">Manage doctor profiles and schedules</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/doctors/new">
              <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/30">
                <Plus className="mr-2 h-4 w-4" />
                Add Doctor
              </Button>
            </Link>
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
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
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Doctor Directory</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input
                    type="search"
                    placeholder="Search doctors..."
                    className="pl-10 w-64 border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
                      <CardContent className="p-0">
                        <div className={`bg-gradient-to-br ${doctor.gradient} p-6 text-white relative overflow-hidden`}>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
                          <div className="relative flex items-center gap-4">
                            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                              <span className="text-xl font-bold">
                                {doctor.name.split(" ").slice(1).map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{doctor.name}</h3>
                              <p className="text-sm text-white/80">{doctor.specialization}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Experience</span>
                            <span className="font-semibold text-slate-800">{doctor.experience} years</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Qualification</span>
                            <span className="font-semibold text-slate-800">{doctor.qualification}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Fee</span>
                            <span className="font-semibold text-slate-800">₦{doctor.consultationFee}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Rating</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-slate-800">{doctor.rating}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-3">
                            <Link href={`/doctors/${doctor.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </Link>
                            <Link href={`/doctors/${doctor.id}/edit`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full border-slate-200 hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}
