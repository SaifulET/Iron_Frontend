"use client";

import React, { useState } from "react";

export default function SuperAdminAnalyticsOverview() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>("May"); // May selected by default like the screenshot

  const statsRow1 = [
    { label: "Total Bookings", value: "87", sub: "2026 YTD" },
    { label: "Bookly Revenue", value: "€4,320", sub: "Activation fees net" },
    { label: "Customers Registered", value: "3,841", sub: "38% activated" },
    { label: "Return Rate", value: "64%", sub: "Platform average" }
  ];

  const statsRow2 = [
    { label: "New Bookings", value: "2326", sub: "Generated activation fees" },
    { label: "Active Businesses", value: "142", sub: "12 joined this year" },
    { label: "Mobile Bookings", value: "16", sub: "16% of all bookings" },
    { label: "Manual Bookings", value: "65", sub: "4% - €0 Bookly fee" }
  ];

  // Mock bar chart heights (normalized as percentages or max height of 160px)
  const monthlyData = [
    { month: "Jan", height: 64 },
    { month: "Feb", height: 88 },
    { month: "Mar", height: 112 },
    { month: "Apr", height: 136 },
    { month: "May", height: 160 },
    { month: "Jun", height: 95 },
    { month: "Jul", height: 22 },
    { month: "Aug", height: 76 },
    { month: "Sep", height: 41 },
    { month: "Oct", height: 76 },
    { month: "Nov", height: 41 },
    { month: "Dec", height: 76 }
  ];

  // Booking status breakdown segment parameters
  const statusSegments = [
    { label: "Completed", count: 31, color: "bg-[#4B9C78]" },
    { label: "Upcoming", count: 31, color: "bg-[#4E88D7]" },
    { label: "Cancelled by customer", count: 31, color: "bg-[#9EA3AE]" },
    { label: "Late cancellation", count: 31, color: "bg-[#E4A345]" },
    { label: "No-show charged", count: 31, color: "bg-[#D15650]" },
    { label: "No-show waived", count: 31, color: "bg-[#F2C981]" },
    { label: "Cancelled by business", count: 31, color: "bg-[#E87975]" },
    { label: "No-show cancelled", count: 31, color: "bg-[#D2D5DB]" },
    { label: "Manual", count: 31, color: "bg-[#214793]" }
  ];

  return (
    <div className="flex flex-col gap-6 w-full font-sans">
      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsRow1.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-gray-500">{item.label}</span>
            <span className="text-3xl font-bold text-[#195156]">{item.value}</span>
            <span className="text-xs text-gray-400 font-normal">{item.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsRow2.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-gray-500">{item.label}</span>
            <span className="text-3xl font-bold text-[#195156]">{item.value}</span>
            <span className="text-xs text-gray-400 font-normal">{item.sub}</span>
          </div>
        ))}
      </div>

      {/* Monthly Booking Volume Chart */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col w-full">
        <div className="bg-[#F5F5F5] p-4 border-b border-gray-200">
          <h3 className="font-semibold text-base text-[#111111] leading-none">
            Monthly Booking Volume - 2026
          </h3>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Chart Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-normal text-gray-900">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#EEF2FF] border border-[#6366F1] rounded shrink-0" />
              <span>Monthly bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#6366F1] rounded shrink-0" />
              <span>Selected Month / In progress</span>
            </div>
          </div>

          {/* Chart Visualizer bars */}
          <div className="flex items-end justify-between gap-1 sm:gap-2 h-[250px] border-b border-gray-200 pb-2 px-2 overflow-x-auto select-none pt-16">
            {monthlyData.map((d, idx) => {
              const isSelected = selectedMonth === d.month;
              // derive volume from height for display
              const volume = d.height * 12;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedMonth(selectedMonth === d.month ? null : d.month)}
                  className="flex flex-col items-center flex-1 min-w-[38px] group relative cursor-pointer"
                >
                  {/* Touchable Tooltip popover */}
                  {isSelected && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-semibold py-1.5 px-2.5 rounded-lg shadow-lg z-10 whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-gray-900 transition-all text-center">
                      {volume} Bookings
                    </div>
                  )}

                  {/* Interactive Bar */}
                  <div
                    style={{ height: `${d.height}px` }}
                    className={`w-full rounded-t transition-all duration-200 transform hover:scale-x-105 origin-bottom ${
                      isSelected
                        ? "bg-[#6366F1] shadow-[0px_4px_12px_rgba(99,102,241,0.4)]"
                        : "bg-[#EEF2FF] border border-[#6366F1] hover:bg-[#EEF2FF]/80"
                    }`}
                  />
                  <span className={`text-[11px] mt-2 font-medium transition-colors ${
                    isSelected ? "text-[#6366F1] font-bold" : "text-gray-500"
                  }`}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking statuses proportion panel */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col w-full">
        <div className="bg-[#F5F5F5] p-4 border-b border-gray-200">
          <h3 className="font-semibold text-base text-[#111111] leading-none">
            All Booking statuses - Proportions of 5453 total bookings this year
          </h3>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Proportions segment line bar */}
          <div className="flex h-5 w-full rounded-md overflow-hidden shrink-0">
            {statusSegments.map((seg, idx) => (
              <div
                key={idx}
                className={`${seg.color} h-full flex-1 transition-opacity hover:opacity-90`}
                title={`${seg.label}: ${seg.count}`}
              />
            ))}
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 pt-2">
            {statusSegments.map((seg, idx) => (
              <div key={idx} className="flex items-center gap-3 text-[13px] font-medium text-gray-500">
                <span className={`w-3.5 h-3.5 rounded ${seg.color} shrink-0`} />
                <span className="truncate flex-1">{seg.label}</span>
                <span className="font-bold text-gray-900 shrink-0">{seg.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
