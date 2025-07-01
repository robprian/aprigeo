export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("id-ID").format(amount)
}

export function parseCurrency(value: string): number {
  // Remove all non-digit characters except decimal point
  const cleanValue = value.replace(/[^\d,]/g, "").replace(",", ".")
  return Number.parseFloat(cleanValue) || 0
}
