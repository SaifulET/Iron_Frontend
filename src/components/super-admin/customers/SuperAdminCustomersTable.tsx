"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  registered: string;
  businessesCount: number;
  cardSaved: boolean;
  marketingConsent: boolean;
  status: "Active" | "Doormat" | "Suspended";
}

interface SuperAdminCustomersTableProps {
  filteredCustomers: CustomerItem[];
  toggleStatus: (id: string, newStatus: "Active" | "Suspended") => void;
  onSelectCustomer?: (id: string) => void;
}

export default function SuperAdminCustomersTable({
  filteredCustomers,
  toggleStatus,
  onSelectCustomer
}: SuperAdminCustomersTableProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number; left: number } | null>(null);

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    if (openDropdownId === id) {
      setOpenDropdownId(null);
      setDropdownCoords(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const left = rect.right - 112; // dropdown width (112px)
      const spaceBelow = window.innerHeight - rect.bottom;
      let top = rect.bottom + 4;
      if (spaceBelow < 120) {
        top = rect.top - 70; // height offset
      }
      setOpenDropdownId(id);
      setDropdownCoords({ top, left });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-[#16A34A] border border-[#16A34A]/10";
      case "Doormat":
        return "bg-amber-50 text-[#A37616] border border-[#A37616]/10";
      case "Suspended":
        return "bg-rose-50 text-[#E14747] border border-[#E14747]/10";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const getAvatarInitialsAndColor = (name: string) => {
    const parts = name.split(" ");
    const initials = parts.map((p) => p[0]).join("").substring(0, 2).toUpperCase();
    return { initials, bg: "bg-[#EEF2FF]", text: "text-[#4338CA]" };
  };

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-visible w-full">
      <div className="overflow-x-auto lg:overflow-visible w-full min-h-[240px]">
        <table className="w-full text-left font-sans text-xs border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700 w-1/4">Customer</th>
              <th className="p-4 font-semibold text-gray-700">Registered</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Businesses</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Card Saved</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Marketing</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCustomers.map((c) => {
              const avatar = getAvatarInitialsAndColor(c.name);

              return (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Customer Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${avatar.bg} ${avatar.text}`}>
                        {avatar.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span
                          onClick={() => onSelectCustomer?.(c.id)}
                          className="font-semibold text-sm text-[#111827] hover:text-[#6366F1] hover:underline cursor-pointer truncate"
                        >
                          {c.name}
                        </span>
                        <span className="text-[11px] text-[#4E5F78] truncate">{c.email}</span>
                        <span className="text-[11px] text-[#4E5F78] truncate">{c.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Registered */}
                  <td className="p-4 text-gray-900 font-normal">{c.registered}</td>

                  {/* Businesses */}
                  <td className="p-4 text-center text-gray-900 font-normal">
                    {c.businessesCount}
                  </td>

                  {/* Card Saved */}
                  <td className="p-4 text-center">
                    {c.cardSaved ? (
                      <span className="text-emerald-600 font-semibold text-sm">✅</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  {/* Marketing */}
                  <td className="p-4 text-center">
                    {c.marketingConsent ? (
                      <span className="text-emerald-600 font-semibold text-sm">✅</span>
                    ) : (
                      <span className="text-rose-600 font-semibold text-sm">❌</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${getStatusBadgeClass(c.status)}`}>
                      {c.status}
                    </span>
                  </td>

                  {/* Actions Dropdown */}
                  <td className="p-4 relative overflow-visible">
                    <button
                      onClick={(e) => handleActionClick(e, c.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-[#111827] rounded-full text-xs font-semibold text-[#111827] hover:bg-gray-50 transition-colors"
                    >
                      <span>Action</span>
                      <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
                    </button>

                    {/* Backdrop to close dropdown on click outside */}
                    {openDropdownId === c.id && (
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
                    {openDropdownId === c.id && dropdownCoords && (
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
                        {c.status !== "Active" ? (
                          <button
                            onClick={() => {
                              toggleStatus(c.id, "Active");
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
                              toggleStatus(c.id, "Suspended");
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
        <span>Showing 1-4 of {filteredCustomers.length}</span>
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
