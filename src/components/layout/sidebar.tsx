"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  Stethoscope,
  BedDouble,
  Pill,
  FlaskConical,
  Scan,
  Droplets,
  CreditCard,
  ClipboardList,
  Truck,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Building2,
  Heart,
  FileText,
  Bell,
  MessageSquare,
  Shield,
  UserCheck,
  Ambulance,
  Activity,
  Banknote,
  Archive,
  CalendarDays,
  Receipt,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ChevronLeft,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  color: string
  children?: NavItem[]
}

const getNavigationForRole = (role: string): NavItem[] => {
  const allNav: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "from-blue-500 to-cyan-500" },
    { title: "Appointments", href: "/appointments", icon: Calendar, color: "from-violet-500 to-purple-500", badge: "12" },
    { title: "Patients", href: "/patients", icon: Users, color: "from-emerald-500 to-green-500" },
    { title: "Doctors", href: "/doctors", icon: Stethoscope, color: "from-blue-500 to-indigo-500" },
    { title: "OPD", href: "/opd", icon: ClipboardList, color: "from-amber-500 to-orange-500", children: [
      { title: "OPD Visits", href: "/opd/visits", icon: ClipboardList, color: "" },
      { title: "New Visit", href: "/opd/new", icon: FileText, color: "" },
    ]},
    { title: "IPD", href: "/ipd", icon: BedDouble, color: "from-rose-500 to-pink-500", children: [
      { title: "Admissions", href: "/ipd/admissions", icon: BedDouble, color: "" },
      { title: "New Admission", href: "/ipd/new", icon: FileText, color: "" },
      { title: "Bed Status", href: "/ipd/beds", icon: BedDouble, color: "" },
    ]},
    { title: "Pharmacy", href: "/pharmacy", icon: Pill, color: "from-green-500 to-emerald-500", children: [
      { title: "Medicines", href: "/pharmacy/medicines", icon: Pill, color: "" },
      { title: "Purchases", href: "/pharmacy/purchases", icon: Archive, color: "" },
      { title: "Sales", href: "/pharmacy/sales", icon: Receipt, color: "" },
    ]},
    { title: "Pathology", href: "/pathology", icon: FlaskConical, color: "from-cyan-500 to-blue-500" },
    { title: "Radiology", href: "/radiology", icon: Scan, color: "from-indigo-500 to-violet-500" },
    { title: "Blood Bank", href: "/blood-bank", icon: Droplets, color: "from-red-500 to-rose-500" },
    { title: "Billing", href: "/billing", icon: CreditCard, color: "from-amber-500 to-yellow-500", children: [
      { title: "All Bills", href: "/billing/all", icon: CreditCard, color: "" },
      { title: "New Bill", href: "/billing/new", icon: FileText, color: "" },
      { title: "Payments", href: "/billing/payments", icon: Banknote, color: "" },
    ]},
    { title: "Surgery", href: "/surgery", icon: Activity, color: "from-pink-500 to-rose-500" },
    { title: "Ambulance", href: "/ambulance", icon: Ambulance, color: "from-orange-500 to-red-500" },
    { title: "Front Office", href: "/front-office", icon: Building2, color: "from-teal-500 to-cyan-500" },
    { title: "Human Resources", href: "/hr", icon: UserCog, color: "from-violet-500 to-purple-500", children: [
      { title: "Staff", href: "/hr/staff", icon: Users, color: "" },
      { title: "Attendance", href: "/hr/attendance", icon: UserCheck, color: "" },
      { title: "Leaves", href: "/hr/leaves", icon: CalendarDays, color: "" },
      { title: "Payroll", href: "/hr/payroll", icon: Banknote, color: "" },
    ]},
    { title: "Reports", href: "/reports", icon: BarChart3, color: "from-blue-500 to-indigo-500" },
    { title: "Messages", href: "/messages", icon: MessageSquare, color: "from-green-500 to-emerald-500" },
    { title: "Settings", href: "/settings", icon: Settings, color: "from-gray-500 to-slate-500" },
  ]

  const roleAccess: Record<string, string[]> = {
    SUPER_ADMIN: allNav.map((n) => n.href),
    ADMIN: allNav.map((n) => n.href),
    DOCTOR: ["/dashboard", "/appointments", "/patients", "/opd", "/ipd", "/pathology", "/radiology", "/messages"],
    NURSE: ["/dashboard", "/patients", "/ipd", "/opd", "/blood-bank", "/messages"],
    PHARMACIST: ["/dashboard", "/pharmacy", "/messages"],
    PATHOLOGIST: ["/dashboard", "/pathology", "/messages"],
    RADIOLOGIST: ["/dashboard", "/radiology", "/messages"],
    ACCOUNTANT: ["/dashboard", "/billing", "/hr/payroll", "/reports", "/messages"],
    RECEPTIONIST: ["/dashboard", "/appointments", "/patients", "/front-office", "/messages"],
    PATIENT: ["/patient-portal"],
  }

  const allowed = roleAccess[role] || roleAccess["PATIENT"]
  return allNav.filter((item) => allowed.includes(item.href))
}

function NavItemComponent({
  item,
  pathname,
  isCollapsed,
}: {
  item: NavItem
  pathname: string
  isCollapsed: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
            isActive
              ? "bg-gradient-to-r " + item.color + " text-white shadow-lg shadow-slate-200"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </>
          )}
        </button>
        <AnimatePresence>
          {isOpen && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 mt-1 space-y-1 overflow-hidden border-l-2 border-slate-100 pl-3"
            >
              {item.children?.map((child, index) => (
                <motion.div
                  key={child.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={child.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                      pathname === child.href
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    )}
                  >
                    <child.icon className="h-4 w-4" />
                    <span>{child.title}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link href={item.href}>
      <motion.div
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          isActive
            ? "bg-gradient-to-r " + item.color + " text-white shadow-lg shadow-slate-200"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && (
          <>
            <span>{item.title}</span>
            {item.badge && (
              <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </>
        )}
      </motion.div>
    </Link>
  )
}

export function Sidebar({ userRole = "SUPER_ADMIN" }: { userRole?: string }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigation = getNavigationForRole(userRole)

  const user = session?.user as any
  const userName = user?.name || "User"
  const userEmail = user?.email || ""
  const initials = userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0, width: isCollapsed ? 72 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 z-40 h-screen bg-white border-r border-slate-200 shadow-xl shadow-slate-100/50"
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
        <motion.div
          className="flex items-center gap-3"
          animate={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center shadow-lg shadow-teal-500/25">
            <Heart className="h-5 w-5 text-white" fill="white" />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#0f766e] to-[#14b8a6] bg-clip-text text-transparent">
                SSVHMS
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">Hospital Management</p>
            </motion.div>
          )}
        </motion.div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-3 overflow-y-auto h-[calc(100vh-8rem)] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {navigation.map((item) => (
          <NavItemComponent
            key={item.href}
            item={item}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-white p-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0f766e] to-[#14b8a6] flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-teal-500/25">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{userName}</p>
              <p className="text-xs text-slate-500 truncate">{userEmail}</p>
            </div>
          )}
          {!isCollapsed && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
