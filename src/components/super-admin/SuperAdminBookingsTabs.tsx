"use client";

import React from "react";

interface SuperAdminBookingsTabsProps {
  activeStatusFilter: "All" | "Upcoming" | "Completed" | "Cancelled" | "No-Shows";
  setActiveStatusFilter: (filter: "All" | "Upcoming" | "Completed" | "Cancelled" | "No-Shows") => void;
  counts: {
    All: number;
    Upcoming: number;
    Completed: number;
    Cancelled: number;
    "No-Shows": number;
  };
}

export default function SuperAdminBookingsTabs({
  activeStatusFilter,
  setActiveStatusFilter,
  counts
}: SuperAdminBookingsTabsProps) {
  const tabs = ["All", "Upcoming", "Completed", "Cancelled", "No-Shows"] as const;

  return (
    <div className="flex items-center gap-4 w-full border-b border-[#E5E7EB] pb-px overflow-x-auto">
      {tabs.map((filter) => {
        const isActive = activeStatusFilter === filter;
        const badgeBg =
          filter === "Upcoming"
            ? "bg-[#6366F1]"
            : filter === "Completed"
            ? "bg-[#16A34A]"
            : filter === "Cancelled"
            ? "bg-[#A31616]"
            : filter === "No-Shows"
            ? "bg-[#A36116]"
            : "bg-[#6B7280]";

        return (
          <button
            key={filter}
            onClick={() => setActiveStatusFilter(filter)}
            className={`flex items-center gap-2 pb-2.5 px-1.5 text-sm font-medium transition-all duration-150 border-b-2 whitespace-nowrap ${
              isActive
                ? "border-[#6366F1] text-[#6366F1]"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            <span>{filter}</span>
            <span className={`px-2 py-0.5 text-[11px] font-bold text-white rounded-full ${badgeBg}`}>
              {counts[filter]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
