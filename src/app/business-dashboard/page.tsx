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
  Logout01Icon,
  Add01Icon,
  Money01Icon,
  ViewIcon,
  Tick01Icon
} from "@hugeicons/core-free-icons";

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [scheduleFilter, setScheduleFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("Today");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showFooterMenu, setShowFooterMenu] = useState(true);
  const [openDropdownCardId, setOpenDropdownCardId] = useState<string | null>(null);
  const footerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showFooterMenu && footerMenuRef.current) {
      footerMenuRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [showFooterMenu]);

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
        <button className="px-4 py-2 hover:bg-neutral-50 text-left flex items-center gap-2 text-[#1C1B1C]" onClick={() => setOpenDropdownCardId(null)}>
          <HugeiconsIcon icon={Cancel01Icon} className="w-3.5 h-3.5 text-[#0C0C0C] shrink-0" />
          <span>Cancel Booking</span>
        </button>
      </div>
    );
  };

  const clientsData = [
    {
      name: "Sara L.",
      joined: "Since Jan 2024",
      phone: "+357 99 123 456",
      visitText: "11 May 2026",
      visitSub: "Last visit",
      isNext: false,
      visits: 18,
      spent: "€1,440",
      tag: "VIP",
      tagBg: "bg-[#FAEEDA]",
      tagColor: "text-[#633806]",
      avatarBg: "bg-[#E1F5EE]",
      avatarText: "SL"
    },
    {
      name: "Yiota M.",
      joined: "Since Nov 2023",
      phone: "+357 96 901 234",
      visitText: "Wed, 13 May · 10:00",
      visitSub: "Next booking",
      isNext: true,
      visits: 22,
      spent: "€2,090",
      tag: "VIP",
      tagBg: "bg-[#FAEEDA]",
      tagColor: "text-[#633806]",
      avatarBg: "bg-[#EEEDFE]",
      avatarText: "YM"
    },
    {
      name: "Sophia A.",
      joined: "Since Mar 2024",
      phone: "+357 96 567 444",
      visitText: "Fri, 15 May · 09:00",
      visitSub: "Next booking",
      isNext: true,
      visits: 20,
      spent: "€1,600",
      tag: "VIP",
      tagBg: "bg-[#FAEEDA]",
      tagColor: "text-[#633806]",
      avatarBg: "bg-[#E1F5EE]",
      avatarText: "SA"
    },
    {
      name: "Dimitra V.",
      joined: "Since Mar 2024",
      phone: "+357 99 345 678",
      visitText: "11 May 2026",
      visitSub: "Last visit",
      isNext: false,
      visits: 12,
      spent: "€780",
      tag: "No Show",
      tagBg: "bg-[#FCE4E4]",
      tagColor: "text-[#E42424]",
      avatarBg: "bg-[#EEEDFE]",
      avatarText: "DV"
    },
    {
      name: "Elena S.",
      joined: "Since Jun 2024",
      phone: "+357 96 789 012",
      visitText: "Tue, 12 May · 12:00",
      visitSub: "Next booking",
      isNext: true,
      visits: 1,
      spent: "€480",
      tag: "New",
      tagBg: "bg-[#E6F1FB]",
      tagColor: "text-[#0C447C]",
      avatarBg: "bg-[#EEEDFE]",
      avatarText: "ES"
    },
    {
      name: "Katerina L.",
      joined: "Since Jul 2024",
      phone: "+357 96 345 222",
      visitText: "Thu, 14 May · 09:30",
      visitSub: "Next booking",
      isNext: true,
      visits: 1,
      spent: "€270",
      tag: "New",
      tagBg: "bg-[#E6F1FB]",
      tagColor: "text-[#0C447C]",
      avatarBg: "bg-[#E1F5EE]",
      avatarText: "KL"
    },
    {
      name: "Anna P.",
      joined: "Since Sep 2024",
      phone: "+357 96 789 666",
      visitText: "Sat, 16 May · 10:00",
      visitSub: "Next booking",
      isNext: true,
      visits: 1,
      spent: "€520",
      tag: "New",
      tagBg: "bg-[#E6F1FB]",
      tagColor: "text-[#0C447C]",
      avatarBg: "bg-[#E1F5EE]",
      avatarText: "AP"
    },
    {
      name: "Elena K.",
      joined: "Since Apr 2024",
      phone: "+357 96 234 111",
      visitText: "8 May 2026",
      visitSub: "Last visit",
      isNext: false,
      visits: 11,
      spent: "€330",
      tag: "Regular",
      tagBg: "bg-neutral-100",
      tagColor: "text-neutral-600",
      avatarBg: "bg-[#EEEDFE]",
      avatarText: "LK"
    },
    {
      name: "Rania M.",
      joined: "Since Aug 2024",
      phone: "+357 96 678 555",
      visitText: "Fri, 15 May · 15:30",
      visitSub: "Next booking",
      isNext: true,
      visits: 6,
      spent: "€180",
      tag: "Regular",
      tagBg: "bg-neutral-100",
      tagColor: "text-neutral-600",
      avatarBg: "bg-[#EEEDFE]",
      avatarText: "RM"
    }
  ];

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
      {activeTab === "Calendar" ? (
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FCF8F8] relative">
          {/* Calendar Toolbar */}
          <div className="h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 flex items-center justify-between shrink-0 select-none">
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
              <button className="bg-[#020305] text-white rounded-lg h-9 px-4 flex items-center gap-2 text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm">
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
            <div className="flex min-w-[800px] h-[800px] relative">
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
                  {/* Brenda Massey - 8:00 to 8:30 (top: 0px, height: 40px) */}
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

                  {/* Craig Mango - 10:00 to 10:30 (top: 160px, height: 40px) */}
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

                  {/* Zain Dias - 11:00 to 11:30 (top: 240px, height: 40px) */}
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
                  {/* Alena Geidt - 8:00 - 8:30 */}
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

                  {/* Marilyn Carder - 9:00 - 10:00 */}
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
                  {/* Phillip Dorwart - 9:00 - 10:00 */}
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

                  {/* Desirae Stanton - 12:30 - 1:30 (top: 324px, height: 100px) */}
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
                  {/* James Herwitz - 8:00 - 9:30 (top: 40, height: 100) */}
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

                  {/* Amy Jones - 9:00 - 9:30 (top: 140, height: 120) */}
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

          {/* Slots selected bottom bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border border-[#C6C6CB] rounded-xl px-4 py-3 shadow-xl flex items-center justify-between w-[640px] h-[94px] z-30 select-none">
            <div className="flex items-center gap-3">
              <div className="w-[31px] h-10 rounded-full bg-[#CFE1FE] flex items-center justify-center shrink-0">
                <img src="/calederions/edit.svg" alt="Edit Icon" className="w-5 h-5 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins text-sm font-semibold text-[#020305]">2 slots selected</span>
                <span className="text-xs text-[#45474B] font-poppins">John's schedule</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="bg-[#020305] text-white text-sm font-medium px-[36.2px] h-[50px] rounded-lg hover:bg-neutral-800 transition-colors shadow-md">
                Disable Selected Slots (2)
              </button>
              <button className="text-[#45474B] hover:text-neutral-900 text-sm font-medium transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </main>
      ) : activeTab === "Clients" ? (
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#FCF8F8] relative">
          {/* Client management Header */}
          <div className="h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 flex items-center justify-between shrink-0 select-none">
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A] font-poppins">Client management</h1>
              <p className="text-[11px] text-neutral-500 font-poppins mt-0.5">See all the details of your client</p>
            </div>
            {/* Notification bell */}
            <div className="relative">
              <button className="w-9 h-9 border border-[#E8E8E6] bg-white rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all shadow-sm">
                <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px] text-[#5F5E5A]" />
              </button>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E24B4A] text-white text-[9px] font-medium flex items-center justify-center rounded-full border-2 border-white">
                5
              </span>
            </div>
          </div>

          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {/* Metrics cards container */}
            <div className="grid grid-cols-5 bg-white border border-[#E8E8E6] rounded-xl divide-x divide-[#E8E8E6] shrink-0">
              <div className="p-4 flex flex-col justify-center">
                <span className="text-lg font-semibold text-[#1A1A1A]">18</span>
                <span className="text-xs text-[#888780] font-light mt-0.5">Total clients</span>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <span className="text-lg font-semibold text-[#1A1A1A]">12</span>
                <span className="text-xs text-[#888780] font-light mt-0.5">Active this month</span>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <span className="text-lg font-semibold text-[#1D9E75]">3</span>
                <span className="text-xs text-[#888780] font-light mt-0.5">New this month</span>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <span className="text-lg font-semibold text-[#E24B4A]">2</span>
                <span className="text-xs text-[#888780] font-light mt-0.5">At-risk</span>
              </div>
              <div className="p-4 flex flex-col justify-center">
                <span className="text-lg font-semibold text-[#1A1A1A]">€504</span>
                <span className="text-xs text-[#888780] font-light mt-0.5">Avg. lifetime value</span>
              </div>
            </div>

            {/* Filter toolbar */}
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {/* Search box */}
                <div className="relative w-[230px] h-9">
                  <span className="absolute left-3 top-2.5 text-neutral-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search name, phone or email..."
                    className="w-full h-full pl-9 pr-4 bg-white border border-[#D3D1C7] rounded-lg text-xs font-poppins placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                  />
                </div>

                {/* Dropdown 1: Tags */}
                <button className="h-9 px-3 border border-[#111111] rounded-lg flex items-center justify-between bg-white text-xs font-semibold text-[#111111] gap-2">
                  <span>Tags</span>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
                </button>

                {/* Dropdown 2: All staff */}
                <button className="h-9 px-3 border border-[#111111] rounded-lg flex items-center justify-between bg-white text-xs font-semibold text-[#111111] gap-2">
                  <span>All Staff</span>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
                </button>

                {/* Dropdown 3: Export */}
                <button className="h-9 px-3 border border-[#111111] rounded-lg flex items-center justify-between bg-white text-xs font-semibold text-[#111111] gap-2">
                  <span>Export</span>
                  <svg className="w-3.5 h-3.5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>

              {/* Add Client Button */}
              <button className="h-9 px-4 bg-[#111111] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Add client</span>
              </button>
            </div>

            {/* Clients Table Container */}
            <div className="bg-white border border-[#E8E8E6] rounded-xl flex-1 flex flex-col overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAF8] border-b border-[#E8E8E6] text-[11px] text-[#888780] font-normal font-poppins">
                      <th className="px-5 py-3.5 font-normal">Client</th>
                      <th className="px-5 py-3.5 font-normal">Phone</th>
                      <th className="px-5 py-3.5 font-normal">Last visit / Next</th>
                      <th className="px-5 py-3.5 font-normal">Visits</th>
                      <th className="px-5 py-3.5 font-normal">Spent</th>
                      <th className="px-5 py-3.5 font-normal">Tags</th>
                      <th className="px-5 py-3.5 font-normal text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E8E6] font-poppins text-xs">
                    {clientsData.map((client, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                        {/* Client details */}
                        <td className="px-5 py-3.5 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${client.avatarBg} flex items-center justify-center text-[10px] font-semibold text-[#5F5E5A] shrink-0`}>
                            {client.avatarText}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#1A1A1A]">{client.name}</span>
                            <span className="text-[10px] text-[#888780] font-light mt-0.5">{client.joined}</span>
                          </div>
                        </td>
                        {/* Phone */}
                        <td className="px-5 py-3.5 text-[#5F5E5A]">
                          {client.phone}
                        </td>
                        {/* Last visit / Next Booking */}
                        <td className="px-5 py-3.5">
                          <div className="flex flex-col">
                            <span className={`font-medium ${client.isNext ? "text-[#1D9E75]" : "text-[#1A1A1A]"}`}>
                              {client.isNext ? `↑ ${client.visitText}` : client.visitText}
                            </span>
                            <span className="text-[10px] text-[#B4B2A9] mt-0.5">{client.visitSub}</span>
                          </div>
                        </td>
                        {/* Visits */}
                        <td className="px-5 py-3.5 text-[#1A1A1A] font-semibold">
                          {client.visits}
                        </td>
                        {/* Spent */}
                        <td className="px-5 py-3.5 text-[#1A1A1A] font-semibold">
                          {client.spent}
                        </td>
                        {/* Tags */}
                        <td className="px-5 py-3.5">
                          {client.tag && (
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${client.tagBg} ${client.tagColor}`}>
                              {client.tag}
                            </span>
                          )}
                        </td>
                        {/* Action button */}
                        <td className="px-5 py-3.5 text-right">
                          <button className="border border-[#111827] rounded-full px-3 py-1 text-xs font-semibold text-[#111827] hover:bg-neutral-50 transition-colors inline-flex items-center gap-1.5 h-[30px]">
                            <span>Action</span>
                            <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Pagination Bar */}
              <div className="mt-auto border-t border-[#E8E8E6] px-5 py-3.5 flex items-center justify-between bg-white shrink-0 text-xs">
                <span className="text-neutral-500 font-poppins">20 of 50 clients</span>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded border border-[#E8E8E6] flex items-center justify-center text-neutral-400 hover:bg-neutral-50">
                    &lt;
                  </button>
                  <button className="w-8 h-8 rounded border border-neutral-800 bg-neutral-900 text-white flex items-center justify-center font-semibold">
                    1
                  </button>
                  <button className="w-8 h-8 rounded border border-[#E8E8E6] text-neutral-600 flex items-center justify-center hover:bg-neutral-50">
                    2
                  </button>
                  <button className="w-8 h-8 rounded border border-[#E8E8E6] flex items-center justify-center text-neutral-600 hover:bg-neutral-50">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
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
      )}
    </div>
  );
}
