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
  Check,
  X,
} from "lucide-react"

const stats = [
  {
    title: "General",
    value: "Configured",
    subtitle: "Basic settings active",
    icon: Settings,
    color: "#475569",
    bgColor: "#f1f5f9",
  },
  {
    title: "Hospital",
    value: "Complete",
    subtitle: "Profile verified",
    icon: Building2,
    color: "#64748b",
    bgColor: "#f8fafc",
  },
  {
    title: "Notifications",
    value: "Active",
    subtitle: "Alerts enabled",
    icon: Bell,
    color: "#334155",
    bgColor: "#f1f5f9",
  },
]

export default function SettingsPage() {
  const [hospitalName, setHospitalName] = useState("SSV Hospital & Medical Services")
  const [hospitalEmail, setHospitalEmail] = useState("info@ssvhospital.com")
  const [hospitalPhone, setHospitalPhone] = useState("+91 9876543210")
  const [hospitalAddress, setHospitalAddress] = useState("123 Medical College Road, Mumbai, Maharashtra 400001")
  const [gstNumber, setGstNumber] = useState("27AABCS1234F1Z5")
  const [panNumber, setPanNumber] = useState("AABCS1234F")
  const [activeTab, setActiveTab] = useState("general")
  const [activePeriod, setActivePeriod] = useState("All Time")

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

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "hospital", label: "Hospital", icon: Building2 },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "system", label: "System", icon: Monitor },
  ]

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Gradient Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, #475569 0%, #64748b 100%)",
          padding: "32px 40px",
          borderRadius: "0 0 24px 24px",
          boxShadow: "0 10px 40px rgba(100, 116, 139, 0.3)",
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
              Settings
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)", marginTop: "8px" }}>
              Configure system settings and preferences
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "white",
              color: "#475569",
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
            <Save size={18} />
            Save Changes
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
                backgroundColor: activePeriod === period ? "#475569" : "#f1f5f9",
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

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", overflowX: "auto" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "16px 24px",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: activeTab === tab.id ? "#475569" : "#64748b",
                  borderBottom: activeTab === tab.id ? "2px solid #475569" : "2px solid transparent",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: "24px" }}>
            {activeTab === "general" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
              >
                {/* Hospital Information */}
                <div style={{
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <Building2 size={20} style={{ color: "#475569" }} />
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                      Hospital Information
                    </h3>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Hospital Name
                    </label>
                    <input
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
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
                      Email
                    </label>
                    <input
                      type="email"
                      value={hospitalEmail}
                      onChange={(e) => setHospitalEmail(e.target.value)}
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
                      Phone
                    </label>
                    <input
                      value={hospitalPhone}
                      onChange={(e) => setHospitalPhone(e.target.value)}
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
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Address
                    </label>
                    <textarea
                      value={hospitalAddress}
                      onChange={(e) => setHospitalAddress(e.target.value)}
                      style={{
                        width: "100%",
                        minHeight: "80px",
                        padding: "10px 14px",
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
                </div>

                {/* Appearance */}
                <div style={{
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <Monitor size={20} style={{ color: "#475569" }} />
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                      Appearance
                    </h3>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Hospital Logo
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                        border: "2px dashed #cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <Upload size={24} style={{ color: "#94a3b8" }} />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: "10px 16px",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          backgroundColor: "white",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          color: "#475569",
                        }}
                      >
                        Upload Logo
                      </motion.button>
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Theme
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {["Light", "Dark", "System"].map((theme) => (
                        <motion.button
                          key={theme}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                            backgroundColor: theme === "Light" ? "#1e293b" : "white",
                            color: theme === "Light" ? "white" : "#475569",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          {theme}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Language
                    </label>
                    <input
                      defaultValue="English"
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
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Timezone
                    </label>
                    <input
                      defaultValue="Asia/Kolkata (IST)"
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
                </div>
              </motion.div>
            )}

            {activeTab === "hospital" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                }}
              >
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: "0 0 20px 0" }}>
                  Hospital Details
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { label: "Registration Number", value: "HOSP/MC/2020/1234" },
                    { label: "Established Year", value: "2020" },
                    { label: "Total Beds", value: "125" },
                    { label: "Departments", value: "15" },
                  ].map((item) => (
                    <div key={item.label}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                        {item.label}
                      </label>
                      <input
                        defaultValue={item.value}
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
                  ))}
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Accreditation
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        backgroundColor: "#ecfdf5",
                        color: "#059669",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}>
                        NABH Accredited
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          backgroundColor: "white",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          color: "#475569",
                        }}
                      >
                        Update
                      </motion.button>
                    </div>
                  </div>
                  <div style={{ gridColumn: "span 2" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Website
                    </label>
                    <input
                      defaultValue="https://www.ssvhospital.com"
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
                </div>
              </motion.div>
            )}

            {activeTab === "billing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
              >
                <div style={{
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <CreditCard size={20} style={{ color: "#475569" }} />
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                      Tax & GST Settings
                    </h3>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      GST Number
                    </label>
                    <input
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
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
                      PAN Number
                    </label>
                    <input
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value)}
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
                      GST Rate (%)
                    </label>
                    <input
                      defaultValue="18"
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
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Service Tax
                    </label>
                    <input
                      defaultValue="0"
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
                </div>

                <div style={{
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: "0 0 20px 0" }}>
                    Payment Settings
                  </h3>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Invoice Prefix
                    </label>
                    <input
                      defaultValue="INV-"
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
                      Invoice Starting Number
                    </label>
                    <input
                      defaultValue="1000"
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
                      Payment Terms (days)
                    </label>
                    <input
                      defaultValue="30"
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
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Accepted Payment Methods
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {[
                        { name: "Cash", color: "#f1f5f9", textColor: "#475569" },
                        { name: "UPI", color: "#eff6ff", textColor: "#2563eb" },
                        { name: "Card", color: "#faf5ff", textColor: "#9333ea" },
                        { name: "Net Banking", color: "#ecfdf5", textColor: "#059669" },
                        { name: "Insurance", color: "#fffbeb", textColor: "#d97706" },
                      ].map((method) => (
                        <span
                          key={method.name}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "8px",
                            backgroundColor: method.color,
                            color: method.textColor,
                            fontSize: "13px",
                            fontWeight: 500,
                          }}
                        >
                          {method.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <Bell size={20} style={{ color: "#475569" }} />
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                    Notification Preferences
                  </h3>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#334155", margin: "0 0 12px 0" }}>
                    Email Notifications
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {["New Patient Registration", "Appointment Booking", "Discharge Summary", "Low Stock Alert", "Payment Received", "Staff Leave Request"].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1px solid #f1f5f9",
                        }}
                      >
                        <span style={{ fontSize: "14px", color: "#334155" }}>{item}</span>
                        <div style={{
                          width: "44px",
                          height: "24px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          position: "relative",
                          cursor: "pointer",
                        }}>
                          <div style={{
                            position: "absolute",
                            right: "3px",
                            top: "3px",
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          }} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#334155", margin: "0 0 12px 0" }}>
                    SMS Notifications
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {["Appointment Reminder", "OTP Verification", "Payment Confirmation", "Emergency Alerts"].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1px solid #f1f5f9",
                        }}
                      >
                        <span style={{ fontSize: "14px", color: "#334155" }}>{item}</span>
                        <div style={{
                          width: "44px",
                          height: "24px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          position: "relative",
                          cursor: "pointer",
                        }}>
                          <div style={{
                            position: "absolute",
                            right: "3px",
                            top: "3px",
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          }} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "system" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}
              >
                <div style={{
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <Settings size={20} style={{ color: "#475569" }} />
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                      System Information
                    </h3>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { label: "Software Version", value: "v2.5.0", color: "#f1f5f9", textColor: "#475569" },
                      { label: "Database Version", value: "PostgreSQL 15", color: "#eff6ff", textColor: "#2563eb" },
                      { label: "Last Updated", value: "August 07, 2026", color: "#f1f5f9", textColor: "#475569" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1px solid #f1f5f9",
                        }}
                      >
                        <span style={{ fontSize: "14px", color: "#64748b" }}>{item.label}</span>
                        <span style={{
                          padding: "4px 10px",
                          borderRadius: "8px",
                          backgroundColor: item.color,
                          color: item.textColor,
                          fontSize: "13px",
                          fontWeight: 500,
                        }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid #f1f5f9",
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#64748b" }}>Server Status</span>
                      <span style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        backgroundColor: "#ecfdf5",
                        color: "#059669",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}>
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: "24px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", margin: "0 0 20px 0" }}>
                    Data Management
                  </h3>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Backup Schedule
                    </label>
                    <input
                      defaultValue="Daily at 2:00 AM IST"
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
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#475569", marginBottom: "6px" }}>
                      Data Retention (years)
                    </label>
                    <input
                      defaultValue="7"
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
                  <div style={{ display: "flex", gap: "10px" }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "white",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: "pointer",
                        color: "#475569",
                      }}
                    >
                      Backup Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "white",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: "pointer",
                        color: "#475569",
                      }}
                    >
                      Export Data
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#ef4444",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      Clear Cache
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}