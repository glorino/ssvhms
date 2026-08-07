"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, Edit, FlaskConical, CheckCircle, Clock, AlertCircle, Microscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const tests = [
  { id: "TS001", testNumber: "PAT2026001", patient: "Rajesh Kumar", umr: "UMR2026001", doctor: "Dr. Priya Sharma", testName: "Complete Blood Count", category: "Hematology", date: "2026-08-07", result: "Normal", status: "Completed" },
  { id: "TS002", testNumber: "PAT2026002", patient: "Anita Patel", umr: "UMR2026002", doctor: "Dr. Amit Singh", testName: "Lipid Profile", category: "Biochemistry", date: "2026-08-07", result: "Abnormal", status: "Completed" },
  { id: "TS003", testNumber: "PAT2026003", patient: "Suresh Reddy", umr: "UMR2026003", doctor: "Dr. Neha Gupta", testName: "Thyroid Function Test", category: "Endocrinology", date: "2026-08-07", result: "-", status: "In Progress" },
  { id: "TS004", testNumber: "PAT2026004", patient: "Priya Verma", umr: "UMR2026004", doctor: "Dr. Rahul Joshi", testName: "Liver Function Test", category: "Biochemistry", date: "2026-08-06", result: "Normal", status: "Completed" },
  { id: "TS005", testNumber: "PAT2026005", patient: "Mohammed Ali", umr: "UMR2026005", doctor: "Dr. Sanjay Mehta", testName: "Urine Routine", category: "Clinical Pathology", date: "2026-08-06", result: "-", status: "Pending" },
  { id: "TS006", testNumber: "PAT2026006", patient: "Deepika Singh", umr: "UMR2026006", doctor: "Dr. Priya Sharma", testName: "HbA1c", category: "Endocrinology", date: "2026-08-06", result: "-", status: "Pending" },
  { id: "TS007", testNumber: "PAT2026007", patient: "Vikram Rao", umr: "UMR2026007", doctor: "Dr. Amit Singh", testName: "ESR", category: "Hematology", date: "2026-08-05", result: "Normal", status: "Completed" },
  { id: "TS008", testNumber: "PAT2026008", patient: "Kavita Joshi", umr: "UMR2026008", doctor: "Dr. Neha Gupta", testName: "Blood Sugar Fasting", category: "Biochemistry", date: "2026-08-05", result: "-", status: "In Progress" },
]

export default function PathologyPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTests = tests.filter(
    (test) =>
      test.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const completedCount = tests.filter((t) => t.status === "Completed").length
  const inProgressCount = tests.filter((t) => t.status === "In Progress").length
  const pendingCount = tests.filter((t) => t.status === "Pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pathology</h1>
          <p className="text-slate-500">Manage pathology lab tests and results</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Link href="/pathology/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />New Test</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><FlaskConical className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{tests.length}</p><p className="text-xs text-slate-500">Total Tests</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><CheckCircle className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-green-600">{completedCount}</p><p className="text-xs text-slate-500">Completed</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2"><Clock className="h-5 w-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p><p className="text-xs text-slate-500">In Progress</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2"><AlertCircle className="h-5 w-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-red-600">{pendingCount}</p><p className="text-xs text-slate-500">Pending</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Lab Tests</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input type="search" placeholder="Search tests..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test No.</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.testNumber}</TableCell>
                  <TableCell>
                    <div><p className="font-medium">{test.patient}</p><p className="text-xs text-slate-500">{test.umr}</p></div>
                  </TableCell>
                  <TableCell>{test.doctor}</TableCell>
                  <TableCell>{test.testName}</TableCell>
                  <TableCell><Badge variant="outline">{test.category}</Badge></TableCell>
                  <TableCell>{test.date}</TableCell>
                  <TableCell className={test.result === "Abnormal" ? "text-red-600 font-medium" : test.result === "Normal" ? "text-green-600" : ""}>{test.result}</TableCell>
                  <TableCell>
                    <Badge variant={test.status === "Completed" ? "success" : test.status === "In Progress" ? "warning" : "destructive"}>{test.status}</Badge>
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
    </div>
  )
}
