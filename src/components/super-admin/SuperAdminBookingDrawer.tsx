"use client";

import React, { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";

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

interface SuperAdminBookingDrawerProps {
  booking: BookingItem | null;
  onClose: () => void;
}

export default function SuperAdminBookingDrawer({
  booking,
  onClose
}: SuperAdminBookingDrawerProps) {
  const [activeBooking, setActiveBooking] = useState<BookingItem | null>(null);

  useEffect(() => {
    if (booking) {
      setActiveBooking(booking);
    }
  }, [booking]);

  const isOpen = booking !== null;
  const displayBooking = activeBooking || booking;

  // Derive initials safely
  const customerInitials = displayBooking?.customerName
    ? displayBooking.customerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "AP";

  const businessInitials = displayBooking?.businessName
    ? displayBooking.businessName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "GL";

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
    <>
      {/* Backdrop overlay - transition opacity */}
      <div
        className={`fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel - transition transform */}
      <div
        className={`fixed right-0 top-0 h-screen w-full sm:w-[480px] bg-white shadow-[0px_10px_24px_rgba(0,0,0,0.12)] z-[101] flex flex-col font-sans transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {displayBooking && (
          <>
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-gray-200 shrink-0">
              <div className="flex items-center gap-6">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="flex items-center gap-1 text-[14px] font-normal text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <HugeiconsIcon icon={ArrowLeft02Icon} className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Close</span>
                </button>

                {/* Booking Title */}
                <span className="font-bold text-base text-[#111827]">
                  Booking #{displayBooking.bookingCode}
                </span>
              </div>

              {/* Status Badge */}
              <span className={`px-2.5 py-1 text-[12px] font-semibold rounded-full ${getStatusBadgeClass(displayBooking.status)}`}>
                {displayBooking.status}
              </span>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
              
              {/* CUSTOMER Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  Customer
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center font-bold text-sm text-[#4338CA] shrink-0">
                    {customerInitials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[15px] text-[#6366F1]">
                      {displayBooking.customerName}
                    </span>
                    <span className="text-[13px] text-[#2563EB] hover:underline cursor-pointer">
                      +357 99 111222
                    </span>
                  </div>
                </div>
              </div>

              {/* BUSINESS Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  Business
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center font-bold text-sm text-[#4338CA] shrink-0">
                    {businessInitials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[15px] text-[#6366F1]">
                      {displayBooking.businessName}
                    </span>
                    <span className="text-xs text-gray-500">
                      Hair Salons · {displayBooking.businessCity}
                    </span>
                  </div>
                </div>
              </div>

              {/* SESSION Section */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  Session
                </span>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Service</span>
                    <span className="font-medium text-[#111827]">{displayBooking.serviceName}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Date/Time</span>
                    <span className="font-medium text-[#111827]">Sun, {displayBooking.dateTime.replace(" - ", " at ")}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Duration</span>
                    <span className="font-medium text-[#111827]">90 minutes</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Type</span>
                    <span className="font-medium text-[#111827]">In-Person</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Location</span>
                    <span className="font-medium text-[#111827]">14 Ledra St, Nicosia 1011</span>
                  </div>
                </div>
              </div>

              {/* PAYMENT Section */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-5">
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  Payment
                </span>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Scenario</span>
                    <span className="font-medium text-[#111827]">Return booking</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Deposit</span>
                    <span className="font-medium text-[#111827]">— (return booking)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Card verified</span>
                    <span className="font-medium text-[#16A34A]">✅ Setup intent confirmed</span>
                  </div>
                </div>
              </div>

              {/* RELATIONSHIP Section */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-5">
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  Relationship
                </span>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Status</span>
                    <span className="font-medium text-[#111827]">Already Permanent</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-28 text-gray-400 shrink-0">Last event</span>
                    <span className="font-medium text-[#111827]">Attended</span>
                  </div>
                </div>
              </div>

              {/* COMMUNICATIONS LOG Section */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 pb-6">
                <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                  Communications Log
                </span>
                <div className="space-y-2.5">
                  <div className="bg-[#F9FAFB] rounded-lg p-3 flex flex-col gap-1 text-[13px]">
                    <span className="text-xs text-gray-400">17 May 2026 · 08:00</span>
                    <span className="text-gray-900 font-normal">SMS sent — 2h reminder</span>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-lg p-3 flex flex-col gap-1 text-[13px]">
                    <span className="text-xs text-gray-400">16 May 2026 · 10:00</span>
                    <span className="text-gray-900 font-normal">SMS sent — 24h reminder</span>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-lg p-3 flex flex-col gap-1 text-[13px]">
                    <span className="text-xs text-gray-400">10 May 2026 · 14:32</span>
                    <span className="text-gray-900 font-normal">SMS sent — booking confirmation</span>
                  </div>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}
