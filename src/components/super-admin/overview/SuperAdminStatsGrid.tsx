"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SaveMoneyDollarIcon,
  Store01Icon,
  UserGroup03Icon,
  Calendar01Icon,
  Analytics01Icon
} from "@hugeicons/core-free-icons";

export default function SuperAdminStatsGrid() {
  const row1Stats = [
    {
      title: "Total Businesses",
      value: "142",
      sub: "Active: 118 · Pending: 7",
      color: "text-[#195156]"
    },
    {
      title: "Total Customers",
      value: "3,841",
      sub: "New this month: 214",
      color: "text-[#195156]"
    },
    {
      title: "Total Bookings",
      value: "87",
      sub: "New: 52 · Returning: 35",
      color: "text-[#195156]"
    },
    {
      title: "Pending Payouts",
      value: "€4,320",
      sub: "18 Business due 1 July 2026",
      color: "text-[#195156]"
    }
  ];

  const row2Stats = [
    {
      title: "Returning Customer Rate",
      value: "50%",
      sub: "Across all businesses",
      icon: Analytics01Icon
    },
    {
      title: "Platform Revenue",
      value: "€4,320",
      sub: "This period · activation fees + retained cancellation fees",
      icon: SaveMoneyDollarIcon
    },
    {
      title: "Platform No-show Rate",
      value: "4.2%",
      sub: "Across all businesses",
      icon: Analytics01Icon
    },
    {
      title: "Travel Fees Facilitated",
      value: "€4,320",
      sub: "38 Mobile businesses · 100% goes to the business - Bookly takes €0",
      icon: Store01Icon
    }
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Row 1 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {row1Stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 min-h-[120px]"
          >
            <span className="font-sans font-medium text-[13px] text-gray-500 leading-4">{stat.title}</span>
            <span className={`font-sans font-bold text-32px leading-[35px] ${stat.color}`}>{stat.value}</span>
            <span className="font-sans font-normal text-xs text-gray-400 mt-auto leading-4">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Row 2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {row2Stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 min-h-[139px]"
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-sans font-medium text-[13px] text-gray-500 leading-4">{stat.title}</span>
              <HugeiconsIcon icon={stat.icon} className="w-5 h-5 text-gray-400" />
            </div>
            <span className="font-sans font-bold text-32px leading-[35px] text-[#195156]">{stat.value}</span>
            <span className="font-sans font-normal text-xs text-gray-400 leading-4 mt-auto">{stat.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
