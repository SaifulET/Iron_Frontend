"use client";

import React, { useState } from "react";
import FinanceSummaryCards from "./FinanceSummaryCards";
import PayoutBreakdownCard from "./PayoutBreakdownCard";
import TransactionHistoryTable from "./TransactionHistoryTable";

interface BusinessFinanceTabProps {
  businessId: string;
}

export default function BusinessFinanceTab({ businessId }: BusinessFinanceTabProps) {
  const [financeMonth, setFinanceMonth] = useState("Month");
  const [financeYear, setFinanceYear] = useState("Year");
  const [breakdownMonth, setBreakdownMonth] = useState("Month");
  const [breakdownYear, setBreakdownYear] = useState("Year");

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-gray-900">
      
      {/* 1. Finance Summary Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full pt-2">
        <h3 className="font-semibold text-lg text-[#111827]">
          Finance summary
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={financeMonth}
            onChange={(e) => setFinanceMonth(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#314158] focus:outline-none cursor-pointer"
          >
            <option>Month</option>
          </select>
          <select
            value={financeYear}
            onChange={(e) => setFinanceYear(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#314158] focus:outline-none cursor-pointer"
          >
            <option>Year</option>
          </select>
          <button className="border border-[#E2E8F0] rounded-lg px-4 py-1.5 bg-white hover:bg-gray-55 text-xs font-medium text-gray-700 cursor-pointer">
            Apply
          </button>
          <div className="bg-[#111111] text-white text-xs font-medium px-3.5 py-1.5 rounded-md shrink-0 cursor-pointer">
            All time
          </div>
        </div>
      </div>

      {/* Finance Summary Metrics 4-Cards Grid */}
      <FinanceSummaryCards />

      {/* 2. Payout Breakdown Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full mt-4">
        <h3 className="font-semibold text-lg text-[#111827]">
          Payout Breakdown
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={breakdownMonth}
            onChange={(e) => setBreakdownMonth(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#314158] focus:outline-none cursor-pointer"
          >
            <option>Month</option>
          </select>
          <select
            value={breakdownYear}
            onChange={(e) => setBreakdownYear(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#314158] focus:outline-none cursor-pointer"
          >
            <option>Year</option>
          </select>
          <button className="border border-[#E2E8F0] rounded-lg px-4 py-1.5 bg-white hover:bg-gray-55 text-xs font-medium text-gray-700 cursor-pointer">
            Apply
          </button>
          <div className="bg-[#111111] text-white text-xs font-medium px-3.5 py-1.5 rounded-md shrink-0 cursor-pointer">
            All time
          </div>
        </div>
      </div>

      {/* Payout Breakdown Side-by-Side Cards & Interactive Payments Bar */}
      <PayoutBreakdownCard />

      {/* 3. Transaction History Section */}
      <TransactionHistoryTable />
    </div>
  );
}
