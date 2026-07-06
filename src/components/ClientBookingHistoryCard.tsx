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
  InformationCircleIcon,
  Tick01Icon,
  Location05Icon,
  Building06Icon,
  SentIcon,
  Route01Icon,
  Home03Icon,
  Layers01Icon,
  PinIcon,
  Car04Icon
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

  city?: string;
  propertyType?: string;
  areaNeighbourhood?: string;
  streetName?: string;
  streetNumber?: string;
  floorUnit?: string;
  aptRoomNo?: string;
  isManual?: boolean;

  showClientDetails?: boolean;
  showDateTimeDetails?: boolean;
  showSummaryDetails?: boolean;
  showNotesDetails?: boolean;
  showFooterActions?: boolean;
  onCompleteBooking?: () => void;
  onReschedule?: (newDate: string, newTime: string) => void;
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
  serviceDetailText = "Express Facial • Shave • Wax • 1 hr, 20 min",
  servicePrice = "€20",
  addonsName = "Add-ons",
  addonsDetailText = "Hair wash (flat fee) • Scalp treatment (flat fee)",
  addonsPrice = "€20",
  depositedAmount = "€8",
  remainingBalance = "€32",
  clientNotesText = "Please use organic products only, allergic to strong fragrances",
  businessNotesText,
  addressText,

  city = "Limasol",
  propertyType = "Vila",
  areaNeighbourhood = "Mackenzie",
  streetName = "Emrou",
  streetNumber = "14",
  floorUnit = "3rd floor",
  aptRoomNo = "14",
  isManual = false,

  showClientDetails = true,
  showDateTimeDetails = true,
  showSummaryDetails = true,
  showNotesDetails = true,
  showFooterActions = false,
  onCompleteBooking,
  onReschedule,
}: ClientBookingHistoryCardProps) {
  const [showSummary, setShowSummary] = useState(true);
  const [showMarkedNoShow, setShowMarkedNoShow] = useState(true);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [selectedDay, setSelectedDay] = useState(18);
  const [selectedTime, setSelectedTime] = useState("14:00");
  const isCancelledBooking = status.toLowerCase().includes("cancel") || status.toLowerCase().includes("waived");

  // Status Badge coloring helper
  const renderStatusBadge = () => {
    const norm = (status || statusType || "").toLowerCase().trim();
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
          <span className="bg-[#F7E0E0] border border-[#702A2A] text-[#702A2A] rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider select-none inline-flex items-center gap-1">
            <span>No-show</span>
            <span className="w-1 h-1 rounded-full bg-[#702A2A]" />
            <span>Waived</span>
          </span>
        );
      }
      if (norm.includes("no-show") || norm.includes("noshow")) {
        return (
          <span className="bg-[#E0F7E9] border border-[#2A7047] text-[#2A7047] rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider select-none inline-flex items-center gap-1">
            <span>No-show</span>
            <span className="w-1 h-1 rounded-full bg-[#2A7047]" />
            <span>Canceled</span>
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
        <span className="bg-[#FFF0F0] border border-[#E42424] text-[#E42424] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Canceled by Customer
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
        <span className="bg-[#94EEFF] border border-[#075E6F] text-[#075E6F] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
          Cancelled by Business
        </span>
      );
    }
    if (norm.includes("waived")) {
      return (
        <span className="bg-[#F7E0E0] border border-[#702A2A] text-[#702A2A] rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider select-none inline-flex items-center gap-1">
          <span>No-show</span>
          <span className="w-1 h-1 rounded-full bg-[#702A2A]" />
          <span>Waived</span>
        </span>
      );
    }
    if (norm === "canceled" || norm === "cancelled") {
      return (
        <span className="bg-[#FFF0F0] border border-[#E42424] text-[#E42424] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider select-none">
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
        <div className="relative bg-[#F4F2EC] border-b border-[#EDD4D2] px-6 py-3.5 flex items-center justify-between select-none">
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
            <div className="flex items-center justify-between gap-4 w-full">
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
                    {isManual && (
                      <span className="bg-[#F5F4EE] text-[#5F5E5A] rounded-md px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.045em] select-none">
                        Manual
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

              {/* More button */}
              <button className="h-9 px-3 border border-[#111111]/40 rounded-lg flex items-center justify-between gap-2 hover:bg-neutral-50 transition-all text-xs font-medium text-[#111111] opacity-70">
                <span>More</span>
                <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 text-[#111111]" />
              </button>
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
              with {staffName} • {staffRole} {rescheduleText && `• ${rescheduleText}`}
            </span>
          </div>
        </div>
      )}

      {/* 2.5 ADDRESS GRID CARD */}
      {addressText && (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-5 w-full shadow-sm">
          <span className="font-poppins text-xs font-normal text-[#73726D] tracking-[0.075em] uppercase">
            Address
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-poppins">
            {/* City */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[#73726D] uppercase tracking-wider">City</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                <HugeiconsIcon icon={Location05Icon} className="w-5 h-5 text-neutral-500 shrink-0" />
                <span>{city}</span>
              </div>
            </div>
            {/* Property Type */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[#73726D] uppercase tracking-wider">Property Type</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                <HugeiconsIcon icon={Building06Icon} className="w-5 h-5 text-neutral-500 shrink-0" />
                <span>{propertyType}</span>
              </div>
            </div>
            {/* Area/Neighbourhood */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[#73726D] uppercase tracking-wider">Area/Neighbourhood</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                <HugeiconsIcon icon={SentIcon} className="w-5 h-5 text-neutral-500 shrink-0" />
                <span>{areaNeighbourhood}</span>
              </div>
            </div>
            {/* Street Name */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[#73726D] uppercase tracking-wider">Street Name</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                <HugeiconsIcon icon={Route01Icon} className="w-5 h-5 text-neutral-500 shrink-0" />
                <span>{streetName}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 font-poppins mt-2">
            {/* Street Number */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[#73726D] uppercase tracking-wider">Street Number</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                <HugeiconsIcon icon={Home03Icon} className="w-5 h-5 text-neutral-500 shrink-0" />
                <span>{streetNumber}</span>
              </div>
            </div>
            {/* Floor/Unit */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[#73726D] uppercase tracking-wider">Floor/Unit</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                <HugeiconsIcon icon={Layers01Icon} className="w-5 h-5 text-neutral-500 shrink-0" />
                <span>{floorUnit}</span>
              </div>
            </div>
            {/* Apt/Room No. */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[#73726D] uppercase tracking-wider">Apt/Room No.</span>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#111111]">
                <HugeiconsIcon icon={PinIcon} className="w-5 h-5 text-neutral-500 shrink-0" />
                <span>{aptRoomNo}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. STATUS LOG EXPLANATION */}
      {status.toLowerCase().includes("waived") ? (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 w-full shadow-sm">
          <span className="font-poppins text-xs font-normal text-[#73726D] tracking-[0.075em] uppercase">
            Status
          </span>
          <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-base font-medium text-[#111111] leading-relaxed">
            The no-show was waived within the 90-minute window. This booking is considered cancelled. This customer is now activated – their next booking with you will require no deposit.
          </div>
        </div>
      ) : (status.toLowerCase().includes("cancelled by business") || status.toLowerCase().includes("canceled by business")) ? (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 w-full shadow-sm">
          <span className="font-poppins text-xs font-normal text-[#73726D] tracking-[0.075em] uppercase">
            Status
          </span>
          <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-sm font-medium text-[#111111] leading-relaxed">
            {depositedAmount === "-"
              ? "This booking was cancelled by the business. No deposit was held and no refund was due. The customer remains activated for future bookings with you"
              : "This booking was cancelled by the business. The full deposit has been refunded to the customer. As this customer was not activated, a deposit will require again on their next booking with you."
            }
          </div>
        </div>
      ) : status.toLowerCase().includes("late cancellation") ? (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 w-full shadow-sm">
          <span className="font-poppins text-xs font-normal text-[#73726D] tracking-[0.075em] uppercase">
            Status
          </span>
          <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-sm font-medium text-[#111111] leading-relaxed">
            {bookingId === "#BK-0035"
              ? "This booking was cancelled by the customer and a 20% cancellation fee was charged. This fee has been retained by Bookly as the platform activation fee. No cancellation payout was due to you for this booking. This customer is now activated — their next booking with you will require no deposit."
              : bookingId === "#BK-0034"
                ? "This booking was cancelled by the customer outside the free cancellation window. A late cancellation fee was charged. The platform deposit has been retained by Bookly and the remaining balance will be transferred to you in your monthly payout. This customer is now activated — their next booking with you will require no deposit."
                : "This booking was cancelled by the customer outside the free cancellation window. A late cancellation fee was charged in full and will be transferred to you in your monthly payout. No platform fee was applied."
            }
          </div>
        </div>
      ) : (status.toLowerCase().includes("cancelled by customer") || status.toLowerCase().includes("canceled by customer")) ? (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 w-full shadow-sm">
          <span className="font-poppins text-xs font-normal text-[#73726D] tracking-[0.075em] uppercase">
            Status
          </span>
          <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-sm font-medium text-[#111111] leading-relaxed">
            {depositedAmount === "-"
              ? "This booking was cancelled by the customer within the free cancellation window. No charges were applied and no refund was due. The customer remains activated for future bookings with you."
              : "This booking was cancelled by the customer within the free cancellation window. The full deposit has been refunded to the customer. As the cancellation occurred before activation, a deposit will be required again on their next booking with you"
            }
          </div>
        </div>
      ) : (status.toLowerCase().includes("no-show - canceled") || status.toLowerCase().includes("no-show - cancelled") || status.toLowerCase().includes("noshow - canceled") || status.toLowerCase().includes("noshow - cancelled")) ? (
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 w-full shadow-sm">
          <span className="font-poppins text-xs font-normal text-[#73726D] tracking-[0.075em] uppercase">
            Status
          </span>
          <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-sm font-medium text-[#111111] leading-relaxed">
            {depositedAmount === "-"
              ? "The no-show was cancelled within the 90-minute window. This booking is considered completed."
              : "The no-show was cancelled by the business within the 90-minute window. This booking is considered completed by Bookly. The platform deposit has been retained by Bookly as the activation fee. No additional payout was due for this booking. This customer is now activated — their next booking with you will require no deposit."
            }
          </div>
        </div>
      ) : (statusType === "noshow" || status.toLowerCase().includes("no-show")) && (
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
      {(statusType === "pending" || (statusType === "noshow" && !status.toLowerCase().includes("waived") && !status.toLowerCase().includes("cancel") && !status.toLowerCase().includes("cancelled") && !status.toLowerCase().includes("canceled"))) && (
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
            <div className="p-4 flex flex-col gap-6 bg-white">
              <div className={status.toLowerCase().includes("waived") ? "opacity-30 flex flex-col gap-6" : "flex flex-col gap-6"}>
                {/* Main service */}
                {serviceName && (
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="font-poppins font-medium text-sm text-[#1C1B1C]">{serviceName}</span>
                      <span className="text-xs text-[#4E5F78] font-poppins mt-0.5">{serviceDetailText}</span>
                    </div>
                    <span className="font-poppins font-semibold text-sm text-[#1C1B1C]">{servicePrice}</span>
                  </div>
                )}

                {/* Add-ons */}
                {addonsName && (
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="font-poppins font-medium text-sm text-[#1C1B1C]">{addonsName}</span>
                      <span className="text-xs text-[#4E5F78] font-poppins mt-0.5">{addonsDetailText}</span>
                    </div>
                    <span className="font-poppins font-semibold text-sm text-[#1C1B1C]">{addonsPrice}</span>
                  </div>
                )}

                {/* Travel fee */}
                {addressText && (
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={Car04Icon} className="w-5 h-5 text-neutral-600 shrink-0" />
                        <span className="font-poppins font-medium text-sm text-[#1C1B1C]">
                          Travel fee
                        </span>
                      </div>
                      <span className="text-xs text-[#4E5F78] font-poppins mt-0.5">
                        We come to you · Larnaca area
                      </span>
                    </div>
                    <span className="font-poppins font-semibold text-sm text-[#1C1B1C]">€20</span>
                  </div>
                )}

                {(serviceName || addonsName || addressText) && <div className="border-t border-[#757575]/20 w-full" />}

                {/* Subtotal */}
                <div className="flex justify-between items-center text-sm font-semibold font-poppins text-[#1C1B1C] px-2">
                  <span>Subtotal</span>
                  <span>
                    €{" "}
                    {((parseFloat(servicePrice.replace("€", "")) || 0) +
                      (parseFloat(addonsPrice.replace("€", "")) || 0) +
                      (addressText ? 20 : 0))}
                  </span>
                </div>

                {/* Remaining Balance card */}
                {status.toLowerCase().includes("waived") ? (
                  <div className="bg-[#F5F4EE] rounded-xl p-4 flex flex-col gap-5">
                    <div className="flex justify-between items-center font-poppins text-xs text-[#1C1B1C]">
                      <span>Deposited</span>
                      <span className="font-semibold text-2xl">{depositedAmount}</span>
                    </div>
                    <div className="border-t border-[#757575]/20 w-full" />
                    <div className="flex justify-between items-center font-poppins text-[#1C1B1C]">
                      <span className="text-xs font-medium">Remaining balance due at venue</span>
                      <span className="font-semibold text-sm line-through">{remainingBalance}</span>
                    </div>
                    <div className="flex justify-between items-center font-poppins text-[#1C1B1C]">
                      <span className="text-xs font-medium">No-show fee waived by you</span>
                      <span className="font-semibold text-sm">€20</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F5F4EE] rounded-xl p-4 flex flex-col gap-5">
                    <div className={`flex justify-between items-center font-poppins text-sm text-[#1C1B1C] ${isCancelledBooking ? "opacity-30" : ""}`}>
                      <span>Deposited</span>
                      <span className="font-semibold text-2xl">{depositedAmount}</span>
                    </div>
                    <div className="border-t border-[#757575]/20 w-full" />
                    <div className={`flex justify-between items-center font-poppins text-[#1C1B1C] ${isCancelledBooking ? "opacity-30" : ""}`}>
                      <span className="text-sm font-medium">
                        {(depositedAmount === "-" || status.toLowerCase().includes("late cancellation") || status.toLowerCase().includes("by customer") || status.toLowerCase() === "canceled" || status.toLowerCase() === "cancelled")
                          ? "Full balance due at appointment"
                          : "Remaining balance due at appointment"
                        }
                      </span>
                      <span className="font-semibold text-2xl text-[#1C1B1C]">
                        {depositedAmount === "-"
                          ? `€${((parseFloat(servicePrice.replace("€", "")) || 0) + (parseFloat(addonsPrice.replace("€", "")) || 0) + (addressText ? 20 : 0))}`
                          : remainingBalance
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {((status.toLowerCase().includes("waived") && depositedAmount !== "-") ||
                status.toLowerCase().includes("by business") ||
                (status.toLowerCase().includes("by customer") && depositedAmount !== "-")) && (
                  <div className="flex justify-between items-center bg-[#EEF5F0] rounded-xl px-4 py-3 text-sm font-semibold text-[#297A5E] font-poppins mt-2">
                    <span>Total deposit refunded</span>
                    <span>{depositedAmount === "-" ? "€0.00" : "€8.00"}</span>
                  </div>
                )}

              {status.toLowerCase().includes("by customer") && depositedAmount === "-" && (
                <div className="flex justify-between items-center bg-[#EEF5F0] rounded-xl px-4 py-3 text-sm font-semibold text-[#297A5E] font-poppins mt-2">
                  <span>Cancellation fee charged 0%</span>
                  <span>€0.00</span>
                </div>
              )}

              {status.toLowerCase().includes("late cancellation") && (
                <div className="flex flex-col gap-2 bg-[#EEF5F0] rounded-xl px-4 py-3 text-sm font-semibold font-poppins mt-2">
                  {bookingId === "#BK-0035" ? (
                    <>
                      <div className="flex justify-between items-center text-[#297A5E]">
                        <span>Cancellation fee charged 20%</span>
                        <span>€0.00</span>
                      </div>
                      <div className="border-t border-[#297A5E]/15 my-1.5" />
                      <div className="flex justify-between items-center text-[#1C1B1C]">
                        <span>Deposit retained by Bookly</span>
                        <span>€8.00</span>
                      </div>
                    </>
                  ) : bookingId === "#BK-0034" ? (
                    <>
                      <div className="flex justify-between items-center text-[#297A5E]">
                        <span>Cancellation fee charged 40%</span>
                        <span>€8.00</span>
                      </div>
                      <div className="border-t border-[#297A5E]/15 my-1.5" />
                      <div className="flex justify-between items-center text-[#1C1B1C]">
                        <span>Deposit retained by Bookly</span>
                        <span>€8.00</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center text-[#297A5E]">
                      <span>Cancellation fee charged 30%</span>
                      <span>€12.00</span>
                    </div>
                  )}
                </div>
              )}

              {/* No-show fee charged alert */}
              {statusType === "noshow" &&
                !status.toLowerCase().includes("waived") &&
                !status.toLowerCase().includes("cancel") &&
                !status.toLowerCase().includes("cancelled") &&
                !status.toLowerCase().includes("canceled") && (
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
                {status.toLowerCase() === "canceled" || status.toLowerCase() === "cancelled" ? "NOTE" : "CLIENT LEFT NOTES"}
              </span>
              <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-xs font-medium text-[#111111] leading-relaxed">
                <div className="text-[10px] uppercase font-semibold text-[#73726D] tracking-wider mb-1">NOTE</div>
                <div>{clientNotesText}</div>
              </div>
            </div>
          )}

          {(businessNotesText || statusType === "pending" || (statusType === "noshow" && !status.toLowerCase().includes("waived") && !status.toLowerCase().includes("cancel") && !status.toLowerCase().includes("cancelled") && !status.toLowerCase().includes("canceled"))) && (
            <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-4 w-full">
              <span className="font-poppins text-[10px] uppercase font-semibold text-[#73726D] tracking-[0.06em]">
                BUSINESS NOTES
              </span>
              <div className="flex flex-col gap-2 font-poppins">
                <span className="text-[11px] text-neutral-400">
                  {status.toLowerCase().includes("waived")
                    ? "Reason for waiving"
                    : status === "Completed"
                      ? "Did the customer paid the remaining balance at the venue"
                      : "Reason"
                  }
                </span>
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

      {showFooterActions && (statusType === "upcoming" || statusType === "pending" || statusType === "noshow" || status.toLowerCase().includes("by business") || status.toLowerCase().includes("late cancellation") || status.toLowerCase().includes("by customer") || status.toLowerCase() === "canceled" || status.toLowerCase() === "cancelled") && (
        <div className="flex justify-end gap-3 mt-4 w-full select-none">
          {status.toLowerCase().includes("by business") || status.toLowerCase().includes("late cancellation") || status.toLowerCase().includes("by customer") || status.toLowerCase() === "canceled" || status.toLowerCase() === "cancelled" ? (
            <>
              <button
                disabled
                className="h-[40px] px-6 rounded-lg bg-[#A3A3A2] text-white text-xs font-semibold font-poppins shadow-sm opacity-50 cursor-not-allowed"
              >
                Reschedule
              </button>
              <button
                disabled
                className="h-[40px] px-6 rounded-lg bg-[#B5E3D5] text-white text-xs font-semibold font-poppins shadow-sm opacity-50 cursor-not-allowed"
              >
                Complete Booking
              </button>
            </>
          ) : statusType === "pending" ? (
            <>
              <button
                onClick={() => setIsRescheduling(true)}
                className="h-[40px] px-6 rounded-lg bg-[#A3A3A2] hover:bg-neutral-500 text-white text-xs font-semibold font-poppins shadow-sm"
              >
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
              <button
                onClick={() => setIsRescheduling(true)}
                className="h-[40px] px-6 rounded-lg bg-[#A3A3A2] hover:bg-neutral-500 text-white text-xs font-semibold font-poppins shadow-sm"
              >
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
              <button
                onClick={() => setIsRescheduling(true)}
                className="h-[40px] px-6 rounded-lg bg-[#111111] hover:bg-neutral-800 text-white text-xs font-semibold font-poppins shadow-sm"
              >
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

      {/* RESCHEDULE MODAL */}
      {isRescheduling && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center overflow-y-auto p-4 font-poppins">
          <div className="bg-white rounded-2xl p-8 max-w-[700px] w-full relative shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            {/* Title */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h2 className="text-2xl font-semibold text-[#111111]">Reschedule booking</h2>
              <button
                onClick={() => setIsRescheduling(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-6 h-6" />
              </button>
            </div>

            {/* Select Date & Time header */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Select Date & Time</span>
              <div className="h-[1px] bg-neutral-200 w-full my-2" />
            </div>

            {/* Service details */}
            <div className="flex flex-col gap-4 bg-white">
              <span className="text-sm font-semibold text-[#111111]">{serviceName || "YARD Beard Package"}</span>
              <div className="flex items-center gap-3 text-sm text-[#111111]">
                <HugeiconsIcon icon={Calendar01Icon} className="w-5 h-5 text-neutral-600" />
                <span className="line-through text-neutral-400">{dateText} · {timeText}</span>
                <span className="text-neutral-400">→</span>
                <span className="text-[#1F8900] font-medium">Mon, {selectedDay} Aug · {selectedTime}</span>
              </div>

              {/* Deposit details */}
              <div className="flex justify-between items-center text-sm font-medium mt-1">
                <span className="text-[#111111]">Deposit</span>
                <span className="text-[#2A6D16]">None - returning customer</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-[#111111]">Full amount due at venue</span>
                <span className="text-[#111111]">
                  €{((parseFloat(servicePrice.replace("€", "")) || 0) + (parseFloat(addonsPrice.replace("€", "")) || 0))}
                </span>
              </div>

              {/* Green Box banner */}
              <div className="bg-[#E5F5EF] text-[#2A6D16] rounded-xl p-3 flex items-start gap-3 mt-1">
                <div className="w-5 h-5 rounded-full border border-[#2A6D16] flex items-center justify-center shrink-0 mt-0.5">
                  <HugeiconsIcon icon={Tick01Icon} className="w-3.5 h-3.5 text-[#2A6D16]" />
                </div>
                <span className="text-[13px] font-medium leading-relaxed">
                  Rescheduling is free. No deposit required - you pay the full amount at the venue as usual.
                </span>
              </div>
            </div>

            {/* Calendar Month select */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-800">August 2026</span>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-neutral-50 rounded text-neutral-600">&lt;</button>
                  <button className="p-1 hover:bg-neutral-50 rounded text-neutral-600">&gt;</button>
                </div>
              </div>

              {/* Active Day label */}
              <span className="text-xl font-bold text-[#111111]">Mon, Aug {selectedDay}</span>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#111111] bg-white border border-neutral-100 rounded-xl p-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className="py-2 text-[#73726D] font-medium">{d}</div>
                ))}
                {/* Row 1 */}
                <div className="py-2"></div>
                <div className="py-2"></div>
                {[1, 2, 3, 4, 5].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-2 rounded-full w-8 h-8 mx-auto flex items-center justify-center transition-all ${selectedDay === d ? "bg-[#111111] text-white" : "hover:bg-neutral-50"
                      }`}
                  >
                    {d}
                  </button>
                ))}
                {/* Row 2 */}
                {[6, 7, 8, 9, 10, 11, 12].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-2 rounded-full w-8 h-8 mx-auto flex items-center justify-center transition-all ${selectedDay === d ? "bg-[#111111] text-white" : "hover:bg-neutral-50"
                      }`}
                  >
                    {d}
                  </button>
                ))}
                {/* Row 3 */}
                {[13, 14, 15, 16, 17, 18, 19].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-2 rounded-full w-8 h-8 mx-auto flex items-center justify-center transition-all ${selectedDay === d ? "bg-[#111111] text-white" : d === 17 ? "bg-neutral-200 text-neutral-700" : "hover:bg-neutral-50"
                      }`}
                  >
                    {d}
                  </button>
                ))}
                {/* Row 4 */}
                {[20, 21, 22, 23, 24, 25, 26].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-2 rounded-full w-8 h-8 mx-auto flex items-center justify-center transition-all ${selectedDay === d ? "bg-[#111111] text-white" : "hover:bg-neutral-50"
                      }`}
                  >
                    {d}
                  </button>
                ))}
                {/* Row 5 */}
                {[27, 28, 29, 30, 31].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-2 rounded-full w-8 h-8 mx-auto flex items-center justify-center transition-all ${selectedDay === d ? "bg-[#111111] text-white" : "hover:bg-neutral-50"
                      }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Morning</span>
              <div className="grid grid-cols-4 gap-2">
                {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`h-9 rounded-lg border text-xs font-semibold transition-all ${selectedTime === t ? "bg-[#111111] text-white border-[#111111]" : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mt-2">Afternoon</span>
              <div className="grid grid-cols-4 gap-2">
                {["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`h-9 rounded-lg border text-xs font-semibold transition-all ${selectedTime === t ? "bg-[#111111] text-white border-[#111111]" : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Notes */}
            <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-2 w-full mt-2">
              <span className="font-poppins text-[10px] uppercase font-semibold text-[#73726D] tracking-[0.06em]">
                Customer Notes
              </span>
              <div className="border-l-4 border-[#B4B3AF] bg-[#F5F4EE] p-4 rounded-r-lg text-xs font-medium text-[#111111] leading-relaxed">
                <div className="text-[10px] uppercase font-semibold text-[#73726D] tracking-wider mb-1">NOTE</div>
                <div>{clientNotesText || "Please use organic products only, allergic to strong fragrances"}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 border-t border-neutral-100 pt-4 mt-2">
              <button
                onClick={() => setIsRescheduling(false)}
                className="h-10 px-6 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-[#111111]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onReschedule) {
                    onReschedule(`Mon, ${selectedDay} Aug`, selectedTime);
                  }
                  setIsRescheduling(false);
                }}
                className="h-10 px-6 rounded-lg bg-[#59B1CC] hover:bg-[#4ea0b8] text-white text-xs font-semibold"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
