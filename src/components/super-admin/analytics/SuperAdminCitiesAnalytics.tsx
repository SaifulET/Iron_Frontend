"use client";

import React, { useState, useEffect } from "react";

export default function SuperAdminCitiesAnalytics() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Completed", value: "87", sub: "80.2% attended" },
    { label: "Upcoming", value: "641", sub: "7.2% confirmed & future" },
    { label: "Cancelled by customer", value: "3,841", sub: "5.0% free window" },
    { label: "No-show charged", value: "2,326", sub: "21% fee collected" },
    { label: "No-show waived", value: "142", sub: "0.9% business waived" },
    { label: "Cancelled by business", value: "16", sub: "0.8% timer running" },
    { label: "Late cancellation", value: "64", sub: "3.0% fee retained" },
    { label: "No-show cancelled", value: "65", sub: "4% - no charge made" },
    { label: "Manual booking", value: "65", sub: "No bookly fee" },
    { label: "Registered total", value: "87", sub: "All time on platform" },
    { label: "Activation rate", value: "34.01%", sub: "Placed >= 1 booking" },
    { label: "Dormant now", value: "3,841", sub: "Never booked - act now" },
  ];

  const citiesData = [
    { city: "Nicosia", volume: 312, pct: 90 },
    { city: "Larnaca", volume: 23, pct: 15 },
    { city: "Limassol", volume: 23, pct: 15 },
    { city: "Paphos", volume: 23, pct: 15 },
    { city: "Protaras", volume: 23, pct: 15 },
    { city: "Ayia Napa", volume: 23, pct: 15 },
  ];

  return (
    <div className="flex flex-col gap-8 w-full font-sans animate-fadeIn">
      {/* 12 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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

      {/* Booking volume by city */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col w-full">
        <div className="bg-[#F5F5F5] p-4 border-b border-gray-200">
          <h3 className="font-semibold text-base text-[#111111] leading-none">
            Booking volume by city
          </h3>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {citiesData.map((data, idx) => (
            <div key={idx} className="flex items-center gap-4 text-sm justify-between">
              <span className="w-28 font-medium text-gray-700 text-left shrink-0">{data.city}</span>
              <div className="flex-1 h-3 bg-[#F5F4EE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: animate ? `${data.pct}%` : "0%" }}
                />
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="w-12 text-right text-gray-900 font-semibold">
                  {data.volume}
                </span>
                <button className="px-3 py-1 border border-[#2E9DA7] text-[#195156] hover:bg-[#2E9DA7]/10 transition-colors text-xs font-semibold rounded-lg">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
