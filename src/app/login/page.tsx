"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  Users,
  Pill,
  FlaskConical,
  Scan,
  CreditCard,
  UserCheck,
  Phone,
  Shield,
  Activity,
  Loader2,
} from "lucide-react"

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
        const role = demoUsers.find((u) => u.email === email)?.role
        if (role === "Patient") {
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
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 -right-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-white/5 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SSVHMS</h1>
              <p className="text-xs text-white/70">Hospital Management System</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h2 className="text-5xl font-bold text-white leading-tight mb-6">
              Simplify healthcare
              <br />
              every day.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Real-time patient tracking, smart billing analytics,
              and AI-powered insights — all in one platform built for
              modern hospitals.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {[
                { icon: Shield, text: "Role-based access control" },
                { icon: Activity, text: "Real-time patient monitoring" },
                { icon: Stethoscope, text: "AI-powered clinical insights" },
              ].map((feature, i) => (
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
                  <span className="text-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
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
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
              >
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
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900"
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
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-900"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
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
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Quick Access — Demo Accounts
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoUsers.slice(0, 6).map((user) => (
                  <motion.button
                    key={user.email}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDemoLogin(user.email)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                      email === user.email
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-xl ${user.color} flex items-center justify-center flex-shrink-0`}>
                      <user.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{user.role}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
              <p className="text-center mt-4 text-xs text-gray-400">
                Password for all: <span className="font-medium text-gray-500">password</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
