"use client";

import React from "react";

interface IssueItem {
  dateTime: string;
  bookingId: string;
  customerName: string;
  customerType: string;
  serviceName: string;
  staffName: string;
  addon?: string;
  booklyFee: string;
  reason: string;
  status: string;
  statusBg: string;
}

interface IssuesTableProps {
  filteredIssues: IssueItem[];
}

export default function IssuesTable({ filteredIssues }: IssuesTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden w-full">
      <div className="overflow-x-auto w-full">
        <table className="min-w-[800px] md:min-w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100 text-[#374151] font-semibold">
              <th className="p-4">Date/Time</th>
              <th className="p-4 text-center">Booking ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4 text-center">Bookly Fee</th>
              <th className="p-4 text-center">Reason</th>
              <th className="p-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-800">
            {filteredIssues.map((issue, idx) => (
              <tr key={idx} className="hover:bg-gray-55/30 transition-colors">
                {/* Date/Time */}
                <td className="p-4 font-normal text-gray-900">{issue.dateTime}</td>

                {/* Booking ID */}
                <td className="p-4 font-normal text-center text-gray-900">{issue.bookingId}</td>

                {/* Customer */}
                <td className="p-4">
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="font-semibold text-gray-900">{issue.customerName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECECFC] text-[#6366F1]`}>
                      {issue.customerType}
                    </span>
                  </div>
                </td>

                {/* Service */}
                <td className="p-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-900">{issue.serviceName}</span>
                    <span className="text-gray-500">{issue.staffName}</span>
                    {issue.addon && <span className="text-gray-500">{issue.addon}</span>}
                  </div>
                </td>

                {/* Bookly Fee */}
                <td className="p-4 text-center font-normal text-gray-900">{issue.booklyFee}</td>

                {/* Reason */}
                <td className="p-4 text-center font-normal text-gray-900">{issue.reason}</td>

                {/* Status */}
                <td className="p-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${issue.statusBg}`}>
                    {issue.status}
                  </span>
                </td>
              </tr>
            ))}
            {filteredIssues.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400 font-medium">
                  No issues found matching selected criteria.
                </td>
              </tr>
            )}
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
  );
}
