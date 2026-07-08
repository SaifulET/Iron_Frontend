"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { BellIcon } from "@hugeicons/core-free-icons";

export default function SupportHeader() {
  return (
    <div className="h-20 bg-[#FCF8F8] px-6 md:px-8 flex items-center justify-between shrink-0 select-none">
      <div className="flex flex-col gap-0.5 self-stretch justify-center">
        <h1 className="font-poppins font-medium text-base leading-6 text-[#0F1E35] self-stretch grow-0">
          Contact Supppoert
        </h1>
        <p className="font-poppins font-normal text-xs leading-[18px] text-[#6B7280] grow-0">
          Wednesday, 27 May 2026 · Good morning, Elena
        </p>
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
  );
}
