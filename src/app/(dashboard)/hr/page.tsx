"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Banknote,
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
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated-wrapper"

const stats = [
  {
    title: "Total Staff",
    value: "6",
    icon: Users,
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/30",
  },
  {
    title: "Active",
    value: "5",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-green-600",
    shadow: "shadow-emerald-500/30",
  },
  {
    title: "Pending Leaves",
    value: "2",
    icon: Clock,
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/30",
  },
  {
    title: "Monthly Payroll",
    value: "₦3,63,000",
    icon: Banknote,
    gradient: "from-purple-500 to-violet-600",
    shadow: "shadow-purple-500/30",
  },
]

const staff = [
  { id: "STF001", employeeId: "EMP2026001", name: "Dr. Priya Sharma", department: "Cardiology", designation: "Senior Doctor", joiningDate: "2020-03-15", contact: "9876543250", email: "priya@ssvhospital.com", salary: 150000, status: "Active" },
  { id: "STF002", employeeId: "EMP2026002", name: "Dr. Amit Singh", department: "Orthopedics", designation: "Doctor", joiningDate: "2021-06-20", contact: "9876543251", email: "amit@ssvhospital.com", salary: 120000, status: "Active" },
  { id: "STF003", employeeId: "EMP2026003", name: "Neha Gupta", department: "Nursing", designation: "Head Nurse", joiningDate: "2019-01-10", contact: "9876543252", email: "neha@ssvhospital.com", salary: 45000, status: "Active" },
  { id: "STF004", employeeId: "EMP2026004", name: "Rahul Joshi", department: "Administration", designation: "Manager", joiningDate: "2022-04-05", contact: "9876543253", email: "rahul@ssvhospital.com", salary: 55000, status: "Active" },
  { id: "STF005", employeeId: "EMP2026005", name: "Sanjay Mehta", department: "Pharmacy", designation: "Pharmacist", joiningDate: "2023-07-12", contact: "9876543254", email: "sanjay@ssvhospital.com", salary: 35000, status: "Active" },
  { id: "STF006", employeeId: "EMP2026006", name: "Sunita Patil", department: "Reception", designation: "Receptionist", joiningDate: "2024-02-28", contact: "9876543255", email: "sunita@ssvhospital.com", salary: 25000, status: "On Leave" },
]

const attendance = [
  { id: "ATT001", employeeId: "EMP2026001", name: "Dr. Priya Sharma", date: "2026-08-07", clockIn: "08:00 AM", clockOut: "-", hours: "-", status: "Present" },
  { id: "ATT002", employeeId: "EMP2026002", name: "Dr. Amit Singh", date: "2026-08-07", clockIn: "08:15 AM", clockOut: "-", hours: "-", status: "Present" },
  { id: "ATT003", employeeId: "EMP2026003", name: "Neha Gupta", date: "2026-08-07", clockIn: "07:45 AM", clockOut: "-", hours: "-", status: "Present" },
  { id: "ATT004", employeeId: "EMP2026004", name: "Rahul Joshi", date: "2026-08-07", clockIn: "-", clockOut: "-", hours: "-", status: "Absent" },
  { id: "ATT005", employeeId: "EMP2026005", name: "Sanjay Mehta", date: "2026-08-07", clockIn: "09:00 AM", clockOut: "-", hours: "-", status: "Present" },
  { id: "ATT006", employeeId: "EMP2026006", name: "Sunita Patil", date: "2026-08-07", clockIn: "-", clockOut: "-", hours: "-", status: "On Leave" },
]

const leaves = [
  { id: "LVE001", employeeId: "EMP2026006", name: "Sunita Patil", leaveType: "Casual Leave", startDate: "2026-08-07", endDate: "2026-08-09", days: 3, reason: "Family function", status: "Approved" },
  { id: "LVE002", employeeId: "EMP2026004", name: "Rahul Joshi", leaveType: "Sick Leave", startDate: "2026-08-07", endDate: "2026-08-07", days: 1, reason: "Fever", status: "Approved" },
  { id: "LVE003", employeeId: "EMP2026002", name: "Dr. Amit Singh", leaveType: "Earned Leave", startDate: "2026-08-15", endDate: "2026-08-20", days: 6, reason: "Vacation", status: "Pending" },
  { id: "LVE004", employeeId: "EMP2026005", name: "Sanjay Mehta", leaveType: "Casual Leave", startDate: "2026-08-10", endDate: "2026-08-11", days: 2, reason: "Personal work", status: "Pending" },
]

const payroll = [
  { id: "PAY001", employeeId: "EMP2026001", name: "Dr. Priya Sharma", month: "July 2026", basic: 100000, allowances: 50000, deductions: 15000, netPay: 135000, status: "Paid" },
  { id: "PAY002", employeeId: "EMP2026002", name: "Dr. Amit Singh", month: "July 2026", basic: 80000, allowances: 40000, deductions: 12000, netPay: 108000, status: "Paid" },
  { id: "PAY003", employeeId: "EMP2026003", name: "Neha Gupta", month: "July 2026", basic: 30000, allowances: 15000, deductions: 5000, netPay: 40000, status: "Paid" },
  { id: "PAY004", employeeId: "EMP2026004", name: "Rahul Joshi", month: "July 2026", basic: 35000, allowances: 20000, deductions: 6000, netPay: 49000, status: "Pending" },
  { id: "PAY005", employeeId: "EMP2026005", name: "Sanjay Mehta", month: "July 2026", basic: 22000, allowances: 13000, deductions: 4000, netPay: 31000, status: "Paid" },
]

export default function HRPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStaff = staff.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = staff.filter((s) => s.status === "Active").length
  const onLeaveCount = staff.filter((s) => s.status === "On Leave").length
  const pendingLeaves = leaves.filter((l) => l.status === "Pending").length
  const totalPayroll = payroll.reduce((acc, p) => acc + p.netPay, 0)

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Human Resources
            </h1>
            <p className="text-slate-500">Manage staff, attendance, leaves, and payroll</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/hr/staff/new">
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Staff
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

        <Tabs defaultValue="staff">
          <TabsList className="bg-white border border-slate-200 p-1 shadow-sm">
            <TabsTrigger
              value="staff"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Staff
            </TabsTrigger>
            <TabsTrigger
              value="attendance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger
              value="leaves"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Leaves
            </TabsTrigger>
            <TabsTrigger
              value="payroll"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Payroll
            </TabsTrigger>
          </TabsList>

          <TabsContent value="staff">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Staff Directory
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                        <Input
                          type="search"
                          placeholder="Search staff..."
                          className="pl-10 w-64 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
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
                        <TableHead className="font-semibold text-slate-700">Employee ID</TableHead>
                        <TableHead className="font-semibold text-slate-700">Name</TableHead>
                        <TableHead className="font-semibold text-slate-700">Department</TableHead>
                        <TableHead className="font-semibold text-slate-700">Designation</TableHead>
                        <TableHead className="font-semibold text-slate-700">Joining Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                        <TableHead className="font-semibold text-slate-700">Salary</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStaff.map((s, index) => (
                        <motion.tr
                          key={s.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{s.employeeId}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                                <span className="text-xs font-bold text-white">
                                  {s.name.split(" ").map((n) => n[0]).join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{s.name}</p>
                                <p className="text-xs text-slate-500">{s.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-600">{s.department}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                              {s.designation}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600">{s.joiningDate}</TableCell>
                          <TableCell className="text-slate-600">{s.contact}</TableCell>
                          <TableCell className="text-slate-700 font-medium">₦{s.salary.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant={s.status === "Active" ? "success" : "warning"}
                              className={
                                s.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : "bg-amber-100 text-amber-700 border-amber-200"
                              }
                            >
                              {s.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-indigo-50 hover:text-indigo-600">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-amber-50 hover:text-amber-600">
                                <Edit className="h-4 w-4" />
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
          </TabsContent>

          <TabsContent value="attendance">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Today&apos;s Attendance
                    </CardTitle>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Mark Attendance
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Employee ID</TableHead>
                        <TableHead className="font-semibold text-slate-700">Name</TableHead>
                        <TableHead className="font-semibold text-slate-700">Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">Clock In</TableHead>
                        <TableHead className="font-semibold text-slate-700">Clock Out</TableHead>
                        <TableHead className="font-semibold text-slate-700">Hours</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendance.map((att, index) => (
                        <motion.tr
                          key={att.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{att.employeeId}</TableCell>
                          <TableCell className="text-slate-600">{att.name}</TableCell>
                          <TableCell className="text-slate-600">{att.date}</TableCell>
                          <TableCell className="text-slate-600">{att.clockIn}</TableCell>
                          <TableCell className="text-slate-600">{att.clockOut}</TableCell>
                          <TableCell className="text-slate-600">{att.hours}</TableCell>
                          <TableCell>
                            <Badge
                              variant={att.status === "Present" ? "success" : att.status === "On Leave" ? "warning" : "destructive"}
                              className={
                                att.status === "Present"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : att.status === "On Leave"
                                    ? "bg-amber-100 text-amber-700 border-amber-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                              }
                            >
                              {att.status}
                            </Badge>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="leaves">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Leave Requests
                    </CardTitle>
                    <Link href="/hr/leave/new">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Apply Leave
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Employee</TableHead>
                        <TableHead className="font-semibold text-slate-700">Leave Type</TableHead>
                        <TableHead className="font-semibold text-slate-700">Start Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">End Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">Days</TableHead>
                        <TableHead className="font-semibold text-slate-700">Reason</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaves.map((leave, index) => (
                        <motion.tr
                          key={leave.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-colors duration-200"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                                <span className="text-xs font-bold text-white">
                                  {leave.name.split(" ").map((n) => n[0]).join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{leave.name}</p>
                                <p className="text-xs text-slate-500">{leave.employeeId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              {leave.leaveType}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600">{leave.startDate}</TableCell>
                          <TableCell className="text-slate-600">{leave.endDate}</TableCell>
                          <TableCell className="text-slate-700 font-medium">{leave.days}</TableCell>
                          <TableCell className="max-w-[200px] truncate text-slate-600">{leave.reason}</TableCell>
                          <TableCell>
                            <Badge
                              variant={leave.status === "Approved" ? "success" : leave.status === "Pending" ? "warning" : "destructive"}
                              className={
                                leave.status === "Approved"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : leave.status === "Pending"
                                    ? "bg-amber-100 text-amber-700 border-amber-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                              }
                            >
                              {leave.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-indigo-50 hover:text-indigo-600">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {leave.status === "Pending" && (
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-600">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="payroll">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Payroll - July 2026
                    </CardTitle>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
                    >
                      <Banknote className="mr-2 h-4 w-4" />
                      Process Payroll
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Employee</TableHead>
                        <TableHead className="font-semibold text-slate-700">Basic</TableHead>
                        <TableHead className="font-semibold text-slate-700">Allowances</TableHead>
                        <TableHead className="font-semibold text-slate-700">Deductions</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Net Pay</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payroll.map((pay, index) => (
                        <motion.tr
                          key={pay.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-colors duration-200"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                                <span className="text-xs font-bold text-white">
                                  {pay.name.split(" ").map((n) => n[0]).join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-slate-800">{pay.name}</p>
                                <p className="text-xs text-slate-500">{pay.employeeId}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-700">₦{pay.basic.toLocaleString()}</TableCell>
                          <TableCell className="text-slate-700">₦{pay.allowances.toLocaleString()}</TableCell>
                          <TableCell className="text-red-600 font-medium">₦{pay.deductions.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-bold text-slate-900">₦{pay.netPay.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant={pay.status === "Paid" ? "success" : "warning"}
                              className={
                                pay.status === "Paid"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : "bg-amber-100 text-amber-700 border-amber-200"
                              }
                            >
                              {pay.status}
                            </Badge>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  )
}
