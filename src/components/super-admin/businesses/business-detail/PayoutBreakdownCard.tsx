"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

export default function PayoutBreakdownCard() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Left Column: What I owe the business */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-sm text-[#111111] pb-2 border-b border-gray-150">What I owe the business</h4>
          <div className="flex flex-col">
            <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
              <div className="flex flex-col">
                <span className="text-[#1C1B1C]">No-show fees collected</span>
                <span className="text-xs text-gray-400">1 transaction</span>
              </div>
              <span className="font-semibold text-[#1C1B1C]">€20.00</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
              <div className="flex flex-col">
                <span className="text-[#1C1B1C]">Late cancellation fees collected</span>
                <span className="text-xs text-gray-400">1 transaction</span>
              </div>
              <span className="font-semibold text-[#1C1B1C]">€20.00</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
              <div className="flex flex-col">
                <span className="text-[#1C1B1C]">Gross to business</span>
                <span className="text-xs text-gray-400">2 transactions total</span>
              </div>
              <span className="font-semibold text-[#1C1B1C]">€20.00</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm text-rose-600">
              <div className="flex flex-col">
                <span>Stripe fees</span>
                <span className="text-xs text-[#767676]">Actual - pulled from Stripe API</span>
              </div>
              <span className="font-semibold">-€0.69</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm text-rose-600">
              <div className="flex flex-col">
                <span>SEPA transfer fee</span>
                <span className="text-xs text-[#767676]">€0.25 flat once per monthly payout</span>
              </div>
              <span className="font-semibold">-€0.69</span>
            </div>
            <div className="flex justify-between py-4 text-lg font-bold text-[#1C1B1C] border-t border-gray-100 mt-2">
              <span>Net to send via SEPA</span>
              <span className="text-2xl text-[#2E9DA7]">€34.69</span>
            </div>
          </div>
        </div>

        {/* Right Column: What Bookly earned */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-sm text-[#111111] pb-2 border-b border-[#D3D3D3]">What Bookly earned</h4>
          <div className="flex flex-col">
            <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
              <div className="flex flex-col">
                <span className="text-[#1C1B1C]">Activation fees collected</span>
                <span className="text-xs text-gray-400">4 new customers avg €20.00 each</span>
              </div>
              <span className="font-semibold text-[#157556]">€80.00</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm text-rose-600">
              <div className="flex flex-col">
                <span>Stripe fees</span>
                <span className="text-xs text-[#767676]">Actual - pulled from Stripe API</span>
              </div>
              <span className="font-semibold">-€0.69</span>
            </div>
            <div className="flex justify-between py-4 text-lg font-bold text-[#1C1B1C] border-t border-gray-100 mt-2">
              <span>Bookly net revenue</span>
              <span className="text-2xl text-[#2E9DA7]">€34.69</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner Description */}
      <div className="mx-6 mb-6 p-4 bg-gray-50 border border-gray-100 rounded-lg flex items-start gap-3">
        <HugeiconsIcon icon={InformationCircleIcon} className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600 leading-relaxed">
          Stripe fees vary per transaction based on card origin - EU, UK, international, premium EEA. Exact amounts are pulled from Stripe's API per transaction, never estimated. Total shown here is the sum of actual fees across all transactions in the selected period.
        </p>
      </div>

      {/* Interactive Green Payments Bar */}
      {!showDetails ? (
        <div className="mx-6 mb-6 flex flex-row justify-center items-center p-2 sm:px-5 gap-2 w-auto h-[72px] bg-[#E5F5EF] rounded-xl flex-none order-1 grow-0 border border-emerald-100">
          <button
            onClick={() => setShowDetails(true)}
            className="box-sizing-border-box flex flex-row justify-center items-center px-4 py-1.5 gap-2 w-full md:max-w-[1112px] h-[56px] border border-[#111111] rounded-lg cursor-pointer bg-white hover:bg-emerald-50 transition-colors flex-none order-1 grow"
          >
            <span className="font-sans font-medium text-[14px] sm:text-[18px] leading-[20px] text-center text-[#111111] whitespace-nowrap">
              For Payments click on this button
            </span>
          </button>
        </div>
      ) : (
        <div className="mx-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center p-5 gap-4 w-auto bg-[#E5F5EF] rounded-xl flex-none order-1 grow-0 border border-emerald-100 transition-all">
          <div className="flex flex-col justify-center items-start p-0 gap-2 w-full md:max-w-[858px] flex-none order-0 grow">
            <span className="w-full md:max-w-[858px] h-auto md:h-[24px] font-sans font-semibold text-2xl text-[#224F42] flex items-center">
              Ready to send €34.06 to Glam Studio
            </span>
            <p className="w-full md:max-w-[858px] h-auto md:h-[72px] font-sans font-normal text-[15.9px] leading-[24px] text-[#39725E] flex items-center">
              2 transations pending - Jul 2026 - Net after Stripe($0.69) and SEPA ($0.25) - You are about to mark €34.06 as paid to Glam Studio via SEPA. This action is permanent and cannot be undone. A SEPA reference will be generated and the business will be notified. Confirm?
            </p>
          </div>
          <button
            onClick={() => setShowDetails(false)}
            className="box-sizing-border-box flex flex-row justify-center items-center px-4 py-1.5 gap-2 w-full md:max-w-[1112px] h-[56px] border border-[#111111] rounded-lg cursor-pointer bg-white hover:bg-emerald-50 transition-colors flex-none order-1 grow shrink-0 md:w-auto"
          >
            <span className="font-sans font-medium text-[14px] sm:text-[18px] leading-[20px] text-center text-[#111111] whitespace-nowrap">
              For Payments click on this button
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
