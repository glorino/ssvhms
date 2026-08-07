"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, Edit, Ambulance, CheckCircle, Clock, AlertCircle, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const vehicles = [
  { id: "AMB001", vehicleNumber: "MH-01-AB-1234", type: "ALS", driver: "Ramesh Yadav", contact: "9876543210", status: "Available", lastService: "2026-07-15", nextService: "2026-10-15" },
  { id: "AMB002", vehicleNumber: "MH-01-CD-5678", type: "BLS", driver: "Suresh Patil", contact: "9876543211", status: "On Call", lastService: "2026-07-20", nextService: "2026-10-20" },
  { id: "AMB003", vehicleNumber: "MH-01-EF-9012", type: "ALS", driver: "Mahesh Kumar", contact: "9876543212", status: "Available", lastService: "2026-07-10", nextService: "2026-10-10" },
  { id: "AMB004", vehicleNumber: "MH-01-GH-3456", type: "Patient Transport", driver: "Rajesh Sharma", contact: "9876543213", status: "Maintenance", lastService: "2026-08-01", nextService: "2026-08-15" },
  { id: "AMB005", vehicleNumber: "MH-01-IJ-7890", type: "BLS", driver: "Anil Verma", contact: "9876543214", status: "Available", lastService: "2026-07-25", nextService: "2026-10-25" },
]

const callHistory = [
  { id: "CAL001", callNumber: "CAL2026001", callerName: "Rajesh Kumar", contact: "9876543220", pickupLocation: "Andheri West", dropLocation: "SSV Hospital", callTime: "2026-08-07 08:30", assignedVehicle: "MH-01-AB-1234", driver: "Ramesh Yadav", status: "Completed" },
  { id: "CAL002", callNumber: "CAL2026002", callerName: "Anita Sharma", contact: "9876543221", pickupLocation: "Bandra East", dropLocation: "SSV Hospital", callTime: "2026-08-07 09:15", assignedVehicle: "MH-01-CD-5678", driver: "Suresh Patil", status: "In Progress" },
  { id: "CAL003", callNumber: "CAL2026003", callerName: "Vikram Rao", contact: "9876543222", pickupLocation: "Juhu", dropLocation: "SSV Hospital", callTime: "2026-08-07 10:00", assignedVehicle: "-", driver: "-", status: "Pending" },
  { id: "CAL004", callNumber: "CAL2026004", callerName: "Kavita Joshi", contact: "9876543223", pickupLocation: "Dadar", dropLocation: "SSV Hospital", callTime: "2026-08-06 14:30", assignedVehicle: "MH-01-EF-9012", driver: "Mahesh Kumar", status: "Completed" },
  { id: "CAL005", callNumber: "CAL2026005", callerName: "Suresh Reddy", contact: "9876543224", pickupLocation: "Powai", dropLocation: "SSV Hospital", callTime: "2026-08-06 16:45", assignedVehicle: "MH-01-IJ-7890", driver: "Anil Verma", status: "Completed" },
  { id: "CAL006", callNumber: "CAL2026006", callerName: "Deepika Singh", contact: "9876543225", pickupLocation: "Mulund", dropLocation: "SSV Hospital", callTime: "2026-08-05 11:20", assignedVehicle: "MH-01-AB-1234", driver: "Ramesh Yadav", status: "Completed" },
]

export default function AmbulancePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVehicles = vehicles.filter(
    (vehicle) => vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCalls = callHistory.filter(
    (call) => call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) || call.callNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const availableCount = vehicles.filter((v) => v.status === "Available").length
  const onCallCount = vehicles.filter((v) => v.status === "On Call").length
  const maintenanceCount = vehicles.filter((v) => v.status === "Maintenance").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ambulance Management</h1>
          <p className="text-slate-500">Manage ambulance fleet and emergency calls</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Link href="/ambulance/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />New Vehicle</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Ambulance className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{vehicles.length}</p><p className="text-xs text-slate-500">Total Vehicles</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><CheckCircle className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-green-600">{availableCount}</p><p className="text-xs text-slate-500">Available</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2"><Phone className="h-5 w-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-yellow-600">{onCallCount}</p><p className="text-xs text-slate-500">On Call</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2"><AlertCircle className="h-5 w-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-red-600">{maintenanceCount}</p><p className="text-xs text-slate-500">Maintenance</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vehicles">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="calls">Call History</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Vehicle Fleet</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input type="search" placeholder="Search vehicles..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle No.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Service</TableHead>
                    <TableHead>Next Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.vehicleNumber}</TableCell>
                      <TableCell><Badge variant="outline">{vehicle.type}</Badge></TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>{vehicle.contact}</TableCell>
                      <TableCell>{vehicle.lastService}</TableCell>
                      <TableCell>{vehicle.nextService}</TableCell>
                      <TableCell>
                        <Badge variant={vehicle.status === "Available" ? "success" : vehicle.status === "On Call" ? "warning" : "destructive"}>{vehicle.status}</Badge>
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

        <TabsContent value="calls">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Call History</CardTitle>
                <Link href="/ambulance/call"><Button size="sm"><Phone className="mr-2 h-4 w-4" />New Call</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Call No.</TableHead>
                    <TableHead>Caller</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Drop</TableHead>
                    <TableHead>Call Time</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCalls.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell className="font-medium">{call.callNumber}</TableCell>
                      <TableCell>{call.callerName}</TableCell>
                      <TableCell>{call.contact}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{call.pickupLocation}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{call.dropLocation}</TableCell>
                      <TableCell>{call.callTime}</TableCell>
                      <TableCell className="text-xs">{call.assignedVehicle}</TableCell>
                      <TableCell>
                        <Badge variant={call.status === "Completed" ? "success" : call.status === "In Progress" ? "warning" : "destructive"}>{call.status}</Badge>
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
