"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Download, Eye, CreditCard, IndianRupee, CheckCircle, Clock, AlertCircle, FileText, Printer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

const bills = [
  { id: "BILL001", billNumber: "BL2026001", patient: "Rajesh Kumar", umr: "UMR2026001", billType: "OPD", billDate: "2026-08-07", totalAmount: 1500, paidAmount: 1500, dueAmount: 0, paymentStatus: "Paid" },
  { id: "BILL002", billNumber: "BL2026002", patient: "Anita Patel", umr: "UMR2026002", billType: "IPD", billDate: "2026-08-06", totalAmount: 87200, paidAmount: 50000, dueAmount: 37200, paymentStatus: "Partial" },
  { id: "BILL003", billNumber: "BL2026003", patient: "Suresh Reddy", umr: "UMR2026003", billType: "Pathology", billDate: "2026-08-05", totalAmount: 3500, paidAmount: 3500, dueAmount: 0, paymentStatus: "Paid" },
  { id: "BILL004", billNumber: "BL2026004", patient: "Priya Verma", umr: "UMR2026004", billType: "Pharmacy", billDate: "2026-08-04", totalAmount: 2800, paidAmount: 0, dueAmount: 2800, paymentStatus: "Pending" },
  { id: "BILL005", billNumber: "BL2026005", patient: "Mohammed Ali", umr: "UMR2026005", billType: "Radiology", billDate: "2026-08-03", totalAmount: 5000, paidAmount: 5000, dueAmount: 0, paymentStatus: "Paid" },
  { id: "BILL006", billNumber: "BL2026006", patient: "Deepika Singh", umr: "UMR2026006", billType: "IPD", billDate: "2026-08-02", totalAmount: 125000, paidAmount: 75000, dueAmount: 50000, paymentStatus: "Partial" },
]

const totalRevenue = bills.reduce((acc, bill) => acc + Number(bill.totalAmount), 0)
const totalCollected = bills.reduce((acc, bill) => acc + Number(bill.paidAmount), 0)
const totalPending = bills.reduce((acc, bill) => acc + Number(bill.dueAmount), 0)

const statsData = [
  { title: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, icon: IndianRupee, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "Collected", value: `₦${totalCollected.toLocaleString()}`, icon: CheckCircle, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30" },
  { title: "Pending", value: `₦${totalPending.toLocaleString()}`, icon: AlertCircle, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30" },
  { title: "Total Bills", value: "6", icon: FileText, gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/30" },
]

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBills = bills.filter(
    (bill) =>
      bill.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Billing & Invoicing</h1>
            <p className="text-slate-500">Manage bills, payments, and invoices</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Link href="/billing/new">
              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30">
                <Plus className="mr-2 h-4 w-4" />New Bill
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
                <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">All Bills</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input type="search" placeholder="Search bills..." className="pl-10 w-64 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ overflowX: "auto" }}>
                <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead className="font-semibold text-slate-700">Bill No.</TableHead>
                    <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                    <TableHead className="font-semibold text-slate-700">Type</TableHead>
                    <TableHead className="font-semibold text-slate-700">Date</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Amount</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Paid</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Due</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.map((bill, index) => (
                    <motion.tr
                      key={bill.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-slate-100 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-700">{bill.billNumber}</TableCell>
                      <TableCell>
                        <div><p className="font-medium text-slate-800">{bill.patient}</p><p className="text-xs text-slate-500">{bill.umr}</p></div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{bill.billType}</Badge></TableCell>
                      <TableCell className="text-slate-600">{bill.billDate}</TableCell>
                      <td className="text-right font-medium text-slate-700">₦{Number(bill.totalAmount).toLocaleString()}</td>
                      <td className="text-right font-medium text-emerald-600">₦{Number(bill.paidAmount).toLocaleString()}</td>
                      <td className="text-right font-medium text-rose-600">₦{Number(bill.dueAmount).toLocaleString()}</td>
                      <TableCell>
                        <Badge variant={bill.paymentStatus === "Paid" ? "success" : bill.paymentStatus === "Partial" ? "warning" : "destructive"} className={
                          bill.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                          bill.paymentStatus === "Partial" ? "bg-amber-100 text-amber-700 border-amber-200" :
                          "bg-red-100 text-red-700 border-red-200"
                        }>
                          {bill.paymentStatus}
                        </Badge>
                      </TableCell>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-600"><Printer className="h-4 w-4" /></Button>
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
