"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, Edit, Users, CheckCircle, Clock, AlertCircle, Banknote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Human Resources</h1>
          <p className="text-slate-500">Manage staff, attendance, leaves, and payroll</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Link href="/hr/staff/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Staff</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Users className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{staff.length}</p><p className="text-xs text-slate-500">Total Staff</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><CheckCircle className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-green-600">{activeCount}</p><p className="text-xs text-slate-500">Active</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2"><Clock className="h-5 w-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-yellow-600">{pendingLeaves}</p><p className="text-xs text-slate-500">Pending Leaves</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2"><Banknote className="h-5 w-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold">₹{totalPayroll.toLocaleString()}</p><p className="text-xs text-slate-500">Monthly Payroll</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="staff">
        <TabsList>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="leaves">Leaves</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Staff Directory</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                    <Input type="search" placeholder="Search staff..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                  <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Joining Date</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.employeeId}</TableCell>
                      <TableCell>
                        <div><p className="font-medium">{s.name}</p><p className="text-xs text-slate-500">{s.email}</p></div>
                      </TableCell>
                      <TableCell>{s.department}</TableCell>
                      <TableCell><Badge variant="outline">{s.designation}</Badge></TableCell>
                      <TableCell>{s.joiningDate}</TableCell>
                      <TableCell>{s.contact}</TableCell>
                      <TableCell>₹{s.salary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={s.status === "Active" ? "success" : "warning"}>{s.status}</Badge>
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
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today&apos;s Attendance</CardTitle>
                <Button size="sm"><Clock className="mr-2 h-4 w-4" />Mark Attendance</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((att) => (
                    <TableRow key={att.id}>
                      <TableCell className="font-medium">{att.employeeId}</TableCell>
                      <TableCell>{att.name}</TableCell>
                      <TableCell>{att.date}</TableCell>
                      <TableCell>{att.clockIn}</TableCell>
                      <TableCell>{att.clockOut}</TableCell>
                      <TableCell>{att.hours}</TableCell>
                      <TableCell>
                        <Badge variant={att.status === "Present" ? "success" : att.status === "On Leave" ? "warning" : "destructive"}>{att.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Leave Requests</CardTitle>
                <Link href="/hr/leave/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />Apply Leave</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>
                        <div><p className="font-medium">{leave.name}</p><p className="text-xs text-slate-500">{leave.employeeId}</p></div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{leave.leaveType}</Badge></TableCell>
                      <TableCell>{leave.startDate}</TableCell>
                      <TableCell>{leave.endDate}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                      <TableCell>
                        <Badge variant={leave.status === "Approved" ? "success" : leave.status === "Pending" ? "warning" : "destructive"}>{leave.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                          {leave.status === "Pending" && <Button variant="ghost" size="icon" className="h-8 w-8"><CheckCircle className="h-4 w-4" /></Button>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payroll - July 2026</CardTitle>
                <Button size="sm"><Banknote className="mr-2 h-4 w-4" />Process Payroll</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead className="text-right">Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payroll.map((pay) => (
                    <TableRow key={pay.id}>
                      <TableCell>
                        <div><p className="font-medium">{pay.name}</p><p className="text-xs text-slate-500">{pay.employeeId}</p></div>
                      </TableCell>
                      <TableCell>₹{pay.basic.toLocaleString()}</TableCell>
                      <TableCell>₹{pay.allowances.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">₹{pay.deductions.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-bold">₹{pay.netPay.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={pay.status === "Paid" ? "success" : "warning"}>{pay.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
