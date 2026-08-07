"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ChevronRight,
} from "lucide-react"

const newsItems = [
  {
    date: "05 JAN 2026",
    title: "National Pharmacist Day",
    desc: "Celebrated as National Pharmacist Day to appreciate the contributions of pharmacists in patient care, medication...",
  },
  {
    date: "03 DEC 2025",
    title: "International Day of Persons with Disabilities",
    desc: "Today, communities around the globe mark the International Day of Persons with Disabilities, a day dedicated to...",
  },
  {
    date: "03 NOV 2025",
    title: "World Neuroendocrine Cancer Day (Every Stripe Tells a Story)",
    desc: 'World Neuroendocrine Cancer Day is "Every Stripe Tells a Story," focusing on the importance of early diagnosis and the...',
  },
  {
    date: "03 NOV 2025",
    title: "Diabetes and Well-being Camps",
    desc: 'The official theme for World Diabetes Day 2025 is "Diabetes and Well-being," with a major focus on creating healthy...',
  },
  {
    date: "03 OCT 2025",
    title: "Free Dental Treatment Camp",
    desc: "Free dental treatment for poor people that include simple extractions, temporary fillings and other few treatments...",
  },
]

const demoRoles = [
  { label: "Super Admin", email: "admin@ssvhms.com", bg: "bg-[#14b8a6]" },
  { label: "Admin", email: "admin@hospital.com", bg: "bg-purple-500" },
  { label: "Doctor", email: "doctor@hospital.com", bg: "bg-gray-400" },
  { label: "Pharmacist", email: "pharmacist@hospital.com", bg: "bg-gray-400" },
  { label: "Pathologist", email: "pathologist@hospital.com", bg: "bg-pink-500" },
  { label: "Radiologist", email: "radiologist@hospital.com", bg: "bg-emerald-600" },
  { label: "Accountant", email: "accountant@hospital.com", bg: "bg-[#14b8a6]" },
  { label: "Receptionist", email: "receptionist@hospital.com", bg: "bg-gray-400" },
  { label: "Nurse", email: "nurse@hospital.com", bg: "bg-[#14b8a6]" },
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Panel - News */}
      <div className="w-full lg:w-1/2 bg-[#edf8f7] flex flex-col">
        <div className="flex-1 overflow-y-auto px-8 sm:px-12 lg:px-16 py-10">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-sm">
                <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-4h4v-2h-4V7h-2v4H7v2h4v4z"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-800">Smart Hospital & Research Center</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#14b8a6] font-bold uppercase tracking-wide ml-[60px]">
              <span className="w-2 h-2 rounded-full bg-[#14b8a6]" />
              Admin Portal
            </div>
          </div>

          {/* What's new heading */}
          <h2 className="text-[26px] font-bold text-gray-900 leading-snug mb-8 pr-4">
            What&apos;s new in Smart Hospital & Research Center
          </h2>

          {/* Timeline */}
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-gray-300" />

            <div className="space-y-6">
              {newsItems.map((item, i) => (
                <div key={i} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-6 top-1 w-[12px] h-[12px] rounded-full bg-[#14b8a6]" />

                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {item.date}
                    </p>
                    <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-2.5">
                      {item.desc}
                    </p>
                    <button className="inline-flex items-center gap-1 text-xs font-bold text-[#14b8a6] bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-full px-4 py-1.5 hover:bg-[#14b8a6] hover:text-white transition-colors">
                      Read More <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 sm:px-12 lg:px-16 py-4 text-xs text-gray-400">
          © 2026 Smart Hospital & Research Center · All rights reserved
        </div>
      </div>

      {/* Right Panel - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 sm:px-12 lg:px-16 py-10 bg-white">
        <div className="w-full max-w-[420px]">
          <h1 className="text-[28px] font-bold text-gray-900 mb-8">Admin Login</h1>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 overflow-hidden"
              >
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/10 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                placeholder="Username"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-lg border border-gray-200 bg-white focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]/10 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end mb-6">
              <a href="#" className="text-[13px] font-semibold text-[#14b8a6] hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-lg font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Signing in...</>
              ) : "Sign In"}
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="mt-8">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">
              Quick Demo Login
            </p>
            <div className="grid grid-cols-3 gap-2">
              {demoRoles.map((role) => (
                <button
                  key={role.email}
                  onClick={() => { setEmail(role.email); setPassword("password"); }}
                  className={`${role.bg} text-white text-[12px] font-bold py-2.5 px-2 rounded-lg hover:opacity-90 transition-opacity text-center leading-tight`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <a href="#" className="text-[13px] font-semibold text-[#14b8a6] hover:underline">
              User Login
            </a>
            <a href="/" className="text-[13px] font-semibold text-gray-500 hover:text-gray-700 transition-colors">
              Front Site
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
