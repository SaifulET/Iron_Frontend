"use client";

import React from "react";

interface LeadTimeSettingsSectionProps {
  allowBookingLead: string;
  setAllowBookingLead: (v: string) => void;
  maxAdvanceBooking: string;
  setMaxAdvanceBooking: (v: string) => void;
}

export default function LeadTimeSettingsSection({
  allowBookingLead,
  setAllowBookingLead,
  maxAdvanceBooking,
  setMaxAdvanceBooking
}: LeadTimeSettingsSectionProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className="flex-1 flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#111111]">Allow booking <span className="text-[#E24B4A]">*</span></label>
        <select
          value={allowBookingLead}
          onChange={(e) => setAllowBookingLead(e.target.value)}
          className="h-9 w-full bg-white border border-[#D3D1C7] rounded-lg px-2 text-xs font-poppins focus:outline-none cursor-pointer"
        >
          <option value="Up to 15 minutes before start time">Up to 15 minutes before start time</option>
          <option value="Up to 30 minutes before start time">Up to 30 minutes before start time</option>
          <option value="Up to 1 hour before start time">Up to 1 hour before start time</option>
          <option value="Up to 2 hours before start time">Up to 2 hours before start time</option>
          <option value="Up to 24 hours before start time">Up to 24 hours before start time</option>
        </select>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#111111]">Add no more than <span className="text-[#E24B4A]">*</span></label>
        <select
          value={maxAdvanceBooking}
          onChange={(e) => setMaxAdvanceBooking(e.target.value)}
          className="h-9 w-full bg-white border border-[#D3D1C7] rounded-lg px-2 text-xs font-poppins focus:outline-none cursor-pointer"
        >
          <option value="12 months in the future">12 months in the future</option>
          <option value="6 months in the future">6 months in the future</option>
          <option value="3 months in the future">3 months in the future</option>
          <option value="1 month in the future">1 month in the future</option>
        </select>
      </div>
    </div>
  );
}
