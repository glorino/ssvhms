"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  Shield,
  Loader2,
  Users,
  Pill,
  FlaskConical,
  Phone,
  Clock,
  ArrowRight,
  MapPin,
  Star,
  ChevronRight,
  Activity,
  CheckCircle,
  Calendar,
  FileText,
} from "lucide-react"

const demoUsers = [
  { email: "admin@ssvhms.com", role: "Super Admin", icon: Shield, color: "bg-blue-500" },
  { email: "admin@hospital.com", role: "Admin", icon: Users, color: "bg-indigo-500" },
  { email: "doctor@hospital.com", role: "Doctor", icon: Stethoscope, color: "bg-emerald-500" },
  { email: "nurse@hospital.com", role: "Nurse", icon: Heart, color: "bg-pink-500" },
  { email: "pharmacist@hospital.com", role: "Pharmacist", icon: Pill, color: "bg-violet-500" },
  { email: "pathologist@hospital.com", role: "Pathologist", icon: FlaskConical, color: "bg-amber-500" },
]

const departments = [
  { icon: Heart, name: "Cardiology", desc: "Expert heart care", color: "text-red-500", bg: "bg-red-50" },
  { icon: Stethoscope, name: "General Medicine", desc: "Primary healthcare", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Activity, name: "Neurology", desc: "Brain & nerve care", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Pill, name: "Pharmacy", desc: "24/7 medication", color: "text-emerald-500", bg: "bg-emerald-50" },
]

const stats = [
  { value: "10K+", label: "Happy Patients" },
  { value: "200+", label: "Expert Doctors" },
  { value: "50+", label: "Departments" },
  { value: "24/7", label: "Emergency Care" },
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
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Top Bar */}
      <div className="bg-[#115e59] text-white/90 text-xs">
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              25 Kings Street, CA
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              24×7 Emergency
            </span>
          </div>
          <a href="tel:+15551234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="h-3 w-3" />
            +1 (555) 123-4567
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center">
              <Heart className="h-4.5 w-4.5 text-white" fill="white" />
            </div>
            <div className="leading-tight">
              <span className="text-base font-bold text-gray-900">SSVHMS</span>
              <span className="hidden sm:block text-[10px] text-gray-400">Smart Hospital Management</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-gray-600">
            <a href="#" className="hover:text-[#0f766e] transition-colors">Home</a>
            <a href="#departments" className="hover:text-[#0f766e] transition-colors">Departments</a>
            <a href="#about" className="hover:text-[#0f766e] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#0f766e] transition-colors">Contact</a>
          </nav>
          <button
            onClick={() => document.getElementById("login-section")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-1.5 bg-[#0f766e] hover:bg-[#0d6d65] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Sign In
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero + Login */}
      <section id="login-section" className="relative bg-[#0f766e]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            {/* Left */}
            <div className="flex-1 text-white min-w-0">
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5">
                Trusted by 10,000+ Patients
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.12] mb-4">
                World-class care,
                <br />
                close to home
              </h1>
              <p className="text-white/80 text-[15px] leading-relaxed mb-7 max-w-md">
                Exceptional healthcare with expert doctors, cutting-edge technology,
                and compassionate care for every patient.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Shield, label: "NABH Certified" },
                  { icon: Clock, label: "24/7 Emergency" },
                  { icon: Stethoscope, label: "Expert Doctors" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-white/15 rounded-lg px-3.5 py-2">
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="text-[13px] font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Login Card */}
            <div className="w-full max-w-[420px] flex-shrink-0">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-7 py-4">
                  <h2 className="text-lg font-bold text-white">Welcome back</h2>
                  <p className="text-white/80 text-[13px] mt-0.5">Sign in to your account to continue</p>
                </div>

                <div className="px-7 py-5">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                      >
                        <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1">Email address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[13px]">
                      <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-[#0f766e] focus:ring-[#0f766e] h-3.5 w-3.5" />
                        Remember me
                      </label>
                      <a href="#" className="text-[#0f766e] hover:underline font-medium">Forgot password?</a>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-white rounded-lg font-semibold text-sm hover:from-[#0d6d65] hover:to-[#0f766e] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
                    >
                      {isLoading ? (
                        <><Loader2 className="h-4 w-4 animate-spin" />Signing in...</>
                      ) : (
                        <><span>Sign in</span><ArrowRight className="h-4 w-4" /></>
                      )}
                    </button>
                  </form>

                  <div className="mt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px flex-1 bg-gray-100" />
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Quick Access</span>
                      <div className="h-px flex-1 bg-gray-100" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {demoUsers.map((user) => (
                        <button
                          key={user.email}
                          onClick={() => { setEmail(user.email); setPassword("password"); }}
                          className={`flex items-center gap-2 p-2 rounded-lg border transition-all text-left ${
                            email === user.email
                              ? "border-[#0f766e]/30 bg-[#0f766e]/5"
                              : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                          }`}
                        >
                          <div className={`h-7 w-7 rounded-md ${user.color} flex items-center justify-center flex-shrink-0`}>
                            <user.icon className="h-3 w-3 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold text-gray-900 leading-tight">{user.role}</p>
                            <p className="text-[9px] text-gray-400 truncate">{user.email}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-center mt-2.5 text-[10px] text-gray-400">
                      Password for all: <span className="text-gray-500 font-medium">password</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[#0f766e]">{stat.value}</p>
                <p className="text-[13px] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-14 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#0f766e] font-semibold text-xs uppercase tracking-wider">Our Services</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1.5">Departments</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group">
                <div className={`h-10 w-10 rounded-lg ${dept.bg} flex items-center justify-center mb-3`}>
                  <dept.icon className={`h-5 w-5 ${dept.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{dept.name}</h3>
                <p className="text-[13px] text-gray-500">{dept.desc}</p>
                <div className="flex items-center gap-1 mt-2.5 text-[#0f766e] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#0f766e] font-semibold text-xs uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1.5 mb-4">Trusted care, measurable results</h2>
              <p className="text-gray-600 text-[15px] mb-6 leading-relaxed">
                Our hospital combines cutting-edge medical technology with compassionate care
                to deliver the best outcomes for every patient.
              </p>
              <div className="space-y-3">
                {[
                  "NABL accredited laboratory",
                  "Cashless insurance on 38+ providers",
                  "Same-day lab reports via WhatsApp",
                  "Online appointment booking",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#0f766e] flex-shrink-0" />
                    <span className="text-[15px] text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80&auto=format&fit=crop"
                alt="Hospital"
                className="rounded-xl shadow-lg w-full h-[340px] object-cover"
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[#0f766e]/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-[#0f766e]" fill="#0f766e" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">4.9</p>
                  <p className="text-[11px] text-gray-500">Patient Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-10 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-gradient-to-r from-[#0f766e] to-[#14b8a6] rounded-xl px-8 py-10 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Ready to Book?</h2>
            <p className="text-white/80 text-[15px] mb-5 max-w-md mx-auto">
              Schedule your appointment today and experience world-class healthcare.
            </p>
            <button
              onClick={() => document.getElementById("login-section")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-[#0f766e] font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-[13px]">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center">
                  <Heart className="h-3.5 w-3.5 text-white" fill="white" />
                </div>
                <span className="font-bold text-white text-sm">SSVHMS</span>
              </div>
              <p className="leading-relaxed">Smart System for Hospital Management. Delivering exceptional healthcare since 2020.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2.5 text-sm">Quick Links</h4>
              <div className="space-y-1.5">
                <a href="#" className="block hover:text-white transition-colors">Home</a>
                <a href="#departments" className="block hover:text-white transition-colors">Departments</a>
                <a href="#about" className="block hover:text-white transition-colors">About Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2.5 text-sm">Services</h4>
              <div className="space-y-1.5">
                <a href="#" className="block hover:text-white transition-colors">Appointments</a>
                <a href="#" className="block hover:text-white transition-colors">Lab Reports</a>
                <a href="#" className="block hover:text-white transition-colors">Emergency</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2.5 text-sm">Contact</h4>
              <div className="space-y-1.5">
                <p>25 Kings Street, CA</p>
                <p>+1 (555) 123-4567</p>
                <p>info@ssvhms.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 SSVHMS. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
