"use client";

import React, { useState, useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BellIcon,
  DashboardSquare01Icon,
  Calendar03Icon,
  UserGroup03Icon,
  ProfileIcon,
  Orbit01Icon,
  CancelSquareIcon,
  Briefcase01Icon,
  PowerServiceIcon,
  AddSquareIcon,
  TieIcon,
  StarSquareIcon,
  Wallet03Icon,
  Analytics01Icon,
  Settings01Icon,
  ArrowDown01Icon,
  StarIcon,
  CalendarCheck2Icon,
  ReceiptTextIcon,
  Cancel01Icon,
  Clock01Icon,
  HeadsetIcon,
  Logout01Icon
} from "@hugeicons/core-free-icons";

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [scheduleFilter, setScheduleFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Today");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showFooterMenu, setShowFooterMenu] = useState(true);
  const footerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showFooterMenu && footerMenuRef.current) {
      footerMenuRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [showFooterMenu]);

  // Mock data for Schedule
  const scheduleData = [
    {
      time: "09:00 PM",
      name: "Maria K.",
      service: "Hair colour - 60 min",
      payment: "$100",
      platformFee: "$20",
      remainingFee: "$80",
      staff: "Anna",
      lead: "New customer",
    },
    {
      time: "09:00 PM",
      name: "Maria K.",
      service: "Hair colour - 60 min",
      payment: "$100",
      platformFee: "0",
      remainingFee: "$100",
      staff: "George",
      lead: "Returning",
    },
    {
      time: "09:00 PM",
      name: "Maria K.",
      service: "Hair colour - 60 min",
      payment: "$100",
      platformFee: "0",
      remainingFee: "$100",
      staff: "George",
      lead: "Returning",
    },
    {
      time: "09:00 PM",
      name: "Maria K.",
      service: "Hair colour - 60 min",
      payment: "$100",
      platformFee: "$20",
      remainingFee: "$20",
      staff: "George",
      lead: "Returning",
    },
  ];

  // Mock data for Timeline
  const timelineEvents = [
    { time: "10:30", name: "Maria K.", detail: "Lash Extensions - Elena", duration: "120 min - Return client" },
    { time: "14:00", name: "Sofia C.", detail: "Bridal Make-up - Elena", duration: "Strovolos - First booking" },
    { time: "16:30", name: "Anna N.", detail: "Manicure & Gel - Elena", duration: "Limassol - +€15 travel" },
  ];

  // Mock data for Activity Feed
  const activityFeed = [
    {
      id: 1,
      type: "booking",
      text: "New client booked — Maria K. - Hair colour. Deposit €20 collected.",
      time: "2 min ago",
      icon: StarIcon,
      bg: "bg-[#E1F5EE]",
      color: "text-[#085041]"
    },
    {
      id: 2,
      type: "confirm",
      text: "Nikos P. confirmed for tomorrow at 10:30.",
      time: "1 hr ago",
      icon: CalendarCheck2Icon,
      bg: "bg-blue-50",
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "payout",
      text: "SEPA payout received — €210 for May no-show fees.",
      time: "Yesterday",
      icon: ReceiptTextIcon,
      bg: "bg-amber-50",
      color: "text-amber-600"
    },
    {
      id: 4,
      type: "cancel",
      text: "Elena S. cancelled. €18 deposit refunded automatically.",
      time: "2 days ago",
      icon: Cancel01Icon,
      bg: "bg-red-50",
      color: "text-red-600"
    }
  ];

  return (
    <div className="flex bg-[#FCFAF9] min-h-screen font-poppins text-[#111111]">
      {/* 1. Sidebar */}
      <aside className={`bg-[#C0D5D8] flex flex-col justify-between shrink-0 border-r border-[#B0C5C8] h-screen sticky top-0 transition-all duration-300 ${isCollapsed ? "w-[78px]" : "w-[280px]"}`}>
        <div>
          {/* Top Logo and User Container */}
          <div className={`flex items-center px-4 py-5 border-b border-[#757575]/30 ${isCollapsed ? "flex-col gap-4 justify-center" : "justify-between"}`}>
            <div className="flex items-center gap-3">
              <img
                src="/img/smallBlackLogo.svg"
                alt="Bookly Logo"
                className="w-8 h-[38.4px] object-contain"
              />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-semibold text-sm leading-tight text-[#111111]">Bookly.cy</span>
                  <span className="text-xs text-[#4E5F78]">Business Owner</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:bg-[#B0C5C8]/50 p-1.5 rounded transition-all"
            >
              <img src="/businessDashboard/Sidebar Icon.svg" alt="Sidebar Collapse" className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`px-3.5 py-4 space-y-5 overflow-y-auto scrollbar-hide transition-all duration-300 ${
            showFooterMenu ? "max-h-[calc(100vh-280px)]" : "max-h-[calc(100vh-165px)]"
          }`}>
            {/* OVERVIEW SECTION */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-medium tracking-[2px] uppercase text-[#111111]/60 px-3 block mb-2">Overview</span>
              )}
              <button
                onClick={() => setActiveTab("Dashboard")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Dashboard" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={DashboardSquare01Icon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Dashboard" ? "font-normal" : "font-light"}>Dashboard</span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("Calendar")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Calendar" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Calendar03Icon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Calendar" ? "font-normal" : "font-light"}>Calendar</span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("Clients")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Clients" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={UserGroup03Icon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Clients" ? "font-normal" : "font-light"}>Clients</span>
                  )}
                </div>
              </button>
            </div>

            {/* BOOKINGS SECTION */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-medium tracking-[2px] uppercase text-[#111111]/60 px-3 block mb-2">Bookings</span>
              )}
              <button
                onClick={() => setActiveTab("All Bookings")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "All Bookings" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={ProfileIcon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "All Bookings" ? "font-normal" : "font-light"}>All Bookings</span>
                  )}
                </div>
                {isCollapsed ? (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E24B4A] rounded-full border border-[#C0D5D8]" />
                ) : (
                  <span className="bg-[#E24B4A] text-white text-[10px] font-medium px-2 py-0.5 rounded-full">3</span>
                )}
              </button>
              <button
                onClick={() => setActiveTab("Upcoming")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Upcoming" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Orbit01Icon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Upcoming" ? "font-normal" : "font-light"}>Upcoming</span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("Canceled")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Canceled" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CancelSquareIcon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Canceled" ? "font-normal" : "font-light"}>Canceled</span>
                  )}
                </div>
              </button>
            </div>

            {/* BUSINESS SECTION */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-medium tracking-[2px] uppercase text-[#111111]/60 px-3 block mb-2">Business</span>
              )}
              <button
                onClick={() => setActiveTab("Business Profile")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Business Profile" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Briefcase01Icon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Business Profile" ? "font-normal" : "font-light"}>Business Profile</span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("Services")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Services" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={PowerServiceIcon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Services" ? "font-normal" : "font-light"}>Services</span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("Add-ons")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Add-ons" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={AddSquareIcon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Add-ons" ? "font-normal" : "font-light"}>Add-ons</span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("Staff")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Staff" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={TieIcon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Staff" ? "font-normal" : "font-light"}>Staff</span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("Reviews")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Reviews" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={StarSquareIcon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Reviews" ? "font-normal" : "font-light"}>Reviews</span>
                  )}
                </div>
              </button>
            </div>

            {/* FINANCE SECTION */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-medium tracking-[2px] uppercase text-[#111111]/60 px-3 block mb-2">Finance</span>
              )}
              <button
                onClick={() => setActiveTab("Payouts & Finance")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Payouts & Finance" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Wallet03Icon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Payouts & Finance" ? "font-normal" : "font-light"}>Payouts & Finance</span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setActiveTab("Analytics")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Analytics" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Analytics01Icon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Analytics" ? "font-normal" : "font-light"}>Analytics</span>
                  )}
                </div>
              </button>
            </div>

            {/* ACCOUNT SECTION */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-medium tracking-[2px] uppercase text-[#111111]/60 px-3 block mb-2">Account</span>
              )}
              <button
                onClick={() => setActiveTab("Settings")}
                className={`w-full flex items-center rounded-lg text-sm transition-all duration-150 relative ${
                  isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2.5"
                } ${
                  activeTab === "Settings" ? "bg-[#111111] text-white" : "text-[#111111] hover:bg-[#B0C5C8]/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={Settings01Icon} className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className={activeTab === "Settings" ? "font-normal" : "font-light"}>Settings</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* User Footer Profile */}
        <div className="border-t border-[#757575]/30 bg-[#C0D5D8] flex flex-col">
          {/* Profile Card */}
          <div className={`p-4 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setShowFooterMenu(!showFooterMenu)}>
              <img
                src="/businessDashboard/downLogo.png"
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border border-[#4E5F78]"
              />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#111111]">MasterPlan LLC</span>
                  <span className="text-[11px] text-[#4E5F78] max-w-[140px] truncate">agent@msplan.com</span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className={`w-4 h-4 text-[#1C1B1C] cursor-pointer transition-transform duration-200 ${showFooterMenu ? "rotate-180" : ""}`}
                onClick={() => setShowFooterMenu(!showFooterMenu)}
              />
            )}
          </div>

          {/* Collapsible Submenu in flow */}
          <div
            ref={footerMenuRef}
            className={`flex flex-col border-[#757575]/15 bg-[#B8CED1] transition-all duration-300 ease-in-out overflow-hidden ${
              showFooterMenu ? "max-h-[110px] opacity-100 border-t py-2 px-3.5" : "max-h-0 opacity-0 py-0 px-3.5"
            } ${isCollapsed ? "items-center !px-1" : ""} gap-1`}
          >
            {/* Contact Support */}
            <button className={`flex items-center gap-3 py-2 px-2.5 hover:bg-[#A8BEC1] rounded-lg text-left transition-all ${isCollapsed ? "w-full justify-center" : "w-full"}`}>
              <HugeiconsIcon icon={HeadsetIcon} className="w-5 h-5 text-[#111111] shrink-0" />
              {!isCollapsed && (
                <span className="font-manrope font-medium text-xs text-[#111111]">Contact Support</span>
              )}
            </button>
            {/* Logout */}
            <button className={`flex items-center gap-3 py-2 px-2.5 hover:bg-[#A8BEC1] rounded-lg text-left transition-all ${isCollapsed ? "w-full justify-center" : "w-full"}`}>
              <HugeiconsIcon icon={Logout01Icon} className="w-5 h-5 text-[#111111] shrink-0" />
              {!isCollapsed && (
                <span className="font-manrope font-medium text-xs text-[#111111]">Logout</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-6 md:p-8 xl:p-10 overflow-y-auto max-h-screen">
        {/* Top Header Block */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">Dashboard</h1>
            <p className="text-xs text-neutral-500 font-poppins mt-0.5">Wednesday, 27 May 2026 · Good morning, Elena</p>
          </div>

          <div className="flex flex-col items-end gap-3">
            {/* Bell Icon Notification Button */}
            <div className="relative">
              <button className="w-9 h-9 border border-[#E8E8E6] bg-white rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all shadow-sm">
                <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px] text-[#5F5E5A]" />
              </button>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E24B4A] text-white text-[9px] font-medium flex items-center justify-center rounded-full border-2 border-white">
                5
              </span>
            </div>

            {/* Time Toggle Buttons */}
            <div className="bg-white border border-[#E2E8F0] p-1 rounded-xl shadow-sm flex items-center gap-1">
              {["Today", "7D", "30D", "Custom"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTimeFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    timeFilter === tab
                      ? "bg-[#F1F5F9] text-[#0F172A] shadow-sm"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Metric Strip Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          {/* Card 1 */}
          <div className="bg-white border border-[#D3D3D3] rounded-xl p-4.5 shadow-sm flex flex-col justify-between h-[96px]">
            <span className="text-[11px] font-normal text-[#888780] font-poppins">Today's bookings</span>
            <div className="flex flex-col mt-0.5">
              <span className="text-3xl font-semibold text-[#1A1A1A] leading-none">8</span>
              <span className="text-xs text-[#757575] mt-1.5 font-poppins">3 remaining</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#D3D3D3] rounded-xl p-4.5 shadow-sm flex flex-col justify-between h-[96px]">
            <span className="text-[11px] font-normal text-[#888780] font-poppins">To collect today</span>
            <div className="flex flex-col mt-0.5">
              <span className="text-3xl font-semibold text-[#1D9E75] leading-none">€320</span>
              <span className="text-xs text-[#757575] mt-1.5 font-poppins">pay at venue</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#D3D3D3] rounded-xl p-4.5 shadow-sm flex flex-col justify-between h-[96px]">
            <span className="text-[11px] font-normal text-[#888780] font-poppins">No-shows this month</span>
            <div className="flex flex-col mt-0.5">
              <span className="text-3xl font-semibold text-[#E24B4A] leading-none">2</span>
              <span className="text-xs text-[#757575] mt-1.5 font-poppins">€45 charged</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#D3D3D3] rounded-xl p-4.5 shadow-sm flex flex-col justify-between h-[96px]">
            <span className="text-[11px] font-normal text-[#888780] font-poppins">Monthly revenue</span>
            <div className="flex flex-col mt-0.5">
              <span className="text-3xl font-semibold text-[#1D9E75] leading-none">€4280</span>
              <span className="text-xs text-transparent mt-1.5 select-none font-poppins">-</span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white border border-[#D3D3D3] rounded-xl p-4.5 shadow-sm flex flex-col justify-between h-[96px]">
            <span className="text-[11px] font-normal text-[#888780] font-poppins">Avg Rating</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-3xl font-semibold text-[#1A1A1A] leading-none">4.9</span>
              <img src="/businessDashboard/Metric 5 Star.svg" alt="5 Stars" className="w-5 h-5 object-contain" />
            </div>
            <div className="flex items-center text-[11px] text-[#757575] hover:text-[#111111] cursor-pointer mt-0.5 font-poppins whitespace-nowrap select-none">
              <span>38 verified reviews</span>
              <svg className="w-3.5 h-3.5 ml-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 4. Schedule & Info Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Area: Today's schedule table */}
          <div className="xl:col-span-2 space-y-4">
            <div className="bg-white border border-[#E8E8E6] rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Clock01Icon} className="w-5 h-5 text-[#888780]" />
                  <h2 className="text-sm font-medium text-[#5F5E5A] font-poppins">Today's schedule</h2>
                </div>

                {/* Filter toggle buttons */}
                <div className="bg-[#F7F5F1] p-0.5 rounded-lg flex items-center gap-0.5">
                  {["All", "AM", "PM"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setScheduleFilter(tab)}
                      className={`px-3 py-1 text-xs font-normal rounded-md transition-all ${
                        scheduleFilter === tab
                          ? "bg-[#0F1E35] text-white"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table/List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F7F5F1] border-b border-[#F7F5F1]">
                      <th className="py-2.5 px-4 text-xs font-semibold text-[#5F5E5A] font-poppins">Time</th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-[#5F5E5A] font-poppins">Name & Service</th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-[#5F5E5A] font-poppins">Total Payment</th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-[#5F5E5A] font-poppins">Platform fee</th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-[#5F5E5A] font-poppins">Remaining fee</th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-[#5F5E5A] font-poppins">Staff</th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-[#5F5E5A] font-poppins">Lead</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {scheduleData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="py-3 px-4 text-xs text-[#888780] font-poppins">{row.time}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-[#1A1A1A] font-poppins">{row.name}</span>
                            <span className="text-[11px] text-[#888780] font-poppins">{row.service}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#5F5E5A] font-poppins">{row.payment}</td>
                        <td className="py-3 px-4 text-xs text-[#5F5E5A] font-poppins">{row.platformFee}</td>
                        <td className="py-3 px-4 text-xs text-[#5F5E5A] font-poppins">{row.remainingFee}</td>
                        <td className="py-3 px-4 text-xs text-[#5F5E5A] font-poppins">{row.staff}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 text-[11px] font-medium rounded-full ${
                              row.lead === "New customer"
                                ? "bg-[#E1F5EE] text-[#085041]"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {row.lead}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Full Calendar Link (outside the box) */}
            <div className="mt-4">
              <button className="text-xs font-medium text-[#1D9E75] hover:opacity-85 transition-opacity flex items-center gap-1.5 font-poppins">
                <span>View full calendar</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Area: Today's Schedule Timeline & Activity */}
          <div className="space-y-6">
            {/* Today's Schedule Card */}
            <div className="bg-white border border-[#E8E8E6] rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[#0F1E35] font-poppins mb-4">Today's Schedule</h3>
              <div className="space-y-4">
                {timelineEvents.map((evt, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="bg-[#111111] text-white text-[10px] font-medium px-2 py-1 rounded w-12 text-center shrink-0">
                      {evt.time}
                    </span>
                    <div className="flex flex-col pl-1">
                      <span className="text-xs font-semibold text-[#111111]">{evt.name}</span>
                      <span className="text-[11px] text-neutral-500">{evt.detail}</span>
                      <span className="text-[10px] text-amber-600 font-medium mt-0.5">{evt.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white border border-[#E8E8E6] rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <img src="/businessDashboard/Activity.svg" alt="Activity Trend" className="w-8 h-4 object-contain opacity-95" />
                <h3 className="text-sm font-semibold text-[#0F1E35] font-poppins">Recent activity</h3>
              </div>

              <div className="space-y-4">
                {activityFeed.map((act) => (
                  <div key={act.id} className="flex gap-3 items-start">
                    <div className={`w-8 h-8 rounded-full ${act.bg} flex items-center justify-center shrink-0`}>
                      <HugeiconsIcon icon={act.icon} className={`w-4 h-4 ${act.color}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-neutral-700 font-poppins leading-normal">{act.text}</span>
                      <span className="text-[10px] text-neutral-400 font-poppins mt-0.5">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
