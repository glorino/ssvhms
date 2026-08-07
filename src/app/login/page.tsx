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
  Zap,
  Calendar,
  FileText,
  CheckCircle,
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
  { icon: Heart, name: "Cardiology", desc: "Expert heart care", color: "text-red-500" },
  { icon: Stethoscope, name: "General Medicine", desc: "Primary healthcare", color: "text-blue-500" },
  { icon: Activity, name: "Neurology", desc: "Brain & nerve care", color: "text-purple-500" },
  { icon: Pill, name: "Pharmacy", desc: "24/7 medication", color: "text-green-500" },
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#0f766e] text-white text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              25 Kings Street, CA
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              24×7 Emergency
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center shadow-md">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">SSVHMS</span>
              <span className="hidden sm:block text-[11px] text-gray-400 -mt-0.5">Smart System for Hospital Management</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-[#0f766e] transition-colors">Home</a>
            <a href="#departments" className="hover:text-[#0f766e] transition-colors">Departments</a>
            <a href="#about" className="hover:text-[#0f766e] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#0f766e] transition-colors">Contact</a>
          </nav>
          <button
            onClick={() => document.getElementById("login-section")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 bg-[#0f766e] hover:bg-[#0d6d65] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero + Login Section */}
      <section id="login-section" className="relative min-h-[600px]">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80&auto=format&fit=crop"
            alt="Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f766e]/90 via-[#0f766e]/70 to-[#0f766e]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left - Hero Text */}
          <div className="flex-1 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                Trusted by 10,000+ Patients
              </span>
              <h1 className="text-4xl lg:text-[56px] font-bold leading-[1.1] mb-5">
                World-class care,
                <br />
                close to home
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg leading-relaxed">
                Experience exceptional healthcare with our team of expert doctors,
                cutting-edge technology, and compassionate care.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap gap-5"
            >
              {[
                { icon: Shield, label: "NABH Certified" },
                { icon: Clock, label: "24/7 Emergency" },
                { icon: Stethoscope, label: "Expert Doctors" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5">
                  <item.icon className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Login Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-[440px] flex-shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-8 py-5">
                <h2 className="text-xl font-bold text-white">Welcome back</h2>
                <p className="text-white/80 text-sm mt-0.5">Sign in to your account to continue</p>
              </div>

              {/* Card Body */}
              <div className="px-8 py-6">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] text-gray-400 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] text-gray-400 pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-11 py-2.5 rounded-lg border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/10 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                      >
                        {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-[#0f766e] focus:ring-[#0f766e]" />
                      Remember me
                    </label>
                    <a href="#" className="text-[#0f766e] hover:underline font-medium">Forgot password?</a>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-white rounded-lg font-semibold hover:from-[#0d6d65] hover:to-[#0f766e] focus:ring-4 focus:ring-teal-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
                  >
                    {isLoading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />Signing in...</>
                    ) : (
                      <><span>Sign in</span><ArrowRight className="h-4 w-4" /></>
                    )}
                  </motion.button>
                </form>

                {/* Quick Access */}
                <div className="mt-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px flex-1 bg-gray-100" />
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Quick Access</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {demoUsers.map((user) => (
                      <motion.button
                        key={user.email}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setEmail(user.email); setPassword("password"); }}
                        className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all text-left ${
                          email === user.email
                            ? "border-[#0f766e]/30 bg-[#0f766e]/5 shadow-sm"
                            : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/50"
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-md ${user.color} flex items-center justify-center flex-shrink-0`}>
                          <user.icon className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-900 leading-tight">{user.role}</p>
                          <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <p className="text-center mt-3 text-[11px] text-gray-400">
                    Password for all: <span className="text-gray-500 font-medium">password</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-[#0f766e]">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#0f766e] font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Departments</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <div key={dept.name} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer group">
                <div className={`h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#0f766e]/10 transition-colors`}>
                  <dept.icon className={`h-6 w-6 ${dept.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{dept.name}</h3>
                <p className="text-sm text-gray-500">{dept.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-[#0f766e] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Features */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#0f766e] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">Trusted care, measurable results</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our hospital combines cutting-edge medical technology with compassionate care to deliver the best outcomes for every patient.
              </p>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, text: "NABL accredited laboratory" },
                  { icon: CheckCircle, text: "Cashless insurance on 38+ providers" },
                  { icon: CheckCircle, text: "Same-day lab reports via WhatsApp" },
                  { icon: CheckCircle, text: "Online appointment booking" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-[#0f766e] flex-shrink-0" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80&auto=format&fit=crop"
                alt="Hospital"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#0f766e]/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-[#0f766e]" fill="#0f766e" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                  <p className="text-xs text-gray-500">Patient Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#0f766e] to-[#14b8a6] rounded-2xl px-10 py-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-3">Ready to Book?</h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Schedule your appointment today and experience world-class healthcare.
            </p>
            <button
              onClick={() => document.getElementById("login-section")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-white text-[#0f766e] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" fill="white" />
                </div>
                <span className="font-bold text-white">SSVHMS</span>
              </div>
              <p className="text-sm leading-relaxed">Smart System for Hospital Management. Delivering exceptional healthcare since 2020.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">Home</a>
                <a href="#departments" className="block hover:text-white transition-colors">Departments</a>
                <a href="#about" className="block hover:text-white transition-colors">About Us</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Services</h4>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">Appointments</a>
                <a href="#" className="block hover:text-white transition-colors">Lab Reports</a>
                <a href="#" className="block hover:text-white transition-colors">Emergency</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <div className="space-y-2">
                <p>25 Kings Street, CA</p>
                <p>+1 (555) 123-4567</p>
                <p>info@ssvhms.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
