"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Heart,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Calendar,
  FileText,
  Stethoscope,
  Activity,
  Pill,
  Shield,
  Users,
  Star,
  Search,
  Menu,
  X,
} from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Annual Calendar", href: "#" },
  { label: "Appointment", href: "#appointment" },
  { label: "Events", href: "#" },
]

const quickActions = [
  { icon: Calendar, title: "Book an appointment", desc: "Schedule a visit with our specialists", color: "text-[#14b8a6]", bg: "bg-[#14b8a6]/10" },
  { icon: FileText, title: "View lab reports", desc: "Access your test results online", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: MapPin, title: "Health check-ups", desc: "Preventive health packages", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Phone, title: "Emergency & trauma", desc: "24/7 emergency care available", color: "text-red-500", bg: "bg-red-50" },
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
  { icon: Shield, name: "Superadmin", desc: "Full system control, roles, permissions, and global settings.", color: "from-teal-400 to-teal-500" },
  { icon: Users, name: "Admin", desc: "Day-to-day operations across OPD, IPD, staff and departments.", color: "from-pink-400 to-pink-500" },
  { icon: Stethoscope, name: "Doctor", desc: "Consultations, prescriptions, and OPD/IPD case records.", color: "from-teal-400 to-teal-500" },
  { icon: Heart, name: "Nurse", desc: "Bed and ward assignments, patient charts, nursing rounds.", color: "from-pink-400 to-pink-500" },
  { icon: Pill, name: "Pharmacist", desc: "Medicine stock, purchases, and pharmacy billing.", color: "from-teal-400 to-teal-500" },
  { icon: Activity, name: "Pathologist", desc: "Pathology tests, result entry, and laboratory reports.", color: "from-teal-400 to-teal-500" },
  { icon: Activity, name: "Radiologist", desc: "Radiology tests, imaging records, and diagnostic reports.", color: "from-teal-400 to-teal-500" },
  { icon: Users, name: "Accountant", desc: "OPD and IPD billing, income, expenses, and reports.", color: "from-teal-400 to-teal-500" },
  { icon: Phone, name: "Receptionist", desc: "Appointments, enquiries, calls, visitors, and postal records.", color: "from-pink-400 to-pink-500" },
]

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [specialist, setSpecialist] = useState("")

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#115e59] text-white/80 text-[12px]">
        <div className="max-w-[1200px] mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            <span>25 Kings Street, CA</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/patient-portal" className="hover:text-white transition-colors">Patient Portal</Link>
            <Link href="#appointment" className="hover:text-white transition-colors">Appointment</Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z"/>
              </svg>
            </div>
            <span className="text-[22px] font-extrabold text-gray-900 tracking-tight leading-none">
              SMART HOSPITAL
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-[14px] font-medium text-gray-700 hover:text-[#14b8a6] transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="relative">
              <button className="flex items-center gap-1 text-[14px] font-medium text-gray-700 hover:text-[#14b8a6] transition-colors">
                More <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white text-[13px] font-bold px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Book Appointment <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button className="lg:hidden p-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="block text-sm font-medium text-gray-700 py-1">{link.label}</Link>
            ))}
            <Link href="/login" className="block bg-[#14b8a6] text-white text-center py-2.5 rounded-lg font-bold text-sm mt-2">Book Appointment</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative bg-gray-900 overflow-hidden" style={{ minHeight: "500px" }}>
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1 text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] mb-5">
              World-class care,<br />close to home
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
              Doctor-led cardiac care in Bandra West, Mumbai
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold px-7 py-3 rounded-lg transition-colors text-[15px] shadow-lg shadow-teal-500/25">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#departments" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors text-[15px]">
                Find a Doctor
              </a>
            </div>
          </div>

          {/* Booking Widget */}
          <div id="appointment" className="w-full max-w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-3.5">
              <span className="text-[14px] font-bold text-gray-800">Book Appointment</span>
            </div>
            <div className="p-6">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Specialist</label>
              <select
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/10 outline-none mb-5"
              >
                <option value="">— Select —</option>
                <option value="cardiology">Cardiologists</option>
                <option value="dermatology">Dermatologists</option>
                <option value="neurology">Neurologists</option>
                <option value="pediatrics">Pediatricians</option>
                <option value="gynecology">Gynecologists</option>
              </select>
              <button className="w-full flex items-center justify-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-bold py-3 rounded-lg transition-colors text-sm shadow-md shadow-teal-500/20">
                <Search className="h-4 w-4" />
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#14b8a6] overflow-hidden py-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, setIdx) => (
            <span key={setIdx} className="flex items-center gap-6 text-white text-[12px] font-semibold px-3">
              {["NABL accredited lab", "NABH certified hospital", "96% same-day appointments", "Reports in 4 hours", "Cashless on 38 insurers", "24×7 emergency care", "Free pickup & drop for diagnostics"].map((item, i) => (
                <span key={`${setIdx}-${i}`} className="flex items-center gap-6">
                  <span>{item}</span>
                  <span className="text-white/40">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickActions.map((action) => (
              <Link key={action.title} href="/login" className="group p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all">
                <div className={`h-11 w-11 rounded-xl ${action.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#14b8a6] font-bold text-[11px] uppercase tracking-widest">Centres of excellence</span>
            <h2 className="text-[26px] font-bold text-gray-900 mt-2">Our Specialties</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer group">
                <div className="h-14 w-14 rounded-xl bg-[#14b8a6]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#14b8a6]/20 transition-colors">
                  <dept.icon className="h-7 w-7 text-[#14b8a6]" />
                </div>
                <h3 className="font-bold text-gray-900 text-[14px] mb-1">{dept.name}</h3>
                <p className="text-[12px] text-gray-500">{dept.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[26px] font-bold text-gray-900 text-center mb-12">Three steps. No paperwork.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.no} className="text-center">
                <span className="inline-flex h-11 w-11 rounded-full bg-[#14b8a6] text-white font-bold text-sm items-center justify-center mb-4 shadow-md shadow-teal-500/25">
                  {step.no}
                </span>
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#115e59]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-white/50 font-bold text-[11px] uppercase tracking-widest">By the numbers</span>
            <h2 className="text-[26px] font-bold text-white mt-2">Trusted care, measurable results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[42px] font-bold text-white leading-none">{stat.value}</p>
                <p className="text-white/70 text-[14px] mt-2 font-medium">{stat.label}</p>
                {stat.sub && <p className="text-white/40 text-[12px] mt-1">{stat.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[#14b8a6] font-bold text-[11px] uppercase tracking-widest">Our Specialist Doctors</span>
              <h2 className="text-[26px] font-bold text-gray-900 mt-2">Our Doctors</h2>
            </div>
            <Link href="/login" className="hidden sm:flex items-center gap-1.5 text-[13px] font-bold text-[#14b8a6] hover:underline">
              Book Appointment <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {doctors.map((doc) => (
              <div key={doc.name} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                  <Stethoscope className="h-20 w-20 text-gray-200" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/60 to-transparent p-4 pt-8">
                    <h3 className="font-bold text-white text-[14px]">{doc.name}</h3>
                    <span className="text-white/70 text-[12px]">{doc.spec}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-[12px] text-gray-500 mb-3">
                    <span>Experience: <strong className="text-gray-700">{doc.exp}</strong></span>
                    <span>Qual: <strong className="text-gray-700">{doc.qual}</strong></span>
                  </div>
                  <Link href="/login" className="block text-center text-[12px] font-bold text-[#14b8a6] border border-[#14b8a6] rounded-lg py-2.5 hover:bg-[#14b8a6] hover:text-white transition-colors">
                    Book Appointment <ArrowRight className="inline h-3 w-3 ml-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[26px] font-bold text-gray-900 text-center mb-12">Login as your role</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((role) => (
              <Link key={role.name} href="/login" className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-lg hover:border-gray-200 transition-all group">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <role.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-[14px] mb-1">{role.name}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed mb-2.5">{role.desc}</p>
                  <span className="text-[12px] font-bold text-[#14b8a6] flex items-center gap-1">
                    Login as {role.name} <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#14b8a6] rounded-2xl px-10 py-12 text-center text-white shadow-lg shadow-teal-500/20">
            <h2 className="text-[28px] font-bold mb-3">Ready to Book?</h2>
            <p className="text-white/80 text-[15px] mb-6 max-w-md mx-auto">Schedule your appointment today and experience world-class healthcare.</p>
            <Link href="/login" className="inline-flex items-center gap-2 bg-white text-[#14b8a6] font-bold text-[14px] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-[13px]">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z"/>
                  </svg>
                </div>
                <span className="font-bold text-white text-[15px]">SMART HOSPITAL</span>
              </div>
              <p className="leading-relaxed text-[12px]">Delivering exceptional healthcare with compassion and precision.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-[13px]">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block hover:text-white transition-colors">Home</Link>
                <Link href="#departments" className="block hover:text-white transition-colors">Departments</Link>
                <Link href="#" className="block hover:text-white transition-colors">About Us</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-[13px]">Services</h4>
              <div className="space-y-2">
                <Link href="#appointment" className="block hover:text-white transition-colors">Appointments</Link>
                <Link href="#" className="block hover:text-white transition-colors">Lab Reports</Link>
                <Link href="#" className="block hover:text-white transition-colors">Emergency</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-[13px]">Contact</h4>
              <div className="space-y-2">
                <p>25 Kings Street, CA</p>
                <p>+1 (555) 123-4567</p>
                <p>info@smarthospital.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 Smart Hospital & Research Center · All rights reserved</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
