"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, BellIcon } from "@hugeicons/core-free-icons";

interface SuperAdminHeaderProps {
  isCollapsed: boolean;
}

export default function SuperAdminHeader({ isCollapsed }: SuperAdminHeaderProps) {
  return (
    <header
      className={`fixed top-0 h-[70px] bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-20 transition-all duration-300 ${
        isCollapsed ? "left-[72px] w-[calc(100%-72px)]" : "left-[240px] w-[calc(100%-240px)]"
      }`}
    >
      {/* Search Input Container */}
      <div className="relative w-[400px] h-10">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <HugeiconsIcon icon={Search01Icon} className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Search businesses, customers, bookings..."
          className="w-full h-full pl-10 pr-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-sm text-[#111111] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2E9DA7]"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell Button */}
        <div className="relative w-9 h-9">
          <button className="w-full h-full flex items-center justify-center bg-white border border-[#E8E8E6] rounded-lg text-[#5F5E5A] hover:bg-gray-50">
            <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px]" />
          </button>
          {/* Notification Badge */}
          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[17px] bg-[#E24B4A] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-semibold text-white px-1">
            5
          </span>
        </div>

        {/* User Initials Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-[#4338CA] text-xs font-bold font-sans">
          GM
        </div>
      </div>
    </header>
  );
}
