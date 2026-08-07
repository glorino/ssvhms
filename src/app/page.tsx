import Link from "next/link"
import { Heart, ArrowRight, Shield, Clock, Users, Stethoscope, Pill, FlaskConical, BedDouble, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  { icon: Users, title: "Patient Management", description: "Complete patient records with UMR tracking, medical history, and appointments" },
  { icon: Stethoscope, title: "Doctor Management", description: "Doctor profiles, schedules, specializations, and consultation management" },
  { icon: BedDouble, title: "OPD & IPD", description: "Outpatient and inpatient department management with bed tracking" },
  { icon: Pill, title: "Pharmacy", description: "Medicine inventory, purchases, sales, and stock management" },
  { icon: FlaskConical, title: "Pathology & Radiology", description: "Lab tests, imaging studies, and diagnostic report management" },
  { icon: CreditCard, title: "Billing & Invoicing", description: "Dynamic billing, payment tracking, and insurance management" },
]

const modules = [
  "Dashboard", "Patients", "Doctors", "Appointments", "OPD", "IPD",
  "Pharmacy", "Pathology", "Radiology", "Blood Bank", "Billing",
  "Surgery", "Ambulance", "Front Office", "HR & Payroll", "Reports"
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            <div>
              <h1 className="text-xl font-bold text-slate-900">SSVHMS</h1>
              <p className="text-[10px] text-slate-500">Smart Hospital Management</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#modules" className="hover:text-slate-900">Modules</a>
            <a href="#about" className="hover:text-slate-900">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button size="sm">
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tNC0ydi00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80">
              <Shield className="h-4 w-4" />
              Trusted by 500+ Hospitals
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Complete Hospital
              <span className="text-blue-400"> Management System</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 md:text-xl">
              Streamline your hospital operations with our comprehensive HMS.
              From patient registration to billing, manage everything in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Learn More
                </Button>
              </a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-3xl font-bold">18+</p>
                <p className="text-sm text-white/60">Modules</p>
              </div>
              <div>
                <p className="text-3xl font-bold">9</p>
                <p className="text-sm text-white/60">User Roles</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-white/60">Access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Powerful Features</h2>
            <p className="mt-2 text-slate-500">Everything you need to manage your hospital efficiently</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 transition-colors hover:border-slate-900">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3">
                    <feature.icon className="h-6 w-6 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">All Modules Included</h2>
            <p className="mt-2 text-slate-500">18+ modules covering every aspect of hospital management</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {modules.map((mod) => (
              <div key={mod} className="rounded-lg border bg-white p-4 text-center font-medium text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900">
                {mod}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Built for Modern Hospitals</h2>
              <p className="mt-4 text-slate-500">
                SSVHMS is designed with the latest technology stack to provide a fast, reliable,
                and secure hospital management experience. Built with Next.js, TypeScript, and PostgreSQL.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-600">Real-time dashboard with live updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-600">Role-based access control (RBAC)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-slate-600">72+ language support with RTL</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-slate-900">Tech Stack</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between border-b py-2"><span className="text-slate-500">Frontend</span><span className="font-medium">Next.js 15 + TypeScript</span></div>
                <div className="flex justify-between border-b py-2"><span className="text-slate-500">UI</span><span className="font-medium">Tailwind CSS + shadcn/ui</span></div>
                <div className="flex justify-between border-b py-2"><span className="text-slate-500">Database</span><span className="font-medium">PostgreSQL (Neon)</span></div>
                <div className="flex justify-between border-b py-2"><span className="text-slate-500">ORM</span><span className="font-medium">Prisma</span></div>
                <div className="flex justify-between py-2"><span className="text-slate-500">Deployment</span><span className="font-medium">Vercel</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="font-bold">SSVHMS</span>
            </div>
            <p className="text-sm text-white/60">&copy; 2026 SSVHMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
