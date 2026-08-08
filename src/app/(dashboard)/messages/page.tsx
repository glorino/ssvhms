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
  MessageSquare,
} from "lucide-react"

const stats = [
  {
    title: "Inbox",
    value: "6",
    subtitle: "Messages received",
    icon: Inbox,
    color: "#3b82f6",
    bgColor: "#eff6ff",
  },
  {
    title: "Unread",
    value: "2",
    subtitle: "Pending review",
    icon: Mail,
    color: "#f59e0b",
    bgColor: "#fffbeb",
  },
  {
    title: "Sent",
    value: "4",
    subtitle: "Messages sent",
    icon: Send,
    color: "#10b981",
    bgColor: "#ecfdf5",
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
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox")
  const [activePeriod, setActivePeriod] = useState("All Time")

  const filteredInbox = inboxMessages.filter(
    (msg) => msg.from.toLowerCase().includes(searchTerm.toLowerCase()) || msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const periods = ["Today", "This Week", "This Month", "All Time"]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Gradient Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
          padding: "32px 40px",
          borderRadius: "0 0 24px 24px",
          boxShadow: "0 10px 40px rgba(99, 102, 241, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          transform: "translate(100px, -100px)",
        }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          transform: "translate(-50px, 50px)",
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", margin: 0 }}>
              Messages
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", marginTop: "8px" }}>
              Internal messaging system
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "white",
              color: "#3b82f6",
              padding: "12px 24px",
              borderRadius: "12px",
              border: "none",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MessageSquare size={18} />
            Compose
          </motion.button>
        </div>
      </motion.div>

      <div style={{ padding: "24px 40px" }}>
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "16px 24px",
            marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Filter:</span>
          {periods.map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePeriod(period)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: activePeriod === period ? "#3b82f6" : "#f1f5f9",
                color: activePeriod === period ? "white" : "#64748b",
              }}
            >
              {period}
            </motion.button>
          ))}
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)" }}
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.3s ease",
              }}
            >
              <div>
                <p style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
                  {stat.title}
                </p>
                <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#1e293b", margin: "8px 0 4px 0" }}>
                  {stat.value}
                </h3>
                <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                  {stat.subtitle}
                </p>
              </div>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: stat.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
          {/* Messages Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
              overflow: "hidden",
            }}
          >
            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0" }}>
              <button
                onClick={() => setActiveTab("inbox")}
                style={{
                  flex: 1,
                  padding: "16px 24px",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: activeTab === "inbox" ? "#3b82f6" : "#64748b",
                  borderBottom: activeTab === "inbox" ? "2px solid #3b82f6" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <Inbox size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} />
                Inbox
              </button>
              <button
                onClick={() => setActiveTab("sent")}
                style={{
                  flex: 1,
                  padding: "16px 24px",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: activeTab === "sent" ? "#3b82f6" : "#64748b",
                  borderBottom: activeTab === "sent" ? "2px solid #3b82f6" : "2px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <Send size={16} style={{ marginRight: "8px", verticalAlign: "middle" }} />
                Sent
              </button>
            </div>

            {/* Search Bar */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0" }}>
              <div style={{ position: "relative" }}>
                <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input
                  type="search"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 42px",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    fontSize: "14px",
                    outline: "none",
                    transition: "all 0.2s",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* Messages List */}
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {activeTab === "inbox" ? (
                filteredInbox.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      backgroundColor: !msg.read ? "#f0f9ff" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = !msg.read ? "#e0f2fe" : "#f8fafc"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = !msg.read ? "#f0f9ff" : "transparent"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{ marginTop: "2px" }}>
                        {!msg.read ? (
                          <Mail size={16} style={{ color: "#3b82f6" }} />
                        ) : (
                          <MailOpen size={16} style={{ color: "#94a3b8" }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontWeight: !msg.read ? 600 : 500, color: !msg.read ? "#1e40af" : "#334155", fontSize: "14px" }}>
                            {msg.from}
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {msg.starred && (
                              <Star size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
                            )}
                            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{msg.time}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: !msg.read ? 600 : 400, color: "#334155", margin: "0 0 4px 0" }}>
                          {msg.subject}
                        </p>
                        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {msg.preview}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                sentMessages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #f1f5f9",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{ marginTop: "2px" }}>
                        <Send size={16} style={{ color: "#94a3b8" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontWeight: 500, color: "#334155", fontSize: "14px" }}>
                            To: {msg.to}
                          </span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: 500,
                              backgroundColor: msg.status === "Delivered" ? "#ecfdf5" : "#f1f5f9",
                              color: msg.status === "Delivered" ? "#059669" : "#64748b",
                            }}>
                              {msg.status}
                            </span>
                            <span style={{ fontSize: "12px", color: "#94a3b8" }}>{msg.time}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: 400, color: "#334155", margin: "0 0 4px 0" }}>
                          {msg.subject}
                        </p>
                        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {msg.preview}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Compose Message Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
              height: "fit-content",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: "0 0 20px 0" }}>
              Compose Message
            </h3>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                To
              </label>
              <input
                type="search"
                placeholder="Search staff..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                Subject
              </label>
              <input
                placeholder="Enter subject"
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                Message
              </label>
              <textarea
                placeholder="Type your message..."
                value={composeMessage}
                onChange={(e) => setComposeMessage(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: "140px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: "12px 24px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              }}
            >
              <Send size={16} />
              Send Message
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}