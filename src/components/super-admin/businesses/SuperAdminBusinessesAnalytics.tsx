"use client";

import React, { useState, useEffect } from "react";

export default function SuperAdminBusinessesAnalytics() {
  const [currentPage, setCurrentPage] = useState(1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const topBusinesses = [
    { name: "Glam Studio", city: "Lamezia", newCustomers: 52, bookings: 124, returnRate: "68%", revenue: "€1,042", noShowRate: "2.4%" },
    { name: "Sleek Cuts", city: "Lamezia", newCustomers: 48, bookings: 110, returnRate: "65%", revenue: "€980", noShowRate: "2.6%" },
    { name: "Nail Lounge", city: "Lamezia", newCustomers: 45, bookings: 98, returnRate: "60%", revenue: "€820", noShowRate: "2.4%" },
    { name: "Bella Wellness", city: "Lamezia", newCustomers: 41, bookings: 95, returnRate: "70%", revenue: "€790", noShowRate: "2.4%" },
    { name: "Aura Salon", city: "Lamezia", newCustomers: 38, bookings: 88, returnRate: "62%", revenue: "€720", noShowRate: "3.6%" },
  ];

  const onboardingData = [
    { month: "January", count: 8, pct: 40 },
    { month: "February", count: 12, pct: 60 },
    { month: "March", count: 15, pct: 75 },
    { month: "April", count: 18, pct: 90 },
    { month: "May", count: 20, pct: 100 },
    { month: "June", count: 14, pct: 70 },
    { month: "July", count: 9, pct: 45 },
    { month: "August", count: 11, pct: 55 },
    { month: "September", count: 16, pct: 80 },
    { month: "October", count: 13, pct: 65 },
    { month: "November", count: 10, pct: 50 },
    { month: "December", count: 7, pct: 35 },
  ];

  return (
    <div className="flex flex-col gap-8 w-full font-sans animate-fadeIn">
      {/* Top Section: Top 5 Businesses Table */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
        <div className="bg-[#F5F5F5] py-4 px-6 border-b border-gray-200">
          <h3 className="font-semibold text-base text-[#111111]">
            Top 5 Business - ranked by new customers - 2026 YTD
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
                <th className="py-3 px-6">Business</th>
                <th className="py-3 px-6">City</th>
                <th className="py-3 px-6 text-center">New Customers</th>
                <th className="py-3 px-6 text-center">Bookings</th>
                <th className="py-3 px-6 text-center">Return Rate</th>
                <th className="py-3 px-6 text-right">Bookly Revenue</th>
                <th className="py-3 px-6 text-center">No-Show Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {topBusinesses.map((biz, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">{biz.name}</td>
                  <td className="py-4 px-6 text-gray-600">{biz.city}</td>
                  <td className="py-4 px-6 text-center text-gray-700 font-medium">{biz.newCustomers}</td>
                  <td className="py-4 px-6 text-center text-gray-600">{biz.bookings}</td>
                  <td className="py-4 px-6 text-center text-gray-600">{biz.returnRate}</td>
                  <td className="py-4 px-6 text-right font-semibold text-[#195156]">{biz.revenue}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                      {biz.noShowRate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section: New Business joined Bookly/month - 2026 */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
        <div className="bg-[#F5F5F5] py-4 px-6 border-b border-gray-200">
          <h3 className="font-semibold text-base text-[#111111]">
            New Business joined Bookly/month - 2026
          </h3>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-3.5">
            {onboardingData.map((data, idx) => (
              <div key={idx} className="flex items-center gap-4 text-sm">
                <span className="w-24 font-medium text-gray-700 text-left shrink-0">{data.month}</span>
                <div className="flex-1 h-3 bg-[#F5F4EE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4E88D7] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animate ? `${data.pct}%` : "0%" }}
                  />
                </div>
                <span className="w-24 text-right text-gray-500 font-medium shrink-0">
                  {data.count} {data.count === 1 ? "business" : "businesses"}
                </span>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between border-t border-gray-150 pt-5 mt-4">
            <span className="text-xs text-gray-500">
              Showing 1-12 of 827
            </span>
            <div className="flex gap-2">
              <button
                disabled
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-400 bg-gray-50 cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1.5 border border-[#111111] text-[#111111] hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
