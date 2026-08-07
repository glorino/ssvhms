"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Eye, Edit, Pill, Package, AlertTriangle, TrendingUp, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const medicines = [
  { id: "MED001", name: "Paracetamol 500mg", generic: "Paracetamol", category: "Analgesic", manufacturer: "Cipla", batchNo: "BAT001", stock: 500, minStock: 100, purchasePrice: 2, sellingPrice: 5, expiryDate: "2027-12-31", status: "In Stock" },
  { id: "MED002", name: "Amoxicillin 250mg", generic: "Amoxicillin", category: "Antibiotic", manufacturer: "Sun Pharma", batchNo: "BAT002", stock: 200, minStock: 50, purchasePrice: 8, sellingPrice: 15, expiryDate: "2027-06-30", status: "In Stock" },
  { id: "MED003", name: "Metformin 500mg", generic: "Metformin", category: "Antidiabetic", manufacturer: "Dr. Reddy's", batchNo: "BAT003", stock: 30, minStock: 50, purchasePrice: 5, sellingPrice: 10, expiryDate: "2027-09-30", status: "Low Stock" },
  { id: "MED004", name: "Amlodipine 5mg", generic: "Amlodipine", category: "Antihypertensive", manufacturer: "Pfizer", batchNo: "BAT004", stock: 150, minStock: 50, purchasePrice: 8, sellingPrice: 18, expiryDate: "2027-03-31", status: "In Stock" },
  { id: "MED005", name: "Omeprazole 20mg", generic: "Omeprazole", category: "Antacid", manufacturer: "AstraZeneca", batchNo: "BAT005", stock: 5, minStock: 30, purchasePrice: 6, sellingPrice: 12, expiryDate: "2026-12-31", status: "Low Stock" },
  { id: "MED006", name: "Cetirizine 10mg", generic: "Cetirizine", category: "Antihistamine", manufacturer: "Cipla", batchNo: "BAT006", stock: 400, minStock: 100, purchasePrice: 3, sellingPrice: 7, expiryDate: "2027-08-31", status: "In Stock" },
]

const purchases = [
  { id: "PUR001", purchaseNo: "PUR2026001", supplier: "Medico Pharma", invoiceNo: "INV-456", totalAmount: 25000, paidAmount: 25000, date: "2026-08-05", status: "Paid" },
  { id: "PUR002", purchaseNo: "PUR2026002", supplier: "HealthCare Supplies", invoiceNo: "INV-789", totalAmount: 45000, paidAmount: 20000, date: "2026-08-03", status: "Partial" },
  { id: "PUR003", purchaseNo: "PUR2026003", supplier: "Generic Drugs Ltd", invoiceNo: "INV-012", totalAmount: 18000, paidAmount: 18000, date: "2026-08-01", status: "Paid" },
]

const sales = [
  { id: "SAL001", saleNo: "SAL2026001", patient: "Rajesh Kumar", items: 3, totalAmount: 450, paidAmount: 450, date: "2026-08-07", status: "Paid" },
  { id: "SAL002", saleNo: "SAL2026002", patient: "Anita Patel", items: 2, totalAmount: 280, paidAmount: 280, date: "2026-08-07", status: "Paid" },
  { id: "SAL003", saleNo: "SAL2026003", patient: "Suresh Reddy", items: 5, totalAmount: 850, paidAmount: 500, date: "2026-08-06", status: "Partial" },
]

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedicines = medicines.filter(
    (med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()) || med.generic.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalStock = medicines.reduce((acc, med) => acc + med.stock, 0)
  const lowStockCount = medicines.filter((med) => med.stock < med.minStock).length
  const totalSales = sales.reduce((acc, sale) => acc + sale.totalAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pharmacy</h1>
          <p className="text-slate-500">Manage medicine inventory, purchases, and sales</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Link href="/pharmacy/medicines/new"><Button size="sm"><Plus className="mr-2 h-4 w-4" />Add Medicine</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Pill className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{medicines.length}</p><p className="text-xs text-slate-500">Total Medicines</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><Package className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold text-green-600">{totalStock}</p><p className="text-xs text-slate-500">Total Stock Units</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2"><AlertTriangle className="h-5 w-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold text-red-600">{lowStockCount}</p><p className="text-xs text-slate-500">Low Stock Alert</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2"><TrendingUp className="h-5 w-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold">₹{totalSales.toLocaleString()}</p><p className="text-xs text-slate-500">Today Sales</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="medicines">
        <TabsList>
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="medicines">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Medicine Inventory</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                  <Input type="search" placeholder="Search medicines..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Generic</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedicines.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell><div><p className="font-medium">{med.name}</p><p className="text-xs text-slate-500">{med.manufacturer}</p></div></TableCell>
                      <TableCell>{med.generic}</TableCell>
                      <TableCell><Badge variant="outline">{med.category}</Badge></TableCell>
                      <TableCell>{med.batchNo}</TableCell>
                      <TableCell className="text-right"><span className={med.stock < med.minStock ? "text-red-600 font-medium" : ""}>{med.stock}</span></TableCell>
                      <TableCell className="text-right">₹{med.sellingPrice}</TableCell>
                      <TableCell>{med.expiryDate}</TableCell>
                      <TableCell><Badge variant={med.status === "In Stock" ? "success" : "destructive"}>{med.status}</Badge></TableCell>
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

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Purchase History</CardTitle>
                <Link href="/pharmacy/purchases/new"><Button size="sm"><ShoppingCart className="mr-2 h-4 w-4" />New Purchase</Button></Link>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Purchase No.</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchases.map((pur) => (
                    <TableRow key={pur.id}>
                      <TableCell className="font-medium">{pur.purchaseNo}</TableCell>
                      <TableCell>{pur.supplier}</TableCell>
                      <TableCell>{pur.invoiceNo}</TableCell>
                      <TableCell>{pur.date}</TableCell>
                      <TableCell className="text-right">₹{pur.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{pur.paidAmount.toLocaleString()}</TableCell>
                      <TableCell><Badge variant={pur.status === "Paid" ? "success" : "warning"}>{pur.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader><CardTitle>Sales History</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sale No.</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.saleNo}</TableCell>
                      <TableCell>{sale.patient}</TableCell>
                      <TableCell>{sale.items}</TableCell>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell className="text-right">₹{sale.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{sale.paidAmount.toLocaleString()}</TableCell>
                      <TableCell><Badge variant={sale.status === "Paid" ? "success" : "warning"}>{sale.status}</Badge></TableCell>
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
