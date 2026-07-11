"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Car04Icon } from "@hugeicons/core-free-icons";

interface BookingItem {
  id: string;
  bookingCode: string;
  customerName: string;
  customerTag: "New" | "Manual" | "Returning";
  serviceName: string;
  staffName: string;
  extraDetails?: string;
  travelInfo?: string;
  dateTime: string;
  amount: string;
  businessName: string;
  businessCity: string;
  status: "Upcoming" | "Completed" | "Cancelled" | "No-Shows";
}

interface SuperAdminBookingsTableProps {
  filteredBookings: BookingItem[];
  toggleStatus: (id: string, newStatus: "Upcoming" | "Completed" | "Cancelled" | "No-Shows") => void;
}

export default function SuperAdminBookingsTable({
  filteredBookings,
  toggleStatus
}: SuperAdminBookingsTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number; left: number } | null>(null);

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    if (openDropdownId === id) {
      setOpenDropdownId(null);
      setDropdownCoords(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const left = rect.right - 112; // dropdown width
      const spaceBelow = window.innerHeight - rect.bottom;
      let top = rect.bottom + 4;
      if (spaceBelow < 120) {
        top = rect.top - 100; // offset
      }
      setOpenDropdownId(id);
      setDropdownCoords({ top, left });
    }
  };

  const getCustomerTagClass = (tag: string) => {
    switch (tag) {
      case "New":
        return "bg-[#ECECFC] text-[#6366F1]";
      case "Manual":
        return "bg-[#FEF6C7] text-[#323232]";
      case "Returning":
        return "bg-[#E3E3E3] text-[#323232]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-[#EEF2FF] text-[#4338CA]";
      case "Completed":
        return "bg-emerald-50 text-[#16A34A]";
      case "Cancelled":
        return "bg-rose-50 text-[#A31616]";
      case "No-Shows":
        return "bg-amber-50 text-[#A36116]";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-visible w-full">
      <div className="overflow-x-auto lg:overflow-visible w-full min-h-[280px]">
        <table className="w-full text-left font-sans text-xs border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Booking ID</th>
              <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Customer</th>
              <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Service</th>
              <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Date/Time</th>
              <th className="p-4 font-semibold text-gray-700 whitespace-nowrap text-center">Amount</th>
              <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Business</th>
              <th className="p-4 font-semibold text-gray-700 whitespace-nowrap text-center">Status</th>
              <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBookings.map((b) => {
              return (
                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Booking ID */}
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {b.bookingCode}
                  </td>

                  {/* Customer */}
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-semibold text-sm text-[#6366F1]">{b.customerName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getCustomerTagClass(b.customerTag)}`}>
                        {b.customerTag}
                      </span>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm text-gray-900">{b.serviceName}</span>
                      <span className="text-xs text-gray-500">{b.staffName}</span>
                      {b.extraDetails && (
                        <span className="text-xs text-gray-500">{b.extraDetails}</span>
                      )}
                      {b.travelInfo && (
                        <div className="flex items-center gap-1 text-[13px] text-[#2E9DA7] font-medium mt-0.5">
                          <HugeiconsIcon icon={Car04Icon} className="w-3.5 h-3.5 text-[#2E9DA7] shrink-0" />
                          <span>{b.travelInfo}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Date/Time */}
                  <td className="p-4 text-gray-900 font-normal whitespace-nowrap">
                    {b.dateTime}
                  </td>

                  {/* Amount */}
                  <td className="p-4 text-center text-gray-900 font-normal whitespace-nowrap">
                    {b.amount}
                  </td>

                  {/* Business */}
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{b.businessName}</span>
                      <span className="text-gray-400 text-[11px]">{b.businessCity}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4 text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full ${getStatusBadgeClass(b.status)}`}>
                      {b.status}
                    </span>
                  </td>

                  {/* Action Dropdown */}
                  <td className="p-4 relative overflow-visible">
                    <button
                      onClick={(e) => handleActionClick(e, b.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#111827] rounded-full text-xs font-semibold text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      <span>Action</span>
                      <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
                    </button>

                    {/* Backdrop */}
                    {openDropdownId === b.id && (
                      <div
                        className="fixed inset-0 z-[9998] bg-transparent cursor-default"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(null);
                          setDropdownCoords(null);
                        }}
                      />
                    )}

                    {/* Dropdown Menu */}
                    {openDropdownId === b.id && dropdownCoords && (
                      <div
                        style={{
                          position: "fixed",
                          top: `${dropdownCoords.top}px`,
                          left: `${dropdownCoords.left}px`,
                          width: "112px",
                        }}
                        className="bg-white border border-gray-100 rounded-lg shadow-lg z-[9999] py-1 font-sans text-xs"
                      >
                        <button
                          onClick={() => {
                            setOpenDropdownId(null);
                            setDropdownCoords(null);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700"
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            toggleStatus(b.id, "Completed");
                            setOpenDropdownId(null);
                            setDropdownCoords(null);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 text-emerald-600 font-semibold"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => {
                            toggleStatus(b.id, "Cancelled");
                            setOpenDropdownId(null);
                            setDropdownCoords(null);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-rose-50 hover:text-rose-600 text-rose-600 font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 bg-white font-sans text-xs text-gray-500">
        <span>Showing 1-4 of {filteredBookings.length}</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Previous
          </button>
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
