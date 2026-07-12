"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Car04Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import SuperAdminBookingDrawer from "../SuperAdminBookingDrawer";

interface BusinessBookingsTabProps {
  businessId: string;
}

export default function BusinessBookingsTab({ businessId }: BusinessBookingsTabProps) {
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedStaff, setSelectedStaff] = useState("Staff");
  const [selectedCustomerType, setSelectedCustomerType] = useState("Customer type");
  const [openActionDropdownId, setOpenActionDropdownId] = useState<string | null>(null);
  const [selectedBookingForDrawer, setSelectedBookingForDrawer] = useState<any | null>(null);

  useEffect(() => {
    if (!openActionDropdownId) return;

    const handleOutsideClick = () => {
      setOpenActionDropdownId(null);
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openActionDropdownId]);

  const openBookingDrawer = (b: any) => {
    const mappedBooking = {
      id: b.id,
      bookingCode: b.id,
      customerName: b.customerName,
      customerTag: b.customerType as "New" | "Manual" | "Returning",
      serviceName: b.serviceName,
      staffName: b.staffName,
      extraDetails: b.addon || undefined,
      travelInfo: b.travelFee || undefined,
      dateTime: b.dateTime,
      amount: `€${b.amount}`,
      businessName: "Glam Studio",
      businessCity: "Nicosia",
      status: (b.status === "No-Show" ? "No-Shows" : b.status) as any,
    };
    setSelectedBookingForDrawer(mappedBooking);
  };

  // Mock Bookings State
  const [bookings, setBookings] = useState([
    {
      id: "BK-2831",
      customerName: "Nikos Ioannidis",
      customerType: "New",
      serviceName: "Full Colour",
      staffName: "Maria",
      addon: "+ Olaplex treatment",
      travelFee: null,
      dateTime: "16 May 2026 · 14:30",
      amount: 35,
      activationFee: 7,
      status: "Completed",
    },
    {
      id: "BK-2847",
      customerName: "Nikos Ioannidis",
      customerType: "New",
      serviceName: "Full Colour",
      staffName: "Maria",
      addon: "+ Olaplex treatment",
      travelFee: null,
      dateTime: "17 May 2026 · 10:00",
      amount: 80,
      activationFee: 16,
      status: "Upcoming",
    },
    {
      id: "BK-2848",
      customerName: "Nikos Ioannidis",
      customerType: "Manual",
      serviceName: "Full Colour",
      staffName: "Maria",
      addon: null,
      travelFee: "€15 travel - Larnaca",
      dateTime: "17 May 2026 · 10:00",
      amount: 80,
      activationFee: 16,
      status: "Upcoming",
    },
    {
      id: "BK-2849",
      customerName: "Nikos Ioannidis",
      customerType: "Returning",
      serviceName: "Full Colour",
      staffName: "Maria",
      addon: "+ Olaplex treatment",
      travelFee: null,
      dateTime: "17 May 2026 · 10:00",
      amount: 80,
      activationFee: 16,
      status: "Upcoming",
    },
    {
      id: "BK-2850",
      customerName: "Nikos Ioannidis",
      customerType: "Returning",
      serviceName: "Full Colour",
      staffName: "Maria",
      addon: null,
      travelFee: "€15 travel - Larnaca",
      dateTime: "17 May 2026 · 10:00",
      amount: 80,
      activationFee: 16,
      status: "Upcoming",
    },
  ]);

  const updateBookingStatus = (id: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    setOpenActionDropdownId(null);
  };

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const normalizedFilter = activeStatusFilter === "No-Shows" ? "No-Show" : activeStatusFilter;
    if (activeStatusFilter !== "All" && b.status.toLowerCase() !== normalizedFilter.toLowerCase()) return false;
    if (selectedStatus !== "Status" && b.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    if (selectedCustomerType !== "Customer type" && b.customerType.toLowerCase() !== selectedCustomerType.toLowerCase()) return false;
    return true;
  });

  const counts = {
    All: bookings.length,
    Upcoming: bookings.filter((b) => b.status === "Upcoming").length,
    Completed: bookings.filter((b) => b.status === "Completed").length,
    Cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    "No-Shows": bookings.filter((b) => b.status === "No-Show").length,
  };

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-gray-900">
      
      {/* Sub-status filter pills */}
      <div className="flex items-center gap-4 w-full border-b border-[#E5E7EB] pb-px overflow-x-auto">
        {[
          { label: "All", count: counts.All, color: "bg-[#6B7280]" },
          { label: "Upcoming", count: counts.Upcoming, color: "bg-[#6366F1]" },
          { label: "Completed", count: counts.Completed, color: "bg-[#16A34A]" },
          { label: "Cancelled", count: counts.Cancelled, color: "bg-[#A31616]" },
          { label: "No-Shows", count: counts["No-Shows"], color: "bg-[#A36116]" },
        ].map((tab) => {
          const isActive = activeStatusFilter === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveStatusFilter(tab.label)}
              className={`flex items-center gap-2 pb-2.5 px-1.5 text-sm font-medium transition-all duration-150 border-b-2 whitespace-nowrap cursor-pointer bg-transparent border-t-0 border-x-0 ${
                isActive
                  ? "border-[#6366F1] text-[#6366F1]"
                  : "border-transparent text-gray-550 hover:text-gray-900"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 text-[11px] font-bold text-white rounded-full ${tab.color}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Date Filters & Dropdown Selectors Row */}
      <div className="flex flex-wrap items-center gap-3 w-full text-xs text-gray-600">
        {/* From Date */}
        <div className="flex items-center gap-2">
          <span>From</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 bg-white text-[#314158] focus:outline-none"
          />
        </div>

        {/* To Date */}
        <div className="flex items-center gap-2">
          <span>To</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 bg-white text-[#314158] focus:outline-none"
          />
        </div>

        {/* Apply Button */}
        <button className="border border-[#111111] rounded-lg px-4 py-1.5 bg-white hover:bg-gray-55 font-semibold text-[#111111] cursor-pointer">
          Apply
        </button>

        {/* Status Dropdown */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-[#E2E8F0] bg-white rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
        >
          <option>Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="no-show">No-Show</option>
        </select>

        {/* Staff Dropdown */}
        <select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          className="border border-[#E2E8F0] bg-white rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
        >
          <option>Staff</option>
          <option>Maria</option>
        </select>

        {/* Customer Type Dropdown */}
        <select
          value={selectedCustomerType}
          onChange={(e) => setSelectedCustomerType(e.target.value)}
          className="border border-[#E2E8F0] bg-white rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
        >
          <option>Customer type</option>
          <option value="new">New</option>
          <option value="manual">Manual</option>
          <option value="returning">Returning</option>
        </select>
      </div>

      {/* Bookings Table List */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-[800px] md:min-w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100 text-[#374151] font-semibold">
                <th className="p-4 text-center">Booking ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date/Time</th>
                <th className="p-4 text-center">Amount</th>
                <th className="p-4 text-center">Activation Fee</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-800">
              {filteredBookings.map((b, idx) => {
                const isManual = b.customerType === "Manual";
                return (
                  <tr key={b.id} className="hover:bg-gray-55/30 transition-colors">
                    {/* Booking ID */}
                    <td
                      className="p-4 font-normal text-center text-gray-900 cursor-pointer hover:underline"
                      onClick={() => openBookingDrawer(b)}
                    >
                      {b.id}
                    </td>

                    {/* Customer */}
                    <td className="p-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className="font-semibold text-[#6366F1] cursor-pointer hover:underline"
                          onClick={() => openBookingDrawer(b)}
                        >
                          {b.customerName}
                        </span>
                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-semibold ${
                          b.customerType === "New"
                            ? "bg-[#ECECFC] text-[#6366F1]"
                            : b.customerType === "Manual"
                              ? "bg-[#FFF6AE] text-[#323232]"
                              : "bg-[#F3F4F6] text-[#4B5563]"
                        }`}>
                          {b.customerType}
                        </span>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-gray-900">{b.serviceName}</span>
                        <span className="text-gray-500">{b.staffName}</span>
                        {b.addon && <span className="text-gray-500">{b.addon}</span>}
                        {b.travelFee && (
                          <div className="flex items-center gap-1.5 text-[#2E9DA7] font-medium mt-0.5">
                            <HugeiconsIcon icon={Car04Icon} className="w-3.5 h-3.5 shrink-0" />
                            <span>{b.travelFee}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Date/Time */}
                    <td className="p-4 font-normal text-gray-900">{b.dateTime}</td>

                    {/* Amount */}
                    <td className="p-4 text-center font-normal text-gray-900">€{b.amount}</td>

                    {/* Activation Fee */}
                    <td className="p-4 text-center font-normal text-gray-900">€{b.activationFee}</td>

                    {/* Status */}
                    <td className="p-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
                        b.status === "Completed"
                          ? "bg-[#ECF7F3] text-[#148655]"
                          : b.status === "Upcoming"
                            ? "bg-[#EEF2FF] text-[#4338CA]"
                            : b.status === "Cancelled"
                              ? "bg-[#FDF2F2] text-[#B91C1C]"
                              : "bg-[#FFFBEB] text-[#D97706]"
                      }`}>
                        {b.status}
                      </span>
                    </td>

                    {/* Action Dropdown Menu */}
                    <td className="p-4 text-center relative">
                      <button
                        onClick={() =>
                          setOpenActionDropdownId(openActionDropdownId === b.id ? null : b.id)
                        }
                        className="inline-flex items-center justify-center gap-1 px-4 py-1.5 border border-gray-900 rounded-full text-xs font-semibold text-gray-950 hover:bg-gray-50 cursor-pointer bg-white"
                      >
                        <span>Action</span>
                        <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 shrink-0 text-gray-900" />
                      </button>

                      {openActionDropdownId === b.id && (
                        <div className={`absolute right-4 w-44 bg-white border border-gray-100 rounded-lg shadow-lg z-30 overflow-hidden text-left ${
                          idx >= filteredBookings.length - 2 ? "bottom-full mb-1.5" : "top-full mt-1"
                        }`}>
                          <button
                            onClick={() => {
                              openBookingDrawer(b);
                              setOpenActionDropdownId(null);
                            }}
                            className="w-full px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer text-left border-none bg-transparent"
                          >
                            View
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, "Completed")}
                            className="w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer text-left border-none bg-transparent"
                          >
                            Mark as Completed
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, "Cancelled")}
                            className="w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer text-left border-none bg-transparent"
                          >
                            Cancel Booking
                          </button>
                          {!isManual && (
                            <button
                              onClick={() => updateBookingStatus(b.id, "No-Show")}
                              className="w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer text-left border-none bg-transparent"
                            >
                              Mark as No-Show
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

        {/* Table Pagination */}
        <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-gray-500 font-medium">Showing 1-25 of 847</span>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:bg-gray-50 cursor-not-allowed bg-white" disabled>
              ← Previous
            </button>
            <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer bg-white">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Render Booking Drawer */}
      <SuperAdminBookingDrawer
        booking={selectedBookingForDrawer}
        onClose={() => setSelectedBookingForDrawer(null)}
      />
    </div>
  );
}
