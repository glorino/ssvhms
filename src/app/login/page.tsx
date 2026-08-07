"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff, Loader2, ChevronRight } from "lucide-react"

const newsItems = [
  { date: "05 JAN 2026", title: "National Pharmacist Day", desc: "Celebrated as National Pharmacist Day to appreciate the contributions of pharmacists in patient care, medication..." },
  { date: "03 DEC 2025", title: "International Day of Persons with Disabilities", desc: "Today, communities around the globe mark the International Day of Persons with Disabilities, a day dedicated to..." },
  { date: "03 NOV 2025", title: "World Neuroendocrine Cancer Day (Every Stripe Tells a Story)", desc: 'World Neuroendocrine Cancer Day is "Every Stripe Tells a Story," focusing on the importance of early diagnosis and the...' },
  { date: "03 NOV 2025", title: "Diabetes and Well-being Camps", desc: 'The official theme for World Diabetes Day 2025 is "Diabetes and Well-being," with a major focus on creating healthy...' },
  { date: "03 OCT 2025", title: "Free Dental Treatment Camp", desc: "Free dental treatment for poor people that include simple extractions, temporary fillings and other few treatments..." },
]

const demoRoles = [
  { label: "Super Admin", email: "admin@ssvhms.com", bg: "#14b8a6" },
  { label: "Admin", email: "admin@hospital.com", bg: "#a855f7" },
  { label: "Doctor", email: "doctor@hospital.com", bg: "#9ca3af" },
  { label: "Pharmacist", email: "pharmacist@hospital.com", bg: "#9ca3af" },
  { label: "Pathologist", email: "pathologist@hospital.com", bg: "#ec4899" },
  { label: "Radiologist", email: "radiologist@hospital.com", bg: "#059669" },
  { label: "Accountant", email: "accountant@hospital.com", bg: "#14b8a6" },
  { label: "Receptionist", email: "receptionist@hospital.com", bg: "#9ca3af" },
  { label: "Nurse", email: "nurse@hospital.com", bg: "#14b8a6" },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const result = await signIn("credentials", { email, password, redirect: false })
      if (result?.error) {
        setError("Invalid credentials. Try using 'password' as the password.")
        setIsLoading(false)
      } else {
        router.push("/dashboard")
      }
    } catch {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "row", background: "#fff" }}>
      {/* Left Panel */}
      <div style={{
        width: "50%",
        background: "#edf8f7",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "40px 50px" }}>
          {/* Logo */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: "linear-gradient(135deg, #2dd4bf, #34d399)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z"/>
                </svg>
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#1f2937" }}>SSV Hospital & Research Center</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 60 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#14b8a6" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#14b8a6", textTransform: "uppercase", letterSpacing: 1 }}>
                Admin Portal
              </span>
            </div>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", lineHeight: 1.3, marginBottom: 32 }}>
            What&apos;s new in SSV Hospital & Research Center
          </h2>

          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: "#d1d5db" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {newsItems.map((item, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", left: -28, top: 4,
                    width: 12, height: 12, borderRadius: "50%",
                    background: "#14b8a6",
                  }} />
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>
                    {item.date}
                  </p>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</p>
                  <button style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 12, fontWeight: 700, color: "#14b8a6",
                    background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)",
                    borderRadius: 20, padding: "6px 14px", cursor: "pointer",
                  }}>
                    Read More <ChevronRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 50px", fontSize: 12, color: "#9ca3af" }}>
          © 2026 SSV Hospital & Research Center · All rights reserved
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 50px",
        background: "#fff",
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 32 }}>Admin Login</h1>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ marginBottom: 20, overflow: "hidden" }}>
                <div style={{ padding: 12, borderRadius: 8, background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13 }}>{error}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Username</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" required
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 8,
                  border: "1px solid #e5e7eb", fontSize: 14, color: "#111827",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required
                  style={{
                    width: "100%", padding: "12px 44px 12px 16px", borderRadius: 8,
                    border: "1px solid #e5e7eb", fontSize: 14, color: "#111827",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 4 }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
              <a href="#" style={{ fontSize: 13, fontWeight: 600, color: "#14b8a6", textDecoration: "none" }}>Forgot Password?</a>
            </div>

            <button type="submit" disabled={isLoading} style={{
              width: "100%", padding: "12px 0", background: "#14b8a6", color: "#fff",
              borderRadius: 8, fontSize: 14, fontWeight: 700, border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              opacity: isLoading ? 0.5 : 1,
            }}>
              {isLoading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />Signing in...</> : "Sign In"}
            </button>
          </form>

          {/* Quick Demo Login */}
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>
              Quick Demo Login
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {demoRoles.map((role) => (
                <button key={role.email}
                  onClick={() => { setEmail(role.email); setPassword("password"); }}
                  style={{
                    background: role.bg, color: "#fff", fontSize: 12, fontWeight: 700,
                    padding: "10px 4px", borderRadius: 8, border: "none",
                    cursor: "pointer", textAlign: "center", lineHeight: 1.3,
                  }}>
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #f3f4f6" }}>
            <a href="#" style={{ fontSize: 13, fontWeight: 600, color: "#14b8a6", textDecoration: "none" }}>User Login</a>
            <a href="/" style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", textDecoration: "none" }}>Front Site</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 1024px) {
          div[style*="width: 50%"] { width: 100% !important; }
        }
      `}</style>
    </div>
  )
}
