"use client";

import React, { useState } from "react";

interface BusinessAnalyticsTabProps {
  businessId: string;
}

export default function BusinessAnalyticsTab({ businessId }: BusinessAnalyticsTabProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>("May");
  const [selectedYear, setSelectedYear] = useState("Year");

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
    { month: "Dec", height: 22 },
  ];

  // Mock data for Statuses progress bars
  const statusData = [
    { label: "New customers", value: 28, percent: 72 },
    { label: "Returning customers", value: 28, percent: 48 },
    { label: "No-shows charged", value: 28, percent: 28 },
    { label: "No-shows waived", value: 28, percent: 28 },
    { label: "No-shows cancelled", value: 28, percent: 28 },
    { label: "Late cancellation", value: 28, percent: 28 },
    { label: "Completed", value: 28, percent: 28 },
    { label: "Cancelled by customer", value: 28, percent: 28 },
    { label: "Cancelled by business", value: 28, percent: 28 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-gray-900 animate-fadeIn">
      {/* 1. Bar Chart Container */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-semibold text-base sm:text-lg text-[#111827]">
            Bookings by Year
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option>Year</option>
              <option>2026</option>
              <option>2025</option>
            </select>
            <button className="border border-[#111111] rounded-lg px-3 py-1.5 bg-white hover:bg-gray-55 font-semibold text-[#111111] cursor-pointer">
              Apply
            </button>
            <div className="bg-[#111111] text-white px-3.5 py-1.5 rounded-md shrink-0 cursor-pointer">
              All time
            </div>
          </div>
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

      {/* 2. Statuses Progress Bars Card */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-base sm:text-lg text-[#111827] pb-2 border-b border-gray-100">
          Statuses
        </h3>
        <div className="flex flex-col gap-4.5 mt-2">
          {statusData.map((status, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-sm font-medium text-[#111827] w-[180px] shrink-0">
                {status.label}
              </span>
              <div className="flex items-center gap-4 grow w-full">
                <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-[#6366F1] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${status.percent}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-[#111827] w-6 text-right shrink-0">
                  {status.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
