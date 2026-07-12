"use client";

import React from "react";

export default function FinanceSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      {/* Activation Fees */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1">
        <span className="text-xs font-medium text-[#6B7280]">Activatios Fees</span>
        <span className="text-3xl font-bold text-[#195156] mt-1">€80</span>
        <span className="text-[11px] text-[#6B7280] mt-1">4 new cusomers - Bookly revenue</span>
      </div>

      {/* Fees Collected For Business */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1">
        <span className="text-xs font-medium text-[#6B7280]">Fees Collected For Business</span>
        <span className="text-3xl font-bold text-[#195156] mt-1">€80</span>
        <span className="text-[11px] text-[#6B7280] mt-1">No-show €20 - late cancel €14</span>
      </div>

      {/* Sent to Business */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1">
        <span className="text-xs font-medium text-[#6B7280]">Sent to Business</span>
        <span className="text-3xl font-bold text-[#195156] mt-1">€0</span>
        <span className="text-[11px] text-[#6B7280] mt-1">No payouts this month yet</span>
      </div>

      {/* Pending Payout */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1">
        <span className="text-xs font-medium text-[#6B7280]">Pending Payout</span>
        <span className="text-3xl font-bold text-[#195156] mt-1">€34</span>
        <span className="text-[11px] text-[#6B7280] mt-1">2 transations - awaiting SEPA</span>
      </div>
    </div>
  );
}
