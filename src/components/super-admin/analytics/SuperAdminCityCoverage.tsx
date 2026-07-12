"use client";

import React from "react";

export default function SuperAdminCityCoverage() {
  const cities = [
    { name: "Larnaca", store: 98, mobile: 54 },
    { name: "Limassol", store: 98, mobile: 54 },
    { name: "Nicosia", store: 98, mobile: 54 },
    { name: "Aya Napa", store: 98, mobile: 54 },
    { name: "Protaras", store: 98, mobile: 54 },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-4 w-full h-full">
      <div>
        <h4 className="font-sans font-semibold text-base text-[#111827]">City coverage</h4>
        <span className="font-sans text-xs text-gray-500">Store vs Mobile Businesses booking fulfilled so far</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase">
              <th className="py-2">City</th>
              <th className="py-2 text-right">Store</th>
              <th className="py-2 text-right">Mobile</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {cities.map((city, idx) => (
              <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="py-2.5 font-medium">{city.name}</td>
                <td className="py-2.5 text-right">{city.store}</td>
                <td className="py-2.5 text-right">{city.mobile}</td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="border-b border-gray-100 font-semibold text-gray-900 bg-gray-50/30">
              <td className="py-2.5">Total</td>
              <td className="py-2.5 text-right">500</td>
              <td className="py-2.5 text-right">500</td>
            </tr>
            {/* Percentage Row */}
            <tr className="font-semibold text-gray-900 bg-gray-50/50">
              <td className="py-2.5">Percentage</td>
              <td className="py-2.5 text-right">98%</td>
              <td className="py-2.5 text-right">54%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
