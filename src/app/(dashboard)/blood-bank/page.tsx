"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Droplet, CheckCircle, Clock, AlertCircle, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const bloodInventory = [
  { bloodGroup: "A+", units: 25, minUnits: 10, lastUpdated: "2026-08-07" },
  { bloodGroup: "A-", units: 8, minUnits: 5, lastUpdated: "2026-08-07" },
  { bloodGroup: "B+", units: 30, minUnits: 10, lastUpdated: "2026-08-07" },
  { bloodGroup: "B-", units: 12, minUnits: 5, lastUpdated: "2026-08-06" },
  { bloodGroup: "AB+", units: 6, minUnits: 3, lastUpdated: "2026-08-06" },
  { bloodGroup: "AB-", units: 3, minUnits: 2, lastUpdated: "2026-08-05" },
  { bloodGroup: "O+", units: 35, minUnits: 15, lastUpdated: "2026-08-07" },
  { bloodGroup: "O-", units: 10, minUnits: 8, lastUpdated: "2026-08-07" },
]

const donations = [
  { id: "DON001", donorName: "Rajesh Kumar", bloodGroup: "A+", units: 1, donationDate: "2026-08-07", hemoglobin: "14.2", bp: "120/80", status: "Approved" },
  { id: "DON002", donorName: "Vikram Rao", bloodGroup: "B+", units: 1, donationDate: "2026-08-06", hemoglobin: "13.8", bp: "118/76", status: "Approved" },
  { id: "DON003", donorName: "Anita Sharma", bloodGroup: "O+", units: 1, donationDate: "2026-08-06", hemoglobin: "12.5", bp: "110/70", status: "Approved" },
  { id: "DON004", donorName: "Suresh Reddy", bloodGroup: "A-", units: 1, donationDate: "2026-08-05", hemoglobin: "15.0", bp: "125/82", status: "Approved" },
  { id: "DON005", donorName: "Mohammed Ali", bloodGroup: "AB+", units: 1, donationDate: "2026-08-05", hemoglobin: "11.8", bp: "108/68", status: "Rejected" },
  { id: "DON006", donorName: "Kavita Joshi", bloodGroup: "B-", units: 1, donationDate: "2026-08-04", hemoglobin: "13.2", bp: "115/75", status: "Approved" },
]

const issues = [
  { id: "ISS001", issueNumber: "BI2026001", patient: "Rajesh Kumar", bloodGroup: "A+", units: 2, issueDate: "2026-08-07", doctor: "Dr. Priya Sharma", department: "Cardiology", status: "Completed" },
  { id: "ISS002", issueNumber: "BI2026002", patient: "Anita Patel", bloodGroup: "O+", units: 1, issueDate: "2026-08-06", doctor: "Dr. Amit Singh", department: "Orthopedics", status: "Completed" },
  { id: "ISS003", issueNumber: "BI2026003", patient: "Suresh Reddy", bloodGroup: "B+", units: 3, issueDate: "2026-08-06", doctor: "Dr. Neha Gupta", department: "Neurology", status: "Pending" },
  { id: "ISS004", issueNumber: "BI2026004", patient: "Priya Verma", bloodGroup: "AB+", units: 1, issueDate: "2026-08-05", doctor: "Dr. Rahul Joshi", department: "Oncology", status: "Completed" },
  { id: "ISS005", issueNumber: "BI2026005", patient: "Mohammed Ali", bloodGroup: "O-", units: 2, issueDate: "2026-08-05", doctor: "Dr. Sanjay Mehta", department: "General Medicine", status: "Completed" },
]

const totalUnits = bloodInventory.reduce((acc, item) => acc + item.units, 0)
const lowStockGroups = bloodInventory.filter((item) => item.units < item.minUnits).length

const statsData = [
  { title: "Total Units", value: totalUnits, icon: Droplet, gradient: "from-red-500 to-rose-600", shadow: "shadow-red-500/30" },
  { title: "Total Donations", value: "6", icon: Heart, gradient: "from-pink-500 to-rose-600", shadow: "shadow-pink-500/30" },
  { title: "Issues Today", value: "5", icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "Low Stock Groups", value: lowStockGroups, icon: AlertCircle, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
]

export default function BloodBankPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDonations = donations.filter(
    (donation) => donation.donorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredIssues = issues.filter(
    (issue) => issue.patient.toLowerCase().includes(searchTerm.toLowerCase()) || issue.issueNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Blood Bank</h1>
            <p className="text-slate-500">Manage blood donations, issues, and inventory</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Link href="/blood-bank/donate">
              <Button size="sm" className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30">
                <Plus className="mr-2 h-4 w-4" />Record Donation
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
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Blood Group Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {bloodInventory.map((item, index) => (
                  <motion.div
                    key={item.bloodGroup}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className={`rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 ${item.units < item.minUnits ? "bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200" : "bg-white border-2 border-slate-100"}`}
                  >
                    <p className="text-2xl font-bold text-red-600">{item.bloodGroup}</p>
                    <p className={`text-3xl font-bold ${item.units < item.minUnits ? "text-red-600" : "text-slate-800"}`}>{item.units}</p>
                    <p className="text-xs text-slate-500">units</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Tabs defaultValue="donations">
            <TabsList className="bg-white shadow-md rounded-xl p-1">
              <TabsTrigger value="donations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-600 data-[state=active]:text-white rounded-lg">Donations</TabsTrigger>
              <TabsTrigger value="issues" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-600 data-[state=active]:text-white rounded-lg">Issues</TabsTrigger>
            </TabsList>

            <TabsContent value="donations">
              <Card className="shadow-lg border-0 mt-4">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Donation Records</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                      <Input type="search" placeholder="Search donors..." className="pl-10 w-64 border-slate-200 focus:border-red-500 focus:ring-red-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Donor Name</TableHead>
                        <TableHead className="font-semibold text-slate-700">Blood Group</TableHead>
                        <TableHead className="font-semibold text-slate-700">Units</TableHead>
                        <TableHead className="font-semibold text-slate-700">Donation Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">Hb (g/dL)</TableHead>
                        <TableHead className="font-semibold text-slate-700">BP</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDonations.map((donation, index) => (
                        <motion.tr
                          key={donation.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{donation.donorName}</TableCell>
                          <TableCell><Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">{donation.bloodGroup}</Badge></TableCell>
                          <TableCell className="text-slate-600">{donation.units}</TableCell>
                          <TableCell className="text-slate-600">{donation.donationDate}</TableCell>
                          <TableCell className="text-slate-600">{donation.hemoglobin}</TableCell>
                          <TableCell className="text-slate-600">{donation.bp}</TableCell>
                          <TableCell>
                            <Badge variant={donation.status === "Approved" ? "success" : "destructive"} className={donation.status === "Approved" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}>
                              {donation.status}
                            </Badge>
                          </TableCell>
                          <td className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-600"><Edit className="h-4 w-4" /></Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="issues">
              <Card className="shadow-lg border-0 mt-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Issue Records</CardTitle>
                    <Link href="/blood-bank/issue">
                      <Button size="sm" className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg shadow-pink-500/30">
                        <Plus className="mr-2 h-4 w-4" />New Issue
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Issue No.</TableHead>
                        <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                        <TableHead className="font-semibold text-slate-700">Blood Group</TableHead>
                        <TableHead className="font-semibold text-slate-700">Units</TableHead>
                        <TableHead className="font-semibold text-slate-700">Issue Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">Doctor</TableHead>
                        <TableHead className="font-semibold text-slate-700">Department</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIssues.map((issue, index) => (
                        <motion.tr
                          key={issue.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-rose-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{issue.issueNumber}</TableCell>
                          <TableCell className="text-slate-600">{issue.patient}</TableCell>
                          <TableCell><Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">{issue.bloodGroup}</Badge></TableCell>
                          <TableCell className="text-slate-600">{issue.units}</TableCell>
                          <TableCell className="text-slate-600">{issue.issueDate}</TableCell>
                          <TableCell className="text-slate-600">{issue.doctor}</TableCell>
                          <TableCell className="text-slate-600">{issue.department}</TableCell>
                          <TableCell>
                            <Badge variant={issue.status === "Completed" ? "success" : "warning"} className={issue.status === "Completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200"}>
                              {issue.status}
                            </Badge>
                          </TableCell>
                          <td className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                          </td>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}
