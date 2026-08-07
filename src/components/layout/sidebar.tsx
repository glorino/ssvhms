"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  Baby,
  Activity,
  Banknote,
  Archive,
  CalendarDays,
  ClipboardCheck,
  Receipt,
  Microscope,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "OPD",
    href: "/opd",
    icon: ClipboardList,
    children: [
      { title: "OPD Visits", href: "/opd/visits", icon: ClipboardList },
      { title: "New Visit", href: "/opd/new", icon: FileText },
    ],
  },
  {
    title: "IPD",
    href: "/ipd",
    icon: BedDouble,
    children: [
      { title: "Admissions", href: "/ipd/admissions", icon: BedDouble },
      { title: "New Admission", href: "/ipd/new", icon: FileText },
      { title: "Bed Status", href: "/ipd/beds", icon: BedDouble },
    ],
  },
  {
    title: "Pharmacy",
    href: "/pharmacy",
    icon: Pill,
    children: [
      { title: "Medicines", href: "/pharmacy/medicines", icon: Pill },
      { title: "Purchases", href: "/pharmacy/purchases", icon: Archive },
      { title: "Sales", href: "/pharmacy/sales", icon: Receipt },
      { title: "Stock", href: "/pharmacy/stock", icon: Archive },
    ],
  },
  {
    title: "Pathology",
    href: "/pathology",
    icon: FlaskConical,
  },
  {
    title: "Radiology",
    href: "/radiology",
    icon: Scan,
  },
  {
    title: "Blood Bank",
    href: "/blood-bank",
    icon: Droplets,
    children: [
      { title: "Donations", href: "/blood-bank/donations", icon: Droplets },
      { title: "Issues", href: "/blood-bank/issues", icon: Droplets },
      { title: "Inventory", href: "/blood-bank/inventory", icon: Droplets },
    ],
  },
  {
    title: "Billing",
    href: "/billing",
    icon: CreditCard,
    children: [
      { title: "All Bills", href: "/billing/all", icon: CreditCard },
      { title: "New Bill", href: "/billing/new", icon: FileText },
      { title: "Payments", href: "/billing/payments", icon: Banknote },
    ],
  },
  {
    title: "Surgery",
    href: "/surgery",
    icon: Activity,
  },
  {
    title: "Ambulance",
    href: "/ambulance",
    icon: Ambulance,
  },
  {
    title: "Front Office",
    href: "/front-office",
    icon: Building2,
    children: [
      { title: "Visitors", href: "/front-office/visitors", icon: Users },
      { title: "Phone Calls", href: "/front-office/calls", icon: Bell },
      { title: "Postal", href: "/front-office/postal", icon: Mail },
    ],
  },
  {
    title: "Human Resources",
    href: "/hr",
    icon: UserCog,
    children: [
      { title: "Staff", href: "/hr/staff", icon: Users },
      { title: "Attendance", href: "/hr/attendance", icon: UserCheck },
      { title: "Leaves", href: "/hr/leaves", icon: CalendarDays },
      { title: "Payroll", href: "/hr/payroll", icon: Banknote },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

function NavItemComponent({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100",
            isActive ? "bg-slate-100 text-slate-900" : "text-slate-600"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="flex-1 text-left">{item.title}</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-4 mt-1 space-y-1">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100",
                  pathname === child.href
                    ? "bg-slate-100 text-slate-900 font-medium"
                    : "text-slate-600"
                )}
              >
                <child.icon className="h-4 w-4" />
                <span>{child.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100",
        isActive ? "bg-slate-100 text-slate-900" : "text-slate-600"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.title}</span>
      {item.badge && (
        <span className="ml-auto rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
          {item.badge}
        </span>
      )}
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Heart className="h-8 w-8 text-red-500" />
        <div>
          <h1 className="text-lg font-bold text-slate-900">SSVHMS</h1>
          <p className="text-xs text-slate-500">Hospital Management</p>
        </div>
      </div>
      <nav className="space-y-1 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
        {navigation.map((item) => (
          <NavItemComponent key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>
    </aside>
  )
}

function Mail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
