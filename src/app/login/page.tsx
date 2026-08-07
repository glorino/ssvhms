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
  ChevronDown,
} from "lucide-react"

const demoUsers = [
  { email: "admin@ssvhms.com", role: "Super Admin", icon: Shield, color: "bg-blue-500" },
  { email: "admin@hospital.com", role: "Admin", icon: Users, color: "bg-indigo-500" },
  { email: "doctor@hospital.com", role: "Doctor", icon: Stethoscope, color: "bg-emerald-500" },
  { email: "nurse@hospital.com", role: "Nurse", icon: Heart, color: "bg-pink-500" },
  { email: "pharmacist@hospital.com", role: "Pharmacist", icon: Pill, color: "bg-violet-500" },
  { email: "pathologist@hospital.com", role: "Pathologist", icon: FlaskConical, color: "bg-amber-500" },
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-[#0f766e] text-white text-sm">
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
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
            <a href="#" className="hover:text-[#0f766e] transition-colors">Departments</a>
            <a href="#" className="hover:text-[#0f766e] transition-colors">Doctors</a>
            <a href="#" className="hover:text-[#0f766e] transition-colors">Contact</a>
          </nav>
          <a
            href="#"
            className="flex items-center gap-2 bg-[#0f766e] hover:bg-[#0d6d65] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Book Appointment
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&q=80&auto=format&fit=crop"
            alt="Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-gray-900/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left - Hero Text */}
          <div className="flex-1 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                Trusted by 10,000+ Patients
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                World-class care,
                <br />
                close to home
              </h1>
              <p className="text-lg text-white/75 mb-8 max-w-lg leading-relaxed">
                Experience exceptional healthcare with our team of expert doctors, 
                cutting-edge technology, and compassionate care.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, label: "NABH Certified" },
                { icon: Clock, label: "24/7 Emergency" },
                { icon: Stethoscope, label: "Expert Doctors" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/80">
                  <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Login Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#0f766e] to-[#14b8a6] px-8 py-6">
                <h2 className="text-xl font-bold text-white">Welcome back</h2>
                <p className="text-white/80 text-sm mt-1">Sign in to your account</p>
              </div>

              {/* Card Body */}
              <div className="px-8 py-6">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-5 overflow-hidden"
                    >
                      <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email address
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
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
                    <label className="flex items-center gap-2 text-gray-600">
                      <input type="checkbox" className="rounded border-gray-300 text-[#0f766e] focus:ring-[#0f766e]" />
                      Remember me
                    </label>
                    <a href="#" className="text-[#0f766e] hover:underline font-medium">
                      Forgot password?
                    </a>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#0f766e] to-[#14b8a6] text-white rounded-lg font-semibold hover:from-[#0d6d65] hover:to-[#0f766e] focus:ring-4 focus:ring-teal-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Quick Access */}
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px flex-1 bg-gray-100" />
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      Quick Access
                    </span>
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center">
              <Heart className="h-3.5 w-3.5 text-white" fill="white" />
            </div>
            <span className="font-semibold text-white">SSVHMS</span>
          </div>
          <p>© 2026 Smart System for Hospital Management. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
