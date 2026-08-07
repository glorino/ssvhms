"use client"

import React, { useState } from "react"
import { Settings, Building2, CreditCard, Bell, Monitor, Save, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [hospitalName, setHospitalName] = useState("SSV Hospital & Medical Services")
  const [hospitalEmail, setHospitalEmail] = useState("info@ssvhospital.com")
  const [hospitalPhone, setHospitalPhone] = useState("+91 9876543210")
  const [hospitalAddress, setHospitalAddress] = useState("123 Medical College Road, Mumbai, Maharashtra 400001")
  const [gstNumber, setGstNumber] = useState("27AABCS1234F1Z5")
  const [panNumber, setPanNumber] = useState("AABCS1234F")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">Configure system settings and preferences</p>
        </div>
        <Button size="sm"><Save className="mr-2 h-4 w-4" />Save Changes</Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hospital">Hospital</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Hospital Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hospital Name</label>
                  <Input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" value={hospitalEmail} onChange={(e) => setHospitalEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input value={hospitalPhone} onChange={(e) => setHospitalPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <textarea className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2" value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hospital Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-slate-400" />
                    </div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Theme</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-900 text-white">Light</Button>
                    <Button variant="outline" size="sm">Dark</Button>
                    <Button variant="outline" size="sm">System</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Input defaultValue="English" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timezone</label>
                  <Input defaultValue="Asia/Kolkata (IST)" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hospital">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Registration Number</label>
                  <Input defaultValue="HOSP/MC/2020/1234" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Established Year</label>
                  <Input defaultValue="2020" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Total Beds</label>
                  <Input defaultValue="125" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Departments</label>
                  <Input defaultValue="15" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Accreditation</label>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">NABH Accredited</Badge>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website</label>
                  <Input defaultValue="https://www.ssvhospital.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Tax & GST Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">GST Number</label>
                  <Input value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">PAN Number</label>
                  <Input value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GST Rate (%)</label>
                  <Input defaultValue="18" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Tax</label>
                  <Input defaultValue="0" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Invoice Prefix</label>
                  <Input defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Invoice Starting Number</label>
                  <Input defaultValue="1000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Terms (days)</label>
                  <Input defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Accepted Payment Methods</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Cash</Badge>
                    <Badge variant="outline">UPI</Badge>
                    <Badge variant="outline">Card</Badge>
                    <Badge variant="outline">Net Banking</Badge>
                    <Badge variant="outline">Insurance</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  {["New Patient Registration", "Appointment Booking", "Discharge Summary", "Low Stock Alert", "Payment Received", "Staff Leave Request"].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">{item}</span>
                      <div className="h-6 w-11 rounded-full bg-green-500 relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">SMS Notifications</h3>
                <div className="space-y-3">
                  {["Appointment Reminder", "OTP Verification", "Payment Confirmation", "Emergency Alerts"].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">{item}</span>
                      <div className="h-6 w-11 rounded-full bg-green-500 relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm text-slate-500">Software Version</span>
                  <Badge variant="outline">v2.5.0</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm text-slate-500">Database Version</span>
                  <Badge variant="outline">PostgreSQL 15</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm text-slate-500">Last Updated</span>
                  <span className="text-sm">August 07, 2026</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm text-slate-500">Server Status</span>
                  <Badge variant="success">Online</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Backup Schedule</label>
                  <Input defaultValue="Daily at 2:00 AM IST" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Retention (years)</label>
                  <Input defaultValue="7" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Backup Now</Button>
                  <Button variant="outline" size="sm">Export Data</Button>
                  <Button variant="destructive" size="sm">Clear Cache</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
