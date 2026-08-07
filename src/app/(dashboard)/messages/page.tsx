"use client"

import React, { useState } from "react"
import { Send, Inbox, Star, Trash2, Search, Mail, MailOpen, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-500">Internal messaging system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2"><Inbox className="h-5 w-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{inboxMessages.length}</p><p className="text-xs text-slate-500">Inbox</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-yellow-100 p-2"><Mail className="h-5 w-5 text-yellow-600" /></div>
              <div><p className="text-2xl font-bold text-yellow-600">{unreadCount}</p><p className="text-xs text-slate-500">Unread</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><Send className="h-5 w-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold">{sentMessages.length}</p><p className="text-xs text-slate-500">Sent</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="inbox">
            <TabsList>
              <TabsTrigger value="inbox">Inbox</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
            </TabsList>

            <TabsContent value="inbox">
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle>Inbox</CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 text-slate-400 -translate-y-1/2" />
                      <Input type="search" placeholder="Search messages..." className="pl-10 w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredInbox.map((msg) => (
                      <div key={msg.id} className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-slate-50 ${!msg.read ? "bg-blue-50 border-blue-200" : ""}`}>
                        <div className="mt-1">
                          {msg.read ? <MailOpen className="h-4 w-4 text-slate-400" /> : <Mail className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium ${!msg.read ? "text-blue-900" : ""}`}>{msg.from}</p>
                            <div className="flex items-center gap-2">
                              {msg.starred && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                              <span className="text-xs text-slate-500">{msg.time}</span>
                            </div>
                          </div>
                          <p className={`text-sm ${!msg.read ? "font-semibold" : ""}`}>{msg.subject}</p>
                          <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sent">
              <Card>
                <CardHeader>
                  <CardTitle>Sent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {sentMessages.map((msg) => (
                      <div key={msg.id} className="flex items-start gap-3 rounded-lg border p-4">
                        <div className="mt-1">
                          <Send className="h-4 w-4 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">To: {msg.to}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={msg.status === "Delivered" ? "success" : "secondary"}>{msg.status}</Badge>
                              <span className="text-xs text-slate-500">{msg.time}</span>
                            </div>
                          </div>
                          <p className="text-sm">{msg.subject}</p>
                          <p className="text-xs text-slate-500 truncate">{msg.preview}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Input type="search" placeholder="Search staff..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Enter subject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea className="flex min-h-[150px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Type your message..." value={composeMessage} onChange={(e) => setComposeMessage(e.target.value)} />
              </div>
              <Button className="w-full"><Send className="mr-2 h-4 w-4" />Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
