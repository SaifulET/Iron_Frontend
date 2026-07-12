"use client";

import React from "react";

export default function SuperAdminTopServices() {
  const services = [
    { name: "Beauty & Wellness", count: 31, max: 35 },
    { name: "Health & Fitness", count: 23, max: 35 },
    { name: "SPrts & Activites", count: 18, max: 35 },
    { name: "Automotive", count: 14, max: 35 },
    { name: "Pets & Home", count: 12, max: 35 },
    { name: "Experience & Tours", count: 12, max: 35 },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-4 w-full h-full">
      <div>
        <h4 className="font-sans font-semibold text-base text-[#111827]">Top services by bookings</h4>
      </div>

      <div className="flex flex-col gap-3.5 mt-2">
        {services.map((service, idx) => {
          const widthPercent = (service.count / service.max) * 100;
          return (
            <div key={idx} className="flex items-center justify-between gap-4 font-sans text-xs">
              <span className="w-1/3 text-gray-700 font-medium truncate">{service.name}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#111111] rounded-full transition-all duration-500"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-900 font-semibold">{service.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
