"use client";

import React, { useState } from "react";

export default function TransactionHistoryTable() {
  const [transactionType, setTransactionType] = useState("All Types");

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
    <div className="flex flex-col gap-4 w-full mt-4">
      <div className="flex flex-row justify-between items-center gap-4 w-full">
        <h3 className="font-semibold text-base sm:text-lg text-[#111827] whitespace-nowrap">
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
  );
}
