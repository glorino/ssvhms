"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  MapPin, Phone, ArrowRight, ChevronDown, Calendar, FileText,
  Stethoscope, Activity, Pill, Shield, Users, Heart, Search, Menu, X,
} from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Annual Calendar", href: "#" },
  { label: "Appointment", href: "#appointment" },
  { label: "Events", href: "#" },
]

const quickActions = [
  { icon: Calendar, title: "Book an appointment", desc: "Schedule a visit with our specialists", color: "#14b8a6", bg: "rgba(20,184,166,0.1)" },
  { icon: FileText, title: "View lab reports", desc: "Access your test results online", color: "#3b82f6", bg: "#eff6ff" },
  { icon: MapPin, title: "Health check-ups", desc: "Preventive health packages", color: "#8b5cf6", bg: "#f5f3ff" },
  { icon: Phone, title: "Emergency & trauma", desc: "24/7 emergency care available", color: "#ef4444", bg: "#fef2f2" },
]

const departments = [
  { icon: Heart, name: "Cardiology", count: "2 Specialists" },
  { icon: Stethoscope, name: "General Medicine", count: "4 Specialists" },
  { icon: Activity, name: "Neurology", count: "1 Specialist" },
  { icon: Pill, name: "Pharmacy", count: "3 Pharmacists" },
]

const stats = [
  { value: "500+", label: "Hospital Beds" },
  { value: "120+", label: "Expert Doctors", sub: "Across 24 specialties" },
  { value: "50K+", label: "Happy Patients" },
]

const steps = [
  { no: "1", title: "Pick a slot", desc: "Choose your doctor, day and time. No signup required, no payment to book." },
  { no: "2", title: "Meet the specialist", desc: "In-person at the hospital or a video consult from home." },
  { no: "3", title: "Get reports & care", desc: "Lab reports on WhatsApp same-day. Follow-ups from your patient portal." },
]

const doctors = [
  { name: "Dr. Sonia Bush", spec: "Neurology", exp: "6 yrs", qual: "MS" },
  { name: "Dr. Sansa Gomez", spec: "Gynecology", exp: "6 yrs", qual: "MS" },
  { name: "Dr. Amit Singh", spec: "Pediatrics", exp: "7 yrs", qual: "MS" },
  { name: "Dr. Reyan Jain", spec: "Cardiology", exp: "5 yrs", qual: "MS" },
]

const roles = [
  { icon: Shield, name: "Superadmin", desc: "Full system control, roles, permissions, and global settings.", color: "linear-gradient(135deg, #2dd4bf, #14b8a6)" },
  { icon: Users, name: "Admin", desc: "Day-to-day operations across OPD, IPD, staff and departments.", color: "linear-gradient(135deg, #f472b6, #ec4899)" },
  { icon: Stethoscope, name: "Doctor", desc: "Consultations, prescriptions, and OPD/IPD case records.", color: "linear-gradient(135deg, #2dd4bf, #14b8a6)" },
  { icon: Heart, name: "Nurse", desc: "Bed and ward assignments, patient charts, nursing rounds.", color: "linear-gradient(135deg, #f472b6, #ec4899)" },
  { icon: Pill, name: "Pharmacist", desc: "Medicine stock, purchases, and pharmacy billing.", color: "linear-gradient(135deg, #2dd4bf, #14b8a6)" },
  { icon: Activity, name: "Pathologist", desc: "Pathology tests, result entry, and laboratory reports.", color: "linear-gradient(135deg, #2dd4bf, #14b8a6)" },
  { icon: Activity, name: "Radiologist", desc: "Radiology tests, imaging records, and diagnostic reports.", color: "linear-gradient(135deg, #2dd4bf, #14b8a6)" },
  { icon: Users, name: "Accountant", desc: "OPD and IPD billing, income, expenses, and reports.", color: "linear-gradient(135deg, #2dd4bf, #14b8a6)" },
  { icon: Phone, name: "Receptionist", desc: "Appointments, enquiries, calls, visitors, and postal records.", color: "linear-gradient(135deg, #f472b6, #ec4899)" },
]

const s: Record<string, React.CSSProperties> = {
  container: { maxWidth: 1200, margin: "0 auto", padding: "0 24px" },
  section: { padding: "56px 0" },
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Top Bar */}
      <div style={{ background: "#115e59", color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
        <div style={{ ...s.container, height: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={12} />
            <span>25 Kings Street, CA</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link href="/patient-portal" style={{ color: "inherit", textDecoration: "none" }}>Patient Portal</Link>
            <a href="#appointment" style={{ color: "inherit", textDecoration: "none" }}>Appointment</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header style={{ background: "#fff", borderBottom: "1px solid #f3f4f6", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ ...s.container, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, background: "#dc2626", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z"/></svg>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: -0.5 }}>SMART HOSPITAL</span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} style={{ fontSize: 14, fontWeight: 500, color: "#374151", textDecoration: "none" }}>
                {link.label}
              </Link>
            ))}
            <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 500, color: "#374151", background: "none", border: "none", cursor: "pointer" }}>
              More <ChevronDown size={14} />
            </button>
          </nav>

          <Link href="/login" style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#14b8a6", color: "#fff", fontSize: 13, fontWeight: 700,
            padding: "10px 20px", borderRadius: 8, textDecoration: "none",
          }}>
            Book Appointment <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ position: "relative", background: "#111827", minHeight: 500, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80&auto=format&fit=crop" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(17,24,39,0.8), rgba(17,24,39,0.4), transparent)" }} />

        <div style={{ ...s.container, position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: 56, padding: "80px 24px", minHeight: 500 }}>
          <div style={{ flex: 1, color: "#fff" }}>
            <h1 style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.08, marginBottom: 20 }}>
              World-class care,<br />close to home
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, marginBottom: 32, maxWidth: 440, lineHeight: 1.6 }}>
              Doctor-led cardiac care in Bandra West, Mumbai
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/login" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#14b8a6", color: "#fff", fontWeight: 700, fontSize: 15,
                padding: "14px 28px", borderRadius: 8, textDecoration: "none",
                boxShadow: "0 4px 14px rgba(20,184,166,0.35)",
              }}>
                Book Appointment <ArrowRight size={16} />
              </Link>
              <a href="#departments" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "2px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 700, fontSize: 15,
                padding: "14px 28px", borderRadius: 8, textDecoration: "none",
              }}>
                Find a Doctor
              </a>
            </div>
          </div>

          {/* Booking Widget */}
          <div id="appointment" style={{
            width: 380, flexShrink: 0, background: "#fff", borderRadius: 16,
            boxShadow: "0 25px 50px rgba(0,0,0,0.25)", overflow: "hidden",
          }}>
            <div style={{ borderBottom: "1px solid #f3f4f6", padding: "14px 24px" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1f2937" }}>Book Appointment</span>
            </div>
            <div style={{ padding: 24 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Specialist</label>
              <select style={{
                width: "100%", padding: "12px 16px", borderRadius: 8,
                border: "1px solid #e5e7eb", fontSize: 14, color: "#374151",
                background: "#fff", marginBottom: 20, boxSizing: "border-box",
              }}>
                <option>— Select —</option>
                <option>Cardiologists</option>
                <option>Dermatologists</option>
                <option>Neurologists</option>
                <option>Pediatricians</option>
                <option>Gynecologists</option>
              </select>
              <button style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "#14b8a6", color: "#fff", fontWeight: 700, fontSize: 14,
                padding: "12px 0", borderRadius: 8, border: "none", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(20,184,166,0.3)",
              }}>
                <Search size={14} /> Check Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: "#14b8a6", overflow: "hidden", padding: "8px 0" }}>
        <div style={{ display: "flex", animation: "marquee 30s linear infinite", whiteSpace: "nowrap" }}>
          {[0, 1].map((setIdx) => (
            <span key={setIdx} style={{ display: "flex", alignItems: "center", gap: 24, color: "#fff", fontSize: 12, fontWeight: 600, padding: "0 12px" }}>
              {["NABL accredited lab", "NABH certified hospital", "96% same-day appointments", "Reports in 4 hours", "Cashless on 38 insurers", "24×7 emergency care", "Free pickup & drop for diagnostics"].map((item, i) => (
                <span key={`${setIdx}-${i}`} style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <span>{item}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <section style={s.section}>
        <div style={s.container}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {quickActions.map((action) => (
              <Link key={action.title} href="/login" style={{
                padding: 20, borderRadius: 12, border: "1px solid #f3f4f6",
                textDecoration: "none", transition: "all 0.2s", display: "block",
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: action.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <action.icon size={20} color={action.color} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{action.title}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" style={{ ...s.section, background: "#f9fafb" }}>
        <div style={s.container}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#14b8a6", textTransform: "uppercase", letterSpacing: 1.5 }}>Centres of excellence</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginTop: 8 }}>Our Specialties</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {departments.map((dept) => (
              <div key={dept.name} style={{
                background: "#fff", borderRadius: 12, border: "1px solid #f3f4f6",
                padding: 24, textAlign: "center", cursor: "pointer",
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(20,184,166,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <dept.icon size={28} color="#14b8a6" />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{dept.name}</h3>
                <p style={{ fontSize: 12, color: "#6b7280" }}>{dept.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 40 }}>Three steps. No paperwork.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {steps.map((step) => (
              <div key={step.no} style={{ textAlign: "center" }}>
                <span style={{
                  display: "inline-flex", width: 44, height: 44, borderRadius: "50%",
                  background: "#14b8a6", color: "#fff", fontWeight: 700, fontSize: 15,
                  alignItems: "center", justifyContent: "center", marginBottom: 16,
                  boxShadow: "0 4px 14px rgba(20,184,166,0.3)",
                }}>
                  {step.no}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "56px 0", background: "#115e59" }}>
        <div style={s.container}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>By the numbers</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginTop: 8 }}>Trusted care, measurable results</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 42, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{stat.value}</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 8, fontWeight: 500 }}>{stat.label}</p>
                {stat.sub && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4 }}>{stat.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section style={s.section}>
        <div style={s.container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#14b8a6", textTransform: "uppercase", letterSpacing: 1.5 }}>Our Specialist Doctors</span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginTop: 8 }}>Our Doctors</h2>
            </div>
            <Link href="/login" style={{ fontSize: 13, fontWeight: 700, color: "#14b8a6", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              Book Appointment <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {doctors.map((doc) => (
              <div key={doc.name} style={{ background: "#fff", borderRadius: 12, border: "1px solid #f3f4f6", overflow: "hidden" }}>
                <div style={{ height: 192, background: "linear-gradient(135deg, #f9fafb, #e5e7eb)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <Stethoscope size={64} color="#d1d5db" />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "32px 16px 12px" }}>
                    <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{doc.name}</h3>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{doc.spec}</span>
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
                    <span>Exp: <strong style={{ color: "#374151" }}>{doc.exp}</strong></span>
                    <span>Qual: <strong style={{ color: "#374151" }}>{doc.qual}</strong></span>
                  </div>
                  <Link href="/login" style={{
                    display: "block", textAlign: "center", fontSize: 12, fontWeight: 700,
                    color: "#14b8a6", border: "1px solid #14b8a6", borderRadius: 8,
                    padding: "10px 0", textDecoration: "none",
                  }}>
                    Book Appointment →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section style={{ ...s.section, background: "#f9fafb" }}>
        <div style={s.container}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 40 }}>Login as your role</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {roles.map((role) => (
              <Link key={role.name} href="/login" style={{
                background: "#fff", borderRadius: 12, border: "1px solid #f3f4f6",
                padding: 20, display: "flex", alignItems: "flex-start", gap: 16,
                textDecoration: "none",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: role.color,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}>
                  <role.icon size={20} color="#fff" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{role.name}</h3>
                  <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5, marginBottom: 10 }}>{role.desc}</p>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#14b8a6" }}>Login as {role.name} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "56px 0" }}>
        <div style={s.container}>
          <div style={{
            background: "#14b8a6", borderRadius: 16, padding: "48px 40px",
            textAlign: "center", color: "#fff",
            boxShadow: "0 8px 30px rgba(20,184,166,0.3)",
          }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ready to Book?</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginBottom: 24, maxWidth: 440, margin: "0 auto 24px" }}>
              Schedule your appointment today and experience world-class healthcare.
            </p>
            <Link href="/login" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#14b8a6", fontWeight: 700, fontSize: 14,
              padding: "12px 32px", borderRadius: 8, textDecoration: "none",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}>
              Book Now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#111827", color: "#9ca3af", fontSize: 13 }}>
        <div style={{ ...s.container, padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, background: "#dc2626", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z"/></svg>
                </div>
                <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>SMART HOSPITAL</span>
              </div>
              <p style={{ lineHeight: 1.6, fontSize: 12 }}>Delivering exceptional healthcare with compassion and precision.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontSize: 13 }}>Quick Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                <a href="#departments" style={{ color: "inherit", textDecoration: "none" }}>Departments</a>
                <a href="#" style={{ color: "inherit", textDecoration: "none" }}>About Us</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontSize: 13 }}>Services</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="#appointment" style={{ color: "inherit", textDecoration: "none" }}>Appointments</a>
                <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Lab Reports</a>
                <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Emergency</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: 12, fontSize: 13 }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p>25 Kings Street, CA</p>
                <p>+1 (555) 123-4567</p>
                <p>info@smarthospital.com</p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #1f2937", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p>© 2026 Smart Hospital & Research Center · All rights reserved</p>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (max-width: 1024px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
