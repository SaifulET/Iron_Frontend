"use client";

import React from "react";

interface StatusItem {
  label: string;
  value: number;
  percent: number;
}

interface AnalyticsStatusesListProps {
  statusData: StatusItem[];
}

export default function AnalyticsStatusesList({ statusData }: AnalyticsStatusesListProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
      <h3 className="font-semibold text-base sm:text-lg text-[#111827] pb-2 border-b border-gray-100">
        Statuses
      </h3>
      <div className="flex flex-col gap-4.5 mt-2">
        {statusData.map((status, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-gray-55 last:border-0">
            <span className="text-sm font-medium text-[#111827] w-[180px] shrink-0">
              {status.label}
            </span>
            <div className="flex items-center gap-4 grow w-full">
              <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-[#6366F1] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${status.percent}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-[#111827] w-6 text-right shrink-0">
                {status.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
