"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, Edit, Users, Phone, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Front Office</h1>
          <p className="text-slate-500">Manage visitors, phone calls, and postal services</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Link href="/front-office/visitor/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />Register Visitor</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Users className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{visitors.length}</p><p className="text-xs text-slate-500">Total Visitors</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><CheckCircle className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-green-600">{currentVisitors}</p><p className="text-xs text-slate-500">Currently In</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2"><Phone className="h-5 w-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold">{phoneCalls.length}</p><p className="text-xs text-slate-500">Calls Today</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2"><Mail className="h-5 w-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold">{postal.length}</p><p className="text-xs text-slate-500">Postal Items</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visitors">
        <TabsList>
          <TabsTrigger value="visitors">Visitors</TabsTrigger>
          <TabsTrigger value="calls">Phone Calls</TabsTrigger>
          <TabsTrigger value="postal">Postal</TabsTrigger>
        </TabsList>

        <TabsContent value="visitors">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Visitor Log</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input type="search" placeholder="Search visitors..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visitor</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Relation</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>In Time</TableHead>
                    <TableHead>Out Time</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-medium">{visitor.visitorName}</TableCell>
                      <TableCell>{visitor.contact}</TableCell>
                      <TableCell>{visitor.patientName}</TableCell>
                      <TableCell>{visitor.relation}</TableCell>
                      <TableCell><Badge variant="outline">{visitor.purpose}</Badge></TableCell>
                      <TableCell>{visitor.inTime}</TableCell>
                      <TableCell>{visitor.outTime}</TableCell>
                      <TableCell>{visitor.floor}</TableCell>
                      <TableCell>
                        <Badge variant={visitor.status === "In" ? "success" : "secondary"}>{visitor.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Phone Call Log</CardTitle>
                <Link href="/front-office/call/new"><Button size="sm"><Phone className="mr-2 h-4 w-4" />Log Call</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Caller</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Call Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Handled By</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCalls.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell className="font-medium">{call.callerName}</TableCell>
                      <TableCell>{call.contact}</TableCell>
                      <TableCell>{call.department}</TableCell>
                      <TableCell>{call.callTime}</TableCell>
                      <TableCell>{call.duration}</TableCell>
                      <TableCell>{call.purpose}</TableCell>
                      <TableCell>{call.handledBy}</TableCell>
                      <TableCell>
                        <Badge variant={call.status === "Resolved" ? "success" : "destructive"}>{call.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="postal">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Postal Register</CardTitle>
                <Link href="/front-office/postal/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Postal</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking No.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Sender</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Received By</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPostal.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.trackingNumber}</TableCell>
                      <TableCell><Badge variant={post.type === "Incoming" ? "info" : "outline"}>{post.type}</Badge></TableCell>
                      <TableCell>{post.sender}</TableCell>
                      <TableCell>{post.recipient}</TableCell>
                      <TableCell>{post.description}</TableCell>
                      <TableCell>{post.receivedDate}</TableCell>
                      <TableCell>{post.receivedBy}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === "Delivered" ? "success" : "info"}>{post.status}</Badge>
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
