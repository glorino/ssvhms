"use client"

import React, { useState, useEffect } from "react"
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
  Scan,
  CreditCard,
  Phone,
  Activity,
  Zap,
  Clock,
  TrendingUp,
  ChevronRight,
  Star,
} from "lucide-react"

const rotatingTexts = [
  "Simplify healthcare",
  "Streamline operations",
  "Empower your team",
  "Save precious time",
  "Improve outcomes",
]

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
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

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
    <div className="min-h-screen flex bg-white">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-gradient-to-br from-[#4f46e5] via-[#6366f1] to-[#8b5cf6]">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 flex flex-col w-full p-16 lg:p-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">SSVHMS</span>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-[52px] font-bold text-white leading-[1.1] mb-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="block"
                  >
                    {rotatingTexts[textIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="block text-white/70 mt-1">every day.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg leading-relaxed mb-10 max-w-md"
            >
              Real-time patient tracking, smart billing analytics, and
              AI-powered insights — all in one platform built for
              growing hospitals.
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {[
                { icon: Shield, text: "Role-based access control" },
                { icon: Activity, text: "Real-time patient monitoring" },
                { icon: Zap, text: "Lightning-fast billing & records" },
              ].map((feature, i) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white/90 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-10 pt-8 mt-8 pb-2 border-t border-white/10"
          >
            {[
              { value: "10K+", label: "Patients Managed" },
              { value: "500+", label: "Doctors Connected" },
              { value: "99.9%", label: "Uptime Guaranteed" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-[48%] flex items-center justify-center pl-6 pr-8 py-6 lg:pl-6 lg:pr-16 lg:pt-14 lg:pb-6">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-12 justify-center">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SSVHMS</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-[28px] font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500 mb-8 text-[15px]">Sign in to your account to continue</p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="p-3.5 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
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
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-[15px] text-gray-900 placeholder:text-gray-400"
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
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-[15px] text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white rounded-lg font-semibold hover:from-[#4338ca] hover:to-[#6d28d9] focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gray-100" />
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
                  Quick Access
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {demoUsers.map((user) => (
                  <motion.button
                    key={user.email}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setEmail(user.email); setPassword("password"); }}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      email === user.email
                        ? "border-indigo-200 bg-indigo-50/50 shadow-sm"
                        : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/50"
                    }`}
                  >
                    <div className={`h-9 w-9 rounded-lg ${user.color} flex items-center justify-center flex-shrink-0`}>
                      <user.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-gray-900 leading-tight">{user.role}</p>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{user.email}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="text-center mt-4 text-xs text-gray-400">
                Password for all: <span className="text-gray-500 font-medium">password</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
