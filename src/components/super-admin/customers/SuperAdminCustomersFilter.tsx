"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";

interface SuperAdminCustomersFilterProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  onExport: () => void;
}

export default function SuperAdminCustomersFilter({
  selectedStatus,
  setSelectedStatus,
  onExport
}: SuperAdminCustomersFilterProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Status dropdown */}
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7]"
      >
        <option value="All">Status</option>
        <option value="Active">Active</option>
        <option value="Doormat">Doormat</option>
        <option value="Suspended">Suspended</option>
      </select>

      {/* Export CSV button */}
      <button
        onClick={onExport}
        className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
      >
        <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
        <span>Export CSV</span>
      </button>
    </div>
  );
}
