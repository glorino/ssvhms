"use client"

import React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  Droplets,
  FileText,
  Pill,
  Activity,
  BedDouble,
  CreditCard,
  Printer,
  Download,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const patientData = {
  id: "PT001",
  umr: "UMR2026001",
  firstName: "Rajesh",
  lastName: "Kumar",
  age: 45,
  gender: "Male",
  phone: "+91 98765 43210",
  email: "rajesh@email.com",
  bloodGroup: "O+",
  dateOfBirth: "1981-05-15",
  address: "123, MG Road, Sector 5",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  postalCode: "400001",
  emergencyContact: "Sunita Kumar",
  emergencyPhone: "+91 98765 43218",
  insuranceProvider: "Star Health Insurance",
  insurancePolicyNo: "SHI-12345678",
  allergies: "Penicillin, Peanuts",
  medicalHistory: "Hypertension, Type 2 Diabetes",
  registrationDate: "2020-03-15",
  lastVisit: "2026-08-05",
}

const visits = [
  {
    id: "VIS001",
    date: "2026-08-05",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    diagnosis: "Chest pain, Hypertension",
    prescription: "Amlodipine 5mg, Aspirin 75mg",
  },
  {
    id: "VIS002",
    date: "2026-07-20",
    doctor: "Dr. Amit Singh",
    department: "General Medicine",
    diagnosis: "Routine checkup",
    prescription: "Metformin 500mg",
  },
  {
    id: "VIS003",
    date: "2026-06-15",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    diagnosis: "Hypertension follow-up",
    prescription: "Amlodipine 5mg",
  },
]

const prescriptions = [
  {
    id: "PRE001",
    date: "2026-08-05",
    doctor: "Dr. Priya Sharma",
    medicines: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "30 days" },
      { name: "Aspirin", dosage: "75mg", frequency: "Once daily", duration: "30 days" },
    ],
  },
  {
    id: "PRE002",
    date: "2026-07-20",
    doctor: "Dr. Amit Singh",
    medicines: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" },
    ],
  },
]

const bills = [
  {
    id: "BILL001",
    date: "2026-08-05",
    type: "OPD",
    amount: 1500,
    paid: 1500,
    status: "Paid",
  },
  {
    id: "BILL002",
    date: "2026-07-20",
    type: "OPD",
    amount: 800,
    paid: 800,
    status: "Paid",
  },
  {
    id: "BILL003",
    date: "2026-06-15",
    type: "Pathology",
    amount: 2500,
    paid: 2500,
    status: "Paid",
  },
]

const labTests = [
  {
    id: "LAB001",
    date: "2026-08-05",
    test: "Complete Blood Count",
    status: "Completed",
    result: "Normal",
  },
  {
    id: "LAB002",
    date: "2026-08-05",
    test: "Lipid Profile",
    status: "Completed",
    result: "High Cholesterol",
  },
  {
    id: "LAB003",
    date: "2026-07-20",
    test: "Blood Sugar Fasting",
    status: "Completed",
    result: "145 mg/dL (High)",
  },
]

export default function PatientDetailPage() {
  const params = useParams()
  const patientId = params.id as string

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/patients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {patientData.firstName} {patientData.lastName}
            </h1>
            <p className="text-slate-500">UMR: {patientData.umr}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href={`/patients/${patientId}/edit`}>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Patient Info Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {patientData.firstName[0]}{patientData.lastName[0]}
                </span>
              </div>
              <div>
                <p className="font-semibold">
                  {patientData.firstName} {patientData.lastName}
                </p>
                <p className="text-sm text-slate-500">{patientData.gender}, {patientData.age} years</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{patientData.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <Mail className="h-4 w-4 text-slate-400" />
              <span>{patientData.email}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Blood Group: <strong>{patientData.bloodGroup}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>Last Visit: {patientData.lastVisit}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>{patientData.address}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {patientData.city}, {patientData.state}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="visits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visits">OPD Visits</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="lab-tests">Lab Tests</TabsTrigger>
          <TabsTrigger value="bills">Bills</TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
        </TabsList>

        {/* OPD Visits */}
        <TabsContent value="visits">
          <Card>
            <CardHeader>
              <CardTitle>OPD Visit History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visit ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Prescription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">{visit.id}</TableCell>
                      <TableCell>{visit.date}</TableCell>
                      <TableCell>{visit.doctor}</TableCell>
                      <TableCell>{visit.department}</TableCell>
                      <TableCell>{visit.diagnosis}</TableCell>
                      <TableCell className="max-w-xs truncate">{visit.prescription}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescriptions */}
        <TabsContent value="prescriptions">
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Prescription {prescription.id}</CardTitle>
                    <div className="text-sm text-slate-500">
                      {prescription.date} | {prescription.doctor}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medicine</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {prescription.medicines.map((med, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{med.name}</TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>{med.frequency}</TableCell>
                          <TableCell>{med.duration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Lab Tests */}
        <TabsContent value="lab-tests">
          <Card>
            <CardHeader>
              <CardTitle>Lab Test History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.id}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>{test.test}</TableCell>
                      <TableCell>
                        <Badge variant="success">{test.status}</Badge>
                      </TableCell>
                      <TableCell>{test.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bills */}
        <TabsContent value="bills">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.type}</TableCell>
                      <TableCell>₦{bill.amount.toLocaleString()}</TableCell>
                      <TableCell>₦{bill.paid.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="success">{bill.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical History */}
        <TabsContent value="medical-history">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Allergies</p>
                  <p className="text-sm">{patientData.allergies}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Medical History</p>
                  <p className="text-sm">{patientData.medicalHistory}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Insurance Provider</p>
                  <p className="text-sm">{patientData.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Policy Number</p>
                  <p className="text-sm">{patientData.insurancePolicyNo}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Name</p>
                  <p className="text-sm">{patientData.emergencyContact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Phone</p>
                  <p className="text-sm">{patientData.emergencyPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Registration Date</p>
                  <p className="text-sm">{patientData.registrationDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
