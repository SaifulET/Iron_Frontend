export interface MemberItem {
  name: string;
  email: string;
  role: "Owner" | "Supervisor" | "Staff";
  status: "Online" | "Offline";
  avatar: string;
}

export const initialMembers: MemberItem[] = [
  { name: "Steve Herd", email: "sarah.c@vesioh.com", role: "Owner", status: "Online", avatar: "/businessDashboard/downLogo.png" },
  { name: "Steve Herd", email: "sarah.c@vesioh.com", role: "Supervisor", status: "Online", avatar: "/businessDashboard/downLogo.png" },
  { name: "Steve Herd", email: "sarah.c@vesioh.com", role: "Staff", status: "Online", avatar: "/businessDashboard/downLogo.png" },
  { name: "Steve Herd", email: "sarah.c@vesioh.com", role: "Staff", status: "Online", avatar: "/businessDashboard/downLogo.png" },
  { name: "Steve Herd", email: "sarah.c@vesioh.com", role: "Staff", status: "Online", avatar: "/businessDashboard/downLogo.png" },
  { name: "Steve Herd", email: "sarah.c@vesioh.com", role: "Staff", status: "Online", avatar: "/businessDashboard/downLogo.png" }
];

export interface CancellationRule {
  timeframe: string;
  freeOfCharge: boolean;
  percentage: number;
  label: string;
}

export const initialCancellationRules: CancellationRule[] = [
  { timeframe: "More than 72 hours", freeOfCharge: true, percentage: 0, label: "Free cancellation" },
  { timeframe: "24 - 72 hours", freeOfCharge: true, percentage: 0, label: "Free cancellation" },
  { timeframe: "12 - 24 hours", freeOfCharge: false, percentage: 0, label: "0" },
  { timeframe: "2 - 12 hours", freeOfCharge: false, percentage: 0, label: "0" },
  { timeframe: "Under 2 hours", freeOfCharge: false, percentage: 0, label: "0" }
];
