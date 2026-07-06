"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  User02Icon,
  Mail01Icon,
  Calendar01Icon,
  Clock01Icon,
  ArrowDown01Icon,
  Cancel01Icon,
  InformationCircleIcon
} from "@hugeicons/core-free-icons";

interface ClientBookingHistoryCardProps {
  bookingId: string;
  status: string;
  statusType?: "upcoming" | "noshow" | "completed" | "cancelled" | "late" | "pending";
  clientName?: string;
  clientGender?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAvatar?: string;
  isNewClient?: boolean;
  dateText?: string;
  timeText?: string;
  durationText?: string;
  staffName?: string;
  staffRole?: string;
  rescheduleText?: string;
  serviceName?: string;
  serviceDetailText?: string;
  servicePrice?: string;
  addonsName?: string;
  addonsDetailText?: string;
  addonsPrice?: string;
  depositedAmount?: string;
  remainingBalance?: string;
  clientNotesText?: string;
  businessNotesText?: string;
  addressText?: string;

  showClientDetails?: boolean;
  showDateTimeDetails?: boolean;
  showSummaryDetails?: boolean;
  showNotesDetails?: boolean;
  showFooterActions?: boolean;
  onCompleteBooking?: () => void;
}

export default function ClientBookingHistoryCard({
  bookingId,
  status,
  statusType = "upcoming",
  clientName = "John Doe",
  clientGender = "Male",
  clientEmail = "john.doe@example.com",
  clientPhone = "+357 99 123 456",
  clientAvatar = "/businessDashboard/downLogo.png",
  isNewClient = true,
  dateText = "Saturday, May 9",
  timeText = "10:00 - 11:20 AM",
  durationText = "1 hr 20 min",
  staffName = "George",
  staffRole = "Barber",
  rescheduleText = "Reschedule 1 of 2",
  serviceName = "YARD Beard Package",
  serviceDetailText = "Express Facial · Shave · Wax · 1 hr, 20 min",
  servicePrice = "€20",
  addonsName = "Add-ons",
  addonsDetailText = "Hair wash (flat fee) · Scalp treatment (flat fee)",
  addonsPrice = "€20",
  depositedAmount = "€8",
  remainingBalance = "€32",
  clientNotesText = "Please use organic products only, allergic to strong fragrances",
  businessNotesText,
  addressText,
  showClientDetails = true,
  showDateTimeDetails = true,
  showSummaryDetails = true,
  showNotesDetails = true,
  showFooterActions = false,
  onCompleteBooking,
}: ClientBookingHistoryCardProps) {
  const [showSummary, setShowSummary] = useState(true);
  const [showMarkedNoShow, setShowMarkedNoShow] = useState(true);

  // Status Badge coloring helper
  const renderStatusBadge = () => {
    const norm = (statusType || status || "").toLowerCase().trim();
    if (norm === "completed") {
      return (
        <span className="bg-[#E1F5EE] text-[#2F8068] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Completed
        </span>
      );
    }
    if (norm.includes("no-show - canceled") || norm.includes("no-show - cancelled") || norm.includes("noshow - canceled") || norm.includes("noshow - cancelled") || norm.includes("canceled") || norm.includes("cancelled")) {
      if (norm.includes("waived")) {
        return (
          <span className="bg-[#FFF0F0] text-[#E42424] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
            No-show - waived
          </span>
        );
      }
      if (norm.includes("canceled") || norm.includes("cancelled")) {
        if (norm.includes("no-show")) {
          return (
            <span className="bg-[#E1F5EE] text-[#2F8068] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
              No-show - canceled
            </span>
          );
        }
      }
    }
    if (norm.includes("no-show - charged") || norm === "noshow" || norm.includes("noshow")) {
      return (
        <div className="bg-[#E1F5EE] rounded-full px-3 py-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#2F8068] uppercase tracking-wider select-none inline-flex">
          <span>No-show</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F8068]" />
          <span>charged</span>
        </div>
      );
    }
    if (norm === "cancelled by customer" || norm === "canceled by customer") {
      return (
        <span className="bg-[#F0F0EE] text-[#5F5E5A] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Cancelled by customer
        </span>
      );
    }
    if (norm === "late cancellation") {
      return (
        <span className="bg-[#FCECE0] text-[#C96F53] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Late cancellation
        </span>
      );
    }
    if (norm === "upcoming") {
      return (
        <span className="bg-[#E6F1FB] text-[#3760B7] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Upcoming
        </span>
      );
    }
    if (norm === "cancelled by business" || norm === "canceled by business") {
      return (
        <span className="bg-[#E0F4FB] text-[#007CA2] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Cancelled by business
        </span>
      );
    }
    if (norm.includes("no-show - waived")) {
      return (
        <span className="bg-[#FFF0F0] text-[#E42424] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          No-show - waived
        </span>
      );
    }
    if (norm === "canceled" || norm === "cancelled") {
      return (
        <span className="bg-[#FFF0F0] text-[#E42424] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Canceled
        </span>
      );
    }
    if (norm === "pending") {
      return (
        <span className="bg-[#FCF4E0] text-[#D97706] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Pending
        </span>
      );
    }
    return (
      <span className="bg-neutral-100 text-neutral-600 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 1. MAIN CARD: Client details and Booking Header */}
      <div className="bg-white border border-neutral-200/60 rounded-2xl overflow-hidden shadow-sm flex flex-col w-full">
        {/* Header bar */}
        <div className="bg-[#F4F2EC] border-b border-[#EDD4D2] px-6 py-3.5 flex items-center justify-between select-none">
          <span className="font-poppins text-xs font-normal text-[#73726D] tracking-[0.075em] uppercase">
            {bookingId}
          </span>
          {renderStatusBadge()}
        </div>

        {/* Client details row */}
        {showClientDetails && (
          <div className="p-6 flex flex-col gap-4">
            <span className="font-poppins text-[10px] font-medium tracking-[0.075em] uppercase text-[#73726D]">
              Client
            </span>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-neutral-100 shrink-0">
                <img src={clientAvatar} alt={clientName} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-poppins font-semibold text-lg text-[#111111]">{clientName}</span>
                  {isNewClient && (
                    <span className="bg-[#3A97D1] text-white rounded-md px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.045em] select-none">
                      New
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#5F5E5A] font-poppins">
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={User02Icon} className="w-4 h-4 text-neutral-400" />
                    <span>{clientGender}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 text-neutral-400" />
                    <span>{clientEmail}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/Icons/phone.svg" alt="Phone" className="w-4 h-4 object-contain filter opacity-60" />
                    <span>{clientPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. DATE & TIME CARD */}
      {showDateTimeDetails && (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 shadow-sm flex flex-col gap-5 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Date block */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F5F4EE] rounded-xl flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={Calendar01Icon} className="w-5 h-5 text-neutral-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins text-[10px] text-neutral-400 uppercase tracking-wider">Date</span>
                <span className="font-poppins text-base font-semibold text-[#111111] mt-0.5">{dateText}</span>
              </div>
            </div>
            {/* Time block */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F5F4EE] rounded-xl flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={Clock01Icon} className="w-5 h-5 text-neutral-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins text-[10px] text-neutral-400 uppercase tracking-wider">Time</span>
                <span className="font-poppins text-base font-semibold text-[#111111] mt-0.5">
                  {timeText} <span className="text-xs text-neutral-400 font-normal ml-1">{durationText}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-poppins ml-1">
            <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold text-neutral-600 shrink-0">
              {staffName.charAt(0)}
            </div>
            <span>
              with {staffName} · {staffRole} {rescheduleText && `· ${rescheduleText}`}
            </span>
          </div>
        </div>
      )}

      {/* 3. STATUS LOG EXPLANATION (No-show charged only) */}
      {statusType === "noshow" && (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 w-full shadow-sm">
          <span className="font-poppins text-xs font-normal text-[#73726D] tracking-[0.075em] uppercase">
            Status
          </span>
          <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-xs font-medium text-[#111111] leading-relaxed">
            The 90-minute resolution window has passed with no response. The no-show fee has been automatically charged to the customer’s saved card. The amount will be included in your next monthly payout.
          </div>
        </div>
      )}

      {/* 4. MARKED AS NO-SHOW ACCORDION */}
      {(statusType === "pending" || statusType === "noshow") && (
        <div className="flex flex-col border border-neutral-200/60 bg-white rounded-2xl overflow-hidden shadow-sm w-full">
          {/* Accordion Header */}
          <div
            onClick={() => setShowMarkedNoShow(!showMarkedNoShow)}
            className="bg-[#F4F2EC] px-6 py-3.5 flex items-center justify-between cursor-pointer select-none text-[11px] text-[#73726D] tracking-wider uppercase font-semibold font-poppins"
          >
            <span>Marked as No-show</span>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className={`w-4 h-4 text-neutral-600 transition-transform duration-200 ${showMarkedNoShow ? "rotate-180" : ""}`}
            />
          </div>

          {showMarkedNoShow && (
            <div className="p-6 flex flex-col gap-5 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Timestamp Card */}
                <div className="bg-[#FEE6E6] rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 min-h-[118px]">
                  <span className="text-xs text-[#000000] font-inter">Timestamp</span>
                  <span className="text-sm font-semibold text-[#111111] font-poppins">{dateText}</span>
                  <span className="text-2xl font-bold text-[#000000] font-inter">11 : 30 AM</span>
                </div>
                {/* Timer Card */}
                <div className="bg-[#FEE6E6] rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 min-h-[118px]">
                  <span className="text-2xl font-bold text-[#000000] font-inter">
                    {statusType === "pending" ? "56 : 32" : "00 : 00"}
                  </span>
                  <span className="text-xs text-[#000000] text-center font-inter px-2 leading-relaxed">
                    Customer will be charged automatically when the timer reaches zero.
                  </span>
                </div>
              </div>

              {statusType === "pending" && (
                <>
                  {/* No-show fee box */}
                  <div className="bg-[#F5F4EE] border border-neutral-200/50 rounded-xl p-4 flex items-center justify-between font-poppins text-sm text-[#1C1B1C] mt-2">
                    <span className="font-medium">No-show fee</span>
                    <span className="font-bold text-base">€120.00</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <button className="h-[44px] rounded-lg bg-[#E24B4A] hover:bg-[#D34140] text-white text-xs font-semibold font-poppins shadow-sm">
                      Waive fee & cancel timer
                    </button>
                    <button className="h-[44px] rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-[#1C1B1C] text-xs font-semibold font-poppins shadow-sm">
                      Cancel No-show
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. BOOKING SUMMARY COLLAPSIBLE CARD */}
      {showSummaryDetails && (
        <div className="flex flex-col border border-neutral-200/60 bg-white rounded-2xl overflow-hidden shadow-sm w-full">
          <div
            onClick={() => setShowSummary(!showSummary)}
            className="bg-[#F4F2EC] px-6 py-3.5 flex items-center justify-between cursor-pointer select-none text-[11px] text-[#73726D] tracking-wider uppercase font-semibold font-poppins"
          >
            <span>Booking Summary</span>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              className={`w-4 h-4 text-neutral-600 transition-transform duration-200 ${showSummary ? "rotate-180" : ""}`}
            />
          </div>

          {showSummary && (
            <div className="p-6 flex flex-col gap-4 bg-white">
              {/* Main service */}
              {serviceName && (
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-poppins font-medium text-sm text-[#1C1B1C]">{serviceName}</span>
                    <span className="text-xs text-[#4E5F78] font-poppins mt-0.5">{serviceDetailText}</span>
                  </div>
                  <span className="font-poppins font-semibold text-sm text-[#1C1B1C]">{servicePrice}</span>
                </div>
              )}

              {/* Add-ons */}
              {addonsName && (
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-poppins font-medium text-sm text-[#1C1B1C]">{addonsName}</span>
                    <span className="text-xs text-[#4E5F78] font-poppins mt-0.5">{addonsDetailText}</span>
                  </div>
                  <span className="font-poppins font-semibold text-sm text-[#1C1B1C]">{addonsPrice}</span>
                </div>
              )}

              {(serviceName || addonsName) && <div className="border-t border-neutral-100 w-full" />}

              {/* Subtotal */}
              <div className="flex justify-between items-center text-sm font-semibold font-poppins text-[#1C1B1C]">
                <span>Subtotal</span>
                <span>
                  €{" "}
                  {((parseFloat(servicePrice.replace("€", "")) || 0) +
                    (parseFloat(addonsPrice.replace("€", "")) || 0))}
                </span>
              </div>

              {/* Remaining Balance card */}
              <div className="bg-[#F5F4EE] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center font-poppins text-xs text-[#1C1B1C]">
                  <span>Deposited</span>
                  <span className="font-semibold text-sm">{depositedAmount}</span>
                </div>
                <div className="border-t border-neutral-200/50 w-full" />
                <div className="flex justify-between items-center font-poppins text-[#1C1B1C]">
                  <span className="text-xs font-medium">
                    {depositedAmount === "-" ? "Full balance due at appointment" : "Remaining balance due at appointment"}
                  </span>
                  <span className="font-bold text-lg">
                    {depositedAmount === "-" 
                      ? `€${((parseFloat(servicePrice.replace("€", "")) || 0) + (parseFloat(addonsPrice.replace("€", "")) || 0))}`
                      : remainingBalance
                    }
                  </span>
                </div>
              </div>

              {/* No-show fee charged alert */}
              {statusType === "noshow" && (
                <>
                  <div className="flex justify-between items-center bg-[#E1F5EE]/50 border border-[#085041]/10 rounded-xl px-4 py-3 text-xs font-semibold text-[#085041] font-poppins mt-2">
                    <span>No-show fee charged 30%</span>
                    <span>€4.00</span>
                  </div>

                  {/* End of month finance info */}
                  <div className="flex items-center gap-2 bg-[#F5F4EE] rounded-xl p-3 text-[11px] text-[#73726D] font-poppins">
                    <HugeiconsIcon icon={InformationCircleIcon} className="w-4 h-4 text-neutral-500 shrink-0" />
                    <span>Appears in payouts & Finance end of month</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. ADDRESS CARD */}
      {(addressText || statusType === "noshow") && (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-2 w-full shadow-sm">
          <span className="font-poppins text-[10px] uppercase font-semibold text-[#73726D] tracking-[0.06em]">
            ADDRESS NOTE
          </span>
          <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-xs font-medium text-[#111111] leading-relaxed">
            <div className="text-[10px] uppercase font-semibold text-[#73726D] tracking-wider mb-1">NOTE</div>
            <div>{addressText || "Please use organic products only, allergic to strong fragrances"}</div>
          </div>
        </div>
      )}

      {/* 5. NOTES CARD */}
      {showNotesDetails && (
        <div className="flex flex-col gap-4 w-full">
          {clientNotesText && (
            <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-2 w-full">
              <span className="font-poppins text-[10px] uppercase font-semibold text-[#73726D] tracking-[0.06em]">
                CLIENT LEFT NOTES
              </span>
              <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-xs font-medium text-[#111111] leading-relaxed">
                <div className="text-[10px] uppercase font-semibold text-[#73726D] tracking-wider mb-1">NOTE</div>
                <div>{clientNotesText}</div>
              </div>
            </div>
          )}

          {(businessNotesText || statusType === "pending" || statusType === "noshow") && (
            <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-4 w-full">
              <span className="font-poppins text-[10px] uppercase font-semibold text-[#73726D] tracking-[0.06em]">
                BUSINESS NOTES
              </span>
              <div className="flex flex-col gap-2 font-poppins">
                <span className="text-[11px] text-neutral-400">Reason</span>
                <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-3 rounded-r-lg text-xs font-medium text-[#111111]">
                  {businessNotesText || "Customer did not attend"}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                <span className="text-[11px] text-neutral-400 font-poppins">Internal note (optional)</span>
                <textarea
                  placeholder="Add a private note about this ..."
                  className="w-full h-16 border-l-4 border-[#B4B3AF] bg-[#F5F4EE] rounded-r-lg p-3 text-xs placeholder-neutral-400 focus:outline-none resize-none font-poppins text-[#111111]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {showFooterActions && (statusType === "upcoming" || statusType === "pending" || statusType === "noshow") && (
        <div className="flex justify-end gap-3 mt-4 w-full select-none">
          {statusType === "pending" ? (
            <>
              <button className="h-[40px] px-6 rounded-lg bg-[#A3A3A2] hover:bg-neutral-500 text-white text-xs font-semibold font-poppins shadow-sm">
                Reschedule
              </button>
              <button
                onClick={onCompleteBooking}
                className="h-[40px] px-6 rounded-lg bg-[#B5E3D5] hover:bg-[#a5d3c5] text-white text-xs font-semibold font-poppins shadow-sm"
              >
                Complete Booking
              </button>
            </>
          ) : statusType === "noshow" ? (
            <>
              <button className="h-[40px] px-6 rounded-lg bg-[#A3A3A2] hover:bg-neutral-500 text-white text-xs font-semibold font-poppins shadow-sm">
                Reschedule
              </button>
              <button
                onClick={onCompleteBooking}
                className="h-[40px] px-6 rounded-lg bg-[#B5E3D5] hover:bg-[#a5d3c5] text-white text-xs font-semibold font-poppins shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>✓</span>
                <span>Completed</span>
              </button>
            </>
          ) : (
            <>
              <button className="h-[40px] px-6 rounded-lg bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold font-poppins shadow-sm">
                Reschedule
              </button>
              <button
                onClick={onCompleteBooking}
                className="h-[40px] px-6 rounded-lg bg-[#12B76A] hover:bg-[#0F9F5C] text-white text-xs font-semibold font-poppins shadow-sm"
              >
                Complete Booking
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
