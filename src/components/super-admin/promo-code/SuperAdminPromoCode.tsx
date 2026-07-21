"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import CreatePromoDrawer, { PromoCodeItem } from "./CreatePromoDrawer";

interface PromoLogItem {
  id: string;
  clientName: string;
  clientEmail: string;
  promoCode: string;
  discount: string;
  dateTime: string;
  business: string;
}

interface SuperAdminPromoCodeProps {
  onClientClick?: (email: string) => void;
}

export default function SuperAdminPromoCode({ onClientClick }: SuperAdminPromoCodeProps) {
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Expired" | "Deactivated">("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCodeItem | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<PromoCodeItem | null>(null);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number; left: number } | null>(null);

  const [promoCodes, setPromoCodes] = useState<PromoCodeItem[]>([
    {
      id: "1",
      code: "BOOKLY20",
      type: "%",
      value: 20,
      used: 34,
      limit: 100,
      perUserLimit: 1,
      expires: "30 Jun 2026",
      scope: "All first bookings",
      status: "Active"
    },
    {
      id: "2",
      code: "WELCOME5",
      type: "Fixed €",
      value: 5,
      used: 8,
      limit: 50,
      perUserLimit: 1,
      expires: "15 Jun 2026",
      scope: "All first bookings",
      status: "Active"
    },
    {
      id: "3",
      code: "SUMMER25",
      type: "%",
      value: 25,
      used: 100,
      limit: 100,
      perUserLimit: 1,
      expires: "30 May 2026",
      scope: "All first bookings",
      status: "Expired"
    }
  ]);

  const [usageLogs] = useState<PromoLogItem[]>([
    {
      id: "1",
      clientName: "Sara L.",
      clientEmail: "sara.l@example.com",
      promoCode: "SUMMER20",
      discount: "20%",
      dateTime: "Mon, 11 May 09:00",
      business: "Glow Spa"
    },
    {
      id: "2",
      clientName: "Dimitra V.",
      clientEmail: "dimitra.v@example.com",
      promoCode: "NEWUSER15",
      discount: "15%",
      dateTime: "Mon, 11 May 14:30",
      business: "Zenith Hair Salon"
    },
    {
      id: "3",
      clientName: "Chris M.",
      clientEmail: "chris.m@example.com",
      promoCode: "HOLIDAY10",
      discount: "10%",
      dateTime: "Tue, 12 May 14:00",
      business: "Fit Gym"
    }
  ]);

  // Handle clicking outside action dropdown to close it
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
        setSelectedPromo(null);
        setDropdownCoords(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>, promo: PromoCodeItem) => {
    e.stopPropagation();
    if (openDropdownId === promo.id) {
      setOpenDropdownId(null);
      setSelectedPromo(null);
      setDropdownCoords(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const left = Math.max(16, rect.right - 144); // prevent going offscreen on the left
      const spaceBelow = window.innerHeight - rect.bottom;
      let top = rect.bottom + 4;
      if (spaceBelow < 140) {
        top = rect.top - 114; // Position above the button (dropdown is ~110px tall)
      }
      setOpenDropdownId(promo.id);
      setSelectedPromo(promo);
      setDropdownCoords({ top, left });
    }
  };

  const handleSavePromoCode = (codeData: Omit<PromoCodeItem, "id" | "used"> & { id?: string }) => {
    if (codeData.id) {
      // Edit mode
      setPromoCodes((prev) =>
        prev.map((item) =>
          item.id === codeData.id
            ? {
                ...item,
                code: codeData.code,
                type: codeData.type,
                value: codeData.value,
                limit: codeData.limit,
                perUserLimit: codeData.perUserLimit,
                expires: codeData.expires,
                scope: codeData.scope,
                status: codeData.status
              }
            : item
        )
      );
    } else {
      // Create mode
      const newPromo: PromoCodeItem = {
        id: String(Date.now()),
        code: codeData.code,
        type: codeData.type,
        value: codeData.value,
        used: 0,
        limit: codeData.limit,
        perUserLimit: codeData.perUserLimit,
        expires: codeData.expires,
        scope: codeData.scope,
        status: "Active"
      };
      setPromoCodes((prev) => [newPromo, ...prev]);
    }
  };

  const handleToggleDeactivate = (id: string) => {
    setPromoCodes((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Deactivated" ? "Active" : "Deactivated";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    setOpenDropdownId(null);
    setSelectedPromo(null);
    setDropdownCoords(null);
  };

  const handleDelete = (id: string) => {
    setPromoCodes((prev) => prev.filter((item) => item.id !== id));
    setOpenDropdownId(null);
    setSelectedPromo(null);
    setDropdownCoords(null);
  };

  const handleEditClick = (item: PromoCodeItem) => {
    setEditingCode(item);
    setIsDrawerOpen(true);
    setOpenDropdownId(null);
    setSelectedPromo(null);
    setDropdownCoords(null);
  };

  const handleCreateClick = () => {
    setEditingCode(null);
    setIsDrawerOpen(true);
  };

  const filteredPromoCodes = promoCodes.filter((c) => {
    if (activeTab === "All") return true;
    return c.status === activeTab;
  });

  const getStatusBadge = (status: PromoCodeItem["status"]) => {
    switch (status) {
      case "Active":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E6F4EA] text-[#137333]">Active</span>;
      case "Expired":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F1F3F4] text-[#5F6368]">Expired</span>;
      case "Deactivated":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FCE8E6] text-[#C5221F]">Deactivated</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-12 font-sans">
      {/* Title & Create button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
        <h2 className="font-sans font-semibold text-2xl text-[#111827] leading-[32px]">
          Promo Code
        </h2>
        <button
          onClick={handleCreateClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-[#222222] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto"
        >
          <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4 text-white" />
          <span>Create Promo Code</span>
        </button>
      </div>

      {/* Main Promo Table Section */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col w-full">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 px-6 pt-4 gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
          {(["All", "Active", "Expired", "Deactivated"] as const).map((tab) => {
            const count = tab === "All" ? promoCodes.length : promoCodes.filter((c) => c.status === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium transition-all relative flex items-center gap-2 cursor-pointer ${
                  isActive ? "text-[#2E9DA7] font-semibold" : "text-[#4E5F78]"
                }`}
              >
                <span>{tab}</span>
                {count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-[#2E9DA7]/20 text-[#195156]" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E9DA7] rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Promo Codes Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Code</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Value</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Used / Limit</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Expires</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Scope</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPromoCodes.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 font-sans whitespace-nowrap">{promo.code}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-sans whitespace-nowrap">{promo.type}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 font-sans whitespace-nowrap">
                    {promo.type === "%" ? `${promo.value}% off` : `€${promo.value} off`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-sans whitespace-nowrap">
                    {promo.used} / {promo.limit}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-sans whitespace-nowrap">{promo.expires}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-sans whitespace-nowrap">{promo.scope}</td>
                  <td className="px-6 py-4 text-sm font-sans whitespace-nowrap">{getStatusBadge(promo.status)}</td>
                  <td className="px-6 py-4 text-sm font-sans text-right relative whitespace-nowrap">
                    <button
                      onClick={(e) => handleActionClick(e, promo)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors cursor-pointer"
                    >
                      <span>Action</span>
                      <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPromoCodes.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-500 font-sans">
                    No promo codes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer with simple pagination indicators */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-sans">
            Showing 1–{filteredPromoCodes.length} of {filteredPromoCodes.length}
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
              ← Previous
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Usage Logs Table Section */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col w-full mt-4">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Client</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Promo Code</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Discount</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Date & Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider font-sans whitespace-nowrap">Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {usageLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-sans whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E5F1F6] flex items-center justify-center text-xs font-semibold text-[#2E9DA7] shrink-0">
                        {log.clientName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex flex-col">
                        <span 
                          onClick={() => onClientClick && onClientClick(log.clientEmail)}
                          className="font-semibold text-gray-800 hover:text-[#2E9DA7] hover:underline cursor-pointer"
                        >
                          {log.clientName}
                        </span>
                        <span className="text-xs text-gray-400 font-normal">{log.clientEmail}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-sans whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-50 text-[#1E40AF] text-xs font-medium rounded border border-blue-100 font-mono">
                      {log.promoCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 font-sans whitespace-nowrap">{log.discount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-sans whitespace-nowrap">{log.dateTime}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-sans font-medium whitespace-nowrap">{log.business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with pagination indicators */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <span className="text-xs text-gray-500 font-sans">
            Showing 1–{usageLogs.length} of {usageLogs.length}
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
              ← Previous
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-400 bg-gray-50 cursor-not-allowed">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Drawer */}
      <CreatePromoDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSavePromoCode}
        editingCode={editingCode}
      />

      {/* Portal Action Dropdown */}
      {openDropdownId && selectedPromo && dropdownCoords && (
        <>
          {/* Backdrop to close dropdown on click outside */}
          <div
            className="fixed inset-0 z-[9998] bg-transparent cursor-default"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdownId(null);
              setSelectedPromo(null);
              setDropdownCoords(null);
            }}
          />

          {/* Action dropdown popup (positioned fixed at z-[9999] in front of all elements) */}
          <div
            style={{
              position: "fixed",
              top: `${dropdownCoords.top}px`,
              left: `${dropdownCoords.left}px`,
              width: "144px",
            }}
            className="bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] py-1 overflow-hidden font-sans"
          >
            <button
              onClick={() => handleEditClick(selectedPromo)}
              className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => handleToggleDeactivate(selectedPromo.id)}
              className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {selectedPromo.status === "Deactivated" ? "Activate" : "Deactivate"}
            </button>
            <button
              onClick={() => handleDelete(selectedPromo.id)}
              className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer border-t border-gray-100"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
