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
  CheckCircle,
} from "lucide-react"

const rotatingTexts = [
  { text: "Simplify healthcare", color: "text-white" },
  { text: "Streamline operations", color: "text-white" },
  { text: "Empower your team", color: "text-white" },
  { text: "Save precious time", color: "text-white" },
]

const benefits = [
  { icon: Clock, text: "Reduce admin workload by 60%" },
  { icon: TrendingUp, text: "Boost patient satisfaction scores" },
  { icon: Shield, text: "HIPAA compliant & secure" },
  { icon: Zap, text: "Lightning-fast billing & records" },
]

const features = [
  { icon: Shield, text: "Role-based access control" },
  { icon: Activity, text: "Real-time patient monitoring" },
  { icon: Stethoscope, text: "AI-powered clinical insights" },
]

const demoUsers = [
  { email: "admin@ssvhms.com", role: "Super Admin", icon: Shield, color: "bg-blue-600" },
  { email: "admin@hospital.com", role: "Admin", icon: Users, color: "bg-indigo-600" },
  { email: "doctor@hospital.com", role: "Doctor", icon: Stethoscope, color: "bg-emerald-600" },
  { email: "nurse@hospital.com", role: "Nurse", icon: Heart, color: "bg-pink-600" },
  { email: "pharmacist@hospital.com", role: "Pharmacist", icon: Pill, color: "bg-violet-600" },
  { email: "pathologist@hospital.com", role: "Pathologist", icon: FlaskConical, color: "bg-amber-600" },
  { email: "radiologist@hospital.com", role: "Radiologist", icon: Scan, color: "bg-cyan-600" },
  { email: "accountant@hospital.com", role: "Accountant", icon: CreditCard, color: "bg-rose-600" },
  { email: "receptionist@hospital.com", role: "Receptionist", icon: Phone, color: "bg-teal-600" },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [benefitIndex, setBenefitIndex] = useState(0)

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)
    const benefitTimer = setInterval(() => {
      setBenefitIndex((prev) => (prev + 1) % benefits.length)
    }, 2500)
    return () => {
      clearInterval(textTimer)
      clearInterval(benefitTimer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials. Try using 'password' as the password.")
        setIsLoading(false)
      } else {
        const user = demoUsers.find((u) => u.email === email)
        if (user?.role === "Patient") {
          router.push("/patient-portal")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("password")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute -bottom-20 left-1/3 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
          />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">SSVHMS</h1>
              <p className="text-xs text-white/70">Hospital Management System</p>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            {/* Rotating Heading */}
            <div className="h-36 mb-6">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={textIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl font-bold text-white leading-tight"
                >
                  {rotatingTexts[textIndex].text}
                  <br />
                  <span className="text-white/80">every day.</span>
                </motion.h2>
              </AnimatePresence>
            </div>

            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Real-time patient tracking, smart billing analytics,
              and AI-powered insights — all in one platform built for
              modern hospitals.
            </p>

            {/* Rotating Benefits */}
            <div className="h-12 mb-8 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={benefitIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20"
                >
                  {React.createElement(benefits[benefitIndex].icon, { className: "h-5 w-5 text-white" })}
                  <span className="text-white font-medium">{benefits[benefitIndex].text}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-10 w-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white/90 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-8 pt-8 border-t border-white/10"
          >
            {[
              { value: "10K+", label: "Patients" },
              { value: "500+", label: "Doctors" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-[#f8f9fc]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SSVHMS</h1>
              <p className="text-xs text-gray-500">Hospital Management</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2"
              >
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 text-xs font-bold">!</span>
                </div>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 10px 40px -10px rgba(79, 70, 229, 0.5)" }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
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
                <div className="h-px flex-1 bg-gray-200" />
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Quick Access — Demo Accounts
                </p>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {demoUsers.slice(0, 6).map((user) => (
                  <motion.button
                    key={user.email}
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 20px -4px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDemoLogin(user.email)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                      email === user.email
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-xl ${user.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <user.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{user.role}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Password for all: <span className="font-semibold text-gray-500">password</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
