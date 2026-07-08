"use client";
import DashboardHeader from "@/components/DashboardHeader";


import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { BellIcon } from "@hugeicons/core-free-icons";

// Modular Subcomponents
import PayoutsBanner from "./payouts/PayoutsBanner";
import PayoutsBreakdown from "./payouts/PayoutsBreakdown";
import PayoutsHistory from "./payouts/PayoutsHistory";

export default function DashboardPayoutsList() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("May");

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] md: select-none font-poppins relative">
      
      {/* Header Row */}
      <DashboardHeader title="Payouts & Finance" subtitle="Your earnings, fee breakdown, and payout history" />
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">

      {/* Main Content Alignment Wrapper */}
      <div className="pt-[20px] flex flex-col gap-[20px] w-full">
        
        {/* Protected by Bookly Banner */}
        <PayoutsBanner protectedEarnings="€513.50" />

        {/* Filters Row */}
        <div className="pt-[32px] flex flex-row items-start gap-[12px] w-full h-[48px]">
          <div className="relative flex-grow">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none h-[48px] w-full bg-white border border-[#B7D2C8] rounded-[12px] px-4 font-poppins font-semibold text-[14px] leading-[16px] text-center text-black focus:outline-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '16px'
              }}
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div className="relative flex-grow">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none h-[48px] w-full bg-white border border-[#B7D2C8] rounded-[12px] px-4 font-poppins font-semibold text-[14px] leading-[16px] text-center text-black focus:outline-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '16px'
              }}
            >
              <option value="May">May</option>
              <option value="April">April</option>
              <option value="March">March</option>
              <option value="February">February</option>
            </select>
          </div>

          <button className="flex flex-row justify-center items-center px-[14px] py-[8px] bg-[#111111] hover:bg-black text-[#FFFFFF] font-poppins font-semibold text-[14px] leading-[16px] w-[82px] h-[48px] rounded-[12px] transition-colors cursor-pointer shrink-0">
            All time
          </button>
        </div>

        {/* 4 Cards Summary Grid */}
        <div className="pt-[20px] flex flex-col md:flex-row items-center gap-[12px] w-full">
          {/* Card 1 */}
          <div className="flex flex-col items-start p-4 bg-[#F1F0EA] rounded-[12px] flex-grow w-full md:w-auto h-[100px]">
            <span className="font-poppins font-semibold text-[10px] leading-[15px] tracking-[0.8px] uppercase text-[#83847E]">
              NO-SHOW FEES
            </span>
            <div className="flex flex-col mt-2">
              <span className="font-poppins font-semibold text-[24px] leading-[24px] tracking-[-0.96px] text-[#43A27E]">
                €135.00
              </span>
              <span className="font-poppins font-semibold text-[11px] leading-[16px] text-[#73756E] mt-1">
                3 no-shows charged
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-start p-4 bg-[#F1F0EA] rounded-[12px] flex-grow w-full md:w-auto h-[100px]">
            <span className="font-poppins font-semibold text-[10px] leading-[15px] tracking-[0.8px] uppercase text-[#83847E]">
              LATE CANCEL FEES
            </span>
            <div className="flex flex-col mt-2">
              <span className="font-poppins font-semibold text-[24px] leading-[24px] tracking-[-0.96px] text-[#43A27E]">
                €76.00
              </span>
              <span className="font-poppins font-semibold text-[11px] leading-[16px] text-[#73756E] mt-1">
                4 cancellations
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-start p-4 bg-[#F1F0EA] rounded-[12px] flex-grow w-full md:w-auto h-[100px]">
            <span className="font-poppins font-semibold text-[10px] leading-[15px] tracking-[0.8px] uppercase text-[#83847E]">
              PROCESSING FEES
            </span>
            <div className="flex flex-col mt-2">
              <span className="font-poppins font-semibold text-[24px] leading-[24px] tracking-[-0.96px] text-[#C75A50]">
                −€3.50
              </span>
              <span className="font-poppins font-semibold text-[11px] leading-[16px] text-[#73756E] mt-1">
                Stripe + SEPA
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-start p-4 bg-[#F1F0EA] rounded-[12px] flex-grow w-full md:w-auto h-[100px]">
            <span className="font-poppins font-semibold text-[10px] leading-[15px] tracking-[0.8px] uppercase text-[#83847E]">
              YOUR PAYOUT — END OF MAY
            </span>
            <div className="flex flex-col mt-2">
              <span className="font-poppins font-semibold text-[24px] leading-[24px] tracking-[-0.96px] text-[#43A27E]">
                €167.50
              </span>
              <span className="font-poppins font-semibold text-[11px] leading-[16px] text-[#73756E] mt-1">
                SEPA · 100% yours
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Transaction Breakdown */}
        <div className="pt-[20px] w-full">
          <PayoutsBreakdown />
        </div>

        {/* Section 2: Payout History */}
        <div className="pt-[20px] w-full">
          <PayoutsHistory />
        </div>

      </div>
    
      </div></main>
  );
}
