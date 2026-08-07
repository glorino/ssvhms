"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Download,
  IndianRupee,
  Users,
  Stethoscope,
  Pill,
  FlaskConical,
  Scan,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated-wrapper"

const reportTypes = [
  { id: "revenue", title: "Revenue Report", description: "Daily, weekly, and monthly revenue analytics", icon: IndianRupee, gradient: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/30", href: "/reports/revenue" },
  { id: "patients", title: "Patient Report", description: "Patient registration, discharge, and demographics", icon: Users, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/30", href: "/reports/patients" },
  { id: "doctors", title: "Doctor Report", description: "Doctor performance and consultation analytics", icon: Stethoscope, gradient: "from-purple-500 to-violet-600", shadow: "shadow-purple-500/30", href: "/reports/doctors" },
  { id: "pharmacy", title: "Pharmacy Report", description: "Medicine sales, inventory, and purchase analytics", icon: Pill, gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/30", href: "/reports/pharmacy" },
  { id: "pathology", title: "Pathology Report", description: "Lab tests conducted, results, and turnaround time", icon: FlaskConical, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/30", href: "/reports/pathology" },
  { id: "radiology", title: "Radiology Report", description: "Imaging studies and diagnostic analytics", icon: Scan, gradient: "from-indigo-500 to-blue-600", shadow: "shadow-indigo-500/30", href: "/reports/radiology" },
  { id: "appointments", title: "Appointment Report", description: "Appointment scheduling and attendance analytics", icon: Calendar, gradient: "from-teal-500 to-cyan-600", shadow: "shadow-teal-500/30", href: "/reports/appointments" },
  { id: "billing", title: "Billing Report", description: "Invoice generation, payments, and dues analytics", icon: FileText, gradient: "from-orange-500 to-red-600", shadow: "shadow-orange-500/30", href: "/reports/billing" },
]

const recentReports = [
  { id: "RPT001", reportName: "Daily Revenue Summary", generatedBy: "System", date: "2026-08-07", type: "Revenue", status: "Ready" },
  { id: "RPT002", reportName: "Patient Discharge Report", generatedBy: "Dr. Priya Sharma", date: "2026-08-07", type: "Patient", status: "Ready" },
  { id: "RPT003", reportName: "Pharmacy Sales Report", generatedBy: "Sanjay Mehta", date: "2026-08-06", type: "Pharmacy", status: "Ready" },
  { id: "RPT004", reportName: "Weekly Lab Tests Summary", generatedBy: "System", date: "2026-08-05", type: "Pathology", status: "Ready" },
  { id: "RPT005", reportName: "Monthly Payroll Report", generatedBy: "Rahul Joshi", date: "2026-08-01", type: "HR", status: "Ready" },
]

export default function ReportsPage() {
  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Reports & Analytics
            </h1>
            <p className="text-slate-500">Generate and view hospital analytics reports</p>
          </div>
          <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reportTypes.map((report) => (
            <StaggerItem key={report.id}>
              <Link href={report.href}>
                <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className={`overflow-hidden shadow-lg ${report.shadow} hover:shadow-xl transition-shadow duration-300 cursor-pointer`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${report.gradient} flex items-center justify-center shadow-lg`}>
                          <report.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{report.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">{report.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Recently Generated Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between rounded-lg border border-slate-100 p-4 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-purple-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                        <BarChart3 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{report.reportName}</p>
                        <p className="text-xs text-slate-500">
                          Generated by {report.generatedBy} on {report.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                        {report.type}
                      </Badge>
                      <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        {report.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="hover:bg-violet-50 hover:text-violet-600">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatedPage>
  )
}
