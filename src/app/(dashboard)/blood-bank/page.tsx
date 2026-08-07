"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, Edit, Droplet, CheckCircle, Clock, AlertCircle, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function BloodBankPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDonations = donations.filter(
    (donation) => donation.donorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredIssues = issues.filter(
    (issue) => issue.patient.toLowerCase().includes(searchTerm.toLowerCase()) || issue.issueNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalUnits = bloodInventory.reduce((acc, item) => acc + item.units, 0)
  const lowStockGroups = bloodInventory.filter((item) => item.units < item.minUnits).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blood Bank</h1>
          <p className="text-slate-500">Manage blood donations, issues, and inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Link href="/blood-bank/donate"><Button size="sm"><Plus className="mr-2 h-4 w-4" />Record Donation</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2"><Droplet className="h-5 w-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold">{totalUnits}</p><p className="text-xs text-slate-500">Total Units</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Heart className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{donations.length}</p><p className="text-xs text-slate-500">Total Donations</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><CheckCircle className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold">{issues.length}</p><p className="text-xs text-slate-500">Issues Today</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2"><AlertCircle className="h-5 w-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-yellow-600">{lowStockGroups}</p><p className="text-xs text-slate-500">Low Stock Groups</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blood Group Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {bloodInventory.map((item) => (
              <div key={item.bloodGroup} className={`rounded-lg border p-3 text-center ${item.units < item.minUnits ? "border-red-200 bg-red-50" : "border-slate-200"}`}>
                <p className="text-lg font-bold text-red-600">{item.bloodGroup}</p>
                <p className={`text-2xl font-bold ${item.units < item.minUnits ? "text-red-600" : "text-slate-900"}`}>{item.units}</p>
                <p className="text-xs text-slate-500">units</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="donations">
        <TabsList>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Donation Records</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input type="search" placeholder="Search donors..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor Name</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Donation Date</TableHead>
                    <TableHead>Hb (g/dL)</TableHead>
                    <TableHead>BP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.donorName}</TableCell>
                      <TableCell><Badge variant="destructive">{donation.bloodGroup}</Badge></TableCell>
                      <TableCell>{donation.units}</TableCell>
                      <TableCell>{donation.donationDate}</TableCell>
                      <TableCell>{donation.hemoglobin}</TableCell>
                      <TableCell>{donation.bp}</TableCell>
                      <TableCell>
                        <Badge variant={donation.status === "Approved" ? "success" : "destructive"}>{donation.status}</Badge>
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

        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Issue Records</CardTitle>
                <Link href="/blood-bank/issue"><Button size="sm"><Plus className="mr-2 h-4 w-4" />New Issue</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue No.</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">{issue.issueNumber}</TableCell>
                      <TableCell>{issue.patient}</TableCell>
                      <TableCell><Badge variant="destructive">{issue.bloodGroup}</Badge></TableCell>
                      <TableCell>{issue.units}</TableCell>
                      <TableCell>{issue.issueDate}</TableCell>
                      <TableCell>{issue.doctor}</TableCell>
                      <TableCell>{issue.department}</TableCell>
                      <TableCell>
                        <Badge variant={issue.status === "Completed" ? "success" : "warning"}>{issue.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
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
