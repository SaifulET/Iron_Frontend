"use client";
import NotificationBell from "@/components/notifications/NotificationBell";
import WaiveChargeModal from "./WaiveChargeModal";
import { NoShowModal, CompleteModal, CancelBookingModal } from "./CalendarActionModals";

import React, { useState, useRef } from "react";
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
  isStaffDashboard?: boolean;
  staffName?: string;
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

export default function DashboardCalendar({
  onNewBookingClick,
  onViewBookingClick,
  isStaffDashboard = false,
  staffName = "Basel"
}: DashboardCalendarProps) {
  const [openDropdownCardId, setOpenDropdownCardId] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState("Weekly");
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 21)); // June 21, 2026

  const [selectedStaffFilter, setSelectedStaffFilter] = useState(isStaffDashboard ? staffName : "All Staff");
  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);

  // Modal State for Viewing Booking
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [waiveBookingId, setWaiveBookingId] = useState<string | null>(null);
  const [noShowBookingId, setNoShowBookingId] = useState<string | null>(null);
  const [completeBookingId, setCompleteBookingId] = useState<string | null>(null);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  // Drag to scroll states
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerSelectedMonth, setDatePickerSelectedMonth] = useState(6); // Defaults to July (6)
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [disabledSlots, setDisabledSlots] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);

  // Stateful bookings list
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "basel-brenda",
      staff: "Basel",
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
      id: "basel-craig",
      staff: "Basel",
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
      id: "basel-zain",
      staff: "Basel",
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

  const staffColumns = isStaffDashboard
    ? [{ name: staffName, hasBorder: true }]
    : [
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
        <div className="flex items-center gap-4 relative">
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
          <div className="flex items-center border border-[#C6C6CB] rounded-lg bg-white h-9 overflow-hidden relative">
            <button
              onClick={handlePrevDate}
              className="px-3 h-full border-r border-[#C6C6CB] hover:bg-neutral-50 transition-all text-neutral-600 flex items-center justify-center cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center gap-2 px-4 h-full cursor-pointer hover:bg-neutral-50 transition-all select-none"
            >
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
          {!isStaffDashboard && (
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
          )}

          {/* New Booking */}
          {!isStaffDashboard && (
            <button
              onClick={onNewBookingClick}
              className="bg-[#020305] text-white rounded-lg h-9 px-4 flex items-center gap-2 text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
            >
              <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
              <span>New Booking</span>
            </button>
          )}

          {/* Bell Notification Button */}
          <NotificationBell />
        </div>
      </div>

      {/* Horizontal Scroll Wrapper for Headers & Grid on Mobile */}
      <div
        ref={scrollContainerRef}
        onMouseDown={(e) => {
          if (!scrollContainerRef.current) return;
          setIsDragActive(true);
          setDragStartX(e.pageX - scrollContainerRef.current.offsetLeft);
          setDragScrollLeft(scrollContainerRef.current.scrollLeft);
        }}
        onMouseLeave={() => setIsDragActive(false)}
        onMouseUp={() => setIsDragActive(false)}
        onMouseMove={(e) => {
          if (!isDragActive || !scrollContainerRef.current) return;
          e.preventDefault();
          const x = e.pageX - scrollContainerRef.current.offsetLeft;
          const walk = (x - dragStartX) * 1.5; // drag scroll speed multiplier
          scrollContainerRef.current.scrollLeft = dragScrollLeft - walk;
        }}
        className={`flex-1 flex flex-col ${viewMode === "Monthly" ? "overflow-hidden" : "overflow-x-auto overflow-y-hidden"} w-full touch-pan-x select-none ${isDragActive ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <div className={`${viewMode === "Monthly" ? "w-full min-w-0" : "min-w-[1000px]"} flex-1 flex flex-col min-h-0`}>
          {/* Calendar Headers (Resource Columns - Sticky) */}
          <div className="bg-[#FCF8F8] border-b border-[#C6C6CB] flex items-center shrink-0 select-none">
            {/* Left corner placeholder (Time / Staff header) */}
            <div 
              className="h-14 sm:h-16 border-r border-[#C6C6CB] shrink-0 flex items-center justify-center font-poppins text-xs font-semibold text-[#45474B]"
              style={{ width: viewMode === "Weekly" ? "80px" : "64px" }}
            >
              {viewMode === "Weekly" ? "Staff" : ""}
            </div>

            {/* Header Columns */}
            {viewMode === "Weekly" ? (
              // Weekly View: 7 Days of the week (Mon - Sun)
              <div className="flex-1 grid grid-cols-7 divide-x divide-[#C6C6CB]">
                {[
                  { day: "Monday", shortDay: "Mon", date: 20 },
                  { day: "Tuesday", shortDay: "Tue", date: 21, isToday: true },
                  { day: "Wednesday", shortDay: "Wed", date: 22 },
                  { day: "Thursday", shortDay: "Thu", date: 23 },
                  { day: "Friday", shortDay: "Fri", date: 24 },
                  { day: "Saturday", shortDay: "Sat", date: 25 },
                  { day: "Sunday", shortDay: "Sun", date: 26 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-center py-3 gap-2 px-1">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${item.isToday ? "bg-[#020305] text-white" : "text-[#1C1B1C]"}`}>
                      {item.date}
                    </span>
                    <span className={`font-poppins text-xs font-medium ${item.isToday ? "text-[#020305] font-bold" : "text-[#45474B]"} truncate`}>
                      <span className="hidden sm:inline">{item.day}</span>
                      <span className="inline sm:hidden">{item.shortDay}</span>
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              // Today / Daily View: Staff Columns
              (() => {
                const activeStaffList = staffColumns.filter(staff => selectedStaffFilter === "All Staff" || staff.name === selectedStaffFilter);
                return (
                  <div className="flex-1 grid divide-x divide-[#C6C6CB]" style={{ gridTemplateColumns: `repeat(${activeStaffList.length}, minmax(0, 1fr))` }}>
                    {activeStaffList.map((staff, index) => (
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
                );
              })()
            )}
          </div>

          {/* Scrollable Grid Area */}
          <div className="flex-1 overflow-y-auto relative bg-[#FCF8F8] select-none min-h-0">
            {viewMode === "Monthly" ? (
              /* MONTHLY VIEW: Calendar Dates Grid */
              <div className="p-4 bg-[#FCF8F8] min-h-[500px]">
                <div className="grid grid-cols-7 gap-2 bg-[#C6C6CB]/20 p-2 rounded-xl border border-[#C6C6CB]/40">
                  {/* Month header titles */}
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((dayName) => (
                    <div key={dayName} className="py-2 text-center text-xs font-semibold font-poppins text-[#45474B] uppercase tracking-wider">
                      <span className="hidden sm:inline">{dayName}</span>
                      <span className="inline sm:hidden">{dayName.substring(0, 3)}</span>
                    </div>
                  ))}

                  {/* Days cells */}
                  {[
                    // June buffer days
                    { day: 29, month: "June", disabled: true },
                    { day: 30, month: "June", disabled: true },
                    // July days
                    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, month: "July", disabled: false })),
                    // August buffer days
                    { day: 1, month: "August", disabled: true },
                    { day: 2, month: "August", disabled: true },
                  ].map((dateItem, idx) => {
                    const isSelected = viewingBooking === null && dateItem.day === 21 && dateItem.month === "July";
                    const isToday = dateItem.day === 21 && dateItem.month === "July";

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (!dateItem.disabled) {
                            // Switch view mode to "Today" showing that specific day's tasks according to employee columns
                            const selectedYear = 2026;
                            const selectedMonthIndex = dateItem.month === "June" ? 5 : dateItem.month === "July" ? 6 : 7;
                            setCurrentDate(new Date(selectedYear, selectedMonthIndex, dateItem.day));
                            setViewMode("Today");
                          }
                        }}
                        className={`min-h-[100px] p-2 border border-[#C6C6CB]/30 rounded-lg flex flex-col justify-between transition-all duration-150 cursor-pointer hover:border-[#020305] hover:shadow-sm ${dateItem.disabled ? "opacity-35 bg-neutral-50/50" : "bg-white"
                          } ${isToday ? "ring-2 ring-[#020305]/20 border-[#020305]" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold font-poppins ${isToday ? "bg-[#020305] text-white w-6 h-6 rounded-full flex items-center justify-center" : "text-[#1C1B1C]"}`}>
                            {dateItem.day}
                          </span>
                          {dateItem.day === 1 && (
                            <span className="text-[10px] font-semibold text-[#45474B] uppercase">{dateItem.month}</span>
                          )}
                        </div>

                        {/* Booking indicator / summary inside cell */}
                        {!dateItem.disabled && dateItem.day === 21 && (
                          <div className="mt-1.5 flex flex-col gap-1">
                            <div className="bg-[#BBEBFF] text-[#195156] text-[10px] font-semibold px-1.5 py-0.5 rounded truncate">
                              8:00 John Doe
                            </div>
                            <div className="bg-[#BBEBFF] text-[#195156] text-[10px] font-semibold px-1.5 py-0.5 rounded truncate">
                              13:00 Jane Doe
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : viewMode === "Weekly" ? (
              /* WEEKLY VIEW: Staff rows on Left, 7 Day columns */
              <div className="flex flex-col w-full relative">
                {/* Backdrop overlay */}
                {openDropdownCardId && (
                  <div
                    className="fixed inset-0 z-30 bg-transparent cursor-default"
                    onClick={() => setOpenDropdownCardId(null)}
                  />
                )}
                {staffColumns
                  .filter(staff => selectedStaffFilter === "All Staff" || staff.name === selectedStaffFilter)
                  .map((staff) => {
                    const staffBookings = bookings.filter(b => b.staff === staff.name);
                    return (
                      <div key={staff.name} className="flex border-b border-[#C6C6CB] min-h-[140px] relative">
                        {/* Left Staff Row Header */}
                        <div 
                          className="border-r border-[#C6C6CB] bg-[#FCF8F8] p-3 flex flex-col items-center justify-center gap-1 shrink-0 z-10"
                          style={{ width: "80px" }}
                        >
                          <img
                            src="/calederions/calendrImage.jpg"
                            alt={staff.name}
                            className="w-9 h-9 rounded-full object-cover border border-neutral-200"
                          />
                          <span className="font-poppins text-xs font-semibold text-[#020305] text-center leading-tight">
                            {staff.name}
                          </span>
                        </div>

                        {/* 7 Days Columns */}
                        <div className="flex-1 grid grid-cols-7 divide-x divide-[#C6C6CB] relative">
                          {[20, 21, 22, 23, 24, 25, 26].map((dateNum, dayIdx) => {
                            const slotKey = `${staff.name}-${dateNum}`;
                            const isSelected = selectedSlots.includes(slotKey);
                            const isDisabled = disabledSlots.includes(slotKey);
                            const hasBooking = dateNum === 21 && staffBookings.length > 0;

                            return (
                              <div 
                                key={dayIdx} 
                                onClick={(e) => {
                                  if (hasBooking) return;
                                  
                                  // Check if target slot is a deselect operation
                                  const isDeselect = selectedSlots.includes(slotKey);
                                  if (isDeselect) {
                                    setSelectedSlots(prev => prev.filter(k => k !== slotKey));
                                    return;
                                  }

                                  // If there are already selected slots, enforce status exclusivity
                                  if (selectedSlots.length > 0) {
                                    const firstKey = selectedSlots[0];
                                    const firstIsDisabled = disabledSlots.includes(firstKey);
                                    if (isDisabled !== firstIsDisabled) {
                                      // Block mixed state selections silently
                                      return;
                                    }
                                  }

                                  setSelectedSlots(prev => [...prev, slotKey]);
                                }}
                                className={`p-2 relative min-h-[140px] flex flex-col gap-1.5 transition-all cursor-pointer ${
                                  isSelected 
                                    ? "bg-[#2E9DA7]/15 border-2 border-[#2E9DA7]" 
                                    : isDisabled 
                                      ? "bg-[#F1F5F9] border-2 border-dashed border-[#CBD5E1] text-[#94A3B8]" 
                                      : "hover:bg-neutral-50"
                                }`}
                              >
                                {isDisabled && !isSelected && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                    <span className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">Disabled</span>
                                  </div>
                                )}
                                {/* Tuesday (21) bookings demo matching design */}
                                {dateNum === 21 && staffBookings.map((b) => (
                                  <div
                                    key={b.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenDropdownCardId(openDropdownCardId === b.id ? null : b.id);
                                    }}
                                    className={`bg-[#0CC0DF]/20 border-l-4 border-[#0CC0DF] rounded px-2 py-1.5 text-xs cursor-pointer hover:brightness-95 transition-all relative ${openDropdownCardId === b.id ? "z-40" : "z-20"}`}
                                  >
                                    <div className="font-semibold text-[#020305] text-[11px] truncate flex items-center justify-between">
                                      <span>{b.time.split(" - ")[0]} {b.client}</span>
                                    </div>
                                    <div className="text-[10px] text-[#45474B] truncate">{b.service.split("·")[0]}</div>
                                    {renderDropdown(b.id)}
                                  </div>
                                ))}

                                {/* Checkbox / Label indicator if selected */}
                                {isSelected && !hasBooking && (
                                  <div className="absolute top-2 right-2 w-4 h-4 bg-[#2E9DA7] text-white flex items-center justify-center rounded text-[10px] font-bold">
                                    ✓
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              /* DAILY / TODAY VIEW */
              <div className="flex w-full h-[1600px] relative">
                {/* Backdrop overlay to close dropdown on clicking outside */}
                {openDropdownCardId && (
                  <div
                    className="fixed inset-0 z-30 bg-transparent cursor-default"
                    onClick={() => setOpenDropdownCardId(null)}
                  />
                )}
                {/* Background Horizontal Grid Lines */}
                <div className="absolute left-[65px] right-0 top-0 bottom-0 pointer-events-none flex flex-col z-0">
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
                <div className="border-r border-[#C6C6CB] bg-[#FCF8F8] flex flex-col shrink-0 relative z-10" style={{ width: "64px" }}>
                  {["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"].map((time, idx) => (
                    <div key={idx} className="h-40 flex justify-center items-start pt-2">
                      <span className="font-poppins text-[11px] font-semibold text-[#45474B]">{time}</span>
                    </div>
                  ))}
                </div>

                {(() => {
                  const activeStaffList = staffColumns.filter(staff => selectedStaffFilter === "All Staff" || staff.name === selectedStaffFilter);
                  return (
                    <div className="flex-1 grid divide-x divide-[#C6C6CB] relative w-full" style={{ gridTemplateColumns: `repeat(${activeStaffList.length}, minmax(0, 1fr))` }}>
                      {activeStaffList.map((staff) => (
                        <div key={staff.name} className="relative h-full">
                          {/* Render click-capturable empty slots behind the bookings */}
                          <div className="absolute inset-0 z-0 flex flex-col">
                            {Array.from({ length: 10 }).map((_, hourIdx) => (
                              <div key={hourIdx} className="h-40 flex flex-col border-b border-[#C6C6CB]/20">
                                {[0, 1].map((halfIdx) => {
                                  const slotKey = `${staff.name}-today-${hourIdx}-${halfIdx}`;
                                  const isSelected = selectedSlots.includes(slotKey);
                                  const isDisabled = disabledSlots.includes(slotKey);
                                  return (
                                    <div
                                      key={halfIdx}
                                      onClick={() => {
                                        // Check if target slot is a deselect operation
                                        const isDeselect = selectedSlots.includes(slotKey);
                                        if (isDeselect) {
                                          setSelectedSlots(prev => prev.filter(k => k !== slotKey));
                                          return;
                                        }

                                        // Enforce status exclusivity
                                        if (selectedSlots.length > 0) {
                                          const firstKey = selectedSlots[0];
                                          // Note: Today view slot keys contain "-today-" substring, check if first key is in disabled list
                                          const firstIsDisabled = disabledSlots.includes(firstKey);
                                          if (isDisabled !== firstIsDisabled) {
                                            return;
                                          }
                                        }

                                        setSelectedSlots(prev => [...prev, slotKey]);
                                      }}
                                      className={`h-20 w-full relative transition-all cursor-pointer flex items-center justify-center ${
                                        isSelected 
                                          ? "bg-[#2E9DA7]/15 border border-[#2E9DA7]" 
                                          : isDisabled
                                            ? "bg-[#F1F5F9] border-b border-dashed border-[#CBD5E1] text-[#94A3B8]"
                                            : "hover:bg-neutral-50/50"
                                      }`}
                                    >
                                      {isDisabled && !isSelected && (
                                        <span className="text-[9px] font-bold tracking-wider text-[#94A3B8] uppercase pointer-events-none">Disabled</span>
                                      )}
                                      {isSelected && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-[#2E9DA7] text-white flex items-center justify-center rounded text-[10px] font-bold">
                                          ✓
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>

                          {bookings
                            .filter(b => b.staff === staff.name)
                            .map(b => (
                              <div
                                key={b.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdownCardId(openDropdownCardId === b.id ? null : b.id);
                                }}
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
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slots selected bottom bar */}
      {selectedSlots.length > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#C6C6CB] rounded-xl px-4 py-3 shadow-xl flex flex-col sm:flex-row items-center justify-between w-[calc(100%-32px)] sm:w-[640px] min-h-[94px] h-auto gap-4 sm:gap-0 z-30 select-none animate-fadeIn">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-[31px] h-10 rounded-full bg-[#CFE1FE] flex items-center justify-center shrink-0">
              <img src="/calederions/edit.svg" alt="Edit Icon" className="w-5 h-5 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins text-sm font-semibold text-[#020305]">{selectedSlots.length} {selectedSlots.length === 1 ? "slot" : "slots"} selected</span>
              <span className="text-xs text-[#45474B] font-poppins">
                {Array.from(new Set(selectedSlots.map(k => k.split("-")[0]))).join(", ")}'s schedule
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            {(() => {
              // If any of the selected slots are currently disabled, show Activate button
              const hasDisabledSelected = selectedSlots.some(key => disabledSlots.includes(key));
              
              if (hasDisabledSelected) {
                return (
                  <button 
                    onClick={() => {
                      setDisabledSlots(prev => prev.filter(k => !selectedSlots.includes(k)));
                      setSelectedSlots([]);
                    }}
                    className="bg-[#2E9DA7] text-white text-xs sm:text-sm font-medium px-4 sm:px-[36.2px] h-[44px] sm:h-[50px] rounded-lg hover:bg-[#20848f] transition-colors shadow-md flex-1 sm:flex-initial cursor-pointer"
                  >
                    Activate Selected Slots ({selectedSlots.length})
                  </button>
                );
              }

              return (
                <button 
                  onClick={() => {
                    setDisabledSlots(prev => [...prev, ...selectedSlots]);
                    setSelectedSlots([]);
                  }}
                  className="bg-[#020305] text-white text-xs sm:text-sm font-medium px-4 sm:px-[36.2px] h-[44px] sm:h-[50px] rounded-lg hover:bg-neutral-800 transition-colors shadow-md flex-1 sm:flex-initial cursor-pointer"
                >
                  Disable Selected Slots ({selectedSlots.length})
                </button>
              );
            })()}
            <button 
              onClick={() => setSelectedSlots([])}
              className="text-[#45474B] hover:text-neutral-900 text-xs sm:text-sm font-medium transition-colors shrink-0 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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

      {/* DatePicker Dropdown/Modal overlay */}
      {isDatePickerOpen && (
        <>
          {/* Backdrop close capture */}
          <div 
            className="fixed inset-0 z-40 bg-black/40 sm:bg-transparent"
            onClick={() => setIsDatePickerOpen(false)}
          />

          {/* DatePicker Layout wrapper:
              - Mobile: Fixed full-screen modal with vertical scroll stacked months
              - Desktop: Absolute popover positioned below the Date Navigator container
          */}
          <div className="fixed inset-0 sm:absolute sm:inset-auto sm:top-[45px] sm:left-0 z-50 bg-white sm:rounded-2xl shadow-[0px_8px_30px_rgba(0,0,0,0.12)] border border-neutral-100 p-6 flex flex-col font-sans h-screen sm:h-auto overflow-y-auto w-full sm:w-[680px]">
            {/* Header / Top Weeks buttons */}
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100 sm:border-none">
              <div className="flex gap-2 overflow-x-auto pb-1 w-full no-scrollbar">
                {["In 1 week", "In 2 weeks", "In 3 weeks", "In 4 weeks", "In 5 weeks"].map((label, idx) => (
                  <button 
                    key={label}
                    onClick={() => {
                      const futureDate = new Date();
                      futureDate.setDate(futureDate.getDate() + (idx + 1) * 7);
                      setCurrentDate(futureDate);
                      setIsDatePickerOpen(false);
                    }}
                    className="px-4 py-1.5 border border-neutral-200 hover:border-neutral-800 rounded-full text-xs font-semibold whitespace-nowrap text-[#1C1B1C] transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setIsDatePickerOpen(false)} 
                className="text-neutral-600 hover:text-neutral-900 font-medium text-lg px-2 sm:hidden cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Desktop View: Double Side-by-Side Month Calendars (with dynamic arrow paging) */}
            {(() => {
              const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              
              const m1Index = datePickerSelectedMonth; // Left month index
              const m2Index = (datePickerSelectedMonth + 1) % 12; // Right month index
              const m1Year = 2026;
              const m2Year = m2Index === 0 ? 2027 : 2026;

              const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
              const getFirstDayOffset = (month: number, year: number) => {
                let day = new Date(year, month, 1).getDay(); // 0 is Sun, 1 is Mon
                return day === 0 ? 6 : day - 1; // convert to Mon-Sun offset
              };

              const m1Days = getDaysInMonth(m1Index, m1Year);
              const m1Offset = getFirstDayOffset(m1Index, m1Year);

              const m2Days = getDaysInMonth(m2Index, m2Year);
              const m2Offset = getFirstDayOffset(m2Index, m2Year);

              return (
                <div className="hidden sm:flex gap-8 mt-4">
                  {/* Left Month Calendar */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <button 
                        onClick={() => setDatePickerSelectedMonth(prev => prev === 0 ? 11 : prev - 1)}
                        className="text-neutral-600 hover:text-neutral-900 font-bold p-1 px-2 hover:bg-neutral-100 rounded cursor-pointer"
                      >
                        &larr;
                      </button>
                      <span className="font-semibold text-sm text-[#1C1B1C]">{monthsList[m1Index]} {m1Year}</span>
                      <span className="w-8"></span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                        <span key={d} className="font-semibold text-[#45474B] py-1">{d}</span>
                      ))}
                      {/* Offset buffer days */}
                      {Array.from({ length: m1Offset }).map((_, i) => (
                        <span key={`b1-${i}`} className="py-1.5"></span>
                      ))}
                      {Array.from({ length: m1Days }).map((_, d) => {
                        const dayNum = d + 1;
                        const isSelected = currentDate.getDate() === dayNum && currentDate.getMonth() === m1Index && currentDate.getFullYear() === m1Year;
                        return (
                          <button
                            key={`m1-d-${dayNum}`}
                            onClick={() => {
                              setCurrentDate(new Date(m1Year, m1Index, dayNum));
                              setViewMode("Today");
                              setIsDatePickerOpen(false);
                            }}
                            className={`py-1.5 rounded-full font-medium hover:bg-neutral-100 transition-colors cursor-pointer ${
                              isSelected ? "bg-[#020305] text-white" : "text-[#1C1B1C]"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Month Calendar */}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <span className="w-8"></span>
                      <span className="font-semibold text-sm text-[#1C1B1C]"> {monthsList[m2Index]} {m2Year}</span>
                      <button 
                        onClick={() => setDatePickerSelectedMonth(prev => (prev + 1) % 12)}
                        className="text-neutral-600 hover:text-neutral-900 font-bold p-1 px-2 hover:bg-neutral-100 rounded cursor-pointer"
                      >
                        &rarr;
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                        <span key={d} className="font-semibold text-[#45474B] py-1">{d}</span>
                      ))}
                      {/* Offset buffer days */}
                      {Array.from({ length: m2Offset }).map((_, i) => (
                        <span key={`b2-${i}`} className="py-1.5"></span>
                      ))}
                      {Array.from({ length: m2Days }).map((_, d) => {
                        const dayNum = d + 1;
                        const isSelected = currentDate.getDate() === dayNum && currentDate.getMonth() === m2Index && currentDate.getFullYear() === m2Year;
                        return (
                          <button
                            key={`m2-d-${dayNum}`}
                            onClick={() => {
                              setCurrentDate(new Date(m2Year, m2Index, dayNum));
                              setViewMode("Today");
                              setIsDatePickerOpen(false);
                            }}
                            className={`py-1.5 rounded-full font-medium hover:bg-neutral-100 transition-colors cursor-pointer ${
                              isSelected ? "bg-[#020305] text-white" : "text-[#1C1B1C]"
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Mobile View: Vertical scroll calendar stack (scrolling next months automatically) */}
            {(() => {
              const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              // Generate next 12 months for seamless scroll view
              const generatedMonths = Array.from({ length: 12 }, (_, i) => {
                const now = new Date();
                now.setMonth(now.getMonth() + i);
                return {
                  monthIndex: now.getMonth(),
                  year: now.getFullYear()
                };
              });

              return (
                <div className="flex sm:hidden flex-col gap-6 mt-4 pb-20 overflow-y-auto flex-1">
                  {generatedMonths.map(({ monthIndex, year }) => {
                    const daysCount = new Date(year, monthIndex + 1, 0).getDate();
                    const firstDay = new Date(year, monthIndex, 1).getDay();
                    const offset = firstDay === 0 ? 6 : firstDay - 1;

                    return (
                      <div key={`${year}-${monthIndex}`} className="border-b border-neutral-100 pb-4">
                        <span className="font-bold text-sm text-[#1C1B1C] block mb-3">{monthsList[monthIndex]} {year}</span>
                        <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                            <span key={d} className="font-semibold text-[#45474B] py-1">{d}</span>
                          ))}
                          {Array.from({ length: offset }).map((_, i) => (
                            <span key={`mob-b-${i}`} className="py-2"></span>
                          ))}
                          {Array.from({ length: daysCount }).map((_, d) => {
                            const dayNum = d + 1;
                            const isSelected = currentDate.getDate() === dayNum && currentDate.getMonth() === monthIndex && currentDate.getFullYear() === year;
                            return (
                              <button
                                key={`mob-d-${dayNum}`}
                                onClick={() => {
                                  setCurrentDate(new Date(year, monthIndex, dayNum));
                                  setViewMode("Today");
                                  setIsDatePickerOpen(false);
                                }}
                                className={`py-2 rounded-full font-medium hover:bg-neutral-100 transition-colors cursor-pointer ${
                                  isSelected ? "bg-[#020305] text-white" : "text-[#1C1B1C]"
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </>
      )}
    </main>
  );
}
