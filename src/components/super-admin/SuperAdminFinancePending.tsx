"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon, ArrowDown01Icon, ArrowUp01Icon, Car04Icon, Tick01Icon } from "@hugeicons/core-free-icons";

interface PendingPayout {
  id: string;
  businessName: string;
  city: string;
  category: string;
  transactionsCount: number;
  noShowAmount: number;
  lateCancelAmount: number;
  isMobile: boolean;
  payoutMonth: string;
  payoutDates: string;
  netAmount: string;
  iban: string;
  status: "Pending" | "Sent";
}

export default function SuperAdminFinancePending() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<PendingPayout | null>(null);
  const [payouts, setPayouts] = useState<PendingPayout[]>([
    {
      id: "1",
      businessName: "Glam Studio",
      city: "Nicosia",
      category: "Hair Salons",
      transactionsCount: 3,
      noShowAmount: 20,
      lateCancelAmount: 15,
      isMobile: true,
      payoutMonth: "Jul 2026",
      payoutDates: "26-25 Jul",
      netAmount: "€34.06",
      iban: "CY48 0002 0003 4829 3712",
      status: "Pending"
    },
    {
      id: "2",
      businessName: "Zen Spa Larnaca",
      city: "Larnaca",
      category: "Spas",
      transactionsCount: 2,
      noShowAmount: 10,
      lateCancelAmount: 25,
      isMobile: false,
      payoutMonth: "Jul 2026",
      payoutDates: "26-25 Jul",
      netAmount: "€31.20",
      iban: "CY48 0002 0003 1111 8892",
      status: "Pending"
    },
    {
      id: "3",
      businessName: "Nails By Maria",
      city: "Limassol",
      category: "Nail Salons",
      transactionsCount: 4,
      noShowAmount: 40,
      lateCancelAmount: 0,
      isMobile: true,
      payoutMonth: "Jul 2026",
      payoutDates: "26-25 Jul",
      netAmount: "€36.50",
      iban: "CY48 0002 0003 2222 9993",
      status: "Pending"
    },
    {
      id: "4",
      businessName: "Lara Beauty Bar",
      city: "Paphos",
      category: "Beauty Salons",
      transactionsCount: 1,
      noShowAmount: 0,
      lateCancelAmount: 20,
      isMobile: false,
      payoutMonth: "Jul 2026",
      payoutDates: "26-25 Jul",
      netAmount: "€18.80",
      iban: "CY48 0002 0003 3333 4445",
      status: "Pending"
    }
  ]);

  const handleExportCSV = () => {
    const headers = ["Business", "City", "Category", "Transactions", "No-show €", "Late cancel €", "Payout Period", "Net Amount", "IBAN", "Status"];
    const rows = payouts.map((p) => [
      `"${p.businessName}"`,
      `"${p.city}"`,
      `"${p.category}"`,
      p.transactionsCount,
      p.noShowAmount,
      p.lateCancelAmount,
      `"${p.payoutMonth} (${p.payoutDates})"`,
      `"${p.netAmount}"`,
      `"${p.iban}"`,
      `"${p.status}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pending_sepa_payouts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirmTransfer = () => {
    if (!selectedPayout) return;
    setPayouts((prev) =>
      prev.map((p) => (p.id === selectedPayout.id ? { ...p, status: "Sent" } : p))
    );
    setSelectedPayout(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden w-full flex flex-col font-sans">
      {/* Header Container */}
      <div className="bg-[#F5F5F5] p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-200 w-full">
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <h3 className="font-semibold text-base text-[#111111] leading-tight">
            Pending SEPA payouts - {payouts.filter((p) => p.status === "Pending").length} businesses
          </h3>
          <p className="text-xs text-gray-500 font-normal">
            Each payout requires individual confirmation before executing
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors flex-1 sm:flex-initial justify-center"
          >
            <HugeiconsIcon icon={Download01Icon} className="w-4 h-4 text-white" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-700 shrink-0"
          >
            <HugeiconsIcon icon={isCollapsed ? ArrowDown01Icon : ArrowUp01Icon} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table/List View */}
      {!isCollapsed && (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <tbody className="divide-y divide-gray-100">
              {payouts.map((p) => {
                const initials = p.businessName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase();

                return (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Business Info Column */}
                    <td className="p-4 whitespace-nowrap min-w-[320px]">
                      <div className="flex items-center gap-3">
                        {/* Circle Avatar */}
                        <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center font-bold text-sm text-[#4338CA] shrink-0">
                          {initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[14px] text-gray-900">
                            {p.businessName}
                          </span>
                          <span className="text-xs text-gray-500 font-normal flex items-center gap-1">
                            {p.city} • {p.category} • {p.transactionsCount} transactions • No-show €{p.noShowAmount} + late cancel €{p.lateCancelAmount}
                            {p.isMobile && (
                              <HugeiconsIcon icon={Car04Icon} className="w-3.5 h-3.5 text-[#4E5F78] shrink-0 ml-1" />
                            )}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Period Column */}
                    <td className="p-4 whitespace-nowrap text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-[#36309D]">{p.payoutMonth}</span>
                        <span className="text-xs text-gray-400">{p.payoutDates}</span>
                      </div>
                    </td>

                    {/* Net Payout Amount Column */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-[#D97706]">{p.netAmount}</span>
                        <span className="text-[11px] text-gray-400 font-normal">Net after Stripe + SEPA</span>
                      </div>
                    </td>

                    {/* Action Column */}
                    <td className="p-4 whitespace-nowrap text-right">
                      {p.status === "Pending" ? (
                        <button
                          onClick={() => setSelectedPayout(p)}
                          className="px-4 py-1.5 border border-[#111827] rounded-full text-xs font-semibold text-[#111827] hover:bg-[#111827] hover:text-white transition-colors cursor-pointer"
                        >
                          Send SEPA
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-400">
                          <HugeiconsIcon icon={Tick01Icon} className="w-3.5 h-3.5 text-gray-400" />
                          <span>Sent</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {selectedPayout && (
        <div className="fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-6 flex flex-col gap-4 font-sans relative">
            <button
              onClick={() => setSelectedPayout(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 text-lg focus:outline-none"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg text-gray-900">
              Confirm SEPA Transfer
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Send <strong className="text-gray-900">{selectedPayout.netAmount}</strong> to <strong className="text-gray-900">{selectedPayout.businessName}</strong> for <strong className="text-gray-900">{selectedPayout.payoutMonth} ({selectedPayout.payoutDates})</strong>;
              <br />
              IBAN: <code className="bg-gray-50 px-1 py-0.5 rounded text-gray-800 font-mono text-xs">{selectedPayout.iban.replace(/.(?=.{4})/g, "•")}</code>
              <br />
              <span className="text-rose-600 font-semibold text-xs mt-2 block">⚠️ This action is irreversible</span>
            </p>

            <div className="flex justify-end items-center gap-4 mt-2">
              <button
                onClick={() => setSelectedPayout(null)}
                className="text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmTransfer}
                className="bg-[#16A34A] hover:bg-[#15803d] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
