"use client";

import React from "react";

interface SuperAdminBookingsFilterProps {
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedStaff: string;
  setSelectedStaff: (staff: string) => void;
  selectedBusinessType: string;
  setSelectedBusinessType: (type: string) => void;
  selectedCustomerType: string;
  setSelectedCustomerType: (type: string) => void;
  onApplyFilters: () => void;
}

export default function SuperAdminBookingsFilter({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  selectedStatus,
  setSelectedStatus,
  selectedStaff,
  setSelectedStaff,
  selectedBusinessType,
  setSelectedBusinessType,
  selectedCustomerType,
  setSelectedCustomerType,
  onApplyFilters
}: SuperAdminBookingsFilterProps) {
  return (
    <div className="grid grid-cols-1 gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] w-full md:flex md:flex-wrap md:items-center">
      {/* Date Range Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:flex md:items-center md:w-auto md:gap-3">
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs font-medium text-gray-500 w-8 md:w-auto">From</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] cursor-pointer flex-1 md:flex-initial md:w-36"
          />
        </div>

        <div className="flex items-center gap-2 w-full">
          <span className="text-xs font-medium text-gray-500 w-8 md:w-auto">To</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] cursor-pointer flex-1 md:flex-initial md:w-36"
          />
        </div>

        <button
          onClick={onApplyFilters}
          className="bg-white hover:bg-gray-50 border border-[#111111] text-[#111111] px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors w-full sm:w-auto"
        >
          Apply
        </button>
      </div>

      {/* Vertical divider on desktop */}
      <div className="hidden md:block w-px h-6 bg-gray-200" />

      {/* Select Dropdowns */}
      <div className="grid grid-cols-2 gap-3 w-full md:flex md:items-center md:w-auto">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-white border border-[#E2E8F0] rounded-lg pl-3 pr-8 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] w-full md:w-28"
        >
          <option value="All">Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="No-Shows">No-Shows</option>
        </select>

        <select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          className="bg-white border border-[#E2E8F0] rounded-lg pl-3 pr-8 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] w-full md:w-28"
        >
          <option value="All">Staff</option>
          <option value="Maria">Maria</option>
          <option value="Eleni">Eleni</option>
        </select>

        <select
          value={selectedBusinessType}
          onChange={(e) => setSelectedBusinessType(e.target.value)}
          className="bg-white border border-[#E2E8F0] rounded-lg pl-3 pr-8 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] w-full md:w-36"
        >
          <option value="All">Business Type</option>
          <option value="Premises">Premises</option>
          <option value="Mobile">Mobile</option>
        </select>

        <select
          value={selectedCustomerType}
          onChange={(e) => setSelectedCustomerType(e.target.value)}
          className="bg-white border border-[#E2E8F0] rounded-lg pl-3 pr-8 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] w-full md:w-40"
        >
          <option value="All">Customer type</option>
          <option value="New">New</option>
          <option value="Returning">Returning</option>
          <option value="Manual">Manual</option>
        </select>
      </div>
    </div>
  );
}
