import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Public routes that don't require authentication
const publicRoutes = ["/login", "/api/auth", "/api/health", "/"]

// Role-based route access
const roleRoutes: Record<string, string[]> = {
  SUPER_ADMIN: ["/dashboard", "/patients", "/doctors", "/appointments", "/opd", "/ipd", "/pharmacy", "/pathology", "/radiology", "/blood-bank", "/billing", "/surgery", "/ambulance", "/front-office", "/hr", "/reports", "/messages", "/settings"],
  ADMIN: ["/dashboard", "/patients", "/doctors", "/appointments", "/opd", "/ipd", "/pharmacy", "/pathology", "/radiology", "/blood-bank", "/billing", "/surgery", "/ambulance", "/front-office", "/hr", "/reports", "/messages", "/settings"],
  DOCTOR: ["/dashboard", "/appointments", "/patients", "/opd", "/ipd", "/pathology", "/radiology", "/messages"],
  NURSE: ["/dashboard", "/patients", "/ipd", "/opd", "/blood-bank", "/messages"],
  PHARMACIST: ["/dashboard", "/pharmacy", "/messages"],
  PATHOLOGIST: ["/dashboard", "/pathology", "/messages"],
  RADIOLOGIST: ["/dashboard", "/radiology", "/messages"],
  ACCOUNTANT: ["/dashboard", "/billing", "/hr/payroll", "/reports", "/messages"],
  RECEPTIONIST: ["/dashboard", "/appointments", "/patients", "/front-office", "/messages"],
  PATIENT: ["/patient-portal"],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // For demo purposes, allow all routes (in production, check JWT token)
  // In a real app, you would verify the JWT token here
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
