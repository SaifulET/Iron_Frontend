"use client";

import React from "react";

interface AnalyticsBarChartProps {
  selectedYear: string;
  setSelectedYear: (val: string) => void;
  selectedMonth: string | null;
  setSelectedMonth: (val: string | null) => void;
  monthlyData: Array<{ month: string; height: number }>;
}

export default function AnalyticsBarChart({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  monthlyData,
}: AnalyticsBarChartProps) {
  return (
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
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-semibold py-1.5 px-4 rounded-lg shadow-lg z-10 whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-gray-900 transition-all text-center">
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
  );
}
