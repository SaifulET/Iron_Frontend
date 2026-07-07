"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon as DownloadIcon } from "@hugeicons/core-free-icons";

export interface Transaction {
  client: string;
  date: string;
  type: "No-show" | "Late cancel";
  customer: "Returning" | "First booking";
  feeCharged: string;
  payout: string;
  notes?: string;
}

const defaultTransactions: Transaction[] = [
  { client: "Thalia P.", date: "25 May", type: "No-show", customer: "Returning", feeCharged: "€55.00", payout: "€55.00" },
  { client: "Niki P.", date: "20 May", type: "Late cancel", customer: "Returning", feeCharged: "€36.00", payout: "€36.00" },
  { client: "Demi M.", date: "18 May", type: "No-show", customer: "First booking", feeCharged: "€80.00", payout: "€60.00", notes: "Activation fee applied · Demi is now a returning customer" },
  { client: "Ioanna K.", date: "15 May", type: "Late cancel", customer: "First booking", feeCharged: "€40.00", payout: "€20.00", notes: "Activation fee applied · Ioanna is now a returning customer" },
  { client: "Ioanna K.", date: "15 May", type: "Late cancel", customer: "First booking", feeCharged: "€40.00", payout: "€0.00", notes: "Cancellation equals activation fee · Sofia is now a returning customer" },
  { client: "Thalia P.", date: "25 May", type: "No-show", customer: "Returning", feeCharged: "€55.00", payout: "€55.00" }
];

export default function PayoutsBreakdown() {
  const handleExportCSV = () => {
    const headers = ["CLIENT", "DATE", "TYPE", "CUSTOMER", "FEE CHARGED", "YOUR PAYOUT", "NOTES"];
    const rows = defaultTransactions.map(t => [
      t.client,
      t.date,
      t.type,
      t.customer,
      t.feeCharged,
      t.payout,
      t.notes || ""
    ]);
    
    // add processing fees row
    rows.push(["Stripe payment processing", "N/A", "Processing Fee", "N/A", "N/A", "-€2.50", "Passed through at cost"]);
    rows.push(["SEPA bank transfer", "N/A", "Transfer Fee", "N/A", "N/A", "-€1.00", "Passed through at cost"]);
    rows.push(["Total payout", "N/A", "N/A", "N/A", "N/A", "€167.50", "End of May 2026"]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transaction_breakdown_may_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-white border border-[#E1DED6] rounded-[16px] overflow-hidden flex flex-col shadow-sm">
      
      {/* Card Header */}
      <div className="box-sizing-border-box flex flex-row justify-between items-center px-5 py-4 border-b border-[#E8E5DE] w-full">
        <div className="flex flex-col">
          <h3 className="font-poppins font-semibold text-[18px] leading-[27px] tracking-[-0.36px] text-[#3F413D]">
            May 2026 — transaction breakdown
          </h3>
          <span className="font-poppins font-medium text-xs leading-[18px] text-[#686B64]">
            No-show and cancellation fees collected this month
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
              <th className="py-3 px-4 w-[120px]">CLIENT</th>
              <th className="py-3 px-4 w-[100px]">DATE</th>
              <th className="py-3 px-4 w-[120px]">TYPE</th>
              <th className="py-3 px-4 w-[140px]">CUSTOMER</th>
              <th className="py-3 px-4 text-right w-[120px]">FEE CHARGED</th>
              <th className="py-3 px-4 text-right w-[200px]">YOUR PAYOUT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECE9E2] text-xs font-poppins">
            
            {/* Row 1 */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-3.5 px-4 font-medium text-[#50524D]">Thalia P.</td>
              <td className="py-3.5 px-4 text-[#4B4D47] font-medium">25 May</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#F7DFDC] text-[#B35A52] text-[11px] font-medium rounded-full">
                  No-show
                </span>
              </td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#D9EEE5] text-[#4D9A7A] text-[11px] font-medium rounded-full">
                  Returning
                </span>
              </td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€55.00</td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€55.00</td>
            </tr>

            {/* Row 2 */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-3.5 px-4 font-medium text-[#50524D]">Niki P.</td>
              <td className="py-3.5 px-4 text-[#4B4D47] font-medium">20 May</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#F3E7C4] text-[#93723D] text-[11px] font-medium rounded-full">
                  Late cancel
                </span>
              </td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#D9EEE5] text-[#4D9A7A] text-[11px] font-medium rounded-full">
                  Returning
                </span>
              </td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€36.00</td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€36.00</td>
            </tr>

            {/* Row 3 */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-3.5 px-4 font-medium text-[#50524D]">Demi M.</td>
              <td className="py-3.5 px-4 text-[#4B4D47] font-medium">18 May</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#F7DFDC] text-[#B35A52] text-[11px] font-medium rounded-full">
                  No-show
                </span>
              </td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#E8DEF8] text-[#7461B7] text-[11px] font-medium rounded-full">
                  First booking
                </span>
              </td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€80.00</td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-medium text-[#4AAF82]">€60.00</span>
                  <span className="text-[9px] text-[#4AAF82] mt-0.5 leading-normal">
                    Activation fee applied · Demi is now a returning customer
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 4 */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-3.5 px-4 font-medium text-[#50524D]">Ioanna K.</td>
              <td className="py-3.5 px-4 text-[#4B4D47] font-medium">15 May</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#F3E7C4] text-[#93723D] text-[11px] font-medium rounded-full">
                  Late cancel
                </span>
              </td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#E8DEF8] text-[#7461B7] text-[11px] font-medium rounded-full">
                  First booking
                </span>
              </td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€40.00</td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-medium text-[#4AAF82]">€20.00</span>
                  <span className="text-[9px] text-[#4AAF82] mt-0.5 leading-normal">
                    Activation fee applied · Ioanna is now a returning customer
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 5 */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-3.5 px-4 font-medium text-[#50524D]">Ioanna K.</td>
              <td className="py-3.5 px-4 text-[#4B4D47] font-medium">15 May</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#F3E7C4] text-[#93723D] text-[11px] font-medium rounded-full">
                  Late cancel
                </span>
              </td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#E8DEF8] text-[#7461B7] text-[11px] font-medium rounded-full">
                  First booking
                </span>
              </td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€40.00</td>
              <td className="py-3.5 px-4 text-right">
                <div className="flex flex-col items-end">
                  <span className="font-medium text-neutral-400">€0.00</span>
                  <span className="text-[9px] text-[#4AAF82] mt-0.5 leading-normal">
                    Cancellation equals activation fee · Sofia is now a returning customer
                  </span>
                </div>
              </td>
            </tr>

            {/* Row 6 */}
            <tr className="hover:bg-neutral-50/50">
              <td className="py-3.5 px-4 font-medium text-[#50524D]">Thalia P.</td>
              <td className="py-3.5 px-4 text-[#4B4D47] font-medium">25 May</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#F7DFDC] text-[#B35A52] text-[11px] font-medium rounded-full">
                  No-show
                </span>
              </td>
              <td className="py-3.5 px-4">
                <span className="inline-flex px-2 py-0.5 bg-[#D9EEE5] text-[#4D9A7A] text-[11px] font-medium rounded-full">
                  Returning
                </span>
              </td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€55.00</td>
              <td className="py-3.5 px-4 text-right font-medium text-[#4AAF82]">€55.00</td>
            </tr>

            {/* Processing Fees section separator */}
            <tr className="bg-[#F8F7F2]">
              <td colSpan={6} className="py-2.5 px-4 text-[11px] font-semibold text-[#777970] tracking-[0.55px] uppercase">
                PROCESSING FEES — PASSED THROUGH AT COST, ZERO MARKUP
              </td>
            </tr>

            {/* Processing fee item 1 */}
            <tr>
              <td colSpan={5} className="py-3.5 px-4 text-[#4B4D47] font-medium">
                Stripe payment processing ((1.25% + €0.25 ) * 6 transactions)
              </td>
              <td className="py-3.5 px-4 text-right font-medium text-[#BD5148]">-€2.50</td>
            </tr>

            {/* Processing fee item 2 */}
            <tr>
              <td colSpan={5} className="py-3.5 px-4 text-[#4B4D47] font-medium">
                SEPA bank transfer — end of month payout
              </td>
              <td className="py-3.5 px-4 text-right font-medium text-[#BD5148]">-€1.00</td>
            </tr>

            {/* Total Payout Row */}
            <tr className="bg-[#DFF2EB] font-semibold text-[#3D8D70] text-sm">
              <td colSpan={5} className="py-4 px-4 text-[15px] font-semibold">
                Total payout — end of May 2026
              </td>
              <td className="py-4 px-4 text-right text-[18px] font-semibold">
                €167.50
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}
