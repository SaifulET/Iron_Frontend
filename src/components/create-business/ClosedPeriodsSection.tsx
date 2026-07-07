"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Delete02Icon } from "@hugeicons/core-free-icons";

interface ClosedPeriodsSectionProps {
  closedPeriods: any[];
  updateClosedPeriod: (idx: number, field: string, val: string) => void;
  addClosedPeriod: () => void;
  removeClosedPeriod: (id: number) => void;
}

export default function ClosedPeriodsSection({
  closedPeriods,
  updateClosedPeriod,
  addClosedPeriod,
  removeClosedPeriod
}: ClosedPeriodsSectionProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center w-full">
        <span className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-wide">
          Closed Periods
        </span>
        <button
          type="button"
          onClick={addClosedPeriod}
          className="text-xs font-semibold hover:text-black flex items-center gap-1 text-[#0F6E56]"
        >
          <HugeiconsIcon icon={PlusSignIcon} className="w-3.5 h-3.5" />
          <span>Add holiday / closed dates</span>
        </button>
      </div>
      <p className="text-[11px] text-neutral-500 -mt-1 leading-relaxed">
        Define days or date ranges your business will be completely closed (e.g. holidays, Christmas, Easter, etc.). Customers won't be able to book any services during these periods.
      </p>

      {/* Lists of periods */}
      <div className="flex flex-col gap-4 mt-2">
        {closedPeriods.map((period, idx) => (
          <div key={period.id} className="flex flex-col md:flex-row gap-4 items-start md:items-end w-full border border-neutral-100 p-4 rounded-xl relative bg-white">
            {/* Start Date */}
            <div className="flex-1 flex flex-col gap-1.5 w-full">
              <label className="text-[10px] font-semibold text-neutral-500">Start Date</label>
              <input
                type="date"
                value={period.start}
                onChange={(e) => updateClosedPeriod(idx, "start", e.target.value)}
                className="h-9 border border-[#D3D1C7] rounded-lg px-3 text-xs w-full focus:outline-none"
              />
            </div>

            {/* End Date */}
            <div className="flex-1 flex flex-col gap-1.5 w-full">
              <label className="text-[10px] font-semibold text-neutral-500">End Date</label>
              <input
                type="date"
                value={period.end}
                onChange={(e) => updateClosedPeriod(idx, "end", e.target.value)}
                className="h-9 border border-[#D3D1C7] rounded-lg px-3 text-xs w-full focus:outline-none"
              />
            </div>

            {/* Reason/Label */}
            <div className="flex-1 flex flex-col gap-1.5 w-full">
              <label className="text-[10px] font-semibold text-neutral-500">Reason/Holiday label</label>
              <input
                type="text"
                placeholder="e.g. Christmas holidays"
                value={period.label}
                onChange={(e) => updateClosedPeriod(idx, "label", e.target.value)}
                className="h-9 border border-[#D3D1C7] rounded-lg px-3 text-xs w-full focus:outline-none"
              />
            </div>

            {/* Delete button */}
            <button
              type="button"
              onClick={() => removeClosedPeriod(period.id)}
              className="h-9 w-9 border border-red-100 hover:bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0"
            >
              <HugeiconsIcon icon={Delete02Icon} className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
