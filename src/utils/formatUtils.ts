const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function toPercentage(value: number): string {
  if (typeof value !== "number" || Number.isNaN(value)) return "0.0%";
  const percentage = value <= 1 ? value * 100 : value;
  return `${percentage.toFixed(1)}%`;
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = MONTH_LABELS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (e) {
    return isoString;
  }
}

export function toArray(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return [value].filter(Boolean);
}

export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}
