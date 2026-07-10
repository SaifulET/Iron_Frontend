"use client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";


import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  ArrowDown01Icon,
  Add01Icon,
  FilterHorizontalIcon
} from "@hugeicons/core-free-icons";

interface Booking {
  clientInitials: string;
  clientName: string;
  clientPhone: string;
  isManual?: boolean;
  isNew?: boolean;
  bookingId: string;
  date: string;
  time: string;
  staff: string;
  status: string;
  amount: string;
  paymentType: string;
}

interface DashboardBookingsListProps {
  activeTab: string;
  bookingsData: Booking[];
  setBookingsData: React.Dispatch<React.SetStateAction<Booking[]>>;
  bookingSearch: string;
  setBookingSearch: (val: string) => void;
  bookingStatusFilter: string;
  setBookingStatusFilter: (val: string) => void;
  bookingStaffFilter: string;
  setBookingStaffFilter: (val: string) => void;
  openBookingActionIdx: number | null;
  setOpenBookingActionIdx: (idx: number | null) => void;
  setIsCreatingBooking: (val: boolean) => void;
  setIsEditingBooking: (val: boolean) => void;
  setEditingBookingIndex: (idx: number | null) => void;
  setNewBookingName: (val: string) => void;
  setNewBookingPhone: (val: string) => void;
  setNewBookingPhoneCode: (val: string) => void;
  setNewBookingDate: (val: string) => void;
  setNewBookingTime: (val: string) => void;
  setNewBookingStaff: (val: string) => void;
  onViewBookingDetails?: (idx: number) => void;
}

export default function DashboardBookingsList({
  activeTab,
  bookingsData,
  setBookingsData,
  bookingSearch,
  setBookingSearch,
  bookingStatusFilter,
  setBookingStatusFilter,
  bookingStaffFilter,
  setBookingStaffFilter,
  openBookingActionIdx,
  setOpenBookingActionIdx,
  setIsCreatingBooking,
  setIsEditingBooking,
  setEditingBookingIndex,
  setNewBookingName,
  setNewBookingPhone,
  setNewBookingPhoneCode,
  setNewBookingDate,
  setNewBookingTime,
  setNewBookingStaff,
  onViewBookingDetails
}: DashboardBookingsListProps) {
  const [dropdownCoords, setDropdownCoords] = React.useState<{ top: number; left: number } | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null); // Format: "MMM D" e.g. "May 11"
  const [tempMonth, setTempMonth] = React.useState(7); // August 2026 index 7
  const [tempDay, setTempDay] = React.useState(18); // Default 18

  const filteredBookings = bookingsData
    .map((b, originalIdx) => ({ ...b, originalIdx }))
    .filter((b) => {
      // Exclude "Canceled" status completely from all bookings
      if (b.status === "Canceled" || b.status === "Cancelled") return false;
      if (activeTab === "Upcoming" && b.status !== "Upcoming") return false;
      if (activeTab === "Canceled" && !b.status.toLowerCase().includes("cancel") && !b.status.toLowerCase().includes("waived")) return false;
      
      // Filter by custom date if selected
      if (selectedDate) {
        // b.date is like "Mon, 11 May" or "Saturday, May 9" or "Apr 3, 2026"
        // Let's check if the booking's date string contains our selectedDate e.g. "May 11" or "May 9"
        const cleanBookingDate = b.date.toLowerCase();
        // convert selectedDate "May 11" to parts like "may" and "11"
        const parts = selectedDate.toLowerCase().split(" ");
        if (parts.length === 2) {
          const [monthPart, dayPart] = parts;
          // check if cleanBookingDate contains both month and day
          const matchMonth = cleanBookingDate.includes(monthPart);
          const matchDay = cleanBookingDate.includes(dayPart) || cleanBookingDate.match(new RegExp(`\\b${dayPart}\\b`));
          if (!matchMonth || !matchDay) {
            return false;
          }
        }
      }

      if (bookingSearch) {
        const q = bookingSearch.toLowerCase();
        if (!b.clientName.toLowerCase().includes(q) && !b.clientPhone.toLowerCase().includes(q) && !b.bookingId.toLowerCase().includes(q)) return false;
      }
      if (bookingStatusFilter !== "All") {
        if (b.status.toLowerCase().trim() !== bookingStatusFilter.toLowerCase().trim()) return false;
      }
      if (bookingStaffFilter !== "All Staff" && b.staff !== bookingStaffFilter) return false;
      return true;
    });

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] select-none">
      {/* Bookings Header */}
      <DashboardHeader title={activeTab === "Upcoming" ? "Upcoming bookings" : activeTab === "Canceled" ? "Canceled bookings" : "All bookings"} subtitle={activeTab === "Upcoming" ? "View all upcoming bookings" : activeTab === "Canceled" ? "View all canceled bookings" : "View all bookings in details"} />
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">

      {/* Bookings Filter Bar Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 select-none">
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
          {/* Search bar input */}
          <div className="relative w-full sm:w-[260px] h-9">
            <span className="absolute left-3 top-2.5">
              <HugeiconsIcon icon={Search01Icon} className="w-4 h-4 text-[#ABAAA6]" />
            </span>
            <input
              type="text"
              value={bookingSearch}
              onChange={(e) => setBookingSearch(e.target.value)}
              placeholder="Search by client or booking ID..."
              className="w-full h-full pl-9 pr-4 bg-white border border-[#111111] rounded-lg text-xs font-poppins placeholder-neutral-400 focus:outline-none"
            />
          </div>

          {/* Status filter select */}
          <div className="relative h-9">
            <select
              value={bookingStatusFilter}
              onChange={(e) => setBookingStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-[#111111] rounded-lg px-4 h-full pr-8 text-xs font-poppins font-medium text-[#111111] focus:outline-none cursor-pointer hover:bg-neutral-50 transition-all"
            >
              {activeTab === "Upcoming" ? (
                <>
                  <option value="All">All Status</option>
                  <option value="Upcoming">Upcoming</option>
                </>
              ) : activeTab === "Canceled" ? (
                <>
                  <option value="All">All Status</option>
                  <option value="No-show - cancelled">No-show - cancelled</option>
                  <option value="No-show - waived">No-show - waived</option>
                  <option value="Cancelled by customer">Cancelled by customer</option>
                  <option value="Cancelled by business">Cancelled by business</option>
                  <option value="Late cancellation">Late cancellation</option>
                </>
              ) : (
                <>
                  <option value="All">All Status</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="No-show - charged">No-show - charged</option>
                  <option value="No-show - cancelled">No-show - cancelled</option>
                  <option value="No-show - waived">No-show - waived</option>
                  <option value="Cancelled by customer">Cancelled by customer</option>
                  <option value="Cancelled by business">Cancelled by business</option>
                  <option value="Late cancellation">Late cancellation</option>
                  <option value="Pending">Pending</option>
                </>
              )}
            </select>
            <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-neutral-600 pointer-events-none" />
          </div>

          {/* Staff filter select */}
          <div className="relative h-9">
            <select
              value={bookingStaffFilter}
              onChange={(e) => setBookingStaffFilter(e.target.value)}
              className="appearance-none bg-white border border-[#111111] rounded-lg px-4 h-full pr-8 text-xs font-poppins font-medium text-[#111111] focus:outline-none cursor-pointer hover:bg-neutral-50 transition-all"
            >
              <option value="All Staff">All Staff</option>
              <option value="Anna">Anna</option>
              <option value="George">George</option>
              <option value="Andreas">Andreas</option>
              <option value="Vivi">Vivi</option>
            </select>
            <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-neutral-600 pointer-events-none" />
          </div>

          {/* Date Filter Button */}
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="h-9 px-4 bg-white border border-[#D5D2C9] hover:bg-neutral-50 rounded-[12px] text-xs font-medium font-poppins text-[#111111] flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <span>{selectedDate ? selectedDate : "Filter Date"}</span>
              <HugeiconsIcon icon={FilterHorizontalIcon} className="w-4 h-4 text-[#111111]" />
            </button>

            {/* Custom Date Picker Modal Popup */}
            {isDatePickerOpen && (
              <div 
                className="absolute top-11 left-0 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-[#E8E8E6] p-6 z-50 w-[360px] animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center w-full pb-3">
                  <h3 className="font-poppins font-semibold text-lg text-black">Custom date</h3>
                </div>

                <div className="flex flex-row justify-between items-center w-full py-2 mb-2">
                  <div className="relative">
                    <select
                      value={tempMonth}
                      onChange={(e) => setTempMonth(parseInt(e.target.value))}
                      className="appearance-none bg-transparent font-poppins font-medium text-xs text-[#111111] pr-4 focus:outline-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right center',
                        backgroundSize: '10px'
                      }}
                    >
                      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m, i) => (
                        <option key={i} value={i}>{m} 2026</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (tempMonth === 0) {
                          setTempMonth(11);
                        } else {
                          setTempMonth(tempMonth - 1);
                        }
                      }}
                      type="button"
                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-neutral-50 text-neutral-800 transition-colors"
                    >
                      {"<"}
                    </button>
                    <button
                      onClick={() => {
                        if (tempMonth === 11) {
                          setTempMonth(0);
                        } else {
                          setTempMonth(tempMonth + 1);
                        }
                      }}
                      type="button"
                      className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-neutral-50 text-neutral-800 transition-colors"
                    >
                      {">"}
                    </button>
                  </div>
                </div>

                <div className="w-full text-left font-poppins text-2xl font-bold text-black pb-4 border-b border-[#EFEFED]">
                  {(() => {
                    const tempDateObj = new Date(2026, tempMonth, tempDay);
                    const weekday = tempDateObj.toLocaleDateString("en-US", { weekday: "short" });
                    const mName = tempDateObj.toLocaleDateString("en-US", { month: "short" });
                    return `${weekday}, ${mName} ${tempDay}`;
                  })()}
                </div>

                {/* Weekdays Header */}
                <div className="grid grid-cols-7 text-center w-full font-poppins text-xs font-semibold text-neutral-500 my-2">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                    <div key={idx} className="h-8 flex items-center justify-center">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid cells */}
                <div className="grid grid-cols-7 gap-y-1 text-center w-full mb-6">
                  {(() => {
                    const cellsList = [];
                    const firstDayIdx = new Date(2026, tempMonth, 1).getDay();
                    const daysInM = new Date(2026, tempMonth + 1, 0).getDate();
                    for (let i = 0; i < firstDayIdx; i++) {
                      cellsList.push(<div key={`empty-${i}`} className="h-8" />);
                    }
                    for (let d = 1; d <= daysInM; d++) {
                      const isSelected = d === tempDay;
                      const isTodayHighlight = d === 17 && !isSelected && tempMonth === 7; // Highlight 17 like the screenshot
                      cellsList.push(
                        <div key={d} className="h-8 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setTempDay(d)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-poppins text-xs font-semibold transition-all ${
                              isSelected
                                ? "bg-black text-white"
                                : isTodayHighlight
                                ? "bg-[#D5D2C9] text-black"
                                : "text-black hover:bg-neutral-100"
                            }`}
                          >
                            {d}
                          </button>
                        </div>
                      );
                    }
                    return cellsList;
                  })()}
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFEFED]">
                  <button
                    onClick={() => {
                      setSelectedDate(null);
                      setIsDatePickerOpen(false);
                    }}
                    className="px-4 py-2 border border-[#D5D2C9] rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const tempDateObj = new Date(2026, tempMonth, tempDay);
                      // Format to match booking dates e.g. "Mon, 11 May" or "Saturday, May 9"
                      // Since bookings data has dates like "Mon, 11 May" or "Saturday, May 9",
                      // we can check if it matches in the filter. We will format to a unified standard for matching
                      const formatted = tempDateObj.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
                      // formatted is "Mon, May 11" or similar. Let's store date object parts
                      setSelectedDate(tempDateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
                      setIsDatePickerOpen(false);
                    }}
                    className="px-4 py-2 bg-[#8EBAC5] hover:opacity-90 text-[#141B34] font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Filter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Manual Booking Button */}
        <button
          onClick={() => setIsCreatingBooking(true)}
          className="h-9 px-4 bg-[#111111] text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors w-full md:w-auto shrink-0 shadow-sm"
        >
          <HugeiconsIcon icon={Add01Icon} className="w-4 h-4 text-white" />
          <span>Manual Booking</span>
        </button>
      </div>

      {/* Bookings Table Block */}
      <div className="bg-white border border-[#E8E8E6] rounded-2xl flex-1 flex flex-col overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#FAFAF8] border-b border-[#E8E8E6] text-[11px] text-[#888780] font-normal font-poppins">
                <th className="py-3 px-5 font-normal">
                  <div className="flex items-center gap-1">
                    <span>Client</span>
                    <svg className="w-3 h-3 text-[#C4C2BB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="py-3 px-4 font-normal">Booking ID</th>
                <th className="py-3 px-4 font-normal">
                  <div className="flex items-center gap-1">
                    <span>Date & Time</span>
                    <svg className="w-3 h-3 text-[#C4C2BB]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="py-3 px-4 font-normal">Staff</th>
                <th className="py-3 px-4 font-normal text-center">Status</th>
                <th className="py-3 px-4 font-normal">Amount</th>
                <th className="py-3 px-5 font-normal text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEFED]">
              {filteredBookings
                .map((booking, idx) => {
                  // Status styling helper
                  const renderStatusBadge = (statusStr: string) => {
                    const norm = statusStr.toLowerCase().trim();
                    if (norm === "completed") {
                      return (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#E1F5EE] text-[#2F8068] uppercase tracking-wider">
                          Completed
                        </span>
                      );
                    }
                    if (norm.includes("no-show - canceled") || norm.includes("no-show - cancelled") || norm.includes("noshow - canceled") || norm.includes("noshow - cancelled") || norm.includes("canceled") || norm.includes("cancelled")) {
                      if (norm.includes("waived")) {
                        return (
                          <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#FFF0F0] text-[#E42424] uppercase tracking-wider">
                            No-show - waived
                          </span>
                        );
                      }
                      if (norm.includes("canceled") || norm.includes("cancelled")) {
                        if (norm.includes("no-show")) {
                          return (
                            <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#E1F5EE] text-[#2F8068] uppercase tracking-wider">
                              No-show - canceled
                            </span>
                          );
                        }
                      }
                    }
                    if (norm.includes("no-show - charged") || norm === "noshow" || norm.includes("noshow")) {
                      return (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#E1F5EE] text-[#2F8068] uppercase tracking-wider">
                          <span>No-show</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2F8068]" />
                          <span>charged</span>
                        </div>
                      );
                    }
                    if (norm === "cancelled by customer" || norm === "canceled by customer") {
                      return (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#F0F0EE] text-[#5F5E5A] uppercase tracking-wider">
                          Cancelled by customer
                        </span>
                      );
                    }
                    if (norm === "late cancellation") {
                      return (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#FCECE0] text-[#C96F53] uppercase tracking-wider">
                          Late cancellation
                        </span>
                      );
                    }
                    if (norm === "upcoming") {
                      return (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#E6F1FB] text-[#3760B7] uppercase tracking-wider">
                          Upcoming
                        </span>
                      );
                    }
                    if (norm === "cancelled by business" || norm === "canceled by business") {
                      return (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#E0F4FB] text-[#007CA2] uppercase tracking-wider">
                          Cancelled by business
                        </span>
                      );
                    }
                    if (norm.includes("no-show - waived")) {
                      return (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#FFF0F0] text-[#E42424] uppercase tracking-wider">
                          No-show - waived
                        </span>
                      );
                    }
                    if (norm === "canceled" || norm === "cancelled") {
                      return (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#FFF0F0] text-[#E42424] uppercase tracking-wider">
                          Canceled
                        </span>
                      );
                    }
                    if (norm === "pending") {
                      return (
                        <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-[#FCF4E0] text-[#D97706] uppercase tracking-wider">
                          Pending
                        </span>
                      );
                    }
                    return (
                      <span className="inline-block px-3 py-1 text-[11px] font-semibold rounded-full select-none bg-neutral-100 text-neutral-600 uppercase tracking-wider">
                        {statusStr}
                      </span>
                    );
                  };

                  return (
                    <tr key={idx} className="hover:bg-neutral-50/40 transition-colors font-poppins">
                      {/* Client column */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#E1F5EE] flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-semibold text-[#5F5E5A]">
                              {booking.clientInitials}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-[#1A1A1A]">
                              {booking.clientName}
                            </span>
                            <span className="text-[11px] text-[#6F6E68] mt-0.5">
                              {booking.clientPhone}
                            </span>
                            <div className="mt-1 flex items-center">
                              <span className={`px-2 py-0.5 text-[9px] font-medium rounded-full ${
                                booking.isManual ? "bg-[#F5F4EE] text-[#5F5E5A]" : booking.isNew ? "bg-[#EEF2FF] text-[#3760B7]" : "bg-[#E1F5EE] text-[#2F8068]"
                              }`}>
                                {booking.isManual ? "Manual" : booking.isNew ? "New" : "Returning"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Booking ID column */}
                      <td className="py-4 px-4 text-xs font-semibold text-[#4C4B47]">
                        {booking.bookingId}
                      </td>

                      {/* Date & Time column */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#1A1A1A]">
                            {booking.date}
                          </span>
                          <span className="text-xs text-[#4C4B47] mt-0.5">
                            {booking.time}
                          </span>
                        </div>
                      </td>

                      {/* Staff column */}
                      <td className="py-4 px-4 text-sm font-normal text-[#4C4B47]">
                        {booking.staff}
                      </td>

                      {/* Status Badge column */}
                      <td className="py-4 px-4 text-center">
                        {renderStatusBadge(booking.status)}
                      </td>

                      {/* Amount column */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${booking.amount !== "€0" ? "text-[#3A9C76]" : "text-neutral-500"}`}>
                            {booking.amount}
                          </span>
                          <span className="text-[11px] text-[#6F6E68] mt-0.5 max-w-[140px] truncate leading-tight" title={booking.paymentType}>
                            {booking.paymentType}
                          </span>
                        </div>
                      </td>

                      {/* Action Button column */}
                      <td className="py-4 px-5 text-center relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            const dropdownHeight = 170;
                            const spaceBelow = window.innerHeight - rect.bottom;
                            setDropdownCoords({
                              top: spaceBelow < dropdownHeight ? rect.top - dropdownHeight - 8 : rect.bottom + 8,
                              left: rect.right - 176
                            });
                            setOpenBookingActionIdx(openBookingActionIdx === idx ? null : idx);
                          }}
                          className="h-9 px-4 border border-[#111827] rounded-full flex items-center justify-center gap-1.5 hover:bg-neutral-50 transition-all text-xs font-semibold text-[#111827] mx-auto"
                        >
                          <span>Action</span>
                          <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 text-[#111827]" />
                        </button>

                        {/* Click backdrop */}
                        {openBookingActionIdx === idx && (
                          <>
                            <div
                              className="fixed inset-0 z-40 cursor-default"
                              onClick={() => setOpenBookingActionIdx(null)}
                            />
                            <div 
                              style={{ 
                                position: "fixed", 
                                top: dropdownCoords?.top, 
                                left: dropdownCoords?.left 
                              }}
                              className="z-50 w-44 bg-white rounded-xl shadow-xl border border-neutral-200/50 flex flex-col py-1.5 text-xs text-left animate-fadeIn"
                            >
                              <button
                                onClick={() => {
                                  setOpenBookingActionIdx(null);
                                  if (onViewBookingDetails) onViewBookingDetails(booking.originalIdx);
                                }}
                                className="px-4 py-2 hover:bg-neutral-50 font-medium text-neutral-700 w-full text-left"
                              >
                                View details
                              </button>
                              <button
                                onClick={() => {
                                  setNewBookingName(booking.clientName);
                                  setNewBookingPhone(booking.clientPhone.replace(/^\+?[0-9]+\s+/, ""));
                                  const parts = booking.clientPhone.split(" ");
                                  if (parts.length > 1) {
                                    setNewBookingPhoneCode(parts[0]);
                                  } else {
                                    setNewBookingPhoneCode("+357");
                                  }
                                  setNewBookingDate(booking.date);
                                  setNewBookingTime(booking.time);
                                  setNewBookingStaff(booking.staff);
                                  setIsEditingBooking(true);
                                  setEditingBookingIndex(booking.originalIdx);
                                  setIsCreatingBooking(true);
                                  setOpenBookingActionIdx(null);
                                }}
                                className="px-4 py-2 hover:bg-neutral-50 font-medium text-neutral-700 w-full text-left"
                              >
                                Edit booking
                              </button>
                              <button
                                onClick={() => {
                                  setBookingsData(bookingsData.filter((_, i) => i !== booking.originalIdx));
                                  setOpenBookingActionIdx(null);
                                }}
                                className="px-4 py-2 hover:bg-neutral-50 font-semibold text-[#BA1A1A] w-full text-left"
                              >
                                Delete booking
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="bg-[#FAFAF8] border-t border-[#E8E8E6] p-4 flex items-center justify-between text-xs font-poppins text-[#888780] select-none">
          <span>{filteredBookings.length} of {bookingsData.length} bookings</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 bg-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="w-8 h-8 rounded-lg bg-white border border-neutral-800 text-neutral-800 flex items-center justify-center font-semibold">
              1
            </span>
            <span className="w-8 h-8 rounded-lg bg-white border border-neutral-200 text-neutral-500 flex items-center justify-center cursor-pointer hover:bg-neutral-50">
              2
            </span>
            <button className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 bg-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    
      </div></main>
  );
}
