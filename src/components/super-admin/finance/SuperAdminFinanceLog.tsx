"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon, ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";

interface TransactionItem {
  id: string;
  dateTime: string;
  businessName: string;
  feeType: "No-show fee" | "Late-cancellation fee" | "Activation fee" | "Refund";
  bookingCode: string;
  customerName: string;
  badgeLabel: string;
  gross: string;
  stripeFee: string;
  net: string;
  status: "Pending payout" | "Payout sent" | "Refunded";
  tabType: "No-show & late cancel" | "Activation fees" | "Refunds issued" | "SEPA sent";
}

export default function SuperAdminFinanceLog() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");
  const [activeTab, setActiveTab] = useState<"No-show & late cancel" | "Activation fees" | "Refunds issued" | "SEPA sent">("No-show & late cancel");

  const [transactions] = useState<TransactionItem[]>([
    {
      id: "1",
      dateTime: "17 May 2026",
      businessName: "Glam Studio",
      feeType: "No-show fee",
      bookingCode: "#BK-1254",
      customerName: "Demi Louka",
      badgeLabel: "Business gets",
      gross: "€20.06",
      stripeFee: "-€0.44",
      net: "€19.06",
      status: "Pending payout",
      tabType: "No-show & late cancel"
    },
    {
      id: "2",
      dateTime: "17 May 2026",
      businessName: "Glam Studio",
      feeType: "No-show fee",
      bookingCode: "#BK-1254",
      customerName: "Demi Louka",
      badgeLabel: "Business gets",
      gross: "€20.06",
      stripeFee: "-€0.44",
      net: "€19.06",
      status: "Pending payout",
      tabType: "No-show & late cancel"
    },
    {
      id: "3",
      dateTime: "15 May 2026",
      businessName: "Zen Spa Larnaca",
      feeType: "Activation fee",
      bookingCode: "#BK-9921",
      customerName: "Platform Setup",
      badgeLabel: "Bookly gets",
      gross: "€50.00",
      stripeFee: "-€1.50",
      net: "€48.50",
      status: "Payout sent",
      tabType: "Activation fees"
    },
    {
      id: "4",
      dateTime: "12 May 2026",
      businessName: "Nails By Maria",
      feeType: "Refund",
      bookingCode: "#BK-2291",
      customerName: "Elena Georgiou",
      badgeLabel: "Customer gets",
      gross: "-€25.00",
      stripeFee: "€0.00",
      net: "-€25.00",
      status: "Refunded",
      tabType: "Refunds issued"
    }
  ]);

  const handleApplyFilters = () => {
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Business", "Fee Type", "Booking", "Customer", "Badge", "Gross", "Stripe Fee", "Net", "Status"];
    const rows = transactions.map((t) => [
      `"${t.dateTime}"`,
      `"${t.businessName}"`,
      `"${t.feeType}"`,
      `"${t.bookingCode}"`,
      `"${t.customerName}"`,
      `"${t.badgeLabel}"`,
      `"${t.gross}"`,
      `"${t.stripeFee}"`,
      `"${t.net}"`,
      `"${t.status}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `transaction_log_${activeTab.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (t.tabType !== activeTab) return false;

    if (appliedFromDate || appliedToDate) {
      const transactionDate = new Date(t.dateTime);
      
      if (appliedFromDate) {
        const fromLimit = new Date(appliedFromDate);
        fromLimit.setHours(0, 0, 0, 0);
        transactionDate.setHours(0, 0, 0, 0);
        if (transactionDate < fromLimit) return false;
      }
      
      if (appliedToDate) {
        const toLimit = new Date(appliedToDate);
        toLimit.setHours(23, 59, 59, 999);
        transactionDate.setHours(0, 0, 0, 0);
        if (transactionDate > toLimit) return false;
      }
    }

    return true;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Pending payout":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Payout sent":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "Refunded":
        return "bg-gray-50 text-gray-500 border border-gray-200";
      default:
        return "bg-gray-50 text-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden w-full flex flex-col font-sans">
      {/* Header Container */}
      <div className="bg-[#F5F5F5] p-5 flex flex-wrap justify-between items-center gap-4 border-b border-gray-200">
        <h3 className="font-semibold text-base text-[#111111]">
          Transaction log
        </h3>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
          >
            <HugeiconsIcon icon={Download01Icon} className="w-4 h-4 text-white" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
          >
            <HugeiconsIcon icon={isCollapsed ? ArrowDown01Icon : ArrowUp01Icon} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Sub-Filters: Date selectors */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="grid grid-cols-1 gap-3 items-center w-full md:flex md:flex-row md:items-center md:gap-4 md:w-auto">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-normal text-gray-500 w-8 md:w-auto">From</span>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] cursor-pointer flex-1 md:flex-initial md:w-36"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-normal text-gray-500 w-8 md:w-auto">To</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] cursor-pointer flex-1 md:flex-initial md:w-36"
                />
              </div>

              <button
                onClick={handleApplyFilters}
                className="bg-white hover:bg-gray-50 border border-[#E2E8F0] text-gray-800 px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors w-full md:w-auto text-center"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Sub-Tabs Navigation */}
          <div className="flex items-center gap-6 px-5 border-b border-gray-100 overflow-x-auto bg-white pt-2.5">
            {(["No-show & late cancel", "Activation fees", "Refunds issued", "SEPA sent"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? "border-[#6366F1] text-[#6366F1]"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Data Grid Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-gray-100 text-gray-700 font-semibold">
                  <th className="p-4 whitespace-nowrap">Date/Time</th>
                  <th className="p-4 whitespace-nowrap">Business</th>
                  <th className="p-4 whitespace-nowrap">Type & Booking</th>
                  <th className="p-4 whitespace-nowrap text-right">Gross</th>
                  <th className="p-4 whitespace-nowrap text-right">Stripe fee</th>
                  <th className="p-4 whitespace-nowrap text-right">Net</th>
                  <th className="p-4 whitespace-nowrap text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Date/Time */}
                    <td className="p-4 whitespace-nowrap text-gray-900 font-normal">
                      {t.dateTime}
                    </td>

                    {/* Business */}
                    <td className="p-4 whitespace-nowrap text-gray-900 font-medium">
                      {t.businessName}
                    </td>

                    {/* Type & Booking */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-900">{t.feeType}</span>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                          <span>{t.bookingCode}</span>
                          <span>•</span>
                          <span>{t.customerName}</span>
                          <span className="px-1.5 py-0.5 bg-[#E2E8F0] text-gray-600 rounded text-[9px] font-semibold">
                            {t.badgeLabel}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Gross */}
                    <td className="p-4 text-right whitespace-nowrap text-gray-900 font-normal">
                      {t.gross}
                    </td>

                    {/* Stripe Fee */}
                    <td className="p-4 text-right whitespace-nowrap text-rose-600 font-normal">
                      {t.stripeFee}
                    </td>

                    {/* Net */}
                    <td className="p-4 text-right whitespace-nowrap text-[#D97706] font-semibold">
                      {t.net}
                    </td>

                    {/* Status */}
                    <td className="p-4 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${getStatusBadgeStyle(t.status)}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500 font-medium">
                      No transactions recorded under this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 bg-white text-xs text-gray-500">
            <span>Showing 1-2 of {filteredTransactions.length}</span>
            <button className="text-[#6366F1] font-semibold hover:underline flex items-center gap-1">
              Show more →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
