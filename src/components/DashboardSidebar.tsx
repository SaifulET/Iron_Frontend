"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
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
  HeadsetIcon,
  Logout01Icon
} from "@hugeicons/core-free-icons";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
  showFooterMenu: boolean;
  setShowFooterMenu: (val: boolean) => void;
  footerMenuRef: React.RefObject<HTMLDivElement | null>;
}

export default function DashboardSidebar({
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
  showFooterMenu,
  setShowFooterMenu,
  footerMenuRef
}: DashboardSidebarProps) {
  return (
    <aside className={`bg-[#C0D5D8] flex flex-col justify-between shrink-0 border-r border-[#B0C5C8] h-full transition-all duration-300 ${isCollapsed ? "w-[78px]" : "w-[280px]"}`}>
      <div>
        {/* Sidebar Header */}
        <div className={`h-16 flex items-center justify-between px-6 border-b border-[#B0C5C8] bg-[#C0D5D8] shrink-0 ${isCollapsed ? "justify-center !px-3" : ""}`}>
          {isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-8 h-8 rounded-lg hover:bg-[#B0C5C8]/50 flex items-center justify-center text-[#1C1B1C] transition-all cursor-pointer"
            >
              <img src="/businessDashboard/Sidebar Icon.svg" alt="Toggle Sidebar" className="w-6 h-6 object-contain" />
            </button>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <img src="/img/smallBlacklogo.svg" alt="Bookly" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-[#111111] text-[15px] tracking-wide font-poppins">Bookly.cy</span>
                  <span className="text-[10px] text-[#111111]/60 font-poppins mt-1">Business Owner</span>
                </div>
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="w-8 h-8 rounded-lg hover:bg-[#B0C5C8]/50 flex items-center justify-center text-[#1C1B1C] transition-all cursor-pointer"
              >
                <img src="/businessDashboard/Sidebar Icon.svg" alt="Toggle Sidebar" className="w-5 h-5 object-contain" />
              </button>
            </>
          )}
        </div>

        {/* Sidebar Navigation */}
        <div className={`p-4 space-y-7 overflow-y-auto max-h-[calc(100vh-260px)] select-none ${isCollapsed ? "px-2" : ""} scrollbar-hide`}>
          
          {/* CORE SECTION */}
          <div className="space-y-1">
            {!isCollapsed && (
              <span className="text-[10px] font-medium tracking-[2px] uppercase text-[#111111]/60 px-3 block mb-2">Core</span>
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
  );
}
