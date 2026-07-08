"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { BellIcon } from "@hugeicons/core-free-icons";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      name: "Timur",
      action: "has report a Profile",
      time: "5h ago",
      highlight: false
    },
    {
      id: 2,
      name: "Timur",
      action: "has Requested for",
      target: "Account Deletion",
      time: "5h ago",
      highlight: true
    },
    {
      id: 3,
      name: "Timur",
      action: "has given a feedback",
      time: "5h ago",
      highlight: false
    },
    {
      id: 4,
      name: "Timur",
      action: "has report a Post",
      time: "5h ago",
      highlight: false
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 border border-[#E8E8E6] bg-white rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all shadow-sm cursor-pointer"
      >
        <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px] text-[#5F5E5A]" />
      </button>
      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E24B4A] text-white text-[9px] font-medium flex items-center justify-center rounded-full border-2 border-white select-none pointer-events-none">
        4
      </span>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-[270px] xs:w-[320px] sm:w-[564px] h-[384px] bg-white rounded-[12px] border border-neutral-100 shadow-xl overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex flex-col items-center pt-6 pb-4 gap-6 w-full">
            <h3 className="font-urbanist font-semibold text-sm sm:text-lg leading-6 text-center text-[#08002B]">
              Notifications
            </h3>
          </div>

          {/* List Wrapper - Frame 2147226532 */}
          <div className="flex flex-row items-start px-6 gap-2 w-full h-[288px]">
            {/* Items List - Frame 2147226870 */}
            <div className="flex-1 flex flex-col items-start gap-2 overflow-y-auto pr-2 h-full [&::-webkit-scrollbar]:w-[11px] [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:border-2 [&::-webkit-scrollbar-track]:border-[#D8D4E0] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#81739A] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[4px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding">
              {notifications.map((item) => (
                <div 
                  key={item.id}
                  className="flex flex-row items-center py-3 gap-2.5 w-full border-b border-neutral-50 hover:bg-neutral-50/50 px-2 rounded-lg transition-colors cursor-pointer select-none min-w-0"
                >
                  {/* Avatar */}
                  <img
                    src="/image/profile1.png"
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                    onError={(e) => {
                      // Fallback if public/image/profile1.png is missing
                      (e.target as HTMLImageElement).src = "/businessDashboard/downLogo.png";
                    }}
                  />

                  {/* Text Container */}
                  <div className="flex flex-col items-start min-w-0 flex-1">
                    <span className="font-urbanist font-semibold text-[11px] sm:text-base leading-[18px] sm:leading-[22px] text-[#08002B] break-words w-full">
                      {item.name} {item.action}{" "}
                      {item.highlight && (
                        <span className="text-[#E24B4A] font-semibold">{item.target}</span>
                      )}
                    </span>
                    <span className="font-urbanist font-normal text-[10px] sm:text-sm leading-4 sm:leading-5 text-[#5C526D]">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
