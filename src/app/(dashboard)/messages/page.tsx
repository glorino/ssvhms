"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Inbox,
  Star,
  Trash2,
  Search,
  Mail,
  MailOpen,
  Clock,
  CheckCircle,
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
    title: "Inbox",
    value: "6",
    icon: Inbox,
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/30",
  },
  {
    title: "Unread",
    value: "2",
    icon: Mail,
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/30",
  },
  {
    title: "Sent",
    value: "4",
    icon: Send,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/30",
  },
]

const inboxMessages = [
  { id: "MSG001", from: "Dr. Priya Sharma", subject: "Patient Report Ready", preview: "The pathology reports for patient Rajesh Kumar are ready for review...", time: "10:30 AM", read: false, starred: true },
  { id: "MSG002", from: "Rahul Joshi", subject: "Staff Meeting Schedule", preview: "Dear team, please note the staff meeting scheduled for tomorrow at 10 AM...", time: "09:15 AM", read: true, starred: false },
  { id: "MSG003", from: "Sanjay Mehta", subject: "Low Stock Alert - Paracetamol", preview: "The stock for Paracetamol 500mg has fallen below minimum level...", time: "08:45 AM", read: false, starred: false },
  { id: "MSG004", from: "Neha Gupta", subject: "Nursing Shift Update", preview: "The night shift handover has been completed. All patients are stable...", time: "Yesterday", read: true, starred: false },
  { id: "MSG005", from: "Dr. Amit Singh", subject: "Surgery Schedule Change", preview: "The knee replacement surgery for Anita Patel has been rescheduled to...", time: "Yesterday", read: true, starred: true },
  { id: "MSG006", from: "Sunita Patil", subject: "Visitor Inquiry", preview: "A visitor inquired about room availability for a potential IPD admission...", time: "2 days ago", read: true, starred: false },
]

const sentMessages = [
  { id: "SNT001", to: "Dr. Priya Sharma", subject: "Re: Patient Report Ready", preview: "Thank you for the update. I will review the reports shortly...", time: "10:45 AM", status: "Delivered" },
  { id: "SNT002", to: "Rahul Joshi", subject: "Re: Staff Meeting Schedule", preview: "I will attend the meeting. Please share the agenda...", time: "09:30 AM", status: "Delivered" },
  { id: "SNT003", to: "Sanjay Mehta", subject: "Re: Low Stock Alert", preview: "Please place an order for restocking immediately...", time: "09:00 AM", status: "Delivered" },
  { id: "SNT004", to: "All Staff", subject: "Monthly Report Submission", preview: "Please submit your monthly reports by the end of this week...", time: "Yesterday", status: "Sent" },
]

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeMessage, setComposeMessage] = useState("")

  const filteredInbox = inboxMessages.filter(
    (msg) => msg.from.toLowerCase().includes(searchTerm.toLowerCase()) || msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const unreadCount = inboxMessages.filter((msg) => !msg.read).length

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Messages
            </h1>
            <p className="text-slate-500">Internal messaging system</p>
          </div>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="inbox">
              <TabsList className="bg-white border border-slate-200 p-1 shadow-sm">
                <TabsTrigger
                  value="inbox"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  Inbox
                </TabsTrigger>
                <TabsTrigger
                  value="sent"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  Sent
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inbox">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          Inbox
                        </CardTitle>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                          <Input
                            type="search"
                            placeholder="Search messages..."
                            className="pl-10 w-64 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {filteredInbox.map((msg, index) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`flex items-start gap-3 rounded-lg border border-slate-100 p-4 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors duration-200 ${
                              !msg.read ? "bg-blue-50 border-blue-200" : ""
                            }`}
                          >
                            <div className="mt-1">
                              {msg.read ? (
                                <MailOpen className="h-4 w-4 text-slate-400" />
                              ) : (
                                <Mail className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className={`font-medium ${!msg.read ? "text-blue-900" : "text-slate-800"}`}>
                                  {msg.from}
                                </p>
                                <div className="flex items-center gap-2">
                                  {msg.starred && (
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  )}
                                  <span className="text-xs text-slate-500">{msg.time}</span>
                                </div>
                              </div>
                              <p className={`text-sm ${!msg.read ? "font-semibold text-slate-800" : "text-slate-600"}`}>
                                {msg.subject}
                              </p>
                              <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="sent">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Sent Messages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {sentMessages.map((msg, index) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 rounded-lg border border-slate-100 p-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-colors duration-200"
                          >
                            <div className="mt-1">
                              <Send className="h-4 w-4 text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-slate-800">To: {msg.to}</p>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={msg.status === "Delivered" ? "success" : "secondary"}
                                    className={
                                      msg.status === "Delivered"
                                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                        : "bg-slate-100 text-slate-600 border-slate-200"
                                    }
                                  >
                                    {msg.status}
                                  </Badge>
                                  <span className="text-xs text-slate-500">{msg.time}</span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-600">{msg.subject}</p>
                              <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Compose Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">To</label>
                    <Input
                      type="search"
                      placeholder="Search staff..."
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Subject</label>
                    <Input
                      placeholder="Enter subject"
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Message</label>
                    <textarea
                      className="flex min-h-[150px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Type your message..."
                      value={composeMessage}
                      onChange={(e) => setComposeMessage(e.target.value)}
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
