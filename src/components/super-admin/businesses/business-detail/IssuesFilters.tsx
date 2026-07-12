"use client";

import React from "react";

interface IssuesFiltersProps {
  fromDate: string;
  setFromDate: (val: string) => void;
  toDate: string;
  setToDate: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedStaff: string;
  setSelectedStaff: (val: string) => void;
  selectedCustomerType: string;
  setSelectedCustomerType: (val: string) => void;
  onApply: () => void;
}

export default function IssuesFilters({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  selectedStatus,
  setSelectedStatus,
  selectedStaff,
  setSelectedStaff,
  selectedCustomerType,
  setSelectedCustomerType,
  onApply,
}: IssuesFiltersProps) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-3 w-full text-xs text-gray-600">
      {/* From Date */}
      <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
        <span className="shrink-0 w-8 text-left">From</span>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full sm:w-auto border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 bg-white text-[#314158] focus:outline-none"
        />
      </div>

      {/* To Date */}
      <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
        <span className="shrink-0 w-8 text-left">To</span>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full sm:w-auto border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 bg-white text-[#314158] focus:outline-none"
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={onApply}
        className="col-span-2 sm:col-span-1 border border-[#111111] rounded-lg px-4 py-1.5 bg-white hover:bg-gray-55 font-semibold text-[#111111] cursor-pointer"
      >
        Apply
      </button>

      {/* Status Dropdown */}
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="col-span-1 border border-[#E2E8F0] bg-white rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer w-full sm:w-auto"
      >
        <option>Status</option>
        <option value="cancelled by business">Cancelled by business</option>
      </select>

      {/* Staff Dropdown */}
      <select
        value={selectedStaff}
        onChange={(e) => setSelectedStaff(e.target.value)}
        className="col-span-1 border border-[#E2E8F0] bg-white rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer w-full sm:w-auto"
      >
        <option>Staff</option>
        <option value="maria">Maria</option>
      </select>

      {/* Customer Type Dropdown */}
      <select
        value={selectedCustomerType}
        onChange={(e) => setSelectedCustomerType(e.target.value)}
        className="col-span-2 sm:col-span-1 border border-[#E2E8F0] bg-white rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer w-full sm:w-auto"
      >
        <option>Customer type</option>
        <option value="new">New</option>
        <option value="manual">Manual</option>
        <option value="returning">Returning</option>
      </select>
    </div>
  );
}
