"use client";

import React from "react";

export default function SuperAdminRecentActivity() {
  const activities = [
    {
      text: "New business application received — ",
      highlight: "Glam Studio Nicosia",
      time: "2 min ago",
      dotBg: "bg-orange-500"
    },
    {
      text: "Business approved — ",
      highlight: "Lara Beauty Bar",
      time: "15 min ago",
      dotBg: "bg-emerald-500"
    },
    {
      text: "No-show charged — ",
      highlight: "€12.00 for booking #BK-2847",
      highlightColor: "text-blue-600",
      time: "34 min ago",
      dotBg: "bg-rose-500"
    },
    {
      text: "Cancellation warning flag — ",
      highlight: "Chic Hair Limassol reached 3 this month",
      time: "1 hr ago",
      dotBg: "bg-orange-500"
    },
    {
      text: "SEPA payout marked as sent — ",
      highlight: "€86.50 to Nails By Maria",
      highlightColor: "text-blue-600",
      time: "2 hr ago",
      dotBg: "bg-emerald-500"
    },
    {
      text: "New customer registered — ",
      highlight: "Andri Petrou",
      time: "2 hr ago",
      dotBg: "bg-blue-500"
    },
    {
      text: "Cancellation review flag — ",
      highlight: "TopCut Barbers reached 5 this month",
      highlightColor: "text-blue-600",
      time: "3 hr ago",
      dotBg: "bg-rose-500"
    },
    {
      text: "No-show waived — ",
      highlight: "Booking #BK-2831 waived by Zen Spa Larnaca",
      highlightColor: "text-blue-600",
      time: "4 hr ago",
      dotBg: "bg-neutral-400"
    },
    {
      text: "Promo code created — ",
      highlight: "SUMMER25 (25% off, 100 uses)",
      highlightColor: "text-blue-600",
      time: "5 hr ago",
      dotBg: "bg-blue-500"
    },
    {
      text: "Customer account deleted — ",
      highlight: "account data erased, phone retained in hashed blocklist",
      time: "6 hr ago",
      dotBg: "bg-neutral-400"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h4 className="font-sans font-semibold text-lg text-[#111827]">Recent Activity</h4>
        <button className="font-sans text-xs font-semibold text-[#195156] hover:underline flex items-center gap-1">
          View all <span>→</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {activities.map((act, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 font-sans text-xs pb-3 border-b border-gray-50 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${act.dotBg} shrink-0`} />
              <p className="text-gray-600">
                {act.text}
                <span className={`font-semibold ${act.highlightColor || "text-gray-900"}`}>{act.highlight}</span>
              </p>
            </div>
            <span className="text-gray-400 text-[11px] shrink-0 font-medium">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
