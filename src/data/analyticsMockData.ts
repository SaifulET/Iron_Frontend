export interface MetricCardData {
  title: string;
  value: string;
  info: string;
  infoColor: string; // Tailwind class
  valueColor?: string; // Optional custom value text color
  bgColor?: string;
  borderColor?: string;
}

export interface ServiceBookingItem {
  name: string;
  count: number;
  maxCount: number;
}

export interface BookingStatusItem {
  status: string;
  count: number;
  maxCount: number;
  color: string; // Hex color or Tailwind class
}

export const mockMetricCardsTop: MetricCardData[] = [
  {
    title: "TOTAL BOOKINGS",
    value: "147",
    info: "+18% vs last month",
    infoColor: "text-[#4FA17F]"
  },
  {
    title: "NEW CUSTOMERS",
    value: "34",
    info: "First time at your business",
    infoColor: "text-[#3F413D]",
    valueColor: "text-[#51A482]"
  },
  {
    title: "RETURNING CUSTOMERS",
    value: "113",
    info: "No cost to you",
    infoColor: "text-[#3F413D]",
    valueColor: "text-[#51A482]"
  }
];

export const mockMetricCardsBottom: MetricCardData[] = [
  {
    title: "COMPLETION RATE",
    value: "94%",
    info: "6 no-shows",
    infoColor: "text-[#B24D45]"
  },
  {
    title: "NO-SHOW RATE",
    value: "4.1%",
    info: "6 charged automatically",
    infoColor: "text-[#B24D45]",
    valueColor: "text-[#A9443F]"
  },
  {
    title: "AVG. BOOKING VALUE",
    value: "€68",
    info: "+€4 vs last month",
    infoColor: "text-[#4FA17F]"
  },
  {
    title: "REVENUE RECOVERED",
    value: "€186",
    info: "No-shows & cancellations · yours",
    infoColor: "text-[#377B65]",
    valueColor: "text-[#2E775F]",
    bgColor: "bg-[#DFF2EB]",
    borderColor: "border-[#B8DED0]"
  }
];

export const mockTopServices: ServiceBookingItem[] = [
  { name: "Manicure & Gel", count: 31, maxCount: 31 },
  { name: "Bridal Make-up", count: 23, maxCount: 31 },
  { name: "Lash Extensions", count: 18, maxCount: 31 },
  { name: "Full Make-up", count: 14, maxCount: 31 },
  { name: "Lash Lift & Tint", count: 12, maxCount: 31 }
];

export const mockBookingsByStatus: BookingStatusItem[] = [
  { status: "Completed", count: 129, maxCount: 129, color: "#52A47F" },
  { status: "Cancelled by customer", count: 5, maxCount: 129, color: "#ECA747" },
  { status: "Cancelled by business", count: 3, maxCount: 129, color: "#9B6D2E" },
  { status: "Late cancellation", count: 4, maxCount: 129, color: "#8572D7" },
  { status: "No-show · charged", count: 4, maxCount: 129, color: "#C84F49" },
  { status: "No-show · waived", count: 2, maxCount: 129, color: "#AFE4D3" },
  { status: "No-show · cancelled", count: 2, maxCount: 129, color: "#AFE4D3" }
];

export const heatmapData = [
  // Row 1
  ["#A7D5DD", "#A7D5DD", "#A7D5DD", "#4F95A1", "#0F141A", "#0F141A", "#F4F2ED"],
  // Row 2
  ["#DEEFF2", "#4F95A1", "#A7D5DD", "#4F95A1", "#0F141A", "#0F141A", "#F4F2ED"],
  // Row 3
  ["#A7D5DD", "#0F141A", "#A7D5DD", "#DEEFF2", "#4F95A1", "#0F141A", "#F4F2ED"]
];
