"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InformationCircleIcon,
  Download01Icon,
} from "@hugeicons/core-free-icons";

interface BusinessFinanceTabProps {
  businessId: string;
}

export default function BusinessFinanceTab({ businessId }: BusinessFinanceTabProps) {
  const [financeMonth, setFinanceMonth] = useState("Month");
  const [financeYear, setFinanceYear] = useState("Year");
  const [breakdownMonth, setBreakdownMonth] = useState("Month");
  const [breakdownYear, setBreakdownYear] = useState("Year");
  const [transactionType, setTransactionType] = useState("All Types");

  // Mock Payout Sent Modal trigger or state
  const [isPayoutConfirmOpen, setIsPayoutConfirmOpen] = useState(false);

  // Mock Transactions list
  const transactions = [
    {
      date: "16 May 2026 · 14:30",
      type: "No-show fee",
      code: "#BK-2851",
      customer: "Demi Louka",
      tag: "Business Keeps",
      tagColor: "bg-[#D0F1DC] text-[#025420]",
      gross: "€35.00",
      deduction: "-€35.00",
      sent: "€0.00",
      activationFee: "€35.96",
      status: "Pending",
      statusColor: "bg-[#E3D5AB] text-[#5C4604]",
    },
    {
      date: "16 May 2026 · 14:30",
      type: "Late cancellation fee",
      code: "#BK-2851",
      customer: "Demi Louka",
      tag: "Business Keeps",
      tagColor: "bg-[#D0F1DC] text-[#025420]",
      gross: "€35.00",
      deduction: "-€35.00",
      sent: "€0.00",
      activationFee: "€35.96",
      status: "Pending",
      statusColor: "bg-[#E3D5AB] text-[#5C4604]",
    },
    {
      date: "16 May 2026 · 14:30",
      type: "Activation fee",
      code: "#BK-2851",
      customer: "Demi Louka",
      customerSuffix: "(NEW)",
      tag: "Bookly Keeps",
      tagColor: "bg-[#E8E7FD] text-[#3B2EA7]",
      gross: "€35.00",
      deduction: "-€35.00",
      sent: "€0.00",
      activationFee: "€35.96",
      status: "Collected by Bookly",
      statusColor: "bg-[#ECECFC] text-[#6366F1]",
    },
    {
      date: "16 May 2026 · 14:30",
      type: "Activation fee",
      code: "#BK-2851",
      customer: "Demi Louka",
      customerSuffix: "(NEW)",
      tag: "Bookly Keeps",
      tagColor: "bg-[#E8E7FD] text-[#3B2EA7]",
      gross: "€35.00",
      deduction: "-€35.00",
      sent: "€0.00",
      activationFee: "€35.96",
      status: "Collected by Bookly",
      statusColor: "bg-[#ECECFC] text-[#6366F1]",
    },
    {
      date: "16 May 2026 · 14:30",
      type: "SEPA payout sent",
      code: "Jun 2026",
      customer: "5 transactions",
      tag: "Payout sent",
      tagColor: "bg-[#D0F1DC] text-[#025420]",
      gross: "€35.00",
      deduction: "-€35.00",
      sent: "€0.00",
      activationFee: "€35.96",
      status: "Sent",
      statusColor: "bg-[#ECF7F3] text-[#148655]",
    },
    {
      date: "16 May 2026 · 14:30",
      type: "No-show fee",
      code: "#BK-2851",
      customer: "Demi Louka",
      tag: "Business Keeps",
      tagColor: "bg-[#D0F1DC] text-[#025420]",
      gross: "€35.00",
      deduction: "-€35.00",
      sent: "€0.00",
      activationFee: "€35.96",
      status: "Included in Jun payout",
      statusSubtext: "SEPA-243253254363",
      statusColor: "bg-[#E5F5EF] text-[#224F42]",
    },
    {
      date: "16 May 2026 · 14:30",
      type: "Refund issues",
      code: "#BK-2851",
      customer: "Free cancellation by business",
      tag: "Refund",
      tagColor: "bg-[#FDF2F2] text-[#B91C1C]",
      gross: "€35.00",
      deduction: "-€35.00",
      sent: "€0.00",
      activationFee: "€35.96",
      status: "Refunded",
      statusSubtext: "RF-243253254363",
      statusColor: "bg-[#FDE8E8] text-[#9B1C1C]",
    },
  ];

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

      {/* Payout Breakdown Side-by-Side Cards */}
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

        {/* Green Payments Bar */}
        <div className="mx-6 mb-6 p-5 bg-[#E5F5EF] rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-emerald-100">
          <div className="flex flex-col gap-1.5 max-w-[800px]">
            <span className="text-lg font-semibold text-[#224F42]">
              Ready to send €34.06 to Glam Studio
            </span>
            <p className="text-xs text-[#39725E] leading-normal">
              2 transations pending - Jul 2026 - Net after Stripe($0.69) and SEPA ($0.25) - You are about to mark €34.06 as paid to Glam Studio via SEPA. This action is permanent and cannot be undone. A SEPA reference will be generated and the business will be notified. Confirm?
            </p>
          </div>
          <button
            onClick={() => {
              alert("Payment confirmation trigger completed.");
              setIsPayoutConfirmOpen(true);
            }}
            className="w-full md:w-auto px-6 py-2.5 border border-[#111111] hover:bg-emerald-50 rounded-lg text-sm font-semibold text-[#111111] cursor-pointer bg-white shrink-0 transition-colors"
          >
            For Payments click on this button
          </button>
        </div>
      </div>

      {/* 3. Transaction History Section */}
      <div className="flex flex-col gap-4 w-full mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
          <h3 className="font-semibold text-lg text-[#111827]">
            Transaction History
          </h3>
          <div className="flex items-center gap-2">
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs font-medium text-[#314158] focus:outline-none cursor-pointer"
            >
              <option>All Types</option>
              <option value="No-show fee">No-show fee</option>
              <option value="Late cancellation fee">Late cancellation fee</option>
              <option value="Activation fee">Activation fee</option>
              <option value="SEPA payout sent">SEPA payout sent</option>
              <option value="Refund issues">Refund issues</option>
            </select>
          </div>
        </div>

        {/* Transactions Table List */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden w-full">
          <div className="overflow-x-auto w-full">
            <table className="min-w-[900px] md:min-w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-gray-100 text-[#374151] font-semibold">
                  <th className="p-4">Date</th>
                  <th className="p-4">Type & Booking</th>
                  <th className="p-4 text-center">Gross</th>
                  <th className="p-4 text-center">Deduction</th>
                  <th className="p-4 text-center">Sent</th>
                  <th className="p-4 text-center">Activition Fee</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-800">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-55/30 transition-colors">
                    {/* Date */}
                    <td className="p-4 font-normal text-gray-900">{tx.date}</td>

                    {/* Type & Booking */}
                    <td className="p-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className="font-semibold text-[#111827]">{tx.type}</span>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <span>{tx.code}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-400" />
                          <span>{tx.customer}</span>
                          {tx.customerSuffix && (
                            <span className="text-[10px] font-bold text-gray-400 ml-0.5">{tx.customerSuffix}</span>
                          )}
                        </div>
                        <span className={`px-3 py-0.5 rounded-full text-[11px] font-semibold ${tx.tagColor}`}>
                          {tx.tag}
                        </span>
                      </div>
                    </td>

                    {/* Gross */}
                    <td className="p-4 text-center font-medium text-gray-900">{tx.gross}</td>

                    {/* Deduction */}
                    <td className="p-4 text-center font-medium text-rose-600">{tx.deduction}</td>

                    {/* Sent */}
                    <td className="p-4 text-center font-medium text-gray-900">{tx.sent}</td>

                    {/* Activation Fee */}
                    <td className="p-4 text-center font-medium text-gray-900">{tx.activationFee}</td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${tx.statusColor}`}>
                          {tx.status}
                        </span>
                        {tx.statusSubtext && (
                          <span className="text-[10px] text-gray-400 font-mono mt-0.5">{tx.statusSubtext}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-gray-500 font-medium">Showing 1-25 of 847</span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-50 cursor-not-allowed bg-white" disabled>
                ← Previous
              </button>
              <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer bg-white">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
