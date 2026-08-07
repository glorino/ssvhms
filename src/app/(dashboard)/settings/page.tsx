"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Building2,
  CreditCard,
  Bell,
  Monitor,
  Save,
  Upload,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AnimatedPage,
  StaggerContainer,
  StaggerItem,
} from "@/components/animated-wrapper"

const stats = [
  {
    title: "General Settings",
    value: "Configured",
    icon: Settings,
    gradient: "from-slate-500 to-gray-600",
    shadow: "shadow-slate-500/30",
  },
  {
    title: "Hospital Profile",
    value: "Complete",
    icon: Building2,
    gradient: "from-slate-600 to-zinc-600",
    shadow: "shadow-slate-600/30",
  },
  {
    title: "Notifications",
    value: "Active",
    icon: Bell,
    gradient: "from-gray-500 to-slate-600",
    shadow: "shadow-gray-500/30",
  },
]

export default function SettingsPage() {
  const [hospitalName, setHospitalName] = useState("SSV Hospital & Medical Services")
  const [hospitalEmail, setHospitalEmail] = useState("info@ssvhospital.com")
  const [hospitalPhone, setHospitalPhone] = useState("+91 9876543210")
  const [hospitalAddress, setHospitalAddress] = useState("123 Medical College Road, Mumbai, Maharashtra 400001")
  const [gstNumber, setGstNumber] = useState("27AABCS1234F1Z5")
  const [panNumber, setPanNumber] = useState("AABCS1234F")

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-slate-500">Configure system settings and preferences</p>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700 shadow-lg shadow-slate-500/30"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <StaggerItem key={stat.title}>
              <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className={`overflow-hidden shadow-lg ${stat.shadow} hover:shadow-xl transition-shadow duration-300`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-slate-800">{stat.value}</div>
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

        <Tabs defaultValue="general">
          <TabsList className="bg-white border border-slate-200 p-1 shadow-sm">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-gray-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="hospital"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-gray-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Hospital
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-gray-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-gray-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-gray-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                      <Building2 className="h-5 w-5 text-slate-600" />
                      Hospital Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Hospital Name</label>
                      <Input
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email</label>
                      <Input
                        type="email"
                        value={hospitalEmail}
                        onChange={(e) => setHospitalEmail(e.target.value)}
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone</label>
                      <Input
                        value={hospitalPhone}
                        onChange={(e) => setHospitalPhone(e.target.value)}
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Address</label>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                        value={hospitalAddress}
                        onChange={(e) => setHospitalAddress(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                      <Monitor className="h-5 w-5 text-slate-600" />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Hospital Logo</label>
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                          <Upload className="h-6 w-6 text-slate-400" />
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Theme</label>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-slate-900 text-white border-slate-900">
                          Light
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                          Dark
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                          System
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Language</label>
                      <Input
                        defaultValue="English"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Timezone</label>
                      <Input
                        defaultValue="Asia/Kolkata (IST)"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="hospital">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                    Hospital Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Registration Number</label>
                      <Input
                        defaultValue="HOSP/MC/2020/1234"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Established Year</label>
                      <Input
                        defaultValue="2020"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Total Beds</label>
                      <Input
                        defaultValue="125"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Departments</label>
                      <Input
                        defaultValue="15"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Accreditation</label>
                      <div className="flex items-center gap-2">
                        <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                          NABH Accredited
                        </Badge>
                        <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                          Update
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Website</label>
                      <Input
                        defaultValue="https://www.ssvhospital.com"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="billing">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                      <CreditCard className="h-5 w-5 text-slate-600" />
                      Tax & GST Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">GST Number</label>
                      <Input
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">PAN Number</label>
                      <Input
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">GST Rate (%)</label>
                      <Input
                        defaultValue="18"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Service Tax</label>
                      <Input
                        defaultValue="0"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                      Payment Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Invoice Prefix</label>
                      <Input
                        defaultValue="INV-"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Invoice Starting Number</label>
                      <Input
                        defaultValue="1000"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Payment Terms (days)</label>
                      <Input
                        defaultValue="30"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Accepted Payment Methods</label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Cash</Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">UPI</Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Card</Badge>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Net Banking</Badge>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Insurance</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                    <Bell className="h-5 w-5 text-slate-600" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-800">Email Notifications</h3>
                    <div className="space-y-3">
                      {["New Patient Registration", "Appointment Booking", "Discharge Summary", "Low Stock Alert", "Payment Received", "Staff Leave Request"].map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-gray-50/50 transition-colors duration-200"
                        >
                          <span className="text-sm text-slate-700">{item}</span>
                          <div className="h-6 w-11 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 relative cursor-pointer shadow-md shadow-emerald-500/30">
                            <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-slate-800">SMS Notifications</h3>
                    <div className="space-y-3">
                      {["Appointment Reminder", "OTP Verification", "Payment Confirmation", "Emergency Alerts"].map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-gray-50/50 transition-colors duration-200"
                        >
                          <span className="text-sm text-slate-700">{item}</span>
                          <div className="h-6 w-11 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 relative cursor-pointer shadow-md shadow-emerald-500/30">
                            <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="system">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                      <Settings className="h-5 w-5 text-slate-600" />
                      System Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-gray-50/50 transition-colors duration-200">
                      <span className="text-sm text-slate-500">Software Version</span>
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">v2.5.0</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-gray-50/50 transition-colors duration-200">
                      <span className="text-sm text-slate-500">Database Version</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">PostgreSQL 15</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-gray-50/50 transition-colors duration-200">
                      <span className="text-sm text-slate-500">Last Updated</span>
                      <span className="text-sm text-slate-700">August 07, 2026</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-gray-50/50 transition-colors duration-200">
                      <span className="text-sm text-slate-500">Server Status</span>
                      <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-emerald-200">Online</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                      Data Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Backup Schedule</label>
                      <Input
                        defaultValue="Daily at 2:00 AM IST"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Data Retention (years)</label>
                      <Input
                        defaultValue="7"
                        className="border-slate-200 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                        Backup Now
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50">
                        Export Data
                      </Button>
                      <Button variant="destructive" size="sm" className="shadow-lg shadow-red-500/30">
                        Clear Cache
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  )
}
