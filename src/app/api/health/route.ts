import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    name: "SSVHMS - Smart Hospital Management System",
    version: "1.0.0",
    status: "running",
    modules: [
      "Dashboard",
      "Patients",
      "Doctors",
      "Appointments",
      "OPD",
      "IPD",
      "Pharmacy",
      "Pathology",
      "Radiology",
      "Blood Bank",
      "Billing",
      "Surgery",
      "Ambulance",
      "Front Office",
      "Human Resources",
      "Reports",
      "Messages",
      "Settings",
    ],
  })
}
