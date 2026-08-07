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
  Users,
  Pill,
  FlaskConical,
  Scan,
  CreditCard,
  UserCheck,
  Phone,
  Activity,
  Shield,
  ArrowRight,
  Loader2,
  CheckCircle,
} from "lucide-react"

const demoUsers = [
  { email: "admin@ssvhms.com", role: "Super Admin", icon: Shield, color: "from-violet-500 to-purple-600" },
  { email: "doctor@hospital.com", role: "Doctor", icon: Stethoscope, color: "from-blue-500 to-cyan-500" },
  { email: "nurse@hospital.com", role: "Nurse", icon: Heart, color: "from-pink-500 to-rose-500" },
  { email: "pharmacist@hospital.com", role: "Pharmacist", icon: Pill, color: "from-green-500 to-emerald-500" },
  { email: "pathologist@hospital.com", role: "Pathologist", icon: FlaskConical, color: "from-amber-500 to-orange-500" },
  { email: "radiologist@hospital.com", role: "Radiologist", icon: Scan, color: "from-cyan-500 to-blue-500" },
  { email: "accountant@hospital.com", role: "Accountant", icon: CreditCard, color: "from-emerald-500 to-teal-500" },
  { email: "receptionist@hospital.com", role: "Receptionist", icon: Phone, color: "from-rose-500 to-pink-500" },
  { email: "patient@hospital.com", role: "Patient", icon: UserCheck, color: "from-indigo-500 to-blue-500" },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)

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
        // Redirect based on role
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

  const handleDemoLogin = (email: string) => {
    setEmail(email)
    setPassword("password")
    setSelectedDemo(email)
  }

  return (
    <div className="min-h-screen login-bg flex">
      {/* Left Side - Decorative */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Heart className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">SSVHMS</h1>
                <p className="text-sm text-white/80">Smart Hospital Management</p>
              </div>
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              The Future of
              <br />
              Hospital Management
            </h2>

            <p className="text-xl text-white/80 mb-12 max-w-md">
              Streamline your healthcare operations with our comprehensive, AI-powered hospital management system.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, label: "10K+ Patients", sub: "Managed" },
                { icon: Stethoscope, label: "500+ Doctors", sub: "Connected" },
                { icon: Activity, label: "99.9% Uptime", sub: "Guaranteed" },
                { icon: Shield, label: "HIPAA", sub: "Compliant" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <stat.icon className="h-6 w-6 mb-2" />
                  <p className="font-semibold">{stat.label}</p>
                  <p className="text-sm text-white/70">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-20 right-20">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="h-24 w-24 rounded-3xl bg-white/10 backdrop-blur-sm"
          />
        </div>
        <div className="absolute bottom-40 left-20">
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm"
          />
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SSVHMS</h1>
              <p className="text-xs text-white/70">Smart Hospital Management</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-500 mt-1">Sign in to your account</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Quick Demo Login</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {demoUsers.slice(0, 9).map((user) => (
                  <motion.button
                    key={user.email}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDemoLogin(user.email)}
                    className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                      selectedDemo === user.email
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${user.color} flex items-center justify-center`}>
                      <user.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-[10px] font-medium text-gray-600">{user.role}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 text-sm text-white/70"
          >
            Don&apos;t have an account?{" "}
            <a href="#" className="text-white font-medium hover:underline">
              Contact Administrator
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
