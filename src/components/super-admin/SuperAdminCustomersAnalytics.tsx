"use client";

import React, { useState, useEffect } from "react";

export default function SuperAdminCustomersAnalytics() {
  const [animate, setAnimate] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>("May");

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Registered total", value: "620", sub: "All time on platform" },
    { label: "Activation rate", value: "39.8%", sub: "Placed >= 1 booking" },
    { label: "Dormant now", value: "373", sub: "Never booked - act now" },
  ];

  const monthlyData = [
    { month: "Jan", height: 45 },
    { month: "Feb", height: 60 },
    { month: "Mar", height: 80 },
    { month: "Apr", height: 95 },
    { month: "May", height: 130 },
    { month: "Jun", height: 50 },
    { month: "Jul", height: 35 },
    { month: "Aug", height: 55 },
    { month: "Sep", height: 42 },
    { month: "Oct", height: 55 },
    { month: "Nov", height: 68 },
    { month: "Dec", height: 30 },
  ];

  const unsubReasons = [
    { reason: "Too many emails", count: 85, pct: 45 },
    { reason: "Not relevant to me", count: 52, pct: 28 },
    { reason: "Didn't recognise Bookly", count: 28, pct: 15 },
    { reason: "Prefer SMS only", count: 18, pct: 10 },
    { reason: "Other", count: 4, pct: 2 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full font-sans animate-fadeIn">
      {/* Customer Funnel Box */}
      <div className="bg-white border border-[#E1DED6] rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="bg-[#F5F5F5] py-3.5 px-5 border-b border-[#E1DED6]">
          <h4 className="font-semibold text-lg text-[#282A27]">Customer funnel to Bookly</h4>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {/* Registered on Bookly */}
          <div className="bg-[#E8F1FA] rounded-xl p-4 flex items-center gap-5 border border-[#D5E6F7]">
            <div className="w-16 h-16 rounded-full bg-[#2F5EA0] flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
              620
            </div>
            <div>
              <h5 className="font-bold text-xl text-[#1E4378]">Registered on Bookly</h5>
              <p className="text-sm font-medium text-[#1E4378]/90 mt-1">Created an account - 100% of the funnel</p>
            </div>
          </div>

          {/* Activated */}
          <div className="bg-[#E5F5EF] rounded-xl p-4 flex items-center gap-5 border border-[#D1EFE4]">
            <div className="w-16 h-16 rounded-full bg-[#326D58] flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
              247
            </div>
            <div>
              <h5 className="font-bold text-xl text-[#224F42]">Activated - placed at least 1 booking</h5>
              <p className="text-sm font-medium text-[#224F42]/90 mt-1">39.8% activation rate - 247 of 620 registered customers booked</p>
            </div>
          </div>

          {/* Retained */}
          <div className="bg-[#E5F5EF] rounded-xl p-4 flex items-center gap-5 border border-[#D1EFE4]">
            <div className="w-16 h-16 rounded-full bg-[#4B9C78] flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
              147
            </div>
            <div>
              <h5 className="font-bold text-xl text-[#224F42]">Retained - booked more than once</h5>
              <p className="text-sm font-medium text-[#224F42]/90 mt-1">59.5% activated customers returned - 147 of 247 are now repeat customers</p>
            </div>
          </div>

          {/* Warning Alert */}
          <div className="bg-[#F8EFDC] rounded-xl p-4 flex items-start gap-3.5 border border-[#F3E2C4]">
            {/* Info Icon */}
            <svg
              className="w-6 h-6 text-[#5D3A13] shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h5 className="font-bold text-lg text-[#5D3A13]">
                373 dormant customers - registered but never booked (60.2%)
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col justify-between min-h-[110px] transition-all duration-200 hover:shadow-md"
          >
            <span className="text-[13px] font-medium text-gray-500">{stat.label}</span>
            <span className="text-3xl font-bold text-[#195156] mt-2 mb-1">{stat.value}</span>
            <span className="text-xs text-gray-400 font-normal">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Monthly Registrations Chart */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col w-full">
        <div className="bg-[#F5F5F5] p-4 border-b border-gray-200">
          <h3 className="font-semibold text-base text-[#111111]">
            New customer registrations - Monthly 2026
          </h3>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Chart Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-normal text-gray-900">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#EEF2FF] border border-[#6366F1] rounded shrink-0" />
              <span>New registrations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-[#6366F1] rounded shrink-0" />
              <span>May 2026 (selected / peak month)</span>
            </div>
          </div>

          {/* Chart Visualizer bars */}
          <div className="flex items-end justify-between gap-1 sm:gap-2 h-[250px] border-b border-gray-200 pb-2 px-2 overflow-x-auto select-none pt-16">
            {monthlyData.map((d, idx) => {
              const isSelected = selectedMonth === d.month;
              const barHeight = animate ? d.height : 0;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedMonth(selectedMonth === d.month ? null : d.month)}
                  className="flex flex-col items-center flex-1 min-w-[38px] group relative cursor-pointer"
                >
                  {/* Touchable Tooltip popover */}
                  {isSelected && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-semibold py-1.5 px-2.5 rounded-lg shadow-lg z-10 whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-1 after:border-4 after:border-transparent after:border-t-gray-900 transition-all text-center">
                      {d.height} Registrations
                    </div>
                  )}

                  {/* Interactive Bar */}
                  <div
                    style={{ height: `${barHeight}px` }}
                    className={`w-full rounded-t transition-all duration-1000 ease-out transform origin-bottom ${
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

      {/* Email Unsubscribe reasons */}
      <div className="bg-white border border-[#E1DED6] rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
        <div className="bg-[#F5F5F5] py-3.5 px-5 border-b border-[#E1DED6]">
          <h4 className="font-semibold text-lg text-[#282A27]">Email unsubscribe reasons</h4>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-3.5">
            {unsubReasons.map((data, idx) => (
              <div key={idx} className="flex items-center gap-2 sm:gap-4 text-sm">
                <span className="w-28 sm:w-48 font-medium text-gray-700 text-left shrink-0 truncate text-xs sm:text-sm" title={data.reason}>
                  {data.reason}
                </span>
                <div className="flex-1 h-3 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? `${data.pct}%` : "0%" }}
                  />
                </div>
                <span className="w-16 sm:w-24 text-right text-gray-500 font-medium shrink-0 text-xs sm:text-sm">
                  {data.count} users
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600 border-t border-gray-150 pt-4 mt-2 italic leading-relaxed">
            42% unsub frequency - Action cap at 1 email per week and focus on high value sends only - new businesses in their city, upcoming booking reminders, and seasonal promotions.
          </p>
        </div>
      </div>
    </div>
  );
}
