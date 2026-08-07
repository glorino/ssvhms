"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, CreditCard, IndianRupee, CheckCircle, Clock, AlertCircle, FileText, Printer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const bills = [
  { id: "BILL001", billNumber: "BL2026001", patient: "Rajesh Kumar", umr: "UMR2026001", billType: "OPD", billDate: "2026-08-07", totalAmount: 1500, paidAmount: 1500, dueAmount: 0, paymentStatus: "Paid" },
  { id: "BILL002", billNumber: "BL2026002", patient: "Anita Patel", umr: "UMR2026002", billType: "IPD", billDate: "2026-08-06", totalAmount: 87200, paidAmount: 50000, dueAmount: 37200, paymentStatus: "Partial" },
  { id: "BILL003", billNumber: "BL2026003", patient: "Suresh Reddy", umr: "UMR2026003", billType: "Pathology", billDate: "2026-08-05", totalAmount: 3500, paidAmount: 3500, dueAmount: 0, paymentStatus: "Paid" },
  { id: "BILL004", billNumber: "BL2026004", patient: "Priya Verma", umr: "UMR2026004", billType: "Pharmacy", billDate: "2026-08-04", totalAmount: 2800, paidAmount: 0, dueAmount: 2800, paymentStatus: "Pending" },
  { id: "BILL005", billNumber: "BL2026005", patient: "Mohammed Ali", umr: "UMR2026005", billType: "Radiology", billDate: "2026-08-03", totalAmount: 5000, paidAmount: 5000, dueAmount: 0, paymentStatus: "Paid" },
  { id: "BILL006", billNumber: "BL2026006", patient: "Deepika Singh", umr: "UMR2026006", billType: "IPD", billDate: "2026-08-02", totalAmount: 125000, paidAmount: 75000, dueAmount: 50000, paymentStatus: "Partial" },
]

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBills = bills.filter(
    (bill) =>
      bill.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = bills.reduce((acc, bill) => acc + Number(bill.totalAmount), 0)
  const totalCollected = bills.reduce((acc, bill) => acc + Number(bill.paidAmount), 0)
  const totalPending = bills.reduce((acc, bill) => acc + Number(bill.dueAmount), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Invoicing</h1>
          <p className="text-slate-500">Manage bills, payments, and invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/billing/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Bill
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><IndianRupee className="h-5 w-5 text-blue-600" /></div>
              <div>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><CheckCircle className="h-5 w-5 text-green-600" /></div>
              <div>
                <p className="text-2xl font-bold text-green-600">₹{totalCollected.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Collected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2"><AlertCircle className="h-5 w-5 text-red-600" /></div>
              <div>
                <p className="text-2xl font-bold text-red-600">₹{totalPending.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2"><FileText className="h-5 w-5 text-purple-600" /></div>
              <div>
                <p className="text-2xl font-bold">{bills.length}</p>
                <p className="text-xs text-slate-500">Total Bills</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Bills</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                <Input type="search" placeholder="Search bills..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill No.</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.billNumber}</TableCell>
                  <TableCell>
                    <div><p className="font-medium">{bill.patient}</p><p className="text-xs text-slate-500">{bill.umr}</p></div>
                  </TableCell>
                  <TableCell><Badge variant="outline">{bill.billType}</Badge></TableCell>
                  <TableCell>{bill.billDate}</TableCell>
                  <TableCell className="text-right font-medium">₹{Number(bill.totalAmount).toLocaleString()}</TableCell>
                  <TableCell className="text-right text-green-600">₹{Number(bill.paidAmount).toLocaleString()}</TableCell>
                  <TableCell className="text-right text-red-600">₹{Number(bill.dueAmount).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={bill.paymentStatus === "Paid" ? "success" : bill.paymentStatus === "Partial" ? "warning" : "destructive"}>
                      {bill.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Printer className="h-4 w-4" /></Button>
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
