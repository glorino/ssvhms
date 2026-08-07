"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Ambulance, CheckCircle, Clock, AlertCircle, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

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
]

const availableCount = vehicles.filter((v) => v.status === "Available").length
const onCallCount = vehicles.filter((v) => v.status === "On Call").length
const maintenanceCount = vehicles.filter((v) => v.status === "Maintenance").length

const statsData = [
  { title: "Total Vehicles", value: "5", icon: Ambulance, gradient: "from-orange-500 to-amber-600", shadow: "shadow-orange-500/30" },
  { title: "Available", value: availableCount, icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "On Call", value: onCallCount, icon: Phone, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
  { title: "Maintenance", value: maintenanceCount, icon: AlertCircle, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30" },
]

export default function AmbulancePage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVehicles = vehicles.filter(
    (vehicle) => vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCalls = callHistory.filter(
    (call) => call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) || call.callNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Ambulance Management</h1>
            <p className="text-slate-500">Manage ambulance fleet and emergency calls</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Link href="/ambulance/new">
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/30">
                <Plus className="mr-2 h-4 w-4" />New Vehicle
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
          <Tabs defaultValue="vehicles">
            <TabsList className="bg-white shadow-md rounded-xl p-1">
              <TabsTrigger value="vehicles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-600 data-[state=active]:text-white rounded-lg">Vehicles</TabsTrigger>
              <TabsTrigger value="calls" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg">Call History</TabsTrigger>
            </TabsList>

            <TabsContent value="vehicles">
              <Card className="shadow-lg border-0 mt-4">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Vehicle Fleet</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                      <Input type="search" placeholder="Search vehicles..." className="pl-10 w-64 border-slate-200 focus:border-orange-500 focus:ring-orange-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Vehicle No.</TableHead>
                        <TableHead className="font-semibold text-slate-700">Type</TableHead>
                        <TableHead className="font-semibold text-slate-700">Driver</TableHead>
                        <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                        <TableHead className="font-semibold text-slate-700">Last Service</TableHead>
                        <TableHead className="font-semibold text-slate-700">Next Service</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVehicles.map((vehicle, index) => (
                        <motion.tr
                          key={vehicle.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{vehicle.vehicleNumber}</TableCell>
                          <TableCell><Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{vehicle.type}</Badge></TableCell>
                          <TableCell className="text-slate-600">{vehicle.driver}</TableCell>
                          <TableCell className="text-slate-600">{vehicle.contact}</TableCell>
                          <TableCell className="text-slate-600">{vehicle.lastService}</TableCell>
                          <TableCell className="text-slate-600">{vehicle.nextService}</TableCell>
                          <TableCell>
                            <Badge variant={vehicle.status === "Available" ? "success" : vehicle.status === "On Call" ? "warning" : "destructive"} className={
                              vehicle.status === "Available" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                              vehicle.status === "On Call" ? "bg-amber-100 text-amber-700 border-amber-200" :
                              "bg-red-100 text-red-700 border-red-200"
                            }>{vehicle.status}</Badge>
                          </TableCell>
                          <td className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-orange-50 hover:text-orange-600"><Edit className="h-4 w-4" /></Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calls">
              <Card className="shadow-lg border-0 mt-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Call History</CardTitle>
                    <Link href="/ambulance/call">
                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-500/30">
                        <Phone className="mr-2 h-4 w-4" />New Call
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Call No.</TableHead>
                        <TableHead className="font-semibold text-slate-700">Caller</TableHead>
                        <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                        <TableHead className="font-semibold text-slate-700">Pickup</TableHead>
                        <TableHead className="font-semibold text-slate-700">Drop</TableHead>
                        <TableHead className="font-semibold text-slate-700">Call Time</TableHead>
                        <TableHead className="font-semibold text-slate-700">Vehicle</TableHead>
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
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{call.callNumber}</TableCell>
                          <TableCell className="text-slate-600">{call.callerName}</TableCell>
                          <TableCell className="text-slate-600">{call.contact}</TableCell>
                          <TableCell className="max-w-[150px] truncate text-slate-600">{call.pickupLocation}</TableCell>
                          <TableCell className="max-w-[150px] truncate text-slate-600">{call.dropLocation}</TableCell>
                          <TableCell className="text-slate-600">{call.callTime}</TableCell>
                          <TableCell className="text-xs text-slate-600">{call.assignedVehicle}</TableCell>
                          <TableCell>
                            <Badge variant={call.status === "Completed" ? "success" : call.status === "In Progress" ? "warning" : "destructive"} className={
                              call.status === "Completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                              call.status === "In Progress" ? "bg-amber-100 text-amber-700 border-amber-200" :
                              "bg-red-100 text-red-700 border-red-200"
                            }>{call.status}</Badge>
                          </TableCell>
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
