export function filterByPeriod<T extends Record<string, any>>(
  data: T[],
  period: string,
  dateField: string = "date"
): T[] {
  const now = new Date()
  const today = now.toISOString().split("T")[0]
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0]

  switch (period) {
    case "today":
      return data.filter((d) => (d[dateField] || "").startsWith(today))
    case "week":
      return data.filter((d) => (d[dateField] || "") >= weekAgo)
    case "month":
      return data.filter((d) => (d[dateField] || "") >= monthStart)
    default:
      return data
  }
}
