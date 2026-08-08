import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = ["/login", "/api/auth", "/api/health", "/"]

const roleRoutes: Record<string, string[]> = {
  SUPER_ADMIN: ["/dashboard", "/patients", "/doctors", "/appointments", "/opd", "/ipd", "/pharmacy", "/pathology", "/radiology", "/blood-bank", "/billing", "/surgery", "/ambulance", "/front-office", "/hr", "/reports", "/messages", "/settings"],
  ADMIN: ["/dashboard", "/patients", "/doctors", "/appointments", "/opd", "/ipd", "/pharmacy", "/pathology", "/radiology", "/blood-bank", "/billing", "/surgery", "/ambulance", "/front-office", "/hr", "/reports", "/messages", "/settings"],
  DOCTOR: ["/dashboard", "/appointments", "/patients", "/opd", "/ipd", "/pathology", "/radiology", "/surgery", "/messages"],
  NURSE: ["/dashboard", "/patients", "/ipd", "/opd", "/pharmacy", "/blood-bank", "/messages"],
  PHARMACIST: ["/dashboard", "/patients", "/pharmacy", "/messages"],
  PATHOLOGIST: ["/dashboard", "/patients", "/pathology", "/messages"],
  RADIOLOGIST: ["/dashboard", "/patients", "/radiology", "/messages"],
  ACCOUNTANT: ["/dashboard", "/billing", "/hr", "/reports", "/messages"],
  RECEPTIONIST: ["/dashboard", "/appointments", "/patients", "/billing", "/front-office", "/messages"],
  PATIENT: ["/patient-portal"],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const token = request.cookies.get("next-auth.session-token")?.value
    || request.cookies.get("__Secure-next-auth.session-token")?.value

  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
