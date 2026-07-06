"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  ArrowDown01Icon,
  Add01Icon,
  BellIcon,
  Tick01Icon,
  Money01Icon,
  ViewIcon
} from "@hugeicons/core-free-icons";

interface DashboardCalendarProps {
  onNewBookingClick?: () => void;
}

export default function DashboardCalendar({ onNewBookingClick }: DashboardCalendarProps) {
  const [openDropdownCardId, setOpenDropdownCardId] = useState<string | null>(null);

  const renderDropdown = (cardId: string) => {
    if (openDropdownCardId !== cardId) return null;
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-6 top-[25px] z-50 w-[160px] bg-white rounded-xl shadow-2xl border border-[#C6C6CB] flex flex-col py-1 text-xs select-none animate-fadeIn"
      >
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#BA1A1A] font-medium" onClick={() => setOpenDropdownCardId(null)}>
          <img src="/calederions/userCross.svg" alt="No-show" className="w-3.5 h-3.5 shrink-0" />
          <span>No-show</span>
        </button>
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#1C1B1C]" onClick={() => setOpenDropdownCardId(null)}>
          <HugeiconsIcon icon={Money01Icon} className="w-3.5 h-3.5 text-[#141B34] shrink-0" />
          <span>Waive charge</span>
        </button>
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#1C1B1C]" onClick={() => setOpenDropdownCardId(null)}>
          <HugeiconsIcon icon={ViewIcon} className="w-3.5 h-3.5 text-[#0C0C0C] shrink-0" />
          <span>View Booking</span>
        </button>
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#1C1B1C]" onClick={() => setOpenDropdownCardId(null)}>
          <HugeiconsIcon icon={Tick01Icon} className="w-3.5 h-3.5 text-[#141B34] shrink-0" />
          <span>Complete</span>
        </button>
      </div>
    );
  };

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] relative">
      {/* Calendar Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 py-3 sm:py-0 sm:h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 items-center justify-between shrink-0 select-none">
        {/* Left side: Today & Date picker */}
        <div className="flex items-center gap-4">
          {/* Today Button */}
          <button className="border border-[#111111] rounded-md px-3 py-1.5 flex items-center gap-1.5 h-9 bg-white hover:bg-neutral-50 transition-all text-sm font-medium text-[#111111]">
            <span>Today</span>
            <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
          </button>

          {/* Date Navigator */}
          <div className="flex items-center border border-[#C6C6CB] rounded-lg bg-white h-9 overflow-hidden">
            <button className="px-3 h-full border-r border-[#C6C6CB] hover:bg-neutral-50 transition-all text-neutral-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2 px-4 h-full">
              <HugeiconsIcon icon={Calendar03Icon} className="w-4 h-4 text-[#0C0C0C]" />
              <span className="font-poppins text-xs font-semibold text-[#1C1B1C]">Wednesday 21 Jun</span>
            </div>
            <button className="px-3 h-full border-l border-[#C6C6CB] hover:bg-neutral-50 transition-all text-neutral-600 flex items-center justify-center">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right side: Staff, New Booking, Notifications */}
        <div className="flex items-center gap-4">
          {/* Staff filter */}
          <button className="border border-[#111111] rounded-md px-3 py-1.5 flex items-center gap-1.5 h-9 bg-white hover:bg-neutral-50 transition-all text-sm font-medium text-[#111111]">
            <span>All Staff</span>
            <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
          </button>

          {/* New Booking */}
          <button
            onClick={onNewBookingClick}
            className="bg-[#020305] text-white rounded-lg h-9 px-4 flex items-center gap-2 text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
            <span>New Booking</span>
          </button>

          {/* Bell Notification Button */}
          <div className="relative">
            <button className="w-9 h-9 border border-[#E8E8E6] bg-white rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all shadow-sm">
              <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px] text-[#5F5E5A]" />
            </button>
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E24B4A] text-white text-[9px] font-medium flex items-center justify-center rounded-full border-2 border-white">
              5
            </span>
          </div>
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
            <div className="flex-1 grid grid-cols-4 divide-x divide-[#C6C6CB]">
              {[
                { name: "John", hasBorder: true },
                { name: "Maria", hasBorder: false },
                { name: "Marilana", hasBorder: false },
                { name: "Julie", hasBorder: false }
              ].map((staff, index) => (
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
                    <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 text-[#141B34]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scrollable Grid Area */}
          <div className="flex-1 overflow-y-auto relative bg-[#FCF8F8] select-none min-h-0">
            {/* Grid Container */}
            <div className="flex w-full h-[800px] relative">
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
                  <div key={idx} className="h-20 w-full flex flex-col">
                    {/* Dashed half hour line */}
                    <div className="h-10 border-b border-dashed border-[#C6C6CB]/20"></div>
                    {/* Solid hour line */}
                    <div className="h-10 border-b border-[#C6C6CB]/40"></div>
                  </div>
                ))}
              </div>

              {/* Time Column (Left Side Axis) */}
              <div className="w-16 border-r border-[#C6C6CB] bg-[#FCF8F8] flex flex-col shrink-0 relative z-10">
                {["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"].map((time, idx) => (
                  <div key={idx} className="h-20 flex justify-center items-start pt-2">
                    <span className="font-poppins text-[11px] font-semibold text-[#45474B]">{time}</span>
                  </div>
                ))}
              </div>

              {/* Columns for Staff */}
              <div className="flex-1 grid grid-cols-4 divide-x divide-[#C6C6CB] relative">
                {/* Column 1: John */}
                <div className="relative h-full">
                  {/* Brenda Massey */}
                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "john-brenda" ? null : "john-brenda")}
                    className={`absolute left-[3%] right-[3%] top-[0px] h-[83px] bg-[#BBEBFF] border-l-4 border-[#0CC0DF] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "john-brenda" ? "z-40" : "z-20"}`}
                  >
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">8:00 - 8:30</span>
                        <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none">Upcoming</span>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">Brenda Massey</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Hair cut · Hair cut · +3 Add-ons</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    {renderDropdown("john-brenda")}
                  </div>

                  {/* Craig Mango */}
                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "john-craig" ? null : "john-craig")}
                    className={`absolute left-[3%] right-[3%] top-[153px] h-[83px] bg-[#FFB5D3] border-l-4 border-[#FF6B9E] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "john-craig" ? "z-40" : "z-20"}`}
                  >
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">10:00 - 10:30</span>
                        <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none flex items-center gap-0.5">
                          <span>No-show - charged</span>
                          <HugeiconsIcon icon={Tick01Icon} className="w-2 h-2 text-[#45474B]" />
                        </span>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">Craig Mango</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Yoga session</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    {renderDropdown("john-craig")}
                  </div>

                  {/* Zain Dias */}
                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "john-zain" ? null : "john-zain")}
                    className={`absolute left-[3%] right-[3%] top-[241px] h-[83px] bg-[#FFD18B] border-l-4 border-[#F59E0B] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "john-zain" ? "z-40" : "z-20"}`}
                  >
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">11:00 - 11:30</span>
                        <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none">No-show - cancelled ✓</span>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">Zain Dias</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Hair Coloring</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    {renderDropdown("john-zain")}
                  </div>
                </div>

                {/* Column 2: Maria */}
                <div className="relative h-full">
                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "maria-alena" ? null : "maria-alena")}
                    className={`absolute left-[3%] right-[3%] top-[0px] h-[83px] bg-[#FFD18B] border-l-4 border-[#F59E0B] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "maria-alena" ? "z-40" : "z-20"}`}
                  >
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">8:00 - 8:30</span>
                        <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none">Upcoming</span>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">Alena Geidt</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Hair cut</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    {renderDropdown("maria-alena")}
                  </div>

                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "maria-marilyn" ? null : "maria-marilyn")}
                    className={`absolute left-[3%] right-[3%] top-[80px] h-[83px] bg-[#86EFAC]/65 border-l-4 border-[#10B981] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "maria-marilyn" ? "z-40" : "z-20"}`}
                  >
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">9:00 - 10:00</span>
                        <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none">No-show - cancelled ✓</span>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">Marilyn Carder</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Hair and Beard Cut</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    {renderDropdown("maria-marilyn")}
                  </div>
                </div>

                {/* Column 3: Marilana */}
                <div className="relative h-full">
                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "marilana-phillip" ? null : "marilana-phillip")}
                    className={`absolute left-[3%] right-[3%] top-[80px] h-[100px] bg-[#FFB5D3] border-l-4 border-[#FF6B9E] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "marilana-phillip" ? "z-40" : "z-20"}`}
                  >
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">9:00 - 10:00</span>
                        <div className="flex items-center gap-1">
                          <span className="border border-[#D44343] rounded px-1 py-0.5 text-[8px] font-semibold text-[#D44343] leading-none bg-white/40">
                            Pending !
                          </span>
                          <span className="text-[9px] font-medium text-[#45474B]">90:00</span>
                        </div>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">Phillip Dorwart</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Beard Grooming</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {renderDropdown("marilana-phillip")}
                  </div>

                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "marilana-desirae" ? null : "marilana-desirae")}
                    className={`absolute left-[3%] right-[3%] top-[324px] h-[100px] bg-[#BBEBFF] border-l-4 border-[#0CC0DF] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "marilana-desirae" ? "z-40" : "z-20"}`}
                  >
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">12:30 - 1:30</span>
                        <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none flex items-center gap-0.5">
                          <span>Cancelled by customer</span>
                          <span className="text-[#FB3535] font-bold">x</span>
                        </span>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">Desirae Stanton</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Blow Dry</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    {renderDropdown("marilana-desirae")}
                  </div>
                </div>

                {/* Column 4: Julie */}
                <div className="relative h-full">
                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "julie-james" ? null : "julie-james")}
                    className={`absolute left-[3%] right-[3%] top-[40px] h-[100px] bg-[#89E6D5] border-l-4 border-[#10B981] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "julie-james" ? "z-40" : "z-20"}`}
                  >
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">8:00 - 9:30</span>
                        <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none">Late cancellation ✓</span>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">James Herwitz</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Balinese Massage</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    {renderDropdown("julie-james")}
                  </div>

                  <div
                    onClick={() => setOpenDropdownCardId(openDropdownCardId === "julie-amy" ? null : "julie-amy")}
                    className={`absolute left-[3%] right-[3%] top-[140px] h-[120px] bg-[#BBEBFF] border-l-4 border-[#0CC0DF] rounded-md p-2 shadow-sm flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform ${openDropdownCardId === "julie-amy" ? "z-40" : "z-20"}`}
                  >
                    <button className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-900 select-none">
                      <svg className="w-1 h-3" fill="currentColor" viewBox="0 0 4 16">
                        <path d="M2 10a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex justify-between items-center pr-4">
                        <span className="text-[9px] font-medium text-[#45474B] leading-none">9:00 - 9:30</span>
                        <span className="bg-white/50 px-1 py-0.5 rounded text-[8px] font-semibold text-[#45474B] leading-none">Upcoming</span>
                      </div>
                      <h4 className="font-poppins text-xs font-semibold text-[#020305] mt-1.5 truncate">Amy Jones</h4>
                      <p className="text-[10px] text-[#45474B] truncate mt-0.5">Haircut and colour</p>
                    </div>
                    <span className="text-[10px] font-medium text-[#45474B]">€54</span>
                    {renderDropdown("julie-amy")}
                  </div>
                </div>
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
          <button className="bg-[#020305] text-white text-xs sm:text-sm font-medium px-4 sm:px-[36.2px] h-[44px] sm:h-[50px] rounded-lg hover:bg-neutral-800 transition-colors shadow-md flex-1 sm:flex-initial">
            Disable Selected Slots (2)
          </button>
          <button className="text-[#45474B] hover:text-neutral-900 text-xs sm:text-sm font-medium transition-colors shrink-0">
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
