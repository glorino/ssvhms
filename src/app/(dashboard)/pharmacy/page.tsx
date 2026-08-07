"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, Download, Eye, Edit, Pill, Package, AlertTriangle, TrendingUp, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedPage, StaggerContainer, StaggerItem } from "@/components/animated-wrapper"

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

const statsData = [
  { title: "Total Medicines", value: "6", icon: Pill, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30" },
  { title: "Total Stock Units", value: "1,285", icon: Package, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30" },
  { title: "Low Stock Alert", value: "2", icon: AlertTriangle, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30" },
  { title: "Today Sales", value: "₹1,580", icon: TrendingUp, gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/30" },
]

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedicines = medicines.filter(
    (med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()) || med.generic.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Pharmacy</h1>
            <p className="text-slate-500">Manage medicine inventory, purchases, and sales</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50"><Download className="mr-2 h-4 w-4" />Export</Button>
            <Link href="/pharmacy/medicines/new">
              <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/30">
                <Plus className="mr-2 h-4 w-4" />Add Medicine
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
          <Tabs defaultValue="medicines">
            <TabsList className="bg-white shadow-md rounded-xl p-1">
              <TabsTrigger value="medicines" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white rounded-lg">Medicines</TabsTrigger>
              <TabsTrigger value="purchases" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">Purchases</TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">Sales</TabsTrigger>
            </TabsList>

            <TabsContent value="medicines">
              <Card className="shadow-lg border-0 mt-4">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Medicine Inventory</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                      <Input type="search" placeholder="Search medicines..." className="pl-10 w-64 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Medicine</TableHead>
                        <TableHead className="font-semibold text-slate-700">Generic</TableHead>
                        <TableHead className="font-semibold text-slate-700">Category</TableHead>
                        <TableHead className="font-semibold text-slate-700">Batch</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Stock</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Price</TableHead>
                        <TableHead className="font-semibold text-slate-700">Expiry</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMedicines.map((med, index) => (
                        <motion.tr
                          key={med.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-colors duration-200"
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium text-slate-800">{med.name}</p>
                              <p className="text-xs text-slate-500">{med.manufacturer}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-600">{med.generic}</TableCell>
                          <TableCell><Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">{med.category}</Badge></TableCell>
                          <TableCell className="text-slate-600">{med.batchNo}</TableCell>
                          <td className="text-right"><span className={med.stock < med.minStock ? "text-rose-600 font-bold" : "text-slate-700 font-medium"}>{med.stock}</span></td>
                          <td className="text-right font-medium text-slate-700">₹{med.sellingPrice}</td>
                          <TableCell className="text-slate-600">{med.expiryDate}</TableCell>
                          <TableCell>
                            <Badge variant={med.status === "In Stock" ? "success" : "destructive"} className={med.status === "In Stock" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-red-100 text-red-700 border-red-200"}>
                              {med.status}
                            </Badge>
                          </TableCell>
                          <td className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-600"><Edit className="h-4 w-4" /></Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases">
              <Card className="shadow-lg border-0 mt-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Purchase History</CardTitle>
                    <Link href="/pharmacy/purchases/new">
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
                        <ShoppingCart className="mr-2 h-4 w-4" />New Purchase
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Purchase No.</TableHead>
                        <TableHead className="font-semibold text-slate-700">Supplier</TableHead>
                        <TableHead className="font-semibold text-slate-700">Invoice</TableHead>
                        <TableHead className="font-semibold text-slate-700">Date</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Amount</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Paid</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchases.map((pur, index) => (
                        <motion.tr
                          key={pur.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{pur.purchaseNo}</TableCell>
                          <TableCell className="text-slate-600">{pur.supplier}</TableCell>
                          <TableCell className="text-slate-600">{pur.invoiceNo}</TableCell>
                          <TableCell className="text-slate-600">{pur.date}</TableCell>
                          <td className="text-right font-medium text-slate-700">₹{pur.totalAmount.toLocaleString()}</td>
                          <td className="text-right font-medium text-slate-700">₹{pur.paidAmount.toLocaleString()}</td>
                          <TableCell>
                            <Badge variant={pur.status === "Paid" ? "success" : "warning"} className={pur.status === "Paid" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200"}>
                              {pur.status}
                            </Badge>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales">
              <Card className="shadow-lg border-0 mt-4">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Sales History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100">
                        <TableHead className="font-semibold text-slate-700">Sale No.</TableHead>
                        <TableHead className="font-semibold text-slate-700">Patient</TableHead>
                        <TableHead className="font-semibold text-slate-700">Items</TableHead>
                        <TableHead className="font-semibold text-slate-700">Date</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Amount</TableHead>
                        <TableHead className="text-right font-semibold text-slate-700">Paid</TableHead>
                        <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sales.map((sale, index) => (
                        <motion.tr
                          key={sale.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-slate-100 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-purple-50/50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-slate-700">{sale.saleNo}</TableCell>
                          <TableCell className="text-slate-600">{sale.patient}</TableCell>
                          <TableCell className="text-slate-600">{sale.items}</TableCell>
                          <TableCell className="text-slate-600">{sale.date}</TableCell>
                          <td className="text-right font-medium text-slate-700">₹{sale.totalAmount.toLocaleString()}</td>
                          <td className="text-right font-medium text-slate-700">₹{sale.paidAmount.toLocaleString()}</td>
                          <TableCell>
                            <Badge variant={sale.status === "Paid" ? "success" : "warning"} className={sale.status === "Paid" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-amber-100 text-amber-700 border-amber-200"}>
                              {sale.status}
                            </Badge>
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
