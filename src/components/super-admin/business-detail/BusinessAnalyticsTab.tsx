"use client";

import React, { useState, useEffect } from "react";

interface BusinessAnalyticsTabProps {
  businessId: string;
}

export default function BusinessAnalyticsTab({ businessId }: BusinessAnalyticsTabProps) {
  const [animate, setAnimate] = useState(false);
  const [selectedYear, setSelectedYear] = useState("Year");

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for Bookings by Year
  const monthlyData = [
    { month: "Jan", height: 64, active: false },
    { month: "Feb", height: 88, active: false },
    { month: "Mar", height: 112, active: false },
    { month: "Apr", height: 136, active: false },
    { month: "May", height: 160, active: true },
    { month: "Jun", height: 95, active: false },
    { month: "Jul", height: 22, active: false },
    { month: "Aug", height: 76, active: false },
    { month: "Sep", height: 41, active: false },
    { month: "Oct", height: 76, active: false },
    { month: "Nov", height: 41, active: false },
    { month: "Dec", height: 22, active: false },
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
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center gap-4 w-full">
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

        {/* Monthly Bar Chart Display */}
        <div className="w-full flex items-end justify-between h-[220px] border-b border-gray-100 pb-2 mt-4 overflow-x-auto no-scrollbar gap-2 min-w-[600px]">
          {monthlyData.map((data, idx) => {
            const barHeight = animate ? `${data.height}px` : "0px";
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 flex-grow">
                {/* Display Value above bar */}
                <span className="text-[11px] font-semibold text-gray-700 h-4">
                  {data.height}
                </span>
                <div
                  className={`w-full max-w-[77.54px] rounded-t-md transition-all duration-1000 ease-out border ${
                    data.active
                      ? "bg-[#6366F1] border-[#6366F1]"
                      : "bg-[#EEF2FF] border-[#6366F1] hover:bg-indigo-100"
                  }`}
                  style={{ height: barHeight }}
                />
                <span className="text-[11px] text-gray-500 font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Statuses Progress Bars Card */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
        <h3 className="font-semibold text-base sm:text-lg text-[#111827] pb-2 border-b border-gray-100">
          Statuses
        </h3>
        <div className="flex flex-col gap-4.5 mt-2">
          {statusData.map((status, idx) => {
            const fillWidth = animate ? `${status.percent}%` : "0%";
            return (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm font-medium text-[#111827] w-[180px] shrink-0">
                  {status.label}
                </span>
                <div className="flex items-center gap-4 grow w-full">
                  <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-[#6366F1] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: fillWidth }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#111827] w-6 text-right shrink-0">
                    {status.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
