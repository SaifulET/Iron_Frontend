"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon as DownloadIcon } from "@hugeicons/core-free-icons";

export interface PayoutHistoryItem {
  period: string;
  gross: string;
  fees: string;
  net: string;
  date: string;
  bank: string;
  status: "Pending" | "Paid";
}

const defaultHistory: PayoutHistoryItem[] = [
  { period: "May 2026", gross: "€171.00", fees: "-€3.50", net: "€167.50", date: "1 Jun 2026", bank: "IBAN ···4521", status: "Pending" },
  { period: "April 2026", gross: "€146.50", fees: "-€3.50", net: "€143.00", date: "1 May 2026", bank: "IBAN ···4521", status: "Paid" },
  { period: "March 2026", gross: "€102.00", fees: "-€3.50", net: "€98.50", date: "1 Apr 2026", bank: "IBAN ···4521", status: "Paid" },
  { period: "February 2026", gross: "€65.50", fees: "-€3.50", net: "€62.00", date: "1 Mar 2026", bank: "IBAN ···4521", status: "Paid" }
];

export default function PayoutsHistory() {
  const handleExportCSV = () => {
    const headers = ["PERIOD", "GROSS COLLECTED", "PROCESSING FEES", "NET PAYOUT", "TRANSFER DATE", "BANK ACCOUNT", "STATUS"];
    const rows = defaultHistory.map(h => [
      h.period,
      h.gross,
      h.fees,
      h.net,
      h.date,
      h.bank,
      h.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payout_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-white border border-[#E1DED6] rounded-[16px] overflow-hidden flex flex-col shadow-sm">
      
      {/* Card Header */}
      <div className="box-sizing-border-box flex flex-row justify-between items-center px-5 py-4 border-b border-[#E8E5DE] w-full">
        <div className="flex flex-col">
          <h3 className="font-poppins font-semibold text-[18px] leading-[27px] tracking-[-0.36px] text-[#4B4D47]">
            Payout history
          </h3>
          <span className="font-poppins font-medium text-xs leading-[18px] text-[#686B64]">
            Click any month to see individual transactions · Monthly SEPA transfers to your bank account
          </span>
        </div>
        
        {/* Export CSV button */}
        <button
          onClick={handleExportCSV}
          className="box-sizing-border-box flex flex-row align-center items-center px-4 py-1 gap-2 bg-white border border-[#DEDBD3] hover:bg-neutral-50 shadow-[0px_1px_0px_rgba(0,0,0,0.03)] rounded-[12px] h-[32px] text-[13px] font-medium text-[#4F504B] cursor-pointer transition-all"
        >
          <HugeiconsIcon icon={DownloadIcon} className="w-4 h-4 text-[#4F504B]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Table Element */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#EFEEE9] text-[11px] font-medium text-[#797A73] tracking-[0.66px] uppercase border-b border-[#ECE9E2]">
              <th className="py-3 px-4">PERIOD</th>
              <th className="py-3 px-4">GROSS COLLECTED</th>
              <th className="py-3 px-4">PROCESSING FEES</th>
              <th className="py-3 px-4">NET PAYOUT</th>
              <th className="py-3 px-4">TRANSFER DATE</th>
              <th className="py-3 px-4">BANK ACCOUNT</th>
              <th className="py-3 px-4">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECE9E2] text-xs font-poppins text-[#4B4D47]">
            {defaultHistory.map((item, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/50">
                <td className="py-3.5 px-4 font-medium">{item.period}</td>
                <td className="py-3.5 px-4">{item.gross}</td>
                <td className="py-3.5 px-4 text-[#BD5148] font-medium">{item.fees}</td>
                <td className="py-3.5 px-4 text-[#3D9E77] font-semibold">{item.net}</td>
                <td className="py-3.5 px-4 text-[#4B4D47] font-medium">{item.date}</td>
                <td className="py-3.5 px-4 text-[#4B4D47] font-medium">{item.bank}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${
                    item.status === "Pending" ? "bg-[#F3E7C4] text-[#93723D]" : "bg-[#D9EEE5] text-[#4D9A7A]"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
