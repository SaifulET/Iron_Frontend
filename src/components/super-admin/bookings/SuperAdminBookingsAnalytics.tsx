"use client";

import React, { useState, useEffect } from "react";

export default function SuperAdminBookingsAnalytics() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Small timeout to allow element rendering before animation begins
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
  ];

  const categories = [
    { label: "Beauty & Wellness", count: 180, percentage: 40 },
    { label: "Hair Styling", count: 120, percentage: 27 },
    { label: "Nail Services", count: 80, percentage: 18 },
    { label: "Spa & Massage", count: 50, percentage: 11 },
    { label: "Fitness & Health", count: 23, percentage: 4 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full font-sans animate-fadeIn">
      {/* Indicator Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#111111]">
          All booking statuses - 2026 year to date - 453 total bookings
        </h3>
      </div>

      {/* Grid of 9 Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col justify-between min-h-[120px] transition-all duration-200 hover:shadow-md"
          >
            <span className="text-[13px] font-medium text-gray-500">{stat.label}</span>
            <span className="text-3xl font-bold text-[#195156] mt-2 mb-1">{stat.value}</span>
            <span className="text-xs text-gray-400 font-normal">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Two charts/breakdown rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Row 1, Panel 1: New VS Returning bookings */}
        <div className="bg-white border border-[#E1DED6] rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
          <div className="bg-[#F5F5F5] py-3.5 px-5 border-b border-[#E1DED6]">
            <h4 className="font-semibold text-lg text-[#282A27]">New VS Returning bookings</h4>
          </div>
          <div className="p-5 flex flex-col gap-6 justify-between flex-grow">
            <div className="flex flex-col gap-5">
              {/* New (activation fee) */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>New (activation fee)</span>
                  <span className="text-[#2E9DA7] font-semibold">237 - 52%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "52%" : "0%" }}
                  ></div>
                </div>
              </div>
              {/* Returning (no Bookly fee) */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Returning (no Bookly fee)</span>
                  <span className="text-[#2E9DA7] font-semibold">216 - 48%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "48%" : "0%" }}
                  ></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 border-t border-gray-150 pt-4 mt-2 italic leading-relaxed">
              72% of bookings generate €0 for Bookly. Only new customer first bookings produce activation fees.
            </p>
          </div>
        </div>

        {/* Row 1, Panel 2: Platform VS Manual bookings */}
        <div className="bg-white border border-[#E1DED6] rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
          <div className="bg-[#F5F5F5] py-3.5 px-5 border-b border-[#E1DED6]">
            <h4 className="font-semibold text-lg text-[#282A27]">Platform VS Manual bookings</h4>
          </div>
          <div className="p-5 flex flex-col gap-6 justify-between flex-grow">
            <div className="flex flex-col gap-5">
              {/* Platform */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Platform bookings</span>
                  <span className="text-[#2E9DA7] font-semibold">388 - 85.6%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "85.6%" : "0%" }}
                  ></div>
                </div>
              </div>
              {/* Manual */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Manual bookings</span>
                  <span className="text-[#2E9DA7] font-semibold">65 - 14.4%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "14.4%" : "0%" }}
                  ></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 border-t border-gray-150 pt-4 mt-2 italic leading-relaxed">
              Manual bookings block calendar slots only. Businesses over-relying on manual are bypassing the platform value.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Row 2, Panel 1: Premises VS Mobile bookings */}
        <div className="bg-white border border-[#E1DED6] rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
          <div className="bg-[#F5F5F5] py-3.5 px-5 border-b border-[#E1DED6]">
            <h4 className="font-semibold text-lg text-[#282A27]">Premises VS Mobile bookings</h4>
          </div>
          <div className="p-5 flex flex-col gap-6 justify-between flex-grow">
            <div className="flex flex-col gap-5">
              {/* Premises */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Premises bookings</span>
                  <span className="text-[#2E9DA7] font-semibold">380 - 83.8%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "83.8%" : "0%" }}
                  ></div>
                </div>
              </div>
              {/* Mobile */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Mobile bookings</span>
                  <span className="text-[#2E9DA7] font-semibold">73 - 16.2%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? "16.2%" : "0%" }}
                  ></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 border-t border-gray-150 pt-4 mt-2 italic leading-relaxed">
              Mobile businesses facilitated €1,234 in travel fees - 100% to the business, €0 to Bookly.
            </p>
          </div>
        </div>

        {/* Row 2, Panel 2: Booking by category */}
        <div className="bg-white border border-[#E1DED6] rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
          <div className="bg-[#F5F5F5] py-3.5 px-5 border-b border-[#E1DED6]">
            <h4 className="font-semibold text-lg text-[#282A27]">Booking by category</h4>
          </div>
          <div className="p-5 flex flex-col gap-4 flex-grow justify-center">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>{cat.label}</span>
                  <span className="text-[#2E9DA7] font-semibold">{cat.count} - {cat.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? `${cat.percentage}%` : "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
