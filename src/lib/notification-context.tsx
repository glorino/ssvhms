"use client"
import React, { createContext, useContext, useState, ReactNode } from "react"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
  channel: "system" | "email" | "sms"
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => void
  markAsRead: (id: string) => void
  markAllRead: () => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const initialNotifications: Notification[] = [
  { id: "1", title: "New patient registered", message: "Rajesh Kumar has been added to the system", type: "info", read: false, createdAt: new Date().toISOString(), channel: "system" },
  { id: "2", title: "Appointment confirmed", message: "Dr. Priya Sharma - 10:00 AM appointment confirmed", type: "success", read: false, createdAt: new Date().toISOString(), channel: "system" },
  { id: "3", title: "Lab results ready", message: "CBC test results for Anita Patel are ready", type: "info", read: true, createdAt: new Date().toISOString(), channel: "email" },
  { id: "4", title: "Payment received", message: "₦45,000 payment received from Rajesh Kumar", type: "success", read: true, createdAt: new Date().toISOString(), channel: "sms" },
  { id: "5", title: "Low stock alert", message: "Amoxicillin 500mg is running low (12 units remaining)", type: "warning", read: true, createdAt: new Date().toISOString(), channel: "system" },
  { id: "6", title: "Bed status update", message: "ICU bed 03 is now available", type: "info", read: true, createdAt: new Date().toISOString(), channel: "system" },
]

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const addNotification = (n: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotif: Notification = {
      ...n,
      id: Date.now().toString(36),
      read: false,
      createdAt: new Date().toISOString(),
    }
    setNotifications(prev => [newNotif, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider")
  return ctx
}
