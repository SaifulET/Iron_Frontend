"use client";

import React from "react";

interface SuperAdminBusinessesTabsProps {
  activeStatusFilter: "All" | "Approved" | "Pending" | "Warning" | "Suspended";
  setActiveStatusFilter: (filter: "All" | "Approved" | "Pending" | "Warning" | "Suspended") => void;
  counts: {
    All: number;
    Approved: number;
    Pending: number;
    Warning: number;
    Suspended: number;
  };
}

export default function SuperAdminBusinessesTabs({
  activeStatusFilter,
  setActiveStatusFilter,
  counts
}: SuperAdminBusinessesTabsProps) {
  const tabs = ["All", "Approved", "Pending", "Warning", "Suspended"] as const;

  return (
    <div className="flex items-center gap-4 w-full border-b border-[#E5E7EB] pb-px overflow-x-auto">
      {tabs.map((filter) => {
        const isActive = activeStatusFilter === filter;
        const badgeBg =
          filter === "Approved"
            ? "bg-[#16A34A]"
            : filter === "Pending"
            ? "bg-[#D97706]"
            : filter === "Warning"
            ? "bg-[#DC2626]"
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
