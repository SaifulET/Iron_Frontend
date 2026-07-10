"use client";
import NotificationBell from "@/components/notifications/NotificationBell";
import WaiveChargeModal from "./WaiveChargeModal";
import { NoShowModal, CompleteModal, CancelBookingModal } from "./CalendarActionModals";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  ArrowDown01Icon,
  Add01Icon,
  Tick01Icon,
  Money01Icon,
  ViewIcon,
  Delete02Icon
} from "@hugeicons/core-free-icons";

interface DashboardCalendarProps {
  onNewBookingClick?: () => void;
  onViewBookingClick?: (clientName: string) => void;
}

interface Booking {
  id: string;
  staff: string;
  client: string;
  time: string;
  status: string;
  service: string;
  price: string;
  colorClass: string;
  borderColor: string;
  top: number;
  height: number;
  isPending?: boolean;
  isCancelled?: boolean;
}

export default function DashboardCalendar({ onNewBookingClick, onViewBookingClick }: DashboardCalendarProps) {
  const [openDropdownCardId, setOpenDropdownCardId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState("Today");
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 21)); // June 21, 2026
  
  const [selectedStaffFilter, setSelectedStaffFilter] = useState("All Staff");
  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);

  // Modal State for Viewing Booking
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [waiveBookingId, setWaiveBookingId] = useState<string | null>(null);
  const [noShowBookingId, setNoShowBookingId] = useState<string | null>(null);
  const [completeBookingId, setCompleteBookingId] = useState<string | null>(null);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  // Stateful bookings list
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "john-brenda",
      staff: "John",
      client: "Brenda Massey",
      time: "8:00 - 8:30",
      status: "Upcoming",
      service: "Hair cut · Hair cut · +3 Add-ons",
      price: "€54",
      colorClass: "bg-[#BBEBFF]",
      borderColor: "border-[#0CC0DF]",
      top: 0,
      height: 80,
    },
    {
      id: "john-craig",
      staff: "John",
      client: "Craig Mango",
      time: "10:00 - 10:30",
      status: "No-show - charged",
      service: "Yoga session",
      price: "€54",
      colorClass: "bg-[#FFB5D3]",
      borderColor: "border-[#FF6B9E]",
      top: 320,
      height: 80,
    },
    {
      id: "john-zain",
      staff: "John",
      client: "Zain Dias",
      time: "11:00 - 11:30",
      status: "No-show - cancelled ✓",
      service: "Hair Coloring",
      price: "€54",
      colorClass: "bg-[#FFD18B]",
      borderColor: "border-[#F59E0B]",
      top: 480,
      height: 80,
    },
    {
      id: "maria-alena",
      staff: "Maria",
      client: "Alena Geidt",
      time: "8:00 - 8:30",
      status: "Upcoming",
      service: "Hair cut",
      price: "€54",
      colorClass: "bg-[#FFD18B]",
      borderColor: "border-[#F59E0B]",
      top: 0,
      height: 80,
    },
    {
      id: "maria-marilyn",
      staff: "Maria",
      client: "Marilyn Carder",
      time: "9:00 - 10:00",
      status: "No-show - cancelled ✓",
      service: "Hair and Beard Cut",
      price: "€54",
      colorClass: "bg-[#86EFAC]/65",
      borderColor: "border-[#10B981]",
      top: 160,
      height: 160,
    },
    {
      id: "marilana-phillip",
      staff: "Marilana",
      client: "Phillip Dorwart",
      time: "9:00 - 10:00",
      status: "Pending !",
      service: "Beard Grooming",
      price: "€54",
      colorClass: "bg-[#FFB5D3]",
      borderColor: "border-[#FF6B9E]",
      top: 160,
      height: 160,
      isPending: true,
    },
    {
      id: "marilana-desirae",
      staff: "Marilana",
      client: "Desirae Stanton",
      time: "12:30 - 1:30",
      status: "Cancelled by customer",
      service: "Blow Dry",
      price: "€54",
      colorClass: "bg-[#BBEBFF]",
      borderColor: "border-[#0CC0DF]",
      top: 720,
      height: 160,
      isCancelled: true,
    },
    {
      id: "julie-james",
      staff: "Julie",
      client: "James Herwitz",
      time: "8:00 - 9:30",
      status: "Late cancellation ✓",
      service: "Balinese Massage",
      price: "€54",
      colorClass: "bg-[#89E6D5]",
      borderColor: "border-[#10B981]",
      top: 0,
      height: 240,
    },
    {
      id: "julie-amy",
      staff: "Julie",
      client: "Amy Jones",
      time: "9:30 - 11:00",
      status: "Upcoming",
      service: "Haircut and colour",
      price: "€54",
      colorClass: "bg-[#BBEBFF]",
      borderColor: "border-[#0CC0DF]",
      top: 240,
      height: 240,
    },
  ]);

  const formatDate = (date: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (viewMode === "Today") {
      return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
    } else if (viewMode === "Weekly") {
      const endOfWeek = new Date(date);
      endOfWeek.setDate(date.getDate() + 6);
      return `${date.getDate()} ${months[date.getMonth()]} - ${endOfWeek.getDate()} ${months[endOfWeek.getMonth()]}`;
    } else {
      const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${fullMonths[date.getMonth()]} ${date.getFullYear()}`;
    }
  };

  const handlePrevDate = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "Today") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === "Weekly") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "Today") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === "Weekly") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Dropdown Actions Implementation
  const handleMarkNoShow = (cardId: string) => {
    setNoShowBookingId(cardId);
    setOpenDropdownCardId(null);
  };

  const handleWaiveCharge = (cardId: string) => {
    setWaiveBookingId(cardId);
    setOpenDropdownCardId(null);
  };

  const handleViewBooking = (cardId: string) => {
    const booking = bookings.find(b => b.id === cardId);
    if (booking && onViewBookingClick) {
      onViewBookingClick(booking.client);
    } else if (booking) {
      setViewingBooking(booking);
    }
    setOpenDropdownCardId(null);
  };

  const handleCompleteBooking = (cardId: string) => {
    setCompleteBookingId(cardId);
    setOpenDropdownCardId(null);
  };

  const handleCancelBooking = (cardId: string) => {
    setCancelBookingId(cardId);
    setOpenDropdownCardId(null);
  };

  const renderDropdown = (cardId: string) => {
    if (openDropdownCardId !== cardId) return null;
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-6 top-[25px] z-50 w-[160px] bg-white rounded-xl shadow-2xl border border-[#C6C6CB] flex flex-col py-1 text-xs select-none animate-fadeIn"
      >
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#BA1A1A] font-medium cursor-pointer" onClick={() => handleMarkNoShow(cardId)}>
          <img src="/calederions/userCross.svg" alt="No-show" className="w-3.5 h-3.5 shrink-0" />
          <span>No-show</span>
        </button>
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#1C1B1C] font-medium cursor-pointer" onClick={() => handleWaiveCharge(cardId)}>
          <HugeiconsIcon icon={Money01Icon} className="w-3.5 h-3.5 text-[#141B34] shrink-0" />
          <span>Waive charge</span>
        </button>
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#1C1B1C] font-medium cursor-pointer" onClick={() => handleViewBooking(cardId)}>
          <HugeiconsIcon icon={ViewIcon} className="w-3.5 h-3.5 text-[#0C0C0C] shrink-0" />
          <span>View Booking</span>
        </button>
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#1C1B1C] font-medium cursor-pointer" onClick={() => handleCompleteBooking(cardId)}>
          <HugeiconsIcon icon={Tick01Icon} className="w-3.5 h-3.5 text-[#141B34] shrink-0" />
          <span>Complete</span>
        </button>
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#BA1A1A] font-medium cursor-pointer border-t border-neutral-100" onClick={() => handleCancelBooking(cardId)}>
          <HugeiconsIcon icon={Delete02Icon} className="w-3.5 h-3.5 text-[#BA1A1A] shrink-0" />
          <span>Cancel Booking</span>
        </button>
      </div>
    );
  };

  const staffColumns = [
    { name: "John", hasBorder: true },
    { name: "Maria", hasBorder: false },
    { name: "Marilana", hasBorder: false },
    { name: "Julie", hasBorder: false }
  ];

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] relative">
      {/* Calendar Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 py-3 sm:py-0 sm:h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 items-center justify-between shrink-0 select-none">
        {/* Left side: Today & Date picker */}
        <div className="flex items-center gap-4">
          {/* Today View Toggle Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsViewDropdownOpen(!isViewDropdownOpen);
                setIsStaffDropdownOpen(false);
              }}
              className="border border-[#111111] rounded-md px-3 py-1.5 flex items-center gap-1.5 h-9 bg-white hover:bg-neutral-50 transition-all text-sm font-medium text-[#111111] cursor-pointer"
            >
              <span>{viewMode}</span>
              <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
            </button>
            {isViewDropdownOpen && (
              <div className="absolute left-0 mt-1.5 z-50 w-32 bg-white rounded-lg shadow-xl border border-neutral-200 flex flex-col py-1 text-xs select-none">
                {["Today", "Weekly", "Monthly"].map((mode) => (
                  <button 
                    key={mode}
                    onClick={() => {
                      setViewMode(mode);
                      setIsViewDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-neutral-50 text-left text-[#111111] font-medium"
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Navigator */}
          <div className="flex items-center border border-[#C6C6CB] rounded-lg bg-white h-9 overflow-hidden">
            <button 
              onClick={handlePrevDate}
              className="px-3 h-full border-r border-[#C6C6CB] hover:bg-neutral-50 transition-all text-neutral-600 flex items-center justify-center cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2 px-4 h-full">
              <HugeiconsIcon icon={Calendar03Icon} className="w-4 h-4 text-[#0C0C0C]" />
              <span className="font-poppins text-xs font-semibold text-[#1C1B1C] whitespace-nowrap">{formatDate(currentDate)}</span>
            </div>
            <button 
              onClick={handleNextDate}
              className="px-3 h-full border-l border-[#C6C6CB] hover:bg-neutral-50 transition-all text-neutral-600 flex items-center justify-center cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right side: Staff, New Booking, Notifications */}
        <div className="flex items-center gap-4">
          {/* Staff filter dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsStaffDropdownOpen(!isStaffDropdownOpen);
                setIsViewDropdownOpen(false);
              }}
              className="border border-[#111111] rounded-md px-3 py-1.5 flex items-center gap-1.5 h-9 bg-white hover:bg-neutral-50 transition-all text-sm font-medium text-[#111111] cursor-pointer"
            >
              <span>{selectedStaffFilter}</span>
              <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
            </button>
            {isStaffDropdownOpen && (
              <div className="absolute right-0 mt-1.5 z-50 w-40 bg-white rounded-lg shadow-xl border border-neutral-200 flex flex-col py-1 text-xs select-none">
                {["All Staff", "John", "Maria", "Marilana", "Julie"].map((staff) => (
                  <button 
                    key={staff}
                    onClick={() => {
                      setSelectedStaffFilter(staff);
                      setIsStaffDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-neutral-50 text-left text-[#111111] font-medium cursor-pointer"
                  >
                    {staff}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* New Booking */}
          <button
            onClick={onNewBookingClick}
            className="bg-[#020305] text-white rounded-lg h-9 px-4 flex items-center gap-2 text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
          >
            <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
            <span>New Booking</span>
          </button>

          {/* Bell Notification Button */}
          <NotificationBell />
        </div>
      </div>

      {/* Horizontal Scroll Wrapper for Headers & Grid on Mobile */}
      <div className="flex-1 flex flex-col overflow-x-auto w-full">
        <div className="min-w-[800px] flex-1 flex flex-col min-h-0">
          {/* Calendar Headers (Resource Columns - Sticky) */}
          <div className="bg-[#FCF8F8] border-b border-[#C6C6CB] flex items-center shrink-0 select-none">
            {/* Left corner time placeholder */}
            <div className="w-16 h-20 border-r border-[#C6C6CB] shrink-0"></div>

            {/* Staff list */}
            <div className={`flex-1 grid divide-x divide-[#C6C6CB] ${selectedStaffFilter === "All Staff" ? "grid-cols-4" : "grid-cols-1"}`}>
              {staffColumns
                .filter(staff => selectedStaffFilter === "All Staff" || staff.name === selectedStaffFilter)
                .map((staff, index) => (
                  <div key={index} className="flex flex-col items-center justify-center py-3.5 gap-1.5">
                    <div className={`p-[1px] rounded-full ${staff.hasBorder ? "border-2 border-[#0CC0DF]" : "border border-neutral-200"}`}>
                      <img
                        src="/calederions/calendrImage.jpg"
                        alt={staff.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className="font-poppins text-xs font-semibold text-[#020305]">{staff.name}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Scrollable Grid Area */}
          <div className="flex-1 overflow-y-auto relative bg-[#FCF8F8] select-none min-h-0">
            {/* Grid Container */}
            <div className="flex w-full h-[1600px] relative">
              {/* Backdrop overlay to close dropdown on clicking outside */}
              {openDropdownCardId && (
                <div
                  className="fixed inset-0 z-30 bg-transparent cursor-default"
                  onClick={() => setOpenDropdownCardId(null)}
                />
              )}
              {/* Background Horizontal Grid Lines */}
              <div className="absolute left-16 right-0 top-0 bottom-0 pointer-events-none flex flex-col">
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div key={idx} className="h-40 w-full flex flex-col">
                    {/* Dashed half hour line */}
                    <div className="h-20 border-b border-dashed border-[#C6C6CB]/20"></div>
                    {/* Solid hour line */}
                    <div className="h-20 border-b border-[#C6C6CB]/40"></div>
                  </div>
                ))}
              </div>

              {/* Time Column (Left Side Axis) */}
              <div className="w-16 border-r border-[#C6C6CB] bg-[#FCF8F8] flex flex-col shrink-0 relative z-10">
                {["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"].map((time, idx) => (
                  <div key={idx} className="h-40 flex justify-center items-start pt-2">
                    <span className="font-poppins text-[11px] font-semibold text-[#45474B]">{time}</span>
                  </div>
                ))}
              </div>

              {/* Columns for Staff */}
              <div className={`flex-1 grid divide-x divide-[#C6C6CB] relative ${selectedStaffFilter === "All Staff" ? "grid-cols-4" : "grid-cols-1"}`}>
                {staffColumns
                  .filter(staff => selectedStaffFilter === "All Staff" || staff.name === selectedStaffFilter)
                  .map((staff) => (
                    <div key={staff.name} className="relative h-full">
                      {bookings
                        .filter(b => b.staff === staff.name)
                        .map(b => (
                          <div
                            key={b.id}
                            onClick={() => setOpenDropdownCardId(openDropdownCardId === b.id ? null : b.id)}
                            className={`absolute left-[3%] right-[3%] ${b.colorClass} border-l-4 ${b.borderColor} rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === b.id ? "z-40" : "z-20"}`}
                            style={{ top: `${b.top}px`, height: `${b.height}px` }}
                          >
                            <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none cursor-pointer">
                              <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                                <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                            <div>
                              <div className="flex justify-between items-center pr-4">
                                <span className="text-[9px] font-medium text-[#45474B] leading-none">{b.time}</span>
                                {b.isPending ? (
                                  <div className="flex items-center gap-1">
                                    <span className="border border-[#D44343] rounded px-1 py-0.5 text-[8px] font-semibold text-[#D44343] leading-none bg-white/40">
                                      Pending !
                                    </span>
                                    <span className="text-[9px] font-medium text-[#45474B]">90:00</span>
                                  </div>
                                ) : b.isCancelled ? (
                                  <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none flex items-center gap-0.5">
                                    <span>{b.status}</span>
                                    <span className="text-[#FB3535] font-bold">x</span>
                                  </span>
                                ) : (
                                  <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none flex items-center gap-0.5">
                                    <span>{b.status}</span>
                                    {b.status.includes("Completed") && (
                                      <HugeiconsIcon icon={Tick01Icon} className="w-2 h-2 text-[#10B981]" />
                                    )}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">{b.client}</h4>
                              <p className="text-[10px] text-[#45474B] truncate mt-0.5">{b.service}</p>
                            </div>
                            <span className="text-[10px] font-medium text-[#45474B]">{b.price}</span>
                            {renderDropdown(b.id)}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slots selected bottom bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#C6C6CB] rounded-xl px-4 py-3 shadow-xl flex flex-col sm:flex-row items-center justify-between w-[calc(100%-32px)] sm:w-[640px] min-h-[94px] h-auto gap-4 sm:gap-0 z-30 select-none">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-[31px] h-10 rounded-full bg-[#CFE1FE] flex items-center justify-center shrink-0">
            <img src="/calederions/edit.svg" alt="Edit Icon" className="w-5 h-5 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-poppins text-sm font-semibold text-[#020305]">2 slots selected</span>
            <span className="text-xs text-[#45474B] font-poppins">John's schedule</span>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
          <button className="bg-[#020305] text-white text-xs sm:text-sm font-medium px-4 sm:px-[36.2px] h-[44px] sm:h-[50px] rounded-lg hover:bg-neutral-800 transition-colors shadow-md flex-1 sm:flex-initial cursor-pointer">
            Disable Selected Slots (2)
          </button>
          <button className="text-[#45474B] hover:text-neutral-900 text-xs sm:text-sm font-medium transition-colors shrink-0 cursor-pointer">
            Cancel
          </button>
        </div>
      </div>

      {/* Premium Booking Details Modal */}
      {viewingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-neutral-100 flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#FCF8F8] border-b border-neutral-200 flex justify-between items-center">
              <h3 className="font-poppins text-base font-bold text-[#020305]">Booking Details</h3>
              <button 
                onClick={() => setViewingBooking(null)}
                className="text-neutral-400 hover:text-neutral-700 text-lg font-bold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#CFE1FE] flex items-center justify-center font-bold text-[#0CC0DF] text-lg select-none">
                  {viewingBooking.client.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#020305]">{viewingBooking.client}</span>
                  <span className="text-xs text-neutral-500">Status: {viewingBooking.status}</span>
                </div>
              </div>
              <div className="border-t border-neutral-100 pt-4 flex flex-col gap-2.5 text-xs text-neutral-700">
                <div className="flex justify-between">
                  <span className="font-medium text-neutral-400">Assigned Staff</span>
                  <span className="font-semibold text-[#020305]">{viewingBooking.staff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-neutral-400">Service</span>
                  <span className="font-semibold text-[#020305] truncate max-w-[240px]">{viewingBooking.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-neutral-400">Time Window</span>
                  <span className="font-semibold text-[#020305]">{viewingBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-neutral-400">Price / Cost</span>
                  <span className="font-semibold text-[#0CC0DF] text-sm">{viewingBooking.price}</span>
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#FCF8F8] border-t border-neutral-200 flex justify-end">
              <button 
                onClick={() => setViewingBooking(null)}
                className="bg-[#020305] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waive Charge Modal Overlay */}
      <WaiveChargeModal
        isOpen={!!waiveBookingId}
        onClose={() => setWaiveBookingId(null)}
        onConfirm={() => {
          if (waiveBookingId) {
            setBookings(prev => prev.map(b => {
              if (b.id === waiveBookingId) {
                return {
                  ...b,
                  status: "Waived charge",
                  colorClass: "bg-[#FFD18B]",
                  borderColor: "border-[#F59E0B]"
                };
              }
              return b;
            }));
            setWaiveBookingId(null);
          }
        }}
      />

      {/* No-show Confirm Modal Overlay */}
      <NoShowModal
        isOpen={!!noShowBookingId}
        onClose={() => setNoShowBookingId(null)}
        onConfirm={() => {
          if (noShowBookingId) {
            setBookings(prev => prev.map(b => {
              if (b.id === noShowBookingId) {
                return {
                  ...b,
                  status: "No-show - charged",
                  colorClass: "bg-[#FFB5D3]",
                  borderColor: "border-[#FF6B9E]"
                };
              }
              return b;
            }));
            setNoShowBookingId(null);
          }
        }}
      />

      {/* Complete Booking Confirm Modal Overlay */}
      <CompleteModal
        isOpen={!!completeBookingId}
        onClose={() => setCompleteBookingId(null)}
        onConfirm={() => {
          if (completeBookingId) {
            setBookings(prev => prev.map(b => {
              if (b.id === completeBookingId) {
                return {
                  ...b,
                  status: "Completed ✓",
                  colorClass: "bg-[#86EFAC]/65",
                  borderColor: "border-[#10B981]",
                  isPending: false,
                  isCancelled: false
                };
              }
              return b;
            }));
            setCompleteBookingId(null);
          }
        }}
      />

      {/* Cancel Booking Confirm Modal Overlay */}
      <CancelBookingModal
        isOpen={!!cancelBookingId}
        onClose={() => setCancelBookingId(null)}
        onConfirm={() => {
          if (cancelBookingId) {
            setBookings(prev => prev.map(b => {
              if (b.id === cancelBookingId) {
                return {
                  ...b,
                  status: "Cancelled",
                  colorClass: "bg-neutral-100",
                  borderColor: "border-neutral-400",
                  isCancelled: true,
                  isPending: false
                };
              }
              return b;
            }));
            setCancelBookingId(null);
          }
        }}
      />
    </main>
  );
}
