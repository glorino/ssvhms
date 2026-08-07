"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
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
  CheckCircle,
  Menu,
  X,
  Search,
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
  { icon: Phone, title: "Emergency & trauma", desc: "24/7 emergency care available", color: "text-red-500", bg: "bg-red-50", featured: true },
]

const departments = [
  { icon: Heart, name: "Cardiology", specialists: 2 },
  { icon: Stethoscope, name: "General Medicine", specialists: 4 },
  { icon: Activity, name: "Neurology", specialists: 1 },
  { icon: Pill, name: "Pharmacy", specialists: 3 },
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
  { name: "Dr. Sansa Gomez", spec: "Gyno", exp: "6 yrs", qual: "MS" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [specialist, setSpecialist] = useState("")

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-[#115e59] text-white/90 text-xs">
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span>25 Kings Street, CA</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/patient-portal" className="hover:text-white transition-colors">Patient Portal</Link>
            <Link href="#appointment" className="hover:text-white transition-colors">Appointment</Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 bg-red-600 rounded flex items-center justify-center">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z"/>
              </svg>
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">SMART HOSPITAL</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-medium text-gray-700 hover:text-[#14b8a6] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[14px] font-medium text-gray-700 hover:text-[#14b8a6] transition-colors">
                More <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Book Appointment <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="block text-sm font-medium text-gray-700">
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="block bg-[#14b8a6] text-white text-center py-2.5 rounded-lg font-semibold text-sm">
              Book Appointment
            </Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-[520px] bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80&auto=format&fit=crop"
          alt="Hospital"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <h1 className="text-4xl lg:text-[56px] font-bold leading-[1.1] mb-4">
              World-class care,
              <br />
              close to home
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md">
              Doctor-led cardiac care in Bandra West, Mumbai
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#departments" className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Find a Doctor
              </a>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="w-full max-w-[380px] bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-white border-b border-gray-100 px-6 py-3">
              <span className="text-sm font-semibold text-gray-800">Book Appointment</span>
            </div>
            <div className="p-6">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Specialist</label>
              <select
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/10 outline-none mb-4"
              >
                <option value="">— Select —</option>
                <option value="cardiology">Cardiologists</option>
                <option value="dermatology">Dermatologists</option>
                <option value="neurology">Neurologists</option>
                <option value="pediatrics">Pediatricians</option>
                <option value="gynecology">Gynecologists</option>
              </select>
              <button className="w-full flex items-center justify-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                <Search className="h-4 w-4" />
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-[#14b8a6] text-white overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap gap-8 text-[13px] font-medium">
          {["NABL accredited lab", "NABH certified hospital", "96% same-day appointments", "Reports in 4 hours", "Cashless on 38 insurers", "24×7 emergency care", "Free pickup & drop for diagnostics",
            "NABL accredited lab", "NABH certified hospital", "96% same-day appointments", "Reports in 4 hours", "Cashless on 38 insurers", "24×7 emergency care"
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              <span>{item}</span>
              <span className="text-white/50">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href="/login"
                className={`p-5 rounded-xl border transition-all hover:shadow-md group ${
                  action.featured
                    ? "border-[#14b8a6]/30 bg-[#14b8a6]/5"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`h-10 w-10 rounded-lg ${action.bg} flex items-center justify-center mb-3`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-[13px] text-gray-500">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-14 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#14b8a6] font-semibold text-xs uppercase tracking-wider">Centres of excellence</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1.5">Our Specialties</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-all cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-[#14b8a6]/10 flex items-center justify-center mx-auto mb-3">
                  <dept.icon className="h-6 w-6 text-[#14b8a6]" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{dept.name}</h3>
                <p className="text-xs text-gray-500">{dept.specialists} Specialists</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Three steps. No paperwork.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.no} className="text-center">
                <span className="inline-flex h-10 w-10 rounded-full bg-[#14b8a6] text-white font-bold text-sm items-center justify-center mb-3">
                  {step.no}
                </span>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[#115e59]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8">
            <span className="text-white/60 font-semibold text-xs uppercase tracking-wider">By the numbers</span>
            <h2 className="text-2xl font-bold text-white mt-1.5">Trusted care, measurable results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
                {stat.sub && <p className="text-white/50 text-xs mt-0.5">{stat.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[#14b8a6] font-semibold text-xs uppercase tracking-wider">Our Specialist Doctors</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">Our Doctors</h2>
            </div>
            <Link href="/login" className="text-sm font-semibold text-[#14b8a6] hover:underline flex items-center gap-1">
              Book Appointment <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doctors.map((doc) => (
              <div key={doc.name} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Stethoscope className="h-16 w-16 text-gray-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm">{doc.name}</h3>
                  <p className="text-[12px] text-gray-500 mb-3">{doc.spec}</p>
                  <div className="flex items-center justify-between text-[12px] text-gray-500 mb-3">
                    <span>Exp: <strong className="text-gray-700">{doc.exp}</strong></span>
                    <span>Qual: <strong className="text-gray-700">{doc.qual}</strong></span>
                  </div>
                  <Link href="/login" className="block text-center text-[12px] font-semibold text-[#14b8a6] border border-[#14b8a6] rounded-lg py-2 hover:bg-[#14b8a6] hover:text-white transition-colors">
                    Book Appointment <ArrowRight className="inline h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Login as your role</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Link
                key={role.name}
                href="/login"
                className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md hover:border-gray-200 transition-all group"
              >
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}>
                  <role.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{role.name}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed mb-2">{role.desc}</p>
                  <span className="text-[12px] font-semibold text-[#14b8a6] flex items-center gap-1">
                    Login as {role.name} <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#14b8a6] rounded-xl px-8 py-10 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Ready to Book?</h2>
            <p className="text-white/80 text-[15px] mb-5">Schedule your appointment today.</p>
            <Link href="/login" className="inline-flex items-center gap-2 bg-white text-[#14b8a6] font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-[13px]">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 bg-red-600 rounded flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z"/>
                  </svg>
                </div>
                <span className="font-bold text-white text-sm">SMART HOSPITAL</span>
              </div>
              <p className="leading-relaxed">Delivering exceptional healthcare with compassion and precision.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2.5 text-sm">Quick Links</h4>
              <div className="space-y-1.5">
                <Link href="/" className="block hover:text-white transition-colors">Home</Link>
                <Link href="#departments" className="block hover:text-white transition-colors">Departments</Link>
                <Link href="#" className="block hover:text-white transition-colors">About Us</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2.5 text-sm">Services</h4>
              <div className="space-y-1.5">
                <Link href="#appointment" className="block hover:text-white transition-colors">Appointments</Link>
                <Link href="#" className="block hover:text-white transition-colors">Lab Reports</Link>
                <Link href="#" className="block hover:text-white transition-colors">Emergency</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2.5 text-sm">Contact</h4>
              <div className="space-y-1.5">
                <p>25 Kings Street, CA</p>
                <p>+1 (555) 123-4567</p>
                <p>info@smarthospital.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 Smart Hospital & Research Center · All rights reserved</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
