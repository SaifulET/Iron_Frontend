"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, ArrowDown01Icon, Car04Icon } from "@hugeicons/core-free-icons";

interface BusinessItem {
  id: string;
  name: string;
  category: string;
  type: "Premises" | "Mobile";
  city: string;
  status: "Approved" | "Pending" | "Warning" | "Suspended";
  bookings: number | null;
  newBookings: number | null;
  rating: number | null;
  reviewsCount: number | null;
  memberSince: string;
}

interface SuperAdminBusinessesTableProps {
  filteredBusinesses: BusinessItem[];
  toggleStatus: (id: string, newStatus: "Approved" | "Suspended") => void;
}

export default function SuperAdminBusinessesTable({
  filteredBusinesses,
  toggleStatus
}: SuperAdminBusinessesTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number; left: number } | null>(null);

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    if (openDropdownId === id) {
      setOpenDropdownId(null);
      setDropdownCoords(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const left = rect.right - 112; // dropdown width (w-28 = 112px)
      const spaceBelow = window.innerHeight - rect.bottom;
      let top = rect.bottom + 4;
      if (spaceBelow < 120) {
        top = rect.top - 70; // 66px height + 4px spacing
      }
      setOpenDropdownId(id);
      setDropdownCoords({ top, left });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-600";
      case "Pending":
        return "bg-amber-50 text-amber-600";
      case "Warning":
        return "bg-rose-50 text-rose-600";
      case "Suspended":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const getAvatarInitialsAndColor = (name: string) => {
    const parts = name.split(" ");
    const initials = parts.map((p) => p[0]).join("").substring(0, 2).toUpperCase();
    if (name.includes("Glam")) {
      return { initials, bg: "bg-[#EEF2FF]", text: "text-[#4338CA]" };
    }
    if (name.includes("TopCut")) {
      return { initials, bg: "bg-[#FEF3C7]", text: "text-[#92400E]" };
    }
    return { initials, bg: "bg-[#ECFDF5]", text: "text-[#065F46]" };
  };

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-visible w-full">
      <div className="overflow-x-auto lg:overflow-visible w-full min-h-[240px]">
        <table className="w-full text-left font-sans text-xs border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700 w-1/4">
                <div className="flex items-center gap-1">
                  <span>Business</span>
                  <span className="text-gray-400">↕</span>
                </div>
              </th>
              <th className="p-4 font-semibold text-gray-700">City</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>Bookings</span>
                  <span className="text-gray-400">↕</span>
                </div>
              </th>
              <th className="p-4 font-semibold text-gray-700 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>New Booking</span>
                  <span className="text-gray-400">↕</span>
                </div>
              </th>
              <th className="p-4 font-semibold text-gray-700 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>Rating</span>
                  <span className="text-gray-400">↕</span>
                </div>
              </th>
              <th className="p-4 font-semibold text-gray-700">
                <div className="flex items-center gap-1">
                  <span>Member Since</span>
                  <span className="text-gray-400">↕</span>
                </div>
              </th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBusinesses.map((b, idx) => {
              const avatar = getAvatarInitialsAndColor(b.name);
              // Open dropdown upwards for the last two items to avoid cutting it off, only if the list has more than 2 items
              const isLastRow = idx >= filteredBusinesses.length - 2 && filteredBusinesses.length > 2;

              return (
                <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Business Details */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${avatar.bg} ${avatar.text}`}>
                        {avatar.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm text-[#111827] truncate">{b.name}</span>
                        <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280] font-sans">
                          <span>{b.category}</span>
                          {b.type === "Mobile" && (
                            <>
                              <span className="w-[3px] h-[3px] rounded-full bg-[#6B7280]" />
                              <HugeiconsIcon icon={Car04Icon} className="w-4 h-4 text-[#4E5F78] shrink-0" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* City */}
                  <td className="p-4 text-gray-900 font-normal">{b.city}</td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${getStatusBadgeClass(b.status)}`}>
                      {b.status}
                    </span>
                  </td>

                  {/* Bookings */}
                  <td className="p-4 text-center text-gray-900 font-normal">
                    {b.bookings !== null ? b.bookings.toLocaleString() : "—"}
                  </td>

                  {/* New Bookings */}
                  <td className="p-4 text-center text-gray-900 font-normal">
                    {b.newBookings !== null ? b.newBookings.toLocaleString() : "—"}
                  </td>

                  {/* Rating */}
                  <td className="p-4">
                    {b.rating !== null ? (
                      <div className="flex items-center justify-center gap-1 text-gray-900">
                        <HugeiconsIcon icon={StarIcon} className="w-3.5 h-3.5 text-[#E49D12] fill-[#E49D12]" />
                        <span>{b.rating} ({b.reviewsCount})</span>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400">—</div>
                    )}
                  </td>

                  {/* Member Since */}
                  <td className="p-4 text-gray-500 font-normal">{b.memberSince}</td>

                  {/* Actions Dropdown */}
                  <td className="p-4 relative overflow-visible">
                    <button
                      onClick={(e) => handleActionClick(e, b.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#111827] rounded-full text-xs font-semibold text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      <span>Action</span>
                      <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
                    </button>

                    {/* Backdrop to close dropdown on click outside */}
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
                        {b.status !== "Approved" ? (
                          <button
                            onClick={() => {
                              toggleStatus(b.id, "Approved");
                              setOpenDropdownId(null);
                              setDropdownCoords(null);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 text-emerald-600 font-semibold"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              toggleStatus(b.id, "Suspended");
                              setOpenDropdownId(null);
                              setDropdownCoords(null);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-rose-50 hover:text-rose-600 text-rose-600 font-semibold"
                          >
                            Suspend
                          </button>
                        )}
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
        <span>Showing 1-7 of {filteredBusinesses.length}</span>
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
