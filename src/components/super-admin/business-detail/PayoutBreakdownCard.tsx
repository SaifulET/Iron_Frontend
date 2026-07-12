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
        <div className="mx-6 mb-6 p-4 bg-[#E5F5EF] rounded-xl flex items-center justify-center border border-emerald-100 min-h-[72px] transition-all">
          <button
            onClick={() => setShowDetails(true)}
            className="w-full md:w-auto px-6 py-2.5 border border-[#111111] hover:bg-emerald-50 rounded-lg text-sm font-semibold text-[#111111] cursor-pointer bg-white transition-colors text-center"
          >
            For Payments click on this button
          </button>
        </div>
      ) : (
        <div className="mx-6 mb-6 p-5 bg-[#E5F5EF] rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-emerald-100 transition-all">
          <div className="flex flex-col gap-1.5 max-w-[800px]">
            <span className="text-lg font-semibold text-[#224F42]">
              Ready to send €34.06 to Glam Studio
            </span>
            <p className="text-xs text-[#39725E] leading-normal">
              2 transations pending - Jul 2026 - Net after Stripe($0.69) and SEPA ($0.25) - You are about to mark €34.06 as paid to Glam Studio via SEPA. This action is permanent and cannot be undone. A SEPA reference will be generated and the business will be notified. Confirm?
            </p>
          </div>
          <button
            onClick={() => setShowDetails(false)}
            className="w-full md:w-auto px-6 py-2.5 border border-[#111111] hover:bg-emerald-50 rounded-lg text-sm font-semibold text-[#111111] cursor-pointer bg-white shrink-0 transition-colors"
          >
            For Payments click on this button
          </button>
        </div>
      )}
    </div>
  );
}
