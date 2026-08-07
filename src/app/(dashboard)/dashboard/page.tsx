"use client"

import React from "react"
import {
  Users,
  Stethoscope,
  Calendar,
  CreditCard,
  BedDouble,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  UserPlus,
  CalendarCheck,
  StethoscopeIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const stats = [
  {
    title: "Total Patients",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Today's Appointments",
    value: "48",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Active Doctors",
    value: "32",
    change: "+2.1%",
    trend: "up",
    icon: Stethoscope,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Revenue Today",
    value: "₹2,84,500",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Beds Occupied",
    value: "156/200",
    change: "78%",
    trend: "neutral",
    icon: BedDouble,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Pending Bills",
    value: "₹4,25,000",
    change: "-5.2%",
    trend: "down",
    icon: CreditCard,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
]

const recentAppointments = [
  {
    id: "APT001",
    patient: "Rajesh Kumar",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    id: "APT002",
    patient: "Anita Patel",
    doctor: "Dr. Amit Singh",
    department: "Orthopedics",
    time: "10:30 AM",
    status: "In Progress",
  },
  {
    id: "APT003",
    patient: "Suresh Reddy",
    doctor: "Dr. Neha Gupta",
    department: "Neurology",
    time: "11:00 AM",
    status: "Scheduled",
  },
  {
    id: "APT004",
    patient: "Priya Verma",
    doctor: "Dr. Rahul Joshi",
    department: "Dermatology",
    time: "11:30 AM",
    status: "Scheduled",
  },
  {
    id: "APT005",
    patient: "Mohammed Ali",
    doctor: "Dr. Sanjay Mehta",
    department: "General Medicine",
    time: "12:00 PM",
    status: "Cancelled",
  },
]

const bedStatus = [
  { ward: "General Ward", total: 40, occupied: 32, vacant: 8 },
  { ward: "ICU", total: 10, occupied: 9, vacant: 1 },
  { ward: "Private", total: 20, occupied: 15, vacant: 5 },
  { ward: "Semi-Private", total: 30, occupied: 22, vacant: 8 },
  { ward: "Emergency", total: 10, occupied: 7, vacant: 3 },
  { ward: "Maternity", total: 15, occupied: 11, vacant: 4 },
]

const recentBills = [
  {
    id: "BILL001",
    patient: "Rajesh Kumar",
    amount: "₹15,500",
    paid: "₹10,000",
    due: "₹5,500",
    status: "Partial",
  },
  {
    id: "BILL002",
    patient: "Anita Patel",
    amount: "₹8,200",
    paid: "₹8,200",
    due: "₹0",
    status: "Paid",
  },
  {
    id: "BILL003",
    patient: "Suresh Reddy",
    amount: "₹22,000",
    paid: "₹0",
    due: "₹22,000",
    status: "Pending",
  },
  {
    id: "BILL004",
    patient: "Priya Verma",
    amount: "₹5,800",
    paid: "₹5,800",
    due: "₹0",
    status: "Paid",
  },
]

const departmentStats = [
  { name: "Cardiology", patients: 45, revenue: "₹4,50,000" },
  { name: "Orthopedics", patients: 38, revenue: "₹3,20,000" },
  { name: "Neurology", patients: 28, revenue: "₹5,10,000" },
  { name: "General Medicine", patients: 65, revenue: "₹2,80,000" },
  { name: "Pediatrics", patients: 42, revenue: "₹1,90,000" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Welcome back, Super Admin</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            New Patient
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex items-center text-sm">
                  {stat.trend === "up" && (
                    <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                  )}
                  {stat.trend === "down" && (
                    <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up"
                        ? "text-green-500"
                        : stat.trend === "down"
                        ? "text-red-500"
                        : "text-slate-500"
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent Appointments */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Appointments</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAppointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-medium">{apt.id}</TableCell>
                    <TableCell>{apt.patient}</TableCell>
                    <TableCell>{apt.doctor}</TableCell>
                    <TableCell>{apt.time}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Bed Status */}
        <Card>
          <CardHeader>
            <CardTitle>Bed Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bedStatus.map((ward) => (
                <div key={ward.ward}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{ward.ward}</span>
                    <span className="text-sm text-slate-500">
                      {ward.occupied}/{ward.total}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-900 rounded-full"
                      style={{
                        width: `${(ward.occupied / ward.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Bills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bills</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{bill.patient}</TableCell>
                    <TableCell>{bill.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          bill.status === "Paid"
                            ? "success"
                            : bill.status === "Partial"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {bill.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentStats.map((dept) => (
                  <TableRow key={dept.name}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell>{dept.patients}</TableCell>
                    <TableCell>{dept.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <UserPlus className="h-6 w-6" />
              <span className="text-xs">New Patient</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CalendarCheck className="h-6 w-6" />
              <span className="text-xs">New Appointment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <StethoscopeIcon className="h-6 w-6" />
              <span className="text-xs">New OPD Visit</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BedDouble className="h-6 w-6" />
              <span className="text-xs">New Admission</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-xs">New Bill</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Activity className="h-6 w-6" />
              <span className="text-xs">Lab Test</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertCircle className="h-6 w-6" />
              <span className="text-xs">Blood Bank</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-xs">Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
