"use client"

import React, { useState, useMemo } from "react"
import { usePatients } from "@/lib/patient-context"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Users,
  Activity,
  TrendingUp,
  Heart,
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

function getAge(dob: string): number {
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

function getLastVisit(patient: { visits: { date: string }[] }): string {
  if (patient.visits.length === 0) return "N/A"
  return patient.visits.reduce((latest, v) => (v.date > latest ? v.date : latest), patient.visits[0].date)
}

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { patients } = usePatients()

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const stats = useMemo(() => {
    const totalPatients = patients.length
    const activePatients = patients.filter((p) => p.status === "Active").length
    const newThisMonth = patients.filter((p) => {
      const d = new Date(p.registeredAt)
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    }).length
    const currentlyAdmitted = patients.filter((p) => p.status === "Admitted").length
    return [
      {
        title: "Total Patients",
        value: totalPatients.toLocaleString(),
        icon: Users,
        gradient: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-500/30",
        change: "",
      },
      {
        title: "Active Patients",
        value: activePatients.toLocaleString(),
        icon: Activity,
        gradient: "from-emerald-500 to-teal-600",
        shadow: "shadow-emerald-500/30",
        change: "",
      },
      {
        title: "New This Month",
        value: newThisMonth.toLocaleString(),
        icon: TrendingUp,
        gradient: "from-orange-500 to-amber-600",
        shadow: "shadow-orange-500/30",
        change: "",
      },
      {
        title: "Currently Admitted",
        value: currentlyAdmitted.toLocaleString(),
        icon: Heart,
        gradient: "from-rose-500 to-pink-600",
        shadow: "shadow-rose-500/30",
        change: "",
      },
    ]
  }, [patients, currentMonth, currentYear])

  const filteredPatients = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return patients.filter((p) => {
      const fullName = `${p.firstName} ${p.lastName}`.toLowerCase()
      return (
        fullName.includes(q) ||
        p.uniqueNumber.toLowerCase().includes(q) ||
        p.phone.includes(q)
      )
    })
  }, [patients, searchTerm])

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Patients</h1>
            <p className="text-slate-500">Manage patient records and medical history</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/patients/new">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
                <UserPlus className="mr-2 h-4 w-4" />
                New Patient
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
                        <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Patient List</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                    <Input
                      type="search"
                      placeholder="Search by name, UMR, phone..."
                      className="pl-10 w-64 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead className="font-semibold text-slate-700">UMR</TableHead>
                    <TableHead className="font-semibold text-slate-700">Patient Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Age/Gender</TableHead>
                    <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                    <TableHead className="font-semibold text-slate-700">Blood Group</TableHead>
                    <TableHead className="font-semibold text-slate-700">Last Visit</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient, index) => (
                    <motion.tr
                      key={patient.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-700">{patient.uniqueNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                            <span className="text-xs font-bold text-white">
                              {patient.firstName[0]}{patient.lastName[0]}
                            </span>
                          </div>
                          <span className="font-medium text-slate-800">{patient.firstName} {patient.lastName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {getAge(patient.dateOfBirth)} / {patient.gender}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm text-slate-700">{patient.phone}</span>
                          <span className="text-xs text-slate-500">{patient.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{patient.bloodGroup}</Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{getLastVisit(patient)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={patient.status === "Active" ? "success" : "secondary"}
                          className={
                            patient.status === "Active"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : patient.status === "Admitted"
                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/patients/${patient.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/patients/${patient.id}/edit`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-amber-50 hover:text-amber-600">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
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
