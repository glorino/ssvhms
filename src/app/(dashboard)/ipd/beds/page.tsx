"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, BedDouble, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const accent = "#14b8a6"

const wards = [
  { name: "ICU", total: 10, occupied: 9 },
  { name: "General Ward", total: 40, occupied: 32 },
  { name: "Private", total: 20, occupied: 15 },
  { name: "Semi-Private", total: 30, occupied: 22 },
  { name: "Emergency", total: 10, occupied: 7 },
  { name: "Maternity", total: 15, occupied: 11 },
]

const totalBeds = wards.reduce((a, w) => a + w.total, 0)
const totalOccupied = wards.reduce((a, w) => a + w.occupied, 0)
const totalAvailable = totalBeds - totalOccupied

function getOccupancyColor(pct: number) {
  if (pct >= 90) return { bar: "#ef4444", bg: "#fef2f2", text: "#dc2626", label: "Critical" }
  if (pct >= 70) return { bar: "#f59e0b", bg: "#fffbeb", text: "#d97706", label: "High" }
  if (pct >= 50) return { bar: "#14b8a6", bg: "#f0fdfa", text: "#0d9488", label: "Moderate" }
  return { bar: "#22c55e", bg: "#f0fdf4", text: "#16a34a", label: "Low" }
}

export default function BedStatusPage() {
  return (
    <div style={{ padding: "24px", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <Link href="/ipd">
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#475569",
            }}
          >
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Bed Status Overview
          </h1>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "4px 0 0" }}>
            Real-time bed availability across all wards
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Beds", value: totalBeds, icon: BedDouble, bg: "#f0fdfa" },
          { label: "Occupied", value: totalOccupied, icon: AlertCircle, bg: "#fef2f2" },
          { label: "Available", value: totalAvailable, icon: CheckCircle, bg: "#f0fdf4" },
        ].map((s) => (
          <Card key={s.label} style={{ background: s.bg, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <CardContent style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a" }}>{s.value}</div>
                  <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{s.label}</div>
                </div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <s.icon size={22} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
        {wards.map((ward) => {
          const available = ward.total - ward.occupied
          const pct = Math.round((ward.occupied / ward.total) * 100)
          const color = getOccupancyColor(pct)

          return (
            <Card key={ward.name} style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <CardContent style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                      }}
                    >
                      <BedDouble size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>{ward.name}</h3>
                      <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" }}>{ward.total} total beds</p>
                    </div>
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background: color.bg,
                      color: color.text,
                      border: `1px solid ${color.bar}30`,
                    }}
                  >
                    {color.label} - {pct}%
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                  {[
                    { label: "Occupied", value: ward.occupied, color: "#ef4444" },
                    { label: "Available", value: available, color: "#22c55e" },
                    { label: "Occupancy", value: `${pct}%`, color: accent },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        padding: "12px",
                        borderRadius: "10px",
                        background: "#f8fafc",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "20px", fontWeight: 700, color: item.color }}>{item.value}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>Occupancy Level</span>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: color.text }}>{pct}%</span>
                  </div>
                  <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: color.bar,
                        borderRadius: "4px",
                        transition: "width 0.8s ease",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
