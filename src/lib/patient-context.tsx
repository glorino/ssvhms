"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface PatientVitals {
  temperature?: string
  bloodPressure?: string
  heartRate?: string
  weight?: string
  height?: string
  oxygenSaturation?: string
  recordedAt?: string
  recordedBy?: string
}

export interface PatientVisit {
  id: string
  date: string
  type: "OPD" | "IPD" | "Emergency"
  doctor: string
  department: string
  symptoms: string
  diagnosis: string
  prescription: string
  notes: string
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled"
}

export interface PatientLabResult {
  id: string
  testName: string
  category: string
  result: string
  status: "Pending" | "In Progress" | "Completed"
  date: string
  orderedBy: string
  notes: string
}

export interface PatientBill {
  id: string
  date: string
  items: string
  amount: number
  paid: number
  due: number
  status: "Paid" | "Pending" | "Partial"
}

export interface Patient {
  id: string
  uniqueNumber: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  address: string
  city: string
  state: string
  emergencyContact: string
  emergencyPhone: string
  insuranceProvider: string
  insuranceNumber: string
  allergies: string
  medicalHistory: string
  registeredBy: string
  registeredAt: string
  status: "Active" | "Inactive" | "Admitted"
  vitals: PatientVitals
  visits: PatientVisit[]
  labResults: PatientLabResult[]
  bills: PatientBill[]
  prescriptions: string[]
}

interface PatientContextType {
  patients: Patient[]
  addPatient: (patient: Omit<Patient, "id" | "uniqueNumber" | "visits" | "labResults" | "bills" | "prescriptions">) => Patient
  updatePatient: (id: string, data: Partial<Patient>) => void
  updateVitals: (id: string, vitals: PatientVitals) => void
  addVisit: (patientId: string, visit: Omit<PatientVisit, "id">) => void
  addLabResult: (patientId: string, result: Omit<PatientLabResult, "id">) => void
  addBill: (patientId: string, bill: Omit<PatientBill, "id">) => void
  addPrescription: (patientId: string, prescription: string) => void
  getPatientByNumber: (number: string) => Patient | undefined
  getPatientById: (id: string) => Patient | undefined
  searchPatients: (query: string) => Patient[]
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

function generateId() {
  return "PID" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4)
}

function generateUniqueNumber() {
  const year = new Date().getFullYear()
  const seq = Math.floor(Math.random() * 9000) + 1000
  return `SSV-${year}-${seq}`
}

const initialPatients: Patient[] = [
  {
    id: "PID001", uniqueNumber: "SSV-2026-1001",
    firstName: "Rajesh", lastName: "Kumar", email: "rajesh@email.com", phone: "+234 801 234 5678",
    dateOfBirth: "1985-03-15", gender: "Male", bloodGroup: "O+", address: "12 Marina Road",
    city: "Lagos", state: "Lagos", emergencyContact: "Sunita Kumar", emergencyPhone: "+234 802 345 6789",
    insuranceProvider: "NHIS", insuranceNumber: "NHIS-2024-5678", allergies: "Penicillin",
    medicalHistory: "Hypertension, Type 2 Diabetes", registeredBy: "Receptionist", registeredAt: "2026-01-15",
    status: "Active",
    vitals: { temperature: "36.8°C", bloodPressure: "130/85 mmHg", heartRate: "78 bpm", weight: "78 kg", height: "172 cm", oxygenSaturation: "98%", recordedAt: "2026-08-07 09:00", recordedBy: "Nurse Anita" },
    visits: [
      { id: "V001", date: "2026-08-07", type: "OPD", doctor: "Dr. Priya Sharma", department: "Cardiology", symptoms: "Chest pain, shortness of breath", diagnosis: "Mild angina", prescription: "Aspirin 75mg daily", notes: "Follow up in 2 weeks", status: "Completed" },
    ],
    labResults: [
      { id: "L001", testName: "Complete Blood Count", category: "Hematology", result: "Normal", status: "Completed", date: "2026-08-07", orderedBy: "Dr. Priya Sharma", notes: "All values within normal range" },
      { id: "L002", testName: "Lipid Profile", category: "Biochemistry", result: "Abnormal", status: "Completed", date: "2026-08-07", orderedBy: "Dr. Priya Sharma", notes: "LDL slightly elevated" },
    ],
    bills: [
      { id: "B001", date: "2026-08-07", items: "Consultation, CBC, Lipid Profile", amount: 45000, paid: 45000, due: 0, status: "Paid" },
    ],
    prescriptions: ["Aspirin 75mg - Once daily", "Atorvastatin 20mg - Once daily at night"],
  },
  {
    id: "PID002", uniqueNumber: "SSV-2026-1002",
    firstName: "Anita", lastName: "Patel", email: "anita@email.com", phone: "+234 803 456 7890",
    dateOfBirth: "1990-07-22", gender: "Female", bloodGroup: "A+", address: "45 Victoria Island",
    city: "Lagos", state: "Lagos", emergencyContact: "Raj Patel", emergencyPhone: "+234 804 567 8901",
    insuranceProvider: "Leadway Health", insuranceNumber: "LH-2025-1234", allergies: "None",
    medicalHistory: "None", registeredBy: "Nurse Priyanka", registeredAt: "2026-02-10",
    status: "Active",
    vitals: { temperature: "37.2°C", bloodPressure: "120/78 mmHg", heartRate: "72 bpm", weight: "62 kg", height: "160 cm", oxygenSaturation: "99%", recordedAt: "2026-08-07 10:30", recordedBy: "Nurse Priyanka" },
    visits: [
      { id: "V002", date: "2026-08-07", type: "OPD", doctor: "Dr. Amit Singh", department: "Orthopedics", symptoms: "Lower back pain for 3 weeks", diagnosis: "Lumbar strain", prescription: "Ibuprofen 400mg TDS", notes: "Physiotherapy recommended", status: "Completed" },
    ],
    labResults: [
      { id: "L003", testName: "X-Ray Lumbar Spine", category: "Radiology", result: "No fracture detected", status: "Completed", date: "2026-08-07", orderedBy: "Dr. Amit Singh", notes: "Mild degenerative changes" },
    ],
    bills: [
      { id: "B002", date: "2026-08-07", items: "Consultation, X-Ray", amount: 25000, paid: 25000, due: 0, status: "Paid" },
    ],
    prescriptions: ["Ibuprofen 400mg - Three times daily after meals"],
  },
  {
    id: "PID003", uniqueNumber: "SSV-2026-1003",
    firstName: "Suresh", lastName: "Reddy", email: "suresh@email.com", phone: "+234 805 678 9012",
    dateOfBirth: "1978-11-08", gender: "Male", bloodGroup: "B-", address: "78 Ikeja GRA",
    city: "Lagos", state: "Lagos", emergencyContact: "Lakshmi Reddy", emergencyPhone: "+234 806 789 0123",
    insuranceProvider: "NHIS", insuranceNumber: "NHIS-2024-9012", allergies: "Sulfa drugs",
    medicalHistory: "Asthma", registeredBy: "Receptionist", registeredAt: "2026-03-05",
    status: "Active",
    vitals: { temperature: "36.5°C", bloodPressure: "118/75 mmHg", heartRate: "68 bpm", weight: "82 kg", height: "178 cm", oxygenSaturation: "97%", recordedAt: "2026-08-07 11:00", recordedBy: "Nurse Anita" },
    visits: [
      { id: "V003", date: "2026-08-07", type: "OPD", doctor: "Dr. Neha Gupta", department: "Neurology", symptoms: "Recurrent headaches, dizziness", diagnosis: "Tension headache", prescription: "Paracetamol 500mg TDS", notes: "Stress management advised", status: "Completed" },
    ],
    labResults: [],
    bills: [
      { id: "B003", date: "2026-08-07", items: "Consultation", amount: 15000, paid: 15000, due: 0, status: "Paid" },
    ],
    prescriptions: ["Paracetamol 500mg - Three times daily as needed"],
  },
  {
    id: "PID004", uniqueNumber: "SSV-2026-1004",
    firstName: "Priya", lastName: "Verma", email: "priya@email.com", phone: "+234 807 890 1234",
    dateOfBirth: "1995-05-30", gender: "Female", bloodGroup: "AB+", address: "23 Lekki Phase 1",
    city: "Lagos", state: "Lagos", emergencyContact: "Vikram Verma", emergencyPhone: "+234 808 901 2345",
    insuranceProvider: "Hygeia", insuranceNumber: "HYG-2025-5678", allergies: "None",
    medicalHistory: "None", registeredBy: "Nurse Priyanka", registeredAt: "2026-04-12",
    status: "Active",
    vitals: { temperature: "36.9°C", bloodPressure: "115/72 mmHg", heartRate: "74 bpm", weight: "55 kg", height: "158 cm", oxygenSaturation: "99%", recordedAt: "2026-08-07 09:30", recordedBy: "Nurse Priyanka" },
    visits: [],
    labResults: [],
    bills: [],
    prescriptions: [],
  },
  {
    id: "PID005", uniqueNumber: "SSV-2026-1005",
    firstName: "Mohammed", lastName: "Ali", email: "mohammed@email.com", phone: "+234 809 012 3456",
    dateOfBirth: "1982-01-18", gender: "Male", bloodGroup: "O-", address: "56 Surulere",
    city: "Lagos", state: "Lagos", emergencyContact: "Fatima Ali", emergencyPhone: "+234 810 123 4567",
    insuranceProvider: "NHIS", insuranceNumber: "NHIS-2024-3456", allergies: "Ibuprofen",
    medicalHistory: "Gastritis", registeredBy: "Receptionist", registeredAt: "2026-05-20",
    status: "Active",
    vitals: { temperature: "37.0°C", bloodPressure: "125/80 mmHg", heartRate: "76 bpm", weight: "85 kg", height: "175 cm", oxygenSaturation: "98%", recordedAt: "2026-08-07 10:00", recordedBy: "Nurse Anita" },
    visits: [
      { id: "V005", date: "2026-08-06", type: "OPD", doctor: "Dr. Sanjay Mehta", department: "General Medicine", symptoms: "Stomach pain, nausea", diagnosis: "Acute gastritis", prescription: "Omeprazole 20mg BD", notes: "Avoid spicy food", status: "Completed" },
    ],
    labResults: [
      { id: "L005", testName: "Urine Routine", category: "Clinical Pathology", result: "Normal", status: "Completed", date: "2026-08-06", orderedBy: "Dr. Sanjay Mehta", notes: "No abnormality detected" },
    ],
    bills: [
      { id: "B005", date: "2026-08-06", items: "Consultation, Urine Test", amount: 18000, paid: 10000, due: 8000, status: "Partial" },
    ],
    prescriptions: ["Omeprazole 20mg - Once daily before breakfast"],
  },
  {
    id: "PID006", uniqueNumber: "SSV-2026-1006",
    firstName: "Deepika", lastName: "Singh", email: "deepika@email.com", phone: "+234 811 234 5678",
    dateOfBirth: "1988-09-12", gender: "Female", bloodGroup: "A-", address: "90 Yaba",
    city: "Lagos", state: "Lagos", emergencyContact: "Arun Singh", emergencyPhone: "+234 812 345 6789",
    insuranceProvider: "Leadway Health", insuranceNumber: "LH-2025-9012", allergies: "Latex",
    medicalHistory: "Gestational diabetes (previous pregnancy)", registeredBy: "Nurse Priyanka", registeredAt: "2026-06-01",
    status: "Active",
    vitals: { temperature: "36.7°C", bloodPressure: "110/70 mmHg", heartRate: "70 bpm", weight: "68 kg", height: "165 cm", oxygenSaturation: "99%", recordedAt: "2026-08-07 08:45", recordedBy: "Nurse Priyanka" },
    visits: [],
    labResults: [],
    bills: [],
    prescriptions: [],
  },
]

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("ssvhms_patients")
    if (stored) {
      try { setPatients(JSON.parse(stored)) } catch { setPatients(initialPatients) }
    } else {
      setPatients(initialPatients)
    }
  }, [])

  useEffect(() => {
    if (patients.length > 0) {
      localStorage.setItem("ssvhms_patients", JSON.stringify(patients))
    }
  }, [patients])

  const addPatient = (data: Omit<Patient, "id" | "uniqueNumber" | "visits" | "labResults" | "bills" | "prescriptions">) => {
    const newPatient: Patient = {
      ...data,
      id: generateId(),
      uniqueNumber: generateUniqueNumber(),
      visits: [],
      labResults: [],
      bills: [],
      prescriptions: [],
    }
    setPatients(prev => [...prev, newPatient])
    return newPatient
  }

  const updatePatient = (id: string, data: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  const updateVitals = (id: string, vitals: PatientVitals) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, vitals: { ...p.vitals, ...vitals } } : p))
  }

  const addVisit = (patientId: string, visit: Omit<PatientVisit, "id">) => {
    const newVisit: PatientVisit = { ...visit, id: "V" + Date.now().toString(36) }
    setPatients(prev => prev.map(p => p.id === patientId ? { ...p, visits: [...p.visits, newVisit] } : p))
  }

  const addLabResult = (patientId: string, result: Omit<PatientLabResult, "id">) => {
    const newResult: PatientLabResult = { ...result, id: "L" + Date.now().toString(36) }
    setPatients(prev => prev.map(p => p.id === patientId ? { ...p, labResults: [...p.labResults, newResult] } : p))
  }

  const addBill = (patientId: string, bill: Omit<PatientBill, "id">) => {
    const newBill: PatientBill = { ...bill, id: "B" + Date.now().toString(36) }
    setPatients(prev => prev.map(p => p.id === patientId ? { ...p, bills: [...p.bills, newBill] } : p))
  }

  const addPrescription = (patientId: string, prescription: string) => {
    setPatients(prev => prev.map(p => p.id === patientId ? { ...p, prescriptions: [...p.prescriptions, prescription] } : p))
  }

  const getPatientByNumber = (number: string) => patients.find(p => p.uniqueNumber === number)
  const getPatientById = (id: string) => patients.find(p => p.id === id)
  const searchPatients = (query: string) => {
    const q = query.toLowerCase()
    return patients.filter(p =>
      p.firstName.toLowerCase().includes(q) ||
      p.lastName.toLowerCase().includes(q) ||
      p.uniqueNumber.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.email.toLowerCase().includes(q)
    )
  }

  return (
    <PatientContext.Provider value={{
      patients, addPatient, updatePatient, updateVitals,
      addVisit, addLabResult, addBill, addPrescription,
      getPatientByNumber, getPatientById, searchPatients,
    }}>
      {children}
    </PatientContext.Provider>
  )
}

export function usePatients() {
  const ctx = useContext(PatientContext)
  if (!ctx) throw new Error("usePatients must be used within PatientProvider")
  return ctx
}
