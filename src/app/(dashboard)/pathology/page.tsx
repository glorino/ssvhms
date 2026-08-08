"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, FlaskConical, CheckCircle, Clock, AlertCircle, Microscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"
import { usePatients } from "@/lib/patient-context"

export default function PathologyPage() {
  const { patients } = usePatients()
  const tests = patients.flatMap(p => p.labResults.map(lr => ({ ...lr, patient: `${p.firstName} ${p.lastName}`, umr: p.uniqueNumber, testNumber: lr.id, doctor: lr.orderedBy })))

  const totalTests = tests.length
  const completedTests = tests.filter(t => t.status === "Completed").length
  const inProgressTests = tests.filter(t => t.status === "In Progress").length
  const pendingTests = tests.filter(t => t.status === "Pending").length

  const statsData = [
    { title: "Total Tests", value: totalTests.toString(), icon: FlaskConical, gradient: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-500/30" },
    { title: "Completed", value: completedTests.toString(), icon: CheckCircle, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
    { title: "In Progress", value: inProgressTests.toString(), icon: Clock, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30" },
    { title: "Pending", value: pendingTests.toString(), icon: AlertCircle, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30" },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const filteredTests = tests.filter(
    (test) =>
      test.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Pathology</h1>
            <p className="text-slate-500">Manage pathology lab tests and results</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Link href="/pathology/new">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30">
                <Plus className="mr-2 h-4 w-4" />New Test
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Lab Tests</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input type="search" placeholder="Search tests..." className="pl-10 w-64 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ overflowX: "auto" }}>
                <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead className="font-semibold text-slate-700">Test No.</TableHead>
                    <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                    <TableHead className="font-semibold text-slate-700">Doctor</TableHead>
                    <TableHead className="font-semibold text-slate-700">Test Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Category</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date</TableHead>
                    <TableHead className="font-semibold text-slate-700">Result</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTests.map((test, index) => (
                    <motion.tr
                      key={test.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-700">{test.testNumber}</TableCell>
                      <TableCell>
                        <div><p className="font-medium text-slate-800">{test.patient}</p><p className="text-xs text-slate-500">{test.umr}</p></div>
                      </TableCell>
                      <TableCell className="text-slate-600">{test.doctor}</TableCell>
                      <TableCell className="font-medium text-slate-700">{test.testName}</TableCell>
                      <TableCell><Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{test.category}</Badge></TableCell>
                      <TableCell className="text-slate-600">{test.date}</TableCell>
                      <TableCell className={test.result === "Abnormal" ? "text-rose-600 font-bold" : test.result === "Normal" ? "text-emerald-600 font-medium" : "text-slate-400"}>{test.result}</TableCell>
                      <TableCell>
                        <Badge variant={test.status === "Completed" ? "success" : test.status === "In Progress" ? "warning" : "destructive"} className={
                          test.status === "Completed" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          test.status === "In Progress" ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-red-100 text-red-700 border-red-200"
                        }>{test.status}</Badge>
                      </TableCell>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-indigo-50 hover:text-indigo-600"><Edit className="h-4 w-4" /></Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}
