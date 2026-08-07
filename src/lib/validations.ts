import { z } from "zod"

export const patientSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  emergencyContact: z.string().min(2, "Emergency contact name is required"),
  emergencyPhone: z.string().min(10, "Emergency phone must be at least 10 digits"),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  allergies: z.string().optional(),
  medicalHistory: z.string().optional(),
})

export const vitalsSchema = z.object({
  temperature: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid temperature"),
  bloodPressure: z.string().regex(/^\d+\/\d+$/, "Format: 120/80"),
  heartRate: z.string().regex(/^\d+$/, "Must be a number"),
  weight: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid weight"),
  height: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid height"),
  oxygenSaturation: z.string().regex(/^\d+(\.\d+)?$/, "Must be a valid percentage"),
})

export const visitSchema = z.object({
  department: z.string().min(1, "Department is required"),
  symptoms: z.string().min(5, "Please describe symptoms"),
  diagnosis: z.string().min(5, "Please enter diagnosis"),
  prescription: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["Scheduled", "In Progress", "Completed"]),
})

export const labResultSchema = z.object({
  testName: z.string().min(2, "Test name is required"),
  category: z.string().min(1, "Category is required"),
  notes: z.string().optional(),
})

export const prescriptionSchema = z.object({
  prescriptionText: z.string().min(5, "Prescription must be at least 5 characters"),
})

export const appointmentSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  doctor: z.string().min(1, "Doctor is required"),
  department: z.string().min(1, "Department is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  reason: z.string().min(5, "Reason for visit is required"),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
})

export const billSchema = z.object({
  patient: z.string().min(1, "Patient is required"),
  billType: z.string().min(1, "Bill type is required"),
  items: z.array(z.object({
    name: z.string().min(1, "Item name is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unitPrice: z.number().min(0, "Price cannot be negative"),
  })).min(1, "At least one bill item is required"),
  discount: z.number().min(0, "Discount cannot be negative").optional(),
  tax: z.number().min(0, "Tax cannot be negative").max(100, "Tax cannot exceed 100%").optional(),
})

export type PatientFormData = z.infer<typeof patientSchema>
export type VitalsFormData = z.infer<typeof vitalsSchema>
export type VisitFormData = z.infer<typeof visitSchema>
export type LabResultFormData = z.infer<typeof labResultSchema>
export type PrescriptionFormData = z.infer<typeof prescriptionSchema>
export type AppointmentFormData = z.infer<typeof appointmentSchema>
export type BillFormData = z.infer<typeof billSchema>
