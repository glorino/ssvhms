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
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
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
    title: "Total Visitors",
    value: "128",
    icon: Users,
    gradient: "from-teal-500 to-cyan-600",
    shadow: "shadow-teal-500/30",
  },
  {
    title: "Currently In",
    value: "4",
    icon: CheckCircle,
    gradient: "from-emerald-500 to-green-600",
    shadow: "shadow-emerald-500/30",
  },
  {
    title: "Calls Today",
    value: "5",
    icon: Phone,
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/30",
  },
  {
    title: "Postal Items",
    value: "5",
    icon: Mail,
    gradient: "from-purple-500 to-violet-600",
    shadow: "shadow-purple-500/30",
  },
]

const visitors = [
  { id: "VIS001", visitorName: "Rahul Sharma", contact: "9876543230", patientName: "Rajesh Kumar", relation: "Son", purpose: "Visiting", inTime: "08:30 AM", outTime: "-", floor: "3rd Floor", status: "In" },
  { id: "VIS002", visitorName: "Priya Mehta", contact: "9876543231", patientName: "Anita Patel", relation: "Daughter", purpose: "Attendant", inTime: "09:00 AM", outTime: "-", floor: "2nd Floor", status: "In" },
  { id: "VIS003", visitorName: "Vikram Singh", contact: "9876543232", patientName: "Suresh Reddy", relation: "Friend", purpose: "Visiting", inTime: "10:15 AM", outTime: "11:30 AM", floor: "4th Floor", status: "Out" },
  { id: "VIS004", visitorName: "Kavita Rao", contact: "9876543233", patientName: "Priya Verma", relation: "Sister", purpose: "Attendant", inTime: "07:45 AM", outTime: "-", floor: "1st Floor", status: "In" },
  { id: "VIS005", visitorName: "Mohammed Khan", contact: "9876543234", patientName: "Mohammed Ali", relation: "Brother", purpose: "Visiting", inTime: "11:00 AM", outTime: "12:00 PM", floor: "3rd Floor", status: "Out" },
  { id: "VIS006", visitorName: "Deepak Verma", contact: "9876543235", patientName: "Deepika Singh", relation: "Husband", purpose: "Attendant", inTime: "06:30 AM", outTime: "-", floor: "ICU", status: "In" },
]

const phoneCalls = [
  { id: "PHN001", callerName: "Rajesh Kumar", contact: "9876543240", department: "Reception", callTime: "08:15 AM", duration: "3 min", purpose: "Appointment Inquiry", handledBy: "Sunita", status: "Resolved" },
  { id: "PHN002", callerName: "Anita Sharma", contact: "9876543241", department: "OPD", callTime: "09:30 AM", duration: "5 min", purpose: "Report Inquiry", handledBy: "Meena", status: "Resolved" },
  { id: "PHN003", callerName: "Suresh Patel", contact: "9876543242", department: "Emergency", callTime: "10:45 AM", duration: "8 min", purpose: "Emergency", handledBy: "Rahul", status: "Escalated" },
  { id: "PHN004", callerName: "Priya Joshi", contact: "9876543243", department: "Billing", callTime: "11:20 AM", duration: "4 min", purpose: "Bill Query", handledBy: "Sunita", status: "Resolved" },
  { id: "PHN005", callerName: "Vikram Mehta", contact: "9876543244", department: "Reception", callTime: "02:00 PM", duration: "2 min", purpose: "Direction Inquiry", handledBy: "Meena", status: "Resolved" },
]

const postal = [
  { id: "PST001", trackingNumber: "IND2026001", type: "Incoming", sender: "Medico Pharma", recipient: "Pharmacy Dept", description: "Medicine Delivery", receivedDate: "2026-08-07", receivedBy: "Sunita", status: "Delivered" },
  { id: "PST002", trackingNumber: "IND2026002", type: "Outgoing", sender: "SSV Hospital", recipient: "Insurance Corp", description: "Claim Documents", receivedDate: "2026-08-07", receivedBy: "Rahul", status: "Dispatched" },
  { id: "PST003", trackingNumber: "IND2026003", type: "Incoming", sender: "Health Dept", recipient: "Admin Office", description: "License Renewal", receivedDate: "2026-08-06", receivedBy: "Meena", status: "Delivered" },
  { id: "PST004", trackingNumber: "IND2026004", type: "Outgoing", sender: "SSV Hospital", recipient: "Lab Supplier", description: "Reagent Order", receivedDate: "2026-08-06", receivedBy: "Sunita", status: "Dispatched" },
  { id: "PST005", trackingNumber: "IND2026005", type: "Incoming", sender: "Blood Bank Assoc", recipient: "Blood Bank", description: "Certification Docs", receivedDate: "2026-08-05", receivedBy: "Rahul", status: "Delivered" },
]

export default function FrontOfficePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVisitors = visitors.filter(
    (visitor) => visitor.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) || visitor.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCalls = phoneCalls.filter(
    (call) => call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) || call.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPostal = postal.filter(
    (post) => post.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) || post.sender.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentVisitors = visitors.filter((v) => v.status === "In").length
  const resolvedCalls = phoneCalls.filter((c) => c.status === "Resolved").length

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Front Office
            </h1>
            <p className="text-slate-500">Manage visitors, phone calls, and postal services</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/front-office/visitor/new">
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-500/30"
              >
                <Plus className="mr-2 h-4 w-4" />
                Register Visitor
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

        <Tabs defaultValue="visitors">
          <TabsList className="bg-white border border-slate-200 p-1 shadow-sm">
            <TabsTrigger
              value="visitors"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Visitors
            </TabsTrigger>
            <TabsTrigger
              value="calls"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Phone Calls
            </TabsTrigger>
            <TabsTrigger
              value="postal"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Postal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visitors">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      Visitor Log
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                      <Input
                        type="search"
                        placeholder="Search visitors..."
                        className="pl-10 w-64 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Visitor</TableHead>
                        <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                        <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                        <TableHead className="font-semibold text-slate-700">Relation</TableHead>
                        <TableHead className="font-semibold text-slate-700">Purpose</TableHead>
                        <TableHead className="font-semibold text-slate-700">In Time</TableHead>
                        <TableHead className="font-semibold text-slate-700">Out Time</TableHead>
                        <TableHead className="font-semibold text-slate-700">Floor</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVisitors.map((visitor, index) => (
                        <motion.tr
                          key={visitor.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{visitor.visitorName}</TableCell>
                          <TableCell className="text-slate-600">{visitor.contact}</TableCell>
                          <TableCell className="text-slate-600">{visitor.patientName}</TableCell>
                          <TableCell className="text-slate-600">{visitor.relation}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                              {visitor.purpose}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600">{visitor.inTime}</TableCell>
                          <TableCell className="text-slate-600">{visitor.outTime}</TableCell>
                          <TableCell className="text-slate-600">{visitor.floor}</TableCell>
                          <TableCell>
                            <Badge
                              variant={visitor.status === "In" ? "success" : "secondary"}
                              className={
                                visitor.status === "In"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : "bg-slate-100 text-slate-600 border-slate-200"
                              }
                            >
                              {visitor.status}
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

          <TabsContent value="calls">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      Phone Call Log
                    </CardTitle>
                    <Link href="/front-office/call/new">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-500/30"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Log Call
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Caller</TableHead>
                        <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                        <TableHead className="font-semibold text-slate-700">Department</TableHead>
                        <TableHead className="font-semibold text-slate-700">Call Time</TableHead>
                        <TableHead className="font-semibold text-slate-700">Duration</TableHead>
                        <TableHead className="font-semibold text-slate-700">Purpose</TableHead>
                        <TableHead className="font-semibold text-slate-700">Handled By</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCalls.map((call, index) => (
                        <motion.tr
                          key={call.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{call.callerName}</TableCell>
                          <TableCell className="text-slate-600">{call.contact}</TableCell>
                          <TableCell className="text-slate-600">{call.department}</TableCell>
                          <TableCell className="text-slate-600">{call.callTime}</TableCell>
                          <TableCell className="text-slate-600">{call.duration}</TableCell>
                          <TableCell className="text-slate-600">{call.purpose}</TableCell>
                          <TableCell className="text-slate-600">{call.handledBy}</TableCell>
                          <TableCell>
                            <Badge
                              variant={call.status === "Resolved" ? "success" : "destructive"}
                              className={
                                call.status === "Resolved"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : "bg-red-100 text-red-700 border-red-200"
                              }
                            >
                              {call.status}
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

          <TabsContent value="postal">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      Postal Register
                    </CardTitle>
                    <Link href="/front-office/postal/new">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-500/30"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Postal
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Tracking No.</TableHead>
                        <TableHead className="font-semibold text-slate-700">Type</TableHead>
                        <TableHead className="font-semibold text-slate-700">Sender</TableHead>
                        <TableHead className="font-semibold text-slate-700">Recipient</TableHead>
                        <TableHead className="font-semibold text-slate-700">Description</TableHead>
                        <TableHead className="font-semibold text-slate-700">Date</TableHead>
                        <TableHead className="font-semibold text-slate-700">Received By</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPostal.map((post, index) => (
                        <motion.tr
                          key={post.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{post.trackingNumber}</TableCell>
                          <TableCell>
                            <Badge
                              variant={post.type === "Incoming" ? "info" : "outline"}
                              className={
                                post.type === "Incoming"
                                  ? "bg-blue-100 text-blue-700 border-blue-200"
                                  : "bg-orange-100 text-orange-700 border-orange-200"
                              }
                            >
                              {post.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-600">{post.sender}</TableCell>
                          <TableCell className="text-slate-600">{post.recipient}</TableCell>
                          <TableCell className="text-slate-600">{post.description}</TableCell>
                          <TableCell className="text-slate-600">{post.receivedDate}</TableCell>
                          <TableCell className="text-slate-600">{post.receivedBy}</TableCell>
                          <TableCell>
                            <Badge
                              variant={post.status === "Delivered" ? "success" : "info"}
                              className={
                                post.status === "Delivered"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : "bg-blue-100 text-blue-700 border-blue-200"
                              }
                            >
                              {post.status}
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
